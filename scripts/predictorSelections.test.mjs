import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  mergePredictionRows,
  predictionFormData,
  predictionRequest,
  predictionRequests,
  predictorFormValues,
  predictorSelections,
  quotaOptions,
  restorablePredictorData,
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

test('a JEE Advanced rank adds a JEE Main-only request so IIT rows cannot use the whole limit', () => {
  const data = {
    state: 'Uttar Pradesh',
    count: 10,
    seatPools: ['Gender-Neutral'],
    quotas: ['AI'],
    rankProfiles: [
      { category: 'General', mainsRank: '18000', advRank: '7200' },
      { category: 'OBC-NCL', mainsRank: '4500' },
    ],
  };
  const [both, mainOnly] = predictionRequests(data);
  assert.deepEqual(both, data);
  assert.deepEqual(mainOnly.rankProfiles, [
    { category: 'General', mainsRank: '18000' },
    { category: 'OBC-NCL', mainsRank: '4500' },
  ]);
  assert.equal(data.rankProfiles[0].advRank, '7200');
  const withoutAdvanced = { ...data, rankProfiles: [{ category: 'General', mainsRank: '18000' }] };
  assert.deepEqual(predictionRequests(withoutAdvanced), [withoutAdvanced]);
});

test('merged rows keep IITs from the first response and other institutes from the second', () => {
  const isIit = (row) => row.type === 'IIT';
  const iit = { id: 1, type: 'IIT' };
  const strayNit = { id: 2, type: 'NIT' };
  const nit = { id: 3, type: 'NIT' };
  assert.deepEqual(mergePredictionRows([[iit, strayNit], [nit]], isIit), [iit, nit]);
  assert.deepEqual(mergePredictionRows([[strayNit]], isIit), [strayNit]);
});

test('only a complete saved form is searched again for a returning visitor', () => {
  const saved = {
    state: 'Uttar Pradesh',
    delta: 10,
    count: 10,
    seatPools: ['Gender-Neutral'],
    quotas: ['AI', 'HS'],
    rankProfiles: [{ category: 'General', mainsRank: '18000', advRank: '7200' }],
  };
  assert.deepEqual(restorablePredictorData(saved), saved);
  assert.deepEqual(
    restorablePredictorData({ category: 'General', mainsRank: '18000', state: 'Goa' }).rankProfiles,
    [{ category: 'General', mainsRank: '18000' }],
  );
  assert.equal(restorablePredictorData(null), null);
  assert.equal(restorablePredictorData('corrupt'), null);
  assert.equal(restorablePredictorData({ ...saved, state: '' }), null);
  assert.equal(restorablePredictorData({ ...saved, seatPools: [] }), null);
  assert.equal(restorablePredictorData({ ...saved, rankProfiles: [] }), null);
  assert.equal(
    restorablePredictorData({ ...saved, rankProfiles: [{ category: 'General', mainsRank: '' }] }),
    null,
  );
  assert.equal(
    restorablePredictorData({
      ...saved,
      rankProfiles: [{ category: 'General', mainsRank: '18000', advRank: '-4' }],
    }),
    null,
  );
});
