import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ---------------------------------------------------------------------------
// Middleware — runs on edge before every matched request
// ---------------------------------------------------------------------------
// Responsibilities:
//   1. Protect /studio with HTTP Basic Auth in production
//   2. Protect /dashboard with session check (NextAuth)
//   3. Set security headers on all responses
// ---------------------------------------------------------------------------

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

function addSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

function basicAuthChallenge(): NextResponse {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Armstrong CMS"' },
  });
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  // --- 1. Protect /studio with HTTP Basic Auth (production only) ---
  if (pathname.startsWith('/studio') && process.env.NODE_ENV === 'production') {
    const expectedUser = process.env.STUDIO_BASIC_AUTH_USER;
    const expectedPass = process.env.STUDIO_BASIC_AUTH_PASS;

    if (expectedUser && expectedPass) {
      const authHeader = req.headers.get('authorization') ?? '';
      if (!authHeader.startsWith('Basic ')) return basicAuthChallenge();

      const [user, pass] = Buffer.from(authHeader.slice(6), 'base64').toString().split(':');

      if (user !== expectedUser || pass !== expectedPass) {
        return basicAuthChallenge();
      }
    }
  }

  // --- 2. Protect /dashboard routes (require NextAuth session cookie) ---
  if (pathname.startsWith('/dashboard')) {
    // NextAuth v5 uses 'authjs.session-token' in production, 'authjs.session-token' in dev
    const sessionCookie =
      req.cookies.get('__Secure-authjs.session-token') ?? req.cookies.get('authjs.session-token');

    if (!sessionCookie) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    // Apply to all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|og-default.jpg|fonts/).*)',
  ],
};
