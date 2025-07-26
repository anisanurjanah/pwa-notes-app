const CACHE_NAME = 'pwa-notes-cache-v2';
const urlsToCache = [
    "/pwa-notes-app/",
    "/pwa-notes-app/index.html",
    "/pwa-notes-app/style.css",
    "/pwa-notes-app/main.js",
    "/pwa-notes-app/manifest.json",
    "/pwa-notes-app/favicon.ico",
    "/pwa-notes-app/icon-192.png",
    "/pwa-notes-app/icon-512.png",
];

// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch resources
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
