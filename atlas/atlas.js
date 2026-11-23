// TadrisAI · 3D anatomiya atlasi (2026-11-23). Modellar: BodyParts3D, © DBCLS, CC BY 4.0.
import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';

const $ = id => document.getElementById(id);
const API = location.hostname === 'tadris.ai' ? '/api' : 'https://91-107-229-30.sslip.io/api';
const DEV = new URLSearchParams(location.search).get('dev') === '1' && location.hostname !== 'tadris.ai';

const TX = {
  uz: {back: '← TadrisAI', badge: 'SINOV · faqat admin', title: '3D <b>anatomiya</b> atlasi', desc: "Tana a'zolarini aylantiring, qismlarga ajrating va har bir qismning o'zbekcha, ruscha va lotincha nomini o'rganing.",
    parts: '{n} ta qism', load: '3D model yuklanmoqda…', noGl: "Bu qurilma 3D ko'rinishni qo'llamaydi.", vback: '← Atlas', learn: "O'rganish", quiz: 'Viktorina',
    hint: "Qismni bosing — nomi shu yerda chiqadi. Barmoq bilan aylantiring, ikki barmoq bilan kattalashtiring.", only: 'Faqat shuni', all: "Hammasini ko'rsatish",
    prev: '‹', next: '›', prez: '📊 Prezentatsiya yasash', test: '✅ Test tuzish', list: "Qismlar ro'yxati", search: 'Qidirish…', left: 'chap', right: "o'ng",
    find: '«{n}» ni toping', qn: '{i} / {n}', right_: "✅ To'g'ri!", wrong: '❌ Bu — {n}', show: "Javobni ko'rsatish", nextQ: 'Keyingi', done: 'Natija: {s} / {n}', again: 'Qaytadan',
    reset: "Boshlang'ich ko'rinish", color: 'Rangli / tabiiy', play: 'Sochib-yig\'ish', zin: 'Yaqinlashtirish', zout: 'Uzoqlashtirish', full: "To'liq ekran",
    lockT: 'Atlas tez orada', lockD: "Bu bo'lim hozircha sinovda. Tez orada hamma uchun ochiladi.", lockB: 'TadrisAI ga qaytish', credit: '3D modellar: {c}',
    topicSec: '{t}ning tuzilishi', err: "Model yuklanmadi. Internetni tekshirib, qayta urinib ko'ring."},
  ru: {back: '← TadrisAI', badge: 'ТЕСТ · только админ', title: '3D-<b>атлас</b> анатомии', desc: 'Вращайте органы, разбирайте на части и изучайте названия каждой части на узбекском, русском и латыни.',
    parts: '{n} частей', load: 'Загружается 3D-модель…', noGl: 'Это устройство не поддерживает 3D.', vback: '← Атлас', learn: 'Изучение', quiz: 'Викторина',
    hint: 'Нажмите на часть — здесь появится название. Вращайте пальцем, масштабируйте двумя пальцами.', only: 'Только эту', all: 'Показать все',
    prev: '‹', next: '›', prez: '📊 Сделать презентацию', test: '✅ Составить тест', list: 'Список частей', search: 'Поиск…', left: 'слева', right: 'справа',
    find: 'Найдите: «{n}»', qn: '{i} / {n}', right_: '✅ Верно!', wrong: '❌ Это — {n}', show: 'Показать ответ', nextQ: 'Дальше', done: 'Результат: {s} / {n}', again: 'Ещё раз',
    reset: 'Исходный вид', color: 'Цветной / натуральный', play: 'Разобрать-собрать', zin: 'Приблизить', zout: 'Отдалить', full: 'Во весь экран',
    lockT: 'Атлас скоро', lockD: 'Раздел пока тестируется и скоро откроется для всех.', lockB: 'Вернуться в TadrisAI', credit: '3D-модели: {c}',
    topicSec: 'Строение: {t}', err: 'Модель не загрузилась. Проверьте интернет и попробуйте снова.'},
  en: {back: '← TadrisAI', badge: 'TEST · admin only', title: '3D <b>anatomy</b> atlas', desc: 'Rotate organs, take them apart and learn the name of every part in Uzbek, Russian and Latin.',
    parts: '{n} parts', load: 'Loading 3D model…', noGl: "This device doesn't support 3D.", vback: '← Atlas', learn: 'Learn', quiz: 'Quiz',
    hint: 'Tap a part to see its name here. Drag to rotate, pinch to zoom.', only: 'Only this', all: 'Show all',
    prev: '‹', next: '›', prez: '📊 Make a presentation', test: '✅ Make a test', list: 'Parts list', search: 'Search…', left: 'left', right: 'right',
    find: 'Find: «{n}»', qn: '{i} / {n}', right_: '✅ Correct!', wrong: '❌ That is {n}', show: 'Show answer', nextQ: 'Next', done: 'Score: {s} / {n}', again: 'Again',
    reset: 'Reset view', color: 'Colour / natural', play: 'Explode', zin: 'Zoom in', zout: 'Zoom out', full: 'Full screen',
    lockT: 'Atlas coming soon', lockD: 'This section is being tested and will open for everyone soon.', lockB: 'Back to TadrisAI', credit: '3D models: {c}',
    topicSec: 'Structure of the {t}', err: "The model didn't load. Check your connection and try again."},
};
let LANG = (() => { try { const l = localStorage.getItem('tadris_lang') || localStorage.getItem('atlas_lang'); if (TX[l]) return l; if (l === 'uzn' || l === 'kaa') return 'uz'; if (['kk', 'ky', 'tg'].includes(l)) return 'ru'; } catch (e) {} return (navigator.language || '').startsWith('ru') ? 'ru' : 'uz'; })();
const t = (k, o) => { let s = (TX[LANG] || TX.uz)[k] ?? TX.uz[k] ?? k; if (o) for (const [a, b] of Object.entries(o)) s = s.replace('{' + a + '}', b); return s; };
const NI = {en: 0, uz: 1, ru: 2, lat: 3};
let DATA = null;

