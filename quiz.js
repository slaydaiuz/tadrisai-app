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

/* ---------- Tarjimalar (2026-11-16, egasi: «hammaga o'z tilida ko'rinsin») — uz / ru / en / kaa, uzn uz'dan avtomatik ---------- */
const QD={
uz:{
  back:"← Orqaga", title:"Test quiz", trial:"SINOV", topic:"Mavzu", topicPh:"Masalan: Fotosintez", crossPh:"Masalan: Qon aylanish tizimi",
  nQ:"Savollar soni", level:"Qiyinlik", qtype:"Savol turi", example:"Misol ›", grade:"Sinf / kurs", subject:"Fan",
  pickOpt:"Tanlang (ixtiyoriy)", other:"Boshqa…", ownPh:"O'zingiz yozing", qlang:"Til", qlangT:"Test qaysi tilda bo'lsin?", qlangC:"Krossvord qaysi tilda bo'lsin?", forWhom:"Kim uchun?",
  self:"O'zim uchun", selfD:"mashq: javob va izoh darhol, qayta yechsa bo'ladi",
  cls:"Sinf uchun", clsD:"imtihon: bir marta, javobni o'zgartirib bo'lmaydi",
  youGet:"Siz olasiz", get1:"Havola — o'quvchilar ilovada yechadi, darhol javob va izoh ko'radi",
  get2:"Natijalar: kim qancha to'pladi, eng ko'p xato qilingan savol",
  createT:"Test yaratish", readyIn:"Taxminan {x} soniyada tayyor bo'ladi", myTests:"Mening testlarim", loading:"Yuklanmoqda…",
  nq:"{n} ta savol", free:"bepul", freeTrial:"bepul (sinov)",
  srcImg:"Rasm — savollar shu rasmdagi matndan tuziladi", chars:"{n} belgi", cut:" (boshidagi 30 000 tasi olinadi)",
  srcText:" — savollar shu matndan tuziladi", del:"O'chirish", upload:"Manba yuklash", optional:"(ixtiyoriy)",
  uploadD:"Darslik sahifasi, konspekt yoki rasm — savollar aynan shu matndan tuziladi · PDF, DOCX, JPG, PNG", file:"Fayl",
  big8:"Fayl 8 MB dan katta", noText:"Faylda matn topilmadi — skaner bo'lsa, rasm qilib yuklang",
  badType:"Bu turdagi fayl qabul qilinmaydi", tooBig:"Fayl juda katta", readErr:"Faylni o'qib bo'lmadi",
  noTests:"Hali test yaratilmagan", noCross:"Hali krossvord yaratilmagan", solvedN:"{n} kishi yechdi",
  qN:"{n}-SAVOL", tfQ:" · TO'G'RIMI?", openQ:" · JAVOBNI YOZING", right:"to'g'ri javob", yours:"sizning javobingiz", why:"Nima uchun?",
  ex1q:"Fotosintez qaysi organoidda boradi?", ex1o:["Mitoxondriya","Xloroplast","Yadro","Ribosoma"],
  ex1w:"Xloroplastda xlorofill bor — u yorug'likni yutadi.",
  ex2q:"Fotosintez jarayonida kislorod ajralib chiqadi.", tTrue:"To'g'ri", tFalse:"Noto'g'ri",
  ex2w:"Suv parchalanganda kislorod hosil bo'ladi va havoga chiqadi.",
  ex3q:"Barglarga yashil rang beruvchi pigment nima deb ataladi?", ex3typo:"xlorafill", ex3a:"xlorofill", okBang:"✓ To'g'ri!",
  ex3w:"Kichik imlo xatosi bo'lsa ham qabul qilinadi. Xlorofill yorug'likni yutadi.", ex3w2:"Xlorofill yorug'likni yutadi.",
  mixD:"Bitta testda uch xil savol aralash keladi: yarmi variantli, choragi to'g'ri/noto'g'ri, choragi ochiq.",
  ppTitle:"Fotosintez", ppSub:"Biologiya · 7-sinf", keyFor:"Javoblar kaliti — o'qituvchi uchun", quick:"Tez tekshirish",
  expl:"Izohlar", correctC:"To'g'ri javob:", tfL:["T","N"], ppName:"Ism, familiya", ppCls:"Sinf", ppDate:"Sana",
  mixRule:"Har bir savolda bitta to'g'ri javobni belgilang. To'g'ri bo'lsa «T», noto'g'ri bo'lsa «N». Ochiq savolga qisqa javob yozing.",
  ansLine:"Javob", sheet:"Javoblar varaqasi", score:"Ball", openRule:"Har bir savolga qisqa javob yozing.",
  tfRule:"To'g'ri bo'lsa «T», noto'g'ri bo'lsa «N» ni belgilang.", mcRule:"Har bir savolda bitta to'g'ri javobni belgilang.",
  noteTg:"O'quvchi havolani bosib, Telegram ichida yechadi — javob darhol tekshiriladi.",
  notePaper:"«Qog'ozga chiqarish» bosilsa, shu varaqa PDF holida botga keladi — chop etib tarqatasiz.",
  noteKey:"O'qituvchi uchun alohida fayl: to'g'ri javoblar jadvali va izohlar. O'quvchilarga berilmaydi.",
  exTitle:"Misol: {x}", close:"Yopish", tabTg:"📱 Telegramda", tabPaper:"🖨 Qog'ozda", tabKey:"🔑 Javoblar kaliti", pickThis:"Shuni tanlash",
  crossT:"Krossvord", nWords:"So'zlar soni", cget1:"Ilovada yechiladigan krossvord havolasi — harf ochish va tekshirish bilan",
  cget2:"Kim nechta so'z topgani va qancha vaqt ketgani", createC:"Krossvord yaratish", myCross:"Mening krossvordlarim",
  writeTopic:"Mavzuni yozing", aiTest:"AI test tuzmoqda…", aiCross:"AI krossvord tuzmoqda…", noBal:"Balans yetarli emas: {x} kerak",
  limit:"Sinov urinishlaringiz tugadi. Rahmat!", expired:"Sinov muddati tugagan",
  failRef:"Tuzib bo'lmadi — {x} balansga qaytarildi. Qayta urinib ko'ring", fail:"Tuzib bo'lmadi, qayta urinib ko'ring",
  paid:"Test tayyor · balansdan {x} yechildi", trialLeft:"Sinov: yana {n} ta urinish qoldi",
  notFound:"Test topilmadi", loadErr:"Yuklab bo'lmadi", nW:"{n} so'z", linkT:"Test havolasi", linkC:"Krossvord havolasi", copy:"Nusxa",
  linkHint:"Havolani bosgan har kim TadrisAI ilovasida yechadi. Natijalari sizga keladi.", share:"📤 Ulashish", selfSolve:"▶️ O'zim yechaman",
  editQ:"Savollarni ko'rish va tahrirlash", editQD:"keraksiz savolni o'chiring", results:"Natijalar", noOne:"hali hech kim yechmadi",
  printT:"Qog'ozga chiqarish (PDF)", printD:"o'quvchilar uchun varaqa + o'qituvchi uchun javoblar kaliti — botga keladi",
  printC:"Qog'ozga chiqarish", printCD:"krossvord uchun — keyingi bosqichda", copied:"Havola nusxalandi",
  shareT:"📝 Test: {t} — yechib ko'ring!", shareC:"🧩 Krossvord: {t} — yechib ko'ring!", qsTitle:"Savollar ({n})", delQ:"🗑 O'chirish",
  sure:"Rostdan o'chirilsinmi? Yana bosing", delErr:"O'chirib bo'lmadi", deleted:"Savol o'chirildi",
  preparing:"Tayyorlanmoqda… (10–20 soniya)", printed:"✅ 2 ta PDF bot chatiga yuborildi",
  printedT:"Test varaqasi va javoblar kaliti botga yuborildi", prepErr:"Tayyorlab bo'lmadi, qayta urinib ko'ring",
  invT:"Sizni testga taklif qilishdi", invC:"Sizni krossvordga taklif qilishdi", words:"so'z", minutes:"daqiqa", hintAv:"yordam bor",
  qs:"savol", perQ:"har savolga", author:"Test muallifi", examT:"📋 Sinf testi",
  examD:"Faqat bir marta yechiladi. Har savolga bitta javob berasiz — keyin o'zgartirib bo'lmaydi. Natija o'qituvchiga boradi.",
  prevSolved:"Siz bu testni {at} da yechgansiz", noRetake:"Sinf testini qayta yechib bo'lmaydi", openApp:"TadrisAI'ni ochish",
  yourName:"Ismingiz", namePh:"Ism va familiya", nameHint:"Telegram'dagi ismingiz qo'yildi, o'zgartirsangiz bo'ladi",
  start:"Boshlash", freeNoReg:"Bepul · ro'yxatdan o'tish shart emas",
  ansPh:"Javobni yozing", dunno:"Bilmayman", answer:"Javob berish", streak:"🔥 {n} tasi ketma-ket to'g'ri", retryMode:"Xatolar ustida ishlash",
  noteExamOpen:"Javobni yozing — keyin o'zgartirib bo'lmaydi", noteExamPick:"Javobni tanlang — keyin o'zgartirib bo'lmaydi",
  noteOpen:"Qisqa javob yozing — imlo xatosi kichik bo'lsa ham qabul qilinadi", notePick:"Javobni tanlang — darhol to'g'ri yoki xatoligini ko'rasiz",
  timeUp:"⏱ Vaqt tugadi. ", lastQ:"Bu oxirgi savol edi", finish:"Yakunlash", timeNext:"⏱ Vaqt tugadi — keyingi savol",
  accepted:"✓ Javob qabul qilindi", correctIs:"To'g'ri javob: ", wrongIs:"✕ Xato. To'g'ri javob: ", timeIs:"⏱ Vaqt tugadi. To'g'ri javob: ",
  seeRes:"Natijani ko'rish", nextQ:"Keyingi savol", timeOnly:"⏱ Vaqt tugadi",
  quitExam:"Testni yakunlaysizmi? Javob berilmagan savollar xato hisoblanadi va qayta yechib bo'lmaydi.",
  quitAsk:"Tugatasizmi? Natija hozirgi holatda saqlanadi.",
  great:"Zo'r natija!", good:"Yaxshi natija!", okRes:"Yomon emas, yana mashq qiling", badRes:"Mavzuni yana bir takrorlang",
  time:"vaqt", streakS:"ketma-ket to'g'ri", place:"{n}-o'rin", ofN:"{n} kishidan", retryS:"qayta yechish", retryN:"{n} ta xatoni qayta yechish",
  shareRes:"Natijani ulashish", ownT:"O'z testingizni yarating", ownD:"Mavzuni yozing — AI bir daqiqada test tuzadi",
  calc:"Natija hisoblanmoqda…", already:"Siz bu testni oldin yechgansiz", notSent:"Natija yuborilmadi",
  checkNet:"Internetni tekshirib, qayta urinib ko'ring", resend:"Qayta yuborish", done:"Test yakunlandi", correctN:"to'g'ri javob",
  sentT:"✅ Natijangiz o'qituvchiga yuborildi", teacherAnn:"To'g'ri javoblarni o'qituvchingiz e'lon qiladi",
  shareMsg:"Men «{t}» testidan {p}% to'pladim! Siz ham sinab ko'ring 👇",
  mostWrong:"Eng ko'p xato: {n}-savol", mostWrongD:"«{q}» — {n} kishidan {m} tasi xato qildi. Darsda qayta tushuntirish kerak.",
  solved:"yechdi", avg:"o'rtacha", avgT:"o'rtacha vaqt", partic:"Qatnashchilar", students:"O'quvchilar",
  nobody:"Hali hech kim yechmadi. Havolani ulashing.",
  foundW:"{n} / {m} so'z topildi", across:"GORIZONTAL", down:"VERTIKAL", letters:"{n} HARF", hint1:"💡 Bitta harf ochish",
  check:"Tekshirish", wordsOk:"{n} / {m} so'z to'g'ri", allFound:"Barcha so'zlar topildi! 🎉", crossDone:"Krossvord yakunlandi",
  hints:"yordam", answers:"Javoblar", shareS:"Ulashish", sec:"s",
  LNAME:{uz:"O'zbek",uzn:"Yangi lotin",kaa:"Qoraqalpoq",ru:"Rus",en:"Ingliz"},
  LVL:{easy:"Oson",mid:"O'rtacha",hard:"Qiyin"},
  QT:{mc:["Variantli","A B C D"],tf:["To'g'ri / Noto'g'ri","tasdiq — ha yoki yo'q"],open:["Ochiq savollar","javobni o'zi yozadi"],mix:["Aralash","uchala tur birga"]},
  QTN:{mc:"Variantli",tf:"To'g'ri / Noto'g'ri",open:"Ochiq",mix:"Aralash"},
  gradeF:["{n}-sinf","{n}-kurs"],
  SUBJ:["Matematika","Algebra","Geometriya","Fizika","Kimyo","Biologiya","Geografiya","Tarix","Ona tili","Adabiyot","O'zbek tili","Rus tili","Ingliz tili","Nemis tili","Informatika","Huquq","Iqtisodiyot","Boshlang'ich ta'lim","Texnologiya","Tasviriy san'at","Musiqa","Jismoniy tarbiya","Tarbiya"]
},
ru:{
  back:"← Назад", title:"Тест-квиз", trial:"ТЕСТ", topic:"Тема", topicPh:"Например: Фотосинтез", crossPh:"Например: Кровеносная система",
  nQ:"Количество вопросов", level:"Сложность", qtype:"Тип вопросов", example:"Пример ›", grade:"Класс / курс", subject:"Предмет",
  pickOpt:"Не выбрано", other:"Другое…", ownPh:"Напишите сами", qlang:"Язык", qlangT:"На каком языке сделать тест?", qlangC:"На каком языке сделать кроссворд?", forWhom:"Для кого?",
  self:"Для себя", selfD:"практика: ответ и пояснение сразу, можно пройти заново",
  cls:"Для класса", clsD:"экзамен: один раз, ответ нельзя изменить",
  youGet:"Вы получите", get1:"Ссылку — ученики решают в приложении и сразу видят ответ и пояснение",
  get2:"Результаты: кто сколько набрал и в каком вопросе больше всего ошибок",
  createT:"Создать тест", readyIn:"Будет готово примерно за {x} секунд", myTests:"Мои тесты", loading:"Загрузка…",
  nq:["{n} вопрос","{n} вопроса","{n} вопросов"], free:"бесплатно", freeTrial:"бесплатно (тест)",
  srcImg:"Изображение — вопросы составляются по тексту на нём", chars:["{n} символ","{n} символа","{n} символов"], cut:" (берутся первые 30 000)",
  srcText:" — вопросы составляются по этому тексту", del:"Удалить", upload:"Загрузить материал", optional:"(необязательно)",
  uploadD:"Страница учебника, конспект или фото — вопросы составляются именно по этому тексту · PDF, DOCX, JPG, PNG", file:"Файл",
  big8:"Файл больше 8 МБ", noText:"В файле не найден текст — если это скан, загрузите его как изображение",
  badType:"Этот тип файла не поддерживается", tooBig:"Файл слишком большой", readErr:"Не удалось прочитать файл",
  noTests:"Тестов пока нет", noCross:"Кроссвордов пока нет", solvedN:"решили: {n}",
  qN:"ВОПРОС {n}", tfQ:" · ВЕРНО?", openQ:" · НАПИШИТЕ ОТВЕТ", right:"правильный ответ", yours:"ваш ответ", why:"Почему?",
  ex1q:"В каком органоиде происходит фотосинтез?", ex1o:["Митохондрия","Хлоропласт","Ядро","Рибосома"],
  ex1w:"В хлоропласте есть хлорофилл — он поглощает свет.",
  ex2q:"В процессе фотосинтеза выделяется кислород.", tTrue:"Верно", tFalse:"Неверно",
  ex2w:"При расщеплении воды образуется кислород и выходит в воздух.",
  ex3q:"Как называется пигмент, придающий листьям зелёный цвет?", ex3typo:"хлорофил", ex3a:"хлорофилл", okBang:"✓ Верно!",
  ex3w:"Принимается даже с небольшой опечаткой. Хлорофилл поглощает свет.", ex3w2:"Хлорофилл поглощает свет.",
  mixD:"В одном тесте три типа вопросов вперемешку: половина с вариантами, четверть «верно/неверно», четверть открытых.",
  ppTitle:"Фотосинтез", ppSub:"Биология · 7 класс", keyFor:"Ключ ответов — для учителя", quick:"Быстрая проверка",
  expl:"Пояснения", correctC:"Правильный ответ:", tfL:["В","Н"], ppName:"Фамилия, имя", ppCls:"Класс", ppDate:"Дата",
  mixRule:"В каждом вопросе отметьте один правильный ответ. Если верно — «В», если неверно — «Н». На открытый вопрос дайте краткий ответ.",
  ansLine:"Ответ", sheet:"Бланк ответов", score:"Баллы", openRule:"На каждый вопрос дайте краткий ответ.",
  tfRule:"Отметьте «В», если верно, и «Н», если неверно.", mcRule:"В каждом вопросе отметьте один правильный ответ.",
  noteTg:"Ученик переходит по ссылке и решает прямо в Telegram — ответ проверяется сразу.",
  notePaper:"Нажмите «Распечатать» — этот бланк придёт в бот в PDF, останется распечатать и раздать.",
  noteKey:"Отдельный файл для учителя: таблица правильных ответов и пояснения. Ученикам не выдаётся.",
  exTitle:"Пример: {x}", close:"Закрыть", tabTg:"📱 В Telegram", tabPaper:"🖨 На бумаге", tabKey:"🔑 Ключ ответов", pickThis:"Выбрать этот",
  crossT:"Кроссворд", nWords:"Количество слов", cget1:"Ссылку на кроссворд в приложении — с подсказками и проверкой",
  cget2:"Кто сколько слов нашёл и за какое время", createC:"Создать кроссворд", myCross:"Мои кроссворды",
  writeTopic:"Напишите тему", aiTest:"ИИ составляет тест…", aiCross:"ИИ составляет кроссворд…", noBal:"Недостаточно средств: нужно {x}",
  limit:"Пробные попытки закончились. Спасибо!", expired:"Срок теста истёк",
  failRef:"Не удалось составить — {x} возвращено на баланс. Попробуйте ещё раз", fail:"Не удалось составить, попробуйте ещё раз",
  paid:"Тест готов · с баланса списано {x}", trialLeft:"Тест: осталось попыток — {n}",
  notFound:"Тест не найден", loadErr:"Не удалось загрузить", nW:["{n} слово","{n} слова","{n} слов"], linkT:"Ссылка на тест", linkC:"Ссылка на кроссворд", copy:"Копировать",
  linkHint:"Любой, кто откроет ссылку, решит его в приложении TadrisAI. Результаты придут вам.", share:"📤 Поделиться", selfSolve:"▶️ Решить самому",
  editQ:"Просмотр и редактирование вопросов", editQD:"удалите лишние вопросы", results:"Результаты", noOne:"пока никто не решил",
  printT:"Распечатать (PDF)", printD:"бланк для учеников + ключ ответов для учителя — придут в бот",
  printC:"Распечатать", printCD:"для кроссворда — на следующем этапе", copied:"Ссылка скопирована",
  shareT:"📝 Тест: {t} — попробуйте решить!", shareC:"🧩 Кроссворд: {t} — попробуйте решить!", qsTitle:"Вопросы ({n})", delQ:"🗑 Удалить",
  sure:"Точно удалить? Нажмите ещё раз", delErr:"Не удалось удалить", deleted:"Вопрос удалён",
  preparing:"Готовим… (10–20 секунд)", printed:"✅ 2 PDF отправлены в чат бота",
  printedT:"Бланк теста и ключ ответов отправлены в бот", prepErr:"Не удалось подготовить, попробуйте ещё раз",
  invT:"Вас пригласили пройти тест", invC:"Вас пригласили решить кроссворд", words:"слов", minutes:"минут", hintAv:"есть подсказки",
  qs:"вопросов", perQ:"на вопрос", author:"Автор теста", examT:"📋 Тест для класса",
  examD:"Решается только один раз. На каждый вопрос — один ответ, изменить его нельзя. Результат получит учитель.",
  prevSolved:"Вы уже решали этот тест {at}", noRetake:"Тест для класса нельзя пройти повторно", openApp:"Открыть TadrisAI",
  yourName:"Ваше имя", namePh:"Имя и фамилия", nameHint:"Подставлено ваше имя из Telegram, можно изменить",
  start:"Начать", freeNoReg:"Бесплатно · регистрация не нужна",
  ansPh:"Напишите ответ", dunno:"Не знаю", answer:"Ответить", streak:"🔥 {n} подряд верно", retryMode:"Работа над ошибками",
  noteExamOpen:"Напишите ответ — изменить его будет нельзя", noteExamPick:"Выберите ответ — изменить его будет нельзя",
  noteOpen:"Напишите краткий ответ — небольшая опечатка допускается", notePick:"Выберите ответ — сразу увидите, верно или нет",
  timeUp:"⏱ Время вышло. ", lastQ:"Это был последний вопрос", finish:"Завершить", timeNext:"⏱ Время вышло — следующий вопрос",
  accepted:"✓ Ответ принят", correctIs:"Правильный ответ: ", wrongIs:"✕ Неверно. Правильный ответ: ", timeIs:"⏱ Время вышло. Правильный ответ: ",
  seeRes:"Посмотреть результат", nextQ:"Следующий вопрос", timeOnly:"⏱ Время вышло",
  quitExam:"Завершить тест? Вопросы без ответа засчитаются как ошибки, пройти заново будет нельзя.",
  quitAsk:"Завершить? Результат сохранится как есть.",
  great:"Отличный результат!", good:"Хороший результат!", okRes:"Неплохо, потренируйтесь ещё", badRes:"Повторите тему ещё раз",
  time:"время", streakS:"подряд верно", place:"{n}-е место", ofN:"из {n}", retryS:"повтор", retryN:"Перерешать ошибки: {n}",
  shareRes:"Поделиться результатом", ownT:"Создайте свой тест", ownD:"Напишите тему — ИИ составит тест за минуту",
  calc:"Подсчитываем результат…", already:"Вы уже решали этот тест", notSent:"Результат не отправлен",
  checkNet:"Проверьте интернет и попробуйте ещё раз", resend:"Отправить снова", done:"Тест завершён", correctN:"верных ответов",
  sentT:"✅ Ваш результат отправлен учителю", teacherAnn:"Правильные ответы объявит учитель",
  shareMsg:"Я набрал {p}% в тесте «{t}»! Попробуйте и вы 👇",
  mostWrong:"Больше всего ошибок: вопрос {n}", mostWrongD:"«{q}» — ошиблись {m} из {n}. Стоит объяснить это на уроке ещё раз.",
  solved:"решили", avg:"в среднем", avgT:"среднее время", partic:"Участники", students:"Ученики",
  nobody:"Пока никто не решил. Поделитесь ссылкой.",
  foundW:"Найдено слов: {n} / {m}", across:"ПО ГОРИЗОНТАЛИ", down:"ПО ВЕРТИКАЛИ", letters:["{n} БУКВА","{n} БУКВЫ","{n} БУКВ"], hint1:"💡 Открыть одну букву",
  check:"Проверить", wordsOk:"Верно: {n} / {m} слов", allFound:"Все слова найдены! 🎉", crossDone:"Кроссворд завершён",
  hints:"подсказки", answers:"Ответы", shareS:"Поделиться", sec:"с",
  LNAME:{uz:"Узбекский",uzn:"Новая латиница",kaa:"Каракалпакский",ru:"Русский",en:"Английский"},
  LVL:{easy:"Лёгкий",mid:"Средний",hard:"Сложный"},
  QT:{mc:["С вариантами","A B C D"],tf:["Верно / Неверно","утверждение — да или нет"],open:["Открытые","ответ пишут сами"],mix:["Смешанный","все три типа"]},
  QTN:{mc:"С вариантами",tf:"Верно / Неверно",open:"Открытые",mix:"Смешанный"},
  gradeF:["{n} класс","{n} курс"],
  SUBJ:["Математика","Алгебра","Геометрия","Физика","Химия","Биология","География","История","Родной язык","Литература","Узбекский язык","Русский язык","Английский язык","Немецкий язык","Информатика","Право","Экономика","Начальное образование","Технология","Изобразительное искусство","Музыка","Физкультура","Воспитание"]
},
en:{
  back:"← Back", title:"Test quiz", trial:"TRIAL", topic:"Topic", topicPh:"E.g. Photosynthesis", crossPh:"E.g. The circulatory system",
  nQ:"Number of questions", level:"Difficulty", qtype:"Question type", example:"Example ›", grade:"Grade / year", subject:"Subject",
  pickOpt:"Choose (optional)", other:"Other…", ownPh:"Type your own", qlang:"Language", qlangT:"Which language should the test be in?", qlangC:"Which language should the crossword be in?", forWhom:"Who is it for?",
  self:"For myself", selfD:"practice: answer and explanation right away, can retake",
  cls:"For a class", clsD:"exam: once only, answers can't be changed",
  youGet:"You get", get1:"A link — students solve it in the app and instantly see the answer and explanation",
  get2:"Results: who scored what and the most-missed question",
  createT:"Create test", readyIn:"Ready in about {x} seconds", myTests:"My tests", loading:"Loading…",
  nq:"{n} questions", free:"free", freeTrial:"free (trial)",
  srcImg:"Image — questions are based on the text in it", chars:"{n} characters", cut:" (first 30,000 are used)",
  srcText:" — questions are based on this text", del:"Remove", upload:"Upload material", optional:"(optional)",
  uploadD:"Textbook page, notes or a photo — questions are based on exactly this text · PDF, DOCX, JPG, PNG", file:"File",
  big8:"The file is larger than 8 MB", noText:"No text found in the file — if it's a scan, upload it as an image",
  badType:"This file type isn't supported", tooBig:"The file is too large", readErr:"Couldn't read the file",
  noTests:"No tests yet", noCross:"No crosswords yet", solvedN:"{n} solved",
  qN:"QUESTION {n}", tfQ:" · TRUE?", openQ:" · TYPE THE ANSWER", right:"correct answer", yours:"your answer", why:"Why?",
  ex1q:"In which organelle does photosynthesis take place?", ex1o:["Mitochondrion","Chloroplast","Nucleus","Ribosome"],
  ex1w:"The chloroplast contains chlorophyll, which absorbs light.",
  ex2q:"Oxygen is released during photosynthesis.", tTrue:"True", tFalse:"False",
  ex2w:"When water is split, oxygen forms and is released into the air.",
  ex3q:"What is the pigment that makes leaves green called?", ex3typo:"chlorofyll", ex3a:"chlorophyll", okBang:"✓ Correct!",
  ex3w:"Accepted even with a small typo. Chlorophyll absorbs light.", ex3w2:"Chlorophyll absorbs light.",
  mixD:"One test mixes three question types: half multiple choice, a quarter true/false, a quarter open.",
  ppTitle:"Photosynthesis", ppSub:"Biology · Grade 7", keyFor:"Answer key — for the teacher", quick:"Quick check",
  expl:"Explanations", correctC:"Correct answer:", tfL:["T","F"], ppName:"Name", ppCls:"Class", ppDate:"Date",
  mixRule:"Choose one correct answer for each question. Mark «T» if true and «F» if false. Give a short answer to open questions.",
  ansLine:"Answer", sheet:"Answer sheet", score:"Score", openRule:"Give a short answer to each question.",
  tfRule:"Mark «T» if the statement is true and «F» if it is false.", mcRule:"Choose one correct answer for each question.",
  noteTg:"The student taps the link and solves it inside Telegram — answers are checked instantly.",
  notePaper:"Tap «Print» and this sheet arrives in the bot as a PDF — just print and hand out.",
  noteKey:"A separate file for the teacher: the answer table and explanations. Not given to students.",
  exTitle:"Example: {x}", close:"Close", tabTg:"📱 In Telegram", tabPaper:"🖨 On paper", tabKey:"🔑 Answer key", pickThis:"Choose this",
  crossT:"Crossword", nWords:"Number of words", cget1:"A link to a crossword solved in the app — with letter hints and checking",
  cget2:"Who found how many words and how long it took", createC:"Create crossword", myCross:"My crosswords",
  writeTopic:"Type a topic", aiTest:"AI is creating the test…", aiCross:"AI is creating the crossword…", noBal:"Not enough balance: {x} needed",
  limit:"Your trial attempts are used up. Thank you!", expired:"The trial has ended",
  failRef:"Couldn't create it — {x} returned to your balance. Please try again", fail:"Couldn't create it, please try again",
  paid:"Test ready · {x} charged from your balance", trialLeft:"Trial: {n} attempts left",
  notFound:"Test not found", loadErr:"Couldn't load", nW:"{n} words", linkT:"Test link", linkC:"Crossword link", copy:"Copy",
  linkHint:"Anyone who opens the link solves it in the TadrisAI app. You get the results.", share:"📤 Share", selfSolve:"▶️ Try it myself",
  editQ:"View and edit questions", editQD:"remove questions you don't need", results:"Results", noOne:"no one has solved it yet",
  printT:"Print (PDF)", printD:"student sheet + teacher's answer key — sent to the bot",
  printC:"Print", printCD:"for crosswords — coming later", copied:"Link copied",
  shareT:"📝 Test: {t} — give it a try!", shareC:"🧩 Crossword: {t} — give it a try!", qsTitle:"Questions ({n})", delQ:"🗑 Delete",
  sure:"Delete it? Tap again", delErr:"Couldn't delete", deleted:"Question deleted",
  preparing:"Preparing… (10–20 seconds)", printed:"✅ 2 PDFs sent to the bot chat",
  printedT:"Test sheet and answer key sent to the bot", prepErr:"Couldn't prepare it, please try again",
  invT:"You've been invited to a test", invC:"You've been invited to a crossword", words:"words", minutes:"minutes", hintAv:"hints available",
  qs:"questions", perQ:"per question", author:"Test author", examT:"📋 Class test",
  examD:"Can be taken only once. One answer per question — it can't be changed. The result goes to the teacher.",
  prevSolved:"You took this test on {at}", noRetake:"A class test can't be retaken", openApp:"Open TadrisAI",
  yourName:"Your name", namePh:"First and last name", nameHint:"Your Telegram name is filled in — you can change it",
  start:"Start", freeNoReg:"Free · no sign-up needed",
  ansPh:"Type your answer", dunno:"I don't know", answer:"Answer", streak:"🔥 {n} correct in a row", retryMode:"Working on mistakes",
  noteExamOpen:"Type your answer — it can't be changed later", noteExamPick:"Choose an answer — it can't be changed later",
  noteOpen:"Type a short answer — small typos are accepted", notePick:"Choose an answer — you'll see right away if it's correct",
  timeUp:"⏱ Time's up. ", lastQ:"That was the last question", finish:"Finish", timeNext:"⏱ Time's up — next question",
  accepted:"✓ Answer saved", correctIs:"Correct answer: ", wrongIs:"✕ Wrong. Correct answer: ", timeIs:"⏱ Time's up. Correct answer: ",
  seeRes:"See result", nextQ:"Next question", timeOnly:"⏱ Time's up",
  quitExam:"Finish the test? Unanswered questions count as wrong and you can't retake it.",
  quitAsk:"Finish now? Your result will be saved as it is.",
  great:"Excellent result!", good:"Good result!", okRes:"Not bad — keep practising", badRes:"Review the topic once more",
  time:"time", streakS:"correct in a row", place:"#{n}", ofN:"of {n}", retryS:"retake", retryN:"Retry {n} mistakes",
  shareRes:"Share result", ownT:"Create your own test", ownD:"Type a topic — AI builds a test in a minute",
  calc:"Calculating your result…", already:"You've already taken this test", notSent:"Result not sent",
  checkNet:"Check your internet and try again", resend:"Send again", done:"Test finished", correctN:"correct answers",
  sentT:"✅ Your result was sent to the teacher", teacherAnn:"Your teacher will announce the correct answers",
  shareMsg:"I scored {p}% on the «{t}» test! Give it a try 👇",
  mostWrong:"Most missed: question {n}", mostWrongD:"«{q}» — {m} of {n} got it wrong. Worth explaining again in class.",
  solved:"solved", avg:"average", avgT:"average time", partic:"Participants", students:"Students",
  nobody:"No one has solved it yet. Share the link.",
  foundW:"{n} / {m} words found", across:"ACROSS", down:"DOWN", letters:"{n} LETTERS", hint1:"💡 Reveal a letter",
  check:"Check", wordsOk:"{n} / {m} words correct", allFound:"All words found! 🎉", crossDone:"Crossword finished",
  hints:"hints", answers:"Answers", shareS:"Share", sec:"s",
  LNAME:{uz:"Uzbek",uzn:"New Latin",kaa:"Karakalpak",ru:"Russian",en:"English"},
  LVL:{easy:"Easy",mid:"Medium",hard:"Hard"},
  QT:{mc:["Multiple choice","A B C D"],tf:["True / False","a statement — yes or no"],open:["Open questions","students type the answer"],mix:["Mixed","all three types"]},
  QTN:{mc:"Multiple choice",tf:"True / False",open:"Open",mix:"Mixed"},
  gradeF:["Grade {n}","Year {n}"],
  SUBJ:["Mathematics","Algebra","Geometry","Physics","Chemistry","Biology","Geography","History","Native language","Literature","Uzbek language","Russian language","English","German","Computer science","Law","Economics","Primary education","Technology","Fine arts","Music","Physical education","Upbringing"]
},
kaa:{
  back:"← Artqa", title:"Test quiz", trial:"SINAQ", topic:"Tema", topicPh:"Mısalı: Fotosintez", crossPh:"Mısalı: Qan aylanıw sisteması",
  nQ:"Sorawlar sanı", level:"Qıyınlıǵı", qtype:"Soraw túri", example:"Mısal ›", grade:"Klass / kurs", subject:"Pán",
  pickOpt:"Tańlań (ıqtıyarıy)", other:"Basqa…", ownPh:"Ózińiz jazıń", qlang:"Til", qlangT:"Test qaysı tilde bolsın?", qlangC:"Krossvord qaysı tilde bolsın?", forWhom:"Kim ushın?",
  self:"Ózim ushın", selfD:"shınıǵıw: juwap hám túsindirme birden, qayta sheshiwge boladı",
  cls:"Klass ushın", clsD:"imtixan: bir ret, juwaptı ózgertip bolmaydı",
  youGet:"Siz alasız", get1:"Siltewish — oqıwshılar qosımshada sheshedi, juwap hám túsindirmeni birden kóredi",
  get2:"Nátiyjeler: kim qansha ball aldı, eń kóp qáte jiberilgen soraw",
  createT:"Test jaratıw", readyIn:"Shama menen {x} sekundta tayın boladı", myTests:"Meniń testlerim", loading:"Júklenbekte…",
  nq:"{n} soraw", free:"biypul", freeTrial:"biypul (sınaq)",
  srcImg:"Súwret — sorawlar usı súwrettegi tekstten dúziledi", chars:"{n} belgi", cut:" (basındaǵı 30 000 ı alınadı)",
  srcText:" — sorawlar usı tekstten dúziledi", del:"Óshiriw", upload:"Derek júklew", optional:"(májbúriy emes)",
  uploadD:"Sabaqlıq beti, konspekt yamasa súwret — sorawlar dál usı tekstten dúziledi · PDF, DOCX, JPG, PNG", file:"Fayl",
  big8:"Fayl 8 MB tan úlken", noText:"Faylda tekst tabılmadı — skaner bolsa, súwret etip júkleń",
  badType:"Bul túrdegi fayl qabıl etilmeydi", tooBig:"Fayl júdá úlken", readErr:"Fayldı oqıp bolmadı",
  noTests:"Ele test jaratılmaǵan", noCross:"Ele krossvord jaratılmaǵan", solvedN:"{n} adam sheshti",
  qN:"{n}-SORAW", tfQ:" · DURÍS PA?", openQ:" · JUWAPTÍ JAZÍŃ", right:"durıs juwap", yours:"sizdiń juwabıńız", why:"Nege?",
  ex1q:"Fotosintez qaysı organoidte júredi?", ex1o:["Mitoxondriya","Xloroplast","Yadro","Ribosoma"],
  ex1w:"Xloroplastta xlorofill bar — ol jaqtılıqtı sińiredi.",
  ex2q:"Fotosintez processinde kislorod bólinip shıǵadı.", tTrue:"Durıs", tFalse:"Nadurıs",
  ex2w:"Suw ıdıraǵanda kislorod payda boladı hám hawaǵa shıǵadı.",
  ex3q:"Japıraqlarǵa jasıl reń beretuǵın pigment qalay ataladı?", ex3typo:"xlorafill", ex3a:"xlorofill", okBang:"✓ Durıs!",
  ex3w:"Kishkene imla qátesi bolsa da qabıl etiledi. Xlorofill jaqtılıqtı sińiredi.", ex3w2:"Xlorofill jaqtılıqtı sińiredi.",
  mixD:"Bir testte úsh túrli soraw aralas keledi: yarımı variantlı, sheregi durıs/nadurıs, sheregi ashıq.",
  ppTitle:"Fotosintez", ppSub:"Biologiya · 7-klass", keyFor:"Juwaplar gilti — muǵallim ushın", quick:"Tez tekseriw",
  expl:"Túsindirmeler", correctC:"Durıs juwap:", tfL:["D","N"], ppName:"Atı, familiyası", ppCls:"Klass", ppDate:"Sáne",
  mixRule:"Hár bir sorawda bir durıs juwaptı belgileń. Durıs bolsa «D», nadurıs bolsa «N». Ashıq sorawǵa qısqa juwap jazıń.",
  ansLine:"Juwap", sheet:"Juwaplar betı", score:"Ball", openRule:"Hár bir sorawǵa qısqa juwap jazıń.",
  tfRule:"Tastıyıq durıs bolsa «D», nadurıs bolsa «N» di belgileń.", mcRule:"Hár bir sorawda bir durıs juwaptı belgileń.",
  noteTg:"Oqıwshı siltewishti basıp, Telegram ishinde sheshedi — juwap birden tekseriledi.",
  notePaper:"«Qaǵazǵa shıǵarıw» basılsa, usı bet PDF túrinde botqa keledi — basıp shıǵarıp tarqatasız.",
  noteKey:"Muǵallim ushın bólek fayl: durıs juwaplar kestesi hám túsindirmeler. Oqıwshılarǵa berilmeydi.",
  exTitle:"Mısal: {x}", close:"Jabıw", tabTg:"📱 Telegramda", tabPaper:"🖨 Qaǵazda", tabKey:"🔑 Juwaplar gilti", pickThis:"Usını tańlaw",
  crossT:"Krossvord", nWords:"Sózler sanı", cget1:"Qosımshada sheshiletuǵın krossvord siltewishi — hárip ashıw hám tekseriw menen",
  cget2:"Kim neshe sóz tapqanı hám qansha waqıt ketkeni", createC:"Krossvord jaratıw", myCross:"Meniń krossvordlarım",
  writeTopic:"Temanı jazıń", aiTest:"AI test dúzbekte…", aiCross:"AI krossvord dúzbekte…", noBal:"Balans jetkiliksiz: {x} kerek",
  limit:"Sınaq urınıwlarıńız tawsıldı. Raxmet!", expired:"Sınaq múddeti tamamlandı",
  failRef:"Dúzip bolmadı — {x} balansqa qaytarıldı. Qayta urınıp kóriń", fail:"Dúzip bolmadı, qayta urınıp kóriń",
  paid:"Test tayın · balanstan {x} alındı", trialLeft:"Sınaq: jáne {n} urınıw qaldı",
  notFound:"Test tabılmadı", loadErr:"Júklep bolmadı", nW:"{n} sóz", linkT:"Test siltewishi", linkC:"Krossvord siltewishi", copy:"Nusqa",
  linkHint:"Siltewishti basqan hár kim TadrisAI qosımshasında sheshedi. Nátiyjeleri sizge keledi.", share:"📤 Bólisiw", selfSolve:"▶️ Ózim sheshemen",
  editQ:"Sorawlardı kóriw hám dúzetiw", editQD:"keregi joq sorawdı óshiriń", results:"Nátiyjeler", noOne:"ele hesh kim sheshpedi",
  printT:"Qaǵazǵa shıǵarıw (PDF)", printD:"oqıwshılar ushın bet + muǵallim ushın juwaplar gilti — botqa keledi",
  printC:"Qaǵazǵa shıǵarıw", printCD:"krossvord ushın — keyingi basqıshta", copied:"Siltewish nusqalandı",
  shareT:"📝 Test: {t} — sheship kóriń!", shareC:"🧩 Krossvord: {t} — sheship kóriń!", qsTitle:"Sorawlar ({n})", delQ:"🗑 Óshiriw",
  sure:"Haqıyqatan óshirilsin be? Jáne basıń", delErr:"Óshirip bolmadı", deleted:"Soraw óshirildi",
  preparing:"Tayarlanbaqta… (10–20 sekund)", printed:"✅ 2 PDF bot chatına jiberildi",
  printedT:"Test betı hám juwaplar gilti botqa jiberildi", prepErr:"Tayarlap bolmadı, qayta urınıp kóriń",
  invT:"Sizdi testke shaqırdı", invC:"Sizdi krossvordqa shaqırdı", words:"sóz", minutes:"minut", hintAv:"járdem bar",
  qs:"soraw", perQ:"hár sorawǵa", author:"Test avtorı", examT:"📋 Klass testi",
  examD:"Tek bir ret sheshiledi. Hár sorawǵa bir juwap beresiz — keyin ózgertip bolmaydı. Nátiyje muǵallimge baradı.",
  prevSolved:"Siz bul testti {at} da sheshkensiz", noRetake:"Klass testin qayta sheship bolmaydı", openApp:"TadrisAI dı ashıw",
  yourName:"Atıńız", namePh:"Atı hám familiyası", nameHint:"Telegramdaǵı atıńız qoyıldı, ózgertiwińizge boladı",
  start:"Baslaw", freeNoReg:"Biypul · dizimnen ótiw shárt emes",
  ansPh:"Juwaptı jazıń", dunno:"Bilmeymen", answer:"Juwap beriw", streak:"🔥 {n} izbe-iz durıs", retryMode:"Qáteler ústinde islew",
  noteExamOpen:"Juwaptı jazıń — keyin ózgertip bolmaydı", noteExamPick:"Juwaptı tańlań — keyin ózgertip bolmaydı",
  noteOpen:"Qısqa juwap jazıń — kishkene imla qátesi bolsa da qabıl etiledi", notePick:"Juwaptı tańlań — durıs yamasa qáteligin birden kóresiz",
  timeUp:"⏱ Waqıt tawsıldı. ", lastQ:"Bul aqırǵı soraw edi", finish:"Juwmaqlaw", timeNext:"⏱ Waqıt tawsıldı — keyingi soraw",
  accepted:"✓ Juwap qabıl etildi", correctIs:"Durıs juwap: ", wrongIs:"✕ Qáte. Durıs juwap: ", timeIs:"⏱ Waqıt tawsıldı. Durıs juwap: ",
  seeRes:"Nátiyjeni kóriw", nextQ:"Keyingi soraw", timeOnly:"⏱ Waqıt tawsıldı",
  quitExam:"Testti juwmaqlaysız ba? Juwap berilmegen sorawlar qáte esaplanadı hám qayta sheship bolmaydı.",
  quitAsk:"Juwmaqlaysız ba? Nátiyje házirgi halında saqlanadı.",
  great:"Ájayıp nátiyje!", good:"Jaqsı nátiyje!", okRes:"Jaman emes, jáne shınıǵıń", badRes:"Temanı jáne bir ret tákirarlań",
  time:"waqıt", streakS:"izbe-iz durıs", place:"{n}-orın", ofN:"{n} adamnan", retryS:"qayta sheshiw", retryN:"{n} qáteni qayta sheshiw",
  shareRes:"Nátiyjeni bólisiw", ownT:"Óz testińizdi jaratıń", ownD:"Temanı jazıń — AI bir minutta test dúzedi",
  calc:"Nátiyje esaplanbaqta…", already:"Siz bul testti aldın sheshkensiz", notSent:"Nátiyje jiberilmedi",
  checkNet:"Internetti tekserip, qayta urınıp kóriń", resend:"Qayta jiberiw", done:"Test juwmaqlandı", correctN:"durıs juwap",
  sentT:"✅ Nátiyjeńiz muǵallimge jiberildi", teacherAnn:"Durıs juwaplardı muǵallimińiz járiyalaydı",
  shareMsg:"Men «{t}» testinen {p}% ball aldım! Siz de sınap kóriń 👇",
  mostWrong:"Eń kóp qáte: {n}-soraw", mostWrongD:"«{q}» — {n} adamnan {m} qáte jiberdi. Sabaqta qayta túsindiriw kerek.",
  solved:"sheshti", avg:"ortasha", avgT:"ortasha waqıt", partic:"Qatnasıwshılar", students:"Oqıwshılar",
  nobody:"Ele hesh kim sheshpedi. Siltewishti bólisiń.",
  foundW:"{n} / {m} sóz tabıldı", across:"GORIZONTAL", down:"VERTIKAL", letters:"{n} HÁRIP", hint1:"💡 Bir hárip ashıw",
  check:"Tekseriw", wordsOk:"{n} / {m} sóz durıs", allFound:"Barlıq sózler tabıldı! 🎉", crossDone:"Krossvord juwmaqlandı",
  hints:"járdem", answers:"Juwaplar", shareS:"Bólisiw", sec:"s",
  LNAME:{uz:"Ózbek",uzn:"Jańa latın",kaa:"Qaraqalpaq",ru:"Orıs",en:"Inglis"},
  LVL:{easy:"Ańsat",mid:"Ortasha",hard:"Qıyın"},
  QT:{mc:["Variantlı","A B C D"],tf:["Durıs / Nadurıs","tastıyıq — awa yamasa yaq"],open:["Ashıq sorawlar","juwaptı ózi jazadı"],mix:["Aralas","úsh túri birge"]},
  QTN:{mc:"Variantlı",tf:"Durıs / Nadurıs",open:"Ashıq",mix:"Aralas"},
  gradeF:["{n}-klass","{n}-kurs"],
  SUBJ:["Matematika","Algebra","Geometriya","Fizika","Ximiya","Biologiya","Geografiya","Tariyx","Ana tili","Ádebiyat","Ózbek tili","Orıs tili","Inglis tili","Nemis tili","Informatika","Huqıq","Ekonomika","Baslawısh tálim","Texnologiya","Súwretlew óneri","Muzıka","Dene tárbiyası","Tárbiya"]
}};
function ql(){const l=['ru','en','kaa','uzn'].includes(lang)?lang:'uz';     // ilova tili o'zgarsa ham darhol
  if(l==='uzn'&&!QD.uzn) QD.uzn=(typeof UZN!=='undefined')?UZN.deep(QD.uz):QD.uz; return l}
