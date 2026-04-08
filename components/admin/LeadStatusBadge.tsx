import type { LeadStatus } from '@prisma/client';

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  NEW: { label: 'New', className: 'bg-blue-100 text-blue-700' },
  CONTACTED: { label: 'Contacted', className: 'bg-purple-100 text-purple-700' },
  QUALIFIED: { label: 'Qualified', className: 'bg-yellow-100 text-yellow-700' },
  QUOTED: { label: 'Quoted', className: 'bg-orange-100 text-orange-700' },
  CLOSED_WON: { label: 'Won', className: 'bg-green-100 text-green-700' },
  CLOSED_LOST: { label: 'Lost', className: 'bg-red-100 text-red-700' },
  UNQUALIFIED: { label: 'Unqualified', className: 'bg-gray-100 text-gray-500' },
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
