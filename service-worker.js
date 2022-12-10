const cacheName = 'cache-v1'
const resourcesToPrecache = [
    '/',
    'https://daborsten.github.io/Merkblatt/index.html',
    'https://daborsten.github.io/Merkblatt/style.css',
    'https://daborsten.github.io/Merkblatt/script.js',
    'https://daborsten.github.io/Merkblatt/htmlGrundstruktur.webp',
    'https://daborsten.github.io/Merkblatt/htmlTags.webp',
    'https://daborsten.github.io/Merkblatt/tabelle.webp',
    'https://daborsten.github.io/Merkblatt/BMI If Statements HTML Teil.webp',
    'https://daborsten.github.io/Merkblatt/BMI If Statements JS Teil.webp',
    'https://daborsten.github.io/Merkblatt/if else.webp',
    'https://daborsten.github.io/Merkblatt/JavaScriptVerlinken.webp',
    'https://daborsten.github.io/Merkblatt/jsEinfacheDatentypen.webp',
    'https://daborsten.github.io/Merkblatt/jsVariablen.webp',
    'https://daborsten.github.io/Merkblatt/logische Operatoren.webp',
    'https://daborsten.github.io/Merkblatt/quadratische Gleichung HTML.webp',
    'https://daborsten.github.io/Merkblatt/quadratische Gleichung JS.webp',
    'https://daborsten.github.io/Merkblatt/schrauben_html.webp',
    'https://daborsten.github.io/Merkblatt/schrauben_js.webp'
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