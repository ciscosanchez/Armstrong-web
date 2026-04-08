import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Charlotte Warehousing & Distribution Services',
  description:
    'Armstrong offers flexible warehousing, distribution, and fulfillment services in the Charlotte, NC metro area. Climate-controlled storage and cross-docking available.',
};

const FEATURES = [
  {
    title: 'Short & Long-Term Storage',
    description:
      'Month-to-month and long-term contracts for commercial and residential goods. Rack and bulk storage available.',
  },
  {
    title: 'Climate-Controlled Vaults',
    description:
      'Humidity and temperature-regulated units for sensitive products, electronics, art, and fine furnishings.',
  },
  {
    title: 'Cross-Docking',
    description:
      'Same-day transfer from inbound freight to outbound delivery — reduce dwell time and cut costs.',
  },
  {
    title: 'Pick, Pack & Fulfillment',
    description:
      'E-commerce and B2B fulfillment services with SKU-level inventory management and same-day shipping.',
  },
  {
    title: 'Last-Mile Delivery',
    description:
      'White-glove residential delivery and commercial room-of-choice delivery throughout the Charlotte metro.',
  },
  {
    title: 'Secure Access & CCTV',
    description:
      '24/7 monitored facility with gated access, on-site security, and full camera coverage.',
  },
];

export default function CharlotteWarehousingPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/our-locations' },
              { label: 'Charlotte Warehousing' },
            ]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold lg:text-5xl">
            Charlotte Warehousing &amp; Distribution Services
          </h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Strategic storage, fulfillment, and distribution hub in the Charlotte, NC metro —
            serving the Carolinas and beyond.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Charlotte, NC
            </p>
            <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold">
              The Southeast&apos;s logistics crossroads
            </h2>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Charlotte sits at the intersection of I-77 and I-85, making it one of the most
              strategically positioned distribution hubs in the Southeast. Armstrong&apos;s
              Charlotte facility gives you flexible, scalable warehousing with the infrastructure to
              handle everything from individual pallet storage to full-scale 3PL operations.
            </p>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Whether you&apos;re a retailer managing seasonal overflow, a manufacturer needing
              cross-dock throughput, or a business relocating its inventory, our Charlotte team
              delivers the same reliability Armstrong is known for nationally.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { stat: '200K+', label: 'sq ft warehouse space' },
                { stat: '48h', label: 'typical onboarding' },
                { stat: '99.8%', label: 'inventory accuracy rate' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-armstrong-grey-3 rounded-xl border p-4 text-center"
                >
                  <p className="text-armstrong-blue text-2xl font-bold">{item.stat}</p>
                  <p className="text-armstrong-grey-1 mt-1 text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-armstrong-grey-3 rounded-xl p-8">
            <h3 className="text-armstrong-dark-blue mb-4 text-lg font-semibold">
              Contact our Charlotte team
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">Address</dt>
                <dd className="text-armstrong-grey-1">Charlotte, NC Metro Area</dd>
              </div>
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">Phone</dt>
                <dd>
                  <a href="tel:+17045550100" className="text-armstrong-blue hover:underline">
                    (704) 555-0100
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">Hours</dt>
                <dd className="text-armstrong-grey-1">Mon–Fri 7am–6pm · Sat 8am–2pm</dd>
              </div>
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">Services</dt>
                <dd className="text-armstrong-grey-1">
                  Warehousing · Distribution · Fulfillment · Last-Mile
                </dd>
              </div>
            </dl>
            <a
              href="/get-moving-with-armstrong"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover mt-6 inline-block w-full rounded-md px-6 py-3 text-center font-semibold text-white"
            >
              Request a Storage Quote
            </a>
          </div>
        </div>
      </section>

      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong">
          <div className="mb-10 text-center">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              What we offer
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold">
              Full-spectrum warehousing capabilities
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{f.title}</h3>
                <p className="text-armstrong-grey-1 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to streamline your Charlotte operations?"
        subhead="Talk to our warehousing team — we'll build a solution around your needs."
        cta={{ label: 'Get a Storage Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
