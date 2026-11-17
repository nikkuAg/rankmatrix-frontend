import { CATEGORIES, QUOTAS, SEAT_POOLS } from '../constants/josaa.js';

export const quotaOptions = Object.values(QUOTAS);
export const seatPoolOptions = Object.values(SEAT_POOLS);
// Most candidates hold a General (CRL) rank, so it leads; PwD lists follow the main categories.
export const categoryOptions = [
  CATEGORIES.GENERAL,
  CATEGORIES.OBC_NCL,
  CATEGORIES.GENERAL_EWS,
  CATEGORIES.SC,
  CATEGORIES.ST,
  CATEGORIES.GENERAL_PWD,
  CATEGORIES.OBC_NCL_PWD,
  CATEGORIES.GENERAL_EWS_PWD,
  CATEGORIES.SC_PWD,
  CATEGORIES.ST_PWD,
];
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
    // General is preselected so a first-time visitor sees the rank fields straight away.
    categories: validProfiles.length
      ? categoryOptions.filter((category) =>
          validProfiles.some((profile) => profile.category === category),
        )
      : [CATEGORIES.GENERAL],
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

const text = (value) => String(value ?? '').trim();

// The home page asks only for the overall (General) ranks; everything else saved is kept.
export function generalRanks(saved) {
  const ranks = predictorFormValues(saved).ranks[CATEGORIES.GENERAL] ?? {};
  return { mainsRank: text(ranks.mainsRank), advRank: text(ranks.advRank) };
}

export function withGeneralRanks(saved, mainsRank, advRank) {
  const data = predictionFormData(predictorFormValues(saved));
  return {
    ...data,
    rankProfiles: [
      {
        category: CATEGORIES.GENERAL,
        mainsRank: text(mainsRank),
        ...(text(advRank) ? { advRank: text(advRank) } : {}),
      },
      ...data.rankProfiles.filter((profile) => profile.category !== CATEGORIES.GENERAL),
    ],
  };
}

// The API fills its row limit with IIT rows first whenever a JEE Advanced rank is present, which
// leaves no room for NITs, IIITs and GFTIs. Asking a second time without the Advanced rank
// returns only JEE Main institutes, so each exam gets its own row limit.
export function predictionRequests(data) {
  const request = predictionRequest(data);
  if (!data.rankProfiles?.some((profile) => 'advRank' in profile)) return [request];
  return [
    request,
    {
      ...request,
      rankProfiles: data.rankProfiles.map((profile) => {
        const mainOnly = { ...profile };
        delete mainOnly.advRank;
        return mainOnly;
      }),
    },
  ];
}

export function mergePredictionRows(responses, isAdvancedRow) {
  const [first = [], mainOnly] = responses;
  if (!mainOnly) return first;
  return [...first.filter(isAdvancedRow), ...mainOnly.filter((row) => !isAdvancedRow(row))];
}

// A saved form can be searched again without asking only when every required answer is present.
export function restorablePredictorData(saved) {
  if (!saved || typeof saved !== 'object') return null;
  const data = predictionFormData(predictorFormValues(saved));
  const positive = (value) => /^[1-9][0-9]*$/.test(String(value ?? '').trim());
  const complete =
    typeof data.state === 'string' &&
    data.state.trim() &&
    data.seatPools.length &&
    data.quotas.length &&
    data.rankProfiles.length &&
    data.rankProfiles.every(
      (profile) =>
        positive(profile.mainsRank) && (!('advRank' in profile) || positive(profile.advRank)),
    );
  return complete ? data : null;
}
