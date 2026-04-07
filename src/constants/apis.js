export const apis = {
  BASE_URL: '/backend-api',
  siteContent: {
    get: '/api/site/content',
  },
  college: {
    search: '/api/institutes/search',
  },
  branch: {
    search: '/api/branches/search',
    filter: '/api/site/content/branch',
  },
  seat: {
    search: '/api/josaa/seats/search',
    filter: '/api/site/content/seat',
  },
  rank: {
    search: '/api/josaa/ranks/search',
    filter: '/api/site/content/rank',
  },
  prediction: {
    college: '/api/predictions/institute',
  },
};
