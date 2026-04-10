import { prisma } from '@/lib/db/client';
import type { LeadType, LeadStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function AnalyticsDashboardPage() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400 * 1000);
  // Promise.all preserves individual query types (unlike $transaction with groupBy)
  const [totalLeads, leadsByType, leadsByStatus, recentLeads, avgScore, netsuiteSync] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({
        by: ['type'],
        _count: { _all: true },
        orderBy: { _count: { type: 'desc' } },
      }),
      prisma.lead.groupBy({
        by: ['status'],
        _count: { _all: true },
        orderBy: { _count: { status: 'desc' } },
      }),
      prisma.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.lead.aggregate({ _avg: { score: true } }),
      prisma.lead.count({ where: { netsuiteId: { not: null } } }),
    ]);

  const syncRate = totalLeads > 0 ? Math.round((netsuiteSync / totalLeads) * 100) : 0;

  const pct = (n: number) => (totalLeads > 0 ? Math.round((n / totalLeads) * 100) : 0);

  return (
    <div className="p-6">
      <h1 className="text-armstrong-dark-blue mb-6 text-2xl font-bold">Analytics</h1>

      {/* KPI cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total leads" value={totalLeads.toLocaleString()} />
        <KpiCard label="Last 7 days" value={recentLeads.toLocaleString()} />
        <KpiCard label="Avg lead score" value={Math.round(avgScore._avg.score ?? 0).toString()} />
        <KpiCard label="NetSuite sync rate" value={`${syncRate}%`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leads by type */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-armstrong-dark-blue mb-4 font-semibold">Leads by Type</h2>
          <div className="space-y-3">
            {leadsByType.map((row: { type: LeadType; _count: { _all: number } }) => (
              <div key={row.type}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{row.type.replace(/_/g, ' ')}</span>
                  <span className="text-armstrong-dark-blue font-semibold">
                    {row._count._all} ({pct(row._count._all)}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="bg-armstrong-blue h-2 rounded-full"
                    style={{ width: `${pct(row._count._all)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline by status */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-armstrong-dark-blue mb-4 font-semibold">Pipeline by Status</h2>
          <div className="space-y-3">
            {leadsByStatus.map((row: { status: LeadStatus; _count: { _all: number } }) => {
              const barColor =
                row.status === 'CLOSED_WON'
                  ? 'bg-green-500'
                  : row.status === 'CLOSED_LOST'
                    ? 'bg-red-400'
                    : row.status === 'QUALIFIED'
                      ? 'bg-yellow-400'
                      : row.status === 'NEW'
                        ? 'bg-blue-500'
                        : 'bg-gray-300';
              return (
                <div key={row.status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{row.status.replace(/_/g, ' ')}</span>
                    <span className="text-armstrong-dark-blue font-semibold">
                      {row._count._all} ({pct(row._count._all)}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${barColor}`}
                      style={{ width: `${pct(row._count._all)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-armstrong-dark-blue mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}
