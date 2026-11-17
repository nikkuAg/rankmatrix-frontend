import assert from 'node:assert/strict';
import test from 'node:test';
import { stateName } from '../src/utils/stateName.mjs';

test('known misspellings from the institute data show the official state name', () => {
  assert.equal(stateName('Uttrakhand'), 'Uttarakhand');
  assert.equal(stateName('Tamilnadu'), 'Tamil Nadu');
  assert.equal(stateName('Orissa'), 'Odisha');
});

test('other values pass through unchanged', () => {
  for (const value of ['Uttar Pradesh', 'Jammu & Kashmir', 'Diu', '', null, undefined]) {
    assert.equal(stateName(value), value);
  }
});
