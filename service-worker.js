const CACHE_NAME='shiny-home-v88';
const DATA_CACHE='shiny-home-data-v1';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME&&k!==DATA_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  if(req.url.includes('/PokeAPI/pokeapi/')||req.url.includes('cdn.jsdelivr.net/gh/PokeAPI/pokeapi')){e.respondWith(fetch(req,{cache:'no-store'}));return;}
  if(req.mode==='navigate'||(req.headers.get('accept')||'').includes('text/html')){e.respondWith(fetch(req,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return;}
  e.respondWith(caches.match(req).then(cached=>{const network=fetch(req).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,cp))}return res}).catch(()=>cached);return cached||network}));
});
