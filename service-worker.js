
// Registriere die Funktion als Dienstarbeiter
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', { scope: "/" })
        .then(registration => {
            console.log('Registrierung erfolgreich. Der Scope ist ' + registration.scope)
            // Rufe die Funktion alle 24 Stunden auf
            setInterval(deleteUnusedCache, 86400000);
        });
}

const cacheName = 'cache-v1'
const cacheNameImages = 'cache-images-v1'
const resourcesToPrecache = [
    '/Merkblatt/',
    'index.html',
    'css/style.css',
    'js/script.js',
    'webmanifest.json'
]
const imagesToPrecache = [
    // HTML
    'pictures/htmlGrundstruktur.webp',
    'pictures/htmlTags.webp',
    'pictures/tabelle.webp',
    // JavaScript
    'pictures/JavaScriptVerlinken.webp',
    'pictures/jsVariablen.webp',
    'pictures/jsEinfacheDatentypen.webp',
    'pictures/logische Operatoren.webp',
    'pictures/if else.webp',
    'pictures/locale_globale_var.webp',
    'pictures/kopfgesteuerteSchleifen.webp',
    // Aufgaben
    'pictures/schrauben_html.webp',
    'pictures/schrauben_js.webp',
    'pictures/BMI If Statements HTML Teil.webp',
    'pictures/BMI If Statements JS Teil.webp',
    'pictures/quadratische Gleichung HTML.webp',
    'pictures/quadratische Gleichung JS.webp',
    'pictures/zahlenraten_html.webp',
    'pictures/zahlenraten_js.webp',
    // Icons
    'icons/close.svg',
    'icons/menu.svg',
    'icons/arrow-up.svg',
    'icons/settings.svg',
    // Favicons
    'favicons/favicon.ico',
    'favicons/favicon-16x16.png',
    'favicons/favicon-32x32.png',
    'favicons/android-chrome-192x192.png',
    'favicons/android-chrome-512x512.png',

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
    // Hole alle Eintr??ge im Cache
    caches.open(cacheName).then(cache => cache.keys())
        .then(keys => {
            // Durchlaufe alle Eintr??ge im Cache
            keys.forEach(request => {
                // ??berpr??fe, ob der Eintrag seit mehr als einem Tag nicht verwendet wurde
                if (Date.now() - request.lastUsed > 86400000) {
                    // L??sche den Eintrag aus dem Cache
                    cache.delete(request)
                }
            })
        })

    caches.open(cacheNameImages).then(cache => cache.keys())
        .then(keys => {
            // Durchlaufe alle Eintr??ge im Cache
            keys.forEach(request => {
                // ??berpr??fe, ob der Eintrag seit mehr als einem Tag nicht verwendet wurde
                if (Date.now() - request.lastUsed > 86400000) {
                    // L??sche den Eintrag aus dem Cache
                    cache.delete(request)
                }
            })
        })
}