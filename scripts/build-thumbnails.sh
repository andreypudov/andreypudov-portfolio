#!/bin/sh
#
# Builds the downscaled variants of the images rendered by the website.
#
# Usage: scripts/build-thumbnails.sh [-f] [image ...]
#
#   -f       regenerate variants that already exist
#   image    media paths (e.g. /photographs/2023-11-18/2023-11-18_020.webp)
#            or file names (e.g. 2023-11-18_020.webp) to process; by default
#            every .webp referenced from src/ is processed
#
# For every image the following variants are written, skipping the ones that
# already exist and widths that would upscale the original:
#
#   <name>_300.webp     fits into 300x300, the low-quality placeholder
#   <name>_<W>w.webp    <W> pixels wide, for each width in WIDTHS (srcset)
#
# Photographs are mirrored from public/media/photographs into
# public/media/thumbnails, other images keep their variants alongside.
# See DEVELOPMENT.org for the reasoning behind the conversion settings.
#
# Requires ImageMagick 7 (magick) or 6 (convert, identify) with lcms support.

set -eu

# Keep in sync with VARIANT_WIDTHS in src/lib/photographs.ts.
WIDTHS='400 800 1200'
PLACEHOLDER_SIZE=300
QUALITY=85

ROOT=$(cd "$(dirname "$0")/.." && pwd)
MEDIA="$ROOT/public/media"
PROFILE="$ROOT/scripts/profiles/sRGB.icc"

if command -v magick >/dev/null 2>&1; then
  CONVERT='magick'
  IDENTIFY='magick identify'
elif command -v convert >/dev/null 2>&1 && command -v identify >/dev/null 2>&1; then
  CONVERT='convert'
  IDENTIFY='identify'
else
  echo 'ImageMagick is required: install it with "brew install imagemagick" or "apt install imagemagick".' >&2
  exit 1
fi

FORCE=0
if [ "${1:-}" = '-f' ]; then
  FORCE=1
  shift
fi

WORK=$(mktemp -d "${TMPDIR:-/tmp}/thumbnails.XXXXXX")
trap 'rm -rf "$WORK"' EXIT
trap 'exit 1' INT TERM

# Prints the location of a variant of the source image.
variant_path() {
  source=$1
  suffix=$2

  case $source in
    "$MEDIA"/photographs/*)
      relative=${source#"$MEDIA"/photographs/}
      echo "$MEDIA/thumbnails/${relative%.webp}_$suffix.webp"
      ;;
    *)
      echo "${source%.webp}_$suffix.webp"
      ;;
  esac
}

# Converts the source image into a variant fitting the given geometry.
#   -auto-orient      applies the EXIF orientation before it is stripped
#   -profile          converts wide-gamut originals (Adobe RGB, ProPhoto RGB,
#                     Display P3) into sRGB, so stripping the profile keeps
#                     their colours intact
#   -strip            drops EXIF, XMP and ICC data (camera serial numbers,
#                     locations) that would dominate the size of small files
#   -filter Lanczos   sharp, ringing-free downscaling for photographs
#   webp:*            best compression effort and sharper colour edges
convert_variant() {
  source=$1
  geometry=$2
  target=$3
  temporary="$WORK/$(basename "$target")"

  $CONVERT "$source" \
    -auto-orient \
    -intent Relative -black-point-compensation -profile "$PROFILE" \
    -strip \
    -filter Lanczos -resize "$geometry" \
    -quality "$QUALITY" \
    -define webp:method=6 \
    -define webp:use-sharp-yuv=true \
    "$temporary"

  mkdir -p "$(dirname "$target")"
  mv "$temporary" "$target"
  echo "  ${target#"$ROOT"/}"
}

# Builds every missing variant of a single image.
process_image() {
  source=$1
  width=$($IDENTIFY -format '%w' "$source")

  target=$(variant_path "$source" "$PLACEHOLDER_SIZE")
  if [ "$FORCE" -eq 1 ] || [ ! -f "$target" ]; then
    convert_variant "$source" "${PLACEHOLDER_SIZE}x${PLACEHOLDER_SIZE}>" "$target"
  fi

  for variant_width in $WIDTHS; do
    [ "$variant_width" -lt "$width" ] || continue

    target=$(variant_path "$source" "${variant_width}w")
    if [ "$FORCE" -eq 1 ] || [ ! -f "$target" ]; then
      convert_variant "$source" "${variant_width}x" "$target"
    fi
  done
}

# Collects the referenced images: explicit arguments, or every .webp token
# found in the sources. Tokens are extracted with tr, as grep -o is not POSIX.
if [ "$#" -gt 0 ]; then
  printf '%s\n' "$@" > "$WORK/references"
else
  find "$ROOT/src" -type f \( -name '*.ts' -o -name '*.tsx' \) -exec cat {} + \
    | tr -c 'A-Za-z0-9_./-' '\n' \
    | grep '^[/A-Za-z0-9].*\.webp$' \
    | sort -u > "$WORK/references"
fi

find "$MEDIA/photographs" -type f -name '*.webp' > "$WORK/photographs"

# Resolves references into absolute source paths, skipping generated variants.
: > "$WORK/sources"
missing=0
while IFS= read -r reference; do
  case $reference in
    *_"$PLACEHOLDER_SIZE".webp | *_[0-9]*w.webp) continue ;;
  esac

  case $reference in
    /*) matches=$(if [ -f "$MEDIA$reference" ]; then echo "$MEDIA$reference"; fi) ;;
    *) matches=$(awk -v name="/$reference" \
         'substr($0, length($0) - length(name) + 1) == name' "$WORK/photographs") ;;
  esac

  if [ -z "$matches" ]; then
    echo "Image not found: $reference" >&2
    missing=1
    continue
  fi

  echo "$matches" >> "$WORK/sources"
done < "$WORK/references"

sort -u "$WORK/sources" -o "$WORK/sources"
echo "Building thumbnails for $(wc -l < "$WORK/sources" | tr -d ' ') images..."

while IFS= read -r source; do
  process_image "$source"
done < "$WORK/sources"

if [ "$missing" -ne 0 ]; then
  echo 'Some referenced images were not found.' >&2
  exit 1
fi

echo 'Thumbnails are up to date.'
