import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Humboldt Moving & Storage | The Armstrong Company',
  description:
    'Humboldt Moving & Storage is an Armstrong Company — trusted residential and commercial movers serving the greater Memphis area and beyond since 1922.',
};

export default function HumboldtHomePage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Humboldt Moving & Storage' }]}
            variant="dark"
          />
          <div className="bg-armstrong-blue mt-6 inline-block rounded-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            An Armstrong Company
          </div>
          <h1 className="mt-3 text-4xl font-semibold lg:text-5xl">Humboldt Moving &amp; Storage</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Over a century of moving experience — now part of Armstrong&apos;s national family.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Our Heritage
            </p>
            <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold">
              A century of moving people forward
            </h2>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Humboldt Moving &amp; Storage has been a cornerstone of Memphis-area relocation since
              1922 — one of the oldest moving companies in the Mid-South. For generations, families
              and businesses have trusted Humboldt to handle their most important moves.
            </p>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              As an Armstrong Company, Humboldt now brings the same hometown care alongside a
              national network that reaches all 50 states and over 180 countries.
            </p>
            <p className="text-armstrong-grey-1 leading-relaxed">
              Our Memphis crews know the city — every street, every neighborhood — and they bring
              that local knowledge to every single move.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-armstrong-dark-blue rounded-xl p-8 text-white">
              <p className="text-armstrong-blue text-5xl font-bold">1922</p>
              <p className="text-armstrong-grey-2 mt-1">Founded in Memphis, TN</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-armstrong-grey-3 rounded-xl border p-6 text-center">
                <p className="text-armstrong-dark-blue text-3xl font-bold">100+</p>
                <p className="text-armstrong-grey-1 text-sm">Years of service</p>
              </div>
              <div className="border-armstrong-grey-3 rounded-xl border p-6 text-center">
                <p className="text-armstrong-dark-blue text-3xl font-bold">TN</p>
                <p className="text-armstrong-grey-1 text-sm">Mid-South HQ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong max-w-3xl">
          <h2 className="text-armstrong-dark-blue mb-8 text-center text-3xl font-semibold">
            What Humboldt offers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Local Memphis residential moving',
              'Long-distance moves nationwide',
              'Commercial & office relocation',
              'Packing, crating & storage',
              'Senior moving & downsizing',
              'International moves via Armstrong',
            ].map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <span className="bg-armstrong-blue flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-armstrong-dark-blue text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Moving in Memphis? Let's talk."
        subhead="Humboldt has been Memphis's moving company for over 100 years. Let's make your move next."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
