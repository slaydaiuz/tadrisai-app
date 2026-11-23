// TadrisAI · 3D anatomiya atlasi (2026-11-23, 2-versiya). Modellar: BodyParts3D, © DBCLS, CC BY 4.0.
// Hammasi oldindan tayyorlangan (nomlar, izohlar, savollar) — ishlatganda AI chaqirilmaydi.
import * as THREE from 'three';
import { OrbitControls } from '../OrbitControls.js';

const $ = id => document.getElementById(id);
const API = location.hostname === 'tadris.ai' ? '/api' : 'https://91-107-229-30.sslip.io/api';
const QS = new URLSearchParams(location.search);
const DEV = QS.get('dev') === '1' && location.hostname !== 'tadris.ai';

const TX = {
  uz: {back: '← TadrisAI', badge: 'SINOV · faqat admin', title: '3D <b>anatomiya</b> atlasi', desc: "Tana a'zolarini aylantiring, qismlarga ajrating, har bir qismning o'zbekcha, ruscha va lotincha nomini va vazifasini o'rganing. Keyin uch xil viktorinada o'zingizni sinang.",
    feats: ['🧩 9 bo\'lim · 1 300+ qism', '🇺🇿 O\'zbek · Русский · Latina', '🎯 3 xil viktorina', '🧠 Chuqur o\'rganish', '📊 Slayd va test bir bosishda'],
    parts: '{n} ta qism', learnedP: "{p}% o'zlashtirildi", load: '3D model yuklanmoqda…', noGl: "Bu qurilma 3D ko'rinishni qo'llamaydi.", err: "Model yuklanmadi. Internetni tekshirib, qayta urinib ko'ring.",
    vback: '← Atlas', tParts: 'Qismlar', tQuiz: 'Viktorina', tDeep: "Chuqur o'rganish", color: 'Rangli', natural: 'Tabiiy', xray: 'Rentgen', full: "⛶ To'liq ekran", together: "Yig'ilgan", apart: 'Sochilgan',
    intro: "Qismni 3D modelda bosing yoki pastdagi ro'yxatdan tanlang.", seq: "▶ Ketma-ket o'rganish", tip1: 'Barmoq bilan aylantiring, ikki barmoq bilan kattalashtiring', tip2: '⇄ tugmasi bilan qismlarni sochib, ichkaridagilarini ko\'ring',
    tip3: "«Rentgen» tanlangan qismdan boshqasini shaffof qiladi", tip4: "«Viktorina» va «Chuqur o'rganish»da o'zingizni sinang",
    toq: 'toq', juft: 'juft (×2)', only: "Faqat shuni ko'rsatish", all: "Hammasini ko'rsatish", prez: '📊 Prezentatsiya', test: '✅ Test tuzish', share: '🔗 Ulashish', copied: 'Havola nusxalandi',
    mName: 'Bu qaysi?', mNameD: "Belgilangan qismning nomini yozasiz", mTf: "To'g'ri yoki noto'g'ri?", mTfD: "«Bu — …» degan gapni tekshirasiz", mFind: 'Toping', mFindD: "Nomi berilgan qismni modelda bosasiz",
    start: 'Boshlash', qn: '{i}-savol / {n} · ✓ {s}', qName: 'Bu qaysi qism?', qNameS: "Qizil bilan belgilangan qismning nomini yozing", ph: 'Nomini yozing…', check: 'Tekshirish', hint: '💡 Yordam', dunno: 'Bilmayman',
    qTf: 'Bu — {n}?', qTfS: 'Qizil bilan belgilangan qismga qarang', yes: "✓ To'g'ri", no: "✕ Noto'g'ri", qFind: '{n}ni toping', qFindS: '3D modelda shu qismni bosing',
    ok: "✅ To'g'ri!", okIs: "✅ To'g'ri! Bu — {n}", bad: "❌ Noto'g'ri. To'g'ri javob: {n}", badTap: '❌ Bu — {n}. Yana urinib ko\'ring', next: 'Keyingi ›', showAns: "Javobni ko'rsatish",
    result: 'Natija', again: 'Qaytadan', other: 'Boshqa rejim', mistakes: "Xato qilinganlar:", great: "Zo'r! Hammasi to'g'ri 🎉",
    deepIntro: "Har bir qism uch bosqichda o'rganiladi: avval 4 ta variantdan tanlaysiz, keyin harf yordami bilan yozasiz, oxirida yordamsiz yozasiz. Xato qilingan qism qayta chiqadi.",
    deepAll: 'Hammasi', deepStart: "O'rganishni boshlash", r1: '1-bosqich · tanlang', r2: '2-bosqich · yozing (yordam bilan)', r3: '3-bosqich · yordamsiz yozing', deepDone: "Barakalla! {n} ta qism o'zlashtirildi 🎉", learned: "o'zlashtirilgan", nothing: "Bu guruhdagi hamma qism o'zlashtirilgan. Boshqa guruhni tanlang yoki qayta boshlang.", reset: 'Natijani tozalash',
    lockT: 'Atlas tez orada', lockD: "Bu bo'lim hozircha sinovda. Tez orada hamma uchun ochiladi.", lockB: 'TadrisAI ga qaytish', credit: '3D modellar: {c}', topic: '{t} tuzilishi'},
  ru: {back: '← TadrisAI', badge: 'ТЕСТ · только админ', title: '3D-<b>атлас</b> анатомии', desc: 'Вращайте органы, разбирайте на части, изучайте название каждой части на узбекском, русском и латыни и её функцию. Затем проверьте себя в трёх видах викторины.',
    feats: ['🧩 9 разделов · 1 300+ частей', '🇺🇿 O\'zbek · Русский · Latina', '🎯 3 вида викторины', '🧠 Глубокое изучение', '📊 Слайды и тест в один клик'],
    parts: '{n} частей', learnedP: 'Изучено {p}%', load: 'Загружается 3D-модель…', noGl: 'Это устройство не поддерживает 3D.', err: 'Модель не загрузилась. Проверьте интернет и попробуйте снова.',
    vback: '← Атлас', tParts: 'Части', tQuiz: 'Викторина', tDeep: 'Глубокое изучение', color: 'Цветной', natural: 'Натуральный', xray: 'Рентген', full: '⛶ Во весь экран', together: 'Собран', apart: 'Разобран',
    intro: 'Нажмите на часть в 3D-модели или выберите её в списке ниже.', seq: '▶ Изучать по порядку', tip1: 'Вращайте пальцем, масштабируйте двумя пальцами', tip2: 'Кнопка ⇄ разбирает модель, чтобы увидеть внутренние части',
    tip3: '«Рентген» делает прозрачным всё, кроме выбранной части', tip4: 'Проверьте себя в «Викторине» и «Глубоком изучении»',
    toq: 'непарная', juft: 'парная (×2)', only: 'Показать только её', all: 'Показать все', prez: '📊 Презентация', test: '✅ Составить тест', share: '🔗 Поделиться', copied: 'Ссылка скопирована',
    mName: 'Что это?', mNameD: 'Напишите название выделенной части', mTf: 'Верно или нет?', mTfD: 'Проверьте утверждение «Это — …»', mFind: 'Найдите', mFindD: 'Нажмите на названную часть в модели',
    start: 'Начать', qn: 'Вопрос {i} / {n} · ✓ {s}', qName: 'Что это за часть?', qNameS: 'Напишите название части, выделенной красным', ph: 'Напишите название…', check: 'Проверить', hint: '💡 Подсказка', dunno: 'Не знаю',
    qTf: 'Это — {n}?', qTfS: 'Посмотрите на часть, выделенную красным', yes: '✓ Верно', no: '✕ Неверно', qFind: 'Найдите: {n}', qFindS: 'Нажмите на эту часть в 3D-модели',
    ok: '✅ Верно!', okIs: '✅ Верно! Это — {n}', bad: '❌ Неверно. Правильный ответ: {n}', badTap: '❌ Это — {n}. Попробуйте ещё', next: 'Дальше ›', showAns: 'Показать ответ',
    result: 'Результат', again: 'Ещё раз', other: 'Другой режим', mistakes: 'Ошибки:', great: 'Отлично! Всё верно 🎉',
    deepIntro: 'Каждая часть изучается в три шага: сначала выбор из 4 вариантов, затем ввод с подсказкой букв, в конце — без подсказки. Ошибочные части повторяются.',
    deepAll: 'Все', deepStart: 'Начать изучение', r1: 'Шаг 1 · выберите', r2: 'Шаг 2 · напишите (с подсказкой)', r3: 'Шаг 3 · напишите без подсказки', deepDone: 'Молодец! Изучено частей: {n} 🎉', learned: 'изучено', nothing: 'Все части этой группы изучены. Выберите другую группу или начните заново.', reset: 'Сбросить прогресс',
    lockT: 'Атлас скоро', lockD: 'Раздел пока тестируется и скоро откроется для всех.', lockB: 'Вернуться в TadrisAI', credit: '3D-модели: {c}', topic: '{t} tuzilishi'},
  en: {back: '← TadrisAI', badge: 'TEST · admin only', title: '3D <b>anatomy</b> atlas', desc: 'Rotate organs, take them apart and learn each part\'s Uzbek, Russian and Latin name and its function. Then test yourself in three quiz modes.',
    feats: ['🧩 9 sections · 1,300+ parts', '🇺🇿 O\'zbek · Русский · Latina', '🎯 3 quiz modes', '🧠 Deep learning', '📊 Slides & tests in one tap'],
    parts: '{n} parts', learnedP: '{p}% learned', load: 'Loading 3D model…', noGl: "This device doesn't support 3D.", err: "The model didn't load. Check your connection and try again.",
    vback: '← Atlas', tParts: 'Parts', tQuiz: 'Quiz', tDeep: 'Deep learning', color: 'Colour', natural: 'Natural', xray: 'X-ray', full: '⛶ Full screen', together: 'Together', apart: 'Apart',
    intro: 'Tap a part on the 3D model or pick it from the list below.', seq: '▶ Learn in order', tip1: 'Drag to rotate, pinch to zoom', tip2: 'The ⇄ button takes the model apart to show inner parts',
    tip3: '"X-ray" makes everything except the selected part transparent', tip4: 'Test yourself in "Quiz" and "Deep learning"',
    toq: 'single', juft: 'paired (×2)', only: 'Show only this', all: 'Show all', prez: '📊 Presentation', test: '✅ Make a test', share: '🔗 Share', copied: 'Link copied',
    mName: 'What is it?', mNameD: 'Type the name of the highlighted part', mTf: 'True or false?', mTfD: 'Check the statement "This is …"', mFind: 'Find it', mFindD: 'Tap the named part on the model',
    start: 'Start', qn: 'Question {i} / {n} · ✓ {s}', qName: 'Which part is this?', qNameS: 'Type the name of the part highlighted in red', ph: 'Type the name…', check: 'Check', hint: '💡 Hint', dunno: "Don't know",
    qTf: 'Is this the {n}?', qTfS: 'Look at the part highlighted in red', yes: '✓ True', no: '✕ False', qFind: 'Find: {n}', qFindS: 'Tap this part on the 3D model',
    ok: '✅ Correct!', okIs: '✅ Correct! This is the {n}', bad: '❌ Wrong. Correct answer: {n}', badTap: '❌ That is the {n}. Try again', next: 'Next ›', showAns: 'Show answer',
    result: 'Result', again: 'Again', other: 'Another mode', mistakes: 'Mistakes:', great: 'Great! All correct 🎉',
    deepIntro: 'Each part is learned in three steps: pick from 4 options, type with letter hints, then type with no hints. Parts you miss come back again.',
    deepAll: 'All', deepStart: 'Start learning', r1: 'Step 1 · choose', r2: 'Step 2 · type (with hints)', r3: 'Step 3 · type without hints', deepDone: 'Well done! {n} parts learned 🎉', learned: 'learned', nothing: 'All parts in this group are learned. Pick another group or start over.', reset: 'Reset progress',
    lockT: 'Atlas coming soon', lockD: 'This section is being tested and will open for everyone soon.', lockB: 'Back to TadrisAI', credit: '3D models: {c}', topic: '{t} tuzilishi'},
};
let LANG = (() => { try { const a = localStorage.getItem('atlas_lang'); if (TX[a]) return a; const l = localStorage.getItem('tadris_lang'); if (TX[l]) return l; if (['kk', 'ky', 'tg'].includes(l)) return 'ru'; } catch (e) {} return (navigator.language || '').startsWith('ru') ? 'ru' : 'uz'; })();
const t = (k, o) => { let s = (TX[LANG] || TX.uz)[k] ?? TX.uz[k] ?? k; if (o) for (const [a, b] of Object.entries(o)) s = s.split('{' + a + '}').join(b); return s; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let DATA = null;
const NI = {en: 0, uz: 1, ru: 2, lat: 3};
const nm = (n, l = LANG) => l === 'en' ? cap(DATA.names[n][0]) : DATA.names[n][NI[l]];
const lat = n => DATA.names[n][3];
const dsc = n => { const d = DATA.desc[n]; if (!d) return ''; return LANG === 'ru' ? d[1] : d[0]; };
function toast(s) { const e = $('toast'); e.textContent = s; e.classList.remove('hide'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.add('hide'), 1800); }

// ------------------------------------------------------------------ o'zlashtirish (shu qurilmada)
const mKey = id => 'atlas_m_' + id;
const mGet = id => { try { return new Set(JSON.parse(localStorage.getItem(mKey(id)) || '[]')); } catch (e) { return new Set(); } };
const mAdd = (id, n) => { try { const s = mGet(id); s.add(n); localStorage.setItem(mKey(id), JSON.stringify([...s])); } catch (e) {} };

// ------------------------------------------------------------------ kirish: faqat admin (sinov)
async function gate() {
  if (DEV) return true;
  let ws = ''; try { ws = localStorage.getItem('tadris_ws') || ''; } catch (e) {}
  if (!ws) return false;
  try { const r = await fetch(API + '/me', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ws})}); const d = await r.json(); return !!(d && d.ok && d.admin); } catch (e) { return false; }
}

