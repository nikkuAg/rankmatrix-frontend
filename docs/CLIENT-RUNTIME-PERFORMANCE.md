# Client runtime fixes — 24 October 2026

- Each endpoint module calls `baseApi.injectEndpoints`, which returns the same API object. Register that object's reducer and middleware once, rather than repeating its middleware seven times for every Redux action. All endpoint registrations remain imported.
- The integration test uses real RTK Query to verify shared-cache reuse, mutation invalidation/refetch, and one middleware visit per probe action.
- AdSense network/script loading is now disabled unless `NEXT_PUBLIC_ENABLE_ADSENSE=true` at build time. Keep it unset/false for the SEO release. The existing account verification meta tag and ads.txt remain available. Google documents these verification alternatives at https://support.google.com/adsense/answer/7584263 . No AdSense account state was changed.
- Enabling ads is a later rollout: check account approval, chosen verification method, placement, privacy/consent configuration and performance before enabling the flag. Existing optional GA configuration is unchanged; this change is not a consent implementation.
- No predictor selection algorithm, backend query or database schema changes are included. Backend #18's query batching is still required. Local lab measurements are not production p75/INP certification.
