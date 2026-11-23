// TadrisAI · 3D anatomiya kutubxonasi (2026-11-23, 4-versiya).
// Modellar: Z-Anatomy (CC BY-SA 4.0) asosida, u esa BodyParts3D © DBCLS (CC BY 4.0) asosida. Matnlar — TadrisAI.
// Hammasi oldindan tayyorlangan: ishlatganda AI chaqirilmaydi.
import * as THREE from 'three';
import { OrbitControls } from '../atlas/OrbitControls.js';

const $ = id => document.getElementById(id);
const API = location.hostname === 'tadris.ai' ? '/api' : 'https://91-107-229-30.sslip.io/api';
const QS = new URLSearchParams(location.search);
const DEV = QS.get('dev') === '1' && location.hostname !== 'tadris.ai';
const V = '6';

// ------------------------------------------------------------------ matnlar
const TX = {
  uz: {back: '← TadrisAI', kick: 'Anatomiya kutubxonasi', badge: 'SINOV · faqat admin', title: 'Inson anatomiyasi 3D formatda',
    desc: "Haqiqiy anatomik modellar asosidagi atlaslar: har bir tuzilmani aylantiring, qatlamlarni oching, nomlarini to'rt tilda o'rganing va bilimingizni sinab ko'ring.",
    sAt: 'Atlaslar', sSt: 'Tuzilmalar', sLm: 'Anatomik belgilar', gq: "Butun anatomiya bo'yicha qidirish: o'zbekcha, ruscha, lotincha yoki inglizcha",
    resume: "To'xtagan joyingizdan davom eting", resumeB: 'Davom etish', seenOf: '{a} / {b} ta tuzilma ko\'rib chiqildi', lastSeen: 'Oxirgi: {n}',
    atlases: 'Atlaslar', atlasesS: "Har bir atlas — alohida 3D model. Tizimni tanlang va o'rganishni boshlang.", all: 'Barchasi',
    nSt: '{n} ta tuzilma', nLm: '{n} ta belgi', mb: '{n} MB', seenP: "{p}% ko'rib chiqildi", credit: '3D modellar: {c}. Modellar TadrisAI uchun soddalashtirilgan; matn va tarjimalar TadrisAI tomonidan yozilgan.',
    load: '3D model yuklanmoqda…', noGl: "Bu qurilma 3D ko'rinishni qo'llamaydi.", err: "Model yuklanmadi. Internetni tekshirib, qayta urinib ko'ring.",
    panel: 'Panel', tTree: 'Tuzilmalar', tLay: 'Qatlamlar', tInfo: "Ma'lumot", tLearn: "O'rganish",
    hint: 'Aylantirish uchun suring, kattalashtirish uchun g\'ildirak yoki ikki barmoq, tanlash uchun bosing, yaqinlashish uchun ikki marta bosing',
    home: "Boshlang'ich ko'rinish", view: "Ko'rinish", both: 'Ikkala tomonni birga tanlash', hideSel: 'Tanlanganni yashirish', iso: "Faqat tanlanganni ko'rsatish", showAll: "Yashirilganlarni ko'rsatish", xray: 'Rentgen rejimi', cut: 'Kesim', more: 'Boshqa amallar',
    vF: 'Old tomondan', vB: 'Orqa tomondan', vL: 'Chap tomondan', vR: "O'ng tomondan", vT: 'Yuqoridan', vD: 'Pastdan', vFit: "Butun modelni sig'dirish",
    cutD: "Modelni tekislik bilan kesib, ichki tuzilmalarni ko'ring.", cNone: "Yo'q", cAx: 'Aksial', cSag: 'Sagittal', cFr: 'Frontal', cPos: 'Tekislik holati', cFlip: "Qarama-qarshi tomonni ko'rsatish",
    mSel: 'Tanlangan tuzilma', mGroup: 'Uning guruhini ajratib ko\'rsatish', mFocus: 'Tanlanganga yaqinlashish', mLm: "Anatomik belgilarni ko'rsatish", mFull: "To'liq ekran", mKeys: 'Klaviatura: H — yashirish, I — ajratish, A — hammasini ko\'rsatish, F — yaqinlashish, X — rentgen, Esc — bekor qilish',
    together: "Yig'ilgan", apart: 'Ajratilgan', search: "Qidirish: o'zbekcha, lotincha…", openAll: 'Hammasini ochish', closeAll: "Yig'ish", stCount: '{n} ta tuzilma · {s} tasi ko\'rib chiqilgan',
    layers: 'Qatlamlar', opacity: 'Shaffoflik', solo: 'Faqat shu', reset: 'Tiklash', ctx: 'Suyaklar (fon)', insT: 'Mushaklar birikishi', insD: "Tanlangan suyakda yopishgan mushaklarning yoki tanlangan mushakning boshlanish va birikish joylari suyak yuzasida bo'yaladi.",
    insO: 'Boshlanish joyi', insE: 'Birikish joyi', lmT: 'Anatomik belgilar', lmD: "Tanlangan suyak yoki a'zodagi do'mboq, teshik, qirra kabi nomlangan belgilar nuqta bilan ko'rsatiladi.",
    pick: 'Tuzilmani tanlang', pickD: "Modeldagi tuzilmani bosing yoki ro'yxatdan qidiring — nomi, joylashuvi va bog'liq tuzilmalar shu yerda chiqadi.",
    nUz: "O'zbekcha", nRu: 'Ruscha', nLat: 'Lotincha', nEn: 'Inglizcha', paired: "juft (o'ng va chap)", single: 'toq', right: "o'ng", left: 'chap',
    aOnly: "Faqat shuni ko'rsatish", aHide: 'Yashirish', aFocus: 'Yaqinlashish', aAll: "Hammasini ko'rsatish", aPrez: '📊 Prezentatsiya', aTest: '✅ Test tuzish', aShare: '🔗 Ulashish', copied: 'Havola nusxalandi',
    lmL: 'Anatomik belgilar · {n}', onModel: "Modelda ko'rsatish", insFrom: 'Shu yerdan boshlanadi', insTo: 'Shu yerga birikadi', mOrig: 'Boshlanishi', mIns: 'Birikishi', related: "Shu guruhdagi tuzilmalar", other: 'Boshqa atlaslarda', noTr: 'Tarjima tayyorlanmoqda',
    res: 'Shu atlas bo\'yicha natijangiz', resD: '{a} tadan {b} ta tuzilma ko\'rib chiqildi', test: 'Test', testD: '{n} ta tuzilma orasidan 10 ta savol.',
    mFind: 'Toping', mFindD: 'Nomi berilgan tuzilmani modelda toping va ustiga bosing.', mPick: 'Nomini toping', mPickD: "Ajratib ko'rsatilgan tuzilmaning nomini 4 ta variantdan tanlang.",
    mType: 'Nomini yozing', mTypeD: "Ajratib ko'rsatilgan tuzilmaning nomini o'zingiz yozasiz.", mTf: "To'g'ri yoki noto'g'ri?", mTfD: '«Bu — …» degan gapni tekshirasiz.',
    deep: "Chuqur o'rganish", deepD: "Har bir tuzilma uch bosqichda: avval tanlaysiz, keyin harf yordami bilan yozasiz, oxirida yordamsiz yozasiz. Xato qilingani qayta chiqadi.", start: 'Boshlash',
    qn: '{i}-savol / {n} · ✓ {s}', qFind: 'Toping: {n}', qFindS: 'Modelda shu tuzilmani bosing', qWhat: 'Bu qaysi tuzilma?', qWhatS: "Ajratib ko'rsatilgan tuzilmaga qarang",
    ph: 'Nomini yozing…', check: 'Tekshirish', hint2: '💡 Yordam', dunno: 'Bilmayman', showAns: "Javobni ko'rsatish", qTf: 'Bu — {n}?', yes: "✓ To'g'ri", no: "✕ Noto'g'ri",
    ok: "✅ To'g'ri!", okIs: "✅ To'g'ri! Bu — {n}", bad: "❌ Noto'g'ri. To'g'ri javob: {n}", badTap: "❌ Bu — {n}. Yana urinib ko'ring", next: 'Keyingi ›', result: 'Natija', again: 'Qaytadan', other2: 'Boshqa rejim', mistakes: 'Xato qilinganlar:', great: "Zo'r! Hammasi to'g'ri 🎉",
    r1: '1-bosqich · tanlang', r2: '2-bosqich · yozing (yordam bilan)', r3: '3-bosqich · yordamsiz yozing', deepDone: "Barakalla! {n} ta tuzilma o'zlashtirildi 🎉", learned: "o'zlashtirilgan: {n}", nothing: "Hammasi o'zlashtirilgan. Qayta boshlash uchun natijani tozalang.", resetP: 'Natijani tozalash', exitQ: '✕ Testdan chiqish',
    lockT: 'Atlas tez orada', lockD: "Bu bo'lim hozircha sinovda. Tez orada hamma uchun ochiladi.", lockB: 'TadrisAI ga qaytish', topic: '{t} anatomiyasi'},
  ru: {back: '← TadrisAI', kick: 'Анатомическая библиотека', badge: 'ТЕСТ · только админ', title: 'Анатомия человека в 3D',
    desc: 'Атласы на основе реальных анатомических моделей: вращайте каждую структуру, открывайте слои, учите названия на четырёх языках и проверяйте себя.',
    sAt: 'Атласов', sSt: 'Структур', sLm: 'Анатомических ориентиров', gq: 'Поиск по всей анатомии: по-узбекски, по-русски, на латыни или по-английски',
    resume: 'Продолжите с того места, где остановились', resumeB: 'Продолжить', seenOf: 'Просмотрено {a} из {b} структур', lastSeen: 'Последнее: {n}',
    atlases: 'Атласы', atlasesS: 'Каждый атлас — отдельная 3D-модель. Выберите систему и начните изучение.', all: 'Все',
    nSt: '{n} структур', nLm: '{n} ориентиров', mb: '{n} МБ', seenP: 'Просмотрено {p}%', credit: '3D-модели: {c}. Модели упрощены для TadrisAI; тексты и переводы написаны TadrisAI.',
    load: 'Загружается 3D-модель…', noGl: 'Это устройство не поддерживает 3D.', err: 'Модель не загрузилась. Проверьте интернет и попробуйте снова.',
    panel: 'Панель', tTree: 'Структуры', tLay: 'Слои', tInfo: 'Сведения', tLearn: 'Обучение',
    hint: 'Тяните — вращение, колесо или два пальца — масштаб, нажмите — выбор, двойное нажатие — приблизить',
    home: 'Исходный вид', view: 'Вид', both: 'Выбирать обе стороны вместе', hideSel: 'Скрыть выбранное', iso: 'Показать только выбранное', showAll: 'Показать скрытые', xray: 'Режим рентгена', cut: 'Срез', more: 'Другие действия',
    vF: 'Спереди', vB: 'Сзади', vL: 'Слева', vR: 'Справа', vT: 'Сверху', vD: 'Снизу', vFit: 'Вместить всю модель',
    cutD: 'Разрежьте модель плоскостью и рассмотрите внутренние структуры.', cNone: 'Нет', cAx: 'Аксиальный', cSag: 'Сагиттальный', cFr: 'Фронтальный', cPos: 'Положение плоскости', cFlip: 'Показать противоположную сторону',
    mSel: 'Выбранная структура', mGroup: 'Выделить её группу', mFocus: 'Приблизить выбранное', mLm: 'Показывать анатомические ориентиры', mFull: 'Во весь экран', mKeys: 'Клавиши: H — скрыть, I — изолировать, A — показать всё, F — приблизить, X — рентген, Esc — отмена',
    together: 'Собрано', apart: 'Разобрано', search: 'Поиск: по-русски, на латыни…', openAll: 'Раскрыть всё', closeAll: 'Свернуть', stCount: '{n} структур · просмотрено {s}',
    layers: 'Слои', opacity: 'Прозрачность', solo: 'Только этот', reset: 'Сбросить', ctx: 'Кости (фон)', insT: 'Прикрепление мышц', insD: 'На поверхности кости окрашиваются места начала и прикрепления мышц выбранной кости или выбранной мышцы.',
    insO: 'Место начала', insE: 'Место прикрепления', lmT: 'Анатомические ориентиры', lmD: 'Точками отмечаются названные ориентиры выбранной кости или органа: бугры, отверстия, гребни.',
    pick: 'Выберите структуру', pickD: 'Нажмите на структуру в модели или найдите её в списке — здесь появятся название, расположение и связанные структуры.',
    nUz: 'Узбекский', nRu: 'Русский', nLat: 'Латынь', nEn: 'Английский', paired: 'парная (правая и левая)', single: 'непарная', right: 'правая', left: 'левая',
    aOnly: 'Показать только её', aHide: 'Скрыть', aFocus: 'Приблизить', aAll: 'Показать всё', aPrez: '📊 Презентация', aTest: '✅ Составить тест', aShare: '🔗 Поделиться', copied: 'Ссылка скопирована',
    lmL: 'Анатомические ориентиры · {n}', onModel: 'Показать на модели', insFrom: 'Здесь начинаются', insTo: 'Здесь прикрепляются', mOrig: 'Начало', mIns: 'Прикрепление', related: 'Структуры этой группы', other: 'В других атласах', noTr: 'Перевод готовится',
    res: 'Ваш результат по этому атласу', resD: 'Просмотрено {b} из {a} структур', test: 'Тест', testD: '10 вопросов из {n} структур.',
    mFind: 'Найдите', mFindD: 'Найдите названную структуру на модели и нажмите на неё.', mPick: 'Выберите название', mPickD: 'Выберите название выделенной структуры из 4 вариантов.',
    mType: 'Напишите название', mTypeD: 'Напишите название выделенной структуры сами.', mTf: 'Верно или нет?', mTfD: 'Проверьте утверждение «Это — …».',
    deep: 'Глубокое изучение', deepD: 'Каждая структура в три шага: выбор, ввод с подсказкой букв, ввод без подсказки. Ошибочные повторяются.', start: 'Начать',
    qn: 'Вопрос {i} / {n} · ✓ {s}', qFind: 'Найдите: {n}', qFindS: 'Нажмите на эту структуру в модели', qWhat: 'Что это за структура?', qWhatS: 'Посмотрите на выделенную структуру',
    ph: 'Напишите название…', check: 'Проверить', hint2: '💡 Подсказка', dunno: 'Не знаю', showAns: 'Показать ответ', qTf: 'Это — {n}?', yes: '✓ Верно', no: '✕ Неверно',
    ok: '✅ Верно!', okIs: '✅ Верно! Это — {n}', bad: '❌ Неверно. Правильный ответ: {n}', badTap: '❌ Это — {n}. Попробуйте ещё', next: 'Дальше ›', result: 'Результат', again: 'Ещё раз', other2: 'Другой режим', mistakes: 'Ошибки:', great: 'Отлично! Всё верно 🎉',
    r1: 'Шаг 1 · выберите', r2: 'Шаг 2 · напишите (с подсказкой)', r3: 'Шаг 3 · без подсказки', deepDone: 'Молодец! Изучено структур: {n} 🎉', learned: 'изучено: {n}', nothing: 'Всё изучено. Сбросьте прогресс, чтобы начать заново.', resetP: 'Сбросить прогресс', exitQ: '✕ Выйти из теста',
    lockT: 'Атлас скоро', lockD: 'Раздел пока тестируется и скоро откроется для всех.', lockB: 'Вернуться в TadrisAI', topic: 'Анатомия: {t}'},
  en: {back: '← TadrisAI', kick: 'Anatomy library', badge: 'TEST · admin only', title: 'Human anatomy in 3D',
    desc: 'Atlases built from real anatomical models: rotate every structure, peel back layers, learn names in four languages and test yourself.',
    sAt: 'Atlases', sSt: 'Structures', sLm: 'Landmarks', gq: 'Search all of anatomy: Uzbek, Russian, Latin or English',
    resume: 'Pick up where you left off', resumeB: 'Continue', seenOf: '{a} of {b} structures viewed', lastSeen: 'Last: {n}',
    atlases: 'Atlases', atlasesS: 'Each atlas is its own 3D model. Pick a system and start learning.', all: 'All',
    nSt: '{n} structures', nLm: '{n} landmarks', mb: '{n} MB', seenP: '{p}% viewed', credit: '3D models: {c}. Models simplified for TadrisAI; texts and translations written by TadrisAI.',
    load: 'Loading 3D model…', noGl: "This device doesn't support 3D.", err: "The model didn't load. Check your connection and try again.",
    panel: 'Panel', tTree: 'Structures', tLay: 'Layers', tInfo: 'Info', tLearn: 'Learn',
    hint: 'Drag to rotate, wheel or pinch to zoom, tap to select, double-tap to zoom in',
    home: 'Default view', view: 'View', both: 'Select both sides together', hideSel: 'Hide selected', iso: 'Show only selected', showAll: 'Show hidden', xray: 'X-ray mode', cut: 'Section', more: 'More actions',
    vF: 'Front', vB: 'Back', vL: 'Left', vR: 'Right', vT: 'Top', vD: 'Bottom', vFit: 'Fit whole model',
    cutD: 'Cut the model with a plane to see inner structures.', cNone: 'None', cAx: 'Axial', cSag: 'Sagittal', cFr: 'Frontal', cPos: 'Plane position', cFlip: 'Show the opposite side',
    mSel: 'Selected structure', mGroup: 'Highlight its group', mFocus: 'Zoom to selected', mLm: 'Show landmarks', mFull: 'Full screen', mKeys: 'Keys: H — hide, I — isolate, A — show all, F — focus, X — X-ray, Esc — clear',
    together: 'Together', apart: 'Apart', search: 'Search: English, Latin…', openAll: 'Expand all', closeAll: 'Collapse', stCount: '{n} structures · {s} viewed',
    layers: 'Layers', opacity: 'Opacity', solo: 'Solo', reset: 'Reset', ctx: 'Bones (background)', insT: 'Muscle attachments', insD: 'Origins and insertions of muscles on the selected bone, or of the selected muscle, are painted on the bone surface.',
    insO: 'Origin', insE: 'Insertion', lmT: 'Landmarks', lmD: 'Named landmarks of the selected bone or organ — tubercles, foramina, ridges — are shown as dots.',
    pick: 'Select a structure', pickD: 'Tap a structure on the model or search the list — its name, position and related structures appear here.',
    nUz: 'Uzbek', nRu: 'Russian', nLat: 'Latin', nEn: 'English', paired: 'paired (right and left)', single: 'single', right: 'right', left: 'left',
    aOnly: 'Show only this', aHide: 'Hide', aFocus: 'Zoom in', aAll: 'Show all', aPrez: '📊 Presentation', aTest: '✅ Make a test', aShare: '🔗 Share', copied: 'Link copied',
    lmL: 'Landmarks · {n}', onModel: 'Show on model', insFrom: 'Muscles that start here', insTo: 'Muscles that attach here', mOrig: 'Origin', mIns: 'Insertion', related: 'In the same group', other: 'In other atlases', noTr: 'Translation in progress',
    res: 'Your progress in this atlas', resD: '{b} of {a} structures viewed', test: 'Test', testD: '10 questions from {n} structures.',
    mFind: 'Find it', mFindD: 'Find the named structure on the model and tap it.', mPick: 'Pick the name', mPickD: 'Choose the highlighted structure\'s name from 4 options.',
    mType: 'Type the name', mTypeD: 'Type the highlighted structure\'s name yourself.', mTf: 'True or false?', mTfD: 'Check the statement "This is …".',
    deep: 'Deep learning', deepD: 'Each structure in three steps: choose, type with letter hints, type with no hints. Misses come back.', start: 'Start',
    qn: 'Question {i} / {n} · ✓ {s}', qFind: 'Find: {n}', qFindS: 'Tap this structure on the model', qWhat: 'Which structure is this?', qWhatS: 'Look at the highlighted structure',
    ph: 'Type the name…', check: 'Check', hint2: '💡 Hint', dunno: "Don't know", showAns: 'Show answer', qTf: 'Is this the {n}?', yes: '✓ True', no: '✕ False',
    ok: '✅ Correct!', okIs: '✅ Correct! This is the {n}', bad: '❌ Wrong. Correct answer: {n}', badTap: '❌ That is the {n}. Try again', next: 'Next ›', result: 'Result', again: 'Again', other2: 'Another mode', mistakes: 'Mistakes:', great: 'Great! All correct 🎉',
    r1: 'Step 1 · choose', r2: 'Step 2 · type (with hints)', r3: 'Step 3 · no hints', deepDone: 'Well done! {n} structures learned 🎉', learned: 'learned: {n}', nothing: 'Everything is learned. Reset progress to start over.', resetP: 'Reset progress', exitQ: '✕ Leave test',
    lockT: 'Atlas coming soon', lockD: 'This section is being tested and will open for everyone soon.', lockB: 'Back to TadrisAI', topic: '{t} anatomy'},
};

