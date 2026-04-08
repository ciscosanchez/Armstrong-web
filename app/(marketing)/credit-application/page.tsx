import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CreditApplicationForm } from '@/components/forms/CreditApplicationForm';

export const metadata: Metadata = {
  title: 'Commercial Credit Application | The Armstrong Company',
  description:
    'Apply for Net 30 or Net 60 credit terms with The Armstrong Company. Approved commercial accounts enjoy flexible billing for moving and logistics services.',
};

export default function CreditApplicationPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Financing', href: '/financing' },
              { label: 'Credit Application' },
            ]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold">Commercial Credit Application</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Apply for Net 30 or Net 60 payment terms. Our accounts team reviews applications within
            2 business days.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong max-w-2xl">
          <CreditApplicationForm />
        </div>
      </section>
    </>
  );
}
