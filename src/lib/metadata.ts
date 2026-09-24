import type { Metadata } from 'next';

import type { Photograph } from './photographs';

export const SITE_NAME = 'Andrey Pudov';

export const SITE_URL = 'https://andreypudov.com';

/** Preferred width of link preview images (Open Graph recommends 1200px). */
const PREVIEW_WIDTH = 1200;

interface PageMetadataOptions {
  /** Page title, completed with the site name (e.g. "Portfolio - Andrey Pudov"). */
  title: string;
  description: string;
  /** Canonical path of the page, with a trailing slash (e.g. "/portfolio/"). */
  path: string;
  /** Photograph shown when the page is shared. */
  image?: Photograph;
}

/** Picks the 1200px variant of a photograph, or the original when it is narrower. */
function previewImage(photograph: Photograph) {
  const source = photograph.variants.find((variant) => variant.width >= PREVIEW_WIDTH) ?? photograph.original;

  return {
    url: source.src,
    width: source.width,
    height: source.height,
    alt: photograph.description,
  };
}

/**
 * Builds the complete metadata of a page: description, canonical URL and the
 * Open Graph and Twitter tags used for link previews. Page-level Open Graph
 * data replaces the layout's instead of merging with it, so every page
 * provides all of it through this function.
 */
export function pageMetadata({ title, description, path, image }: PageMetadataOptions): Metadata {
  const images = image ? [previewImage(image)] : undefined;
  // Set in full: a layout title template does not apply to the root page.
  const fullTitle = `${title} - ${SITE_NAME}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
    },
  };
}