// --- TadrisAI'ning o'z so'zlari (boshqa saytlardagi yozuvlar ishlatilmaydi)
Object.assign(TX.uz, {kick: '3D anatomiya', title: "Tanani qatlamma-qatlam o'rganing", desc: "Suyakdan nervgacha — har bir qismni aylantirib ko'ring, nomini o'zbek, rus, lotin va ingliz tilida bilib oling, keyin mashqda mustahkamlang.",
  sLm: 'Suyak belgilari', gq: 'Istalgan qismni toping: son suyagi, aorta, n. vagus…', resume: 'Oxirgi ochganingiz', resumeB: 'Ochish', seenOf: '{a} / {b} qism ochilgan',
  atlasesS: 'Har biri alohida model — kerakli tizimni tanlang.', nSt: '{n} qism', nLm: '{n} belgi', seenP: 'Ochilgan: {p}%',
  tTree: "Ro'yxat", tLay: 'Tizimlar', tInfo: 'Batafsil', tLearn: 'Mashq', hint: "Suring — aylanadi · g'ildirak yoki ikki barmoq — yaqinlashadi · bosing — tanlanadi",
  home: 'Boshiga qaytarish', view: 'Tomonlar', both: 'Juftini birga belgilash', hideSel: 'Yashirish', iso: "Yolg'iz qoldirish", showAll: 'Hammasini qaytarish', xray: 'Shaffof rejim', cut: 'Kesib ko\'rish', more: 'Yana',
  vF: 'Old', vB: 'Orqa', vL: 'Chap yon', vR: "O'ng yon", vT: 'Tepa', vD: 'Past', vFit: "Ekranga sig'dirish", cutD: 'Tekislikni surib, ichini oching.', cPos: 'Chuqurlik', cFlip: 'Teskari tomonni qoldirish',
  mSel: 'Tanlangan qism', mGroup: "Guruhini yolg'iz qoldirish", mFocus: "Yaqindan ko'rish", mLm: "Belgilarni ko'rsatish", mFull: 'Butun ekran', mKeys: "Tugmalar: H yashirish · I yolg'iz · A qaytarish · F yaqinlash · X shaffof · Esc bekor",
  together: 'Butun', apart: 'Ajratilgan', grid: 'Qatorga terish', search: "Ro'yxatdan qidirish…", openAll: 'Ochish', closeAll: 'Yopish', stCount: '{n} ta · {s} tasi ochilgan',
  layers: 'Tizimlar', opacity: "Ko'rinish darajasi", solo: "Yolg'iz", reset: 'Asliga', ctx: 'Skelet (orqa fon)', insT: 'Mushak yopishgan joylar', insD: "Suyak tanlansa — unga yopishgan mushaklar joyi, mushak tanlansa — uning suyakdagi izlari bo'yaladi.",
  insO: 'Boshlanadi', insE: 'Yopishadi', lmT: 'Suyak belgilari', lmD: "Tanlangan suyak yoki a'zoning nomli nuqtalari: do'mboq, teshik, qirra va boshqalar.",
  pick: 'Hali hech narsa tanlanmagan', pickD: 'Modeldan biror qismni bosing yoki ro\'yxatdan toping.', aOnly: "Yolg'iz qoldirish", aHide: 'Yashirish', aFocus: 'Yaqindan', aAll: 'Hammasi',
  lmL: 'Belgilar · {n}', insFrom: 'Bu suyakdan boshlanadi', insTo: 'Bu suyakka yopishadi', mOrig: 'Qayerdan boshlanadi', mIns: 'Qayerga yopishadi', related: 'Yonidagilar', other: 'Yana qayerda bor',
  res: 'Natijangiz', resD: '{a} tadan {b} tasini ochdingiz', test: 'Tez test', testD: '10 ta savol, {n} ta qism ichidan.', mFind: 'Modeldan top', mFindD: 'Nomi chiqadi — siz uni modelda bosasiz.',
  mPick: "4 tadan biri", mPickD: "Bo'yalgan qismning nomini to'rt variantdan tanlaysiz.", mType: "O'zing yoz", mTypeD: "Bo'yalgan qismning nomini o'zingiz yozasiz.", mTf: "Ha yoki yo'q", mTfD: "«Bu — …» degan gap to'g'rimi?",
  hqLoad: 'Yuqori sifat yuklanmoqda…', deep: 'Yodlash rejimi', paired: "juft (o'ng va chap)", noTr: "O'zbekcha nomi tez orada qo'shiladi"});
Object.assign(TX.ru, {kick: '3D-анатомия', title: 'Изучайте тело слой за слоем', desc: 'От костей до нервов — вращайте каждую часть, узнайте её название на узбекском, русском, латыни и английском и закрепите в упражнениях.',
  sLm: 'Ориентиров на костях', gq: 'Найдите любую часть: бедренная кость, аорта, n. vagus…', resume: 'Вы открывали последним', resumeB: 'Открыть', seenOf: 'Открыто {a} из {b}',
  atlasesS: 'Каждый — отдельная модель: выберите нужную систему.', nSt: '{n} частей', nLm: '{n} ориентиров', seenP: 'Открыто: {p}%',
  tTree: 'Список', tLay: 'Системы', tInfo: 'Подробно', tLearn: 'Упражнения', hint: 'Тяните — вращение · колесо или два пальца — приблизить · нажмите — выбрать',
  home: 'В начало', view: 'Стороны', both: 'Отмечать пару вместе', hideSel: 'Скрыть', iso: 'Оставить одну', showAll: 'Вернуть всё', xray: 'Прозрачный режим', cut: 'Разрез', more: 'Ещё',
  vF: 'Спереди', vB: 'Сзади', vL: 'Слева', vR: 'Справа', vT: 'Сверху', vD: 'Снизу', vFit: 'Вписать в экран', cutD: 'Двигайте плоскость и заглядывайте внутрь.', cPos: 'Глубина', cFlip: 'Оставить другую сторону',
  mSel: 'Выбранная часть', mGroup: 'Оставить её группу', mFocus: 'Рассмотреть ближе', mLm: 'Показывать ориентиры', mFull: 'На весь экран', mKeys: 'Клавиши: H скрыть · I оставить · A вернуть · F приблизить · X прозрачно · Esc отмена',
  together: 'Целиком', apart: 'Раздвинуто', grid: 'Разложить рядами', search: 'Поиск по списку…', openAll: 'Раскрыть', closeAll: 'Свернуть', stCount: '{n} · открыто {s}',
  layers: 'Системы', opacity: 'Видимость', solo: 'Одна', reset: 'Как было', ctx: 'Скелет (фон)', insT: 'Где крепятся мышцы', insD: 'Выбрана кость — окрашиваются места крепления её мышц; выбрана мышца — её следы на костях.',
  insO: 'Начинается', insE: 'Крепится', lmT: 'Ориентиры на костях', lmD: 'Названные точки выбранной кости или органа: бугры, отверстия, гребни и другие.',
  pick: 'Пока ничего не выбрано', pickD: 'Нажмите на часть модели или найдите её в списке.', aOnly: 'Оставить одну', aHide: 'Скрыть', aFocus: 'Ближе', aAll: 'Всё',
  lmL: 'Ориентиры · {n}', insFrom: 'Начинаются от этой кости', insTo: 'Крепятся к этой кости', mOrig: 'Откуда начинается', mIns: 'Куда крепится', related: 'Рядом', other: 'Где ещё есть',
  res: 'Ваш результат', resD: 'Открыто {b} из {a}', test: 'Быстрый тест', testD: '10 вопросов из {n} частей.', mFind: 'Найди на модели', mFindD: 'Появится название — нажмите эту часть на модели.',
  mPick: 'Один из четырёх', mPickD: 'Выберите название окрашенной части из четырёх.', mType: 'Напиши сам', mTypeD: 'Напишите название окрашенной части.', mTf: 'Да или нет', mTfD: 'Верно ли «Это — …»?',
  hqLoad: 'Загружается высокое качество…', deep: 'Режим запоминания', noTr: 'Перевод скоро появится'});
