import 'server-only';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const CSRF_COOKIE_NAME = 'arm_csrf';
const CSRF_HEADER_NAME = 'X-CSRF-Token';

/**
 * Generate a CSRF token and set it as an httpOnly cookie.
 * Call this from a Server Component or Server Action to seed the token.
 */
export async function generateCsrfToken(): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return token;
}

/**
 * Verify the CSRF token from the request header against the cookie.
 * Returns true if valid, false if missing or mismatched.
 */
export async function verifyCsrfToken(req: NextRequest): Promise<boolean> {
  const headerToken = req.headers.get(CSRF_HEADER_NAME);
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!headerToken || !cookieToken) return false;
  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(headerToken, cookieToken);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  let diff = 0;
  for (let i = 0; i < bufA.length; i++) {
    diff |= (bufA[i] ?? 0) ^ (bufB[i] ?? 0);
  }
  return diff === 0;
}

/**
 * Build a 403 Forbidden CSRF response.
 */
export function csrfForbiddenResponse(): Response {
  return new Response(JSON.stringify({ error: 'Invalid or missing CSRF token' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}
