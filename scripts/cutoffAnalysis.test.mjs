import assert from 'node:assert/strict';
import test from 'node:test';
import { cutoffAnalysis, rankChangeText } from '../src/utils/cutoffAnalysis.mjs';

const row = (quota, year, round, closingRank, extra = {}) => ({
  quota,
  year,
  round,
  openingRank: 1,
  closingRank,
  category: 'General',
  seatPool: 'Gender-Neutral',
  ...extra,
});

test('keeps every quota independent and compares only an exact previous-year round', () => {
  const quotas = ['AI', 'HS', 'OS', 'AP', 'GO', 'JK', 'LA', 'OTHER'];
  const rows = quotas.flatMap((quota) => [
    row(quota, 2026, 2, 100),
    row(quota, 2026, 5, 120),
    row(quota, 2025, 5, 150),
    row(quota, 2025, 6, 999),
    row(quota, 2026, 8, 5000, { category: 'OBC-NCL' }),
    row(quota, 2026, 9, 6000, { seatPool: 'Female-only' }),
  ]);
  const original = structuredClone(rows);
  for (const item of cutoffAnalysis(rows, 2026)) {
    assert.equal(item.roundCount, 2);
    assert.equal(item.first.round, 2);
    assert.equal(item.last.round, 5);
    assert.equal(item.roundChange, 20);
    assert.equal(item.previousYear.round, 5);
    assert.equal(item.yearChange, -30);
  }
  assert.equal(cutoffAnalysis(rows, 2026).length, quotas.length);
  assert.deepEqual(rows, original);
});

test('does not substitute an older year, different round, category or pool', () => {
  const result = cutoffAnalysis(
    [
      row('HS', 2026, 3, 200),
      row('HS', 2024, 3, 100),
      row('HS', 2025, 6, 500),
      row('HS', 2025, 3, 300, { category: 'SC' }),
      row('HS', 2025, 3, 400, { seatPool: 'Female-only' }),
    ],
    2026,
  )[0];
  assert.equal(result.roundChange, null);
  assert.equal(result.previousYear, null);
  assert.equal(result.yearChange, null);
});

test('deduplicates identical rows but omits ambiguous current slices', () => {
  const rows = [row('AI', 2026, 1, 100), row('AI', 2026, 1, 100)];
  assert.equal(cutoffAnalysis(rows, 2026)[0].roundCount, 1);
  rows.push(row('AI', 2026, 1, 101));
  assert.deepEqual(cutoffAnalysis(rows, 2026), []);
  assert.deepEqual(cutoffAnalysis(rows.reverse(), 2026), []);
  const priorConflict = cutoffAnalysis(
    [row('OS', 2026, 2, 100), row('OS', 2025, 2, 110), row('OS', 2025, 2, 120)],
    2026,
  )[0];
  assert.equal(priorConflict.previousYear, null);
});

test('invalid ranks do not become zero comparisons; nonmonotonic endpoints are arithmetic only', () => {
  for (const closingRank of [0, -1, null, NaN, '200', 1.5]) {
    assert.deepEqual(
      cutoffAnalysis([row('AI', 2026, 1, 100), row('AI', 2026, 2, closingRank)], 2026),
      [],
    );
  }
  assert.deepEqual(cutoffAnalysis([row('AI', 2026, 1, 5, { openingRank: 10 })], 2026), []);
  const item = cutoffAnalysis(
    [row('AI', 2026, 1, 100), row('AI', 2026, 2, 50), row('AI', 2026, 3, 100)],
    2026,
  )[0];
  assert.equal(item.roundChange, 0);
  assert.equal(rankChangeText(0), 'Unchanged');
  assert.equal(rankChangeText(null), 'Not comparable');
  assert.equal(rankChangeText(-1000), 'Down 1,000');
  assert.deepEqual(cutoffAnalysis([], 2026), []);
  assert.deepEqual(cutoffAnalysis(null, 2026), []);
});
