import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Careers: Join the Armstrong Team',
  description:
    'Armstrong knows that you deserve an employer that has your back. Join our team in a multitude of locations across the country.',
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} variant="dark" />
          <h1 className="mt-6 text-4xl font-semibold">Careers: Join the Armstrong Team!</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Armstrong knows that you deserve an employer that has your back.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              {/* Brand Guidelines §2.8 — Employees and Candidates */}
              <h2 className="text-armstrong-dark-blue mb-4 text-2xl font-semibold">
                At the Armstrong Company, our team members are much more than assets — they&apos;re
                the heart of our organization.
              </h2>
              <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
                Whether you&apos;re a contract driver, administrative personnel, or warehouse
                operator, our strong values, respect for others, support and collaboration, and
                entrepreneurial spirit mean anyone can succeed here.
              </p>
              <p className="text-armstrong-grey-1 leading-relaxed">
                We offer career path potential, competitive compensation, and a team that genuinely
                supports each other. Let&apos;s grow together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="border-armstrong-grey-3 rounded-xl border p-4">
                  <span className="mb-2 block text-2xl" aria-hidden="true">
                    {b.icon}
                  </span>
                  <p className="text-armstrong-dark-blue text-sm font-semibold">{b.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job listings placeholder — will connect to ATS */}
          <div className="border-armstrong-grey-3 bg-armstrong-grey-3 mt-16 rounded-xl border p-10 text-center">
            <h2 className="text-armstrong-dark-blue mb-3 text-xl font-semibold">Open Positions</h2>
            <p className="text-armstrong-grey-1 mb-6">
              Browse current openings across all our locations. Job listings are updated regularly.
            </p>
            <a
              href="mailto:careers@goarmstrong.com"
              className="bg-armstrong-blue inline-block rounded-md px-6 py-3 font-semibold text-white hover:bg-[#0090d0]"
            >
              Express Your Interest
            </a>
            <p className="text-armstrong-grey-1 mt-3 text-xs">
              ATS integration coming soon — direct listing view available then.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Let's grow together."
        subhead="Join a team built on integrity, ambition, and real career opportunities."
        cta={{ label: 'Express Your Interest', href: 'mailto:careers@goarmstrong.com' }}
        variant="dark"
      />
    </>
  );
}

const BENEFITS = [
  { icon: '🏥', title: 'Health & dental benefits' },
  { icon: '📈', title: 'Career growth paths' },
  { icon: '📍', title: '33+ locations to grow in' },
  { icon: '🤝', title: 'Supportive team culture' },
  { icon: '💰', title: 'Competitive compensation' },
  { icon: '🚀', title: 'Entrepreneurial spirit' },
];