// ------------------------------------------------------------------ bosh sahifa
function langBtns(el, cb) {
  el.innerHTML = ['uz', 'ru', 'en'].map(l => `<button data-l="${l}" class="${l === LANG ? 'on' : ''}">${l.toUpperCase()}</button>`).join('');
  el.querySelectorAll('button').forEach(b => b.onclick = () => { LANG = b.dataset.l; try { localStorage.setItem('atlas_lang', LANG); } catch (e) {} cb(); });
}
function renderHome() {
  $('hBack').textContent = t('back'); $('hBadge').textContent = t('badge'); $('hT').innerHTML = t('title'); $('hD').textContent = t('desc');
  $('feats').innerHTML = t('feats').map(f => `<span>${esc(f)}</span>`).join('');
  $('credit').textContent = t('credit', {c: DATA.credit});
  langBtns($('langs'), renderHome);
  $('grid').innerHTML = DATA.sections.map((s, i) => {
    const uniq = new Set(s.parts.map(p => p[1])).size, done = mGet(s.id).size, pct = Math.round(done / uniq * 100);
    return `<button class="sec" data-i="${i}"><div class="ic">${s.icon}</div><b>${esc(s.t[LANG] || s.t.uz)}</b><small>${t('parts', {n: s.parts.length})}${done ? ' · ' + t('learnedP', {p: pct}) : ''}</small>${done ? `<span class="prog" style="width:${pct}%"></span>` : ''}</button>`;
  }).join('');
  $('grid').querySelectorAll('.sec').forEach(b => b.onclick = () => openSection(+b.dataset.i));
}

