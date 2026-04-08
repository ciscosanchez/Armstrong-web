import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-armstrong-grey-1 mb-5 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-armstrong-dark-blue mt-10 mb-4 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-armstrong-dark-blue mt-8 mb-3 text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-armstrong-dark-blue mt-6 mb-2 text-lg font-semibold">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-armstrong-blue text-armstrong-grey-1 my-6 border-l-4 pl-5 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-armstrong-grey-1 mb-5 list-disc space-y-1.5 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="text-armstrong-grey-1 mb-5 list-decimal space-y-1.5 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-armstrong-dark-blue font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-armstrong-grey-3 text-armstrong-dark-blue rounded px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-armstrong-blue underline underline-offset-2 hover:text-[#0090d0]"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt ?? ''}
            width={800}
            height={450}
            className="rounded-xl"
          />
          {value.caption && (
            <figcaption className="text-armstrong-grey-1 mt-2 text-center text-sm">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      const { url, caption, autoplay } = value as {
        url?: string;
        caption?: string;
        autoplay?: boolean;
      };
      if (!url) return null;

      const embedUrl = resolveVideoEmbedUrl(url, autoplay ?? false);
      if (!embedUrl) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-md">
            <iframe
              src={embedUrl}
              title={caption ?? 'Embedded video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          {caption && (
            <figcaption className="text-armstrong-grey-1 mt-2 text-center text-sm">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const styles: Record<string, string> = {
        info: 'border-armstrong-blue bg-armstrong-blue/5',
        warning: 'border-amber-400 bg-amber-50',
        tip: 'border-green-500 bg-green-50',
      };
      return (
        <div className={`my-6 rounded-xl border-l-4 p-5 ${styles[value.type] ?? styles.info}`}>
          <p className="text-armstrong-grey-1 text-sm leading-relaxed">{value.text}</p>
        </div>
      );
    },
  },
};

function resolveVideoEmbedUrl(url: string, autoplay: boolean): string | null {
  const ap = autoplay ? 1 : 0;

  // YouTube: youtube.com/watch?v=ID or youtu.be/ID
  const ytMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/) ?? url.match(/youtu\.be\/([\w-]+)/);
  if (ytMatch?.[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=${ap}&mute=${ap}&rel=0`;
  }

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${ap}&muted=${ap}`;
  }

  // Mux: stream.mux.com/PLAYBACK_ID.m3u8
  const muxMatch = url.match(/stream\.mux\.com\/([\w-]+)(?:\.m3u8)?/);
  if (muxMatch?.[1]) {
    return `https://stream.mux.com/${muxMatch[1]}?autoplay=${ap}`;
  }

  return null;
}

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />;
}
