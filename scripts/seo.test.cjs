const assert = require('node:assert/strict');
const { test } = require('node:test');
// Fetches are mocked: the suite must not rely on a developer's local .env.
process.env.NEXT_PUBLIC_API_URL = 'https://example.invalid';
const config = require('../next-sitemap.config.js');

test('sitemap includes each catalogue URL family and deduplicates URLs', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      institutes: [{ slug: 'iit-example' }, { slug: 'iit-example' }, { slug: '' }],
      branches: [{ slug: 'computer-science' }],
      cutoffs: [{ institute_slug: 'iit-example', branch_slug: 'computer-science' }],
    }),
  });
  try {
    const paths = await config.additionalPaths(config);
    assert.deepEqual(
      paths.map((entry) => entry.loc),
      [
        '/colleges/iit-example',
        '/branches/computer-science',
        '/colleges/iit-example/computer-science',
      ],
    );
    assert(paths.every((entry) => !entry.lastmod));
    assert.equal(config.siteUrl, 'https://www.rankmatrix.in');
    assert.equal(config.autoLastmod, false);
  } finally {
    global.fetch = originalFetch;
  }
});

test('API failure cannot silently publish a sitemap missing the catalogue', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({ ok: false, status: 503 });
  try {
    await assert.rejects(config.additionalPaths(config), /503/);
  } finally {
    global.fetch = originalFetch;
  }
});

test('dynamic data pages are allowed in sitemap transforms without false freshness', async () => {
  for (const path of ['/branches/computer-science', '/colleges/iit-example/computer-science']) {
    const result = await config.transform(config, path);
    assert.equal(result.loc, path);
    assert.equal(result.lastmod, undefined);
  }
});

test('a successful HTTP response with a malformed catalogue fails generation', async () => {
  const originalFetch = global.fetch;
  try {
    for (const payload of [
      null,
      {},
      { institutes: [], branches: {}, cutoffs: [] },
      { institutes: [null], branches: [], cutoffs: [] },
    ]) {
      global.fetch = async () => ({ ok: true, json: async () => payload });
      await assert.rejects(config.additionalPaths(config), /catalogue response/);
    }
  } finally {
    global.fetch = originalFetch;
  }
});
