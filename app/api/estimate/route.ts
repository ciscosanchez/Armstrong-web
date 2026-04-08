import 'server-only';
import { type NextRequest, NextResponse } from 'next/server';
import { EstimateSchema, type EstimateResult } from '@/lib/validations/estimate';
import { checkRateLimit, getClientIp, tooManyRequestsResponse } from '@/lib/security/rateLimit';

export const runtime = 'nodejs';

// ZIP code centroid lookup — approximate lat/lng for distance calculation
// Covers all Armstrong market ZIPs; expand as needed
const ZIP_CENTROIDS: Record<string, { lat: number; lng: number }> = {
  '38118': { lat: 35.07, lng: -90.02 }, // Memphis
  '60148': { lat: 41.87, lng: -88.01 }, // Lombard IL
  '30340': { lat: 33.9, lng: -84.28 }, // Doraville GA
  '75006': { lat: 32.97, lng: -96.89 }, // Carrollton TX
};

// Base costs in USD by home size tier
const BASE_COST: Record<string, { min: number; max: number }> = {
  studio: { min: 800, max: 1_500 },
  '1br': { min: 1_200, max: 2_200 },
  '2br': { min: 1_800, max: 3_200 },
  '3br': { min: 2_800, max: 5_000 },
  '4br+': { min: 4_500, max: 8_000 },
  office: { min: 3_000, max: 10_000 },
};

// Cost per mile (added to base for long-distance)
const COST_PER_MILE = 1.2;

// Add-on costs
const ADDON_COSTS: Record<string, number> = {
  packing: 600,
  storage: 300,
  piano: 400,
  vehicle: 800,
  art: 500,
};

function estimateDistanceMiles(originZip: string, destZip: string): number {
  const origin = ZIP_CENTROIDS[originZip];
  const dest = ZIP_CENTROIDS[destZip];

  if (!origin || !dest) {
    // Fallback: estimate from ZIP prefix difference (rough but useful)
    const prefix1 = parseInt(originZip.slice(0, 3));
    const prefix2 = parseInt(destZip.slice(0, 3));
    return Math.abs(prefix1 - prefix2) * 15 + 50;
  }

  // Haversine approximation
  const R = 3_959; // Earth radius in miles
  const dLat = ((dest.lat - origin.lat) * Math.PI) / 180;
  const dLng = ((dest.lng - origin.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((origin.lat * Math.PI) / 180) *
      Math.cos((dest.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function isPeakMovingSeason(dateStr: string | undefined | null): boolean {
  if (!dateStr) return false;
  const month = new Date(dateStr).getMonth() + 1; // 1-12
  return month >= 5 && month <= 8; // May–August
}

function calculateEstimate(
  tier: string,
  distanceMiles: number,
  addOns: Record<string, boolean>,
  moveDate: string | null | undefined,
): { low: number; high: number } {
  const base = BASE_COST[tier] ?? BASE_COST['2br']!;
  const distanceCost = distanceMiles > 100 ? distanceMiles * COST_PER_MILE : 0;

  const addOnCost = Object.entries(addOns)
    .filter(([, enabled]) => enabled)
    .reduce((sum, [key]) => sum + (ADDON_COSTS[key] ?? 0), 0);

  const peakMultiplier = isPeakMovingSeason(moveDate) ? 1.15 : 1;

  const low = Math.round(((base.min + distanceCost + addOnCost) * peakMultiplier) / 100) * 100;
  const high = Math.round(((base.max + distanceCost + addOnCost) * peakMultiplier) / 100) * 100;

  return { low, high };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);
  const { allowed, reset } = await checkRateLimit('estimate', ip);
  if (!allowed) return tooManyRequestsResponse(reset) as unknown as NextResponse;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = EstimateSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { originZip, destZip, homeSizeTier, addOns, moveDate } = parsed.data;
  const distanceMiles = estimateDistanceMiles(originZip, destZip);
  const { low, high } = calculateEstimate(homeSizeTier, distanceMiles, addOns, moveDate);
  const peakSeason = isPeakMovingSeason(moveDate);

  const result: EstimateResult = {
    low,
    high,
    currency: 'USD',
    distanceMiles,
    isPeakSeason: peakSeason,
    disclaimer:
      'This estimate is for planning purposes only and does not constitute a binding quote. ' +
      'Final pricing is based on an in-person or virtual survey. ' +
      (peakSeason ? 'Peak season (May–Aug) pricing applied. ' : '') +
      'Contact Armstrong for an accurate quote.',
  };

  return NextResponse.json(result, { status: 200 });
}
