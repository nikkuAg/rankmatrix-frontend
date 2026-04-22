import { camelizeKeys } from 'humps';
import { apis } from '@/constants/apis';

// Revalidate at most once per day — SEO pages prerender at build time and then
// refresh on demand via ISR if the underlying data changes.
const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24;

async function seoFetch(path, { revalidate = DEFAULT_REVALIDATE_SECONDS } = {}) {
  const base = apis.BASE_URL;
  if (!base) {
    // In dev without an API url set, don't crash the build — return null and
    // let the caller surface a 404.
    return null;
  }
  const res = await fetch(`${base}${path}`, { next: { revalidate } });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`SEO API ${path} failed with ${res.status}`);
  }
  const json = await res.json();
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