Object.assign(TX.en, {kick: '3D anatomy', title: 'Learn the body layer by layer', desc: 'From bones to nerves — spin every part, learn its name in Uzbek, Russian, Latin and English, then lock it in with practice.',
  sLm: 'Bone landmarks', gq: 'Find any part: femur, aorta, vagus nerve…', resume: 'You last opened', resumeB: 'Open', seenOf: '{a} of {b} opened',
  atlasesS: 'Each one is its own model — pick the system you need.', nSt: '{n} parts', nLm: '{n} landmarks', seenP: 'Opened: {p}%',
  tTree: 'List', tLay: 'Systems', tInfo: 'Details', tLearn: 'Practice', hint: 'Drag to spin · wheel or pinch to zoom · tap to pick',
  home: 'Back to start', view: 'Sides', both: 'Mark the pair together', hideSel: 'Hide', iso: 'Keep only this', showAll: 'Bring all back', xray: 'See-through', cut: 'Cut open', more: 'More',
  vF: 'Front', vB: 'Back', vL: 'Left', vR: 'Right', vT: 'Top', vD: 'Bottom', vFit: 'Fit to screen', cutD: 'Slide the plane to look inside.', cPos: 'Depth', cFlip: 'Keep the other side',
  mSel: 'Selected part', mGroup: 'Keep only its group', mFocus: 'Look closer', mLm: 'Show landmarks', mFull: 'Full screen', mKeys: 'Keys: H hide · I keep · A bring back · F zoom · X see-through · Esc clear',
  together: 'Whole', apart: 'Apart', grid: 'Lay out in rows', search: 'Search the list…', openAll: 'Expand', closeAll: 'Collapse', stCount: '{n} · {s} opened',
  layers: 'Systems', opacity: 'Visibility', solo: 'Only', reset: 'Reset', ctx: 'Skeleton (background)', insT: 'Where muscles attach', insD: 'Pick a bone to paint where its muscles attach, or pick a muscle to see its marks on the bones.',
  insO: 'Starts', insE: 'Attaches', lmT: 'Bone landmarks', lmD: 'Named points on the selected bone or organ: tubercles, holes, ridges and more.',
  pick: 'Nothing picked yet', pickD: 'Tap a part of the model or find it in the list.', aOnly: 'Keep only this', aHide: 'Hide', aFocus: 'Closer', aAll: 'All',
  lmL: 'Landmarks · {n}', insFrom: 'Start on this bone', insTo: 'Attach to this bone', mOrig: 'Where it starts', mIns: 'Where it attaches', related: 'Nearby', other: 'Also found in',
  res: 'Your progress', resD: '{b} of {a} opened', test: 'Quick test', testD: '10 questions from {n} parts.', mFind: 'Find on the model', mFindD: 'A name appears — tap that part on the model.',
  mPick: 'One of four', mPickD: 'Choose the painted part\'s name from four.', mType: 'Type it', mTypeD: 'Type the painted part\'s name.', mTf: 'Yes or no', mTfD: 'Is "This is …" right?',
  hqLoad: 'Loading high quality…', deep: 'Memorise mode', noTr: 'Translation coming soon'});
let LANG = (() => { try { const a = localStorage.getItem('atlas_lang'); if (TX[a]) return a; const l = localStorage.getItem('tadris_lang'); if (TX[l]) return l; if (['kk', 'ky', 'tg'].includes(l)) return 'ru'; } catch (e) {} return (navigator.language || '').startsWith('ru') ? 'ru' : 'uz'; })();
const LI = () => ({uz: 0, ru: 1, en: 2}[LANG]);
const t = (k, o) => { let s = (TX[LANG] || TX.uz)[k] ?? TX.uz[k] ?? k; if (o) for (const [a, b] of Object.entries(o)) s = s.split('{' + a + '}').join(b); return s; };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {get: (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }};
function toast(s) { const e = $('toast'); e.textContent = s; e.classList.remove('hide'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.add('hide'), 1800); }

let C = null;   // katalog
const nm = (n, l = LANG) => { const r = C.names[n]; if (!r) return '?'; const v = l === 'en' ? r[0] : l === 'uz' ? r[1] : l === 'ru' ? r[2] : r[3]; return cap(v || r[0]); };
const lat = n => (C.names[n] && C.names[n][3]) || '';
const nodeName = i => nm(C.nodes[i][0]);
function nodeAnc(i) { const out = []; while (i >= 0) { out.push(i); i = C.nodes[i][1]; } return out; }
const tr = a => a[LI()] || a[0];

// ------------------------------------------------------------------ ko'rib chiqilganlar
const seenKey = id => 'za_seen_' + id;
const seenGet = id => new Set(store.get(seenKey(id), []));
function seenAdd(id, n) { const s = seenGet(id); if (s.has(n)) return; s.add(n); store.set(seenKey(id), [...s]); }
const learnKey = id => 'za_learn_' + id;
const learnGet = id => new Set(store.get(learnKey(id), []));
function learnAdd(id, n) { const s = learnGet(id); s.add(n); store.set(learnKey(id), [...s]); }

// ------------------------------------------------------------------ kirish: faqat admin (sinov)
async function gate() {
  if (DEV) return true;
  let ws = ''; try { ws = localStorage.getItem('tadris_ws') || ''; } catch (e) {}
  if (!ws) return false;
  try { const r = await fetch(API + '/me', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ws})}); const d = await r.json(); return !!(d && d.ok && d.admin); } catch (e) { return false; }
}

// ------------------------------------------------------------------ kutubxona
let CAT = 'all';
function langBtns(el, cb) {
  el.innerHTML = ['uz', 'ru', 'en'].map(l => `<button data-l="${l}" class="${l === LANG ? 'on' : ''}">${l.toUpperCase()}</button>`).join('');
  el.querySelectorAll('button').forEach(b => b.onclick = () => { LANG = b.dataset.l; store.set('atlas_lang', LANG); document.documentElement.lang = LANG; cb(); });
}
const catOf = id => C.cats.find(c => c[0] === id) || ['top', ['', '', ''], '#a78bfa'];
function renderHome() {
  $('hBack').textContent = t('back'); $('hKick').textContent = t('kick'); $('hT').innerHTML = esc(t('title')) + `<span class="badge">${t('badge')}</span>`; $('hD').textContent = t('desc');
  const tot = C.atlases.reduce((s, a) => s, 0);
  const uniq = new Set(); C.parts.forEach(p => { if (p[4] === 0) uniq.add(p[0]); });
  $('stats').innerHTML = [[C.atlases.length, t('sAt')], [uniq.size.toLocaleString('ru'), t('sSt')], [new Set(C.lms.map(l => l[0])).size.toLocaleString('ru'), t('sLm')]].map(([a, b]) => `<div class="stat"><b>${a}</b><small>${b}</small></div>`).join('');
  $('gq').placeholder = t('gq');
  langBtns($('langs'), renderHome);
  const last = store.get('za_last', null), la = last && C.atlases.find(a => a.id === last.a);
  if (la) {
    const s = seenGet(la.id).size;
    $('resume').innerHTML = `<div class="resume"><div style="flex:1;min-width:0"><small>${t('resume')}</small><b>${esc(tr(la.t))}</b><span>${t('seenOf', {a: s, b: la.n})}${last.n != null && C.names[last.n] ? ' · ' + esc(t('lastSeen', {n: nm(last.n)})) : ''}</span></div><button id="rGo">${t('resumeB')}</button></div>`;
    $('rGo').onclick = () => openAtlas(la.id, last.n);
  } else $('resume').innerHTML = '';
  $('hAt').textContent = t('atlases'); $('hAtS').textContent = t('atlasesS');
  const cnt = c => C.atlases.filter(a => a.cat === c).length;
  $('cats').innerHTML = `<button data-c="all" class="${CAT === 'all' ? 'on' : ''}" style="--c:#8b5cf6">${t('all')} <em>${C.atlases.length}</em></button>` +
    C.cats.filter(c => cnt(c[0])).map(c => `<button data-c="${c[0]}" class="${CAT === c[0] ? 'on' : ''}" style="--c:${c[2]}"><i></i>${esc(tr(c[1]))} <em>${cnt(c[0])}</em></button>`).join('');
  $('cats').querySelectorAll('button').forEach(b => b.onclick = () => { CAT = b.dataset.c; renderHome(); });
  $('grid').innerHTML = C.atlases.filter(a => CAT === 'all' || a.cat === CAT).map(a => {
    const c = catOf(a.cat), s = seenGet(a.id).size, p = a.n ? Math.floor(s / a.n * 100) : 0;
    return `<button class="acard" data-a="${a.id}" style="--c:${c[2]}"><div class="pic"><img src="img/${a.id}.webp?v=${V}" alt="" loading="lazy"><span class="tag">${esc(tr(c[1]))}</span>${a.id !== 'butun-tana' && s ? `<span class="pct">${p}%</span>` : ''}</div>
      <div class="cb"><b>${esc(tr(a.t))}</b><p>${esc(tr(a.d))}</p>
      <div class="meta"><span>${t('nSt', {n: a.n})}</span>${a.lmn ? `<span>${t('nLm', {n: a.lmn})}</span>` : ''}<span>${t('mb', {n: String(a.mb).replace('.', ',')})}</span></div>
      ${a.id !== 'butun-tana' ? `<div class="pb"><i style="width:${p}%"></i></div>` : ''}</div></button>`;
  }).join('');
  $('grid').querySelectorAll('.acard').forEach(b => b.onclick = () => openAtlas(b.dataset.a));
  $('credit').innerHTML = esc(t('credit', {c: C.credit})) + ' <a href="https://github.com/Z-Anatomy/Models-of-human-anatomy" target="_blank" rel="noopener">Z-Anatomy</a> · <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/" target="_blank" rel="noopener">BodyParts3D</a>';
}
// --- global qidiruv
let SIDX = null;
function normS(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ʻʼ'’`‘]/g, '').replace(/ё/g, 'е').replace(/[^a-zа-яқғўҳ0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
function buildSearch() { SIDX = C.names.map((r, i) => [i, normS(r.filter(Boolean).join(' | '))]).filter(([i]) => C.na[i]); }
function gsearch(q) {
  const box = $('gres'); q = normS(q);
  if (q.length < 2) { box.classList.add('hide'); return; }
  if (!SIDX) buildSearch();
  const res = []; for (const [i, s] of SIDX) { const k = s.indexOf(q); if (k >= 0) res.push([k === 0 ? 0 : 1, nm(i).length, i]); if (res.length > 400) break; }
  res.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  box.innerHTML = res.slice(0, 30).map(([, , i]) => { const at = C.na[i] || []; const a = C.atlases.find(x => x.id === at[0]); return `<button data-n="${i}" data-a="${at[0]}">${esc(nm(i))} <small>${esc(lat(i))}${a ? ' · ' + esc(tr(a.t)) : ''}</small></button>`; }).join('') || `<button disabled>—</button>`;
  box.classList.remove('hide');
  box.querySelectorAll('button[data-n]').forEach(b => b.onclick = () => { box.classList.add('hide'); openAtlas(b.dataset.a, +b.dataset.n); });
}

// ------------------------------------------------------------------ 3D sahna
let renderer, scene, camera, controls, raycaster, root, AT = null, MESHES = [], ITEMS = [], BYN = new Map(), INS = [], LMG = null, radius = 1, center = new THREE.Vector3(), animReq = 0;
let sel = null, selSide = 0, BOTH = true, XRAY = false, explodeK = 0, TAB = 'tree', HL = new Map(), Q = null, DP = null, SHOW_LM = true, SHOW_INS = true, CUT = {ax: -1, pos: 0, flip: false}, LMSEL = null;
let LAYV = {}, LAYO = {}, SOLO = 0, OPEN = new Set(), TQ = '';
const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const pointer = new THREE.Vector2();
const SYSCOL = {1: 0xe9dfc8, 3: 0x8fb8d8, 4: 0xb5524a, 5: 0xc0392b, 6: 0x6abf69, 7: 0xf2d16b, 8: 0xd98b7a, 9: 0xe0b9a0};
const SELC = new THREE.Color(0x8b5cf6);

function initGL() {
  if (renderer) return true;
  try { renderer = new THREE.WebGLRenderer({canvas: $('cv'), antialias: true, alpha: true}); } catch (e) { return false; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); renderer.localClippingEnabled = true;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
  // studiya yorug'ligi: kamera bilan birga aylanadi — asosiy (yuqori-o'ngdan), yumshatuvchi (chapdan), kontur (orqadan)
  scene.add(new THREE.HemisphereLight(0xf4f7ff, 0x2a2238, 0.7));
  const key = new THREE.DirectionalLight(0xfff6ec, 2.0); key.position.set(0.7, 1.0, 0.9); camera.add(key);
  const fill = new THREE.DirectionalLight(0xd6e4ff, 0.8); fill.position.set(-1.0, 0.15, 0.6); camera.add(fill);
  const rim = new THREE.DirectionalLight(0xc8b8ff, 1.3); rim.position.set(0.1, 0.6, -1.0); camera.add(rim);
  const low = new THREE.DirectionalLight(0xffe2d0, 0.35); low.position.set(0, -1, 0.4); camera.add(low);
  scene.add(camera);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.09; controls.rotateSpeed = 0.75; controls.zoomSpeed = 1.1;
  raycaster = new THREE.Raycaster();
  new ResizeObserver(resize).observe($('stage'));
  let down = null, lastTap = 0;
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY, performance.now()]; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!down) return; const mv = Math.hypot(e.clientX - down[0], e.clientY - down[1]), dt = performance.now() - down[2]; down = null;
    if (mv < 8 && dt < 650) { const now = performance.now(); const dbl = now - lastTap < 320; lastTap = now; pick(e, dbl); }
  });
  return true;
}
function resize() { if (!renderer) return; const r = $('stage').getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix(); }
function loop() { animReq = requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); placeLabels(); }

