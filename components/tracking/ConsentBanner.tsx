'use client';

import { useState, useEffect } from 'react';

const CONSENT_COOKIE = 'arm_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

function getStoredConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${CONSENT_COOKIE}=`))
    ?.split('=')[1];
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as ConsentState;
  } catch {
    return null;
  }
}

function setConsentCookie(consent: ConsentState): void {
  const value = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE}; path=/; SameSite=Strict`;
}

function updateGa4Consent(consent: ConsentState): void {
  if (typeof window === 'undefined' || !('gtag' in window)) return;
  // GA4 Consent Mode v2
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<ConsentState>({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = (consent: ConsentState) => {
    setConsentCookie(consent);
    updateGa4Consent(consent);
    setVisible(false);

    // Let TrackingProvider know consent changed without a page reload
    window.dispatchEvent(new CustomEvent('arm:consent', { detail: consent }));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="border-armstrong-grey-3 fixed right-0 bottom-0 left-0 z-50 border-t bg-white px-4 py-5 shadow-lg sm:px-6"
    >
      {!showPreferences ? (
        <div className="container-armstrong flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-armstrong-dark-blue text-sm">
            We use cookies to personalize your experience and improve our services. California
            residents have additional rights under{' '}
            <a href="/crown-privacy-policy#ccpa" className="hover:text-armstrong-blue underline">
              CCPA
            </a>
            .
          </p>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              onClick={() => setShowPreferences(true)}
              className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded border px-4 py-2 text-sm font-medium"
            >
              Manage Preferences
            </button>
            <button
              onClick={() => accept({ analytics: false, marketing: false })}
              className="border-armstrong-grey-1 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded border px-4 py-2 text-sm font-medium"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => accept({ analytics: true, marketing: true })}
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded px-4 py-2 text-sm font-semibold text-white"
            >
              Accept All
            </button>
          </div>
        </div>
      ) : (
        <div className="container-armstrong">
          <h3 className="text-armstrong-dark-blue mb-3 font-semibold">Cookie Preferences</h3>
          <div className="mb-4 space-y-3">
            {/* Necessary — always on */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 cursor-not-allowed opacity-50"
              />
              <span className="text-armstrong-dark-blue text-sm">
                <strong>Necessary</strong> — Required for the site to function. Cannot be disabled.
              </span>
            </label>
            {/* Analytics */}
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                className="h-4 w-4"
              />
              <span className="text-armstrong-dark-blue text-sm">
                <strong>Analytics</strong> — Help us understand how you use our site (GA4).
              </span>
            </label>
            {/* Marketing */}
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={draft.marketing}
                onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
                className="h-4 w-4"
              />
              <span className="text-armstrong-dark-blue text-sm">
                <strong>Marketing</strong> — Personalized ads and retargeting.
              </span>
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => accept(draft)}
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded px-5 py-2 text-sm font-semibold text-white"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setShowPreferences(false)}
              className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded border px-5 py-2 text-sm font-medium"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
