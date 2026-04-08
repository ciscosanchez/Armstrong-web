import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';

// CSV export for the admin dashboard — /api/leads/export
// Protected by session check in middleware.ts (must hit /dashboard first)
export async function GET(_req: NextRequest): Promise<NextResponse> {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
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
      originZip: true,
      destZip: true,
      moveDate: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      geoCity: true,
      geoState: true,
      netsuiteId: true,
      notes: true,
    },
  });

  const HEADERS = [
    'ID',
    'Created At',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Type',
    'Status',
    'Score',
    'Origin ZIP',
    'Dest ZIP',
    'Move Date',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'Geo City',
    'Geo State',
    'NetSuite ID',
    'Notes',
  ];

  const escape = (v: unknown): string => {
    const s = v == null ? '' : String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const rows = leads.map((l) =>
    [
      l.id,
      l.createdAt.toISOString(),
      l.firstName,
      l.lastName,
      l.email,
      l.phone,
      l.type,
      l.status,
      l.score,
      l.originZip ?? '',
      l.destZip ?? '',
      l.moveDate?.toISOString() ?? '',
      l.utmSource ?? '',
      l.utmMedium ?? '',
      l.utmCampaign ?? '',
      l.geoCity ?? '',
      l.geoState ?? '',
      l.netsuiteId ?? '',
      l.notes ?? '',
    ]
      .map(escape)
      .join(','),
  );

  const csv = [HEADERS.join(','), ...rows].join('\n');
  const filename = `armstrong-leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
