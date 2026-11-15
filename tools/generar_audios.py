"""
YACHASKA – regenera la narración en castellano e inglés a partir de js/story.js.

    python -m pip install edge-tts
    python tools/generar_audios.py            # todos
    python tools/generar_audios.py rover-3    # solo una escena

Voces (Microsoft neural "Multilingual", las más naturales; vía edge-tts, necesita internet):
  la Killa  → Emma (castellano) / Ava (inglés)
  la abuela → Ava (castellano) / Emma (inglés), para que se distinga de la Killa
  los objetos (rover, espejo, disco, Spirit, Ingenuity) → Andrew
El quechua (audio/qu) NO se toca: se reemplazará con grabaciones de hablantes nativos.
"""
import asyncio
import json
import pathlib
import subprocess
import sys

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
EMMA, AVA, ANDREW = "en-US-EmmaMultilingualNeural", "en-US-AvaMultilingualNeural", "en-US-AndrewMultilingualNeural"
VOICE = {
    "es": {"killa": EMMA, "abuela": AVA},
    "en": {"killa": AVA, "abuela": EMMA},
}
OBJECTS = ANDREW
RATE = "-8%"  # un poco más pausado, para niñas y niños


def load_steps():
    js = (
        "global.window={};require('./js/story.js');"
        "const out=[];window.YACHASKA.CHAPTERS.forEach(ch=>ch.steps.forEach((s,i)=>"
        "out.push({key:ch.id+'-'+(i+1),who:s.who||ch.voice,es:s.t.es,en:s.t.en})));"
        "process.stdout.write(JSON.stringify(out))"
    )
    raw = subprocess.check_output(["node", "-e", js], cwd=ROOT)
    return json.loads(raw.decode("utf-8"))


async def one(sem, step, lang):
    voice = VOICE[lang].get(step["who"], OBJECTS)
    out = ROOT / "audio" / lang / f"{step['key']}.mp3"
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(step[lang], voice, rate=RATE).save(str(out))
                print(f"ok  {lang}/{out.name}  ({voice})")
                return
            except Exception as e:  # red inestable: reintenta
                print(f"…   {lang}/{out.name} reintento {attempt + 1}: {e}")
                await asyncio.sleep(2)
        raise RuntimeError(f"no se pudo generar {out}")


async def main():
    only = set(sys.argv[1:])
    steps = [s for s in load_steps() if not only or s["key"] in only]
    sem = asyncio.Semaphore(4)
    await asyncio.gather(*(one(sem, s, lang) for s in steps for lang in ("es", "en")))
    print(f"\n{len(steps) * 2} audios listos.")


if __name__ == "__main__":
    asyncio.run(main())
