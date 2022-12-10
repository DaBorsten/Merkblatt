const cacheName = 'cache-v1'
const cacheNameImages = 'cache-images-v1'
const resourcesToPrecache = [
    '/Merkblatt/',
    'index.html',
    'style.css',
    'script.js'
]
const imagesToPrecache = [
    'htmlGrundstruktur.webp',
    'htmlTags.webp',
    'tabelle.webp',
    'BMI If Statements HTML Teil.webp',
    'BMI If Statements JS Teil.webp',
    'if else.webp',
    'JavaScriptVerlinken.webp',
    'jsEinfacheDatentypen.webp',
    'jsVariablen.webp',
    'logische Operatoren.webp',
    'quadratische Gleichung HTML.webp',
    'quadratische Gleichung JS.webp',
    'schrauben_html.webp',
    'schrauben_js.webp',
    'favicons/android-chrome-192x192.png',
    'favicons/android-chrome-512x512.png'
]

self.addEventListener('install', event => {
    console.log('Service worker install event!')
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(resourcesToPrecache)
        }),
        caches.open(cacheNameImages).then(cache => {
            return cache.addAll(imagesToPrecache)
        })
    )
})


self.addEventListener('activate', event => {
    console.log('Activate event!')
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request, {ignoreSearch:true})
        .then(response  => {
            return response  || fetch(event.request)
        })
    )
})