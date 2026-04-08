import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Moving & Storage Services in Pennsylvania | The Armstrong Company',
  description:
    'Armstrong provides residential and commercial moving, storage, and logistics services throughout Pennsylvania — Lancaster, York, Harrisburg, Reading, and beyond.',
};

const PA_MARKETS = [
  {
    city: 'Lancaster',
    slug: 'lancaster-pa',
    description:
      "Armstrong's Pennsylvania hub — residential, commercial, and supply chain services for the Lancaster region.",
  },
  {
    city: 'York',
    slug: 'york-pa',
    description: 'Full-service moving and storage for York County residents and businesses.',
  },
  {
    city: 'Harrisburg',
    slug: 'harrisburg-pa',
    description:
      'Serving the state capital and surrounding Capital Region for all relocation needs.',
  },
  {
    city: 'Reading',
    slug: 'reading-pa',
    description: 'Local and long-distance moving services for Berks County.',
  },
  {
    city: 'Mechanicsburg',
    slug: 'mechanicsburg-pa',
    description: 'Residential and commercial moving for the greater Mechanicsburg area.',
  },
  {
    city: 'Lebanon',
    slug: 'lebanon-pa',
    description: 'Moving and storage services for Lebanon County.',
  },
];

export default function PennsylvaniaPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Pennsylvania' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold lg:text-5xl">
            Moving &amp; Storage Services in Pennsylvania
          </h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Armstrong serves communities throughout Pennsylvania from our Lancaster hub —
            residential, commercial, and supply chain services across the region.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong">
          <div className="mb-10">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Pennsylvania service areas
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold">
              Find your local Armstrong team
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PA_MARKETS.map((market) => (
              <Link
                key={market.slug}
                href={`/pennsylvania/${market.slug}`}
                className="group border-armstrong-grey-3 rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-armstrong-dark-blue group-hover:text-armstrong-blue mb-2 font-semibold transition-colors">
                  {market.city}, PA
                </h3>
                <p className="text-armstrong-grey-1 mb-4 text-sm leading-relaxed">
                  {market.description}
                </p>
                <span className="text-armstrong-blue text-sm font-semibold">View services →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong max-w-3xl text-center">
          <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
            Why Armstrong in Pennsylvania?
          </h2>
          <p className="text-armstrong-grey-1 mb-6 leading-relaxed">
            Our Lancaster location has served South Central Pennsylvania for decades — giving us
            deep roots in the region&apos;s communities, roads, and logistics networks. Whether
            you&apos;re moving a household in York or running supply chain operations across the
            state, our Pennsylvania team brings the same national resources with local knowledge.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { stat: '1', label: 'PA hub location' },
              { stat: '6+', label: 'markets served' },
              { stat: '50+', label: 'years in the region' },
            ].map((item) => (
              <div
                key={item.label}
                className="border-armstrong-grey-3 rounded-xl border bg-white p-6 text-center"
              >
                <p className="text-armstrong-blue text-3xl font-bold">{item.stat}</p>
                <p className="text-armstrong-grey-1 mt-1 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Planning a move in Pennsylvania?"
        subhead="Get a free quote from our Lancaster team — same day response."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
