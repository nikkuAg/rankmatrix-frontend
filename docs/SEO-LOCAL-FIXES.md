# Local SEO/AEO fixes and review handoff — 24 October 2026

Application under test: frontend `09156a3e6a0105fd7f13172b5476ca34e88e8859`, backend `d745d13428b369cbd40d52b3d799eed191f0d160`. Production preview: http://127.0.0.1:3010 . No production deployment, merge, migration or database write performed. Azure database checks use read-only transactions.

## Separate fixes to review

Each fix is one commit and one PR, targeting its predecessor. Review the PR's **Files changed** tab to see only that correction; the final local preview includes the whole stack.

| Order after #99 | PR | Concrete change |
| --- | --- | --- |
| 1 | [#100](https://github.com/nikkuAg/rankmatrix-frontend/pull/100) | Privacy describes submitted requests, cache/storage and providers; removes unsupported anonymity, retention and automatic-consent claims. Terms distinguish JoSAA, NIRF and calculated outputs. |
| 2 | [#101](https://github.com/nikkuAg/rankmatrix-frontend/pull/101) | Explicit IISc presentation identity across directory, exam groups, counts, tables, badges and CSV. Preserve the existing backend IIT filter bucket/Advanced selection; label the combined filter IIT / IISc. No source-record mutation. |
| 3 | [#102](https://github.com/nikkuAg/rankmatrix-frontend/pull/102) | Correct the five main counselling/predictor guides and parallel choice/seat/rank advice. Remove two-offer, income-only eligibility, universal rounds and exhaustive-predictor claims. Attribute dataset observations to JoSAA, with RankMatrix as publisher/compiler. |
| 4 | [#103](https://github.com/nikkuAg/rankmatrix-frontend/pull/103) | Install shared RTK Query middleware once instead of seven times. AdSense runtime becomes explicit opt-in, with verification metadata and ads.txt retained. |
| 5 | [#104](https://github.com/nikkuAg/rankmatrix-frontend/pull/104) | Readable detail badges and official-source link in both themes. Fix the measured dark source-link contrast defect. |
| 6 | [#105](https://github.com/nikkuAg/rankmatrix-frontend/pull/105) | Final rendered consistency: IISc-specific Advanced guidance, qualified stored-programme counts, truthful shared footers/About and predictor limitations. |

The accompanying handoff PR contains this report and redacted evidence only. Earlier frontend PRs #24–31 and #90–99, and backend #16 then #18, are still required. With this report PR the SEO series is **27 PRs: 2 backend and 25 frontend**, including documentation. AdSense research #77 is separate.

## Validation

- 29 frontend tests and 4 backend tests pass; Django checks and ESLint across all existing changed JS/JSX/MJS files pass.
- Normal production build and sitemap generation pass. All 20 static routes pass rendered links/headings/landmarks checks; college/programme first-page tables are present in HTML. Sitemap contains 1,484 unique catalogue-valid routes.
- 23 sampled routes pass unique metadata, canonical/social consistency and JSON-LD checks. Invalid routes and a known-institute/inactive-programme pair return 404/noindex; favicon remains 96×96.
- All five rewritten guides' visible answers match their FAQ schema. Default rendered pages contain no AdSense loader while retaining account verification metadata. Privacy and IISc rendered text checks pass.
- Existing all-quota regression tests remain green. Repeated API/HTML comparison covers 21 pages across seven institutes, including NIT Goa GO/HS/OS and NIT Srinagar JK/LA/OS. The final restack changes only a link color; no quota code/data changed.
- Real RTK Query integration test confirms shared cache reuse, exactly one invalidation refetch and one probe-action middleware visit. Browser catalogue hydration/search returns IISc with its separate type; detail navigation shows Advanced guidance. Badge rendering inspected in light and dark themes.

## Performance evidence and limits

See [redacted measurements](seo-local-fixes-evidence.json). Sequential Lighthouse 13.5 local mobile lab samples, without overlapping builds:

| Page | Performance | Accessibility | LCP | TBT | Transferred |
| --- | ---: | ---: | ---: | ---: | ---: |
| Catalogue before runtime fix | 82 | 100 | 3.74 s | 317 ms | 717,174 bytes |
| Catalogue after runtime fix | 91 | 100 | 3.33 s | 148 ms | 431,058 bytes |
| Deep NIT Goa/Civil after final corrections | 94 | 100 | 2.96 s | 127 ms | 481,173 bytes |

The catalogue measurement is pinned to the application before the final word-spacing/source-link-color-only corrections; the deep sample is pinned to the final application SHA. Earlier deep sample before correcting the source link was 88/96 with LCP 3.62 s. These are lab observations, not a controlled production p75 result, field INP or guaranteed scores. LCP remains above 2.5 s in these samples. Fonts, component hydration, large histories and cold origin requests remain optimization opportunities; production measurements are tracked in #86/backend #17.

Repeated same-process read-only backend profiling asserts full payload equality between per-pair and batched implementations: institute 14→6 queries, 1.047→0.499 s; programme 72→5 queries, 5.681→0.438 s. The optimization changes round-trip count, not cutoff values, quota selection or seat totals. No production concurrency/load test was run.

## What actually needs deployment or account evidence

1. **Coordinated release:** backend #16 then #18 before the full frontend stack. Verify production API URL and deployment gating; backend main auto-deploys. Merge commits preserve ancestry; retarget each next PR to main after its parent lands. Do not treat intermediate parent-only deployments as the reviewed release.
2. **Keep ads off for this SEO release:** leave `NEXT_PUBLIC_ENABLE_ADSENSE` unset/false at build time. Before later enabling ads, verify AdSense approval/verification method, privacy/consent configuration, placements and performance. Existing optional GA settings/retention need account evidence; no new consent implementation is claimed. Google supports meta-tag/ads.txt verification: https://support.google.com/adsense/answer/7584263 .
3. **Verify production behavior after release:** canonical redirects, genuine crawler access, preview protection, full URL crawl, Search Console/Bing, deployed analytics, field CWV and origin latency. Existing tracker [#79](https://github.com/nikkuAg/rankmatrix-frontend/issues/79) and children cover these. Local tests cannot certify indexing or ranking gains.

No new product decision or owner-provided data is required to review/merge these local corrections. The inherited guide publication dates and founder credentials were not independently certified; review dates describe editorial review, not dataset imports.

## Technical backlog, not requests for owner input

The previous review's predictor CRL/category/pool/state/limit behavior, import aliases/completeness, partial-year release policy, full detail-DTO validation and catalogue back-navigation controls remain engineering work in the existing linked issues. These are not claimed fixed by SEO wording. The revised guides disclose the predictor limitations; this release does not silently change its algorithm. Source-data reconciliation and missing rank-table uniqueness remain backend #19/#72 work; no production constraint/cleanup is applied. A physical IISc type change must coordinate filters and predictor selection; the presentation correction deliberately avoids changing that stored bucket.

This addendum resolves the local false claims/classification/guide contradictions and measured runtime waste named in the request. It does not certify every existing product workflow, every official data row, or the broader UI critique backlog.
