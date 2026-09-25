#!/usr/bin/env python3
"""
Ngulit fontin Bangers brenda mod-it dhe rifreskon laboratorin.

Përdorimi:
    python3 tools/embed_fonts.py

Çka bën:
  1. Kopjon tools/fonts/*.woff2 në  mod/ui/modules/apps/CreatorPack/
     (Bangers.woff2, Bangers-LatinExt.woff2) — mënyra ma e sigurt.
  2. Gjeneron blloqet @font-face në app.html mes markerave
     /* @fonts:start */ ... /* @fonts:end */, me këtë radhë burimesh:
       local('Bangers')  ->  skedari brenda mod-it  ->  base64 (fallback)
     Kështu fonti punon edhe nëse skedari nuk serviret, edhe pa internet.
  3. Shkruan preview/fonts.css për laboratorin (Survival Lab).

Fonti: Bangers (SIL OFL 1.1) — shiko tools/fonts/Bangers-OFL.txt
"""
import base64
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.path.join(ROOT, "tools", "fonts")
APP_DIR = os.path.join(ROOT, "mod", "ui", "modules", "apps", "CreatorPack")
APP_HTML = os.path.join(APP_DIR, "app.html")
PREVIEW_CSS = os.path.join(ROOT, "preview", "fonts.css")

FAMILY = "Bangers HUD"
URL_BASE = "/ui/modules/apps/CreatorPack"
LOCAL_FALLBACK = "local('Bangers'), local('Bangers Regular')"

# Nën-grupet zyrtare (Google Fonts / Fontsource)
SUBSETS = [
    ("bangers-latin-400-normal.woff2", "Bangers.woff2",
     "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, "
     "U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, "
     "U+2212, U+2215, U+FEFF, U+FFFD"),
    ("bangers-latin-ext-400-normal.woff2", "Bangers-LatinExt.woff2",
     "U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, "
     "U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF"),
]

START = "/* @fonts:start */"
END = "/* @fonts:end */"


def build_css() -> str:
    blocks = []
    for idx, (src_name, mod_name, urange) in enumerate(SUBSETS):
        path = os.path.join(FONT_DIR, src_name)
        if not os.path.exists(path):
            sys.exit(f"✖ Mungon fonti: {path}")
        b64 = base64.b64encode(open(path, "rb").read()).decode("ascii")
        shutil.copy(path, os.path.join(APP_DIR, mod_name))
        parts = []
        if idx == 0:
            parts.append(LOCAL_FALLBACK)
        parts.append(f"url('{URL_BASE}/{mod_name}') format('woff2')")
        parts.append(f"url(data:font/woff2;base64,{b64}) format('woff2')")
        blocks.append(
            "@font-face {\n"
            f"      font-family:'{FAMILY}';\n"
            "      font-style:normal;\n"
            "      font-weight:400;\n"
            "      font-display:swap;\n"
            f"      unicode-range:{urange};\n"
            f"      src:{', '.join(parts)};\n"
            "    }"
        )
    return "\n    ".join(blocks)


def main() -> int:
    css_inline = build_css()

    html = open(APP_HTML, encoding="utf-8").read()
    if START not in html or END not in html:
        sys.exit(f"✖ Nuk i gjeta markerat {START} / {END} në app.html")

    body = (
        f"{START}\n"
        "    /* Fonti: Bangers (SIL OFL 1.1). Radha: Bangers lokal -> skedari në mod\n"
        "       -> base64. Kështu punon edhe offline edhe pa instalim. */\n"
        f"    {css_inline}\n"
        f"    {END}"
    )
    new_html = re.sub(re.escape(START) + r".*?" + re.escape(END), body, html, flags=re.S)
    open(APP_HTML, "w", encoding="utf-8").write(new_html)

    # Laboratori: skedar i veçantë CSS (i referuar nga hud-lab.html)
    lab_css = re.sub(r"url\('" + re.escape(URL_BASE) + r"/[^']+'\) format\('woff2'\), ", "", css_inline)
    preview = ("/* Gjeneruar nga tools/embed_fonts.py — mos e edito me dorë. */\n"
               "/* Fonti: Bangers (SIL OFL 1.1) */\n\n" + lab_css + "\n")
    os.makedirs(os.path.dirname(PREVIEW_CSS), exist_ok=True)
    open(PREVIEW_CSS, "w", encoding="utf-8").write(preview)

    print(f"✔ Fonti u ngulit: app.html {len(new_html)} chars + preview/fonts.css")
    print("  skedarët në mod:", ", ".join(m for _, m, _ in SUBSETS))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
