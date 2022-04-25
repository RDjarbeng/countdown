// #5

const staticCacheName = 'site-static-v36';
const dynamicCache = 'site-dynamic-v36';

const dynamicCacheSize = 30;

console.log("sw version: "+ staticCacheName.split("-")[2]);
// caching
//assets to cache
const assets = [
    '/',
    '/index.html',
    '/html/about.html',
    '/html/countdown-list.html',
    '/html/fallback.html',
    '/html/form-upload.html',
    '/css/styles.css',
    '/css/themes.css',
    '/css/about.css',
    '/css/countdown-list.css',
    '/css/form.css',
    '/app.js',
    '/js/sidebar.js',
    '/js/loadCustomUI.js',
    '/js/displayCountdowns.js',
    '/js/formupdate.js',
    '/js/error.js',
    '/js/form.js',
    '/img/icons/chrome192.png',
    '/img/icons/chrome512.png',
    '/img/bg.svg',
    '/img/bg/goku.jpg',
    '/img/bg/ship_sky_balloons.jpg',
    '/img/icons/favicon.png',
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
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
            // cache.add('/app.js');
            cache.addAll(assets).catch((reason)=>{
                // try caching again
                console.log(reason);
                assets.forEach(value=>{
                    caches.open(staticCacheName).then(cache => {
                        // console.log('caching');
                        cache.add(value).catch(err=> console.log(err, value));
                        console.log('recaching complete');
                    }).catch(err=> console.log(err))     
                })
                
            });
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
                    limitCacheSize(dynamicCache, dynamicCacheSize)
                    return fetchRes;
                })
            });
        }).catch(()=>{
            if(evt.request.url.indexOf('.html')>-1 )
            return caches.match('/html/fallback.html')
        })
    );
})