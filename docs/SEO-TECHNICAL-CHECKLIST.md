# Expanded SEO / AEO technical review

Review date: 23 October 2026. This covers the code, public deployed responses and an updated local production build. It does not replace Google Search Console, Bing Webmaster Tools or real-user Core Web Vitals data.

## Coverage and disposition

| Area | Evidence / action | Status |
| --- | --- | --- |
| Initial HTML | Home tool links no longer wait for an API success. College and branch tables receive a real first page from the server, in addition to their complete link directories. | Fixed and render-tested |
| Hydration and mobile layout | CSS breakpoints replace viewport-effect changes on home, catalogue controls, feature wrappers and pagination. Default filter chips no longer dispatch a redundant query on hydration. | Fixed; lab measurements recorded separately |
| Crawlable navigation | Brand, primary navigation and tool cards use real anchors/Next links. Keyboard skip link and named theme toggle added. | Fixed |
| Catalogue coverage | 138 institutes, 288 branches and 1,038 active combinations; sitemap contains 1,484 unique routes including static pages. | Structurally verified against the current API catalogue |
| Internal links | All 20 static pages' rendered internal links resolve to known static/catalogue routes; full dynamic pages were sampled rather than all 1,464 being fetched. | Verified within this scope |
| Missing URLs | Custom missing-page content, noindex and real HTTP 404 tested for unknown static, institute and combination URLs with Googlebot user agent. | Verified |
| Error semantics | SEO API 404s are distinguished from timeout/server failures. API outages no longer become false missing-page responses. | Fixed |
| Titles/descriptions/social | Shared metadata, canonical www host, explicit robots, consistent previews; 23 rendered route samples checked. | Fixed; see metadata-preview.json |
| Canonical redirects | Live HTTP routes return 308 to HTTPS; live HTTPS apex returns **307** to www; trailing slash returns 308 to the non-slash route. | Hosting action: change the apex domain alias to a permanent redirect |
| Robots and AI crawlers | Public robots allows content crawling; admin/API paths excluded. No special AI-only markup claimed as a ranking requirement. | Reviewed |
| Sitemap quality | Full catalogue, deduplication, canonical host; no automatic fake lastmod; generation fails visibly on API failure. | Fixed and tested |
| Structured-data safety | Inline JSON escapes less-than characters. Browser parsing checks and regression test cover script-boundary safety. | Fixed |
| Structured-data meaning | Branch collection no longer claims to be a Course taught by an invented organisation. Generic data pages no longer receive invented Article publication dates. Dataset source links remain; no licence is invented. | Fixed |
| Structured-data identity | Organisation/website publisher IDs and author profile links are consistent; FAQs match visible answers. | Reviewed and improved |
| Content accuracy | Corrected board-vs-state-code claims, female-seat generalisations, invented seat arithmetic and guaranteed allocation language. Sourced eligibility note points to official rules. | Fixed for the concrete issues identified |
| Methodology | Compared explanation with backend implementation. Document now describes configured latest model, max stored round, delta bounds, selection tiers, opening-rank ordering and limits. | Rewritten to match code |
| Answer quality | Added rank-vs-percentile and JoSAA-vs-CSAB/state-counselling answers. Replaced fabricated named-institute example with a clearly hypothetical interval. | Improved |
| Data provenance/freshness | Data year is labelled as coverage, not a last-import timestamp. Revalidation is distinguished from importing a new official release. | Fixed |
| Readability/semantics | One h1 and one main landmark per tested page; descriptive links, visible answers, horizontal scrolling for wide tables. | Verified on tested pages |
| Accessibility | Link contrast, calendar-current-day contrast, link underlines and unnamed controls addressed. | Automated local audit results recorded separately; manual assistive-technology testing remains useful |
| Fonts/media | Reduced Poppins weights from nine to five per style; tool images have fixed boxes and meaningful dimensions. Calendar loads near the viewport instead of blocking mobile above-the-fold content. | Improved |
| Route prefetch cost | Large catalogue/detail navigation and primary tool links do not eagerly prefetch routes. | Improved |
| Static-asset freshness | Unversioned public images/fonts no longer get a one-year immutable header; Next's hashed asset caching remains independent. | Fixed |
| Analytics instrumentation | Tool-card events now use the configured GA helper. Predictor success has its own aggregate event. Raw form/search/filter objects are not passed as GA numeric values. | Fixed; production event delivery still needs the actual GA property |
| Ads and experience | Existing publisher ID matches ads.txt. Global ad scripts remain a substantial CPU/network cost and a source of browser third-party-cookie diagnostics. | Account/placement/consent review still required before the separate AdSense rollout |
| Search demand and indexing | No connected Search Console or analytics property was available; therefore queries, impressions, selected canonicals, excluded URLs and conversions were not measured. | Needs account access |
| External authority | No backlink export or verified referring-domain data was available. No links were bought, spam pages generated or outreach sent. | Needs evidence-led review |
| International targeting | Current content is English. No hreflang or translated duplicate pages were fabricated. | Appropriate until genuine additional-language versions exist |
| Deployment | All changes are local; existing deployed site is unchanged. | Deploy frontend and backend together, then verify public output |

