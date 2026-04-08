import 'server-only';
import { type NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/validations/lead';
import { checkRateLimit, getClientIp, tooManyRequestsResponse } from '@/lib/security/rateLimit';
import { verifyCsrfToken } from '@/lib/security/csrf';
import { detectLeadAbuse } from '@/lib/security/leadAbuse';
import { prisma } from '@/lib/db/client';
import { sendLeadNotification, sendLeadConfirmation } from '@/lib/email/templates';
import { createNetSuiteLead } from '@/lib/netsuite/leads';
import { detectDevice } from '@/lib/tracking/utils';

// Edge-compatible: runs in Vercel Node.js runtime (needs Prisma)
export const runtime = 'nodejs';

/**
 * POST /api/leads
 * Accepts a contact/booking form submission.
 * Validates → rate limits → saves → emails → queues NetSuite sync.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── 1. CSRF verification ──────────────────────────────────
  const csrfValid = await verifyCsrfToken(req);
  if (!csrfValid) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  // ── 2. Rate limiting ──────────────────────────────────────
  const ip = getClientIp(req);
  const { allowed, reset, remaining } = await checkRateLimit('leads', ip);
  if (!allowed) {
    return tooManyRequestsResponse(reset) as unknown as NextResponse;
  }

  // ── 3. Parse + validate body ──────────────────────────────
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ContactFormSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // ── 4. Honeypot check (additional bot signal) ─────────────
  if (data._website !== undefined && data._website !== '') {
    // Silent success — don't reveal honeypot to bots
    return NextResponse.json({ id: 'bot', status: 'received' }, { status: 200 });
  }

  // ── 5. Cloudflare Turnstile verification ──────────────────
  const turnstileValid = await verifyTurnstile(data.cfTurnstileResponse, ip);
  if (!turnstileValid) {
    return NextResponse.json({ error: 'Bot verification failed' }, { status: 400 });
  }

  // ── 6. Abuse detection ───────────────────────────────────
  const abuse = detectLeadAbuse({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
  });

  // Hard block: disposable email + another signal = definitely spam
  if (abuse.signals.disposableEmail && abuse.legitimacyScore < 30) {
    // Silent success — don't reveal detection to spammers
    return NextResponse.json({ id: 'filtered', status: 'received' }, { status: 200 });
  }

  // ── 7. Server-side enrichment ─────────────────────────────
  const userAgent = req.headers.get('user-agent') ?? '';
  const device = detectDevice(userAgent);
  // Extract UTM params from referrer header or custom header set by TrackingProvider
  const utmSource = req.headers.get('X-UTM-Source');
  const utmMedium = req.headers.get('X-UTM-Medium');
  const utmCampaign = req.headers.get('X-UTM-Campaign');
  const sessionId = req.cookies.get('arm_session')?.value ?? null;
  const formPage = req.headers.get('Referer');

  // ── 8. Save lead to database ──────────────────────────────
  const baseScore = calculateInitialScore({ utmSource, utmMedium, sessionId });
  const finalScore = Math.round(baseScore * (abuse.legitimacyScore / 100));

  const lead = await prisma.lead.create({
    data: {
      type: data.type.toUpperCase().replace('-', '_') as
        | 'RESIDENTIAL'
        | 'COMMERCIAL'
        | 'SUPPLY_CHAIN'
        | 'DATA_CENTER',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      originZip: data.originZip ?? null,
      destZip: data.destZip ?? null,
      moveDate: data.moveDate ? new Date(data.moveDate) : null,
      notes: data.notes ?? null,
      utmSource,
      utmMedium,
      utmCampaign,
      sessionId,
      formPage,
      device,
      score: finalScore,
    },
  });

  // ── 9. Send emails (non-blocking, skip if flagged as abuse) ─
  if (!abuse.skipEmail) {
    void sendLeadConfirmation(data.email, data.firstName, data.type).catch((err) =>
      console.error('Lead confirmation email failed:', err),
    );
    void sendLeadNotification(lead).catch((err) =>
      console.error('Lead notification email failed:', err),
    );
  }

  // ── 10. NetSuite sync (non-blocking, with retry on failure) ─
  void syncToNetSuite(lead.id, data, { utmSource, utmCampaign }).catch((err) =>
    console.error('NetSuite initial sync failed:', err),
  );

  // ── 11. Respond ───────────────────────────────────────────
  return NextResponse.json(
    {
      id: lead.id,
      status: 'received',
      nextStep: data.type === 'residential' ? 'survey' : 'estimate',
    },
    {
      status: 201,
      headers: {
        'X-RateLimit-Remaining': String(remaining),
      },
    },
  );
}

// ── Helpers ────────────────────────────────────────────────

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // In development without keys configured, skip verification
    if (process.env.NODE_ENV !== 'production') return true;
    throw new Error('TURNSTILE_SECRET_KEY not configured');
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });

  const json = (await res.json()) as { success: boolean };
  return json.success;
}

async function syncToNetSuite(
  leadId: string,
  formData: Parameters<typeof createNetSuiteLead>[0],
  meta: { utmSource?: string | null; utmCampaign?: string | null },
): Promise<void> {
  try {
    const netsuiteId = await createNetSuiteLead(formData, {
      armstrongLeadId: leadId,
      utmSource: meta.utmSource ?? null,
      utmCampaign: meta.utmCampaign ?? null,
    });
    await prisma.lead.update({
      where: { id: leadId },
      data: { netsuiteId, netsuiteSyncedAt: new Date() },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await prisma.lead.update({
      where: { id: leadId },
      data: { netsuiteSyncError: message },
    });
    throw err;
  }
}

function calculateInitialScore(meta: {
  utmSource?: string | null;
  utmMedium?: string | null;
  sessionId?: string | null;
}): number {
  let score = 100; // Base: form submitted
  if (meta.utmMedium === 'organic') score += 10;
  if (meta.utmMedium === 'cpc') score += 5;
  if (meta.sessionId) score += 5; // Known session
  return score;
}
