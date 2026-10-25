import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  predictionFormData,
  predictionRequest,
  predictorFormValues,
  predictorSelections,
  quotaOptions,
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
  const values = predictorFormValues({
    category: 'General',
    mainsRank: '18000',
    advRank: '7200',
    state: 'Tamil Nadu',
    count: '100',
    delta: '10',
    seatPools: ['Gender-Neutral', 'Female-only'],
    quotas: ['AI', 'OS'],
  });
  const data = predictionFormData(values);
  assert.deepEqual(data.seatPools, ['Gender-Neutral', 'Female-only']);
  assert.deepEqual(data.quotas, ['AI', 'OS']);
  assert.deepEqual(predictionRequest(data), data);
  assert.deepEqual(predictorSelections(JSON.parse(JSON.stringify(data))), {
    seatPools: ['Gender-Neutral', 'Female-only'],
    quotas: ['AI', 'OS'],
  });
  assert.deepEqual(data.rankProfiles, [
    { category: 'General', mainsRank: '18000', advRank: '7200' },
  ]);
  assert.equal(data.count, '100');
  assert.deepEqual(predictorFormValues(JSON.parse(JSON.stringify(data))), values);
});

test('all quotas retain the backend default and empty groups remain detectable', () => {
  const all = { seatPools: ['Gender-Neutral'], quotas: [...quotaOptions] };
  assert.deepEqual(predictionRequest(all), { seatPools: ['Gender-Neutral'] });
  assert.deepEqual(all.quotas, quotaOptions);
  const values = predictorFormValues();
  values.seatPools = [];
  values.quotas = [];
  assert.deepEqual(predictionFormData(values).rankProfiles, []);
  assert.deepEqual(predictionFormData(values).seatPools, []);
  assert.deepEqual(predictionFormData(values).quotas, []);
});

test('selected categories keep their own ranks through removal, restoration and payload generation', () => {
  const values = predictorFormValues({
    rankProfiles: [
      { category: 'General', mainsRank: '18000', advRank: '7200' },
      { category: 'OBC-NCL', mainsRank: '4500', advRank: '1200' },
    ],
  });
  assert.deepEqual(
    predictionFormData(values).rankProfiles.map((profile) => profile.mainsRank),
    ['18000', '4500'],
  );
  values.categories = ['OBC-NCL'];
  assert.deepEqual(predictionFormData(values).rankProfiles, [
    { category: 'OBC-NCL', mainsRank: '4500', advRank: '1200' },
  ]);
  values.categories = ['General', 'OBC-NCL'];
  assert.equal(predictionFormData(values).rankProfiles[0].mainsRank, '18000');
  values.ranks['OBC-NCL'].advRank = '';
  assert.equal('advRank' in predictionFormData(values).rankProfiles[1], false);
  assert.equal('category' in predictionRequest(predictionFormData(values)), false);
  assert.deepEqual(predictorFormValues({ rankProfiles: 'corrupt' }).categories, []);
});
