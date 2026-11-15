/* =========================================================================
   YACHASKA – "Lo que la Luna vio" · contenido del cuento
   Todo el texto vive aquí, separado del código.
   - t:      verso / texto de la escena por idioma
   - who:    quién habla (clave de VOICES)
   - fact:   dato NASA verificable { es, en, src, label }
   - bridge: puente andino / amazónico { es, en }
   Lenguas originarias: los textos qu / ay / cni / shp / agr son BORRADORES hechos
   con apoyo de IA y marcados así en la página. No se consideran finales hasta que
   los revise y grabe un hablante nativo. Si falta un texto, se muestra el castellano.
   ========================================================================= */
(function () {
  "use strict";

  const SRC = {
    moonFacts: "https://science.nasa.gov/moon/facts/",
    moon: "https://science.nasa.gov/moon/",
    apollo11: "https://www.nasa.gov/mission/apollo-11/",
    apollo17: "https://www.nasa.gov/mission/apollo-17/",
    lrv: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
    catalogue: "https://history.nasa.gov/FINAL%20Catalogue%20of%20Manmade%20Material%20on%20the%20Moon.pdf",
    lro: "https://science.nasa.gov/mission/lro/",
    voyager: "https://science.nasa.gov/mission/voyager/",
    golden: "https://science.nasa.gov/mission/voyager/golden-record/",
    greetings: "https://voyager.jpl.nasa.gov/golden-record/whats-on-the-record/greetings/",
    music: "https://voyager.jpl.nasa.gov/golden-record/whats-on-the-record/music/",
    spirit: "https://science.nasa.gov/mission/mer-spirit/",
    opportunity: "https://science.nasa.gov/mission/mer-opportunity/",
    ingenuity: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    perseverance: "https://science.nasa.gov/mission/mars-2020-perseverance/",
    artemis: "https://www.nasa.gov/artemis-accords/",
    lenguas: "https://bdpi.cultura.gob.pe/lenguas"
  };

  /* ---------- Quién habla ---------- */
  const VOICES = {
    killa:     { es: "Narra la Killa, la Luna",           en: "Told by Killa, the Moon",            qu: "Killa rimachkan",  color: "#c8ddf5" },
    abuela:    { es: "Habla la abuela",                   en: "Grandmother speaks",                 color: "#F3EEE4" },
    rover:     { es: "Habla el Rover Lunar de Apolo 17",  en: "The Apollo 17 Lunar Rover speaks",   color: "#cfd3da" },
    mirror:    { es: "Habla el espejo láser de Apolo 11", en: "The Apollo 11 laser mirror speaks",  color: "#7fe3d6" },
    record:    { es: "Habla el Disco de Oro de la Voyager", en: "The Voyager Golden Record speaks", color: "#F2B632" },
    spirit:    { es: "Habla Spirit, el rover de Marte",   en: "Spirit, the Mars rover, speaks",     color: "#FF9D6F" },
    ingenuity: { es: "Habla Ingenuity, el helicóptero de Marte", en: "Ingenuity, the Mars helicopter, speaks", color: "#ffc27a" }
  };

  /* ---------- Lenguas ---------- */
  const LANGS = [
    { code: "es",  name: "Castellano",     native: "Castellano",     speakers: null,      family: "Romance", status: "ok"   },
    { code: "en",  name: "English",        native: "English",        speakers: null,      family: "Germanic", status: "ok"  },
    { code: "qu",  name: "Quechua chanka", native: "Runasimi",       speakers: 3805531,   family: "Quechua", region: { es: "Andes y costa", en: "Andes and coast" }, status: "rev" },
    { code: "ay",  name: "Aimara",         native: "Aymar aru",      speakers: 450010,    family: "Aru",     region: { es: "Puno, Moquegua, Tacna", en: "Puno, Moquegua, Tacna" }, status: "next" },
    { code: "cni", name: "Asháninka",      native: "Asháninka",      speakers: 73567,     family: "Arawak",  region: { es: "Junín, Ucayali, Pasco, Huánuco", en: "Junín, Ucayali, Pasco, Huánuco" }, status: "next" },
    { code: "agr", name: "Awajún",         native: "Awajún chicham", speakers: 56584,     family: "Jíbaro",  region: { es: "Selva norte", en: "Northern rainforest" }, status: "next" },
    { code: "shp", name: "Shipibo-konibo", native: "Shipibo-konibo",       speakers: 34152,     family: "Pano",    region: { es: "Amazonía central", en: "Central Amazon" }, status: "next" }
  ];

  /* ---------- Textos de interfaz ---------- */
  const UI = {
    es: {
      title: "Lo que la Luna vio",
      kicker: "Un cuento para escuchar con el scroll",
      lede: "Los objetos que la NASA dejó en la Luna, en Marte y en el espacio profundo cobran vida y te cuentan su historia en primera persona. Los presenta la Killa, la Luna, a una niña de Huanta llamada Killari.",
      start: "Empezar el cuento",
      index: "Índice del cuento",
      meta: "8 capítulos · 56 escenas · unos 25 minutos",
      chooseLang: "Elige tu lengua",
      listen: "Escuchar", stop: "Detener", autoplay: "Narración automática",
      fact: "Dato NASA", bridge: "Puente andino", source: "Fuente",
      chapter: "Capítulo", scroll: "Desliza hacia abajo",
      night: "Modo noche", day: "Modo día",
      next: "Siguiente capítulo",
      qNotice: "Runasimi: borrador con apoyo de IA, pendiente de revisión y grabación por hablantes de quechua chanka.",
      nextNotice: "Esta lengua llega en la próxima fase, con un hablante nativo. Por ahora ves el castellano.",
      noAudioQu: "El audio en quechua aún no está grabado. Te lo leo en castellano.",
      noVoice: "Tu navegador no tiene voz para leer. Puedes leer el texto.",
      objects: "Los que se quedaron", objectsLede: "Toca un objeto para volver a su capítulo.",
      langsTitle: "Las lenguas de YACHASKA", langsLede: "Más de 4,4 millones de personas en el Perú tienen como lengua materna una de estas cinco lenguas originarias (INEI, Censo 2017).",
      thLang: "Lengua", thFamily: "Familia", thSpeakers: "Hablantes", thRegion: "Zona", thStatus: "Estado",
      st_ok: "Disponible", st_rev: "En revisión", st_next: "Próxima fase",
      sources: "Fuentes y datos NASA", about: "Sobre YACHASKA",
      aboutText: "YACHASKA (en quechua: «lo que se aprendió», «lo sabido») es un cuento web hecho en Ayacucho para el NASA Space Apps Challenge 2026, reto «Abandoned but not Forgotten». Funciona sin servidor, sin cookies y sin rastreo, para cargar rápido en celulares con poca señal.",
      ai: "Uso de inteligencia artificial: se usó IA como apoyo para programar y para redactar borradores en castellano, inglés y quechua. Todos los datos se verifican en fuentes NASA. Las versiones en quechua, aimara, asháninka, awajún y shipibo-konibo son borradores que revisarán hablantes nativos. Los audios en castellano e inglés usan voces neuronales de Microsoft; el audio en quechua usa la voz sintética abierta Meta MMS (quechua de Ayacucho) y se reemplazará por la grabación de un hablante. Las ilustraciones son SVG originales; las fotos son de la NASA (dominio público); no se usan logos de la NASA.",
      soundOn: "Con sonido", muted: "Sin sonido", stopAudio: "Detener audio",
      soundOnToast: "Narración activada: cada escena se lee sola.", mutedToast: "Sin sonido: puedes leer tranquilo. Toca «Escuchar» en una escena si quieres oírla.",
      tapToListen: "Toca la página o «Escuchar» para activar la narración.",
      cast: "Los protagonistas reales", castLede: "Estas son fotos reales de la NASA: las máquinas que se quedaron en la Luna, en Marte y en el espacio profundo.",
      specs: "Ficha técnica", photo: "Foto NASA", artist: "Ilustración NASA",
      timeline: "Línea de tiempo · 1969–2026", timelineLede: "Cómo llegaron estos objetos al espacio y cómo se quedaron.",
      heroAlt: "Ilustración del cuento: la Killa sobre Huanta, rodeada del rover, el espejo, la Voyager, Spirit e Ingenuity.",
      csv: "Descargar guion para traductores (CSV)",
      top: "Volver al inicio",
      status: "Estado hoy",
      body_luna: "Luna", body_marte: "Marte", body_espacio: "Espacio profundo", body_tierra: "Tierra",
      skip: "Saltar al cuento",
      pisos: "Elige un piso del retablo", pisosLede: "Un retablo ayacuchano guarda una historia en cada piso. Toca un piso para ir a esa historia, o empieza desde arriba.",
      prevPage: "Página anterior", nextPage: "Página siguiente", openBook: "Abrir el retablo", openHint: "Toca el pestillo dorado o abre las puertas con el dedo", autoPause: "Pausa", autoPlay: "Reproducir", showMenu: "Mostrar menú", closeSheet: "Cerrar", more: "ver más", rotateT: "Gira tu celular", rotateText: "El retablo y sus imágenes se ven mucho mejor en horizontal. Gíralo y vuelve a tocar el pestillo.", rotateGo: "Girar a horizontal", rotateSkip: "Seguir en vertical", readAll: "Toca el texto para leerlo completo",
      offline: "Guardar para usar sin internet", offBusy: "Guardando", offDone: "Guardado: funciona sin internet",
      offDoneToast: "Listo. El cuento y sus audios en esta lengua ya funcionan sin internet en este teléfono.",
      offFail: "No se pudo guardar todo. Inténtalo otra vez con mejor señal.",
      menuLang: "Cambiar lengua", menuTheme: "Cambiar entre noche y día"
    },
    en: {
      title: "What the Moon Saw",
      kicker: "A story you listen to as you scroll",
      lede: "The objects NASA left on the Moon, on Mars and in deep space come alive and tell you their own story. They are introduced by Killa, the Moon, to a girl from Huanta named Killari.",
      start: "Start the story",
      index: "Story contents",
      meta: "8 chapters · 56 scenes · about 25 minutes",
      chooseLang: "Choose your language",
      listen: "Listen", stop: "Stop", autoplay: "Auto narration",
      fact: "NASA fact", bridge: "Andean bridge", source: "Source",
      chapter: "Chapter", scroll: "Scroll down",
      night: "Night mode", day: "Day mode",
      next: "Next chapter",
      qNotice: "Runasimi: AI-assisted draft, pending review and recording by Chanka Quechua speakers.",
      nextNotice: "This language arrives in the next phase, with a native speaker. For now you see Spanish.",
      noAudioQu: "The Quechua audio is not recorded yet. I'll read it in Spanish.",
      noVoice: "Your browser has no reading voice. You can read the text.",
      objects: "The ones who stayed", objectsLede: "Tap an object to go back to its chapter.",
      langsTitle: "The languages of YACHASKA", langsLede: "Over 4.4 million people in Peru have one of these five Indigenous languages as their mother tongue (INEI, 2017 Census).",
      thLang: "Language", thFamily: "Family", thSpeakers: "Speakers", thRegion: "Region", thStatus: "Status",
      st_ok: "Available", st_rev: "In review", st_next: "Next phase",
      sources: "Sources and NASA data", about: "About YACHASKA",
      aboutText: "YACHASKA (Quechua for “what was learned”, “the known”) is a web story made in Ayacucho, Peru, for the 2026 NASA Space Apps Challenge, “Abandoned but not Forgotten”. It runs with no server, no cookies and no tracking, so it loads fast on phones with weak signal.",
      ai: "Use of AI: AI helped with coding and with drafting the Spanish, English and Quechua text. Every fact is checked against NASA sources. The Quechua, Aymara, Asháninka, Awajún and Shipibo-Konibo versions are drafts that native speakers will review. Spanish and English audio uses Microsoft neural voices; Quechua audio uses the open Meta MMS synthetic voice (Ayacucho Quechua) and will be replaced by a native speaker’s recording. Illustrations are original SVG; photos are NASA public-domain images; no NASA logos are used.",
      soundOn: "Sound on", muted: "Muted", stopAudio: "Stop audio",
      soundOnToast: "Narration on: each scene reads itself aloud.", mutedToast: "Muted: read at your own pace. Tap “Listen” on a scene to hear it.",
      tapToListen: "Tap the page or “Listen” to turn on the narration.",
      cast: "The real protagonists", castLede: "These are real NASA photos: the machines that stayed on the Moon, on Mars and in deep space.",
      specs: "Fact sheet", photo: "NASA photo", artist: "NASA illustration",
      timeline: "Timeline · 1969–2026", timelineLede: "How these objects reached space, and how they stayed.",
      heroAlt: "Story illustration: Killa the Moon over Huanta, surrounded by the rover, the mirror, Voyager, Spirit and Ingenuity.",
      csv: "Download script for translators (CSV)",
      top: "Back to top",
      status: "Status today",
      body_luna: "Moon", body_marte: "Mars", body_espacio: "Deep space", body_tierra: "Earth",
      skip: "Skip to the story",
      pisos: "Choose a floor of the retablo", pisosLede: "A retablo from Ayacucho keeps one story on each floor. Tap a floor to go to that story, or start from the top.",
      prevPage: "Previous page", nextPage: "Next page", openBook: "Open the retablo", openHint: "Tap the golden latch, or pull the doors open", autoPause: "Pause", autoPlay: "Play", showMenu: "Show menu", closeSheet: "Close", more: "see more", rotateT: "Turn your phone", rotateText: "The retablo and its pictures look much better sideways. Turn it and tap the latch again.", rotateGo: "Go landscape", rotateSkip: "Stay upright", readAll: "Tap the text to read it all",
      offline: "Save to use without internet", offBusy: "Saving", offDone: "Saved: works without internet",
      offDoneToast: "Done. The story and its audio in this language now work without internet on this phone.",
      offFail: "Could not save everything. Try again with a better signal.",
      menuLang: "Change language", menuTheme: "Switch night and day"
    },
    ay: {}, cni: {}, shp: {},
    qu: {
      title: "Killa rikusqan",
      listen: "Uyariy",
      chooseLang: "Simiykita akllay"
    }
  };

  /* ---------- El cuento ---------- */
  const CHAPTERS = [
    /* ================= PRÓLOGO ================= */
    {
      id: "huanta", scene: "huanta", body: "tierra", voice: "killa",
      // ilustraciones: assets/escenas/huanta-<paso>.webp · [x, y, zoom] = hacia dónde se acerca la cámara
      art: [[.5, .5, 1.06], [.72, .66, 1.18], [.6, .3, 1.14], [.66, .3, 1.14], [.72, .62, 1.2], [.45, .26, 1.12]],
      no: { es: "Prólogo", en: "Prologue" },
      title: { es: "Una noche en Huanta", en: "A night in Huanta" },
      teaser: { es: "Una niña, su abuela y una pregunta mirando al cielo.", en: "A girl, her grandmother and a question for the sky." },
      steps: [
        { t: { es: "Soy la Killa, la Luna. Hace miles de años miro los cerros de Huanta: el maíz que crece, el río que baja, las abuelas que cuentan historias.",
               en: "I am Killa, the Moon. For thousands of years I have watched the hills of Huanta: the corn growing, the river running, grandmothers telling stories." },
          fact: { es: "La Luna está, en promedio, a 384 400 km de la Tierra. Si pudieras ir en auto sin parar, tardarías unos cinco meses.", en: "The Moon is, on average, 384,400 km from Earth. Driving nonstop, you would need about five months to get there.", src: SRC.moonFacts, label: "NASA Science – Moon facts" } },
        { t: { es: "Esta noche, en un patio de tejas rojas, una abuela y su nieta Killari miran el cielo. Killari quiere decir «luz de luna». Por eso la quiero tanto.",
               en: "Tonight, in a yard under red tiles, a grandmother and her granddaughter Killari look up at the sky. Killari means “moonlight”. That is why I love her so." },
          bridge: { es: "En quechua, Killa es la Luna, Inti es el Sol y quyllur es la estrella. Killari es la luz de la Luna.", en: "In Quechua, Killa is the Moon, Inti is the Sun and quyllur is a star. Killari is the light of the Moon." } },
        { who: "abuela",
          t: { es: "La abuela alza su bastón. —Mira, Killari: ese es el Mayu, el río del cielo. Y en su parte oscura camina la llama Yacana con su cría.",
               en: "Grandmother raises her walking stick. “Look, Killari: that is the Mayu, the river of the sky. And in its dark part walks the llama Yacana with her baby.”" },
          bridge: { es: "Los pueblos andinos no solo ven figuras en las estrellas: también en las manchas oscuras de la Vía Láctea. Los ojos de la llama Yacana son dos estrellas muy brillantes, Alfa y Beta del Centauro.", en: "Andean peoples see figures not only in the stars but also in the dark patches of the Milky Way. The eyes of the llama Yacana are two very bright stars, Alpha and Beta Centauri." } },
        { t: { es: "Pero Killari está callada. En la escuela vio una foto extraña: huellas de botas sobre un polvo gris. Huellas sobre mí. ¿Quién las dejó?",
               en: "But Killari is quiet. At school she saw a strange photo: boot prints on grey dust. Footprints on me. Who left them?" },
          fact: { es: "Como en la Luna no hay viento ni lluvia, las huellas de los astronautas pueden durar muchísimo tiempo sin borrarse.", en: "Because the Moon has no wind or rain, the astronauts’ footprints can last a very long time without fading.", src: SRC.moon, label: "NASA Science – The Moon" } },
        { t: { es: "Al fin pregunta, en quechua: —¿Imataq hanaqpi kan? ¿Qué hay allá arriba? La abuela sonríe despacio. —Eso solo lo sabe la Killa, wawa. Ella lo ha visto todo.",
               en: "At last she asks in Quechua: “¿Imataq hanaqpi kan? What is up there?” Grandmother smiles slowly. “Only Killa knows, wawa. She has seen it all.”" },
          bridge: { es: "Wawa significa niña o niño pequeño. Hanaq pacha es el mundo de arriba: el cielo, en la forma andina de ver el universo.", en: "Wawa means little child. Hanaq pacha is the world above: the sky, in the Andean way of seeing the universe." } },
        { t: { es: "Y yo, que casi nunca hablo, decido responder. Te presentaré a los que vinieron de la Tierra y se quedaron. Escucha, Killari. Escucha tú también.",
               en: "And I, who almost never speak, decide to answer. I will introduce the ones who came from Earth and stayed. Listen, Killari. You listen too." } }
      ]
    },

    /* ================= I · LA KILLA ================= */
    {
      id: "killa", scene: "killa", body: "luna", voice: "killa",
      art: [[.45, .45, 1.1], [.5, .5, 1.08], [.55, .3, 1.1], [.65, .6, 1.18], [.6, .65, 1.15]],
      no: { es: "Capítulo I", en: "Chapter I" },
      title: { es: "Yo, la Killa", en: "I, Killa" },
      teaser: { es: "Cómo nació la Luna y quién la visitó por primera vez.", en: "How the Moon was born and who visited her first." },
      steps: [
        { t: { es: "Antes de los cerros y del maíz, yo ya estaba aquí. Los científicos creen que nací de un choque gigante contra la Tierra, hace 4500 millones de años.",
               en: "Before the hills and the corn, I was already here. Scientists think I was born from a giant crash into Earth, 4.5 billion years ago." },
          fact: { es: "La idea más aceptada es que la Luna se formó tras un gran choque entre la Tierra joven y un cuerpo llamado Theia. Es una teoría: los científicos siguen estudiándola.", en: "The leading idea is that the Moon formed after a giant collision between the young Earth and a body called Theia. It is a theory: scientists are still studying it.", src: SRC.moon, label: "NASA Science – The Moon" } },
        { t: { es: "Por eso la Tierra es mi hermana mayor. Giro a su alrededor, siempre con la misma cara, y subo y bajo sus mares como quien respira.",
               en: "That is why Earth is my big sister. I circle her, always showing the same face, and I raise and lower her seas like someone breathing." },
          fact: { es: "La Luna tarda unos 27 días en dar la vuelta a la Tierra y por eso siempre vemos la misma cara. Su gravedad produce las mareas de los océanos.", en: "The Moon takes about 27 days to orbit Earth, which is why we always see the same face. Its gravity causes the ocean tides.", src: SRC.moonFacts, label: "NASA Science – Moon facts" } },
        { t: { es: "En los Andes, mis fases eran el calendario. Mirándome, la gente sabía cuándo sembrar, cuándo cosechar y cuándo hacer fiesta. Yo era un reloj colgado en el cielo.",
               en: "In the Andes, my phases were the calendar. Watching me, people knew when to sow, when to harvest and when to celebrate. I was a clock hanging in the sky." },
          bridge: { es: "En muchas comunidades andinas todavía se mira la Luna para sembrar, podar o cortar madera. Es un saber que pasa de abuelas y abuelos a nietos.", en: "Many Andean communities still look at the Moon to sow, prune or cut wood. It is knowledge passed from grandparents to grandchildren." } },
        { t: { es: "Millones de años sin visitas. Hasta que, el 20 de julio de 1969, sentí algo nuevo: un pie. Un ser humano caminaba sobre mí.",
               en: "Millions of years without a visit. Until, on July 20, 1969, I felt something new: a foot. A human being was walking on me." },
          fact: { es: "Apolo 11 alunizó el 20 de julio de 1969. Entre 1969 y 1972, doce astronautas caminaron sobre la Luna en seis misiones.", en: "Apollo 11 landed on July 20, 1969. Between 1969 and 1972, twelve astronauts walked on the Moon over six missions.", src: SRC.apollo11, label: "NASA – Apollo 11" } },
        { t: { es: "Vinieron más. Se fueron… pero dejaron cientos de cosas. Algunos dicen que es basura. Yo digo que son visitantes que se quedaron. Escúchalos.",
               en: "More came. They left… but left hundreds of things behind. Some call it junk. I say they are visitors who stayed. Listen to them." },
          fact: { es: "La Oficina de Historia de la NASA tiene un catálogo de los materiales humanos que hay en la Luna. No los trata como basura, sino como artefactos: parte de la historia de la exploración.", en: "NASA’s History Office keeps a catalogue of human-made material on the Moon. It treats them not as trash but as artifacts: part of the history of exploration.", src: SRC.catalogue, label: "NASA History – Catalogue of Manmade Material on the Moon" } }
      ]
    },

    /* ================= II · ROVER LUNAR ================= */
    {
      id: "rover", scene: "rover", body: "luna", voice: "rover",
      art: [[.55, .6, 1.15], [.62, .55, 1.15], [.45, .6, 1.1], [.55, .6, 1.15], [.62, .7, 1.18], [.6, .6, 1.12], [.68, .35, 1.12], [.6, .55, 1.12]],
      no: { es: "Capítulo II", en: "Chapter II" },
      title: { es: "El carrito que eligió quedarse", en: "The cart that chose to stay" },
      teaser: { es: "El Rover Lunar de Apolo 17 cuenta por qué se quedó en la Luna.", en: "The Apollo 17 Lunar Rover tells why it stayed on the Moon." },
      status: { es: "Estacionado en el valle Taurus-Littrow desde 1972.", en: "Parked in the Taurus-Littrow valley since 1972." },
      steps: [
        { t: { es: "Hola, Killari. Soy el rover lunar de Apolo 17. Llegué en 1972, doblado como una hoja de papel. Gene y Harrison tiraron de unas cintas… y me desplegué.",
               en: "Hello, Killari. I am the Apollo 17 lunar rover. I arrived in 1972, folded like a sheet of paper. Gene and Harrison pulled some straps… and I unfolded." },
          fact: { es: "El Rover Lunar viajaba plegado dentro de un compartimento del módulo lunar y se desplegaba en la superficie. Apolo 17 alunizó en diciembre de 1972 con Eugene Cernan y Harrison Schmitt.", en: "The Lunar Roving Vehicle traveled folded inside a bay of the lunar module and unfolded on the surface. Apollo 17 landed in December 1972 with Eugene Cernan and Harrison Schmitt.", src: SRC.lrv, label: "NASA NSSDCA – Lunar Roving Vehicle" } },
        { t: { es: "En la Tierra peso 210 kilos; aquí, como 35. Mis ruedas no son de caucho: son de alambre tejido, como un awayu de metal.",
               en: "On Earth I weigh 210 kilos; here, about 35. My wheels are not rubber: they are woven wire, like a metal awayu." },
          fact: { es: "La gravedad de la Luna es cerca de un sexto de la terrestre. Las ruedas del rover eran de malla de acero tejida, con un motor eléctrico en cada una, y lo movían dos baterías de 36 voltios.", en: "The Moon’s gravity is about one sixth of Earth’s. The rover’s wheels were woven steel mesh with an electric motor in each, powered by two 36-volt batteries.", src: SRC.lrv, label: "NASA NSSDCA – Lunar Roving Vehicle" },
          bridge: { es: "Mis ruedas eran tejidas, como un awayu de alambre. En los Andes, tejer también es tecnología: un tejido guarda dibujos, historia y una forma de ver el mundo.", en: "My wheels were woven, like a wire awayu. In the Andes, weaving is technology too: a textile keeps patterns, history and a way of seeing the world." } },
        { t: { es: "Fui el último de tres hermanos. Con nosotros, los astronautas ya no caminaban despacito junto a su nave: ¡llegaban hasta las montañas!",
               en: "I was the last of three brothers. With us, astronauts no longer shuffled beside their ship: they drove all the way to the mountains!" },
          fact: { es: "Hubo tres rovers lunares, usados en Apolo 15 (1971), Apolo 16 y Apolo 17 (1972). Los tres siguen en la Luna.", en: "There were three lunar rovers, used on Apollo 15 (1971), Apollo 16 and Apollo 17 (1972). All three are still on the Moon.", src: SRC.lrv, label: "NASA NSSDCA – Lunar Roving Vehicle" } },
        { t: { es: "Un día se me rompió un guardabarros y nos llovió polvo encima. Gene lo arregló con cinta adhesiva y unos mapas doblados. ¡Puro ingenio!",
               en: "One day my fender broke and dust rained down on us. Gene fixed it with tape and some folded maps. Pure cleverness!" },
          fact: { es: "En Apolo 17, los astronautas repararon el guardabarros del rover con cinta adhesiva y mapas plastificados. El polvo lunar es fino, abrasivo y se pega a todo.", en: "On Apollo 17, the astronauts repaired the rover’s fender with duct tape and laminated maps. Lunar dust is fine, abrasive and sticks to everything.", src: SRC.apollo17, label: "NASA – Apollo 17" } },
        { t: { es: "Juntos rodamos 36 kilómetros por el valle de Taurus-Littrow. Harrison, el primer geólogo en la Luna, encontró algo increíble: suelo naranja, hecho de vidrio de volcanes antiguos.",
               en: "Together we rolled 36 kilometers across the Taurus-Littrow valley. Harrison, the first geologist on the Moon, found something amazing: orange soil, made of glass from ancient volcanoes." },
          fact: { es: "El suelo naranja de Apolo 17 resultó estar hecho de diminutas cuentas de vidrio volcánico. Mostró que la Luna tuvo erupciones volcánicas hace miles de millones de años.", en: "Apollo 17’s orange soil turned out to be made of tiny beads of volcanic glass. It showed the Moon had volcanic eruptions billions of years ago.", src: SRC.apollo17, label: "NASA – Apollo 17" } },
        { t: { es: "Llegó la hora de volver. La nave no podía llevarlo todo: cada kilo cuenta para despegar. Era yo… o las rocas. Y la Tierra esperaba las rocas.",
               en: "It was time to go home. The ship could not carry everything: every kilo counts at liftoff. It was me… or the rocks. And Earth was waiting for the rocks." },
          fact: { es: "Las misiones Apolo trajeron 382 kg de rocas y suelo lunar. Gracias a esas muestras sabemos cuántos años tiene la Luna y de qué está hecha.", en: "The Apollo missions brought back 382 kg of lunar rock and soil. Thanks to those samples we know how old the Moon is and what it is made of.", src: SRC.moon, label: "NASA Science – The Moon" },
          bridge: { es: "Como el arriero que deja parte de su carga en el camino para que la mula llegue al pueblo, el rover se quedó para que las rocas llegaran a casa. Es un poco como el ayni: das hoy para que otros reciban.", en: "Like the muleteer who leaves part of the load on the trail so the mule reaches the village, the rover stayed so the rocks could get home. It is a bit like ayni: you give today so others can receive." } },
        { t: { es: "Así que me quedé, con mi cámara mirando la nave. Gracias a mí, el mundo vio el despegue. Los vi irse. Nadie ha vuelto a caminar sobre la Luna.",
               en: "So I stayed, my camera facing the ship. Thanks to me, the world watched the liftoff. I watched them go. No one has walked on the Moon since." },
          fact: { es: "La cámara de TV del rover se controlaba desde la Tierra y filmó el despegue de Apolo 17. Apolo 17 fue la última misión en la que personas caminaron sobre la Luna.", en: "The rover’s TV camera was controlled from Earth and filmed the Apollo 17 liftoff. Apollo 17 was the last mission in which people walked on the Moon.", src: SRC.apollo17, label: "NASA – Apollo 17" } },
        { t: { es: "¿Triste? A veces. Pero las rocas llegaron a casa, y un satélite aún fotografía mis huellas. No soy basura, Killari. Soy la prueba de que alguien vino.",
               en: "Sad? Sometimes. But the rocks got home, and a satellite still photographs my tracks. I am not junk, Killari. I am the proof that someone came." },
          fact: { es: "La cámara del Lunar Reconnaissance Orbiter (LROC) fotografió los sitios Apolo desde la órbita: se ven los módulos, los rovers y hasta las huellas de las ruedas.", en: "The Lunar Reconnaissance Orbiter camera (LROC) photographed the Apollo sites from orbit: you can see the landers, the rovers and even the wheel tracks.", src: SRC.lro, label: "NASA Science – Lunar Reconnaissance Orbiter" } }
      ]
    },

    /* ================= III · ESPEJO LÁSER ================= */
    {
      id: "espejo", scene: "mirror", body: "luna", voice: "mirror",
      art: [[.6, .55, 1.08], [.5, .5, 1.04], [.5, .45, 1.04], [.5, .5, 1.03], [.55, .5, 1.06]],
      no: { es: "Capítulo III", en: "Chapter III" },
      title: { es: "El espejo que todavía responde", en: "The mirror that still answers" },
      teaser: { es: "Un panel de espejos de Apolo 11 que sigue trabajando más de 50 años después.", en: "A panel of mirrors from Apollo 11 still working over 50 years later." },
      status: { es: "Sigue trabajando: responde a los láseres de la Tierra.", en: "Still working: it answers lasers from Earth." },
      steps: [
        { t: { es: "No tengo ruedas ni motor. Soy un panel de cien prismas de cristal, como una maleta abierta mirando al cielo. Me dejó Apolo 11, en 1969.",
               en: "I have no wheels and no motor. I am a panel of one hundred glass prisms, like an open suitcase gazing at the sky. Apollo 11 left me in 1969." },
          fact: { es: "El experimento de Apolo 11 es un retrorreflector con 100 prismas de cuarzo. Apolo 14 y 15 dejaron otros; el de Apolo 15 tiene 300.", en: "The Apollo 11 experiment is a retroreflector with 100 fused-silica prisms. Apollo 14 and 15 left others; Apollo 15’s has 300.", src: SRC.apollo11, label: "NASA – Apollo 11" } },
        { t: { es: "Tengo un truco: toda luz que me toca, la devuelvo por el mismo camino. Como una pelota que lanzas a una esquina y vuelve a tus manos.",
               en: "I have a trick: any light that touches me, I send straight back the way it came. Like a ball thrown into a corner that comes back to your hands." } },
        { t: { es: "Desde la Tierra me disparan un láser. Viaja 384 000 kilómetros, me toca y regresa en dos segundos y medio. De billones de partículas de luz, vuelven unas pocas.",
               en: "From Earth they fire a laser at me. It travels 384,000 kilometers, touches me and returns in two and a half seconds. Of trillions of particles of light, a few come back." },
          fact: { es: "La luz viaja a casi 300 000 km por segundo, así que el viaje de ida y vuelta a la Luna dura unos 2,5 segundos. Por eso el regreso de solo unos pocos fotones basta para medir.", en: "Light travels at almost 300,000 km per second, so the round trip to the Moon takes about 2.5 seconds. Catching just a few returning photons is enough to measure.", src: SRC.moonFacts, label: "NASA Science – Moon facts" },
          bridge: { es: "En el Qhapaq Ñan, el gran camino inca, los chasquis corrían por relevos llevando mensajes de ida y vuelta. La luz del láser también es un chasqui: va hasta la Luna y trae la respuesta.", en: "On the Qhapaq Ñan, the great Inca road, chasqui runners carried messages back and forth in relays. The laser light is a chasqui too: it runs to the Moon and brings the answer home." } },
        { t: { es: "Con ese tiempo miden mi distancia al milímetro. Así descubrieron mi secreto: me alejo de la Tierra 3,8 centímetros cada año. Lo mismo que crecen tus uñas.",
               en: "With that time they measure my distance to the millimeter. That is how they found my secret: I drift 3.8 centimeters away from Earth every year. As much as your fingernails grow." },
          fact: { es: "Gracias a estas mediciones con láser sabemos que la Luna se aleja de la Tierra unos 3,8 cm por año.", en: "Thanks to these laser measurements we know the Moon is drifting away from Earth by about 3.8 cm per year.", src: SRC.moonFacts, label: "NASA Science – Moon facts" } },
        { t: { es: "Más de cincuenta años después sigo trabajando, sin baterías. Cada vez que llega la luz, respondo: «aquí estoy». Hay cosas que se quedan para seguir sirviendo.",
               en: "More than fifty years later I am still working, with no batteries. Every time the light arrives, I answer: “here I am”. Some things stay to keep helping." },
          fact: { es: "Los retrorreflectores de Apolo 11, 14 y 15 son de los pocos experimentos Apolo que todavía se usan hoy.", en: "The Apollo 11, 14 and 15 retroreflectors are among the few Apollo experiments still in use today.", src: SRC.apollo11, label: "NASA – Apollo 11" } }
      ]
    },

    /* ================= IV · VOYAGER Y EL DISCO DE ORO ================= */
    {
      id: "voyager", scene: "voyager", body: "espacio", voice: "record",
      no: { es: "Capítulo IV", en: "Chapter IV" },
      title: { es: "Una voz que se fue a las estrellas", en: "A voice that went to the stars" },
      teaser: { es: "El Disco de Oro de la Voyager lleva un saludo en quechua fuera del sistema solar.", en: "The Voyager Golden Record carries a Quechua greeting beyond the solar system." },
      status: { es: "Viajando por el espacio interestelar.", en: "Traveling through interstellar space." },
      steps: [
        { who: "killa",
          t: { es: "Ahora, alguien que nunca se quedó quieto. En 1977 vi pasar a dos naves que dejaban la Tierra para no volver. Se llamaban Voyager: viajeras.",
               en: "Now, someone who never stood still. In 1977 I watched two spacecraft pass by, leaving Earth never to return. Their name was Voyager: travelers." },
          fact: { es: "La Voyager 2 despegó el 20 de agosto de 1977 y la Voyager 1 el 5 de septiembre de 1977.", en: "Voyager 2 launched on August 20, 1977, and Voyager 1 on September 5, 1977.", src: SRC.voyager, label: "NASA Science – Voyager" } },
        { t: { es: "Hola, Killari. Viajo pegado a la Voyager 1, como una carta en un sobre. Soy un disco de cobre cubierto de oro. Mi gemelo va en la Voyager 2.",
               en: "Hello, Killari. I ride on Voyager 1, like a letter in an envelope. I am a copper disc covered in gold. My twin rides on Voyager 2." },
          fact: { es: "Cada Voyager lleva un disco fonográfico de cobre bañado en oro, con una aguja y las instrucciones para reproducirlo grabadas en su cubierta.", en: "Each Voyager carries a gold-plated copper phonograph record, with a stylus and instructions for playing it engraved on its cover.", src: SRC.golden, label: "NASA Science – The Golden Record" } },
        { t: { es: "En mis surcos guardo la Tierra: lluvia, viento, un trueno, un beso. Llevo música y saludos en 55 idiomas. Soy una carta para quien nos encuentre.",
               en: "In my grooves I keep the Earth: rain, wind, thunder, a kiss. I carry music and greetings in 55 languages. I am a letter for whoever finds us." },
          fact: { es: "El Disco de Oro contiene 116 imágenes, sonidos de la Tierra, unos 90 minutos de música de muchas culturas y saludos en 55 idiomas.", en: "The Golden Record holds 116 images, sounds of Earth, about 90 minutes of music from many cultures and greetings in 55 languages.", src: SRC.golden, label: "NASA Science – The Golden Record" } },
        { t: { es: "Y esta es mi parte favorita: una voz de tus montañas. Alguien habló en quechua: «Kay pachamamta niytapas maytapas rimapallasta runasimipi». Tu lengua, viajando hacia las estrellas.",
               en: "And this is my favorite part: a voice from your mountains. Someone spoke in Quechua: “Kay pachamamta niytapas maytapas rimapallasta runasimipi.” Your language, traveling toward the stars." },
          fact: { es: "El quechua es uno de los 55 idiomas de los saludos del Disco de Oro. El texto se muestra aquí tal como lo publica la NASA, sin corregirlo.", en: "Quechua is one of the 55 languages of the Golden Record greetings. The text is shown here exactly as NASA publishes it, uncorrected.", src: SRC.greetings, label: "NASA JPL – Golden Record greetings" },
          bridge: { es: "Runasimi quiere decir «la lengua de la gente». Es el nombre que el quechua se da a sí mismo.", en: "Runasimi means “the people’s language”. It is the name Quechua gives itself." } },
        { t: { es: "También llevo música del Perú: una canción de boda andina, antaras y tambor. Quien me escuche sabrá que en la Tierra hay gente que canta en su lengua.",
               en: "I also carry music from Peru: an Andean wedding song, panpipes and drum. Whoever hears me will know that on Earth people sing in their own language." },
          fact: { es: "La lista de música del Disco de Oro incluye dos piezas del Perú: una canción de boda y una pieza de antaras y tambor.", en: "The Golden Record music list includes two pieces from Peru: a wedding song and a panpipes-and-drum piece.", src: SRC.music, label: "NASA JPL – Golden Record music" },
          bridge: { es: "La antara es la flauta de pan andina, hecha de cañas de distinto largo. Se toca en fiestas desde hace siglos.", en: "The antara is the Andean panpipe, made of reeds of different lengths. It has been played at festivals for centuries." } },
        { t: { es: "Pasamos junto a Júpiter y Saturno: tormentas gigantes, anillos, volcanes vivos. Mi gemelo siguió más lejos: es la única nave que visitó Urano y Neptuno.",
               en: "We flew past Jupiter and Saturn: giant storms, rings, living volcanoes. My twin went farther: the only spacecraft ever to visit Uranus and Neptune." },
          fact: { es: "Las Voyager descubrieron volcanes activos en Ío, una luna de Júpiter. La Voyager 2 es la única nave que ha visitado Urano (1986) y Neptuno (1989).", en: "The Voyagers discovered active volcanoes on Io, a moon of Jupiter. Voyager 2 is the only spacecraft to have visited Uranus (1986) and Neptune (1989).", src: SRC.voyager, label: "NASA Science – Voyager" } },
        { t: { es: "En 1990, la Voyager 1 miró atrás y tomó una foto. La Tierra era un puntito azul, más pequeño que un grano de quinua. Ahí estaban tus abuelos.",
               en: "In 1990, Voyager 1 looked back and took a picture. Earth was a tiny blue dot, smaller than a grain of quinoa. Your grandparents were there." },
          fact: { es: "La foto «Un punto azul pálido» fue tomada por la Voyager 1 el 14 de febrero de 1990, a unos 6000 millones de kilómetros de la Tierra.", en: "The “Pale Blue Dot” image was taken by Voyager 1 on February 14, 1990, about 6 billion kilometers from Earth.", src: SRC.voyager, label: "NASA Science – Voyager" } },
        { t: { es: "En 2012 salimos de la burbuja del Sol. Nada humano llegó más lejos. La nave se apaga poco a poco… pero yo guardaré tu voz mil millones de años.",
               en: "In 2012 we left the Sun’s bubble. Nothing human has gone farther. The ship is slowly switching off… but I will keep your voice for a billion years." },
          fact: { es: "La Voyager 1 entró al espacio interestelar en 2012 y la Voyager 2 en 2018. Su energía viene del plutonio y disminuye cada año, por eso apagan instrumentos para ahorrar.", en: "Voyager 1 entered interstellar space in 2012 and Voyager 2 in 2018. Their power comes from plutonium and drops each year, so instruments are switched off to save energy.", src: SRC.voyager, label: "NASA Science – Voyager" } },
        { who: "killa",
          t: { es: "Hoy la señal de la Voyager tarda casi un día en llegar. Y en su disco viaja tu lengua, Killari: el quechua llegó al espacio antes que nosotras.",
               en: "Today Voyager’s signal takes almost a day to reach us. And your language rides on its record, Killari: Quechua reached space before us." },
          fact: { es: "Hacia finales de 2026, la Voyager 1 se acerca a un «día-luz» de distancia: su señal, que viaja a la velocidad de la luz, tarda cerca de 24 horas en llegar.", en: "Around late 2026, Voyager 1 nears one “light-day” away: its signal, traveling at the speed of light, takes close to 24 hours to arrive.", src: SRC.voyager, label: "NASA Science – Voyager" } }
      ]
    },

    /* ================= V · SPIRIT ================= */
    {
      id: "spirit", scene: "spirit", body: "marte", voice: "spirit",
      art: [[.55, .45, 1.05], [.5, .55, 1.08], [.55, .5, 1.05], [.6, .5, 1.08], [.5, .55, 1.05], [.5, .55, 1.06], [.6, .6, 1.1], [.62, .5, 1.1], [.55, .5, 1.06], [.6, .55, 1.06]],
      no: { es: "Capítulo V", en: "Chapter V" },
      title: { es: "Mi hermano rojo", en: "My red brother" },
      teaser: { es: "Spirit, el robot geólogo que iba a vivir 90 días y trabajó más de seis años en Marte.", en: "Spirit, the robot geologist meant to last 90 days, worked on Mars for over six years." },
      status: { es: "Quieto en «Troy», cráter Gusev, desde 2009.", en: "Resting at “Troy”, Gusev crater, since 2009." },
      steps: [
        { who: "killa",
          t: { es: "Ahora mira ese punto rojizo cerca del horizonte. Es Marte, mi primo lejano. Allá vive otro que se quedó: Spirit. Escúchalo con paciencia; habla bajito, cubierto de polvo.",
               en: "Now look at that reddish dot near the horizon. It is Mars, my faraway cousin. Another one who stayed lives there: Spirit. Listen patiently; he speaks softly, covered in dust." } },
        { t: { es: "Hola, Killari. Soy Spirit, un robot geólogo. En 2004 llegué a Marte envuelto en bolsas de aire, rebotando como una pelota gigante.",
               en: "Hello, Killari. I am Spirit, a robot geologist. In 2004 I reached Mars wrapped in airbags, bouncing like a giant ball." },
          fact: { es: "Spirit aterrizó en el cráter Gusev el 4 de enero de 2004 (hora universal). Usó paracaídas y bolsas de aire para amortiguar el golpe.", en: "Spirit landed in Gusev crater on January 4, 2004 (UTC). It used a parachute and airbags to cushion the impact.", src: SRC.spirit, label: "NASA Science – Spirit" } },
        { t: { es: "Me enviaron al cráter Gusev, donde quizá hubo un lago, a buscar huellas de agua antigua. Me dieron 90 días de misión. Solo noventa.",
               en: "They sent me to Gusev crater, where there may once have been a lake, to look for traces of ancient water. They gave me 90 days. Only ninety." },
          fact: { es: "La misión principal de Spirit estaba planeada para 90 soles (días marcianos). Un sol dura unas 24 horas y 40 minutos.", en: "Spirit’s prime mission was planned for 90 sols (Martian days). A sol lasts about 24 hours and 40 minutes.", src: SRC.spirit, label: "NASA Science – Spirit" } },
        { t: { es: "Pero no me rendí. Cuando el polvo me dejaba sin fuerza, pasaba un remolino y me barría como una escoba. ¡Gracias, viento de Marte! Rodé más de seis años.",
               en: "But I did not give up. When dust drained my strength, a whirlwind swept me clean like a broom. Thank you, wind of Mars! I rolled for over six years." },
          fact: { es: "Los remolinos de polvo de Marte limpiaron varias veces los paneles solares de Spirit, dándole energía para seguir trabajando mucho más de lo planeado.", en: "Martian dust devils cleaned Spirit’s solar panels several times, giving it power to keep working far longer than planned.", src: SRC.spirit, label: "NASA Science – Spirit" },
          bridge: { es: "En quechua, al viento se le llama wayra. En los Andes también se dice que el viento trae y se lleva: limpia las eras cuando se ventea el grano.", en: "In Quechua, the wind is called wayra. In the Andes people say the wind brings and takes away: it cleans the threshing floor when grain is winnowed." } },
        { t: { es: "Subí las colinas Columbia, llamadas así por siete astronautas. Leía las rocas como las páginas de un libro antiguo: cada capa, un capítulo de la historia de Marte.",
               en: "I climbed the Columbia Hills, named for seven astronauts. I read the rocks like the pages of an ancient book: each layer, a chapter of Mars’s history." },
          fact: { es: "Las colinas Columbia se nombraron en memoria de los siete astronautas del transbordador Columbia, perdido en 2003.", en: "The Columbia Hills were named in memory of the seven astronauts of the space shuttle Columbia, lost in 2003.", src: SRC.spirit, label: "NASA Science – Spirit" },
          bridge: { es: "En los Andes, los cerros son apus: guardianes con nombre propio, a los que se saluda y se respeta.", en: "In the Andes, mountains are apus: guardians with their own names, who are greeted and respected." } },
        { t: { es: "En 2006 se trabó una de mis ruedas y tuve que arrastrarla. Pero esa rueda rota rascó el suelo y destapó tierra blanca: ¡allí hubo aguas termales!",
               en: "In 2006 one of my wheels jammed and I had to drag it. But that broken wheel scraped the ground and uncovered white soil: hot springs had been there!" },
          fact: { es: "En 2007, la rueda trabada de Spirit dejó al descubierto un suelo muy rico en sílice. Los científicos creen que se formó con aguas termales o vapor volcánico: un ambiente que pudo ser favorable para la vida microscópica.", en: "In 2007, Spirit’s stuck wheel exposed soil very rich in silica. Scientists think it formed in hot springs or volcanic steam vents: an environment that could have been favorable for microbial life.", src: SRC.spirit, label: "NASA Science – Spirit" } },
        { t: { es: "En 2009 caí en una trampa de arena blanda. Mis ruedas giraban y giraban, y yo me hundía más. Lo intentaron todo durante meses. No pude salir.",
               en: "In 2009 I fell into a trap of soft sand. My wheels spun and spun, and I sank deeper. They tried everything for months. I could not get out." },
          fact: { es: "Spirit quedó atrapado en arena blanda en un lugar llamado «Troy» en 2009. En 2010 la NASA lo convirtió en una plataforma de investigación fija.", en: "Spirit got stuck in soft sand at a site called “Troy” in 2009. In 2010 NASA turned it into a stationary research platform.", src: SRC.spirit, label: "NASA Science – Spirit" } },
        { t: { es: "Me quedé quieto. Llegó el invierno, largo y helado, y mis paneles ya no alcanzaban el Sol. En marzo de 2010 envié mi último mensaje. Después, silencio.",
               en: "I stayed still. Winter came, long and freezing, and my panels could no longer reach the Sun. In March 2010 I sent my last message. Then, silence." },
          fact: { es: "La última comunicación de Spirit fue el 22 de marzo de 2010. La NASA terminó los intentos de contactarlo el 25 de mayo de 2011.", en: "Spirit’s last communication was on March 22, 2010. NASA ended efforts to contact it on May 25, 2011.", src: SRC.spirit, label: "NASA Science – Spirit" } },
        { t: { es: "Hoy el polvo me cubre poco a poco. Pero mi gemela Opportunity recorrió más de 45 kilómetros, ¡una maratón!, antes de dormirse en 2018. Cada metro fue ciencia.",
               en: "Today dust covers me little by little. But my twin Opportunity traveled more than 45 kilometers, a marathon!, before falling asleep in 2018. Every meter was science." },
          fact: { es: "Spirit recorrió 7,73 km. Su gemela Opportunity recorrió 45,16 km y envió su última señal en junio de 2018, durante una gran tormenta de polvo.", en: "Spirit drove 7.73 km. Its twin Opportunity drove 45.16 km and sent its last signal in June 2018, during a huge dust storm.", src: SRC.opportunity, label: "NASA Science – Opportunity" } },
        { who: "abuela",
          t: { es: "—Abuela, ¿quién cuida a Spirit? —Lo cuida la memoria, wawa —dice, mirando las chullpas, donde los antiguos descansan frente al cielo—. Lo que se recuerda, no muere.",
               en: "“Grandma, who looks after Spirit?” “Memory does, wawa,” she says, looking at the chullpas, where the ancestors rest facing the sky. “What is remembered does not die.”" },
          bridge: { es: "Las chullpas son torres funerarias de piedra o adobe de los Andes. Los arqueólogos las estudian y las cuidan como patrimonio. La NASA y los arqueólogos espaciales ven de la misma forma los objetos que quedaron en la Luna y en Marte.", en: "Chullpas are Andean funerary towers of stone or adobe. Archaeologists study and protect them as heritage. NASA and space archaeologists see the objects left on the Moon and Mars the same way." } }
      ]
    },

    /* ================= VI · INGENUITY ================= */
    {
      id: "ingenuity", scene: "ingenuity", body: "marte", voice: "ingenuity",
      art: [[.55, .65, 1.1], [.45, .6, 1.05], [.45, .5, 1.05], [.6, .55, 1.1], [.5, .5, 1.04], [.62, .5, 1.12], [.5, .5, 1.04]],
      no: { es: "Capítulo VI", en: "Chapter VI" },
      title: { es: "El picaflor de Marte", en: "The hummingbird of Mars" },
      teaser: { es: "Ingenuity, el pequeño helicóptero que hizo el primer vuelo en otro planeta.", en: "Ingenuity, the little helicopter that made the first flight on another planet." },
      status: { es: "Quieto en el cráter Jezero, guardando datos.", en: "Resting in Jezero crater, storing data." },
      steps: [
        { who: "killa",
          t: { es: "Pero no todas las historias de Marte son de espera. En 2021 llegó Perseverance, y bajo su panza, como un pollito bajo el ala, traía un helicóptero.",
               en: "But not every Mars story is about waiting. In 2021 Perseverance arrived, and under its belly, like a chick under a wing, it carried a helicopter." },
          fact: { es: "Perseverance aterrizó en el cráter Jezero el 18 de febrero de 2021, con el helicóptero Ingenuity sujeto bajo su chasis.", en: "Perseverance landed in Jezero crater on February 18, 2021, with the Ingenuity helicopter attached under its belly.", src: SRC.perseverance, label: "NASA Science – Perseverance" } },
        { t: { es: "¡Hola, Killari! Soy Ingenuity: «ingenio». Peso como una gallina grande y mis dos hélices giran al revés una de otra. Nadie sabía si podría volar.",
               en: "Hi, Killari! I am Ingenuity: cleverness. I weigh about as much as a big hen, and my two rotors spin in opposite directions. Nobody knew if I could fly." },
          fact: { es: "Ingenuity pesaba 1,8 kg y tenía dos rotores coaxiales que giraban en sentidos opuestos. Fue una demostración de tecnología.", en: "Ingenuity weighed 1.8 kg and had two coaxial rotors spinning in opposite directions. It was a technology demonstration.", src: SRC.ingenuity, label: "NASA Science – Ingenuity" } },
        { t: { es: "El aire de Marte es tan delgado como el de la Tierra a 30 kilómetros de altura. Por eso mis hélices giraban 2400 veces por minuto.",
               en: "Mars’s air is as thin as Earth’s 30 kilometers up. That is why my rotors spun 2,400 times a minute." },
          fact: { es: "La atmósfera de Marte tiene cerca del 1 % de la densidad de la terrestre. Los rotores de Ingenuity giraban a unas 2400 revoluciones por minuto.", en: "Mars’s atmosphere is about 1% as dense as Earth’s. Ingenuity’s rotors spun at about 2,400 revolutions per minute.", src: SRC.ingenuity, label: "NASA Science – Ingenuity" },
          bridge: { es: "En los Andes, el cóndor planea alto, donde el aire ya es delgado. Ingenuity tuvo que volar en un aire cien veces más delgado que el nuestro.", en: "In the Andes, the condor soars high, where the air is already thin. Ingenuity had to fly in air a hundred times thinner than ours." } },
        { t: { es: "El 19 de abril de 2021 me elevé tres metros, floté y bajé. ¡El primer vuelo con motor en otro planeta! Llevaba un pedacito del avión de los hermanos Wright.",
               en: "On April 19, 2021, I rose three meters, hovered and landed. The first powered flight on another planet! I carried a tiny piece of the Wright brothers’ airplane." },
          fact: { es: "El 19 de abril de 2021, Ingenuity hizo el primer vuelo controlado y con motor en otro planeta. Llevaba un trocito de tela del Flyer de los hermanos Wright (1903).", en: "On April 19, 2021, Ingenuity made the first powered, controlled flight on another planet. It carried a small swatch of fabric from the Wright brothers’ 1903 Flyer.", src: SRC.ingenuity, label: "NASA Science – Ingenuity" } },
        { t: { es: "Me pidieron cinco vuelos. Hice 72. Volé unos 17 kilómetros, explorando desde arriba para mostrarle el camino a Perseverance.",
               en: "They asked me for five flights. I made 72. I flew about 17 kilometers, scouting from above to show Perseverance the way." },
          fact: { es: "Ingenuity fue diseñado para hasta 5 vuelos de prueba. Hizo 72 vuelos en casi tres años y sirvió de explorador aéreo para Perseverance.", en: "Ingenuity was designed for up to 5 test flights. It made 72 flights over almost three years and served as an aerial scout for Perseverance.", src: SRC.ingenuity, label: "NASA Science – Ingenuity" },
          bridge: { es: "En quechua, al picaflor se le llama q'inti. Es pequeñito pero incansable. En el desierto de Nasca, hace siglos, se dibujó un picaflor gigante en el suelo, que solo se ve completo desde el aire.", en: "In Quechua, the hummingbird is called q'inti. It is tiny but tireless. Centuries ago, in the Nazca desert, a giant hummingbird was drawn on the ground; you can only see it whole from the air." } },
        { t: { es: "En enero de 2024, en mi vuelo 72, se rompió una de mis hélices. Ya no podría volar. Mis ingenieros se pusieron tristes. Yo también. Pero no me apagué.",
               en: "In January 2024, on my 72nd flight, one of my rotor blades broke. I would never fly again. My engineers were sad. So was I. But I did not switch off." },
          fact: { es: "En su vuelo 72, en enero de 2024, Ingenuity dañó sus palas. La NASA dio por terminada la misión el 25 de enero de 2024.", en: "On its 72nd flight, in January 2024, Ingenuity damaged its rotor blades. NASA ended the mission on January 25, 2024.", src: SRC.ingenuity, label: "NASA Science – Ingenuity" } },
        { t: { es: "Ahora soy una pequeña estación en el desierto. Cada día despierto, mido la temperatura y guardo los datos, como un quipu, para quien venga a leerlos.",
               en: "Now I am a little station in the desert. Each day I wake up, measure the temperature and keep the data, like a quipu, for whoever comes to read it." },
          fact: { es: "Tras el fin de su misión, Ingenuity quedó programado para seguir registrando datos, que podría guardar durante años por si alguien los recupera en el futuro.", en: "After its mission ended, Ingenuity was set to keep recording data, which it could store for years in case someone retrieves it in the future.", src: SRC.ingenuity, label: "NASA Science – Ingenuity" },
          bridge: { es: "El quipu es un sistema andino de cuerdas con nudos. Con él se guardaban cuentas y memorias del Tawantinsuyu. Los datos de Ingenuity son su propio quipu.", en: "The quipu is an Andean system of knotted cords. It kept records and memories of the Tawantinsuyu. Ingenuity’s data is its own quipu." } }
      ]
    },

    /* ================= EPÍLOGO ================= */
    {
      id: "memoria", scene: "epilogo", body: "tierra", voice: "killa",
      art: [[.5, .5, 1.05], [.55, .5, 1.08], [.5, .55, 1.08], [.52, .5, 1.06], [.35, .5, 1.1], [.55, .55, 1.06]],
      no: { es: "Epílogo", en: "Epilogue" },
      title: { es: "Lo que no se olvida", en: "What is not forgotten" },
      teaser: { es: "Killari cuenta las historias en las lenguas de sus amigos.", en: "Killari tells the stories in her friends’ languages." },
      steps: [
        { t: { es: "Ya ves, Killari. Sobre mí descansan carritos, espejos y huellas. En Marte duermen robots valientes. Más allá del Sol viaja una voz quechua. No son basura: son patrimonio.",
               en: "You see, Killari. Carts, mirrors and footprints rest on me. Brave robots sleep on Mars. Beyond the Sun, a Quechua voice keeps traveling. They are not junk: they are heritage." },
          fact: { es: "Arqueólogos y la NASA consideran estos objetos parte del patrimonio de la humanidad. Los sitios Apolo 11 y 17 tienen recomendaciones de la NASA para protegerlos.", en: "Archaeologists and NASA consider these objects part of humanity’s heritage. The Apollo 11 and 17 sites have NASA recommendations for their protection.", src: SRC.catalogue, label: "NASA History – Catalogue of Manmade Material on the Moon" } },
        { t: { es: "Esa noche Killari casi no durmió. Al día siguiente, en la escuela, contó estas historias en quechua, como su abuela. Sus compañeros la escuchaban con los ojos muy abiertos.",
               en: "That night Killari hardly slept. The next day at school she told these stories in Quechua, like her grandmother. Her classmates listened with wide-open eyes." } },
        { t: { es: "Llegaron sus amigos: una niña aimara, un niño asháninka con su cushma, un niño awajún con corona de plumas y una niña shipibo con su kené. —¿Nos lo cuentas en nuestra lengua?",
               en: "Her friends arrived: an Aymara girl, an Asháninka boy in his cushma, an Awajún boy with a feather crown and a Shipibo girl in her kené. “Will you tell it in our language?”" },
          bridge: { es: "En el Perú se hablan 48 lenguas originarias: 44 amazónicas y 4 andinas. El kené es el arte de los diseños shipibo-konibo, que muchos describen como cantos hechos dibujo.", en: "Peru has 48 Indigenous languages: 44 Amazonian and 4 Andean. Kené is the Shipibo-Konibo art of designs, often described as songs turned into drawings." } },
        { t: { es: "Y las historias viajaron en runasimi, aymar aru, asháninka, awajún y shipibo. Porque la ciencia no tiene un solo idioma: también se dice en tu lengua.",
               en: "And the stories traveled in runasimi, aymar aru, Asháninka, Awajún and Shipibo. Because science has no single language: it can be spoken in yours too." },
          fact: { es: "Según el Censo 2017 del INEI, más de 4,4 millones de personas en el Perú aprendieron a hablar en quechua, aimara, asháninka, awajún o shipibo-konibo.", en: "According to INEI’s 2017 Census, more than 4.4 million people in Peru learned to speak in Quechua, Aymara, Asháninka, Awajún or Shipibo-Konibo.", src: SRC.lenguas, label: "Ministerio de Cultura – Lenguas indígenas u originarias" } },
        { t: { es: "En 2024, el Perú firmó los Acuerdos Artemis. Algún día, una niña de los Andes caminará sobre mí. Tal vez venga de Huanta. Tal vez se llame Killari.",
               en: "In 2024, Peru signed the Artemis Accords. Someday, a girl from the Andes will walk on me. Maybe she will come from Huanta. Maybe her name will be Killari." },
          fact: { es: "El Perú firmó los Acuerdos Artemis el 30 de mayo de 2024. Son principios para explorar la Luna y el espacio de forma pacífica, y piden proteger el patrimonio espacial.", en: "Peru signed the Artemis Accords on May 30, 2024. They are principles for exploring the Moon and space peacefully, and they call for protecting space heritage.", src: SRC.artemis, label: "NASA – Artemis Accords" } },
        { t: { es: "Yo la estaré esperando, junto al carrito y a la primera huella. Y le diré lo que aprendí de los que se quedaron: lo que se cuenta en tu lengua, no se olvida.",
               en: "I will be waiting for her, beside the cart and the first footprint. And I will tell her what I learned from those who stayed: what is told in your language is never forgotten." } }
      ]
    }
  ];

  /* ---------- Galería de objetos (epílogo) ---------- */
  const OBJECTS = [
    { id: "rover",     chapter: "rover",     body: "luna",    year: "1972", name: { es: "Rover Lunar de Apolo 17", en: "Apollo 17 Lunar Rover" } },
    { id: "mirror",    chapter: "espejo",    body: "luna",    year: "1969", name: { es: "Espejo láser de Apolo 11", en: "Apollo 11 laser mirror" } },
    { id: "record",    chapter: "voyager",   body: "espacio", year: "1977", name: { es: "Disco de Oro · Voyager 1", en: "Golden Record · Voyager 1" } },
    { id: "spirit",    chapter: "spirit",    body: "marte",   year: "2004", name: { es: "Spirit (MER-A)", en: "Spirit (MER-A)" } },
    { id: "ingenuity", chapter: "ingenuity", body: "marte",   year: "2021", name: { es: "Ingenuity", en: "Ingenuity" } }
  ];


  /* ---------- Fotos reales NASA (dominio público) y fichas técnicas ---------- */
  const IMG = "assets/nasa/";
  const MEDIA = {
    huanta: [],
    killa: [
      { src: IMG + "as11-40-5878.jpg", id: "AS11-40-5878", kind: "photo",
        cap: { es: "Huella de bota de Apolo 11 en el polvo lunar, julio de 1969.", en: "An Apollo 11 bootprint in lunar dust, July 1969.", qu: "Apolo 11-pa botan yupi Killapa allpanpi, 1969 julio." } }
    ],
    rover: [
      { src: IMG + "as17-147-22526.jpg", id: "AS17-147-22526", kind: "photo",
        cap: { es: "Eugene Cernan maneja el Rover Lunar de Apolo 17, diciembre de 1972.", en: "Eugene Cernan drives the Apollo 17 Lunar Rover, December 1972.", qu: "Eugene Cernan Apolo 17-pa Killa roverninta purichin, 1972 diciembre." } },
      { src: IMG + "as15-86-11603.jpg", id: "AS15-86-11603", kind: "photo",
        cap: { es: "James Irwin junto al primer rover lunar, Apolo 15, 1971.", en: "James Irwin with the first lunar rover, Apollo 15, 1971.", qu: "James Irwin ñawpaq kaq Killa roverpa waqtanpi, Apolo 15, 1971." } }
    ],
    espejo: [
      { src: IMG + "PIA13037.jpg", id: "PIA13037", kind: "photo",
        cap: { es: "El sitio de Apolo 15 visto desde la órbita por LRO: se ven el retrorreflector (LRRR) y el rover (LRV1).", en: "The Apollo 15 site seen from orbit by LRO: the retroreflector (LRRR) and the rover (LRV1) are visible.", qu: "Apolo 15-pa maynin, LRO-pa órbitamanta qawasqan: retrorreflector (LRRR), rover (LRV1) rikukun." } }
    ],
    voyager: [
      { src: IMG + "PIA14113.jpg", id: "PIA14113", kind: "photo",
        cap: { es: "El Disco de Oro y la nave Voyager que lo lleva.", en: "The Golden Record and the Voyager spacecraft that carries it.", qu: "Quri Disco, apaq Voyager navepiwan." } },
      { src: IMG + "PIA23645.jpg", id: "PIA23645", kind: "photo",
        cap: { es: "«Un punto azul pálido»: la Tierra vista por Voyager 1 en 1990 (versión restaurada de 2020).", en: "“Pale Blue Dot”: Earth seen by Voyager 1 in 1990 (2020 restored version).", qu: "«Uchuy anqas puntu»: Voyager 1-pa 1990 watapi qawasqan Pacha (2020 allichasqa)." } }
    ],
    spirit: [
      { src: IMG + "PIA04413.jpg", id: "PIA04413", kind: "artist",
        cap: { es: "Ilustración de NASA/JPL de un rover gemelo Spirit/Opportunity en Marte.", en: "NASA/JPL illustration of a Spirit/Opportunity twin rover on Mars.", qu: "NASA/JPL-pa dibujon: Spirit/Opportunity kikinchay rover Martepi." } },
      { src: IMG + "PIA12007.jpg", id: "PIA12007", kind: "photo",
        cap: { es: "Foto real tomada por Spirit en 2009: sus ruedas hundiéndose en arena blanda, en «Troy».", en: "Real photo taken by Spirit in 2009: its wheels sinking into soft sand at “Troy”.", qu: "Spiritpa 2009 watapi hurqusqan chiqap foto: ruedankuna llampu aqupi chinkaykuchkaq, «Troy»-pi." } }
    ],
    ingenuity: [
      { src: IMG + "PIA24542.jpg", id: "PIA24542", kind: "photo",
        cap: { es: "Perseverance se toma una «selfie» con Ingenuity en Marte, abril de 2021.", en: "Perseverance takes a selfie with Ingenuity on Mars, April 2021.", qu: "Perseverance Ingenuitywan kuska fotokun Martepi, 2021 abril." } }
    ],
    memoria: [
      { src: IMG + "as15-86-11603.jpg", id: "AS15-86-11603", kind: "photo",
        cap: { es: "Lo que queda en la Luna no es basura: es memoria de la exploración humana.", en: "What remains on the Moon is not junk: it is the memory of human exploration.", qu: "Killapi qipakuqqa manam qupachu: runakunapa maskayninpa yuyayninmi." } }
    ]
  };

  const K = {
    region: { es: "Región", en: "Region", qu: "Suyu" }, alt: { es: "Altitud", en: "Altitude", qu: "Hanaq kaynin" },
    lang: { es: "Lengua", en: "Language", qu: "Simi" }, sky: { es: "Cielo andino", en: "Andean sky", qu: "Andes hanaq pacha" },
    dist: { es: "Distancia media", en: "Average distance", qu: "Chawpi karu kaynin" }, diam: { es: "Diámetro", en: "Diameter", qu: "Rakuy kaynin" },
    age: { es: "Edad", en: "Age", qu: "Watan" }, grav: { es: "Gravedad", en: "Gravity", qu: "Llasay" }, visit: { es: "Personas que la pisaron", en: "People who walked on it", qu: "Hawanpi puriq runakuna" },
    mission: { es: "Misión", en: "Mission", qu: "Misión" }, arrive: { es: "Llegada", en: "Arrival", qu: "Chayasqan" }, place: { es: "Lugar", en: "Location", qu: "Maypi" },
    mass: { es: "Masa", en: "Mass", qu: "Llasaynin" }, range: { es: "Recorrido", en: "Distance traveled", qu: "Purisqan" }, state: { es: "Estado", en: "Status", qu: "Imayna" },
    prisms: { es: "Prismas", en: "Prisms", qu: "Prismakuna" }, trip: { es: "Ida y vuelta del láser", en: "Laser round trip", qu: "Láserpa rispa kutimusqan" },
    launch: { es: "Lanzamiento", en: "Launch", qu: "Huqarikusqan" }, disc: { es: "Disco", en: "Record", qu: "Disco" }, content: { es: "Contenido", en: "Contents", qu: "Ukunpi" },
    inter: { es: "Espacio interestelar", en: "Interstellar space", qu: "Quyllur chawpin pacha" }, planned: { es: "Misión planeada", en: "Planned mission", qu: "Yuyaykusqa misión" },
    last: { es: "Última señal", en: "Last signal", qu: "Qipa señal" }, flights: { es: "Vuelos", en: "Flights", qu: "Pawaykuna" }, end: { es: "Fin de misión", en: "Mission end", qu: "Misión tukukuynin" },
    accords: { es: "Acuerdos Artemis", en: "Artemis Accords", qu: "Artemis Rimanakuy" }, langs: { es: "Lenguas originarias del Perú", en: "Indigenous languages of Peru", qu: "Perúpa ñawpa siminkuna" },
    objs: { es: "Objetos humanos en la Luna", en: "Human objects on the Moon", qu: "Killapi runapa imankuna" }
  };
  const v3 = (es, en, qu) => ({ es, en, qu: qu || es });
  const SPECS = {
    huanta: [[K.region, "Ayacucho, Perú"], [K.alt, "≈ 2600 m"], [K.lang, v3("Quechua chanka y castellano", "Chanka Quechua and Spanish", "Runasimi chanka, castellano")], [K.sky, v3("Mayu (Vía Láctea), llama Yacana", "Mayu (Milky Way), Yacana llama", "Mayu, Yacana llama")]],
    killa: [[K.dist, "384 400 km"], [K.diam, "3475 km"], [K.age, v3("≈ 4500 millones de años", "≈ 4.5 billion years", "≈ 4500 hunu wata")], [K.grav, v3("1/6 de la Tierra", "1/6 of Earth’s", "Pachapa 1/6 rakin")], [K.visit, v3("12 astronautas (1969–1972)", "12 astronauts (1969–1972)", "12 astronautakuna (1969–1972)")]],
    rover: [[K.mission, "Apollo 17 · NASA"], [K.arrive, v3("11 dic. 1972", "Dec 11, 1972", "1972 diciembre 11")], [K.place, v3("Valle Taurus-Littrow", "Taurus-Littrow valley", "Taurus-Littrow qichwa")], [K.mass, "≈ 210 kg"], [K.range, "≈ 36 km"], [K.state, v3("Estacionado en la Luna", "Parked on the Moon", "Killapi sayachkan")]],
    espejo: [[K.mission, "Apollo 11 · NASA"], [K.arrive, v3("Julio de 1969", "July 1969", "1969 julio")], [K.place, v3("Mar de la Tranquilidad", "Sea of Tranquility", "Mar de la Tranquilidad")], [K.prisms, "100"], [K.trip, "≈ 2,5 s"], [K.state, v3("Sigue en uso", "Still in use", "Llamkachkanraq")]],
    voyager: [[K.launch, v3("Voyager 1: 5 sep. 1977", "Voyager 1: Sep 5, 1977", "Voyager 1: 1977 septiembre 5")], [K.disc, v3("Cobre bañado en oro, 30 cm", "Gold-plated copper, 30 cm", "Quriwan qatasqa cobre, 30 cm")], [K.content, v3("116 imágenes · 55 idiomas · ≈ 90 min de música", "116 images · 55 languages · ≈ 90 min of music", "116 rikchay · 55 simi · ≈ 90 min taki")], [K.inter, v3("Voyager 1: 2012 · Voyager 2: 2018", "Voyager 1: 2012 · Voyager 2: 2018", "Voyager 1: 2012 · Voyager 2: 2018")], [K.state, v3("Viajando · ≈ 1 día-luz (2026)", "Traveling · ≈ 1 light-day (2026)", "Purichkan · ≈ 1 achki punchaw (2026)")]],
    spirit: [[K.mission, "MER-A · NASA/JPL"], [K.arrive, v3("4 ene. 2004", "Jan 4, 2004", "2004 enero 4")], [K.place, v3("Cráter Gusev, Marte", "Gusev crater, Mars", "Gusev cráter, Marte")], [K.mass, "185 kg"], [K.planned, v3("90 soles", "90 sols", "90 sol")], [K.range, "7,73 km"], [K.last, v3("22 mar. 2010", "Mar 22, 2010", "2010 marzo 22")]],
    ingenuity: [[K.mission, "Mars 2020 · NASA/JPL"], [K.arrive, v3("18 feb. 2021", "Feb 18, 2021", "2021 febrero 18")], [K.place, v3("Cráter Jezero, Marte", "Jezero crater, Mars", "Jezero cráter, Marte")], [K.mass, "1,8 kg"], [K.flights, v3("72 (planeados: 5)", "72 (planned: 5)", "72 (yuyaykusqa: 5)")], [K.range, "≈ 17 km"], [K.end, v3("25 ene. 2024", "Jan 25, 2024", "2024 enero 25")]],
    memoria: [[K.objs, v3("Cientos de artefactos", "Hundreds of artifacts", "Pachak pachak artefacto")], [K.accords, v3("Perú: 30 may. 2024 (país n.º 41)", "Peru: May 30, 2024 (41st country)", "Perú: 2024 mayo 30 (41 kaq suyu)")], [K.langs, "48"]]
  };

  const TIMELINE = [
    { y: "1969", body: "luna", t: v3("Apolo 11: primera huella humana y el espejo láser.", "Apollo 11: first human footprint and the laser mirror.", "Apolo 11: ñawpaq kaq runa yupi, láser rirpupas.") },
    { y: "1971", body: "luna", t: v3("Apolo 15 estrena el primer rover lunar.", "Apollo 15 debuts the first lunar rover.", "Apolo 15 ñawpaq kaq Killa roverta purichin.") },
    { y: "1972", body: "luna", t: v3("Apolo 17: el último rover se queda en la Luna.", "Apollo 17: the last rover stays on the Moon.", "Apolo 17: qipa kaq rover Killapi qipakun.") },
    { y: "1977", body: "espacio", t: v3("Despegan Voyager 1 y 2 con el Disco de Oro y el saludo en quechua.", "Voyager 1 and 2 launch with the Golden Record and the Quechua greeting.", "Voyager 1, 2 huqarikunku Quri Discowan, runasimi napaykuywanpas.") },
    { y: "1990", body: "espacio", t: v3("Voyager 1 fotografía «un punto azul pálido».", "Voyager 1 photographs the “Pale Blue Dot”.", "Voyager 1 «uchuy anqas puntu»-ta fotografian.") },
    { y: "2004", body: "marte", t: v3("Spirit y Opportunity aterrizan en Marte.", "Spirit and Opportunity land on Mars.", "Spirit, Opportunitypas Marteman chayanku.") },
    { y: "2010", body: "marte", t: v3("Última señal de Spirit, atrapado en «Troy».", "Spirit’s last signal, stuck at “Troy”.", "Spiritpa qipa señalnin, «Troy»-pi hapisqa.") },
    { y: "2012", body: "espacio", t: v3("Voyager 1 entra al espacio interestelar.", "Voyager 1 enters interstellar space.", "Voyager 1 quyllur chawpin pachaman yaykun.") },
    { y: "2018", body: "marte", t: v3("Opportunity se duerme tras una tormenta de polvo.", "Opportunity falls silent after a dust storm.", "Opportunity puñun allpa tormenta qipata.") },
    { y: "2021", body: "marte", t: v3("Ingenuity hace el primer vuelo en otro planeta.", "Ingenuity makes the first flight on another planet.", "Ingenuity huk planetapi ñawpaq kaq pawayta ruwan.") },
    { y: "2024", body: "tierra", t: v3("Fin de Ingenuity. El Perú firma los Acuerdos Artemis.", "Ingenuity’s mission ends. Peru signs the Artemis Accords.", "Ingenuity tukukun. Perú Artemis Rimanakuyta firman.") },
    { y: "2026", body: "espacio", t: v3("Voyager 1 se acerca a un día-luz de la Tierra.", "Voyager 1 nears one light-day from Earth.", "Voyager 1 Pachamanta huk achki punchawman asuykun.") }
  ];

  CHAPTERS.forEach((ch) => { ch.media = MEDIA[ch.id] || []; ch.specs = (SPECS[ch.id] || []).map(([k, v]) => ({ k, v: typeof v === "string" ? { es: v, en: v, qu: v } : v })); });

  /* Agrega una lengua: steps = [{t,f,b}] o [t, f, b] */
  function addLang(code, d) {
    UI[code] = Object.assign(UI[code] || {}, d.ui || {});
    Object.keys(d.voices || {}).forEach((k) => { if (VOICES[k]) VOICES[k][code] = d.voices[k]; });
    CHAPTERS.forEach((ch) => {
      const q = d.ch && d.ch[ch.id];
      if (!q) return;
      if (q.no) ch.no[code] = q.no;
      if (q.title) ch.title[code] = q.title;
      if (q.teaser) ch.teaser[code] = q.teaser;
      if (ch.status && q.status) ch.status[code] = q.status;
      ch.steps.forEach((st, i) => {
        let x = q.steps && q.steps[i];
        if (!x) return;
        if (Array.isArray(x)) x = { t: x[0], f: x[1], b: x[2] };
        if (x.t) st.t[code] = x.t;
        if (st.fact && x.f) st.fact[code] = x.f;
        if (st.bridge && x.b) st.bridge[code] = x.b;
      });
    });
    OBJECTS.forEach((o) => { if (d.objects && d.objects[o.id]) o.name[code] = d.objects[o.id]; });
    LANGS.forEach((l) => { if (l.region && d.regions && d.regions[l.code]) l.region[code] = d.regions[l.code]; });
    const L = LANGS.find((l) => l.code === code);
    if (L && d.status) L.status = d.status;
  }

  window.YACHASKA = { SRC, VOICES, LANGS, UI, CHAPTERS, OBJECTS, TIMELINE, addLang };
})();
