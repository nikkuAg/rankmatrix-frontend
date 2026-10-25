import { CATEGORIES, QUOTAS, SEAT_POOLS } from '../constants/josaa.js';

export const quotaOptions = Object.values(QUOTAS);
export const seatPoolOptions = Object.values(SEAT_POOLS);
export const categoryOptions = Object.values(CATEGORIES);
export const categoryLabel = (category) =>
  category === CATEGORIES.GENERAL ? 'General / OPEN · CRL' : category;

export function predictorSelections(values) {
  const pools =
    values?.seatPools ?? (values?.seatPool ? [values.seatPool] : [SEAT_POOLS.GENDER_NEUTRAL]);
  const quotas = values?.quotas ?? quotaOptions;
  return {
    seatPools: seatPoolOptions.filter((value) => Array.isArray(pools) && pools.includes(value)),
    quotas: quotaOptions.filter((value) => Array.isArray(quotas) && quotas.includes(value)),
  };
}

export function predictorFormValues(saved) {
  const profiles =
    saved?.rankProfiles ??
    (saved?.category
      ? [
          {
            category: saved.category,
            mainsRank: saved.mainsRank,
            advRank: saved.advRank,
          },
        ]
      : []);
  const validProfiles = Array.isArray(profiles)
    ? profiles.filter((profile) => categoryOptions.includes(profile?.category))
    : [];
  return {
    ...predictorSelections(saved),
    categories: categoryOptions.filter((category) =>
      validProfiles.some((profile) => profile.category === category),
    ),
    ranks: Object.fromEntries(
      validProfiles.map((profile) => [
        profile.category,
        {
          mainsRank: profile.mainsRank ?? '',
          advRank: profile.advRank ?? '',
        },
      ]),
    ),
    state: saved?.state ?? '',
    delta: saved?.delta ?? 10,
    count: saved?.count ?? 10,
  };
}

export function predictionFormData(values) {
  return {
    state: values.state,
    delta: values.delta,
    count: values.count,
    seatPools: values.seatPools,
    quotas: values.quotas,
    rankProfiles: values.categories.map((category) => {
      const ranks = values.ranks[category] ?? {};
      return {
        category,
        mainsRank: ranks.mainsRank ?? '',
        ...(String(ranks.advRank ?? '').trim() ? { advRank: ranks.advRank } : {}),
      };
    }),
  };
}

export function predictionRequest(data) {
  const request = { ...data };
  if (quotaOptions.every((quota) => data.quotas.includes(quota))) delete request.quotas;
  return request;
}
