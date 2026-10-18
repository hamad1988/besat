'use strict';
/* ==========================================================================
   إعدادات نظام فواتير شركة بساط — الاسم والهاتف والترقيم والشروط.
   (الأصناف والخامات ومدد الضمان في codes.json)
   الاسم والهاتف والترقيم والشروط تقدر تعدّلها أيضًا من «الإعدادات» داخل التطبيق.
   ========================================================================== */
window.INVOICE_CONFIG = {
  // رابط الموقع الذي فيه صفحة التحقق /verify/
  site: 'https://besaatkuw.com',
  shop: {
    ar: { name: 'شركة بساط لتنجيد الأثاث والمفروشات', tagline: 'سجاد وموكيت — الكويت', address: 'الضجيج — مجمع علي عبدالوهاب، الكويت' },
    en: { name: 'Besat Furniture Upholstery & Furnishings Co.', tagline: 'Carpets & moquette — Kuwait', address: 'Al-Dajeej, Ali Abdulwahab Complex, Kuwait' },
    phone: '65061072',
    whatsapp: '96565061072', // صيغة دولية بدون +
    instagram: '', // يُضاف عند توفره، مثل '@basat'
    logo: '/brand/icon-512.png',
  },
  // مستودع GitHub الذي يُرفع إليه المفتاح العام عند تفعيل جهاز
  repo: { owner: 'hamad1988', repo: 'besat', branch: 'main' },
  keysPath: 'verify-keys.json',
  // لا توجد خزنة توكن في هذا الموقع: يُفعَّل الجهاز بلصق توكن GitHub مرة واحدة
  vaultPath: '',
  storagePrefix: 'bsinv', // بادئة التخزين في الجهاز
  keyDbName: 'basat-invoice', // مخزن مفتاح التوقيع داخل الجهاز
  // ترقيم المستندات: بادئة + رقم بعدد خانات ثابت. يُعدَّل من الإعدادات أيضًا.
  // version: ارفعه عند تغيير البادئة أو رقم البداية هنا ليُطبَّق على الأجهزة المستخدمة من قبل
  numbering: { version: 1, invoicePrefix: 'BQ04/', invoiceStart: 4739, quotePrefix: 'BQ/', quoteStart: 1, digits: 6 },
  quoteValidityDays: 14,
  verifyLang: 'en', // لغة صفحة التحقق الافتراضية (ar أو en)
  terms: {
    invoice: {
      ar: [
        'الأسعار حسب المقاسات المأخوذة في الموقع والخامة المختارة.',
        'يبدأ التنفيذ بعد استلام العربون، ويُستكمل باقي المبلغ عند التسليم.',
        'السجاد والموكيت المقصوص حسب المقاس لا يُسترجع إلا في حالة العيب المصنعي.',
        'الضمان حسب المدة المذكورة لكل بند.',
      ],
      en: [
        'Prices are based on the on-site measurements and the selected material.',
        'Work starts after the deposit is received; the balance is due on delivery.',
        'Carpet and moquette cut to size are non-returnable except for manufacturing defects.',
        'Warranty is as stated for each item.',
      ],
    },
    quote: {
      ar: [
        'هذا عرض سعر وليس فاتورة، وهو صالح حتى التاريخ المذكور.',
        'الأسعار مبنية على المقاسات والخامات المذكورة، وتُعتمد نهائيًا بعد أخذ المقاسات الدقيقة في الموقع.',
        'يبدأ التنفيذ بعد الموافقة على العرض واستلام العربون.',
      ],
      en: [
        'This is a quotation, not an invoice, and is valid until the date stated.',
        'Prices are based on the stated sizes and materials and are confirmed after exact on-site measurements.',
        'Work starts after the quotation is approved and the deposit is received.',
      ],
    },
  },
};
