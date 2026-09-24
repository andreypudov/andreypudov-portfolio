import LazyImage from './LazyImage';
import type { Photograph } from '@/lib/photographs';

interface FeatureGridProps {
  /** The complete photograph collection shared by all feature grids and the lightbox. */
  photographs: Photograph[];
  /** Inclusive index ranges of `photographs` rendered as columns. */
  columns: Array<[number, number]>;
}

/**
 * Rendered tile width: a third of the .container width (see layout.css and
 * feature-grid.css), a single column below 768px.
 */
const SIZES = '(max-width: 576px) 100vw, (max-width: 768px) 540px, (max-width: 992px) 240px, (max-width: 1200px) 320px, 380px';

/**
 * A three-column grid of photographs. Tile identifiers are derived from the
 * global collection index so that every tile links to its lightbox entry.
 */
export default function FeatureGrid({ photographs, columns }: FeatureGridProps) {
  return (
    <div className="feature-grid container">
      {columns.map(([start, end]) => (
        <div className="column" key={start}>
          {photographs.slice(start, end + 1).map((photograph, offset) => {
            const id = start + offset + 1;
            return (
              <figure key={id}>
                <a id={`feature-grid-${id}`} href={`#lightbox-${id}`}>
                  <LazyImage image={photograph} sizes={SIZES} />
                </a>
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}
