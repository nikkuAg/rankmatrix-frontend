import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  choiceRows,
  groupProgrammes,
  parseChoices,
  programmeExam,
  reorderChoices,
} from '../src/utils/choices.mjs';

const row = (code, quota = 'AI') => ({
  institute: { code, name: `Institute ${code}`, type: code % 2 ? 'IIT' : 'NIT' },
  branch: { code: 'CS', name: 'Computer Science', degree: 'B.Tech', courseDuration: 4 },
  category: 'OPEN',
  quota,
  seatPool: 'Gender-Neutral',
  round: 5,
  openingRank: 100,
  closingRank: 200,
});
test('a saved programme retains every allocation slice without mixing institute or branch identities', () => {
  const groups = groupProgrammes([row(1), row(1, 'HS'), row(2)]);
  assert.equal(groups.length, 2);
  assert.deepEqual(
    groups[0].records.map((record) => record.quota),
    ['AI', 'HS'],
  );
  assert.equal(programmeExam(groups[0].institute), 'JEE Advanced');
  assert.equal(programmeExam(groups[1].institute), 'JEE Main');
  assert.equal(programmeExam({ type: 'unknown' }), 'Verify exam');
});
test('100-choice reordering preserves all records, identity and input immutability', () => {
  const choices = groupProgrammes(Array.from({ length: 100 }, (_, index) => row(index + 1)));
  const moved = reorderChoices(choices, choices[0].id, choices[99].id);
  assert.equal(moved.length, 100);
  assert.equal(moved[99], choices[0]);
  assert.equal(choices[0].institute.code, 1);
  assert.deepEqual(
    new Set(moved.map((choice) => choice.id)),
    new Set(choices.map((choice) => choice.id)),
  );
  assert.equal(reorderChoices(choices, 'missing', choices[0].id), choices);
});

test('multi-pool quota comparisons stay separate when grouped, saved and exported', () => {
  const rows = ['AI', 'OS'].flatMap((quota) =>
    ['Gender-Neutral', 'Female-only'].map((seatPool) => ({ ...row(2, quota), seatPool })),
  );
  const choices = groupProgrammes(rows);
  assert.equal(choices.length, 1);
  assert.equal(choices[0].records.length, 4);
  const saved = parseChoices(JSON.stringify({ version: 1, choices }));
  assert.deepEqual(
    choiceRows(saved).map(({ quota, seatPool }) => [quota, seatPool]),
    rows.map(({ quota, seatPool }) => [quota, seatPool]),
  );
});
test('stored choices reject corruption and foreign records while deduplicating valid identities', () => {
  const choice = groupProgrammes([row(1)])[0];
  assert.deepEqual(parseChoices('{broken'), []);
  assert.deepEqual(parseChoices(JSON.stringify({ version: 2, choices: [choice] })), []);
  const foreign = { ...choice, id: '2:CS' };
  assert.deepEqual(
    parseChoices(JSON.stringify({ version: 1, choices: [choice, foreign, choice] })),
    [choice],
  );
  const corrupt = {
    ...choice,
    records: [{ ...choice.records[0], category: { unexpected: true } }],
  };
  assert.deepEqual(parseChoices(JSON.stringify({ version: 1, choices: [corrupt] })), []);
});

test('category-specific cutoff records remain distinct in saved programmes and exports', () => {
  const rows = [
    { ...row(2), category: 'General', openingRank: 18000 },
    { ...row(2), category: 'OBC-NCL', openingRank: 4500 },
  ];
  const choices = parseChoices(JSON.stringify({ version: 1, choices: groupProgrammes(rows) }));
  assert.equal(choices.length, 1);
  assert.deepEqual(
    choiceRows(choices).map(({ category, openingRank }) => [category, openingRank]),
    [
      ['General', 18000],
      ['OBC-NCL', 4500],
    ],
  );
});
test('choice export includes all allocation rows and never fabricates a dataset year', () => {
  const data = choiceRows(groupProgrammes([row(1), row(1, 'HS'), row(2)]));
  assert.equal(data.length, 3);
  assert.deepEqual(
    data.map((record) => record.preference),
    [1, 1, 2],
  );
  assert.ok(data.every((record) => record.year === 'Not supplied by predictor'));
  assert.equal(data[0].round, 5);
  assert.equal(data[2].exam, 'JEE Main');
});
