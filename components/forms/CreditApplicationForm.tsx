'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

const schema = z.object({
  companyName: z.string().min(2, 'Company name required'),
  contactName: z.string().min(2, 'Contact name required'),
  title: z.string().min(1, 'Title required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  address: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City required'),
  state: z.string().length(2, '2-letter state code'),
  zip: z.string().regex(/^\d{5}$/, '5-digit ZIP'),
  federalTaxId: z
    .string()
    .regex(/^\d{2}-\d{7}$/, 'Format: XX-XXXXXXX')
    .optional()
    .or(z.literal('')),
  yearsInBusiness: z.string().min(1, 'Required'),
  annualRevenue: z.enum(['under_500k', '500k_2m', '2m_10m', 'over_10m'], {
    required_error: 'Select a range',
  }),
  requestedTerms: z.enum(['net30', 'net60'], { required_error: 'Select terms' }),
  requestedLimit: z.enum(['5000', '10000', '25000', '50000', 'custom'], {
    required_error: 'Select a limit',
  }),
  tradeReference1Name: z.string().min(2, 'Reference name required'),
  tradeReference1Phone: z.string().min(10, 'Valid phone required'),
  tradeReference2Name: z.string().min(2, 'Reference name required'),
  tradeReference2Phone: z.string().min(10, 'Valid phone required'),
  signature: z.string().min(2, 'Electronic signature required'),
  agreeTerms: z.boolean().refine((v) => v === true, 'You must agree to the terms'),
  // Honeypot
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export function CreditApplicationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (data.website) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.contactName.split(' ')[0] ?? data.contactName,
          lastName: data.contactName.split(' ').slice(1).join(' ') || '-',
          email: data.email,
          phone: data.phone,
          company: data.companyName,
          leadType: 'COMMERCIAL',
          source: 'credit_application',
          message: `Credit application: ${data.requestedTerms} / $${data.requestedLimit}. Tax ID: ${data.federalTaxId ?? 'N/A'}. Annual revenue: ${data.annualRevenue}.`,
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
          Application received!
        </h3>
        <p className="text-armstrong-grey-1">
          Our accounts team will review your application within 2 business days and reach out to you
          directly.
        </p>
      </div>
    );
  }

  const Field = ({
    id,
    label,
    error,
    children,
  }: {
    id: string;
    label: string;
    error: string | undefined;
    children: React.ReactNode;
  }) => (
    <div>
      <label htmlFor={id} className="text-armstrong-dark-blue mb-1 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );

  const inputCls =
    'w-full rounded-lg border border-armstrong-grey-3 px-3 py-2.5 text-sm focus:border-armstrong-blue focus:outline-none focus:ring-1 focus:ring-armstrong-blue';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <input
        type="text"
        {...register('website')}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Company Info */}
      <fieldset className="space-y-4">
        <legend className="text-armstrong-dark-blue border-armstrong-grey-3 mb-4 w-full border-b pb-2 text-lg font-semibold">
          Company Information
        </legend>
        <Field id="companyName" label="Company name" error={errors.companyName?.message}>
          <input id="companyName" {...register('companyName')} className={inputCls} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field id="contactName" label="Primary contact" error={errors.contactName?.message}>
            <input id="contactName" {...register('contactName')} className={inputCls} />
          </Field>
          <Field id="title" label="Title" error={errors.title?.message}>
            <input id="title" {...register('title')} className={inputCls} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field id="email" label="Email" error={errors.email?.message}>
            <input id="email" type="email" {...register('email')} className={inputCls} />
          </Field>
          <Field id="phone" label="Phone" error={errors.phone?.message}>
            <input id="phone" type="tel" {...register('phone')} className={inputCls} />
          </Field>
        </div>
        <Field id="address" label="Business address" error={errors.address?.message}>
          <input id="address" {...register('address')} className={inputCls} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Field id="city" label="City" error={errors.city?.message}>
              <input id="city" {...register('city')} className={inputCls} />
            </Field>
          </div>
          <Field id="state" label="State" error={errors.state?.message}>
            <select id="state" {...register('state')} className={inputCls}>
              <option value="">ST</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field id="zip" label="ZIP code" error={errors.zip?.message}>
            <input id="zip" {...register('zip')} maxLength={5} className={inputCls} />
          </Field>
          <Field
            id="federalTaxId"
            label="Federal Tax ID (optional)"
            error={errors.federalTaxId?.message}
          >
            <input
              id="federalTaxId"
              {...register('federalTaxId')}
              placeholder="XX-XXXXXXX"
              className={inputCls}
            />
          </Field>
        </div>
      </fieldset>

      {/* Financial Info */}
      <fieldset className="space-y-4">
        <legend className="text-armstrong-dark-blue border-armstrong-grey-3 mb-4 w-full border-b pb-2 text-lg font-semibold">
          Financial Information
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Field
            id="yearsInBusiness"
            label="Years in business"
            error={errors.yearsInBusiness?.message}
          >
            <input
              id="yearsInBusiness"
              {...register('yearsInBusiness')}
              type="number"
              min="0"
              className={inputCls}
            />
          </Field>
          <Field id="annualRevenue" label="Annual revenue" error={errors.annualRevenue?.message}>
            <select id="annualRevenue" {...register('annualRevenue')} className={inputCls}>
              <option value="">Select...</option>
              <option value="under_500k">Under $500K</option>
              <option value="500k_2m">$500K – $2M</option>
              <option value="2m_10m">$2M – $10M</option>
              <option value="over_10m">Over $10M</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field id="requestedTerms" label="Requested terms" error={errors.requestedTerms?.message}>
            <select id="requestedTerms" {...register('requestedTerms')} className={inputCls}>
              <option value="">Select...</option>
              <option value="net30">Net 30</option>
              <option value="net60">Net 60</option>
            </select>
          </Field>
          <Field
            id="requestedLimit"
            label="Credit limit requested"
            error={errors.requestedLimit?.message}
          >
            <select id="requestedLimit" {...register('requestedLimit')} className={inputCls}>
              <option value="">Select...</option>
              <option value="5000">Up to $5,000</option>
              <option value="10000">Up to $10,000</option>
              <option value="25000">Up to $25,000</option>
              <option value="50000">Up to $50,000</option>
              <option value="custom">Custom (we&apos;ll discuss)</option>
            </select>
          </Field>
        </div>
      </fieldset>

      {/* Trade References */}
      <fieldset className="space-y-4">
        <legend className="text-armstrong-dark-blue border-armstrong-grey-3 mb-4 w-full border-b pb-2 text-lg font-semibold">
          Trade References (2 required)
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Field
            id="tradeReference1Name"
            label="Reference 1 — Company"
            error={errors.tradeReference1Name?.message}
          >
            <input
              id="tradeReference1Name"
              {...register('tradeReference1Name')}
              className={inputCls}
            />
          </Field>
          <Field
            id="tradeReference1Phone"
            label="Reference 1 — Phone"
            error={errors.tradeReference1Phone?.message}
          >
            <input
              id="tradeReference1Phone"
              type="tel"
              {...register('tradeReference1Phone')}
              className={inputCls}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field
            id="tradeReference2Name"
            label="Reference 2 — Company"
            error={errors.tradeReference2Name?.message}
          >
            <input
              id="tradeReference2Name"
              {...register('tradeReference2Name')}
              className={inputCls}
            />
          </Field>
          <Field
            id="tradeReference2Phone"
            label="Reference 2 — Phone"
            error={errors.tradeReference2Phone?.message}
          >
            <input
              id="tradeReference2Phone"
              type="tel"
              {...register('tradeReference2Phone')}
              className={inputCls}
            />
          </Field>
        </div>
      </fieldset>

      {/* Signature */}
      <fieldset className="space-y-4">
        <legend className="text-armstrong-dark-blue border-armstrong-grey-3 mb-4 w-full border-b pb-2 text-lg font-semibold">
          Agreement &amp; Signature
        </legend>
        <div className="border-armstrong-grey-3 bg-armstrong-grey-3 text-armstrong-grey-1 rounded-xl border p-4 text-xs leading-relaxed">
          By submitting this application, I certify that the information provided is accurate and
          complete. I authorize Armstrong to verify the information on this application, including
          contacting the trade references provided. Approval of credit terms is subject to
          Armstrong&apos;s review and is not guaranteed.
        </div>
        <Field
          id="signature"
          label="Electronic signature (type your full name)"
          error={errors.signature?.message}
        >
          <input
            id="signature"
            {...register('signature')}
            placeholder="Your full name"
            className={`${inputCls} italic`}
          />
        </Field>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('agreeTerms')}
            className="text-armstrong-blue focus:ring-armstrong-blue mt-0.5 h-4 w-4 rounded border-gray-300"
          />
          <span className="text-armstrong-grey-1 text-sm">
            I agree to the terms above and authorize Armstrong to process this application.
          </span>
        </label>
        {errors.agreeTerms && <p className="text-xs text-red-600">{errors.agreeTerms.message}</p>}
      </fieldset>

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
        {status === 'submitting' ? 'Submitting...' : 'Submit Credit Application'}
      </button>
    </form>
  );
}