// ------------------------------------------------------------------ 3D sahna
let renderer, scene, camera, controls, raycaster, group, SEC = null, meshes = [], ITEMS = [], radius = 1, animReq = 0;
let colorMode = false, xray = false, onlyMode = false, explodeK = 0, sel = null, TAB = 'parts', HL = new Map(), Q = null, DP = null;
const pointer = new THREE.Vector2();

function initGL() {
  if (renderer) return true;
  try { renderer = new THREE.WebGLRenderer({canvas: $('cv'), antialias: true, alpha: true}); } catch (e) { return false; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, 1, 1, 20000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 1.15));
  const d1 = new THREE.DirectionalLight(0xffffff, 1.35); d1.position.set(1, 1.2, 2); scene.add(d1);
  const d2 = new THREE.DirectionalLight(0x99f6e4, 0.45); d2.position.set(-2, -0.5, -1.5); scene.add(d2);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.rotateSpeed = 0.8;
  raycaster = new THREE.Raycaster();
  new ResizeObserver(resize).observe($('stage'));
  let down = null;
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY, performance.now()]; });
  renderer.domElement.addEventListener('pointerup', e => { if (!down) return; const mv = Math.hypot(e.clientX - down[0], e.clientY - down[1]), dt = performance.now() - down[2]; down = null; if (mv < 8 && dt < 650) pick(e); });
  return true;
}
function resize() { if (!renderer) return; const r = $('stage').getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix(); }
function loop() { animReq = requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); placeLabel(); }

// ------------------------------------------------------------------ ranglar
const NAT = {bone: 0xe8dcc4, tooth: 0xf5f1e6, muscle: 0xb5524a, heart: 0xb84a42, brain: 0xe2b4ac, lung: 0xe9d6cf, gut: 0xd98b7a, vessel: 0xc0392b};
function natColor(mat, en) {
  if (/\bvein|vena|sinus\b/.test(en)) return mat === 'lung' ? 0xc0392b : 0x3b6fd1;
  if (/artery|aorta|arterial|celiac trunk/.test(en)) return mat === 'lung' ? 0x3b6fd1 : 0xc0392b;
  if (/bronch|trachea/.test(en)) return 0xeae3d6;
  if (/valve|leaflet|cusp/.test(en)) return 0xf1e3c8;
  if (/cavity/.test(en)) return 0x7f1d1d;
  if (/papillary/.test(en)) return 0xa83a32;
  if (/ventricle|aqueduct|circumventricular/.test(en) && mat === 'brain') return 0x7aa7e0;
  if (/white matter|internal capsule/.test(en)) return 0xf4ede4;
  if (/cerebellum/.test(en)) return 0xd59c94;
  if (/hepatovenous|lobular segment/.test(en)) return 0x8b3a2b;
  if (/gallbladder|\bduct\b|biliary/.test(en)) return 0x5a9a5a;
  if (/pancrea/.test(en)) return 0xe0b06a;
  if (/gland/.test(en)) return 0xd9a066;
  if (/mesentery|mesocolon|mesoappendix/.test(en)) return 0xe8cf9f;
  if (/tongue/.test(en)) return 0xc96a6a;
  if (/gingiva/.test(en)) return 0xe59a9a;
  if (/tooth/.test(en)) return 0xf5f1e6;
  if (/mandible|maxilla|bone|vomer|ethmoid|concha/.test(en)) return 0xe8dcc4;
  if (/diaphragm|sphincter|constrictor|palatini|uvular/.test(en) && mat !== 'muscle') return 0xb5524a;
  return NAT[mat] || 0xd0c4b8;
}
const hue = i => { const c = new THREE.Color(); c.setHSL(((i * 137.508) % 360) / 360, 0.66, 0.6); return c; };
const css = c => '#' + c.getHexString();
function paint() {
  const dim = (xray && sel && TAB === 'parts') || (TAB === 'quiz' && Q && Q.mode !== 'find' && Q.i < Q.list.length) || (TAB === 'deep' && DP && DP.q.length);
  for (const it of ITEMS) {
    const en = DATA.names[it.n][0];
    let col = HL.has(it) ? new THREE.Color(HL.get(it)) : (colorMode ? it.hue : new THREE.Color(natColor(SEC.mat, en)));
    const cav = !colorMode && !HL.has(it) && (/cavity|mesentery|mesocolon|mesoappendix/.test(en) || (SEC.mat === 'lung' && /diaphragm/.test(en)));
    const ghost = dim && !HL.has(it);
    for (const m of it.ms) {
      m.material.color.copy(col);
      m.material.emissive.setHex(HL.has(it) ? 0x1a1a1a : 0);
      m.material.transparent = cav || ghost; m.material.opacity = ghost ? (TAB === 'parts' ? 0.1 : 0.28) : cav ? 0.35 : 1; m.material.depthWrite = !(cav || ghost);
      m.renderOrder = ghost ? 1 : 0;
    }
  }
}

