import 'server-only';
import { type NextRequest, NextResponse } from 'next/server';
import { TrackingEventSchema } from '@/lib/validations/track';
import { checkRateLimit, getClientIp, tooManyRequestsResponse } from '@/lib/security/rateLimit';
import { prisma } from '@/lib/db/client';
import { hashIp, detectDevice, eventScoreDelta } from '@/lib/tracking/utils';

export const runtime = 'nodejs';

/**
 * POST /api/track
 * Records a first-party behavioral event.
 * Only processes events if the session has analytics consent.
 * Returns 204 No Content on success.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Rate limit — generous for tracking events
  const ip = getClientIp(req);
  const { allowed, reset } = await checkRateLimit('track', ip);
  if (!allowed) {
    return tooManyRequestsResponse(reset) as unknown as NextResponse;
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const parsed = TrackingEventSchema.safeParse(rawBody);
  if (!parsed.success) {
    return new NextResponse(null, { status: 422 });
  }

  const event = parsed.data;
  const sessionId = req.headers.get('X-Session-Id') ?? req.cookies.get('arm_session')?.value;

  if (!sessionId) {
    // No session = no consent = don't track
    return new NextResponse(null, { status: 204 });
  }

  const userAgent = req.headers.get('user-agent') ?? '';
  const device = detectDevice(userAgent);

  // Persist the event
  await prisma.trackingEvent.create({
    data: {
      sessionId,
      event: event.event.toUpperCase() as Parameters<
        typeof prisma.trackingEvent.create
      >[0]['data']['event'],
      path: 'path' in event ? event.path : null,
      referrer: ('referrer' in event ? event.referrer : null) ?? null,
      data: event,
      ipHash: hashIp(ip),
      device,
    },
  });

  // If this event has scoring value, update any open leads for this session
  const delta = eventScoreDelta(event.event);
  if (delta > 0) {
    void prisma.lead
      .updateMany({
        where: {
          sessionId,
          status: { in: ['NEW', 'CONTACTED'] },
        },
        data: { score: { increment: delta } },
      })
      .catch(() => {
        // Non-critical — score update failure doesn't block response
      });
  }

  return new NextResponse(null, { status: 204 });
}
