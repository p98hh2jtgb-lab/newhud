#!/usr/bin/env python3
"""
Ndërton ZIP-in e mod-it nga dosja mod/ (burbuqa = dosja mod/).

Përdorimi:
    python3 tools/build_zip.py            # version + tag automatik
    python3 tools/build_zip.py mystag     # tag i personalizuar

Rezultati: CreatorPack_v<version>_<TAG>.zip në rrënjën e repo-s.
"""
import json
import os
import re
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "mod")
MOD_JSON = os.path.join(SRC, "mod.json")

# Skedarë që nuk duhet të përfundojnë kurrë brenda ZIP-it
SKIP_NAMES = {".DS_Store", "Thumbs.db", "__pycache__", ".gitkeep"}
SKIP_EXT = {".pyc", ".pyo", ".log", ".bak", ".zip"}


def main() -> int:
    with open(MOD_JSON, encoding="utf-8") as fh:
        mod = json.load(fh)
    version = str(mod.get("version", "0.0.0")).strip()
    tag = (sys.argv[1] if len(sys.argv) > 1 else "").strip()
    tag = re.sub(r"[^A-Za-z0-9._-]+", "_", tag).strip("_").upper()
    name = f"CreatorPack_v{version}" + (f"_{tag}" if tag else "") + ".zip"
    out = os.path.join(ROOT, name)

    files = []
    for base, dirs, names in os.walk(SRC):
        dirs[:] = [d for d in dirs if d not in SKIP_NAMES]
        for n in sorted(names):
            if n in SKIP_NAMES or os.path.splitext(n)[1].lower() in SKIP_EXT:
                continue
            full = os.path.join(base, n)
            files.append((full, os.path.relpath(full, SRC)))

    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for full, rel in sorted(files, key=lambda x: x[1]):
            zf.write(full, rel.replace(os.sep, "/"))

    size = os.path.getsize(out)
    print(f"✔ {name}  ({len(files)} files, {size/1024:.1f} KB)")
    for _, rel in sorted(files, key=lambda x: x[1]):
        print("   ", rel)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
