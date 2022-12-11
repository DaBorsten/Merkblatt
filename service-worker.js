const cacheName = 'cache-v1'
const cacheNameImages = 'cache-images-v1'
const resourcesToPrecache = [
    '/Merkblatt/',
    'index.html',
    'css/style.css',
    'js/script.js'
]
const imagesToPrecache = [
    'pictures/htmlGrundstruktur.webp',
    'pictures/htmlTags.webp',
    'pictures/tabelle.webp',
    'pictures/BMI If Statements HTML Teil.webp',
    'pictures/BMI If Statements JS Teil.webp',
    'pictures/if else.webp',
    'pictures/JavaScriptVerlinken.webp',
    'pictures/jsEinfacheDatentypen.webp',
    'pictures/jsVariablen.webp',
    'pictures/logische Operatoren.webp',
    'pictures/quadratische Gleichung HTML.webp',
    'pictures/quadratische Gleichung JS.webp',
    'pictures/schrauben_html.webp',
    'pictures/schrauben_js.webp',
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