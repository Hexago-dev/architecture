if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
}


const cache_name = "__cache__"

const caching_assets = [
    'index.html',
    'index.css',
    'index.js',
    '/conf.json'
]

self.addEventListener("install", (event) => {
    console.log("it 's installed");
    event.waitUntil(
        (async() => {
            try {
                const cache_obj = await caches.open(cache_name);
                cache_obj.addAll(caching_assets);
                self.skipWaiting();

                const skip = self.skipWaiting();
            } catch {
                console.log("error occured while caching...")
            }
        })()
    )
})


self.addEventListener("activate", (event) => {
    console.log("it 's activate");
    event.waitUntil(
        (async() => {
            const cache_keys = await caches.keys()
            cache_keys.forEach(
                key => {
                    if (key !== cache_name) {
                        return caches.delete(key)
                    }
                }
            )
            return Promise.all(cache_keys)
        })()

    )
})


self.addEventListener("fetch", (event) => {
    console.log("it 's fetched");
    if (!(event.request.url.indexOf('http') === 0)) return;
    event.respondWith(caches.open(cache_name).then((cache) => {
        return cache.match(event.request.url).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((fetchedResponse) => {
                cache.put(event.request, fetchedResponse.clone());
                return fetchedResponse;
            });
        });
    }));
})