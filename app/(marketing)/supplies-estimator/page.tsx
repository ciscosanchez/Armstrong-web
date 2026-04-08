import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SuppliesEstimator } from '@/components/forms/SuppliesEstimator';

export const metadata: Metadata = {
  title: 'Moving Supplies Estimator | The Armstrong Company',
  description:
    'Not sure how many boxes you need? Use our free moving supplies calculator to get a room-by-room estimate of boxes, tape, paper, and packing materials.',
};

export default function SuppliesEstimatorPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Supplies Estimator' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold">Moving Supplies Estimator</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Tell us about your home and we&apos;ll calculate exactly what packing supplies
            you&apos;ll need. No guesswork, no waste.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong max-w-3xl">
          <SuppliesEstimator />
        </div>
      </section>
    </>
  );
}
