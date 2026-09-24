/**
 * Loads Google Analytics lazily: on the first user interaction, or shortly
 * after the page has finished loading, whichever comes first.
 */

const GA_ID = 'G-E0Y9W77G5B';

const INTERACTION_EVENTS = ['mousemove', 'scroll', 'touchstart', 'keydown', 'click'];

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

let loaded = false;

function loadAnalytics() {
  if (loaded) {
    return;
  }
  loaded = true;

  INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, loadAnalytics));

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  script.onload = () => {
    gtag('js', new Date());
    gtag('config', GA_ID);
  };
  document.head.appendChild(script);
}

function loadAfterDelay() {
  setTimeout(loadAnalytics, 1000);
}

INTERACTION_EVENTS.forEach((event) =>
  window.addEventListener(event, loadAnalytics, { passive: true, once: true }),
);

if (document.readyState === 'complete') {
  loadAfterDelay();
} else {
  window.addEventListener('load', loadAfterDelay, { once: true });
}
