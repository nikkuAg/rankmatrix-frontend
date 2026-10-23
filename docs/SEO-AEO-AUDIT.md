# SEO and answer-engine audit — 23 October 2026

## Project context

RankMatrix is a free, no-signup JoSAA exploration tool. The frontend is Next.js 16 / React 19 with MUI and RTK Query. Interactive tools search colleges, programmes, historical opening/closing ranks, seats and prediction shortlists. Django REST Framework serves PostgreSQL data, with Redis caching. Server-rendered institute, branch and institute–branch pages use dedicated SEO endpoints and daily ISR. Eight counselling guides, methodology, author/about and policy pages already exist. AdSense is already referenced in the root layout and public ads.txt; this change does not claim AdSense approval or alter the ad account.

The inspected catalogue contains 138 institutes, 288 branches and 1,038 active combinations. Counts describe the current dataset, not guaranteed complete coverage of the current counselling cycle. Local backend connections use the production database in read-only mode. No database migrations or imports were run.

## Evidence and changes

- Live https://rankmatrix.in redirects to https://www.rankmatrix.in. Align metadata, schema, robots and sitemap URLs to that destination.
- Existing branch and combination metadata explicitly used noindex and the sitemap excluded those families. Allow indexing of populated pages; retain noindex for empty branch/combination data. Their tables provide distinct, useful programme-specific information rather than keyword-only landing pages.
- Interactive catalogue tables required client API calls. Add complete server-rendered directories linking each institute and programme. Institute and branch pages link onward to combination pages.
- Four tool landing pages emitted FAQ schema without displaying those FAQs. Render the same answers visibly; correct misleading quota/seat statements. FAQ markup does not imply eligibility for Google's FAQ rich results.
- Tool headings were h4 elements; homepage had no h1. Add a single descriptive h1 on each. Remove a nested main landmark on detail pages.
- Remove the website SearchAction: its URL did not implement the advertised query-string search.
- Remove an invented named-institute cutoff example and guaranteed-admission language. Explain rank-list matching with explicitly hypothetical numbers instead. Add primary-source links and quota labels to cutoff answers.
- API exceptions were swallowed and converted into notFound responses. Preserve real API 404s while allowing network/server failures to remain errors, avoiding cached false 404 pages. Bound fetches to 30 seconds.
- Model year 2026 could be selected before importing any ranks. Choose the latest populated rank model. Summary queries now restrict quota to AI/OS, order deterministically and return the round/quota labels. Do not mix HS with OS in an unlabeled headline answer.
- Restrict institute/programme detail API requests to real active pairs to avoid successful empty pages for arbitrary combinations.
- Generate the full sitemap from the catalogue, deduplicate URLs, and fail visibly if the catalogue cannot be fetched. Load Next's environment configuration for postbuild. Omit fabricated lastmod dates that previously changed on every build.
- Render detail pages on first request with daily ISR rather than issuing hundreds of expensive API requests during each build. Deploy frontend and backend changes together; warm representative pages after deployment.

## Search intents served

| Intent | Primary destination | Supporting evidence |
| --- | --- | --- |
| Which college/branch can I get with my JEE rank? | /predict | Historical shortlist, limits, category/rank explanation |
| IIT/NIT/IIIT/GFTI college list | /colleges | Crawlable institute directory and filters |
| CSE/ECE/other programme colleges | /branches and /branches/[slug] | Institute comparisons with actual ranks |
| Institute cutoff and available branches | /colleges/[slug] | Programme table, round, quota and NIRF history |
| Institute + branch + category/round cutoff | /colleges/[slug]/[branch] | Multi-year category/quota/seat-pool tables |
| Opening vs closing rank / historical JoSAA cutoff | /ranks and existing guide | Definitions, exact-slice comparisons and official sources |
| JoSAA seat matrix and seat pools | /seat-matrix and existing guide | Seat availability and qualified explanations |
| Counselling rounds / choice filling | Existing /guides pages | Explanations linked to tools and methodology |

Avoid creating thousands of speculative rank/percentile or year-specific pages without unique supporting data. Do not label predictions as admission probabilities or guarantees. Additional content should answer observed user questions with source-backed examples and actual data.

