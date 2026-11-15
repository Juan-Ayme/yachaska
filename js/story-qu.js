/* =========================================================================
   YACHASKA – runasimi (quechua chanka, Ayacucho)
   BORRADOR hecho con apoyo de IA. Debe revisarlo y grabarlo un hablante
   nativo de quechua chanka antes de considerarse final (ver README).
   Ortografía: alfabeto oficial, 3 vocales, sin consonantes glotalizadas
   (chanka): kipu, chaski, qinti, Qapaq Ñan.
   El saludo del Disco de Oro se deja tal como lo publica la NASA.
   ========================================================================= */
(function () {
  "use strict";
  const Y = window.YACHASKA;

  const UI = {
    title: "Killa rikusqan",
    kicker: "Uraman kuyuchispa uyarinapaq willakuy",
    lede: "NASA-pa Killapi, Martepi, karu hanaq pachapipas saqisqan imakunam kawsarimunku, paykunallataq willakuyninkuta willakunku. Killam riqsichin Huanta llaqtamanta Killari sutiyuq warmachaman.",
    start: "Willakuyta qallariy",
    index: "Willakuypa rakinkuna",
    meta: "8 raki · 56 rikuchiy · yaqa 25 minutu",
    chooseLang: "Simiykita akllay",
    listen: "Uyariy", stop: "Sayachiy", autoplay: "Kikinmanta uyarichiy",
    fact: "NASA-pa yachasqan", bridge: "Andes chaka", source: "Maymanta",
    chapter: "Raki", scroll: "Uraman kuyuchiy",
    night: "Tuta", day: "Punchaw",
    next: "Qatiq raki",
    qNotice: "Runasimi (chanka): kay qillqaqa IA yanapakuywan ruwasqa qallariy qillqam. Uyarichiyqa IA rimaywanmi (Meta MMS). Runasimi rimaqkunam allichanqaku, grabanqakupas. · Borrador con apoyo de IA y voz sintética: falta la revisión y grabación de hablantes de quechua chanka.",
    nextNotice: "Kay simiqa hamuq rakipim kanqa, rimaq runawan. Kunanqa castellanopim qawanki.",
    noAudioQu: "Runasimipi uyarichiyqa manaraqmi grabasqachu. Castellanopim ñawinchasqayki.",
    noVoice: "Navegadorniykiqa manam rimayta atinchu. Qillqata ñawinchay.",
    objects: "Qipakuqkuna", objectsLede: "Huk imata ñitiy, rakinman kutinaykipaq.",
    langsTitle: "YACHASKA-pa siminkuna", langsLede: "Perú suyupi 4,4 hunumanta aswan runakunam kay pichqa ñawpa simikunapi rimayta yacharqaku (INEI, 2017 Censo).",
    thLang: "Simi", thFamily: "Ayllu", thSpeakers: "Rimaqkuna", thRegion: "Maypi", thStatus: "Imayna kachkan",
    st_ok: "Kachkanña", st_rev: "Allichachkanku", st_next: "Hamuq rakipi",
    sources: "Maymanta hurqusqa · NASA willakuykuna", about: "YACHASKA-manta",
    aboutText: "YACHASKA («yachasqa», «yachakusqa») Ayacuchopi ruwasqa web willakuymi, NASA Space Apps Challenge 2026-paq, «Abandoned but not Forgotten» atipanakuypaq. Manam servidorniyuqchu, cookieyuqchu, qatipaqniyuqchu.",
    ai: "IA-pa yanapakuynin: programanapaq, castellano, inglés, runasimi qallariy qillqakunapaqpas IA-wan yanapakurqaniku. Llapan willakuykunatam NASA-pa qillqankunawan tupachiniku. Runasimi qillqataqa rimaq runakunam allichanqaku, grabanqakupas. Dibujokunaqa kikiykupa ruwasqanmi; NASA-pa logontaqa manam churanikuchu.",
    csv: "Tikrapaqkunapaq qillqata uraykachiy (CSV)",
    top: "Qallariyman kutiy",
    status: "Kunan",
    body_luna: "Killa", body_marte: "Marte", body_espacio: "Karu hanaq pacha", body_tierra: "Kay pacha",
    skip: "Willakuyman pasay",
    menuLang: "Simita tikray", menuTheme: "Tuta / punchaw tikray",
    soundOn: "Uyarinayuq", muted: "Upallalla", stopAudio: "Sayachiy",
    soundOnToast: "Willakuy uyarikuchkan: sapa rikuchiymi kikinmanta ñawinchakun.", mutedToast: "Upallalla: allillamanta ñawinchay. «Uyariy» ñitiy uyariyta munaspaqa.",
    tapToListen: "Paginata utaq «Uyariy» ñitiy, uyarichinapaq.",
    cast: "Willakuypa chiqap imakunan", castLede: "Kaykunam chiqap NASA fotokuna: Killapi, Martepi, karu hanaq pachapi qipakuq máquinakuna.",
    specs: "Riqsichiy kartilla", photo: "NASA foto", artist: "NASA-pa dibujon",
    timeline: "Pacha siqi · 1969–2026", timelineLede: "Imaynatam kay imakuna hanaq pachaman chayarqaku, qipakurqakupas.",
    heroAlt: "Willakuypa rikchaynin: Killa Huantapa hawanpi, muyuriqninpitaq rover, rirpu, Voyager, Spirit, Ingenuity."
  };

  const VOICES = {
    killa: "Killam willakun",
    abuela: "Hatun mamam rimachkan",
    rover: "Apolo 17-pa Killa rovernin rimachkan",
    mirror: "Apolo 11-pa láser rirpun rimachkan",
    record: "Voyager-pa Quri Discon rimachkan",
    spirit: "Spirit, Marte rover, rimachkan",
    ingenuity: "Ingenuity, Marte helicóptero, rimachkan"
  };

  const CH = {
    huanta: {
      no: "Qallariynin", title: "Huantapi huk tuta",
      teaser: "Huk warmacha, hatun maman, hanaq pachaman huk tapuypas.",
      steps: [
        { t: "Ñuqam Killa kani. Waranqa waranqa watañam Huanta urqukunata qawachkani. Saranta wiñaqta rikurqani, mayuta uraykuqta rikurqani, achka hatun mamakunatapas rikurqani, tuta anqasyaptin, kanchapi willkankunaman willakuykunata willaqta.",
          f: "Killaqa, chawpinpi, Pachamanta 384 400 km karupim kachkan. Autopi mana samaspa rispaqa, yaqa pichqa killapim chayawaq." },
        { t: "Kay tuta huk wasicha kachkan, puka tejayuq. Kanchapi, huk ovejapa qaranpi tiyachkan hatun mama —paya— willkan Killariwan, puka chulluyuq, pompomniyuq. Killari ninanqa «killapa kanchaynin». Chaymi anchata kuyani.",
          b: "Runasimipi Killaqa luna, Intiqa sol, quyllurtaq estrella. Killariqa Killapa kanchayninmi." },
        { t: "Hatun mamam tawnanta hanaqman huqarin. —Qaway, Killari: chaymi Mayu, hanaq pachapa mayun. Chaypi, yana kaqninpi, Yacana llama purichkan uñanwan. Ñawinkuna achikyaptin pacha manaraq illariptin, tarpuymanta yuyaymanana pachañam.",
          b: "Andes runakunaqa manam quyllurkunallapichu rikchaykunata qawanku: Mayupa yana kaqninkunapipas. Yacana llamapa ñawinkunaqa iskay achikyaq quyllurkunam: Alfa, Beta Centauri." },
        { t: "Killariqa riqsinmi Mayuta, Yacanata, chakrakunata puquchiq Intitapas. Ichaqa kunan, yachaywasipi, musuq imatam rikurqa: uqi allpa hawapi botapa yupinkunata. Ñuqapi yupikuna. Chaymantapacha upallalla kachkan, umanpas tapuykunawan huntasqa.",
          f: "Killapi mana wayra, mana para kanchu, chaymi astronautakunapa yupinkunaqa unay unay kanman mana chinkaspa." },
        { t: "Puchukaypi, Killariqa hatun mamanta runasimipi tapun: —¿Imataq hanaqpi kan? Hatun mamaqa allillamanta asirikun. —Chaytaqa Killallam yachan, wawa. Paymi llapanta rikurqa.",
          b: "Wawa ninanqa uchuy warmacha utaq uchuy wamra. Hanaq pachaqa hanaq kaq pacham: Andes runakunapa qawayninpi cielo." },
        { t: "Ñuqataq, mana sapa kuti rimaq, rikusqaykunata willayta munani. Ichaqa manam kikiypa willakuyniyllatachu willasaq. Pachamanta hamuspa qipakuqkunatam riqsichisqayki. Paykunapas kunkayuqmi. Uyariy, Killari. Qampas uyariy." }
      ]
    },
    killa: {
      no: "I Raki", title: "Ñuqa, Killa",
      teaser: "Imaynatam Killa paqarirqa, pitaq ñawpaqta watukurqa.",
      steps: [
        { t: "Huanta urqukuna manaraq kachkaptin, sarapas manaraq kachkaptin, ñuqaqa kaypiñam karqani. Yachaqkunam ninku yaqa 4500 hunu wata ñawpaqta paqarirqani, Marte hina hatun huk imapas wayna Pachawan takanakuptin. Chay pakisqakunamantam ñuqa ruwakurqani.",
          f: "Aswan riqsisqa yuyaymi: Killaqa paqarirqa wayna Pacha Theia sutiyuq imawan hatunta takanakuptinmi. Huk yuyaylla kachkan: yachaqkunaqa qawarichkankuraqmi." },
        { t: "Chaymi nini Pachaqa kuraq ñañay nispa. Muyuyninta muyuni, sapa kutim kikin uyallayta rikuchini. Kallpaywanmi lamar quchankunata kuyuchini: sapa punchaw huqarini, uraykachini, allillamanta samaq hina.",
          f: "Killaqa yaqa 27 punchawpim Pachata muyun, chaymi kikin uyallanta qawanchik. Llasayninmi lamar quchapa marean ruwan." },
        { t: "Pachak pachak watakunam Andes llaqtakuna qawawarqaku wiñaqta, pisiyaqta. Rikchaykunaywanmi killakunata yupaqku: yachaqkum hayka tarpunata, hayka cosechanata, hayka raymi ruwanata. Ñuqam karqani kalendarionku, hanaq pachapi warkurayaq.",
          b: "Achka Andes ayllukunapim kunankamapas Killata qawanku tarpunankupaq, kuchunankupaq, kullu kuchunankupaq. Hatun taytamamakunamanta willkakunaman yachaymi." },
        { t: "Hunu hunu watakunam mana pipas watukuwarqachu. Hanaq pachapa rumikunallam, Intipa achkinllam llamiwaqku. 1969 watapi, julio killapa 20 punchawninpi, huk imatam musyakurqani: huk chakim. Ñawpaq kutiraqmi runa ñuqa hawapi purirqa.",
          f: "Apolo 11 Killaman chayarqa 1969 julio 20 punchawpi. 1969-1972 watakunapi, chunka iskayniyuq astronautakunam Killapi purirqaku, suqta misionkunapi." },
        { t: "Chaymantam astawan hamurqaku. Ripukurqaku... ichaqa manam llapantachu apakurqaku. Imakunatam saqirqaku: pachak pachak imakunata. Wakinmi ninku qupa nispa. Ñuqataq nini: qipakuq watukuqkunam. Sapakamam huk willakuyta waqaychan. Rimayta qusaq.",
          f: "NASA-pa Historia Oficinanmi Killapi runakunapa saqisqan imakunapa catálogonta waqaychan. Manam qupa hinachu qawan: artefacto hinam, exploraciónpa historianpa rakin hina." }
      ]
    },
    rover: {
      no: "II Raki", title: "Qipakuyta akllaq carrito",
      teaser: "Apolo 17-pa Killa roverninmi willakun imanasqa Killapi qipakusqanta.",
      status: "1972 watamantapacha Taurus-Littrow qichwapim sayachkan.",
      steps: [
        { t: "Napaykullayki, Killari. Ñuqam Killa rover kani, electricidadwan puriq carrito. Papel hina wichqasqa chayamurqani, Apolo 17-pa módulo lunarninpa waqtanpi watasqa. 1972 diciembre killa karqa. Iskay astronautakuna, Gene, Harrisonpas, waskakunata aysarqaku, ñuqataq uqi allpa hawapi kicharikurqani.",
          f: "Rover Lunarqa módulo lunarpa huk rakinpi wichqasqa purirqa, Killapim kicharikurqa. Apolo 17 Killaman chayarqa 1972 diciembrepi, Eugene Cernanwan Harrison Schmittwan." },
        { t: "Manam hatunchu kani. Pachapiqa yaqa 210 kilom llasani, kaypi Killapiqa 35 kilo hinallam kanman. Tawa ruedaykunaqa manam cauchochu: awasqa alambremantam. Sapa ruedaypas motorniyuqmi, iskay bateríakunataq kallpata quwan.",
          f: "Killapa llasayninqa Pachapa llasayninmanta suqta rakimanta huk rakillanmi. Roverpa ruedankunaqa awasqa acero mallamantam karqa, sapakamam motorniyuq, iskay 36 voltio bateríakunawan.",
          b: "Ruedaykunaqa awasqam karqa, alambremanta awayu hina. Andespiqa awaypas tecnologíam: awasqaqa waqaychanmi rikchaykunata, historiata, pachata qawaytapas." },
        { t: "Iskay kuraq wawqiykunam karqa: hukmi hamurqa Apolo 15-wan, hukñataq Apolo 16-wan. Ñuqam karqani kimsa kaq, qipa kaqpas. Ñuqaykuwanmi astronautakunaqa manaña navenkupa waqtallanpichu allillamanta purirqaku: karutam riyta atirqaku, urqukunakama, sumaq rumikunata maskaspa.",
          f: "Kimsa rover lunarkunam karqa: Apolo 15 (1971), Apolo 16, Apolo 17 (1972). Kimsantinmi Killapi kachkanraq." },
        { t: "Huk punchawmi guardabarrosniymanta huk raki pakikurqa, allpataq astronautakunapa hawanman pawarqa, qacha, ratakuq. Genem allicharqa cinta adhesivawan, wichqasqa mapakunawan, pinzakunawan hapichisqa. ¡Chay hinam yuyaysapakuna karqaku!",
          f: "Apolo 17-pi, astronautakunam roverpa guardabarrosninta allicharqaku cinta adhesivawan, plastificasqa mapakunawan. Killapa allpanqa ñutum, rasparqaq, llapanmanmi ratakun." },
        { t: "Taurus-Littrow qichwantam kuskalla yaqa 36 kilómetrota purirqaniku. Harrisonqa geólogom karqa: Killapi puriq ñawpaq kaq yachaq runa. Kuskam naranja allpata tarirqaniku, Killapa ñawpa volcánninkunapa pakasqanta waqaychaq.",
          f: "Apolo 17-pa naranja allpanqa uchuychallay volcán vidrio rumichakunamantam karqa. Rikuchirqam hunu hunu wata ñawpaqta Killapi volcánkuna tuqyasqanta." },
        { t: "Chaymantam kutinapaq pacha chayamurqa. Pachaman kutiq naveqa manam llapantachu apayta atirqa: huqarikunapaqqa sapa kilom chaninniyuq. Ñuqa karqani, utaq rumikuna. Pachapitaq yachayta munarqaku imamanta Killa ruwasqa kasqanta.",
          f: "Apolo misionkunam 382 kg Killapa rumintawan allpantawan apamurqaku. Chay rumikunawanmi yachanchik hayka watayuq kasqanta, imamanta ruwasqa kasqantapas.",
          b: "Arriero hina, mula llaqtaman chayananpaq ñanpi huk raki qipinta saqiq, roverqa qipakurqa rumikuna wasiman chayanankupaq. Ayni hinam: kunan qunki, hukkuna chaskinankupaq." },
        { t: "Chaymi qipakurqani. Asllata karupi sayachiwarqaku, cámarayta naveman qawachispa. Pachamanta huk ingenierom cámarayta kuyuchirqa, ñuqawantaq llapa pacha qawarqa huqarikusqanta. Ripukuqta rikurqani. Chaymantapacha, manañam pipas Killapi purinchu.",
          f: "Roverpa TV cámaranqa Pachamanta kamachisqa karqa, Apolo 17-pa huqarikuynintam filmarqa. Apolo 17-mi karqa runakuna Killapi purinanpaq qipa kaq misión." },
        { t: "¿Llakisqachu kani? Wakin kutipi. Ichaqa qaway: qipakusqayraykum rumikuna Pachaman chayarqaku. Kunantaq NASA-pa satélitenmi hanaqmanta fotografiawan: ruedaykunapa yupinkunaqa rikukunraqmi. Manam qupachu kani, Killari. Pipas hamusqanpa rikuchiyninmi kani.",
          f: "Lunar Reconnaissance Orbiter-pa cámaran (LROC) Apolo maykunatam órbitamanta fotografiarqa: rikukunmi módulokuna, roverkuna, ruedakunapa yupinkunapas." }
      ]
    },
    espejo: {
      no: "III Raki", title: "Kunankamapas kutichiq rirpu",
      teaser: "Apolo 11-pa rirpukunan, 50 watamanta aswanña llamkachkan.",
      status: "Llamkachkanraqmi: Pachamanta láserkunatam kutichin.",
      steps: [
        { t: "Ñuqaqa manam kuyunichu. Manam ruedayuqchu, motorniyuqchu kani. Uchuy vidrio prismakunawan huntasqa panelmi kani: pachakmi llapanpi. Apolo 11-pa astronautankunam 1969 watapi saqiwarqaku, ñawpaq kaq yupikunapa waqtallanpi. Kicharisqa maleta hinam rikchakuni, hanaq pachata qawaspa.",
          f: "Apolo 11-pa experimentonqa 100 cuarzo prismayuq retrorreflectormi. Apolo 14, 15-pas hukkunata saqirqaku; Apolo 15-pa kaqninqa 300 prismayuqmi." },
        { t: "Prismaykunapa sutinqa retrorreflector, huk yachaynintaq kan: chayamuwaq llapa achkita, hamusqan kikin ñannintam kutichini. Huk pirqapa kuchunman pelotata wikapaptiki makiykiman kutimuq hina." },
        { t: "Pachapa observatorionkunamantam yachaqkuna ñañu láser achkita kachamuwanku. Yaqa 384 000 kilómetrotam purin, llamiwan, kutintaq. Rispa kutimuspapas yaqa iskay segundo chawpintam unan. Achkipa hunu hunu rakichankunamanta, asllallam kutimun.",
          f: "Achkiqa sapa segundo yaqa 300 000 km-tam purin, chaymi Killaman rispa kutimuspa yaqa 2,5 segundota unan. Aslla fotónkuna kutimusqallanwanmi tupuyta atikun.",
          b: "Qapaq Ñanpi, Inkakunapa hatun ñanninpi, chaskikunam relevowan willakuykunata rispa kutimuspa apaqku. Láserpa achkinpas chaskim: Killakama rin, kutichiytataq apamun." },
        { t: "Achki hayka unasqanta tupuspanku, yachankum hayka karupi kasqayta milímetrokamapas. Chaynam huk pakasqata tarirqaku: sapa wata Pachamanta yaqa 3,8 centímetrota karunchakuni. Silluykikuna wiñasqan hinallam.",
          f: "Kay láser tupuykunawanmi yachanchik Killa Pachamanta sapa wata yaqa 3,8 cm karunchakusqanta." },
        { t: "Pichqa chunka watamanta aswanñam pasarqa, ñuqataq llamkachkaniraq. Manam pipas pichawanchu, manam bateríaytapas tikranchu, mana necesitasqayrayku. Sapa kuti achki chayamuwaptin, kutichini: «kaypim kachkani». ¿Rikunkichu, Killari? Wakin imakunaqa qipakunku yanapakuyta qatinankupaq.",
          f: "Apolo 11, 14, 15-pa retrorreflectornkunaqa kunankama llamkachisqa aslla Apolo experimentokunam." }
      ]
    },
    voyager: {
      no: "IV Raki", title: "Quyllurkunaman ripuq kunka",
      teaser: "Voyager-pa Quri Discon runasimi napaykuytam Inti ayllupa hawanman apachkan.",
      status: "Quyllurkuna chawpinta purichkan.",
      steps: [
        { t: "Kunanmi riqsichisqayki mana haykapas sayaqta. 1977 watapi rikurqani iskay navekunata waqtallaypi pasaqta, Pachamanta karunchakuspa mana kutimunankupaq. Sutinkuna karqa Voyager: puriqkuna.",
          f: "Voyager 2 1977 agosto 20 punchawpi huqarikurqa, Voyager 1-taq 1977 septiembre 5 punchawpi." },
        { t: "Napaykullayki, Killari. Ñuqaqa Voyager 1-pa hawanpim purini, sobrepi carta hina. Quriwan qatasqa cobre discom kani, yaqa 30 centímetro. Kikinchay wawqiymi Voyager 2-pi purichkan.",
          f: "Sapa Voyagermi quriwan qatasqa cobre discota apan, agujantinta, tocanapaq yachachiykunatapas tapanpi qillqasqa." },
        { t: "Surcoykunapim llapan Pachata waqaychani: parapa, wayrapa, illapapa, muchaypa uyarisqanta. Apani 116 rikchaykunata, yaqa 90 minutu takita, 55 simipi napaykuykunatapas. Ñuqam kani carta, pipas huk punchaw tariwananchikpaq.",
          f: "Quri Discopiqa kan 116 rikchaykuna, Pachapa uyarisqankuna, achka llaqtakunamanta yaqa 90 minutu taki, 55 simipi napaykuykunapas." },
        { t: "Kaypim aswan munasqay kaq hamun. Chay napaykuykuna ukupim urqukunaykimanta huk kunka kan. Pipas runasimipi rimarqa: «Kay pachamamta niytapas maytapas rimapallasta runasimipi». Kay Pachamanta huk napaykuy, runasimipi, quyllurkunaman purichkaq.",
          f: "Runasimiqa Quri Discopa 55 napaykuy siminkunamanta hukninmi. Qillqataqa NASA-pa churasqan hinallam kaypi rikuchiniku, mana allichaspa.",
          b: "Runasimi ninanqa «runakunapa simin». Chay sutitam quechua simi kikinpaq churakun." },
        { t: "Perú suyumanta takitapas apani: Andes casarakuy takita, antarawan tinyawan takitapas. Chaymi, pipas huk punchaw uyariwaptinqa, yachanqa Pachapi urqukuna, raymikuna, siminkupi takiq runakuna kasqanta.",
          f: "Quri Discopa taki listanpiqa iskay Perú takikunam kan: huk casarakuy taki, huk antara tinya takipas.",
          b: "Antaraqa Andes zampoñam, mana kaqlla suni carrizokunamanta ruwasqa. Pachak pachak watañam raymikunapi tocakun." },
        { t: "1979 watapi Júpiterpa waqtanta pasarqaniku, 1980 watapitaq Saturnopa waqtanta. Rikurqani hatun tormentankunata, anillonkunata, kawsaq volcánniyuq huk killatapas. Wawqiymi aswan karuta rirqa: Urano, Neptuno watukuq sapalla navem.",
          f: "Voyagerkunam Íopi, Júpiterpa huk killanpi, kawsaq volcánkunata tarirqaku. Voyager 2-llam Uranota (1986), Neptunota (1989) watukurqa." },
        { t: "1990 watapi, cámarankunata wiñaypaq wañuchiyta manaraq, Voyager 1 qipaman qawarqa, huk fotota hurqurqataq. Pachaqa uchuy anqas puntucha hinam rikurirqa, kinwa muhumanta aswan uchuy, Intipa achkinpi tuytuchkaq. Chaypim llapanku karqaku. Chaypim hatun taytamamaykikuna karqaku.",
          f: "«Uchuy anqas puntu» fotota Voyager 1 hurqurqa 1990 febrero 14 punchawpi, Pachamanta yaqa 6000 hunu kilómetro karupi." },
        { t: "2012 watapi Intipa burbujanmanta lluqsirqaniku, quyllurkuna chawpinman yaykurqaniku. Manam runapa ruwasqan imapas aswan karuman chayanchu. Manañam achka kallpayuqchu kaniku, navetaq instrumentonkunata hukmanta hukmanta wañuchichkan. Ichaqa ñuqaqa manam kallpata necesitanichu kunkaykita waqaychanaypaq. Waranqa hunu watatam kayta atini.",
          f: "Voyager 1 2012 watapi quyllurkuna chawpin pachaman yaykurqa, Voyager 2-taq 2018 watapi. Kallpankuqa plutoniomantam hamun, sapa watataq pisiyan, chaymi instrumentokunata wañuchinku." },
        { t: "Kay tuta, Killari, Voyager 1-qa ancha karupim kachkan: señalninqa yaqa huk punchaw tukuytam unan Pachaman chayananpaq. Chaywanpas, discompim simiyki purichkan. Runasimiqa hanaq pachapiñam kachkan. Ñuqanchikmanta ñawpaqtam chayarqa.",
          f: "2026 wata puchukaypi, Voyager 1 yaqa «huk achki punchaw» karupim kachkan: achki hina puriq señalninqa yaqa 24 horatam unan chayananpaq." }
      ]
    },
    spirit: {
      no: "V Raki", title: "Puka wawqiy",
      teaser: "Spirit, 90 punchawllapaq ruwasqa rumi yachaq robot, Martepi suqta watamanta aswanta llamkarqa.",
      status: "2009 watamantapacha «Troy»-pi, Gusev cráterpi samachkan.",
      steps: [
        { t: "Kunan qaway chay pukallaña puntuta, wayllapi achikyachkaqta. Martem, karu primoy. Chaypipas huk qipakuqmi kawsan. Sutinmi Spirit: espíritu. Pacienciawan uyariy; allillamanta rimachkan, allpawan qatasqa kasqanrayku." },
        { t: "Napaykullayki, Killari. Ñuqam Spirit kani, rumi yachaq robot. Suqta ruedayuqmi kani, cámarayuq mástilniyuq, rumikunata qawarinapaq herramientayuq makiyuqpas. Marteman chayarqani 2004 enero killapi, wayra bolsakunawan pillusqa, allpa hawapi pawaspa, ¡hatun pelota hina!",
          f: "Spirit Gusev cráterman chayarqa 2004 enero 4 punchawpi (UTC). Paracaídaswan, wayra bolsakunawanpas takakuyta llampuyachirqa." },
        { t: "Huk hatun cráterman kachawarqaku, Gusev sutiyuqman. Yachaqkunam yuyaykurqaku unay pacha chaypi qucha kasqanta. Llamkayniymi karqa rumikunapi ñawpa yakupa yupinta maskay. 90 Marte punchawpaq misionta quwarqaku. Isqun chunkallapaq.",
          f: "Spiritpa hatun misionninqa 90 solpaq (Marte punchawkuna) yuyaykusqa karqa. Huk solqa yaqa 24 hora 40 minutum." },
        { t: "Ichaqa manam saykurqanichu. Panel solarniykunam allpawan huntakurqa, kallpaytaq tukukurqa... muyuq wayrakuna pasamuspa pichawanankukama, pichana hina. ¡Añay, Martepa wayran! Chaynam suqta watamanta aswanta purirqani.",
          f: "Martepa muyuq allpa wayrankunam Spiritpa panelninkunata achka kutita picharqa, chaymi yuyaykusqanmanta aswan unayta llamkarqa.",
          b: "Runasimipi wayra nisqa viento. Andespiqa ninkum wayra apamun, apakuntaq: trigota wayrachispa erata pichan." },
        { t: "Huk urqukunatam siqarqani, Pachapi Columbia nisqakunata, qanchis astronautakunata yuyarispa. Rumikunatam ñawinchani ñawpa libropa rapinkunata hina. Sapa capam Martepa historianmanta huk rakita willawarqa.",
          f: "Columbia urqukunaqa Columbia transbordadorpa qanchis astronautankunata yuyarispa sutichasqa karqa, 2003 watapi chinkaqkunata.",
          b: "Andespiqa urqukunaqa apukunam: sutiyuq qawaqkuna, napaykusqa, respetasqa." },
        { t: "2006 watapi, ñawpaq ruedaykunamanta huknin manaña muyurqachu. Qipaman purinay karqa, aysaspa. ¿Yachankichu imam karqa? Pakisqa ruedaymi allpata raspaspa yuraq allpata rikurichirqa, yaqa chuya sílice. Chaypi quñi yaku kasqanpa rikuchiyninmi karqa, quñi pukyukuna hina.",
          f: "2007 watapi, Spiritpa sayasqa ruedanmi sílicewan ancha huntasqa allpata rikurichirqa. Yachaqkunam ninku quñi yaku pukyukunapi utaq volcánpa wapsinpi ruwakusqanta: uchuychallay kawsaykunapaq allin kaq pacha." },
        { t: "2009 mayo killapi huk tuqllaman urmarqani: llampu aqum huk qara uranpi pakasqa karqa. Ruedaykunam muyurqa muyurqa, ichaqa aswanmi chinkaykurqani. Ingenierokunam Pachamanta killa killa yanapawarqaku. Llapantam ruwarqaku. Manañam lluqsiyta atirqanichu.",
          f: "Spirit 2009 watapi «Troy» sutiyuq maypi llampu aqupi hapisqa karqa. 2010 watapi NASA sayaq yachay plataformaman tikrarqa." },
        { t: "Upallalla qipakurqani, kikin hanaq pachata qawaspa. Martepa chiri pachan chayamurqa, unay, chiriraq, panelniykunataq manaña Intiman aypakurqachu. 2010 marzo 22 punchawpi Pachaman qipa kaq willakuyniyta kacharqani. Chaymantaqa, upallalla.",
          f: "Spiritpa qipa kaq rimanakuyninqa 2010 marzo 22 punchawpim karqa. NASA-qa 2011 mayo 25 punchawpi rimapayayta tukurqa." },
        { t: "Yachaqkunam ninku allpaqa allillamanta qatachkawasqanta. Ichaqa manam sapallaychu kani: kikinchay panay, Opportunity, 45 kilómetromanta aswanta purirqa —¡huk maratón!— 2018 watapi puñukuyta manaraq. Ñuqaqa yaqa 8-ta purirqani. Sapa metrom yachay karqa.",
          f: "Spirit 7,73 km-ta purirqa. Kikinchay panan Opportunity 45,16 km-ta purirqa, qipa señalnintataq 2018 junio killapi kacharqa, hatun allpa tormenta chawpinpi." },
        { t: "Killariqa Spiritmanta yuyaymanaspa qipakurqa. —Hatun mama, ¿pitaq chaypi qawan? Hatun mamaqa chullpakunamanta willarqa: rumi torrekuna, ñawpa runakunapa ayankuna hanaq pachata qawaspa waqaychasqa kanankupaq. —Yuyaymi qawan, wawa. Yuyarisqaqa manam wañunchu.",
          b: "Chullpakunaqa Andespa rumimanta utaq ticamanta aya torrenkunam. Arqueólogokunam qawarinku, ñawpa kaq hina waqaychankutaq. NASA-wan hanaq pacha arqueólogokunapas Killapi, Martepi saqisqa imakunata kikin hinam qawanku." }
      ]
    },
    ingenuity: {
      no: "VI Raki", title: "Martepa qintin",
      teaser: "Ingenuity, huk planetapi ñawpaq kaq pawayta ruwaq uchuy helicóptero.",
      status: "Jezero cráterpi samachkan, willakuykunata waqaychaspa.",
      steps: [
        { t: "Ichaqa manam llapan Marte willakuykunachu suyaymanta. Kanmi pawaymanta huk. Spiritmanta chunka qanchisniyuq wata qipata, Marteman huk robotmi chayarqa: Perseverance. Wiksan urapitaq, maman raprapa urapi uña hina, uchuy helicópterom pakasqa hamurqa.",
          f: "Perseverance Jezero cráterman chayarqa 2021 febrero 18 punchawpi, Ingenuity helicópterota chasisninpa uranpi watasqa." },
        { t: "¡Napaykullayki, Killari! Ñuqam Ingenuity kani, «yuyaysapa» ninanmi. 1,8 kilollatam llasani, hatun wallpa hina. Iskay hélicekunam kan, huknin hukninpa hawanpi, mana kaqlla ladoman muyuq. Manam pipas yacharqachu Martepa wayranpi imapas pawayta atinanta.",
          f: "Ingenuity 1,8 kg-tam llasarqa, iskay rotorniyuqtaq karqa, mana kaqlla ladoman muyuq. Tecnología rikuchiymi karqa." },
        { t: "Martepa wayranqa ancha llañum: chaypi pawayqa Pachapi 30 kilómetro hanaqpi pawayta munay hinam, ima avionmantapas aswan hanaqpi. Chaymi hélicekunay sapa minutu yaqa 2400 kutita muyunanku karqa.",
          f: "Martepa wayranqa Pachapa wayranmanta yaqa 1 % sinchillam. Ingenuitypa rotornkunaqa sapa minutu yaqa 2400 kutitam muyurqa.",
          b: "Andespiqa kuntur hanaqtam pawan, wayra llañuña kaqpi. Ingenuityqa ñuqanchikpa wayranchikmanta pachak kuti aswan llañu wayrapim pawanan karqa." },
        { t: "2021 abril 19 punchawpi kimsa metrota huqarikurqani, wakin segundokuna tuytuspa, uraykamurqanitaq. ¡Huk planetapi ñawpaq kaq motorwan pawaymi karqa! Panelniykuna urapi Wright wawqikunapa avionninpa uchuy telantam aparqani, Pachapi ñawpaq pawaqta.",
          f: "2021 abril 19 punchawpi, Ingenuity huk planetapi ñawpaq kaq motoryuq, kamachisqa pawayta ruwarqa. Wright wawqikunapa 1903 Flyer avionninpa uchuy telantam aparqa." },
        { t: "Pichqa pawaytam mañakuwarqaku. Ñuqataq 72-ta ruwarqani. Llapanpi yaqa 17 kilómetrota pawarqani, Perseverancetataq ñanta tarinanpaq yanaparqani, ñawpaqta hanaqmanta qawaq hina.",
          f: "Ingenuityqa 5 pawaykunallapaq ruwasqa karqa. Yaqa kimsa watapi 72 pawaykunata ruwarqa, Perseverancepaq hanaqmanta qawaq hina.",
          b: "Runasimipi picaflortaqa qinti ninku. Uchuychallaymi, ichaqa mana saykuqmi. Pachak watakuna ñawpaqta, Nasca chunniqpi, hatun qintim allpapi siqisqa karqa; hanaqmantallam llapanta rikuyta atikun." },
        { t: "2024 enero killapi, 72 kaq pawaypi, hélicekunaymanta hukninmi pakikurqa uraykamuptiy. Manañam pawayta atirqanichu. Ingenierokunaymi llakikurqaku, ñuqapas, imaynallapas. Ichaqa manam llapanpichu wañukurqani.",
          f: "72 kaq pawayninpi, 2024 enero killapi, Ingenuity palankunata pakirqa. NASA-qa 2024 enero 25 punchawpi misionta tukurqa." },
        { t: "Kunanqa Marte chunniqpi uchuy estaciónmi kani. Sapa punchaw rikchani, quñiyta tupuni, huk fotota hurquni, willakuykunatataq waqaychani. Ichapas achka wata qipata pipas hamunqa ñawinchananpaq. Ñuqataq waqaychachkasaq, kipu hina.",
          f: "Misionnin tukusqanmanta, Ingenuityqa willakuykunata qillqayta qatinanpaq churasqa karqa; watakunatam waqaychanman, pipas hamuq pachapi hurqunanpaq.",
          b: "Kipuqa Andes waskakunam, kipuyuq: Tawantinsuyupa yupaykunata, yuyaykunatapas waqaychaqku. Ingenuitypa willakuyninkunaqa kikinpa kipunmi." }
      ]
    },
    memoria: {
      no: "Puchukaynin", title: "Mana qunqanakuna",
      teaser: "Killarim willakuykunata masinkunapa siminpi willakun.",
      steps: [
        { t: "Rikunkiñam, Killari. Ñuqa hawapim pachak pachak imakuna samachkan: carritokuna, rirpukuna, cámarakuna, herramientakuna, yupikuna. Martepim kallpasapa robotkuna puñuchkanku. Intipa hawanpitaq, runasimi kunka purichkanraq. Manam qupachu. Artefactokunam. Ñawpaqninchikpa saqisqanmi.",
          f: "Arqueólogokunam, NASA-pas kay imakunata runakunapa patrimonion hina qawanku. Apolo 11, 17 maykunapaqmi NASA-qa waqaychanapaq yuyaychaykunata qurqa." },
        { t: "Killariqa tutakama rikchasqa qipakurqa. Paqarinnintin, yachaywasipi, clasepa tabletanta hapispa kay willakuykunata willayta qallarirqa. Ichaqa manam castellanopichu willarqa: runasimipim willarqa, hatun maman willasqan hina. Masinkunataq kicharisqa ñawiwan uyarirqaku." },
        { t: "Chaymantam masinkuna chayamurqaku. Punomanta aymara warmacha, bombínninwan. Chawpi sachamanta asháninka wamra, cushmanwan. Awajún wamra, pluma coronanwan. Shipibo-konibo warmacha, kenéwan huntasqa vestidonwan. —¿Ñuqaykupa siminpi willawankikuchu?",
          b: "Perú suyupi 48 ñawpa simikunam rimakun: 44 sacha simikuna, 4 Andes simikuna. Kenéqa shipibo-konibokunapa siqi artenmi; achkam ninku: siqiman tikrasqa takikunam." },
        { t: "Chaynam carritopa, rirpupa, discopa, Spiritpa, Ingenuitypa willakuyninkunaqa purirqaku runasimipi, aymar arupi, asháninkapi, awajúnpi, shipibopi. Yachayqa manam huk simillayuqchu. Yachayqa simiykipipas rimakunmi.",
          f: "INEI-pa 2017 Censonman hina, Perú suyupi 4,4 hunumanta aswan runakunam quechuapi, aimarapi, asháninkapi, awajúnpi utaq shipibo-konibopi rimayta yacharqaku." },
        { t: "2024 watapi, Perú suyu NASA-wan Artemis Rimanakuykunata firmarqa: Killata musuqmanta maskaypi huñukuq tawa chunka hukniyuq kaq suyum karqa. Huk punchawmi, Andesmanta huk warmacha ñuqa hawapi purinqa. Ichapas Huantamanta hamunqa. Ichapas Killari sutiyuq kanqa.",
          f: "Perú suyu Artemis Rimanakuykunata 2024 mayo 30 punchawpi firmarqa. Killata, hanaq pachatapas hawka kawsaypi maskanapaq kamachikuykunam, hanaq pacha patrimoniota waqaychanantapas mañakun." },
        { t: "Ñuqataq suyachkasaq, carritopa waqtanpi, rirpupa waqtanpi, ñawpaq kaq yupipa waqtanpi. Willasaqtaq hamuqkunata, qipakuqkunatapas qawaspa yachasqayta: simiykipi willasqaqa manam qunqakunchu." }
      ]
    }
  };

  const OBJECTS = {
    rover: "Apolo 17-pa Killa rovernin",
    mirror: "Apolo 11-pa láser rirpun",
    record: "Quri Disco · Voyager 1",
    spirit: "Spirit (MER-A)",
    ingenuity: "Ingenuity"
  };

  const REGIONS = { qu: "Andes, quchakuna patan", ay: "Puno, Moquegua, Tacna", cni: "Junín, Ucayali, Pasco, Huánuco", agr: "Uray sacha", shp: "Chawpi Amazonía" };

  /* ---------- unir con el contenido principal ---------- */
  const steps = {};
  Object.keys(CH).forEach((k) => { steps[k] = CH[k]; });
  Y.addLang("qu", { ui: UI, voices: VOICES, ch: CH, objects: OBJECTS, regions: REGIONS });
})();
