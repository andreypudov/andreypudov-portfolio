import fs from 'node:fs';
import path from 'node:path';

import { webpDimensions, type ImageDimensions } from './webp';

const DATA_DIRECTORY = path.join(process.cwd(), 'data', 'photographs');
const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public');

interface AlbumItem {
  name: string;
  description: string;
  path: string;
  orientation: string;
  date: string;
}

interface Album {
  name: string;
  description: string;
  genre: string;
  cover: string;
  items: AlbumItem[];
}

/** A single image file and its pixel dimensions. */
export interface ImageSource {
  src: string;
  width: number;
  height: number;
}

/** A fully resolved image and all of its files, ready to be rendered. */
export interface Photograph {
  name: string;
  description: string;
  /** The full-resolution file. */
  original: ImageSource;
  /** Fits into 300x300, shown while a larger file loads (see LazyImage). */
  placeholder: ImageSource;
  /** The srcset candidates: downscaled variants narrower than the original, then the original. */
  variants: ImageSource[];
}

/**
 * Widths of the downscaled variants built by scripts/build-thumbnails.sh.
 * Keep in sync with WIDTHS in that script.
 */
const VARIANT_WIDTHS = [400, 800, 1200];

let metadataIndex: Map<string, AlbumItem> | undefined;
const dimensionsCache = new Map<string, ImageDimensions>();

/** Indexes every album item in /data/photographs by image file name. */
function loadMetadataIndex(): Map<string, AlbumItem> {
  if (metadataIndex) {
    return metadataIndex;
  }

  metadataIndex = new Map();

  for (const entry of fs.readdirSync(DATA_DIRECTORY)) {
    if (!entry.endsWith('.json')) {
      continue;
    }

    const album: Album = JSON.parse(fs.readFileSync(path.join(DATA_DIRECTORY, entry), 'utf-8'));
    for (const item of album.items) {
      metadataIndex.set(path.basename(item.path), item);
    }
  }

  return metadataIndex;
}

function dimensions(mediaSrc: string): ImageDimensions {
  let cached = dimensionsCache.get(mediaSrc);
  if (!cached) {
    cached = webpDimensions(path.join(PUBLIC_DIRECTORY, mediaSrc));
    dimensionsCache.set(mediaSrc, cached);
  }
  return cached;
}

function imageSource(src: string): ImageSource {
  return { src, ...dimensions(src) };
}

/**
 * Derives the location of a downscaled variant of a media path. Photographs
 * have them mirrored under /media/thumbnails, other images keep them alongside.
 */
function variantPath(mediaPath: string, suffix: string): string {
  const withSuffix = mediaPath.replace(/\.webp$/, `_${suffix}.webp`);

  return withSuffix.startsWith('/photographs/')
    ? `/thumbnails${withSuffix.slice('/photographs'.length)}`
    : withSuffix;
}

/**
 * Lists every variant narrower than the original, then the original itself.
 * Fails the build when a variant has not been generated yet.
 */
function variants(mediaPath: string, original: ImageSource): ImageSource[] {
  const downscaled = VARIANT_WIDTHS.filter((variantWidth) => variantWidth < original.width).map((variantWidth) => {
    const src = `/media${variantPath(mediaPath, `${variantWidth}w`)}`;
    if (!fs.existsSync(path.join(PUBLIC_DIRECTORY, src))) {
      throw new Error(`Missing image variant "${src}", run "npm run thumbnails"`);
    }
    return imageSource(src);
  });

  return [...downscaled, original];
}

function resolve(mediaPath: string, name: string, description: string): Photograph {
  const original = imageSource(`/media${mediaPath}`);

  return {
    name,
    description,
    original,
    placeholder: imageSource(`/media${variantPath(mediaPath, '300')}`),
    variants: variants(mediaPath, original),
  };
}

/**
 * Resolves an image file name (e.g. "2025-12-06_015.webp") against the album
 * metadata, the same way the dataset directives of the previous template
 * engine did. Throws when the file is not described in /data/photographs.
 */
export function getPhotograph(fileName: string): Photograph {
  const item = loadMetadataIndex().get(fileName);
  if (!item) {
    throw new Error(`No album metadata found for photograph "${fileName}"`);
  }

  return resolve(item.path, item.name, item.description);
}

export function getPhotographs(fileNames: string[]): Photograph[] {
  return fileNames.map(getPhotograph);
}

/**
 * Resolves an image that is not part of the photograph albums
 * (e.g. time-lapse covers or curated footer images) with an explicit caption.
 */
export function getImage(mediaPath: string, description: string, name = ''): Photograph {
  return resolve(mediaPath, name, description);
}

/** The photographer's self-portrait shown on the home and contact pages. */
export function getSelfPortrait(): Photograph {
  return getImage(
    '/photographs/2016-04-16/2016-04-16_002.webp',
    'A contemplative self-portrait capturing the artist’s gaze and presence, offering a personal glimpse into his creative identity.',
  );
}