// ------------------------------------------------------------------ kirish: faqat admin (sinov)
async function gate() {
  if (DEV) return true;
  let ws = ''; try { ws = localStorage.getItem('tadris_ws') || ''; } catch (e) {}
  if (!ws) return false;
  try {
    const r = await fetch(API + '/me', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ws})});
    const d = await r.json(); return !!(d && d.ok && d.admin);
  } catch (e) { return false; }
}

function nm(i, lang = LANG) { const n = DATA.names[i]; return lang === 'en' ? cap(n[0]) : n[NI[lang]]; }
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const sideTx = s => s === 'l' ? t('left') : s === 'r' ? t('right') : '';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

// ------------------------------------------------------------------ bosh sahifa
function renderHome() {
  $('hBack').textContent = t('back'); $('hBadge').textContent = t('badge');
  $('hT').innerHTML = t('title'); $('hD').textContent = t('desc');
  $('credit').textContent = t('credit', {c: DATA.credit});
  $('langs').innerHTML = ['uz', 'ru', 'en'].map(l => `<button data-l="${l}" class="${l === LANG ? 'on' : ''}">${l.toUpperCase()}</button>`).join('');
  $('langs').querySelectorAll('button').forEach(b => b.onclick = () => { LANG = b.dataset.l; try { localStorage.setItem('atlas_lang', LANG); } catch (e) {} renderHome(); });
  $('grid').innerHTML = DATA.sections.map((s, i) => `<button class="sec" data-i="${i}"><div class="ic">${s.icon}</div><b>${esc(s.t[LANG] || s.t.uz)}</b><small>${t('parts', {n: s.parts.length})}</small></button>`).join('');
  $('grid').querySelectorAll('.sec').forEach(b => b.onclick = () => openSection(+b.dataset.i));
}

// ------------------------------------------------------------------ 3D sahna
let renderer, scene, camera, controls, raycaster, meshes = [], group, SEC = null, colorMode = false, explodeK = 0, selected = null, radius = 1, animReq = 0;
const pointer = new THREE.Vector2();

function initGL() {
  if (renderer) return true;
  try { renderer = new THREE.WebGLRenderer({canvas: $('cv'), antialias: true, alpha: false}); } catch (e) { return false; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x0b1124);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, 1, 1, 20000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 1.1));
  const d1 = new THREE.DirectionalLight(0xffffff, 1.4); d1.position.set(1, 1.2, 2); scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xc4b5fd, 0.5); d2.position.set(-2, -0.5, -1.5); scene.add(d2);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.rotateSpeed = 0.8;
  raycaster = new THREE.Raycaster();
  window.addEventListener('resize', resize);
  let down = null;
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY, performance.now()]; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!down) return; const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]); const dt = performance.now() - down[2]; down = null;
    if (moved < 8 && dt < 600) pick(e);
  });
  return true;
}
function resize() {
  if (!renderer) return;
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
function loop() { animReq = requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); }

