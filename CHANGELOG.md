# Changelog — HUD PRO (CreatorPack)

## v5.2.0 — “Bangers + Drama”
**Fonti**
- Fonti i HUD-it: **Bangers** (SIL OFL 1.1), i ngulitur si base64 WOFF2 — punon offline, pa instalim.
- Opsione të tjera: Arial Narrow (i vjetri), Impact, Arial Black.
- Fonti shtohet me `tools/embed_fonts.py` (burimi: `tools/fonts/`).

**Statusi**
- 5 nivele me **paketa frazash në anglisht**: Classic · Dramatic · Streamer · Hardcore · Custom.
  - Dramatic: STEADY · TENSE · IN PERIL · LAST BREATH · WRECKED (3 fraza për nivel, rrotullohen çdo 3s)
  - Streamer: WE'RE GOOD · UH OH · OH NO · GG · SKILL ISSUE
  - Hardcore: OK · HMM · OUCH · PRAY · DOOMED
- 5 tekste custom të editueshme + rrotullim i konfigurueshëm.

**Ngjyrat**
- 5 ngjyra: safe / caution / danger / critical / dead (Kujdes #ffd23f dhe Dead #b3122b të reja).
- 3 kufij me slider (80 / 55 / 20 si parazgjedhje) + opsion “blend” ose ndryshim i menjëhershëm.

**FX dramatike**
- FX teksti: Neon · Chrome · Gold · Blood · 3D/Extrude · Glitch · Flicker.
- Rrahje zemre (1.30s → 0.40s), vignette e kuqe, flash në kritik, popup “-34%”, glitch i statusit në kritik, ekran GAME OVER.

**Zë (Web Audio, pa file)**
- Modalitete: Off / Heartbeat / Alerts / Both; volum dhe “nis nën X%”.
- Rrahje zemre që shpejtohet, zhurmë përplasjeje, blic zanor në DANGER/CRITICAL, ton vdekjeje në 0%.

**Stream mode + bindings**
- STREAM MODE me një tast (default **B**): fsheh panelin, rrumullakat dhe guidat 9:16.
- Bindings të reja: “HUD PRO: Toggle stream mode”, “HUD PRO: Reset survival chance”.

**Teste**
- `tools/test_hud.js` — 60+ teste (jsdom + AngularJS) për statusin, ngjyrat, paketat, rrotullimin, stream mode, zërin, persist dhe migrimin nga v5.1.

## v5.1 — Futura + ON/OFF
- Fonti Futura Extra Bold i ngulitur (Jost Heavy), ON/OFF për rrumullakat e makinave dhe Survival Chance.

## v5.0 dhe më herët
- HUD me rrathë makinash, PASS/FAIL, unaza dëmi, guidat 9:16, repair cost, survival chance (v4.3+).
