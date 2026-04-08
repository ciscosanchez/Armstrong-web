import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Moving Financing Options | The Armstrong Company',
  description:
    'Armstrong offers flexible payment options and financing for residential and commercial moves. Spread the cost of your move with no surprises.',
};

const OPTIONS = [
  {
    title: 'Pay in Full',
    badge: 'Most common',
    description:
      'Pay your balance upon delivery. No interest, no fees. The simplest option for most moves.',
    highlight: false,
  },
  {
    title: 'Deposit + Balance',
    badge: null,
    description:
      'Secure your move with a deposit and pay the remaining balance within 30 days of delivery.',
    highlight: false,
  },
  {
    title: 'Net 30 Credit Terms',
    badge: 'For businesses',
    description:
      'Approved commercial accounts can access Net 30 payment terms. Apply with our credit application.',
    highlight: true,
  },
  {
    title: 'Custom Payment Plans',
    badge: 'Ask us',
    description:
      'Long-distance or large commercial moves can often be split into milestone payments. Contact us to discuss.',
    highlight: false,
  },
];

export default function FinancingPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Financing' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold">Flexible Payment Options</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Moving shouldn&apos;t break the bank. Armstrong offers payment options built around your
            situation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Payment options
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold">
              Pay the way that works for you
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {OPTIONS.map((opt) => (
              <div
                key={opt.title}
                className={`rounded-xl border p-6 ${
                  opt.highlight
                    ? 'border-armstrong-blue bg-blue-50'
                    : 'border-armstrong-grey-3 bg-white'
                } relative shadow-sm`}
              >
                {opt.badge && (
                  <span className="bg-armstrong-blue absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white">
                    {opt.badge}
                  </span>
                )}
                <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{opt.title}</h3>
                <p className="text-armstrong-grey-1 text-sm leading-relaxed">{opt.description}</p>
              </div>
            ))}
          </div>

          <div className="border-armstrong-grey-3 bg-armstrong-grey-3 mt-12 rounded-xl border p-8">
            <h3 className="text-armstrong-dark-blue mb-3 text-xl font-semibold">
              Applying for business credit?
            </h3>
            <p className="text-armstrong-grey-1 mb-6">
              Armstrong extends Net 30 and Net 60 credit terms to approved commercial accounts.
              Submit a credit application and our accounts team will review it within 2 business
              days.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/credit-application"
                className="bg-armstrong-blue hover:bg-armstrong-blue-hover inline-block rounded-md px-6 py-3 font-semibold text-white"
              >
                Apply for Credit
              </Link>
              <Link
                href="/get-moving-with-armstrong"
                className="border-armstrong-dark-blue text-armstrong-dark-blue inline-block rounded-md border px-6 py-3 font-semibold hover:bg-white"
              >
                Get a Quote First
              </Link>
            </div>
          </div>

          <div className="bg-armstrong-dark-blue text-armstrong-grey-2 mt-8 rounded-xl p-6 text-sm">
            <p className="mb-1 font-semibold text-white">Payment methods accepted</p>
            <p>
              Credit card (Visa, MC, Amex, Discover) · ACH / Bank transfer · Check · Wire transfer
            </p>
            <p className="mt-2">
              All payments are secured by Armstrong&apos;s PCI-compliant billing system. We never
              store full card numbers on our servers.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to plan your move?"
        subhead="Get a no-surprise quote today — we'll help you pick the right payment option."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
