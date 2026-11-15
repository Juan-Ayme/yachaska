/* =========================================================================
   YACHASKA – escenas ilustradas (SVG original dibujado en código)
   Cada escena devuelve el interior de un <svg viewBox="0 0 800 600">.
   Las capas <g class="ly" data-show="n" data-hide="m"> aparecen en el paso n
   y (opcional) desaparecen en el paso m.
   L(es, en) devuelve el texto en la lengua activa.
   ========================================================================= */
(function () {
  "use strict";

  const INK = "#1d1530";
  const CREAM = "#F3EEE4";
  const GOLD = "#F2B632";

  /* ---------- utilidades ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f1 = (n) => Math.round(n * 10) / 10;

  function ly(n, content, hide) {
    return `<g class="ly" data-show="${n}"${hide ? ` data-hide="${hide}"` : ""}>${content}</g>`;
  }

  function stars(n, seed, x0, y0, w, h, color) {
    const r = rng(seed);
    let s = `<g class="stars">`;
    for (let i = 0; i < n; i++) {
      const x = f1(x0 + r() * w), y = f1(y0 + r() * h);
      const big = r() > 0.92;
      const rad = big ? f1(1.6 + r() * 1.2) : f1(0.5 + r() * 1.1);
      const cls = r() > 0.7 ? ` class="tw" style="animation-delay:${f1(r() * 4)}s"` : "";
      s += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${color || CREAM}"${cls}/>`;
      if (big) s += `<path d="M${x} ${f1(y - rad * 3)}L${f1(x + rad * .5)} ${y}L${x} ${f1(y + rad * 3)}L${f1(x - rad * .5)} ${y}Z" fill="${color || CREAM}" opacity=".7"/>`;
    }
    return s + `</g>`;
  }

  function sparkle(x, y, s, color, cls) {
    const c = color || CREAM;
    return `<path class="${cls || "tw"}" d="M${x} ${y - s}Q${x + s * .12} ${y - s * .12} ${x + s} ${y}Q${x + s * .12} ${y + s * .12} ${x} ${y + s}Q${x - s * .12} ${y + s * .12} ${x - s} ${y}Q${x - s * .12} ${y - s * .12} ${x} ${y - s}Z" fill="${c}"/>`;
  }

  function chakana(cx, cy, u, attrs) {
    const p = [[-1,-3],[1,-3],[1,-2],[2,-2],[2,-1],[3,-1],[3,1],[2,1],[2,2],[1,2],[1,3],[-1,3],[-1,2],[-2,2],[-2,1],[-3,1],[-3,-1],[-2,-1],[-2,-2],[-1,-2]];
    return `<polygon points="${p.map(([x, y]) => `${cx + x * u},${cy + y * u}`).join(" ")}" ${attrs}/>`;
  }

  function moonPhase(cx, cy, r, f) {
    // f: 0 nueva · 0.5 llena
    const k = Math.abs(Math.cos(2 * Math.PI * f)) * r;
    const top = `${cx} ${cy - r}`, bot = `${cx} ${cy + r}`;
    let d;
    if (f <= 0.5) {
      const sweep = f < 0.25 ? 0 : 1;
      d = `M${top}A${r} ${r} 0 0 1 ${bot}A${f1(k)} ${r} 0 0 ${sweep} ${top}Z`;
    } else {
      const sweep = f > 0.75 ? 1 : 0;
      d = `M${top}A${r} ${r} 0 0 0 ${bot}A${f1(k)} ${r} 0 0 ${sweep} ${top}Z`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#262c48" stroke="${INK}" stroke-width="2"/><path d="${d}" fill="${CREAM}"/>`;
  }

  function label(x, y, txt, opt) {
    const o = Object.assign({ size: 15, fill: CREAM, anchor: "middle", italic: false, weight: 600, bg: false }, opt || {});
    const font = o.italic ? `font-family="Fraunces, Georgia, serif" font-style="italic"` : `font-family="Nunito, system-ui, sans-serif"`;
    let bg = "";
    if (o.bg) {
      const w = txt.length * o.size * 0.56 + 22;
      const x0 = o.anchor === "middle" ? x - w / 2 : o.anchor === "end" ? x - w + 11 : x - 11;
      bg = `<rect x="${f1(x0)}" y="${y - o.size - 4}" width="${f1(w)}" height="${o.size + 14}" rx="${(o.size + 14) / 2}" fill="${o.bg}" stroke="${INK}" stroke-width="2"/>`;
    }
    return `${bg}<text x="${x}" y="${y}" text-anchor="${o.anchor}" font-size="${o.size}" font-weight="${o.weight}" fill="${o.fill}" ${font}>${txt}</text>`;
  }

  /* ---------- personajes y objetos ---------- */
  function killaFace(cx, cy, r, withChakana) {
    const e = r * 0.22, ey = cy - r * 0.02;
    let s = `<path d="M${cx - r * .42} ${ey}q${e / 2} ${e * .4} ${e} 0M${cx + r * .42 - e} ${ey}q${e / 2} ${e * .4} ${e} 0" stroke="${INK}" stroke-width="${Math.max(2, r * .022)}" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M${cx - r * .14} ${cy + r * .3}q${r * .14} ${r * .1} ${r * .28} 0" stroke="${INK}" stroke-width="${Math.max(2, r * .02)}" fill="none" stroke-linecap="round"/>`;
    s += `<circle cx="${cx - r * .44}" cy="${cy + r * .2}" r="${r * .09}" fill="#f4a6a6" opacity=".55"/><circle cx="${cx + r * .44}" cy="${cy + r * .2}" r="${r * .09}" fill="#f4a6a6" opacity=".55"/>`;
    if (withChakana) s += chakana(cx, cy - r * .55, r * .035, `fill="${GOLD}" stroke="${INK}" stroke-width="1.2"`);
    return s;
  }

  function moonDisc(id, cx, cy, r, face) {
    const rr = rng(Math.round(cx * 7 + cy));
    let craters = "";
    for (let i = 0; i < 9; i++) {
      const a = rr() * Math.PI * 2, d = rr() * r * 0.8, cr = r * (0.04 + rr() * 0.07);
      craters += `<circle cx="${f1(cx + Math.cos(a) * d)}" cy="${f1(cy + Math.sin(a) * d)}" r="${f1(cr)}" fill="#cbc4b5" stroke="#a79f90" stroke-width="1.5"/>`;
    }
    return `<defs><clipPath id="${id}-clip"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
        <radialGradient id="${id}-shade" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity=".35"/><stop offset=".55" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#4d4177" stop-opacity=".45"/></radialGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ddd7cb"/>
      <g clip-path="url(#${id}-clip)">
        <ellipse cx="${cx - r * .28}" cy="${cy - r * .32}" rx="${r * .32}" ry="${r * .22}" fill="#c3bcae"/>
        <ellipse cx="${cx + r * .25}" cy="${cy + r * .15}" rx="${r * .28}" ry="${r * .18}" fill="#c3bcae"/>
        <ellipse cx="${cx - r * .38}" cy="${cy + r * .32}" rx="${r * .22}" ry="${r * .14}" fill="#c9c2b4"/>
        ${craters}
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}-shade)"/>
      </g>
      <circle cx="${cx}" cy="${cy}" r="${r * 1.04}" fill="none" stroke="#fff6e0" stroke-width="${Math.max(1.5, r * .03)}" opacity=".18"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="${Math.max(3, r * .02)}"/>
      ${face ? killaFace(cx, cy, r, true) : ""}`;
  }

  function earth(cx, cy, r, shade) {
    return `<g><circle cx="${cx}" cy="${cy}" r="${r * 1.18}" fill="#88a5e0" opacity=".14"/><circle cx="${cx}" cy="${cy}" r="${r * 1.07}" fill="none" stroke="#c8ddf5" stroke-width="${r * .06}" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#3a60a0" stroke="${INK}" stroke-width="${r > 20 ? 3 : 1.5}"/>
      <path d="M${cx - r * .5} ${cy - r * .55}q${r * .3} -${r * .2} ${r * .55} ${r * .05}q${r * .1} ${r * .3} -${r * .2} ${r * .45}q-${r * .3} ${r * .1} -${r * .35} -${r * .5}Z" fill="#5c9a6a"/>
      <path d="M${cx + r * .15} ${cy + r * .05}q${r * .35} -${r * .05} ${r * .45} ${r * .3}q-${r * .05} ${r * .35} -${r * .3} ${r * .35}q-${r * .25} -${r * .25} -${r * .15} -${r * .65}Z" fill="#6aa877"/>
      <path d="M${cx - r * .8} ${cy + r * .1}q${r * .4} -${r * .12} ${r * .7} 0M${cx - r * .2} ${cy - r * .8}q${r * .4} -${r * .1} ${r * .7} ${r * .08}" stroke="#ffffff" stroke-width="${r * .08}" stroke-linecap="round" fill="none" opacity=".75"/>
      ${shade ? `<path d="M${cx} ${cy - r}A${r} ${r} 0 0 0 ${cx} ${cy + r}A${r * .35} ${r} 0 0 1 ${cx} ${cy - r}Z" fill="#050912" opacity=".6"/>` : ""}
    </g>`;
  }

  function house(x, y, w, h) {
    const roofH = h * .55;
    let tiles = "";
    for (let i = 1; i < 6; i++) tiles += `<line x1="${x - 10 + (w + 20) * i / 6}" y1="${y}" x2="${x + w / 2}" y2="${y - roofH}" stroke="#8e2421" stroke-width="1.5" opacity=".6"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e7d6b8" stroke="${INK}" stroke-width="3"/>
      <polygon points="${x - 10},${y + 2} ${x + w / 2},${y - roofH} ${x + w + 10},${y + 2}" fill="#b8322f" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>${tiles}
      <rect x="${x + w * .18}" y="${y + h * .38}" width="${w * .22}" height="${h * .62}" fill="#5a3a24" stroke="${INK}" stroke-width="2"/>
      <rect x="${x + w * .58}" y="${y + h * .3}" width="${w * .24}" height="${h * .26}" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>
      <circle cx="${x + w * .7}" cy="${y + h * .43}" r="${w * .35}" fill="${GOLD}" opacity=".12"/>`;
  }

  function grandma(x, y) { // y = asiento
    return `<g>
      <path d="M${x - 36} ${y}Q${x - 34} ${y - 64} ${x} ${y - 70}Q${x + 34} ${y - 64} ${x + 36} ${y}Z" fill="#4d3363" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M${x - 33} ${y - 34}H${x + 33}" stroke="#D7263D" stroke-width="5"/>
      <path d="M${x - 32} ${y - 26}H${x + 32}" stroke="#2EC4B6" stroke-width="3"/>
      <path d="M${x - 31} ${y - 20}H${x + 31}" stroke="${GOLD}" stroke-width="2.5"/>
      <circle cx="${x}" cy="${y - 84}" r="17" fill="#3b2a20" stroke="${INK}" stroke-width="3"/>
      <path d="M${x - 9} ${y - 78}q-6 24 -2 44M${x + 9} ${y - 78}q6 24 2 44" stroke="#d3cdc3" stroke-width="6" stroke-linecap="round" fill="none"/>
      <ellipse cx="${x}" cy="${y - 97}" rx="31" ry="7" fill="#f5f1e8" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${x - 15} ${y - 98}Q${x - 15} ${y - 120} ${x} ${y - 121}Q${x + 15} ${y - 120} ${x + 15} ${y - 98}Z" fill="#f5f1e8" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${x - 15} ${y - 103}H${x + 15}" stroke="${INK}" stroke-width="3"/>
    </g>`;
  }

  function killari(x, y, standing) { // y = base
    const h = standing ? 1.25 : 1;
    return `<g>
      <path d="M${x - 22} ${y}Q${x - 24} ${y - 18} ${x} ${y - 20 * h}Q${x + 24} ${y - 18} ${x + 22} ${y}Z" fill="#C2185B" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${x - 21} ${y - 6}H${x + 21}" stroke="${GOLD}" stroke-width="2.5"/>
      <path d="M${x - 19} ${y - 14 * h}Q${x - 18} ${y - 44 * h} ${x} ${y - 47 * h}Q${x + 18} ${y - 44 * h} ${x + 19} ${y - 14 * h}Z" fill="#D7263D" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M${x - 17} ${y - 24 * h}H${x + 17}" stroke="#2EC4B6" stroke-width="2.5"/>
      <circle cx="${x}" cy="${y - 58 * h}" r="13" fill="#2b1c14" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${x - 14} ${y - 58 * h}Q${x - 13} ${y - 80 * h} ${x} ${y - 83 * h}Q${x + 13} ${y - 80 * h} ${x + 14} ${y - 58 * h}Z" fill="#D7263D" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M${x - 11} ${y - 66 * h}l4 -5 4 5 4 -5 4 5 4 -5" stroke="${CREAM}" stroke-width="1.8" fill="none"/>
      <path d="M${x - 14} ${y - 60 * h}v12M${x + 14} ${y - 60 * h}v12" stroke="#D7263D" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${x - 14}" cy="${y - 46 * h}" r="3.5" fill="${GOLD}"/><circle cx="${x + 14}" cy="${y - 46 * h}" r="3.5" fill="${GOLD}"/>
      <circle cx="${x}" cy="${y - 86 * h}" r="4.5" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
    </g>`;
  }

  function lrv(dx, dy, s, opt) {
    const o = opt || {};
    const g = o.ghost;
    const st = g ? `stroke="#c8ddf5" stroke-width="3" fill="none"` : "";
    function wheel(x) {
      if (g) return `<circle cx="${x}" cy="0" r="24" ${st}/>`;
      let ch = "";
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        ch += `<line x1="${f1(x + Math.cos(a) * 15)}" y1="${f1(Math.sin(a) * 15)}" x2="${f1(x + Math.cos(a) * 22)}" y2="${f1(Math.sin(a) * 22)}" stroke="#c9a227" stroke-width="3"/>`;
      }
      return `<circle cx="${x}" cy="0" r="24" fill="#4a4a52" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="0" r="18" fill="none" stroke="#9a9aa4" stroke-width="2" stroke-dasharray="3 3"/>${ch}<circle cx="${x}" cy="0" r="6" fill="#c9ccd1" stroke="${INK}" stroke-width="2"/>`;
    }
    const fill = (c) => (g ? st : `fill="${c}" stroke="${INK}" stroke-width="3"`);
    return `<g transform="translate(${dx} ${dy}) scale(${s})">
      <line x1="62" y1="-14" x2="60" y2="-96" stroke="${g ? "#c8ddf5" : "#8d939c"}" stroke-width="3"/>
      <path d="M34 -96Q60 -128 86 -96Z" ${fill("#eef0f4")}/>
      <line x1="24" y1="-14" x2="12" y2="-92" stroke="${g ? "#c8ddf5" : "#8d939c"}" stroke-width="2"/>
      <path d="M-100 -8A30 30 0 0 1 -40 -8Z" ${fill("#c9ccd1")}/>
      <path d="M40 -8A30 30 0 0 1 100 -8Z" ${fill("#c9ccd1")}/>
      ${wheel(-70)}${wheel(70)}
      <rect x="-104" y="-16" width="208" height="11" rx="3" ${fill("#9aa0a8")}/>
      <rect x="-40" y="-44" width="24" height="28" rx="4" ${fill("#4a5a7a")}/>
      <rect x="-6" y="-44" width="24" height="28" rx="4" ${fill("#4a5a7a")}/>
      <line x1="40" y1="-16" x2="40" y2="-46" stroke="${g ? "#c8ddf5" : INK}" stroke-width="3"/>
      <rect x="32" y="-56" width="18" height="12" rx="2" ${fill("#d9d4c9")}/>
      <line x1="96" y1="-16" x2="96" y2="-40" stroke="${g ? "#c8ddf5" : INK}" stroke-width="3"/>
      <rect x="88" y="-52" width="20" height="13" rx="2" ${fill("#e9e6df")}/>
      ${g ? "" : `<circle cx="108" cy="-46" r="3" fill="${INK}"/>`}
    </g>`;
  }

  function lmDescent(x, y) {
    let crinkle = "";
    for (let i = 0; i < 6; i++) crinkle += `<path d="M${x + 8 + i * 18} ${y + 4}l6 14 -4 12" stroke="#a37c1f" stroke-width="1.5" fill="none"/>`;
    return `<line x1="${x}" y1="${y + 36}" x2="${x - 28}" y2="${y + 66}" stroke="${INK}" stroke-width="4"/>
      <line x1="${x + 110}" y1="${y + 36}" x2="${x + 138}" y2="${y + 66}" stroke="${INK}" stroke-width="4"/>
      <line x1="${x + 55}" y1="${y + 40}" x2="${x + 55}" y2="${y + 70}" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="${x - 28}" cy="${y + 68}" rx="14" ry="4" fill="#c9ccd1" stroke="${INK}" stroke-width="2"/>
      <ellipse cx="${x + 138}" cy="${y + 68}" rx="14" ry="4" fill="#c9ccd1" stroke="${INK}" stroke-width="2"/>
      <ellipse cx="${x + 55}" cy="${y + 72}" rx="14" ry="4" fill="#c9ccd1" stroke="${INK}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="110" height="40" fill="#d4a73a" stroke="${INK}" stroke-width="3"/>${crinkle}`;
  }

  function lmAscent(x, y) {
    return `<polygon points="${x + 15},${y} ${x + 15},${y - 40} ${x + 30},${y - 60} ${x + 85},${y - 60} ${x + 100},${y - 40} ${x + 100},${y}" fill="#c9ccd1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="${x + 34},${y - 50} ${x + 50},${y - 30} ${x + 34},${y - 30}" fill="#2a2f4a" stroke="${INK}" stroke-width="2"/>
      <rect x="${x + 60}" y="${y - 36}" width="26" height="22" fill="#b7bcc4" stroke="${INK}" stroke-width="2"/>
      <line x1="${x + 80}" y1="${y - 60}" x2="${x + 88}" y2="${y - 76}" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="${x + 90}" cy="${y - 80}" r="7" fill="#eef0f4" stroke="${INK}" stroke-width="2"/>`;
  }

  function astronaut(x, y, flip) {
    const sx = flip ? -1 : 1;
    return `<g transform="translate(${x} ${y}) scale(${sx} 1)">
      <rect x="-20" y="-62" width="16" height="30" rx="4" fill="#d9d4c9" stroke="${INK}" stroke-width="2.5"/>
      <rect x="-12" y="-60" width="26" height="34" rx="9" fill="#f5f3ee" stroke="${INK}" stroke-width="2.5"/>
      <rect x="-9" y="-28" width="9" height="28" rx="4" fill="#f5f3ee" stroke="${INK}" stroke-width="2.5"/>
      <rect x="3" y="-28" width="9" height="28" rx="4" fill="#f5f3ee" stroke="${INK}" stroke-width="2.5"/>
      <path d="M12 -52l14 16" stroke="#f5f3ee" stroke-width="8" stroke-linecap="round"/><path d="M12 -52l14 16" stroke="${INK}" stroke-width="1" opacity="0"/>
      <circle cx="2" cy="-74" r="13" fill="#f5f3ee" stroke="${INK}" stroke-width="2.5"/>
      <path d="M-4 -80h14a4 4 0 0 1 0 12h-14z" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>
      <path d="M-6 -46h12" stroke="#D7263D" stroke-width="3"/>
    </g>`;
  }

  function spirit(dx, dy, s, opt) {
    const o = opt || {};
    const g = o.ghost;
    const c = (fillc, w) => g ? `fill="none" stroke="#FF9D6F" stroke-width="${w || 2.5}"` : `fill="${fillc}" stroke="${INK}" stroke-width="${w || 2.5}"`;
    function wheel(x, broken) {
      return `<circle cx="${x}" cy="0" r="16" ${c("#5a4a42")}/>${g ? "" : `<circle cx="${x}" cy="0" r="9" fill="#8E6A5A"/><path d="M${x - 14} -4h28M${x - 14} 4h28" stroke="#3b2f2a" stroke-width="1.5"/>`}${broken ? `<circle cx="${x}" cy="0" r="24" fill="none" stroke="#D7263D" stroke-width="3" stroke-dasharray="5 5" class="dash-anim"/>` : ""}`;
    }
    let cells = "";
    if (!g) for (let i = -70; i < 70; i += 14) cells += `<line x1="${i + 7}" y1="-62" x2="${i + 6}" y2="-55" stroke="#3a60a0" stroke-width="1.2"/>`;
    return `<g transform="translate(${dx} ${dy}) scale(${s})">
      <path d="M-60 0L-30 -30L0 0M-30 -30L30 -30L60 0M0 -30V-40" stroke="${g ? "#FF9D6F" : INK}" stroke-width="4" fill="none" stroke-linejoin="round"/>
      ${wheel(-60)}${wheel(0)}${wheel(60, o.broken)}
      <rect x="-52" y="-56" width="104" height="26" rx="3" ${c("#d8c79a")}/>
      <polygon points="-82,-64 82,-64 72,-54 -72,-54" ${c("#1f2c5c")}/>${cells}
      <line x1="34" y1="-64" x2="34" y2="-120" stroke="${g ? "#FF9D6F" : INK}" stroke-width="4"/>
      <rect x="20" y="-134" width="30" height="13" rx="3" ${c("#e3e0d8")}/>
      ${g ? "" : `<circle cx="29" cy="-127" r="3" fill="${INK}"/><circle cx="41" cy="-127" r="3" fill="${INK}"/>`}
      <line x1="-40" y1="-64" x2="-44" y2="-104" stroke="${g ? "#FF9D6F" : INK}" stroke-width="2"/>
      <ellipse cx="-18" cy="-70" rx="12" ry="5" ${c("#e3e0d8", 2)}/>
      <path d="M52 -40L76 -26L72 -8" stroke="${g ? "#FF9D6F" : INK}" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <rect x="66" y="-10" width="12" height="9" rx="2" ${c("#c9ccd1", 2)}/>
    </g>`;
  }

  function perseverance(dx, dy, s) {
    let wheels = "";
    for (const x of [-80, 0, 80]) wheels += `<circle cx="${x}" cy="0" r="22" fill="#5a4a42" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="0" r="12" fill="#8E6A5A"/><path d="M${x - 20} -5h40M${x - 20} 5h40" stroke="#3b2f2a" stroke-width="2"/>`;
    return `<g transform="translate(${dx} ${dy}) scale(${s})">
      <path d="M-80 0L-40 -38L0 0M-40 -38L40 -38L80 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/>
      ${wheels}
      <rect x="-78" y="-80" width="156" height="42" rx="5" fill="#e9e6df" stroke="${INK}" stroke-width="3"/>
      <path d="M-78 -64h156" stroke="#b9b4a8" stroke-width="2"/>
      <polygon points="-78,-78 -112,-96 -120,-72 -86,-56" fill="#8a8f99" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-112 -92l-6 22M-104 -88l-6 22M-96 -84l-6 22" stroke="${INK}" stroke-width="1.5"/>
      <line x1="48" y1="-80" x2="48" y2="-170" stroke="${INK}" stroke-width="6"/>
      <rect x="28" y="-188" width="48" height="20" rx="4" fill="#e9e6df" stroke="${INK}" stroke-width="3"/>
      <circle cx="42" cy="-178" r="4" fill="${INK}"/><circle cx="58" cy="-178" r="4" fill="${INK}"/>
      <path d="M78 -60L112 -46L108 -18" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <rect x="100" y="-20" width="18" height="14" rx="3" fill="#c9ccd1" stroke="${INK}" stroke-width="2"/>
      <ellipse cx="-30" cy="-88" rx="18" ry="6" fill="#d9d4c9" stroke="${INK}" stroke-width="2"/>
    </g>`;
  }

  /* Ingenuity: cuerpo dorado, dos rotores coaxiales, panel solar arriba, cuatro patas finas.
     (x, y) = punto del suelo entre las patas; opt.s = escala */
  function heli(x, y, opt) {
    const o = opt || {};
    const DARK = "#2b2b33";
    const blade = (cy, rx, rot) => `<path transform="rotate(${rot} 0 ${cy})" d="M${-rx} ${cy}Q${-rx / 2} ${cy - 4.5} 0 ${cy - 1.6}Q${rx / 2} ${cy - 4.5} ${rx} ${cy}Q${rx / 2} ${cy + 3} 0 ${cy + 1.6}Q${-rx / 2} ${cy + 3} ${-rx} ${cy}Z" fill="${DARK}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
    const blades = o.flying
      ? `<ellipse cx="0" cy="-64" rx="62" ry="6" fill="${DARK}" opacity=".32" class="blur-spin"/><ellipse cx="0" cy="-76" rx="56" ry="6" fill="${DARK}" opacity=".32" class="blur-spin rev"/>
         <path d="M-74 -58q-8 -6 -6 -16M74 -58q8 -6 6 -16" stroke="${CREAM}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7" class="fade"/>`
      : o.broken
        ? `${blade(-64, 58, 0)}<path d="M-50 -76Q-25 -80.5 0 -77.6V-74.4Q-25 -73 -50 -76Z" fill="${DARK}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
           <path d="M3 -76L27 -67" stroke="#D7263D" stroke-width="5" stroke-linecap="round"/><path d="M46 -3l16 -4l3 4z" fill="${DARK}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`
        : `${blade(-64, 58, 0)}${blade(-76, 50, -3)}`;
    const foot = (fx) => `<ellipse cx="${fx}" cy="0" rx="4" ry="2.2" fill="${INK}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${o.s || 1})">
      ${o.flying ? "" : `<ellipse cx="0" cy="3" rx="44" ry="5" fill="#3b1f14" opacity=".28"/>`}
      <path d="M-11 -20L-36 0M11 -20L36 0M-6 -19L-17 1M6 -19L17 1" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      ${foot(-36)}${foot(36)}${foot(-17)}${foot(17)}
      <rect x="-16" y="-46" width="32" height="28" rx="5" fill="#e3c98f" stroke="${INK}" stroke-width="2.5"/>
      <path d="M-13.5 -44.5h27a3 3 0 0 1 3 3v4h-33v-4a3 3 0 0 1 3 -3z" fill="#f6e7bd"/>
      <path d="M7 -37.5h7.7v14.5a3.5 3.5 0 0 1 -3.5 3.5h-4.2z" fill="#c4a25f" opacity=".75"/>
      <path d="M-13 -24l5 -3l4 3" stroke="#b08f52" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <circle cx="-3" cy="-30" r="6" fill="${INK}"/><circle cx="-3" cy="-30" r="3.6" fill="#3a60a0"/><circle cx="-4.6" cy="-31.6" r="1.4" fill="#fff"/>
      <line x1="0" y1="-46" x2="0" y2="-92" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      <rect x="-4.5" y="-67" width="9" height="6" rx="2" fill="#8a8f99" stroke="${INK}" stroke-width="1.4"/>
      <rect x="-4.5" y="-79" width="9" height="6" rx="2" fill="#8a8f99" stroke="${INK}" stroke-width="1.4"/>
      ${blades}
      <rect x="-19" y="-98" width="38" height="8" rx="2" fill="#1f2c5c" stroke="${INK}" stroke-width="2"/>
      <path d="M-9.5 -97v6M0 -97v6M9.5 -97v6" stroke="#5a7ad0" stroke-width="1"/>
      <path d="M-16 -96h9" stroke="#9db4f0" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="0" y1="-98" x2="0" y2="-107" stroke="${INK}" stroke-width="1.6"/><circle cx="0" cy="-108" r="2" fill="${GOLD}" stroke="${INK}" stroke-width="1"/>
    </g>`;
  }

  function kid(x, y, type) { // de espaldas
    const body = {
      aimara:    { c: "#4d4177", top: "#a52a4a" },
      ashaninka: { c: "#7a5232", top: "#7a5232" },
      awajun:    { c: "#2b4a3a", top: "#2b4a3a" },
      shipibo:   { c: "#f4efe6", top: "#1d1530" }
    }[type];
    let s = `<path d="M${x - 22} ${y}Q${x - 23} ${y - 30} ${x} ${y - 36}Q${x + 23} ${y - 30} ${x + 22} ${y}Z" fill="${body.c}" stroke="${INK}" stroke-width="2.5"/>`;
    s += `<path d="M${x - 18} ${y - 26}Q${x - 18} ${y - 58} ${x} ${y - 60}Q${x + 18} ${y - 58} ${x + 18} ${y - 26}Z" fill="${body.top}" stroke="${INK}" stroke-width="2.5"/>`;
    s += `<circle cx="${x}" cy="${y - 72}" r="13" fill="#2b1c14" stroke="${INK}" stroke-width="2.5"/>`;
    if (type === "aimara") {
      s += `<rect x="${x - 17}" y="${y - 54}" width="34" height="22" rx="3" fill="#2EC4B6" stroke="${INK}" stroke-width="2"/>`;
      s += `<path d="M${x - 17} ${y - 48}h34M${x - 17} ${y - 42}h34M${x - 17} ${y - 37}h34" stroke="#D7263D" stroke-width="2.5"/><path d="M${x - 17} ${y - 45}h34" stroke="${GOLD}" stroke-width="2"/>`;
      s += `<path d="M${x - 7} ${y - 66}q-3 18 -1 30M${x + 7} ${y - 66}q3 18 1 30" stroke="#2b1c14" stroke-width="5" stroke-linecap="round" fill="none"/>`;
      s += `<ellipse cx="${x}" cy="${y - 82}" rx="16" ry="4" fill="#3b2a20" stroke="${INK}" stroke-width="2"/><path d="M${x - 10} ${y - 83}Q${x - 10} ${y - 98} ${x} ${y - 98}Q${x + 10} ${y - 98} ${x + 10} ${y - 83}Z" fill="#3b2a20" stroke="${INK}" stroke-width="2"/>`;
    } else if (type === "ashaninka") {
      s += `<path d="M${x - 8} ${y - 58}V${y - 2}M${x} ${y - 60}V${y - 2}M${x + 8} ${y - 58}V${y - 2}" stroke="#4e321e" stroke-width="2"/>`;
      s += `<rect x="${x - 14}" y="${y - 86}" width="28" height="7" rx="2" fill="#c9a26b" stroke="${INK}" stroke-width="2"/>`;
      for (let i = -2; i <= 2; i++) s += `<path d="M${x + i * 6} ${y - 86}l-2 -14 4 0z" fill="${i % 2 ? "#D7263D" : GOLD}" stroke="${INK}" stroke-width="1.2"/>`;
    } else if (type === "awajun") {
      for (let i = -4; i <= 4; i++) {
        const a = (-90 + i * 16) * Math.PI / 180;
        s += `<line x1="${x}" y1="${y - 78}" x2="${f1(x + Math.cos(a) * 26)}" y2="${f1(y - 78 + Math.sin(a) * 26)}" stroke="${i % 2 ? GOLD : "#D7263D"}" stroke-width="5" stroke-linecap="round"/>`;
      }
      s += `<path d="M${x - 14} ${y - 80}h28" stroke="${INK}" stroke-width="3"/>`;
      s += `<path d="M${x - 14} ${y - 56}q14 10 28 0" stroke="#e8d9a8" stroke-width="3" stroke-dasharray="1 4" stroke-linecap="round" fill="none"/>`;
    } else if (type === "shipibo") {
      s += `<path d="M${x - 16} ${y - 22}h10v8h12v-8h10M${x - 12} ${y - 8}h8v-6h10v6h8" stroke="${INK}" stroke-width="2" fill="none"/>`;
      s += `<path d="M${x - 14} ${y - 50}h6v6h6v-6h6v6h6" stroke="${CREAM}" stroke-width="1.6" fill="none"/>`;
      s += `<path d="M${x - 13} ${y - 64}q13 10 26 0" stroke="#2EC4B6" stroke-width="3" stroke-dasharray="1 4" stroke-linecap="round" fill="none"/>`;
    }
    return `<g>${s}</g>`;
  }

  function llama(x, y, s, fill) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
      <ellipse cx="0" cy="0" rx="40" ry="16"/>
      <path d="M26 -6Q34 -40 44 -50L54 -46Q44 -36 40 -2Z"/>
      <ellipse cx="52" cy="-50" rx="12" ry="7"/>
      <path d="M44 -56l2 -14 5 12zM52 -57l3 -13 4 12z"/>
      <rect x="-32" y="6" width="7" height="30" rx="3"/><rect x="-18" y="8" width="7" height="28" rx="3"/>
      <rect x="16" y="6" width="7" height="30" rx="3"/><rect x="28" y="6" width="7" height="28" rx="3"/>
      <path d="M-40 -4q-12 -2 -10 10"/>
    </g>`;
  }


  function regolith(seed, y0) {
    const r = rng(seed);
    let s = "";
    for (let i = 0; i < 70; i++) {
      const x = r() * 800, y = y0 + 20 + r() * (580 - y0);
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.8 + r() * 1.8)}" fill="#7d786f" opacity="${f1(.25 + r() * .4)}"/>`;
    }
    for (let i = 0; i < 6; i++) {
      const x = 40 + r() * 720, y = y0 + 40 + r() * (520 - y0), w = 10 + r() * 24;
      s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(w)}" ry="${f1(w * .28)}" fill="#8f8a80" opacity=".5"/><path d="M${f1(x - w)} ${f1(y)}a${f1(w)} ${f1(w * .28)} 0 0 0 ${f1(w * 2)} 0" stroke="#e6e1d6" stroke-width="1.5" fill="none" opacity=".6"/>`;
    }
    return s;
  }

  /* acabado común: viñeta + grano de risógrafo */
  function finish(id, w, h) {
    w = w || 800; h = h || 600;
    return `<defs>
        <radialGradient id="${id}-vig" cx=".5" cy=".5" r=".75"><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#05071a" stop-opacity=".55"/></radialGradient>
        <filter id="${id}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .96  0 0 0 0 .9  0 0 0 .55 0"/></filter>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#${id}-vig)" pointer-events="none"/>
      <rect width="${w}" height="${h}" filter="url(#${id}-grain)" opacity=".16" style="mix-blend-mode:overlay" pointer-events="none"/>`;
  }

  /* ======================= ESCENAS ======================= */
  const SCENES = {};

  /* ---------- PRÓLOGO: Huanta ---------- */
  SCENES.huanta = function (L) {
    const r = rng(11);
    let band = "";
    for (let i = 0; i < 160; i++) {
      const t = r();
      const bx = (1 - t) ** 2 * -20 + 2 * t * (1 - t) * 300 + t * t * 820;
      const by = (1 - t) ** 2 * 0 + 2 * t * (1 - t) * 80 + t * t * 310;
      band += `<circle cx="${f1(bx + (r() - .5) * 30)}" cy="${f1(by + (r() - .5) * 70)}" r="${f1(.4 + r() * 1.1)}" fill="#e6eefc" opacity="${f1(.4 + r() * .6)}"/>`;
    }
    return `<defs>
        <linearGradient id="hu-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1838"/><stop offset=".7" stop-color="#2d2a5e"/><stop offset="1" stop-color="#4d4177"/></linearGradient>
        <radialGradient id="hu-glow"><stop offset="0" stop-color="#fff6e0" stop-opacity=".45"/><stop offset="1" stop-color="#fff6e0" stop-opacity="0"/></radialGradient>
        <filter id="hu-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <rect width="800" height="600" fill="url(#hu-sky)"/>
      ${stars(90, 3, 0, 0, 800, 330)}
      <circle cx="650" cy="112" r="120" fill="url(#hu-glow)"/>
      ${moonDisc("hu-moon", 650, 112, 52, true)}
      ${ly(3, `<path d="M-20 -30Q300 60 820 250L820 380Q300 150 -20 50Z" fill="#c8ddf5" opacity=".2" filter="url(#hu-blur)"/>${band}
        ${llama(275, 102, 1, "#0a1230")}${llama(205, 122, .55, "#0a1230")}
        ${sparkle(332, 50, 7, "#fff6e0")}${sparkle(345, 60, 6, "#fff6e0")}
        ${label(255, 160, "Yacana", { italic: true, size: 18, fill: "#c8ddf5" })}
        ${label(560, 215, "Mayu", { italic: true, size: 18, fill: "#c8ddf5" })}`)}
      <path d="M0 360L90 292L170 330L262 250L360 318L452 270L560 330L652 282L800 342V600H0Z" fill="#26295a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M0 432Q120 384 240 420T480 410T800 420V600H0Z" fill="#33386c" stroke="${INK}" stroke-width="3"/>
      ${ly(1, `<polygon points="30,446 120,420 140,444 52,466" fill="#c9a227" opacity=".55"/>
        <polygon points="132,416 232,420 238,442 148,442" fill="#2EC4B6" opacity=".45"/>
        <polygon points="600,416 700,410 718,432 612,440" fill="#C2185B" opacity=".5"/>
        <polygon points="702,412 792,420 792,440 722,434" fill="#6aa84f" opacity=".5"/>
        <path d="M40 452l86 -24M48 460l86 -24M610 424l100 -8M616 432l100 -8" stroke="${INK}" stroke-width="1" opacity=".35"/>`)}
      <path d="M0 500Q400 470 800 506V600H0Z" fill="#3e3462" stroke="${INK}" stroke-width="3"/>
      ${ly(1, house(80, 440, 92, 62) + house(198, 454, 70, 48))}
      ${ly(2, `<rect x="452" y="488" width="156" height="10" rx="3" fill="#6b4a2e" stroke="${INK}" stroke-width="2.5"/>
        <path d="M462 498v18M598 498v18" stroke="${INK}" stroke-width="4"/>
        <ellipse cx="530" cy="490" rx="70" ry="6" fill="#efe6d4" stroke="${INK}" stroke-width="2"/>
        ${grandma(500, 490)}${killari(568, 490)}`)}
      ${ly(3, `<path d="M478 430L420 336" stroke="#7a5232" stroke-width="5" stroke-linecap="round"/><circle cx="475" cy="426" r="6" fill="#c9a07a" stroke="${INK}" stroke-width="2"/>`)}
      ${ly(4, `<circle cx="598" cy="388" r="5" fill="${CREAM}" stroke="${INK}" stroke-width="2"/><circle cx="614" cy="364" r="8" fill="${CREAM}" stroke="${INK}" stroke-width="2"/>
        <path d="M620 330a34 34 0 0 1 40 -40a38 38 0 0 1 66 8a30 30 0 0 1 10 54a40 40 0 0 1 -64 10a34 34 0 0 1 -52 -32z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
        <path d="M666 292c14 -4 26 6 24 22l-2 20c-2 12 -20 14 -24 2l-6 -28c-2 -8 2 -14 8 -16z" fill="#9a958c" stroke="${INK}" stroke-width="2"/>
        <path d="M664 300h22M662 308h24M664 316h22M668 326h18" stroke="${INK}" stroke-width="1.5" opacity=".6"/>`, 5)}
      ${ly(5, `<rect x="560" y="298" width="226" height="58" rx="29" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
        <polygon points="588,354 572,392 612,354" fill="${CREAM}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M590 352h20" stroke="${CREAM}" stroke-width="5"/>
        ${label(673, 335, "¿Imataq hanaqpi kan?", { italic: true, size: 21, fill: INK, weight: 500 })}`)}
      ${ly(6, `<path d="M572 392Q620 260 640 172" stroke="${GOLD}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none" class="dash-anim"/>
        <circle cx="650" cy="112" r="70" fill="none" stroke="${GOLD}" stroke-width="3" class="pulse"/>`)}`;
  };

  /* ---------- I: la Killa ---------- */
  SCENES.killa = function (L) {
    let dots = "";
    const r = rng(77);
    for (let i = 0; i < 34; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 150;
      dots += `<circle cx="${f1(520 + Math.cos(a) * d)}" cy="${f1(300 + Math.sin(a) * d)}" r="${f1(2.5 + r() * 2.5)}" fill="${GOLD}" stroke="${INK}" stroke-width="1" class="tw" style="animation-delay:${f1(r() * 3)}s"/>`;
    }
    let phases = "";
    for (let i = 0; i < 8; i++) phases += moonPhase(130 + i * 78, 548, 20, (i + .5) / 8 * 0.999);
    let debris = "";
    for (let i = 0; i < 26; i++) { const a = r() * 6.28, d = 70 + r() * 70; debris += `<circle cx="${f1(190 + Math.cos(a) * d)}" cy="${f1(150 + Math.sin(a) * d * .5)}" r="${f1(1.5 + r() * 3)}" fill="#e2a25a"/>`; }
    return `<rect width="800" height="600" fill="#060b1d"/>${stars(150, 21, 0, 0, 800, 600)}
      ${moonDisc("k-moon", 520, 300, 175, true)}
      ${ly(1, `${debris}<circle cx="160" cy="165" r="56" fill="#8a3b2a" stroke="${INK}" stroke-width="3"/>
        <path d="M120 150q20 10 30 -8t40 4M130 190q24 -6 44 8" stroke="#ffb15c" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="250" cy="105" r="30" fill="#c98a4b" stroke="${INK}" stroke-width="3"/>
        ${sparkle(212, 128, 26, "#fff2c4", "pulse")}
        ${label(250, 62, "Theia", { italic: true, size: 18 })}
        ${label(160, 248, L("La Tierra joven", "Young Earth"), { size: 14, fill: "#c8ddf5" })}`, 2)}
      ${ly(2, `${earth(110, 300, 48)}
        <path d="M54 262a64 64 0 0 0 0 76M166 262a64 64 0 0 1 0 76" stroke="#88a5e0" stroke-width="3" fill="none" stroke-dasharray="6 6"/>
        <path d="M170 300H336" stroke="${CREAM}" stroke-width="2.5" stroke-dasharray="7 6"/><path d="M178 293l-9 7 9 7M328 293l9 7 -9 7" stroke="${CREAM}" stroke-width="2.5" fill="none"/>
        ${label(253, 286, "384 400 km", { size: 16, bg: "#0b1838" })}`)}
      ${ly(3, `<rect x="92" y="514" width="616" height="70" rx="35" fill="#0b1838" stroke="#4d4177" stroke-width="2"/>${phases}`)}
      ${ly(4, `<g transform="translate(520 126)">
          <path d="M-22 0l8 -16M22 0l-8 -16" stroke="${INK}" stroke-width="3"/>
          <rect x="-18" y="-30" width="36" height="16" fill="#d4a73a" stroke="${INK}" stroke-width="2.5"/>
          <polygon points="-12,-30 -12,-44 -4,-50 10,-50 14,-44 14,-30" fill="#c9ccd1" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
        </g>
        ${label(520, 60, "20 · 07 · 1969", { size: 16, bg: "#0b1838" })}
        <path d="M566 404c8 -2 14 4 13 12l-1 12c-1 7 -12 8 -14 1l-4 -16c-1 -5 2 -8 6 -9z" fill="#9a958c" stroke="${INK}" stroke-width="2"/>`)}
      ${ly(5, `${dots}${label(780, 40, L("cientos de artefactos", "hundreds of artifacts"), { anchor: "end", size: 16, fill: GOLD, italic: true })}`)}`;
  };

  /* ---------- II: Rover lunar ---------- */
  SCENES.rover = function (L) {
    return `<rect width="800" height="600" fill="#04060d"/>${stars(110, 5, 0, 0, 800, 300)}
      ${earth(668, 98, 34, true)}
      <path d="M0 330L118 222L228 300L332 208L470 318L560 262L680 312L800 250V600H0Z" fill="#77746f" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M118 222L150 300L60 300ZM332 208L360 300L270 300ZM560 262L580 320L520 320Z" fill="#a19d96" opacity=".55"/>
      <path d="M118 222L150 300M332 208L360 300M560 262L580 320" stroke="#5f5c58" stroke-width="3"/>
      <defs><linearGradient id="ro-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfcac0"/><stop offset="1" stop-color="#9c978d"/></linearGradient></defs>
      <path d="M0 380Q400 350 800 386V600H0Z" fill="url(#ro-gr)" stroke="${INK}" stroke-width="3"/>${regolith(8, 380)}
      <ellipse cx="110" cy="540" rx="54" ry="12" fill="#a39e94" stroke="#8a857c" stroke-width="2"/>
      <ellipse cx="700" cy="556" rx="62" ry="13" fill="#a39e94" stroke="#8a857c" stroke-width="2"/>
      <ellipse cx="430" cy="580" rx="40" ry="8" fill="#a39e94" stroke="#8a857c" stroke-width="2"/>
      ${ly(5, `<path d="M-10 540Q90 520 160 488M-10 556Q100 532 175 496" stroke="#8f8a80" stroke-width="7" stroke-dasharray="5 4" fill="none"/>
        <path d="M330 486Q420 500 520 470M340 498Q430 512 530 480" stroke="#8f8a80" stroke-width="6" stroke-dasharray="5 4" fill="none" opacity=".8"/>
        <ellipse cx="480" cy="474" rx="46" ry="9" fill="#e08a3c" stroke="${INK}" stroke-width="2"/>
        ${label(480, 508, L("suelo naranja", "orange soil"), { size: 13, fill: "#5a3a24" })}`)}
      ${ly(8, `<path d="M-10 540Q90 520 160 488M-10 556Q100 532 175 496M330 486Q420 500 520 470" stroke="#88a5e0" stroke-width="3" fill="none" class="dash-anim" stroke-dasharray="8 6"/>`)}
      ${ly(1, lmDescent(575, 360))}
      ${ly(1, lmAscent(570, 360), 7)}
      ${ly(2, lrv(225, 470, 1))}
      ${ly(5, astronaut(345, 470) + astronaut(530, 466, true), 7)}
      ${ly(3, `<rect x="24" y="24" width="316" height="138" rx="18" fill="#0b1838" opacity=".85" stroke="#88a5e0" stroke-width="2" stroke-dasharray="6 6"/>
        ${lrv(98, 112, .42, { ghost: true })}${lrv(256, 112, .42, { ghost: true })}
        ${label(98, 146, L("Apolo 15 · 1971", "Apollo 15 · 1971"), { size: 13, fill: "#c8ddf5" })}
        ${label(256, 146, L("Apolo 16 · 1972", "Apollo 16 · 1972"), { size: 13, fill: "#c8ddf5" })}
        ${label(182, 50, L("mis hermanos mayores", "my big brothers"), { size: 14, italic: true, fill: CREAM })}`, 4)}
      ${ly(4, `<path d="M150 470q-30 -20 -70 -10M140 480q-40 -6 -60 10" stroke="#d9d4c9" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round" fill="none"/>
        <path d="M320 240L190 448" stroke="${GOLD}" stroke-width="2" stroke-dasharray="4 5"/>
        <circle cx="340" cy="190" r="78" fill="#0b1838" stroke="${GOLD}" stroke-width="3"/>
        <path d="M282 214A62 62 0 0 1 398 214Z" fill="#c9ccd1" stroke="${INK}" stroke-width="3"/>
        <rect x="300" y="150" width="78" height="58" rx="3" fill="#e8d9a8" stroke="${INK}" stroke-width="2.5" transform="rotate(-6 339 179)"/>
        <path d="M310 166h50M310 178h44M310 190h52" stroke="#8a7a50" stroke-width="2" transform="rotate(-6 339 179)"/>
        <rect x="290" y="196" width="100" height="12" fill="#b9b9c0" opacity=".9" transform="rotate(8 340 202)"/>
        <rect x="296" y="160" width="12" height="44" rx="3" fill="#6a6a72" stroke="${INK}" stroke-width="2"/>
        <rect x="372" y="156" width="12" height="44" rx="3" fill="#6a6a72" stroke="${INK}" stroke-width="2"/>
        ${label(340, 292, L("cinta + mapas", "tape + maps"), { size: 14, bg: "#0b1838", fill: GOLD })}`, 5)}
      ${ly(6, `<g transform="translate(400 120)">
          <path d="M0 0V96M-40 96h80" stroke="${CREAM}" stroke-width="4" stroke-linecap="round"/>
          <g transform="rotate(-10)"><path d="M-110 0H110" stroke="${CREAM}" stroke-width="4" stroke-linecap="round"/>
            <path d="M-110 0l-22 50h44zM110 0l-22 50h44z" fill="none" stroke="${CREAM}" stroke-width="2"/>
            <path d="M-132 50h44a22 10 0 0 1 -44 0zM88 50h44a22 10 0 0 1 -44 0z" fill="#88a5e0" stroke="${INK}" stroke-width="2"/>
            <circle cx="-120" cy="44" r="8" fill="#8f8a80" stroke="${INK}" stroke-width="2"/><circle cx="-104" cy="44" r="9" fill="#e08a3c" stroke="${INK}" stroke-width="2"/><circle cx="-112" cy="32" r="8" fill="#a39e94" stroke="${INK}" stroke-width="2"/>
            ${lrv(110, 46, .18)}
          </g>
          <circle cx="0" cy="0" r="6" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>
          ${label(0, 130, L("¿rocas o carrito?", "rocks or cart?"), { size: 16, italic: true, bg: "#0b1838" })}
        </g>`, 7)}
      ${ly(7, `<g class="rise">${lmAscent(570, 250)}<path d="M600 252l20 50 20 -50z" fill="#ffb15c" opacity=".85"/><path d="M610 252l10 28 10 -28z" fill="#fff2c4"/></g>
        <path d="M332 418L600 250" stroke="${GOLD}" stroke-width="2" stroke-dasharray="3 7" class="dash-anim"/>
        ${label(430, 230, L("mi cámara filma el despegue", "my camera films the liftoff"), { size: 14, italic: true, bg: "#0b1838" })}`)}
      ${ly(8, `<g transform="translate(150 70)">
          <polygon points="-90,280 90,280 10,10 -10,10" fill="#88a5e0" opacity=".12"/>
          <rect x="-16" y="-14" width="32" height="26" rx="3" fill="#d4a73a" stroke="${INK}" stroke-width="2.5"/>
          <rect x="16" y="-8" width="56" height="14" fill="#1f2c5c" stroke="${INK}" stroke-width="2"/>
          <circle cx="0" cy="16" r="6" fill="#2a2f4a" stroke="${INK}" stroke-width="2"/>
          ${label(0, -26, "LRO · LROC", { size: 14, fill: "#c8ddf5" })}
        </g>`)}`;
  };

  /* ---------- III: espejo láser ---------- */
  SCENES.mirror = function (L) {
    const P = [[440, 418], [590, 396], [612, 448], [462, 472]];
    let prisms = "";
    for (let i = 0; i < 10; i++) for (let j = 0; j < 5; j++) {
      const u = (i + .5) / 10, v = (j + .5) / 5;
      const x = (1 - u) * (1 - v) * P[0][0] + u * (1 - v) * P[1][0] + u * v * P[2][0] + (1 - u) * v * P[3][0];
      const y = (1 - u) * (1 - v) * P[0][1] + u * (1 - v) * P[1][1] + u * v * P[2][1] + (1 - u) * v * P[3][1];
      prisms += `<circle cx="${f1(x)}" cy="${f1(y)}" r="4.2" fill="#8fd3ff" stroke="#1f3a5a" stroke-width="1"/>`;
    }
    return `<rect width="800" height="600" fill="#04060e"/>${stars(120, 9, 0, 0, 800, 380)}
      ${earth(140, 140, 70, true)}
      <defs><linearGradient id="mi-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d2cdc3"/><stop offset="1" stop-color="#9d988e"/></linearGradient></defs>
      <path d="M0 400Q400 368 800 402V600H0Z" fill="url(#mi-gr)" stroke="${INK}" stroke-width="3"/>${regolith(13, 400)}
      <ellipse cx="690" cy="520" rx="70" ry="14" fill="#a8a398" stroke="#8a857c" stroke-width="2"/>
      <ellipse cx="250" cy="560" rx="54" ry="11" fill="#a8a398" stroke="#8a857c" stroke-width="2"/>
      <path d="M370 520c8 -2 14 4 13 12l-1 12c-1 7 -12 8 -14 1l-4 -16c-1 -5 2 -8 6 -9z" fill="#a19b90" stroke="${INK}" stroke-width="2"/>
      <path d="M396 500c8 -2 14 4 13 12l-1 12c-1 7 -12 8 -14 1l-4 -16c-1 -5 2 -8 6 -9z" fill="#a19b90" stroke="${INK}" stroke-width="2"/>
      ${ly(2, `<circle cx="188" cy="186" r="7" fill="#2ef27a"/><path d="M188 186L520 434" stroke="#2ef27a" stroke-width="3" class="beam"/>`)}
      ${ly(3, `<path d="M532 426L200 178" stroke="#2ef27a" stroke-width="2" opacity=".6" class="beam rev"/>
        ${label(392, 286, L("≈ 2,5 s ida y vuelta", "≈ 2.5 s round trip"), { size: 15, bg: "#0b1838", fill: "#9cffc6" })}`)}
      ${ly(1, `<path d="M470 470l-10 40M600 452l10 40M530 462v44" stroke="${INK}" stroke-width="4"/>
        <polygon points="${P.map(p => p.join(",")).join(" ")}" fill="#3c3f46" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>${prisms}
        ${label(630, 500, L("100 prismas", "100 prisms"), { size: 15, anchor: "start", fill: INK, weight: 800 })}`)}
      ${ly(4, `<path d="M560 150H720" stroke="${GOLD}" stroke-width="4"/><path d="M708 140l14 10 -14 10" stroke="${GOLD}" stroke-width="4" fill="none"/>
        ${moonDisc("mi-moon", 748, 150, 18, false)}
        ${label(640, 130, L("+3,8 cm cada año", "+3.8 cm every year"), { size: 17, fill: GOLD, weight: 800 })}
        ${label(640, 184, L("como crecen tus uñas", "like your fingernails grow"), { size: 14, italic: true, fill: "#c8ddf5" })}`)}
      ${ly(5, `<circle cx="526" cy="436" r="60" fill="none" stroke="#2ef27a" stroke-width="2" class="pulse"/>
        ${label(526, 360, L("«aquí estoy»", "“here I am”"), { size: 17, italic: true, bg: "#0b1838", fill: "#9cffc6" })}
        <g transform="translate(120 486)">
          <defs><clipPath id="mi-inset"><circle r="82"/></clipPath></defs>
          <circle r="84" fill="#2d2a5e"/>
          <g clip-path="url(#mi-inset)">
            <path d="M-90 6L-50 -34L-24 -8L6 -46L44 -6L90 -30V90H-90Z" fill="#4d4177" stroke="${INK}" stroke-width="2"/>
            <path d="M-90 40Q-40 10 0 26T90 0V90H-90Z" fill="#6b5a3a"/>
            <path d="M-70 60Q-30 30 -10 40T40 20T80 10" stroke="${GOLD}" stroke-width="4" stroke-dasharray="6 5" fill="none"/>
          </g>
          <circle r="84" fill="none" stroke="${GOLD}" stroke-width="3"/>
          <g transform="translate(6 22)"><circle cx="0" cy="-26" r="6" fill="#f4efe6"/><path d="M0 -20l-4 16M-4 -4l-8 12M-4 -4l8 10M-2 -16l-10 4M-2 -16l12 -2" stroke="#f4efe6" stroke-width="4" stroke-linecap="round"/></g>
          ${label(0, -54, "Qhapaq Ñan", { size: 13, italic: true, fill: CREAM })}
        </g>`)}`;
  };

  /* ---------- IV: Voyager y el Disco de Oro ---------- */
  SCENES.voyager = function (L) {
    let grooves = "";
    for (let r = 98; r > 28; r -= 6) grooves += `<circle cx="620" cy="388" r="${r}" fill="none" stroke="#a87a14" stroke-width="1" opacity=".55"/>`;
    let pulsar = "";
    const rr = rng(4);
    for (let i = 0; i < 14; i++) { const a = rr() * 6.28, d = 30 + rr() * 60; pulsar += `<line x1="620" y1="388" x2="${f1(620 + Math.cos(a) * d)}" y2="${f1(388 + Math.sin(a) * d)}" stroke="#7a5a10" stroke-width="1.2"/>`; }
    let pipes = "";
    for (let i = 0; i < 7; i++) pipes += `<rect x="${560 + i * 11}" y="168" width="9" height="${64 - i * 6}" rx="3" fill="#c9a26b" stroke="${INK}" stroke-width="2"/>`;
    return `<defs><radialGradient id="vo-bg" cx=".2" cy=".5" r="1"><stop offset="0" stop-color="#14204a"/><stop offset=".6" stop-color="#0b1838"/><stop offset="1" stop-color="#04070f"/></radialGradient><radialGradient id="vo-sun"><stop offset="0" stop-color="#fff2c4" stop-opacity=".35"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="600" fill="url(#vo-bg)"/>${stars(170, 31, 0, 0, 800, 600)}
      <circle cx="20" cy="300" r="90" fill="url(#vo-sun)"/>
      ${earth(95, 300, 10)}
      ${ly(8, `<path d="M770 0Q680 300 770 600H800V0Z" fill="#88a5e0" opacity=".08"/><path d="M770 0Q680 300 770 600" stroke="#88a5e0" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
        <text x="742" y="300" transform="rotate(-90 742 300)" text-anchor="middle" font-family="Nunito, sans-serif" font-size="14" font-weight="700" fill="#88a5e0">${L("heliopausa · 2012", "heliopause · 2012")}</text>`)}
      ${ly(1, `<path d="M95 300C250 200 450 160 800 110" stroke="#c8ddf5" stroke-width="2" stroke-dasharray="6 8" fill="none" opacity=".6"/>
        <path d="M95 300C260 380 480 450 800 480" stroke="#c8ddf5" stroke-width="2" stroke-dasharray="6 8" fill="none" opacity=".45"/>
        ${label(95, 336, "1977", { size: 15, fill: "#c8ddf5" })}`)}
      ${ly(6, `<circle cx="150" cy="104" r="44" fill="#d9b48a" stroke="${INK}" stroke-width="3"/>
        <path d="M110 86q40 8 80 0M107 104q43 8 86 0M112 122q38 8 76 0" stroke="#b07a52" stroke-width="5" fill="none"/>
        <ellipse cx="168" cy="118" rx="10" ry="6" fill="#c0573e" stroke="${INK}" stroke-width="1.5"/>
        <circle cx="210" cy="148" r="6" fill="#e8d34a" stroke="${INK}" stroke-width="1.5"/><path d="M210 142l-3 -10M210 142l4 -9" stroke="#ffb15c" stroke-width="2"/>
        ${label(150, 172, L("Júpiter 1979", "Jupiter 1979"), { size: 13, fill: "#c8ddf5" })}
        <ellipse cx="300" cy="62" rx="52" ry="12" fill="none" stroke="#e3d1a5" stroke-width="6" opacity=".7"/>
        <circle cx="300" cy="62" r="26" fill="#e8c98a" stroke="${INK}" stroke-width="2.5"/>
        <path d="M248 62a52 12 0 0 0 104 0" stroke="#e3d1a5" stroke-width="6" fill="none"/>
        ${label(300, 104, L("Saturno 1980", "Saturn 1980"), { size: 13, fill: "#c8ddf5" })}
        <circle cx="440" cy="48" r="15" fill="#9fe3e6" stroke="${INK}" stroke-width="2"/>${label(440, 82, L("Urano 1986", "Uranus 1986"), { size: 12, fill: "#c8ddf5" })}
        <circle cx="540" cy="70" r="15" fill="#3f6fd8" stroke="${INK}" stroke-width="2"/>${label(540, 104, L("Neptuno 1989", "Neptune 1989"), { size: 12, fill: "#c8ddf5" })}`)}
      ${ly(7, `<polygon points="30,580 250,330 274,344 66,596" fill="#fff6e0" opacity=".1"/>
        <circle cx="156" cy="462" r="3" fill="#88a5e0"/><circle cx="156" cy="462" r="14" fill="none" stroke="#88a5e0" stroke-width="1.5" stroke-dasharray="3 3" class="pulse"/>
        ${label(160, 500, L("un punto azul pálido · 1990", "a pale blue dot · 1990"), { size: 14, italic: true, fill: "#c8ddf5" })}`)}
      ${ly(9, `<path d="M360 300L106 300" stroke="#c8ddf5" stroke-width="2" stroke-dasharray="2 8" class="dash-anim"/>
        ${label(230, 280, L("≈ 1 día-luz · 2026", "≈ 1 light-day · 2026"), { size: 15, bg: "#0b1838", fill: CREAM })}`)}
      ${ly(2, `<g transform="translate(360 300) rotate(-12)" class="drift">
          <line x1="16" y1="46" x2="160" y2="104" stroke="#c8ddf5" stroke-width="2"/>
          <line x1="-18" y1="48" x2="-110" y2="88" stroke="${INK}" stroke-width="4"/><line x1="-18" y1="48" x2="-110" y2="88" stroke="#b7bcc6" stroke-width="2"/>
          <rect x="-128" y="80" width="22" height="18" fill="#9aa0aa" stroke="${INK}" stroke-width="2"/>
          <line x1="6" y1="58" x2="-30" y2="150" stroke="#b7bcc6" stroke-width="3"/>
          <rect x="-44" y="118" width="18" height="12" fill="#6b707a" stroke="${INK}" stroke-width="2"/><rect x="-36" y="136" width="18" height="12" fill="#6b707a" stroke="${INK}" stroke-width="2"/>
          <polygon points="-26,34 26,34 32,46 26,58 -26,58 -32,46" fill="#b7bcc6" stroke="${INK}" stroke-width="2.5"/>
          <circle cx="10" cy="46" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
          <ellipse cx="0" cy="0" rx="58" ry="56" fill="#eef2f8" stroke="${INK}" stroke-width="3"/>
          <ellipse cx="0" cy="0" rx="42" ry="40" fill="none" stroke="#c4cad6" stroke-width="2"/>
          <path d="M0 0L-24 -28M0 0L24 -28M0 0V-36" stroke="#9aa0aa" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="6" fill="#9aa0aa" stroke="${INK}" stroke-width="2"/>
        </g>`)}
      ${ly(3, `<circle cx="620" cy="388" r="104" fill="#d9a520" stroke="${INK}" stroke-width="3"/>${grooves}${pulsar}
        <circle cx="620" cy="388" r="24" fill="#f2c94c" stroke="${INK}" stroke-width="2"/><circle cx="620" cy="388" r="4" fill="${INK}"/>
        ${sparkle(560, 320, 12, "#fff6e0")}
        ${label(620, 516, L("Disco de Oro", "Golden Record"), { size: 16, italic: true, fill: GOLD })}`)}
      ${ly(4, `<path d="M500 360a40 40 0 0 0 0 56M478 340a70 70 0 0 0 0 96M456 322a100 100 0 0 0 0 132" stroke="${GOLD}" stroke-width="3" fill="none" stroke-linecap="round" class="wave"/>
        ${label(400, 576, "«Kay pachamamta niytapas maytapas rimapallasta runasimipi»", { size: 17, italic: true, fill: "#f6e7b8", weight: 500 })}`)}
      ${ly(5, `${pipes}<path d="M558 194h80" stroke="#D7263D" stroke-width="4"/>
        <text x="532" y="170" font-size="26" fill="${GOLD}" class="float">♪</text><text x="648" y="214" font-size="22" fill="${GOLD}" class="float d2">♫</text>
        ${label(598, 256, L("antaras del Perú", "Peruvian panpipes"), { size: 13, fill: "#f6e7b8" })}`)}
      ${ly(8, label(620, 540, L("puede durar mil millones de años", "can last a billion years"), { size: 14, italic: true, fill: "#f6e7b8" }))}`;
  };

  /* ---------- V: Spirit ---------- */
  SCENES.spirit = function (L) {
    let rocks = "";
    const r = rng(15);
    for (let i = 0; i < 18; i++) {
      const x = r() * 800, y = 420 + r() * 170, s = 4 + r() * 12;
      rocks += `<path d="M${f1(x - s)} ${f1(y)}l${f1(s * .4)} -${f1(s * .8)} ${f1(s)} -${f1(s * .2)} ${f1(s * .6)} ${f1(s)}z" fill="#663926" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
    }
    return `<defs>
        <linearGradient id="sp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C67B5C"/><stop offset="1" stop-color="#FF9D6F"/></linearGradient>
        <linearGradient id="sp-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C67B5C"/><stop offset="1" stop-color="#E27B58"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sp-sky)"/>
      <circle cx="470" cy="84" r="14" fill="#fff2d9" opacity=".9"/><circle cx="470" cy="84" r="30" fill="#fff2d9" opacity=".18"/>
      <path d="M0 300L80 272L180 290L300 252L420 286L520 262L650 292L800 268V600H0Z" fill="#99857A" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M0 360Q200 322 400 350T800 340V600H0Z" fill="#8E6A5A" stroke="${INK}" stroke-width="2.5"/>
      <path d="M0 410Q400 382 800 414V600H0Z" fill="url(#sp-gr)" stroke="${INK}" stroke-width="2.5"/>
      <path d="M0 470Q120 450 240 468T480 462T800 470" stroke="#FF9D6F" stroke-width="2" fill="none" opacity=".6"/><path d="M0 520Q140 500 300 518T600 512T800 522" stroke="#C67B5C" stroke-width="2" fill="none" opacity=".7"/>
      ${rocks}
      ${label(24, 40, L("MARTE · cráter Gusev", "MARS · Gusev crater"), { anchor: "start", size: 15, fill: "#3b1f14", weight: 800 })}
      ${ly(3, `<path d="M0 430Q400 400 800 432V470Q400 440 0 470Z" fill="#3a60a0" opacity=".3"/>
        <path d="M60 444q20 -6 40 0t40 0M300 430q20 -6 40 0t40 0M560 440q20 -6 40 0t40 0" stroke="#c8ddf5" stroke-width="2" fill="none" opacity=".8"/>
        ${label(400, 398, L("¿un lago antiguo?", "an ancient lake?"), { size: 16, italic: true, bg: "#663926" })}
        ${label(700, 40, L("misión: 90 soles", "mission: 90 sols"), { size: 14, bg: "#663926", fill: "#FF9D6F" })}`, 4)}
      ${ly(5, `<path d="M318 492Q200 508 -10 540M318 504Q200 520 -10 556" stroke="#8E6A5A" stroke-width="6" stroke-dasharray="4 4" fill="none"/>
        ${label(560, 334, L("colinas Columbia", "Columbia Hills"), { size: 14, italic: true, fill: "#3b1f14" })}`)}
      ${ly(6, `<path d="M438 500Q500 510 560 506Q620 500 700 512L700 520Q600 512 438 512Z" fill="#f4efe6" stroke="${INK}" stroke-width="1.5"/>
        ${label(640, 548, L("sílice: agua caliente", "silica: hot water"), { size: 14, bg: "#f4efe6", fill: INK })}`)}
      ${ly(4, `<g transform="translate(170 0)">
          <ellipse cx="0" cy="410" rx="40" ry="8" fill="none" stroke="#FFD2B8" stroke-width="3" opacity=".8" class="spin-y"/>
          <ellipse cx="6" cy="370" rx="32" ry="7" fill="none" stroke="#FFD2B8" stroke-width="3" opacity=".7" class="spin-y d2"/>
          <ellipse cx="14" cy="330" rx="26" ry="6" fill="none" stroke="#FFD2B8" stroke-width="3" opacity=".6" class="spin-y"/>
          <ellipse cx="24" cy="292" rx="22" ry="5" fill="none" stroke="#FFD2B8" stroke-width="3" opacity=".5" class="spin-y d2"/>
          <ellipse cx="36" cy="258" rx="18" ry="4" fill="none" stroke="#FFD2B8" stroke-width="3" opacity=".4" class="spin-y"/>
        </g>
        ${sparkle(340, 418, 10, "#fff6e0")}${sparkle(410, 416, 8, "#fff6e0")}`)}
      ${ly(2, `<g transform="translate(640 470)"><path d="M-40 0l20 -24h40l20 24z" fill="#a8a29a" stroke="${INK}" stroke-width="2.5"/>
          <circle cx="-30" cy="-12" r="14" fill="#e6d2b5" stroke="${INK}" stroke-width="2"/><circle cx="-8" cy="-20" r="15" fill="#e6d2b5" stroke="${INK}" stroke-width="2"/><circle cx="18" cy="-14" r="13" fill="#e6d2b5" stroke="${INK}" stroke-width="2"/>
        </g>${spirit(380, 488, 1, {})}`, 6)}
      ${ly(6, spirit(380, 488, 1, { broken: true }))}
      ${ly(7, `<path d="M290 506Q330 470 380 474Q430 470 470 506Z" fill="#E27B58" stroke="${INK}" stroke-width="2.5"/>
        <path d="M300 500q40 -14 80 -12" stroke="#FF9D6F" stroke-width="3" fill="none"/>
        ${label(380, 540, "Troy · 2009", { size: 14, bg: "#663926", fill: "#FF9D6F" })}`)}
      ${ly(8, `<rect width="800" height="600" fill="#1a1030" opacity=".55"/>${stars(70, 44, 0, 0, 800, 300)}
        <circle cx="470" cy="84" r="40" fill="#88a5e0" opacity=".25"/>
        <path d="M414 350a24 24 0 0 1 24 -24M408 334a44 44 0 0 1 44 -44" stroke="#c8ddf5" stroke-width="3" fill="none" class="fade"/>
        <path d="M560 520V440" stroke="${INK}" stroke-width="5"/>
        <rect x="490" y="390" width="160" height="58" rx="8" fill="#f4efe6" stroke="${INK}" stroke-width="3"/>
        ${label(570, 414, L("Última señal", "Last signal"), { size: 15, fill: INK, weight: 800 })}
        ${label(570, 436, "22 · 03 · 2010", { size: 15, fill: "#D7263D", weight: 800 })}`)}
      ${ly(9, `<g transform="translate(694 176)"><circle r="74" fill="#663926" stroke="#FF9D6F" stroke-width="3"/>
          ${spirit(0, 26, .5, { ghost: true })}
          ${label(0, -40, "Opportunity", { size: 14, fill: "#FF9D6F", italic: true })}
          ${label(0, 56, "45 km", { size: 15, fill: CREAM, weight: 800 })}
        </g>
        ${label(250, 380, L("Spirit: 7,7 km", "Spirit: 7.7 km"), { size: 15, bg: "#663926", fill: CREAM })}`)}
      ${ly(10, `<g transform="translate(96 250)" class="glow">
          <path d="M-24 60V-10Q-30 -40 0 -46Q30 -40 24 -10V60Z" fill="none" stroke="${GOLD}" stroke-width="3" stroke-dasharray="4 5"/>
          <path d="M-26 -12H26M-24 10H24M-24 32H24" stroke="${GOLD}" stroke-width="1.5" opacity=".7"/>
          ${sparkle(0, -60, 9, GOLD)}
          ${label(0, 86, "chullpa", { size: 14, italic: true, fill: GOLD })}
        </g>`)}`;
  };

  /* ---------- VI: Ingenuity ---------- */
  SCENES.ingenuity = function (L) {
    let path = "";
    for (let i = 0; i < 72; i++) {
      const t = i / 71, x = 70 + t * 660, y = 210 + Math.sin(t * Math.PI * 3) * 50 - t * 40;
      path += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${i === 0 || i === 71 ? 5 : 2.6}" fill="#ffc27a" stroke="${INK}" stroke-width="${i === 0 || i === 71 ? 1.5 : 0}"/>`;
    }
    const ladder = [[2.6, L("Huanta 2,6 km", "Huanta 2.6 km")], [6.8, L("Huascarán 6,8 km", "Huascarán 6.8 km")], [11, L("avión 11 km", "airliner 11 km")], [30, L("Marte ≈ 30 km", "Mars ≈ 30 km")]];
    let marks = "";
    for (const [km, txt] of ladder) {
      const y = 440 - km * 9.6, hot = km === 30;
      marks += `<path d="M62 ${f1(y)}h16" stroke="${hot ? GOLD : CREAM}" stroke-width="3"/>${label(86, f1(y + 5), txt, { anchor: "start", size: hot ? 16 : 13, fill: hot ? GOLD : CREAM, weight: hot ? 800 : 600 })}`;
    }
    let quipu = `<path d="M40 70H250" stroke="#c9a26b" stroke-width="5" stroke-linecap="round"/>`;
    const qc = ["#D7263D", GOLD, "#2EC4B6", "#f4efe6", "#C2185B", GOLD, "#2EC4B6", "#D7263D", "#f4efe6"];
    for (let i = 0; i < 9; i++) {
      const x = 56 + i * 22, len = 50 + ((i * 37) % 60);
      quipu += `<path d="M${x} 70q4 ${len / 2} 0 ${len}" stroke="${qc[i]}" stroke-width="3" fill="none"/>`;
      for (let k = 0; k < 1 + (i % 3); k++) quipu += `<circle cx="${x + 1.5}" cy="${f1(86 + k * 14 + (i % 2) * 6)}" r="3.6" fill="${qc[i]}" stroke="${INK}" stroke-width="1"/>`;
    }
    return `<defs>
        <linearGradient id="in-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E6A5A"/><stop offset="1" stop-color="#FF9D6F"/></linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#in-sky)"/>
      <circle cx="610" cy="96" r="12" fill="#fff2d9" opacity=".85"/>
      <path d="M0 330L140 310L180 280L330 286L360 312L520 304L560 276L800 290V600H0Z" fill="#99857A" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M180 288L330 292M560 280L800 294" stroke="#8E6A5A" stroke-width="5"/>
      <path d="M0 400Q400 370 800 400V600H0Z" fill="#C67B5C" stroke="${INK}" stroke-width="2.5"/>
      <path d="M30 462q70 -12 140 0M470 548q80 -14 160 0M210 566q55 -9 110 0M640 420q50 -8 100 0" stroke="#a85f43" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>
      <g stroke="${INK}" stroke-width="2" stroke-linejoin="round"><path d="M455 500l10 -14l16 2l8 12z" fill="#8a4f3a"/><path d="M120 520l7 -9l12 1l6 8z" fill="#9a5a42"/><path d="M700 560l12 -16l20 3l9 13z" fill="#8a4f3a"/><path d="M250 430l5 -7l9 1l4 6z" fill="#9a5a42"/></g>
      ${label(780, 40, L("MARTE · cráter Jezero", "MARS · Jezero crater"), { anchor: "end", size: 15, fill: "#3b1f14", weight: 800 })}
      ${ly(5, `<g transform="translate(200 535) scale(1 .45)" opacity=".75">
          <path d="M-70 0Q-20 -20 30 0Q-20 20 -70 0Z" stroke="#f4efe6" stroke-width="4" fill="none"/>
          <path d="M30 0L120 -6M-30 -10L-10 -90L20 -12M-30 10L-10 90L20 12M-70 0l-40 -24M-70 0l-44 0M-70 0l-40 24" stroke="#f4efe6" stroke-width="4" fill="none" stroke-linejoin="round"/>
        </g>
        ${label(200, 584, L("q'inti de Nasca", "Nazca q'inti"), { size: 13, italic: true, fill: "#f4efe6" })}
        ${path}${label(400, 120, L("72 vuelos · ≈ 17 km", "72 flights · ≈ 17 km"), { size: 17, bg: "#663926", fill: "#ffc27a" })}`)}
      ${ly(1, perseverance(600, 478, 1), 6)}
      ${ly(1, `<g transform="translate(600 452)"><rect x="-14" y="-14" width="28" height="14" rx="3" fill="#d9c9a3" stroke="${INK}" stroke-width="2"/></g>`, 2)}
      ${ly(2, heli(330, 480, { s: 1.4 }), 4)}
      ${ly(3, `<path d="M70 440V120" stroke="${CREAM}" stroke-width="3"/>${marks}
        <path d="M150 370Q120 360 90 375Q120 368 140 376L150 380L160 376Q180 368 210 375Q180 360 150 370Z" fill="${INK}"/><circle cx="150" cy="370" r="3" fill="#f4efe6"/>
        ${label(270, 180, L("aire 100 veces más delgado", "air 100 times thinner"), { size: 15, italic: true, bg: "#663926", fill: CREAM })}`, 4)}
      ${ly(4, `<ellipse cx="330" cy="500" rx="40" ry="7" fill="#663926" opacity=".4"/>
        <g class="hover">${heli(330, 300, { flying: true, s: 1.4 })}</g>
        ${label(330, 336, "19 · 04 · 2021", { size: 15, bg: "#663926", fill: "#ffc27a" })}
        <g transform="translate(420 230)"><rect x="0" y="0" width="34" height="24" fill="#e8dcc0" stroke="${INK}" stroke-width="2"/><path d="M4 8h26M4 15h20" stroke="#a89878" stroke-width="2"/>
        ${label(17, 44, "Wright 1903", { size: 12, fill: "#f4efe6" })}</g>`, 6)}
      ${ly(6, `${heli(330, 488, { broken: true, s: 1.4 })}${label(330, 530, L("vuelo 72 · 2024", "flight 72 · 2024"), { size: 14, bg: "#663926", fill: CREAM })}`)}
      ${ly(7, `${quipu}${label(145, 194, L("datos guardados, como un quipu", "data kept, like a quipu"), { size: 14, italic: true, fill: "#f4efe6" })}
        <circle cx="330" cy="430" r="50" fill="none" stroke="#ffc27a" stroke-width="2" class="pulse"/>
        <g transform="translate(410 420)"><rect x="-4" y="-30" width="8" height="30" rx="4" fill="#f4efe6" stroke="${INK}" stroke-width="2"/><circle cx="0" cy="4" r="8" fill="#D7263D" stroke="${INK}" stroke-width="2"/></g>`)}`;
  };

  /* ---------- EPÍLOGO ---------- */
  SCENES.epilogo = function (L) {
    let dots = "";
    const r = rng(101);
    for (let i = 0; i < 22; i++) {
      const a = r() * 6.28, d = Math.sqrt(r()) * 80;
      dots += `<circle cx="${f1(400 + Math.cos(a) * d)}" cy="${f1(150 + Math.sin(a) * d)}" r="${f1(2 + r() * 2)}" fill="${GOLD}" stroke="${INK}" stroke-width="1" class="tw" style="animation-delay:${f1(r() * 3)}s"/>`;
    }
    const langs = [["Runasimi", 120, 250], ["Aymar aru", 230, 300], ["Asháninka", 120, 350], ["Awajún", 680, 250], ["Shipibo", 600, 292], ["Castellano", 680, 350], ["English", 520, 336]];
    let bubbles = "";
    langs.forEach(([t, x, y], i) => { bubbles += `<g class="float${i % 2 ? " d2" : ""}">${label(x, y, t, { size: 16, bg: i === 0 ? GOLD : "#0b1838", fill: i === 0 ? INK : CREAM, italic: true })}</g>`; });
    return `<defs>
        <linearGradient id="ep-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1838"/><stop offset=".75" stop-color="#2d2a5e"/><stop offset="1" stop-color="#4d4177"/></linearGradient>
        <radialGradient id="ep-glow"><stop offset="0" stop-color="#fff6e0" stop-opacity=".4"/><stop offset="1" stop-color="#fff6e0" stop-opacity="0"/></radialGradient>
        <radialGradient id="ep-tab"><stop offset="0" stop-color="#88a5e0" stop-opacity=".7"/><stop offset="1" stop-color="#88a5e0" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#ep-sky)"/>${stars(110, 61, 0, 0, 800, 380)}
      ${ly(6, `${chakana(400, 150, 44, `fill="none" stroke="${GOLD}" stroke-width="3" opacity=".75" class="draw"`)}`)}
      <circle cx="400" cy="150" r="170" fill="url(#ep-glow)"/>
      ${moonDisc("ep-moon", 400, 150, 95, true)}
      ${ly(1, `${dots}<circle cx="700" cy="90" r="9" fill="#E27B58" stroke="${INK}" stroke-width="2"/><circle cx="703" cy="88" r="2.5" fill="${GOLD}"/>
        ${label(700, 122, L("Marte", "Mars"), { size: 12, fill: "#FF9D6F" })}
        <path d="M70 40l40 14" stroke="#c8ddf5" stroke-width="1.5" stroke-dasharray="2 5"/><circle cx="112" cy="55" r="4" fill="${GOLD}"/>
        ${label(118, 82, "Voyager", { size: 12, fill: "#c8ddf5" })}`)}
      ${ly(5, `<g transform="translate(352 214)"><path d="M-12 0l5 -10M12 0l-5 -10" stroke="${INK}" stroke-width="2"/><rect x="-10" y="-20" width="20" height="10" fill="#d4a73a" stroke="${INK}" stroke-width="1.5"/><rect x="-6" y="-30" width="12" height="10" fill="#e9e6df" stroke="${INK}" stroke-width="1.5"/></g>
        <g transform="translate(378 212)"><path d="M0 0v-26" stroke="${INK}" stroke-width="2"/><rect x="0" y="-26" width="21" height="13" fill="${CREAM}" stroke="${INK}" stroke-width="1.5"/><rect x="0" y="-26" width="7" height="13" fill="#D7263D"/><rect x="14" y="-26" width="7" height="13" fill="#D7263D"/></g>
        ${label(400, 278, "Artemis · Perú 2024", { size: 14, bg: "#0b1838", fill: GOLD })}`)}
      <path d="M0 420L100 362L190 396L290 340L400 392L500 350L610 398L700 356L800 400V600H0Z" fill="#26295a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M0 500Q400 466 800 504V600H0Z" fill="#3e3462" stroke="${INK}" stroke-width="3"/>
      ${ly(4, bubbles)}
      ${ly(2, `<ellipse cx="400" cy="440" rx="70" ry="44" fill="url(#ep-tab)"/>${killari(400, 552, true)}
        <rect x="384" y="430" width="32" height="20" rx="3" fill="#c8ddf5" stroke="${INK}" stroke-width="2"/>`)}
      ${ly(3, kid(250, 556, "aimara") + kid(320, 552, "ashaninka") + kid(480, 552, "awajun") + kid(552, 556, "shipibo"))}`;
  };


  /* ---------- PORTADA: el cuento en una imagen ---------- */
  SCENES.hero = function (L) {
    const W = 1200, H = 620;
    const r = rng(5);
    let band = "";
    for (let i = 0; i < 260; i++) {
      const t = r();
      band += `<circle cx="${f1(t * W)}" cy="${f1(330 - t * 300 + (r() - .5) * 110)}" r="${f1(.4 + r() * 1.2)}" fill="#e6eefc" opacity="${f1(.3 + r() * .6)}"/>`;
    }
    const orbit = (x, y, inner, lbl, color) => `<g><circle cx="${x}" cy="${y}" r="52" fill="#0b1838" stroke="${color}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="58" fill="none" stroke="${color}" stroke-width="1.5" opacity=".4" class="pulse"/>${inner}${label(x, y + 80, lbl, { size: 15, fill: CREAM, bg: "#0b1838" })}</g>`;
    const mirrorIcon = `<g transform="translate(250 330)"><polygon points="-28,-10 26,-18 32,4 -22,12" fill="#3c3f46" stroke="${INK}" stroke-width="2"/>${[...Array(12)].map((_, i) => `<circle cx="${-20 + (i % 6) * 9 + Math.floor(i / 6) * 2}" cy="${-8 + Math.floor(i / 6) * 10 - (i % 6) * 1.3}" r="3" fill="#8fd3ff"/>`).join("")}<path d="M-10 10l-4 14M14 6l4 14" stroke="${INK}" stroke-width="2.5"/><path d="M-90 -120L0 -4" stroke="#2ef27a" stroke-width="2" class="beam"/></g>`;
    const voyIcon = `<g transform="translate(905 150) rotate(-14) scale(.55)"><line x1="10" y1="40" x2="110" y2="80" stroke="#c8ddf5" stroke-width="3"/><line x1="-14" y1="44" x2="-80" y2="74" stroke="#b7bcc6" stroke-width="4"/><polygon points="-24,30 24,30 30,42 24,54 -24,54 -30,42" fill="#b7bcc6" stroke="${INK}" stroke-width="3"/><ellipse cx="0" cy="0" rx="50" ry="48" fill="#eef2f8" stroke="${INK}" stroke-width="4"/><circle cx="12" cy="44" r="11" fill="${GOLD}" stroke="${INK}" stroke-width="2"/></g>`;
    return `<defs>
        <linearGradient id="he-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070f26"/><stop offset=".55" stop-color="#1c2452"/><stop offset="1" stop-color="#4d4177"/></linearGradient>
        <radialGradient id="he-glow"><stop offset="0" stop-color="#fff6e0" stop-opacity=".5"/><stop offset="1" stop-color="#fff6e0" stop-opacity="0"/></radialGradient>
        <radialGradient id="he-mars" cx=".35" cy=".35"><stop offset="0" stop-color="#FF9D6F"/><stop offset=".7" stop-color="#E27B58"/><stop offset="1" stop-color="#663926"/></radialGradient>
        <filter id="he-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#he-sky)"/>
      <path d="M0 360L1200 40L1200 160L0 470Z" fill="#c8ddf5" opacity=".14" filter="url(#he-blur)"/>${band}
      ${stars(150, 17, 0, 0, W, 430)}
      <ellipse cx="600" cy="230" rx="380" ry="120" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="3 9" opacity=".7" class="dash-anim"/>
      <circle cx="600" cy="230" r="230" fill="url(#he-glow)"/>
      ${moonDisc("he-moon", 600, 230, 128, true)}
      ${orbit(250, 330, mirrorIcon, L("El espejo · 1969", "The mirror · 1969", "Rirpu · 1969"), "#7fe3d6")}
      ${orbit(330, 140, lrv(330, 152, .32), L("El rover · 1972", "The rover · 1972", "Rover · 1972"), "#cfd3da")}
      ${orbit(905, 150, voyIcon, L("Voyager · 1977", "Voyager · 1977", "Voyager · 1977"), GOLD)}
      <path d="M0 470L130 400L250 440L380 372L520 430L640 388L780 438L900 392L1040 444L1200 400V620H0Z" fill="#26295a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M0 520Q300 486 600 512T1200 506V620H0Z" fill="#33386c" stroke="${INK}" stroke-width="3"/>
      ${house(150, 494, 84, 56)}${house(258, 508, 62, 44)}
      <path d="M0 568Q600 540 1200 570V620H0Z" fill="#3e3462" stroke="${INK}" stroke-width="3"/>
      <rect x="520" y="560" width="160" height="10" rx="3" fill="#6b4a2e" stroke="${INK}" stroke-width="2.5"/>
      ${grandma(568, 562)}${killari(636, 562)}
      <path d="M546 506L500 420" stroke="#7a5232" stroke-width="5" stroke-linecap="round"/>
      <g><circle cx="960" cy="300" r="62" fill="url(#he-mars)" stroke="${INK}" stroke-width="3"/>
        <path d="M915 285q20 -8 40 2t40 -4M920 320q30 10 70 -2" stroke="#8E6A5A" stroke-width="5" fill="none" opacity=".6"/>
        ${spirit(944, 330, .3)}<g transform="translate(990 286) scale(.42) translate(-990 -286)">${heli(990, 286, {})}</g>
        ${label(960, 392, L("Spirit · Ingenuity · Marte", "Spirit · Ingenuity · Mars", "Spirit · Ingenuity · Marte"), { size: 15, fill: CREAM, bg: "#663926" })}</g>
      ${finish("he", W, H)}`;
  };

  SCENES.finish = finish;
  window.YACHASKA_SCENES = SCENES;
})();
