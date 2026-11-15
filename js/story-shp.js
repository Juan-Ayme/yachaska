/* =========================================================================
   YACHASKA – shipibo-konibo (pano, Amazonía central del Perú)
   BORRADOR hecho con apoyo de IA, de BAJA CONFIANZA: el shipibo-konibo
   tiene muy pocos textos de referencia y este borrador tiene errores
   probables. Un hablante nativo debe corregirlo y grabarlo antes de
   publicarlo como final. Los términos técnicos van como préstamos.
   Pasos: [texto, dato NASA, puente]
   ========================================================================= */
(function () {
  "use strict";
  window.YACHASKA.addLang("shp", {
    status: "rev",
    ui: {
      title: "Oshen oinna",
      kicker: "Scroll betan ninkáti yoyo",
      lede: "NASA-nin Oshenko, Martenko, naiko jeneshkatai jawekibo yoyo iki. Oshen ea yoyo ikai Killari ainbo bakeshoko, Huanta mai.",
      start: "Yoyo peoti", index: "Yoyo",
      meta: "8 capítulo · 56 escena · 25 minuto",
      chooseLang: "Mia joi bichi", listen: "Ninkáwe", stop: "Senenwe", autoplay: "Ninkáti",
      fact: "NASA onan", bridge: "Andes chaka", source: "Fuente",
      scroll: "Ramikiri", night: "Yame", day: "Nete",
      qNotice: "Shipibo-konibo: borrador con apoyo de IA, de baja confianza y con errores probables. Lo debe corregir y grabar un hablante nativo shipibo-konibo. · AI-assisted, low-confidence draft pending a native speaker.",
      noAudioQu: "Shipibo audio yamake. Castellano betan.",
      objects: "Jeneshkatai", objectsLede: "Westiora bichiwe, capítulonko kaawe.",
      langsTitle: "YACHASKA joibo", langsLede: "Perú: 4,4 millón joni nato joibo yoyo iki (INEI, Censo 2017).",
      thLang: "Joi", thFamily: "Familia", thSpeakers: "Yoyo ikabo", thRegion: "Mai", thStatus: "Estado",
      st_ok: "Jakon", st_rev: "Benxoakatai", st_next: "Jatibi",
      top: "Peokonko", status: "Ramara",
      body_luna: "Oshe", body_marte: "Marte", body_espacio: "Nai", body_tierra: "Mai",
      cast: "NASA foto", castLede: "Nato NASA foto: máquinabo Oshenko, Martenko, naiko jeneshkatai.",
      specs: "Ficha", photo: "NASA foto", artist: "NASA dibujo",
      timeline: "Timeline · 1969–2026", timelineLede: "Jawekibo naiko kaaxon jeneshkatai.",
      menuLang: "Joi", menuTheme: "Yame / nete"
    },
    voices: {
      killa: "Oshen yoyo ikai", abuela: "Chichi yoyo ikai", rover: "Apolo 17 rover yoyo ikai",
      mirror: "Apolo 11 espejo yoyo ikai", record: "Voyager Disco de Oro yoyo ikai",
      spirit: "Spirit, Marte rover, yoyo ikai", ingenuity: "Ingenuity, Marte helicóptero, yoyo ikai"
    },
    ch: {
      huanta: { no: "Peokonko", title: "Huantanko westiora yame", teaser: "Ainbo bake, chichi, naiko yoyo.",
        steps: [
          ["Ea Oshe iki. Jaskaribires ea Huanta mananbo oinai. Shinki oinai, jene oinai, chichibo yoyo ikai bakebo betan yamenko.", "Oshe: 384 400 kilómetro maimeax."],
          ["Ramara yame, shobo joshin. Chichi, Killari betan, tsaota. Killari: «oshen jakon». Ea Killari noi.", "", "Quechua: Killa = Oshe; Inti = Bari; quyllur = Wishma."],
          ["Chichi yoyo ikai: —Oinwe, Killari: Mayu, naiko jene. Yacana, llama wiso. Wishma pabenbires, banati.", "", "Andes jonibo naiko wiso oinai: llama Yacana."],
          ["Killari onanke Mayu, Yacana, Bari. Escuelanko foto oinke: bota taebo Oshenko. Ea taebo. Killari yoyo yamake.", "Oshenko niwe yamake, oi yamake: taebo jeneshkatai."],
          ["Killari chichi yokake quechuanko: —¿Imataq hanaqpi kan? ¿Jawe naiko iki? Chichi osanke. —Oshen onanke, bake.", "", "Wawa (quechua) = bake. Hanaq pacha = nai."],
          ["Ea, yoyo yamaa, oinnara yoyo iti. Maimeax jeneshkatai yoyo iti. Jaton yoyo iki. Ninkáwe, Killari. Mia ninkáwe."]
        ] },
      killa: { no: "Capítulo I", title: "Ea, Oshe", teaser: "Jawekeskaxon Oshe pekaota.",
        steps: [
          ["Mananbo yamaa, shinki yamaa, ea jaa iki. Onanyabo: 4500 millón año, Mai Theia betan tsinkike. Jaskata ea.", "Theia: teoría NASA."],
          ["Mai ea poi iki. Ea Mai bochikaini. Ea ian jene jaweai.", "27 nete Oshe Mai."],
          ["Andes jonibo ea oinke. Ea betan bana. Ea calendario naiko.", "", "Andes jonibo Oshe oinai banatiki."],
          ["Westiora yamake. 1969, 20 julio: joni taebo Oshenko.", "Apolo 11: 20 julio 1969. 12 astronauta Oshenko."],
          ["Jatibi kaake. Jawekibo jeneshkatai. «Basura» ikai. Ea: jeneshkatai. Jaton yoyo.", "NASA: catálogo artefacto. Basura yamake."]
        ] },
      rover: { no: "Capítulo II", title: "Jeneshkatai carrito", teaser: "Apolo 17 rover yoyo ikai.", status: "Taurus-Littrow, 1972.",
        steps: [
          ["Jakon, Killari. Ea rover, carrito electricidad. Módulo Apolo 17 betan. Diciembre 1972. Gene, Harrison ea paketaa.", "Rover lunar. Apolo 17: Cernan, Schmitt."],
          ["Ea ani yamake. Maino 210 kilo, Oshenko 35 kilo. 4 rueda alambre. Motor, batería.", "Gravedad 1/6. 36 voltio batería.", "Rueda kené: shipibo ainbobo kené."],
          ["Ea poibo: Apolo 15, Apolo 16. Ea 3. Astronautabo manan kaake, maxax benai.", "3 rover: 1971, 1972."],
          ["Guardabarros tooke. Gene: cinta, mapa. ¡Jakon onanya!", "Apolo 17: cinta, mapa."],
          ["36 kilómetro kaake. Harrison geólogo. Mai naranja: volcán.", "Vidrio volcánico."],
          ["Ramara kaxon: rover ¿maxax? Maxax Maiko kaake.", "382 kilo maxax.", "Ayni (quechua): westiora jeneshkatai, wetsa biti."],
          ["Ea jeneshkatai. Cámara oinke nave kaake. Mainko oinke. Yamake Oshenko.", "Cámara: Apolo 17. Apolo 17 jeneshkatai."],
          ["¿Ea onisti? Westiora. Maxax Maiko kaake. NASA satélite ea oinai: rueda taebo. Basura yamake ea, Killari.", "LROC foto: rover, taebo."]
        ] },
      espejo: { no: "Capítulo III", title: "Espejo yoyo ikai", teaser: "Espejo Apolo 11, 50 año.", status: "Ramara joshin.",
        steps: [
          ["Ea kaayamai. Rueda yamake. Ea panel, 100 prisma. Apolo 11 jeneshkatai 1969. Maleta, nai oinai.", "Apolo 11: 100 prisma. Apolo 15: 300."],
          ["Prisma retrorreflector: jawe joshin ea biai, ea bichokai. Pelota."],
          ["Observatorio: láser. 384 000 kilómetro, bichokai. 2,5 segundo.", "300 000 km segundo.", "Chaski (quechua) yoyo boai. Láser chaski."],
          ["Onanyabo: 3,8 centímetro año ea kaai.", "3,8 cm año."],
          ["50 año, ea joshin. Batería yamake. «Ea jaa iki». Killari, jeneshkatai joshin.", "Apolo 11, 14, 15: ramara."]
        ] },
      voyager: { no: "Capítulo IV", title: "Yoyo wishmanko kaake", teaser: "Disco de Oro: quechua yoyo naiko.", status: "Wishmanko kaai.",
        steps: [
          ["1977 ea oinke 2 nave: Voyager. Bichokayamai.", "Voyager 2: 20 agosto 1977. Voyager 1: 5 septiembre 1977."],
          ["Jakon, Killari. Ea Disco de Oro, Voyager 1. Cobre, oro, 30 centímetro. Ea poi Voyager 2.", "Disco de Oro: aguja."],
          ["Oi, niwe, kanaa, 116 imagen, 90 minuto música, 55 joi. Ea carta.", "116 imagen, 55 joi."],
          ["Quechua: «Kay pachamamta niytapas maytapas rimapallasta runasimipi». Mai yoyo wishmanko.", "Quechua: 1 joi 55.", "Runasimi: jonibo joi (quechua)."],
          ["Música Perú: casarakuy, antara. Ninkábo onanai: manan, joni yoyo.", "2 música Perú.", "Antara: zampoña."],
          ["1979 Júpiter, 1980 Saturno. Ea poi: Urano, Neptuno.", "Ío volcán. Voyager 2: 1986, 1989."],
          ["1990 Voyager 1 Mai oinke: punto azul. Jatibi jonibo jaa.", "Pale Blue Dot: 14 febrero 1990."],
          ["2012: wishmanko. Energía yamake. Ea: 1000 millón año.", "Voyager 1 2012, Voyager 2 2018."],
          ["Ramara yame, Voyager 1 westiora nete. Quechua yoyo naiko.", "2026: 24 hora."]
        ] },
      spirit: { no: "Capítulo V", title: "Ea poi joshin", teaser: "Spirit, robot, 6 año Martenko.", status: "«Troy», Gusev, 2009.",
        steps: [
          ["Oinwe joshin: Marte. Spirit jaa iki. Ninkáwe."],
          ["Jakon, Killari. Ea Spirit, robot. 6 rueda, cámara. 2004 enero Marte, pelota.", "Spirit: 4 enero 2004, Gusev."],
          ["Gusev: jene pekao. 90 nete.", "90 sol."],
          ["Mai panel. Niwe ea benxoake. 6 año kaake.", "Dust devil: niwe.", "Niwe (shipibo) = wayra (quechua)."],
          ["Mananbo Columbia: 7 astronauta. Maxax oinai.", "Columbia 2003.", "Manan: apu (quechua)."],
          ["2006 rueda. Mai joxo: sílice. Jene pekao.", "2007 sílice."],
          ["2009 mai. Ea kaayamai. Ingeniero.", "Troy 2009."],
          ["Yame, matsi. 22 marzo 2010 yoyo. Yamake.", "22 marzo 2010. 25 mayo 2011."],
          ["Mai ramara. Opportunity, ea poi: 45 kilómetro. Ea 8.", "7,73 km. Opportunity 45,16 km, 2018."],
          ["Killari chichi yokake: —¿Jawen Spirit oinai? Chichi: chullpa. —Shinan, bake. Mawayamai.", "", "Chullpa (quechua): Andes patrimonio."]
        ] },
      ingenuity: { no: "Capítulo VI", title: "Martenko pino", teaser: "Ingenuity, helicóptero.", status: "Jezero.",
        steps: [
          ["2021, Perseverance Marte. Helicóptero.", "18 febrero 2021."],
          ["Jakon, Killari! Ea Ingenuity. 1,8 kilo, takara. 2 hélice.", "1,8 kg. 2 rotor."],
          ["Marte niwe: 30 kilómetro. 2400 hélice.", "1% niwe. 2400 rpm.", "Kuntur (quechua) noyai."],
          ["19 abril 2021, 3 metro noyake. ¡Marte! Wright tela.", "19 abril 2021. Wright 1903."],
          ["5 vuelo. 72. 17 kilómetro.", "72 vuelo.", "Pino (picaflor). Nasca."],
          ["Enero 2024, vuelo 72, hélice tooke. Noyayamai.", "25 enero 2024."],
          ["Ramara estación. Nete nete: temperatura, foto. Quipu.", "Ingenuity datos.", "Quipu (quechua)."]
        ] },
      memoria: { no: "Epílogo", title: "Shinanyamai", teaser: "Killari yoyo ikai joibo betan.",
        steps: [
          ["Killari, jatibi jeneshkatai: carrito, espejo, cámara, taebo. Marte robot. Naiko quechua yoyo. Basura yamake: patrimonio.", "NASA: patrimonio."],
          ["Killari escuela tableta: quechuanko yoyo. Bakebo ninkáke."],
          ["Aimara, asháninka (cushma), awajún, shipibo (kené): —¿Noa joinko yoyo ikai?", "", "Perú: 48 joi. Kené: shipibo ainbobo kené."],
          ["Carrito, espejo, disco, Spirit, Ingenuity: runasimi, aymar aru, asháninka, awajún, shipibo. Onanti, mia joinko.", "4,4 millón (INEI 2017)."],
          ["2024 Perú: Artemis. 41. Andes ainbo bake ea kaai. Huanta. Killari.", "30 mayo 2024."],
          ["Ea manai. Ea yoyo: mia joinko yoyo, shinanyamai."]
        ] }
    }
  });
})();