// --- fayl yuklash (TA3D: int16 + indeks, gzip)
const FCACHE = new Map();
async function loadFile(f) {
  if (FCACHE.has(f)) return FCACHE.get(f);
  const p = (async () => {
    const r = await fetch('z/' + f + '.bin.gz?v=' + V); if (!r.ok) throw new Error('http ' + r.status);
    if (typeof DecompressionStream === 'undefined') throw new Error('gzip');
    const buf = await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    const dv = new DataView(buf);
    if (String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)) !== 'TA3D') throw new Error('format');
    const hl = dv.getUint32(4, true), head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 8, hl)));
    let off = 8 + hl; const out = []; const k = head.half / 32767, c = head.ctr || [0, 0, 0];
    for (const p of head.parts) {
      const q = new Int16Array(buf, off, p.nv * 3); off += p.nv * 6; off += (4 - (off % 4)) % 4;
      const idx = p.i4 ? new Uint32Array(buf, off, p.nt * 3) : new Uint16Array(buf, off, p.nt * 3); off += p.nt * 3 * (p.i4 ? 4 : 2); off += (4 - (off % 4)) % 4;
      const pos = new Float32Array(p.nv * 3);
      for (let i = 0; i < p.nv; i++) { const x = q[i * 3] * k + c[0], y = q[i * 3 + 1] * k + c[1], z = q[i * 3 + 2] * k + c[2]; pos[i * 3] = x; pos[i * 3 + 1] = z; pos[i * 3 + 2] = -y; }
      out.push({id: p.id, pos, idx: idx.slice()});
    }
    return out;
  })();
  FCACHE.set(f, p); p.catch(() => FCACHE.delete(f));
  return p;
}
function geom(p) {
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p.pos, 3)); g.setIndex(new THREE.BufferAttribute(p.idx, 1));
  g.computeVertexNormals(); g.computeBoundingSphere(); g.computeBoundingBox(); return g;
}
const hashN = n => { let h = 2166136261; for (let i = 0; i < n.length; i++) h = Math.imul(h ^ n.charCodeAt(i), 16777619); return (h >>> 0) / 4294967295; };
function partColor(p) {
  const en = C.names[p[0]][0].toLowerCase(), s = p[3];
  let c = 0xcccccc;
  const R = (re, v) => { if (re.test(en)) { c = v; return true; } return false; };
  if (s === 1) { R(/./, 0xe2d6bd) && (R(/cartilage|disc\b|meniscus/, 0x9cc3d5) || R(/incisor|canine|premolar|molar|tooth/, 0xf6f1e4)); }
  else if (s === 3) { R(/./, 0xddd2b6) && (R(/capsule|membrane/, 0xc4d3de) || R(/disc|meniscus|labrum|symphysis|nucleus pulposus|anulus/, 0x8fb8d8) || R(/suture|syndesmosis|gomphosis/, 0xb9c7a8)); }
  else if (s === 4) { R(/./, 0xb4483f) && (R(/tendon sheath|sheath/, 0x9fd0e6) || R(/bursa/, 0x8bc6e8) || R(/fascia|septum/, 0xd8c7a8) || R(/aponeurosis|tendon|tract\b|retinacul|ligament|galea|linea alba|raphe/, 0xe0d6c2)); }
  else if (s === 5) {
    if (!(R(/pulmonary trunk|pulmonary arter|branch of (left|right) pulmonary/, 0x3a66d0) || R(/pulmonary vein/, 0xc62f2f) || R(/leaflet|cusp|valve|chordae/, 0xf0dfc0) || R(/papillary/, 0xa83a32) ||
      R(/atrium|ventricle|auricle|heart|septum|myocard/, 0xb84a42) || R(/vein|vena|sinus|venous|plexus/, 0x3a66d0))) c = 0xc62f2f;
  }
  else if (s === 6) { R(/./, 0x76c06f) && (R(/spleen/, 0x8e3b46) || R(/thymus/, 0xd9a6a0) || R(/tonsil/, 0xd88a8a)); }
  else if (s === 7) {
    if (!(R(/sclera/, 0xf4f1ea) || R(/cornea/, 0xbfe3f0) || R(/iris|ciliary/, 0x6b8e5a) || R(/lens/, 0xe0f0f6) || R(/retina|optic disc/, 0xd76b5f) || R(/choroid/, 0x7a3b33) || R(/vitreous/, 0xcfe8f2) ||
      R(/rectus|oblique muscle|levator palpebrae|orbicularis/, 0xb4483f) || R(/malleus|incus|stapes/, 0xe8dfc9) || R(/cochlea|vestibul|semicircular|labyrinth/, 0xe7c9a9) || R(/auricle|tympan|external acoustic/, 0xe6b8a2) ||
      R(/dura|arachnoid|pia mater|falx|tentorium|denticulate/, 0xcfc6bf) || R(/ventricle|aqueduct|central canal|choroid plexus/, 0x7aa7e0) || R(/white matter|corpus callosum|internal capsule|fornix|commissure|lemniscus|peduncle/, 0xf3ece2) ||
      R(/tract|fasciculus|funiculus/, 0xf1e4c9) || R(/horn|gray matter|grey matter|substance|nucleus|putamen|caudate|thalamus|globus|claustrum|amygdal|hippocamp|pallid|nigra/, 0xc98b8b) ||
      R(/cerebell|vermis|flocc/, 0xd9a097) || R(/gyrus|lobe|pole|cortex|cuneus|precuneus|insula|operculum|sulcus|uncus|lingula/, 0xe8b8ad) || R(/medulla|pons|midbrain|mesencephal|brainstem|hypothal|pituitar|pineal|mammillary/, 0xdca99e) ||
      R(/spinal cord|conus/, 0xe9ddcc))) c = 0xf0cf55;
  }
  else if (s === 8) {
    if (!(R(/liver|hepatic|segment of liver|caudate lobe|quadrate lobe/, 0x8b3a2b) || R(/gall|bile|cystic duct|biliary|hepatic duct|common hepatic/, 0x5a9a5a) || R(/pancrea/, 0xe0b06a) ||
      R(/lung|pulmonary|lobe of (left|right)|segment of (left|right) lung|lingula/, 0xe9c4bd) || R(/bronch|trache|larynx|laryngeal|cartilage|epiglott|vocal/, 0xe9e1d0) ||
      R(/kidney|renal|cortex|pyramid/, 0x9b3d3a) || R(/ureter|bladder|urethra/, 0xd9a18f) || R(/thyroid|parathyroid|adrenal|suprarenal|hypophysis|pituitar|pineal/, 0xc98f5e) ||
      R(/parotid|submandibular|sublingual|salivary|gland/, 0xd9a066) || R(/tongue|lingual/, 0xc96a6a) || R(/gingiva|palate|uvula/, 0xe59a9a) || R(/peritoneum|omentum|mesentery|mesocolon|ligament|fascia/, 0xe8cf9f) ||
      R(/testis|epididym|ductus deferens|seminal|prostat|penis|scrot|ovary|uterus|vagina/, 0xd6a596) || R(/colon|caecum|cecum|rectum|appendix|taeni|anal/, 0xc97f6a))) c = 0xd98b7a;
    if (/segment/.test(en)) { const k = hashN(en); const col = new THREE.Color(c); col.offsetHSL(0, 0, (k - 0.5) * 0.18); return col.getHex(); }
  }
  else if (s === 10) { if (p[5]) c = parseInt(p[5], 16); }
  else if (s === 9) { const pal = [0xe7c2a5, 0xdcb093, 0xf0d0b6, 0xd9a688, 0xe9bb9b]; c = pal[Math.floor(hashN(en) * pal.length)]; }
  const col = new THREE.Color(c); col.offsetHSL(0, 0, (hashN(en) - 0.5) * 0.07); return col.getHex();
}
function hiddenByDefault(p) {
  const en = C.names[p[0]][0].toLowerCase();
  if (p[3] === 4) return /fascia|bursa|sheath|septum/.test(en) && !/iliotibial/.test(en);
  if (p[3] === 7) return /dura|arachnoid|pia mater|falx|tentorium/.test(en);
  if (p[3] === 8) return /peritoneum|omentum|fascia|parietal pleura/.test(en);
  if (p[3] === 10) return /spongy bone|transverse colon|ascending colon|descending colon|colic flexure|caecum|appendix|ileocaecal/.test(en);
  return false;
}

async function openAtlas(id, pickN) {
  const a = C.atlases.find(x => x.id === id); if (!a) return;
  AT = a; sel = null; LMSEL = null; HL = new Map(); Q = null; DP = null; TAB = pickN != null ? 'info' : 'tree'; XRAY = false; CUT = {ax: -1, pos: 0, flip: false}; SOLO = 0; LAYV = {}; LAYO = {}; OPEN = new Set(); TQ = '';
  store.set('za_last', {a: a.id, n: pickN ?? null});
  $('home').classList.add('hide'); $('view').classList.remove('hide');
  history.replaceState(null, '', location.pathname + '?a=' + a.id + (pickN != null ? '&n=' + pickN : '') + (DEV ? '&dev=1' : ''));
  labels();
  if (!initGL()) { $('loadT').textContent = t('noGl'); $('load').classList.remove('hide'); return; }
  resize(); $('load').classList.remove('hide'); $('loadT').textContent = t('load'); $('exp').value = 0; explodeK = 0; GRID = null; GK = 0; $('bGrid').classList.remove('on');
  if (root) { scene.remove(root); root.traverse(o => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } }); }
  root = new THREE.Group(); scene.add(root); MESHES = []; ITEMS = []; BYN = new Map(); INS = []; LMG = null;
  renderPanel();
  let files;
  try { files = await Promise.all([...a.layers.map(L => loadFile(L.f)), a.ins ? loadFile('s2') : null]); } catch (e) { $('loadT').textContent = t('err'); console.error(e); return; }
  if (AT !== a) return;
  a.layers.forEach((L, li) => {
    const only = L.only ? new Set(L.only.map(s => s.toLowerCase())) : null, nms = L.names ? new Set(L.names.map(s => s.toLowerCase())) : null, ctx = L.role === 'ctx';
    for (const fp of files[li]) {
      const p = C.parts[fp.id]; if (!p || p[4] !== 0) continue;
      if ((only || nms) && !((only && nodeAnc(p[2]).some(ni => only.has(C.names[C.nodes[ni][0]][0].toLowerCase()))) || (nms && nms.has(C.names[p[0]][0].toLowerCase())))) continue;
      const g = geom(fp);
      const mat = new THREE.MeshStandardMaterial({roughness: 0.55, metalness: 0.0, side: THREE.DoubleSide, clippingPlanes: [clipPlane], clipShadows: true});
      const m = new THREE.Mesh(g, mat);
      const base = new THREE.Color(partColor(p));
      m.userData = {p, id: fp.id, ctx, base, sys: ctx ? 0 : p[3], side: p[1], c: g.boundingSphere.center.clone(), hidden: !ctx && hiddenByDefault(p)};
      root.add(m); MESHES.push(m);
      if (ctx) { mat.color.set(0xd9dee5); continue; }
      let it = BYN.get(p[0]);
      if (!it) { it = {n: p[0], ms: [], node: p[2], sys: p[3], nv: 0}; BYN.set(p[0], it); ITEMS.push(it); }
      it.ms.push(m); it.nv += g.attributes.position.count; m.userData.it = it;
    }
  });
  if (a.ins && files[a.layers.length]) {
    const names = new Set(ITEMS.map(it => it.n));
    for (const fp of files[a.layers.length]) {
      const p = C.parts[fp.id]; if (!p || !p[4]) continue;
      if (!names.has(p[6]) && !names.has(p[0])) continue;
      const mat = new THREE.MeshStandardMaterial({color: p[4] === 1 ? 0xef4444 : 0x06b6d4, roughness: 0.5, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, clippingPlanes: [clipPlane]});
      const m = new THREE.Mesh(geom(fp), mat); m.visible = false; m.renderOrder = 2;
      m.userData = {p, id: fp.id, ins: true, side: p[1], c: m.geometry.boundingSphere.center.clone()}; root.add(m); INS.push(m);
    }
  }
  ITEMS.sort((x, y) => nm(x.n).localeCompare(nm(y.n), LANG));
  ITEMS.forEach((it, k) => it.k = k);
  for (const s of new Set(ITEMS.map(i => i.sys))) { LAYV[s] = true; LAYO[s] = 1; }
  if (a.layers.some(L => L.role === 'ctx')) { LAYV[0] = true; LAYO[0] = 0.22; }
  const box = new THREE.Box3(); MESHES.filter(m => !m.userData.ctx).forEach(m => box.expandByObject(m));
  if (box.isEmpty()) MESHES.forEach(m => box.expandByObject(m));
  box.getCenter(center); const sz = box.getSize(new THREE.Vector3()); BSZ = sz.clone(); radius = Math.max(sz.x, sz.y, sz.z) / 2;
  root.position.copy(center).multiplyScalar(-1);
  CUT.box = box.clone().translate(root.position); applyCut();
  applyVis(); paint(); resetView(null, true); $('load').classList.add('hide');
  if (!animReq) loop();
  // ochiq guruhlar: yuqori 2 daraja
  if (pickN != null && BYN.has(+pickN)) select(BYN.get(+pickN), 0, true); else renderPanel();
  upgradeHQ(a);
}
// --- yuqori sifat: yengil model ochilgach, asl sifatdagisi orqa fonda yuklanib, o'rniga qo'yiladi
const HQ_OK = (() => { try { const c = navigator.connection; if (c && c.saveData) return false; if (navigator.deviceMemory && navigator.deviceMemory < 3) return false; } catch (e) {} return true; })();
async function upgradeHQ(a) {
  const files = [...new Set(a.layers.filter(L => L.role !== 'ctx' && !/-lo$/.test(L.f)).map(L => L.f))];
  if (a.ins) files.push('s2');
  if (!HQ_OK || !files.length) { $('hq').classList.add('hide'); return; }
  $('hq').textContent = t('hqLoad'); $('hq').classList.remove('hide', 'done');
  for (const f of files) {
    let parts; try { parts = await loadFile(f + '-full'); } catch (e) { console.warn('hq', f, e); continue; }
    if (AT !== a) return;
    const byId = new Map(parts.map(p => [p.id, p]));
    for (const m of MESHES.concat(INS)) {
      if (m.userData.ctx || m.userData.hq) continue;
      const p = byId.get(m.userData.id ?? -1); if (!p) continue;
      const old = m.geometry; m.geometry = geom(p); old.dispose(); m.userData.hq = true;
    }
  }
  if (AT !== a) return;
  GRID = null; if (GK > 0) { buildGrid(); place(); }
  $('hq').textContent = 'HD ✓'; $('hq').classList.add('done'); setTimeout(() => { if (AT === a) $('hq').classList.add('hide'); }, 2500);
}

