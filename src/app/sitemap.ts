import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/metadata';

// Rendered once into out/sitemap.xml by the static export.
export const dynamic = 'force-static';

const PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/portfolio/', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/about/', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/contact/', changeFrequency: 'yearly', priority: 0.6 },
];

/**
 * The sitemap referenced by robots.txt. Pages are dated with the build, as
 * every deployment is a rebuild triggered by a change of the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().slice(0, 10);

  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
