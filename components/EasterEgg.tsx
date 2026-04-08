'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EasterEgg — type "HILLARY" anywhere to summon the Armstrong truck.
 *
 * Visual: the actual armstrong-symbol.png rendered at 20% opacity as a track.
 * Track path: mirrored C-arcs (curves on RIGHT, open ends on LEFT) stitched
 *   into one closed loop — outer → bridge → middle reversed → bridge → inner → bridge home.
 * The bridges are straight segments on the LEFT side where the arcs are open.
 *
 * Cab is on the truck's +x axis. SVG animateMotion rotate="auto" aligns +x
 * with the direction of travel, so the cab always leads.
 *
 * Dismiss: button click OR any mouse move outside the card.
 */

const TRIGGER = 'HILLARY';

/**
 * Mirrored arc paths — curves on RIGHT, open on LEFT.
 * These match the orientation of the real armstrong-symbol.png.
 *
 * Outer:  M10,8  H78 Q92,8  92,22 V78 Q92,92 78,92 H10
 * Middle: M10,24 H66 Q78,24 78,34 V66 Q78,76 66,76 H10
 * Inner:  M10,40 H52 Q60,40 60,48 V52 Q60,60 52,60 H10
 *
 * Combined loop — visits all three arcs in one continuous closed path:
 *   1. Outer arc (top-left → right curve → bottom-left)
 *   2. Bridge LEFT side: (10,92) → (10,76)       — connects outer-bottom to middle-bottom
 *   3. Middle arc REVERSED (bottom-left → right curve → top-left)
 *   4. Bridge LEFT side: (10,24) → (10,40)       — connects middle-top to inner-top
 *   5. Inner arc (top-left → right curve → bottom-left)
 *   6. Bridge LEFT side: (10,60) → (10,8)        — closes back to outer-top
 */
const LOOP_TRACK =
  // 1. Outer arc
  'M10,8 H78 Q92,8 92,22 V78 Q92,92 78,92 H10 ' +
  // 2. Bridge to middle-bottom
  'L10,76 ' +
  // 3. Middle arc reversed
  'H66 Q78,76 78,66 V34 Q78,24 66,24 H10 ' +
  // 4. Bridge to inner-top
  'L10,40 ' +
  // 5. Inner arc
  'H52 Q60,40 60,48 V52 Q60,60 52,60 H10 ' +
  // 6. Bridge back to outer-top — closes loop
  'L10,8 Z';

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
          SVG container — viewBox 0 0 100 100.

          Layer 1: The actual Armstrong symbol PNG, lightened to 20% opacity.
                   This IS the visual track — we don't draw any extra SVG strokes.
          Layer 2: Hidden <path> that defines the animation route for animateMotion.
          Layer 3: The truck, animated along the loop.
        */}
        <div className="h-80 w-80">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* ── Layer 1: The real Armstrong symbol, faded ─────────────── */}
            <image
              href="/images/armstrong-symbol.png"
              x="0"
              y="0"
              width="100"
              height="100"
              opacity="0.2"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* ── Layer 2: Hidden animation track ───────────────────────── */}
            <path id="ee-loop" d={LOOP_TRACK} fill="none" stroke="none" />

            {/*
              ── Layer 3: Truck ─────────────────────────────────────────────
              Cab on +x axis so rotate="auto" keeps the front leading.
              scale(0.22) — sized to fit through the narrow inner arc.

              1× layout:
                Cargo box (back):   x = −22 … −2
                Cab (front, +x):    x = −2  … +14
                Wheels:             cx = −12, cx = +8
            */}
            <g id="ee-truck" transform="scale(0.22)">
              {/* Cargo box */}
              <rect x="-22" y="-9" width="20" height="13" rx="1" fill="#ffffff" />
              {/* Armstrong-blue stripe */}
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

            {/* Animate truck — 7 s per full outer + middle + inner circuit */}
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
