const staticCacheName = 'site-static-av1'
//assets to cache
const assets =[
    '/',
    '/index.html',
    '/authors.html',
    '/app.js',
    '/clock.js',
    '/img/bg.svg',
    '/styles.css',
    'img/icons/favicon.png',
    "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",

]
self.addEventListener('install', evt=>{
    // console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{
        console.log('caching');
        cache.addAll(assets);
        })
    )
    
})

self.addEventListener('activate', evt=>{

})

self.addEventListener('fetch', evt =>{
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
            return cacheRes|| fetch(evt.request);
        })
    )
})