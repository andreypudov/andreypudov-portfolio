import LazyImage from './LazyImage';
import type { Photograph } from '@/lib/photographs';

interface ImageGridProps {
  images: Photograph[];
  /** Anchor prefix of the grid tiles (e.g. "timelapse-grid"). */
  tilePrefix: string;
  /** Anchor prefix of the lightbox entries the tiles open. */
  entryPrefix: string;
}

/**
 * Rendered tile width: a third of the .container width (see layout.css and
 * image-grid.css), a single column below 768px.
 */
const SIZES = '(max-width: 576px) 100vw, (max-width: 768px) 540px, (max-width: 992px) 240px, (max-width: 1200px) 320px, 380px';

/** A uniform grid of cover images, each opening a lightbox entry. */
export default function ImageGrid({ images, tilePrefix, entryPrefix }: ImageGridProps) {
  return (
    <div className="image-grid container">
      {images.map((image, index) => (
        <a id={`${tilePrefix}-${index + 1}`} href={`#${entryPrefix}-${index + 1}`} key={image.original.src}>
          <LazyImage image={image} sizes={SIZES} />
        </a>
      ))}
    </div>
  );
}
