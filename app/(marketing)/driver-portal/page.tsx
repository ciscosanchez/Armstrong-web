import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Driver & Crew Portal | The Armstrong Company',
  description:
    'Armstrong driver and crew portal — access your assignments, route details, paperwork, and company resources.',
  robots: { index: false, follow: false }, // keep portal out of search results
};

const PORTAL_LINKS = [
  {
    title: 'My Assignments',
    description:
      'View your upcoming and active move assignments, customer details, and pickup times.',
    icon: ClipboardIcon,
    href: '#assignments',
    status: 'Coming soon',
  },
  {
    title: 'Route & Navigation',
    description: 'Get turn-by-turn directions, stop sequences, and delivery confirmations.',
    icon: MapIcon,
    href: '#routes',
    status: 'Coming soon',
  },
  {
    title: 'Digital Bill of Lading',
    description: 'Complete, sign, and submit Bills of Lading digitally — no paperwork required.',
    icon: DocumentIcon,
    href: '#bol',
    status: 'Coming soon',
  },
  {
    title: 'Timesheets & Pay Stubs',
    description: 'Submit hours, view pay history, and download your pay stubs.',
    icon: ClockIcon,
    href: '#timesheets',
    status: 'Coming soon',
  },
  {
    title: 'Safety Checklists',
    description: 'Complete pre-trip vehicle inspections and daily safety forms.',
    icon: ShieldIcon,
    href: '#safety',
    status: 'Coming soon',
  },
  {
    title: 'Training & Certifications',
    description: 'Access required training modules and track your certification status.',
    icon: AcademicIcon,
    href: '#training',
    status: 'Coming soon',
  },
];

const QUICK_CONTACTS = [
  { label: 'Dispatch', phone: '800-288-7396', hours: '24/7' },
  { label: 'HR Department', phone: '800-288-7396', hours: 'Mon–Fri, 8am–5pm CT' },
  { label: 'Safety Line', phone: '800-288-7396', hours: '24/7' },
];

export default function DriverPortalPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-12 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Driver & Crew Portal' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold">Driver &amp; Crew Portal</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-xl">
            Welcome back. Access your assignments, paperwork, training, and company resources all in
            one place.
          </p>
        </div>
      </section>

      {/* Notice banner */}
      <div className="border-b border-amber-200 bg-amber-50 py-3">
        <div className="container-armstrong flex items-center gap-3 text-sm text-amber-800">
          <span className="font-semibold">Portal in development.</span>
          <span>
            Full digital tools are coming soon. In the meantime, contact dispatch for assignments.
          </span>
        </div>
      </div>

      {/* Portal tiles */}
      <section className="py-16">
        <div className="container-armstrong">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PORTAL_LINKS.map(({ title, description, icon: Icon, status }) => (
              <div
                key={title}
                className="border-armstrong-grey-3 flex flex-col rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="bg-armstrong-dark-blue/5 text-armstrong-dark-blue mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon />
                </div>
                <h2 className="text-armstrong-dark-blue mb-1 font-semibold">{title}</h2>
                <p className="text-armstrong-grey-1 mb-4 flex-1 text-sm leading-relaxed">
                  {description}
                </p>
                <span className="bg-armstrong-grey-3 text-armstrong-grey-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick contacts */}
      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong">
          <h2 className="text-armstrong-dark-blue mb-8 text-2xl font-semibold">
            Need help now? Contact us directly.
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {QUICK_CONTACTS.map(({ label, phone, hours }) => (
              <div key={label} className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-armstrong-grey-1 mb-1 text-sm font-semibold tracking-wider uppercase">
                  {label}
                </p>
                <a
                  href={`tel:+1${phone.replace(/\D/g, '')}`}
                  className="text-armstrong-blue block text-xl font-semibold hover:underline"
                >
                  {phone}
                </a>
                <p className="text-armstrong-grey-1 mt-1 text-xs">{hours}</p>
              </div>
            ))}
          </div>

          <div className="border-armstrong-grey-3 mt-10 rounded-xl border bg-white p-6">
            <h3 className="text-armstrong-dark-blue mb-3 font-semibold">Current employees</h3>
            <p className="text-armstrong-grey-1 mb-4 text-sm">
              For payroll, benefits, HR inquiries, or to report a safety incident, reach out to your
              regional HR coordinator or email{' '}
              <a href="mailto:hr@goarmstrong.com" className="text-armstrong-blue hover:underline">
                hr@goarmstrong.com
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/careers"
                className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded-md border px-4 py-2 text-sm font-semibold"
              >
                Open positions
              </Link>
              <Link
                href="/safety"
                className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded-md border px-4 py-2 text-sm font-semibold"
              >
                Safety resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Icons ─────────────────────────────────────────────────

function ClipboardIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function AcademicIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
