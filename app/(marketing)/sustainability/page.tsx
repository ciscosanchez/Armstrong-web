import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Sustainability | The Armstrong Company',
  description:
    'Armstrong is committed to sustainability by reducing our environmental impact and the impact of our clients and partners.',
};

export default function SustainabilityPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Sustainability' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold">Our Commitment to Sustainability</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Reducing our environmental impact — and the impact of our clients and partners.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong max-w-3xl">
          <p className="text-armstrong-grey-1 mb-6 leading-relaxed">
            Armstrong is committed to sustainability across every dimension of our business — from
            the fuel efficiency of our fleet to the materials we use for packing, to the energy
            consumption of our warehouses.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {INITIATIVES.map((item) => (
              <div
                key={item.title}
                className="border-armstrong-grey-3 rounded-xl border bg-white p-6 shadow-sm"
              >
                <span className="mb-4 block text-2xl" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{item.title}</h3>
                <p className="text-armstrong-grey-1 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Moving forward. Responsibly."
        subhead="Our sustainability efforts are ongoing. We hold ourselves to the same standard we hold our service."
        cta={{ label: 'Learn About Armstrong', href: '/about' }}
        variant="light"
      />
    </>
  );
}

const INITIATIVES = [
  {
    icon: '🚛',
    title: 'Fleet efficiency',
    description:
      'Modern, fuel-efficient trucks with regular maintenance schedules to minimize emissions per mile.',
  },
  {
    icon: '♻️',
    title: 'Sustainable packing',
    description:
      'Reusable crates, recycled cardboard, and eco-friendly wrapping materials wherever possible.',
  },
  {
    icon: '🏭',
    title: 'Green facilities',
    description:
      'LED lighting, solar where available, and energy management systems across our warehouse network.',
  },
  {
    icon: '🌱',
    title: 'Carbon reduction',
    description:
      'Ongoing investment in route optimization and load consolidation to reduce our carbon footprint.',
  },
];
