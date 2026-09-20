const CACHE='cnc-828-v4';
const APP_SHELL=[
  './',
  './index.html',
  './src/styles.css',
  './src/v02.css',
  './src/app.js',
  './manifest.webmanifest',
  './icons/icon.svg'
];

const sameOrigin=request=>new URL(request.url).origin===self.location.origin;
const isFreshFirst=request=>request.mode==='navigate'||['document','script','style','manifest'].includes(request.destination);

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache=>
      Promise.all(
        APP_SHELL.map(url=>
          fetch(new Request(url,{cache:'reload'}))
            .then(response=>{
              if(response&&response.ok)return cache.put(url,response);
            })
            .catch(()=>undefined)
        )
      )
    )
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('cnc-828-')&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||!sameOrigin(request))return;

  if(isFreshFirst(request)){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request,{cache:'no-store'});
        if(response&&response.ok){
          const cache=await caches.open(CACHE);
          await cache.put(request,response.clone());
          if(request.mode==='navigate')await cache.put('./index.html',response.clone());
        }
        return response;
      }catch{
        return (await caches.match(request))||(request.mode==='navigate'?await caches.match('./index.html'):undefined)||Response.error();
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(request);
    if(cached)return cached;
    try{
      const response=await fetch(request);
      if(response&&response.ok){
        const cache=await caches.open(CACHE);
        cache.put(request,response.clone());
      }
      return response;
    }catch{
      return Response.error();
    }
  })());
});
