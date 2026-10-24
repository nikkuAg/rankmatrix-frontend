const ENUMS = {
  field: [
    'name',
    'state',
    'city',
    'type',
    'institute__name',
    'institute__type',
    'branch__name',
    'branch__degree',
    'branch__course_duration',
    'degree',
    'course_duration',
    'category',
    'quota',
    'seat_pool',
    'opening_rank',
    'closing_rank',
    'round',
    'year',
    'seats',
    'change_in_seats',
    'available_seats',
  ],
  direction: ['asc', 'desc', 'cleared'],
  state: ['expanded', 'collapsed', 'set', 'cleared'],
  source: ['header', 'footer', 'content'],
  destination_type: [
    'home',
    'predictor',
    'cutoffs',
    'seats',
    'colleges',
    'institute',
    'programme',
    'institute_programme',
    'branches',
    'guides',
    'guide',
    'about',
    'methodology',
    'contact',
    'privacy',
    'terms',
  ],
  outcome: ['results', 'empty', 'error'],
};

export function analyticsPayload({ category, label, value, parameters = {} }) {
  const safe = {};
  for (const [key, values] of Object.entries(ENUMS)) {
    if (values.includes(parameters?.[key])) safe[key] = parameters[key];
  }
  for (const key of ['selected_count', 'result_count']) {
    if (Number.isSafeInteger(parameters?.[key]) && parameters[key] >= 0) {
      safe[key] = parameters[key];
    }
  }
  return {
    event_category: category,
    event_label: label,
    // Never forward form objects, caste/category selections or free-text searches.
    ...(typeof value === 'number' && Number.isFinite(value) ? { value } : {}),
    ...safe,
  };
}
