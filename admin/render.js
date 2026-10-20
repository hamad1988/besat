/* مولّد صفحات المنتجات وقسم الصفحة الرئيسية وخريطة الموقع — مصدر واحد تستخدمه لوحة الإدارة */
(function (root) {
  var SITE = 'https://besaatkuw.com/';
  var TEL = 'tel:+96555448190';
  var WA_NUM = '96555448190';
  var MAP = 'https://share.google/VEDA1xmhd2v887Qgk';
  var IC_WA = '<svg class="wa-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  var IC_PH = '<svg class="wa-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg>';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* رابط عربي نظيف: حروف وأرقام فقط، والمسافات شرطات */
  function slugify(name, taken) {
    var base = String(name).trim().replace(/[ً-ْـ]/g, '')
      .replace(/[^؀-ۿa-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'منتج';
    var s = base, i = 2;
    while ((taken || []).indexOf(s) >= 0) s = base + '-' + (i++);
    return s;
  }
  function path(p) { return 'products/' + p.slug + '/'; }
  function abs(p) { return SITE + encodeURI(path(p)); }
  function short(s, n) { s = String(s).replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s\S*$/, '') + '…' : s; }

  function card(p, cls) {
    return '<a class="' + cls + '" href="/' + esc(encodeURI(path(p))) + '"><img loading="lazy" src="/' + esc(p.image) + '" alt="' + esc(p.name) + '" width="' + (p.w || 1200) + '" height="' + (p.h || 900) + '">' +
      (cls === 'card' ? '<span>' + esc(p.name) + '</span>' : '<div class="cap"><h3>' + esc(p.name) + '</h3><p>' + esc(short(p.desc, 110)) + '</p></div>') + '</a>';
  }

  function replaceBetween(h, tag, content) {
    var a = '<!--' + tag + ':START-->', b = '<!--' + tag + ':END-->';
    var i = h.indexOf(a), j = h.indexOf(b);
    if (i < 0 || j < 0) throw new Error('علامة ' + tag + ' غير موجودة');
    return h.slice(0, i + a.length) + content + h.slice(j);
  }

  /* الصفحة الرئيسية: «آخر أعمالنا» للمنتجات المضافة، و«معرض الصور» للعينات */
  function applyHome(html, list) {
    var latest = list.filter(function (p) { return !p.sample; });
    var samples = list.filter(function (p) { return p.sample; });
    var sec = latest.length ? '<section class="section works-section" id="latest"><div class="heading"><div><p class="eyebrow">جديدنا</p><h2>آخر أعمالنا</h2></div><p>أحدث المنتجات والأعمال المضافة من بساط للأثاث والمفروشات.</p></div><div class="works">' +
      latest.map(function (p) { return card(p, 'work'); }).join('') + '</div></section>' : '';
    html = replaceBetween(html, 'LATEST-NAV', latest.length ? '<a href="#latest">آخر أعمالنا</a>' : '');
    html = replaceBetween(html, 'LATEST', sec);
    html = replaceBetween(html, 'GALLERY', samples.map(function (p) { return card(p, 'card'); }).join(''));
    return html;
  }

  /* صفحة مستقلة لكل منتج */
  function productPage(p) {
    var url = abs(p), title = p.name + ' | بساط للأثاث والمفروشات', d = short(p.desc, 155);
    var img = SITE + p.image;
    var wa = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent('مرحباً بساط، أود الاستفسار عن: ' + p.name + '\n' + url);
    var ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', 'name': p.name, 'url': url, 'description': d, 'inLanguage': 'ar', 'primaryImageOfPage': { '@type': 'ImageObject', 'url': img },
        'isPartOf': { '@type': 'WebSite', 'name': 'بساط للأثاث والمفروشات', 'alternateName': 'Besat', 'url': SITE } },
      { '@type': 'BreadcrumbList', 'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'الرئيسية', 'item': SITE },
        { '@type': 'ListItem', 'position': 2, 'name': p.name, 'item': url }] }] };
    var imgs = [p.image].concat(p.more || []);
    return '<!doctype html><html lang="ar" dir="rtl"><head>\n<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n' +
      '<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(d) + '">\n' +
      '<meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#17213f">\n' +
      '<link rel="icon" href="/assets/logo-besat.jpg"><link rel="canonical" href="' + esc(url) + '">\n' +
      '<meta property="og:type" content="website"><meta property="og:locale" content="ar_KW"><meta property="og:site_name" content="بساط للأثاث والمفروشات | Besat"><meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(d) + '"><meta property="og:image" content="' + esc(img) + '"><meta property="og:url" content="' + esc(url) + '">\n' +
      '<link rel="stylesheet" href="/styles.css"><script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '</script></head>\n' +
      '<body><header><a class="brand" href="/"><img src="/assets/logo-besat.jpg" alt="أيقونة بساط"><span><b>بساط</b><small>للأثاث والمفروشات</small></span></a><button class="toggle" aria-label="فتح القائمة">☰</button><nav><a href="/">الرئيسية</a><a href="/#services">خدماتنا</a><a href="/#gallery">معرض الصور</a><a href="/#contact">تواصل معنا</a></nav></header>\n' +
      '<main class="section product"><div class="crumbs" role="navigation" aria-label="مسار الصفحة"><a href="/">الرئيسية</a> › <span>' + esc(p.name) + '</span></div>' +
      '<div class="product-grid"><div class="product-media">' + imgs.map(function (src, i) {
        return '<a href="/' + esc(src) + '" target="_blank" rel="noopener"><img src="/' + esc(src) + '" alt="' + esc(p.name) + (i ? ' - صورة ' + (i + 1) : '') + '"' + (i ? ' loading="lazy"' : '') + (i === 0 ? ' width="' + (p.w || 1200) + '" height="' + (p.h || 900) + '"' : '') + '></a>';
      }).join('') + '</div>' +
      '<div class="product-info"><p class="eyebrow">بساط للأثاث والمفروشات</p><h1>' + esc(p.name) + '</h1><p class="product-desc">' + esc(p.desc) + '</p>' +
      '<div class="contact-actions"><a class="btn wa-btn" href="' + esc(wa) + '" target="_blank" rel="noopener">' + IC_WA + 'استفسر عبر واتساب</a><a class="btn dark" href="' + TEL + '">' + IC_PH + 'اتصال</a></div>' +
      '<p class="info">المحل: الضجيج — الكويت · <a href="' + MAP + '" target="_blank" rel="noopener">موقعنا على الخريطة</a></p>' +
      '<a class="back" href="/#gallery">← تصفح جميع المنتجات</a></div></div></main>\n' +
      '<footer><b>بساط — للأثاث والمفروشات</b><p>متخصصون في السجاد والموكيت — الكويت</p><p>الضجيج — الكويت · هاتف: <a href="' + TEL + '" dir="ltr">55448190</a></p><p>رقم السجل التجاري: 475436</p><small>© <span id="year"></span> بساط. جميع الحقوق محفوظة.</small></footer>\n' +
      '<a class="float call" href="' + TEL + '" aria-label="اتصل بنا" title="اتصال">' + IC_PH + '</a><a class="float wa" href="' + esc(wa) + '" target="_blank" rel="noopener" aria-label="تواصل عبر واتساب" title="واتساب">' + IC_WA + '</a>\n' +
      "<script>document.getElementById('year').textContent=new Date().getFullYear();const nav=document.querySelector('nav');document.querySelector('.toggle').onclick=()=>nav.classList.toggle('open');</script></body></html>\n";
  }

  /* خريطة الموقع كاملة: الرئيسية + كل منتج مع صورته */
  function sitemap(list) {
    var dates = list.map(function (p) { return p.date || ''; }).filter(Boolean).sort();
    var home = dates.length ? dates[dates.length - 1] : '';
    var x = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
      '  <url><loc>' + SITE + '</loc>' + (home ? '<lastmod>' + home + '</lastmod>' : '') + '</url>\n';
    list.forEach(function (p) {
      x += '  <url><loc>' + esc(abs(p)) + '</loc>' + (p.date ? '<lastmod>' + p.date + '</lastmod>' : '') +
        [p.image].concat(p.more || []).map(function (i) { return '<image:image><image:loc>' + esc(SITE + i) + '</image:loc></image:image>'; }).join('') + '</url>\n';
    });
    return x + '</urlset>\n';
  }

  var api = { esc: esc, slugify: slugify, path: path, abs: abs, applyHome: applyHome, productPage: productPage, sitemap: sitemap };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.BasatRender = api;
})(this);
