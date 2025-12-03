const CACHE_NAME = 'tokyo-trip-v4.6.0';
const urlsToCache = [
  './tokyo_itinerary.html', // 請確保這與您的 HTML 主檔案名稱完全一致
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
        console.log('[Service Worker] 正在快取資源...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] 快取失敗:', err);
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