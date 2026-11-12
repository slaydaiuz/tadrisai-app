/* Test quiz va Krossvord (2026-11-11). Hozircha yaratish FAQAT ADMIN uchun; havola orqali kelgan har kim yechadi.
   index.html dagi $, esc, api, tg, qs, show, toast, userName, lang dan foydalanadi. Ekran: <section id="qz">. */
(function(){
const st=document.createElement('style');
st.textContent=`
.qz-head{display:flex;align-items:center;gap:10px;margin:2px 0 14px}
.qz-head h1{font-size:24px;font-weight:700;letter-spacing:-.01em}
.qz-tag{font-size:10.5px;font-weight:700;letter-spacing:.06em;padding:4px 8px;border-radius:999px;background:var(--chip);color:var(--chip-text)}
.qz-tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:5px;border-radius:16px;background:var(--surface);border:1px solid var(--line)}
.qz-tabs button{padding:11px;border-radius:12px;font-weight:600;color:var(--muted)}
.qz-tabs button[aria-pressed="true"]{background:linear-gradient(120deg,var(--blue),var(--indigo));color:#fff;font-weight:700}
.qz-ta{width:100%;min-height:78px;resize:vertical;padding:13px 14px;border-radius:var(--r-sm);border:1.5px solid var(--line);background:var(--field);color:var(--text);font:inherit;font-size:16px;outline:none}
.qz-ta:focus{border-color:var(--violet)}
.qz-in{width:100%;padding:13px 14px;border-radius:var(--r-sm);border:1.5px solid var(--line);background:var(--field);color:var(--text);font:inherit;font-size:16px;outline:none}
.qz-in:focus{border-color:var(--violet)}
.qz-seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px}
.qz-seg button{padding:11px 4px;border-radius:12px;border:1.5px solid var(--line);background:var(--field);font-weight:600;font-size:14px;color:var(--text)}
.qz-seg button[aria-pressed="true"]{border-color:var(--violet);background:var(--chip);color:var(--chip-text);font-weight:700}
.qz-langs{display:flex;flex-wrap:wrap;gap:6px}
.qz-langs button{padding:8px 12px;border-radius:999px;border:1.5px solid var(--line);background:var(--field);font-size:13px;font-weight:600;color:var(--text)}
.qz-langs button[aria-pressed="true"]{border-color:var(--violet);background:var(--chip);color:var(--chip-text)}
.qz-card{padding:14px 16px;border-radius:18px;background:var(--surface);border:1px solid var(--line);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.qz-get{display:flex;flex-direction:column;gap:8px;margin-top:18px}
.qz-get div{display:flex;gap:9px;align-items:center;font-size:13.5px}
.qz-get i{font-style:normal;color:#10B981;font-weight:800}
.qz-hint{text-align:center;font-size:12px;color:var(--muted);margin-top:8px}
.qz-list{display:flex;flex-direction:column;gap:8px}
.qz-item{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:12px 14px;border-radius:16px;background:var(--surface);border:1px solid var(--line)}
.qz-item .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--chip);font-size:18px;flex:none}
.qz-item .tx{flex:1;min-width:0}.qz-item b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qz-item small{color:var(--muted);font-size:12px}
.qz-load{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center}
.qz-spin{width:56px;height:56px;border-radius:50%;border:4px solid var(--line);border-top-color:var(--violet);animation:qzs 1s linear infinite}
@keyframes qzs{to{transform:rotate(360deg)}}
.qz-ok{width:64px;height:64px;border-radius:20px;display:grid;place-items:center;font-size:30px;background:rgba(16,185,129,.16);margin:6px auto 12px}
.qz-title{font-size:21px;font-weight:700;text-align:center;line-height:1.25}
.qz-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:10px 0 18px}
.qz-chips span{font-size:12px;font-weight:600;padding:5px 10px;border-radius:999px;background:var(--surface);border:1px solid var(--line);color:var(--muted)}
.qz-link{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:var(--field);border:1.5px dashed var(--violet);font-size:13.5px;font-weight:600;word-break:break-all}
.qz-link span{flex:1}.qz-link button{flex:none;padding:7px 11px;border-radius:10px;background:var(--chip);color:var(--chip-text);font-weight:700;font-size:12.5px}
.qz-2{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.qz-btn{padding:14px;border-radius:14px;font-weight:700;font-size:15px;border:1.5px solid var(--line);background:var(--surface);color:var(--text)}
.qz-btn.pri{border:0;color:#fff;background:linear-gradient(120deg,var(--blue),var(--indigo) 50%,var(--violet))}
.qz-btn:disabled{opacity:.5}
.qz-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.qz-x{width:42px;height:42px;border-radius:14px;background:var(--surface);border:1px solid var(--line);display:grid;place-items:center;font-size:16px;flex:none}
.qz-prog{flex:1}.qz-prog b{font-size:14px}.qz-prog small{display:block;color:var(--muted);font-size:12px}
.qz-bar{height:6px;border-radius:9px;background:var(--line);overflow:hidden;margin-top:6px}.qz-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--blue),var(--violet));border-radius:9px;transition:width .3s}
.qz-tm{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:15px;flex:none;background:conic-gradient(var(--violet) var(--p,100%),var(--line) 0)}
.qz-tm span{width:38px;height:38px;border-radius:50%;background:var(--bg);display:grid;place-items:center}
.qz-tm.low{background:conic-gradient(#F59E0B var(--p,100%),var(--line) 0)}
.qz-q{padding:20px 18px;border-radius:22px;background:var(--surface);border:1px solid var(--line);margin-bottom:14px}
.qz-q small{font-size:12px;font-weight:800;letter-spacing:.06em;color:var(--chip-text)}
.qz-q h2{font-size:19px;font-weight:700;line-height:1.35;margin-top:8px}
.qz-opts{display:flex;flex-direction:column;gap:9px}
.qz-opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:14px;border-radius:16px;border:1.5px solid var(--line);background:var(--surface);font-size:15.5px;font-weight:600;color:var(--text)}
.qz-opt .k{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--chip);color:var(--chip-text);font-weight:800;flex:none}
.qz-opt .lb{margin-left:auto;font-size:11.5px;font-weight:700}
.qz-opt.good{border-color:#10B981;background:rgba(16,185,129,.14)}.qz-opt.good .k{background:#10B981;color:#fff}.qz-opt.good .lb{color:#10B981}
.qz-opt.bad{border-color:#EF4444;background:rgba(239,68,68,.12)}.qz-opt.bad .k{background:#EF4444;color:#fff}.qz-opt.bad .lb{color:#EF4444}
.qz-opt.dim{opacity:.55}
.qz-why{margin-top:12px;padding:14px 16px;border-radius:18px;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.35)}
.qz-why b{font-size:13px;color:#60A5FA}.qz-why p{font-size:14.5px;line-height:1.5;margin-top:4px}
.qz-note{text-align:center;font-size:12.5px;color:var(--muted);margin-top:12px}
.qz-ring{width:150px;height:150px;border-radius:50%;margin:8px auto 12px;display:grid;place-items:center;background:conic-gradient(#10B981 var(--p),var(--line) 0)}
.qz-ring div{width:124px;height:124px;border-radius:50%;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center}
.qz-ring b{font-size:34px;font-weight:800}.qz-ring small{color:var(--muted);font-size:13px}
.qz-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:16px 0}
.qz-stats div{padding:12px 6px;border-radius:16px;background:var(--surface);border:1px solid var(--line);text-align:center}
.qz-stats b{display:block;font-size:18px;font-weight:800}.qz-stats small{font-size:11.5px;color:var(--muted)}
.qz-row{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--line);font-size:14px}
.qz-row:last-child{border-bottom:0}
.qz-av{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--chip);color:var(--chip-text);font-weight:800;font-size:13px;flex:none}
.qz-warn{padding:14px 16px;border-radius:18px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.45);margin:12px 0}
.qz-warn b{color:#F59E0B;font-size:13px}.qz-warn p{font-size:14px;margin-top:4px;line-height:1.45}
.qz-qi{padding:14px;border-radius:16px;background:var(--surface);border:1px solid var(--line);margin-bottom:8px}
.qz-qi h3{font-size:14.5px;font-weight:700;line-height:1.35}
.qz-qi ol{margin:8px 0 0 18px;font-size:13.5px;color:var(--muted)}.qz-qi li.ok{color:#10B981;font-weight:700}
.qz-qi .del{margin-top:8px;font-size:12.5px;font-weight:700;color:#EF4444}
/* krossvord */
.qz-grid{display:grid;gap:3px;margin:0 auto;user-select:none;-webkit-user-select:none}
.qz-cell{position:relative;border-radius:6px;display:grid;place-items:center;font-weight:800;text-transform:uppercase}
.qz-cell.on{background:#F8FAFC;color:#0F172A;cursor:pointer}
:root[data-theme="light"] .qz-cell.on{background:#fff;box-shadow:inset 0 0 0 1.5px #CBD5E1}
.qz-cell.word{background:#DDD6FE!important;color:#1E1B4B}
.qz-cell.cur{background:#FCD34D!important;color:#0F172A;box-shadow:inset 0 0 0 2px #F59E0B!important}
.qz-cell.wrong{background:#FECACA!important;color:#B91C1C}
.qz-cell.done{background:#BBF7D0!important;color:#065F46}
.qz-cell em{position:absolute;left:2px;top:0;font-size:8.5px;font-weight:700;font-style:normal;color:#64748B;line-height:1.1}
.qz-gwrap{padding:14px 8px;border-radius:22px;background:var(--surface);border:1px solid var(--line);overflow-x:auto}
.qz-clue{margin:12px 0;padding:13px 15px;border-radius:18px;background:rgba(252,211,77,.12);border:1.5px solid rgba(252,211,77,.6)}
.qz-clue small{font-size:11.5px;font-weight:800;color:#F59E0B;letter-spacing:.05em}.qz-clue p{font-size:15px;font-weight:600;margin-top:3px;line-height:1.4}
.qz-cl{display:flex;gap:10px;padding:9px 14px;border-bottom:1px solid var(--line);font-size:13.5px;width:100%;text-align:left;color:var(--text)}
.qz-cl b{flex:none;width:38px;color:var(--chip-text)}.qz-cl.f{color:var(--muted);text-decoration:line-through}

.qz-up,.qz-srcf{display:flex;align-items:center;gap:12px;padding:12px 14px;margin-top:10px;border-radius:16px;border:1.5px dashed var(--line);background:var(--surface);cursor:pointer}
.qz-up:hover{border-color:var(--violet)}.qz-srcf{border-style:solid;border-color:var(--violet);cursor:default}
.qz-up .ic,.qz-srcf .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--chip);font-size:18px;flex:none}
.qz-up .tx,.qz-srcf .tx{flex:1;min-width:0}.qz-up b,.qz-srcf b{display:block;font-size:14px}.qz-up b i{font-style:normal;font-weight:500;color:var(--muted)}
.qz-up small,.qz-srcf small{display:block;font-size:12px;color:var(--muted);line-height:1.35;margin-top:2px}
.qz-srcf b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qz-up .btn{flex:none;padding:8px 12px;border-radius:10px;background:linear-gradient(120deg,var(--blue),var(--indigo));color:#fff;font-weight:700;font-size:13px}
.qz-srcf button{flex:none;width:32px;height:32px;border-radius:10px;background:var(--chip);color:var(--chip-text);font-weight:800}
.qz-types{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.qz-types button{text-align:left;padding:12px 13px;border-radius:14px;border:1.5px solid var(--line);background:var(--field);color:var(--text)}
.qz-types b{display:block;font-size:14px}.qz-types span{display:block;font-size:11.5px;color:var(--muted);margin-top:2px}
.qz-types button[aria-pressed="true"]{border-color:var(--violet);background:var(--chip)}.qz-types button[aria-pressed="true"] span{color:var(--chip-text)}
.qz-2c{display:grid;grid-template-columns:1fr 1fr;gap:10px}
select.qz-in{-webkit-appearance:none;appearance:none;background-image:linear-gradient(45deg,transparent 50%,var(--muted) 50%),linear-gradient(135deg,var(--muted) 50%,transparent 50%);background-position:calc(100% - 18px) 55%,calc(100% - 13px) 55%;background-size:5px 5px;background-repeat:no-repeat;padding-right:30px;font-size:14.5px}
.qz-opts.tf{display:grid;grid-template-columns:1fr 1fr}.qz-opts.tf .qz-opt{flex-direction:column;justify-content:center;text-align:center;padding:18px 10px}.qz-opts.tf .qz-opt .lb{margin:0}

.qz-types button{position:relative}
.qz-ex{position:absolute;right:9px;top:9px;font-style:normal;font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;background:var(--chip);color:var(--chip-text);border:1px solid rgba(139,92,246,.35)}
.qz-types b{padding-right:62px}
.qz-exov{position:fixed;inset:0;z-index:60;background:rgba(2,6,23,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;padding:16px}
.qz-exbox{width:100%;max-width:460px;max-height:88vh;overflow:auto;background:var(--bg);border:1px solid var(--line);border-radius:24px;padding:16px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6);animation:qzup .22s ease}
@keyframes qzup{from{transform:translateY(30px);opacity:0}}
@media(min-width:700px){.qz-exov{align-items:center}}
.qz-exhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}.qz-exhead b{font-size:16px}
.qz-exhead button{width:34px;height:34px;border-radius:11px;background:var(--surface);border:1px solid var(--line);color:var(--text)}
.qz-exbody{pointer-events:none}.qz-exbody .qz-q h2{font-size:17px}.qz-exbody .qz-opt{padding:11px 12px;font-size:14.5px}
.qz-mini{padding:10px;border-radius:18px;border:1px dashed var(--line);margin-bottom:10px}.qz-mini .qz-q{padding:14px}.qz-mini .qz-q h2{font-size:15px}

.qz-extabs{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:4px;border-radius:14px;background:var(--surface);border:1px solid var(--line);margin-bottom:10px}
.qz-extabs button{padding:9px 4px;border-radius:10px;font-size:12.5px;font-weight:600;color:var(--muted)}
.qz-extabs button[aria-pressed="true"]{background:linear-gradient(120deg,var(--blue),var(--indigo));color:#fff;font-weight:700}
.pp{background:#fff;color:#0F172A;border-radius:6px;padding:18px 18px 12px;font-family:Arial,'Liberation Sans',sans-serif;box-shadow:0 14px 30px -14px rgba(0,0,0,.6);font-size:12px}
.pp-t{font-size:17px;font-weight:800}.pp-s{font-size:10.5px;color:#64748B;margin:2px 0 10px}
.pp-l{display:flex;justify-content:space-between;gap:6px;font-size:9.5px;color:#64748B;margin-bottom:8px;flex-wrap:wrap}
.pp-n{font-size:10px;font-style:italic;color:#64748B;margin-bottom:8px}
.pp-q{font-weight:700;font-size:12px;margin:8px 0 4px}.pp-q span{color:#5D45F5}
.pp-o{display:flex;gap:18px;padding-left:12px;font-size:11.5px}.pp-o.g{display:grid;grid-template-columns:1fr 1fr;gap:3px 12px}.pp-o b{color:#5D45F5}
.pp-h{font-weight:800;font-size:12.5px;margin:12px 0 6px}
.pp-grid{display:grid;grid-template-columns:repeat(10,1fr);border:1px solid #CBD5E1}
.pp-grid div{border-right:1px solid #CBD5E1;text-align:center}.pp-grid div:last-child{border-right:0}
.pp-grid i{display:block;font-style:normal;font-size:8.5px;color:#64748B;border-bottom:1px solid #CBD5E1;padding:1px 0}
.pp-grid b{display:block;height:18px;line-height:18px;color:#059669;font-size:12px}
.pp-a{padding-left:12px;font-size:11px;color:#64748B}.pp-a b{color:#059669}.pp-e{padding-left:12px;font-size:10.5px;color:#64748B;margin-top:2px}
.pp-sc{text-align:right;font-weight:700;margin-top:8px}.pp-f{text-align:right;font-size:8px;color:#94A3B8;margin-top:10px}
.qz-opt.sel{border-color:var(--violet);background:var(--chip)}.qz-opt.sel .k{background:var(--violet);color:#fff}
#qzKey{position:fixed;left:-200px;top:40%;width:40px;height:30px;opacity:0;font-size:16px}
`;
document.head.appendChild(st);

const LNAME={uz:"O'zbek",uzn:'Yangi lotin',kaa:'Qoraqalpoq',ru:'Rus',en:'Ingliz'};
const LVL={easy:'Oson',mid:"O'rtacha",hard:'Qiyin'};
const S={kind:'test',n:20,cn:12,level:'mid',aud:'class',qtype:'mc',grade:'',subject:'',src:null,qlang:(['uz','uzn','kaa','ru','en'].includes(lang)?lang:'uz'),quiz:null,code:''};
const QT={mc:['Variantli','A B C D'],tf:["To'g'ri / Noto'g'ri",'tasdiq — ha yoki yo\'q'],open:['Ochiq savollar','javobni o\'zi yozadi'],mix:['Aralash','uchala tur birga']};   // 2026-11-13: egasi ochiq va aralashni qaytardi
const QTN={mc:'Variantli',tf:"To'g'ri / Noto'g'ri",open:'Ochiq',mix:'Aralash'};                  // eski testlardagi nomlar uchun
const GRADES=['5-sinf','6-sinf','7-sinf','8-sinf','9-sinf','10-sinf','11-sinf','1-kurs','2-kurs','3-kurs','4-kurs'];
const SUBJ=['Matematika','Algebra','Geometriya','Fizika','Kimyo','Biologiya','Geografiya','Tarix','Ona tili','Adabiyot','O\'zbek tili','Rus tili','Ingliz tili','Nemis tili','Informatika','Huquq','Iqtisodiyot','Boshlang\'ich ta\'lim','Texnologiya','Tasviriy san\'at','Musiqa','Jismoniy tarbiya','Tarbiya'];
const TMIN=10,TMAX=50,TMARKS=[10,20,30,40,50];
const box=()=>$('qz');
const hap=k=>{try{tg&&tg.HapticFeedback&&(k==='ok'||k==='err'?tg.HapticFeedback.notificationOccurred(k==='ok'?'success':'error'):tg.HapticFeedback.impactOccurred('light'))}catch(e){}};
const linkOf=c=>'https://t.me/'+(qs.get('bot')||'tadrisai_bot')+'?start=q_'+c;
const mmss=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
let timer=0; const stopT=()=>{if(timer){clearInterval(timer);timer=0}};
function view(h){stopT(); box().innerHTML=h; show('qz'); window.scrollTo(0,0)}

/* ---------- Yaratish: Test (krossvord — alohida bo'lim, pastda) ---------- */
const pr=(a,b)=>' aria-pressed="'+(a===b)+'"';
const langs=()=>`<div class="group">Til</div><div class="qz-langs">${Object.entries(LNAME).map(([k,v])=>`<button type="button"${pr(S.qlang,k)} onclick="QZ.set('qlang','${k}')">${v}</button>`).join('')}</div>`;
const levels=()=>`<div class="group">Qiyinlik</div><div class="qz-seg">${Object.entries(LVL).map(([k,v])=>`<button type="button"${pr(S.level,k)} onclick="QZ.set('level','${k}')">${v}</button>`).join('')}</div>`;
function selBox(id,label,list,val,ph){
  const other=val&&!list.includes(val);
  return `<div><div class="group" style="margin-top:14px">${label}</div>
  <select class="qz-in" id="${id}" onchange="QZ.pickSel('${id}',this.value)"><option value="">${ph}</option>${list.map(x=>`<option${x===val?' selected':''}>${esc(x)}</option>`).join('')}<option value="__o"${other?' selected':''}>Boshqa…</option></select>
  <input class="qz-in" id="${id}O" style="margin-top:8px;display:${other?'block':'none'}" maxlength="40" placeholder="O'zingiz yozing" value="${other?esc(val):''}" oninput="QZ.setQ('${id==='qzGrade'?'grade':'subject'}',this.value)"></div>`;
}
function open(){
  S.kind='test'; if(!QT[S.qtype]) S.qtype='mc';
  view(`<button class="back" onclick="show('home')">← Orqaga</button>
  <div class="qz-head"><h1>Test quiz</h1><span class="qz-tag">SINOV</span></div>
  <div class="group" style="margin-top:0">Mavzu</div>
  <textarea class="qz-ta" id="qzTopic" placeholder="Masalan: Fotosintez">${esc(S.topic||'')}</textarea>
  <div class="qz-src" id="qzSrc">${srcBox()}</div>
  <div class="group">Savollar soni</div>
  <div class="rng" style="margin-top:62px"><div class="rng-track"><div class="rng-fill" id="qzFill"></div></div><div id="qzTicks"></div>
    <input type="range" id="qzRng" min="${TMIN}" max="${TMAX}" step="1" value="${S.n}" aria-label="Savollar soni" oninput="QZ.setN(this.value)"><div class="rng-bub" id="qzBub"></div></div>
  <div class="rng-price" id="qzNPrice"></div>
  ${levels()}
  <div class="group">Savol turi</div>
  <div class="qz-types">${Object.entries(QT).map(([k,v])=>`<button type="button"${pr(S.qtype,k)} onclick="QZ.set('qtype','${k}')"><b>${v[0]}</b><span>${v[1]}</span><em class="qz-ex" role="button" onclick="event.stopPropagation();QZ.example('${k}')">Misol ›</em></button>`).join('')}</div>
  <div class="qz-2c">${selBox('qzGrade','Sinf / kurs',GRADES,S.grade,'Tanlang (ixtiyoriy)')}${selBox('qzSubj','Fan',SUBJ,S.subject,'Tanlang (ixtiyoriy)')}</div>
  ${langs()}
  <div class="group">Kim uchun?</div>
  <div class="seg2"><button type="button"${pr(S.aud,'self')} onclick="QZ.set('aud','self')"><span class="e">🙋</span><b>O'zim uchun</b><span>mashq: javob va izoh darhol, qayta yechsa bo'ladi</span></button>
  <button type="button"${pr(S.aud,'class')} onclick="QZ.set('aud','class')"><span class="e">👩‍🏫</span><b>Sinf uchun</b><span>imtihon: bir marta, javobni o'zgartirib bo'lmaydi</span></button></div>
  <div class="qz-card qz-get"><b style="font-size:14px">Siz olasiz</b>
    <div><i>✓</i>Havola — o'quvchilar ilovada yechadi, darhol javob va izoh ko'radi</div>
    <div><i>✓</i>Natijalar: kim qancha to'pladi, eng ko'p xato qilingan savol</div></div>
  <button type="button" class="cta" id="qzGo" onclick="QZ.create()">Test yaratish · sinov (bepul)</button>
  <div class="qz-hint">Taxminan ${S.n<=20?'20–40':S.n<=35?'40–70':'60–100'} soniyada tayyor bo'ladi</div>
  <div class="group">Mening testlarim</div><div class="qz-list" id="qzMine"><div class="qz-hint">Yuklanmoqda…</div></div>`);
  $('qzTopic').addEventListener('input',e=>S.topic=e.target.value);
  setN(S.n,1); mine('test');
}
function setN(v,silent){
  S.n=Math.max(TMIN,Math.min(TMAX,parseInt(v)||20));
  const p=v=>(v-TMIN)/(TMAX-TMIN)*100;
  $('qzRng').value=S.n; $('qzFill').style.width=p(S.n)+'%'; $('qzBub').style.left=p(S.n)+'%'; $('qzBub').textContent=S.n+' ta savol';
  $('qzTicks').innerHTML=TMARKS.map(m=>`<div class="rng-tick ${m<=S.n?'on':''} ${m===S.n?'cur':''}" style="left:${p(m)}%"><b>${m}</b><i></i><span></span></div>`).join('');
  $('qzNPrice').innerHTML=`${S.n} ta savol · <b style="font-size:14px">narx keyin qo'yiladi</b>`;
  if(!silent) hap();
}
function srcBox(){
  if(S.src) return `<div class="qz-srcf"><span class="ic">${S.src.kind==='img'?'🖼':'📄'}</span><span class="tx"><b>${esc(S.src.name)}</b><small>${S.src.kind==='img'?'Rasm — savollar shu rasmdagi matndan tuziladi':(S.src.chars||0).toLocaleString('ru')+' belgi'+(S.src.cut?' (boshidagi 30 000 tasi olinadi)':'')+' — savollar shu matndan tuziladi'}</small></span><button type="button" onclick="QZ.srcDel()" aria-label="O'chirish">✕</button></div>`;
  return `<label class="qz-up"><input type="file" accept=".pdf,.docx,.txt,image/*" onchange="QZ.srcUp(this)" hidden>
    <span class="ic">📎</span><span class="tx"><b>Manba yuklash <i>(ixtiyoriy)</i></b><small>Darslik sahifasi, konspekt yoki rasm — savollar aynan shu matndan tuziladi · PDF, DOCX, JPG, PNG</small></span><span class="btn">Fayl</span></label>`;
}
async function srcUp(inp){
  const f=inp.files&&inp.files[0]; if(!f) return;
  if(f.size>8*1024*1024){toast('⚠️','Fayl 8 MB dan katta');return}
  $('qzSrc').innerHTML='<div class="qz-srcf"><span class="qz-spin" style="width:26px;height:26px;border-width:3px"></span><span class="tx"><b>Yuklanmoqda…</b><small>'+esc(f.name)+'</small></span></div>';
  const b64=await new Promise((ok,no)=>{const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=no; r.readAsDataURL(f)}).catch(()=>null);
  let d={}; try{d=b64?await api('/quiz/source',{name:f.name,mime:f.type,data:b64},90000):{}}catch(e){}
  if(!d.ok){S.src=null; $('qzSrc').innerHTML=srcBox();
    toast('⚠️',{notext:"Faylda matn topilmadi — skaner bo'lsa, rasm qilib yuklang",type:'Bu turdagi fayl qabul qilinmaydi',big:'Fayl juda katta'}[d.error]||"Faylni o'qib bo'lmadi");return}
  S.src={src:d.src,name:d.name,kind:d.kind,chars:d.chars,cut:d.cut}; $('qzSrc').innerHTML=srcBox(); hap('ok');
}
function srcDel(){S.src=null; $('qzSrc').innerHTML=srcBox()}
function pickSel(id,v){
  const o=$(id+'O'); o.style.display=v==='__o'?'block':'none';
  const k=id==='qzGrade'?'grade':'subject'; S[k]=v==='__o'?(o.value||''):v; if(v==='__o') o.focus();
}
function setQ(k,v){S[k]=v}
function set(k,v){S.topic=($('qzTopic')||{}).value||S.topic; S[k]=v; hap(); (S.kind==='cross'?openCross:open)()}
async function mine(kind){
  let d={}; try{d=await api('/quiz/mine',{},15000)}catch(e){}
  const el=$('qzMine'); if(!el) return;
  const list=(d.list||[]).filter(r=>(r[1]==='cross')===(kind==='cross'));
  if(!d.ok||!list.length){el.innerHTML=`<div class="qz-hint">Hali ${kind==='cross'?'krossvord':'test'} yaratilmagan</div>`;return}
  el.innerHTML=list.map(r=>`<button type="button" class="qz-item" onclick="QZ.ready('${r[0]}')"><span class="ic">${r[1]==='cross'?'🧩':'📝'}</span><span class="tx"><b>${esc(r[2])}</b><small>${esc(r[3])} · ${r[4]} kishi yechdi</small></span><span>›</span></button>`).join('');
}
/* Savol turi misollari (2026-11-12, egasi): «Misol» bosilganda o'quvchi ko'radigan ko'rinish */
const EXQ={
  mc:()=>`<div class="qz-q"><small>1-SAVOL</small><h2>Fotosintez qaysi organoidda boradi?</h2></div>
    <div class="qz-opts">${['Mitoxondriya','Xloroplast','Yadro','Ribosoma'].map((o,j)=>`<div class="qz-opt ${j===1?'good':j===0?'bad':'dim'}"><span class="k">${'ABCD'[j]}</span><span>${o}</span><span class="lb">${j===1?"to'g'ri javob":j===0?'sizning javobingiz':''}</span></div>`).join('')}</div>
    <div class="qz-why"><b>Nima uchun?</b><p>Xloroplastda xlorofill bor — u yorug'likni yutadi.</p></div>`,
  tf:()=>`<div class="qz-q"><small>2-SAVOL · TO'G'RIMI?</small><h2>Fotosintez jarayonida kislorod ajralib chiqadi.</h2></div>
    <div class="qz-opts tf"><div class="qz-opt good"><span class="k">✓</span><span>To'g'ri</span><span class="lb">to'g'ri javob</span></div><div class="qz-opt dim"><span class="k">✕</span><span>Noto'g'ri</span><span class="lb"></span></div></div>
    <div class="qz-why"><b>Nima uchun?</b><p>Suv parchalanganda kislorod hosil bo'ladi va havoga chiqadi.</p></div>`,
  open:()=>`<div class="qz-q"><small>3-SAVOL · JAVOBNI YOZING</small><h2>Barglarga yashil rang beruvchi pigment nima deb ataladi?</h2></div>
    <div class="qz-in" style="border-color:#10B981">xlorafill</div>
    <div class="qz-why" style="background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4)"><b style="color:#10B981">✓ To'g'ri!</b><p>Kichik imlo xatosi bo'lsa ham qabul qilinadi. Xlorofill yorug'likni yutadi.</p></div>`,
};
EXQ.mix=()=>`<div class="qz-hint" style="text-align:left;margin:0 0 10px">Bitta testda uch xil savol aralash keladi: yarmi variantli, choragi to'g'ri/noto'g'ri, choragi ochiq.</div>
  <div class="qz-mini">${EXQ.mc()}</div><div class="qz-mini">${EXQ.tf()}</div><div class="qz-mini">${EXQ.open()}</div>`;
const PAPER={
  mc:{q:'Fotosintez qaysi organoidda boradi?',o:['Mitoxondriya','Xloroplast','Yadro','Ribosoma'],a:'B',why:'Xloroplastda xlorofill bor — u yorug\'likni yutadi.'},
  tf:{q:'Fotosintez jarayonida kislorod ajralib chiqadi.',a:'T',why:'Suv parchalanganda kislorod hosil bo\'ladi.'},
  open:{q:'Barglarga yashil rang beruvchi pigment nima deb ataladi?',a:'✎',why:'Xlorofill yorug\'likni yutadi.'},
  mix:{}};
function paperMix(key){                      // aralash test varaqasi: uch tur bitta varaqda
  const head=`<div class="pp-t">Fotosintez</div><div class="pp-s">Biologiya · 7-sinf · ${key?'Javoblar kaliti — o\'qituvchi uchun':'20 ta savol'}</div>`, f='<div class="pp-f">TadrisAI · t.me/tadrisai_bot</div>';
  if(key) return `<div class="pp">${head}<div class="pp-h">Tez tekshirish</div>
    <div class="pp-grid">${['B','T','✎','D','N','A','✎','C','T','B'].map((v,i)=>`<div><i>${i+1}</i><b>${v}</b></div>`).join('')}</div>
    <div class="pp-h">Izohlar</div>
    <div class="pp-q"><span>1.</span> ${PAPER.mc.q}</div><div class="pp-a">To'g'ri javob: <b>B) Xloroplast</b></div>
    <div class="pp-q"><span>2.</span> ${PAPER.tf.q}</div><div class="pp-a">To'g'ri javob: <b>T) To'g'ri</b></div>
    <div class="pp-q"><span>3.</span> ${PAPER.open.q}</div><div class="pp-a">To'g'ri javob: <b>xlorofill</b></div>${f}</div>`;
  return `<div class="pp">${head}<div class="pp-l"><span>Ism, familiya: __________</span><span>Sinf: ____</span><span>Sana: _____</span></div>
    <div class="pp-n">Har bir savolda bitta to'g'ri javobni belgilang. To'g'ri bo'lsa «T», noto'g'ri bo'lsa «N». Ochiq savolga qisqa javob yozing.</div>
    <div class="pp-q"><span>1.</span> ${PAPER.mc.q}</div><div class="pp-o g">${PAPER.mc.o.map((o,j)=>`<span><b>${'ABCD'[j]})</b> ${o}</span>`).join('')}</div>
    <div class="pp-q"><span>2.</span> ${PAPER.tf.q}</div><div class="pp-o"><span>○ T — To'g'ri</span><span>○ N — Noto'g'ri</span></div>
    <div class="pp-q"><span>3.</span> ${PAPER.open.q}</div><div class="pp-o"><span>Javob: ________________________</span></div>
    <div class="pp-h">Javoblar varaqasi</div><div class="pp-grid">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<div><i>${n}</i><b></b></div>`).join('')}</div>
    <div class="pp-sc">Ball: ____ / 20</div>${f}</div>`;
}
function paperView(k,key){
  if(k==='mix') return paperMix(key);
  const x=PAPER[k], nm=k==='open'?'Har bir savolga qisqa javob yozing.':k==='tf'?'To\'g\'ri bo\'lsa «T», noto\'g\'ri bo\'lsa «N» ni belgilang.':'Har bir savolda bitta to\'g\'ri javobni belgilang.';
  const head=`<div class="pp-t">Fotosintez</div><div class="pp-s">Biologiya · 7-sinf · ${key?'Javoblar kaliti — o\'qituvchi uchun':'20 ta savol'}</div>`;
  if(key) return `<div class="pp">${head}<div class="pp-h">Tez tekshirish</div>
    <div class="pp-grid">${[1,2,3,4,5,6,7,8,9,10].map((n,i)=>`<div><i>${n}</i><b>${i===0?x.a:(k==='tf'?'TN'[(i*3)%2]:'ABCD'[(i*7)%4])}</b></div>`).join('')}</div>
    <div class="pp-h">Izohlar</div><div class="pp-q"><span>1.</span> ${x.q}</div><div class="pp-a">To'g'ri javob: <b>${k==='tf'?'T) To\'g\'ri':k==='open'?'xlorofill':'B) Xloroplast'}</b></div><div class="pp-e">${x.why}</div>
    <div class="pp-f">TadrisAI · t.me/tadrisai_bot</div></div>`;
  return `<div class="pp">${head}<div class="pp-l"><span>Ism, familiya: __________</span><span>Sinf: ____</span><span>Sana: _____</span></div>
    <div class="pp-n">${nm}</div><div class="pp-q"><span>1.</span> ${x.q}</div>
    ${k==='open'?`<div class="pp-o"><span>Javob: ________________________</span></div>`:k==='tf'?`<div class="pp-o"><span>○ T — To'g'ri</span><span>○ N — Noto'g'ri</span></div>`:`<div class="pp-o g">${x.o.map((o,j)=>`<span><b>${'ABCD'[j]})</b> ${o}</span>`).join('')}</div>`}
    <div class="pp-q"><span>2.</span> …</div>
    <div class="pp-h">Javoblar varaqasi</div><div class="pp-grid">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<div><i>${n}</i><b></b></div>`).join('')}</div>
    <div class="pp-sc">Ball: ____ / 20</div><div class="pp-f">TadrisAI · t.me/tadrisai_bot</div></div>`;
}
function exTab(k,tab){
  document.querySelectorAll('#qzExOv .qz-extabs button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===tab));
  $('qzExBody').innerHTML=tab==='tg'?EXQ[k]():paperView(k,tab==='key');
  $('qzExNote').textContent={tg:'O\'quvchi havolani bosib, Telegram ichida yechadi — javob darhol tekshiriladi.',paper:'«Qog\'ozga chiqarish» bosilsa, shu varaqa PDF holida botga keladi — chop etib tarqatasiz.',key:'O\'qituvchi uchun alohida fayl: to\'g\'ri javoblar jadvali va izohlar. O\'quvchilarga berilmaydi.'}[tab];
}
function example(k){
  hap();
  let ov=$('qzExOv');
  if(!ov){ov=document.createElement('div'); ov.id='qzExOv'; ov.className='qz-exov'; document.body.appendChild(ov);
    ov.addEventListener('click',e=>{if(e.target===ov) ov.remove()})}
  ov.innerHTML=`<div class="qz-exbox" role="dialog" aria-label="Misol"><div class="qz-exhead"><b>Misol: ${QT[k][0]}</b><button type="button" onclick="document.getElementById('qzExOv').remove()" aria-label="Yopish">✕</button></div>
    ${PAPER[k]?`<div class="qz-extabs"><button type="button" data-t="tg" aria-pressed="true" onclick="QZ.exTab('${k}','tg')">📱 Telegramda</button><button type="button" data-t="paper" aria-pressed="false" onclick="QZ.exTab('${k}','paper')">🖨 Qog'ozda</button><button type="button" data-t="key" aria-pressed="false" onclick="QZ.exTab('${k}','key')">🔑 Javoblar kaliti</button></div>`:''}
    <div class="qz-hint" id="qzExNote" style="text-align:left;margin:0 0 10px">O'quvchi havolani bosib, Telegram ichida yechadi — javob darhol tekshiriladi.</div>
    <div class="qz-exbody" id="qzExBody">${EXQ[k]()}</div>
    <button type="button" class="cta" style="margin-top:14px" onclick="document.getElementById('qzExOv').remove();QZ.set('qtype','${k}')">Shuni tanlash</button></div>`;
}

/* Krossvord — alohida bo'lim (2026-11-12, egasi) */
function openCross(){
  S.kind='cross';
  view(`<button class="back" onclick="show('home')">← Orqaga</button>
  <div class="qz-head"><h1>Krossvord</h1><span class="qz-tag">SINOV</span></div>
  <div class="group" style="margin-top:0">Mavzu</div>
  <textarea class="qz-ta" id="qzTopic" placeholder="Masalan: Qon aylanish tizimi">${esc(S.topic||'')}</textarea>
  <div class="group">So'zlar soni</div>
  <div class="nchips" style="grid-template-columns:repeat(3,1fr)">${[8,12,16].map(n=>`<button type="button"${pr(S.cn,n)} onclick="QZ.set('cn',${n})">${n}</button>`).join('')}</div>
  ${levels()}${langs()}
  <div class="qz-card qz-get"><b style="font-size:14px">Siz olasiz</b>
    <div><i>✓</i>Ilovada yechiladigan krossvord havolasi — harf ochish va tekshirish bilan</div>
    <div><i>✓</i>Kim nechta so'z topgani va qancha vaqt ketgani</div></div>
  <button type="button" class="cta" id="qzGo" onclick="QZ.create()">Krossvord yaratish · sinov (bepul)</button>
  <div class="qz-hint">Taxminan 15–40 soniyada tayyor bo'ladi</div>
  <div class="group">Mening krossvordlarim</div><div class="qz-list" id="qzMine"><div class="qz-hint">Yuklanmoqda…</div></div>`);
  $('qzTopic').addEventListener('input',e=>S.topic=e.target.value);
  mine('cross');
}
async function create(){
  const topic=($('qzTopic').value||'').trim(), cross=S.kind==='cross';
  if(topic.length<3){toast('✏️','Mavzuni yozing');$('qzTopic').focus();return}
  S.topic=topic; hap();
  const t0=Date.now();
  view(`<div class="qz-load"><div class="qz-spin"></div><b style="font-size:17px">AI ${cross?'krossvord':'test'} tuzmoqda…</b>
    <div style="color:var(--muted);font-size:14px">«${esc(topic)}»${!cross&&S.src?'<br>📎 '+esc(S.src.name):''}<br><span id="qzSec">0</span> s</div></div>`);
  timer=setInterval(()=>{const e=$('qzSec'); if(e) e.textContent=Math.round((Date.now()-t0)/1000)},1000);
  const body=cross?{kind:'cross',topic,n:S.cn,level:S.level,qlang:S.qlang}
    :{kind:'test',topic,n:S.n,level:S.level,aud:S.aud,qlang:S.qlang,qtype:S.qtype,grade:S.grade,subject:S.subject,src:S.src&&S.src.src};
  let d={}; try{d=await api('/quiz/create',body,240000)}catch(e){d={error:'net'}}
  stopT();
  if(!d.ok){toast('⚠️',d.error==='admin'?'Hozircha faqat admin uchun':"Tuzib bo'lmadi, qayta urinib ko'ring");(cross?openCross:open)();return}
  hap('ok'); S.src=null; ready(d.code);
}

/* ---------- Tayyor (muallif) ---------- */
async function load(code){
  let d={}; try{d=await api('/quiz/get',{code},20000)}catch(e){}
  if(!d.ok){toast('⚠️',d.error==='notfound'?'Test topilmadi':"Yuklab bo'lmadi");return null}
  S.quiz=d.quiz; S.code=code; return d.quiz;
}
async function ready(code){
  const q=await load(code); if(!q) return open();
  const n=q.kind==='cross'?q.data.words.length:q.data.questions.length, link=linkOf(code);
  const m=(q.data.meta||{});
  view(`<button class="back" onclick="${q.kind==='cross'?'QZ.openCross()':'QZ.open()'}">← Orqaga</button>
  <div class="qz-ok">✓</div>
  <div class="qz-title">${esc(q.data.title||q.topic)}</div>
  <div class="qz-chips"><span>${n} ${q.kind==='cross'?"so'z":'savol'}</span><span>${LVL[q.level]||''}</span><span>${LNAME[q.lang]||''}</span>${q.kind==='test'?`<span>${q.aud==='class'?'Sinf uchun':"O'zim uchun"}</span>`:''}${m.qtype?`<span>${QTN[m.qtype]||''}</span>`:''}${m.grade?`<span>${esc(m.grade)}</span>`:''}${m.subject?`<span>${esc(m.subject)}</span>`:''}${m.src?`<span>📎 ${esc(m.src)}</span>`:''}</div>
  <div class="group" style="margin-top:0">${q.kind==='cross'?'Krossvord':'Test'} havolasi</div>
  <div class="qz-link"><span>${esc(link.replace('https://',''))}</span><button type="button" onclick="QZ.copy()">Nusxa</button></div>
  <div class="qz-hint" style="text-align:left">Havolani bosgan har kim TadrisAI ilovasida yechadi. Natijalari sizga keladi.</div>
  <div class="qz-2"><button type="button" class="qz-btn pri" onclick="QZ.share()">📤 Ulashish</button><button type="button" class="qz-btn" onclick="QZ.start()">▶️ O'zim yechaman</button></div>
  <div class="qz-list" style="margin-top:14px">
    ${q.kind==='test'?`<button type="button" class="qz-item" onclick="QZ.questions()"><span class="ic">✏️</span><span class="tx"><b>Savollarni ko'rish va tahrirlash</b><small>keraksiz savolni o'chiring</small></span><span>›</span></button>`:''}
    <button type="button" class="qz-item" onclick="QZ.results()"><span class="ic">📊</span><span class="tx"><b>Natijalar</b><small>${q.done?q.done+' kishi yechdi':'hali hech kim yechmadi'}</small></span><span>›</span></button>
    ${q.kind==='test'?`<button type="button" class="qz-item" id="qzPrint" onclick="QZ.print()"><span class="ic">🖨</span><span class="tx"><b>Qog'ozga chiqarish (PDF)</b><small>o'quvchilar uchun varaqa + o'qituvchi uchun javoblar kaliti — botga keladi</small></span><span>›</span></button>`
      :`<div class="qz-item" style="opacity:.55"><span class="ic">🖨</span><span class="tx"><b>Qog'ozga chiqarish</b><small>krossvord uchun — keyingi bosqichda</small></span></div>`}
  </div>`);
}
function copy(){
  const l=linkOf(S.code);
  try{navigator.clipboard.writeText(l).then(()=>toast('📋','Havola nusxalandi'),()=>toast('📋',l))}catch(e){toast('📋',l)}
}
function share(){
  const q=S.quiz, l=linkOf(S.code);
  const txt=(q.kind==='cross'?'🧩 Krossvord: ':'📝 Test: ')+(q.data.title||q.topic)+' — yechib ko\'ring!';
  const u='https://t.me/share/url?url='+encodeURIComponent(l)+'&text='+encodeURIComponent(txt);
  try{tg&&tg.openTelegramLink?tg.openTelegramLink(u):window.open(u,'_blank')}catch(e){window.open(u,'_blank')}
}
function questions(){
  const q=S.quiz;
  view(`<button class="back" onclick="QZ.ready('${S.code}')">← Orqaga</button>
  <div class="qz-head"><h1 style="font-size:20px">Savollar (${q.data.questions.length})</h1></div>
  ${q.data.questions.map((x,i)=>`<div class="qz-qi"><small style="color:var(--muted);font-size:11.5px;font-weight:700">${(QTN[x.t||'mc']||'').toUpperCase()}</small><h3>${i+1}. ${esc(x.q)}</h3>${x.t==='open'?`<ol><li class="ok">${x.ans.map(esc).join(' / ')}</li></ol>`:`<ol type="A">${x.o.map((o,j)=>`<li class="${j===x.a?'ok':''}">${esc(o)}</li>`).join('')}</ol>`}
  <button type="button" class="del" onclick="QZ.del(${i},this)">🗑 O'chirish</button></div>`).join('')}`);
}
async function del(i,btn){
  if(!btn.dataset.sure){btn.dataset.sure=1;btn.textContent='Rostdan o\'chirilsinmi? Yana bosing';return}
  const d=await api('/quiz/edit',{code:S.code,del:i},15000).catch(()=>({}));
  if(!d.ok){toast('⚠️',"O'chirib bo'lmadi");return}
  await load(S.code); questions(); toast('🗑',"Savol o'chirildi");
}

async function print(){
  const b=$('qzPrint'); if(b.dataset.busy) return; b.dataset.busy=1; hap();
  b.querySelector('small').textContent='Tayyorlanmoqda… (10–20 soniya)';
  const d=await api('/quiz/print',{code:S.code},120000).catch(()=>({}));
  delete b.dataset.busy;
  b.querySelector('small').textContent=d.ok?'✅ 2 ta PDF bot chatiga yuborildi':"o'quvchilar uchun varaqa + o'qituvchi uchun javoblar kaliti — botga keladi";
  toast(d.ok?'🖨':'⚠️',d.ok?'Test varaqasi va javoblar kaliti botga yuborildi':"Tayyorlab bo'lmadi, qayta urinib ko'ring");
}

/* ---------- Taklif (havola orqali kelgan) ---------- */
async function join(code){
  view('<div class="qz-load"><div class="qz-spin"></div></div>');
  const q=await load(code); if(!q){show('home');return}
  const n=q.kind==='cross'?q.data.words.length:q.data.questions.length;
  const nm=userName||(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.first_name)||'';
  view(`<div style="text-align:center;margin:10px 0 18px"><div class="qz-tag" style="display:inline-block">TadrisAI</div></div>
  <div style="text-align:center;color:var(--muted);font-size:14px">Sizni ${q.kind==='cross'?'krossvordga':'testga'} taklif qilishdi</div>
  <div class="qz-title" style="margin:8px 0 18px">${esc(q.data.title||q.topic)}</div>
  <div class="qz-stats">${q.kind==='cross'?`<div><b>${n}</b><small>so'z</small></div><div><b>~${Math.max(3,Math.round(n*0.8))}</b><small>daqiqa</small></div><div><b>💡</b><small>yordam bor</small></div>`
    :`<div><b>${n}</b><small>savol</small></div><div><b>~${Math.max(2,Math.round(n*0.5))}</b><small>daqiqa</small></div><div><b>30 s</b><small>har savolga</small></div>`}</div>
  ${q.author?`<div class="qz-item" style="margin-bottom:14px"><span class="qz-av">${esc(q.author[0]||'?')}</span><span class="tx"><small>Test muallifi</small><b>${esc(q.author)}</b></span></div>`:''}
  ${q.exam?`<div class="qz-warn" style="margin-top:0"><b>📋 Sinf testi</b><p>Faqat bir marta yechiladi. Har savolga bitta javob berasiz — keyin o'zgartirib bo'lmaydi. Natija o'qituvchiga boradi.</p></div>`:''}
  ${q.prev?`<div class="qz-card" style="text-align:center"><b>Siz bu testni ${esc(q.prev.at)} da yechgansiz</b><div class="qz-title" style="margin-top:6px">${q.prev.score} / ${q.prev.total}</div><div class="qz-hint">Sinf testini qayta yechib bo'lmaydi</div></div>
  <button type="button" class="cta" onclick="show('home')">TadrisAI'ni ochish</button>`:`
  <div class="group" style="margin-top:4px">Ismingiz</div>
  <input class="qz-in" id="qzName" maxlength="40" value="${esc(nm)}" placeholder="Ism va familiya">
  <div class="qz-hint" style="text-align:left">Telegram'dagi ismingiz qo'yildi, o'zgartirsangiz bo'ladi</div>
  <button type="button" class="cta" onclick="QZ.start(1)">Boshlash</button>
  <div class="qz-hint">Bepul · ro'yxatdan o'tish shart emas</div>`}`);
}

/* ---------- Test yechish ---------- */
let P=null;
function start(fromJoin){
  const q=S.quiz; if(!q) return;
  const name=fromJoin&&$('qzName')?($('qzName').value||'').trim():(userName||'');
  if(q.kind==='cross') return crossStart(name);
  const all=q.data.questions.map((x,i)=>i);
  if(q.prev) return;
  P={name,order:all,i:0,score:0,wrong:[],streak:0,best:0,t0:Date.now(),retry:false,exam:!!q.exam,ans:[]};
  ask();
}
const OPEN_T=45;
function ask(){
  const q=S.quiz, k=P.order[P.i], x=q.data.questions[k], tot=P.order.length, T=x.t==='open'?OPEN_T:30;
  let body;
  if(x.t==='open') body=`<input class="qz-in" id="qzAns" maxlength="80" autocomplete="off" placeholder="Javobni yozing" onkeydown="if(event.key==='Enter')QZ.answer()">
    <div class="qz-2"><button type="button" class="qz-btn" onclick="QZ.answer(1)">Bilmayman</button><button type="button" class="qz-btn pri" onclick="QZ.answer()">Javob berish</button></div>`;
  else body=`<div class="qz-opts${x.t==='tf'?' tf':''}">${x.o.map((o,j)=>`<button type="button" class="qz-opt" data-j="${j}" onclick="QZ.pick(${j})"><span class="k">${x.t==='tf'?(j?'✕':'✓'):'ABCD'[j]}</span><span>${esc(o)}</span><span class="lb"></span></button>`).join('')}</div>`;
  view(`<div class="qz-top"><button type="button" class="qz-x" onclick="QZ.quit()" aria-label="Yopish">✕</button>
    <div class="qz-prog"><b>${P.i+1} / ${tot}</b><small>${P.exam?'📋 Sinf testi':P.streak>=2?'🔥 '+P.streak+' tasi ketma-ket to\'g\'ri':(P.retry?'Xatolar ustida ishlash':'&nbsp;')}</small><div class="qz-bar"><i style="width:${P.i/tot*100}%"></i></div></div>
    <div class="qz-tm" id="qzTm"><span id="qzTs">${T}</span></div></div>
  <div class="qz-q"><small>${k+1}-SAVOL${x.t==='tf'?' · TO\'G\'RIMI?':x.t==='open'?' · JAVOBNI YOZING':''}</small><h2>${esc(x.q)}</h2></div>
  ${body}
  <div id="qzAfter"><div class="qz-note">${P.exam?(x.t==='open'?'Javobni yozing — keyin o\'zgartirib bo\'lmaydi':'Javobni tanlang — keyin o\'zgartirib bo\'lmaydi'):x.t==='open'?'Qisqa javob yozing — imlo xatosi kichik bo\'lsa ham qabul qilinadi':'Javobni tanlang — darhol to\'g\'ri yoki xatoligini ko\'rasiz'}</div></div>`);
  if(x.t==='open') setTimeout(()=>{const i=$('qzAns'); i&&i.focus()},150);
  let left=T; const tm=$('qzTm');
  timer=setInterval(()=>{left--; const s=$('qzTs'); if(!s){stopT();return}
    s.textContent=left; tm.style.setProperty('--p',(left/T*100)+'%'); tm.classList.toggle('low',left<=10);
    if(left<=0){stopT(); x.t==='open'?answer(2):pick(-1)}},1000);
}
const nrm=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[ʻʼ’‘`']/g,"'").replace(/[^\p{L}\p{N}' ]/gu,' ').replace(/\s+/g,' ').trim();
function lev(a,b){const m=a.length,n=b.length; if(Math.abs(m-n)>2) return 9; let p=[...Array(n+1).keys()];
  for(let i=1;i<=m;i++){const c=[i]; for(let j=1;j<=n;j++) c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1)); p=c} return p[n]}
