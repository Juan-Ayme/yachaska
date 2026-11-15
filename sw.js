/* =========================================================================
   YACHASKA – service worker: la página y los audios funcionan sin internet
   - SHELL: página, estilos, código y fotos. Con señal se ve siempre la última
     versión; sin señal, la copia guardada.
   - AUDIO: cada audio escuchado o guardado con el botón queda en el teléfono.
   ========================================================================= */
const SHELL = "yachaska-shell-v22";
const AUDIO = "yachaska-audio-v4";
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
const FILES = [
  "./", "index.html", "css/styles.css",
  "js/story.js", "js/story-qu.js", "js/story-ay.js", "js/story-cni.js", "js/story-shp.js", "js/story-agr.js",
  "js/retablo.js", "js/scenes.js", "js/app.js",
  "assets/logo-noche.webp", "assets/logo-dia.webp",
  "assets/nasa/PIA04413.jpg", "assets/nasa/PIA12007.jpg", "assets/nasa/PIA13037.jpg", "assets/nasa/PIA14113.jpg",
  "assets/nasa/PIA21839.jpg", "assets/nasa/PIA23645.jpg", "assets/nasa/PIA24542.jpg",
  "assets/nasa/as11-40-5878.jpg", "assets/nasa/as15-86-11603.jpg", "assets/nasa/as17-147-22526.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL)
      .then((c) => Promise.all(FILES.map((f) => c.add(new Request(f, { cache: "reload" })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => (k.startsWith("yachaska-shell-") && k !== SHELL) || (k.startsWith("yachaska-audio-") && k !== AUDIO)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const own = url.origin === self.location.origin;
  if (own && url.pathname.includes("/audio/")) { e.respondWith(audio(req, url)); return; }
  if (own || FONT_HOSTS.includes(url.hostname)) e.respondWith(shell(e, req, url, own));
});

/* La página (HTML) se pide primero a la red, para que una versión nueva se vea al instante;
   si no hay señal en 3 s, se usa la copia guardada. El resto (css, js, fotos) sale de la
   copia guardada: sus direcciones llevan ?v=N, así que una versión nueva es otra dirección. */
async function shell(e, req, url, own) {
  const cache = await caches.open(SHELL);
  const isPage = req.mode === "navigate";
  const key = isPage ? url.origin + url.pathname : req.url;
  const save = (r) => { if (r && (r.ok || r.type === "opaque")) cache.put(key, r.clone()); return r; };
  if (isPage) {
    const net = fetch(req.url, { cache: "no-cache" }).then(save);
    const slow = new Promise((res) => setTimeout(res, 3000));
    const first = await Promise.race([net.catch(() => null), slow]);
    if (first) return first;
    return (await cache.match(key)) || (await cache.match(url.origin + url.pathname.replace(/index.html$/, ""))) || net;
  }
  const hit = await cache.match(key);
  if (hit) return hit;
  try { return save(await fetch(req)); }
  catch (err) {
    const old = own && (await cache.match(req, { ignoreSearch: true })); // sin señal: sirve la versión guardada aunque sea anterior
    if (old) return old;
    throw err;
  }
}

/* audio: se guarda entero y se responde por trozos (Range) si el reproductor lo pide */
async function audio(req, url) {
  const cache = await caches.open(AUDIO);
  const key = url.origin + url.pathname;
  let res = await cache.match(key);
  if (!res) {
    const net = await fetch(key, { cache: "no-cache" }); // pregunta al servidor: un audio regrabado reemplaza al viejo
    if (net.status !== 200) return net;
    await cache.put(key, net.clone());
    res = net;
  }
  const range = req.headers.get("range");
  if (!range) return res;
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  let start = 0, end = size - 1;
  if (m && m[1]) { start = +m[1]; if (m[2]) end = Math.min(+m[2], size - 1); }
  else if (m && m[2]) start = Math.max(0, size - +m[2]);
  if (!m || start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  return new Response(buf.slice(start, end + 1), {
    status: 206, statusText: "Partial Content",
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes"
    }
  });
}
