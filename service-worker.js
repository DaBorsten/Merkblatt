
const cacheName = 'cache-v1'
const resourcesToPrecache = [

    'index.html',
    'style.css',
    'script.js',
    'BMI If Statements HTML Teil.webp',
    'BMI If Statements JS Teil.webp',
    'htmlGrundstruktur.webp',
    'htmlTags.webp',
    'if else.webp',
    'JavaScriptVerlinken.webp',
    'jsEinfacheDatentypen.webp',
    'jsVariablen.webp',
    'logische Operatoren.webp',
    'quadratische Gleichung HTML.webp',
    'quadratische Gleichung JS.webp',
    'schrauben_html.webp',
    'schrauben_js.webp',
    'tabelle.webp'
]

self.addEventListener('install', event => {
    console.log('Service worker install event!')
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache)
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