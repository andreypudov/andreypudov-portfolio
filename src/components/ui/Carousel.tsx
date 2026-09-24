import { Fragment } from 'react';

import LazyImage from './LazyImage';
import type { Photograph } from '@/lib/photographs';

/**
 * Number of slide indicators shown, matching the original design
 * (carousel.css styles the keyboard focus of each of them).
 */
const INDICATOR_COUNT = 5;

/**
 * Full-screen, CSS-only slideshow. Slides are switched through visually
 * hidden radio inputs whose labels act as indicators (see carousel.css).
 * The radios stay focusable, so the arrow keys switch slides as well.
 */
export default function Carousel({ photographs }: { photographs: Photograph[] }) {
  return (
    <div className="carousel">
      <div className="overlay">
        <div className="corners">
          <div className="left-top"></div>
          <div className="right-top"></div>
          <div className="left-bottom"></div>
          <div className="right-bottom"></div>
        </div>
      </div>

      <div className="inner" role="group" aria-label="Featured photographs">
        {photographs.map((photograph, index) => (
          <Fragment key={photograph.original.src}>
            <input
              className="open"
              type="radio"
              id={`carousel-${index + 1}`}
              name="carousel"
              aria-label={photograph.name || `Photograph ${index + 1}`}
              defaultChecked={index === 0 || undefined}
            />
            <div className="item">
              <span>
                {photograph.name}
                <small>{photograph.description}</small>
              </span>
              <LazyImage image={photograph} priority={index === 0} />
            </div>
          </Fragment>
        ))}

        <ol className="indicators">
          {/* Indicators are laid out as inline blocks, so the whitespace
              between them is part of the design and must be emitted. */}
          {Array.from({ length: INDICATOR_COUNT }, (_, index) => (
            <Fragment key={index}>
              <li>
                <label htmlFor={`carousel-${index + 1}`} className="bullet">
                  {String(index + 1).padStart(2, '0')}
                </label>
              </li>{' '}
            </Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}
