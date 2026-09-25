# HUD PRO — ide për v5.2 (Survival Chance)

> Kjo është ajo që propozoj pasi e lexova modin v5.1.
> Provo gjithçka live në **Survival Lab** (preview në browser) dhe pastaj më thua çka mbetet.

---

## 1. Çka ka tani (v5.1)

| Gjëja | Statusi |
|---|---|
| Fonti | ✅ Futura Extra Bold i ngulitur (Jost Heavy) + fallback në Futura reale të Windows-it |
| Statusi | ⚠️ 5 tekste **të ngurta**: SAFE / CAUTION / DANGER / CRITICAL / NO CHANCE |
| Ngjyrat | ⚠️ 3 ngjyra (safe / warning / critical) që përzihen automatikisht |
| Madhësia | ✅ slider (28–110px), peshë, label scale, outline, glow |
| Emoji | ✅ vetëm 5 emoji të ngurta (😎 😬 😰 😵 💀) |
| Layout | ✅ inline / stacked / compact, pill / card, pozicion me drag |

**Problemi kryesor:** ngjyrat dhe tekstet nuk i kontrollon ti — janë të ngulitura në kod, dhe statusi ka vetëm pesë fjalë të thata. Për shorts drama mungon.

---

## 2. Propozim A — Statusi 2.0 (5 nivele, gjithçka e jotja)

**5 ngjyra të veçanta** (jo 3): `safe` · `caution` · `danger` · `critical` · `dead`
\+ opsion **“blend”**: kalim i butë midis ngjyrave ose ndryshim i menjëhershëm (hard switch).

**5 tekste të editueshme** (shkruaj çka të duash) + **paketa gati me një klik**:

| Niveli | Classic | **Dramatik** (Hollywood) | Streamer | Shqip | Hardcore |
|---|---|---|---|---|---|
| >80% | SAFE | STEADY / HOLDING | WE'RE GOOD | SIGURT | OK |
| 55–80% | CAUTION | TENSE / ON EDGE | UH OH | KUJDES | HMM |
| 20–55% | DANGER | IN PERIL / ONE MORE HIT | OH NO | RREZIK | OUCH |
| 1–20% | CRITICAL | LAST BREATH / BARELY ALIVE | GG / COOKED | KRITIK | PRAY |
| 0% | NO CHANCE | WRECKED / GAME OVER | SKILL ISSUE | KAQ KISH | DOOMED |

**Rrotullim frazash:** në një nivel ka 3 fraza dhe ato ndërrohen çdo ~3s.
Shembull në DANGER: *IN PERIL → ONE MORE HIT → DON'T PUSH IT*. Kjo e bën shumë më “live”.

**+ Kufijtë (thresholds) të lëvizshëm:** ti vendos ku fillon KUJDES / RREZIK / KRITIK.
P.sh. stil “hardcore” → KUJDES që në 90%, RREZIK në 70%, KRITIK në 35%.

---

## 3. Propozim B — Dramatizim (FX)

| FX | Çka bën | Kur aktivizohet |
|---|---|---|
| **Rrahje zemre** | HUD-i pulson, ritmi shpejtohet sa më ulët % (1.25s → 0.40s) | kur % bie |
| **Vignette e kuqe** | skajet e ekranit skuqen gradualisht | nën “KUJDES” |
| **Flash i kuq** | një blic i shkurtër | kur kalon në KRITIK / NO CHANCE |
| **Dridhje** | HUD-i dridhet nga goditja | në çdo përplasje |
| **Impact tekst** | “💥 -18” fluturon në ekran | në përplasje |
| **Efekte teksti** | Neon · Chrome · Gold · Blood · 3D · Glitch · Flicker | gjithmonë (CSS, pa fonte ekstra) |

Efekti i tekstit + rrahja e zemrës + vignette = kombinimi më dramatik, dhe s'kushton asnjë FPS serioz.

---

## 4. Propozim C — Ekstra (ide të mia, thuaj po/jo)

1. **Close-call counter** — sa herë ke zbritur nën 10% pa vdekur (“3 close calls”). E bukur për titull shorti.
2. **Sparkline 30s** — mini grafik poshtë përqindjes që tregon rënien (rrëshqet në animacion).
3. **GAME OVER screen** — kur arrin 0%: ekran i zi me statistika (goditje, shpejtësi max, kohë e mbijetuar) + “R to restart”.
4. **Stream mode** — një buton që fsheh panelin dhe lë vetëm HUD-in për regjistrim.
5. **Zë (eksperiment)** — “thump” i zemrës në rrezik (HTML5 audio brenda UI-së). E provoj vetëm nëse e do dhe nëse BeamNG e lejon.

---

## 5. Renditja që propozoj

1. Statusi 2.0 (tekste + 5 ngjyra + thresholds) — **themelet**
2. FX dramatike (rrahje zemre, vignette, flash, efekte teksti)
3. Ekstra (close-call, sparkline, GAME OVER)
4. Zë / stream mode

Në këtë rend punojmë, nëse pajtohesh. Çdo hap e testojmë në **Survival Lab** përpara se ta fus në mod.
