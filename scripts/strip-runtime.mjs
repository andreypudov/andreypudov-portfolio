/**
 * Turns the static export in out/ into plain HTML and CSS by removing the
 * Next.js client runtime. Runs automatically after `npm run build`.
 *
 * Every page is fully rendered at build time and navigates through plain
 * links, so the runtime is only used for React hydration. Removed are:
 *
 *   - <script> elements loading /_next/ chunks and the inline React Server
 *     Components payload (a second copy of every page)
 *   - <link rel="preload" as="script"> hints for those chunks
 *   - React hydration markers (<!--$-->, <!-- -->) and the empty
 *     <div hidden> left by the metadata boundary
 *   - the JavaScript chunks, build manifests and client navigation data
 *     (*.txt) that nothing references afterwards
 *
 * Own scripts in public/scripts/ and the stylesheet are kept. The output is
 * verified afterwards, so a change in the Next.js output format fails the
 * build instead of shipping half-stripped pages.
 */

import fs from 'node:fs';
import path from 'node:path';

const OUT_DIRECTORY = path.join(import.meta.dirname, '..', 'out');

const SCRIPT = /<script\b([^>]*)>[\s\S]*?<\/script>/g;
const OWN_SCRIPT = /\bsrc="\/scripts\//;
const SCRIPT_PRELOAD = /<link\b[^>]*\bas="script"[^>]*\/?>/g;
const HYDRATION_MARKER = /<!--(?:\/?\$[!?]?| )-->/g;
const EMPTY_HIDDEN_DIV = /<div hidden="">\s*<\/div>/g;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function stripPage(html) {
  return html
    .replace(SCRIPT, (element, attributes) => (OWN_SCRIPT.test(attributes) ? element : ''))
    .replace(SCRIPT_PRELOAD, '')
    .replace(HYDRATION_MARKER, '')
    .replace(EMPTY_HIDDEN_DIV, '');
}

/** Lists every reason the page still depends on the Next.js runtime. */
function verifyPage(html) {
  const problems = [];

  for (const [element, attributes] of html.matchAll(SCRIPT)) {
    if (!OWN_SCRIPT.test(attributes)) {
      problems.push(`script ${element.slice(0, 80)}`);
    }
  }

  for (const [reference] of html.matchAll(/\/_next\/[^"'\s)]+/g)) {
    if (!reference.endsWith('.css')) {
      problems.push(`reference ${reference}`);
    }
  }

  if (html.includes('__next_f')) {
    problems.push('React Server Components payload');
  }

  return problems;
}

/** Runtime files that are no longer referenced once the pages are stripped. */
function isRuntimeFile(file) {
  const relative = path.relative(OUT_DIRECTORY, file).split(path.sep).join('/');
  const name = path.basename(file);

  return (
    (relative.startsWith('_next/') && !relative.endsWith('.css')) ||
    name === 'index.txt' ||
    (name.startsWith('__next.') && name.endsWith('.txt'))
  );
}

function removeEmptyDirectories(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      removeEmptyDirectories(path.join(directory, entry.name));
    }
  }

  if (directory !== OUT_DIRECTORY && fs.readdirSync(directory).length === 0) {
    fs.rmdirSync(directory);
  }
}

if (!fs.existsSync(OUT_DIRECTORY)) {
  console.error('out/ does not exist, run "next build" first.');
  process.exit(1);
}

const files = walk(OUT_DIRECTORY);
const pages = files.filter((file) => file.endsWith('.html'));
const runtimeFiles = files.filter(isRuntimeFile);
const problems = [];
let bytesBefore = 0;
let bytesAfter = 0;

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf-8');
  const stripped = stripPage(html);

  bytesBefore += Buffer.byteLength(html);
  bytesAfter += Buffer.byteLength(stripped);
  fs.writeFileSync(page, stripped);

  for (const problem of verifyPage(stripped)) {
    problems.push(`${path.relative(OUT_DIRECTORY, page)}: ${problem}`);
  }
}

for (const file of runtimeFiles) {
  fs.rmSync(file);
}
removeEmptyDirectories(OUT_DIRECTORY);

if (problems.length > 0) {
  console.error('The Next.js runtime could not be fully removed:');
  problems.forEach((problem) => console.error(`  ${problem}`));
  process.exit(1);
}

console.log(
  `Removed the Next.js runtime: ${pages.length} pages ` +
    `(${Math.round(bytesBefore / 1024)} KB → ${Math.round(bytesAfter / 1024)} KB), ` +
    `${runtimeFiles.length} runtime files deleted.`,
);
