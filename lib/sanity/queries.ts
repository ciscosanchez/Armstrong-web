import 'server-only';
import { sanityClient } from './client';

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  author?: { name: string; photo?: { asset: { _ref: string } } };
  body?: unknown[];
  cta?: { headline?: string; subhead?: string; label?: string; href?: string };
  seo?: { metaTitle?: string; metaDescription?: string; noIndex?: boolean };
}

const BLOG_POST_CARD_FIELDS = `
  _id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  coverImage { asset, alt },
  "author": author->{ name, photo { asset } }
`;

export async function getBlogPosts(category?: string): Promise<SanityBlogPost[]> {
  const filter = category
    ? `*[_type == "blogPost" && category == $category && !(_id in path("drafts.**"))]`
    : `*[_type == "blogPost" && !(_id in path("drafts.**"))]`;
  return sanityClient.fetch<SanityBlogPost[]>(
    `${filter} | order(publishedAt desc) { ${BLOG_POST_CARD_FIELDS} }`,
    category ? { category } : {},
    { next: { revalidate: 3600 } },
  );
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return sanityClient.fetch<SanityBlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      ${BLOG_POST_CARD_FIELDS},
      body,
      cta,
      seo
    }`,
    { slug },
    { next: { revalidate: 3600 } },
  );
}

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------

export interface SanityCaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  industry?: string;
  service?: string;
  excerpt: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  challenge?: unknown[];
  solution?: unknown[];
  results?: unknown[];
  stats?: Array<{ value: string; label: string }>;
  testimonial?: { quote: string; attribution: string };
  featured?: boolean;
  publishedAt?: string;
}

export async function getCaseStudies(): Promise<SanityCaseStudy[]> {
  return sanityClient.fetch<SanityCaseStudy[]>(
    `*[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id, title, slug, client, industry, service, excerpt, coverImage { asset, alt }, featured
    }`,
    {},
    { next: { revalidate: 3600 } },
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<SanityCaseStudy | null> {
  return sanityClient.fetch<SanityCaseStudy | null>(
    `*[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))][0]`,
    { slug },
    { next: { revalidate: 3600 } },
  );
}

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------

export interface SanityLocation {
  _id: string;
  city: string;
  state: string;
  slug: { current: string };
  phone: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  services?: string[];
  serviceAreas?: string[];
  bio?: unknown[];
  manager?: string;
  hours?: string;
  active: boolean;
}

export async function getSanityLocations(): Promise<SanityLocation[]> {
  return sanityClient.fetch<SanityLocation[]>(
    `*[_type == "location" && active == true && !(_id in path("drafts.**"))] | order(city asc)`,
    {},
    { next: { revalidate: 86400 } },
  );
}

export async function getSanityLocationBySlug(slug: string): Promise<SanityLocation | null> {
  return sanityClient.fetch<SanityLocation | null>(
    `*[_type == "location" && slug.current == $slug && active == true && !(_id in path("drafts.**"))][0]`,
    { slug },
    { next: { revalidate: 86400 } },
  );
}
