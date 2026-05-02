import { useEffect, useState } from 'react';

export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: TocHeading[];
}

/**
 * Sticky table of contents for the longform argument layout. Highlights the
 * heading currently in the viewport via IntersectionObserver. Renders the
 * same flat list on all viewports — the parent layout decides where it
 * appears (sticky aside on lg+, bottom <Sheet> on mobile).
 */
export default function ArgumentTOC({ headings }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0.1 },
    );

    const elements = headings
      .map(h => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return <p className="text-muted-foreground italic text-sm">Brak nagłówków.</p>;
  }

  return (
    <ol className="space-y-1.5 border-l border-border/40 text-sm">
      {headings.map((h) => {
        const active = activeSlug === h.slug;
        return (
          <li key={h.slug} style={{ paddingLeft: `${(h.depth - 2) * 0.75 + 0.75}rem` }}>
            <a
              href={`#${h.slug}`}
              className={`block py-1 -ml-px border-l-2 pl-3 transition-colors ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              style={{ fontSize: h.depth === 2 ? '0.875rem' : '0.8rem' }}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