function okOpen(v,ans){const a=nrm(v); if(!a) return false;
  return ans.some(x=>{const b=nrm(x); if(!b) return false; if(a===b) return true; const d=lev(a,b); return (b.length>=5&&d<=1)||(b.length>=9&&d<=2)})}
function answer(skip){
  if(P.locked===P.i) return; P.locked=P.i; stopT();
  if(P.exam){                                  // sinf testi: javob yoziladi, to'g'riligi ko'rsatilmaydi (server baholaydi)
    const k=P.order[P.i], inp=$('qzAns'); P.ans[k]=skip?'':(inp?inp.value.trim():''); hap();
    if(inp) inp.disabled=true; document.querySelectorAll('#qz .qz-2 .qz-btn').forEach(b=>b.disabled=true);
    const last=P.i+1>=P.order.length;
    if(last){$('qzAfter').innerHTML=`<div class="qz-note">${skip===2?'⏱ Vaqt tugadi. ':''}Bu oxirgi savol edi</div><button type="button" class="cta" onclick="QZ.finish()">Yakunlash</button>`; return}
    $('qzAfter').innerHTML=`<div class="qz-note">${skip===2?'⏱ Vaqt tugadi — keyingi savol':'✓ Javob qabul qilindi'}</div>`;
    setTimeout(next, skip===2?900:550); return;
  }
  const q=S.quiz, k=P.order[P.i], x=q.data.questions[k], inp=$('qzAns'), v=inp?inp.value:'';
  const ok=!skip&&okOpen(v,x.ans);
  if(inp){inp.disabled=true; inp.style.borderColor=ok?'#10B981':'#EF4444'}
  document.querySelectorAll('#qz .qz-2 .qz-btn').forEach(b=>b.disabled=true);
  if(ok){P.score++;P.streak++;P.best=Math.max(P.best,P.streak);hap('ok')}
  else{if(!P.wrong.includes(k)) P.wrong.push(k); P.streak=0; hap('err')}
  const last=P.i+1>=P.order.length;
  $('qzAfter').innerHTML=`<div class="qz-why" style="${ok?'background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4)':''}"><b style="${ok?'color:#10B981':''}">${ok?'✓ To\'g\'ri!':skip===2?'⏱ Vaqt tugadi. To\'g\'ri javob: ':skip?'To\'g\'ri javob: ':'✕ Xato. To\'g\'ri javob: '}${ok?'':esc(x.ans[0])}</b>${x.e?`<p>${esc(x.e)}</p>`:''}</div>
    <button type="button" class="cta" onclick="QZ.next()">${last?'Natijani ko\'rish':'Keyingi savol'}</button>`;
}
function pick(j){
  if(P.locked===P.i) return; P.locked=P.i; stopT();
  if(P.exam){                                  // sinf testi: tanlov qotadi, to'g'ri-xatoligi ko'rsatilmaydi, keyingisiga o'tiladi
    const k=P.order[P.i]; P.ans[k]=j; hap();
    document.querySelectorAll('.qz-opt').forEach(b=>{const n=+b.dataset.j; b.disabled=true; b.classList.add(n===j?'sel':'dim')});
    const last=P.i+1>=P.order.length;
    if(last){$('qzAfter').innerHTML=`<div class="qz-note">${j<0?'⏱ Vaqt tugadi. ':''}Bu oxirgi savol edi</div><button type="button" class="cta" onclick="QZ.finish()">Yakunlash</button>`; return}
    $('qzAfter').innerHTML=`<div class="qz-note">${j<0?'⏱ Vaqt tugadi — keyingi savol':'✓ Javob qabul qilindi'}</div>`;
    setTimeout(next, j<0?900:550); return;
  }
  const q=S.quiz, k=P.order[P.i], x=q.data.questions[k], ok=j===x.a;
  document.querySelectorAll('.qz-opt').forEach(b=>{const n=+b.dataset.j; b.disabled=true;
    if(n===x.a){b.classList.add('good');b.querySelector('.lb').textContent="to'g'ri javob"}
    else if(n===j){b.classList.add('bad');b.querySelector('.lb').textContent='sizning javobingiz'}
    else b.classList.add('dim')});
  if(ok){P.score++;P.streak++;P.best=Math.max(P.best,P.streak);hap('ok')}
  else{if(!P.wrong.includes(k)) P.wrong.push(k); P.streak=0; hap('err')}
  const last=P.i+1>=P.order.length;
  $('qzAfter').innerHTML=`${x.e?`<div class="qz-why"><b>${j<0?'⏱ Vaqt tugadi. ':''}Nima uchun?</b><p>${esc(x.e)}</p></div>`:(j<0?'<div class="qz-note">⏱ Vaqt tugadi</div>':'')}
    <button type="button" class="cta" onclick="QZ.next()">${last?'Natijani ko\'rish':'Keyingi savol'}</button>`;
  setTimeout(()=>{const b=document.querySelector('#qzAfter .cta'); b&&b.scrollIntoView({behavior:'smooth',block:'nearest'})},60);
}
function next(){P.i++; if(P.i>=P.order.length) finish(); else ask()}
function quit(){
  if(P&&P.exam){askQuit(()=>finish(true),'Testni yakunlaysizmi? Javob berilmagan savollar xato hisoblanadi va qayta yechib bo\'lmaydi.');return}
  if(!P||!P.i){S.quiz&&S.quiz.mine?ready(S.code):show('home');return}
  askQuit(()=>finish(true));
}
function askQuit(cb,msg){                   // Telegram'ning o'z oynasi (brauzer confirm Telegram ichida bloklanishi mumkin)
  const m=msg||'Tugatasizmi? Natija hozirgi holatda saqlanadi.';
  try{if(tg&&tg.showConfirm&&tg.isVersionAtLeast&&tg.isVersionAtLeast('6.2')){tg.showConfirm(m,ok=>{if(ok)cb()});return}}catch(e){}
  cb();
}
async function finish(early){
  stopT();
  if(P.exam) return finishExam();
  const q=S.quiz, tot=P.retry?P.order.length:q.data.questions.length, secs=Math.round((Date.now()-P.t0)/1000);
  let rank=null;
  if(!P.retry){
    const d=await api('/quiz/submit',{code:S.code,name:P.name,score:P.score,total:tot,secs,wrong:P.wrong},15000).catch(()=>({}));
    if(d.ok) rank=[d.rank,d.of];
  }
  const pct=Math.round(P.score/tot*100);
  const msg=pct>=85?"Zo'r natija!":pct>=60?'Yaxshi natija!':pct>=40?'Yomon emas, yana mashq qiling':'Mavzuni yana bir takrorlang';
  view(`<div class="qz-ring" style="--p:${pct}%"><div><b>${pct}%</b><small>${P.score} / ${tot}</small></div></div>
  <div class="qz-title">${msg}</div>
  <div style="text-align:center;color:var(--muted);font-size:14px;margin-top:4px">${esc(q.data.title||q.topic)}</div>
  <div class="qz-stats"><div><b>${mmss(secs)}</b><small>vaqt</small></div><div><b>${P.best}</b><small>ketma-ket to'g'ri</small></div>
    <div><b>${rank?rank[0]+'-o\'rin':'—'}</b><small>${rank?rank[1]+' kishidan':(P.retry?'qayta yechish':'')}</small></div></div>
  ${P.wrong.length?`<button type="button" class="cta" onclick="QZ.retry()">${P.wrong.length} ta xatoni qayta yechish</button>`:''}
  <div class="qz-2"><button type="button" class="qz-btn" onclick="QZ.shareRes(${pct})">Natijani ulashish</button>
  <button type="button" class="qz-btn" onclick="${q.mine?`QZ.results()`:`show('home')`}">${q.mine?'Natijalar':'TadrisAI\'ni ochish'}</button></div>
  ${q.mine?'':`<div class="qz-card" style="margin-top:14px;text-align:center"><b>O'z testingizni yarating</b><div class="qz-hint">Mavzuni yozing — AI 30 soniyada test tuzadi (tez orada)</div></div>`}`);
}
async function finishExam(){
  const q=S.quiz, n=q.data.questions.length, secs=Math.round((Date.now()-P.t0)/1000);
  view('<div class="qz-load"><div class="qz-spin"></div><b>Natija hisoblanmoqda…</b></div>');
  const answers=[...Array(n)].map((_,i)=>P.ans[i]===undefined?(q.data.questions[i].t==='open'?'':-1):P.ans[i]);
  let d={}; for(let t=0;t<3&&!d.ok&&d.error!=='done';t++){d=await api('/quiz/submit',{code:S.code,name:P.name,secs,answers},20000).catch(()=>({}))}
  if(d.error==='done'){toast('ℹ️','Siz bu testni oldin yechgansiz');return join(S.code)}
  if(!d.ok){view(`<div class="qz-load"><b>Natija yuborilmadi</b><div class="qz-hint">Internetni tekshirib, qayta urinib ko'ring</div><button type="button" class="cta" onclick="QZ.finish()">Qayta yuborish</button></div>`);return}
  const pct=Math.round(d.score/d.total*100);
  view(`<div class="qz-ring" style="--p:${pct}%"><div><b>${pct}%</b><small>${d.score} / ${d.total}</small></div></div>
  <div class="qz-title">Test yakunlandi</div>
  <div style="text-align:center;color:var(--muted);font-size:14px;margin-top:4px">${esc(q.data.title||q.topic)}</div>
  <div class="qz-stats"><div><b>${mmss(secs)}</b><small>vaqt</small></div><div><b>${d.score}</b><small>to'g'ri javob</small></div><div><b>${d.rank}-o'rin</b><small>${d.of} kishidan</small></div></div>
  <div class="qz-card" style="text-align:center"><b>✅ Natijangiz o'qituvchiga yuborildi</b><div class="qz-hint">To'g'ri javoblarni o'qituvchingiz e'lon qiladi</div></div>
  <button type="button" class="cta" onclick="show('home')">TadrisAI'ni ochish</button>`);
}
function retry(){
  const w=P.wrong.slice(); P={name:P.name,order:w,i:0,score:0,wrong:[],streak:0,best:0,t0:Date.now(),retry:true}; ask();
}
function shareRes(pct){
  const q=S.quiz, l=linkOf(S.code);
  const u='https://t.me/share/url?url='+encodeURIComponent(l)+'&text='+encodeURIComponent('Men «'+(q.data.title||q.topic)+'» testidan '+pct+'% to\'pladim! Siz ham sinab ko\'ring 👇');
  try{tg&&tg.openTelegramLink?tg.openTelegramLink(u):window.open(u,'_blank')}catch(e){}
}

/* ---------- Natijalar (muallif) ---------- */
async function results(){
  const q=S.quiz;
  view('<div class="qz-load"><div class="qz-spin"></div></div>');
  const d=await api('/quiz/results',{code:S.code},20000).catch(()=>({}));
  if(!d.ok){toast('⚠️',"Yuklab bo'lmadi");return ready(S.code)}
  const rows=d.rows||[], n=rows.length;
  const avg=n?Math.round(rows.reduce((a,r)=>a+(r[2]?r[1]/r[2]:0),0)/n*100):0;
  const avgT=n?Math.round(rows.reduce((a,r)=>a+r[3],0)/n):0;
  const top=(d.miss||[])[0];
  let warn='';
  if(top&&q.kind==='test'&&q.data.questions[top[0]]){
    warn=`<div class="qz-warn"><b>Eng ko'p xato: ${top[0]+1}-savol</b><p>«${esc(q.data.questions[top[0]].q)}» — ${n} kishidan ${top[1]} tasi xato qildi. Darsda qayta tushuntirish kerak.</p></div>`;
  }
  view(`<button class="back" onclick="QZ.ready('${S.code}')">← Orqaga</button>
  <div class="qz-head" style="flex-direction:column;align-items:flex-start;gap:2px"><h1 style="font-size:22px">Natijalar</h1><small style="color:var(--muted)">${esc(q.data.title||q.topic)}</small></div>
  <div class="qz-stats"><div><b>${n}</b><small>yechdi</small></div><div><b>${avg}%</b><small>o'rtacha</small></div><div><b>${mmss(avgT)}</b><small>o'rtacha vaqt</small></div></div>
  ${warn}
  <div class="group">${q.kind==='cross'?'Qatnashchilar':"O'quvchilar"}</div>
  <div class="qz-card" style="padding:0">${n?rows.map((r,i)=>`<div class="qz-row"><span style="width:18px;color:var(--muted);font-weight:700">${i+1}</span><span class="qz-av">${esc((r[0]||'?')[0])}</span>
    <span style="flex:1;min-width:0"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r[0])}</b><small style="color:var(--muted)">${mmss(r[3])} · ${esc(r[4])}</small></span>
    <b style="color:${r[2]&&r[1]/r[2]>=.75?'#10B981':'#F59E0B'}">${r[1]}/${r[2]}</b></div>`).join(''):'<div class="qz-hint" style="padding:16px">Hali hech kim yechmadi. Havolani ulashing.</div>'}</div>`);
}

