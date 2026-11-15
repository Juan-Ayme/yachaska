/* =========================================================================
   YACHASKA – asháninka (arawak, selva central del Perú)
   BORRADOR hecho con apoyo de IA, de BAJA CONFIANZA: el asháninka tiene
   muy pocos textos de referencia y este borrador tiene errores probables.
   Un hablante nativo debe corregirlo y grabarlo antes de publicarlo como
   final. Los términos técnicos van como préstamos del castellano.
   Pasos: [texto, dato NASA, puente]
   ========================================================================= */
(function () {
  "use strict";
  window.YACHASKA.addLang("cni", {
    status: "rev",
    ui: {
      title: "Kashiri iñaakiri",
      kicker: "Kenkitsatagantsi pikemakotero",
      lede: "Ikenkitsatakotiro NASA iyoka iotsitapakiri Kashirikinta, Martekinta, inkitekinta. Iriorika ikenkitsatakotiro. Kashiri iñaanatakiri Killari, tsinanetsi Huantajatzi.",
      start: "Pipoñaanteero kenkitsatagantsi", index: "Kenkitsatagantsi",
      meta: "8 capítulo · 56 escena · 25 minuto",
      chooseLang: "Pijiye piñaane", listen: "Pikemi", stop: "Piparianakero", autoplay: "Ikemagantsi",
      fact: "NASA ikenkitsatakotiro", bridge: "Ashaninka chaka", source: "Fuente",
      scroll: "Pishintashintero", night: "Tsiteniri", day: "Kitaiteri",
      qNotice: "Asháninka: borrador con apoyo de IA, de baja confianza y con errores probables. Lo debe corregir y grabar un hablante nativo asháninka. · AI-assisted, low-confidence draft pending a native speaker.",
      noAudioQu: "Tekatsi audio asháninka. Castellano nokemakoteri.",
      objects: "Iotsitapakiri", objectsLede: "Pitimpimitero, pipiantero capítulo.",
      langsTitle: "YACHASKA iñaane", langsLede: "Perú: 4,4 millón ashaninka, aimara, quechua iñaane (INEI, Censo 2017).",
      thLang: "Iñaane", thFamily: "Familia", thSpeakers: "Iñaanatsiri", thRegion: "Kipatsi", thStatus: "Estado",
      st_ok: "Kameetsa", st_rev: "Iriosatantearo", st_next: "Aririka",
      top: "Pipiante", status: "Iroñaaka",
      body_luna: "Kashiri", body_marte: "Marte", body_espacio: "Inkite", body_tierra: "Kipatsi",
      cast: "Ikantakiri NASA foto", castLede: "Iroka NASA foto: máquina iotsitapakiri Kashirikinta, Martekinta, inkitekinta.",
      specs: "Ficha", photo: "NASA foto", artist: "NASA dibujo",
      timeline: "Timeline · 1969–2026", timelineLede: "Tsika ijatake máquina inkitekinta.",
      menuLang: "Piñaane", menuTheme: "Tsiteniri / kitaiteri"
    },
    voices: {
      killa: "Kashiri ikenkitsatakotiro", abuela: "Ichaini iñaanake", rover: "Rover Apolo 17 iñaanake",
      mirror: "Espejo Apolo 11 iñaanake", record: "Disco de Oro Voyager iñaanake",
      spirit: "Spirit, Marte rover, iñaanake", ingenuity: "Ingenuity, Marte helicóptero, iñaanake"
    },
    ch: {
      huanta: { no: "Ipoñaantagantsi", title: "Tsiteniri Huantakinta", teaser: "Tsinanetsi, ichaini, ikenkitsatakotiro inkite.",
        steps: [
          ["Naaka Kashiri. Pairani noñaakiro otsishi Huantakinta. Noñaakiro shinki, noñaakiro nijaa, noñaakiro ichaini ikenkitsatakotiro itomiegi tsiteniri.", "Kashiri: 384 400 kilómetro kipatsikinta."],
          ["Iroñaaka tsiteniri, pankotsi kitamaro. Ichaini, Killari otsamaitaki. Killari: «Kashiri ipotsitaka». Nokemisantziro Killari.", "", "Quechua: Killa (Kashiri), Inti (Poreatsiri), quyllur (impokiro)."],
          ["Ichaini ikantziro: —Piñaakiro, Killari: Mayu, nijaa inkitekinta. Yacana, llama tsitsiniri. Aririka ikitaitetanakia, aririka pankitsitantsi.", "", "Andes ashaninka iñaakiro tsitsiniri inkitekinta: llama Yacana."],
          ["Killari iyotziro Mayu, Yacana, Poreatsiri. Iroñaaka escuelakinta iñaakiro foto: iitsi bota Kashirikinta. Iitsi naakakinta. Killari tee iñaanaje, irosatantearo.", "Kashirikinta tekatsi tampia, tekatsi inkani: iitsi astronauta ari onkantaitye."],
          ["Killari ikantziro ichaini, quechuakinta: —¿Imataq hanaqpi kan? ¿Paita inkitekinta? Ichaini ishiretanake. —Kashiri iyotziro, notomi.", "", "Wawa (quechua) = tsinanetsi, eentsi. Hanaq pacha = inkite."],
          ["Naaka, tee nonkaimane, nokenkitsatakotiro noñaakiri. Nokenkitsatakotiro iotsitapakiri kipatsijatzi. Iriorika iñaanatzi. Pikemi, Killari. Eeroka, pikemi."]
        ] },
      killa: { no: "Capítulo I", title: "Naaka, Kashiri", teaser: "Tsika ipoñaaka Kashiri.",
        steps: [
          ["Tekira otsishi, tekira shinki, naaka nosaikaki. Yotaniriite ikantziro: 4500 millón año, kipatsi okaatapaakiro antearo Theia. Ari nosaikaki naaka.", "Theia: teoría ikantziro NASA."],
          ["Kipatsi irotake nirentzi. Nokiwakoterika kipatsi. Naaka noshitowanakero nijaa: inene, ipankaje, kitaiteri kitaiteri.", "Kashiri 27 kitaiteri ishiritzi kipatsi."],
          ["Pairani Andes ashaninka iñaakotena. Iyotziro ikitaitetanakia, ipankitsitantsi. Naaka calendario inkitekinta.", "", "Ashaninka iñaakiro Kashiri aririka ipankitsitantsi."],
          ["Tekatsi pairani okemakotena. 1969, 20 julio, nokemaki iitsi: ashaninka (persona) ijataki naakakinta.", "Apolo 11: 20 julio 1969. 12 astronauta ijataki Kashirikinta."],
          ["Ijataki osheki. Ipiantaje... tee iyaatakiro maaroni. Iotsitapakiro osheki. Ikantziro: «basura». Naaka nokantziro: iotsitapakiri. Iñaanatzi. Nopakeri iñaane.", "NASA: catálogo artefacto Kashirikinta. Tee basura."]
        ] },
      rover: { no: "Capítulo II", title: "Carrito iotsitapakiri", teaser: "Rover Apolo 17 ikenkitsatakotiro.", status: "Taurus-Littrow, 1972.",
        steps: [
          ["Tsika pikantaka, Killari. Naaka rover, carrito electricidad. Nopiyotakaitaka módulo Apolo 17. Diciembre 1972. Gene, Harrison iomposhitakena, nokiwake mapikinta.", "Rover, módulo lunar. Apolo 17: Cernan, Schmitt, diciembre 1972."],
          ["Tee nosankitzi. Kipatsikinta 210 kilo, Kashirikinta 35 kilo. 4 rueda awasqa alambre. Motor, batería.", "Gravedad Kashiri: 1/6. 36 voltio batería.", "Rueda kitsaarentsi alambre, ashaninka ikitsatakotiro kitsaarentsi."],
          ["Niraintsi Apolo 15, Apolo 16. Naaka 3. Astronauta ijataki osheki otsishikinta, iyamitaki mapi.", "3 rover: Apolo 15 (1971), 16, 17 (1972)."],
          ["Okaatapaaka guardabarros. Gene iyotake: cinta, mapa. ¡Kameetsa iyotaniri!", "Apolo 17: cinta adhesiva, mapa."],
          ["36 kilómetro noshiyaka. Harrison geólogo. Noñaakiro kipatsi naranja: volcán pairani.", "Kipatsi naranja: vidrio volcánico."],
          ["Aririka ipiantaje: rover ¿mapi? Tee iyaaterone maaroni. Iyaatakiro mapi kipatsikinta.", "382 kilo mapi Apolo.", "Ashaninka iotsitapakiro, ari ipiantaje. Ayni (quechua)."],
          ["Nosaikaki naaka. Cámara noñaakiro nave ijataki. Kipatsikinta iñaakiro. Tekatsi ijataje Kashirikinta.", "Cámara: despegue Apolo 17. Apolo 17 iotsitapake."],
          ["¿Nokemaatsitaka? Aparoni. Mapi ijataki kipatsikinta. NASA satélite iñaakotena: iitsi rueda. Tee basura naaka, Killari.", "LROC foto: rover, iitsi rueda."]
        ] },
      espejo: { no: "Capítulo III", title: "Espejo iñaanatsiri", teaser: "Espejo Apolo 11, 50 año antawaitzi.", status: "Iroñaaka antawaitzi.",
        steps: [
          ["Tee noshiyake. Tekatsi rueda. Naaka panel, 100 prisma. Apolo 11 iotsitapakena 1969, iitsi kipatsikinta. Maleta noñaakotziro inkite.", "Apolo 11: 100 prisma. Apolo 15: 300."],
          ["Prisma retrorreflector: nopiantaje tsiteni. Pelota pipiantaje pakotsikinta."],
          ["Observatorio kipatsikinta: láser. 384 000 kilómetro, ipiantaje. 2,5 segundo.", "Tsiteni 300 000 km segundo.", "Chaski (quechua) iyaatakiro iñaane. Láser chaski."],
          ["Yotaniriite iyotziro: 3,8 centímetro año noshiyake.", "3,8 cm año."],
          ["50 año, antawaitzi naaka. Tee batería. Nokantziro: «aka nosaiki». Killari, iotsitapakiri antawaitzi.", "Apolo 11, 14, 15: iroñaaka."]
        ] },
      voyager: { no: "Capítulo IV", title: "Iñaane ijataki impokirokinta", teaser: "Disco de Oro: iñaane quechua inkitekinta.", status: "Impokiro antawaitzi.",
        steps: [
          ["1977 noñaakiro 2 nave: Voyager. Tee ipiantaje.", "Voyager 2: 20 agosto 1977. Voyager 1: 5 septiembre 1977."],
          ["Tsika pikantaka, Killari. Naaka Disco de Oro, Voyager 1. Cobre, oro, 30 centímetro. Nirentzi Voyager 2.", "Disco de Oro: aguja, instrucción."],
          ["Inkani, tampia, kemaatsi, 116 imagen, 90 minuto música, 55 iñaane. Naaka carta.", "116 imagen, 55 iñaane."],
          ["Quechua: «Kay pachamamta niytapas maytapas rimapallasta runasimipi». Iñaane kipatsikinta impokirokinta.", "Quechua: 1 iñaane 55.", "Runasimi: ashaninka iñaane (quechua)."],
          ["Música Perú: casarakuy, antara. Ikemiri iyotziro: otsishi, ashaninka iñaane.", "2 música Perú.", "Antara: sonkari (zampoña)."],
          ["1979 Júpiter, 1980 Saturno. Nirentzi: Urano, Neptuno.", "Ío: volcán. Voyager 2: Urano 1986, Neptuno 1989."],
          ["1990 Voyager 1 iñaakiro kipatsi: punto azul. Ari isaiki maaroni ashaninka.", "Pale Blue Dot: 14 febrero 1990."],
          ["2012: impokiro. Tee ijataki osheki. Tekatsi energía. Naaka, tee energía. 1000 millón año.", "Voyager 1 2012, Voyager 2 2018. Plutonio."],
          ["Iroñaaka tsiteniri, Voyager 1 1 kitaiteri. Iñaane quechua impokirokinta.", "2026: 24 hora señal."]
        ] },
      spirit: { no: "Capítulo V", title: "Nirentzi kityonkari", teaser: "Spirit, robot, 6 año Martekinta.", status: "«Troy», Gusev, 2009.",
        steps: [
          ["Piñaakiro kityonkari: Marte. Spirit isaiki. Pikemi."],
          ["Tsika pikantaka, Killari. Naaka Spirit, robot. 6 rueda, cámara. 2004 enero nopoñaaka Marte, pelota.", "Spirit: 4 enero 2004, Gusev."],
          ["Gusev: nijaa pairani. 90 kitaiteri.", "90 sol."],
          ["Kipatsi panel. Tampia ikiwake. 6 año noshiyaka.", "Dust devil: tampia.", "Tampia (ashaninka) = wayra (quechua)."],
          ["Otsishi Columbia: 7 astronauta. Nonkemakotero mapi.", "Columbia 2003.", "Otsishi: apu (quechua)."],
          ["2006 rueda. Kipatsi kitamaro: sílice. Nijaa pairani.", "2007 sílice."],
          ["2009 kipatsi. Tee nonkatsiitya. Ingeniero ikemakotero.", "Troy 2009."],
          ["Tsiteniri, katsiinka. 22 marzo 2010 nopakeri iñaane. Tekatsi.", "22 marzo 2010. 25 mayo 2011."],
          ["Kipatsi iroñaaka. Opportunity, nirentzi: 45 kilómetro. Naaka 8.", "Spirit 7,73 km. Opportunity 45,16 km, 2018."],
          ["Killari ikantziro ichaini: —¿Paita iñaakotziro Spirit? Ichaini ikantziro: chullpa. —Iyotziro, notomi. Tee ikamake.", "", "Chullpa (quechua): patrimonio Andes."]
        ] },
      ingenuity: { no: "Capítulo VI", title: "Tsonkiri Martekinta", teaser: "Ingenuity, helicóptero.", status: "Jezero, antawaitzi.",
        steps: [
          ["2021, Perseverance Marte. Helicóptero.", "Perseverance: 18 febrero 2021."],
          ["Tsika pikantaka, Killari! Naaka Ingenuity. 1,8 kilo, atsipiri. 2 hélice.", "1,8 kg. 2 rotor."],
          ["Tampia Marte: 30 kilómetro. 2400 hélice.", "1% tampia. 2400 rpm.", "Kuntur (quechua) iporoke."],
          ["19 abril 2021, 3 metro noporoke. ¡Marte! Wright tela.", "Primer vuelo 19 abril 2021. Wright 1903."],
          ["5 vuelo. 72 nonkantake. 17 kilómetro.", "72 vuelo.", "Tsonkiri (picaflor). Nasca."],
          ["Enero 2024, vuelo 72, hélice okaatapaaka. Tee noporoke.", "25 enero 2024."],
          ["Iroñaaka estación. Kitaiteri kitaiteri: temperatura, foto. Quipu.", "Ingenuity datos.", "Quipu (quechua)."]
        ] },
      memoria: { no: "Epílogo", title: "Tee intzimpoje", teaser: "Killari ikenkitsatakotiro iñaane ashaninka.",
        steps: [
          ["Killari, osheki iotsitapakiri: carrito, espejo, cámara, iitsi. Marte robot. Inkite iñaane quechua. Tee basura: patrimonio.", "NASA: patrimonio."],
          ["Killari escuela tableta ikenkitsatakotiro quechuakinta. Itomiegi ikemi."],
          ["Aimara, ashaninka (cushma), awajún, shipibo (kené): —¿Pikenkitsatakotiro iñaanekinta?", "", "Perú: 48 iñaane: 44 antami, 4 Andes."],
          ["Carrito, espejo, disco, Spirit, Ingenuity: runasimi, aymar aru, asháninka, awajún, shipibo. Yotantsi, piñaanekinta.", "4,4 millón (INEI 2017)."],
          ["2024 Perú: Artemis. 41. Tsinanetsi Andes ijataje naakakinta. Huantajatzi. Killari.", "30 mayo 2024."],
          ["Nopoyiro. Nokantziro: piñaanekinta, tee intzimpoje."]
        ] }
    }
  });
})();
