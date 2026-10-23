import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fetchSeoJson } from '../src/utils/seoFetch.mjs';

test('missing configuration fails before a request instead of becoming a missing page', async () => {
  const originalFetch = global.fetch;
  global.fetch = () => assert.fail('A missing base URL must not start a request');
  try {
    for (const base of [undefined, '', '   ']) {
      await assert.rejects(fetchSeoJson(base, '/api/seo/example'), /API URL is required/);
    }
  } finally {
    global.fetch = originalFetch;
  }
});

test('only an explicit detail 404 returns null; catalogue 404 and server errors throw', async () => {
  const originalFetch = global.fetch;
  try {
    global.fetch = async () => ({ status: 404, ok: false });
    assert.equal(await fetchSeoJson('https://example.invalid', '/detail'), null);
    await assert.rejects(
      fetchSeoJson('https://example.invalid', '/search', { allowNotFound: false }),
      /404/,
    );
    global.fetch = async () => ({ status: 503, ok: false });
    await assert.rejects(fetchSeoJson('https://example.invalid', '/detail'), /503/);
  } finally {
    global.fetch = originalFetch;
  }
});

test('transport errors propagate and malformed successful JSON cannot look like a missing page', async () => {
  const originalFetch = global.fetch;
  try {
    const timeout = new Error('fixture timeout');
    global.fetch = async () => {
      throw timeout;
    };
    await assert.rejects(
      fetchSeoJson('https://example.invalid', '/detail'),
      (error) => error === timeout,
    );
    for (const payload of [null, [], 'error']) {
      global.fetch = async () => ({ ok: true, status: 200, json: async () => payload });
      await assert.rejects(fetchSeoJson('https://example.invalid', '/detail'), /invalid response/);
    }
    global.fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({ name: 'Institute' }),
    });
    assert.deepEqual(await fetchSeoJson('https://example.invalid/', '/detail'), {
      name: 'Institute',
    });
  } finally {
    global.fetch = originalFetch;
  }
});
