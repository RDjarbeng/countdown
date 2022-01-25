// #2
const staticCacheName = 'site-static-v2';
const dynamicCache = 'site-dynamic-v2';
// caching
//assets to cache
const assets = [
    '/',
    '/index.html',
    '/authors.html',
    '/fallback.html',
    '/clock.js',
    '/app.js',
    '/img/bg.svg',
    // '/img/bg-light.svg',
    '/styles.css',
    'img/icons/favicon.png',
    'img/icons/chrome192.png',
    'img/icons/chrome512.png',
    "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css.map',
    // "https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap",
    // 'https://fonts.gstatic.com/s/nunito/v20/XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTk3j77e.woff2'

]

const limitCacheSize = (name, size)=>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length >size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}
self.addEventListener('install', evt => {
    // console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log('caching');
            cache.add('/app.js');
            cache.addAll(assets);
            console.log('caching complete');
        })
    )

})

self.addEventListener('activate', evt => {
    //delete old cache
    evt.waitUntil(
        caches.keys().then(keys => {
            console.log('deleting caches');
            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCache)
                    .map(key => caches.delete(key))
            )
        })
    )

})

//fetch listener
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    limitCacheSize(dynamicCache, 15)
                    return fetchRes;
                })
            });
        }).catch(()=>{
            if(evt.request.url.indexOf('.html')>-1 )
            return caches.match('/fallback.html')
        })
    );
})