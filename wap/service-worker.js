const cacheName = 'Livres-cache-1.0';
var urlsToCache = ['/', 'index.html', 'js/main.js', 'js/cart.js', 'cart.html',
    'http://localhost:3001/livres'
];
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

/*self.addEventListener('sync', function(event) {
    if (event.tag !== 'undefined') {
        event.waitUntil(notifDispo(event.tag));
    } // On lance la requête
});

function notifDispo(id) {
    fetch("http://127.0.0.1:3001/livres/" + id)
        .then(function(reponse) {
            var data = reponse.json();
            if (reponse.statusText === "OK") return data;
        }).then(function(data) {
            notifyMe("Nombre de livres disponible", data["dispo"]);
        });
}

function notifyMe(title, body) {
    var options = {
        body: body
    }

    if (!('Notification' in window)) {
        alert('Ce navigateur ne prend pas en charge la notification de bureau')
    } else if (Notification.permission === 'granted') {
        const notification = new Notification(title, options)
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const notification = new Notification(title, options)
            }
        })
    }
}*/