// ------------------------------------------------------------------ ranglar
const NAT = {bone: 0xe8dcc4, tooth: 0xf5f1e6, muscle: 0xb5524a, heart: 0xb84a42, brain: 0xe2b4ac, lung: 0xe9d6cf, gut: 0xd98b7a, vessel: 0xc0392b};
function natColor(mat, en) {
  if (/\bvein|vena|sinus\b/.test(en)) return mat === 'lung' ? 0xc0392b : 0x3b6fd1;
  if (/artery|aorta|arterial|celiac trunk|brachiocephalic artery/.test(en)) return mat === 'lung' ? 0x3b6fd1 : 0xc0392b;
  if (/bronch|trachea/.test(en)) return 0xeae3d6;
  if (/valve|leaflet|cusp/.test(en)) return 0xf1e3c8;
  if (/cavity/.test(en)) return 0x7f1d1d;
  if (/papillary/.test(en)) return 0xa83a32;
  if (/ventricle|aqueduct|circumventricular/.test(en) && mat === 'brain') return 0x7aa7e0;
  if (/white matter|internal capsule/.test(en)) return 0xf4ede4;
  if (/cerebellum/.test(en)) return 0xd59c94;
  if (/hepatovenous|lobular segment|liver/.test(en)) return 0x8b3a2b;
  if (/gallbladder|\bduct\b|biliary/.test(en)) return 0x5a9a5a;
  if (/pancrea/.test(en)) return 0xe0b06a;
  if (/gland/.test(en)) return 0xd9a066;
  if (/mesentery|mesocolon|mesoappendix/.test(en)) return 0xe8cf9f;
  if (/tongue/.test(en)) return 0xc96a6a;
  if (/gingiva/.test(en)) return 0xe59a9a;
  if (/tooth/.test(en)) return 0xf5f1e6;
  if (/mandible|maxilla|bone|vomer|ethmoid|concha/.test(en)) return 0xe8dcc4;
  if (/diaphragm|muscle|sphincter|constrictor|^m\./.test(en) && mat !== 'muscle') return 0xb5524a;
  return NAT[mat] || 0xd0c4b8;
}
function hueColor(i) { const c = new THREE.Color(); c.setHSL(((i * 137.508) % 360) / 360, 0.62, 0.58); return c; }
function applyColors() {
  meshes.forEach(m => {
    const en = DATA.names[m.userData.n][0];
    m.material.color.copy(colorMode ? hueColor(m.userData.n) : new THREE.Color(natColor(SEC.mat, en)));
    const cav = (/cavity|mesentery|mesocolon|mesoappendix/.test(en) || (SEC.mat === 'lung' && /diaphragm/.test(en))) && !colorMode;
    m.material.transparent = cav; m.material.opacity = cav ? 0.35 : 1; m.material.depthWrite = !cav;
  });
}

// ------------------------------------------------------------------ model yuklash
async function loadBin(id) {
  const r = await fetch('m/' + id + '.bin.gz?v=1'); if (!r.ok) throw new Error('http ' + r.status);
  let buf;
  if (typeof DecompressionStream !== 'undefined') buf = await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  else throw new Error('gzip');
  const dv = new DataView(buf);
  if (String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)) !== 'TA3D') throw new Error('format');
  const hl = dv.getUint32(4, true); const head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 8, hl)));
  let off = 8 + hl; const out = [];
  for (const p of head.parts) {
    const q = new Int16Array(buf, off, p.nv * 3); off += p.nv * 6; off += (4 - (off % 4)) % 4;
    const idx = p.i4 ? new Uint32Array(buf, off, p.nt * 3) : new Uint16Array(buf, off, p.nt * 3); off += p.nt * 3 * (p.i4 ? 4 : 2); off += (4 - (off % 4)) % 4;
    const pos = new Float32Array(p.nv * 3), k = head.half / 32767;
    for (let i = 0; i < p.nv; i++) { const x = q[i * 3] * k, y = q[i * 3 + 1] * k, z = q[i * 3 + 2] * k; pos[i * 3] = x; pos[i * 3 + 1] = z; pos[i * 3 + 2] = -y; }  // BodyParts3D: Z yuqori, old tomon −Y
    out.push({id: p.id, pos, idx: idx.slice(), c: new THREE.Vector3(p.c[0], p.c[2], -p.c[1]), nv: p.nv});
  }
  return {head, parts: out};
}

