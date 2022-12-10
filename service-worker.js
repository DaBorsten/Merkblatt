const cacheName = 'cache-v1'
const resourcesToPrecache = [
    '/',
    'index.html',
    'style.css',
    'script.js',

    'htmlGrundstruktur.webp',
    'htmlTags.webp',

    'tabelle.webp',
]

self.addEventListener('install', event => {
    console.log('Service worker install event!')
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache)
                    .catch(error => {
                        console.log('Error while caching resources:', error)
                    })
            })
    )
})


self.addEventListener('activate', event => {
    console.log('Activate event!')
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request)
        })
    )
})