// --- ko'rinish va ranglar
function applyVis() {
  GRID = null;
  for (const m of MESHES) {
    const u = m.userData, lay = u.ctx ? 0 : u.sys;
    let v = LAYV[lay] !== false && !u.hidden;
    if (SOLO && !u.ctx && lay !== SOLO) v = false;
    m.visible = v;
  }
  updateIns(); updateLm();
  if (explodeK > 0 || GK > 0) { if (GK > 0) buildGrid(); place(); }
}
function paint() {
  const qmode = (Q && Q.i < Q.list.length && Q.mode !== 'find') || (DP && DP.q.length);
  const selMs = new Set(selMeshes());
  for (const m of MESHES) {
    const u = m.userData, mat = m.material;
    if (u.ctx) { const o = LAYO[0] ?? 0.22; mat.color.set(0xdfe4ea); mat.transparent = true; mat.opacity = o; mat.depthWrite = o > 0.95; m.renderOrder = 1; continue; }
    const it = u.it; let col = u.base, op = LAYO[u.sys] ?? 1, emis = 0;
    if (HL.has(it)) { col = new THREE.Color(HL.get(it)); emis = 0x101010; }
    else if (selMs.has(m)) { col = u.base.clone().lerp(SELC, 0.75); emis = 0x0c2a26; }
    if (XRAY && (sel || qmode) && !selMs.has(m) && !HL.has(it)) op = Math.min(op, 0.12);
    else if (XRAY && !sel) op = Math.min(op, 0.4);
    else if (qmode && !HL.has(it)) op = Math.min(op, 0.55);
    mat.color.copy(col); mat.emissive.setHex(emis);
    mat.transparent = op < 0.99; mat.opacity = op; mat.depthWrite = op >= 0.99; m.renderOrder = op < 0.99 ? 1 : 0;
  }
}
function selMeshes() { if (!sel) return []; return sel.ms.filter(m => BOTH || !selSide || m.userData.side === selSide || m.userData.side === 0); }

// --- kamera
function fitFov() { const v = camera.fov * Math.PI / 180, h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect); return Math.min(v, h); }
let BSZ = new THREE.Vector3(1, 1, 1);
function fitDist(dir) {
  const v = camera.fov * Math.PI / 180, h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
  const side = dir && Math.abs(dir.y) > 0.7;   // yuqoridan/pastdan qaraganda
  const H = side ? BSZ.z : BSZ.y, W = (dir && Math.abs(dir.x) > 0.7) ? BSZ.z : BSZ.x, D = side ? BSZ.y : (dir && Math.abs(dir.x) > 0.7 ? BSZ.x : BSZ.z);
  return Math.max(H / 2 / Math.tan(v / 2), W / 2 / Math.tan(h / 2)) * 1.16 + D / 2;
}
function resetView(dir, instant) {
  const d = fitDist(dir ? dir.clone().normalize() : null);
  const v = (dir || new THREE.Vector3(0, 0.05, 1)).clone().normalize().multiplyScalar(d);
  if (instant) { cancelAnimationFrame(camAnim); camera.position.copy(v); controls.target.set(0, 0, 0); controls.update(); }
  else animCam(v, new THREE.Vector3(0, 0, 0));
  camera.near = d / 200; camera.far = d * 30; camera.updateProjectionMatrix();
  controls.minDistance = radius * 0.03; controls.maxDistance = d * 3;
}
let camAnim = null;
function animCam(pos, target) {
  const p0 = camera.position.clone(), t0 = controls.target.clone(), s = performance.now();
  cancelAnimationFrame(camAnim);
  const tick = now => { const k = Math.min(1, (now - s) / 450), e = 1 - Math.pow(1 - k, 3); camera.position.lerpVectors(p0, pos, e); controls.target.lerpVectors(t0, target, e); if (k < 1) camAnim = requestAnimationFrame(tick); };
  camAnim = requestAnimationFrame(tick);
}
function msSphere(ms) { const b = new THREE.Box3(); ms.forEach(m => { m.updateMatrixWorld(); b.expandByObject(m); }); const s = new THREE.Sphere(); b.getBoundingSphere(s); return s; }
function focusMs(ms) {
  if (!ms.length) return; const s = msSphere(ms), d = Math.max(s.radius, radius * 0.04) / Math.sin(fitFov() / 2) * 1.5;
  let dir = camera.position.clone().sub(controls.target); if (dir.lengthSq() < 1e-8) dir.set(0, 0.05, 1); dir.normalize();
  animCam(s.center.clone().add(dir.multiplyScalar(d)), s.center.clone());
}
function faceMs(ms) {   // savolda belgilangan qism kameraga qarab tursin
  const s = msSphere(ms), dir = s.center.clone().normalize(); if (dir.lengthSq() < 1e-6) dir.set(0, 0, 1);
  dir.y = dir.y * 0.3; dir.normalize(); if (Math.abs(dir.z) < 0.25 && Math.abs(dir.x) < 0.25) dir.set(0, 0, 1);
  const d = radius / Math.sin(fitFov() / 2) * 0.9; animCam(dir.multiplyScalar(d).add(new THREE.Vector3(0, s.center.y * 0.5, 0)), new THREE.Vector3(0, s.center.y * 0.5, 0));
}
// --- ajratish: 0…0.5 — markazdan sochiladi, 0.5…1 — hamma bo'lak kattadan kichikka qarab qator-qator teriladi
let GRID = null, GSZ = null;
function buildGrid() {
  const ms = MESHES.filter(m => !m.userData.ctx && !m.userData.hidden && LAYV[m.userData.sys] !== false && (!SOLO || m.userData.sys === SOLO));
  const sz = m => { const b = m.geometry.boundingBox; return [b.max.x - b.min.x, b.max.y - b.min.y]; };
  const items = ms.map(m => { const [w, h] = sz(m); return {m, w, h, s: Math.max(w, h)}; }).sort((a, b) => b.s - a.s);
  if (!items.length) { GRID = new Map(); GSZ = new THREE.Vector3(1, 1, 1); return; }
  const gap = Math.max(radius * 0.012, items[Math.floor(items.length / 2)].s * 0.35);
  const area = items.reduce((a, it) => a + (it.w + gap) * (it.h + gap), 0);
  const W = Math.max(items[0].w + gap, Math.sqrt(area * Math.max(0.6, camera.aspect)) * 1.05);
  const slots = []; let x = 0, y = 0, rowH = 0, row = [];
  const flush = () => { const off = (W - x) / 2; row.forEach(r => { r.x += off; r.y = y - rowH / 2; }); y -= rowH + gap; x = 0; rowH = 0; row = []; };
  for (const it of items) {
    if (x > 0 && x + it.w > W) flush();
    const r = {it, x: x + it.w / 2, y: 0}; row.push(r); slots.push(r); x += it.w + gap; rowH = Math.max(rowH, it.h);
  }
  flush();
  const H = -y - gap; GRID = new Map(); GSZ = new THREE.Vector3(W, H, items[0].s * 0.3);
  for (const r of slots) GRID.set(r.it.m, new THREE.Vector3(r.x - W / 2, r.y + H / 2, 0).add(center).sub(r.it.m.userData.c));
}
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
let GK = 0;   // 0 — joyida, 1 — qatorga terilgan
function setExplode(k) { explodeK = k; place(); }
function setGrid(g) { GK = g; place(); }
function place() {
  const t1 = explodeK, t2 = ease(GK);
  if (t2 > 0 && !GRID) buildGrid();
  for (const m of MESHES) {
    const u = m.userData, rad = u.c.clone().sub(center).multiplyScalar(t1 * 0.9);
    if (u.ctx) { m.position.copy(rad); m.visible = GK < 0.1 && LAYV[0] !== false && !u.hidden; continue; }
    const g = GRID && GRID.get(m);
    if (t2 > 0 && g) m.position.copy(rad.lerp(g, t2)); else m.position.copy(rad);
  }
  for (const m of INS) { const off = boneOffset(m.userData.p[6], m.userData.p[1]); m.position.copy(off || m.userData.c.clone().sub(center).multiplyScalar(t1 * 0.9)); }
  if (GK > 0) { INS.forEach(m => m.visible = false); if (LMG) LMG.visible = false; } else if (LMG) LMG.visible = true;
  if (LMG && sel) { const ms = selMeshes(); if (ms.length) LMG.position.copy(ms[0].position); }
}
let gridAnim = 0;
function toggleGrid(on) {
  on = on ?? GK < 0.5; const from = GK, to = on ? 1 : 0, t0 = performance.now(); cancelAnimationFrame(gridAnim);
  if (on) { buildGrid(); fitGrid(); } else resetView();
  $('bGrid').classList.toggle('on', on);
  const tick = now => { const k = Math.min(1, (now - t0) / 1400); setGrid(from + (to - from) * k); if (k < 1) gridAnim = requestAnimationFrame(tick); };
  gridAnim = requestAnimationFrame(tick);
}
function fitGrid() {
  if (!GSZ) return; const v = camera.fov * Math.PI / 180, h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
  const d = Math.max(GSZ.y / 2 / Math.tan(v / 2), GSZ.x / 2 / Math.tan(h / 2)) * 1.06 + GSZ.z;
  animCam(new THREE.Vector3(0, 0, d), new THREE.Vector3(0, 0, 0)); camera.far = Math.max(camera.far, d * 4); camera.updateProjectionMatrix(); controls.maxDistance = Math.max(controls.maxDistance, d * 2);
}
// insertion va landmark nuqtalari suyak bilan birga siljisin
function boneOffset(n, side) { const it = BYN.get(n); if (!it) return null; const m = it.ms.find(x => !side || x.userData.side === side || !x.userData.side) || it.ms[0]; return m.position; }

// --- kesim
function applyCut() {
  const mats = MESHES.concat(INS).map(m => m.material);
  if (CUT.ax < 0) { clipPlane.set(new THREE.Vector3(0, 1, 0), 1e6); }
  else {
    const b = CUT.box, n = [new THREE.Vector3(0, -1, 0), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, -1)][CUT.ax];
    const lo = [b.min.y, b.min.x, b.min.z][CUT.ax], hi = [b.max.y, b.max.x, b.max.z][CUT.ax];
    const v = lo + (hi - lo) * (CUT.pos * 0.5 + 0.5);
    if (CUT.flip) clipPlane.set(n.clone().negate(), -v); else clipPlane.set(n, v);
  }
  mats.forEach(m => m.needsUpdate = false);
}

// --- yorliqlar
let LBL = null;
function placeOne(el, w) {
  const v = w.clone().project(camera);
  if (v.z > 1 || Math.abs(v.x) > 1.2 || Math.abs(v.y) > 1.2) { el.classList.add('hide'); return; }
  const r = $('stage').getBoundingClientRect();
  const x = (v.x * 0.5 + 0.5) * r.width, y = (-v.y * 0.5 + 0.5) * r.height, left = x > r.width * 0.6;
  el.classList.toggle('flip', left);
  el.style.transform = left ? `translate(${x - 12}px, ${y}px) translate(-100%, -50%)` : `translate(${x + 12}px, ${y}px) translateY(-50%)`;
  el.classList.remove('hide');
}
function placeLabels() {
  if (LBL && LBL.ms && LBL.ms.length) { const m = LBL.ms[0]; placeOne($('lbl'), m.geometry.boundingSphere.center.clone().applyMatrix4(m.matrixWorld)); } else $('lbl').classList.add('hide');
  if (LMSEL && LMG) { const s = LMG.children.find(c => c.userData.li === LMSEL); if (s) { s.updateMatrixWorld(); placeOne($('lbl2'), new THREE.Vector3().setFromMatrixPosition(s.matrixWorld)); } else $('lbl2').classList.add('hide'); } else $('lbl2').classList.add('hide');
}
function setLabel(ms, text, sub, dot) {
  LBL = ms ? {ms} : null;
  if (ms) { $('lbl').querySelector('b').innerHTML = esc(text) + (sub ? `<small>${esc(sub)}</small>` : ''); $('lbl').style.setProperty('--dot', dot || '#8b5cf6'); }
}

// --- anatomik belgilar (landmark)
function updateLm() {
  if (LMG) { root.remove(LMG); LMG.children.forEach(c => { c.geometry.dispose(); c.material.dispose(); }); LMG = null; }
  if (!AT || !AT.lm || !SHOW_LM || !sel || TAB === 'learn') return;
  const ms = selMeshes().filter(m => m.visible); if (!ms.length) return;
  const sides = new Set(ms.map(m => m.userData.side));
  const lms = C.lms.map((l, i) => [l, i]).filter(([l]) => l[1] === sel.n && (sides.has(l[2]) || !l[2] || sides.has(0)));
  if (!lms.length) return;
  LMG = new THREE.Group(); LMG.userData.c = center.clone();
  const r = Math.max(radius * 0.0032, 0.0011), g = new THREE.SphereGeometry(r, 12, 10);
  for (const [l, i] of lms) {
    const s = new THREE.Mesh(g.clone(), new THREE.MeshBasicMaterial({color: i === LMSEL ? 0xfde047 : 0xfacc15, depthTest: false, transparent: true, opacity: 0.95}));
    s.position.set(l[3], l[5], -l[4]); s.renderOrder = 5; s.userData = {li: i, lm: true};
    LMG.add(s);
  }
  root.add(LMG);
  const off = ms[0].position; LMG.position.copy(off);
}
// --- mushak birikishi
function updateIns() {
  for (const m of INS) m.visible = false;
  if (!AT || !AT.ins || !SHOW_INS || !sel || TAB === 'learn') return;
  const sides = new Set(selMeshes().map(m => m.userData.side));
  for (const m of INS) {
    const p = m.userData.p, sideOk = BOTH || !selSide || p[1] === selSide || !p[1];
    if ((p[6] === sel.n || p[0] === sel.n) && sideOk) {
      m.visible = true;
      const off = boneOffset(p[6], p[1]); if (off) m.position.copy(off);
    }
  }
}

