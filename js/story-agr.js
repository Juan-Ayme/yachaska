/* =========================================================================
   YACHASKA – awajún chicham (jíbaro, selva norte del Perú)
   BORRADOR hecho con apoyo de IA, de BAJA CONFIANZA: el awajún tiene muy
   pocos textos de referencia y este borrador tiene errores probables.
   Un hablante nativo debe corregirlo y grabarlo antes de publicarlo como
   final. Los términos técnicos van como préstamos del castellano.
   Pasos: [texto, dato NASA, puente]
   ========================================================================= */
(function () {
  "use strict";
  window.YACHASKA.addLang("agr", {
    status: "rev",
    ui: {
      title: "Nantu wainkamu",
      kicker: "Scroll juwakbau chicham",
      lede: "NASA Nantunum, Martenum, nayaimpinum ukukbau ajutai chicham taji. Nantu Killari nuwa uchijai chichaku, Huanta nugkanmaya.",
      start: "Chicham nagkamawarum", index: "Chicham",
      meta: "8 capítulo · 56 escena · 25 minuto",
      chooseLang: "Chichamjum shiikrum", listen: "Antukta", stop: "Ukuktá", autoplay: "Antuktin",
      fact: "NASA unuimatmau", bridge: "Andes chaka", source: "Fuente",
      scroll: "Juwakta", night: "Kashi", day: "Tsawai",
      qNotice: "Awajún: borrador con apoyo de IA, de baja confianza y con errores probables. Lo debe corregir y grabar un hablante nativo awajún. · AI-assisted, low-confidence draft pending a native speaker.",
      noAudioQu: "Awajún audio atsawai. Castellano chichamjain.",
      objects: "Ukukbau", objectsLede: "Shiikrum, capítulonum taarum.",
      langsTitle: "YACHASKA chichamjin", langsLede: "Perú: 4,4 millón aents nunui chichamjai chichaku (INEI, Censo 2017).",
      thLang: "Chicham", thFamily: "Familia", thSpeakers: "Chichakbau", thRegion: "Nugka", thStatus: "Estado",
      st_ok: "Pegkeg", st_rev: "Iimsamu", st_next: "Nuigtushkam",
      top: "Nagkamamunum", status: "Yamai",
      body_luna: "Nantu", body_marte: "Marte", body_espacio: "Nayaim", body_tierra: "Nugka",
      cast: "NASA foto", castLede: "Juu NASA foto: máquina Nantunum, Martenum, nayaimpinum ukukbau.",
      specs: "Ficha", photo: "NASA foto", artist: "NASA dibujo",
      timeline: "Timeline · 1969–2026", timelineLede: "Wajupa máquina nayaimpinum wajakui.",
      menuLang: "Chicham", menuTheme: "Kashi / tsawai"
    },
    voices: {
      killa: "Nantu chichaku", abuela: "Dukug chichaku", rover: "Apolo 17 rover chichaku",
      mirror: "Apolo 11 espejo chichaku", record: "Voyager Disco de Oro chichaku",
      spirit: "Spirit, Marte rover, chichaku", ingenuity: "Ingenuity, Marte helicóptero, chichaku"
    },
    ch: {
      huanta: { no: "Nagkamamu", title: "Huantanum makichik kashi", teaser: "Nuwa uchi, dukuji, nayaimpinum inimmau.",
        steps: [
          ["Wii Nantujai. Yaunchuk Huanta muunin wainkajai. Shaa wainkajai, entsa wainkajai, dukug uchijiai chichakui kashin.", "Nantu: 384 400 kilómetro nugkanmaya."],
          ["Yamai kashi, jea kapantu. Dukug, Killari aidaujai, pujuawai. Killari: «Nantu tsawantai». Wii Killarin anentaimjai.", "", "Quechua: Killa = Nantu; Inti = Etsa; quyllur = Yaa."],
          ["Dukug tawai: —Wainkata, Killari: Mayu, nayaimpinum entsa. Yacana, llama baikua. Yaa tsawanmaknum, ajakta.", "", "Andes aents nayaimpinum baikua wainkajui: llama Yacana."],
          ["Killari dekau Mayu, Yacana, Etsa. Escuelanum foto wainkamui: bota nawe Nantunum. Wii nawe. Killari chichamtsui, anentaimui.", "Nantunum dase atsawai, yumi atsawai: nawe ukuawai."],
          ["Killari dukujin inimui quechuajai: —¿Imataq hanaqpi kan? ¿Wajig nayaimpinum ainawa? Dukug dusei. —Nantu dekau, uchi.", "", "Wawa (quechua) = uchi. Hanaq pacha = nayaim."],
          ["Wii, chichamtsuk, wainkamjun chichastatjai. Nugkanmaya ukukbau chichastatjai. Nunisha chichaku. Antukta, Killari. Ame antukta."]
        ] },
      killa: { no: "Capítulo I", title: "Wii, Nantu", teaser: "Wajupa Nantu akiinaku.",
        steps: [
          ["Muun atsakui, shaa atsakui, wii pujamjai. Unuimatin taji: 4500 millón año, Nugka Theiajai tupikawai. Nunin akiinajai.", "Theia: teoría NASA."],
          ["Nugka wii umaig. Wii Nugkan winiajai. Entsa wii juwajai.", "27 tsawan Nantu Nugkan."],
          ["Andes aents wii wainkajui. Wii ajakbau. Wii calendario nayaimpinum.", "", "Andes aents Nantun wainkajui ajaktasa."],
          ["Atsawai yaunchuk. 1969, 20 julio: aents nawe Nantunum.", "Apolo 11: 20 julio 1969. 12 astronauta Nantunum."],
          ["Kuashat winiawai. Ukukbau. «Basura» tajui. Wii: ukukbau. Chichaku.", "NASA: catálogo artefacto. Basura atsawai."]
        ] },
      rover: { no: "Capítulo II", title: "Ukuamu carrito", teaser: "Apolo 17 rover chichaku.", status: "Taurus-Littrow, 1972.",
        steps: [
          ["Pujamek, Killari. Wii rover, carrito electricidad. Módulo Apolo 17 aidaujai. Diciembre 1972. Gene, Harrison wii ajuawaju.", "Rover lunar. Apolo 17: Cernan, Schmitt."],
          ["Wii uunchauwaitjai. Nugkanum 210 kilo, Nantunum 35 kilo. 4 rueda alambre. Motor, batería.", "Gravedad 1/6. 36 voltio batería.", "Rueda: tsatsa awajún aidauk takamaji."],
          ["Yatsug: Apolo 15, Apolo 16. Wii 3. Astronauta muunnum wegaju, kaya egakaju.", "3 rover: 1971, 1972."],
          ["Guardabarros pakuamui. Gene: cinta, mapa. ¡Pegkeg dekau!", "Apolo 17: cinta, mapa."],
          ["36 kilómetro wegajai. Harrison geólogo. Nugka naranja: volcán.", "Vidrio volcánico."],
          ["Taatasa: rover ¿kaya? Kaya Nugkanum wegawai.", "382 kilo kaya.", "Ayni (quechua): makichik ukuawai, dita jukitasa."],
          ["Wii ukuajai. Cámara wainkamui nave wegakui. Nugkanum wainkaju. Atsawai Nantunum.", "Cámara: Apolo 17. Apolo 17 ukuamu."],
          ["¿Wii kajeka? Makichik. Kaya Nugkanum jegawai. NASA satélite wii wainkawai: rueda nawe. Basura atsawajai wii, Killari.", "LROC foto: rover, nawe."]
        ] },
      espejo: { no: "Capítulo III", title: "Espejo chichaku", teaser: "Espejo Apolo 11, 50 año.", status: "Yamai takau.",
        steps: [
          ["Wii wetsujai. Rueda atsawai. Wii panel, 100 prisma. Apolo 11 ukuawaju 1969. Maleta, nayaim wainkau.", "Apolo 11: 100 prisma. Apolo 15: 300."],
          ["Prisma retrorreflector: tsawantai wii jegaku, wii awajai. Pelota."],
          ["Observatorio: láser. 384 000 kilómetro, taawai. 2,5 segundo.", "300 000 km segundo.", "Chaski (quechua) chicham jukiu. Láser chaski."],
          ["Unuimatin: 3,8 centímetro año wii wegajai.", "3,8 cm año."],
          ["50 año, wii takaajai. Batería atsawai. «Wii juu pujajai». Killari, ukukbau takaku.", "Apolo 11, 14, 15: yamai."]
        ] },
      voyager: { no: "Capítulo IV", title: "Chicham yaanum wegamu", teaser: "Disco de Oro: quechua chicham nayaimpinum.", status: "Yaanum weu.",
        steps: [
          ["1977 wii wainkajai 2 nave: Voyager. Taatsui.", "Voyager 2: 20 agosto 1977. Voyager 1: 5 septiembre 1977."],
          ["Pujamek, Killari. Wii Disco de Oro, Voyager 1. Cobre, oro, 30 centímetro. Yatsuj Voyager 2.", "Disco de Oro: aguja."],
          ["Yumi, dase, ipiak, 116 imagen, 90 minuto música, 55 chicham. Wii carta.", "116 imagen, 55 chicham."],
          ["Quechua: «Kay pachamamta niytapas maytapas rimapallasta runasimipi». Nugka chicham yaanum.", "Quechua: 1 chicham 55.", "Runasimi: aents chichamji (quechua)."],
          ["Música Perú: casarakuy, antara. Antukbau dekatatui: muun, aents chicham.", "2 música Perú.", "Antara: zampoña."],
          ["1979 Júpiter, 1980 Saturno. Yatsuj: Urano, Neptuno.", "Ío volcán. Voyager 2: 1986, 1989."],
          ["1990 Voyager 1 Nugkan wainkamui: punto azul. Aents mash pujau.", "Pale Blue Dot: 14 febrero 1990."],
          ["2012: yaanum. Energía atsawai. Wii: 1000 millón año.", "Voyager 1 2012, Voyager 2 2018."],
          ["Yamai kashi, Voyager 1 makichik tsawan. Quechua chicham nayaimpinum.", "2026: 24 hora."]
        ] },
      spirit: { no: "Capítulo V", title: "Yatsuj kapantu", teaser: "Spirit, robot, 6 año Martenum.", status: "«Troy», Gusev, 2009.",
        steps: [
          ["Wainkata kapantu: Marte. Spirit pujawai. Antukta."],
          ["Pujamek, Killari. Wii Spirit, robot. 6 rueda, cámara. 2004 enero Marte, pelota.", "Spirit: 4 enero 2004, Gusev."],
          ["Gusev: entsa yaunchuk. 90 tsawan.", "90 sol."],
          ["Nugka panel. Dase wii ishamjui. 6 año wegajai.", "Dust devil: dase.", "Dase (awajún) = wayra (quechua)."],
          ["Muun Columbia: 7 astronauta. Kaya wainkajai.", "Columbia 2003.", "Muun: apu (quechua)."],
          ["2006 rueda. Nugka puju: sílice. Entsa yaunchuk.", "2007 sílice."],
          ["2009 nugka. Wii wetsujai. Ingeniero.", "Troy 2009."],
          ["Kashi, tsetsek. 22 marzo 2010 chichamjai. Atsawai.", "22 marzo 2010. 25 mayo 2011."],
          ["Nugka yamai. Opportunity, umaj: 45 kilómetro. Wii 8.", "7,73 km. Opportunity 45,16 km, 2018."],
          ["Killari dukujin inimui: —¿Ya Spiritan wainkawa? Dukug: chullpa. —Anentaimtai, uchi. Jakatsui.", "", "Chullpa (quechua): Andes patrimonio."]
        ] },
      ingenuity: { no: "Capítulo VI", title: "Martenum jempe", teaser: "Ingenuity, helicóptero.", status: "Jezero.",
        steps: [
          ["2021, Perseverance Marte. Helicóptero.", "18 febrero 2021."],
          ["Pujamek, Killari! Wii Ingenuity. 1,8 kilo, atash. 2 hélice.", "1,8 kg. 2 rotor."],
          ["Marte dase: 30 kilómetro. 2400 hélice.", "1% dase. 2400 rpm.", "Kuntur (quechua) nantakau."],
          ["19 abril 2021, 3 metro nantakjai. ¡Marte! Wright tela.", "19 abril 2021. Wright 1903."],
          ["5 vuelo. 72. 17 kilómetro.", "72 vuelo.", "Jempe (picaflor). Nasca."],
          ["Enero 2024, vuelo 72, hélice pakuamui. Nantaktsujai.", "25 enero 2024."],
          ["Yamai estación. Tsawan tsawan: temperatura, foto. Quipu.", "Ingenuity datos.", "Quipu (quechua)."]
        ] },
      memoria: { no: "Epílogo", title: "Emetsuktatui", teaser: "Killari chichaku chichamjin aidaujai.",
        steps: [
          ["Killari, kuashat ukukbau: carrito, espejo, cámara, nawe. Marte robot. Nayaimpinum quechua chicham. Basura atsawai: patrimonio.", "NASA: patrimonio."],
          ["Killari escuela tableta: quechuajai chichaku. Uchi antukaju."],
          ["Aimara, asháninka (cushma), awajún (tawasap), shipibo (kené): —¿Iina chichamenjai chichastamek?", "", "Perú: 48 chicham. Tawasap: awajún aidauk takamaji."],
          ["Carrito, espejo, disco, Spirit, Ingenuity: runasimi, aymar aru, asháninka, awajún, shipibo. Unuimatai, ame chichamjumjai.", "4,4 millón (INEI 2017)."],
          ["2024 Perú: Artemis. 41. Andes nuwa uchi wii jegatatui. Huanta. Killari.", "30 mayo 2024."],
          ["Wii wakeruajai. Wii chichajai: ame chichamjumjai chichamu, emetsuktatui."]
        ] }
    }
  });
})();
