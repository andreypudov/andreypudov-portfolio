/**
 * Loads Google Analytics lazily through a plain script (see
 * public/scripts/analytics.js), so the page itself needs no JavaScript runtime.
 */
export default function Analytics() {
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
      <script type="module" src="/scripts/analytics.js"></script>
    </>
  );
}
