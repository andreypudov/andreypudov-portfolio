import type { ImageSource, Photograph } from '@/lib/photographs';

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

/** Formats image variants as width-descriptor candidates of a srcset attribute. */
function sourceSet(variants: ImageSource[]): string {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ');
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
        src={image.placeholder.src}
        className="low"
        loading="lazy"
        width={image.placeholder.width}
        height={image.placeholder.height}
        alt=""
      />
      <img
        src={image.original.src}
        srcSet={sizes ? sourceSet(image.variants) : undefined}
        sizes={sizes}
        className="high"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        width={image.original.width}
        height={image.original.height}
        alt={image.description}
      />
    </div>
  );
}
