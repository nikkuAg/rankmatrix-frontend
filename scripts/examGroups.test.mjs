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


test('legacy IISc record is labelled separately but remains in Advanced group', async () => {
  const { instituteType } = await import('../src/utils/instituteIdentity.mjs');
  const iisc = { name: 'Indian Institute of Science, Bangalore', type: 'IIT' };
  const iit = { name: 'Indian Institute of Technology Bombay', type: 'IIT' };
  assert.equal(instituteType(iisc), 'IISc');
  assert.equal(instituteType(iit), 'IIT');
  assert.equal(instituteType({ name: 'Indian Institute of Science Education and Research', type: 'GFTI' }), 'GFTI');
  assert.equal(instituteType({ slug: 'indian-institute-of-science-bangalore', type: 'IIT' }), 'IISc');
  const groups = groupInstitutesByExam([iisc, iit]);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].id, 'advanced');
  assert.match(groups[0].title, /IISc/);
  assert.equal(iisc.type, 'IIT'); // Never change backend filter/predictor semantics.
});
