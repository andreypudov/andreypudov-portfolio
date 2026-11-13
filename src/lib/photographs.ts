import fs from 'node:fs';
import path from 'node:path';

import { manifestEntry, mediaUrl, variantUrl } from './media';

const DATA_DIRECTORY = path.join(process.cwd(), 'data', 'photographs');

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

let metadataIndex: Map<string, AlbumItem> | undefined;

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

/**
 * Resolves an image of the media directory (e.g. "/photographs/…/x.webp")
 * into its original, placeholder and srcset variants, using the dimensions
 * recorded in the media manifest.
 */
function resolve(mediaPath: string, name: string, description: string): Photograph {
  const entry = manifestEntry(mediaPath);
  const original = { src: mediaUrl(mediaPath), width: entry.width, height: entry.height };
  const [placeholderWidth, placeholderHeight] = entry.placeholder;

  return {
    name,
    description,
    original,
    placeholder: { src: variantUrl(mediaPath, '300'), width: placeholderWidth, height: placeholderHeight },
    variants: [
      ...entry.variants.map(([width, height]) => ({ src: variantUrl(mediaPath, `${width}w`), width, height })),
      original,
    ],
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
