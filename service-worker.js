const CACHE_NAME='shiny-home-v90';
const DATA_CACHE='shiny-home-data-stable-v2';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const NAME_ASSETS=[];
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const c=await caches.open(CACHE_NAME);await c.addAll(APP_SHELL);
  const d=await caches.open(DATA_CACHE);
  await Promise.allSettled(NAME_ASSETS.map(async u=>{try{const r=await fetch(u,{cache:'no-store'});if(r.ok)await d.put(u,r.clone())}catch(_){}}));
  await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME&&k!==DATA_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
  if(req.url.includes('/PokeAPI/pokeapi/')||req.url.includes('cdn.jsdelivr.net/gh/PokeAPI/pokeapi')){
   e.respondWith(caches.open(DATA_CACHE).then(async c=>{const hit=await c.match(req);try{const r=await fetch(req);if(r.ok){c.put(req,r.clone());return r}}catch(_){}return hit||Response.error()}));return;
 }
 if(req.mode==='navigate'||(req.headers.get('accept')||'').includes('text/html')){e.respondWith(fetch(req,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return;}
 e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,cp))}return res})));
});
