const cacheName = 'cache-v1'
const resourcesToPrecache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
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
    'schrauben_js.webp'
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