const C="drugref-20260907003035";
const ASSETS=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.mode==="navigate"||req.destination==="document"){
    e.respondWith(fetch(req).then(r=>{caches.open(C).then(x=>x.put("index.html",r.clone()));return r;}).catch(()=>caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});
