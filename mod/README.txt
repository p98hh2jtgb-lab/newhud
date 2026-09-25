HUD PRO v5.3.0 — LEXO KËTË TË PARË (INSTALIM I SIGURT)
======================================================
⚠ NËSE NUK PA NDONJË NDRYSHIM KUR E INSTALOVE VERSIONIN E KALUAR,
  SHKAKU MA I ZAKONSHËM: ka ende ZIP të vjetër CreatorPack në dosjen e mod-eve.
  BeamNG i ngarkon TË DYJA dhe shpesh fiton i vjetri.

INSTALIM HAP PAS HAPI
---------------------
1. Hape dosjen:  Documents\BeamNG.drive\mods
2. FSHIJ çdo gjë që ka të bëjë me CreatorPack / HUD PRO:
      - CreatorPack_v5.0*.zip / v5.1*.zip / v5.2*.zip  (krejt versionet e vjetra)
      - çdo DOSJE e ekstraktuar "CreatorPack" ose "unpacked/CreatorPack"
   Lëre VETËM një skedar:  CreatorPack_v5.3.0_BANGERS_FIX.zip
3. Kopjo ZIP-in e re (MOS e ekstrakto).
4. START BEAMNG (nëse loja është hapur, ZIP-i i re nuk shihet!).
   Në lojë:  Mods -> Reload UI  (ose restart i plotë).
5. Hap panelin e HUD-it dhe shiko:

       HUD PRO Pass/Fail  [v5.3.0]

   Si dhe një toast lart për 6 sekonda:

       HUD PRO 5.3.0 u ngarkua ✓
       Fonti Bangers: OK ✓ · Pa ekran të kuq · Vula "TOTALED"

   Nëse shkruan v5.3.0 -> versioni i re është aktiv.
   Nëse shkruan ndonjë version tjetër (ose asgjë) -> ende po ngarkohet ZIP i vjetër.

KONTROLL I SHPEJTË: tab-i  TJERA -> "DIAGNOSTIKA (v5.3.0)"
   - Versioni i ngarkuar
   - Fonti Bangers: PO ✓ / JO ✗  (+ shpjegim nëse nuk u ngarkua)
   - Fonti i HUD-it në përdorim
   - Konfirmim: ekrani i kuq HEQUR, overlay GAME OVER HEQUR

ÇKA U RREGULLUA NË v5.3.0 (kundrejt v5.2.1)
-------------------------------------------
1) Fonti Bangers aplikohet ME TË VËRTETË: titulli "SURVIVAL CHANCE", përqindja
   dhe statusi (SAFE/DANGER e këto) ndajnë të njëjtin font; NGYJRAT mbeten të ndara.
   (Në v5.2 blloqet @font-face ekzistonin, por widget-i kërkonte ende Futura-s.)
2) EKRANI I KUQ u hoq KREJT. Në vend të tij: aureolë dramatike vetëm rreth HUD-it.
3) "GAME OVER" gjigant u hoq -> vulë kompakte "TOTALED" brenda HUD-it.
4) Emoji 💀 në 100% (bug) u rregullua; emoji-t tani janë të editueshme.
5) Frazat 20% -> 0% u bënë ma të qarta:
      CRITICAL · ONE HIT AWAY · ALMOST WRECKED  ->  TOTALED · WRECKED
      ONE HP · COOKED · GG                      ->  WRECKED · SKILL ISSUE
6) Versioni shfaqet brenda HUD-it + toast në nisje + DIAGNOSTIKA.

ORIGJINALI I v5.2 (referencë)
-----------------------------
1) Fonti Bangers aplikohet ME TË VËRTETË: titulli "SURVIVAL CHANCE", përqindja
   dhe statusi (SAFE/DANGER e këto) ndajnë të njëjtin font; NGYJRAT mbeten të ndara.
   (Në v5.2 blloqet @font-face ekzistonin, por widget-i kërkonte ende Futura-s.)
