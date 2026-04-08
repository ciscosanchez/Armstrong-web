import 'server-only';
import { netsuiteRequest } from './client';
import type { ContactFormInput } from '@/lib/validations/lead';

interface NetSuiteLeadPayload {
  [key: string]: unknown;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadsource?: { id: string };
  custentity_move_type?: string;
  custentity_origin_zip?: string;
  custentity_dest_zip?: string;
  custentity_move_date?: string;
  custentity_utm_campaign?: string;
  custentity_utm_source?: string;
  custentity_lead_city?: string;
  custentity_armstrong_lead_id?: string;
}

interface NetSuiteLeadResult {
  id: string;
}

const LEAD_SOURCE_MAP: Record<string, string> = {
  google: '5', // NetSuite leadsource IDs — update with actual IDs
  facebook: '6',
  linkedin: '7',
  organic: '3',
  direct: '1',
  referral: '4',
};

/**
 * Create a Lead record in NetSuite.
 * Returns the NetSuite internal ID.
 *
 * IMPORTANT: This is fire-and-forget in the API route.
 * Failures are logged and the Armstrong lead ID is stored for retry.
 */
export async function createNetSuiteLead(
  formData: ContactFormInput,
  meta: {
    armstrongLeadId: string;
    utmSource?: string | null;
    utmCampaign?: string | null;
    geoCity?: string | null;
  },
): Promise<string> {
  const leadsourceId = meta.utmSource
    ? (LEAD_SOURCE_MAP[meta.utmSource.toLowerCase()] ?? LEAD_SOURCE_MAP['direct'])
    : LEAD_SOURCE_MAP['direct'];

  const payload: NetSuiteLeadPayload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    custentity_move_type: formData.type,
    custentity_armstrong_lead_id: meta.armstrongLeadId,
    ...(leadsourceId ? { leadsource: { id: leadsourceId } } : {}),
    ...(formData.originZip ? { custentity_origin_zip: formData.originZip } : {}),
    ...(formData.destZip ? { custentity_dest_zip: formData.destZip } : {}),
    ...(formData.moveDate ? { custentity_move_date: formData.moveDate } : {}),
    ...(meta.utmCampaign ? { custentity_utm_campaign: meta.utmCampaign } : {}),
    ...(meta.utmSource ? { custentity_utm_source: meta.utmSource } : {}),
    ...(meta.geoCity ? { custentity_lead_city: meta.geoCity } : {}),
  };

  const result = await netsuiteRequest<NetSuiteLeadResult>('POST', '/lead', payload);
  return result.id;
}

/**
 * Update the lead status in NetSuite (e.g., when sales rep qualifies or closes).
 */
export async function updateNetSuiteLeadStatus(
  netsuiteId: string,
  status: 'CONTACTED' | 'QUALIFIED' | 'CLOSED_WON' | 'CLOSED_LOST',
): Promise<void> {
  await netsuiteRequest('PATCH', `/lead/${netsuiteId}`, {
    custentity_armstrong_status: status,
  });
}
