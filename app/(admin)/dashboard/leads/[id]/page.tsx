import { prisma } from '@/lib/db/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { LeadStatusBadge } from '@/components/admin/LeadStatusBadge';
import { LeadStatusSelect } from '@/components/admin/LeadStatusSelect';

interface Props {
  params: Promise<{ id: string }>;
}

const LEAD_TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Residential Moving',
  COMMERCIAL: 'Commercial Moving',
  SUPPLY_CHAIN: 'Supply Chain',
  DATA_CENTER: 'Data Center',
  CREDIT_APPLICATION: 'Credit Application',
  SUPPLIES_ESTIMATE: 'Supplies Estimate',
  VIRTUAL_SURVEY: 'Virtual Survey',
};

const EVENT_LABELS: Record<string, string> = {
  PAGE_VIEW: 'Page view',
  CTA_CLICK: 'CTA click',
  FORM_START: 'Form started',
  FORM_ABANDON: 'Form abandoned',
  FORM_SUBMIT: 'Form submitted',
  ESTIMATE_COMPLETE: 'Estimate completed',
  LOCATION_VIEWED: 'Location viewed',
  PHONE_CLICK: 'Phone click',
  CHAT_OPEN: 'Chat opened',
  CHAT_LEAD_CAPTURED: 'Chat lead captured',
  CONSENT_ACCEPTED: 'Consent accepted',
  CONSENT_REJECTED: 'Consent rejected',
};

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      events: { orderBy: { createdAt: 'asc' } },
      estimates: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  });

  if (!lead) notFound();

  return (
    <div className="p-6">
      {/* Back */}
      <Link
        href="/dashboard/leads"
        className="text-armstrong-blue mb-4 inline-block text-sm font-semibold hover:underline"
      >
        ← Back to Leads
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: contact + actions */}
        <div className="space-y-4">
          {/* Contact card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-armstrong-dark-blue font-semibold">
                {lead.firstName} {lead.lastName}
              </h2>
              <LeadStatusBadge status={lead.status} />
            </div>
            <dl className="space-y-2 text-sm">
              <Row label="Email">
                <a href={`mailto:${lead.email}`} className="text-armstrong-blue hover:underline">
                  {lead.email}
                </a>
              </Row>
              <Row label="Phone">
                <a href={`tel:${lead.phone}`} className="text-armstrong-blue hover:underline">
                  {lead.phone}
                </a>
              </Row>
              <Row label="Lead type">{LEAD_TYPE_LABELS[lead.type] ?? lead.type}</Row>
              <Row label="Score">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    lead.score >= 80
                      ? 'bg-green-100 text-green-700'
                      : lead.score >= 40
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {lead.score}
                </span>
              </Row>
              {lead.originZip && <Row label="From ZIP">{lead.originZip}</Row>}
              {lead.destZip && <Row label="To ZIP">{lead.destZip}</Row>}
              {lead.moveDate && (
                <Row label="Move date">{new Date(lead.moveDate).toLocaleDateString()}</Row>
              )}
              {lead.notes && <Row label="Notes">{lead.notes}</Row>}
            </dl>
          </div>

          {/* Status update */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-armstrong-dark-blue mb-3 text-sm font-semibold">Update status</p>
            <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
          </div>

          {/* Attribution */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-armstrong-dark-blue mb-3 text-sm font-semibold">Attribution</p>
            <dl className="space-y-2 text-sm">
              <Row label="Source">{lead.utmSource ?? 'direct'}</Row>
              {lead.utmMedium && <Row label="Medium">{lead.utmMedium}</Row>}
              {lead.utmCampaign && <Row label="Campaign">{lead.utmCampaign}</Row>}
              {lead.formPage && <Row label="Form page">{lead.formPage}</Row>}
              {lead.referrer && <Row label="Referrer">{lead.referrer}</Row>}
              {lead.geoCity && (
                <Row label="Location">
                  {lead.geoCity}, {lead.geoState}
                </Row>
              )}
              {lead.device && <Row label="Device">{lead.device}</Row>}
              {lead.browser && <Row label="Browser">{lead.browser}</Row>}
            </dl>
          </div>

          {/* NetSuite */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-armstrong-dark-blue mb-3 text-sm font-semibold">CRM Sync</p>
            <dl className="space-y-2 text-sm">
              <Row label="NetSuite ID">{lead.netsuiteId ?? '—'}</Row>
              <Row label="Synced at">
                {lead.netsuiteSyncedAt ? new Date(lead.netsuiteSyncedAt).toLocaleString() : '—'}
              </Row>
              {lead.netsuiteSyncError && (
                <Row label="Error">
                  <span className="text-red-500">{lead.netsuiteSyncError}</span>
                </Row>
              )}
            </dl>
          </div>
        </div>

        {/* Right: activity timeline */}
        <div className="space-y-4 lg:col-span-2">
          {/* Estimates */}
          {lead.estimates.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-armstrong-dark-blue mb-4 font-semibold">Estimates</h3>
              <div className="space-y-3">
                {lead.estimates.map((est) => (
                  <div
                    key={est.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 text-sm"
                  >
                    <div>
                      <span className="text-armstrong-dark-blue font-medium">
                        {est.homeSizeTier}
                      </span>
                      <span className="ml-2 text-gray-400">
                        {est.originZip} → {est.destZip}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-armstrong-dark-blue font-semibold">
                        ${Math.round(est.estimateLow / 100).toLocaleString()} – $
                        {Math.round(est.estimateHigh / 100).toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-400">
                        {new Date(est.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event timeline */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-armstrong-dark-blue mb-4 font-semibold">
              Activity Timeline ({lead.events.length} events)
            </h3>
            {lead.events.length === 0 ? (
              <p className="text-sm text-gray-400">No tracked events yet.</p>
            ) : (
              <ol className="space-y-3">
                {lead.events.map((evt) => (
                  <li key={evt.id} className="flex gap-3">
                    <div className="bg-armstrong-blue/10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <span className="bg-armstrong-blue h-1.5 w-1.5 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-armstrong-dark-blue text-sm font-medium">
                          {EVENT_LABELS[evt.event] ?? evt.event}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(evt.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {evt.path && <p className="text-xs text-gray-400">{evt.path}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-gray-400">{label}</dt>
      <dd className="text-right text-gray-700">{children}</dd>
    </div>
  );
}
