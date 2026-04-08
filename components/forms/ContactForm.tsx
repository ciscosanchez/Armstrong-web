'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormInput } from '@/lib/validations/lead';
import { useTracking } from '@/components/tracking/TrackingProvider';

const MOVE_TYPES = [
  { value: 'residential', label: 'Residential Moving' },
  { value: 'commercial', label: 'Commercial Moving' },
  { value: 'supply-chain', label: 'Supply Chain' },
  { value: 'data-center', label: 'Data Center Logistics' },
] as const;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [leadId, setLeadId] = useState<string | null>(null);
  const { track } = useTracking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { type: 'residential' },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setStatus('submitting');
    track({ event: 'form_start', formId: 'contact', formPage: '/get-moving-with-armstrong' });

    try {
      // Get CSRF token from cookie (set server-side)
      const csrfToken =
        document.cookie
          .split('; ')
          .find((r) => r.startsWith('arm_csrf_readable='))
          ?.split('=')[1] ?? '';

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'X-UTM-Source': new URLSearchParams(window.location.search).get('utm_source') ?? '',
          'X-UTM-Medium': new URLSearchParams(window.location.search).get('utm_medium') ?? '',
          'X-UTM-Campaign': new URLSearchParams(window.location.search).get('utm_campaign') ?? '',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Submission failed: ${res.status}`);
      }

      const result = (await res.json()) as { id: string; status: string };
      setLeadId(result.id);
      setStatus('success');
      track({ event: 'form_start', formId: 'contact', formPage: '/get-moving-with-armstrong' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        data-testid="confirmation-message"
        className="border-armstrong-green-1 bg-armstrong-green-3 text-armstrong-dark-blue rounded-xl border p-8"
      >
        <h2 className="mb-2 text-xl font-semibold">We&apos;ve received your request.</h2>
        <p className="mb-4">
          One of our moving experts will be in touch within 1 business hour. Check your inbox for a
          confirmation email.
        </p>
        <p className="text-armstrong-grey-1 text-sm">Reference ID: {leadId}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href="/ballpark-estimate"
            className="bg-armstrong-blue rounded-md px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0090d0]"
          >
            Get a Ballpark Estimate
          </a>
          <a
            href="/virtual-survey"
            className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded-md border px-5 py-2.5 text-sm font-semibold"
          >
            Schedule a Survey
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        {...register('_website')}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Move type */}
      <div>
        <label htmlFor="type" className="text-armstrong-dark-blue mb-1 block text-sm font-medium">
          Move type{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <select
          id="type"
          {...register('type')}
          className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border bg-white px-3 py-2.5 focus:ring-2 focus:outline-none"
          aria-required="true"
        >
          {MOVE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
      </div>

      {/* Name row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-armstrong-dark-blue mb-1 block text-sm font-medium"
          >
            First name{' '}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            autoComplete="given-name"
            className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
            aria-required="true"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="text-armstrong-dark-blue mb-1 block text-sm font-medium"
          >
            Last name{' '}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
          </label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            autoComplete="family-name"
            className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
            aria-required="true"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-armstrong-dark-blue mb-1 block text-sm font-medium">
          Email{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          autoComplete="email"
          className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
          aria-required="true"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="text-armstrong-dark-blue mb-1 block text-sm font-medium">
          Phone{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          autoComplete="tel"
          className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
          aria-required="true"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      {/* ZIP codes */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="originZip"
            className="text-armstrong-dark-blue mb-1 block text-sm font-medium"
          >
            Origin ZIP
          </label>
          <input
            id="originZip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            {...register('originZip')}
            className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
          />
          {errors.originZip && (
            <p className="mt-1 text-sm text-red-600">{errors.originZip.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="destZip"
            className="text-armstrong-dark-blue mb-1 block text-sm font-medium"
          >
            Destination ZIP
          </label>
          <input
            id="destZip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            {...register('destZip')}
            className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
          />
          {errors.destZip && <p className="mt-1 text-sm text-red-600">{errors.destZip.message}</p>}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="text-armstrong-dark-blue mb-1 block text-sm font-medium">
          Anything else we should know?
        </label>
        <textarea
          id="notes"
          rows={4}
          {...register('notes')}
          className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue focus:ring-armstrong-blue/20 w-full rounded-md border px-3 py-2.5 focus:ring-2 focus:outline-none"
        />
        {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Something went wrong. Please try again or call us at{' '}
          <a href="tel:+18002887396" className="font-medium underline">
            800-288-7396
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-armstrong-blue w-full rounded-md px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#0090d0] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Get My Free Quote'}
      </button>

      <p className="text-armstrong-grey-1 text-xs">
        By submitting, you agree to our{' '}
        <a href="/crown-privacy-policy" className="hover:text-armstrong-blue underline">
          Privacy Policy
        </a>
        . We&apos;ll never sell your information.
      </p>
    </form>
  );
}
