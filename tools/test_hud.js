/**
 * Testim end-to-end i HUD PRO v5.2 brenda jsdom + AngularJS.
 * Ngarkon app.js-in e modit, kompajllon template-in dhe provon logjiken e re.
 *   node tools/test_hud.js
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const MOD = path.resolve(__dirname, '..', 'mod', 'ui', 'modules', 'apps', 'CreatorPack');
const HTML = fs.readFileSync(path.join(MOD, 'app.html'), 'utf8');
const JS = fs.readFileSync(path.join(MOD, 'app.js'), 'utf8');

const dom = new JSDOM('<!doctype html><html><body><creatorpack-panel></creatorpack-panel></body></html>', {
  runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/'
});
const win = dom.window;
global.window = win;
global.document = win.document;
global.navigator = win.navigator;
global.HTMLElement = win.HTMLElement;
global.Node = win.Node;
global.getComputedStyle = win.getComputedStyle.bind(win);
global.localStorage = {
  _d: {},
  getItem(k) { return this._d[k] === undefined ? null : this._d[k]; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; }
};
win.localStorage = global.localStorage;

require('angular/angular.js');
const angular = win.angular;
global.angular = angular;
require('angular-mocks/angular-mocks.js');

let failures = 0;
function check(label, cond, extra) {
  if (cond) console.log('  ✔ ' + label);
  else { failures++; console.log('  ✖ ' + label + (extra !== undefined ? '  →  ' + extra : '')); }
}

angular.module('beamng.apps', []);
// app.js regjistron direktivën
new Function(JS)();

const injector = angular.injector(['ng', 'ngMock', 'beamng.apps']);
const $compile = injector.get('$compile');
const $rootScope = injector.get('$rootScope');
const $timeout = injector.get('$timeout');
const $templateCache = injector.get('$templateCache');
$templateCache.put('/ui/modules/apps/CreatorPack/app.html', HTML);

const scope = $rootScope.$new();
const el = win.document.querySelector('creatorpack-panel');
$compile(el)(scope);
$rootScope.$digest();

const iso = scope;   // direktiva nuk krijon isolate scope
check('direktiva u kompilua pa gabime', !!iso, 'isotope scope mungon');
check('scope.cfg ekziston', !!iso.cfg);
check('template-i u vendos', win.document.querySelector('.pf-root') !== null);

const q = (sel) => win.document.querySelector(sel);
const txt = (sel) => (q(sel) ? q(sel).textContent.trim() : null);

console.log('\n— v5.2 defaults —');
check('fonti Bangers është @font-face', HTML.includes("@font-face") && HTML.includes("'Bangers HUD'"));
check('Bangers = fonti bazë i widgetit', /\.pf-survival\s*\{[^}]*font-family:'Bangers HUD'/.test(HTML));
check('Bangers ka skedar .woff2 brenda mod-it', fs.existsSync(path.join(MOD, 'Bangers.woff2')) &&
  HTML.includes("/ui/modules/apps/CreatorPack/Bangers.woff2"));
check('@font-face pa false-bold/italic', /\@font-face\s*\{[^}]*font-weight:400/.test(HTML) &&
  HTML.includes('.pf-survival.font-bangers .pf-survival-value') && HTML.includes('font-style:normal'));
check('cfg.survivalFontFamily = bangers', iso.cfg.survivalFontFamily === 'bangers', iso.cfg.survivalFontFamily);
check('klasa font-bangers aktivizоhet', iso.survivalClass()['font-bangers'] === true);
check('emoji-t janë të editueshme', iso.cfg.survivalEmojiSafe === '😎' && iso.cfg.survivalEmojiDead === '💀');
check('paketa default = dramatic', iso.cfg.survivalStatusPack === 'dramatic', iso.cfg.survivalStatusPack);
check('5 ngjyrat ekzistojnë', ['#42ff68', '#ffd23f', '#ff7a2f', '#ff334d', '#b3122b'].every(c =>
  Object.values(iso.survivalPalette()).includes(c)), JSON.stringify(iso.survivalPalette()));
check('thresholds: caution 80 / warning 55 / critical 20',
  iso.cfg.survivalCautionThreshold === 80 && iso.cfg.survivalWarningThreshold === 55 && iso.cfg.survivalCriticalThreshold === 20);
check('FX dramatike default ON', iso.cfg.survivalHeartbeat && iso.cfg.survivalGlowPulse && iso.cfg.survivalRedFlash &&
  iso.cfg.survivalImpactPopup && iso.cfg.survivalVerdictOn && iso.cfg.survivalCriticalGlitch);
check('vignette e vjetër u hoq krejt', !HTML.includes('pf-vignette') && !JS.includes('survivalVignette'));
check('zëri default = both', iso.cfg.survivalSoundMode === 'both');
check('overlay-at ekzistojnë', !!q('.pf-flash') && !!q('.pf-impact') && !!q('.pf-survival-aura'));
check('s’ka ma overlay GAME OVER mbi lojën', !JSON.stringify(HTML).includes('pf-gameover'));
check('stream mode OFF', iso.streamModeOn() === false);

console.log('\n— statusi sipas % —');
function setChance(v) { iso.cfg.items[iso.selected].survivalChance = v; iso.survival.displayValue = v; $rootScope.$digest(); }
const cases = [[100, 'STEADY', 'safe', '#42ff68'], [70, 'CAREFUL', 'caution', '#ffd23f'],
               [40, 'DANGER', 'danger', '#ff7a2f'], [12, 'CRITICAL', 'critical', '#ff334d'],
               [0, 'TOTALED', 'dead', '#b3122b']];
iso.cfg.survivalStatusBlend = false;   // ndryshim i menjehershem -> ngjyra e sakte e nivelit
for (const [v, phrase, key, color] of cases) {
  setChance(v);
  check(`  ${v}% → ${phrase} / ${key} / ${color}`,
    iso.survivalStatus() === phrase && iso.survivalStateKey() === key && iso.survivalColor().toLowerCase() === color,
    `${iso.survivalStatus()} / ${iso.survivalStateKey()} / ${iso.survivalColor()}`);
}
// me blend: ngjyrat kalojne bute midis niveleve
iso.cfg.survivalStatusBlend = true;
setChance(70);
const blended = iso.survivalColor().toLowerCase();
check('blend: 70% del midis safe dhe caution', blended !== '#ffd23f' && blended !== '#42ff68', blended);
setChance(80);
check('blend: 80% = ngjyra safe', iso.survivalColor().toLowerCase() === '#42ff68', iso.survivalColor());

console.log('\n— VULA (verdict) + flash —');
setChance(100); $rootScope.$digest();
setChance(0); $rootScope.$digest();
try { $timeout.flush(30); } catch (e) {}   // animacioni rifillon pas ~8ms
check('vula u aktivizua në 0%', iso.survival.verdictShow === true);
check('vula shfaqet brenda HUD-it', txt('.pf-survival-verdict') === 'TOTALED', txt('.pf-survival-verdict'));
check('vula është brenda .pf-survival', !!q('.pf-survival .pf-survival-verdict'));
iso.cfg.survivalVerdictText = 'CAR DESTROYED'; $rootScope.$digest();
check('teksti i vulës është i editueshëm', txt('.pf-survival-verdict') === 'CAR DESTROYED', txt('.pf-survival-verdict'));
iso.cfg.survivalVerdictText = 'TOTALED';
$timeout.flush(5000);
check('vula fshihet vetë', iso.survival.verdictShow === false);

console.log('\n— emoji (bug-u 💀 u rregullua) —');
const emojiCases = [[100, '😎'], [70, '😬'], [40, '😰'], [12, '😵'], [0, '💀']];
for (const [v, emoji] of emojiCases) {
  setChance(v); $rootScope.$digest();
  check(`  ${v}% → ${emoji}`, iso.survivalEmojiText() === emoji, iso.survivalEmojiText());
}
iso.cfg.survivalEmojiSafe = '🔥'; setChance(100); $rootScope.$digest();
check('emoji custom aplikohet', iso.survivalEmojiText() === '🔥', iso.survivalEmojiText());
iso.cfg.survivalEmojiSafe = '😎';

console.log('\n— paketat e statusit —');
iso.setSurvivalPack('hardcore'); setChance(40); $rootScope.$digest();
check('hardcore 40% → OUCH', iso.survivalStatus() === 'OUCH', iso.survivalStatus());
iso.setSurvivalPack('streamer'); setChance(12); $rootScope.$digest();
check('streamer 12% → ONE HP', iso.survivalStatus() === 'ONE HP', iso.survivalStatus());
iso.setSurvivalPack('streamer'); setChance(0); $rootScope.$digest();
check('streamer 0% → WRECKED', iso.survivalStatus() === 'WRECKED', iso.survivalStatus());
iso.setSurvivalPack('classic'); setChance(70); $rootScope.$digest();
check('classic 70% → CAUTION', iso.survivalStatus() === 'CAUTION', iso.survivalStatus());
iso.setSurvivalPack('dramatic'); $rootScope.$digest();
check('dramatic 70% → CAREFUL', iso.survivalStatus() === 'CAREFUL', iso.survivalStatus());

console.log('\n— rrotullimi i frazave —');
iso.cfg.survivalStatusRotate = true; iso.restartSurvivalRotation();
iso.survival.rotIndex = 0; $rootScope.$digest();
const first = iso.survivalStatus();
$timeout.flush(3100);
const second = iso.survivalStatus();
check(`fraza u rrotullua (${first} → ${second})`, first !== second);
iso.cfg.survivalStatusRotate = false; iso.restartSurvivalRotation();

console.log('\n— tekstet custom —');
iso.setSurvivalPack('custom'); setChance(70); $rootScope.$digest();
iso.cfg.survivalStatusTexts.caution = 'watch out';
$rootScope.$digest();
check('teksti custom shfaqet i madhëzuar', iso.survivalStatus() === 'WATCH OUT', iso.survivalStatus());

console.log('\n— STREAM MODE —');
iso.setSurvivalPack('dramatic');
iso.cfg.vehiclesOn = true; iso.cfg.guidesOn = true; iso.cfg.showPanel = true;
iso.toggleStreamMode(); $rootScope.$digest();
check('stream ON fsheh panelin', iso.cfg.showPanel === false);
check('stream ON fsheh rrumullakat', iso.cfg.vehiclesOn === false);
check('stream ON fsheh guidat', iso.cfg.guidesOn === false);
check('survival mbetet ON', iso.cfg.survivalOn === true && iso.streamModeOn());
iso.toggleStreamMode(); $rootScope.$digest();
check('stream OFF kthen gjendjen e vjetër',
  iso.cfg.showPanel === true && iso.cfg.vehiclesOn === true && iso.cfg.guidesOn === true && !iso.streamModeOn());

console.log('\n— variablat e dramës (CSS vars) —');
setChance(10); iso.refreshSurvivalDrama(); $rootScope.$digest();
check('aureola u ndez në 10%', iso.survival.auraOpacity > 0.2, iso.survival.auraOpacity);
check('--aura u shkrua në CSS', (q('.pf-survival').style.getPropertyValue('--aura') || '0') !== '0.000');
setChance(100); iso.refreshSurvivalDrama(); $rootScope.$digest();
check('aureola fiket në 100%', iso.survival.auraOpacity === 0);
check('s’ka element që mbulon ekranin me të kuqe',
  !q('.pf-vignette') && !q('.pf-gameover') && !HTML.includes('radial-gradient(118% 88%'));
const hbNode = q('.pf-survival');
check('--hb variabla u vendos', hbNode && hbNode.style.getPropertyValue('--hb').length > 0,
  hbNode ? hbNode.style.getPropertyValue('--hb') : 'pa node');
check('klasa heartbeat / fx-none aplikohen',
  iso.survivalClass()['heartbeat'] !== undefined && iso.survivalClass()['fx-none'] === true);

console.log('\n— katalogu i FX —');
['neon', 'chrome', 'gold', 'blood', 'extrude', 'glitch', 'flicker', 'none'].forEach(fx => {
  iso.cfg.survivalTextFx = fx; $rootScope.$digest();
  check(`  fx-${fx} në klasat e HUD-it`, iso.survivalClass()['fx-' + fx] === true);
});
iso.cfg.survivalTextFx = 'none';

console.log('\n— zëri (pa AudioContext në jsdom) —');
let soundErr = null;
try { iso.testSurvivalSound(); iso.toggleSurvivalSound(); $timeout.flush(1200); iso.toggleSurvivalSound(); }
catch (e) { soundErr = e.message; }
check('nuk hedh gabim pa Web Audio', soundErr === null, soundErr);
check('toggleSurvivalSound ndryshon modalitetin', iso.cfg.survivalSoundMode === 'off' || iso.cfg.survivalSoundMode === 'both',
  iso.cfg.survivalSoundMode);

console.log('\n— paneli —');
check('tab-i DRAMA ekziston', HTML.includes("tab==='drama'"));
check('butoni i stream mode në panel', HTML.includes('STREAM MODE:'));
check('kontrolli i zërit në panel', HTML.includes('survivalSoundMode'));
check('karta e 5 ngjyrave', (HTML.match(/pf-swatch" ng-class="\{open:isPickerOpen\('survival/g) || []).length >= 5);

console.log('\n— persist / migrim —');
let perr = null;
try { iso.persist(); } catch (e) { perr = e.message; }
check('persist() pa gabime', perr === null, perr);
const saved = JSON.parse(global.localStorage.getItem('pfhud_config_v14_working_upload_clone'));
check('config u ruajt me v5.2 fushat',
  typeof saved.survivalStatusPack === 'string' && saved.survivalTextFx === 'none' &&
  saved.survivalCautionColor === '#ffd23f' && saved.survivalSoundMode === 'both' && saved.survivalHeartbeat === true &&
  saved.survivalFontFamily === 'bangers' && saved.survivalVerdictText === 'TOTALED' && saved.survivalGlowPulse === true,
  JSON.stringify({ pack: saved.survivalStatusPack, fx: saved.survivalTextFx, caution: saved.survivalCautionColor }));
check('fushat __raw nuk ruhen', !Object.keys(saved).some(k => k.includes('__raw')));

// =====================================================================
// Migrimi nga nje konfigurim i vjetër (v5.0 / v5.1)
// =====================================================================
console.log('\n— migrimi nga v5.1 —');
global.localStorage.setItem('pfhud_config_v14_working_upload_clone', JSON.stringify({
  survivalColorProfileVersion: 2, survivalEmojiProfileVersion: 3, survivalAnimationProfileVersion: 3,
  survivalFontFamily: 'futura', survivalSize: 72, survivalValueColor: '#00ff00',
  survivalWarningColor: '#ff8800', survivalCriticalColor: '#ff0000',
  survivalStatusPulse: true, survivalShowStatus: true, items: [], currentIndex: 0, vehiclesKey: 'v'
}));
const el2 = win.document.createElement('creatorpack-panel');
win.document.body.appendChild(el2);
const scope2 = $rootScope.$new();
$compile(el2)(scope2);
$rootScope.$digest();
check('paketa u migrua në dramatic', scope2.cfg.survivalStatusPack === 'dramatic', scope2.cfg.survivalStatusPack);
check('ngjyrat e reja u shtuan', scope2.cfg.survivalCautionColor === '#ffd23f' && scope2.cfg.survivalDeadColor === '#b3122b');
check('threshold i kujdesit u shtua', scope2.cfg.survivalCautionThreshold === 80);
check('cilësimet e vjetra u ruajtën', scope2.cfg.survivalSize === 72 && scope2.cfg.survivalValueColor === '#00ff00',
  `${scope2.cfg.survivalSize} / ${scope2.cfg.survivalValueColor}`);
check('FX-ja dramatike u ndez automatikisht',
  scope2.cfg.survivalHeartbeat && scope2.cfg.survivalRedFlash && scope2.cfg.survivalVerdictOn && scope2.cfg.survivalGlowPulse);
check('zëri u ndez automatikisht', scope2.cfg.survivalSoundMode === 'both');
check('fonti u migrua futura → bangers', scope2.cfg.survivalFontFamily === 'bangers', scope2.cfg.survivalFontFamily);
check('pesha/italic u rregulluan për Bangers',
  scope2.cfg.survivalFontWeight === '400' && scope2.cfg.survivalItalic === false);
check('vignette u hoq, aureola u ndez', scope2.cfg.survivalGlowPulse === true && scope2.cfg.survivalVignette === undefined);
check('vula zëvendësoi GAME OVER', scope2.cfg.survivalVerdictOn === true && scope2.cfg.survivalVerdictText === 'TOTALED');
check('emoji-t e reja u shtuan', scope2.cfg.survivalEmojiSafe === '😎' && scope2.cfg.survivalEmojiDead === '💀');
check('emoji i saktë edhe pas migrimit', (function(){ scope2.cfg.items[scope2.selected].survivalChance = 100;
  scope2.survival.displayValue = 100; $rootScope.$digest(); return scope2.survivalEmojiText() === '😎'; })());
check('tastet e reja u shtuan', scope2.cfg.streamKey === 'b');
check('makinat u rigjeneruan', scope2.cfg.items.length === 8, scope2.cfg.items.length);
check('renditja e frazave funksionon edhe pas migrimit',
  typeof scope2.survivalStatus() === 'string' && scope2.survivalStatus().length > 0, scope2.survivalStatus());

console.log('\n' + (failures === 0 ? '✅ TË GJITHA TESTET KALUAN' : `❌ ${failures} teste dështuan`));
process.exit(failures === 0 ? 0 : 1);