function L(k,v){const q=ql(); let s=QD[q]&&QD[q][k]; if(s==null) s=QD.uz[k]; if(s==null) return k;
  if(Array.isArray(s)&&s.length===3&&v&&v.n!=null&&typeof s[0]==='string'&&s[0].includes('{n}')){   // ruscha ko'plik: 1 / 2–4 / 5+
    const n=Math.abs(parseInt(String(v.n).replace(/\s/g,''))||0), a=n%10, b=n%100;
    s=s[a===1&&b!==11?0:a>=2&&a<=4&&(b<12||b>14)?1:2]}
  if(v&&typeof s==='string') s=s.replace(/\{(\w+)\}/g,(m,a)=>v[a]!=null?v[a]:m); return s}

const LKEYS=['uz','uzn','kaa','ru','en'];
const LN=k=>L('LNAME')[k]||'', LV=k=>L('LVL')[k]||'', QTx=k=>L('QT')[k], QTNx=k=>L('QTN')[k]||'';
const GRADES=()=>{const [c,k]=L('gradeF'); return [5,6,7,8,9,10,11].map(n=>c.replace('{n}',n)).concat([1,2,3,4].map(n=>k.replace('{n}',n)))};
const S={kind:'test',n:20,cn:12,level:'mid',aud:'class',qtype:'mc',grade:'',subject:'',src:null,qlang:(['uz','uzn','kaa','ru','en'].includes(lang)?lang:'uz'),quiz:null,code:''};
const QT={mc:1,tf:1,open:1,mix:1};                     // savol turlari (nomlari — L('QT'))
const TMIN=10,TMAX=50,TMARKS=[10,20,30,40,50];
/* 2026-11-16, egasi: narxlar (botdagi quiz.TEST_PRICES bilan bir xil) — savollar soni shu chegaragacha */
const QPR=[[10,2990],[20,3990],[30,4990],[40,5990],[50,6990]];
const qPrice=n=>(QPR.find(([l])=>n<=l)||QPR[QPR.length-1])[1];
const qFree=()=>(typeof isAdmin==='function'&&isAdmin())||(typeof SRV!=='undefined'&&SRV&&SRV.quiz_free===true);
const box=()=>$('qz');
const hap=k=>{try{tg&&tg.HapticFeedback&&(k==='ok'||k==='err'?tg.HapticFeedback.notificationOccurred(k==='ok'?'success':'error'):tg.HapticFeedback.impactOccurred('light'))}catch(e){}};
const linkOf=c=>'https://t.me/'+(qs.get('bot')||'tadrisai_bot')+'?start=q_'+c;
const mmss=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
let timer=0; const stopT=()=>{if(timer){clearInterval(timer);timer=0}};
// 2026-11-20, egasi: til/qiyinlik/savol turini tanlaganda sahifa tepaga sakramasin — o'sha joyida qolsin
let KEEP=null;
function view(h){stopT(); const keep=KEEP; KEEP=null;
  const prevMine=keep&&$('qzMine')?$('qzMine').innerHTML:null;      // «Mening testlarim» qayta «yuklanmoqda»ga aylanib, sahifa sakramasin
  box().innerHTML=h; show('qz');
  if(prevMine!=null&&$('qzMine')) $('qzMine').innerHTML=prevMine;
  if(keep){window.scrollTo(0,keep.y); requestAnimationFrame(()=>window.scrollTo(0,keep.y))} else window.scrollTo(0,0)}

