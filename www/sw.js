// Globey Atlas offline support for the website.
// The page is fetched fresh when there is a connection and served from the saved copy when there is not.
// The build step replaces __BUILD__ so every release saves a clean set of files.
const VERSION = 'globey-__BUILD__';
const CORE = [
  './',
  'index.html',
  'site.webmanifest',
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'fonts/baloo-2-latin-600-normal.woff2',
  'fonts/baloo-2-latin-700-normal.woff2',
  'fonts/baloo-2-latin-800-normal.woff2',
  'fonts/lexend-latin-wght-normal.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Opening the page: try the network for up to 4 seconds, then fall back to the saved copy.
  if (req.mode === 'navigate') {
    event.respondWith(
      Promise.race([
        fetch(req),
        new Promise((_, reject) => setTimeout(() => reject(new Error('slow network')), 4000))
      ])
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put('index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('index.html').then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // Everything else: saved copy first, then the network (and save what comes back).
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
