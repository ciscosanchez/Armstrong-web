import { defineType, defineField } from 'sanity';

/**
 * videoEmbed — paste any YouTube, Vimeo, or Mux URL.
 * The renderer in PortableTextRenderer converts it to a responsive iframe.
 * Supported URL formats:
 *   YouTube: https://www.youtube.com/watch?v=VIDEO_ID
 *            https://youtu.be/VIDEO_ID
 *   Vimeo:   https://vimeo.com/VIDEO_ID
 *   Mux:     https://stream.mux.com/PLAYBACK_ID.m3u8
 */
export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Paste a YouTube, Vimeo, or Mux stream URL',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption shown below the video',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay (muted)',
      type: 'boolean',
      initialValue: false,
      description: 'Auto-play on page load (always muted — required by browsers)',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }: { url?: string; caption?: string }) {
      const platform =
        url?.includes('youtube') || url?.includes('youtu.be')
          ? 'YouTube'
          : url?.includes('vimeo')
            ? 'Vimeo'
            : url?.includes('mux')
              ? 'Mux'
              : 'Video';
      return {
        title: caption ?? `${platform} embed`,
        subtitle: url ?? 'No URL set',
        media: () => '🎬',
      };
    },
  },
});
