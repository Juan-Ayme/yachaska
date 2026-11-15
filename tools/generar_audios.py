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
# personaje: (voz, velocidad, tono). Elegidas con las demos de tools/demos_voces.py
VOICE = {
    "es": {
        "killa":     (EMMA, "-14%", "-4Hz"),                  # Emma suave
        "abuela":    (AVA, "-8%", "+0Hz"),                    # Ava
        "rover":     ("es-MX-JorgeNeural", "-6%", "+0Hz"),    # Jorge (mexicano)
        "mirror":    ("es-CO-SalomeNeural", "-8%", "+0Hz"),   # Salomé (colombiana)
        "record":    ("es-US-PalomaNeural", "-6%", "+4Hz"),   # Paloma
        "spirit":    ("es-US-AlonsoNeural", "-10%", "+0Hz"),  # Alonso
        "ingenuity": ("es-MX-JorgeNeural", "+0%", "+16Hz"),   # Jorge, voz pequeña
    },
    "en": {"killa": (AVA, "-10%", "+0Hz"), "abuela": (EMMA, "-8%", "+0Hz")},
}
OBJECTS_EN = (ANDREW, "-8%", "+0Hz")


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
    voice, rate, pitch = VOICE[lang].get(step["who"], OBJECTS_EN)
    out = ROOT / "audio" / lang / f"{step['key']}.mp3"
    async with sem:
        for attempt in range(6):
            try:
                await edge_tts.Communicate(step[lang], voice, rate=rate, pitch=pitch).save(str(out))
                print(f"ok  {lang}/{out.name}  ({voice})")
                return
            except Exception as e:  # red inestable: reintenta
                print(f"…   {lang}/{out.name} reintento {attempt + 1}: {e}")
                await asyncio.sleep(2)
        raise RuntimeError(f"no se pudo generar {out}")


async def main():
    only = set(sys.argv[1:])
    steps = [s for s in load_steps() if not only or s["key"] in only]
    sem = asyncio.Semaphore(2)
    await asyncio.gather(*(one(sem, s, lang) for s in steps for lang in ("es", "en")))
    print(f"\n{len(steps) * 2} audios listos.")


if __name__ == "__main__":
    asyncio.run(main())
