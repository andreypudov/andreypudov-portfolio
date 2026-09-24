import LazyImage from './LazyImage';
import type { Photograph } from '@/lib/photographs';

interface MasonryGridProps {
  photographs: Photograph[];
  /** Section name used to build tile and lightbox anchors (e.g. "travel"). */
  section: string;
  /** Set when the grid holds the first image of the page (see LazyImage). */
  priority?: boolean;
}

/** Rendered tile width, following the column counts in masonry-grid.css. */
const SIZES = '(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, (max-width: 1200px) 25vw, 20vw';

/** A CSS-only masonry layout of photographs linked to a section lightbox. */
export default function MasonryGrid({ photographs, section, priority = false }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
      {photographs.map((photograph, index) => (
        <figure key={photograph.original.src}>
          <a id={`${section}-grid-${index + 1}`} href={`#lightbox-${section}-${index + 1}`}>
            <LazyImage image={photograph} priority={priority && index === 0} sizes={SIZES} />
          </a>
        </figure>
      ))}
    </div>
  );
}
