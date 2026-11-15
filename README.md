# YACHASKA – What the Moon Saw / Lo que la Luna vio

**NASA Space Apps Challenge 2026 · Ayacucho, Peru · Challenge: _Abandoned but not Forgotten_**

**Live site:** https://yachaska-ayacucho.netlify.app

YACHASKA is a scroll-driven interactive web story for children (8–14) of the Andes and the Amazon. The objects NASA left on the Moon, on Mars and in deep space come alive and tell their own story in first person. They are introduced by **Killa, the Moon**, to **Killari**, a girl from Huanta (Ayacucho).

Each scene pairs a short poetic text with an original layered illustration, a verifiable **NASA fact** with its source, and an **Andean bridge** that connects the science to local knowledge (the dark-cloud llama Yacana, chasqui runners, chullpas, quipus, the q'inti hummingbird…).

## The story (8 chapters · 56 scenes)

| # | Chapter | Who speaks | NASA hardware |
|---|---|---|---|
| Prologue | A night in Huanta | Killa (the Moon) | – |
| I | I, Killa | Killa | The Moon, Apollo 11 |
| II | The cart that chose to stay | Apollo 17 Lunar Roving Vehicle | LRV (Apollo 15, 16, 17) |
| III | The mirror that still answers | Apollo 11 laser retroreflector | LRRR (still in use) |
| IV | A voice that went to the stars | Voyager Golden Record | Voyager 1 & 2 – Quechua greeting |
| V | My red brother | Spirit (MER-A) | Spirit, Opportunity |
| VI | The hummingbird of Mars | Ingenuity | Ingenuity, Perseverance |
| Epilogue | What is not forgotten | Killa | Catalogue of human-made material on the Moon, Artemis Accords (Peru, 2024) |

Final message: _what is told in your language is never forgotten._

## Languages

- **Spanish** and **English**: full text.
- **Quechua (Chanka)**: full story, facts, Andean bridges and interface (`js/story-qu.js`). It is an **AI-assisted draft** and must be reviewed and recorded by native Chanka Quechua speakers before the final submission. The Golden Record greeting is kept exactly as NASA publishes it.
- **Aymara** (`js/story-ay.js`): full AI-assisted draft, pending native-speaker review.
- **Asháninka** (`js/story-cni.js`) and **Shipibo-Konibo** (`js/story-shp.js`): full but short, **low-confidence** AI-assisted drafts with probable errors; technical words are Spanish loans. They must be corrected and recorded by native speakers before being presented as final.
- **Awajún** (`js/story-agr.js`): full but short, low-confidence AI-assisted draft.
- **Audio** (`audio/<es|en|qu>/<chapter>-<step>.mp3`, 168 files): Spanish and English with Microsoft Multilingual neural voices via `edge-tts` (Killa: Emma in Spanish, Ava in English; grandmother: the other one; the objects: Andrew), see `tools/generar_audios.py`; Quechua via Meta MMS-TTS `facebook/mms-tts-quy` (Ayacucho Quechua, CC-BY-NC 4.0, non-commercial). The Quechua voice is synthetic and skips digits; replace it with a native speaker's recording using the same file names. Aymara, Asháninka, Awajún and Shipibo play the Spanish audio.

The page opens in **English** and **dark mode** by default; the reader's choice is remembered.

## Run it

No build step, no dependencies.

```bash
python -m http.server 5173
```

Open http://localhost:5173. Deploy by uploading the folder to Netlify or GitHub Pages.

## Structure

```
index.html          page shell
css/styles.css      design tokens (night / day), layout, scene animations
js/story.js         ALL story content (es/en), fact sheets, NASA photos, timeline
js/story-qu.js      Chanka Quechua draft, merged at load time
assets/escenas/     storybook illustrations, one per scene: <chapter-id>-<step>.webp (prologue so far)
assets/nasa/        NASA public-domain photos (Image and Video Library IDs in the file names)
js/scenes.js        8 original SVG illustrations, built in code, with layers per step
js/retablo.js       original Ayacucho-retablo flowers, crest and doors, drawn in code
js/app.js           scrollytelling (IntersectionObserver), language menu, theme, narration, CSV export
sw.js               service worker: the page and its audio work with no internet
assets/             YACHASKA logos (night and day)
audio/qu/           Quechua recordings: <chapter-id>-<step>.mp3  (e.g. rover-3.mp3)
```

- **The retablo experience:** the page opens on a closed Ayacucho retablo; its painted doors swing open and the camera moves into the box. Each chapter is a floor of the retablo: between scenes of the same chapter the light cross-fades, and when you change chapter the doors close and open again (`swingDoors` in `js/app.js`, door painting `doorWide` in `js/retablo.js`).
- **Add illustrations to a chapter:** drop `assets/escenas/<chapter-id>-<step>.webp` (one per step, 16:9) into the folder. If `<chapter-id>-1.webp` exists, the chapter switches from its SVG drawing to the images automatically, framed at the centre. For a custom slow zoom per image, add an `art: [[x, y, zoom], …]` line to that chapter in `js/story.js` (see `huanta`). Bump `?v=` in `index.html` after changing files.
- **Regenerate the narration:** after editing any `es`/`en` text in `js/story.js`, run `python -m pip install edge-tts` once and then `python tools/generar_audios.py` (or `python tools/generar_audios.py rover-3` for one scene). Voices are set at the top of the script. Quechua audio is never touched. Bump the `AUDIO` cache name in `sw.js` and `js/app.js` so phones that saved the audio offline download the new files.
- **Add a translation:** add a `qu` (or `ay`, `cni`, `agr`, `shp`) key next to `es`/`en` in each `t`, `fact` and `bridge` of `js/story.js`, then set the language `status` to `"ok"`.
- **Translator sheet:** the "Download script for translators (CSV)" button at the end of the page exports every step (es, en, one column per Indigenous language, sources, audio file name).
- **Audio:** in Quechua the page plays `audio/qu/<chapter>-<step>.mp3`; if the file is missing it tells the reader and falls back to Spanish speech. Spanish and English use the browser's Web Speech API.

## Offline use

Made for rural schools with weak or no signal. After the first visit the page itself opens with no internet. The "Save to use without internet" button on the cover stores the 56 audio files of the current language on the phone (about 6 MB); every scene already listened to is kept too. Needs HTTPS (or localhost). Nothing leaves the device.

## Accessibility & privacy

Mobile-first, keyboard navigation (← → move between scenes, Esc stops audio), visible focus, `prefers-reduced-motion` respected, night/day switch remembered locally. No server, no cookies, no tracking, no personal data. Children appear only as illustrations, seen from behind.

## NASA data used

All facts link to their source inside the story and in the "Sources" section. Main sources: NASA Science (Moon, Voyager, Golden Record, Spirit, Opportunity, Perseverance, Ingenuity, LRO), NASA NSSDCA (Lunar Roving Vehicle), NASA JPL (Golden Record greetings and music), NASA History Office (Catalogue of Manmade Material on the Moon), NASA (Apollo 11, Apollo 17, Artemis Accords). Speaker figures: INEI 2017 Census.

**Before submitting, the data team must re-check every link and figure** (especially: the Peruvian pieces in the Golden Record music list, the Voyager 1 one-light-day milestone in late 2026, and the exact Quechua greeting text).

## Use of AI

AI (Claude) was used to help write code, to draft the Spanish and English text and to draw the SVG illustrations in code. The Quechua, Aymara, Asháninka, Awajún and Shipibo-Konibo versions are **AI-assisted drafts**: the page labels them as drafts, and they are not final until native speakers review and record them. Spanish and English narration uses Microsoft neural voices; Quechua narration uses Meta MMS-TTS (CC-BY-NC 4.0). All facts are checked against NASA sources. No NASA logos or insignia are used.

## What it does and how (requirements)

Functional:

- Tells one story in 8 chapters and 56 scenes; each scene has a text, an illustration, a NASA fact with its source and an Andean bridge.
- The cover is an Ayacucho **retablo**: a painted crest, doors and one floor per chapter. Tapping a floor opens that story, so the reader chooses the route.
- Reads like a book: two large buttons turn the page; scrolling and the ← → keys do the same. The illustration zooms gently towards what appears in each scene.
- Narration for every scene (Spanish, English, Quechua), automatic or on demand, with one mute button.
- Seven languages, switchable at any moment without losing the place.
- "Save to use without internet" stores the page and the audio of the chosen language on the phone.
- Extras for teachers and judges: timeline, object catalogue, language table, sources, CSV script for translators.

Non-functional:

- **Free**: no cost, no account, no ads.
- **Light**: static files, no build step, no framework; about 2 MB without audio, about 6 MB of audio per language.
- **Works on low-end phones and weak signal**: SVG drawings instead of 3D, audio loaded scene by scene, offline mode.
- **Private**: no server, no cookies, no tracking, no personal data.
- **Accessible**: large touch targets, keyboard navigation, visible focus, readable sans-serif text, reduced-motion respected, night and day themes.
- **Maintainable**: all text lives in `js/story*.js`, separate from code; adding a language is adding one file.

## Inclusion and teaching approach

- Made for children aged 8–14 in rural Andean and Amazonian schools, and for their teachers.
- The science is tied to what the child already knows: each NASA fact has an "Andean bridge" (Yacana, chasquis, quipus, the q'inti hummingbird).
- The retablo, an Ayacucho craft that tells stories floor by floor, is the frame of the whole page, with original flowers drawn in its style.
- Listening comes first: a child who does not read fluently can follow the whole story by ear.
- Short scenes, one idea each; the machines speak in first person so the hardware becomes a character.

## Where the language data comes from

- **Number of speakers and regions**: INEI, 2017 National Census (mother tongue), and the Ministry of Culture's Indigenous Peoples database (bdpi.cultura.gob.pe).
- **Quechua greeting on the Golden Record**: kept exactly as NASA/JPL publishes it.
- **Story text in Indigenous languages**: AI-assisted drafts, as described above, pending review by native speakers. The translator CSV exported from the page is the working sheet for that review.
