'use client';

import { useState, useTransition } from 'react';
import type { LeadStatus } from '@prisma/client';

const STATUS_OPTIONS: Array<{ label: string; value: LeadStatus }> = [
  { label: 'New', value: 'NEW' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Qualified', value: 'QUALIFIED' },
  { label: 'Quoted', value: 'QUOTED' },
  { label: 'Won', value: 'CLOSED_WON' },
  { label: 'Lost', value: 'CLOSED_LOST' },
  { label: 'Unqualified', value: 'UNQUALIFIED' },
];

interface Props {
  leadId: string;
  currentStatus: LeadStatus;
}

export function LeadStatusSelect({ leadId, currentStatus }: Props) {
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newStatus: LeadStatus) => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/leads/${leadId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!res.ok) throw new Error('Update failed');
        setStatus(newStatus);
      } catch {
        setError('Failed to update status. Try again.');
      }
    });
  };

  return (
    <div className="space-y-2">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value as LeadStatus)}
        disabled={isPending}
        className="focus:border-armstrong-blue w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none disabled:opacity-50"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {isPending && <p className="text-xs text-gray-400">Saving...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
