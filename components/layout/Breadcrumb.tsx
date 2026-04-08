import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
}

export function Breadcrumb({ items, variant = 'light' }: BreadcrumbProps) {
  const linkClass =
    variant === 'dark'
      ? 'text-armstrong-grey-2 hover:text-white'
      : 'text-armstrong-grey-1 hover:text-armstrong-blue';

  const separatorClass = variant === 'dark' ? 'text-armstrong-grey-1' : 'text-armstrong-grey-2';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://goarmstrong.com${item.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <span className={separatorClass} aria-hidden="true">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={variant === 'dark' ? 'text-white' : 'text-armstrong-dark-blue'}
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
