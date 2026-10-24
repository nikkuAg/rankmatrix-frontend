import assert from 'node:assert/strict';
import { test } from 'node:test';
import config from '../next.config.mjs';

test('staging proxy is opt-in and exposes only the existing public tool endpoints', async () => {
  const previousFlag = process.env.NEXT_PUBLIC_API_PROXY;
  const previousUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    delete process.env.NEXT_PUBLIC_API_PROXY;
    assert.deepEqual(await config.rewrites(), []);
    process.env.NEXT_PUBLIC_API_PROXY = 'true';
    process.env.NEXT_PUBLIC_API_URL = 'https://api.rankmatrix.in';
    const rewrites = await config.rewrites();
    assert.deepEqual(
      rewrites.map(({ source }) => source),
      [
        '/api/site/content',
        '/api/site/content/branch',
        '/api/site/content/seat',
        '/api/site/content/rank',
        '/api/institutes/search',
        '/api/branches/search',
        '/api/josaa/seats/search',
        '/api/josaa/ranks/search',
        '/api/predictions/institute',
      ],
    );
    for (const { source, destination } of rewrites) {
      assert.equal(destination, `https://api.rankmatrix.in${source}`);
      assert.equal(source.includes('*'), false);
    }
  } finally {
    for (const [name, value] of [
      ['NEXT_PUBLIC_API_PROXY', previousFlag],
      ['NEXT_PUBLIC_API_URL', previousUrl],
    ]) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
