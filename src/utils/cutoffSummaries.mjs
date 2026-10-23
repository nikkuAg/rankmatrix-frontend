// Keep the latest round independently for every quota; ordering is display only.
export function cutoffSummaries(rows, year) {
  const summaries = new Map();
  for (const row of rows) {
    if (row.year !== year || row.category !== 'General' || row.seatPool !== 'Gender-Neutral')
      continue;
    if (!summaries.has(row.quota) || row.round > summaries.get(row.quota).round)
      summaries.set(row.quota, row);
  }
  return [...summaries.values()].sort((a, b) => a.quota.localeCompare(b.quota));
}

export function summaryRows(entity) {
  // Empty data remains one clearly blank row; never infer a quota from a scalar cutoff.
  if (!Array.isArray(entity.cutoffSummaries))
    throw new Error('Per-quota cutoff summaries are required; deploy the updated backend first');
  return entity.cutoffSummaries.length ? entity.cutoffSummaries : [null];
}
