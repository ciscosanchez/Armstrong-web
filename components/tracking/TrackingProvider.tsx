'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { TrackingEventInput } from '@/lib/validations/track';

interface TrackingContextValue {
  track: (event: TrackingEventInput) => void;
  hasConsent: boolean;
}

const TrackingContext = createContext<TrackingContextValue>({
  track: () => undefined,
  hasConsent: false,
});

export function useTracking(): TrackingContextValue {
  return useContext(TrackingContext);
}

const SESSION_COOKIE = 'arm_session';
const CONSENT_COOKIE = 'arm_consent';

function getOrCreateSessionId(): string {
  if (typeof document === 'undefined') return '';
  const existing = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${SESSION_COOKIE}=`))
    ?.split('=')[1];
  if (existing) return existing;

  const id = crypto.randomUUID();
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  document.cookie = `${SESSION_COOKIE}=${id}; max-age=${maxAge}; path=/; SameSite=Strict`;
  return id;
}

function getConsent(): { analytics: boolean } {
  if (typeof document === 'undefined') return { analytics: false };
  const raw = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${CONSENT_COOKIE}=`))
    ?.split('=')[1];
  if (!raw) return { analytics: false };
  try {
    return JSON.parse(decodeURIComponent(raw)) as { analytics: boolean };
  } catch {
    return { analytics: false };
  }
}

export function TrackingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sessionIdRef = useRef<string>('');
  const consentRef = useRef<boolean>(false);

  // Initialize session on mount
  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
    consentRef.current = getConsent().analytics;
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!consentRef.current) return;
    track({ event: 'page_view', path: pathname, referrer: document.referrer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const track = useCallback((event: TrackingEventInput) => {
    if (!consentRef.current) return;

    // Fire and forget — don't await in client component
    void fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Id': sessionIdRef.current,
        // Pass UTM params from URL so server can enrich
        'X-UTM-Source': new URLSearchParams(window.location.search).get('utm_source') ?? '',
        'X-UTM-Medium': new URLSearchParams(window.location.search).get('utm_medium') ?? '',
        'X-UTM-Campaign': new URLSearchParams(window.location.search).get('utm_campaign') ?? '',
      },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {
      // Tracking failures are silent — never surface to user
    });
  }, []);

  return (
    <TrackingContext.Provider value={{ track, hasConsent: consentRef.current }}>
      {children}
    </TrackingContext.Provider>
  );
}
