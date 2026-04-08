import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Can be anonymized (e.g., "Fortune 500 Retailer")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          'Retail',
          'Healthcare',
          'Technology',
          'Manufacturing',
          'Government',
          'Education',
          'Financial Services',
          'Other',
        ],
      },
    }),
    defineField({
      name: 'service',
      title: 'Primary Service',
      type: 'string',
      options: {
        list: [
          { title: 'Household Moving', value: 'residential' },
          { title: 'Commercial Moving', value: 'commercial' },
          { title: 'Supply Chain', value: 'supply_chain' },
          { title: 'Data Center', value: 'data_center' },
          { title: 'Warehousing', value: 'warehousing' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'blockContent',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'blockContent',
    }),
    defineField({
      name: 'results',
      title: 'The Results',
      type: 'blockContent',
    }),
    defineField({
      name: 'stats',
      title: 'Key Stats (optional)',
      description: 'Up to 3 headline numbers to show in the results section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g. 40%)' },
            { name: 'label', type: 'string', title: 'Label (e.g. reduction in move time)' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial (optional)',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote', rows: 3 },
        { name: 'attribution', type: 'string', title: 'Attribution (name, title, company)' },
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
});
