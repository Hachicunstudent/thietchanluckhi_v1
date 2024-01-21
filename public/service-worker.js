// Định nghĩa tên và phiên bản của cache
const CACHE_NAME = 'version-1';
const urlsToCache = [ 'index.html', 'offline.html' ];

// Cài đặt Service Worker và mở cache, sau đó thêm các file vào cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                // Thêm tất cả các URL cần cache vào
                return cache.addAll(urlsToCache);
            })
    );
});

// Listen cho sự kiện 'fetch', để xem các yêu cầu mạng
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    // Nếu không có mạng, sẽ trả về trang offline
                    .catch(() => caches.match('offline.html'));
            })
    );
});

// Kích hoạt Service Worker và xóa bỏ các cache cũ không cần thiết
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});
