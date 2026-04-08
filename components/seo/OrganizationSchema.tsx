// JSON-LD Organization schema — appears on every page via marketing layout
// https://schema.org/Organization
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Armstrong Company',
    legalName: 'The Armstrong Company',
    url: 'https://goarmstrong.com',
    logo: 'https://goarmstrong.com/images/armstrong-logo.svg',
    foundingDate: '1957',
    description:
      'Full-service moving, storage and logistics. The Armstrong Company is a global leader in supply chain services and residential and commercial moving.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8275 Tournament Drive, Suite 200',
      addressLocality: 'Memphis',
      addressRegion: 'TN',
      postalCode: '38125',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-288-7396',
      contactType: 'customer service',
      email: 'info@goarmstrong.com',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/thearmstrongcompany',
      'https://www.linkedin.com/company/goarmstrong/',
      'https://www.instagram.com/thearmstrongcompany/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
