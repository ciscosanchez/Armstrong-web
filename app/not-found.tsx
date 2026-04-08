import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="bg-armstrong-dark-blue flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
      <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">404</p>
      <h1 className="mb-4 text-4xl font-semibold">Page not found</h1>
      <p className="text-armstrong-grey-2 mb-8 max-w-md">
        We couldn&apos;t find what you were looking for. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-md px-6 py-3 font-semibold text-white transition-colors"
        >
          Back to home
        </Link>
        <Link
          href="/our-locations"
          className="rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
        >
          Find a location
        </Link>
      </div>
    </main>
  );
}