/* ---------- Yaratish: Test (krossvord — alohida bo'lim, pastda) ---------- */
const pr=(a,b)=>' aria-pressed="'+(a===b)+'"';
// 2026-11-20, egasi: til tanlash slayd/mustaqil ishdagi kabi — bayroqli 2 ustunli tugmalar, «Test qaysi tilda bo'lsin?»
const QFLAGS={"uz": ["<svg class=\"flag\" viewBox=\"0 0 24 24\"><defs><clipPath id=\"qcu\"><circle cx=\"12\" cy=\"12\" r=\"11\"/></clipPath></defs><g clip-path=\"url(#qcu)\"><rect width=\"24\" height=\"8\" fill=\"#1EB5E8\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#1EB53A\"/><rect y=\"7.4\" width=\"24\" height=\"1.2\" fill=\"#CE1126\"/><rect y=\"15.4\" width=\"24\" height=\"1.2\" fill=\"#CE1126\"/><circle cx=\"6.5\" cy=\"4\" r=\"2.2\" fill=\"#fff\"/><circle cx=\"7.4\" cy=\"4\" r=\"2\" fill=\"#1EB5E8\"/></g><circle class=\"shine\" cx=\"12\" cy=\"12\" r=\"11\" fill=\"url(#qgl)\"/></svg>", "O'zbek"], "kaa": ["<svg class=\"flag\" viewBox=\"0 0 24 24\"><defs><clipPath id=\"qck\"><circle cx=\"12\" cy=\"12\" r=\"11\"/></clipPath></defs><g clip-path=\"url(#qck)\"><rect width=\"24\" height=\"8\" fill=\"#0099B5\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#FFD100\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#1EB53A\"/><rect y=\"7.4\" width=\"24\" height=\"1.2\" fill=\"#CE1126\"/><rect y=\"15.4\" width=\"24\" height=\"1.2\" fill=\"#CE1126\"/></g><circle class=\"shine\" cx=\"12\" cy=\"12\" r=\"11\" fill=\"url(#qgl)\"/></svg>", "Qaraqalpaq"], "uzn": ["<svg class=\"flag\" viewBox=\"0 0 24 24\"><defs><clipPath id=\"qcun\"><circle cx=\"12\" cy=\"12\" r=\"11\"/></clipPath></defs><g clip-path=\"url(#qcun)\"><rect width=\"24\" height=\"8\" fill=\"#1EB5E8\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#1EB53A\"/><rect y=\"7.4\" width=\"24\" height=\"1.2\" fill=\"#CE1126\"/><rect y=\"15.4\" width=\"24\" height=\"1.2\" fill=\"#CE1126\"/><circle cx=\"6.5\" cy=\"4\" r=\"2.2\" fill=\"#fff\"/><circle cx=\"7.4\" cy=\"4\" r=\"2\" fill=\"#1EB5E8\"/></g><circle class=\"shine\" cx=\"12\" cy=\"12\" r=\"11\" fill=\"url(#qgl)\"/></svg>", "Özbek (yangi)"], "ru": ["<svg class=\"flag\" viewBox=\"0 0 24 24\"><defs><clipPath id=\"qcr\"><circle cx=\"12\" cy=\"12\" r=\"11\"/></clipPath></defs><g clip-path=\"url(#qcr)\"><rect width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#0039A6\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#D52B1E\"/></g><circle cx=\"12\" cy=\"12\" r=\"10.6\" fill=\"none\" stroke=\"#CBD5E1\" stroke-width=\".8\"/><circle class=\"shine\" cx=\"12\" cy=\"12\" r=\"11\" fill=\"url(#qgl)\"/></svg>", "Rus"], "en": ["<svg class=\"flag\" viewBox=\"0 0 24 24\"><defs><clipPath id=\"qce\"><circle cx=\"12\" cy=\"12\" r=\"11\"/></clipPath></defs><g clip-path=\"url(#qce)\"><rect width=\"24\" height=\"24\" fill=\"#012169\"/><path d=\"M0 0L24 24M24 0L0 24\" stroke=\"#fff\" stroke-width=\"4\"/><path d=\"M0 0L24 24M24 0L0 24\" stroke=\"#C8102E\" stroke-width=\"1.5\"/><path d=\"M12 0V24M0 12H24\" stroke=\"#fff\" stroke-width=\"6\"/><path d=\"M12 0V24M0 12H24\" stroke=\"#C8102E\" stroke-width=\"3.4\"/></g><circle class=\"shine\" cx=\"12\" cy=\"12\" r=\"11\" fill=\"url(#qgl)\"/></svg>", "Eng"]};
const QGL='<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="qgl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>';
const langs=(kind)=>`<div class="group">${L(kind==='cross'?'qlangC':'qlangT')}</div><div class="seg3" role="group" style="grid-template-columns:repeat(2,1fr)">${QGL}${['uz','kaa','uzn','ru','en'].map(k=>`<button type="button"${pr(S.qlang,k)} onclick="QZ.set('qlang','${k}')">${QFLAGS[k][0]}<span>${QFLAGS[k][1]}</span></button>`).join('')}</div>`;
const levels=()=>`<div class="group">${L('level')}</div><div class="qz-seg">${['easy','mid','hard'].map(k=>`<button type="button"${pr(S.level,k)} onclick="QZ.set('level','${k}')">${LV(k)}</button>`).join('')}</div>`;
function selBox(id,label,list,val,ph){
  const other=val&&!list.includes(val);
  return `<div><div class="group" style="margin-top:14px">${label}</div>
  <select class="qz-in" id="${id}" onchange="QZ.pickSel('${id}',this.value)"><option value="">${ph}</option>${list.map(x=>`<option${x===val?' selected':''}>${esc(x)}</option>`).join('')}<option value="__o"${other?' selected':''}>${L('other')}</option></select>
  <input class="qz-in" id="${id}O" style="margin-top:8px;display:${other?'block':'none'}" maxlength="40" placeholder="${L('ownPh')}" value="${other?esc(val):''}" oninput="QZ.setQ('${id==='qzGrade'?'grade':'subject'}',this.value)"></div>`;
}
function open(){
  S.kind='test'; if(!QT[S.qtype]) S.qtype='mc';
  view(`<button class="back" onclick="show('home')">${L('back')}</button>
  <div class="qz-head"><h1>${L('title')}</h1>${qFree()?`<span class="qz-tag">${L('trial')}</span>`:''}</div>
  <div class="group" style="margin-top:0">${L('topic')}</div>
  <textarea class="qz-ta" id="qzTopic" placeholder="${L('topicPh')}">${esc(S.topic||'')}</textarea>
  <div class="qz-src" id="qzSrc">${srcBox()}</div>
  <div class="group">${L('nQ')}</div>
  <div class="rng" style="margin-top:62px"><div class="rng-track"><div class="rng-fill" id="qzFill"></div></div><div id="qzTicks"></div>
    <input type="range" id="qzRng" min="${TMIN}" max="${TMAX}" step="1" value="${S.n}" aria-label="${L('nQ')}" oninput="QZ.setN(this.value)"><div class="rng-bub" id="qzBub"></div></div>
  <div class="rng-price" id="qzNPrice"></div>
  ${levels()}
  <div class="group">${L('qtype')}</div>
  <div class="qz-types">${Object.keys(QT).map(k=>`<button type="button"${pr(S.qtype,k)} onclick="QZ.set('qtype','${k}')"><b>${QTx(k)[0]}</b><span>${QTx(k)[1]}</span><em class="qz-ex" role="button" onclick="event.stopPropagation();QZ.example('${k}')">${L('example')}</em></button>`).join('')}</div>
  <div class="qz-2c">${selBox('qzGrade',L('grade'),GRADES(),S.grade,L('pickOpt'))}${selBox('qzSubj',L('subject'),L('SUBJ'),S.subject,L('pickOpt'))}</div>
  ${langs('test')}
  <div class="group">${L('forWhom')}</div>
  <div class="seg2"><button type="button"${pr(S.aud,'self')} onclick="QZ.set('aud','self')"><span class="e">🙋</span><b>${L('self')}</b><span>${L('selfD')}</span></button>
  <button type="button"${pr(S.aud,'class')} onclick="QZ.set('aud','class')"><span class="e">👩‍🏫</span><b>${L('cls')}</b><span>${L('clsD')}</span></button></div>
  <div class="qz-card qz-get"><b style="font-size:14px">${L('youGet')}</b>
    <div><i>✓</i>${L('get1')}</div>
    <div><i>✓</i>${L('get2')}</div></div>
  <button type="button" class="cta" id="qzGo" onclick="QZ.create()">${L('createT')}</button>
  <div class="qz-hint" id="qzEta"></div>
  <div class="group">${L('myTests')}</div><div class="qz-list" id="qzMine"><div class="qz-hint">${L('loading')}</div></div>`);
  $('qzTopic').addEventListener('input',e=>S.topic=e.target.value);
  setN(S.n,1); mine('test');
}
function setN(v,silent){
  S.n=Math.max(TMIN,Math.min(TMAX,parseInt(v)||20));
  const p=v=>(v-TMIN)/(TMAX-TMIN)*100;
  $('qzRng').value=S.n; $('qzFill').style.width=p(S.n)+'%'; $('qzBub').style.left=p(S.n)+'%'; $('qzBub').textContent=L('nq',{n:S.n});
  $('qzTicks').innerHTML=TMARKS.map(m=>`<div class="rng-tick ${m<=S.n?'on':''} ${m===S.n?'cur':''}" style="left:${p(m)}%"><b>${m}</b><i></i><span></span></div>`).join('');
  const pr=qPrice(S.n), fr=qFree();
  $('qzNPrice').innerHTML=`${L('nq',{n:S.n})} · <b style="font-size:14px">${fr?L('freeTrial'):money(pr)}</b>`;
  const go=$('qzGo'); if(go) go.textContent=L('createT')+' · '+(fr?L('free'):money(pr));
  const eta=$('qzEta'); if(eta) eta.textContent=L('readyIn',{x:S.n<=20?'20–40':S.n<=35?'40–70':'60–100'});
  if(!silent) hap();
}
function srcBox(){
  if(S.src) return `<div class="qz-srcf"><span class="ic">${S.src.kind==='img'?'🖼':'📄'}</span><span class="tx"><b>${esc(S.src.name)}</b><small>${S.src.kind==='img'?L('srcImg'):L('chars',{n:(S.src.chars||0).toLocaleString('ru')})+(S.src.cut?L('cut'):'')+L('srcText')}</small></span><button type="button" onclick="QZ.srcDel()" aria-label="${L('del')}">✕</button></div>`;
  return `<label class="qz-up"><input type="file" accept=".pdf,.docx,.txt,image/*" onchange="QZ.srcUp(this)" hidden>
    <span class="ic">📎</span><span class="tx"><b>${L('upload')} <i>${L('optional')}</i></b><small>${L('uploadD')}</small></span><span class="btn">${L('file')}</span></label>`;
}
async function srcUp(inp){
  const f=inp.files&&inp.files[0]; if(!f) return;
  if(f.size>8*1024*1024){toast('⚠️',L('big8'));return}
  $('qzSrc').innerHTML='<div class="qz-srcf"><span class="qz-spin" style="width:26px;height:26px;border-width:3px"></span><span class="tx"><b>'+L('loading')+'</b><small>'+esc(f.name)+'</small></span></div>';
  const b64=await new Promise((ok,no)=>{const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=no; r.readAsDataURL(f)}).catch(()=>null);
  let d={}; try{d=b64?await api('/quiz/source',{name:f.name,mime:f.type,data:b64},90000):{}}catch(e){}
  if(!d.ok){S.src=null; $('qzSrc').innerHTML=srcBox();
    toast('⚠️',{notext:L('noText'),type:L('badType'),big:L('tooBig')}[d.error]||L('readErr'));return}
  S.src={src:d.src,name:d.name,kind:d.kind,chars:d.chars,cut:d.cut}; $('qzSrc').innerHTML=srcBox(); hap('ok');
}
function srcDel(){S.src=null; $('qzSrc').innerHTML=srcBox()}
function pickSel(id,v){
  const o=$(id+'O'); o.style.display=v==='__o'?'block':'none';
  const k=id==='qzGrade'?'grade':'subject'; S[k]=v==='__o'?(o.value||''):v; if(v==='__o') o.focus();
}
function setQ(k,v){S[k]=v}
function set(k,v){S.topic=($('qzTopic')||{}).value||S.topic; S[k]=v; hap(); KEEP={y:window.scrollY}; (S.kind==='cross'?openCross:open)()}
async function mine(kind){
  let d={}; try{d=await api('/quiz/mine',{},15000)}catch(e){}
  const el=$('qzMine'); if(!el) return;
  const list=(d.list||[]).filter(r=>(r[1]==='cross')===(kind==='cross'));
  if(!d.ok||!list.length){el.innerHTML=`<div class="qz-hint">${L(kind==='cross'?'noCross':'noTests')}</div>`;return}
  el.innerHTML=list.map(r=>`<button type="button" class="qz-item" onclick="QZ.ready('${r[0]}')"><span class="ic">${r[1]==='cross'?'🧩':'📝'}</span><span class="tx"><b>${esc(r[2])}</b><small>${esc(r[3])} · ${L('solvedN',{n:r[4]})}</small></span><span>›</span></button>`).join('');
}
/* Savol turi misollari (2026-11-12, egasi): «Misol» bosilganda o'quvchi ko'radigan ko'rinish */
const EXQ={
  mc:()=>`<div class="qz-q"><small>${L('qN',{n:1})}</small><h2>${L('ex1q')}</h2></div>
    <div class="qz-opts">${L('ex1o').map((o,j)=>`<div class="qz-opt ${j===1?'good':j===0?'bad':'dim'}"><span class="k">${'ABCD'[j]}</span><span>${o}</span><span class="lb">${j===1?L('right'):j===0?L('yours'):''}</span></div>`).join('')}</div>
    <div class="qz-why"><b>${L('why')}</b><p>${L('ex1w')}</p></div>`,
  tf:()=>`<div class="qz-q"><small>${L('qN',{n:2})}${L('tfQ')}</small><h2>${L('ex2q')}</h2></div>
    <div class="qz-opts tf"><div class="qz-opt good"><span class="k">✓</span><span>${L('tTrue')}</span><span class="lb">${L('right')}</span></div><div class="qz-opt dim"><span class="k">✕</span><span>${L('tFalse')}</span><span class="lb"></span></div></div>
    <div class="qz-why"><b>${L('why')}</b><p>${L('ex2w')}</p></div>`,
  open:()=>`<div class="qz-q"><small>${L('qN',{n:3})}${L('openQ')}</small><h2>${L('ex3q')}</h2></div>
    <div class="qz-in" style="border-color:#10B981">${L('ex3typo')}</div>
    <div class="qz-why" style="background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4)"><b style="color:#10B981">${L('okBang')}</b><p>${L('ex3w')}</p></div>`,
};
EXQ.mix=()=>`<div class="qz-hint" style="text-align:left;margin:0 0 10px">${L('mixD')}</div>
  <div class="qz-mini">${EXQ.mc()}</div><div class="qz-mini">${EXQ.tf()}</div><div class="qz-mini">${EXQ.open()}</div>`;
