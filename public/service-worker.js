// Define a cache name
const CACHE_NAME = 'my-app-cache-v1';

// List of assets to cache, including the offline page
const ASSETS_TO_CACHE = [
    '/',
    // './index.html',
    './offline.html', // Add offline page to cache
    './manifest.json',
    // './vite.svg',
    // './assets/barcode-hQk9Q5dh.mp3',
    // './assets/dark-Dbcrdt_x.png',
    // './assets/device-D9RShRM9.png',
    // './assets/html2canvas.esm-CBrSDip1.js',
    // './assets/index-DMq2Zs2R.js',
    // './assets/index-DtRREY95.css',
    // './assets/index.es-xGJbjNvF.js',
    // './assets/light-DnRwfxOd.png',
    // './assets/manifest-DppdE0dT.json',
    // './assets/pos-D-9GoJ2J.png',
    // './assets/purify.es-a-CayzAK.js',
    // './assets/test-Dfj3TjSe.jpg',
    // './icons/pos-icon.jpg',
    // './icons/pos-no-bg.png'
];

// Install event - cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event - serve cached files if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                // If the fetch fails, return the offline page from the cache
                return caches.match('./offline.html');
            });
        })
    );
});
