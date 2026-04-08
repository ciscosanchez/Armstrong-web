import type { Metadata } from 'next';
import { CTABanner } from '@/components/sections/CTABanner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'About The Armstrong Team and Our Values',
  description:
    "The Armstrong team values integrity, honesty, and respect. We strive to exceed our customers' expectations at every turn. Founded 1957, Memphis, TN.",
};

const VALUES = [
  {
    title: 'Expertly Intuitive',
    description:
      "Through active listening and empathy, we anticipate our clients' needs before they have to ask.",
  },
  {
    title: 'Devoted',
    description:
      'We go to great lengths for our clients. Their success is our success — full stop.',
  },
  {
    title: 'Positively Ambitious',
    description:
      'With a can-do attitude, we are proactive in taking new opportunities and tackling challenges.',
  },
  {
    title: 'Enterprising',
    description:
      "Entrepreneurial spirit with managed risk — leading ourselves and others toward what's next.",
  },
  {
    title: 'Responsible',
    description:
      'We act with integrity, a foundation of family values and moral standing. We shoulder the blame when things go wrong and give credit when they go right.',
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} variant="dark" />
          <h1 className="mt-6 text-4xl font-semibold text-balance lg:text-5xl">
            About the Armstrong Team and Our Values
          </h1>
        </div>
      </section>

      {/* Opening paragraph — Brand Guidelines §2.5 */}
      <section className="py-16">
        <div className="container-armstrong grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Our Story
            </p>
            <h2 className="text-armstrong-dark-blue mb-6 text-3xl font-semibold">
              We&apos;ve been around long enough to hear all the stories.
            </h2>
            {/* Brand Guidelines §2.5 — Opening Paragraph */}
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              We&apos;ve been in this business long enough to hear all the stories — promises that
              weren&apos;t kept, vendors that didn&apos;t listen, relationships gone bad. Those
              people didn&apos;t hire The Armstrong Company.
            </p>
            <p className="text-armstrong-grey-1 mb-4 leading-relaxed">
              Whether we&apos;re moving your household, your business, or your product, our expert
              team will partner with you to make the process as easy as it should be. With decades
              of experience and an ironclad commitment to customer success, we do what it takes to
              get your goods where they need to go, across the block or around the globe.
            </p>
            {/* Brand Guidelines §2.7 — Our Story key message */}
            <p className="text-armstrong-grey-1 leading-relaxed">
              The Armstrong Company started in 1957 as a small, family-owned mover in Memphis. Three
              generations of commitment, innovation, and sacrifice later, we&apos;ve grown from a
              small loan and a single warehouse into a global logistics leader supported by a group
              of hardworking and invested partners. And while our business — and our dreams —
              continue to grow, we remain committed to the promise that has always set us apart: At
              Armstrong, our world moves around you.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-armstrong-dark-blue rounded-xl p-8 text-white">
              <p className="text-armstrong-blue text-5xl font-bold">1957</p>
              <p className="text-armstrong-grey-2 mt-1">Founded in Memphis, TN</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-armstrong-grey-3 rounded-xl border p-6 text-center">
                <p className="text-armstrong-dark-blue text-3xl font-bold">3</p>
                <p className="text-armstrong-grey-1 text-sm">Generations of family ownership</p>
              </div>
              <div className="border-armstrong-grey-3 rounded-xl border p-6 text-center">
                <p className="text-armstrong-dark-blue text-3xl font-bold">33+</p>
                <p className="text-armstrong-grey-1 text-sm">Locations nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Brand Guidelines §1.2 Personality Attributes */}
      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong">
          <div className="mb-10 text-center">
            <p className="text-armstrong-blue mb-2 text-sm font-semibold tracking-wider uppercase">
              Our Values
            </p>
            <h2 className="text-armstrong-dark-blue text-3xl font-semibold">
              The character behind the company
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-armstrong-dark-blue mb-2 font-semibold">{value.title}</h3>
                <p className="text-armstrong-grey-1 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Make your next move your best move."
        subhead="Talk to one of our moving experts today."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