// ------------------------------------------------------------------ model yuklash
async function loadBin(id) {
  const r = await fetch('m/' + id + '.bin.gz?v=1'); if (!r.ok) throw new Error('http ' + r.status);
  if (typeof DecompressionStream === 'undefined') throw new Error('gzip');
  const buf = await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  const dv = new DataView(buf);
  if (String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)) !== 'TA3D') throw new Error('format');
  const hl = dv.getUint32(4, true), head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 8, hl)));
  let off = 8 + hl; const out = [];
  for (const p of head.parts) {
    const q = new Int16Array(buf, off, p.nv * 3); off += p.nv * 6; off += (4 - (off % 4)) % 4;
    const idx = p.i4 ? new Uint32Array(buf, off, p.nt * 3) : new Uint16Array(buf, off, p.nt * 3); off += p.nt * 3 * (p.i4 ? 4 : 2); off += (4 - (off % 4)) % 4;
    const pos = new Float32Array(p.nv * 3), k = head.half / 32767;
    for (let i = 0; i < p.nv; i++) { pos[i * 3] = q[i * 3] * k; pos[i * 3 + 1] = q[i * 3 + 2] * k; pos[i * 3 + 2] = -q[i * 3 + 1] * k; }  // BodyParts3D: Z yuqori, old tomon −Y
    out.push({id: p.id, pos, idx: idx.slice(), c: new THREE.Vector3(p.c[0], p.c[2], -p.c[1]), nv: p.nv});
  }
  return out;
}

async function openSection(i, pickN) {
  SEC = DATA.sections[i]; sel = null; onlyMode = false; HL = new Map(); Q = null; DP = null; TAB = 'parts';
  $('home').classList.add('hide'); $('view').classList.remove('hide');
  labels();
  if (!initGL()) { $('loadT').textContent = t('noGl'); $('load').classList.remove('hide'); return; }
  resize(); $('load').classList.remove('hide'); $('loadT').textContent = t('load'); $('exp').value = 0; explodeK = 0;
  if (group) { scene.remove(group); meshes.forEach(m => { m.geometry.dispose(); m.material.dispose(); }); }
  meshes = []; ITEMS = []; group = new THREE.Group(); scene.add(group); renderPanel();
  let parts;
  try { parts = await loadBin(SEC.id); } catch (e) { $('loadT').textContent = t('err'); console.error(e); return; }
  const byId = Object.fromEntries(SEC.parts.map(p => [p[0], p])), byN = new Map();
  for (const p of parts) {
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p.pos, 3)); g.setIndex(new THREE.BufferAttribute(p.idx, 1)); g.computeVertexNormals(); g.computeBoundingSphere();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({roughness: 0.6, metalness: 0.02, side: THREE.DoubleSide}));
    const meta = byId[p.id] || [p.id, 0, '', 0];
    m.userData = {n: meta[1], s: meta[2], c: p.c, nv: p.nv};
    group.add(m); meshes.push(m);
    if (!byN.has(meta[1])) byN.set(meta[1], {n: meta[1], g: meta[3] || 0, ms: [], nv: 0});
    const it = byN.get(meta[1]); it.ms.push(m); it.nv += p.nv; m.userData.it = it;
  }
  ITEMS = [...byN.values()].sort((a, b) => a.g - b.g || nm(a.n, 'uz').localeCompare(nm(b.n, 'uz'), 'uz'));
  ITEMS.forEach((it, k) => { it.k = k; it.hue = hue(k); });
  paint();
  const box = new THREE.Box3().setFromObject(group), sz = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
  group.position.sub(ctr); radius = Math.max(sz.x, sz.y, sz.z) / 2;
  resetView(); $('load').classList.add('hide');
  if (!animReq) loop();
  renderPanel();
  if (pickN != null) { const it = ITEMS.find(x => x.n === pickN); if (it) select(it, true); }
}
function fitFov() { const v = camera.fov * Math.PI / 180, h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect); return Math.min(v, h); }
function resetView() {
  const dist = radius / Math.sin(fitFov() / 2) * 1.08;
  camera.position.set(0, radius * 0.05, dist); camera.near = dist / 100; camera.far = dist * 20; camera.updateProjectionMatrix();
  controls.target.set(0, 0, 0); controls.minDistance = radius * 0.12; controls.maxDistance = dist * 3; controls.update();
}
function itemSphere(it) {
  const b = new THREE.Box3(); it.ms.forEach(m => { m.updateMatrixWorld(); b.expandByObject(m); });
  const s = new THREE.Sphere(); b.getBoundingSphere(s); return s;
}
function fitTo(it) {
  const s = itemSphere(it), dist = Math.max(s.radius, radius * 0.05) / Math.sin(fitFov() / 2) * 1.3;
  const dir = camera.position.clone().sub(controls.target).normalize();
  controls.target.copy(s.center); camera.position.copy(s.center).add(dir.multiplyScalar(dist)); controls.update();
}
function faceItem(it) {   // savol paytida belgilangan qism kameraga qarab tursin
  const s = itemSphere(it), dir = s.center.clone().sub(controls.target);
  if (dir.length() < radius * 0.15) return;
  dir.y *= 0.5; dir.normalize();
  const dist = camera.position.distanceTo(controls.target);
  camera.position.copy(controls.target).add(dir.multiplyScalar(dist)); controls.update();
}
function setExplode(k) { explodeK = k; meshes.forEach(m => m.position.copy(m.userData.c).multiplyScalar(k * 0.9)); }

