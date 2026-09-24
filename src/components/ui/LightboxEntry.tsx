import type { ReactNode } from 'react';

interface LightboxEntryProps {
  /** Zero-based position of the entry in its lightbox. */
  index: number;
  /** Number of entries in the lightbox. */
  length: number;
  /** Anchor prefix of the lightbox entries (e.g. "lightbox-travel"). */
  entryPrefix: string;
  /** Anchor prefix of the grid tiles the close button returns to. */
  tilePrefix: string;
  title: string;
  description: string;
  /** The media wrapper shown above the caption (see lightbox.css). */
  children: ReactNode;
}

/**
 * A single fullscreen lightbox entry: counter, close button, previous/next
 * navigation wrapping around at both ends, the media and its caption.
 */
export default function LightboxEntry({
  index,
  length,
  entryPrefix,
  tilePrefix,
  title,
  description,
  children,
}: LightboxEntryProps) {
  const previous = index === 0 ? length : index;
  const next = index === length - 1 ? 1 : index + 2;

  return (
    <div className="lightbox-entry" id={`${entryPrefix}-${index + 1}`}>
      <div className="header">
        <span className="counter">{index + 1} / {length}</span>
        <a href={`#${tilePrefix}-${index + 1}`} className="close" aria-label="Close">&times;</a>
      </div>
      <div className="content">
        <a href={`#${entryPrefix}-${previous}`} className="nav prev" aria-label="Previous">&#10094;</a>
        <figure>
          {children}
          <figcaption>
            {title}
            <small>{description}</small>
          </figcaption>
        </figure>
        <a href={`#${entryPrefix}-${next}`} className="nav next" aria-label="Next">&#10095;</a>
      </div>
    </div>
  );
}