async function openSection(i) {
  SEC = DATA.sections[i];
  $('home').classList.add('hide'); $('view').classList.remove('hide');
  $('vT').textContent = SEC.icon + ' ' + (SEC.t[LANG] || SEC.t.uz);
  labelsView(); hidePanel(); setTab('learn'); $('exp').value = 0; explodeK = 0;
  if (!initGL()) { $('loadT').textContent = t('noGl'); $('load').classList.remove('hide'); return; }
  resize(); $('load').classList.remove('hide'); $('loadT').textContent = t('load');
  if (group) { scene.remove(group); meshes.forEach(m => { m.geometry.dispose(); m.material.dispose(); }); }
  meshes = []; group = new THREE.Group(); scene.add(group);
  try {
    const {parts} = await loadBin(SEC.id);
    const byId = Object.fromEntries(SEC.parts.map(p => [p[0], p]));
    for (const p of parts) {
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p.pos, 3)); g.setIndex(new THREE.BufferAttribute(p.idx, 1)); g.computeVertexNormals();
      const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({roughness: 0.62, metalness: 0.02, side: THREE.DoubleSide}));
      const meta = byId[p.id] || [p.id, 0, ''];
      m.userData = {id: p.id, n: meta[1], s: meta[2], c: p.c, nv: p.nv};
      group.add(m); meshes.push(m);
    }
  } catch (e) { $('loadT').textContent = t('err'); console.error(e); return; }
  applyColors();
  const box = new THREE.Box3().setFromObject(group); const sz = box.getSize(new THREE.Vector3()); const ctr = box.getCenter(new THREE.Vector3());
  group.position.sub(ctr); radius = Math.max(sz.x, sz.y, sz.z) / 2;
  resetView(); $('load').classList.add('hide');
  if (!animReq) loop();
  buildList();
}
function resetView() {
  const v = camera.fov * Math.PI / 180, h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);   // tor (telefon) ekranda kenglik bo'yicha sig'dirish
  const fov = Math.min(v, h), dist = radius / Math.sin(fov / 2) * 1.08;
  camera.position.set(0, radius * 0.05, dist); camera.near = dist / 100; camera.far = dist * 20; camera.updateProjectionMatrix();
  controls.target.set(0, 0, 0); controls.minDistance = radius * 0.15; controls.maxDistance = dist * 3; controls.update();
}
function fitTo(m) {   // tanlangan qismga yaqinlashish
  m.geometry.computeBoundingSphere(); const sp = m.geometry.boundingSphere, w = new THREE.Vector3(); m.getWorldPosition(w);
  const c = sp.center.clone().add(w), v = camera.fov * Math.PI / 180, h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
  const dist = Math.max(sp.radius, radius * 0.04) / Math.sin(Math.min(v, h) / 2) * 1.35;
  const dir = camera.position.clone().sub(controls.target).normalize();
  controls.target.copy(c); camera.position.copy(c).add(dir.multiplyScalar(dist)); controls.update();
}
function setExplode(k) {
  explodeK = k; const f = k * 0.9;
  meshes.forEach(m => m.position.copy(m.userData.c).multiplyScalar(f));
}

