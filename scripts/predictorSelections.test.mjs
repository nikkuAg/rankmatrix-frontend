import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  predictionRequest,
  predictorSelections,
  quotaOptions,
  readPredictionForm,
} from '../src/utils/predictorSelections.mjs';

test('saved single-pool inputs migrate without changing the selected pool', () => {
  assert.deepEqual(predictorSelections({ seatPool: 'Female-only' }), {
    seatPools: ['Female-only'],
    quotas: quotaOptions,
  });
  assert.deepEqual(predictorSelections().seatPools, ['Gender-Neutral']);
  assert.deepEqual(predictorSelections({ seatPools: ['invalid'], quotas: ['unknown'] }), {
    seatPools: [],
    quotas: [],
  });
});

test('multiple selections survive form serialization, storage and the API payload', () => {
  const form = new FormData();
  for (const [key, value] of [
    ['mainsRank', '18000'],
    ['advRank', '7200'],
    ['state', 'Tamil Nadu'],
    ['category', 'General'],
    ['count', '100'],
    ['delta', '10'],
    ['seatPools', 'Gender-Neutral'],
    ['seatPools', 'Female-only'],
    ['quotas', 'AI'],
    ['quotas', 'OS'],
  ])
    form.append(key, value);
  const data = readPredictionForm(form);
  assert.deepEqual(data.seatPools, ['Gender-Neutral', 'Female-only']);
  assert.deepEqual(data.quotas, ['AI', 'OS']);
  assert.deepEqual(predictionRequest(data), data);
  assert.deepEqual(predictorSelections(JSON.parse(JSON.stringify(data))), {
    seatPools: ['Gender-Neutral', 'Female-only'],
    quotas: ['AI', 'OS'],
  });
  assert.equal(data.advRank, '7200');
  assert.equal(data.count, '100');
});

test('all quotas retain the backend default and empty groups remain detectable', () => {
  const all = { seatPools: ['Gender-Neutral'], quotas: [...quotaOptions] };
  assert.deepEqual(predictionRequest(all), { seatPools: ['Gender-Neutral'] });
  assert.deepEqual(all.quotas, quotaOptions);
  const form = new FormData();
  form.append('advRank', '');
  assert.deepEqual(readPredictionForm(form), { seatPools: [], quotas: [] });
});
