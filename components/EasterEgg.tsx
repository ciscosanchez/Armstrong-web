'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EasterEgg — type "HILLARY" anywhere on the page to summon the Armstrong truck.
 *
 * The truck follows the middle C-arc of the real Armstrong symbol.
 * Cab faces +x so `rotate="auto"` keeps it pointing the correct direction.
 * Dismisses on button click OR any mouse move outside the card.
 */

const TRIGGER = 'HILLARY';

// Real Armstrong symbol paths (from public/images/armstrong-logo.svg, viewBox 0 0 100 100).
// The symbol opens to the RIGHT. Each path starts top-right, sweeps left/down/right.
// Direction of travel: top→left→bottom→right — with cab on +x the truck always faces forward.
const OUTER_PATH = 'M90,8 H22 Q8,8 8,22 V78 Q8,92 22,92 H90';
const MIDDLE_PATH = 'M90,24 H34 Q22,24 22,34 V66 Q22,76 34,76 H90';
const INNER_PATH = 'M90,40 H48 Q40,40 40,48 V52 Q40,60 48,60 H90';

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

        {/* Armstrong symbol — all three C-arcs, truck rides the middle one */}
        <div className="h-72 w-72">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            aria-hidden="true"
            overflow="visible"
          >
            <defs>
              {/* Reuse actual Armstrong symbol paths */}
              <path id="ee-outer" d={OUTER_PATH} fill="none" />
              <path id="ee-middle" d={MIDDLE_PATH} fill="none" />
              <path id="ee-inner" d={INNER_PATH} fill="none" />
            </defs>

            {/* Draw all three tracks */}
            <use
              href="#ee-outer"
              stroke="#00A4EB"
              strokeWidth="3.5"
              strokeLinecap="butt"
              opacity="0.9"
            />
            <use
              href="#ee-middle"
              stroke="#00A4EB"
              strokeWidth="3.5"
              strokeLinecap="butt"
              opacity="0.7"
            />
            <use
              href="#ee-inner"
              stroke="#00A4EB"
              strokeWidth="3.5"
              strokeLinecap="butt"
              opacity="0.5"
            />

            {/*
              Truck — cab faces +x (right) so rotate="auto" keeps the front leading.
              Scaled 0.28× to fit on the middle track (middle track ~68 units long).
              Layout at 1× scale:
                Box (back):  x=-22..x=-2,  y=-9..y=4
                Cab (front): x=-2..x=14,   y=-9..y=3
                Wheels:      cx=-12, cx=8
            */}
            <g id="ee-truck" transform="scale(0.28)">
              {/* Box / cargo area (back half) */}
              <rect x="-22" y="-9" width="20" height="13" rx="1" fill="#ffffff" />
              {/* Armstrong blue stripe on box */}
              <rect x="-22" y="-3" width="20" height="4" fill="#00A4EB" opacity="0.85" />
              {/* Cab (front — positive x side) */}
              <rect x="-2" y="-9" width="16" height="12" rx="2" fill="#ffffff" />
              {/* Windshield */}
              <rect x="6" y="-8" width="5" height="6" rx="1" fill="#00A4EB" opacity="0.8" />
              {/* Rear wheel */}
              <circle cx="-12" cy="5" r="3.5" fill="#00263F" />
              <circle cx="-12" cy="5" r="1.8" fill="#ffffff" />
              {/* Front wheel */}
              <circle cx="8" cy="5" r="3.5" fill="#00263F" />
              <circle cx="8" cy="5" r="1.8" fill="#ffffff" />
            </g>

            {/* Animate truck along middle track at 2.5 s per lap */}
            <use href="#ee-truck">
              <animateMotion dur="2.5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#ee-middle" />
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
