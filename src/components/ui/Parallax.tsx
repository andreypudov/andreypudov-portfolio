import type { ReactNode } from 'react';

interface ParallaxProps {
  /** Variant selecting the fixed background image (see parallax.css). */
  variant: string;
  children: ReactNode;
}

/** A section with a fixed, full-width background creating a parallax effect. */
export default function Parallax({ variant, children }: ParallaxProps) {
  return (
    <section className={`parallax ${variant}`}>
      <div className="background"></div>
      <div className="content container">
        {children}
      </div>
    </section>
  );
}
