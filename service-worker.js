const CACHE_NAME = "kyprod-cache-v1";
const URLS = [
    "./",
    "./index.html",
    "./produto.html",
    "./style.css",
    "./app.js",
    "./produto.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
