import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyticsPayload } from '../src/utils/analyticsPayload.mjs';

test('analytics events exclude raw form objects and free-text values', () => {
  for (const value of [
    { rank: 10000, category: 'SC' },
    'candidate@example.com',
    ['a'],
    NaN,
    Infinity,
  ]) {
    assert.equal(
      Object.hasOwn(
        analyticsPayload({ category: 'predictor', label: 'Submitted', value }),
        'value',
      ),
      false,
    );
  }
  assert.equal(analyticsPayload({ category: 'predictor', label: 'Completed', value: 1 }).value, 1);
});
