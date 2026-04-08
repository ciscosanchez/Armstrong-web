import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABanner } from '@/components/sections/CTABanner';
import { getBlogPosts } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';

interface Props {
  params: Promise<{ category: string }>;
}

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  general: {
    label: 'Moving Tips',
    description: 'Practical packing guides, moving checklists, and residential relocation advice.',
  },
  service: {
    label: 'Service Guides',
    description:
      'In-depth guides for commercial moves, data centers, specialty items, and supply chain services.',
  },
  industry: {
    label: 'Industry Insights',
    description:
      'Logistics trends, supply chain analysis, sustainability initiatives, and market news.',
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};
  return {
    title: `${meta.label} | Armstrong Resources`,
    description: meta.description,
  };
}

export default async function ResourcesCategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) notFound();

  const articles = await getBlogPosts(category);

  return (
    <>
      <section className="bg-armstrong-dark-blue py-16 text-white">
        <div className="container-armstrong">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: meta.label },
            ]}
            variant="dark"
          />
          <h1 className="mt-6 text-4xl font-semibold">{meta.label}</h1>
          <p className="text-armstrong-grey-2 mt-3 max-w-2xl">{meta.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-armstrong">
          {/* Category pills */}
          <div className="mb-10 flex flex-wrap gap-3">
            <Link
              href="/resources"
              className="border-armstrong-grey-3 text-armstrong-grey-1 hover:bg-armstrong-grey-3 rounded-full border px-4 py-1.5 text-sm font-semibold"
            >
              All
            </Link>
            {Object.entries(CATEGORY_META).map(([slug, m]) => (
              <Link
                key={slug}
                href={`/resources/${slug}`}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  slug === category
                    ? 'bg-armstrong-dark-blue text-white'
                    : 'border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 border'
                }`}
              >
                {m.label}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <p className="text-armstrong-grey-1">
              No articles in this category yet — add one in the{' '}
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
                  href={`/resources/${category}/${article.slug.current}`}
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
                        {meta.label}
                      </span>
                      <span className="text-armstrong-grey-1 text-xs">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-armstrong-dark-blue group-hover:text-armstrong-blue mb-2 font-semibold transition-colors">
                      {article.title}
                    </h2>
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

      <CTABanner
        headline="Need expert moving advice?"
        subhead="Our team has moved everything from studio apartments to Fortune 500 headquarters."
        cta={{ label: 'Talk to a Specialist', href: '/get-moving-with-armstrong' }}
        variant="light"
      />
    </>
  );
}
