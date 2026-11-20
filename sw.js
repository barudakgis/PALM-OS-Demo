/* PALM OS Enterprise — Service Worker (PWA offline shell) */
const VER = 'palmos-pwa-v1.0.2';
const SHELL = ['./', './index.html', './manifest.json', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;                       /* POST sinkronisasi tidak pernah di-cache */
  if (u.origin !== location.origin) return;                     /* Apps Script/Google dibiarkan ke jaringan */
  /* Network-first untuk halaman (versi terbaru), fallback cache saat offline */
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VER).then(x => x.put('./index.html', c)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(VER).then(x => x.put(e.request, c)); } return r; })));
});
