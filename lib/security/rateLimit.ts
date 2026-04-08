import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { NextRequest } from 'next/server';

const LIMITER_CONFIG = {
  leads: { window: 5, duration: '60s' },
  estimate: { window: 10, duration: '60s' },
  track: { window: 120, duration: '60s' },
  api: { window: 100, duration: '300s' },
} as const;

type LimiterKey = keyof typeof LIMITER_CONFIG;

// Lazily created — only instantiated on first checkRateLimit call
let redis: Redis | null = null;
const limiterCache = new Map<LimiterKey, Ratelimit>();

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null; // Redis not configured — bypass in dev
  redis = new Redis({ url, token });
  return redis;
}

function getLimiter(tier: LimiterKey): Ratelimit | null {
  const cached = limiterCache.get(tier);
  if (cached) return cached;

  const r = getRedis();
  if (!r) return null;

  const { window, duration } = LIMITER_CONFIG[tier];
  const limiter = new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(window, duration),
    prefix: `rl:${tier}`,
    analytics: true,
  });
  limiterCache.set(tier, limiter);
  return limiter;
}

/**
 * Extract the real client IP from the request.
 * Cloudflare sets CF-Connecting-IP; fall back to X-Forwarded-For.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('CF-Connecting-IP') ??
    req.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  );
}

/**
 * Check rate limit for a given endpoint and IP.
 * Returns { allowed, reset, remaining } — caller decides whether to block.
 * If Redis is not configured (dev), always allows.
 */
export async function checkRateLimit(
  tier: LimiterKey,
  identifier: string,
): Promise<{ allowed: boolean; reset: number; remaining: number }> {
  const limiter = getLimiter(tier);
  if (!limiter) {
    // No Redis configured — bypass rate limiting (dev / staging without Upstash)
    return { allowed: true, reset: Date.now() + 60_000, remaining: 999 };
  }
  const { success, reset, remaining } = await limiter.limit(identifier);
  return { allowed: success, reset, remaining };
}

/**
 * Build a 429 Too Many Requests response with Retry-After header.
 */
export function tooManyRequestsResponse(reset: number): Response {
  const retryAfter = Math.ceil((reset - Date.now()) / 1000);
  return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfter),
    },
  });
}
