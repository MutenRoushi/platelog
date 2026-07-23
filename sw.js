const V = "platelog-v2";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // YouTube etc. go straight to network

  // stale-while-revalidate: serve cache instantly, refresh it in the background
  e.respondWith(
    caches.match(req).then(hit => {
      const refresh = fetch(req).then(res => {
        if (res.ok) { const cl = res.clone(); caches.open(V).then(c => c.put(req, cl)); }
        return res;
      }).catch(() => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined));
      return hit || refresh;
    })
  );
});
