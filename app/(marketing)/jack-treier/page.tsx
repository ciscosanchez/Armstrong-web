import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Jack Treier Moving & Storage | The Armstrong Company',
  description:
    'Jack Treier Moving & Storage is an Armstrong Company — serving the Mid-Atlantic region with residential and commercial relocation services since 1946.',
};

export default function JackTreierPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Jack Treier Moving & Storage' }]}
            variant="dark"
          />
          <div className="bg-armstrong-blue mt-6 inline-block rounded-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            An Armstrong Company
          </div>
          <h1 className="mt-3 text-4xl font-semibold lg:text-5xl">
            Jack Treier Moving &amp; Storage
          </h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Serving the Mid-Atlantic for over 75 years — now backed by Armstrong&apos;s national
            network.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Our Story
            </p>
            <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold">
              Local roots. National reach.
            </h2>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Jack Treier Moving &amp; Storage has been a trusted name in Mid-Atlantic relocation
              since 1946. What started as a family-operated moving company in Pennsylvania has grown
              into one of the region&apos;s most respected moving and storage providers.
            </p>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              As part of The Armstrong Company, Jack Treier clients now have access to a full
              national network — same local service, bigger capabilities.
            </p>
            <p className="text-armstrong-grey-1 leading-relaxed">
              Whether you&apos;re moving across town or across the country, our Mid-Atlantic crews
              bring the same care and professionalism that Jack Treier has been known for since day
              one.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-armstrong-dark-blue rounded-xl p-8 text-white">
              <p className="text-armstrong-blue text-5xl font-bold">1946</p>
              <p className="text-armstrong-grey-2 mt-1">Founded in Pennsylvania</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-armstrong-grey-3 rounded-xl border p-6 text-center">
                <p className="text-armstrong-dark-blue text-3xl font-bold">75+</p>
                <p className="text-armstrong-grey-1 text-sm">Years in business</p>
              </div>
              <div className="border-armstrong-grey-3 rounded-xl border p-6 text-center">
                <p className="text-armstrong-dark-blue text-3xl font-bold">PA</p>
                <p className="text-armstrong-grey-1 text-sm">Mid-Atlantic HQ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong max-w-3xl">
          <h2 className="text-armstrong-dark-blue mb-8 text-center text-3xl font-semibold">
            Services in the Mid-Atlantic
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Local &amp; long-distance residential moving',
              'Commercial office relocation',
              'Short and long-term storage',
              'Senior and specialty moves',
              'International relocation (via Armstrong)',
              'Packing and unpacking services',
            ].map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <span className="bg-armstrong-blue flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                  ✓
                </span>
                <span
                  className="text-armstrong-dark-blue text-sm"
                  dangerouslySetInnerHTML={{ __html: service }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to move with Jack Treier?"
        subhead="Get a free estimate from your local Mid-Atlantic team."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
