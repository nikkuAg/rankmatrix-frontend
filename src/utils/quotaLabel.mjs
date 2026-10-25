const labels = { AI: 'All India', HS: 'Home State', OS: 'Other State' };

export function quotaLabel(quota) {
  if (!quota) return 'Not supplied';
  return labels[quota] ? `${labels[quota]} (${quota})` : quota;
}
