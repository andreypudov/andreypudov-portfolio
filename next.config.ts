import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Produce a fully static website (out/) suitable for GitHub Pages.
  output: 'export',

  // Match the current site structure: every page lives in its own
  // directory as index.html and is addressed with a trailing slash.
  trailingSlash: true,
};

export default nextConfig;
