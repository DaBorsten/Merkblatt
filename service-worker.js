
// Registriere die Funktion als Dienstarbeiter
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', { scope: "/" })
        .then(registration => {
            // Rufe die Funktion alle 24 Stunden auf
            setInterval(deleteUnusedCache, 86400000);
        });
}

const cacheName = 'cache-v1'
const cacheNameImages = 'cache-images-v1'
const resourcesToPrecache = [
    '/Merkblatt/',
    'index.html',
    '/css/style.css',
    '/js/script.js',
    'webmanifest.json'
]
const imagesToPrecache = [
    '/pictures/htmlTags.webp',
    '/pictures/htmlGrundstruktur.webp',
    '/pictures/tabelle.webp',
    '/pictures/BMI If Statements HTML Teil.webp',
    '/pictures/BMI If Statements JS Teil.webp',
    '/pictures/if else.webp',
    '/pictures/JavaScriptVerlinken.webp',
    '/pictures/jsEinfacheDatentypen.webp',
    '/pictures/jsVariablen.webp',
    '/pictures/logische Operatoren.webp',
    '/pictures/quadratische Gleichung HTML.webp',
    '/pictures/quadratische Gleichung JS.webp',
    '/pictures/schrauben_html.webp',
    '/pictures/schrauben_js.webp',
    '/pictures/locale_globale_var.webp',
    '/favicons/favicon.ico',
    '/favicons/favicon-16x16.png',
    '/favicons/favicon-32x32.png',
    '/favicons/android-chrome-192x192.png',
    '/favicons/android-chrome-512x512.png',
    '/icons/close.svg',
    '/icons/menu.svg',
    '/icons/arrow-up.svg',
    '/icons/settings.svg'
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
    event.respondWith(caches.match(event.request, { ignoreSearch: true })
        .then(response => {
            return response || fetch(event.request)
        })
    )
})

// Funktion, um den Cache nach unbenutztem Inhalt zu durchsuchen
const deleteUnusedCache = () => {
    // Hole alle Einträge im Cache
    caches.open(cacheName).then(cache => cache.keys())
        .then(keys => {
            // Durchlaufe alle Einträge im Cache
            keys.forEach(request => {
                // Überprüfe, ob der Eintrag seit mehr als einem Tag nicht verwendet wurde
                if (Date.now() - request.lastUsed > 86400000) {
                    // Lösche den Eintrag aus dem Cache
                    cache.delete(request)
                }
            })
        })

    caches.open(cacheNameImages).then(cache => cache.keys())
        .then(keys => {
            // Durchlaufe alle Einträge im Cache
            keys.forEach(request => {
                // Überprüfe, ob der Eintrag seit mehr als einem Tag nicht verwendet wurde
                if (Date.now() - request.lastUsed > 86400000) {
                    // Lösche den Eintrag aus dem Cache
                    cache.delete(request)
                }
            })
        })
}