// ------------------------------------------------------------------ tanlash va ma'lumot
function pick(e) {
  const r = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(meshes.filter(m => m.visible), false)[0];
  if (MODE === 'quiz') return quizTap(hit && hit.object);
  if (hit) select(hit.object); else { unselect(); hidePanel(); }
}
function unselect() { if (selected) { selected.material.emissive.setHex(0x000000); selected = null; } }
function select(m, focus) {
  unselect(); selected = m; m.material.emissive.setHex(0x5b21b6);
  if (focus) { const w = new THREE.Vector3(); m.getWorldPosition(w); const c = m.geometry.boundingSphere || (m.geometry.computeBoundingSphere(), m.geometry.boundingSphere); controls.target.copy(c.center.clone().add(w)); }
  showPanel(m);
}
function showPanel(m) {
  const n = m.userData.n, s = m.userData.s, main = nm(n), lat = DATA.names[n][3];
  const alt = LANG === 'uz' ? DATA.names[n][2] : DATA.names[n][1];
  const onlyMode = meshes.some(x => !x.visible);
  $('panel').innerHTML = `<h3>${esc(main)}${s ? `<span class="chip">${sideTx(s)}</span>` : ''}</h3><div class="lat">${esc(lat)}</div><div class="alt">${esc(alt)}</div>
   <div class="row"><button class="btn sm" id="pPrev">${t('prev')}</button><button class="btn" id="pOnly">${onlyMode ? t('all') : t('only')}</button><button class="btn sm" id="pNext">${t('next')}</button></div>
   <div class="row"><button class="btn" id="pPrez">${t('prez')}</button><button class="btn" id="pTest">${t('test')}</button></div>`;
  $('pPrev').onclick = () => step(-1); $('pNext').onclick = () => step(1);
  $('pOnly').onclick = () => { if (onlyMode) { meshes.forEach(x => x.visible = true); resetView(); } else { meshes.forEach(x => x.visible = x === m); fitTo(m); } showPanel(m); };
  const topic = nm(n, 'uz');
  $('pPrez').onclick = () => location.href = '/?prez=' + encodeURIComponent(topic);
  $('pTest').onclick = () => location.href = '/?qtopic=' + encodeURIComponent(topic);
}
function hidePanel() {
  $('panel').innerHTML = `<p class="hint">${t('hint')}</p><div class="row"><button class="btn" id="pPrez">${t('prez')}</button><button class="btn" id="pTest">${t('test')}</button></div>`;
  if (!SEC) return; const topic = SEC.t.uz + ' tuzilishi';
  $('pPrez').onclick = () => location.href = '/?prez=' + encodeURIComponent(topic);
  $('pTest').onclick = () => location.href = '/?qtopic=' + encodeURIComponent(topic);
}
function step(d) {
  const vis = meshes; if (!vis.length) return;
  const i = selected ? meshes.indexOf(selected) : -1; const j = (i + d + meshes.length) % meshes.length;
  const only = meshes.some(x => !x.visible); if (only) meshes.forEach(x => x.visible = x === meshes[j]);
  select(meshes[j], !only); if (only) fitTo(meshes[j]);
}

// ------------------------------------------------------------------ ro'yxat
function buildList() {
  $('dT').textContent = t('list'); $('dQ').placeholder = t('search'); $('dQ').value = '';
  const draw = () => {
    const q = $('dQ').value.trim().toLowerCase();
    const items = meshes.map((m, i) => ({i, n: m.userData.n, s: m.userData.s})).filter(o => !q || DATA.names[o.n].some(x => x.toLowerCase().includes(q)));
    items.sort((a, b) => nm(a.n).localeCompare(nm(b.n)) || a.s.localeCompare(b.s));
    $('dL').innerHTML = items.map(o => `<button data-i="${o.i}">${esc(nm(o.n))}${o.s ? `<span class="chip">${sideTx(o.s)}</span>` : ''}<small>${esc(DATA.names[o.n][3])}</small></button>`).join('');
    $('dL').querySelectorAll('button').forEach(b => b.onclick = () => { $('drawer').classList.remove('on'); if (MODE === 'quiz') setTab('learn'); select(meshes[+b.dataset.i], true); });
  };
  $('dQ').oninput = draw; draw();
}

