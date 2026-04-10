import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Managed Transportation | The Armstrong Company',
  description:
    'Scalable freight solutions backed by a nationwide carrier network. Truckload, LTL, intermodal, first & final mile — Armstrong Transportation Management, DOT#2246724 · MC#712934.',
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Managed Transportation' },
];

const SOLUTIONS = [
  {
    label: 'Transportation Solutions',
    items: [
      'Truckload (FTL)',
      'Less than truckload (LTL)',
      'Flatbed',
      'Refrigerated',
      'Intermodal — ocean & rail',
      'Port drayage',
      'Dedicated transportation capacity',
      'Transloading & cross-docking',
      'International air transportation',
    ],
  },
  {
    label: 'First & Final Mile',
    items: [
      'Receiving',
      'Storing',
      'Delivering',
      'Installing',
      'Debris removal',
      'Unpacking & repacking',
      'Quality review / touch-up',
      'Real-time proof of delivery',
    ],
  },
] as const;

const CARRIER_ADVANTAGES = [
  'Quick-pay options',
  'After-hours support',
  'Back-haul opportunities',
  'Easy fuel surcharges',
  'Multi-sized freight',
  'Dedicated freight options',
  'Technology-driven support',
  'Responsive freight specialist',
] as const;

const STATS = [
  { value: '500+', label: 'Cities covered', sub: 'Nationwide reach' },
  { value: '49', label: 'States served', sub: 'Coast to coast' },
  { value: '90%', label: 'U.S. population', sub: 'Coverage' },
  { value: '65+', label: 'Years in logistics', sub: 'Deep experience' },
] as const;

export default function ManagedTransportationPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue relative min-h-[480px] overflow-hidden text-white">
        <Image
          src="/images/sc-transportation.png"
          alt="Armstrong semi truck on open highway"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container-armstrong relative py-20">
          <Breadcrumb items={BREADCRUMBS} variant="dark" />
          <p className="text-armstrong-blue mt-6 mb-3 text-sm font-semibold tracking-widest uppercase">
            Armstrong Transportation Management, LLC · DOT#2246724 · MC#712934
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight font-semibold lg:text-5xl">
            Partner with Armstrong for scalable and efficient freight solutions.
          </h1>
          <p className="text-armstrong-grey-2 mt-4 max-w-xl text-lg leading-relaxed">
            When shipping demands become more complex, long-term agility becomes essential. We build
            supply chain solutions tailored to your business — regardless of size or complexity.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/get-moving-with-armstrong?type=supply-chain"
              className="bg-armstrong-blue hover:bg-armstrong-blue-hover rounded-full px-8 py-3.5 font-semibold text-white transition-colors"
            >
              Get a Transportation Quote
            </Link>
            <Link
              href="#solutions"
              className="rounded-full border border-white/40 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="bg-armstrong-blue py-10">
        <div className="container-armstrong">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center text-white">
                <dt className="mb-0.5 text-3xl font-bold">{s.value}</dt>
                <dd className="text-sm font-semibold">{s.label}</dd>
                <dd className="mt-0.5 text-xs text-white/60">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── What we do ────────────────────────────────────────── */}
      <section id="solutions" className="py-16">
        <div className="container-armstrong">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                What We Do
              </p>
              <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
                Access. Visibility. Control.
              </h2>
              <p className="text-armstrong-grey-1 mb-4 text-base leading-relaxed">
                We make logistics easier by providing access to our extensive national carrier
                network, real-time product visibility, advanced technology, and Armstrong-owned
                assets.
              </p>
              <p className="text-armstrong-grey-1 mb-8 text-base leading-relaxed">
                With carefully vetted service partners, we deliver a reliable solution designed to
                meet your specific needs — not a one-size-fits-all contract.
              </p>

              <div className="grid gap-8 sm:grid-cols-2">
                {SOLUTIONS.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-armstrong-dark-blue mb-3 font-semibold">{group.label}</h3>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-armstrong-grey-1 flex items-start gap-2 text-sm"
                        >
                          <span className="bg-armstrong-blue mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-80 overflow-hidden rounded-2xl shadow-md lg:h-full lg:min-h-[480px]">
              <Image
                src="/images/sc-transportation.png"
                alt="Armstrong transportation fleet on highway"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Carrier Advantages ────────────────────────────────── */}
      <section className="bg-armstrong-grey-3 py-16">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                For Carriers
              </p>
              <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-semibold">
                Carrier Advantages
              </h2>
              <p className="text-armstrong-grey-1 mb-6 text-base leading-relaxed">
                Armstrong is a logistics leader matching proven carriers with growing businesses to
                move goods across the globe. Trust our carrier relations team to keep you top of
                mind for loads that match your lanes and equipment.
              </p>
              <Link
                href="mailto:carriers@goarmstrong.com"
                className="text-armstrong-blue hover:text-armstrong-blue-hover font-semibold underline underline-offset-2"
              >
                carriers@goarmstrong.com
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CARRIER_ADVANTAGES.map((item) => (
                <div
                  key={item}
                  className="border-armstrong-grey-3 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-sm"
                >
                  <span className="bg-armstrong-blue h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-armstrong-dark-blue text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ──────────────────────────────────── */}
      <section className="py-16">
        <div className="container-armstrong">
          <h2 className="text-armstrong-dark-blue mb-8 text-2xl font-semibold">
            Explore more Armstrong services
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {RELATED.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="border-armstrong-grey-3 group flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <p className="text-armstrong-blue mb-1 text-xs font-semibold tracking-widest uppercase">
                    {r.eyebrow}
                  </p>
                  <p className="text-armstrong-dark-blue font-semibold">{r.label}</p>
                </div>
                <span className="text-armstrong-blue text-xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Let's build your freight solution."
        subhead="Our transportation management team is ready to design a solution around your specific lanes, volumes, and timelines."
        cta={{
          label: 'Talk to a Specialist',
          href: '/get-moving-with-armstrong?type=supply-chain',
        }}
        variant="dark"
      />
    </>
  );
}

const RELATED = [
  {
    eyebrow: 'Supply Chain',
    label: 'Supply Chain Solutions',
    href: '/supply-chain-solutions',
  },
  {
    eyebrow: 'Commercial',
    label: 'Business Moving Services',
    href: '/business-moving-services',
  },
  {
    eyebrow: 'Data Center',
    label: 'Data Center Logistics',
    href: '/data-center-logistics-services',
  },
] as const;
