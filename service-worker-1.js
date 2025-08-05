const CACHE_NAME = 'barnabas-scrolls-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // External dependencies
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  // Images/icons
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/apple-touch-icon.png',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/web-app-manifest-192x192.png',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/web-app-manifest-512x512.png',
  'https://pub-954ee37e70244de5bb62c446533dbea3.r2.dev/favicon-96x96.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});