import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isInitialCatalogueRequest } from '../src/utils/catalogue.mjs';
import { serializeJsonLd } from '../src/utils/jsonLd.js';

test('server catalogue data is used only for the unfiltered first page', () => {
  const initial = { page: 1, pageSize: 25, search: '', ordering: null, filters: {} };
  assert.equal(isInitialCatalogueRequest(initial), true);
  for (const change of [
    { page: 2 },
    { search: 'IIT' },
    { filters: { type: ['IIT'] } },
    { ordering: 'name' },
    { pageSize: 50 },
  ]) {
    assert.equal(isInitialCatalogueRequest({ ...initial, ...change }), false);
  }
});

test('structured-data text cannot terminate its script element', () => {
  const value = { name: '</script><script>alert(1)</script>' };
  const serialized = serializeJsonLd(value);
  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), value);
});
