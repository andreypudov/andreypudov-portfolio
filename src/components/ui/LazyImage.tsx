import type { Photograph } from '@/lib/photographs';

interface LazyImageProps {
  image: Photograph;
  /**
   * Marks the primary image of a page: it is loaded eagerly with high
   * priority instead of lazily, to improve the largest contentful paint.
   */
  priority?: boolean;
  /**
   * The rendered width of the image (the `sizes` attribute). When set, the
   * browser picks the smallest sufficient variant from the image's srcset;
   * otherwise the original is always loaded.
   */
  sizes?: string;
}

/**
 * A progressively loaded image: a tiny thumbnail is rendered first and the
 * photograph (the variant chosen through `sizes`, or the original) replaces
 * it once downloaded (see lazy-image.css).
 */
export default function LazyImage({ image, priority = false, sizes }: LazyImageProps) {
  return (
    <div className="lazy-image">
      <img
        src={image.thumbnailSrc}
        className="low"
        loading="lazy"
        width={image.thumbnailWidth}
        height={image.thumbnailHeight}
        alt=""
      />
      <img
        src={image.src}
        srcSet={sizes ? image.srcSet : undefined}
        sizes={sizes}
        className="high"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        width={image.width}
        height={image.height}
        alt={image.description}
      />
    </div>
  );
}
