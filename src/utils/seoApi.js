import { camelizeKeys } from 'humps';
import { apis } from '@/constants/apis';
import { fetchSeoJson } from './seoFetch.mjs';

// Revalidate at most once per day — SEO pages prerender at build time and then
// refresh on demand via ISR if the underlying data changes.
const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24;

async function seoFetch(path, { revalidate = DEFAULT_REVALIDATE_SECONDS } = {}) {
  const json = await fetchSeoJson(apis.BASE_URL, path, {
    next: { revalidate },
    signal: AbortSignal.timeout(30000),
  });
  if (json === null) return null;
  // Backend ships snake_case via djangorestframework-camel-case on dashboard
  // routes but the SEO endpoints bypass that middleware path, so camelize
  // explicitly for consistent client-side usage.
  return camelizeKeys(json);
}

export const fetchSeoSlugs = (opts) => seoFetch(apis.seo.slugs, opts);

export const fetchInstituteSeo = (slug, opts) => seoFetch(apis.seo.institute(slug), opts);

export const fetchBranchSeo = (slug, opts) => seoFetch(apis.seo.branch(slug), opts);

export const fetchInstituteBranchSeo = (instituteSlug, branchSlug, opts) =>
  seoFetch(apis.seo.cutoffs(instituteSlug, branchSlug), opts);

export async function fetchInitialCatalogue(path) {
  const json = await fetchSeoJson(apis.BASE_URL, path, {
    allowNotFound: false,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: '', filters: {}, page_size: 25, page: 1, ordering: null }),
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(30000),
  });
  return camelizeKeys(json);
}
