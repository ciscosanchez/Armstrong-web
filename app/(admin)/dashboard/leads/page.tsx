import { prisma } from '@/lib/db/client';
import type { LeadStatus, LeadType } from '@prisma/client';
import Link from 'next/link';
import { LeadStatusBadge } from '@/components/admin/LeadStatusBadge';
import { LeadsFilterBar } from '@/components/admin/LeadsFilterBar';

interface Props {
  searchParams: Promise<{
    status?: string;
    type?: string;
    q?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 25;

const LEAD_TYPE_LABELS: Record<LeadType, string> = {
  RESIDENTIAL: 'Residential',
  COMMERCIAL: 'Commercial',
  SUPPLY_CHAIN: 'Supply Chain',
  DATA_CENTER: 'Data Center',
  CREDIT_APPLICATION: 'Credit App',
  SUPPLIES_ESTIMATE: 'Supplies',
  VIRTUAL_SURVEY: 'Virtual Survey',
};

export default async function LeadsDashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10));
  const status = params.status as LeadStatus | undefined;
  const type = params.type as LeadType | undefined;
  const q = params.q?.trim();

  const where = {
    ...(status ? { status } : {}),
    ...(type ? { type } : {}),
    ...(q
      ? {
          OR: [
            { firstName: { contains: q, mode: 'insensitive' as const } },
            { lastName: { contains: q, mode: 'insensitive' as const } },
            { email: { contains: q, mode: 'insensitive' as const } },
            { phone: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const [leads, total] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        type: true,
        status: true,
        score: true,
        utmSource: true,
        geoCity: true,
        geoState: true,
        netsuiteId: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-armstrong-dark-blue text-2xl font-bold">Leads</h1>
          <p className="text-sm text-gray-500">{total.toLocaleString()} total</p>
        </div>
        <a
          href="/api/leads/export"
          className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-md px-4 py-2 text-sm font-semibold text-white"
        >
          Export CSV
        </a>
      </div>

      {/* Filters */}
      <LeadsFilterBar currentStatus={status} currentType={type} currentQ={q} />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Score</Th>
              <Th>Location</Th>
              <Th>Source</Th>
              <Th>CRM</Th>
              <Th>Date</Th>
              <Th />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400">
                  No leads found.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="text-armstrong-dark-blue px-4 py-3 font-medium">
                  {lead.firstName} {lead.lastName}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  <div>{lead.email}</div>
                  <div className="text-xs">{lead.phone}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{LEAD_TYPE_LABELS[lead.type]}</td>
                <td className="px-4 py-3">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3">
                  <ScorePill score={lead.score} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {lead.geoCity ? `${lead.geoCity}, ${lead.geoState ?? ''}` : '—'}
                </td>
                <td className="px-4 py-3 text-gray-500">{lead.utmSource ?? 'direct'}</td>
                <td className="px-4 py-3">
                  {lead.netsuiteId ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      Synced
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {new Date(lead.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="text-armstrong-blue text-xs font-semibold hover:underline"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && <PaginationLink page={page - 1} params={params} label="← Prev" />}
            {page < totalPages && <PaginationLink page={page + 1} params={params} label="Next →" />}
          </div>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
      {children}
    </th>
  );
}

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'bg-green-100 text-green-700'
      : score >= 40
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-gray-100 text-gray-500';
  return <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${color}`}>{score}</span>;
}

function PaginationLink({
  page,
  params,
  label,
}: {
  page: number;
  params: Record<string, string | undefined>;
  label: string;
}) {
  const qs = new URLSearchParams();
  qs.set('page', String(page));
  if (params.status) qs.set('status', params.status);
  if (params.type) qs.set('type', params.type);
  if (params.q) qs.set('q', params.q);

  return (
    <Link
      href={`/dashboard/leads?${qs.toString()}`}
      className="rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
    >
      {label}
    </Link>
  );
}
