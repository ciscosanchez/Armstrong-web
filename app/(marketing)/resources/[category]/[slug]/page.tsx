import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTABanner } from '@/components/sections/CTABanner';
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { ArticleSchema } from '@/components/seo/ArticleSchema';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const CATEGORY_LABEL: Record<string, string> = {
  general: 'Moving Tips',
  service: 'Service Guides',
  industry: 'Industry Insights',
};

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ category: p.category, slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle ?? `${post.title} | Armstrong Resources`,
    description: post.seo?.metaDescription ?? post.excerpt,
    robots: post.seo?.noIndex ? { index: false } : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const categoryLabel = CATEGORY_LABEL[category] ?? CATEGORY_LABEL[post.category] ?? post.category;
  const categoryHref = `/resources/${category}`;

  return (
    <>
      <section className="bg-armstrong-dark-blue py-12 text-white">
        <div className="container-armstrong max-w-3xl">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: categoryLabel, href: categoryHref },
              { label: post.title },
            ]}
            variant="dark"
          />
        </div>
      </section>

      <ArticleSchema
        title={post.title}
        excerpt={post.excerpt ?? ''}
        publishedAt={post.publishedAt}
        slug={post.slug.current}
        category={category}
        {...(post.author?.name ? { authorName: post.author.name } : {})}
        {...(post.coverImage?.asset
          ? { coverImageUrl: urlFor(post.coverImage).width(800).height(420).url() }
          : {})}
      />

      <article className="py-16">
        <div className="container-armstrong max-w-3xl">
          <header className="mb-10">
            <div className="text-armstrong-grey-1 mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="bg-armstrong-blue/10 text-armstrong-blue rounded-full px-3 py-0.5 font-semibold">
                {categoryLabel}
              </span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              {post.author?.name && (
                <>
                  <span>·</span>
                  <span>By {post.author.name}</span>
                </>
              )}
            </div>
            <h1 className="text-armstrong-dark-blue text-4xl font-semibold">{post.title}</h1>
            {post.excerpt && (
              <p className="text-armstrong-grey-1 mt-4 text-lg leading-relaxed">{post.excerpt}</p>
            )}
          </header>

          {post.coverImage?.asset && (
            <Image
              src={urlFor(post.coverImage).width(800).height(420).url()}
              alt={post.coverImage.alt ?? post.title}
              width={800}
              height={420}
              className="mb-10 w-full rounded-xl object-cover"
              priority
            />
          )}

          {post.body && post.body.length > 0 ? (
            <PortableTextRenderer value={post.body} />
          ) : (
            <p className="text-armstrong-grey-1 italic">No content yet.</p>
          )}

          <div className="border-armstrong-grey-3 mt-10 border-t pt-8">
            <Link
              href={categoryHref}
              className="text-armstrong-blue text-sm font-semibold hover:underline"
            >
              ← Back to {categoryLabel}
            </Link>
          </div>
        </div>
      </article>

      <CTABanner
        headline={post.cta?.headline ?? 'Ready to put this knowledge to work?'}
        subhead={
          post.cta?.subhead ?? 'Talk to an Armstrong expert today — no obligation, no pressure.'
        }
        cta={{
          label: post.cta?.label ?? 'Get a Free Quote',
          href: post.cta?.href ?? '/get-moving-with-armstrong',
        }}
        variant="dark"
      />
    </>
  );
}
