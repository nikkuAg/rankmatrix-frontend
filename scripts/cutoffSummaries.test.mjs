import assert from 'node:assert/strict';
import test from 'node:test';
import { cutoffSummaries, summaryRows } from '../src/utils/cutoffSummaries.mjs';

test('all quotas retain independent latest rounds without mixing years or categories', () => {
  const quotas = ['AI', 'AP', 'GO', 'HS', 'JK', 'LA', 'OS'];
  const rows = quotas.flatMap((quota) =>
    [1, quota === 'HS' ? 5 : 6].map((round) => ({
      quota,
      round,
      year: 2025,
      category: 'General',
      seatPool: 'Gender-Neutral',
      closingRank: 200 + round,
    })),
  );
  rows.push(
    { ...rows[0], year: 2024, round: 9 },
    { ...rows[0], category: 'OBC-NCL', round: 10 },
    { ...rows[0], seatPool: 'Female-only', round: 11 },
  );
  const result = cutoffSummaries(rows.reverse(), 2025);
  assert.deepEqual(
    result.map((r) => r.quota),
    quotas,
  );
  assert.deepEqual(
    result.map((r) => r.round),
    [6, 6, 6, 5, 6, 6, 6],
  );
  assert.deepEqual(cutoffSummaries(rows, 2026), []);
  assert.deepEqual(summaryRows({ cutoffSummaries: [] }), [null]);
  assert.deepEqual(summaryRows({ cutoffSummaries: result }), result);
});

test('an old API response cannot masquerade as missing cutoff data', () => {
  assert.throws(() => summaryRows({ latestClosingRank: 100 }), /updated backend/);
});
