'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { LeadStatus, LeadType } from '@prisma/client';

const STATUS_OPTIONS: Array<{ label: string; value: LeadStatus }> = [
  { label: 'New', value: 'NEW' },
  { label: 'Contacted', value: 'CONTACTED' },
  { label: 'Qualified', value: 'QUALIFIED' },
  { label: 'Quoted', value: 'QUOTED' },
  { label: 'Won', value: 'CLOSED_WON' },
  { label: 'Lost', value: 'CLOSED_LOST' },
  { label: 'Unqualified', value: 'UNQUALIFIED' },
];

const TYPE_OPTIONS: Array<{ label: string; value: LeadType }> = [
  { label: 'Residential', value: 'RESIDENTIAL' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Supply Chain', value: 'SUPPLY_CHAIN' },
  { label: 'Data Center', value: 'DATA_CENTER' },
  { label: 'Credit App', value: 'CREDIT_APPLICATION' },
  { label: 'Supplies', value: 'SUPPLIES_ESTIMATE' },
  { label: 'Virtual Survey', value: 'VIRTUAL_SURVEY' },
];

interface Props {
  currentStatus: LeadStatus | undefined;
  currentType: LeadType | undefined;
  currentQ: string | undefined;
}

export function LeadsFilterBar({ currentStatus, currentType, currentQ }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // reset to page 1 on filter change
      router.push(`/dashboard/leads?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      {/* Search */}
      <input
        type="search"
        defaultValue={currentQ ?? ''}
        placeholder="Search name, email, phone..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateParam('q', (e.target as HTMLInputElement).value || undefined);
          }
        }}
        className="focus:border-armstrong-blue focus:ring-armstrong-blue w-64 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:outline-none"
      />

      {/* Status filter */}
      <select
        value={currentStatus ?? ''}
        onChange={(e) => updateParam('status', e.target.value || undefined)}
        className="focus:border-armstrong-blue rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
      >
        <option value="">All statuses</option>
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Type filter */}
      <select
        value={currentType ?? ''}
        onChange={(e) => updateParam('type', e.target.value || undefined)}
        className="focus:border-armstrong-blue rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
      >
        <option value="">All types</option>
        {TYPE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Clear */}
      {(currentStatus ?? currentType ?? currentQ) && (
        <button
          onClick={() => router.push('/dashboard/leads')}
          className="text-sm text-gray-400 hover:text-gray-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
