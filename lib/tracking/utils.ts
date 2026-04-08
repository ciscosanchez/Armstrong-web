import { createHash } from 'crypto';
import type { DeviceType } from '@prisma/client';

/**
 * Hash an IP address with SHA-256 for privacy-compliant storage.
 * Never store raw IPs — use this before saving to the database.
 */
export function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

/**
 * Detect device type from User-Agent string.
 * Returns 'MOBILE', 'TABLET', or 'DESKTOP'.
 */
export function detectDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'TABLET';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'MOBILE';
  }
  return 'DESKTOP';
}

/**
 * Calculate a lead score delta based on a new tracking event.
 * Called when processing POST /api/track to update an existing lead score.
 */
export function eventScoreDelta(event: string): number {
  const scoreMap: Record<string, number> = {
    page_view: 5,
    cta_click: 10,
    estimate_complete: 40,
    location_viewed: 15,
    phone_click: 30,
    chat_open: 20,
  };
  return scoreMap[event] ?? 0;
}

/**
 * Classify a lead score into a tier for sales dashboard display.
 */
export function getScoreTier(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 100) return 'hot';
  if (score >= 50) return 'warm';
  return 'cold';
}
