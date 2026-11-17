import { camelizeKeys } from 'humps';
import { apis } from '@/constants/apis';
import { requireArrays, requireCatalogue } from './seoContracts.mjs';
import { fetchSeoJson } from './seoFetch.mjs';

// Revalidate at most once per day — SEO pages prerender at build time and then
// refresh on demand via ISR if the underlying data changes.
const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24;

async function seoFetch(
  path,
  { revalidate = DEFAULT_REVALIDATE_SECONDS, allowNotFound = true } = {},
) {
  const json = await fetchSeoJson(apis.BASE_URL, path, {
    allowNotFound,
    next: { revalidate },
    signal: AbortSignal.timeout(30000),
  });
  if (json === null) return null;
  // Normalize both camel-case and snake-case responses; this is idempotent.
  return camelizeKeys(json);
}

export const fetchSeoSlugs = async (opts) =>
  requireArrays(
    await seoFetch(apis.seo.slugs, { ...opts, allowNotFound: false }),
    ['institutes', 'branches', 'cutoffs'],
    'SEO catalogue',
  );

export const fetchInstituteSeo = (slug, opts) =>
  seoFetch(`${apis.seo.institute(slug)}?summary=quotas-v1`, opts);

// A detail page is marked noindex only when the API positively returns an empty
// list. A response without the list is malformed and must fail, not de-index.
const requireDetailArrays = (data, keys, label) =>
  data === null ? null : requireArrays(data, keys, label);

export const fetchBranchSeo = async (slug, opts) =>
  requireDetailArrays(
    await seoFetch(`${apis.seo.branch(slug)}?summary=quotas-v1`, opts),
    ["institutes"],
    "Branch detail",
  );

export const fetchInstituteBranchSeo = async (instituteSlug, branchSlug, opts) =>
  requireDetailArrays(
    await seoFetch(apis.seo.cutoffs(instituteSlug, branchSlug), opts),
    ["cutoffs"],
    "Programme cutoff",
  );

export async function fetchInitialCatalogue(path) {
  const json = await fetchSeoJson(apis.BASE_URL, path, {
    allowNotFound: false,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: '', filters: {}, page_size: 25, page: 1, ordering: null }),
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(30000),
  });
  return requireCatalogue(camelizeKeys(json));
}

/**
 * Latest JoSAA year on file, read from the first institute's detail record.
 * Returns null on any failure: callers fall back to undated copy.
 */
export async function fetchLatestJosaaYear() {
  try {
    const { institutes } = await fetchSeoSlugs();
    const slug = institutes[0]?.slug;
    if (!slug) return null;
    const institute = await fetchInstituteSeo(slug);
    return Number.isInteger(institute?.latestYear) ? institute.latestYear : null;
  } catch {
    return null;
  }
}
