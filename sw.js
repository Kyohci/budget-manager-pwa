const CACHE_NAME = 'budget-manager-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installa il service worker
self.addEventListener('install', function(event) {
  console.log('Service Worker installato');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Errore nel caching:', error);
      })
  );
});

// Intercetta le richieste e serve dalla cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Se la risorsa è in cache, restituiscila
        if (response) {
          return response;
        }
        
        // Altrimenti, prova a prenderla dalla rete
        return fetch(event.request)
          .then(function(response) {
            // Controlla se abbiamo ricevuto una risposta valida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la risposta
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(function() {
            // Se fallisce tutto, prova a restituire la pagina principale dalla cache
            return caches.match('./');
          });
      })
  );
});

// Aggiorna il service worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker attivato');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Rimuovendo cache obsoleta:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Gestisce i messaggi dall'app principale
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});const CACHE_NAME = 'budget-manager-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installa il service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste e serve dalla cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Se la risorsa è in cache, restituiscila
        if (response) {
          return response;
        }
        
        // Altrimenti, prova a prenderla dalla rete
        return fetch(event.request)
          .then(function(response) {
            // Controlla se abbiamo ricevuto una risposta valida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la risposta
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(function() {
            // Se fallisce tutto, prova a restituire la pagina principale dalla cache
            return caches.match('./');
          });
      })
  );
});

// Aggiorna il service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Gestisce i messaggi dall'app principale
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});