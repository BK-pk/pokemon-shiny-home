const CACHE_NAME = 'shiny-home-v132';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of CORE) {
      try { await cache.add(new Request(url, {cache:'reload'})); } catch (_) {}
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Always prefer the network for HTML so a new app version is never hidden by an old cache.
  const acceptsHtml = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (acceptsHtml) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, {cache:'no-store'});
        if (fresh && fresh.ok && (url.pathname.endsWith('/index.html') || url.pathname.endsWith('/pokemon-shiny-home/'))) {
          const cache = await caches.open(CACHE_NAME);
          cache.put('./index.html', fresh.clone()).catch(()=>{});
        }
        return fresh;
      } catch (_) {
        return (await caches.match(req)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    const network = fetch(req).then(async res => {
      if (res && res.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, res.clone()).catch(()=>{});
      }
      return res;
    }).catch(() => null);
    return cached || await network || Response.error();
  })());
});
