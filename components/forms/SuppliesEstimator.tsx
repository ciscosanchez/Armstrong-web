'use client';

import { useReducer } from 'react';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface RoomConfig {
  label: string;
  key: string;
  icon: string;
  count: number;
}

interface State {
  step: 'rooms' | 'results';
  rooms: RoomConfig[];
  fragile: boolean;
  hasArt: boolean;
  hasElectronics: boolean;
}

type Action =
  | { type: 'SET_ROOM'; key: string; count: number }
  | { type: 'TOGGLE_FRAGILE' }
  | { type: 'TOGGLE_ART' }
  | { type: 'TOGGLE_ELECTRONICS' }
  | { type: 'CALCULATE' }
  | { type: 'RESET' };

// ---------------------------------------------------------------------------
// Supply calculation
// ---------------------------------------------------------------------------
interface SupplyResult {
  label: string;
  qty: number;
  unit: string;
}

const PER_ROOM: Record<
  string,
  { small: number; medium: number; large: number; paper: number; tape: number }
> = {
  bedroom: { small: 8, medium: 6, large: 4, paper: 5, tape: 2 },
  bathroom: { small: 6, medium: 2, large: 0, paper: 3, tape: 1 },
  kitchen: { small: 10, medium: 5, large: 2, paper: 10, tape: 3 },
  living_room: { small: 5, medium: 8, large: 6, paper: 4, tape: 2 },
  dining_room: { small: 4, medium: 4, large: 2, paper: 4, tape: 2 },
  office: { small: 8, medium: 6, large: 2, paper: 3, tape: 2 },
  garage: { small: 4, medium: 6, large: 8, paper: 2, tape: 2 },
  storage_room: { small: 4, medium: 6, large: 6, paper: 2, tape: 2 },
};

