import assert from 'node:assert/strict';
import test from 'node:test';
import { quotaLabel } from '../src/utils/quotaLabel.mjs';

test('quota labels expand standard names while retaining their original codes', () => {
  assert.equal(quotaLabel('AI'), 'All India (AI)');
  assert.equal(quotaLabel('HS'), 'Home State (HS)');
  assert.equal(quotaLabel('OS'), 'Other State (OS)');
});

test('special and unknown quotas remain distinct; missing quotas are not inferred', () => {
  for (const code of ['GO', 'LA', 'JK', 'AP', 'XX']) assert.equal(quotaLabel(code), code);
  for (const value of [null, undefined, '']) assert.equal(quotaLabel(value), 'Not supplied');
});
