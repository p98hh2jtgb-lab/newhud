HUD PRO v5.2.1 — BANGERS EVERYWHERE + CLEARER STATUS + NO RED SCREEN
=====================================================================

FIXES IN v5.2.1 (lexoji këto të parat)
--------------------------------------
1) FONTI: Bangers tani aplikohet me të vërtetë. Në v5.2 blloqet @font-face u
   shtuan, por widget-i vazhdonte të kërkonte 'Futura Extra Bold' — prandaj
   shihje një font tjetër. Tani:
     - fonti bazë i HUD-it është 'Bangers HUD' (i ngulitur);
     - titulli "SURVIVAL CHANCE", përqindja dhe statusi (SAFE e këto) kanë
       TË NJËJTIN font — por NGYJRAT mbeten të ndara si ma parë;
     - Bangers ka vetëm një peshë (400): u hoq bold/italic-i i rremë që e
       bënte të turbullt;
     - fonti vjen edhe si skedar (Bangers.woff2 / Bangers-LatinExt.woff2)
       edhe si base64 — punon gjithsesi, edhe offline.
2) EKRANI I KUQ: vignette-a që skuqte krejt ekranin u hoq KREJT. Në vend të
   saj ka një AUREOLË dramatike vetëm rreth HUD-it, me ngjyrën e rrezikut —
   loja mbetet e pastër. DRAMA -> "Aureolë dramatike rreth HUD-it".
3) GAME OVER: overlay-i gjigant mbi lojën u hoq. Tani del një VULË kompakte
   "TOTALED" brenda HUD-it (teksti, kohëzgjatja dhe ON/OFF të editueshme).
   Ma e qartë për audiencën dhe nuk t'zë ekranin.
4) EMOJI: bug-u që shfaqte 💀 edhe në 100% u rregullua (emoji zgjidhet nga
   niveli, jo nga fjala e paketës). Emoji-t tani janë TË EDITUESHME: 5 fusha
   te SURVIVAL -> Emoji Mood.
5) FRAZAT 20% -> 0% u bënë ma të qarta për audiencën:
     Dramatic : CRITICAL · ONE HIT AWAY · ALMOST WRECKED  ->  TOTALED / WRECKED
     Streamer : ONE HP · COOKED · GG                      ->  WRECKED / SKILL ISSUE
     Kujdesi  : CAREFUL · TENSE · GETTING RISKY
     Rreziku  : DANGER · ONE MORE HIT · BACK OFF

ORIGJINALI I v5.2
-----------------

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