/* ---------- Krossvord ---------- */
let C=null;
const norm=ch=>String(ch||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ı/g,'I').replace(/Ё/g,'Е').replace(/Й/g,'И').toUpperCase();
const showCh=ch=>(S.quiz&&S.quiz.lang==='uz')?(ch==='Ö'?'O‘':ch==='Ğ'?'G‘':ch):ch;
function crossStart(name){
  const g=S.quiz.data, cells={};
  g.words.forEach((w,wi)=>{for(let i=0;i<w.w.length;i++){const r=w.d==='a'?w.r:w.r+i, x=w.d==='a'?w.x+i:w.x, k=r+','+x;
    (cells[k]=cells[k]||{ch:w.w[i],v:'',ws:[],n:''}).ws.push(wi); if(i===0) cells[k].n=w.n}});
  C={name,cells,cur:0,pos:0,t0:Date.now(),hints:0,checked:false};
  crossView();
}
function wordCells(wi){const w=S.quiz.data.words[wi], a=[];for(let i=0;i<w.w.length;i++) a.push(w.d==='a'?w.r+','+(w.x+i):(w.r+i)+','+w.x);return a}
function found(wi){return wordCells(wi).every(k=>norm(C.cells[k].v)===norm(C.cells[k].ch))}
function crossView(){
  const g=S.quiz.data, W=Math.min(window.innerWidth,480)-58, sz=Math.max(20,Math.min(36,Math.floor((W-(g.w-1)*3)/g.w)));
  const cur=wordCells(C.cur), act=cur[C.pos], nf=g.words.filter((w,i)=>found(i)).length, w=g.words[C.cur];
  let h='';
  for(let r=0;r<g.h;r++) for(let x=0;x<g.w;x++){const k=r+','+x, c=C.cells[k];
    if(!c){h+=`<div style="width:${sz}px;height:${sz}px"></div>`;continue}
    const cls=['qz-cell','on']; if(cur.includes(k)) cls.push('word'); if(k===act) cls.push('cur');
    if(C.checked&&c.v&&norm(c.v)!==norm(c.ch)) cls.push('wrong');
    if(c.ws.every(found)) cls.push('done');
    h+=`<div class="${cls.join(' ')}" style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.5)}px" onclick="QZ.tap('${k}')">${c.n?`<em>${c.n}</em>`:''}${esc(showCh(c.v))}</div>`}
  view(`<div class="qz-top"><button type="button" class="qz-x" onclick="QZ.crossQuit()" aria-label="Yopish">✕</button>
    <div class="qz-prog"><b>${esc(g.title||S.quiz.topic)}</b><small>${nf} / ${g.words.length} so'z topildi · <span id="qzCt">${mmss(Math.round((Date.now()-C.t0)/1000))}</span></small></div></div>
  <div class="qz-gwrap"><div class="qz-grid" style="grid-template-columns:repeat(${g.w},${sz}px)">${h}</div></div>
  <div class="qz-clue"><small>${w.n} · ${w.d==='a'?'GORIZONTAL':'VERTIKAL'} · ${w.w.length} HARF</small><p>${esc(w.c)}</p></div>
  <div class="qz-2" style="margin-top:0"><button type="button" class="qz-btn" onclick="QZ.hint()">💡 Bitta harf ochish</button><button type="button" class="qz-btn pri" onclick="QZ.check()">Tekshirish</button></div>
  <div class="qz-card" style="padding:0;margin-top:12px;overflow:hidden">${g.words.map((x,i)=>`<button type="button" class="qz-cl${found(i)?' f':''}" onclick="QZ.sel(${i})"><b>${x.n} ${x.d==='a'?'→':'↓'}</b><span>${esc(x.c)} (${x.w.length})</span></button>`).join('')}</div>
  <input id="qzKey" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false">`);
  const key=$('qzKey');
  key.addEventListener('input',e=>{const v=(key.value||'').replace(/['’‘ʻ`\s]/g,''); key.value=''; if(v) type(v.slice(-1))});
  key.addEventListener('keydown',e=>{if(e.key==='Backspace'){e.preventDefault();back()}else if(e.key==='ArrowRight'||e.key==='ArrowDown'){move(1)}else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){move(-1)}});
  timer=setInterval(()=>{const e=$('qzCt'); if(e) e.textContent=mmss(Math.round((Date.now()-C.t0)/1000))},1000);
  if(C.focus){try{key.focus({preventScroll:true})}catch(e){key.focus()}}
}
function tap(k){
  const c=C.cells[k], cur=wordCells(C.cur);
  if(cur.includes(k)&&cur[C.pos]===k&&c.ws.length>1){C.cur=c.ws.find(w=>w!==C.cur)}       // ikkinchi bosish — yo'nalishni almashtirish
  else if(!cur.includes(k)) C.cur=c.ws[0];
  C.pos=wordCells(C.cur).indexOf(k); C.focus=true; hap(); crossView();
}
function sel(i){C.cur=i; const ws=wordCells(i); C.pos=Math.max(0,ws.findIndex(k=>!C.cells[k].v)); C.focus=true; crossView(); window.scrollTo(0,0)}
function type(ch){
  const ws=wordCells(C.cur); C.cells[ws[C.pos]].v=ch.toUpperCase(); C.checked=false;
  if(C.pos<ws.length-1) C.pos++;
  if(found(C.cur)){hap('ok'); const nx=S.quiz.data.words.findIndex((w,i)=>!found(i)); if(nx<0){crossDone();return} }
  C.focus=true; crossView();
}
function back(){const ws=wordCells(C.cur); if(!C.cells[ws[C.pos]].v&&C.pos>0) C.pos--; C.cells[ws[C.pos]].v=''; C.focus=true; crossView()}
function move(d){const ws=wordCells(C.cur); C.pos=Math.min(ws.length-1,Math.max(0,C.pos+d)); C.focus=true; crossView()}
function hint(){
  const ws=wordCells(C.cur), k=ws.find(k=>norm(C.cells[k].v)!==norm(C.cells[k].ch)); if(!k) return;
  C.cells[k].v=C.cells[k].ch; C.hints++; C.pos=ws.indexOf(k); hap();
  if(S.quiz.data.words.every((w,i)=>found(i))) return crossDone();
  C.focus=false; crossView();
}
function check(){C.checked=true; hap(); C.focus=false; crossView();
  const n=S.quiz.data.words.filter((w,i)=>found(i)).length; toast(n===S.quiz.data.words.length?'🎉':'🔎',n+' / '+S.quiz.data.words.length+" so'z to'g'ri");
  if(n===S.quiz.data.words.length) crossDone()}
function crossQuit(){
  if(!Object.values(C.cells).some(c=>c.v)){S.quiz.mine?ready(S.code):show('home');return}
  askQuit(crossDone);
}
async function crossDone(){
  stopT();
  const g=S.quiz.data, n=g.words.filter((w,i)=>found(i)).length, tot=g.words.length, secs=Math.round((Date.now()-C.t0)/1000);
  const wrong=g.words.map((w,i)=>found(i)?-1:i).filter(i=>i>=0);
  const d=await api('/quiz/submit',{code:S.code,name:C.name,score:n,total:tot,secs,wrong},15000).catch(()=>({}));
  const pct=Math.round(n/tot*100);
  view(`<div class="qz-ring" style="--p:${pct}%"><div><b>${n}/${tot}</b><small>so'z</small></div></div>
  <div class="qz-title">${n===tot?'Barcha so\'zlar topildi! 🎉':'Krossvord yakunlandi'}</div>
  <div class="qz-stats"><div><b>${mmss(secs)}</b><small>vaqt</small></div><div><b>${C.hints}</b><small>yordam</small></div><div><b>${d.ok?d.rank+'-o\'rin':'—'}</b><small>${d.ok?d.of+' kishidan':''}</small></div></div>
  <div class="group">Javoblar</div><div class="qz-card" style="padding:0">${g.words.map((w,i)=>`<div class="qz-row"><b style="width:38px;color:var(--chip-text)">${w.n} ${w.d==='a'?'→':'↓'}</b><span style="flex:1">${esc(w.w.split('').map(showCh).join(''))}</span><span>${found(i)?'✅':'❌'}</span></div>`).join('')}</div>
  <div class="qz-2"><button type="button" class="qz-btn" onclick="QZ.shareRes(${pct})">Ulashish</button><button type="button" class="qz-btn" onclick="${S.quiz.mine?'QZ.results()':`show('home')`}">${S.quiz.mine?'Natijalar':'TadrisAI\'ni ochish'}</button></div>`);
}

window.QZ={finish,example,exTab,print,open,openCross,setN,srcUp,srcDel,pickSel,setQ,answer,set,create,ready,copy,share,questions,del,join,start,pick,next,quit,retry,shareRes,results,tap,sel,hint,check,crossQuit};
if(qs.get('quiz')) join(qs.get('quiz'));
})();
