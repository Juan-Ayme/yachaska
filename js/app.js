/* =========================================================================
   YACHASKA – lógica: render, scrollytelling, lenguas, tema y narración
   ========================================================================= */
(function () {
  "use strict";

  const { VOICES, LANGS, UI, CHAPTERS, OBJECTS, TIMELINE } = window.YACHASKA;
  const SCENES = window.YACHASKA_SCENES;
  const RETABLO = window.YACHASKA_RETABLO;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  /* ---------- almacenamiento seguro ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  /* ---------- estado ---------- */
  const state = {
    lang: initialLang(),
    autoplay: store.get("yachaska-autoplay") !== "0", // narración activada por defecto
    current: { ch: -1, step: 0 },
    speaking: null,
    page: 0
  };

  // La web es un libro: una página a la vez. Con ?scroll=1 vuelve el modo antiguo de scroll.
  const BOOK = !/[?&]scroll=1/.test(location.search);

  function initialLang() {
    const saved = store.get("yachaska-lang");
    if (saved && LANGS.some((l) => l.code === saved)) return saved;
    return "en"; // por defecto: inglés (jueces internacionales)
  }

  /* lengua del contenido: inglés, o castellano como respaldo */
  const contentLang = () => (state.lang === "en" ? "en" : "es");
  const tx = (o) => (o ? (o[state.lang] != null ? o[state.lang] : o[contentLang()]) : "");
  const ui = (k) => (UI[state.lang] && UI[state.lang][k] != null ? UI[state.lang][k] : UI[contentLang()][k]);
  const L = (es, en, qu) => (state.lang === "qu" ? (qu || es) : contentLang() === "en" ? en : es);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));


  function specsHTML(ch) {
    if (!ch.specs.length) return "";
    const open = window.matchMedia("(min-width: 900px)").matches ? " open" : ""; // en celular la ficha se abre al tocar
    return `<details class="specs-fold"${open}><summary>${esc(ui("specs"))}</summary><dl class="specs" aria-label="${esc(ui("specs"))}">${ch.specs.map((p) => `<div><dt>${esc(tx(p.k))}</dt><dd>${esc(tx(p.v))}</dd></div>`).join("")}</dl></details>`;
  }
  function mediaHTML(ch) {
    if (!ch.media.length) return "";
    return `<div class="ch-media">${ch.media.map((m, i) => `<figure class="photo${i ? " photo--2" : ""}">
        <img src="${m.src}" alt="${esc(tx(m.cap))}" loading="lazy" decoding="async">
        <figcaption><span class="photo__tag">${esc(ui(m.kind === "artist" ? "artist" : "photo"))} · ${esc(m.id)}</span>${esc(tx(m.cap))}</figcaption>
      </figure>`).join("")}</div>`;
  }

  /* iconos: cohete (dato NASA) y chakana (puente andino) */
  const ICON = {
    fact: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5c3.2 2.2 5 5.9 5 9.8L15.2 16H8.8L7 12.3c0-3.9 1.8-7.6 5-9.8z"/><circle cx="12" cy="9.3" r="1.9"/><path d="M8.8 13.6 5.5 16.4l1 3.1 2.8-2.3M15.2 13.6l3.3 2.8-1 3.1-2.8-2.3M10.4 18.6 12 21.5l1.6-2.9"/></svg>`,
    bridge: `<svg viewBox="-3.6 -3.6 7.2 7.2" aria-hidden="true"><polygon points="-1,-3 1,-3 1,-2 2,-2 2,-1 3,-1 3,1 2,1 2,2 1,2 1,3 -1,3 -1,2 -2,2 -2,1 -3,1 -3,-1 -2,-1 -2,-2 -1,-2" fill="currentColor" stroke="#1d1530" stroke-width=".32" stroke-linejoin="round"/><circle r=".85" fill="#1d1530"/></svg>`
  };

  /* Escena de un capítulo. Si el capítulo trae ilustraciones (ch.art), cada paso es una imagen
     16:9 que se carga solo cuando hace falta; si no, se usa el dibujo SVG hecho en código. */
  const AH = 446;
  const artSrc = (ch, n) => `assets/escenas/${ch.id}-${n}.webp`;
  function sceneSVG(ch) {
    const head = `class="scene${ch.art ? " scene--art" : ""}" id="scene-${ch.id}" role="img" aria-label="${esc(tx(ch.title))}" xmlns="http://www.w3.org/2000/svg"`;
    if (!ch.art) return `<svg ${head} viewBox="0 0 800 600"${BOOK ? ' preserveAspectRatio="xMidYMin meet"' : ""}><g class="cam">${SCENES[ch.scene](L)}</g>${SCENES.finish("f-" + ch.id)}</svg>`;
    return `<svg ${head} viewBox="0 0 800 ${AH}" preserveAspectRatio="xMidYMid slice"><g class="cam">${ch.art.map((a, i) => `<image class="ly art${i ? "" : " on"}" data-show="${i + 1}" data-src="${artSrc(ch, i + 1)}"${a[3] ? ` data-alt="${artSrc(ch, a[3])}"` : ""} width="800" height="${AH}" preserveAspectRatio="xMidYMid slice"/>`).join("")}</g></svg>`;
  }
  function loadArt(ci, n) {
    const ch = CHAPTERS[ci];
    if (!ch || !ch.art) return;
    const im = $(`#scene-${ch.id} image[data-show="${n}"]`);
    if (!im || im.getAttribute("href")) return;
    if (im.dataset.alt) im.addEventListener("error", () => { // sin ilustración propia todavía: la de respaldo
      if (im.getAttribute("href") === im.dataset.alt) return;
      im.setAttribute("href", im.dataset.alt);
      if (state.current.ch === ci && state.current.step === n) applyBg(ci, n);
    }, { once: true });
    im.setAttribute("href", im.dataset.src);
  }
  function applyBg(ci, step) {
    const ch = CHAPTERS[ci], svg = $("#scene-" + ch.id);
    const bg = svg && svg.parentNode && $(".scene-bg", svg.parentNode);
    if (!bg || !ch.art) return;
    const im = $(`image[data-show="${step}"]`, svg);
    bg.style.backgroundImage = `url("${(im && im.getAttribute("href")) || artSrc(ch, step)}")`;
  }

  function renderHero() {
    $("#heroArt").innerHTML = `<image href="${artSrc(CHAPTERS[0], 6)}" width="1200" height="620" preserveAspectRatio="xMidYMid slice"/>`;
    $("#heroArt").setAttribute("aria-label", ui("heroAlt"));
    const seen = new Set();
    const items = [];
    CHAPTERS.forEach((ch) => ch.media.forEach((m) => { if (!seen.has(m.id)) { seen.add(m.id); items.push({ m, ch }); } }));
    $("#cast").innerHTML = items.map(({ m, ch }) => `<button class="cast__item" type="button" data-goto="${ch.id}" data-body="${ch.body}">
        <img src="${m.src}" alt="" loading="lazy" decoding="async">
        <span><b>${esc(tx(ch.no))}</b> ${esc(tx(m.cap))}</span>
      </button>`).join("");
  }

  /* ---------- render del cuento ---------- */
  function renderStory() {
    const root = $("#story");
    root.innerHTML = CHAPTERS.map((ch, ci) => {
      const v = VOICES[ch.voice];
      const steps = ch.steps.map((st, si) => {
        const who = VOICES[st.who || ch.voice];
        const open = window.matchMedia("(min-width: 900px)").matches ? " open" : "";
        const fact = st.fact ? `<details class="box box--fact"${open}><summary>${esc(ui("fact"))}</summary><div><p>${esc(tx(st.fact))}</p><a class="src" href="${st.fact.src}" target="_blank" rel="noopener">${esc(ui("source"))}: ${esc(st.fact.label)} ↗</a></div></details>` : "";
        const bridge = st.bridge ? `<details class="box box--bridge"${open}><summary>${esc(ui("bridge"))}</summary><div><p>${esc(tx(st.bridge))}</p></div></details>` : "";
        const moon = (st.who || ch.voice) === "killa" ? " is-moon" : "";
        // en el retablo, el dato NASA y el puente andino son dos iconos que abren una ficha
        // más información: un botón con su medallón, su nombre y un "+" que invita a abrirlo
        const info = (kind) => `<button class="ico ico--${kind}" type="button" data-sheet="${kind}" data-ch="${ci}" data-step="${si}" aria-label="${esc(ui(kind))}: ${esc(ui("more"))}" title="${esc(ui(kind))}: ${esc(ui("more"))}"><span class="ico__m" aria-hidden="true">${ICON[kind]}</span><span class="ico__t">${esc(ui(kind))}</span><span class="ico__plus" aria-hidden="true">+</span></button>`;
        const icons = BOOK && (st.fact || st.bridge) ? `<span class="ico-row">${st.fact ? info("fact") : ""}${st.bridge ? info("bridge") : ""}</span>` : "";
        return `<article class="step" data-ch="${ci}" data-step="${si + 1}" style="--vc:${who.color}">
          <div class="card">
            <span class="voice">${esc(tx(who))}</span>
            <p class="verse${moon}">${esc(tx(st.t))}</p>
            ${!BOOK && (fact || bridge) ? `<div class="boxes">${fact}${bridge}</div>` : ""}
            <div class="card__foot">
              <span class="step-count">${si + 1} / ${ch.steps.length}</span>${icons}
              ${BOOK ? "" : `<button class="btn btn--ghost btn--sm play" type="button" aria-pressed="false" data-ch="${ci}" data-step="${si}"><span aria-hidden="true">▶</span> <span class="lbl">${esc(ui("listen"))}</span></button>`}
            </div>
          </div>
        </article>`;
      }).join("");
      return `<section class="chapter${ch.art || BOOK ? " has-art" : ""}" id="${ch.id}" data-body="${ch.body}" aria-labelledby="t-${ch.id}">
        <header class="ch-cover${ch.media.length ? " has-media" : ""}">
          <div class="ch-cover__in">
            <span class="ch-no">${esc(tx(ch.no))} · ${esc(ui("body_" + ch.body))}</span>
            <h2 class="ch-title" id="t-${ch.id}">${esc(tx(ch.title))}</h2>
            <p class="ch-teaser">${esc(tx(ch.teaser))}</p>
            <span class="voice" style="--vc:${v.color}">${esc(tx(v))}</span>
            ${specsHTML(ch)}
          </div>
          ${mediaHTML(ch)}
          <span class="scroll-hint">${esc(ui("scroll"))}</span>
        </header>
        <div class="scrolly">
          <figure class="scene-wrap${ch.art ? "" : " scene-wrap--svg"}" style="margin:0">
            <div class="scene-bg" aria-hidden="true"></div>
            ${sceneSVG(ch)}
          </figure>
          <div class="steps">${steps}</div>
        </div>
      </section>`;
    }).join("");
    loadArt(0, 1);
    observeSteps();
  }

  function renderChrome() {
    document.documentElement.lang = state.lang;
    $$("[data-ui]").forEach((el) => { el.textContent = ui(el.dataset.ui); });
    $$("[data-ui-label]").forEach((el) => { const t = ui(el.dataset.uiLabel); el.setAttribute("aria-label", t); el.title = t; });
    document.title = `YACHASKA – ${ui("title")}`;
    const cur = LANGS.find((l) => l.code === state.lang);
    $("#langName").textContent = cur.native;
    $("#langBtn").dataset.code = cur.code.toUpperCase();
    $("#langBtn").setAttribute("aria-label", `${ui("menuLang")}: ${cur.native}`);
    $("#theme").setAttribute("aria-label", ui("menuTheme"));

    // menú de lenguas
    $("#langMenu").innerHTML = `<h3>${esc(ui("chooseLang"))}</h3>` + LANGS.map((l) =>
      `<button class="lang-opt${l.status === "next" ? " is-next" : ""}" role="menuitemradio" aria-checked="${l.code === state.lang}" data-lang="${l.code}" lang="${l.code}">
        <span>${esc(l.native)}<br><small>${esc(l.name)}</small></span>
        <span class="badge badge--${l.status}">${esc(ui("st_" + l.status))}</span>
      </button>`).join("");
    // chips de portada
    $("#heroChips").innerHTML = LANGS.map((l) =>
      `<button class="chip${l.status === "next" ? " is-next" : ""}" type="button" aria-pressed="${l.code === state.lang}" data-lang="${l.code}" lang="${l.code}">${esc(l.native)}</button>`).join("");

    renderFlags();

    // progreso
    $("#progress").innerHTML = CHAPTERS.map((ch, i) =>
      `<button type="button" data-goto="${ch.id}" data-body="${ch.body}" aria-label="${esc(tx(ch.no))}: ${esc(tx(ch.title))}" title="${esc(tx(ch.title))}"><i></i></button>`).join("");
    // índice
    $("#toc").innerHTML = CHAPTERS.map((ch, i) =>
      `<li><a class="piso" href="#${ch.id}" data-body="${ch.body}">${RETABLO.bud(i)}<span class="piso__txt"><span class="no">${esc(tx(ch.no))} · ${esc(ui("body_" + ch.body))}</span><span class="tt">${esc(tx(ch.title))}</span><span class="ts">${esc(tx(ch.teaser))}</span></span><span class="piso__go" aria-hidden="true">▶</span></a></li>`).join("");

    renderHero();
    renderExtras();
    if ($("#muteLbl")) renderMute();
    offline.saved = false;
    renderOffline();
    checkOffline();
    updateProgress();
  }

  function renderExtras() {
    const last = CHAPTERS[CHAPTERS.length - 1].steps;
    const finalLine = tx(last[last.length - 1].t);
    const quote = finalLine.split(":").pop().trim();
    const q = quote.replace(/^[«“"]|[.»”"]+$/g, "");
    $("#finaleQuote").textContent = `«${q.charAt(0).toUpperCase() + q.slice(1)}»`;

    $("#objects").innerHTML = OBJECTS.map((o) => {
      const ch = CHAPTERS.find((c) => c.id === o.chapter);
      return `<button class="obj" type="button" data-goto="${o.chapter}" data-body="${o.body}">
        <span class="tag">${esc(ui("body_" + o.body))} · ${o.year}</span>
        <strong>${esc(tx(o.name))}</strong>
        <small>${esc(ui("status"))}: ${esc(tx(ch.status))}</small>
      </button>`;
    }).join("");

    const fmt = new Intl.NumberFormat(contentLang() === "en" ? "en-US" : "es-PE");
    const rows = LANGS.filter((l) => l.speakers).map((l) =>
      `<tr><td><strong lang="${l.code}">${esc(l.native)}</strong><br><small>${esc(l.name)}</small></td><td>${esc(l.family)}</td><td class="num">${fmt.format(l.speakers)}</td><td>${esc(tx(l.region))}</td><td><span class="badge badge--${l.status}">${esc(ui("st_" + l.status))}</span></td></tr>`).join("");
    $("#langsTable").innerHTML = `<caption class="sr-only">${esc(ui("langsTitle"))}</caption><thead><tr><th>${esc(ui("thLang"))}</th><th>${esc(ui("thFamily"))}</th><th>${esc(ui("thSpeakers"))}</th><th>${esc(ui("thRegion"))}</th><th>${esc(ui("thStatus"))}</th></tr></thead><tbody>${rows}</tbody>`;

    $("#timeline").innerHTML = TIMELINE.map((e) => `<li data-body="${e.body}"><span class="tl__y">${e.y}</span><span class="tl__t">${esc(tx(e.t))}</span></li>`).join("");

    const seen = new Map();
    CHAPTERS.forEach((ch) => ch.steps.forEach((st) => { if (st.fact && !seen.has(st.fact.src)) seen.set(st.fact.src, { label: st.fact.label, chs: new Set() }); if (st.fact) seen.get(st.fact.src).chs.add(tx(ch.no)); }));
    $("#sources").innerHTML = Array.from(seen.entries()).map(([url, v]) =>
      `<li><a href="${url}" target="_blank" rel="noopener">${esc(v.label)}</a> <small>— ${esc(Array.from(v.chs).join(", "))}</small></li>`).join("") +
      `<li>${esc(L("Fotos: NASA Image and Video Library (dominio público) — ", "Photos: NASA Image and Video Library (public domain) — ", "Fotokuna: NASA Image and Video Library — "))}${Array.from(new Set(CHAPTERS.flatMap((c) => c.media.map((m) => m.id)))).map((id) => `<a href="https://images.nasa.gov/details/${id.toLowerCase().startsWith("as") ? id.toLowerCase() : id}" target="_blank" rel="noopener">${id}</a>`).join(", ")}</li>` +
      `<li>INEI – Censo Nacional 2017 (${esc(L("lenguas maternas; cifras recopiladas por L. Andrade, PUCP", "mother tongues; figures compiled by L. Andrade, PUCP"))})</li>`;
  }

  /* ---------- scrollytelling ---------- */
  let observer = null, artObserver = null;
  function observeSteps() {
    if (BOOK) return; // en el libro no hay scroll: las páginas se pasan con showPage()
    if (observer) observer.disconnect();
    const mobile = window.matchMedia("(max-width: 899px)").matches;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const s = e.target.closest(".step");
        activate(+s.dataset.ch, +s.dataset.step);
      });
    }, { rootMargin: mobile ? "-62% 0px -30% 0px" : "-48% 0px -48% 0px", threshold: 0 });
    $$(".chapter:not(.has-art) .step, .has-art .step .card").forEach((s) => observer.observe(s));
    // la primera ilustración de cada capítulo se pide un poco antes de llegar a él
    if (artObserver) artObserver.disconnect();
    artObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) loadArt(CHAPTERS.findIndex((c) => c.id === e.target.id), 1); });
    }, { rootMargin: "100% 0px 100% 0px" });
    $$(".chapter.has-art").forEach((c) => artObserver.observe(c));
  }

  function applyScene(ci, step) {
    const svg = $("#scene-" + CHAPTERS[ci].id);
    if (!svg) return;
    $$(".ly", svg).forEach((g) => {
      const show = +g.dataset.show, hide = g.dataset.hide ? +g.dataset.hide : Infinity;
      g.classList.toggle("on", step >= show && step < hide);
    });
    const ch = CHAPTERS[ci];
    loadArt(ci, step); loadArt(ci, step + 1);
    if (step >= ch.steps.length) loadArt(ci + 1, 1);
    focusScene(svg, step, ch.art);
    // fondo difuminado con la misma ilustración (celular vertical): la escena "sangra" hasta los bordes
    applyBg(ci, step);
  }

  /* cámara: se acerca a lo que aparece en este paso; si no aparece nada nuevo, vuelve a la vista completa */
  function focusScene(svg, step, art) {
    const cam = $(".cam", svg);
    if (!cam) return;
    if (art) { // ilustración: acercamiento lento hacia el punto indicado en story.js
      const [fx, fy, z0] = art[step - 1] || [.5, .5, 1];
      // la imagen cubre toda la pantalla: en vertical solo cabe una franja, que se centra en el punto de interés
      const r = (svg.clientWidth || 800) / (svg.clientHeight || AH);
      const vw = r < 800 / AH ? AH * r : 800, vh = r < 800 / AH ? AH : 800 / r;
      // pantalla vertical: la imagen ya va recortada a lo ancho, así que casi no se acerca (se ve más del dibujo)
      const z = r < 1.5 ? 1 + (z0 - 1) * .3 : z0, cy = AH / 2;
      const ax = Math.min(400 - vw / 2, Math.max(400 + vw / 2 - 800 * z, 400 - z * fx * 800));
      const ay = Math.min(AH / 2 - vh / 2, Math.max(AH / 2 + vh / 2 - AH * z, cy - z * fy * AH));
      cam.style.transform = `translate(${ax.toFixed(1)}px, ${ay.toFixed(1)}px) scale(${z})`;
      return;
    }
    const W = 800, H = 600;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    if (step > 1) $$(`.ly[data-show="${step}"]`, cam).forEach((g) => {
      let b;
      try { b = g.getBBox(); } catch (e) { return; }
      if (!b.width || !b.height) return;
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
    });
    let s = 1, tx = 0, ty = 0;
    if (x1 > x0) {
      x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(W, x1); y1 = Math.min(H, y1);
      s = Math.max(1, Math.min(1.3, 0.62 * Math.min(W / (x1 - x0), H / (y1 - y0))));
      tx = Math.min(0, Math.max(W - W * s, W / 2 - s * (x0 + x1) / 2));
      ty = Math.min(0, Math.max(H - H * s, H / 2 - s * (y0 + y1) / 2));
    }
    cam.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(3)})`;
  }

  function activate(ci, step, silent) {
    const prev = state.current;
    if (prev.ch === ci && prev.step === step) return;
    state.current = { ch: ci, step };
    $$(".step.is-active").forEach((s) => s.classList.remove("is-active"));
    const el = $(`.step[data-ch="${ci}"][data-step="${step}"]`);
    if (el) el.classList.add("is-active");
    applyScene(ci, step);
    updateProgress();
    clearAdvance();
    renderSegs();
    if (silent) return;
    if (state.autoplay) speakStep(ci, step - 1);
    else scheduleAdvance(readMs(CHAPTERS[ci].steps[step - 1])); // sin sonido: avanza al ritmo de lectura
  }

  function updateProgress() {
    const btns = $$("#progress button");
    btns.forEach((b, i) => {
      const bar = b.querySelector("i");
      let w = 0;
      if (i < state.current.ch) w = 100;
      else if (i === state.current.ch) w = Math.round((state.current.step / CHAPTERS[i].steps.length) * 100);
      bar.style.width = w + "%";
      b.classList.toggle("is-current", i === state.current.ch);
      if (i === state.current.ch) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    });
  }

  function gotoStep(delta) {
    if (BOOK) { showPage(state.page + delta); return; }
    const all = $$(".step");
    let idx = all.findIndex((s) => s.classList.contains("is-active"));
    idx = Math.max(0, Math.min(all.length - 1, idx + delta));
    all[idx].scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: window.matchMedia("(max-width: 899px)").matches ? "start" : "center" });
  }

  /* ---------- narración ---------- */
  const synth = window.speechSynthesis;
  let voices = [];
  function loadVoices() { voices = synth ? synth.getVoices() : []; }
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }

  function pickVoice(lang) {
    const prefs = lang === "en" ? ["en-US", "en-GB", "en"] : ["es-PE", "es-419", "es-MX", "es-US", "es-ES", "es"];
    for (const p of prefs) {
      const v = voices.find((x) => x.lang && x.lang.replace("_", "-").toLowerCase().startsWith(p.toLowerCase()));
      if (v) return v;
    }
    return null;
  }

  /* Un solo reproductor para toda la narración. iPhone y Safari solo dejan sonar un audio
     que se "desbloqueó" con un toque; si cada escena creara uno nuevo desde un temporizador,
     el avance automático quedaría mudo o desfasado. Este se desbloquea al abrir el retablo
     (o al tocar Reproducir) y luego solo se le cambia el archivo. */
  const narrator = new Audio();
  narrator.preload = "auto";
  let audioEl = null, speakId = 0;
  function stopSpeaking() {
    speakId++; // cualquier fin de audio pendiente ya no cuenta
    if (synth) synth.cancel();
    narrator.onended = narrator.onerror = null;
    if (audioEl) { audioEl.pause(); audioEl = null; }
    $$(".play[aria-pressed='true']").forEach((b) => setPlayBtn(b, false));
    state.speaking = null;
    stopBar(false);
  }
  function stopBar(on) {
    const b = $("#stopBar");
    if (!b) return;
    b.classList.toggle("is-speaking", !!on);
    if (BOOK) { renderAuto(); return; }
    b.hidden = !on;
    $("#stopBarIco").textContent = "■";
    $("#stopBarLbl").textContent = ui("stopAudio");
  }
  function renderMute() {
    const on = state.autoplay;
    const btn = $("#autoplay");
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? ui("soundOn") : ui("muted"));
    btn.title = on ? ui("soundOn") : ui("muted");
    btn.classList.toggle("is-muted", !on);
    $("#muteLbl").textContent = on ? ui("soundOn") : ui("muted");
    $("#muteIcon").innerHTML = on
      ? `<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>`
      : `<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/>`;
  }
  let hintShown = false;
  function setPlayBtn(b, on) {
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.querySelector(".lbl").textContent = on ? ui("stop") : ui("listen");
    b.querySelector("[aria-hidden]").textContent = on ? "■" : "▶";
  }

  function speakTTS(text, lang, onDone) {
    if (!synth) { toast(ui("noVoice")); onDone(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "en" ? "en-US" : "es-PE";
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = 0.92;
    u.onend = () => onDone(true);
    u.onerror = () => onDone(false);
    synth.speak(u);
  }

  function speakStep(ci, si, btn) {
    stopSpeaking();
    const id = ++speakId;
    const ch = CHAPTERS[ci], st = ch.steps[si];
    btn = btn || $(`.play[data-ch="${ci}"][data-step="${si}"]`);
    if (btn) setPlayBtn(btn, true);
    state.speaking = `${ci}-${si}`;
    stopBar(true);
    // audios grabados: audio/<es|en|qu>/<capitulo>-<paso>.mp3
    // aimara, asháninka, awajún y shipibo aún no tienen audio: suena el castellano
    const audioLang = AUDIO_LANGS.includes(state.lang) ? state.lang : "es";
    if (audioLang !== state.lang) toast(ui("noAudioQu"));
    // ok = la escena se escuchó entera: el retablo pasa solo a la siguiente
    const here = () => pages[state.page] && pages[state.page].ci === ci && pages[state.page].si === si;
    const done = (ok) => {
      if (id !== speakId) return;
      if (btn) setPlayBtn(btn, false);
      state.speaking = null;
      audioEl = null;
      stopBar(false);
      if (here()) scheduleAdvance(ok ? AFTER_MS : readMs(st), ok ? .92 : 0);
    };
    // el navegador no deja sonar sin un toque: el retablo se detiene (no sigue mudo) hasta que toquen Reproducir
    const blocked = () => {
      if (id !== speakId) return;
      if (btn) setPlayBtn(btn, false);
      state.speaking = null;
      audioEl = null;
      if (BOOK && state.auto && here()) setAuto(false); else stopBar(false);
      if (!hintShown) { hintShown = true; toast(ui("tapToListen")); }
    };
    const play = (lang, onFail) => {
      const a = narrator;
      audioEl = a;
      a.onended = () => done(true);
      a.onerror = () => { if (id === speakId && audioEl === a) { audioEl = null; onFail(); } };
      a.src = `audio/${lang}/${ch.id}-${si + 1}.mp3`;
      a.play().catch((e) => { if (id === speakId && e && e.name === "NotAllowedError") blocked(); });
    };
    const viaTTS = () => speakTTS(audioLang === "en" ? st.t.en : st.t.es, audioLang === "en" ? "en" : "es", done);
    if (audioLang === "qu") play("qu", () => play("es", viaTTS));
    else play(audioLang, viaTTS);
    // la siguiente escena se pide ya, para que su voz empiece sin espera
    const nxt = ch.steps[si + 1] ? `${ch.id}-${si + 2}` : CHAPTERS[ci + 1] ? `${CHAPTERS[ci + 1].id}-1` : null;
    if (nxt) fetch(`audio/${audioLang}/${nxt}.mp3`).catch(() => {});
  }
  const AUDIO_LANGS = ["es", "en", "qu"];

  /* ---------- el retablo avanza solo ---------- */
  // Con sonido: al terminar el audio de una escena, espera un momento y pasa a la siguiente.
  // Sin sonido: avanza al ritmo de lectura. La portadilla de cada piso se queda unos segundos.
  const AFTER_MS = 1500, COVER_MS = 7000;
  const adv = { t: null, start: 0, dur: 0, base: 0, pending: 0, pendingBase: 0 };
  state.auto = store.get("yachaska-auto") !== "0";
  const readMs = (st) => Math.max(5000, Math.min(22000, 2500 + tx(st.t).split(/\s+/).length * 380));

  function clearAdvance() { clearTimeout(adv.t); adv.t = null; adv.dur = 0; adv.pending = 0; }
  function scheduleAdvance(ms, base) {
    clearAdvance();
    if (!BOOK || !state.auto || state.page >= pages.length - 1) return;
    if (sheetOpen()) { adv.pending = ms; adv.pendingBase = base || 0; return; } // espera a que se cierre la ficha
    adv.start = performance.now(); adv.dur = ms; adv.base = base || 0;
    adv.t = setTimeout(() => { adv.t = null; adv.dur = 0; showPage(state.page + 1); }, ms);
  }
  function resumeAuto() {
    const p = pages[state.page];
    if (!p) return;
    if (p.type === "step") { if (state.autoplay) speakStep(p.ci, p.si); else scheduleAdvance(readMs(CHAPTERS[p.ci].steps[p.si])); }
    else if (p.type === "cover") scheduleAdvance(COVER_MS);
  }
  function setAuto(on) {
    state.auto = on;
    store.set("yachaska-auto", on ? "1" : "0");
    if (on) resumeAuto(); else { clearAdvance(); stopSpeaking(); }
    renderAuto();
  }
  function renderAuto() {
    const b = $("#stopBar");
    if (!b || !BOOK) return;
    const p = pages[state.page];
    b.hidden = !p || (p.type !== "step" && p.type !== "cover");
    b.classList.toggle("is-paused", !state.auto);
    b.setAttribute("aria-pressed", String(state.auto));
    $("#stopBarIco").textContent = state.auto ? "❚❚" : "▶";
    $("#stopBarLbl").textContent = state.auto ? ui("autoPause") : ui("listen"); // ❚❚ Pausa  ·  ▶ Escuchar
  }

  /* barras de progreso arriba, una por escena del piso (como en las historias del celular) */
  function renderSegs() {
    const box = $("#segs");
    const p = pages[state.page];
    if (!box) return;
    if (!BOOK || !p || p.type !== "step") { box.innerHTML = ""; return; }
    const n = CHAPTERS[p.ci].steps.length;
    box.innerHTML = Array.from({ length: n }, (_, i) => `<i class="${i < p.si ? "is-done" : i === p.si ? "is-now" : ""}"><b></b></i>`).join("");
  }
  function tickSegs() {
    requestAnimationFrame(tickSegs);
    const b = $("#segs .is-now b");
    if (!b) return;
    let f = null;
    if (audioEl && audioEl.duration) f = (audioEl.currentTime / audioEl.duration) * .92;
    else if (adv.dur) f = adv.base + (1 - adv.base) * Math.min(1, (performance.now() - adv.start) / adv.dur);
    if (f != null) b.style.transform = `scaleX(${f.toFixed(3)})`;
  }

  /* ficha del dato NASA o del puente andino */
  const sheetOpen = () => { const s = $("#sheet"); return !!s && s.classList.contains("is-open"); };
  function openSheet(kind, ci, si) {
    const st = CHAPTERS[ci].steps[si], sh = $("#sheet");
    const item = kind === "fact" ? st.fact : st.bridge;
    if (!item) return;
    $("#sheetIco").innerHTML = ICON[kind];
    $("#sheetT").textContent = ui(kind);
    $("#sheetBody").innerHTML = `<p>${esc(tx(item))}</p>` + (kind === "fact" ? `<a class="src" href="${item.src}" target="_blank" rel="noopener">${esc(ui("source"))}: ${esc(item.label)} ↗</a>` : "");
    sh.className = "sheet sheet--" + kind;
    sh.hidden = false;
    requestAnimationFrame(() => sh.classList.add("is-open"));
    // mientras se lee la ficha, el retablo no avanza
    if (adv.t) { const left = Math.max(AFTER_MS, adv.dur - (performance.now() - adv.start)); const base = adv.base; clearAdvance(); adv.pending = left; adv.pendingBase = base; }
    $$(".ico").forEach((b) => b.classList.toggle("is-sel", b.dataset.sheet === kind && +b.dataset.ch === ci && +b.dataset.step === si));
  }
  function closeSheet(noResume) {
    const sh = $("#sheet");
    if (!sh || !sheetOpen()) return;
    sh.classList.remove("is-open");
    $$(".ico.is-sel").forEach((b) => b.classList.remove("is-sel"));
    setTimeout(() => { if (!sheetOpen()) sh.hidden = true; }, 350);
    const ms = adv.pending, base = adv.pendingBase;
    adv.pending = 0;
    if (ms && !noResume) scheduleAdvance(ms, base);
  }

  /* barra de arriba: se esconde dentro de las escenas; un botón pequeño la vuelve a mostrar */
  let chromeT = null;
  function setChrome(show) {
    const root = document.documentElement;
    clearTimeout(chromeT);
    root.classList.toggle("chrome-hidden", BOOK && !show);
    if (show && root.classList.contains("on-scene")) chromeT = setTimeout(function hide() {
      if ($("#langMenu").classList.contains("open")) chromeT = setTimeout(hide, 3000); else setChrome(false);
    }, 5000);
  }

  /* ---------- sin conexión ---------- */
  // sw.js guarda la página; este botón guarda los 56 audios de la lengua activa
  const AUDIO_CACHE = "yachaska-audio-v4";
  const canOffline = "caches" in window && "serviceWorker" in navigator;
  const offline = { busy: false, done: 0, total: 0, saved: false };
  const audioLangNow = () => (AUDIO_LANGS.includes(state.lang) ? state.lang : "es");
  const audioUrls = (lang) => CHAPTERS.flatMap((ch) => ch.steps.map((_, i) => `audio/${lang}/${ch.id}-${i + 1}.mp3`));

  function renderOffline() {
    const b = $("#offlineBtn");
    if (!b) return;
    b.hidden = !canOffline;
    b.disabled = offline.busy;
    $("#offlineLbl").textContent = offline.busy ? `${ui("offBusy")} ${offline.done}/${offline.total}` : offline.saved ? ui("offDone") : ui("offline");
  }
  async function checkOffline() {
    if (!canOffline || offline.busy) return;
    const lang = audioLangNow();
    let saved = false;
    try {
      const keys = await (await caches.open(AUDIO_CACHE)).keys();
      saved = keys.filter((r) => r.url.includes(`/audio/${lang}/`)).length >= audioUrls(lang).length;
    } catch (e) { /* sin caché */ }
    if (offline.busy || lang !== audioLangNow()) return;
    offline.saved = saved;
    renderOffline();
  }
  async function saveOffline() {
    if (!canOffline || offline.busy) return;
    const urls = audioUrls(audioLangNow());
    Object.assign(offline, { busy: true, done: 0, total: urls.length, saved: false });
    renderOffline();
    let failed = 0;
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      const cache = await caches.open(AUDIO_CACHE);
      // las ilustraciones también quedan guardadas (el service worker las copia al pedirlas)
      CHAPTERS.forEach((ch) => (ch.art || []).forEach((_, i) => { fetch(artSrc(ch, i + 1)).catch(() => {}); }));
      const queue = urls.slice();
      const worker = async () => {
        while (queue.length) {
          const u = queue.shift();
          try {
            if (!(await cache.match(u))) {
              const r = await fetch(u, { cache: "no-cache" });
              if (r.status !== 200) throw new Error(u);
              await cache.put(u, r);
            }
          } catch (e) { failed++; }
          offline.done++;
          renderOffline();
        }
      };
      await Promise.all([worker(), worker(), worker()]);
    } catch (e) { failed = failed || 1; }
    offline.busy = false;
    renderOffline();
    toast(failed ? ui("offFail") : ui("offDoneToast"));
    checkOffline();
  }

  /* ---------- avisos ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 5000);
  }
  function updateNotice() {
    const l = LANGS.find((x) => x.code === state.lang);
    const n = $("#notice");
    if (l.status === "ok" || store.get("yachaska-notice-" + l.code) === "x") { n.classList.remove("show"); return; }
    $("#noticeText").textContent = l.status === "rev" ? ui("qNotice") : `${l.native}: ${ui("nextNotice")}`;
    n.classList.add("show");
  }

  /* ---------- lengua y tema ---------- */
  function setLang(code) {
    if (code === state.lang) { closeMenu(); return; }
    stopSpeaking();
    state.lang = code;
    store.set("yachaska-lang", code);
    const keep = state.current;
    renderChrome();
    renderStory();
    state.current = { ch: -1, step: 0 };
    if (keep.ch >= 0) activate(keep.ch, keep.step, true);
    if (BOOK) { showPage(state.page, { instant: true, silent: true }); if (!$("#book")) resumeAuto(); } // la voz sigue, ahora en la nueva lengua
    updateNotice();
    closeMenu();
  }

  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    store.set("yachaska-theme", t);
    $('meta[name="theme-color"]').setAttribute("content", t === "day" ? "#FBF6EA" : "#0d1a4a");
    $("#theme").innerHTML = t === "day"
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>`;
    $("#theme").title = t === "day" ? ui("day") : ui("night");
  }

  function openMenu() { $("#langMenu").classList.add("open"); $("#langBtn").setAttribute("aria-expanded", "true"); const c = $('#langMenu [aria-checked="true"]'); if (c) c.focus(); }
  function closeMenu() { $("#langMenu").classList.remove("open"); $("#langBtn").setAttribute("aria-expanded", "false"); }

  /* ---------- CSV para traductores ---------- */
  function downloadCSV() {
    const q = (s) => `"${String(s == null ? "" : s).replace(/"/g, '""')}"`;
    const others = LANGS.map((l) => l.code).filter((c) => c !== "es" && c !== "en");
    const rows = [["capitulo", "paso", "voz", "es", "en", ...others.map((c) => c + " (revisa hablante nativo)"), "dato_es", "fuente", "puente_es", "audio_qu"]];
    CHAPTERS.forEach((ch) => ch.steps.forEach((st, i) => rows.push([
      ch.id, i + 1, st.who || ch.voice, st.t.es, st.t.en, ...others.map((c) => st.t[c] || ""),
      st.fact ? st.fact.es : "", st.fact ? st.fact.src : "", st.bridge ? st.bridge.es : "", `audio/qu/${ch.id}-${i + 1}.mp3`
    ])));
    const blob = new Blob(["﻿" + rows.map((r) => r.map(q).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "yachaska-guion.csv";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ---------- pisos del retablo ---------- */
  // índice · (portadilla + escenas) de cada capítulo · página final
  let pages = [];
  function buildPages() {
    pages = [{ type: "toc" }];
    CHAPTERS.forEach((ch, ci) => { pages.push({ type: "cover", ci }); ch.steps.forEach((_, si) => pages.push({ type: "step", ci, si })); });
    pages.push({ type: "end" });
  }
  const pageOf = (ci, si) => pages.findIndex((p) => p.ci === ci && (si == null ? p.type === "cover" : p.type === "step" && p.si === si));
  const floorOf = (p) => (p.type === "toc" ? -1 : p.type === "end" ? CHAPTERS.length : p.ci);
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showPage(n, opt) {
    const o = opt || {};
    n = Math.max(0, Math.min(pages.length - 1, n));
    const p = pages[n], from = pages[state.page], same = n === state.page;
    state.page = n;
    const apply = (silent) => {
      closeSheet(true);
      clearAdvance();
      if (silent) stopSpeaking();
      $$(".is-on").forEach((v) => v.classList.remove("is-on"));
      const el = p.type === "toc" ? $(".pisos") : p.type === "end" ? $("#extras") : $(p.type === "cover" ? ".ch-cover" : ".scrolly", $("#" + CHAPTERS[p.ci].id));
      el.classList.add("is-on");
      document.documentElement.classList.toggle("on-scene", p.type === "step");
      setChrome(p.type !== "step");
      renderAuto();
      if (p.type === "step") activate(p.ci, p.si + 1, silent);
      else {
        el.scrollTop = 0;
        stopSpeaking();
        $$(".step.is-active").forEach((s) => s.classList.remove("is-active"));
        state.current = { ch: p.type === "cover" ? p.ci : p.type === "end" ? CHAPTERS.length : -1, step: 0 };
        updateProgress();
        if (p.type === "cover") loadArt(p.ci, 1);
        renderSegs();
        if (p.type === "cover" && !silent) scheduleAdvance(COVER_MS);
      }
      $("#prevBtn").disabled = n === 0;
      $("#nextBtn").disabled = n === pages.length - 1;
    };
    // dentro de un mismo piso la escena cambia sola (la luz se funde); al cambiar de piso, las puertas se cierran y se abren
    const newFloor = !from || floorOf(from) !== floorOf(p);
    if (o.instant || same || reduced() || (!newFloor && !doors.busy)) { apply(o.silent); return; }
    // con puertas: la escena se cambia detrás de ellas en silencio, y la voz empieza cuando ya se ven
    swingDoors(() => apply(true), () => { if (!o.silent && state.page === n) resumeAuto(); });
  }

  /* puertas pintadas a pantalla completa */
  const doors = { busy: false, size: "", t: [] };
  function paintDoors() {
    const h = Math.max(200, innerHeight - (BOOK ? $(".topbar").offsetHeight : 0));
    const W = 600 * (innerWidth / 2) / h;
    const key = Math.round(W);
    if (doors.size === key) return;
    doors.size = key;
    $(".doors__l").innerHTML = RETABLO.doorWide(W);
    $(".doors__r").innerHTML = RETABLO.doorWide(W);
  }
  function swingDoors(mid, opened) {
    const d = $("#doors");
    paintDoors();
    doors.t.forEach(clearTimeout);
    const wasClosed = d.classList.contains("is-closed");
    doors.busy = true;
    d.className = "doors is-shown" + (wasClosed ? " is-closed" : "");
    if (!wasClosed) requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add("is-closed")));
    doors.t = [
      setTimeout(mid, wasClosed ? 60 : 600),
      setTimeout(() => { d.classList.add("is-opening"); d.classList.remove("is-closed"); }, wasClosed ? 300 : 840),
      setTimeout(() => { if (opened) opened(); }, wasClosed ? 700 : 1240),
      setTimeout(() => { d.className = "doors"; doors.busy = false; }, wasClosed ? 1150 : 1700)
    ];
  }

  /* ---------- el retablo cerrado de la entrada ---------- */
  function initBook() {
    const book = $("#book");
    if (!book) return;
    const box = $("#rtBox");
    $("#openCrest").innerHTML = RETABLO.crest();
    // las puertas se pintan a la medida real de la caja (cambia con la pantalla)
    let painted = "";
    const paint = () => {
      const r = box.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const W = Math.round(600 * (r.width / 2) / r.height);
      if (String(W) === painted) return;
      painted = String(W);
      $$(".rt-door", book).forEach((d) => { d.innerHTML = `<div class="rt-face">${RETABLO.doorWide(W)}</div><div class="rt-face rt-face--back">${RETABLO.doorWide(W)}</div>`; });
    };
    const close = () => { removeEventListener("resize", paint); book.remove(); document.documentElement.classList.remove("book-closed"); };
    if (location.hash.length > 1) { close(); return; } // enlace directo a un capítulo: sin retablo cerrado
    document.documentElement.classList.add("book-closed");
    paint();
    addEventListener("resize", paint, { passive: true });
    // la caja cambia de tamaño cuando la cuerda pasa de una a dos filas: se repinta
    let rowsNow = $("#bookFlags").dataset.rows;
    addEventListener("resize", () => { renderFlags(); if ($("#bookFlags").dataset.rows !== rowsNow) { rowsNow = $("#bookFlags").dataset.rows; requestAnimationFrame(paint); } }, { passive: true });

    let opened = false;
    const setOpen = (f) => book.style.setProperty("--open", f.toFixed(3));
    function openNow(fromDrag) {
      if (opened) return;
      // celular en vertical: antes de abrir, se sugiere girarlo (una vez)
      if (askRotate(() => openNow(fromDrag))) { setOpen(0); book.classList.remove("is-unlocked"); return; }
      opened = true;
      book.classList.add("is-unlocked");
      knock();
      // detrás del retablo ya espera la primera escena (y empieza la narración: el toque cuenta como gesto)
      const first = $(".chapter .scrolly");
      document.documentElement.classList.remove("book-closed");
      if (BOOK) showPage(pageOf(0, 0), { instant: true });
      else if (first) window.scrollTo({ top: first.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      if (reduced()) { close(); return; }
      const t0 = fromDrag ? 0 : 380; // primero gira el pestillo, luego se abren las puertas
      setTimeout(() => { book.classList.add("is-open"); setOpen(1); }, t0);
      // la cámara entra a la caja hasta que la escena llena la pantalla
      setTimeout(() => {
        const stage = $("#rtStage"), s = stage.getBoundingClientRect(), b = box.getBoundingClientRect();
        const k = Math.max(innerWidth / b.width, innerHeight / b.height) * 1.06;
        stage.style.transformOrigin = `${(b.left - s.left + b.width / 2).toFixed(1)}px ${(b.top - s.top + b.height / 2).toFixed(1)}px`;
        stage.style.transform = `translate(${(innerWidth / 2 - b.left - b.width / 2).toFixed(1)}px, ${(innerHeight / 2 - b.top - b.height / 2).toFixed(1)}px) scale(${k.toFixed(3)})`;
        book.classList.add("is-zoom");
      }, t0 + 1250);
      setTimeout(() => book.classList.add("is-gone"), t0 + 2350);
      setTimeout(close, t0 + 2950);
    }
    $("#bookOpen").addEventListener("click", () => openNow(false));

    // abrir con el dedo: arrastrar las puertas hacia los lados; un toque sin arrastrar solo las hace temblar
    let drag = null;
    box.addEventListener("pointerdown", (e) => {
      if (opened || e.target.closest(".flag, .rt-latch")) return;
      drag = { x: e.clientX, w: box.clientWidth, f: 0 };
      try { box.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      book.classList.add("is-drag");
    });
    box.addEventListener("pointermove", (e) => {
      if (!drag) return;
      drag.f = Math.min(1, Math.abs(e.clientX - drag.x) / (drag.w * 0.42));
      if (drag.f > 0.04) book.classList.add("is-unlocked");
      setOpen(drag.f * 0.85);
    });
    const end = () => {
      if (!drag) return;
      const f = drag.f;
      drag = null;
      book.classList.remove("is-drag");
      if (f > 0.3) { openNow(true); return; }
      setOpen(0);
      book.classList.remove("is-unlocked");
      if (f < 0.04) { // toque: la puerta está cerrada con el pestillo
        book.classList.remove("is-shake");
        void book.offsetWidth;
        book.classList.add("is-shake");
      }
    };
    box.addEventListener("pointerup", end);
    box.addEventListener("pointercancel", end);
  }

  /* ---------- girar el celular: el retablo y las ilustraciones se ven mejor en horizontal ----------
     Android: el botón pone pantalla completa y fija el horizontal. iPhone no deja fijarlo:
     se pide girar el teléfono y volver a tocar el pestillo. Se muestra una sola vez. */
  let rotateAsked = false, rotateThen = null;
  const isPhone = () => matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 600;
  const isPortrait = () => matchMedia("(orientation: portrait)").matches;
  const canLock = () => !!(document.documentElement.requestFullscreen && screen.orientation && screen.orientation.lock);
  function askRotate(then) {
    if (rotateAsked || !BOOK || !isPhone() || !isPortrait()) return false;
    rotateAsked = true;
    rotateThen = then;
    $("#rotateGo").hidden = !canLock();
    $("#rotate").hidden = false;
    requestAnimationFrame(() => $("#rotate").classList.add("is-on"));
    return true;
  }
  function hideRotate() {
    const r = $("#rotate");
    r.classList.remove("is-on");
    setTimeout(() => { r.hidden = true; }, 300);
  }
  function initRotate() {
    $("#rotateGo").addEventListener("click", async () => {
      try {
        await document.documentElement.requestFullscreen({ navigationUI: "hide" });
        await screen.orientation.lock("landscape");
      } catch (e) { /* el teléfono no lo permite: queda como esté */ }
      hideRotate();
      const t = rotateThen; rotateThen = null;
      if (t) t();
    });
    $("#rotateSkip").addEventListener("click", () => {
      hideRotate();
      const t = rotateThen; rotateThen = null;
      if (t) t();
    });
    // si lo giran con el aviso abierto, el aviso se va y el pestillo vuelve a llamar
    const mq = matchMedia("(orientation: landscape)");
    const onTurn = () => {
      if (!mq.matches || $("#rotate").hidden) return;
      hideRotate();
      rotateThen = null;
      const b = $("#book");
      if (b) { b.classList.remove("is-shake"); void b.offsetWidth; b.classList.add("is-shake"); }
    };
    if (mq.addEventListener) mq.addEventListener("change", onTurn); else mq.addListener(onTurn);
  }

  /* golpe de madera al girar el pestillo (sonido hecho en el momento, sin archivos) */
  function knock() {
    if (!state.autoplay) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ac = new AC(), t = ac.currentTime;
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = "triangle"; o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(70, t + .16);
      g.gain.setValueAtTime(.5, t); g.gain.exponentialRampToValueAtTime(.001, t + .2);
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + .22);
      const len = Math.floor(ac.sampleRate * .05), buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
      const n = ac.createBufferSource(), f = ac.createBiquadFilter(), g2 = ac.createGain();
      n.buffer = buf; f.type = "bandpass"; f.frequency.value = 1400; g2.gain.value = .35;
      n.connect(f).connect(g2).connect(ac.destination); n.start(t);
      setTimeout(() => ac.close(), 600);
    } catch (e) { /* sin audio */ }
  }

  /* las lenguas son banderines colgados en una cuerda, como en una fiesta del pueblo.
     Cada banderín lleva la bandera o el emblema de quienes hablan esa lengua:
       castellano → Perú · inglés → Estados Unidos (la voz en inglés es estadounidense)
       runasimi → bandera del Tawantinsuyu (arcoíris) · aymar aru → wiphala del Qullasuyu
     Los pueblos amazónicos no tienen bandera de país: llevan un dibujo de su arte
       asháninka → cushma a rayas · awajún → colores de la corona de plumas (tawasap)
       shipibo-konibo → kené, el dibujo de líneas que pintan en telas y cerámica */
  const svgUrl = (svg) => `url('data:image/svg+xml,${encodeURIComponent(svg)}')`;
  const WIPHALA = (() => {
    const col = ["#E4002B", "#F39200", "#FFD500", "#FFFFFF", "#009A3D", "#0072CE", "#6A2C91"];
    let r = "";
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${col[((x + y - 3) % 7 + 7) % 7]}"/>`;
    return svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 7" preserveAspectRatio="none">${r}</svg>`) + " center/cover";
  })();
  const KENE = svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><rect width="26" height="26" fill="#F3E7CC"/><path d="M0 13h5v-5h5v-5h6v5h5v5h5M13 0v3M13 23v3M0 13v0M5 13v5h5v5h6v-5h5v-5" fill="none" stroke="#1d1530" stroke-width="1.8"/><path d="M11 11h4v4h-4z" fill="#C2185B"/></svg>`) + " 0 0/22px 22px";
  const FLAG_ART = {
    es: "linear-gradient(90deg, #D91023 0 33.4%, #FFFFFF 33.4% 66.6%, #D91023 66.6%)",
    en: "radial-gradient(circle, #fff 0 1.3px, transparent 1.7px) 3px 3px/8px 7px no-repeat, radial-gradient(circle, #fff 0 1.3px, transparent 1.7px) 13px 3px/8px 7px no-repeat, radial-gradient(circle, #fff 0 1.3px, transparent 1.7px) 8px 9px/8px 7px no-repeat, radial-gradient(circle, #fff 0 1.3px, transparent 1.7px) 3px 15px/8px 7px no-repeat, radial-gradient(circle, #fff 0 1.3px, transparent 1.7px) 13px 15px/8px 7px no-repeat, linear-gradient(#3C3B6E, #3C3B6E) 0 0/44% 50% no-repeat, repeating-linear-gradient(#B22234 0 7.7%, #FFFFFF 7.7% 15.4%)",
    qu: "linear-gradient(#E4002B 0 14.3%, #F39200 14.3% 28.6%, #FFD500 28.6% 42.9%, #009A3D 42.9% 57.1%, #00A3E0 57.1% 71.4%, #0033A0 71.4% 85.7%, #6A2C91 85.7%)",
    ay: WIPHALA,
    cni: "linear-gradient(#B3261E 0 12%, transparent 12%), repeating-linear-gradient(90deg, #8A5A3C 0 7px, #5B3A26 7px 9px, #8A5A3C 9px 12px, #C9A27A 12px 13.5px)",
    agr: "linear-gradient(#E2231A 0 26%, #F7C600 26% 46%, #1d1530 46% 58%, #FFFFFF 58% 64%, #E2231A 64%)",
    shp: KENE
  };
  const FLAG_COLORS = [["#D7263D", "#FFFBF0"], ["#1F4FBF", "#FFFBF0"], ["#F2B632", "#1d1530"], ["#1F8A4C", "#FFFBF0"], ["#C2185B", "#FFFBF0"], ["#5B2A86", "#FFFBF0"], ["#F28C28", "#1d1530"]];
  function renderFlags() {
    const box = $("#bookFlags");
    if (!box) return;
    // pantalla ancha: una sola cuerda; celular: dos cuerdas
    const half = Math.ceil(LANGS.length / 2);
    const rows = box.clientWidth >= 460 ? [LANGS] : [LANGS.slice(0, half), LANGS.slice(half)];
    box.dataset.rows = rows.length;
    const SAG = 16;
    let k = 0;
    box.innerHTML = rows.map((row) => `<div class="rt-garland" style="--n:${row.length}">
        <svg class="rt-cord" viewBox="0 0 100 ${SAG + 4}" preserveAspectRatio="none" aria-hidden="true"><path d="M0 2Q50 ${2 + 2 * SAG} 100 2"/></svg>
        ${row.map((l, i) => {
          const x = (i + .5) / row.length, y = 2 + SAG * 4 * x * (1 - x), c = FLAG_COLORS[k++ % FLAG_COLORS.length];
          return `<button class="flag${l.status === "next" ? " is-next" : ""}" type="button" data-lang="${l.code}" lang="${l.code}" aria-pressed="${l.code === state.lang}" style="left:${(x * 100).toFixed(2)}%;top:${y.toFixed(1)}px;--fc:${c[0]};--ft:${c[1]};--d:${(-i * .37).toFixed(2)}s"><span class="flag__cloth"${FLAG_ART[l.code] ? ` style="background:${FLAG_ART[l.code]}"` : ""}><span class="flag__name">${esc(l.native)}</span></span></button>`;
        }).join("")}
      </div>`).join("");
  }

  /* ---------- profundidad: la escena se mueve un poco con el ratón o al inclinar el celular ---------- */
  function initParallax() {
    if (reduced()) return;
    const root = document.documentElement;
    let raf = 0, px = 0, py = 0;
    const clamp = (v) => Math.max(-.5, Math.min(.5, v));
    const set = (x, y) => {
      px = clamp(x); py = clamp(y);
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; root.style.setProperty("--px", px.toFixed(3)); root.style.setProperty("--py", py.toFixed(3)); });
    };
    addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") set(e.clientX / innerWidth - .5, e.clientY / innerHeight - .5); }, { passive: true });
    addEventListener("deviceorientation", (e) => { if (e.gamma != null) set(e.gamma / 50, (e.beta - 45) / 50); }, { passive: true });
  }

  /* ---------- ilustraciones nuevas: basta con dejarlas en assets/escenas/ ----------
     Si un capítulo aún no tiene `art` en story.js pero existe assets/escenas/<capitulo>-1.webp,
     el dibujo SVG se cambia por las ilustraciones (encuadre centrado). */
  function probeArt() {
    CHAPTERS.forEach((ch, ci) => {
      if (ch.art) return;
      const im = new Image();
      im.onload = () => {
        if (ch.art) return;
        ch.art = ch.steps.map(() => [.5, .5, 1.08]);
        const old = $("#scene-" + ch.id);
        if (!old) return;
        old.insertAdjacentHTML("afterend", sceneSVG(ch));
        old.remove();
        const fig = $(`#${ch.id} .scene-wrap`);
        if (fig) fig.classList.remove("scene-wrap--svg");
        if (state.current.ch === ci && state.current.step > 0) applyScene(ci, state.current.step);
      };
      im.src = artSrc(ch, 1);
    });
  }

  /* ---------- eventos ---------- */
  function bind() {
    document.addEventListener("click", (e) => {
      const langEl = e.target.closest("[data-lang]");
      if (langEl) { setLang(langEl.dataset.lang); return; }
      const go = e.target.closest("[data-goto]");
      if (go && BOOK) { showPage(pageOf(CHAPTERS.findIndex((c) => c.id === go.dataset.goto))); return; }
      if (go) { const t = document.getElementById(go.dataset.goto); if (t) t.scrollIntoView({ behavior: "smooth" }); return; }
      if (BOOK) {
        const piso = e.target.closest(".piso");
        if (piso) { e.preventDefault(); showPage(pageOf(CHAPTERS.findIndex((c) => c.id === piso.getAttribute("href").slice(1)))); return; }
        if (e.target.closest('a[href="#top"], .brand')) { e.preventDefault(); showPage(0); return; }
      }
      const ico = e.target.closest(".ico[data-sheet]");
      if (ico) { if (ico.classList.contains("is-sel")) closeSheet(); else openSheet(ico.dataset.sheet, +ico.dataset.ch, +ico.dataset.step); return; }
      if (e.target.closest("#sheetX")) { closeSheet(); return; }
      if (e.target.closest("#chromeBtn")) { setChrome(true); return; }
      if (e.target.closest(".topbar")) setChrome(true);
      if (sheetOpen() && !e.target.closest("#sheet")) closeSheet();
      const verse = e.target.closest(".has-art .verse");
      if (verse) { verse.classList.toggle("is-open"); return; } // subtítulo corto: se abre al tocar
      const play = e.target.closest(".play");
      if (play) {
        const key = `${play.dataset.ch}-${play.dataset.step}`;
        if (state.speaking === key) stopSpeaking(); else speakStep(+play.dataset.ch, +play.dataset.step, play);
        return;
      }
      if (!e.target.closest(".tools")) closeMenu();
    });
    $("#langBtn").addEventListener("click", (e) => { e.stopPropagation(); $("#langMenu").classList.contains("open") ? closeMenu() : openMenu(); });
    const flipTheme = () => setTheme(document.documentElement.getAttribute("data-theme") === "day" ? "night" : "day");
    $("#theme").addEventListener("click", flipTheme);
    $("#theme2").addEventListener("click", flipTheme);
    $("#autoplay").addEventListener("click", () => {
      state.autoplay = !state.autoplay;
      store.set("yachaska-autoplay", state.autoplay ? "1" : "0");
      renderMute();
      const pg = BOOK ? pages[state.page] : null;
      if (state.autoplay && state.current.ch >= 0 && state.current.step > 0) speakStep(state.current.ch, state.current.step - 1);
      else { stopSpeaking(); if (pg && pg.type === "step") scheduleAdvance(readMs(CHAPTERS[pg.ci].steps[pg.si])); }
      toast(state.autoplay ? ui("soundOnToast") : ui("mutedToast"));
    });
    $("#noticeClose").addEventListener("click", () => { $("#notice").classList.remove("show"); store.set("yachaska-notice-" + state.lang, "x"); });
    $("#csvBtn").addEventListener("click", downloadCSV);
    $("#offlineBtn").addEventListener("click", saveOffline);
    initBook();
    // pasar página como en un libro: botones grandes, visibles solo dentro del cuento
    $("#prevBtn").addEventListener("click", () => gotoStep(-1));
    $("#nextBtn").addEventListener("click", () => gotoStep(1));
    if (BOOK) $("#pager").hidden = false;
    else if ("IntersectionObserver" in window) new IntersectionObserver((en) => { $("#pager").hidden = !en[0].isIntersecting; }).observe($("#story"));
    // deslizar el dedo a los lados también pasa la página
    let sx = 0, sy = 0;
    document.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    document.addEventListener("touchend", (e) => {
      if (!BOOK || e.target.closest(".cast, .table-wrap, .lang-menu, .rt-open")) return;
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) gotoStep(dx < 0 ? 1 : -1);
    }, { passive: true });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { if (sheetOpen()) { closeSheet(); return; } closeMenu(); stopSpeaking(); return; }
      if (e.target.closest("input, textarea, select, [role=menu]")) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (BOOK && e.key === " " && !e.target.closest("button, a, summary")) { e.preventDefault(); setAuto(!state.auto); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); gotoStep(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); gotoStep(-1); }
    });
    $("#langMenu").addEventListener("keydown", (e) => {
      const opts = $$(".lang-opt");
      const i = opts.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); opts[(i + 1) % opts.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); opts[(i - 1 + opts.length) % opts.length].focus(); }
    });
    let mq = window.matchMedia("(max-width: 899px)");
    const onMq = () => observeSteps();
    if (mq.addEventListener) mq.addEventListener("change", onMq); else mq.addListener(onMq);
  }

  /* ---------- inicio ---------- */
  $("#crest").innerHTML = RETABLO.band();
  $("#heroCrest").innerHTML = RETABLO.crest();
  $$(".retablo__door").forEach((d) => { d.innerHTML = RETABLO.door(); });
  $("#rtCorners").innerHTML = [0, 1, 2, 3].map((i) => `<span class="rt-corner rt-corner--${i}">${RETABLO.bud(i * 2)}</span>`).join("");
  setTheme(document.documentElement.getAttribute("data-theme") || "night");
  renderMute();
  $("#stopBar").addEventListener("click", () => (BOOK ? setAuto(!state.auto) : stopSpeaking()));
  renderChrome();
  renderStory();
  loadArt(0, 1);
  updateNotice();
  bind();
  initParallax();
  initRotate();
  requestAnimationFrame(tickSegs);
  probeArt();
  addEventListener("resize", () => { doors.size = ""; }, { passive: true });
  if (BOOK) { document.documentElement.classList.add("bk"); buildPages(); showPage(0, { instant: true, silent: true }); }
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
  window.YACHASKA_APP = { activate, gotoStep, setLang, setTheme, showPage, pageOf, state, narrator };
})();
