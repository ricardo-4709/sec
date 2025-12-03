const CACHE_NAME = 'tokyo-trip-v4.3.3'; 
const urlsToCache = [
  
  './tokyo_itinerary.html', 
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&family=Zen+Old+Mincho:wght@400;700&display=swap'
];

self.addEventListener('install', event => {
  // 強制讓新的 Service Worker 進入 waiting 狀態
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // 讓新的 Service Worker 立即接管頁面
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});