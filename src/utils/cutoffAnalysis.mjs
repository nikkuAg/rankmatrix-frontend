// Input is one institute/programme's SEO response. Never combine allocation slices.
export function cutoffAnalysis(rows, year) {
  if (!Number.isSafeInteger(year) || !Array.isArray(rows)) return [];
  const quotas = new Map();
  for (const row of rows) {
    if (
      !row ||
      ![year, year - 1].includes(row.year) ||
      row.category !== 'General' ||
      row.seatPool !== 'Gender-Neutral' ||
      typeof row.quota !== 'string' ||
      !row.quota.trim()
    )
      continue;
    if (!quotas.has(row.quota)) quotas.set(row.quota, new Map());
    const rounds = quotas.get(row.quota);
    const key = `${row.year}:${row.round}`;
    const valid =
      [row.round, row.openingRank, row.closingRank].every(
        (value) => Number.isSafeInteger(value) && value > 0,
      ) && row.openingRank <= row.closingRank;
    const previous = rounds.get(key);
    // Conflicting duplicates or invalid ranks are not a basis for numerical claims.
    if (
      !valid ||
      previous === null ||
      (previous &&
        (previous.openingRank !== row.openingRank || previous.closingRank !== row.closingRank))
    )
      rounds.set(key, null);
    else rounds.set(key, row);
  }
  return [...quotas.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([quota, rounds]) => {
      const current = [...rounds.entries()].filter(([key]) => key.startsWith(`${year}:`));
      // Omit the current slice if any rank/round is ambiguous; don't cherry-pick endpoints.
      if (!current.length || current.some(([, row]) => row === null)) return [];
      const ordered = current.map(([, row]) => row).sort((a, b) => a.round - b.round);
      const first = ordered[0];
      const last = ordered[ordered.length - 1];
      const previousYear = rounds.get(`${year - 1}:${last.round}`) || null;
      return [
        {
          quota,
          year,
          first,
          last,
          roundCount: ordered.length,
          roundChange: ordered.length > 1 ? last.closingRank - first.closingRank : null,
          previousYear,
          yearChange: previousYear ? last.closingRank - previousYear.closingRank : null,
        },
      ];
    });
}

export function rankChangeText(change) {
  if (change === null) return 'Not comparable';
  if (change === 0) return 'Unchanged';
  return `${change > 0 ? 'Up' : 'Down'} ${Math.abs(change).toLocaleString('en-IN')}`;
}
