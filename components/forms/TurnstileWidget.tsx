'use client';

/**
 * TurnstileWidget — Cloudflare Turnstile bot-protection widget.
 *
 * Usage (inside a react-hook-form form):
 *   const { setValue } = useForm<YourSchema>();
 *   <TurnstileWidget onVerify={(token) => setValue('cfTurnstileResponse', token)} />
 *
 * Dev/CI behaviour:
 *   When NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set, the widget is skipped and
 *   onVerify is called immediately with 'dev-bypass'. The server-side verifyTurnstile()
 *   function already gracefully allows requests when TURNSTILE_SECRET_KEY is missing.
 */

import { useEffect } from 'react';
import Turnstile from 'react-turnstile';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  // Dev bypass — no site key configured
  useEffect(() => {
    if (!SITE_KEY) {
      onVerify('dev-bypass');
    }
  }, [onVerify]);

  if (!SITE_KEY) return null;

  return (
    <Turnstile
      sitekey={SITE_KEY}
      onVerify={onVerify}
      onExpire={() => {
        onExpire?.();
      }}
      theme="light"
      className="mt-1"
    />
  );
}
