export const apis = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
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
};
