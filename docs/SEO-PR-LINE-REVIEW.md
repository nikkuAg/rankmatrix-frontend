# Frontend SEO PR review and backend performance — 24 October 2026

> **Local-fix update:** [SEO-LOCAL-FIXES.md](SEO-LOCAL-FIXES.md) supersedes the pending privacy, IISc, guide, source-attribution and sampled contrast findings below. The register remains historical review context; it is not a list of 32 owner decisions.

**Historical disposition: technical checks pass with the corrections below; this is not unconditional merge approval.** The owner should explicitly review the unresolved accuracy/data/production items in the remaining-findings register. No PR has been merged, no production deployment performed, and no migration/import/database write run.

## Review scope and evidence

Reviewed the changed lines and their surrounding data consumers across frontend PRs **24–31 and 90–98**, including intermediate changes that later PRs supersede. The manifest [seo-pr-review-coverage.json](seo-pr-review-coverage.json) pins all 17 SHAs, 82 distinct paths and 306 diff hunks. Source/configuration/tests were inspected; historical evidence JSON was parsed and interpreted as dated samples, generated sitemap XML was checked against current catalogue membership, and the icon is a 96×96 PNG. Binary/generated data is not meaningfully reviewed as prose lines. Documentation is historical evidence, not a current account or production certification.

The integration under test is frontend `45da153ab6546f5b03031dafee4513d2faa7660f` and backend `d745d13428b369cbd40d52b3d799eed191f0d160`. Runtime preview: http://127.0.0.1:3008 . Tests use the local backend and the existing Azure database with PostgreSQL read-only transaction settings. Local dependencies, Azure state and credentials are excluded from commits.

Traced frontend values through backend quota/category/pool/type constants, Institute/Branch/ActiveBranch/InstituteQuota/NIRFRank/rank/seat models and uniqueness keys; SEO serializers/views; institute/programme search views; pagination/filter/cache utilities; predictor serializer and selection/view ordering; seat-change OuterRef/Coalesce logic; frontend API casing, request defaults, Redux/lazy-query state, catalogue consumers, metadata/schema, summary selection and factual copy. Reusing a variable name was not taken as evidence of its meaning.

## Findings corrected in this review

| Finding | Correction | PR |
| --- | --- | --- |
| Summary queries scaled with every related entity; institute seats also queried per programme | Batch one summary query and one grouped seat query. Preserve full response equality in live read-only samples. | backend #18, after #16 |
| Guide bodies contradicted earlier FAQ corrections: fake probability buckets, comprehensive predictor claims, arbitrary list lengths, named fake cutoff, universal round/quota relationships | Remove or qualify the concrete contradictions. Separate historical comparisons from eligibility/probability. | frontend #95 |
| Inaction was described as float; pre-deadline unlock and foreign-candidate exceptions were misrepresented | Correct the statements with current official rule/eligibility references. | #95 |
| Programme seat totals repeated on quota rows looked like quota-specific seats | Explicit all-quota/all-pool label and explanation; total includes active programmes only. | #95 |
| NIRF category/placement claims were inferred | Remove Engineering-specific institution claims and placement correlation. The model has no category field; scraper URLs point to Overall rankings. | #95 |
| Title helper manufactured names from city display codes/type | Use the supplied institution name. Tests include NIT Goa/Cuncolim and IISc stored as IIT. | #96 |
| Directory wrapper still accepted a catalogue 404 as missing detail; malformed successful SSR responses could become false empty content | Catalogue 404 must error; validate expected arrays and pagination after camelization. | #97 |

Earlier quota correction remains in backend #16 and frontend #93: all available quotas, independently latest rounds, clearly scoped General/Open and Gender-Neutral. Other categories/pools remain in the detailed tables. The old scalar fields are temporary compatibility only. A changed fetch cache key and missing-array guard prevent stale pre-change API responses from masquerading as no data.

