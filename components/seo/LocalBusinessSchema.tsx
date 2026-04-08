import type { LocationData } from '@/lib/locations/data';

interface LocalBusinessSchemaProps {
  location: LocationData;
}

// JSON-LD LocalBusiness schema for individual location pages
export function LocalBusinessSchema({ location }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: `The Armstrong Company — ${location.city}`,
    image: 'https://goarmstrong.com/images/armstrong-logo.svg',
    url: `https://goarmstrong.com/locations/${location.slug}`,
    telephone: location.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: 'US',
    },
    geo: location.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        }
      : undefined,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'The Armstrong Company',
      url: 'https://goarmstrong.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