## Validation

- Production Next build passes; sample rendered checks cover home, four tools, two directories and one page from each detail family.
- Render checks: HTTP 200, exactly one h1, expected www canonical, indexable populated pages, parseable JSON-LD, visible FAQ questions and at least 100 crawlable links on each directory.
- `node --test scripts/seo.test.cjs`: sitemap coverage, deduplication, failure behavior and absence of fabricated freshness.
- Backend: `$env:PYTHONPATH='.'; .\.venv\Scripts\python.exe src/manage.py test tests.test_seo` uses SimpleTestCase mocks and never creates a database. Tests cover empty-new-year fallback, quota filtering/labels and missing cutoffs.
- Django system check passes. Changed frontend source passes ESLint.

## Deployment and measurement

These are local source changes; they are not live until deployed. Configure NEXT_PUBLIC_API_URL to the public production API in Vercel, never the local 127.0.0.1 address. Deploy backend updates before or together with frontend. Keep the current www redirect, run the full build/postbuild, and inspect the generated sitemap.

After deployment, use Google Search Console's domain property for rankmatrix.in. Submit https://www.rankmatrix.in/sitemap.xml. Inspect a tool page, institute page, branch page and combination page using live URL Inspection. Check user-declared vs Google-selected canonical, rendered text, robots and indexing status. Request indexing of representative pages; a sitemap submission is not an indexing guarantee.

Record 28-day baseline clicks, impressions, CTR, average position and landing pages for predictor, cutoffs, institute/branch queries and guides. Compare at 28 and 56 days, considering counselling seasonality. Review page experience/Core Web Vitals and crawl errors. Add Search Console verification via its supplied DNS record or exact token when available; no fabricated token is added here. Review Bing Webmaster Tools separately if desired.

No Search Console or analytics account was accessed during this audit, so actual query demand, current rankings, crawl coverage and conversion data remain unverified. External authority and useful community references also matter. No ranking, featured snippet, AI citation or AdSense approval is guaranteed.

## References

- https://developers.google.com/search/docs/appearance/ai-features — AI search uses the same indexing and helpful-content foundations; no special AI file or schema is required.
- https://developers.google.com/search/docs/essentials — crawlable links and useful people-first content.
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content — original value and truthful freshness.
- https://josaa.nic.in/or-cr/ — primary cutoff publications.
- https://josaa.nic.in/restrictions-at-institutes-academic-programs-level/ — programme-specific eligibility restrictions.

## Metadata refinement

Metadata now uses src/utils/metadata.mjs across the homepage, 19 static routes and three dynamic route families. Each page supplies its own title, description and canonical. Search, Open Graph and Twitter text are aligned; previews include a 1200×630 image, and robots directives are explicit for both general crawlers and Googlebot. The unverified Twitter account attribution and repetitive keyword lists were removed. Article publication dates are included only when supplied by the existing article source.

Institute metadata preserves IIT/NIT/IIIT identity even where displayCode contains only a city. Dynamic years come from returned data, not the wall clock. Long official programme names remain intact rather than being arbitrarily truncated. Google can still choose a different title or snippet for a query; character counts are not a guaranteed display boundary.

Validation: production build and sitemap generation pass; changed-source ESLint passes; nine frontend regression tests pass. Rendered HTML for 23 routes has one title, one description and one canonical, unique titles/descriptions, aligned social text, preview images on the canonical host and explicit robots tags. See metadata-preview.json for the actual rendered title and description pairs. These changes remain local until deployed.

Metadata references:
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet

## Expanded follow-up

The broader review and remaining account/hosting actions are recorded in SEO-TECHNICAL-CHECKLIST.md. Final mobile lab runs are in performance-results.json: local homepage performance 82, accessibility 100 and CLS 0; local college directory performance 85, accessibility 100 and CLS 0.049. These are lab results, not live ranking outcomes. The final build, 12 frontend regression tests, rendered crawl checks and three sampled 404 checks pass. The earlier baseline and intermediate measurements remain documented for comparison.
