import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const readToken = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-04-07',
  useCdn: process.env.NODE_ENV === 'production',
  // Use SANITY_API_READ_TOKEN for draft previews (only passed when defined)
  ...(readToken ? { token: readToken } : {}),
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
