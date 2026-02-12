const CACHE_NAME = "panchang-cache-v1";

// केवल static assets cache करें
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-48.png",
  "/icon-96.png",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch में static assets cache से आएंगे,
// लेकिन API calls हमेशा network से जाएंगी
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // अगर API call है तो हमेशा network से fetch करें
  if (requestUrl.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // बाकी static files cache से दें
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
