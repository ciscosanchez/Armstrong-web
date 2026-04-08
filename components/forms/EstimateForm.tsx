'use client';

import { useReducer } from 'react';
import type { EstimateInput, EstimateResult } from '@/lib/validations/estimate';
import { useTracking } from '@/components/tracking/TrackingProvider';

// ── State machine ─────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

interface WizardState {
  step: Step;
  data: Partial<EstimateInput>;
  result: EstimateResult | null;
  error: string | null;
  loading: boolean;
}

type WizardAction =
  | { type: 'SET_FIELD'; field: keyof EstimateInput; value: EstimateInput[keyof EstimateInput] }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_RESULT'; result: EstimateResult }
  | { type: 'SET_ERROR'; message: string };

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, data: { ...state.data, [action.field]: action.value }, error: null };
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, 5) as Step };
    case 'BACK':
      return { ...state, step: Math.max(state.step - 1, 1) as Step, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'SET_RESULT':
      return { ...state, result: action.result, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.message, loading: false };
    default:
      return state;
  }
}

const INITIAL_STATE: WizardState = {
  step: 1,
  data: { addOns: { packing: false, storage: false, piano: false, vehicle: false, art: false } },
  result: null,
  error: null,
  loading: false,
};

const STEP_LABELS: Record<Step, string> = {
  1: 'Move type',
  2: 'Locations',
  3: 'Home size',
  4: 'Date & add-ons',
  5: 'Your estimate',
};

// ── Component ─────────────────────────────────────────────

