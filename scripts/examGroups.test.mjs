import assert from 'node:assert/strict';
import { test } from 'node:test';
import { groupInstitutesByExam } from '../src/utils/examGroups.mjs';

test('Main and Advanced numbers cannot interleave an institute comparison', () => {
  const institutes = [
    { name: 'NIT B', type: 'NIT', latestClosingRank: 2 },
    { name: 'IIT Z', type: 'IIT', latestClosingRank: 1 },
    { name: 'IIIT A', type: 'IIIT', latestClosingRank: 100 },
    { name: 'IIT A', type: 'IIT', latestClosingRank: null },
  ];
  const original = structuredClone(institutes);
  const groups = groupInstitutesByExam(institutes);
  assert.deepEqual(
    groups.map((group) => group.id),
    ['advanced', 'main'],
  );
  assert.deepEqual(
    groups[0].institutes.map((institute) => institute.name),
    ['IIT A', 'IIT Z'],
  );
  assert.deepEqual(
    groups[1].institutes.map((institute) => institute.name),
    ['IIIT A', 'NIT B'],
  );
  assert.deepEqual(institutes, original);
});

test('unknown institute types keep their rows without assuming an exam', () => {
  const institute = { name: 'New institute', type: 'UNKNOWN' };
  assert.deepEqual(groupInstitutesByExam([institute]), [
    { id: 'other', title: 'Other institutes — verify admission exam', institutes: [institute] },
  ]);
  assert.deepEqual(groupInstitutesByExam([]), []);
});