// ------------------------------------------------------------------ model ustidagi yorliq
let LBL = null;   // {it, text, dot}
function placeLabel() {
  const el = $('lbl');
  if (!LBL || !LBL.it) { el.classList.add('hide'); return; }
  const m = LBL.it.ms[0]; const w = m.geometry.boundingSphere.center.clone().applyMatrix4(m.matrixWorld);
  const v = w.project(camera);
  if (v.z > 1) { el.classList.add('hide'); return; }
  const r = $('stage').getBoundingClientRect();
  const x = (v.x * 0.5 + 0.5) * r.width, y = (-v.y * 0.5 + 0.5) * r.height, left = x > r.width * 0.58;   // o'ng chetda yorliq chapga ochiladi
  el.classList.toggle('flip', left);
  el.style.transform = left ? `translate(${x - 10}px, ${y}px) translate(-100%, -50%)` : `translate(${x + 10}px, ${y}px) translateY(-50%)`;
  el.classList.remove('hide');
}
function setLabel(it, text, dot) { LBL = it ? {it} : null; if (it) { $('lbl').querySelector('b').textContent = text; $('lbl').style.setProperty('--dot', dot); } }

// ------------------------------------------------------------------ tanlash
function pick(e) {
  const r = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(meshes.filter(m => m.visible), false);
  const hit = hits.find(h => !(h.object.material.transparent && h.object.material.opacity < 0.2)) || hits[0];
  const it = hit && hit.object.userData.it;
  if (TAB === 'quiz' && Q && Q.mode === 'find') return quizTap(it);
  if (TAB !== 'parts') return;
  if (it) select(it, false); else unselect();
}
function select(it, focus) {
  sel = it; HL = new Map([[it, css(it.hue)]]);
  if (onlyMode) { meshes.forEach(m => m.visible = m.userData.it === it); }
  paint(); setLabel(it, nm(it.n), css(it.hue));
  if (focus || onlyMode) fitTo(it);
  renderPanel(false);
}
function unselect() { sel = null; HL = new Map(); if (onlyMode) { onlyMode = false; meshes.forEach(m => m.visible = true); } paint(); setLabel(null); renderPanel(); }
function step(d) { if (!ITEMS.length) return; const i = sel ? sel.k : -1; select(ITEMS[(i + d + ITEMS.length) % ITEMS.length], true); }

// ------------------------------------------------------------------ panel
function labels() {
  $('vBack').textContent = t('vback'); $('vT').textContent = SEC.icon + ' ' + (SEC.t[LANG] || SEC.t.uz);
  $('vS').textContent = t('parts', {n: SEC.parts.length});
  const tb = $('tabs').querySelectorAll('button'); tb[0].textContent = t('tParts'); tb[1].textContent = t('tQuiz'); tb[2].textContent = t('tDeep');
  tb.forEach(b => b.classList.toggle('on', b.dataset.t === TAB));
  $('bColor').textContent = colorMode ? t('natural') : t('color'); $('bXray').textContent = '☢ ' + t('xray'); $('bXray').classList.toggle('on', xray);
  $('bFull').textContent = t('full'); $('sA').textContent = t('together'); $('sB').textContent = t('apart');
  langBtns($('vlangs'), () => { labels(); if (sel) setLabel(sel, nm(sel.n), css(sel.hue)); renderPanel(); });
}
function chipsHTML(onIt, cls) {
  const done = mGet(SEC.id);
  return SEC.groups.map((g, gi) => {
    const its = ITEMS.filter(it => it.g === gi); if (!its.length) return '';
    return `<div class="gt">${esc(g.t[LANG] || g.t.uz)} · ${its.length}</div><div class="chips">` + its.map(it =>
      `<button class="chip${it === onIt ? ' on' : ''}${done.has(it.n) ? ' ok' : ''}" data-k="${it.k}" style="--dot:${css(it.hue)}"><i></i>${esc(nm(it.n))}${it.ms.length > 1 ? ' ×' + it.ms.length : ''}</button>`).join('') + '</div>';
  }).join('');
}
function bindChips(cb) { $('pb').querySelectorAll('.chip[data-k]').forEach(b => b.onclick = () => cb(ITEMS[+b.dataset.k])); }
function renderPanel(keepScroll) {
  const pb = $('pb'), sc = pb.scrollTop;
  $('tabs').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === TAB));
  if (TAB === 'quiz') return renderQuiz();
  if (TAB === 'deep') return renderDeep();
  if (!ITEMS.length) { pb.innerHTML = ''; return; }
  let h = '';
  if (sel) {
    const it = sel, gname = SEC.groups[it.g] ? (SEC.groups[it.g].t[LANG] || SEC.groups[it.g].t.uz) : '';
    const alt = LANG === 'ru' ? nm(it.n, 'uz') : nm(it.n, 'ru');
    h += `<div class="card"><div style="display:flex;align-items:flex-start"><h3 style="--dot:${css(it.hue)}"><i></i>${esc(nm(it.n))}</h3><button class="x" id="pX">✕</button></div>
      <div class="sub"><b>${esc(lat(it.n))}</b> · ${esc(alt)}</div>
      <div class="tags"><span>${it.k + 1} / ${ITEMS.length}</span><span>${esc(gname)}</span><span>${it.ms.length > 1 ? t('juft') : t('toq')}</span></div>
      <p class="desc">${esc(dsc(it.n))}</p>
      <div class="nav"><button class="rnd" id="pPrev">‹</button><button class="mid" id="pOnly">${onlyMode ? t('all') : t('only')}</button><button class="rnd" id="pNext">›</button></div>
      <div class="row2"><button id="pPrez">${t('prez')}</button><button id="pTest">${t('test')}</button><button id="pShare">${t('share')}</button></div></div><div class="hr"></div>`;
  } else {
    h += `<p class="intro">${t('intro')}</p><button class="cta" id="pSeq">${t('seq')}</button>
      <div class="tips"><div><em>👆</em>${t('tip1')}</div><div><em>⇄</em>${t('tip2')}</div><div><em>☢</em>${t('tip3')}</div><div><em>🎯</em>${t('tip4')}</div></div>
      <div class="row2"><button id="pPrez">${t('prez')}</button><button id="pTest">${t('test')}</button></div>
      <p class="cred">${esc(t('credit', {c: DATA.credit}))}</p><div class="hr"></div>`;
  }
  h += chipsHTML(sel);
  pb.innerHTML = h; if (keepScroll) pb.scrollTop = sc; else pb.scrollTop = 0;
  bindChips(it => select(it, true));
  const topic = sel ? nm(sel.n, 'uz') : t('topic', {t: SEC.t.uz});
  $('pPrez').onclick = () => location.href = '/?prez=' + encodeURIComponent(topic);
  $('pTest').onclick = () => location.href = '/?qtopic=' + encodeURIComponent(topic);
  if (sel) {
    $('pX').onclick = unselect; $('pPrev').onclick = () => step(-1); $('pNext').onclick = () => step(1); $('pShare').onclick = share;
    $('pOnly').onclick = () => { onlyMode = !onlyMode; meshes.forEach(m => m.visible = !onlyMode || m.userData.it === sel); if (onlyMode) fitTo(sel); else resetView(); renderPanel(true); };
  } else $('pSeq').onclick = () => select(ITEMS[0], true);
}
function share() {
  const u = location.origin + location.pathname + '?s=' + SEC.id + (sel ? '&p=' + sel.n : '');
  if (navigator.share) navigator.share({title: 'TadrisAI · ' + (SEC.t[LANG] || SEC.t.uz), url: u}).catch(() => {});
  else navigator.clipboard.writeText(u).then(() => toast(t('copied')), () => toast(u));
}
function setTab(k) {
  TAB = k; Q = null; DP = null; onlyMode = false; meshes.forEach(m => m.visible = true);
  if (k === 'parts') { HL = sel ? new Map([[sel, css(sel.hue)]]) : new Map(); setLabel(sel, sel ? nm(sel.n) : '', sel ? css(sel.hue) : ''); }
  else { HL = new Map(); setLabel(null); }
  paint(); renderPanel();
}

