import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Armstrong Company',
  description:
    'The Armstrong Company privacy policy — how we collect, use, and protect your personal information, including CCPA rights for California residents.',
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = 'April 1, 2025';
const LAST_UPDATED = 'April 1, 2025';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <div className="container-armstrong max-w-3xl">
        <h1 className="text-armstrong-dark-blue mb-2 text-4xl font-semibold">Privacy Policy</h1>
        <p className="text-armstrong-grey-1 mb-10 text-sm">
          Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
        </p>

        <div className="prose prose-slate text-armstrong-grey-1 max-w-none space-y-10 leading-relaxed">
          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">1. Who We Are</h2>
            <p>
              The Armstrong Company (&ldquo;Armstrong,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo;
              or &ldquo;us&rdquo;) is a full-service moving, storage, and logistics company
              headquartered in Memphis, Tennessee, operating 33+ locations across the United States.
              This Privacy Policy applies to our website at goarmstrong.com and all associated
              subpages.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              2. Information We Collect
            </h2>
            <p className="mb-3">We collect information in three ways:</p>
            <h3 className="text-armstrong-dark-blue text-lg font-semibold">
              Information you provide directly
            </h3>
            <ul className="mb-4 list-disc space-y-1 pl-5">
              <li>
                Name, email address, phone number, and mailing address when you request a quote,
                submit a contact form, schedule a virtual survey, or apply for credit
              </li>
              <li>
                Move details (origin/destination ZIP codes, home size, move date) when using our
                Ballpark Estimate or other tools
              </li>
              <li>Business information when submitting a commercial credit application</li>
              <li>Any other information you choose to provide in form fields or correspondence</li>
            </ul>
            <h3 className="text-armstrong-dark-blue text-lg font-semibold">
              Information collected automatically
            </h3>
            <ul className="mb-4 list-disc space-y-1 pl-5">
              <li>Browser type, operating system, device type, screen resolution</li>
              <li>IP address and approximate geographic location (city/region level)</li>
              <li>Pages visited, time spent on each page, referring URL, and exit page</li>
              <li>Interactions with forms, buttons, and interactive tools (with your consent)</li>
              <li>Session identifiers stored in first-party cookies</li>
            </ul>
            <h3 className="text-armstrong-dark-blue text-lg font-semibold">
              Information from third parties
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Google Analytics 4 aggregated traffic and engagement data (subject to your consent
                choices)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To respond to your quote requests, inquiries, and service requests</li>
              <li>To provide moving estimates and pricing information</li>
              <li>To schedule and coordinate your move or service appointment</li>
              <li>To route your information to our sales team and our CRM (NetSuite)</li>
              <li>To send transactional emails (quote confirmations, appointment reminders)</li>
              <li>To analyze site performance and improve our services (with consent)</li>
              <li>To detect and prevent fraud, spam, and abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              4. Cookies &amp; Tracking Technologies
            </h2>
            <p className="mb-3">
              We use first-party cookies and similar technologies. By category:
            </p>
            <dl className="space-y-3">
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">Strictly necessary</dt>
                <dd>
                  Session cookies required for the site to function (CSRF protection, session
                  identification). These cannot be disabled.
                </dd>
              </div>
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">
                  Analytics (consent required)
                </dt>
                <dd>
                  Google Analytics 4 measures site traffic and engagement. We use GA4 Consent Mode
                  v2. If you decline analytics cookies, GA4 will not receive identifiable data about
                  your visit.
                </dd>
              </div>
              <div>
                <dt className="text-armstrong-dark-blue font-semibold">
                  Behavioral tracking (consent required)
                </dt>
                <dd>
                  Our first-party event tracking records page views, form interactions, and tool
                  usage to help our sales team understand customer needs. All events are tied to a
                  pseudonymous session ID, not to your name or email.
                </dd>
              </div>
            </dl>
            <p className="mt-3">
              You can manage your consent preferences at any time using the consent banner or by
              clearing your browser cookies. Note that declining analytics does not affect your
              ability to use any feature of our site.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              5. How We Share Your Information
            </h2>
            <p className="mb-3">
              We do not sell your personal information. We share information only as follows:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Armstrong branch offices:</strong> Your move request may be routed to the
                Armstrong location best suited to serve you.
              </li>
              <li>
                <strong>NetSuite (CRM):</strong> Lead and customer data is stored in our NetSuite
                instance for sales follow-up and account management.
              </li>
              <li>
                <strong>Resend (transactional email):</strong> We use Resend to send confirmation
                and follow-up emails.
              </li>
              <li>
                <strong>Cloudflare:</strong> Our site is protected by Cloudflare, which processes
                request metadata to prevent DDoS and bot attacks.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information if required by law,
                court order, or to protect Armstrong&apos;s rights.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              6. California Privacy Rights (CCPA)
            </h2>
            <p className="mb-3">
              If you are a California resident, you have the following rights under the California
              Consumer Privacy Act (CCPA), as amended by the CPRA:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Right to Know:</strong> You can request a copy of the personal information
                we have collected about you in the past 12 months.
              </li>
              <li>
                <strong>Right to Delete:</strong> You can request that we delete the personal
                information we have collected from you, subject to certain exceptions.
              </li>
              <li>
                <strong>Right to Correct:</strong> You can request that we correct inaccurate
                personal information we hold about you.
              </li>
              <li>
                <strong>Right to Opt Out of Sale/Sharing:</strong> We do not sell or share personal
                information for cross-context behavioral advertising.
              </li>
              <li>
                <strong>Right to Limit Use of Sensitive Personal Information:</strong> We do not use
                sensitive personal information beyond what is necessary to provide our services.
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not discriminate against you
                for exercising any of your CCPA rights.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a
                href="mailto:privacy@goarmstrong.com"
                className="text-armstrong-blue hover:underline"
              >
                privacy@goarmstrong.com
              </a>{' '}
              or call{' '}
              <a href="tel:+18005551234" className="text-armstrong-blue hover:underline">
                1-800-555-1234
              </a>
              . We will respond within 45 days.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">7. Data Retention</h2>
            <p>
              We retain lead and customer data in our CRM for as long as there is an active or
              potential business relationship, or as required by law. Analytics data is retained for
              14 months per our Google Analytics configuration. You may request deletion at any
              time.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">8. Security</h2>
            <p>
              We implement industry-standard security measures including HTTPS/TLS encryption, CSRF
              protection, rate limiting, bot protection via Cloudflare Turnstile, and access
              controls on all systems that handle personal data. No method of transmission is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our site is not directed at children under 16. We do not knowingly collect personal
              information from anyone under 16. If you believe a child has submitted personal
              information to us, please contact us at privacy@goarmstrong.com.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              announced on this page with a revised effective date. Continued use of our site after
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue text-2xl font-semibold">11. Contact Us</h2>
            <address className="not-italic">
              <p>The Armstrong Company</p>
              <p>Privacy Team</p>
              <p>Memphis, TN</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:privacy@goarmstrong.com"
                  className="text-armstrong-blue hover:underline"
                >
                  privacy@goarmstrong.com
                </a>
              </p>
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
