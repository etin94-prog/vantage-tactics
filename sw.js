// Offline fallback only: always try the network first so a new deploy is never hidden behind a stale cache.
const CACHE='vt-offline-v1';
const CORE=['./','./index.html','./assets/reference-media.js','./manifest.webmanifest','./assets/app-icon-192.png','./assets/app-icon-512.png'];
const SKIP=/\.(zip|json)$/i;
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE.map(url=>new Request(url,{cache:'reload'})))).catch(()=>{/* Offline copy is optional. */}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('vt-offline-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
async function respond(request){
  try{
    const response=await fetch(request);
    if(response.ok&&response.type==='basic'&&!SKIP.test(new URL(request.url).pathname)){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});}
    return response;
  }catch(error){
    const cached=await caches.match(request,{ignoreSearch:true})||(request.mode==='navigate'?await caches.match('./index.html')||await caches.match('./'):null);
    if(cached)return cached;
    throw error;
  }
}
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;event.respondWith(respond(request));});
