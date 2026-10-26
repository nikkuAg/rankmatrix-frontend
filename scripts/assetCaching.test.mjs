import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import config from '../next.config.mjs';

const { pathToRegexp } = createRequire(import.meta.url)('next/dist/compiled/path-to-regexp');

test('mutable public assets use short caching without shadowing fingerprinted Next assets', async () => {
  const rules = (await config.headers()).filter((rule) =>
    rule.headers.some((header) => header.key.toLowerCase() === 'cache-control'),
  );
  const cacheFor = (path) => rules.filter((rule) => pathToRegexp(rule.source).test(path));
  for (const path of ['/logo.svg', '/favicon.ico', '/images/example.png', '/fonts/example.woff2']) {
    assert.equal(cacheFor(path).length, 1, path);
  }
  for (const path of [
    '/_next/static/media/font-hash.woff2',
    '/_next/static/media/image-hash.png',
    '/_next/static/chunks/chunk-hash.js',
    '/_next/static/chunks/style-hash.css',
    '/', '/health', '/api/site/content', '/colleges',
  ]) {
    assert.equal(cacheFor(path).length, 0, path);
  }
});