## Measurements and limits

See performance-results.json for Lighthouse lab measurements. All runs used Lighthouse 13.5.0 with headless installed Chrome and the default mobile simulated-throttling configuration. Scores fluctuate and are not Google ranking scores. Local latency is different from deployed latency. Best-practices warnings include advertising-related cookies/issues that were deliberately not hidden merely to raise an audit score.

The deployed homepage was measured independently: performance 52, accessibility 92, SEO audit 100, CLS 0.903, LCP 3.6 s and total blocking time 460 ms in that one run. The high SEO audit score does not measure real rankings, search intent, backlink authority or index coverage.

Google's public PageSpeed API returned HTTP 429 during this session. No CrUX/real-user pass rate is claimed. Recheck field LCP, INP and CLS after deploying, using the production property and sufficient real-user traffic.

## Next actions, in order

1. Review and deploy the frontend and backend changes. Set Vercel's API URL to the public production backend, not the local server. Keep credentials, database exports and Azure CLI state out of commits.
2. In Vercel domain settings, replace the temporary apex-to-www 307 redirect with a permanent redirect. Recheck HTTP/HTTPS, host, path and trailing-slash handling after deployment.
3. Verify the domain in Search Console, submit the www sitemap, and inspect representative tool, institute, branch and cutoff pages. Examine actual Google-selected canonicals and exclusion reasons rather than inferring them from a lab score.
4. Establish a 28-day query/page baseline, segmented by tool intent, branded/non-branded queries, mobile/desktop and country. Measure predictor completion as an aggregate event, without sending personal input details.
5. Review initial ad-script loading, ad placement dimensions and the account's consent/privacy requirements before introducing additional ad slots. Keep tools and primary answers usable.
6. Use actual impressions and user questions to improve specific pages. Do not create large numbers of repetitive rank/year/category pages without data and distinct value. Publish legitimate first-party examples/analyses only with the exact slice and source.
7. Build relevant authority through genuinely useful resources and voluntary references. Search Console links/referring-domain evidence is needed before prescribing a backlink programme.

Windsor.ai was found as an optional integration capable of reading Search Console and GA4 data, but it has not been installed or connected. The user can install/connect it for an account-level follow-up; a direct account export is also sufficient. No external account data was accessed through it.

## Reproducible checks

From rankmatrix-frontend:

```powershell
node --test scripts/*.test.*
node node_modules/eslint/bin/eslint.js src/app src/components src/utils src/store/selectors/siteContent.js src/theme/ThemeContext.js
node node_modules/next/dist/bin/next build
node node_modules/next-sitemap/bin/next-sitemap.mjs
$env:SEO_AUDIT_BASE_URL = 'http://127.0.0.1:3001'
$env:SEO_AUDIT_API_URL = 'http://127.0.0.1:8000'
..\rankmatrix-backend\.venv\Scripts\python.exe scripts/audit-rendered.py
```

The rendered audit checks the generated sitemap, all static pages, link targets, initial catalogue table rows and sampled 404s. It fetches only read endpoints (including the API's POST-based catalogue search during building), not database mutation operations. Additional metadata and performance measurements are summarised in the accompanying report files.

## Primary references

- https://developers.google.com/search/docs/essentials
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/core-web-vitals
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://josaa.nic.in/information-bulletin/ (2026 rules 8 and 31–32 checked)
- https://jeeadv.ac.in/eligibility.html
