import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sameCatalogueRows } from '../src/utils/sameCatalogueRows.mjs';

const props = {
  expandedNirf: false,
  nirfYears: [2025],
  colleges: [
    {
      code: 1,
      name: 'Example',
      slug: 'example',
      type: 'IIT',
      state: 'State',
      nirfRanks: [{ year: 2025, rank: 1 }],
    },
  ],
};

test('identical refresh data retains rows even when network objects are new', () => {
  assert.equal(sameCatalogueRows(props, structuredClone(props)), true);
});

test('row changes, order, empty results and NIRF expansion invalidate memoization', () => {
  for (const key of ['name', 'slug', 'type', 'state', 'code']) {
    const next = structuredClone(props);
    next.colleges[0][key] = 'changed';
    assert.equal(sameCatalogueRows(props, next), false);
  }
  const changedRank = structuredClone(props);
  changedRank.colleges[0].nirfRanks[0].rank = 2;
  assert.equal(sameCatalogueRows(props, changedRank), false);
  assert.equal(sameCatalogueRows(props, { ...props, colleges: [] }), false);
  assert.equal(sameCatalogueRows(props, { ...props, colleges: undefined }), false);
  assert.equal(sameCatalogueRows(props, { ...props, expandedNirf: true }), false);
  assert.equal(sameCatalogueRows(props, { ...props, nirfYears: [2024] }), false);
  const rows = { ...props, colleges: [...props.colleges, { code: 2 }] };
  assert.equal(sameCatalogueRows(rows, { ...rows, colleges: [...rows.colleges].reverse() }), false);
});
