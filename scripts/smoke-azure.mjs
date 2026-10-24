import assert from 'node:assert/strict';

const base = process.env.SMOKE_BASE_URL?.replace(/\/$/, '');
assert.ok(base, 'SMOKE_BASE_URL is required');
const canonical = 'https://www.rankmatrix.in';
const paths = [
  '/', '/colleges', '/branches', '/predict', '/ranks', '/seat-matrix',
  '/guides/reading-cutoff-trends', '/methodology',
  '/colleges/national-institute-of-technology-tiruchirappalli/chemical-engineering',
];
for (const path of paths) {
  const res = await fetch(base + path, { signal: AbortSignal.timeout(60000) });
  assert.equal(res.status, 200, `${path}: HTTP status`);
  const html = await res.text();
  assert.ok(html.includes(`${canonical}${path === '/' ? '' : path}`), `${path}: canonical`);
  assert.match(html, /<h1[\s>]/, `${path}: server-rendered heading`);
  assert.match(html, /<main[\s>]/, `${path}: main content`);
  if (base.includes('.azurecontainerapps.io')) {
    assert.equal(res.headers.get('x-robots-tag'), 'noindex', `${path}: staging host noindex`);
  }
  console.log(`PASS ${path}`);
}
const sitemap = await fetch(base + '/sitemap-0.xml', { signal: AbortSignal.timeout(60000) });
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
assert.ok(xml.includes(`${canonical}/guides/reading-cutoff-trends`), 'generated guide sitemap entry');
assert.ok((xml.match(/<loc>/g) || []).length > 1400, 'complete catalogue sitemap');
const robots = await fetch(base + '/robots.txt', { signal: AbortSignal.timeout(60000) });
assert.equal(robots.status, 200);
assert.ok((await robots.text()).includes(`${canonical}/sitemap.xml`));
const missing = await fetch(base + '/colleges/unknown-azure-smoke-test', { signal: AbortSignal.timeout(60000) });
assert.equal(missing.status, 404, 'unknown institute must not return soft 404');
console.log('PASS sitemap, robots and 404');

// Static/ISR pages alone can look healthy while their data API is unavailable.
const api = process.env.SMOKE_API_URL || 'https://api.rankmatrix.in';
const catalogue = await fetch(`${api}/api/seo/slugs`, { signal: AbortSignal.timeout(30000) });
assert.equal(catalogue.status, 200, 'public data API status');
const data = await catalogue.json();
for (const family of ['institutes', 'branches', 'cutoffs']) {
  assert.ok(Array.isArray(data[family]) && data[family].length > 0, `public data API: ${family}`);
}
console.log('PASS public data API');
