# RankMatrix AdSense readiness assessment and action plan

Review date: 23 October 2026. Scope: public www site, existing local production preview on port 3001, frontend source at `cc331ce49c5251c8a790093c31eb1299acabff96` through [PR 31](https://github.com/nikkuAg/rankmatrix-frontend/pull/31), and current official Google documentation.

**Recommendation: resolve the privacy contradictions and remaining predictor accuracy issues, deploy the coordinated pending fixes, and verify the public result before requesting review.** RankMatrix has a credible value proposition: free, accessible tools that turn official admissions data into searchable shortlists, with explanatory guides. It is not inherently ineligible because it is a tool or uses public data. However, a large catalogue and an AdSense loader do not establish approval, originality across every page, or consent compliance. Approval remains Google's decision.

The public site is usable after JavaScript loads, but initially delivers misleading empty catalogue states. Pending changes improve that experience and remove several misleading examples. The pending version still has privacy statements that conflict with its API requests and unresolved explanations of prediction ordering. These are practical reasons to improve the site before submission, not asserted rejection reasons from Google.

## Evidence and version boundaries

Fresh response summaries are in [adsense-readiness-evidence.json](adsense-readiness-evidence.json). Reproduce with `pwsh -File docs/adsense-audit-fetch.ps1` while the existing preview is running. The [fetch script](adsense-audit-fetch.ps1) performs only public/read HTTP requests, redacts publisher numbers, and does not build, start or stop services. The JSON includes timestamps, routes, response status, initial HTML counts and selected content checks. Counts include navigation and are not quality scores.

| Surface | Deployed www site | Pending local preview |
| --- | --- | --- |
| Home and tools | Home, predictor, ranks and seats return 200; no h1 in their initial HTML. Home tool cards work after client data arrives. | Same routes return 200 with one h1. Shared navigation and home tool anchors no longer depend on a successful content request. |
| `/colleges` | Initial HTML contains two table rows: header plus false-empty row, and undefined NIRF year. Fresh browser initially showed this state, then recovered to 25 institutes out of 138 and NIRF 2025. This is not a permanently empty directory. | Initial HTML contains 26 rows including header; 25 real institute rows. |
| `/branches` | No table rows in initial HTML. | 26 initial table rows including header plus crawlable directory. |
| Sample institute and pair | IIT Madras institute and aerospace pair both 200; respectively 27 and 311 table rows including headers. Useful data pages already exist live. | Both 200, with corresponding populated tables. |
| `/predict` content | Named institute examples and guarantee language remain in the response. | Hypothetical interval replaces named examples; no universal safety margin. Modal can be cancelled, exposing explanations and navigation. Some ordering claims still conflict with methodology. |
| Guides and trust pages | Guides hub, two sampled guides, about, contact, privacy, terms and methodology all 200. | Same sampled routes 200. Updated methodology describes the implemented cutoff search. |
| Missing route | `/adsense-audit-nonexistent` returns 404. | Same route returns 404. |
| Ad connection | Loader reference and publisher meta present. www `/ads.txt` returns 200 and matches publisher reference in home HTML. Apex `/ads.txt` resolves successfully to www. | Same checks pass. No manual `<ins class="adsbygoogle">` unit found in sampled initial HTML or manual slot attributes in inspected source. |
| Robots | Public robots permits page crawling and excludes `/api` and `/admin`. | Same general rule. A public allow rule does not prove genuine Google review crawler access through hosting/WAF. |

HTTP checks covered 17 routes on each version, plus institute and pair samples and apex requests. Browser checks covered live home/catalogue and local predictor entry/dismissal. This was not an exhaustive crawl or a real-device test. Mobile evidence is inherited from the separately recorded [technical checklist](SEO-TECHNICAL-CHECKLIST.md): one live home Lighthouse run recorded CLS 0.903 and LCP 3.6 s; local home/college runs recorded CLS 0/0.049 and LCP about 3.7–3.8 s. These lab readings are not current field data or AdSense thresholds. Source uses responsive controls and scrollable tables; narrow-screen predictor fields and error recovery still need acceptance testing.

The existing [search research](SEO-AEO-RESEARCH.md), [technical checklist](SEO-TECHNICAL-CHECKLIST.md) and [audit](SEO-AEO-AUDIT.md) provide earlier evidence. PR 31 was open and unmerged at inspection. Its preview deployment is distinct from the public domain. Uncommitted product-review documents belong to concurrent work and are not included in this change.

## Requirements compared with RankMatrix

“Required” below identifies a documented Google condition; “recommendation” identifies Google's preparation guidance; “judgment” is this product assessment. “Unknown” requires additional evidence and does not mean failure.

| Topic and official basis | RankMatrix evidence and status | Next action |
| --- | --- | --- |
| **Required: eligible publisher and own site/content.** Applicant must be at least 18, have suitable original content and access to the site's HTML. [Eligibility](https://support.google.com/adsense/answer/9724) | Source access exists. Applicant age, eligible account, payment identity and actual domain/account ownership are unknown. | Owner confirms eligibility and correct account; do not publish identity documents in Git. |
| **Required: site review and connection.** Google reviews the whole site. Code, ads.txt and meta are connection options. [Connect a site](https://support.google.com/adsense/answer/7584263) | Loader, meta and matching ads.txt are present; review/approval unknown. Source puts the `afterInteractive` script in body; that alone does not establish the documented head-snippet method is fulfilled. Meta is an alternative. | Match the account's chosen method and exact expected identifier against public output; verify in account. |
| **Required: reachable live site.** Public content must be accessible to reviewers/crawlers. [Site not ready](https://support.google.com/adsense/answer/12176698) | Sampled routes publicly return 200, unknown static route 404; robots permits pages. Genuine crawler/WAF status unknown. | Verify account connection diagnostics and public asset/API access. Localhost fixes cannot satisfy review. |
| **Recommendation: distinct, useful content and clear navigation.** [Pages ready for AdSense](https://support.google.com/adsense/answer/7299563?hl=en) | Search/filter tools, explanatory paragraphs, eight linked guides and trust pages provide a strong foundation. Initial false-empty directories and client-dependent entry reduce readiness. | Deploy rendering/navigation fixes; retain useful tool-linked explanations. |
| **Required: inventory value.** Ads cannot monetize low-value/empty screens or copied material without added value. [Publisher Policies](https://support.google.com/adsense/answer/10502938) | Public JoSAA rows are source material; filtering, history, interpretation and exam-separated comparisons add potential value. Catalogue-wide sufficiency is not proven by two samples. | Audit thin/empty templates and actual added value; avoid advertising on error, loading-only or empty result surfaces. |
| **Required: supported language.** [Supported languages](https://support.google.com/adsense/answer/9727) | English is supported and is the site's main language. | Maintain readable English; translate only when useful and reviewed. |
| **Required: accurate privacy disclosure.** [Privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794), [advertising cookie disclosures](https://support.google.com/adsense/answer/1348695) | Policy mentions Google cookies and opt-outs, but incorrectly says inputs stay only on-device and that servers do not read them. Consent claim is unverified. **Confirmed disclosure gap.** | Correct statements to match request processing, actual retention/logging and enabled services; verify vendor choices. |
| **Conditional regional requirements: consent.** EEA/UK/Swiss disclosures and consent where required; certified TCF CMP for personalized ads there. [Consent guidance](https://support.google.com/adsense/answer/7670013), [CMP requirements](https://support.google.com/adsense/answer/13554116) | No explicit CMP/gating integration found in source; account-published Google messages can be external to source. An India browser session cannot establish their regional behavior. | Inspect Privacy & messaging, target regions and published message; test accept/reject/reopen in applicable regions before serving. |
| **Conditional regional requirements: US privacy choices.** [US messages](https://support.google.com/adsense/answer/10961479) | Audience geographies, applicability and configuration unknown. | Owner assesses applicable states and choices; verify opt-out signal and restricted-data-processing behavior when applicable. |
| **Required: safe placements and valid traffic.** [Placement policies](https://support.google.com/adsense/answer/1346295), [invalid traffic](https://support.google.com/adsense/answer/2660562) | No manual slots found; Auto ads/account settings and traffic quality unknown. Controls, table sorting and CSV buttons create accidental-click risks if ads are added near them. | Plan placements separately and test them after authorization. Never click live ads during QA. |
| **Recommended: ads.txt.** Google explicitly says it is not mandatory, but strongly recommends it. [Ads.txt guide](https://support.google.com/adsense/answer/12171612) | File is available on both domain entry points; public HTML reference matches. Account authorized status unknown. | Check exact account publisher match and Sites ads.txt status. File existence is not site approval. |
| **Required policies versus restricted inventory.** [Publisher Restrictions](https://support.google.com/publisherpolicies/answer/10437795) restrict demand for certain content; they differ from prohibited content. | Sampled admissions content presents no obvious restricted-content theme. This is not an exhaustive policy clearance. | Recheck future user-generated, sponsored or new subject content before monetizing it. |

The reviewed official eligibility and readiness pages establish no universal numeric minimum for traffic, articles, article words, domain age or SEO score. Do not delay for an invented “30 articles / 1,000 words / six months / 100 visits” target. Google's rejection guidance does call for substantive original text and completed pages; a template with headings alone is insufficient. [Account not approved](https://support.google.com/adsense/answer/81904)

## Original value and content accuracy

**Product judgment:** RankMatrix's best approval argument is the combination of a working shortlist tool, explorable historical records, transparent method and actionable explanations. Adding filler articles would dilute it. Public facts are not exclusive content, and republishing tables does not automatically add enough value. Equally, a shared template is not by itself proof of low value: a populated institute–programme page can answer a distinct question when its data, context and comparisons matter. Google prohibits replicated inventory without meaningful addition; it does not promise approval for any specific tool architecture. [Inventory value policy](https://support.google.com/adsense/answer/10502938)

Keep three layers useful:

1. **Tools:** show inputs, matched rank list, year/round, quota/pool, limitations and next action beside the answer. A predictor should help the student understand a shortlist rather than only output rows.
2. **Data pages:** make the actual historical record the main content. Preserve exam separation, clear units and linked original publications. Remove duplicates and distinguish unavailable records from unpublished data. Do not invent descriptive paragraphs for every slug.
3. **Guides:** maintain the existing eight substantive guides. Fix concrete explanations, add worked examples tied to real data slices where helpful, and link to exact official rules. Do not create a target number of near-duplicate rank/category/year articles.

Pending work already improves methodology, exam grouping, missing-record wording and illustrative examples. Remaining issues include:

- `src/app/predict/content.js` still describes ordering from more competitive to safer combinations, while `src/app/methodology/page.js` describes selection tiers followed by opening-rank ordering. Those are not interchangeable, particularly across exams/categories. Do not imply measured probability or automated safety classification.
- `src/app/guides/jee-main-college-predictor/page.js` FAQ explains a closing rank above the candidate's rank as if the candidate were short of the cutoff. In the same rank list, a numerically smaller rank is better. Reconcile FAQ, body and methodology; existing [issue 67](https://github.com/nikkuAg/rankmatrix-frontend/issues/67) tracks the contradiction.
- Inputs should state the rank list at entry, and results should retain provenance. Existing [issue 32](https://github.com/nikkuAg/rankmatrix-frontend/issues/32) and [issue 36](https://github.com/nikkuAg/rankmatrix-frontend/issues/36) provide product follow-ups. These are useful readiness improvements, not Google-issued individual prerequisites.

Source attribution is present in methodology, footers and guide notes, and identity/contact pages are live. Public availability is not a licence declaration: verify reuse rights and preserve official source terms before publishing a redistribution/licence claim. Do not invent credentials, outcomes, testimonials or complete coverage claims. About/contact/terms improve trust, but their mere presence is not a documented substitute for content quality.

## Privacy and advertising findings

`src/store/queries/prediction.js` sends `req` as a POST body through the API client. `src/components/CollegePredictor/index.js` passes the submitted prediction details. Thus the backend processes inputs; this does **not** prove they are retained. The privacy statements that entered data remain only in local storage and servers do not read them are inaccurate in both reviewed versions. Audit API/access/error logs and infrastructure retention with the owner before claiming no storage. GA code and hosting also require careful wording around identifiers rather than blanket claims that no personal data is processed.

`src/app/layout.js` loads GA when configured and the AdSense script globally. `src/utils/analyticsPayload.mjs` now drops object values and comments explicitly exclude form objects/category selections/free-text searches. This is a useful pending safeguard, but actual production events, automatic collection and property settings still need verification. Avoid transmitting candidate category/caste or raw rank/input data into analytics/ad targeting. No env files or account settings were inspected.

The policy's EU/UK reliance on Google's consent tools is not established by its links to Ads Settings. Personalized-ad opt-out and a publisher's consent notice serve different purposes. Include Switzerland in applicable scope, describe the deployed choice mechanism accurately and provide a usable way to revisit choices. Google's CMP may be published from AdSense without a repository integration, so source absence cannot establish account misconfiguration. Google's current guidance distinguishes certified-CMP personalized traffic from possible non-personalized/limited serving; non-personalized ads are not a blanket exemption from cookie/storage consent obligations. [CMP requirements](https://support.google.com/adsense/answer/13554116), [consent guidance](https://support.google.com/adsense/answer/7670013)

An Indian subject and domain do not establish that all visitors are in India. Determine actual audience regions and serving settings. Google documentation is the basis for these product requirements; it does not settle RankMatrix's complete obligations under Indian or other privacy law.

For an eventual advertising rollout, start conservatively on useful stable content. Keep ads visibly distinct and away from Predict, Cancel, filters, sort headers, pagination and downloads. Reserve space and test mobile reflow; do not let ads cover content or form controls. Exclude missing/error/loading-only screens and inspect empty states before enabling ads there. Review Auto ads exclusions and anchors/interstitials in the account instead of assuming a global loader yields safe placement. These implementation choices need separate authorization. [Placement policies](https://support.google.com/adsense/answer/1346295)

## Sequenced backlog

Effort estimates are engineering judgments: XS under half a day, S roughly one day, M two to three days; account/deployment waiting is additional. P0 means resolve before the proposed review request, not a proven Google rejection. P1 addresses a substantial readiness risk; P2 improves an established foundation. Reuse linked existing issues instead of duplicating them.

| Order | Priority and scope | Effort | Acceptance criteria |
| --- | --- | --- | --- |
| A1 | P0 privacy truth: `/privacy`, request flow, infrastructure retention inventory | S plus owner facts | Policy distinguishes device storage, API processing, third-party collection and verified retention. No claim that servers never read prediction inputs. Enabled vendors and privacy links match reality. |
| A2 | P0 consent verification: AdSense Privacy & messaging plus frontend behavior where required | S plus account owner | Record chosen CMP, published site/regions, privacy URL and revisit-choice mechanism. Verify applicable accept/reject/withdraw behavior and resulting requests in a clean regional session; document US applicability. Do not claim compliance solely from a banner. |
| A3 | P1 predictor correctness and interpretation: content, form, result provenance | M; split coherent fixes | Fix reversed comparison and ordering text. Clear rank-list labels and result year/round/exam context. Verify invalid-input and quota/state cases with fixtures; follow issues 32, 35, 34, 36 and 67 rather than ad hoc production-data changes. |
| A4 | P0 release verification: pending frontend/backend changes | S plus deployment owner | Coordinated approved release on public www; home/tools navigation works, catalogue initially contains actual rows, selected details/guides work, no false-empty/undefined labels. Account review sees this version. |
| A5 | P1 original-value/provenance sample across templates | S to M | Check institute, branch, pair, each tool and all eight guides. Correct source/rank context, no invented cutoffs or duplicate filler, no unsupported completeness claims. Sample every empty-data state and exclude inappropriate advertising surfaces. |
| A6 | P1 mobile, loading and failure handling | M | At 360/390 px, form labels/values are readable, primary action reachable, tables intentionally scroll, focus and keyboard navigation usable. Test zero matches, slow API and failed request with isolated mocks; provide retry and honest text. `src/store/queries/index.js` currently suppresses FETCH_ERROR toasts; affected tools do not consistently render an explicit error. |
| A7 | P0 account and crawler preflight | XS to S with owner | Correct single account/domain entry; chosen verification recognized; age/payment/identity tasks complete as requested; no unresolved account or crawler diagnostics. Exact current site status recorded without publishing sensitive details. |
| A8 | P2 ad implementation proposal after readiness | S planning; M implementation later | Account owner approves placement/exclusions; representative mobile/desktop pages preserve content access, stable layout and clear ad distinction. No slots added in this review. |
| A9 | P1 ongoing traffic and policy monitoring when ads run | XS setup, ongoing owner review | Review traffic sources/country/device anomalies and Policy center. No self clicks, incentivized clicks, bot visits or repeated live-ad QA. Investigate sudden suspicious traffic; use Google reporting/support routes when needed. |

The full visual redesign backlog need not be completed before submission. Prioritize accurate answers, truthful disclosures, public working routes and safe consent/serving over cosmetic uniformity or a target Lighthouse score.

## Pre submission checklist

### Finish and verify before deployment

- [ ] Resolve A1 and the concrete explanatory contradictions in A3; confirm no new guarantees elsewhere.
- [ ] Finish the selected functional/mobile/error fixes with isolated fixtures, preserving production data.
- [ ] Review all guides and representative catalogue templates for useful distinct content and attributable sources.
- [ ] Decide the consent and ad-serving approach from real account/audience facts. Prepare implementation only in a separately authorized task.

### Must be public for review

- [ ] Deploy the approved coordinated changes; do not substitute localhost or a protected Vercel preview.
- [ ] Fetch home, tools, trust pages, all guides and samples from every detail family; check links, status, data, loading and retry states in a browser.
- [ ] Verify HTTPS and host redirects, `/robots.txt`, root `/ads.txt`, essential CSS/JS and genuine Google access diagnostics. Public sitemap/SEO settings are useful discovery aids, not approval certificates.
- [ ] Verify the chosen meta/ads.txt/head-code ownership method matches the account and the public hostname. Keep verification available during review.
- [ ] Confirm actual consent choices and enabled ad behavior in applicable regions; check mobile controls and no-content states before serving.

### Owner actions in AdSense

- [ ] Open the existing account first; confirm applicant eligibility and avoid a duplicate account. Complete prompted payment/contact/identity tasks privately.
- [ ] Add the correct site/domain if absent and use the verification method offered. In this review no application or review request was submitted.
- [ ] Inspect Sites, Policy center and Privacy & messaging; capture site status and exact diagnostic text with private IDs redacted.
- [ ] Once public corrections and account tasks are complete, verify ownership and request review using the account workflow. Auto ads preview/activation is not a content-quality requirement.
- [ ] Wait for the review result; keep the site stable and reachable. Google describes a few days as usual and sometimes two to four weeks, not a guaranteed deadline. [Site connection and review](https://support.google.com/adsense/answer/7584263)

As of this review, Google's setup guidance says identity verification may be required before serving or receiving payments starting June 2026, with a 45-day window from its request. Follow actual account prompts; do not send identity documents to a chat or repository. [Account setup](https://support.google.com/adsense/answer/7402256)

## Account status and rejection decision tree

1. **No account/site entry yet:** use the legitimate owner's account; establish eligibility, enter accurate setup details and add the domain. Then complete connection and public readiness. Do not infer an existing rejection from the site's loader.
2. **Connection not verified or site unreachable:** inspect the exact offered method, identifier, public rendered head/meta or ads.txt, host redirects, passwords and crawler diagnostics. Correct the connection issue before retrying. A spoofed crawler user-agent request cannot establish genuine Google access.
3. **Getting ready or review pending:** maintain access and wait. Follow the account's prompts if setup is incomplete. If delay exceeds Google's stated normal range, inspect connection diagnostics and offered support; do not repeatedly remove/re-add the domain.
4. **Needs attention or content/navigation rejection:** save the exact reason and affected scope. Map it to observed site evidence. For content quality, improve tools, explanations, source context and thin templates across the site; for navigation, fix actual broken paths and unusable states. Deploy and verify substantive fixes, then request another review when the UI permits. Follow any displayed retry limit/date; no arbitrary universal waiting interval is claimed. [Site not ready](https://support.google.com/adsense/answer/12176698)
5. **Duplicate account or account setup/identity problem:** content changes cannot solve it. Follow the owner's account resolution instructions and exact notice. Do not create replacement accounts to bypass enforcement. [Account not approved](https://support.google.com/adsense/answer/81904)
6. **Ready/approved:** approval does not guarantee fill or revenue. Separately inspect ad configuration, consent, ads.txt authorization and policy alerts before diagnosing missing ads. Roll out conservative placements and monitor real experience.
7. **Ad serving limited, suspended or disabled:** distinguish invalid-traffic assessment, policy action and ordinary site review using the notice. Follow that specific remediation/appeal path. Google says suspensions are not appealable; disabled-account procedures differ. Do not present a site resubmission as an account-enforcement appeal. [Suspensions](https://support.google.com/adsense/answer/2659114)

Reapply with a short change log matching the actual reason and evidence that fixes are live. Do not manufacture visits/clicks, buy links, request ad clicks from friends, invent testimonials, or append filler posts to meet an imagined quota. Traffic quality remains the publisher's responsibility. [Invalid traffic guidance](https://support.google.com/adsense/answer/2660562)

## Account evidence needed for a final submission decision

The owner can provide text or redacted screenshots of the Sites row and detail status for the domain; any rejection email/reason and date; verification method/status; ads.txt status; Policy center issue names; and Privacy & messaging's published message/site/region settings. Also useful are aggregate traffic by country/source/device and confirmation of enabled Auto ads/manual units and analytics configuration. Do not include payment details, identity documents, credentials or private identifiers.

No current approval state, rejection reason, invalid-traffic issue, traffic volume, geographical consent behavior or account-published CMP configuration is established by this audit. These unknowns do not prevent fixing the confirmed public/code gaps. Application code, production data/configuration, account settings and ad placements remain unchanged by this documentation review.
