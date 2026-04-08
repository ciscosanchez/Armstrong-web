import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: "Armstrong's Commitment to Safety",
  description:
    'We continuously improve the safety of our facilities, equipment, and operations to minimize risk for our clients, team members, and crews.',
};

export default function SafetyPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Safety' }]} variant="dark" />
          <h1 className="mt-6 text-4xl font-semibold">Armstrong&apos;s Commitment to Safety</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong max-w-3xl">
          <p className="text-armstrong-grey-1 mb-6 text-lg leading-relaxed">
            Safety is the cornerstone of how we express our care for all employees, customers, and
            communities. It&apos;s not a policy — it&apos;s how we show up every day.
          </p>
          <p className="text-armstrong-grey-1 mb-6 leading-relaxed">
            We work to continuously improve the safety of our facilities, our equipment, and our
            operations to minimize risk for our clients, our team members, and our crews. That
            commitment extends from the warehouse floor to the cab of every truck.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { stat: 'Zero', label: 'tolerance for preventable incidents' },
              { stat: 'Annual', label: 'safety training for every crew member' },
              { stat: '100%', label: 'compliance with DOT & OSHA standards' },
            ].map((item) => (
              <div
                key={item.label}
                className="border-armstrong-grey-3 rounded-xl border p-6 text-center"
              >
                <p className="text-armstrong-blue text-2xl font-bold">{item.stat}</p>
                <p className="text-armstrong-grey-1 mt-1 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to move with confidence?"
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
