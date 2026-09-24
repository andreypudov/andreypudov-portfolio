import fs from 'node:fs';
import path from 'node:path';

/**
 * Origin serving the media bucket (the r2 directory): originals under
 * /full/ and their downscaled variants under /thumbnails/. Can be pointed
 * at a local server during development, e.g.
 * MEDIA_URL=http://localhost:8080 npm run dev.
 */
export const MEDIA_URL = process.env.MEDIA_URL ?? 'https://media.andreypudov.com';

const MANIFEST_FILE = path.join(process.cwd(), 'data', 'media-manifest.json');

/** Dimensions of an original and its variants, as written by build-thumbnails.sh. */
interface ManifestEntry {
  width: number;
  height: number;
  /** Width and height of the placeholder. */
  placeholder: [number, number];
  /** Width and height of each downscaled variant, narrowest first. */
  variants: Array<[number, number]>;
}

let manifest: Record<string, ManifestEntry> | undefined;

/** URL of an original, given by its path inside full/ (e.g. "/images/favicon.png"). */
export function mediaUrl(mediaPath: string): string {
  return `${MEDIA_URL}/full${mediaPath}`;
}

/** URL of a variant of an original, given by its suffix (e.g. "300" or "800w"). */
export function variantUrl(mediaPath: string, suffix: string): string {
  return `${MEDIA_URL}/thumbnails${mediaPath.replace(/\.webp$/, `_${suffix}.webp`)}`;
}

/**
 * Looks up an original in the media manifest, so the build knows the
 * dimensions of every file without access to the media directory.
 */
export function manifestEntry(mediaPath: string): ManifestEntry {
  manifest ??= JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8')) as Record<string, ManifestEntry>;

  const entry = manifest[mediaPath.replace(/^\//, '')];
  if (!entry) {
    throw new Error(`"${mediaPath}" is not in the media manifest, run "npm run media"`);
  }

  return entry;
}
