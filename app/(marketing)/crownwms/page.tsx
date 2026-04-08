import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Crown Warehouse Management System | The Armstrong Company',
  description:
    "Crown WMS is Armstrong's proprietary warehouse management platform — real-time inventory visibility, order management, and reporting for enterprise clients.",
};

const FEATURES = [
  {
    title: 'Real-Time Inventory',
    description:
      'Instant visibility across all SKUs, bin locations, and pallets. Know exactly what you have and where it is.',
  },
  {
    title: 'Order Management',
    description:
      'Seamless pick, pack, and ship workflows with barcode scanning and automated order routing.',
  },
  {
    title: 'Multi-Location Support',
    description:
      'Manage inventory across multiple Armstrong warehouse locations from a single dashboard.',
  },
  {
    title: 'ERP & EDI Integration',
    description: 'Direct integrations with NetSuite, SAP, Oracle, and major EDI trading partners.',
  },
  {
    title: 'Reporting & Analytics',
    description:
      'Customizable dashboards, cycle count reports, and fulfillment KPIs — all exportable.',
  },
  {
    title: 'Client Portal',
    description: 'Give your team 24/7 self-service access to inventory data, orders, and receipts.',
  },
];

export default function CrownWMSPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Crown WMS' }]}
            variant="dark"
          />
          <div className="bg-armstrong-blue mt-6 inline-block rounded-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            An Armstrong Company
          </div>
          <h1 className="mt-3 text-4xl font-semibold lg:text-5xl">
            Crown Warehouse Management System
          </h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Enterprise-grade WMS built for the way Armstrong&apos;s warehouse network actually
            operates.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Built for scale
            </p>
            <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold">
              Warehouse intelligence, built in-house
            </h2>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Crown WMS was developed by Armstrong&apos;s technology team to solve the real-world
              challenges of a 33-location warehouse network. Where off-the-shelf platforms fell
              short, we built something better.
            </p>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Today, Crown powers inventory management across Armstrong&apos;s entire supply chain
              division — and is available to enterprise logistics clients who need more than
              spreadsheets and a 3PL portal.
            </p>
            <a
              href="/get-moving-with-armstrong"
              className="bg-armstrong-blue mt-2 inline-block rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0]"
            >
              Request a Demo
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { stat: '33+', label: 'locations on Crown WMS' },
              { stat: '99.8%', label: 'inventory accuracy' },
              { stat: '< 2s', label: 'average query response' },
              { stat: '24/7', label: 'client portal uptime' },
            ].map((item) => (
              <div
                key={item.label}
                className="border-armstrong-grey-3 rounded-xl border p-6 text-center"
              >
                <p className="text-armstrong-blue text-3xl font-bold">{item.stat}</p>
                <p className="text-armstrong-grey-1 mt-1 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong">
          <div className="mb-10 text-center">
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold">
              Platform capabilities
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
        headline="See Crown WMS in action."
        subhead="Schedule a 30-minute demo with our supply chain technology team."
        cta={{ label: 'Request a Demo', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
