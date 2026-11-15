/* =========================================================================
   YACHASKA – flores de retablo ayacuchano (SVG original dibujado en código)
   Inspiradas en la pintura de las puertas de los retablos de Ayacucho:
   colores planos, pétalos con pinceladas blancas en forma de peine,
   rosetas de bordes ondulados, hojas y volutas que se superponen.
   Ningún dibujo es copia de una pieza concreta.
   ========================================================================= */
(function () {
  "use strict";

  const INK = "#1d1530";
  const C = {
    red: "#D7263D", pink: "#F0607A", magenta: "#C2185B", blue: "#1F4FBF", navy: "#1f2c5c",
    green: "#1F8A4C", pine: "#14532d", gold: "#F2B632", purple: "#5B2A86", orange: "#F28C28", white: "#FFFDF6"
  };
  const f1 = (n) => Math.round(n * 10) / 10;

  /* pétalo u hoja: nace en (0,0) y apunta hacia arriba; `rot` lo gira.
     La pincelada blanca en peine es la marca del retablo. */
  function petal(len, w, color, rot, comb) {
    let feather = "";
    if (comb !== false) {
      const n = 5, hw = w * 0.3, y0 = -len * 0.12;
      let d = `M${f1(-hw)} ${f1(y0)}`;
      for (let i = 0; i < n; i++) {
        const xc = -hw + (i + 0.5) * (2 * hw / n);
        const c = Math.abs((i + 0.5) / n - 0.5) * 2;
        d += `L${f1(xc)} ${f1(-len * (0.6 - 0.22 * c))}`;
        if (i < n - 1) d += `L${f1(-hw + (i + 1) * (2 * hw / n))} ${f1(-len * 0.26)}`;
      }
      d += `L${f1(hw)} ${f1(y0)}Q0 ${f1(-len * 0.02)} ${f1(-hw)} ${f1(y0)}Z`;
      feather = `<path d="${d}" fill="${C.white}"/>`;
    }
    return `<g transform="rotate(${rot})"><path d="M0 0C${f1(w * 0.95)} ${f1(-len * 0.2)} ${f1(w * 0.75)} ${f1(-len * 0.72)} 0 ${f1(-len)}C${f1(-w * 0.75)} ${f1(-len * 0.72)} ${f1(-w * 0.95)} ${f1(-len * 0.2)} 0 0Z" fill="${color}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>${feather}</g>`;
  }

  /* flor de pétalos: anillo exterior con peine, anillo interior liso y centro dorado */
  function flower(cx, cy, r, color, n, opt) {
    const o = opt || {};
    let s = `<g transform="translate(${cx} ${cy})">`;
    for (let i = 0; i < n; i++) s += petal(r, r * 0.62, color, i * 360 / n + (o.rot || 0));
    if (o.inner) for (let i = 0; i < n; i++) s += petal(r * 0.56, r * 0.42, o.inner, (i + 0.5) * 360 / n + (o.rot || 0), false);
    s += `<circle r="${f1(r * 0.24)}" fill="${o.center || C.gold}" stroke="${INK}" stroke-width="1.4"/><circle r="${f1(r * 0.09)}" fill="${INK}"/>`;
    return s + `</g>`;
  }

  /* roseta: anillos de borde ondulado, uno sobre otro, con corona de pinceladas blancas */
  function rosette(cx, cy, r, opt) {
    const o = opt || {};
    const ring = (R, k, col) => {
      let g = "";
      const rr = R * Math.sin(Math.PI / k) * 1.25;
      for (let i = 0; i < k; i++) {
        const a = i * 2 * Math.PI / k;
        g += `<circle cx="${f1(Math.cos(a) * R)}" cy="${f1(Math.sin(a) * R)}" r="${f1(rr)}" fill="${col}" stroke="${INK}" stroke-width="1.2"/>`;
      }
      return g + `<circle r="${f1(R)}" fill="${col}"/>`;
    };
    let s = `<g transform="translate(${cx} ${cy})">`;
    s += ring(r * 0.86, 14, o.outer || C.red);
    s += ring(r * 0.64, 12, o.mid || C.pink);
    s += `<circle r="${f1(r * 0.5)}" fill="${C.white}"/>`;
    s += `<circle r="${f1(r * 0.56)}" fill="none" stroke="${C.white}" stroke-width="${f1(r * 0.2)}" stroke-dasharray="${f1(r * 0.05)} ${f1(r * 0.06)}"/>`;
    for (let i = 0; i < 10; i++) s += petal(r * 0.42, r * 0.26, o.inner || C.blue, i * 36, false);
    s += `<circle r="${f1(r * 0.17)}" fill="${C.gold}" stroke="${INK}" stroke-width="1.4"/><circle r="${f1(r * 0.06)}" fill="${INK}"/>`;
    return s + `</g>`;
  }

  /* voluta: el rizo que cierra los ramos */
  function scroll(x, y, color, flip) {
    return `<g transform="translate(${x} ${y})${flip ? " scale(1 -1)" : ""}">
      <path d="M0 0C-6 -24 -34 -32 -46 -15C-54 -3 -45 9 -33 6C-25 3 -25 -7 -32 -8" fill="none" stroke="${INK}" stroke-width="9.5" stroke-linecap="round"/>
      <path d="M0 0C-6 -24 -34 -32 -46 -15C-54 -3 -45 9 -33 6C-25 3 -25 -7 -32 -8" fill="none" stroke="${color}" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M-8 -17C-18 -27 -34 -27 -42 -16" fill="none" stroke="${C.white}" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>
    </g>`;
  }

  const dots = (pts, col) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r || 3.2}" fill="${col || C.navy}"/>`).join("");

  /* media cenefa (lado izquierdo); la otra mitad es su espejo */
  function half() {
    return `
      <g transform="translate(150 75)">${petal(88, 40, C.pine, -90)}${petal(64, 34, C.green, -38)}${petal(64, 34, C.green, -142)}${petal(60, 30, C.pine, 52)}${petal(60, 30, C.pine, 128)}</g>
      <g transform="translate(402 75)">${petal(122, 30, C.green, -60)}${petal(122, 30, C.green, -120)}${petal(196, 46, C.purple, -90)}</g>
      ${scroll(262, 30, C.red)}${scroll(262, 120, C.red, true)}
      ${scroll(112, 26, C.orange)}${scroll(112, 124, C.orange, true)}
      ${dots([[226, 22], [226, 128], [300, 52, 2.6], [300, 98, 2.6], [22, 40, 2.6], [22, 110, 2.6], [88, 75, 2.4]])}
      ${flower(150, 75, 40, C.blue, 8, { inner: C.magenta })}
      ${flower(50, 75, 25, C.red, 6, { inner: C.gold, center: C.white, rot: 30 })}`;
  }

  /* cenefa completa, como la cresta de un retablo: 800 × 150 */
  function band() {
    const h = half();
    return `<svg class="retablo-band" viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="794" height="144" rx="14" fill="${C.white}" stroke="${C.red}" stroke-width="6"/>
      <rect x="11" y="11" width="778" height="128" rx="9" fill="none" stroke="${C.blue}" stroke-width="2"/>
      <g>${h}</g><g transform="translate(800 0) scale(-1 1)">${h}</g>
      ${rosette(400, 75, 62)}
    </svg>`;
  }

  /* cresta triangular del retablo: 800 × 180 */
  function crest() {
    const h = `
      <g transform="translate(400 126)">${petal(150, 34, C.green, -84)}${petal(190, 34, C.pine, -100)}${petal(250, 38, C.purple, -93)}</g>
      ${scroll(338, 106, C.red)}
      ${dots([[300, 150, 3], [205, 122, 2.6], [110, 156, 2.6]])}
      ${flower(255, 128, 30, C.blue, 8, { inner: C.magenta })}
      ${flower(150, 147, 16, C.red, 6, { inner: C.gold, center: C.white, rot: 30 })}`;
    return `<svg class="retablo-crest-svg" viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M14 174L400 14L786 174Z" fill="${C.white}" stroke="${C.red}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M62 162L400 34L738 162Z" fill="none" stroke="${C.blue}" stroke-width="2" stroke-linejoin="round"/>
      <g>${h}</g><g transform="translate(800 0) scale(-1 1)">${h}</g>
      ${flower(400, 52, 14, C.orange, 6, { center: C.white })}
      ${rosette(400, 118, 44)}
    </svg>`;
  }

  /* interior de una puerta pintada (225 × 600, sin marco) */
  function doorInner() {
    const side = `${scroll(96, 212, C.red)}${scroll(96, 388, C.red, true)}${scroll(84, 60, C.orange)}${scroll(84, 540, C.orange, true)}
      ${flower(34, 300, 19, C.orange, 6, { center: C.white })}
      ${dots([[40, 160, 3.4], [40, 440, 3.4], [58, 250, 2.6], [58, 350, 2.6]])}`;
    return `<g transform="translate(112 300)">${petal(150, 38, C.green, 28)}${petal(150, 38, C.green, -28)}${petal(150, 38, C.green, 152)}${petal(150, 38, C.green, 208)}${petal(222, 52, C.purple, 0)}${petal(222, 52, C.purple, 180)}</g>
      <g>${side}</g><g transform="translate(225 0) scale(-1 1)">${side}</g>
      ${flower(112, 108, 46, C.blue, 8, { inner: C.magenta })}${flower(112, 492, 46, C.blue, 8, { inner: C.magenta })}
      ${flower(112, 34, 13, C.red, 6, { center: C.white })}${flower(112, 566, 13, C.red, 6, { center: C.white })}
      ${rosette(112, 300, 58)}`;
  }

  /* puerta pintada: 225 × 600; se estira a la altura de la caja */
  function door() {
    return `<svg class="retablo-door-svg" viewBox="0 0 225 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="217" height="592" rx="6" fill="${C.white}" stroke="${C.red}" stroke-width="8"/>
      <rect x="14" y="14" width="197" height="572" rx="3" fill="none" stroke="${C.blue}" stroke-width="2"/>
      ${doorInner()}
    </svg>`;
  }

  /* hoja de puerta de cualquier ancho: W × 600 (W según la forma de la pantalla).
     Si es ancha, se pinta en varios paneles, como las puertas grandes de retablo. */
  function doorWide(W) {
    W = Math.max(120, Math.round(W));
    const n = Math.max(1, Math.round(W / 240)), cw = W / n, sx = (cw / 225).toFixed(3);
    let cols = "";
    for (let i = 0; i < n; i++) {
      cols += `<g transform="translate(${f1(i * cw)} 0) scale(${sx} 1)">${doorInner()}</g>`;
      if (i) cols += `<path d="M${f1(i * cw)} 12V588" stroke="${C.red}" stroke-width="7"/><path d="M${f1(i * cw)} 12V588" stroke="${C.gold}" stroke-width="1.6"/>`;
    }
    return `<svg class="retablo-leaf-svg" viewBox="0 0 ${W} 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="${W - 8}" height="592" rx="6" fill="${C.white}" stroke="${C.red}" stroke-width="8"/>
      ${cols}
      <rect x="14" y="14" width="${W - 28}" height="572" rx="3" fill="none" stroke="${C.blue}" stroke-width="2"/>
    </svg>`;
  }

  /* florcita suelta para marcar cada piso */
  function bud(i) {
    const pal = [[C.red, C.gold], [C.blue, C.magenta], [C.purple, C.orange], [C.green, C.gold], [C.magenta, C.blue], [C.orange, C.red], [C.blue, C.gold], [C.red, C.purple]][i % 8];
    return `<svg class="retablo-bud" viewBox="-30 -30 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${flower(0, 0, 27, pal[0], 8, { inner: pal[1] })}</svg>`;
  }

  /* =====================================================================
     FLORES DE RETABLO AYACUCHANO (estilo de las puertas pintadas)
     Formas planas, sin contorno, con la pincelada blanca "en peine" que
     sale desde la base de cada pétalo y hoja. Todas nacen en (0,0) y
     apuntan hacia arriba; se colocan con at(x, y, giro, forma).
     ===================================================================== */
  const P = {
    red: "#D7262E", blue: "#1E3FA8", sky: "#3D6FD8", green: "#2E8B47", dgreen: "#1B5E34",
    dark: "#2A2433", maroon: "#8E1B3A", yellow: "#F4C430", magenta: "#E0218A",
    purple: "#5B2A86", orange: "#F28C28", white: "#FFFFFF", paper: "#FFFDF6"
  };
  const at = (x, y, rot, inner) => `<g transform="translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${f1(rot)})` : ""}">${inner}</g>`;

  /* pinceladas blancas en peine: dientes que suben desde la base */
  function teeth(h, hw, n, off) {
    const o = off || 0;
    let d = `M${f1(-hw * .55)} ${f1(-o - h * .06)}`;
    for (let i = 0; i < n; i++) {
      const x0 = -hw + i * (2 * hw / n), x1 = x0 + 2 * hw / n, xm = (x0 + x1) / 2;
      const c = Math.abs((i + .5) / n - .5) * 2;
      d += `L${f1(x0 + (x1 - x0) * .18)} ${f1(-o - h * (.34 - .1 * c))}L${f1(xm)} ${f1(-o - h * (1 - .38 * c))}L${f1(x1 - (x1 - x0) * .18)} ${f1(-o - h * (.34 - .1 * c))}`;
    }
    d += `L${f1(hw * .55)} ${f1(-o - h * .06)}Q0 ${f1(-o + h * .05)} ${f1(-hw * .55)} ${f1(-o - h * .06)}Z`;
    return `<path d="${d}" fill="${P.white}"/>`;
  }

  /* pétalo con peine (el peine puede ir más arriba con off/h, para que se vea tras la flor del centro) */
  function cpetal(L, w, col, comb) {
    let s = `<path d="M0 0C${f1(w * 1.15)} ${f1(-L * .12)} ${f1(w * .95)} ${f1(-L * .86)} 0 ${f1(-L)}C${f1(-w * .95)} ${f1(-L * .86)} ${f1(-w * 1.15)} ${f1(-L * .12)} 0 0Z" fill="${col}"/>`;
    if (comb !== false) {
      const c = comb || {};
      s += teeth(L * (c.h || .56), w * .62, c.n || 6, L * (c.off || 0));
    }
    return s;
  }

  /* pétalo redondo (margaritas y anillos) */
  function rpetal(L, w, col) {
    return `<path d="M0 0C${f1(w * 1.35)} ${f1(-L * .28)} ${f1(w * 1.15)} ${f1(-L * 1.04)} 0 ${f1(-L * .9)}C${f1(-w * 1.15)} ${f1(-L * 1.04)} ${f1(-w * 1.35)} ${f1(-L * .28)} 0 0Z" fill="${col}"/>` + teeth(L * .62, w * .5, 4);
  }

  /* hoja de pluma: asimétrica, con barbas blancas a un lado de la nervadura */
  function feather(L, w, col) {
    let s = `<path d="M0 0C${f1(w)} ${f1(-L * .25)} ${f1(w * .8)} ${f1(-L * .72)} 0 ${f1(-L)}C${f1(-w * .45)} ${f1(-L * .7)} ${f1(-w * .65)} ${f1(-L * .3)} 0 0Z" fill="${col}"/>`;
    let d = "";
    const n = 8;
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1), y = -L * t, wx = w * .62 * Math.sin(Math.PI * t);
      d += `M${f1(w * .03)} ${f1(y)}L${f1(wx)} ${f1(y - L * .075)}L${f1(w * .03)} ${f1(y - L * .04)}Z`;
    }
    return s + `<path d="${d}" fill="${P.white}"/>`;
  }

  /* flor abanico (las de las esquinas): borde ondulado y rayos blancos desde la base */
  function fan(R, col) {
    const a0 = -50 * Math.PI / 180, a1 = -a0, k = 5;
    const pt = (a, r) => `${f1(Math.sin(a) * r)} ${f1(-Math.cos(a) * r)}`;
    let d = `M0 0L${pt(a0, R)}`;
    for (let i = 0; i < k; i++) {
      const b0 = a0 + (a1 - a0) * i / k, b1 = a0 + (a1 - a0) * (i + 1) / k;
      d += `Q${pt((b0 + b1) / 2, R * 1.17)} ${pt(b1, R)}`;
    }
    let s = `<path d="${d}Z" fill="${col}"/>`;
    let r = "";
    const n = 13;
    for (let i = 0; i < n; i++) {
      const a = a0 * .86 + (a1 - a0) * .86 * i / (n - 1);
      r += `M${pt(a - .045, R * .16)}L${pt(a, R * (i % 2 ? .62 : .8))}L${pt(a + .045, R * .16)}Z`;
    }
    s += `<path d="${r}" fill="${P.white}"/>`;
    s += at(0, 0, -38, cpetal(R * .36, R * .15, P.dgreen, false)) + at(0, 0, 38, cpetal(R * .36, R * .15, P.dgreen, false));
    return s + `<circle r="${f1(R * .09)}" fill="${P.yellow}"/>`;
  }

  /* flor de anillos (la del centro): coronas de pétalos con peine y centro amarillo */
  function ringFlower(R, rings, center) {
    const rs = rings || [[12, 1, .42, P.maroon], [12, .72, .4, P.blue], [8, .46, .46, P.maroon]];
    let s = "";
    rs.forEach(([n, lf, wf, col], k) => {
      for (let i = 0; i < n; i++) s += at(0, 0, i * 360 / n + (k % 2 ? 180 / n : 0), cpetal(R * lf, R * lf * wf, col));
    });
    return s + `<circle r="${f1(R * .2)}" fill="${center || P.yellow}"/>`;
  }

  /* margarita de cinco pétalos */
  function daisy(r, col, center) {
    let s = "";
    for (let i = 0; i < 5; i++) s += at(0, 0, i * 72, rpetal(r, r * .6, col));
    return s + `<circle r="${f1(r * .27)}" fill="${center || P.red}"/>`;
  }

  /* voluta: rizo de tallo */
  function curl(sz, col, flip) {
    const d = `M0 0C0 ${f1(-sz * .6)} ${f1(sz * .75)} ${f1(-sz * .85)} ${f1(sz * .85)} ${f1(-sz * .38)}C${f1(sz * .9)} ${f1(-sz * .02)} ${f1(sz * .42)} ${f1(sz * .04)} ${f1(sz * .38)} ${f1(-sz * .22)}`;
    return `<g${flip ? ' transform="scale(-1 1)"' : ""}><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(sz * .15)}" stroke-linecap="round"/></g>`;
  }

  /* ---------- el frente del retablo: una sola pintura repartida entre las dos puertas ----------
     Como en las puertas reales: flor de anillos al centro (sobre la juntura), cuatro pétalos azules
     en cruz, hojas de pluma en abanico y una flor abanico en cada esquina. */
  const facadeCache = {};
  function facade(W, H) {
    const key = `${W}x${H}`;
    if (facadeCache[key]) return facadeCache[key];
    const m = Math.min(W, H), cx = W / 2, cy = H / 2;
    let s = `<rect width="${f1(W)}" height="${f1(H)}" fill="${P.paper}"/>`;
    // esquinas: flor abanico que se abre hacia la esquina, con dos hojas a los lados
    // el abanico llega a 1,17·R de su base: la base se aleja del borde lo justo para que quepa entero
    const Rf = Math.min(W * .27, H * .25);
    const bx = Rf * 1.17 + 16, by = Rf * 1.17 + 16;
    [[bx, by, -45, P.dark], [W - bx, by, 45, P.red], [bx, H - by, -135, P.red], [W - bx, H - by, 135, P.dark]].forEach(([x, y, rot, col]) => {
      s += at(x, y, rot - 62, feather(Rf * .9, Rf * .26, P.green)) + at(x, y, rot + 62, at(0, 0, 0, `<g transform="scale(-1 1)">${feather(Rf * .9, Rf * .26, P.green)}</g>`));
      s += at(x, y, rot, fan(Rf, col));
    });
    // arriba y abajo, si hay espacio: margarita azul con hojas y volutas
    const Lb = m * .4, gap = cy - Lb;
    if (gap > m * .2) {
      const r = Math.min(m * .085, gap * .3);
      [[cy - Lb - gap * .45, 0], [cy + Lb + gap * .45, 180]].forEach(([y, rot]) => {
        s += at(cx, y, rot - 70, feather(r * 2.4, r * .7, P.dgreen)) + at(cx, y, rot + 70, `<g transform="scale(-1 1)">${feather(r * 2.4, r * .7, P.dgreen)}</g>`);
        s += at(cx - r * 2.2, y, rot, curl(r * 1.2, P.purple, true)) + at(cx + r * 2.2, y, rot, curl(r * 1.2, P.purple));
        s += at(cx, y, rot, daisy(r, P.blue, P.red));
      });
    }
    // detrás de la flor del centro: hojas de pluma en abanico y los cuatro pétalos azules en cruz
    const Lg = m * .36;
    [32, 58, 122, 148, 212, 238, 302, 328].forEach((a) => { s += at(cx, cy, a, feather(Lg, Lg * .27, P.dgreen)); });
    [0, 90, 180, 270].forEach((a) => { s += at(cx, cy, a, cpetal(Lb, Lb * .27, P.blue, { off: .3, h: .44 })); });
    // puntitos de pincel
    [[.12, .5], [.88, .5], [.5, .06], [.5, .94], [.3, .5], [.7, .5]].forEach(([x, y]) => { s += `<circle cx="${f1(W * x)}" cy="${f1(H * y)}" r="${f1(m * .011)}" fill="${P.maroon}"/>`; });
    // la flor del centro, partida entre las dos puertas
    s += at(cx, cy, 0, ringFlower(m * .19));
    // filete rojo interior
    s += `<rect x="7" y="7" width="${f1(W - 14)}" height="${f1(H - 14)}" fill="none" stroke="${P.red}" stroke-width="6"/>`;
    return (facadeCache[key] = s);
  }

  /* media puerta: muestra la mitad izquierda o derecha de la pintura del frente */
  function doorHalf(W, H, side) {
    W = Math.round(W); H = Math.round(H);
    const vb = side === "l" ? `0 0 ${f1(W / 2)} ${H}` : `${f1(W / 2)} 0 ${f1(W / 2)} ${H}`;
    return `<svg class="retablo-leaf-svg" viewBox="${vb}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${facade(W, H)}<path d="M${f1(W / 2)} 0V${H}" stroke="${P.dark}" stroke-width="2.5"/></svg>`;
  }

  /* cresta triangular: flor de anillos al centro y hojas de pluma oscuras y rojas a los lados */
  function crestF() {
    const half = at(366, 134, -98, feather(220, 50, P.dark))
      + at(362, 116, -68, cpetal(104, 30, P.red, { off: .25, h: .5 }))
      + at(372, 146, -122, feather(120, 30, P.dgreen))
      + at(200, 142, 0, daisy(20, P.blue, P.red));
    return `<svg class="retablo-crest-svg" viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M14 174L400 14L786 174Z" fill="${P.paper}" stroke="${P.red}" stroke-width="10" stroke-linejoin="round"/>
      <g>${half}</g><g transform="translate(800 0) scale(-1 1)">${half}</g>
      ${at(400, 54, 0, daisy(15, P.red, P.yellow))}
      ${at(400, 120, 0, ringFlower(44))}
    </svg>`;
  }

  /* cenefa (portadillas de capítulo e índice): 800 × 150 */
  function bandF() {
    const half = at(400, 75, -90, cpetal(250, 58, P.blue, { off: .32, h: .44 }))
      + at(400, 75, -74, feather(175, 40, P.dgreen)) + at(400, 75, -106, `<g transform="scale(-1 1)">${feather(175, 40, P.dgreen)}</g>`)
      + at(178, 36, 0, curl(30, P.purple, true)) + at(178, 114, 180, curl(30, P.purple))
      + at(90, 75, 0, daisy(30, P.red, P.yellow));
    return `<svg class="retablo-band" viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="794" height="144" rx="14" fill="${P.paper}" stroke="${P.red}" stroke-width="6"/>
      <g>${half}</g><g transform="translate(800 0) scale(-1 1)">${half}</g>
      ${at(400, 75, 0, ringFlower(60))}
    </svg>`;
  }

  /* florcita de cada piso del índice */
  function budF(i) {
    const pal = [[P.maroon, P.blue], [P.blue, P.red], [P.red, P.blue], [P.purple, P.orange], [P.dark, P.red], [P.orange, P.purple], [P.blue, P.magenta], [P.red, P.dgreen]][i % 8];
    return `<svg class="retablo-bud" viewBox="-30 -30 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${ringFlower(28, [[10, 1, .44, pal[0]], [10, .62, .44, pal[1]]])}</svg>`;
  }

  window.YACHASKA_RETABLO = {
    band, crest, bud, door, doorWide, facade, doorHalf, flower, rosette, petal, scroll, colors: C,
    flores: { cpetal, rpetal, feather, fan, ringFlower, daisy, curl, teeth, at, P }
  };
})();
