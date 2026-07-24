const CACHE='presente-mamae-v2';
const ASSETS=['./','./index.html','./style.css','./script.js','./manifest.json','./imagens/icone.png','./imagens/foto1.jpg','./imagens/foto2.jpg','./imagens/foto3.jpg','./imagens/foto4.jpg','./imagens/foto5.jpg','./audio/naohaoutrolugar.mp3'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
