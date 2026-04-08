import { author } from './author';
import { blockContent } from './blockContent';
import { blogPost } from './blogPost';
import { caseStudy } from './caseStudy';
import { location } from './location';
import { servicePage } from './servicePage';

export const schemaTypes = [
  // Singletons / shared
  blockContent,
  author,
  // Content documents
  blogPost,
  caseStudy,
  servicePage,
  location,
];
