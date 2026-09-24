import LightboxEntry from './LightboxEntry';
import type { Photograph } from '@/lib/photographs';

interface LightboxProps {
  photographs: Photograph[];
  /** Anchor prefix of the lightbox entries (e.g. "lightbox-travel"). */
  entryPrefix: string;
  /** Anchor prefix of the grid tiles the close button returns to. */
  tilePrefix: string;
  /** Optional variant class appended to the lightbox container. */
  variant?: string;
}

/**
 * CSS-only fullscreen gallery. Entries are plain page anchors: opening,
 * closing and navigation work through fragment links (see lightbox.css).
 */
export default function Lightbox({ photographs, entryPrefix, tilePrefix, variant }: LightboxProps) {
  return (
    <div className={variant ? `lightbox ${variant}` : 'lightbox'}>
      {photographs.map((photograph, index) => (
        <LightboxEntry
          index={index}
          length={photographs.length}
          entryPrefix={entryPrefix}
          tilePrefix={tilePrefix}
          title={photograph.name}
          description={photograph.description}
          key={photograph.original.src}
        >
          <div className="image-wrapper">
            <img src={photograph.original.src} alt={photograph.description} loading="lazy" />
          </div>
        </LightboxEntry>
      ))}
    </div>
  );
}
