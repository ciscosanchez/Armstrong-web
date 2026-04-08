'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  moveType: z.enum(['residential', 'commercial', 'other'], {
    required_error: 'Select a move type',
  }),
  originZip: z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP'),
  destinationZip: z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP'),
  preferredDate: z.string().min(1, 'Preferred survey date is required'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], { required_error: 'Select a time' }),
  notes: z.string().max(500).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function VirtualSurveyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (data.website) return; // honeypot
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          leadType: data.moveType === 'commercial' ? 'COMMERCIAL' : 'RESIDENTIAL',
          source: 'virtual_survey',
          message: `Virtual survey request. Preferred: ${data.preferredDate} ${data.preferredTime}. Notes: ${data.notes ?? ''}`,
          cfTurnstileResponse: turnstileToken,
        }),
      });
      if (!res.ok) throw new Error('Submit failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-12 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-armstrong-dark-blue mb-2 text-xl font-semibold">
          Survey request received!
        </h3>
        <p className="text-armstrong-grey-1">
          We&apos;ll send a calendar invite within 1 business day. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        {...register('website')}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="survey-firstName"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            First name
          </label>
          <input
            id="survey-firstName"
            {...register('firstName')}
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="survey-lastName"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Last name
          </label>
          <input
            id="survey-lastName"
            {...register('lastName')}
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="survey-email"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Email
          </label>
          <input
            id="survey-email"
            type="email"
            {...register('email')}
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label
            htmlFor="survey-phone"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Phone
          </label>
          <input
            id="survey-phone"
            type="tel"
            {...register('phone')}
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="survey-moveType"
          className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
        >
          Move type
        </label>
        <select
          id="survey-moveType"
          {...register('moveType')}
          className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
        >
          <option value="">Select...</option>
          <option value="residential">Residential / Household</option>
          <option value="commercial">Commercial / Office</option>
          <option value="other">Other</option>
        </select>
        {errors.moveType && <p className="mt-1 text-xs text-red-600">{errors.moveType.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="survey-originZip"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Origin ZIP
          </label>
          <input
            id="survey-originZip"
            {...register('originZip')}
            maxLength={5}
            placeholder="28201"
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.originZip && (
            <p className="mt-1 text-xs text-red-600">{errors.originZip.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="survey-destinationZip"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Destination ZIP
          </label>
          <input
            id="survey-destinationZip"
            {...register('destinationZip')}
            maxLength={5}
            placeholder="10001"
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.destinationZip && (
            <p className="mt-1 text-xs text-red-600">{errors.destinationZip.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="survey-preferredDate"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Preferred date
          </label>
          <input
            id="survey-preferredDate"
            type="date"
            {...register('preferredDate')}
            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          />
          {errors.preferredDate && (
            <p className="mt-1 text-xs text-red-600">{errors.preferredDate.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="survey-preferredTime"
            className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
          >
            Preferred time
          </label>
          <select
            id="survey-preferredTime"
            {...register('preferredTime')}
            className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
          >
            <option value="">Select...</option>
            <option value="morning">Morning (8am–12pm)</option>
            <option value="afternoon">Afternoon (12pm–5pm)</option>
            <option value="evening">Evening (5pm–7pm)</option>
          </select>
          {errors.preferredTime && (
            <p className="mt-1 text-xs text-red-600">{errors.preferredTime.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="survey-notes"
          className="text-armstrong-dark-blue mb-1 block text-sm font-semibold"
        >
          Additional notes <span className="text-armstrong-grey-1 font-normal">(optional)</span>
        </label>
        <textarea
          id="survey-notes"
          {...register('notes')}
          rows={3}
          placeholder="Anything we should know — special items, access restrictions, timeline details..."
          className="border-armstrong-grey-3 focus:border-armstrong-blue focus:ring-armstrong-blue w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
        />
      </div>

      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken('')} />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-armstrong-blue w-full rounded-lg py-3 font-semibold text-white transition-opacity hover:bg-[#0090d0] disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting...' : 'Schedule My Virtual Survey'}
      </button>

      <p className="text-armstrong-grey-1 text-center text-xs">
        No spam, ever. We&apos;ll only contact you about your survey request.
      </p>
    </form>
  );
}
