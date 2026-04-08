import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Your Moving Supplies List | The Armstrong Company',
  description: 'Your personalized moving supplies estimate from The Armstrong Company.',
};

// This page handles deep-linked share results (future: URL params or Sanity)
// For now it redirects visitors back to the interactive estimator.
export default function SuppliesEstimatorResultsPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <h1 className="text-4xl font-semibold">Your Moving Supplies Estimate</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Use our interactive calculator to get a personalized room-by-room list.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong max-w-xl text-center">
          <p className="text-armstrong-grey-1 mb-6">
            Ready to calculate your supplies? Head over to the estimator — it only takes 2 minutes.
          </p>
          <Link
            href="/supplies-estimator"
            className="bg-armstrong-blue hover:bg-armstrong-blue-hover inline-block rounded-lg px-8 py-3 font-semibold text-white"
          >
            Go to Supplies Estimator
          </Link>
        </div>
      </section>

      <CTABanner
        headline="Let Armstrong handle the packing."
        subhead="Our full-service packing option includes all materials — and our crews do all the work."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
