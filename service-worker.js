const CACHE_NAME='shiny-home-v66';
const APP_SHELL=['./','./index.html','./manifest.webmanifest'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  // HTML/navigation: NETWORK FIRST so GitHub updates appear without Ctrl+F5.
  if(req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')){
    event.respondWith(
      fetch(req, {cache:'no-store'})
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Other assets: stale-while-revalidate.
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if(res && res.ok){
          const copy=res.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));
        }
        return res;
      }).catch(()=>cached);
      return cached || network;
    })
  );
});
