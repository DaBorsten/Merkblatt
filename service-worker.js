// The service worker code
self.addEventListener('install', event => {
    // Open a new cache and add all the necessary assets and resources
    event.waitUntil(
      caches.open('pwa-cache')
        .then(cache => cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          '/favicons/'
        ]))
    );
  });
  
  self.addEventListener('fetch', event => {
    // Match the request with the cached assets and serve the cached response, if available
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  });