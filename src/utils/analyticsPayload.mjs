export function analyticsPayload({ category, label, value }) {
  return {
    event_category: category,
    event_label: label,
    // Never forward form objects, caste/category selections or free-text searches.
    ...(typeof value === 'number' && Number.isFinite(value) ? { value } : {}),
  };
}
