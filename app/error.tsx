'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Global error boundary:', error);
    }
  }, [error]);

  return (
    <main className="bg-armstrong-dark-blue flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
      <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
        Something went wrong
      </p>
      <h1 className="mb-4 text-4xl font-semibold">We hit a snag</h1>
      <p className="text-armstrong-grey-2 mb-8 max-w-md">
        Our team has been notified. Please try again or contact us at{' '}
        <a href="tel:+18002887396" className="text-armstrong-blue underline">
          800-288-7396
        </a>
        .
      </p>
      <button
        onClick={reset}
        className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-md px-6 py-3 font-semibold text-white transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