// --- tanlash
function pick(e, dbl) {
  const r = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  if (LMG) { const lh = raycaster.intersectObjects(LMG.children, false); if (lh.length) { LMSEL = lh[0].object.userData.li; updateLm(); setLmLabel(); if (TAB === 'info') renderPanel(true); return; } }
  const cand = MESHES.filter(m => m.visible && !m.userData.ctx);
  const hits = raycaster.intersectObjects(cand, false).filter(h => {
    if (CUT.ax >= 0 && clipPlane.distanceToPoint(h.point) < 0) return false;
    return !(h.object.material.transparent && h.object.material.opacity < 0.2);
  });
  const all = hits.length ? hits : raycaster.intersectObjects(cand, false);
  const hit = all[0], it = hit && hit.object.userData.it;
  if (Q && Q.mode === 'find' && Q.i < Q.list.length) return quizTap(it);
  if (Q || DP) return;
  if (it) { if (dbl && sel === it) { focusMs(selMeshes()); return; } select(it, hit.object.userData.side, dbl); }
  else if (!dbl) unselect();
}
function setLmLabel() {
  if (LMSEL == null) return; const l = C.lms[LMSEL];
  $('lbl2').querySelector('b').innerHTML = esc(nm(l[0])) + (lat(l[0]) ? `<small>${esc(lat(l[0]))}</small>` : '');
}
function select(it, side, focus) {
  sel = it; selSide = side || 0; LMSEL = null; HL = new Map();
  seenAdd(AT.id, it.n); store.set('za_last', {a: AT.id, n: it.n});
  history.replaceState(null, '', location.pathname + '?a=' + AT.id + '&n=' + it.n + (DEV ? '&dev=1' : ''));
  paint(); updateIns(); updateLm();
  setLabel(selMeshes(), nm(it.n), lat(it.n));
  if (focus) focusMs(selMeshes());
  // ochilgan guruhlar
  nodeAnc(it.node).forEach(n => OPEN.add(n));
  selbar();
  renderPanel(TAB === 'tree');
  if (TAB === 'tree') { const el = $('pb').querySelector('.tn.it.on'); if (el) el.scrollIntoView({block: 'nearest'}); }
}
function unselect() { sel = null; LMSEL = null; HL = new Map(); paint(); updateIns(); updateLm(); setLabel(null); selbar(); renderPanel(true); }
function selbar() {
  const b = $('selbar');
  if (!sel || Q || DP) { b.classList.add('hide'); return; }
  $('sbN').textContent = nm(sel.n); $('sbL').textContent = lat(sel.n); $('sbGo').textContent = "ⓘ " + t('tInfo');
  b.classList.remove('hide');
}
function hideSel() { if (!sel) return; selMeshes().forEach(m => m.userData.hidden = true); unselect(); applyVis(); renderPanel(true); }
function isoSel() { if (!sel) return; const keep = new Set(selMeshes()); MESHES.forEach(m => { if (!m.userData.ctx) m.userData.hidden = !keep.has(m); }); applyVis(); focusMs([...keep]); renderPanel(true); }
function isoGroup() { if (!sel) return; const node = sel.node; const keep = new Set(ITEMS.filter(i => i.node === node).flatMap(i => i.ms)); MESHES.forEach(m => { if (!m.userData.ctx) m.userData.hidden = !keep.has(m); }); applyVis(); focusMs([...keep]); renderPanel(true); }
function showAll() { MESHES.forEach(m => m.userData.hidden = !m.userData.ctx && hiddenByDefault(m.userData.p) && !m.userData.shown); SOLO = 0; applyVis(); renderPanel(true); }

// ------------------------------------------------------------------ panel
function labels() {
  $('vBack').title = t('back'); $('vCrumb').textContent = t('kick') + ' / ' + tr(catOf(AT.cat)[1]); $('vT').textContent = tr(AT.t); $('pT').textContent = tr(AT.t);
  $('bPanel').innerHTML = '☰ ' + t('panel');
  const tb = $('tabs').querySelectorAll('button'); ['tTree', 'tLay', 'tInfo', 'tLearn'].forEach((k, i) => tb[i].textContent = t(k));
  $('hint').textContent = t('hint'); $('sA').textContent = t('together'); $('sB').textContent = t('apart'); $('bGrid').innerHTML = '▦ ' + esc(t('grid'));
  [['tHome', 'home'], ['tView', 'view'], ['tBoth', 'both'], ['tHide', 'hideSel'], ['tIso', 'iso'], ['tAll', 'showAll'], ['tXray', 'xray'], ['tCut', 'cut'], ['tMore', 'more']].forEach(([id, k]) => { $(id).dataset.tip = t(k); $(id).setAttribute('aria-label', t(k)); });
  $('tBoth').classList.toggle('on', BOTH); $('tXray').classList.toggle('on', XRAY); $('tCut').classList.toggle('on', CUT.ax >= 0);
  $('cred2').textContent = AT.src === 'hra' ? 'HuBMAP Human Reference Atlas (CC BY 4.0) · Visible Human, NLM' : 'Z-Anatomy · BodyParts3D © DBCLS';
  langBtns($('vlangs'), () => { labels(); if (sel) setLabel(selMeshes(), nm(sel.n), lat(sel.n)); setLmLabel(); selbar(); renderPanel(true); });
}
function openPanel(on) { $('panel').classList.toggle('open', on); }
function setTab(k) {
  if (TAB === 'learn' && k !== 'learn') { Q = null; DP = null; HL = new Map(); }
  TAB = k; paint(); updateIns(); updateLm();
  if (k !== 'learn' && sel) setLabel(selMeshes(), nm(sel.n), lat(sel.n));
  renderPanel();
}
function renderPanel(keep) {
  const pb = $('pb'), sc = pb.scrollTop;
  $('tabs').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === TAB));
  if (!AT) return;
  if (TAB === 'tree') renderTree();
  else if (TAB === 'lay') renderLayers();
  else if (TAB === 'info') renderInfo();
  else renderLearn();
  if (keep) pb.scrollTop = sc; else pb.scrollTop = 0;
}
// --- Tuzilmalar (daraxt)
function renderTree() {
  const pb = $('pb'), seen = seenGet(AT.id);
  const q = normS(TQ);
  const match = it => !q || normS([nm(it.n), nm(it.n, 'en'), lat(it.n), nm(it.n, 'ru')].join(' ')).includes(q);
  // daraxtni qurish: faqat shu atlasdagi tugunlar
  const kids = new Map(), roots = new Set(), itemsOf = new Map();
  for (const it of ITEMS) {
    if (!match(it)) continue;
    const anc = nodeAnc(it.node);   // [o'zi, ota, ...]
    if (!itemsOf.has(it.node)) itemsOf.set(it.node, []); itemsOf.get(it.node).push(it);
    for (let i = 0; i < anc.length; i++) { const n = anc[i], par = anc[i + 1]; if (par == null) roots.add(n); else { if (!kids.has(par)) kids.set(par, new Set()); kids.get(par).add(n); } }
  }
  // bitta bolali ildizlarni qisqartirish
  let rs = [...roots];
  while (rs.length === 1 && !itemsOf.has(rs[0]) && kids.has(rs[0]) && kids.get(rs[0]).size <= 1) rs = [...kids.get(rs[0])];
  if (rs.length === 1 && !itemsOf.has(rs[0]) && kids.has(rs[0])) rs = [...kids.get(rs[0])];
  const countN = n => (itemsOf.get(n) || []).length + [...(kids.get(n) || [])].reduce((s, k) => s + countN(k), 0);
  const hiddenN = n => (itemsOf.get(n) || []).every(it => it.ms.every(m => m.userData.hidden)) && [...(kids.get(n) || [])].every(hiddenN);
  const nodeHTML = n => {
    const open = q || OPEN.has(n), c = countN(n);
    let h = `<div class="tn g${open ? ' open' : ''}" data-node="${n}"><span class="ar">▶</span><span class="nm">${esc(nodeName(n))}</span><span class="c">${c}</span><button class="eye${hiddenN(n) ? ' off' : ''}" data-eyen="${n}">👁</button></div>`;
    if (open) {
      h += `<div class="tch">`;
      [...(kids.get(n) || [])].sort((a, b) => (hiddenN(a) - hiddenN(b)) || nodeName(a).localeCompare(nodeName(b), LANG)).forEach(k => h += nodeHTML(k));
      (itemsOf.get(n) || []).sort((a, b) => nm(a.n).localeCompare(nm(b.n), LANG)).forEach(it => h += itemHTML(it));
      h += `</div>`;
    }
    return h;
  };
  const itemHTML = it => {
    const hid = it.ms.every(m => m.userData.hidden), dot = '#' + it.ms[0].userData.base.getHexString();
    return `<div class="tn it${it === sel ? ' on' : ''}${seen.has(it.n) ? ' seen' : ''}" data-k="${it.k}"><span class="ar"></span><i class="dot" style="--dot:${dot}"></i><span class="nm">${esc(nm(it.n))}${it.ms.length > 1 && !BOTH ? '' : ''}</span>${it.ms.length > 1 ? '<span class="c">×' + it.ms.length + '</span>' : ''}<button class="eye${hid ? ' off' : ''}" data-eyek="${it.k}">👁</button></div>`;
  };
  let h = `<input class="pin" id="tq" placeholder="${esc(t('search'))}" value="${esc(TQ)}"><div class="cnt"><span>${t('stCount', {n: ITEMS.length, s: ITEMS.filter(i => seen.has(i.n)).length})}</span><span><button id="tOpen">${t('openAll')}</button> · <button id="tClose">${t('closeAll')}</button></span></div><div class="tree">`;
  rs.sort((a, b) => (hiddenN(a) - hiddenN(b)) || nodeName(a).localeCompare(nodeName(b), LANG)).forEach(n => h += nodeHTML(n));
  for (const [n, its] of itemsOf) if (!rs.includes(n) && !nodeAnc(n).some(a => rs.includes(a))) its.forEach(it => h += itemHTML(it));
  h += `</div>`;
  pb.innerHTML = h;
  const inp = $('tq'); inp.oninput = () => { TQ = inp.value; const pos = inp.selectionStart; renderTree(); const i2 = $('tq'); i2.focus(); i2.setSelectionRange(pos, pos); };
  $('tOpen').onclick = () => { ITEMS.forEach(it => nodeAnc(it.node).forEach(n => OPEN.add(n))); renderTree(); };
  $('tClose').onclick = () => { OPEN = new Set(); renderTree(); };
  pb.querySelectorAll('.tn.g').forEach(el => el.onclick = e => { if (e.target.closest('.eye')) return; const n = +el.dataset.node; OPEN.has(n) ? OPEN.delete(n) : OPEN.add(n); renderPanel(true); });
  pb.querySelectorAll('.tn.it').forEach(el => el.onclick = e => { if (e.target.closest('.eye')) return; const it = ITEMS[+el.dataset.k]; if (it.ms.every(m => m.userData.hidden)) { it.ms.forEach(m => m.userData.hidden = false); applyVis(); } select(it, 0, true); });
  const subItems = n => (itemsOf.get(n) || []).concat([...(kids.get(n) || [])].flatMap(subItems));
  pb.querySelectorAll('[data-eyen]').forEach(b => b.onclick = () => { const its = subItems(+b.dataset.eyen); const hide = !its.every(it => it.ms.every(m => m.userData.hidden)); its.forEach(it => it.ms.forEach(m => { m.userData.hidden = hide; m.userData.shown = !hide; })); if (hide && sel && its.includes(sel)) unselect(); applyVis(); renderPanel(true); });
  pb.querySelectorAll('[data-eyek]').forEach(b => b.onclick = () => { const it = ITEMS[+b.dataset.eyek]; const hide = !it.ms.every(m => m.userData.hidden); it.ms.forEach(m => { m.userData.hidden = hide; m.userData.shown = !hide; }); if (hide && sel === it) unselect(); applyVis(); renderPanel(true); });
}
// --- Qatlamlar
function renderLayers() {
  const pb = $('pb'); const sys = Object.keys(LAYV).map(Number).filter(s => s > 0);
  let h = `<div class="cnt"><span class="sec" style="margin:4px 0">${t('layers')}</span><button id="lReset">↺ ${t('reset')}</button></div>`;
  for (const s of sys.concat(LAYV[0] != null ? [0] : [])) {
    const n = s ? ITEMS.filter(i => i.sys === s).length : MESHES.filter(m => m.userData.ctx).length;
    const name = s ? tr(C.sys[s]) : t('ctx');
    h += `<div class="lay"><div class="row"><button class="sw${LAYV[s] ? ' on' : ''}" data-sw="${s}"></button><b>${esc(name)}</b><small>${n}</small>${s && sys.length > 1 ? `<button class="solo${SOLO === s ? ' on' : ''}" data-solo="${s}">${t('solo')}</button>` : ''}</div>
      <small>${t('opacity')}</small><input type="range" min="5" max="100" value="${Math.round((LAYO[s] ?? 1) * 100)}" data-op="${s}"></div>`;
  }
  if (AT.ins) h += `<div class="sec">${t('insT')}</div><div class="lay"><div class="row"><button class="sw${SHOW_INS ? ' on' : ''}" id="swIns"></button><b>${t('insT')}</b></div><small style="display:block;margin-top:6px;line-height:1.45">${t('insD')}</small><div style="display:flex;gap:14px;margin-top:8px;font-size:12px"><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#ef4444"></i> ${t('insO')}</span><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#06b6d4"></i> ${t('insE')}</span></div></div>`;
  if (AT.lm) h += `<div class="lay"><div class="row"><button class="sw${SHOW_LM ? ' on' : ''}" id="swLm"></button><b>${t('lmT')}</b></div><small style="display:block;margin-top:6px;line-height:1.45">${t('lmD')}</small></div>`;
  pb.innerHTML = h;
  pb.querySelectorAll('[data-sw]').forEach(b => b.onclick = () => { const s = +b.dataset.sw; LAYV[s] = !LAYV[s]; applyVis(); renderPanel(true); });
  pb.querySelectorAll('[data-solo]').forEach(b => b.onclick = () => { const s = +b.dataset.solo; SOLO = SOLO === s ? 0 : s; applyVis(); renderPanel(true); });
  pb.querySelectorAll('[data-op]').forEach(r => r.oninput = () => { LAYO[+r.dataset.op] = r.value / 100; paint(); });
  $('lReset').onclick = () => { Object.keys(LAYV).forEach(s => { LAYV[s] = true; LAYO[s] = +s === 0 ? 0.22 : 1; }); SOLO = 0; applyVis(); paint(); renderPanel(true); };
  if ($('swIns')) $('swIns').onclick = () => { SHOW_INS = !SHOW_INS; updateIns(); renderPanel(true); };
  if ($('swLm')) $('swLm').onclick = () => { SHOW_LM = !SHOW_LM; updateLm(); renderPanel(true); };
}
// --- Ma'lumot
let INFO = null;   // tavsiflar (alohida fayl, keyin yuklanadi)
function renderInfo() {
  const pb = $('pb');
  if (!sel) { pb.innerHTML = `<div class="empty"><div style="font-size:30px">✦</div><b>${t('pick')}</b>${t('pickD')}</div>`; return; }
  const it = sel, n = it.n, r = C.names[n];
  const crumbs = nodeAnc(it.node).reverse().map(ni => `<span data-node="${ni}">${esc(nodeName(ni))}</span>`).join(' › ');
  const sides = new Set(it.ms.map(m => m.userData.side));
  const sideTxt = sides.has(1) && sides.has(2) ? t('paired') : sides.has(2) ? t('right') : sides.has(1) ? t('left') : t('single');
  let h = `<div class="info"><div class="crumbs">${crumbs}</div><h3>${esc(nm(n))}</h3>${lat(n) ? `<div class="lat">${esc(lat(n))}</div>` : ''}
    <div class="tags"><span>${esc(tr(C.sys[it.sys]))}</span><span>${sideTxt}</span>${seenGet(AT.id).has(n) ? '<span>✓</span>' : ''}</div>
    <div class="nm4"><span>${t('nUz')}</span><b>${esc(r[1] || '—')}</b><span>${t('nRu')}</span><b>${esc(r[2] || '—')}</b><span>${t('nLat')}</span><b>${esc(r[3] || '—')}</b><span>${t('nEn')}</span><b>${esc(cap(r[0]))}</b></div>`;
  const d = INFO && INFO[r[0].toLowerCase()];
  if (d) { const L = LANG === 'ru' ? 1 : 0; if (d.d) h += `<p class="dsc">${esc(d.d[L] || d.d[0])}</p>`; for (const [k, v] of (d.f || [])) h += `<div class="kv"><b>${esc(k[L] || k[0])}</b><p>${esc(v[L] || v[0])}</p></div>`; }
  else if (!r[1] && LANG === 'uz') h += `<p class="dsc" style="color:var(--muted);font-size:12.5px">${t('noTr')}</p>`;
  h += `<div class="acts"><button id="iOnly">${t('aOnly')}</button><button id="iHide">${t('aHide')}</button><button id="iFocus">${t('aFocus')}</button><button id="iAll">${t('aAll')}</button><button id="iPrez">${t('aPrez')}</button><button id="iTest">${t('aTest')}</button></div>`;
  // landmarklar
  if (AT.lm) {
    const lms = []; const seenL = new Set();
    C.lms.forEach((l, i) => { if (l[1] === n && !seenL.has(l[0])) { seenL.add(l[0]); lms.push([l, i]); } });
    if (lms.length) h += `<div class="sec">${t('lmL', {n: lms.length})}</div><div class="lst">` + lms.sort((a, b) => nm(a[0][0]).localeCompare(nm(b[0][0]), LANG)).map(([l, i]) => `<button data-lm="${i}" class="${LMSEL != null && C.lms[LMSEL][0] === l[0] ? 'on' : ''}"><i></i>${esc(nm(l[0]))}<small>${esc(lat(l[0]))}</small></button>`).join('') + `</div>`;
  }
  // mushak birikishi
  if (AT.ins || [1, 4].includes(it.sys)) {
    const orig = new Set(), insr = new Set(), oB = new Set(), iB = new Set();
    C.parts.forEach(p => { if (!p[4]) return; if (p[6] === n) (p[4] === 1 ? orig : insr).add(p[0]); if (p[0] === n && p[6] >= 0) (p[4] === 1 ? oB : iB).add(p[6]); });
    const lst = (s, col) => [...s].sort((a, b) => nm(a).localeCompare(nm(b), LANG)).map(x => `<button data-goto="${x}" style="--dot:${col}"><i></i>${esc(nm(x))}</button>`).join('');
    if (orig.size) h += `<div class="sec">${t('insFrom')} · ${orig.size}</div><div class="lst">${lst(orig, '#ef4444')}</div>`;
    if (insr.size) h += `<div class="sec">${t('insTo')} · ${insr.size}</div><div class="lst">${lst(insr, '#06b6d4')}</div>`;
    if (oB.size) h += `<div class="sec">${t('mOrig')}</div><div class="lst">${lst(oB, '#ef4444')}</div>`;
    if (iB.size) h += `<div class="sec">${t('mIns')}</div><div class="lst">${lst(iB, '#06b6d4')}</div>`;
  }
  const sib = ITEMS.filter(x => x.node === it.node && x !== it);
  if (sib.length) h += `<div class="sec">${t('related')} · ${sib.length}</div><div class="lst">` + sib.slice(0, 30).map(x => `<button data-k="${x.k}" style="--dot:#${x.ms[0].userData.base.getHexString()}"><i></i>${esc(nm(x.n))}</button>`).join('') + `</div>`;
  const oth = (C.na[n] || []).filter(a => a !== AT.id).map(a => C.atlases.find(x => x.id === a)).filter(Boolean);
  if (oth.length) h += `<div class="sec">${t('other')}</div><div class="lst">` + oth.map(a => `<button data-at="${a.id}"><span>${a.ic}</span>${esc(tr(a.t))}</button>`).join('') + `</div>`;
  h += `<div class="row2" style="margin-top:14px"><button id="iShare">${t('aShare')}</button></div></div>`;
  pb.innerHTML = h;
  pb.querySelectorAll('.crumbs span').forEach(s => s.onclick = () => { const ni = +s.dataset.node; nodeAnc(ni).forEach(x => OPEN.add(x)); setTab('tree'); });
  $('iOnly').onclick = isoSel; $('iHide').onclick = hideSel; $('iFocus').onclick = () => focusMs(selMeshes()); $('iAll').onclick = showAll;
  const topic = nm(n, 'uz');
  $('iPrez').onclick = () => location.href = '/?prez=' + encodeURIComponent(topic);
  $('iTest').onclick = () => location.href = '/?qtopic=' + encodeURIComponent(topic);
  $('iShare').onclick = share;
  pb.querySelectorAll('[data-lm]').forEach(b => b.onclick = () => { LMSEL = +b.dataset.lm; SHOW_LM = true; updateLm(); setLmLabel(); renderPanel(true); });
  pb.querySelectorAll('[data-goto]').forEach(b => b.onclick = () => { const x = BYN.get(+b.dataset.goto); if (x) select(x, 0, true); else { const at = (C.na[+b.dataset.goto] || [])[0]; if (at) openAtlas(at, +b.dataset.goto); } });
  pb.querySelectorAll('[data-k]').forEach(b => b.onclick = () => select(ITEMS[+b.dataset.k], 0, true));
  pb.querySelectorAll('[data-at]').forEach(b => b.onclick = () => openAtlas(b.dataset.at, n));
}
function share() {
  const u = location.origin + location.pathname + '?a=' + AT.id + (sel ? '&n=' + sel.n : '');
  if (navigator.share) navigator.share({title: 'TadrisAI · ' + tr(AT.t), url: u}).catch(() => {});
  else navigator.clipboard.writeText(u).then(() => toast(t('copied')), () => toast(u));
}