export function EstimateForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { track } = useTracking();

  const setField = (field: keyof EstimateInput, value: EstimateInput[keyof EstimateInput]) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const next = () => dispatch({ type: 'NEXT' });
  const back = () => dispatch({ type: 'BACK' });

  const submit = async () => {
    dispatch({ type: 'SET_LOADING', value: true });
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.data),
      });
      if (!res.ok) throw new Error('Estimate failed');
      const result = (await res.json()) as EstimateResult;
      dispatch({ type: 'SET_RESULT', result });
      dispatch({ type: 'NEXT' });
      track({
        event: 'estimate_complete',
        moveType: state.data.moveType ?? 'unknown',
        estimateLow: result.low,
        estimateHigh: result.high,
      });
    } catch {
      dispatch({ type: 'SET_ERROR', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="border-armstrong-grey-3 rounded-xl border bg-white p-6 shadow-sm">
      {/* Progress bar */}
      {state.step < 5 && (
        <div className="mb-6">
          <div className="text-armstrong-grey-1 mb-2 flex justify-between text-xs">
            {([1, 2, 3, 4] as Step[]).map((s) => (
              <span key={s} className={state.step >= s ? 'text-armstrong-blue font-semibold' : ''}>
                {STEP_LABELS[s]}
              </span>
            ))}
          </div>
          <div className="bg-armstrong-grey-3 h-1.5 rounded-full">
            <div
              className="bg-armstrong-blue h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((state.step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps */}
      {state.step === 1 && <Step1 data={state.data} setField={setField} onNext={next} />}
      {state.step === 2 && (
        <Step2 data={state.data} setField={setField} onNext={next} onBack={back} />
      )}
      {state.step === 3 && (
        <Step3 data={state.data} setField={setField} onNext={next} onBack={back} />
      )}
      {state.step === 4 && (
        <Step4
          data={state.data}
          setField={setField}
          onSubmit={submit}
          onBack={back}
          loading={state.loading}
          error={state.error}
        />
      )}
      {state.step === 5 && state.result && <ResultStep result={state.result} data={state.data} />}
    </div>
  );
}

// ── Step components ────────────────────────────────────────

function Step1({
  data,
  setField,
  onNext,
}: {
  data: Partial<EstimateInput>;
  setField: (f: keyof EstimateInput, v: EstimateInput[keyof EstimateInput]) => void;
  onNext: () => void;
}) {
  const options = [
    { value: 'residential', label: 'Residential', description: "I'm moving my home" },
    { value: 'commercial', label: 'Commercial', description: "I'm moving my business" },
    { value: 'supply-chain', label: 'Supply Chain', description: 'I need logistics support' },
  ] as const;

  return (
    <div>
      <h2 className="text-armstrong-dark-blue mb-1 text-xl font-semibold">What are you moving?</h2>
      <p className="text-armstrong-grey-1 mb-5 text-sm">Select the type of move you need.</p>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`moveType-${opt.value}`}
            aria-label={opt.label}
            className={[
              'flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-colors',
              data.moveType === opt.value
                ? 'border-armstrong-blue bg-blue-50'
                : 'border-armstrong-grey-3 hover:border-armstrong-blue/50',
            ].join(' ')}
          >
            <input
              id={`moveType-${opt.value}`}
              type="radio"
              name="moveType"
              value={opt.value}
              checked={data.moveType === opt.value}
              onChange={() => setField('moveType', opt.value)}
              className="sr-only"
            />
            <div
              className={`h-4 w-4 shrink-0 rounded-full border-2 ${data.moveType === opt.value ? 'border-armstrong-blue bg-armstrong-blue' : 'border-armstrong-grey-2'}`}
            />
            <div>
              <p className="text-armstrong-dark-blue font-semibold">{opt.label}</p>
              <p className="text-armstrong-grey-1 text-sm">{opt.description}</p>
            </div>
          </label>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!data.moveType}
        className="bg-armstrong-blue mt-5 w-full rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}

function Step2({
  data,
  setField,
  onNext,
  onBack,
}: {
  data: Partial<EstimateInput>;
  setField: (f: keyof EstimateInput, v: EstimateInput[keyof EstimateInput]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = /^\d{5}$/.test(data.originZip ?? '') && /^\d{5}$/.test(data.destZip ?? '');
  return (
    <div>
      <h2 className="text-armstrong-dark-blue mb-1 text-xl font-semibold">Where are you moving?</h2>
      <p className="text-armstrong-grey-1 mb-5 text-sm">
        We&apos;ll use your ZIP codes to estimate the distance.
      </p>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="est-origin"
            className="text-armstrong-dark-blue mb-1 block text-sm font-medium"
          >
            Moving from (ZIP code)
          </label>
          <input
            id="est-origin"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={data.originZip ?? ''}
            onChange={(e) => setField('originZip', e.target.value)}
            placeholder="e.g. 38118"
            className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue w-full rounded-md border px-3 py-2.5 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="est-dest"
            className="text-armstrong-dark-blue mb-1 block text-sm font-medium"
          >
            Moving to (ZIP code)
          </label>
          <input
            id="est-dest"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={data.destZip ?? ''}
            onChange={(e) => setField('destZip', e.target.value)}
            placeholder="e.g. 60148"
            className="border-armstrong-grey-3 text-armstrong-dark-blue focus:border-armstrong-blue w-full rounded-md border px-3 py-2.5 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          onClick={onBack}
          className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex-1 rounded-md border px-4 py-3 font-medium"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="bg-armstrong-blue flex-[2] rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Step3({
  data,
  setField,
  onNext,
  onBack,
}: {
  data: Partial<EstimateInput>;
  setField: (f: keyof EstimateInput, v: EstimateInput[keyof EstimateInput]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const sizes = [
    { value: 'studio', label: 'Studio / Efficiency' },
    { value: '1br', label: '1 Bedroom' },
    { value: '2br', label: '2 Bedrooms' },
    { value: '3br', label: '3 Bedrooms' },
    { value: '4br+', label: '4+ Bedrooms' },
    { value: 'office', label: 'Office / Commercial space' },
  ] as const;

  return (
    <div>
      <h2 className="text-armstrong-dark-blue mb-1 text-xl font-semibold">
        How big is your place?
      </h2>
      <p className="text-armstrong-grey-1 mb-5 text-sm">This helps us estimate volume.</p>
      <div className="grid grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => setField('homeSizeTier', size.value)}
            className={[
              'rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors',
              data.homeSizeTier === size.value
                ? 'border-armstrong-blue text-armstrong-dark-blue bg-blue-50'
                : 'border-armstrong-grey-3 text-armstrong-grey-1 hover:border-armstrong-blue/50',
            ].join(' ')}
          >
            {size.label}
          </button>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <button
          onClick={onBack}
          className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex-1 rounded-md border px-4 py-3 font-medium"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.homeSizeTier}
          className="bg-armstrong-blue flex-[2] rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Step4({
  data,
  setField,
  onSubmit,
  onBack,
  loading,
  error,
}: {
  data: Partial<EstimateInput>;
  setField: (f: keyof EstimateInput, v: EstimateInput[keyof EstimateInput]) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}) {
  const addOns = data.addOns ?? {
    packing: false,
    storage: false,
    piano: false,
    vehicle: false,
    art: false,
  };

  const toggleAddOn = (key: keyof typeof addOns) =>
    setField('addOns', { ...addOns, [key]: !addOns[key] });

  const ADD_ON_OPTIONS = [
    { key: 'packing' as const, label: 'Full packing service', price: '+~$600' },
    { key: 'storage' as const, label: 'Storage (1 month)', price: '+~$300' },
    { key: 'piano' as const, label: 'Piano or organ', price: '+~$400' },
    { key: 'vehicle' as const, label: 'Vehicle transport', price: '+~$800' },
    { key: 'art' as const, label: 'Art & antiques', price: '+~$500' },
  ];

  return (
    <div>
      <h2 className="text-armstrong-dark-blue mb-1 text-xl font-semibold">Any add-ons?</h2>
      <p className="text-armstrong-grey-1 mb-5 text-sm">
        Select any extras — we&apos;ll factor them in.
      </p>

      <div className="mb-5 space-y-2">
        {ADD_ON_OPTIONS.map(({ key, label, price }) => (
          <label
            key={key}
            className="border-armstrong-grey-3 hover:bg-armstrong-grey-3 flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={addOns[key]}
                onChange={() => toggleAddOn(key)}
                className="h-4 w-4"
              />
              <span className="text-armstrong-dark-blue text-sm font-medium">{label}</span>
            </div>
            <span className="text-armstrong-grey-1 text-xs">{price}</span>
          </label>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex-1 rounded-md border px-4 py-3 font-medium"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="bg-armstrong-blue flex-[2] rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Calculating…' : 'Get My Estimate →'}
        </button>
      </div>
    </div>
  );
}

function ResultStep({ result, data }: { result: EstimateResult; data: Partial<EstimateInput> }) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div>
      <p className="text-armstrong-blue mb-1 text-sm font-semibold tracking-wider uppercase">
        Your Ballpark Estimate
      </p>
      <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-bold">
        {fmt(result.low)} – {fmt(result.high)}
      </h2>

      <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
        <div className="border-armstrong-grey-3 rounded-lg border p-3">
          <p className="text-armstrong-grey-1 text-xs">Estimated distance</p>
          <p className="text-armstrong-dark-blue font-semibold">
            {result.distanceMiles.toLocaleString()} miles
          </p>
        </div>
        {result.isPeakSeason && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs text-amber-700">Peak season pricing</p>
            <p className="text-xs font-medium text-amber-800">May–Aug premium applied</p>
          </div>
        )}
      </div>

      <p className="bg-armstrong-grey-3 text-armstrong-grey-1 mb-6 rounded-md px-4 py-3 text-xs">
        {result.disclaimer}
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={`/get-moving-with-armstrong?type=${data.moveType ?? 'residential'}&origin=${data.originZip ?? ''}&dest=${data.destZip ?? ''}`}
          className="bg-armstrong-blue block rounded-md px-6 py-3 text-center font-semibold text-white hover:bg-[#0090d0]"
        >
          Get an exact quote
        </a>
        <a
          href="/virtual-survey"
          className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 block rounded-md border px-6 py-3 text-center font-semibold"
        >
          Schedule a survey
        </a>
      </div>
    </div>
  );
}