// ------------------------------------------------------------------ viktorina
let MODE = 'learn', QZ = null;
function setTab(k) {
  MODE = k; document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === k));
  $('qz').classList.toggle('hide', k !== 'quiz'); $('panel').classList.toggle('hide', k === 'quiz');
  unselect(); meshes.forEach(m => m.visible = true);
  if (k === 'quiz') startQuiz();
}
function startQuiz() {
  const seen = new Set(), pool = [];
  for (const m of [...meshes].sort(() => Math.random() - 0.5)) { if (m.userData.nv < 60 || seen.has(m.userData.n)) continue; seen.add(m.userData.n); pool.push(m.userData.n); }
  QZ = {list: pool.slice(0, Math.min(10, pool.length)), i: 0, score: 0, answered: false};
  drawQuiz();
}
function drawQuiz(msg) {
  if (QZ.i >= QZ.list.length) { $('qz').innerHTML = `<b>${t('done', {s: QZ.score, n: QZ.list.length})}</b><div class="row"><button class="btn pri" id="qAgain">${t('again')}</button></div>`; $('qAgain').onclick = startQuiz; return; }
  const n = QZ.list[QZ.i];
  $('qz').innerHTML = `<div class="hint">${t('qn', {i: QZ.i + 1, n: QZ.list.length})}</div><b>${esc(t('find', {n: nm(n)}))}</b>${msg ? `<div class="res">${msg}</div>` : ''}
    <div class="row"><button class="btn" id="qShow">${t('show')}</button><button class="btn pri" id="qNext">${t('nextQ')}</button></div>`;
  $('qShow').onclick = () => { unselect(); const m = meshes.find(x => x.userData.n === n); if (m) { selected = m; m.material.emissive.setHex(0x15803d); } QZ.answered = true; };
  $('qNext').onclick = () => { unselect(); QZ.i++; QZ.answered = false; drawQuiz(); };
}
function quizTap(m) {
  if (!m || QZ.i >= QZ.list.length) return;
  unselect(); selected = m;
  const ok = m.userData.n === QZ.list[QZ.i];
  m.material.emissive.setHex(ok ? 0x15803d : 0x991b1b);
  if (ok && !QZ.answered) QZ.score++;
  if (ok) { QZ.answered = true; drawQuiz(`<span class="ok">${t('right_')}</span>`); }
  else drawQuiz(`<span class="bad">${esc(t('wrong', {n: nm(m.userData.n)}))}</span>`);
}

// ------------------------------------------------------------------ boshqaruv
function labelsView() {
  $('vBack').textContent = t('vback'); $('tLearn').textContent = t('learn'); $('tQuiz').textContent = t('quiz');
  [['bReset', 'reset'], ['bColor', 'color'], ['bPlay', 'play'], ['bIn', 'zin'], ['bOut', 'zout'], ['bFull', 'full']].forEach(([id, k]) => { $(id).title = t(k); $(id).setAttribute('aria-label', t(k)); });
}
function bind() {
  $('vBack').onclick = () => { $('view').classList.add('hide'); $('home').classList.remove('hide'); $('drawer').classList.remove('on'); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
  $('vList').onclick = () => $('drawer').classList.toggle('on'); $('dX').onclick = () => $('drawer').classList.remove('on');
  document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => setTab(b.dataset.t));
  $('bReset').onclick = () => { meshes.forEach(m => m.visible = true); $('exp').value = 0; setExplode(0); unselect(); hidePanel(); resetView(); };
  $('bColor').onclick = () => { colorMode = !colorMode; $('bColor').classList.toggle('on', colorMode); applyColors(); };
  $('bIn').onclick = () => { camera.position.lerp(controls.target, 0.25); };
  $('bOut').onclick = () => { camera.position.sub(controls.target).multiplyScalar(1.3).add(controls.target); };
  $('bFull').onclick = () => { const d = document; if (d.fullscreenElement) d.exitFullscreen().catch(() => {}); else (d.documentElement.requestFullscreen || d.documentElement.webkitRequestFullscreen || (() => {})).call(d.documentElement); };
  $('exp').oninput = e => setExplode(e.target.value / 100);
  let playing = 0;
  $('bPlay').onclick = () => {
    if (playing) return; const from = explodeK, to = from > 0.5 ? 0 : 1, t0 = performance.now(); playing = 1; $('bPlay').classList.add('on');
    const tick = now => { const k = Math.min(1, (now - t0) / 1200), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; const v = from + (to - from) * e; setExplode(v); $('exp').value = v * 100;
      if (k < 1) requestAnimationFrame(tick); else { playing = 0; $('bPlay').classList.remove('on'); } };
    requestAnimationFrame(tick);
  };
  document.addEventListener('keydown', e => { if ($('view').classList.contains('hide')) return; if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
}

// ------------------------------------------------------------------ ishga tushirish
(async () => {
  const ok = await gate();
  if (!ok) { $('lkT').textContent = t('lockT'); $('lkD').textContent = t('lockD'); $('lkB').textContent = t('lockB'); $('lock').classList.remove('hide'); return; }
  DATA = await (await fetch('data.json?v=1')).json();
  bind(); renderHome(); $('home').classList.remove('hide');
})();
