import { QUOTAS, SEAT_POOLS } from '../constants/josaa.js';

export const quotaOptions = Object.values(QUOTAS);
export const seatPoolOptions = Object.values(SEAT_POOLS);

export function predictorSelections(values) {
  const pools =
    values?.seatPools ?? (values?.seatPool ? [values.seatPool] : [SEAT_POOLS.GENDER_NEUTRAL]);
  const quotas = values?.quotas ?? quotaOptions;
  return {
    seatPools: seatPoolOptions.filter((value) => Array.isArray(pools) && pools.includes(value)),
    quotas: quotaOptions.filter((value) => Array.isArray(quotas) && quotas.includes(value)),
  };
}

export function readPredictionForm(form) {
  const data = Object.fromEntries(form.entries());
  delete data.seatPool;
  data.seatPools = form.getAll('seatPools');
  data.quotas = form.getAll('quotas');
  if (!data.advRank?.trim()) delete data.advRank;
  return data;
}

export function predictionRequest(data) {
  const request = { ...data };
  if (quotaOptions.every((quota) => data.quotas.includes(quota))) delete request.quotas;
  return request;
}