**Additional corrected finding (#98):** 35 programme/deep-page title-collision groups were removed by including duration and programme code. Current helpers produce zero title collisions across 1,464 dynamic identities. Possible underlying programme aliases still need official reconciliation.

## PR-by-PR disposition

All listed implementation PRs were open, one commit each and mergeable against their declared bases when checked. These statuses do not validate the remaining assumptions below. Parent-only release states can contain problems fixed in later children.

| PR | Changed behaviour reviewed against | Result / remaining references |
| --- | --- | --- |
| #24 | Rendering, metadata/schema, navigation, catalogue POST defaults, backend serializers, headings, CSS/font/media changes, error semantics, sitemap | Integrated checks pass; follow-up corrections #90/#91/#93/#95/#96/#97 required. R01–R04, R13–R30 remain. |
| #25 | Predictor bounds, tiers, ordering, quotas/pools, guide statements and official notes | Methodology reflects the implementation; body contradictions needed #92/#95. R01–R12 and R31 remain. |
| #26 | Every changed analytics value/success path; helper call sites | Raw object/free-text values dropped; only finite numeric values forwarded. Account delivery/consent and error UX are not certified (R01, R16). |
| #27 | Dated audit, metadata/performance snapshots, rendered-audit script | Historical report. Current addendum supersedes old quota filtering, test counts and performance statements. |
| #28 | Research comparison/checklists, 114 topic entries and evidence JSON | Documentation recommendations are hypotheses/verification tasks, not engine weights or guarantees. Historical observations remain date-scoped. |
| #29 | Absence versus official nonpublication; coverage year fallback | Corrected copy; still no import manifest/completeness assertion (R05–R10). |
| #30 | Exam grouping and nonmutating alphabetical ordering | Avoids numerical cross-exam sorting. Stored type/IISc and Paper 2 assumptions remain R02/R03. |
| #31 | Icon route, PNG dimensions, unchanged SVG moved to public | Square 96×96 PNG verified; no favicon dependency introduced. Search display remains external. |
| #90 | Fetch status/configuration failures, sitemap shapes, mocked test environment | Helper tests pass; wrapper-level catalogue gaps corrected by #97. R14 remains. |
| #91 | Request args/currentData/default SSR fallback through search/filter/sort/page/error transitions | State tests pass; existing UI controls/back-navigation synchronization remains R15. |
| #92 | Predictor table/CSV reality, limits/order, visible guide/home claims | Removes unsupported result/provenance claims; additional guide bodies corrected in #95. R01–R12 remain. |
| #93 | Quota selection, exact year/category/pool/round, missing-array behaviour, API camelization, tables/FAQ/schema | All seven model quota choices tested; real API/HTML samples pass. Dataset completeness/eligibility not inferred. |
| #94 | Rank/seat uniqueness keys and seat-change query | Corrects FAQ allocation slices and missing-previous-year zero behaviour. Guide parallels corrected in #95. |
| #95 | Complete affected answer bodies and aggregate scope against code/current source notes | Concrete fixes above; not a full official counselling manual or data reconciliation (R01–R12, R31). |
| #96 | Institute name/displayCode/type roles | Identity regression tests pass. Stored entity classification still needs R02. |
| #97 | SEOSlugsView and RankMatrixPagination shapes | Contract tests/build pass. Only bounded structural validation, not every detail-field schema (R14). |
| #98 | All 1,464 dynamic identity templates and real programme codes | Metadata collisions removed; underlying duplicate/alias records still require official reconciliation (R05). |

## Remaining findings and assumptions — read before merging

These are **known unresolved concerns or limits**, not newly discovered production incidents. “Existing” does not make an inaccurate claim safe. Priorities are review judgments. Grouped entries identify the associated code and existing backlog to avoid duplicating issues.

| ID | Priority / disposition | Evidence and implication / required decision |
| --- | --- | --- |
| R01 | P1, existing; review before full release/ads | `src/app/privacy/page.js` says inputs live only locally and servers never read/store them; predictor/search POST inputs reach the backend and result caches exist. Filter state is Redux, not persisted like the policy claims. Claims about anonymous/no personal data, retention and Google consent are unverified. Root layout globally loads AdSense and optional GA. See #68/#78/#85. This is not resolved by removing raw GA event values. |
| R02 | P1, data/semantic concern before calling headings authoritative | Backend InstituteTypeEnum has only IIT/NIT/IIIT/GFTI. Exam groups, IIT counts and institution descriptions trust that field; The current API lists Indian Institute of Science, Bangalore (code 124) as IIT, so it can be labelled/counted incorrectly. #96 fixes metadata names only. Verify an explicit institute/exam mapping and stored classifications; #69/#72. |
| R03 | P1, unsupported exam precision | Rank DTO has no exam/paper/rank-list field. Main/Advanced grouping relies on institute type; Paper 1/2A/2B and exceptional programmes are not explicitly represented. Predictor uses Main bounds for all non-IIT rows. Do not read this as support for every architecture/planning admission route; #32/#50/#72. |
| R04 | P1, inherited editorial concerns remain | Some untouched guide prose still overgeneralizes centrally funded membership, every IIT seat/direct admission, category offers/certificate rules and registration/reporting details. `what-is-josaa-counselling`, `jee-main-vs-advanced-vs-josaa` and `josaa-reservation-categories` need a complete official-rule editorial sign-off. Correcting the concrete statements in #95 is not certification of all inherited advice. #72/#67. |
| R05 | P1, no official-data completeness/fidelity claim | Counts 138/288/1,038 describe the database. No release manifest, official row-by-row reconciliation or full validation of ranks/seats has been performed. Imports may be incomplete. NIRF provenance/category is not stored. #72 and research D03/D04/D10/D11. |
| R06 | P1, literal dimension aliases | Frontend constants match backend choices for all seven quotas, categories and pools. However old detail rows visibly include variants such as `Female-Only`; ChoiceField definitions do not prove all imported DB strings were normalized. Exact filters can miss aliases. Needs import validation/reconciliation, #72. |
| R07 | P1, predictor existing | A category-selected request uses one Main/Advanced rank pair and an exact category filter. It does not automatically compare separate CRL and category ranks/opportunities. Form guidance remains ambiguous; #32/#50. |
| R08 | P1, predictor existing | Female-only selection does not automatically union Gender-Neutral results. State matching is exact and does not implement all aliases, Union Territory mappings or exceptional eligibility; #33/#34. |
| R09 | P1, rollover/partial import | SEO chooses the newest model with any rows globally, not a verified complete release or newest year per institute/quota. Predictor still uses the configured latest model and global max round. Empty/partial future imports can cause inconsistency or omit rows; #36/#46/#72. |
| R10 | P2, explicit data policy | Deep history considers the five newest configured model classes, not five populated years. Seat data is queried for the latest cutoff year, so a newer seat release before new cutoffs can be hidden. `ActiveBranch` has no year; active-programme counts are not proof that every programme offered seats in the headline cutoff year. #72, research D06/D07. |
| R11 | P1, predictor existing | Result tiers, count cap and final opening-rank sorting can omit relevant alternatives and mix numerical scales in the predictor table. Negative/extreme inputs are insufficiently bounded. Missing year/round/row links and CSV provenance remain; #35–#38/#50. |
| R12 | P1, special rank interpretation | Summary/deep/predictor exclude preparatory rows. Rank explorer does not expose the same exclusion or a preparatory flag in its serializer. Reserved/PwD/special lists need the correct matching rank; broad cutoff comparisons must not imply eligibility. #32/#50/#72. |
| R13 | P1, ownership/attribution | Deep Dataset JSON-LD still uses the developer as creator while underlying observations originate with JoSAA; `isBasedOn` is present but source versus compilation roles should be made explicit. About/founder expertise, contact identity and original publication dates are inherited claims, not independently verified credentials. Research S04/O01/O05, #69/#72. |
| R14 | P2, contract limit | Fetch guards validate HTTP/object/array/pagination shapes and required quota arrays, not every field or nested detail row. A malformed rank/slug/name can still error or produce bad content. Backend serializers are the current contract; no whole-DTO runtime schema or deployment failure injection has been added. |
| R15 | P1, existing interaction limits | Catalogue query matching prevents stale rows under new args, but local chip/search/sort UI state can differ from retained Redux state on return navigation. Filter-option load failures, fetch-error recovery and URL/shareable state remain separate UX work; #43–#49/#53/#76. No state-persistence guarantee. |
| R16 | P1, instrumentation limit | GA is conditional on deployment env; actual delivery/consent is unverified. `analyticsPayload` accepts category/label fields from callers and drops nonnumeric values only; current reviewed callers are static labels, but it is not a general PII sanitizer. Network errors may not show a useful toast; completion does not prove nonempty/useful results. #39/#53/#68/#85. |
| R17 | P1, known accessibility concern | Long detail Lighthouse accessibility is 96 in the sampled state, not 100. Dark header badges have poor contrast (existing #60/#61). Automated checks do not replace keyboard, screen reader, zoom or physical-device testing; #42/#51/#76. |
| R18 | P1, measured performance still needs work | Catalogue/detail lab LCP remains above 2.5 s in samples; TBT is not field INP. Client MUI/Redux work, large histories and global third-party scripts remain costs. Local score improvement is not a production p75 pass; #86/backend #17. |
| R19 | P1, cache/freshness limit | Daily ISR/fetch revalidation is request-driven, not an official import SLA or instant invalidation. Browsers/CDN/Redis can retain older data. No import-to-page revalidation hook or release manifest added. #72/backend #17. |
| R20 | P1, scale/cold-start limit | Batching removes per-entity round trips, but still materializes selected latest-year rows to choose per-quota maxima. Samples are bounded, not concurrency/load tests or full-table worst-case proofs. Future year/model probes can add existence queries. No new index or shared cache was added. backend #17. |
| R21 | P1, production configuration | Public NEXT_PUBLIC_API_URL must be production backend, not local; frontend includes this value in browser code. No secret may be placed there. Azure/production timeouts, scaling, CORS and CDN behaviour are not certified by local builds. #80/#84. |
| R22 | P1, release orchestration | Backend main auto-deploys. Vercel production branch/deployment gating must be checked before merging a stacked series: parent-only releases include issues fixed by descendants. Merge commits preserve ancestry; retarget each child after its parent lands. Do not deploy intermediate states as the final reviewed release. #80. |
| R23 | P1, canonical/preview/bot access | www metadata reflects the observed serving host, not verified Google-selected canonical. Earlier apex redirect was 307. Preview indexing protections and genuine provider-IP crawler access are not proven by spoofed user agents or wildcard robots. #81/#84/#88. |
| R24 | P1, sitemap parity | 1,484 route membership is verified structurally, not HTTP/indexability/canonical success for every dynamic URL. Active pairs and metadata's data-based noindex can diverge after imports. Full crawl and link graph remain #83. Empty institute index policy is a product/editorial decision, not automatically wrong. |
| R25 | P2, content quality and appearance | Long full institution/programme names may truncate in search. Template pages can have sparse data/duplicate prose. Engines can rewrite titles/snippets and ignore sitemap priorities; no fixed word count or h1 count guarantees rankings. #89. |
| R26 | P2, prefetch tradeoff | `AppLink` and primary/directory links disable eager prefetch to avoid many automatic origin renders; click navigation can therefore incur the first-render latency. Some inherited breadcrumb/guide Links still use default prefetch. Not every route is prebuilt; warm representative routes after release. |
| R27 | P2, catalogue hydration cost | Server-rendered first-page data is refreshed by the lazy client query after mount. That is one deliberate duplicate read, usually Redis-backed, not zero backend work. SSR initial search defaults match the slice; a future default change must update both. |
| R28 | P2, layout/browser scope | CSS breakpoints changed from JS thresholds and calendar uses IntersectionObserver. Current supported browsers are assumed; no legacy-browser/polyfill audit. Mobile layout/content checks are viewport simulations, not device certification. Calendar stale/empty states and broader UI critique remain #52/#60/#64. |
| R29 | P2, assets/security | Square PNG and unversioned one-day/SWR headers are verified in source/build; real CDN overrides and compression must be verified after deploy. Robots is not access control. No broad dependency/security penetration review or account policy changes performed. #80/#84. |
| R30 | P1, accounts/search/ads | No Search Console, Bing or GA property evidence, verified rankings/backlinks/AI citations, field CWV or AdSense approval. Global ad loader remains. Training-bot permissions are not a ranking requirement; llms.txt/FAQ markup supplies no promised Google ranking/rich-result benefit. #78/#79/#82/#85–#89. |
| R32 | P1, confirmed missing DB constraint | Abstract rank Meta declares uniqueness, but the concrete 2026 model has no composite unique_together and read-only live introspection found only the id uniqueness constraint. Current 2026 General/Gender-Neutral nonpreparatory summary slices have zero duplicate groups. Future imports could create conflicting same-quota/same-round rows; latest selection cannot infer which is official. Audit/import validation and a separately reviewed data-cleanup/constraint migration are required. No migration was run. Tracked in [backend #19](https://github.com/nikkuAg/rankmatrix-backend/issues/19). |
| R31 | P2, editorial dates and claims | Guide publication dates are inherited literals; review dates are not dataset import dates. Some generic advice remains opinionated, and source links may move. Establish cycle-specific review and exact-source provenance rather than interpreting an Updated label as full official rule verification. #72/#89. |

The highest-priority **pre-merge review decisions** are R01–R04, R21–R22 and the constraint follow-up R32. The SEO changes do not require adding ads or changing the predictor algorithm to resolve them; their disposition must be explicit instead of silently assumed. Existing UX backlog items are not closed by this review.

## Backend performance evidence

Same-process, sequential read-only Django view calls using the same Azure database and response serializer, with complete payload equality asserted between #16 and the batch implementation:

| Sample | #16 queries | Batched queries | #16 time | Batched time |
| --- | ---: | ---: | ---: | ---: |
| NIT Goa institute | 14 | 6 | 1.146 s | 0.531 s |
| Civil Engineering programme | 72 | 5 | 7.212 s | 0.500 s |

The profiling script asserted at most 6 and 5 queries respectively for the currently populated year. Complete response payloads matched, including ranks/quotas/seat totals/legacy fields. Four Django unit tests pass; these tests use mocks and do not create or mutate a production database. Query-count checks were live read-only samples, not CI tests. No SQL/credentials are included in published evidence.

Before quota expansion, the comparable AI/OS-only sample was 14/72 queries and 1.343/6.740 seconds. All-quota expansion itself kept those query counts and measured 1.207/6.711 seconds. It increased response size as expected: institute JSON 1,946→3,391 bytes; programme 24,622→35,378 bytes in the captured serialization. Batching preserves the richer payload and removes repeated network round trips. These are individual local samples, not p50/p95, controlled production before/after or guaranteed timings.

Non-SEO search/predictor algorithms were not changed by the backend optimization. More indexable pages can still increase total crawler traffic; no production load test was performed.

## Frontend performance and tests

Normal production build/postbuild pass; 23 rendered metadata/schema samples, valid 96×96 favicon delivery and inactive-pair 404s pass on the #98 build. All 26 frontend tests, all changed-source ESLint, 4 backend tests and Django checks pass. Rendered checks cover 20 static routes, initial catalogue rows, 1,484 sitemap memberships, three 404/noindex cases and 21 quota-page requests across seven institutes. Real samples include NIT Goa GO/HS/OS and NIT Srinagar JK/LA/OS. Synthetic tests cover all seven quotas and independent latest rounds. These checks validate implementation and API consistency, not every official number.

Warm local production responses across six routes: TTFB 4–34 ms, gzip HTML about 12–30 KB, Next cache HIT. A separate first-observed IIT Delhi/Abu Dhabi Chemical programme trio returned cache MISS at 1,940/776/1,422 ms, then HIT at 5 ms each. These are local server response measurements, not mobile paint or production network timings. The unusual programme name is stored data, not a newly verified official participation claim.

Mobile Lighthouse uses installed Chrome, Lighthouse 13.5.0 and default simulated mobile throttling. Individual runs fluctuate; local optional analytics/ad delivery differs from production. The machine-readable summary accompanying this review records the actual URL and source run for every number. Earlier home/catalogue runs were against the prior integrated preview, before #95–#97; their scores are not silently labelled as measurements of a later SHA. No field INP or CrUX pass is claimed.

## Release sequence

Backend #16 → #18 (after retargeting #18 to main once #16 lands), then verify the deployed API contract and query behaviour. Frontend order: #24 → #25 → #26 → #27 → #28 → #29 → #30 → #31 → #90 → #91 → #92 → #93 → #94 → #95 → #96 → #97 → #98, followed by this review-document PR. Use merge commits, retarget each next child to main only after its parent merges, and coordinate production builds so incomplete intermediate states are not the release under review. Backend #16 must be available before #93's frontend API contract.

After the owner resolves or explicitly accepts the register's release concerns, complete production verification issue #80 and the #79 tracker. Local checks do not replace account, official-data or production evidence.

## Primary rule references checked for the concrete corrections

- [JoSAA 2026 Business Rules](https://cdnbbsr.s3waas.gov.in/s313111c20aee51aeb480ecbd988cd8cc9/uploads/2026/06/20260601632081678.pdf): institute/exam scope, pre-deadline unlock (40), mandatory acceptance (42/48), available upgrade options (49–52).
- [JEE Advanced official FAQ](https://jeeadv.ac.in/faq.html): foreign-national/OCI/PIO eligibility exceptions.

This review does not establish that all historical guide statements have official sign-off. The specific unresolved editorial items are deliberately retained in R04/R31 rather than hidden behind a general “all tests pass”.


### Latest lab measurements and their tested state

| Route | Performance | Accessibility | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 89 | 100 | 2.8 s | 0 | 300 ms |
| Colleges | 85 | 100 | 3.7 s | 0 | 240 ms |
| Long cutoff detail | 91 | 96 | 2.9 s | 0 | 210 ms |

These latest runs used the #97 build on port 3007. #98 subsequently changes metadata identity strings and adds a visible programme-code badge; its build and rendered metadata are checked separately. Earlier same-session home/catalogue runs produced 92/88 and LCP 1.6/3.3 s, illustrating variability; they must not be cherry-picked as guaranteed results. The older recorded local baseline had homepage 52/CLS 0.903; the earlier catalogue after CLS corrections had 85/CLS 0.049. These cross-run comparisons are indicative, not controlled production experiments.

The current home audit identifies approximately 195 KiB of unused JavaScript, including roughly 123 KiB in an existing AdSense implementation script. It loads 10 font resources totaling about 89 KB in that run. Neither is attributed automatically to the new quota data. Ad-account-safe loading/consent and measured client bundle reductions remain performance work; advertising settings were not changed.

No assertion that all speed targets pass is made: lab LCP in the latest samples exceeds 2.5 s, and real-user INP/LCP/CLS remain unmeasured. The demonstrated improvement is the backend query reduction and stable sampled layout, not a universal site-speed guarantee.

## Per-file diff coverage index

The manifest provides each original hunk range. This index groups reviewed paths by their originating PRs; generated data/binary assets were validated structurally rather than treated as executable source.

| Path | PRs | Review method |
| --- | --- | --- |
| `docs/SEO-AEO-AUDIT.md` | #27 | Historical evidence / parsed data / asset structure |
| `docs/SEO-AEO-RESEARCH.md` | #28 | Historical evidence / parsed data / asset structure |
| `docs/SEO-TECHNICAL-CHECKLIST.md` | #27, #28 | Historical evidence / parsed data / asset structure |
| `docs/metadata-preview.json` | #27 | Historical evidence / parsed data / asset structure |
| `docs/performance-results.json` | #27 | Historical evidence / parsed data / asset structure |
| `docs/seo-research-evidence.json` | #28 | Historical evidence / parsed data / asset structure |
| `next-sitemap.config.js` | #24, #90 | Changed source and dependent contracts |
| `next.config.mjs` | #24 | Changed source and dependent contracts |
| `public/icon.svg` | #31 | Historical evidence / parsed data / asset structure |
| `public/llms.txt` | #24 | Historical evidence / parsed data / asset structure |
| `public/robots.txt` | #24 | Historical evidence / parsed data / asset structure |
| `public/sitemap-0.xml` | #24 | Historical evidence / parsed data / asset structure |
| `public/sitemap.xml` | #24 | Historical evidence / parsed data / asset structure |
| `scripts/analytics.test.mjs` | #26 | Changed source and dependent contracts |
| `scripts/audit-rendered.py` | #27 | Changed source and dependent contracts |
| `scripts/catalogueState.test.mjs` | #91 | Changed source and dependent contracts |
| `scripts/cutoffSummaries.test.mjs` | #93 | Changed source and dependent contracts |
| `scripts/examGroups.test.mjs` | #30 | Changed source and dependent contracts |
| `scripts/metadata.test.mjs` | #24, #96, #98 | Changed source and dependent contracts |
| `scripts/rendering.test.mjs` | #24 | Changed source and dependent contracts |
| `scripts/seo.test.cjs` | #24, #90 | Changed source and dependent contracts |
| `scripts/seoContracts.test.mjs` | #97 | Changed source and dependent contracts |
| `scripts/seoFetch.test.mjs` | #90 | Changed source and dependent contracts |
| `src/app/about/page.js` | #24 | Changed source and dependent contracts |
| `src/app/branches/[slug]/page.js` | #24, #29, #30, #93, #95, #98 | Changed source and dependent contracts |
| `src/app/branches/page.js` | #24 | Changed source and dependent contracts |
| `src/app/colleges/[slug]/[branch]/page.js` | #24, #29, #93, #98 | Changed source and dependent contracts |
| `src/app/colleges/[slug]/page.js` | #24, #29, #93, #95 | Changed source and dependent contracts |
| `src/app/colleges/page.js` | #24, #95 | Changed source and dependent contracts |
| `src/app/contact/page.js` | #24 | Changed source and dependent contracts |
| `src/app/guides/jee-main-college-predictor/page.js` | #25, #92, #95 | Changed source and dependent contracts |
| `src/app/guides/jee-main-vs-advanced-vs-josaa/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/josaa-choice-filling-strategy/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/josaa-counselling-rounds/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/josaa-opening-and-closing-ranks/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/josaa-reservation-categories/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/josaa-seat-matrix/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/page.js` | #25, #95 | Changed source and dependent contracts |
| `src/app/guides/what-is-josaa-counselling/page.js` | #25 | Changed source and dependent contracts |
| `src/app/icon.png` | #31 | Changed source and dependent contracts |
| `src/app/layout.js` | #24 | Changed source and dependent contracts |
| `src/app/methodology/page.js` | #25 | Changed source and dependent contracts |
| `src/app/not-found.js` | #24 | Changed source and dependent contracts |
| `src/app/page.js` | #24, #92, #95 | Changed source and dependent contracts |
| `src/app/predict/content.js` | #25, #92 | Changed source and dependent contracts |
| `src/app/predict/page.js` | #25, #92 | Changed source and dependent contracts |
| `src/app/privacy/page.js` | #24 | Changed source and dependent contracts |
| `src/app/ranks/page.js` | #24, #94 | Changed source and dependent contracts |
| `src/app/seat-matrix/page.js` | #24, #94 | Changed source and dependent contracts |
| `src/app/terms/page.js` | #24 | Changed source and dependent contracts |
| `src/components/AppLink/index.js` | #24 | Changed source and dependent contracts |
| `src/components/BranchList/index.js` | #24, #91 | Changed source and dependent contracts |
| `src/components/ChipFilter/index.js` | #24 | Changed source and dependent contracts |
| `src/components/CollegeList/index.js` | #24, #91 | Changed source and dependent contracts |
| `src/components/CollegePredictor/formModal.js` | #26 | Changed source and dependent contracts |
| `src/components/DashboardSections/Calendar/DeferredCalendar.js` | #24 | Changed source and dependent contracts |
| `src/components/DashboardSections/Calendar/index.js` | #24 | Changed source and dependent contracts |
| `src/components/DashboardSections/FeatureBox/index.js` | #24 | Changed source and dependent contracts |
| `src/components/DashboardSections/Updates/ContentListCard.js` | #24 | Changed source and dependent contracts |
| `src/components/DataPageLayout/index.js` | #24 | Changed source and dependent contracts |
| `src/components/GuideLayout/index.js` | #24 | Changed source and dependent contracts |
| `src/components/Navbar/index.js` | #24 | Changed source and dependent contracts |
| `src/components/NoData/index.js` | #24 | Changed source and dependent contracts |
| `src/components/OfficialRuleNotes/index.js` | #25 | Changed source and dependent contracts |
| `src/components/PaginationBox/index.js` | #24 | Changed source and dependent contracts |
| `src/components/RankMatrixLayout/FeatureLayout.js` | #24 | Changed source and dependent contracts |
| `src/components/RankMatrixLayout/index.js` | #24 | Changed source and dependent contracts |
| `src/components/SeoDirectory/index.js` | #24 | Changed source and dependent contracts |
| `src/components/ToolAnswers/index.js` | #24 | Changed source and dependent contracts |
| `src/constants/themes.js` | #24 | Changed source and dependent contracts |
| `src/store/selectors/siteContent.js` | #24 | Changed source and dependent contracts |
| `src/theme/ThemeContext.js` | #24 | Changed source and dependent contracts |
| `src/utils/analyticEvent.js` | #26 | Changed source and dependent contracts |
| `src/utils/analyticsPayload.mjs` | #26 | Changed source and dependent contracts |
| `src/utils/catalogue.mjs` | #24, #91 | Changed source and dependent contracts |
| `src/utils/cutoffSummaries.mjs` | #93 | Changed source and dependent contracts |
| `src/utils/examGroups.mjs` | #30 | Changed source and dependent contracts |
| `src/utils/jsonLd.js` | #24 | Changed source and dependent contracts |
| `src/utils/metadata.mjs` | #24, #96, #98 | Changed source and dependent contracts |
| `src/utils/seoApi.js` | #24, #90, #93, #97 | Changed source and dependent contracts |
| `src/utils/seoContracts.mjs` | #97 | Changed source and dependent contracts |
| `src/utils/seoFetch.mjs` | #90 | Changed source and dependent contracts |
