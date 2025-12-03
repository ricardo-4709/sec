const CACHE_NAME = 'tokyo-trip-v2';
const urlsToCache = [
  './',
  './tokyo_itinerary.html',
  './manifest.json',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Zen+Old+Mincho:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Zen+Old+Mincho:wght@400;700&display=swap)'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有資料，直接回傳
        if (response) {
          return response;
        }
        // 否則發送網絡請求
        return fetch(event.request);
      })
  );
});