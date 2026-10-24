import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('health returns the running release, is dynamic, and cannot be cached or indexed', async () => {
  const source = await readFile(new URL('../src/app/health/route.js', import.meta.url), 'utf8');
  const route = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const original = process.env.RELEASE_SHA;
  try {
    process.env.RELEASE_SHA = 'first-release';
    assert.deepEqual(await route.GET().json(), { status: 'ok', release: 'first-release' });
    process.env.RELEASE_SHA = 'second-release';
    const response = route.GET();
    assert.equal((await response.json()).release, 'second-release');
    assert.equal(route.dynamic, 'force-dynamic');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex');
  } finally {
    if (original === undefined) delete process.env.RELEASE_SHA;
    else process.env.RELEASE_SHA = original;
  }
});
