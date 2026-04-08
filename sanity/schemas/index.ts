import { author } from './author';
import { blockContent } from './blockContent';
import { blogPost } from './blogPost';
import { caseStudy } from './caseStudy';
import { location } from './location';
import { servicePage } from './servicePage';
import { videoEmbed } from './videoEmbed';

export const schemaTypes = [
  // Singletons / shared
  blockContent,
  author,
  videoEmbed,
  // Content documents
  blogPost,
  caseStudy,
  servicePage,
  location,
];
