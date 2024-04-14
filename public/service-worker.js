var cacheName = 'afterschool-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'learnlounge.webmanifest',
    '/public/images/afterschool-icon.png', 
    '/public/images/chess.png',
    '/public/images/class.png',
    '/public/images/conference.png',
    '/public/images/creative-writing.png',
    '/public/images/data.png',
    '/public/images/gardening.png',
    '/public/images/paper-crafts.png',
    '/public/images/robot.png',
    '/public/images/taekwondo.png',
    '/public/images/web-design.png'
];

self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        //check if the cache has the file or not
        caches.match(e.request).then(function (r) {
            console.log ('[Service Worker] fetching resource: '
            + e.request.url);
            //. 'r' is the matching file it it exists in the cache
            return r
        })
    );
});