// IISc is stored under the backend's IIT filter bucket. Keep request values unchanged.
// JoSAA lists IISc separately and uses JEE Advanced for its participating programmes.
// Source: https://josaa.nic.in/ and 2026 Business Rules, section I.
export function instituteType(institute = {}) {
  const name = institute.name?.trim();
  if (institute.slug === 'indian-institute-of-science-bangalore' ||
      name === 'Indian Institute of Science, Bangalore' ||
      name === 'Indian Institute of Science, Bengaluru') return 'IISc';
  return institute.type;
}

export const COLLEGE_FILTER_LABELS = { IIT: 'IIT / IISc' };