// ------------------------------------------------------------------ O'rganish: test va chuqur o'rganish
function norm(s) { return normS(String(s).replace(/\([^)]*\)/g, ' ')); }
const GENERIC = /\b(suyagi|suyak|mushagi|mushak|arteriyasi|arteriya|venasi|vena|nervi|nerv|kost|кость|мышца|артерия|вена|нерв|os|m|a|v|n|bone|muscle|artery|vein|nerve)\b/g;
function lev(a, b) { const m = a.length, n = b.length; if (Math.abs(m - n) > 3) return 9; let p = Array.from({length: n + 1}, (_, i) => i); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
function matches(ans, n) {
  const a = norm(ans); if (a.length < 2) return false;
  const r = C.names[n]; const cands = [r[1], r[2], r[3], r[0]].filter(Boolean).map(norm);
  for (const c of cands) {
    if (a === c) return true;
    const tol = c.length <= 5 ? 0 : c.length <= 10 ? 1 : 2;
    if (lev(a, c) <= tol) return true;
    const a2 = a.replace(GENERIC, '').replace(/\s+/g, ' ').trim(), c2 = c.replace(GENERIC, '').replace(/\s+/g, ' ').trim();
    if (c2.length >= 3 && a2.length >= 3 && (a2 === c2 || lev(a2, c2) <= (c2.length <= 6 ? 0 : 1))) return true;
  }
  return false;
}
const pool = () => ITEMS.filter(it => it.nv >= 40 && it.ms.some(m => m.visible));
function renderLearn() {
  const pb = $('pb');
  if (Q) return renderQuiz();
  if (DP) return renderDeep();
  const seen = seenGet(AT.id), learned = learnGet(AT.id), P = ITEMS.length ? Math.floor(seen.size / ITEMS.length * 100) : 0;
  pb.innerHTML = `<div class="progc"><b>${t('res')}</b><small>${t('resD', {a: ITEMS.length, b: ITEMS.filter(i => seen.has(i.n)).length})}</small><div class="bar"><i style="width:${P}%"></i></div></div>
    <div class="sec">${t('test')}</div><p class="qs">${t('testD', {n: pool().length})}</p>` +
    [['find', '👆', 'mFind'], ['pick', '🔤', 'mPick'], ['type', '✍️', 'mType'], ['tf', '⚖️', 'mTf']].map(([k, e, l]) => `<button class="mode" data-m="${k}"><em>${e}</em><span><b>${t(l)}</b><small>${t(l + 'D')}</small></span><span class="go">${t('start')}</span></button>`).join('') +
    `<div class="sec">${t('deep')}</div><p class="qs">${t('deepD')}</p><p class="qs">${t('learned', {n: ITEMS.filter(i => learned.has(i.n)).length + ' / ' + ITEMS.length})}</p><button class="cta v" id="dGo">${t('start')}</button>${learned.size ? `<div class="row2"><button id="dR">${t('resetP')}</button></div>` : ''}`;
  pb.querySelectorAll('.mode').forEach(b => b.onclick = () => startQuiz(b.dataset.m));
  $('dGo').onclick = startDeep;
  if ($('dR')) $('dR').onclick = () => { store.set(learnKey(AT.id), []); renderLearn(); };
}
function startQuiz(mode) {
  const list = shuffle(pool()).slice(0, 10); if (!list.length) return;
  Q = {mode, list, i: 0, score: 0, wrong: [], done: false, hint: 0}; sel = null; setLabel(null); selbar(); updateIns(); updateLm(); askQ();
}
function askQ() {
  setLabel(null); Q.fb = null; Q.done = false; Q.hint = 0; Q.miss = false; Q.opts = null;
  if (Q.i < Q.list.length) {
    const it = Q.list[Q.i];
    if (Q.mode === 'tf') { const truth = Math.random() < 0.5; const sib = ITEMS.filter(x => x !== it && x.node === it.node); const any = ITEMS.filter(x => x !== it); const src = sib.length ? sib : any; Q.truth = truth; Q.claim = truth ? it : src[Math.floor(Math.random() * src.length)]; }
    if (Q.mode === 'pick') { const sib = shuffle(ITEMS.filter(x => x !== it && x.node === it.node)), rest = shuffle(ITEMS.filter(x => x !== it && x.node !== it.node)); Q.opts = shuffle([it, ...sib.concat(rest).slice(0, 3)]); }
    HL = Q.mode === 'find' ? new Map() : new Map([[it, '#f97316']]); paint();
    if (Q.mode !== 'find') faceMs(it.ms);
  } else { HL = new Map(); paint(); }
  renderQuiz();
}
function renderQuiz() {
  const pb = $('pb');
  if (Q.i >= Q.list.length) {
    pb.innerHTML = `<div class="score"><div class="qhead">${t('result')}</div><div class="big">${Q.score} / ${Q.list.length}</div></div>
      ${Q.wrong.length ? `<div class="miss"><b>${t('mistakes')}</b><br>${Q.wrong.map(it => '• ' + esc(nm(it.n))).join('<br>')}</div>` : `<p class="qs" style="text-align:center">${t('great')}</p>`}
      <div class="row2" style="margin-top:14px"><button id="qA">${t('again')}</button><button id="qO">${t('other2')}</button></div>`;
    $('qA').onclick = () => startQuiz(Q.mode); $('qO').onclick = () => { Q = null; renderLearn(); }; return;
  }
  const it = Q.list[Q.i];
  let h = `<div class="row2" style="margin:0 0 6px"><button id="qExit" style="flex:none;padding:7px 10px;font-size:12px">${t('exitQ')}</button></div><div class="qhead">${t('qn', {i: Q.i + 1, n: Q.list.length, s: Q.score})}</div><div class="bar"><i style="width:${Q.i / Q.list.length * 100}%"></i></div>`;
  if (Q.mode === 'find') {
    h += `<div class="qq">${esc(t('qFind', {n: nm(it.n)}))}</div><p class="qs">${t('qFindS')}${lat(it.n) ? ' · <i>' + esc(lat(it.n)) + '</i>' : ''}</p>`;
    if (!Q.done) h += `<div class="row2"><button id="qS">${t('showAns')}</button></div>`;
  } else if (Q.mode === 'pick') {
    h += `<div class="qq">${t('qWhat')}</div><p class="qs">${t('qWhatS')}</p><div class="opts">` + Q.opts.map((o, i) => `<button data-i="${i}" class="${Q.done ? (o === it ? 'ok' : (Q.ans === i ? 'bad' : '')) : ''}">${esc(nm(o.n))}</button>`).join('') + `</div>`;
  } else if (Q.mode === 'type') {
    h += `<div class="qq">${t('qWhat')}</div><p class="qs">${t('qWhatS')}</p>`;
    if (!Q.done) h += `<div class="ghost" id="qG">${ghost(nm(it.n), Q.hint)}</div><input class="inp" id="qIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('ph')}"><div class="row2"><button id="qH">${t('hint2')}</button><button id="qD">${t('dunno')}</button></div><button class="cta" id="qC" style="margin-top:8px">${t('check')}</button>`;
  } else {
    h += `<div class="qq">${esc(t('qTf', {n: nm(Q.claim.n)}))}</div><p class="qs">${t('qWhatS')}</p>`;
    if (!Q.done) h += `<div class="tf"><button class="y" id="qY">${t('yes')}</button><button class="n" id="qN">${t('no')}</button></div>`;
  }
  if (Q.fb) h += `<div class="fb ${Q.fb[0]}">${esc(Q.fb[1])}</div>`;
  if (Q.done) h += `<button class="cta" id="qX" style="margin-top:12px">${t('next')}</button>`;
  pb.innerHTML = h;
  $('qExit').onclick = () => { Q = null; HL = new Map(); paint(); setLabel(null); renderLearn(); };
  const fin = (ok, extra) => { if (ok) Q.score++; else Q.wrong.push(it); Q.fb = [ok ? 'ok' : 'bad', ok ? t('okIs', {n: nm(it.n)}) : t('bad', {n: nm(it.n)})]; HL = new Map([[it, ok ? '#22c55e' : '#ef4444']]); paint(); setLabel(it.ms, nm(it.n), lat(it.n), ok ? '#22c55e' : '#ef4444'); Q.done = true; if (ok) seenAdd(AT.id, it.n); renderQuiz(); };
  if (Q.mode === 'pick' && !Q.done) pb.querySelectorAll('.opts button').forEach(b => b.onclick = () => { Q.ans = +b.dataset.i; fin(Q.opts[Q.ans] === it); });
  if (Q.mode === 'type' && !Q.done) {
    const inp = $('qIn'); if (window.innerWidth >= 900) inp.focus();
    inp.onkeydown = e => { if (e.key === 'Enter') fin(matches(inp.value, it.n)); };
    $('qC').onclick = () => fin(matches(inp.value, it.n)); $('qD').onclick = () => fin(false);
    $('qH').onclick = () => { Q.hint = Math.min(Q.hint + 1, nm(it.n).length); $('qG').innerHTML = ghost(nm(it.n), Q.hint); };
  }
  if (Q.mode === 'tf' && !Q.done) { $('qY').onclick = () => fin(Q.truth === true); $('qN').onclick = () => fin(Q.truth === false); }
  if (Q.mode === 'find' && !Q.done) $('qS').onclick = () => { Q.miss = true; HL = new Map([[it, '#22c55e']]); paint(); setLabel(it.ms, nm(it.n), lat(it.n), '#22c55e'); focusMs(it.ms); Q.done = true; Q.wrong.push(it); Q.fb = ['bad', t('bad', {n: nm(it.n)})]; renderQuiz(); };
  if (Q.done) $('qX').onclick = () => { Q.i++; askQ(); };
}
function ghost(name, k) { return [...name].map((c, i) => c === ' ' ? '&nbsp;' : i < k ? `<b>${esc(c)}</b>` : '·').join(''); }
function quizTap(it) {
  if (!Q || Q.done || !it) return;
  const tg = Q.list[Q.i];
  if (it === tg) { if (!Q.miss) Q.score++; else Q.wrong.push(tg); Q.fb = ['ok', t('ok')]; HL = new Map([[it, '#22c55e']]); Q.done = true; setLabel(it.ms, nm(it.n), lat(it.n), '#22c55e'); seenAdd(AT.id, it.n); }
  else { Q.miss = true; Q.fb = ['bad', t('badTap', {n: nm(it.n)})]; HL = new Map([[it, '#ef4444']]); setLabel(it.ms, nm(it.n), '', '#ef4444'); }
  paint(); renderQuiz();
}
function startDeep() {
  const learned = learnGet(AT.id);
  let its = pool().filter(it => !learned.has(it.n));
  if (!its.length) { toast(t('nothing')); return; }
  its = shuffle(its).slice(0, 12);
  DP = {q: its.map(it => ({it, r: 1})), total: its.length, steps: 0, ans: null, fb: null, hint: 1}; sel = null; selbar(); updateIns(); updateLm(); deepShow();
}
function deepShow() { setLabel(null); if (DP.q.length) { HL = new Map([[DP.q[0].it, '#f97316']]); paint(); faceMs(DP.q[0].it.ms); } else { HL = new Map(); paint(); } DP.hint = 1; renderDeep(); }
function renderDeep() {
  const pb = $('pb');
  if (!DP.q.length) { pb.innerHTML = `<div class="score"><div class="big">🎓</div><p class="qs" style="text-align:center">${t('deepDone', {n: DP.total})}</p></div><button class="cta" id="dA">${t('again')}</button>`; $('dA').onclick = () => { DP = null; renderLearn(); }; return; }
  const c = DP.q[0], it = c.it, prog = (DP.steps / (DP.total * 3)) * 100;
  let h = `<div class="row2" style="margin:0 0 6px"><button id="dExit" style="flex:none;padding:7px 10px;font-size:12px">${t('exitQ')}</button></div><div class="qhead">${t('r' + c.r)}</div><div class="bar"><i style="width:${prog}%"></i></div><div class="qq">${t('qWhat')}</div>`;
  if (c.r === 1) {
    if (!c.opts) { const sib = shuffle(ITEMS.filter(x => x !== it && x.node === it.node)), rest = shuffle(ITEMS.filter(x => x !== it && x.node !== it.node)); c.opts = shuffle([it, ...sib.concat(rest).slice(0, 3)]); }
    h += `<div class="opts">` + c.opts.map((o, i) => `<button data-i="${i}" class="${DP.ans != null ? (o === it ? 'ok' : (DP.ans === i ? 'bad' : '')) : ''}">${esc(nm(o.n))}</button>`).join('') + `</div>`;
  } else if (DP.ans == null) {
    h += c.r === 2 ? `<div class="ghost" id="dG">${ghost(nm(it.n), DP.hint)}</div>` : '';
    h += `<input class="inp" id="dIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('ph')}"><div class="row2">${c.r === 2 ? `<button id="dH">${t('hint2')}</button>` : ''}<button id="dD">${t('dunno')}</button></div><button class="cta" id="dC" style="margin-top:8px">${t('check')}</button>`;
  }
  if (DP.fb) h += `<div class="fb ${DP.fb[0]}">${esc(DP.fb[1])}</div>${DP.ans != null && lat(it.n) ? `<p class="qs" style="margin-top:8px"><i>${esc(lat(it.n))}</i> · ${esc(nm(it.n, LANG === 'ru' ? 'uz' : 'ru'))}</p>` : ''}`;
  if (DP.ans != null) h += `<button class="cta" id="dX" style="margin-top:12px">${t('next')}</button>`;
  pb.innerHTML = h;
  $('dExit').onclick = () => { DP = null; HL = new Map(); paint(); setLabel(null); renderLearn(); };
  if (c.r === 1 && DP.ans == null) pb.querySelectorAll('.opts button').forEach(b => b.onclick = () => deepAnswer(c.opts[+b.dataset.i] === it, +b.dataset.i));
  if (c.r > 1 && DP.ans == null) {
    const inp = $('dIn'); if (window.innerWidth >= 900) inp.focus();
    inp.onkeydown = e => { if (e.key === 'Enter') deepAnswer(matches(inp.value, it.n), 0); };
    $('dC').onclick = () => deepAnswer(matches(inp.value, it.n), 0); $('dD').onclick = () => deepAnswer(false, 0);
    if ($('dH')) $('dH').onclick = () => { DP.hint = Math.min(DP.hint + 1, nm(it.n).length); $('dG').innerHTML = ghost(nm(it.n), DP.hint); };
  }
  if (DP.ans != null) $('dX').onclick = deepNext;
}
function deepAnswer(ok, i) { const c = DP.q[0]; DP.ans = i; DP.ok = ok; DP.fb = ok ? ['ok', t('okIs', {n: nm(c.it.n)})] : ['bad', t('bad', {n: nm(c.it.n)})]; HL = new Map([[c.it, ok ? '#22c55e' : '#ef4444']]); paint(); setLabel(c.it.ms, nm(c.it.n), lat(c.it.n), ok ? '#22c55e' : '#ef4444'); renderDeep(); }
function deepNext() {
  const c = DP.q.shift();
  if (DP.ok) { DP.steps++; c.r++; c.opts = null; if (c.r > 3) { learnAdd(AT.id, c.it.n); seenAdd(AT.id, c.it.n); } else DP.q.splice(Math.min(3, DP.q.length), 0, c); }
  else { c.opts = null; DP.q.splice(Math.min(2, DP.q.length), 0, c); }
  DP.ans = null; DP.fb = null; deepShow();
}

// ------------------------------------------------------------------ asboblar paneli
function closePops(except) { ['popView', 'popCut', 'popMore'].forEach(p => { if (p !== except) $(p).classList.add('hide'); }); }
function togglePop(id, build) { const el = $(id); const open = el.classList.contains('hide'); closePops(id); if (open) { build(el); el.classList.remove('hide'); } else el.classList.add('hide'); }
function buildView(el) {
  const D = {vF: [0, 0.05, 1], vB: [0, 0.05, -1], vL: [-1, 0.05, 0], vR: [1, 0.05, 0], vT: [0, 1, 0.001], vD: [0, -1, 0.001]};
  el.innerHTML = `<h4>${t('view')}</h4>` + Object.keys(D).map(k => `<button class="mi" data-v="${k}">${t(k)}</button>`).join('') + `<button class="mi" data-v="fit">⛶ ${t('vFit')}<kbd>F</kbd></button>`;
  el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { const k = b.dataset.v; if (k === 'fit') resetView(camera.position.clone().sub(controls.target)); else resetView(new THREE.Vector3(...D[k])); el.classList.add('hide'); });
}
function buildCut(el) {
  el.innerHTML = `<h4>${t('cut')}</h4><p>${t('cutD')}</p><div class="seg">${[[-1, 'cNone'], [0, 'cAx'], [1, 'cSag'], [2, 'cFr']].map(([v, k]) => `<button data-c="${v}" class="${CUT.ax === v ? 'on' : ''}">${t(k)}</button>`).join('')}</div>
    <p style="margin-bottom:0">${t('cPos')}</p><input class="rng" type="range" min="-100" max="100" value="${Math.round(CUT.pos * 100)}" id="cPos" ${CUT.ax < 0 ? 'disabled' : ''}>
    <label class="chk"><input type="checkbox" id="cFlip" ${CUT.flip ? 'checked' : ''}> ${t('cFlip')}</label>`;
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { CUT.ax = +b.dataset.c; applyCut(); buildCut(el); labels(); });
  $('cPos').oninput = e => { CUT.pos = e.target.value / 100; applyCut(); };
  $('cFlip').onchange = e => { CUT.flip = e.target.checked; applyCut(); };
}
function buildMore(el) {
  el.innerHTML = `<h4>${t('mSel')}</h4><button class="mi" data-m="hide">${t('hideSel')}<kbd>H</kbd></button><button class="mi" data-m="iso">${t('iso')}<kbd>I</kbd></button><button class="mi" data-m="grp">${t('mGroup')}</button><button class="mi" data-m="all">${t('showAll')}<kbd>A</kbd></button><button class="mi" data-m="focus">${t('mFocus')}<kbd>F</kbd></button>
    <button class="mi${BOTH ? ' on' : ''}" data-m="both">${t('both')}</button>${AT.lm ? `<button class="mi${SHOW_LM ? ' on' : ''}" data-m="lm">${t('mLm')}</button>` : ''}<button class="mi" data-m="full">${t('mFull')}</button><p style="margin-top:8px">${t('mKeys')}</p>`;
  el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    const k = b.dataset.m;
    if (k === 'hide') hideSel(); if (k === 'iso') isoSel(); if (k === 'grp') isoGroup(); if (k === 'all') showAll(); if (k === 'focus' && sel) focusMs(selMeshes());
    if (k === 'both') { BOTH = !BOTH; labels(); if (sel) select(sel, selSide); }
    if (k === 'lm') { SHOW_LM = !SHOW_LM; updateLm(); }
    if (k === 'full') { const d = document; if (d.fullscreenElement) d.exitFullscreen().catch(() => {}); else (d.documentElement.requestFullscreen || d.documentElement.webkitRequestFullscreen || (() => {})).call(d.documentElement); }
    el.classList.add('hide');
  });
}

