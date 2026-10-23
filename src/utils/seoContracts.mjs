function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function requireArrays(data, keys, label) {
  if (!object(data) || !keys.every((key) => Array.isArray(data[key]) && data[key].every(object))) {
    throw new Error(`${label} response is missing required data arrays`);
  }
  return data;
}

export function requireCatalogue(data) {
  requireArrays(data, ['data'], 'Catalogue');
  if (
    !['page', 'pageSize', 'totalPages', 'totalItems'].every(
      (key) => Number.isInteger(data[key]) && data[key] >= 0,
    ) ||
    data.page < 1 ||
    data.pageSize < 1 ||
    data.totalPages < 1
  ) {
    throw new Error('Catalogue response is missing pagination data');
  }
  return data;
}
