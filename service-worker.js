const cacheName = 'test-cache-1.0';
var urlsToCache = ['/', 'index.html', 'main.js'];
self.addEventListener('install', function(event) { // Installation
    event.waitUntil( //Peut pas tuer le worker tant que pas fini et permet d’attendre et de savoir si l’installation est OK
        caches.open(cacheName) // Créé le cache
        .then(function(cache) {
            console.log('Worker activé');
            return cache.addAll(urlsToCache); // Met en cache
        }));
});