// ------------------------------------------------------------------ boshqaruv
function goHome() {
  $('view').classList.add('hide'); $('home').classList.remove('hide'); AT = null; Q = null; DP = null; closePops(); openPanel(false);
  history.replaceState(null, '', location.pathname + (DEV ? '?dev=1' : '')); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); renderHome(); window.scrollTo(0, 0);
}
function bind() {
  $('vBack').onclick = goHome; $('vCrumb').onclick = goHome;
  $('tabs').querySelectorAll('button').forEach(b => b.onclick = () => setTab(b.dataset.t));
  $('bPanel').onclick = () => openPanel(!$('panel').classList.contains('open')); $('pClose').onclick = () => openPanel(false);
  $('sbGo').onclick = () => { setTab('info'); openPanel(true); }; $('sbX').onclick = unselect;
  $('tHome').onclick = () => { closePops(); resetView(); };
  $('tView').onclick = () => togglePop('popView', buildView);
  $('tCut').onclick = () => togglePop('popCut', buildCut);
  $('tMore').onclick = () => togglePop('popMore', buildMore);
  $('tBoth').onclick = () => { BOTH = !BOTH; labels(); if (sel) select(sel, selSide); toast(t('both') + ': ' + (BOTH ? '✓' : '✕')); };
  $('tHide').onclick = hideSel; $('tIso').onclick = isoSel; $('tAll').onclick = showAll;
  $('tXray').onclick = () => { XRAY = !XRAY; labels(); paint(); };
  $('exp').oninput = e => setExplode(e.target.value / 100);
  $('bGrid').onclick = () => toggleGrid();
  let playing = 0;
  $('bPlay').onclick = () => {
    if (playing) return; const from = explodeK, to = from > 0.5 ? 0 : 1, t0 = performance.now(); playing = 1;
    const tick = now => { const k = Math.min(1, (now - t0) / 1200), v = from + (to - from) * ease(k); setExplode(v); $('exp').value = v * 100; if (k < 1) requestAnimationFrame(tick); else playing = 0; };
    requestAnimationFrame(tick);
  };
  $('gq').oninput = e => gsearch(e.target.value);
  document.addEventListener('click', e => { if (!e.target.closest('.srch')) $('gres').classList.add('hide'); if (!e.target.closest('.pop') && !e.target.closest('.tb')) closePops(); });
  document.addEventListener('keydown', e => {
    if ($('view').classList.contains('hide') || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const k = e.key.toLowerCase();
    if (k === 'h') hideSel(); else if (k === 'i') isoSel(); else if (k === 'a') showAll(); else if (k === 'f') { if (sel) focusMs(selMeshes()); else resetView(); }
    else if (k === 'x') { XRAY = !XRAY; labels(); paint(); } else if (k === 'g') toggleGrid(); else if (k === 'escape') { closePops(); if (!Q && !DP) unselect(); }
  });
}

(async () => {
  const ok = await gate();
  if (!ok) { $('lkT').textContent = t('lockT'); $('lkD').textContent = t('lockD'); $('lkB').textContent = t('lockB'); $('lock').classList.remove('hide'); return; }
  C = await (await fetch('z/cat.json?v=' + V)).json();
  if (QS.get('shot') && DEV) { document.body.classList.add('shot'); window.__za = {view: (x, y, z) => { resetView(new THREE.Vector3(x, y, z), true); }, ready: () => !!(AT && MESHES.length && $('load').classList.contains('hide')), ctx: on => { LAYV[0] = on; applyVis(); paint(); }}; }
  fetch('z/info.json?v=' + V).then(r => r.ok ? r.json() : null).then(d => { INFO = d; if (AT && TAB === 'info') renderPanel(true); }).catch(() => {});
  document.documentElement.lang = LANG;
  bind(); renderHome();
  const a = QS.get('a');
  if (a && C.atlases.some(x => x.id === a)) openAtlas(a, QS.get('n') != null ? +QS.get('n') : null); else $('home').classList.remove('hide');
})();
