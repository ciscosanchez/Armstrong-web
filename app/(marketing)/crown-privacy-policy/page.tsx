import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crown WMS Privacy Policy | The Armstrong Company',
  description: 'Privacy policy for Crown Warehouse Management System users and clients.',
};

export default function CrownPrivacyPolicyPage() {
  return (
    <div className="py-16">
      <div className="container-armstrong max-w-3xl">
        <div className="bg-armstrong-blue mb-4 inline-block rounded-sm px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
          An Armstrong Company
        </div>
        <h1 className="text-armstrong-dark-blue mb-2 text-4xl font-semibold">
          Crown WMS Privacy Policy
        </h1>
        <p className="text-armstrong-grey-1 mb-10 text-sm">Effective: April 1, 2025</p>

        <div className="text-armstrong-grey-1 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-armstrong-dark-blue mb-3 text-2xl font-semibold">1. Scope</h2>
            <p>
              This Privacy Policy applies to Crown Warehouse Management System (&ldquo;Crown
              WMS&rdquo;), a proprietary logistics platform operated by The Armstrong Company. It
              governs the collection and use of data from Crown WMS client users and does not
              replace the Armstrong Company&apos;s general{' '}
              <Link href="/privacy-policy" className="text-armstrong-blue hover:underline">
                Privacy Policy
              </Link>
              , which also applies.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue mb-3 text-2xl font-semibold">
              2. Data Collected
            </h2>
            <p className="mb-3">
              Crown WMS collects and processes the following categories of data:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Client account information (company name, authorized users, contact details)</li>
              <li>Inventory records (SKUs, quantities, bin locations, transaction history)</li>
              <li>Order and shipment records</li>
              <li>User activity logs (logins, actions, report queries)</li>
              <li>System performance and error logs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue mb-3 text-2xl font-semibold">3. Data Use</h2>
            <p>
              Data collected by Crown WMS is used solely to provide warehousing and logistics
              services to clients, generate client-facing reports, ensure system security, and
              comply with legal obligations. Armstrong does not use client inventory data for any
              purpose beyond service delivery.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue mb-3 text-2xl font-semibold">
              4. Data Security
            </h2>
            <p>
              Crown WMS data is stored in encrypted databases with access controls restricted to
              authorized Armstrong personnel and the client&apos;s designated users. All data in
              transit is encrypted via TLS. User access requires multi-factor authentication.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue mb-3 text-2xl font-semibold">
              5. Data Retention & Deletion
            </h2>
            <p>
              Client data is retained for the duration of the service agreement and for up to 7
              years thereafter to meet recordkeeping requirements. Upon request and subject to legal
              obligations, Armstrong will delete client data within 30 days of account termination.
            </p>
          </section>

          <section>
            <h2 className="text-armstrong-dark-blue mb-3 text-2xl font-semibold">6. Contact</h2>
            <p>
              For questions about Crown WMS data practices, contact{' '}
              <a
                href="mailto:privacy@goarmstrong.com"
                className="text-armstrong-blue hover:underline"
              >
                privacy@goarmstrong.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
