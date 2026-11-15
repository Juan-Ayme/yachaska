"""Genera demos de voz por personaje en demos-voces/ para elegir.  python tools/demos_voces.py"""
import asyncio, pathlib
import edge_tts

OUT = pathlib.Path(__file__).resolve().parent.parent / "demos-voces"
OUT.mkdir(exist_ok=True)
EMMA, AVA = "en-US-EmmaMultilingualNeural", "en-US-AvaMultilingualNeural"
ANDREW, BRIAN = "en-US-AndrewMultilingualNeural", "en-US-BrianMultilingualNeural"

# personaje: (frase, [(opción, voz, velocidad, tono)])
DEMOS = {
    "1-killa": ("Hola. Soy la Killa, la Luna. Desde el cielo miro los cerros de Huanta. Veo el maíz, el río y a las abuelas que cuentan cuentos de noche.", [
        ("A-Emma-actual", EMMA, "-8%", "+0Hz"), ("B-Emma-suave", EMMA, "-14%", "-4Hz"),
        ("C-Ava", AVA, "-10%", "+0Hz"), ("D-Camila-peruana", "es-PE-CamilaNeural", "-10%", "+0Hz")]),
    "2-abuela": ("—Mira, Killari. Ese camino de estrellas es el Mayu, el río del cielo. Y en la parte oscura camina una llama con su bebé.", [
        ("A-Ava-actual", AVA, "-8%", "+0Hz"), ("B-Ava-mayor", AVA, "-16%", "-12Hz"),
        ("C-Dalia-mexicana-mayor", "es-MX-DaliaNeural", "-16%", "-10Hz"), ("D-Elena-argentina-mayor", "es-AR-ElenaNeural", "-16%", "-10Hz")]),
    "3-rover": ("¡Hola, Killari! Soy un carrito eléctrico, el rover lunar. Llegué en 1972, doblado como una hoja de papel. Los astronautas me abrieron… ¡y a rodar!", [
        ("A-Andrew-actual", ANDREW, "-8%", "+0Hz"), ("B-Brian-alegre", BRIAN, "-4%", "+4Hz"),
        ("C-Alex-peruano", "es-PE-AlexNeural", "-6%", "+0Hz"), ("D-Jorge-mexicano", "es-MX-JorgeNeural", "-6%", "+0Hz")]),
    "4-espejo": ("Tengo un truco: si me llega luz, la devuelvo por el mismo camino. Como cuando lanzas una pelota a la pared… ¡y vuelve a tus manos!", [
        ("A-Andrew-actual", ANDREW, "-8%", "+0Hz"), ("B-Andrew-tranquilo", ANDREW, "-14%", "-6Hz"),
        ("C-Gonzalo-colombiano", "es-CO-GonzaloNeural", "-10%", "-4Hz"), ("D-Salome-colombiana", "es-CO-SalomeNeural", "-8%", "+0Hz")]),
    "5-disco": ("¡Hola, Killari! Soy un disco de oro. Viajo pegado a la nave, como una carta dentro de un sobre. Mi gemelo va en la otra nave.", [
        ("A-Andrew-actual", ANDREW, "-8%", "+0Hz"), ("B-Brian-brillante", BRIAN, "-6%", "+8Hz"),
        ("C-Emma-alegre", EMMA, "-6%", "+6Hz"), ("D-Paloma", "es-US-PalomaNeural", "-6%", "+4Hz")]),
    "6-spirit": ("¡Hola, Killari! Soy Spirit, un robot que estudia piedras. Llegué a Marte en 2004, envuelto en globos. ¡Reboté y reboté como una pelota gigante!", [
        ("A-Andrew-actual", ANDREW, "-8%", "+0Hz"), ("B-Brian-cansadito", BRIAN, "-14%", "-6Hz"),
        ("C-Tomas-argentino", "es-AR-TomasNeural", "-10%", "+0Hz"), ("D-Alonso", "es-US-AlonsoNeural", "-10%", "+0Hz")]),
    "7-ingenuity": ("¡Hola, Killari! Soy Ingenuity. Peso como una gallina y tengo dos hélices que giran muy rápido. Nadie sabía si podría volar en Marte.", [
        ("A-Andrew-actual", ANDREW, "-8%", "+0Hz"), ("B-Brian-pequeno", BRIAN, "+2%", "+18Hz"),
        ("C-Emma-chispita", EMMA, "+0%", "+14Hz"), ("D-Jorge-pequeno", "es-MX-JorgeNeural", "+0%", "+16Hz")]),
}

async def main():
    for who, (text, opts) in DEMOS.items():
        for name, voice, rate, pitch in opts:
            out = OUT / f"{who}--{name}.mp3"
            if out.exists() and out.stat().st_size > 5000: continue
            for i in range(4):
                try:
                    await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(out)); print("ok", out.name); break
                except Exception as e:
                    print("reintento", out.name, e); await asyncio.sleep(2)

asyncio.run(main())
