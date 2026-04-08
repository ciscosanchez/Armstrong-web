'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EasterEgg — type "HILLARY" anywhere on the page.
 *
 * Visual: the REAL Armstrong A symbol from armstrong-logo-header.svg,
 * rendered inline as Armstrong blue at 50% opacity. No PNG needed —
 * the actual SVG path fills correctly and is clearly visible on the dark overlay.
 *
 * Track geometry (coordinate space: 200×190, which is the logo's 40×38 native
 * viewBox scaled ×5):
 *
 *   1. Outer groove centerline (y=27.5)  ← gap between band-1 and band-2
 *      Goes RIGHT from x=25 to x=155
 *   2. Right-side D-turn: smooth Q-curve through x=185, connecting y=27.5 → y=70
 *      This is the arrow/chevron area of the logo
 *   3. Middle groove / arc entry (y=70)
 *      Goes LEFT from x=155 to x=58.5
 *   4. Big left arc (r=57.5, CCW)
 *      Sweeps from (58.5, 70) around the bottom-left through (≈1, 127.5) to (58.5, 185)
 *   5. Bridge: (58.5,185) → (25,185) → (25,27.5)  ← left-side open ends, closes loop
 *
 * Dismisses on button click OR mouse move outside the inner card.
 */

const TRIGGER = 'HILLARY';

/**
 * Real Armstrong A symbol path — verbatim from armstrong-logo-header.svg
 * (native viewBox 0 0 40 38). Rendered via transform="scale(5)" to fill
 * the 200×190 display space.
 */
const LOGO_PATH =
  'M29.995 3.862H5.001V.5h24.994a9.965 9.965 0 0 1 7.067 2.959 10.149 10.149 0 0 1 2.932 7.131h-3.328a6.766 6.766 0 0 0-1.956-4.757 6.643 6.643 0 0 0-4.715-1.971Z' +
  'm0 3.364H5.001v3.364h28.334a3.386 3.386 0 0 0-.98-2.379 3.324 3.324 0 0 0-2.36-.985Z' +
  'm3.334 6.729H11.666a11.587 11.587 0 0 0-4.47.902 11.672 11.672 0 0 0-3.787 2.56 11.792 11.792 0 0 0-2.527 3.829A11.877 11.877 0 0 0 0 25.759c.02 6.508 5.333 11.73 11.78 11.73h19.888a8.266 8.266 0 0 0 3.189-.64 8.327 8.327 0 0 0 2.703-1.824 8.413 8.413 0 0 0 1.806-2.729A8.476 8.476 0 0 0 40 29.078V27.41h-3.334v1.679a5.083 5.083 0 0 1-1.463 3.568 4.96 4.96 0 0 1-3.535 1.478H11.666a8.27 8.27 0 0 1-3.23-.615 8.33 8.33 0 0 1-2.744-1.829 8.416 8.416 0 0 1-1.83-2.757 8.478 8.478 0 0 1 .036-6.505 8.415 8.415 0 0 1 1.86-2.736 8.327 8.327 0 0 1 2.764-1.798 8.268 8.268 0 0 1 3.238-.579H40l-6.665-6.726-.006 3.365Z' +
  'm6.665 6.726H11.666a4.962 4.962 0 0 0-3.6 1.46 5.049 5.049 0 0 0-1.104 1.658 5.087 5.087 0 0 0 1.15 5.56c.48.467 1.047.832 1.669 1.075a4.961 4.961 0 0 0 1.95.337h19.937a1.66 1.66 0 0 0 1.178-.492 1.69 1.69 0 0 0 .489-1.19v-1.68H11.666a1.662 1.662 0 0 1-1.166-.484 1.692 1.692 0 0 1-.498-1.169c0-.455.18-.892.498-1.214a1.693 1.693 0 0 1 1.203-.503h21.629v3.37l6.662-6.728Z';

/**
 * Simple ellipse orbit around the logo — clockwise.
 * ViewBox is 200×190; logo fills roughly that space.
 * Ellipse center (100, 95), rx=106, ry=100 — just outside logo bounds.
 * Expressed as two arcs to form a closed loop.
 */
const LOOP_TRACK = 'M -6,95 ' + 'A 106,100 0 1 1 206,95 ' + 'A 106,100 0 1 1 -6,95 ' + 'Z';

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
          200×190 viewBox — matches the logo's 40×38 native space scaled ×5.

          Layer 1 (logo):  Real Armstrong A path, Armstrong-blue fill at 50% opacity.
                           `scale(5)` scales it from native 40×38 into this space.
                           Clearly visible on the dark overlay — no PNG tricks needed.
          Layer 2 (track): Hidden path for animateMotion.
          Layer 3 (truck): Animated along the groove loop.
        */}
        <div className="h-80 w-[337px]">
          <svg
            viewBox="0 0 200 190"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full overflow-visible"
            overflow="visible"
            aria-hidden="true"
          >
            {/* ── Logo — real SVG path, Armstrong blue, semi-transparent ──── */}
            <g transform="scale(5)">
              <path d={LOGO_PATH} fill="#00A4EB" fillOpacity="0.5" />
            </g>

            <defs>
              {/* ── Hidden animation track ──────────────────────────────── */}
              <path id="ee-loop" d={LOOP_TRACK} />

              {/*
                ── Truck template (in defs — not rendered at origin) ───────
                Cab (front, +x side): x = −2 … +14
                Box (back):           x = −22 … −2
                scale(0.5) so it's ~18 units wide on screen
              */}
              <g id="ee-truck" transform="scale(0.5)">
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
            </defs>

            {/* Animate truck — 5 s per full lap */}
            <use href="#ee-truck">
              <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#ee-loop" />
              </animateMotion>
            </use>
          </svg>
        </div>

        <p className="text-xs text-white/50">Move your mouse or click to dismiss</p>

        <button
          onClick={dismiss}
          className="bg-armstrong-blue focus:ring-armstrong-blue focus:ring-offset-armstrong-dark-blue hover:bg-armstrong-blue-hover rounded-full px-6 py-2 text-sm font-semibold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