function calculateSupplies(state: State): SupplyResult[] {
  let small = 0,
    medium = 0,
    large = 0,
    paper = 0,
    tape = 0;

  for (const room of state.rooms) {
    if (room.count === 0) continue;
    const rates = PER_ROOM[room.key] ?? { small: 4, medium: 4, large: 2, paper: 2, tape: 1 };
    small += rates.small * room.count;
    medium += rates.medium * room.count;
    large += rates.large * room.count;
    paper += rates.paper * room.count;
    tape += rates.tape * room.count;
  }

  // Add-ons
  if (state.fragile) {
    small += 8;
    paper += 10;
    tape += 2;
  }
  if (state.hasArt) {
    large += 4;
    paper += 6;
    tape += 2;
  }
  if (state.hasElectronics) {
    small += 4;
    medium += 2;
    paper += 4;
  }

  // Add 15% buffer
  const buf = (n: number) => Math.ceil(n * 1.15);

  return [
    { label: 'Small boxes (1.5 cu ft)', qty: buf(small), unit: 'boxes' },
    { label: 'Medium boxes (3 cu ft)', qty: buf(medium), unit: 'boxes' },
    { label: 'Large boxes (4.5 cu ft)', qty: buf(large), unit: 'boxes' },
    { label: 'Packing paper', qty: buf(paper), unit: 'lbs' },
    { label: 'Packing tape (60yd rolls)', qty: buf(tape), unit: 'rolls' },
    {
      label: 'Bubble wrap (12" × 30ft)',
      qty: state.fragile || state.hasArt ? 4 : 2,
      unit: 'rolls',
    },
    {
      label: 'Mattress bags',
      qty: state.rooms.find((r) => r.key === 'bedroom')?.count ?? 0,
      unit: 'bags',
    },
    {
      label: 'Wardrobe boxes',
      qty: Math.ceil((state.rooms.find((r) => r.key === 'bedroom')?.count ?? 0) * 1.5),
      unit: 'boxes',
    },
    { label: 'Furniture pads / blankets', qty: 12, unit: 'pads' },
    { label: 'Permanent markers', qty: 4, unit: 'pack' },
  ].filter((s) => s.qty > 0);
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
const ROOM_DEFS: Omit<RoomConfig, 'count'>[] = [
  { key: 'bedroom', label: 'Bedrooms', icon: '🛏' },
  { key: 'bathroom', label: 'Bathrooms', icon: '🚿' },
  { key: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { key: 'living_room', label: 'Living rooms', icon: '🛋' },
  { key: 'dining_room', label: 'Dining rooms', icon: '🪑' },
  { key: 'office', label: 'Home offices', icon: '💻' },
  { key: 'garage', label: 'Garages', icon: '🚗' },
  { key: 'storage_room', label: 'Storage rooms', icon: '📦' },
];

const INITIAL: State = {
  step: 'rooms',
  rooms: ROOM_DEFS.map((r) => ({ ...r, count: 0 })),
  fragile: false,
  hasArt: false,
  hasElectronics: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ROOM':
      return {
        ...state,
        rooms: state.rooms.map((r) =>
          r.key === action.key ? { ...r, count: Math.max(0, action.count) } : r,
        ),
      };
    case 'TOGGLE_FRAGILE':
      return { ...state, fragile: !state.fragile };
    case 'TOGGLE_ART':
      return { ...state, hasArt: !state.hasArt };
    case 'TOGGLE_ELECTRONICS':
      return { ...state, hasElectronics: !state.hasElectronics };
    case 'CALCULATE':
      return { ...state, step: 'results' };
    case 'RESET':
      return { ...INITIAL };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function SuppliesEstimator() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const totalRooms = state.rooms.reduce((s, r) => s + r.count, 0);

  if (state.step === 'results') {
    const results = calculateSupplies(state);
    return (
      <div>
        <div className="bg-armstrong-dark-blue mb-8 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold">Your estimated packing list</h2>
          <p className="text-armstrong-grey-2 mt-1 text-sm">
            Includes a 15% buffer so you don&apos;t run short on move day.
          </p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {results.map((item) => (
            <div
              key={item.label}
              className="border-armstrong-grey-3 flex items-center justify-between rounded-xl border bg-white px-5 py-4 shadow-sm"
            >
              <span className="text-armstrong-dark-blue text-sm font-medium">{item.label}</span>
              <span className="text-armstrong-blue text-lg font-bold">
                {item.qty}{' '}
                <span className="text-armstrong-grey-1 text-sm font-normal">{item.unit}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="border-armstrong-blue/20 rounded-xl border bg-blue-50 p-6">
          <p className="text-armstrong-dark-blue text-sm font-semibold">
            Need the actual supplies?
          </p>
          <p className="text-armstrong-grey-1 mt-1 text-sm">
            Armstrong can provide all packing materials as part of your move package — no separate
            shipping required.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/get-moving-with-armstrong"
              className="bg-armstrong-blue inline-block rounded-md px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0090d0]"
            >
              Book a Move & Supplies Package
            </Link>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 inline-block rounded-md border px-5 py-2.5 text-sm font-semibold"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-armstrong-grey-3 mb-8 rounded-xl p-6">
        <h2 className="text-armstrong-dark-blue mb-1 text-lg font-semibold">
          Step 1: How many of each room?
        </h2>
        <p className="text-armstrong-grey-1 text-sm">
          Set the count to 0 for rooms that don&apos;t apply to your move.
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {state.rooms.map((room) => (
          <div
            key={room.key}
            className="border-armstrong-grey-3 flex items-center justify-between rounded-xl border bg-white px-4 py-3"
          >
            <span className="text-armstrong-dark-blue flex items-center gap-2 text-sm font-medium">
              <span aria-hidden="true">{room.icon}</span>
              {room.label}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch({ type: 'SET_ROOM', key: room.key, count: room.count - 1 })}
                disabled={room.count === 0}
                aria-label={`Decrease ${room.label}`}
                className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-30"
              >
                −
              </button>
              <span className="text-armstrong-dark-blue w-6 text-center text-sm font-bold">
                {room.count}
              </span>
              <button
                onClick={() => dispatch({ type: 'SET_ROOM', key: room.key, count: room.count + 1 })}
                aria-label={`Increase ${room.label}`}
                className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 flex h-8 w-8 items-center justify-center rounded-full border"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-armstrong-dark-blue mb-4 text-lg font-semibold">
          Step 2: Anything special?
        </h2>
        <div className="space-y-3">
          {(
            [
              {
                key: 'TOGGLE_FRAGILE',
                label: 'I have fragile items (china, glassware, ceramics)',
                checked: state.fragile,
              },
              {
                key: 'TOGGLE_ART',
                label: 'I have artwork, mirrors, or framed prints',
                checked: state.hasArt,
              },
              {
                key: 'TOGGLE_ELECTRONICS',
                label: 'I have TVs, monitors, or other large electronics',
                checked: state.hasElectronics,
              },
            ] as const
          ).map((opt) => (
            <label
              key={opt.key}
              className="border-armstrong-grey-3 flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3"
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={() => dispatch({ type: opt.key })}
                className="text-armstrong-blue focus:ring-armstrong-blue h-4 w-4 rounded border-gray-300"
              />
              <span className="text-armstrong-dark-blue text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: 'CALCULATE' })}
        disabled={totalRooms === 0}
        className="bg-armstrong-blue w-full rounded-lg py-3 font-semibold text-white transition-opacity hover:bg-[#0090d0] disabled:opacity-40"
      >
        {totalRooms === 0 ? 'Add at least one room to continue' : 'Calculate My Supply List'}
      </button>
    </div>
  );
}
