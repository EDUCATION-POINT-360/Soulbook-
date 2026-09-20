// Soulbook Service Worker
// Prevent stale/cached app files from breaking the latest deployment.

const CACHE_NAME = "soulbook-no-cache-v3";

self.addEventListener("install", (event) => {
  // Activate the new service worker immediately.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      // Take control of all currently open pages.
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Always request the latest version from the network.
  // This prevents old HTML/JS from being served from cache.
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request, {
      cache: "no-store"
    }).catch(() => {
      // If offline, fall back to the browser's normal cache.
      return caches.match(event.request);
    })
  );
});
