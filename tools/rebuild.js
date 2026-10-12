// يعيد توليد صفحات المنتجات والصفحة الرئيسية وخريطة الموقع من products.json
// الاستخدام: node tools/rebuild.js
const fs = require('fs'), path = require('path');
const R = require('../admin/render.js');
const root = path.join(__dirname, '..');
const list = JSON.parse(fs.readFileSync(path.join(root, 'products.json'), 'utf8'));
const idx = path.join(root, 'index.html');
fs.writeFileSync(idx, R.applyHome(fs.readFileSync(idx, 'utf8'), list));
fs.rmSync(path.join(root, 'products'), { recursive: true, force: true });
for (const p of list) {
  const dir = path.join(root, R.path(p));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), R.productPage(p));
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), R.sitemap(list));
console.log('pages:', list.length);
