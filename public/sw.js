const CACHE_NAME = "wedding-app-v2";

const APP_SHELL = [
  "/",
  "/index.html",
];

/**
 * INSTALL
 */
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
});

/**
 * ACTIVATE
 */
self.addEventListener("activate", (event) => {

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {

          // 🔥 delete old caches
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }

        })
      );
    })
  );

  self.clients.claim();
});

/**
 * FETCH
 */
self.addEventListener("fetch", (event) => {

  // ⚠️ uniquement navigation HTML
  if (event.request.mode === "navigate") {

    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/index.html");
      })
    );

    return;
  }

  // 🔥 assets = network first
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});