/**
 * CONCEPT D — "The Platform"
 * Clean, light, B2B enterprise. Feels like Flexport or project44 —
 * a logistics company that leads with capability and trust.
 * White background, strong type, heavy on social proof.
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Armstrong — Concept D: The Platform',
  robots: { index: false },
};

const CAPABILITIES = [
  {
    id: 'supply',
    eyebrow: 'Supply Chain',
    label: 'End-to-end distribution, warehousing & engineering.',
    href: '/supply-chain-solutions',
  },
  {
    id: 'transport',
    eyebrow: 'Managed Transportation',
    label: 'FTL, LTL, intermodal & first/final mile across 49 states.',
    href: '/managed-transportation',
  },
  {
    id: 'commercial',
    eyebrow: 'Commercial Moving',
    label: 'Office, FF&E, industrial & multi-site relocation.',
    href: '/business-moving-services',
  },
  {
    id: 'data',
    eyebrow: 'Data Center & Specialty',
    label: 'Zero-downtime critical moves with chain of custody.',
    href: '/data-center-logistics-services',
  },
  {
    id: 'residential',
    eyebrow: 'Residential',
    label: 'Local and long-distance home moves, done right.',
    href: '/household-moving-services',
  },
] as const;

const TRUST = [
  { label: 'Licensed Carrier & Broker', sub: 'DOT#2246724 · MC#712934' },
  { label: 'ProMover Certified', sub: 'American Moving & Storage Association' },
  { label: '33+ Nationwide Locations', sub: 'Local expertise, national reach' },
  { label: 'Family Owned Since 1957', sub: 'Three generations of accountability' },
] as const;

const INDUSTRIES = [
  'Healthcare',
  'Financial Services',
  'Technology',
  'Food & Beverage',
  'Manufacturing',
  'Higher Education',
  'Government',
  'Retail',
] as const;

export default function ConceptD() {
  return (
    <div className="bg-white">
      {/* ── Hero — clean, light, confident ──────────────────── */}
      <section className="border-armstrong-grey-3 border-b py-24 lg:py-32">
        <div className="container-armstrong">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="bg-armstrong-blue/10 text-armstrong-blue mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
                <span className="bg-armstrong-blue h-1.5 w-1.5 rounded-full" />
                Moving · Logistics · Transportation · Supply Chain
              </div>
              <h1 className="text-armstrong-dark-blue mb-6 text-5xl leading-tight font-black tracking-tight lg:text-6xl">
                The logistics partner
                <br />
                <span className="text-armstrong-blue">behind your growth.</span>
              </h1>
              <p className="text-armstrong-grey-1 mb-10 text-xl leading-relaxed">
                Complex commercial moves. End-to-end supply chain. Managed transportation.
                Residential moving. One accountable partner since 1957.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/get-moving-with-armstrong"
                  className="bg-armstrong-dark-blue hover:bg-armstrong-blue px-8 py-4 font-semibold text-white transition-colors"
                >
                  Talk to a Specialist
                </Link>
                <Link
                  href="/ballpark-estimate"
                  className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 border px-8 py-4 font-semibold transition-colors"
                >
                  Get an Estimate
                </Link>
              </div>
            </div>

            {/* Hero image grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 h-48 overflow-hidden rounded-xl">
                <Image
                  src="/images/sc-hero.png"
                  alt="Armstrong supply chain"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-36 overflow-hidden rounded-xl">
                <Image
                  src="/images/biz-office.jpg"
                  alt="Commercial moving"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-36 overflow-hidden rounded-xl">
                <Image
                  src="/images/res-movers.jpg"
                  alt="Residential moving"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────── */}
      <section className="border-armstrong-grey-3 border-b py-8">
        <div className="container-armstrong">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-start gap-3">
                <span className="bg-armstrong-blue mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                <div>
                  <p className="text-armstrong-dark-blue text-sm font-semibold">{t.label}</p>
                  <p className="text-armstrong-grey-1 text-xs">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-armstrong">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                What We Offer
              </p>
              <h2 className="text-armstrong-dark-blue text-3xl leading-tight font-black">
                Five service lines.
                <br />
                One partner.
              </h2>
              <p className="text-armstrong-grey-1 mt-4 text-base leading-relaxed">
                From a single truckload to a full supply chain overhaul — Armstrong scales to what
                you need.
              </p>
            </div>

            <div className="divide-armstrong-grey-3 divide-y">
              {CAPABILITIES.map((c) => (
                <Link
                  key={c.id}
                  href={c.href}
                  className="group hover:bg-armstrong-grey-3 -mx-4 flex items-center justify-between px-4 py-5 transition-colors"
                >
                  <div>
                    <p className="text-armstrong-blue mb-1 text-xs font-semibold tracking-widest uppercase">
                      {c.eyebrow}
                    </p>
                    <p className="text-armstrong-dark-blue group-hover:text-armstrong-blue font-semibold transition-colors">
                      {c.label}
                    </p>
                  </div>
                  <span className="text-armstrong-blue ml-4 shrink-0 text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="bg-armstrong-dark-blue py-20 text-white">
        <div className="container-armstrong">
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { value: '500+', label: 'Cities in network', body: 'Nationwide carrier coverage' },
              { value: '49', label: 'States served', body: 'Coast to coast capability' },
              { value: '33+', label: 'Office locations', body: 'Local people. National scale.' },
              { value: '65+', label: 'Years in business', body: 'Trusted since 1957' },
            ].map((s) => (
              <div key={s.label} className="border-armstrong-blue border-l-2 pl-6">
                <p className="text-armstrong-blue text-5xl font-black">{s.value}</p>
                <p className="mt-1 font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-white/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────── */}
      <section className="border-armstrong-grey-3 border-b py-20">
        <div className="container-armstrong">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-armstrong-blue mb-3 text-sm font-semibold tracking-widest uppercase">
                Industries We Serve
              </p>
              <h2 className="text-armstrong-dark-blue mb-4 text-3xl font-black">
                Specialized knowledge.
                <br />
                Every sector.
              </h2>
              <p className="text-armstrong-grey-1 leading-relaxed">
                We&apos;ve built deep expertise across industries that demand precision, compliance,
                and zero tolerance for error.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map((ind) => (
                <span
                  key={ind}
                  className="border-armstrong-grey-3 text-armstrong-dark-blue rounded-full border bg-white px-5 py-2 text-sm font-medium shadow-sm"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container-armstrong text-center">
          <p className="text-armstrong-blue mb-4 text-sm font-semibold tracking-widest uppercase">
            Ready to get started?
          </p>
          <h2 className="text-armstrong-dark-blue mb-6 text-4xl font-black lg:text-5xl">
            Tell us what you need to move.
          </h2>
          <p className="text-armstrong-grey-1 mx-auto mb-10 max-w-xl text-lg">
            Our team will design the right solution — whether it&apos;s one truck or a full supply
            chain overhaul.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-moving-with-armstrong"
              className="bg-armstrong-dark-blue hover:bg-armstrong-blue px-10 py-4 font-semibold text-white transition-colors"
            >
              Talk to a Specialist
            </Link>
            <Link
              href="/ballpark-estimate"
              className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 border px-10 py-4 font-semibold transition-colors"
            >
              Get an Instant Estimate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
