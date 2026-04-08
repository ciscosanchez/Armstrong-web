import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABanner } from '@/components/sections/CTABanner';
import { getBlogPosts } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';

export const metadata: Metadata = {
  title: 'Moving Resources & Guides | The Armstrong Company',
  description:
    'Expert moving tips, packing guides, relocation checklists, and logistics insights from The Armstrong Company — helping you move smarter.',
};

const CATEGORIES = [
  {
    slug: 'general',
    label: 'Moving Tips',
    description: 'Practical advice for residential and local moves',
  },
  {
    slug: 'service',
    label: 'Service Guides',
    description: 'Deep dives into commercial, data center, and specialty services',
  },
  {
    slug: 'industry',
    label: 'Industry Insights',
    description: 'Logistics trends, supply chain analysis, and market news',
  },
];

const CATEGORY_LABEL: Record<string, string> = {
  general: 'Moving Tips',
  service: 'Service Guides',
  industry: 'Industry Insights',
};

export default async function ResourcesPage() {
  const articles = await getBlogPosts();

  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold lg:text-5xl">Moving Resources &amp; Guides</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">
            Expert advice from people who&apos;ve moved everything, everywhere. Whether you&apos;re
            planning a household move or a supply chain overhaul, start here.
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="border-armstrong-grey-3 border-b bg-white py-8">
        <div className="container-armstrong">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/resources"
              className="bg-armstrong-dark-blue rounded-full px-5 py-2 text-sm font-semibold text-white"
            >
              All Articles
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/resources/${cat.slug}`}
                className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 rounded-full border px-5 py-2 text-sm font-semibold"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16">
        <div className="container-armstrong">
          {articles.length === 0 ? (
            <p className="text-armstrong-grey-1">
              No articles published yet — add your first post in the{' '}
              <Link href="/studio" className="text-armstrong-blue underline">
                Sanity Studio
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/resources/${article.category}/${article.slug.current}`}
                  className="group border-armstrong-grey-3 flex flex-col rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {article.coverImage?.asset ? (
                    <Image
                      src={urlFor(article.coverImage).width(600).height(300).url()}
                      alt={article.coverImage.alt ?? article.title}
                      width={600}
                      height={300}
                      className="h-44 w-full rounded-t-xl object-cover"
                    />
                  ) : (
                    <div className="bg-armstrong-dark-blue/10 h-44 rounded-t-xl" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="bg-armstrong-blue/10 text-armstrong-blue rounded-full px-2.5 py-0.5 text-xs font-semibold">
                        {CATEGORY_LABEL[article.category] ?? article.category}
                      </span>
                      <span className="text-armstrong-grey-1 text-xs">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-armstrong-dark-blue group-hover:text-armstrong-blue mb-2 font-semibold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-armstrong-grey-1 flex-1 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                    <span className="text-armstrong-blue mt-4 text-sm font-semibold">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category cards */}
      <section className="border-armstrong-grey-3 bg-armstrong-grey-3 border-t py-16">
        <div className="container-armstrong">
          <h2 className="text-armstrong-dark-blue mb-8 text-center text-2xl font-semibold">
            Browse by topic
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/resources/${cat.slug}`}
                className="group rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-armstrong-dark-blue group-hover:text-armstrong-blue mb-1 font-semibold transition-colors">
                  {cat.label}
                </h3>
                <p className="text-armstrong-grey-1 text-sm">{cat.description}</p>
                <span className="text-armstrong-blue mt-3 block text-sm font-semibold">
                  Browse →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to put this knowledge to work?"
        subhead="Talk to an Armstrong moving expert today — no obligation, no pressure."
        cta={{ label: 'Get a Free Quote', href: '/get-moving-with-armstrong' }}
        variant="dark"
      />
    </>
  );
}
