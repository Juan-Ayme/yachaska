"""Recorta las piezas del retablo, quita el fondo blanco y las guarda en assets/retablo/.
   python tools/recortar_retablo.py <carpeta-con-las-imagenes>"""
import sys, pathlib
from PIL import Image, ImageDraw, ImageFilter

SRC = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(__file__).resolve().parent.parent / "assets" / "retablo"
OUT.mkdir(parents=True, exist_ok=True)
KEY = (255, 0, 255)


def cutout(im, seeds, thresh=38):
    """Rellena el fondo desde los puntos dados y lo vuelve transparente, con borde suave."""
    rgb = im.convert("RGB")
    work = rgb.copy()
    for s in seeds:
        if work.getpixel(s) != KEY:
            ImageDraw.floodfill(work, s, KEY, thresh=thresh)
    mask = Image.new("L", rgb.size, 255)
    px, mp = work.load(), mask.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            if px[x, y] == KEY:
                mp[x, y] = 0
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = rgb.convert("RGBA")
    out.putalpha(mask)
    return out.crop(mask.getbbox())


def corners(im):
    w, h = im.size
    return [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]


def save(im, name, maxw):
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(OUT / f"{name}.webp", "WEBP", quality=88, method=6)
    print(f"{name}.webp {im.size}")


load = lambda n: Image.open(SRC / f"{n}.jpg")

crest = load(56); save(cutout(crest, corners(crest)), "cresta", 1400)
base = load(57); save(cutout(base, corners(base)), "base", 1400)
marco = load(58); w, h = marco.size
save(cutout(marco, corners(marco) + [(w // 2, h // 2)]), "marco", 1024)  # centro vacío también transparente
lat = load(59); save(cutout(lat, corners(lat)), "pestillo", 400)
dentro = load(60); save(cutout(dentro, corners(dentro)), "puerta-dentro", 800)

# puertas cerradas: fondo azulado claro -> recorte por la caja de las puertas y corte en la unión
doors = load(61).convert("RGB")
d = cutout(doors, corners(doors), thresh=30)
mid = d.width // 2
save(d.crop((0, 0, mid, d.height)), "puerta-izq", 800)
save(d.crop((mid, 0, d.width, d.height)), "puerta-der", 800)
