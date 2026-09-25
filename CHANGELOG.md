# Changelog — HUD PRO (CreatorPack)

## v5.3.0 — “Sigurim + diagnostikë” (kjo është versioni i pastër)
**Pse kjo version?** Përdoruesi raportoi se pas instalimit “nuk ndryshoi asgjë”. Shkaku ma i zakonshëm: dy ZIP-e CreatorPack njëkohësisht në dosjen e mod-eve (i vjetri fiton). Kjo version e bën të pamundur ngatërrimin:

- **Badge i versionit brenda HUD-it**: titulli i panelit tani thotë `HUD PRO Pass/Fail  [v5.3.0]`.
- **Toast në nisje** (6s): “HUD PRO 5.3.0 u ngarkua ✓ — Fonti Bangers: OK ✓ / NUK u ngarkua ✗”.
- **DIAGNOSTIKA** (tab TJERA): versioni i ngarkuar, gjendja e fontit (`document.fonts.check`), fonti në përdorim, konfirmim që ekrani i kuq dhe overlay GAME OVER janë hequr, çelësi i ruajtjes. Me buton “Trego toast-in përsëri”.
- **README i ri** me hap pas hapi + seksion troubleshooting.
- ZIP-i quhet **CreatorPack_v5.3.0_BANGERS_FIX.zip** dhe është i vetmi ZIP i modit në repo (të vjetrit u fshinë).

Përmbajtja funksionale = v5.2.1 (Bangers kudo, pa ekran të kuq, vulë TOTALED, fraza të qarta, emoji fix).

## v5.2.1 — “Bangers kudo + pa ekran të kuq”
## v5.2.1 — “Bangers kudo + pa ekran të kuq”
**Rregullime**
- **Fonti Bangers nuk aplikohej** në v5.2: blloqet `@font-face` ekzistonin, por `.pf-survival` kërkonte ende `'Futura Extra Bold'`. Tani baza është `'Bangers HUD'` → titulli, `%` dhe statusi kanë të njëjtin font (ngjyrat mbeten të ndara).
- Bangers vjen edhe si **skedar** (`Bangers.woff2`, `Bangers-LatinExt.woff2` brenda mod-it) edhe si **base64** → punon edhe nëse njëra rrugë bllokohet, edhe offline.
- U hoq **bold/italic-i i rremë** për Bangers (fonti ka vetëm peshën 400) — teksti nuk duket ma i turbullt.
- **Emoji bug**: shfaqej gjithmonë 💀 (edhe në 100%) sepse krahasohej fjala e paketës me `'SAFE'`. Tani emoji zgjidhet nga **niveli** dhe është i editueshëm (5 fusha).
- **Ekrani i kuq u hoq**: vignette-a që skuqte krejt ekranin u zëvendësua me një **aureolë lokale** rreth HUD-it (ngjyra e rrezikut).
- **GAME OVER** gjigant mbi lojën u hoq → **vulë kompakte “TOTALED”** brenda HUD-it (tekst + kohëzgjatje + ON/OFF).

**Tekste ma të qarta (20% → 0%)**
- Dramatic: `CRITICAL` · `ONE HIT AWAY` · `ALMOST WRECKED` → `TOTALED` · `WRECKED` · `GAME OVER`
- Streamer: `ONE HP` · `COOKED` · `GG` → `WRECKED` · `SKILL ISSUE` · `SEND IT`
- Kujdes/Rrezik: `CAREFUL` · `TENSE` · `GETTING RISKY` / `DANGER` · `ONE MORE HIT` · `BACK OFF`

**Migrim**
- `survivalFontFamily: 'futura'` → `'bangers'`, pesha → 400, italic → off, emoji-t e reja shtohen, `survivalGameOver` → `survivalVerdictOn`, vignette hiqet nga UI. Asgjë tjetër nuk resetohet.

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
