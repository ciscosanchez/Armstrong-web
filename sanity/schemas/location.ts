import { defineField, defineType } from 'sanity';

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State (2-letter)',
      type: 'string',
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: unknown) => {
          const d = doc as { city?: string; state?: string };
          return `${d.city ?? ''}-${d.state ?? ''}`.toLowerCase().replace(/\s+/g, '-');
        },
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Residential Moving', value: 'residential' },
          { title: 'Commercial Moving', value: 'commercial' },
          { title: 'Supply Chain', value: 'supply_chain' },
          { title: 'Data Center', value: 'data_center' },
          { title: 'Warehousing', value: 'warehousing' },
          { title: 'International', value: 'international' },
        ],
      },
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Area Cities',
      description: 'Comma-separated or one per line',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bio',
      title: 'Location Bio',
      description: 'Custom content for this location page (optional)',
      type: 'blockContent',
    }),
    defineField({
      name: 'manager',
      title: 'Branch Manager Name (optional)',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'string',
      placeholder: 'Mon–Fri 8am–6pm · Sat 9am–2pm',
    }),
    defineField({
      name: 'active',
      title: 'Active / Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    { title: 'City A–Z', name: 'cityAsc', by: [{ field: 'city', direction: 'asc' }] },
    { title: 'State', name: 'stateAsc', by: [{ field: 'state', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'city', subtitle: 'state' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: `${title ?? ''}, ${subtitle ?? ''}` };
    },
  },
});
