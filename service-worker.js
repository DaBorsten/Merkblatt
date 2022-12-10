const cacheName = 'cache-v1'
const resourcesToPrecache = [
    '/',
    '/Merkblatt/index.html',
    '/Merkblatt/style.css',
    '/Merkblatt/script.js',
    '/Merkblatt/htmlGrundstruktur.webp',
    '/Merkblatt/htmlTags.webp',
    '/Merkblatt/tabelle.webp',
    '/Merkblatt/BMI If Statements HTML Teil.webp',
    '/Merkblatt/BMI If Statements JS Teil.webp',
    '/Merkblatt/if else.webp',
    '/Merkblatt/JavaScriptVerlinken.webp',
    '/Merkblatt/jsEinfacheDatentypen.webp',
    '/Merkblatt/jsVariablen.webp',
    '/Merkblatt/logische Operatoren.webp',
    '/Merkblatt/quadratische Gleichung HTML.webp',
    '/Merkblatt/quadratische Gleichung JS.webp',
    '/Merkblatt/schrauben_html.webp',
    '/Merkblatt/schrauben_js.webp'
]

self.addEventListener('install', event => {
    console.log('Service worker install event!')
    caches.open(cacheName).then(cache => {
        cache.addAll(resourcesToPrecache)
    })
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