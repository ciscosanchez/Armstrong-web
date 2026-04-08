'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EasterEgg — type "HILLARY" anywhere on the page to summon the Armstrong truck.
 *
 * The truck follows the outer C-arc of the Armstrong symbol (the largest of the
 * three concentric C-tracks). Dismisses on button click OR any mouse move.
 *
 * Architecture:
 *  - Window keydown listener accumulates keypresses; clears after 2 s of inactivity
 *  - SVG animateMotion drives the truck along the outer arc path
 *  - mousemove on the overlay triggers dismiss
 */

const TRIGGER = 'HILLARY';

export function EasterEgg() {
  const [visible, setVisible] = useState(false);
  const bufferRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Keypress listener ──────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore when user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      bufferRef.current += e.key.toUpperCase();
      // Keep only the last N chars where N = trigger length
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
      className="bg-armstrong-dark-blue/80 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
      onMouseMove={dismiss}
      aria-modal="true"
      role="dialog"
      aria-label="Easter egg"
    >
      {/* Prevent the mousemove-dismiss from firing on the inner card */}
      <div
        className="relative flex flex-col items-center gap-6"
        onMouseMove={(e) => e.stopPropagation()}
      >
        <p className="text-armstrong-blue text-sm font-semibold tracking-widest uppercase">
          You found it 🚛
        </p>

        {/* Armstrong symbol with animated truck */}
        <div className="relative h-72 w-72">
          <svg
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              {/* The three C-arc tracks — outer, mid, inner */}
              {/* Each arc: open on the right, centered at (120,120) */}

              {/* Outer arc path (truck follows this one) */}
              <path id="outerTrack" d="M 152,28 A 95,95 0 1,0 152,212" fill="none" />

              {/* Mid arc */}
              <path id="midTrack" d="M 145,55 A 68,68 0 1,0 145,185" fill="none" />

              {/* Inner arc */}
              <path id="innerTrack" d="M 138,82 A 41,41 0 1,0 138,158" fill="none" />
            </defs>

            {/* Draw the three C-arcs */}
            <use
              href="#outerTrack"
              stroke="#00A4EB"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.9"
            />
            <use
              href="#midTrack"
              stroke="#00A4EB"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.7"
            />
            <use
              href="#innerTrack"
              stroke="#00A4EB"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* The truck — a simple box-truck silhouette */}
            <g id="truck">
              {/* Cab */}
              <rect x="-22" y="-9" width="14" height="12" rx="2" fill="#ffffff" />
              {/* Windshield */}
              <rect x="-21" y="-8" width="5" height="6" rx="1" fill="#00A4EB" opacity="0.8" />
              {/* Box */}
              <rect x="-8" y="-10" width="22" height="13" rx="1" fill="#ffffff" />
              {/* Stripe */}
              <rect x="-8" y="-4" width="22" height="3" fill="#00263F" />
              {/* Wheels */}
              <circle cx="-14" cy="4" r="3" fill="#00263F" />
              <circle cx="10" cy="4" r="3" fill="#00263F" />
              <circle cx="-14" cy="4" r="1.5" fill="#ffffff" />
              <circle cx="10" cy="4" r="1.5" fill="#ffffff" />
            </g>

            {/* Animate truck along the outer track */}
            <use href="#truck">
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#outerTrack" />
              </animateMotion>
            </use>
          </svg>
        </div>

        <p className="text-xs text-white/60">Move your mouse or click to dismiss</p>

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
