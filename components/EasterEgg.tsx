'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EasterEgg — type "HILLARY" anywhere to summon the Armstrong truck.
 *
 * Track: the three C-arcs from armstrong-logo.svg stitched into one closed loop.
 *   Outer arc  → straight bridge (right side, going down) →
 *   Middle arc (reversed) → straight bridge (going down) →
 *   Inner arc  → straight bridge (going up, back to outer start)
 *
 * The logo symbol is drawn as a faded backdrop; the truck animates over it.
 * Dismisses on button click OR any mouse move outside the card.
 */

const TRIGGER = 'HILLARY';

// Exact path data copied from public/images/armstrong-logo.svg (viewBox 0 0 100 100 region)
const OUTER = 'M90,8 H22 Q8,8 8,22 V78 Q8,92 22,92 H90';
const MIDDLE = 'M90,24 H34 Q22,24 22,34 V66 Q22,76 34,76 H90';
const INNER = 'M90,40 H48 Q40,40 40,48 V52 Q40,60 48,60 H90';

/**
 * One continuous closed track that visits all three arcs:
 *   1. Outer arc (top-right → around left → bottom-right)
 *   2. Bridge: straight line up the right gap from outer-bottom to middle-bottom
 *   3. Middle arc reversed (bottom-right → around left → top-right)
 *   4. Bridge: straight line down to inner-top
 *   5. Inner arc (top-right → around left → bottom-right)
 *   6. Bridge: straight line back up to outer-top — closes the loop
 */
const LOOP_TRACK =
  // 1. Outer arc
  'M90,8 H22 Q8,8 8,22 V78 Q8,92 22,92 H90 ' +
  // 2. Bridge to middle-bottom (right side, going up)
  'L90,76 ' +
  // 3. Middle arc — reversed so truck continues forward without a U-turn
  'H34 Q22,76 22,66 V34 Q22,24 34,24 H90 ' +
  // 4. Bridge to inner-top (right side, going down)
  'L90,40 ' +
  // 5. Inner arc
  'H48 Q40,40 40,48 V52 Q40,60 48,60 H90 ' +
  // 6. Bridge back to outer-top — closes the loop
  'L90,8 Z';

export function EasterEgg() {
  const [visible, setVisible] = useState(false);
  const bufferRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      bufferRef.current += e.key.toUpperCase();
      if (bufferRef.current.length > TRIGGER.length) {
        bufferRef.current = bufferRef.current.slice(-TRIGGER.length);
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        bufferRef.current = '';
      }, 2000);

      if (bufferRef.current === TRIGGER) {
        bufferRef.current = '';
        setVisible(true);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function dismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="bg-armstrong-dark-blue/85 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
      onMouseMove={dismiss}
      aria-modal="true"
      role="dialog"
      aria-label="Easter egg"
    >
      <div className="flex flex-col items-center gap-6" onMouseMove={(e) => e.stopPropagation()}>
        <p className="text-armstrong-blue text-sm font-semibold tracking-widest uppercase">
          You found it 🚛
        </p>

        {/*
          SVG display — viewBox matches the logo symbol coordinate space (0 0 100 100).
          Layer 1 (behind): the three C-arcs drawn faded — this IS the logo.
          Layer 2 (hidden): the combined loop path used only for animateMotion.
          Layer 3 (front):  the truck, animated along the loop.
        */}
        <div className="h-80 w-80">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* ── Layer 1: The Armstrong symbol — faded backdrop ─────────── */}
            {/* Outer C-arc */}
            <path
              d={OUTER}
              stroke="#00A4EB"
              strokeWidth="5"
              strokeLinecap="butt"
              fill="none"
              opacity="0.25"
            />
            {/* Middle C-arc */}
            <path
              d={MIDDLE}
              stroke="#00A4EB"
              strokeWidth="5"
              strokeLinecap="butt"
              fill="none"
              opacity="0.25"
            />
            {/* Inner C-arc */}
            <path
              d={INNER}
              stroke="#00A4EB"
              strokeWidth="5"
              strokeLinecap="butt"
              fill="none"
              opacity="0.25"
            />

            {/* ── Layer 2: The hidden combined loop track ────────────────── */}
            <path id="ee-loop" d={LOOP_TRACK} fill="none" stroke="none" />

            {/*
              ── Layer 3: Truck ─────────────────────────────────────────────
              Cab is on the +x (right) side so rotate="auto" keeps it facing
              the direction of travel. scale(0.22) fits the truck on the
              narrowest arc (inner, only 20 units tall).

              At 1× layout:
                Box (cargo, back):  x = -22 … -2
                Cab (front, +x):    x = -2  … 14
                Wheels:             cx = -12, cx = 8
            */}
            <g id="ee-truck" transform="scale(0.22)">
              {/* Cargo box */}
              <rect x="-22" y="-9" width="20" height="13" rx="1" fill="#ffffff" />
              {/* Armstrong-blue stripe on box */}
              <rect x="-22" y="-2" width="20" height="4" fill="#00A4EB" />
              {/* Cab */}
              <rect x="-2" y="-9" width="16" height="12" rx="2" fill="#f0f0f0" />
              {/* Windshield */}
              <rect x="6" y="-8" width="5" height="6" rx="1" fill="#00A4EB" opacity="0.85" />
              {/* Rear wheel */}
              <circle cx="-12" cy="5" r="4" fill="#00263F" />
              <circle cx="-12" cy="5" r="2" fill="#d0d0d0" />
              {/* Front wheel */}
              <circle cx="8" cy="5" r="4" fill="#00263F" />
              <circle cx="8" cy="5" r="2" fill="#d0d0d0" />
            </g>

            {/* Animate truck along the full loop — 7 s to cover all three arcs */}
            <use href="#ee-truck">
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#ee-loop" />
              </animateMotion>
            </use>
          </svg>
        </div>

        <p className="text-xs text-white/50">Move your mouse or click to dismiss</p>

        <button
          onClick={dismiss}
          className="bg-armstrong-blue focus:ring-armstrong-blue focus:ring-offset-armstrong-dark-blue rounded-full px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0090d0] focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
