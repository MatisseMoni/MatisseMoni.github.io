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

self.addEventListener('fetch', evt => { // Sur une requête (avec ou sans la méthode fetch)
    evt.respondWith( // On répond à la requête avec …
        fetch(evt.request).then(newResponse => { // Si on le trouve
            console.log("From network");
            caches.open(cacheName).then(cache => cache.put(evt.request, newResponse));
            return newResponse.clone(); // On retourne ce qui est dans le cache
        }).catch(function(error) {
            return caches.match(evt.request).then(res => { // On cherche dans le cache
                // Si on le trouve
                console.log("From cache");
                return res; // On retourne ce qui est dans le cache);
            });
        }));
});