2) EKRANI I KUQ u hoq KREJT. Në vend të tij: aureolë dramatike vetëm rreth HUD-it.
3) "GAME OVER" gjigant u hoq -> vulë kompakte "TOTALED" brenda HUD-it.
4) Emoji 💀 në 100% (bug) u rregullua; emoji-t tani janë të editueshme.
5) Frazat 20% -> 0% u bënë ma të qarta:
      CRITICAL · ONE HIT AWAY · ALMOST WRECKED  ->  TOTALED · WRECKED
      ONE HP · COOKED · GG                      ->  WRECKED · SKILL ISSUE
6) Versioni shfaqet brenda HUD-it + toast në nisje + DIAGNOSTIKA.

ORIGJINALI I v5.2 (referencë)
-----------------------------
WHAT'S NEW IN v5.2
------------------
1) Font: Bangers (SIL OFL 1.1) is embedded inside the HUD as base64 WOFF2.
   No install needed and it works offline. If you have Bangers installed in
   Windows, your local copy is used instead.
   Other options in SURVIVAL -> Typography & FX: Arial Narrow (the old one),
   Impact, Arial Black.

2) Dramatic status packs (English). The status word is no longer hard-coded:
   - Classic  : SAFE · CAUTION · DANGER · CRITICAL · NO CHANCE
   - Dramatic : STEADY · TENSE · IN PERIL · LAST BREATH · WRECKED
                (3 phrases per level, they rotate while you drive)
   - Streamer : WE'RE GOOD · UH OH · OH NO · GG · SKILL ISSUE
   - Hardcore : OK · HMM · OUCH · PRAY · DOOMED
   - Custom   : write your own 5 phrases (max 18 chars each)
   Rotation speed and on/off are configurable.

3) Five editable risk colors instead of three:
   safe > 80% · caution <= 80% · danger <= 55% · critical <= 20% · 0%
   All thresholds are sliders and every color has a picker.
   "Blend" mixes the colors smoothly; turn it off for hard switching.

4) Text FX (pure CSS, no FPS cost): Normal · Neon · Chrome · Gold · Blood ·
   3D/Extrude · Glitch · Flicker.

5) Drama:
   - Heartbeat: the whole HUD pulses like a heart, faster and stronger as the
     percentage drops (1.30s -> 0.40s).
   - Red vignette: the screen edges slowly bleed red under the caution level.
   - Red flash when you drop into CRITICAL or 0%.
   - Big "-34%" impact popup in the middle of the screen on every hit.
   - Status glitch while you are in critical.
   - GAME OVER screen when Survival Chance reaches 0% (text is editable).

6) SOUND (no audio files, generated live with Web Audio):
   - Heartbeat: lub-dub that speeds up as the percentage drops.
   - Alerts: crash noise on impacts, warning beeps in DANGER / CRITICAL, a
     death tone at 0%.
   - Modes: Off / Heartbeat / Alerts / Both, with volume and "start below %".
   - Sound is never part of your recording and never touches the game audio.
   Test it with DRAMA -> "Testo zërin".

7) STREAM MODE (one key, default B)
   Hides the config panel, the vehicle circles and the 9:16 guides, leaving
   only Survival Chance on screen. Press the key again to restore everything
   exactly as it was. The mini ⚙ button in the corner brings the panel back.

8) New real bindings (Options -> Controls):
   - HUD PRO: Toggle stream mode
   - HUD PRO: Reset survival chance
   Together with the existing pass/fail/next/prev/circles bindings.

INSTALL
-------
1. Disable or delete any older CreatorPack ZIP/folder (including v5.0/v5.1).
2. Drop this ZIP directly into  Documents/BeamNG.drive/mods  (do not extract).
3. Restart BeamNG or use Reload UI.

CONTROLS
--------
K           PASS current        L           FAIL current
PageUp/4    previous            PageDown/6  next
G           reset marks         H           config panel
V           vehicle circles     B           STREAM MODE
Ctrl+Z      undo

All of them can be remapped in  Options -> Controls.

MIGRATION
---------
Old saved configs are upgraded automatically: the dramatic pack, the five
colors, drama FX and the sound are enabled, and your custom size/position/
fonts stay exactly where they were. Nothing is reset.

CREDITS
-------
Bangers by The Bangers Project Authors — SIL Open Font License 1.1
(tools/fonts/Bangers-OFL.txt in the source repo, Bangers-OFL.txt in this ZIP).
Everything else (Lua + AngularJS app) is daimy's CreatorPack / HUD PRO.
