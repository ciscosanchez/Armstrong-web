interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  category: string;
  authorName?: string;
  coverImageUrl?: string;
}

export function ArticleSchema({
  title,
  excerpt,
  publishedAt,
  slug,
  category,
  authorName,
  coverImageUrl,
}: ArticleSchemaProps) {
  const url = `https://goarmstrong.com/resources/${category}/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@type': 'Organization', name: 'The Armstrong Company', url: 'https://goarmstrong.com' },
    publisher: {
      '@type': 'Organization',
      name: 'The Armstrong Company',
      url: 'https://goarmstrong.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goarmstrong.com/images/armstrong-logo.svg',
      },
    },
    ...(coverImageUrl && {
      image: {
        '@type': 'ImageObject',
        url: coverImageUrl,
        width: 800,
        height: 420,
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
