import type { Metadata } from 'next';
import { EstimateForm } from '@/components/forms/EstimateForm';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Instant Ballpark Estimate for Your Move',
  description:
    'Need a quick and free estimate for your next move? Fill out our form and get a free ballpark estimate of your moving cost instantly.',
  robots: { index: true, follow: true },
};

const BREADCRUMBS = [{ label: 'Home', href: '/' }, { label: 'Ballpark Estimate' }];

export default function BallparkEstimatePage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-12 text-white">
        <div className="container-armstrong">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
          <h1 className="mt-6 text-4xl font-semibold">Instant Ballpark Estimate</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-lg">
            Get a free moving cost estimate in under 2 minutes. No email required — just straight
            answers.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-armstrong">
          <div className="mx-auto max-w-xl">
            <EstimateForm />
          </div>
        </div>
      </section>
    </>
  );
}