// ------------------------------------------------------------------ javobni tekshirish (kechirimli)
function norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ʻʼ'’`‘]/g, '').replace(/\([^)]*\)/g, ' ')
    .replace(/ё/g, 'е').replace(/[^a-zа-яқғўҳ0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
const GENERIC = /\b(suyagi|suyak|mushagi|mushak|arteriyasi|arteriya|venasi|vena|kost|кость|мышца|артерия|вена|os|m|a|v|bone|muscle|artery|vein)\b/g;
function lev(a, b) { const m = a.length, n = b.length; if (Math.abs(m - n) > 3) return 9; let p = Array.from({length: n + 1}, (_, i) => i); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
function matches(ans, n) {
  const a = norm(ans); if (a.length < 2) return false;
  const cands = [nm(n, 'uz'), nm(n, 'ru'), lat(n), DATA.names[n][0]].map(norm);
  for (const c of cands) {
    if (a === c) return true;
    const tol = c.length <= 5 ? 0 : c.length <= 10 ? 1 : 2;
    if (lev(a, c) <= tol) return true;
    const a2 = a.replace(GENERIC, '').replace(/\s+/g, ' ').trim(), c2 = c.replace(GENERIC, '').replace(/\s+/g, ' ').trim();
    if (c2.length >= 3 && a2.length >= 3 && (a2 === c2 || lev(a2, c2) <= (c2.length <= 6 ? 0 : 1))) return true;
  }
  return false;
}

// ------------------------------------------------------------------ viktorina (3 rejim)
let QMODE = 'name';
function quizPool() { return shuffle(ITEMS.filter(it => it.nv >= 60)).slice(0, 10); }
function renderQuiz() {
  const pb = $('pb');
  if (!Q) {
    pb.innerHTML = `<div class="modes">` + [['name', '✍️', 'mName'], ['tf', '⚖️', 'mTf'], ['find', '👆', 'mFind']].map(([k, e, l]) =>
      `<button class="mode${QMODE === k ? ' on' : ''}" data-m="${k}"><em>${e}</em><span><b>${t(l)}</b><small>${t(l + 'D')}</small></span></button>`).join('') + `</div><button class="cta" id="qGo">${t('start')}</button>`;
    pb.querySelectorAll('.mode').forEach(b => b.onclick = () => { QMODE = b.dataset.m; renderQuiz(); });
    $('qGo').onclick = startQuiz; return;
  }
  if (Q.i >= Q.list.length) {
    HL = new Map(); paint(); setLabel(null);
    pb.innerHTML = `<div class="score"><div class="qhead">${t('result')}</div><div class="big">${Q.score} / ${Q.list.length}</div></div>
      ${Q.wrong.length ? `<div class="miss"><b>${t('mistakes')}</b><br>${Q.wrong.map(it => '• ' + esc(nm(it.n))).join('<br>')}</div>` : `<p class="intro" style="text-align:center">${t('great')}</p>`}
      <div class="row2" style="margin-top:14px"><button id="qA">${t('again')}</button><button id="qO">${t('other')}</button></div>`;
    $('qA').onclick = startQuiz; $('qO').onclick = () => { Q = null; renderQuiz(); }; return;
  }
  const it = Q.list[Q.i], head = `<div class="qhead">${t('qn', {i: Q.i + 1, n: Q.list.length, s: Q.score})}</div><div class="bar"><i style="width:${Q.i / Q.list.length * 100}%"></i></div>`;
  let h = head;
  if (Q.mode === 'name') {
    h += `<div class="qq">${t('qName')}</div><p class="qs">${t('qNameS')}</p>`;
    if (!Q.done) h += `<div class="ghost" id="qG">${ghost(nm(it.n), Q.hint)}</div><input class="inp" id="qIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('ph')}">
      <div class="row2"><button id="qH">${t('hint')}</button><button id="qD">${t('dunno')}</button></div><button class="cta" id="qC" style="margin-top:8px">${t('check')}</button>`;
  } else if (Q.mode === 'tf') {
    h += `<div class="qq">${esc(t('qTf', {n: nm(Q.claim.n)}))}</div><p class="qs">${t('qTfS')}</p>`;
    if (!Q.done) h += `<div class="tf"><button class="y" id="qY">${t('yes')}</button><button class="n" id="qN">${t('no')}</button></div>`;
  } else {
    h += `<div class="qq">${esc(t('qFind', {n: nm(it.n)}))}</div><p class="qs">${t('qFindS')}</p>`;
    if (!Q.done) h += `<div class="row2"><button id="qS">${t('showAns')}</button></div>`;
  }
  if (Q.fb) h += `<div class="fb ${Q.fb[0]}">${esc(Q.fb[1])}</div>`;
  if (Q.done) h += `<button class="cta" id="qX" style="margin-top:12px">${t('next')}</button>`;
  pb.innerHTML = h;
  if (Q.mode === 'name' && !Q.done) {
    const inp = $('qIn'); if (window.innerWidth >= 900) inp.focus();
    inp.onkeydown = e => { if (e.key === 'Enter') quizAnswer(inp.value); };
    $('qC').onclick = () => quizAnswer(inp.value); $('qD').onclick = () => quizAnswer('');
    $('qH').onclick = () => { Q.hint = Math.min(Q.hint + 1, nm(it.n).length); Q.usedHint = true; $('qG').innerHTML = ghost(nm(it.n), Q.hint); };
  }
  if (Q.mode === 'tf' && !Q.done) { $('qY').onclick = () => tfAnswer(true); $('qN').onclick = () => tfAnswer(false); }
  if (Q.mode === 'find' && !Q.done) $('qS').onclick = () => { HL = new Map([[it, '#22c55e']]); paint(); setLabel(it, nm(it.n), '#22c55e'); Q.done = true; Q.wrong.push(it); Q.fb = ['bad', t('bad', {n: nm(it.n)})]; renderQuiz(); };
  if (Q.done) $('qX').onclick = () => { Q.i++; Q.done = false; Q.fb = null; Q.hint = 0; Q.usedHint = false; askQ(); };
}
function ghost(name, k) {   // «Pe·······» — yordam bilan ochilgan harflar
  return [...name].map((c, i) => c === ' ' ? '&nbsp;' : i < k ? `<b>${esc(c)}</b>` : '·').join('');
}
function startQuiz() { Q = {mode: QMODE, list: quizPool(), i: 0, score: 0, wrong: [], done: false, hint: 0}; onlyMode = false; meshes.forEach(m => m.visible = true); askQ(); }
function askQ() {
  setLabel(null);
  if (Q.i < Q.list.length) {
    const it = Q.list[Q.i];
    if (Q.mode === 'tf') {
      const truth = Math.random() < 0.5;
      const pool = ITEMS.filter(x => x !== it && x.g === it.g); const any = ITEMS.filter(x => x !== it);
      Q.truth = truth; Q.claim = truth ? it : (pool.length ? pool : any)[Math.floor(Math.random() * (pool.length ? pool.length : any.length))];
    }
    HL = Q.mode === 'find' ? new Map() : new Map([[it, '#ef4444']]); paint(); if (Q.mode !== 'find') faceItem(it);
  }
  renderQuiz();
}
function quizAnswer(ans) {
  const it = Q.list[Q.i], ok = matches(ans, it.n);
  if (ok) { Q.score++; Q.fb = ['ok', t('okIs', {n: nm(it.n)})]; HL = new Map([[it, '#22c55e']]); }
  else { Q.wrong.push(it); Q.fb = ['bad', t('bad', {n: nm(it.n)})]; }
  paint(); setLabel(it, nm(it.n), ok ? '#22c55e' : '#ef4444'); Q.done = true; renderQuiz();
}
function tfAnswer(v) {
  const it = Q.list[Q.i], ok = v === Q.truth;
  if (ok) Q.score++; else Q.wrong.push(it);
  Q.fb = [ok ? 'ok' : 'bad', (ok ? t('ok') + ' ' : '❌ ') + nm(it.n)];
  HL = new Map([[it, ok ? '#22c55e' : '#ef4444']]); paint(); setLabel(it, nm(it.n), ok ? '#22c55e' : '#ef4444'); Q.done = true; renderQuiz();
}
function quizTap(it) {
  if (!Q || Q.done || Q.i >= Q.list.length || !it) return;
  const tg = Q.list[Q.i];
  if (it === tg) { if (!Q.miss) Q.score++; else Q.wrong.push(tg); Q.fb = ['ok', t('ok')]; HL = new Map([[it, '#22c55e']]); Q.done = true; Q.miss = false; setLabel(it, nm(it.n), '#22c55e'); }
  else { Q.miss = true; Q.fb = ['bad', t('badTap', {n: nm(it.n)})]; HL = new Map([[it, '#ef4444']]); setLabel(it, nm(it.n), '#ef4444'); }
  paint(); renderQuiz();
}

// ------------------------------------------------------------------ chuqur o'rganish (3 bosqich, xatolar qaytadi)
let DGRP = -1;
function renderDeep() {
  const pb = $('pb'), done = mGet(SEC.id);
  if (!DP) {
    const cnt = gi => { const its = ITEMS.filter(it => gi < 0 || it.g === gi); return `${its.filter(it => done.has(it.n)).length}/${its.length}`; };
    pb.innerHTML = `<p class="intro">${t('deepIntro')}</p><div class="chips" style="margin-bottom:14px">` +
      [[-1, t('deepAll')], ...SEC.groups.map((g, gi) => [gi, g.t[LANG] || g.t.uz])].filter(([gi]) => gi < 0 || ITEMS.some(it => it.g === gi)).map(([gi, l]) =>
        `<button class="chip${DGRP === gi ? ' on' : ''}" data-g="${gi}">${esc(l)} · ${cnt(gi)}</button>`).join('') +
      `</div><button class="cta v" id="dGo">${t('deepStart')}</button>${done.size ? `<div class="row2" style="margin-top:10px"><button id="dR">${t('reset')}</button></div>` : ''}`;
    pb.querySelectorAll('.chip[data-g]').forEach(b => b.onclick = () => { DGRP = +b.dataset.g; renderDeep(); });
    $('dGo').onclick = startDeep;
    if ($('dR')) $('dR').onclick = () => { try { localStorage.removeItem(mKey(SEC.id)); } catch (e) {} renderDeep(); };
    return;
  }
  if (!DP.q.length) {
    HL = new Map(); paint(); setLabel(null);
    pb.innerHTML = `<div class="score"><div class="big">🎓</div><p class="intro" style="text-align:center">${t('deepDone', {n: DP.total})}</p></div><button class="cta" id="dA">${t('again')}</button>`;
    $('dA').onclick = () => { DP = null; renderDeep(); }; return;
  }
  const c = DP.q[0], it = c.it, prog = (DP.steps / (DP.total * 3)) * 100;
  let h = `<div class="qhead">${t('r' + c.r)}</div><div class="bar"><i style="width:${prog}%"></i></div><div class="qq">${t('qName')}</div>`;
  if (c.r === 1) {
    if (!c.opts) { const pool = shuffle(ITEMS.filter(x => x !== it && x.g === it.g)).concat(shuffle(ITEMS.filter(x => x !== it && x.g !== it.g))); c.opts = shuffle([it, ...pool.slice(0, 3)]); }
    h += `<div class="opts">` + c.opts.map((o, i) => `<button data-i="${i}" class="${DP.ans != null ? (o === it ? 'ok' : (DP.ans === i ? 'bad' : '')) : ''}">${esc(nm(o.n))}</button>`).join('') + `</div>`;
  } else if (DP.ans == null) {
    h += c.r === 2 ? `<div class="ghost" id="dG">${ghost(nm(it.n), DP.hint)}</div>` : '';
    h += `<input class="inp" id="dIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('ph')}"><div class="row2">${c.r === 2 ? `<button id="dH">${t('hint')}</button>` : ''}<button id="dD">${t('dunno')}</button></div><button class="cta" id="dC" style="margin-top:8px">${t('check')}</button>`;
  }
  if (DP.fb) h += `<div class="fb ${DP.fb[0]}">${esc(DP.fb[1])}</div>${DP.ans != null ? `<p class="desc" style="margin-top:10px">${esc(dsc(it.n))}</p>` : ''}`;
  if (DP.ans != null) h += `<button class="cta" id="dX" style="margin-top:12px">${t('next')}</button>`;
  pb.innerHTML = h;
  if (c.r === 1 && DP.ans == null) pb.querySelectorAll('.opts button').forEach(b => b.onclick = () => deepAnswer(c.opts[+b.dataset.i] === it, +b.dataset.i));
  if (c.r > 1 && DP.ans == null) {
    const inp = $('dIn'); if (window.innerWidth >= 900) inp.focus();
    inp.onkeydown = e => { if (e.key === 'Enter') deepAnswer(matches(inp.value, it.n), 0); };
    $('dC').onclick = () => deepAnswer(matches(inp.value, it.n), 0); $('dD').onclick = () => deepAnswer(false, 0);
    if ($('dH')) $('dH').onclick = () => { DP.hint = Math.min(DP.hint + 1, nm(it.n).length); $('dG').innerHTML = ghost(nm(it.n), DP.hint); };
  }
  if (DP.ans != null) $('dX').onclick = deepNext;
}
function startDeep() {
  const done = mGet(SEC.id);
  let its = ITEMS.filter(it => (DGRP < 0 || it.g === DGRP) && it.nv >= 40 && !done.has(it.n));
  if (!its.length) { toast(t('nothing')); return; }
  its = shuffle(its).slice(0, 12);
  DP = {q: its.map(it => ({it, r: 1})), total: its.length, steps: 0, ans: null, fb: null, hint: 1};
  onlyMode = false; meshes.forEach(m => m.visible = true); deepShow();
}
function deepShow() { setLabel(null); if (DP.q.length) { HL = new Map([[DP.q[0].it, '#ef4444']]); paint(); faceItem(DP.q[0].it); } DP.hint = 1; renderDeep(); }
function deepAnswer(ok, i) {
  const c = DP.q[0];
  DP.ans = i; DP.ok = ok;
  DP.fb = ok ? ['ok', t('okIs', {n: nm(c.it.n)})] : ['bad', t('bad', {n: nm(c.it.n)})];
  HL = new Map([[c.it, ok ? '#22c55e' : '#ef4444']]); paint(); setLabel(c.it, nm(c.it.n), ok ? '#22c55e' : '#ef4444'); renderDeep();
}
function deepNext() {
  const c = DP.q.shift();
  if (DP.ok) { DP.steps++; c.r++; c.opts = null; if (c.r > 3) mAdd(SEC.id, c.it.n); else DP.q.splice(Math.min(3, DP.q.length), 0, c); }
  else { c.opts = null; DP.q.splice(Math.min(2, DP.q.length), 0, c); }
  DP.ans = null; DP.fb = null; deepShow();
}

// ------------------------------------------------------------------ boshqaruv
function bind() {
  $('vBack').onclick = () => { $('view').classList.add('hide'); $('home').classList.remove('hide'); renderHome(); history.replaceState(null, '', location.pathname + (DEV ? '?dev=1' : '')); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
  $('vShare').onclick = share;
  $('tabs').querySelectorAll('button').forEach(b => b.onclick = () => setTab(b.dataset.t));
  $('bReset').onclick = () => { onlyMode = false; meshes.forEach(m => m.visible = true); $('exp').value = 0; setExplode(0); resetView(); if (TAB === 'parts') unselect(); };
  $('bColor').onclick = () => { colorMode = !colorMode; labels(); paint(); };
  $('bXray').onclick = () => { xray = !xray; labels(); paint(); };
  $('bFull').onclick = () => { const d = document; if (d.fullscreenElement) d.exitFullscreen().catch(() => {}); else (d.documentElement.requestFullscreen || d.documentElement.webkitRequestFullscreen || (() => {})).call(d.documentElement); };
  $('exp').oninput = e => setExplode(e.target.value / 100);
  let playing = 0;
  $('bPlay').onclick = () => {
    if (playing) return; const from = explodeK, to = from > 0.5 ? 0 : 1, t0 = performance.now(); playing = 1;
    const tick = now => { const k = Math.min(1, (now - t0) / 1200), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, v = from + (to - from) * e; setExplode(v); $('exp').value = v * 100; if (k < 1) requestAnimationFrame(tick); else playing = 0; };
    requestAnimationFrame(tick);
  };
  document.addEventListener('keydown', e => { if ($('view').classList.contains('hide') || TAB !== 'parts' || /INPUT/.test(document.activeElement.tagName)) return; if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'Escape') unselect(); });
}

(async () => {
  const ok = await gate();
  if (!ok) { $('lkT').textContent = t('lockT'); $('lkD').textContent = t('lockD'); $('lkB').textContent = t('lockB'); $('lock').classList.remove('hide'); return; }
  DATA = await (await fetch('data.json?v=2')).json();
  bind(); renderHome();
  const si = DATA.sections.findIndex(s => s.id === QS.get('s'));
  if (si >= 0) openSection(si, QS.get('p') != null ? +QS.get('p') : null); else $('home').classList.remove('hide');
})();
