/* TadrisAI · Meta Pixel va reklama kodi (2026-11-25, egasi).
   1) Meta Pixel (ID 1590560022883674): har sahifada PageView. Telegram ichida (mini ilova) yuklanmaydi.
   2) ?ad=<kod> bilan kelganda kod 30 kun saqlanadi (localStorage + cookie); serverga «saytga kirdi» deb bir marta yoziladi.
   3) TPX.track(nom, ma'lumot, event_id) — server (Conversions API) bilan bir xil event_id: Meta ikki marta sanamaydi.
      Sahifa qayta yuklanadigan joyda hodisa navbatga yoziladi va keyingi ochilishda yuboriladi. */
(function () {
  var PIXEL = '1590560022883674', DAY = 864e5;
  var tg = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData;
  var API = (/(^|\.)tadris\.ai$/i.test(location.hostname) ? location.origin : 'https://91-107-229-30.sslip.io') + '/api';
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function cookie(k) { var m = document.cookie.match('(?:^|; )' + k + '=([^;]*)'); return m ? decodeURIComponent(m[1]) : ''; }
  // --- reklama kodi
  var q = new URLSearchParams(location.search), ad = (q.get('ad') || '').trim();
  if (/^[A-Za-z0-9_-]{1,40}$/.test(ad)) {
    ad = ad.toLowerCase();
    ls('tadris_ad', JSON.stringify({c: ad, t: Date.now()}));
    try { document.cookie = 'tadris_ad=' + ad + ';max-age=' + 30 * 86400 + ';path=/;SameSite=Lax;Secure'; } catch (e) {}
    var vid = ls('tadris_vid'); if (!vid) { vid = Math.random().toString(36).slice(2) + Date.now().toString(36); ls('tadris_vid', vid); }
    try { fetch(API + '/ad/visit', {method: 'POST', headers: {'Content-Type': 'text/plain'}, body: JSON.stringify({ad: ad, vid: vid, ws: ls('tadris_ws') || ''}), keepalive: true}); } catch (e) {}
  }
  function adCode() {
    try { var o = JSON.parse(ls('tadris_ad') || 'null'); if (o && Date.now() - o.t < 30 * DAY) return o.c; } catch (e) {}
    return cookie('tadris_ad') || '';
  }
  // --- Meta Pixel (rasmiy kod)
  if (!tg) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL); fbq('track', 'PageView');
  }
  function track(name, data, id) { if (tg || !window.fbq) return; fbq('track', name, data || {}, id ? {eventID: id} : undefined); }
  function later(name, data, id) {             // sahifa qayta yuklanishidan oldin: navbatga
    try { var a = JSON.parse(ls('tadris_pxq') || '[]'); a.push([name, data || {}, id || '']); ls('tadris_pxq', JSON.stringify(a.slice(-5))); } catch (e) {}
  }
  try { var pend = JSON.parse(ls('tadris_pxq') || '[]'); ls('tadris_pxq', null); pend.forEach(function (x) { track(x[0], x[1], x[2]); }); } catch (e) {}
  window.TPX = {ad: adCode, fbp: function () { return cookie('_fbp'); }, fbc: function () {
    var c = cookie('_fbc'); if (c) return c; var id = q.get('fbclid'); return id ? 'fb.1.' + Date.now() + '.' + id : ''; },
    track: track, later: later};
})();
