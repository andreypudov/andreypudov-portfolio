import { sourceSet } from './LazyImage';
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
  /**
   * The `sizes` attribute of the grid tiles opening the lightbox. The preview
   * layer uses it to select the same variant the tile has already loaded.
   */
  sizes: string;
}

/**
 * CSS-only fullscreen gallery. Entries are plain page anchors: opening,
 * closing and navigation work through fragment links (see lightbox.css).
 * While the original downloads, the variant already cached by the grid is
 * shown enlarged underneath it.
 */
export default function Lightbox({ photographs, entryPrefix, tilePrefix, variant, sizes }: LightboxProps) {
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
            <img
              src={photograph.placeholder.src}
              srcSet={sourceSet(photograph.variants)}
              sizes={sizes}
              className="preview"
              loading="lazy"
              alt=""
            />
            {/* decoded before it is painted, so the preview stays until the swap */}
            <img src={photograph.original.src} alt={photograph.description} loading="lazy" decoding="sync" />
          </div>
        </LightboxEntry>
      ))}
    </div>
  );
}
