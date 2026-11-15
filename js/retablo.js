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

  window.YACHASKA_RETABLO = { band, crest, door, doorWide, bud, flower, rosette, petal, scroll, colors: C };
})();
