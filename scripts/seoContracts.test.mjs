import assert from 'node:assert/strict';
import test from 'node:test';
import { requireArrays, requireCatalogue } from '../src/utils/seoContracts.mjs';

test('a malformed successful catalogue cannot become a false empty SSR page', () => {
  for (const data of [{}, { data: {} }, { data: [null] }, { data: [], page: 1 }])
    assert.throws(() => requireCatalogue(data));
  const empty = { data: [], page: 1, pageSize: 25, totalPages: 1, totalItems: 0 };
  assert.equal(requireCatalogue(empty), empty);
  for (const key of ['page', 'pageSize', 'totalPages', 'totalItems'])
    assert.throws(() => requireCatalogue({ ...empty, [key]: -1 }));
});
test('the directory contract requires every catalogue family but accepts a genuinely empty release', () => {
  assert.throws(() =>
    requireArrays({ institutes: [] }, ['institutes', 'branches', 'cutoffs'], 'SEO catalogue'),
  );
  const empty = { institutes: [], branches: [], cutoffs: [] };
  assert.equal(requireArrays(empty, Object.keys(empty), 'SEO catalogue'), empty);
});