const PAPER=()=>({
  mc:{q:L('ex1q'),o:L('ex1o'),a:'B',why:L('ex1w')},
  tf:{q:L('ex2q'),a:L('tfL')[0],why:L('ex2w')},
  open:{q:L('ex3q'),a:'✎',why:L('ex3w2')},
  mix:{}});
const ppHead=key=>`<div class="pp-t">${L('ppTitle')}</div><div class="pp-s">${L('ppSub')} · ${key?L('keyFor'):L('nq',{n:20})}</div>`;
const ppLine=()=>`<div class="pp-l"><span>${L('ppName')}: __________</span><span>${L('ppCls')}: ____</span><span>${L('ppDate')}: _____</span></div>`;
const ppTF=()=>{const [t,f]=L('tfL'); return `<div class="pp-o"><span>○ ${t} — ${L('tTrue')}</span><span>○ ${f} — ${L('tFalse')}</span></div>`};
const ppSheet=()=>`<div class="pp-h">${L('sheet')}</div><div class="pp-grid">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<div><i>${n}</i><b></b></div>`).join('')}</div><div class="pp-sc">${L('score')}: ____ / 20</div>`;
function paperMix(key){                      // aralash test varaqasi: uch tur bitta varaqda
  const P_=PAPER(), [t,f]=L('tfL');
  if(key) return `<div class="pp">${ppHead(1)}<div class="pp-h">${L('quick')}</div>
    <div class="pp-grid">${['B',t,'✎','D',f,'A','✎','C',t,'B'].map((v,i)=>`<div><i>${i+1}</i><b>${v}</b></div>`).join('')}</div>
    <div class="pp-h">${L('expl')}</div>
    <div class="pp-q"><span>1.</span> ${P_.mc.q}</div><div class="pp-a">${L('correctC')} <b>B) ${P_.mc.o[1]}</b></div>
    <div class="pp-q"><span>2.</span> ${P_.tf.q}</div><div class="pp-a">${L('correctC')} <b>${t}) ${L('tTrue')}</b></div>
    <div class="pp-q"><span>3.</span> ${P_.open.q}</div><div class="pp-a">${L('correctC')} <b>${L('ex3a')}</b></div></div>`;
  return `<div class="pp">${ppHead(0)}${ppLine()}
    <div class="pp-n">${L('mixRule')}</div>
    <div class="pp-q"><span>1.</span> ${P_.mc.q}</div><div class="pp-o g">${P_.mc.o.map((o,j)=>`<span><b>${'ABCD'[j]})</b> ${o}</span>`).join('')}</div>
    <div class="pp-q"><span>2.</span> ${P_.tf.q}</div>${ppTF()}
    <div class="pp-q"><span>3.</span> ${P_.open.q}</div><div class="pp-o"><span>${L('ansLine')}: ________________________</span></div>
    ${ppSheet()}</div>`;
}
function paperView(k,key){
  if(k==='mix') return paperMix(key);
  const x=PAPER()[k], [t,f]=L('tfL'), nm=k==='open'?L('openRule'):k==='tf'?L('tfRule'):L('mcRule');
  if(key) return `<div class="pp">${ppHead(1)}<div class="pp-h">${L('quick')}</div>
    <div class="pp-grid">${[1,2,3,4,5,6,7,8,9,10].map((n,i)=>`<div><i>${n}</i><b>${i===0?x.a:(k==='tf'?[t,f][(i*3)%2]:'ABCD'[(i*7)%4])}</b></div>`).join('')}</div>
    <div class="pp-h">${L('expl')}</div><div class="pp-q"><span>1.</span> ${x.q}</div><div class="pp-a">${L('correctC')} <b>${k==='tf'?t+') '+L('tTrue'):k==='open'?L('ex3a'):'B) '+x.o[1]}</b></div><div class="pp-e">${x.why}</div></div>`;
  return `<div class="pp">${ppHead(0)}${ppLine()}
    <div class="pp-n">${nm}</div><div class="pp-q"><span>1.</span> ${x.q}</div>
    ${k==='open'?`<div class="pp-o"><span>${L('ansLine')}: ________________________</span></div>`:k==='tf'?ppTF():`<div class="pp-o g">${x.o.map((o,j)=>`<span><b>${'ABCD'[j]})</b> ${o}</span>`).join('')}</div>`}
    <div class="pp-q"><span>2.</span> …</div>
    ${ppSheet()}</div>`;
}
function exTab(k,tab){
  document.querySelectorAll('#qzExOv .qz-extabs button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===tab));
  $('qzExBody').innerHTML=tab==='tg'?EXQ[k]():paperView(k,tab==='key');
  $('qzExNote').textContent={tg:L('noteTg'),paper:L('notePaper'),key:L('noteKey')}[tab];
}
function example(k){
  hap();
  let ov=$('qzExOv');
  if(!ov){ov=document.createElement('div'); ov.id='qzExOv'; ov.className='qz-exov'; document.body.appendChild(ov);
    ov.addEventListener('click',e=>{if(e.target===ov) ov.remove()})}
  ov.innerHTML=`<div class="qz-exbox" role="dialog" aria-label="${L('exTitle',{x:QTx(k)[0]})}"><div class="qz-exhead"><b>${L('exTitle',{x:QTx(k)[0]})}</b><button type="button" onclick="document.getElementById('qzExOv').remove()" aria-label="${L('close')}">✕</button></div>
    ${PAPER()[k]?`<div class="qz-extabs"><button type="button" data-t="tg" aria-pressed="true" onclick="QZ.exTab('${k}','tg')">${L('tabTg')}</button><button type="button" data-t="paper" aria-pressed="false" onclick="QZ.exTab('${k}','paper')">${L('tabPaper')}</button><button type="button" data-t="key" aria-pressed="false" onclick="QZ.exTab('${k}','key')">${L('tabKey')}</button></div>`:''}
    <div class="qz-hint" id="qzExNote" style="text-align:left;margin:0 0 10px">${L('noteTg')}</div>
    <div class="qz-exbody" id="qzExBody">${EXQ[k]()}</div>
    <button type="button" class="cta" style="margin-top:14px" onclick="document.getElementById('qzExOv').remove();QZ.set('qtype','${k}')">${L('pickThis')}</button></div>`;
}

/* Krossvord — alohida bo'lim (2026-11-12, egasi) */
function openCross(){
  S.kind='cross';
  view(`<button class="back" onclick="show('home')">${L('back')}</button>
  <div class="qz-head"><h1>${L('crossT')}</h1><span class="qz-tag">${L('trial')}</span></div>
  <div class="group" style="margin-top:0">${L('topic')}</div>
  <textarea class="qz-ta" id="qzTopic" placeholder="${L('crossPh')}">${esc(S.topic||'')}</textarea>
  <div class="group">${L('nWords')}</div>
  <div class="nchips" style="grid-template-columns:repeat(3,1fr)">${[8,12,16].map(n=>`<button type="button"${pr(S.cn,n)} onclick="QZ.set('cn',${n})">${n}</button>`).join('')}</div>
  ${levels()}${langs('cross')}
  <div class="qz-card qz-get"><b style="font-size:14px">${L('youGet')}</b>
    <div><i>✓</i>${L('cget1')}</div>
    <div><i>✓</i>${L('cget2')}</div></div>
  <button type="button" class="cta" id="qzGo" onclick="QZ.create()">${L('createC')} · ${L('free')}</button>
  <div class="qz-hint">${L('readyIn',{x:'15–40'})}</div>
  <div class="group">${L('myCross')}</div><div class="qz-list" id="qzMine"><div class="qz-hint">${L('loading')}</div></div>`);
  $('qzTopic').addEventListener('input',e=>S.topic=e.target.value);
  mine('cross');
}
async function create(){
  const topic=($('qzTopic').value||'').trim(), cross=S.kind==='cross';
  if(topic.length<3){toast('✏️',L('writeTopic'));$('qzTopic').focus();return}
  S.topic=topic; hap();
  const t0=Date.now();
  view(`<div class="qz-load"><div class="qz-spin"></div><b style="font-size:17px">${L(cross?'aiCross':'aiTest')}</b>
    <div style="color:var(--muted);font-size:14px">«${esc(topic)}»${!cross&&S.src?'<br>📎 '+esc(S.src.name):''}<br><span id="qzSec">0</span> ${L('sec')}</div></div>`);
  timer=setInterval(()=>{const e=$('qzSec'); if(e) e.textContent=Math.round((Date.now()-t0)/1000)},1000);
  const body=cross?{kind:'cross',topic,n:S.cn,level:S.level,qlang:S.qlang}
    :{kind:'test',topic,n:S.n,level:S.level,aud:S.aud,qlang:S.qlang,qtype:S.qtype,grade:S.grade,subject:S.subject,src:S.src&&S.src.src};
  let d={}; try{d=await api('/quiz/create',body,240000)}catch(e){d={error:'net'}}
  stopT();
  if(d.error==='balance'){(cross?openCross:open)(); toast('💳',L('noBal',{x:money(d.price)})); if(typeof openTopup==='function') openTopup(d.need||d.price); return}
  if(!d.ok){toast('⚠️',d.error==='limit'?L('limit'):d.error==='admin'?L('expired'):d.refund?L('failRef',{x:money(d.refund)}):L('fail'));(cross?openCross:open)();return}
  if(typeof d.balance==='number'&&typeof BALANCE!=='undefined'){BALANCE=d.balance; try{renderWallet()}catch(e){}}
  if(d.price>0) toast('✅',L('paid',{x:money(d.price)}));
  else if(typeof SRV!=='undefined'&&SRV&&SRV.quiz_left!=null){SRV.quiz_left=Math.max(0,SRV.quiz_left-1);toast('🧪',L('trialLeft',{n:SRV.quiz_left}))}
  hap('ok'); S.src=null; ready(d.code);
}

/* ---------- Tayyor (muallif) ---------- */
async function load(code){
  let d={}; try{d=await api('/quiz/get',{code},20000)}catch(e){}
  if(!d.ok){toast('⚠️',d.error==='notfound'?L('notFound'):L('loadErr'));return null}
  S.quiz=d.quiz; S.code=code; return d.quiz;
}
async function ready(code){
  const q=await load(code); if(!q) return open();
  const n=q.kind==='cross'?q.data.words.length:q.data.questions.length, link=linkOf(code);
  const m=(q.data.meta||{});
  view(`<button class="back" onclick="${q.kind==='cross'?'QZ.openCross()':'QZ.open()'}">${L('back')}</button>
  <div class="qz-ok">✓</div>
  <div class="qz-title">${esc(q.data.title||q.topic)}</div>
  <div class="qz-chips"><span>${L(q.kind==='cross'?'nW':'nq',{n})}</span><span>${LV(q.level)}</span><span>${LN(q.lang)}</span>${q.kind==='test'?`<span>${L(q.aud==='class'?'cls':'self')}</span>`:''}${m.qtype?`<span>${QTNx(m.qtype)}</span>`:''}${m.grade?`<span>${esc(m.grade)}</span>`:''}${m.subject?`<span>${esc(m.subject)}</span>`:''}${m.src?`<span>📎 ${esc(m.src)}</span>`:''}</div>
  <div class="group" style="margin-top:0">${L(q.kind==='cross'?'linkC':'linkT')}</div>
  <div class="qz-link"><span>${esc(link.replace('https://',''))}</span><button type="button" onclick="QZ.copy()">${L('copy')}</button></div>
  <div class="qz-hint" style="text-align:left">${L('linkHint')}</div>
  <div class="qz-2"><button type="button" class="qz-btn pri" onclick="QZ.share()">${L('share')}</button><button type="button" class="qz-btn" onclick="QZ.start()">${L('selfSolve')}</button></div>
  <div class="qz-list" style="margin-top:14px">
    ${q.kind==='test'?`<button type="button" class="qz-item" onclick="QZ.questions()"><span class="ic">✏️</span><span class="tx"><b>${L('editQ')}</b><small>${L('editQD')}</small></span><span>›</span></button>`:''}
    <button type="button" class="qz-item" onclick="QZ.results()"><span class="ic">📊</span><span class="tx"><b>${L('results')}</b><small>${q.done?L('solvedN',{n:q.done}):L('noOne')}</small></span><span>›</span></button>
    ${q.kind==='test'?`<button type="button" class="qz-item" id="qzPrint" onclick="QZ.print()"><span class="ic">🖨</span><span class="tx"><b>${L('printT')}</b><small>${L('printD')}</small></span><span>›</span></button>`
      :`<div class="qz-item" style="opacity:.55"><span class="ic">🖨</span><span class="tx"><b>${L('printC')}</b><small>${L('printCD')}</small></span></div>`}
  </div>`);
}
function copy(){
  const l=linkOf(S.code);
  try{navigator.clipboard.writeText(l).then(()=>toast('📋',L('copied')),()=>toast('📋',l))}catch(e){toast('📋',l)}
}
function share(){
  const q=S.quiz, l=linkOf(S.code);
  const txt=L(q.kind==='cross'?'shareC':'shareT',{t:q.data.title||q.topic});
  const u='https://t.me/share/url?url='+encodeURIComponent(l)+'&text='+encodeURIComponent(txt);
  try{tg&&tg.openTelegramLink?tg.openTelegramLink(u):window.open(u,'_blank')}catch(e){window.open(u,'_blank')}
}
function questions(){
  const q=S.quiz;
  view(`<button class="back" onclick="QZ.ready('${S.code}')">${L('back')}</button>
  <div class="qz-head"><h1 style="font-size:20px">${L('qsTitle',{n:q.data.questions.length})}</h1></div>
  ${q.data.questions.map((x,i)=>`<div class="qz-qi"><small style="color:var(--muted);font-size:11.5px;font-weight:700">${QTNx(x.t||'mc').toUpperCase()}</small><h3>${i+1}. ${esc(x.q)}</h3>${x.t==='open'?`<ol><li class="ok">${x.ans.map(esc).join(' / ')}</li></ol>`:`<ol type="A">${x.o.map((o,j)=>`<li class="${j===x.a?'ok':''}">${esc(o)}</li>`).join('')}</ol>`}
  <button type="button" class="del" onclick="QZ.del(${i},this)">${L('delQ')}</button></div>`).join('')}`);
}
async function del(i,btn){
  if(!btn.dataset.sure){btn.dataset.sure=1;btn.textContent=L('sure');return}
  const d=await api('/quiz/edit',{code:S.code,del:i},15000).catch(()=>({}));
  if(!d.ok){toast('⚠️',L('delErr'));return}
  await load(S.code); questions(); toast('🗑',L('deleted'));
}

async function print(){
  const b=$('qzPrint'); if(b.dataset.busy) return; b.dataset.busy=1; hap();
  b.querySelector('small').textContent=L('preparing');
  const d=await api('/quiz/print',{code:S.code},120000).catch(()=>({}));
  delete b.dataset.busy;
  b.querySelector('small').textContent=d.ok?L('printed'):L('printD');
  toast(d.ok?'🖨':'⚠️',d.ok?L('printedT'):L('prepErr'));
}

/* ---------- Taklif (havola orqali kelgan) ---------- */
async function join(code){
  view('<div class="qz-load"><div class="qz-spin"></div></div>');
  const q=await load(code); if(!q){show('home');return}
  const n=q.kind==='cross'?q.data.words.length:q.data.questions.length;
  const nm=userName||(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.first_name)||'';
  view(`<div style="text-align:center;margin:10px 0 18px"><div class="qz-tag" style="display:inline-block">TadrisAI</div></div>
  <div style="text-align:center;color:var(--muted);font-size:14px">${L(q.kind==='cross'?'invC':'invT')}</div>
  <div class="qz-title" style="margin:8px 0 18px">${esc(q.data.title||q.topic)}</div>
  <div class="qz-stats">${q.kind==='cross'?`<div><b>${n}</b><small>${L('words')}</small></div><div><b>~${Math.max(3,Math.round(n*0.8))}</b><small>${L('minutes')}</small></div><div><b>💡</b><small>${L('hintAv')}</small></div>`
    :`<div><b>${n}</b><small>${L('qs')}</small></div><div><b>~${Math.max(2,Math.round(n*0.5))}</b><small>${L('minutes')}</small></div><div><b>30 ${L('sec')}</b><small>${L('perQ')}</small></div>`}</div>
  ${q.author?`<div class="qz-item" style="margin-bottom:14px"><span class="qz-av">${esc(q.author[0]||'?')}</span><span class="tx"><small>${L('author')}</small><b>${esc(q.author)}</b></span></div>`:''}
  ${q.exam?`<div class="qz-warn" style="margin-top:0"><b>${L('examT')}</b><p>${L('examD')}</p></div>`:''}
  ${q.prev?`<div class="qz-card" style="text-align:center"><b>${L('prevSolved',{at:esc(q.prev.at)})}</b><div class="qz-title" style="margin-top:6px">${q.prev.score} / ${q.prev.total}</div><div class="qz-hint">${L('noRetake')}</div></div>
  <button type="button" class="cta" onclick="show('home')">${L('openApp')}</button>`:`
  <div class="group" style="margin-top:4px">${L('yourName')}</div>
  <input class="qz-in" id="qzName" maxlength="40" value="${esc(nm)}" placeholder="${L('namePh')}">
  <div class="qz-hint" style="text-align:left">${L('nameHint')}</div>
  <button type="button" class="cta" onclick="QZ.start(1)">${L('start')}</button>
  <div class="qz-hint">${L('freeNoReg')}</div>`}`);
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
  if(x.t==='open') body=`<input class="qz-in" id="qzAns" maxlength="80" autocomplete="off" placeholder="${L('ansPh')}" onkeydown="if(event.key==='Enter')QZ.answer()">
    <div class="qz-2"><button type="button" class="qz-btn" onclick="QZ.answer(1)">${L('dunno')}</button><button type="button" class="qz-btn pri" onclick="QZ.answer()">${L('answer')}</button></div>`;
  else body=`<div class="qz-opts${x.t==='tf'?' tf':''}">${x.o.map((o,j)=>`<button type="button" class="qz-opt" data-j="${j}" onclick="QZ.pick(${j})"><span class="k">${x.t==='tf'?(j?'✕':'✓'):'ABCD'[j]}</span><span>${esc(o)}</span><span class="lb"></span></button>`).join('')}</div>`;
  view(`<div class="qz-top"><button type="button" class="qz-x" onclick="QZ.quit()" aria-label="${L('close')}">✕</button>
    <div class="qz-prog"><b>${P.i+1} / ${tot}</b><small>${P.exam?L('examT'):P.streak>=2?L('streak',{n:P.streak}):(P.retry?L('retryMode'):'&nbsp;')}</small><div class="qz-bar"><i style="width:${P.i/tot*100}%"></i></div></div>
    <div class="qz-tm" id="qzTm"><span id="qzTs">${T}</span></div></div>
  <div class="qz-q"><small>${L('qN',{n:k+1})}${x.t==='tf'?L('tfQ'):x.t==='open'?L('openQ'):''}</small><h2>${esc(x.q)}</h2></div>
  ${body}
  <div id="qzAfter"><div class="qz-note">${P.exam?L(x.t==='open'?'noteExamOpen':'noteExamPick'):L(x.t==='open'?'noteOpen':'notePick')}</div></div>`);
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
    if(last){$('qzAfter').innerHTML=`<div class="qz-note">${skip===2?L('timeUp'):''}${L('lastQ')}</div><button type="button" class="cta" onclick="QZ.finish()">${L('finish')}</button>`; return}
    $('qzAfter').innerHTML=`<div class="qz-note">${skip===2?L('timeNext'):L('accepted')}</div>`;
    setTimeout(next, skip===2?900:550); return;
  }
  const q=S.quiz, k=P.order[P.i], x=q.data.questions[k], inp=$('qzAns'), v=inp?inp.value:'';
  const ok=!skip&&okOpen(v,x.ans);
  if(inp){inp.disabled=true; inp.style.borderColor=ok?'#10B981':'#EF4444'}
  document.querySelectorAll('#qz .qz-2 .qz-btn').forEach(b=>b.disabled=true);
  if(ok){P.score++;P.streak++;P.best=Math.max(P.best,P.streak);hap('ok')}
  else{if(!P.wrong.includes(k)) P.wrong.push(k); P.streak=0; hap('err')}
  const last=P.i+1>=P.order.length;
  $('qzAfter').innerHTML=`<div class="qz-why" style="${ok?'background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.4)':''}"><b style="${ok?'color:#10B981':''}">${ok?L('okBang'):skip===2?L('timeIs'):skip?L('correctIs'):L('wrongIs')}${ok?'':esc(x.ans[0])}</b>${x.e?`<p>${esc(x.e)}</p>`:''}</div>
    <button type="button" class="cta" onclick="QZ.next()">${L(last?'seeRes':'nextQ')}</button>`;
}
function pick(j){
  if(P.locked===P.i) return; P.locked=P.i; stopT();
  if(P.exam){                                  // sinf testi: tanlov qotadi, to'g'ri-xatoligi ko'rsatilmaydi, keyingisiga o'tiladi
    const k=P.order[P.i]; P.ans[k]=j; hap();
    document.querySelectorAll('.qz-opt').forEach(b=>{const n=+b.dataset.j; b.disabled=true; b.classList.add(n===j?'sel':'dim')});
    const last=P.i+1>=P.order.length;
    if(last){$('qzAfter').innerHTML=`<div class="qz-note">${j<0?L('timeUp'):''}${L('lastQ')}</div><button type="button" class="cta" onclick="QZ.finish()">${L('finish')}</button>`; return}
    $('qzAfter').innerHTML=`<div class="qz-note">${j<0?L('timeNext'):L('accepted')}</div>`;
    setTimeout(next, j<0?900:550); return;
  }
  const q=S.quiz, k=P.order[P.i], x=q.data.questions[k], ok=j===x.a;
  document.querySelectorAll('.qz-opt').forEach(b=>{const n=+b.dataset.j; b.disabled=true;
    if(n===x.a){b.classList.add('good');b.querySelector('.lb').textContent=L('right')}
    else if(n===j){b.classList.add('bad');b.querySelector('.lb').textContent=L('yours')}
    else b.classList.add('dim')});
  if(ok){P.score++;P.streak++;P.best=Math.max(P.best,P.streak);hap('ok')}
  else{if(!P.wrong.includes(k)) P.wrong.push(k); P.streak=0; hap('err')}
  const last=P.i+1>=P.order.length;
  $('qzAfter').innerHTML=`${x.e?`<div class="qz-why"><b>${j<0?L('timeUp'):''}${L('why')}</b><p>${esc(x.e)}</p></div>`:(j<0?`<div class="qz-note">${L('timeOnly')}</div>`:'')}
    <button type="button" class="cta" onclick="QZ.next()">${L(last?'seeRes':'nextQ')}</button>`;
  setTimeout(()=>{const b=document.querySelector('#qzAfter .cta'); b&&b.scrollIntoView({behavior:'smooth',block:'nearest'})},60);
}
function next(){P.i++; if(P.i>=P.order.length) finish(); else ask()}
function quit(){
  if(P&&P.exam){askQuit(()=>finish(true),L('quitExam'));return}
  if(!P||!P.i){S.quiz&&S.quiz.mine?ready(S.code):show('home');return}
  askQuit(()=>finish(true));
}
function askQuit(cb,msg){                   // Telegram'ning o'z oynasi (brauzer confirm Telegram ichida bloklanishi mumkin)
  const m=msg||L('quitAsk');
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
  const msg=L(pct>=85?'great':pct>=60?'good':pct>=40?'okRes':'badRes');
  view(`<div class="qz-ring" style="--p:${pct}%"><div><b>${pct}%</b><small>${P.score} / ${tot}</small></div></div>
  <div class="qz-title">${msg}</div>
  <div style="text-align:center;color:var(--muted);font-size:14px;margin-top:4px">${esc(q.data.title||q.topic)}</div>
  <div class="qz-stats"><div><b>${mmss(secs)}</b><small>${L('time')}</small></div><div><b>${P.best}</b><small>${L('streakS')}</small></div>
    <div><b>${rank?L('place',{n:rank[0]}):'—'}</b><small>${rank?L('ofN',{n:rank[1]}):(P.retry?L('retryS'):'')}</small></div></div>
  ${P.wrong.length?`<button type="button" class="cta" onclick="QZ.retry()">${L('retryN',{n:P.wrong.length})}</button>`:''}
  <div class="qz-2"><button type="button" class="qz-btn" onclick="QZ.shareRes(${pct})">${L('shareRes')}</button>
  <button type="button" class="qz-btn" onclick="${q.mine?`QZ.results()`:`show('home')`}">${q.mine?L('results'):L('openApp')}</button></div>
  ${q.mine?'':`<div class="qz-card" style="margin-top:14px;text-align:center"><b>${L('ownT')}</b><div class="qz-hint">${L('ownD')}</div></div>`}`);
}
async function finishExam(){
  const q=S.quiz, n=q.data.questions.length, secs=Math.round((Date.now()-P.t0)/1000);
  view(`<div class="qz-load"><div class="qz-spin"></div><b>${L('calc')}</b></div>`);
  const answers=[...Array(n)].map((_,i)=>P.ans[i]===undefined?(q.data.questions[i].t==='open'?'':-1):P.ans[i]);
  let d={}; for(let t=0;t<3&&!d.ok&&d.error!=='done';t++){d=await api('/quiz/submit',{code:S.code,name:P.name,secs,answers},20000).catch(()=>({}))}
  if(d.error==='done'){toast('ℹ️',L('already'));return join(S.code)}
  if(!d.ok){view(`<div class="qz-load"><b>${L('notSent')}</b><div class="qz-hint">${L('checkNet')}</div><button type="button" class="cta" onclick="QZ.finish()">${L('resend')}</button></div>`);return}
  const pct=Math.round(d.score/d.total*100);
  view(`<div class="qz-ring" style="--p:${pct}%"><div><b>${pct}%</b><small>${d.score} / ${d.total}</small></div></div>
  <div class="qz-title">${L('done')}</div>
  <div style="text-align:center;color:var(--muted);font-size:14px;margin-top:4px">${esc(q.data.title||q.topic)}</div>
  <div class="qz-stats"><div><b>${mmss(secs)}</b><small>${L('time')}</small></div><div><b>${d.score}</b><small>${L('correctN')}</small></div><div><b>${L('place',{n:d.rank})}</b><small>${L('ofN',{n:d.of})}</small></div></div>
  <div class="qz-card" style="text-align:center"><b>${L('sentT')}</b><div class="qz-hint">${L('teacherAnn')}</div></div>
  <button type="button" class="cta" onclick="show('home')">${L('openApp')}</button>`);
}
function retry(){
  const w=P.wrong.slice(); P={name:P.name,order:w,i:0,score:0,wrong:[],streak:0,best:0,t0:Date.now(),retry:true}; ask();
}
function shareRes(pct){
  const q=S.quiz, l=linkOf(S.code);
  const u='https://t.me/share/url?url='+encodeURIComponent(l)+'&text='+encodeURIComponent(L('shareMsg',{t:q.data.title||q.topic,p:pct}));
  try{tg&&tg.openTelegramLink?tg.openTelegramLink(u):window.open(u,'_blank')}catch(e){}
}

/* ---------- Natijalar (muallif) ---------- */
async function results(){
  const q=S.quiz;
  view('<div class="qz-load"><div class="qz-spin"></div></div>');
  const d=await api('/quiz/results',{code:S.code},20000).catch(()=>({}));
  if(!d.ok){toast('⚠️',L('loadErr'));return ready(S.code)}
  const rows=d.rows||[], n=rows.length;
  const avg=n?Math.round(rows.reduce((a,r)=>a+(r[2]?r[1]/r[2]:0),0)/n*100):0;
  const avgT=n?Math.round(rows.reduce((a,r)=>a+r[3],0)/n):0;
  const top=(d.miss||[])[0];
  let warn='';
  if(top&&q.kind==='test'&&q.data.questions[top[0]]){
    warn=`<div class="qz-warn"><b>${L('mostWrong',{n:top[0]+1})}</b><p>${L('mostWrongD',{q:esc(q.data.questions[top[0]].q),n,m:top[1]})}</p></div>`;
  }
  view(`<button class="back" onclick="QZ.ready('${S.code}')">${L('back')}</button>
  <div class="qz-head" style="flex-direction:column;align-items:flex-start;gap:2px"><h1 style="font-size:22px">${L('results')}</h1><small style="color:var(--muted)">${esc(q.data.title||q.topic)}</small></div>
  <div class="qz-stats"><div><b>${n}</b><small>${L('solved')}</small></div><div><b>${avg}%</b><small>${L('avg')}</small></div><div><b>${mmss(avgT)}</b><small>${L('avgT')}</small></div></div>
  ${warn}
  <div class="group">${L(q.kind==='cross'?'partic':'students')}</div>
  <div class="qz-card" style="padding:0">${n?rows.map((r,i)=>`<div class="qz-row"><span style="width:18px;color:var(--muted);font-weight:700">${i+1}</span><span class="qz-av">${esc((r[0]||'?')[0])}</span>
    <span style="flex:1;min-width:0"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r[0])}</b><small style="color:var(--muted)">${mmss(r[3])} · ${esc(r[4])}</small></span>
    <b style="color:${r[2]&&r[1]/r[2]>=.75?'#10B981':'#F59E0B'}">${r[1]}/${r[2]}</b></div>`).join(''):`<div class="qz-hint" style="padding:16px">${L('nobody')}</div>`}</div>`);
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
  view(`<div class="qz-top"><button type="button" class="qz-x" onclick="QZ.crossQuit()" aria-label="${L('close')}">✕</button>
    <div class="qz-prog"><b>${esc(g.title||S.quiz.topic)}</b><small>${L('foundW',{n:nf,m:g.words.length})} · <span id="qzCt">${mmss(Math.round((Date.now()-C.t0)/1000))}</span></small></div></div>
  <div class="qz-gwrap"><div class="qz-grid" style="grid-template-columns:repeat(${g.w},${sz}px)">${h}</div></div>
  <div class="qz-clue"><small>${w.n} · ${L(w.d==='a'?'across':'down')} · ${L('letters',{n:w.w.length})}</small><p>${esc(w.c)}</p></div>
  <div class="qz-2" style="margin-top:0"><button type="button" class="qz-btn" onclick="QZ.hint()">${L('hint1')}</button><button type="button" class="qz-btn pri" onclick="QZ.check()">${L('check')}</button></div>
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
  const n=S.quiz.data.words.filter((w,i)=>found(i)).length; toast(n===S.quiz.data.words.length?'🎉':'🔎',L('wordsOk',{n,m:S.quiz.data.words.length}));
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
  view(`<div class="qz-ring" style="--p:${pct}%"><div><b>${n}/${tot}</b><small>${L('words')}</small></div></div>
  <div class="qz-title">${L(n===tot?'allFound':'crossDone')}</div>
  <div class="qz-stats"><div><b>${mmss(secs)}</b><small>${L('time')}</small></div><div><b>${C.hints}</b><small>${L('hints')}</small></div><div><b>${d.ok?L('place',{n:d.rank}):'—'}</b><small>${d.ok?L('ofN',{n:d.of}):''}</small></div></div>
  <div class="group">${L('answers')}</div><div class="qz-card" style="padding:0">${g.words.map((w,i)=>`<div class="qz-row"><b style="width:38px;color:var(--chip-text)">${w.n} ${w.d==='a'?'→':'↓'}</b><span style="flex:1">${esc(w.w.split('').map(showCh).join(''))}</span><span>${found(i)?'✅':'❌'}</span></div>`).join('')}</div>
  <div class="qz-2"><button type="button" class="qz-btn" onclick="QZ.shareRes(${pct})">${L('shareS')}</button><button type="button" class="qz-btn" onclick="${S.quiz.mine?'QZ.results()':`show('home')`}">${S.quiz.mine?L('results'):L('openApp')}</button></div>`);
}

window.QZ={finish,example,exTab,print,open,openCross,setN,srcUp,srcDel,pickSel,setQ,answer,set,create,ready,copy,share,questions,del,join,start,pick,next,quit,retry,shareRes,results,tap,sel,hint,check,crossQuit};
if(qs.get('quiz')) join(qs.get('quiz'));
})();
