# Product analytics

GA4 is enabled by the existing `NEXT_PUBLIC_GA_ID`. No new environment variable is required.
The initial HTML initializes Google's standard command queue. The external Google tag still
loads with `afterInteractive`: no worker, idle timeout, alternate collection endpoint, or
sampling is introduced. Commands are queued in order; initialization is idempotent and
does not overwrite an existing data layer. This prevents the old helper from discarding an
interaction before the Analytics component initialized. It cannot override consent,
ad blockers, unavailable networks, or guarantee delivery if a visitor exits before the tag loads.

## Events

| Event                                                                | Trigger                                                       | Additional allowed metadata                                                   |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `navigation_clicked`                                                 | Internal link activation, including keyboard and middle click | `source`: header/footer/content; `destination_type`: fixed route family       |
| `tool_opened`                                                        | Existing home feature card activation                         | Existing static label; excluded from delegated navigation tracking            |
| `sort_applied`                                                       | User changes table ordering, including clearing a sort        | Fixed `field`, `direction`: asc/desc/cleared                                  |
| `college_type_applied`                                               | Institute type chips change                                   | `selected_count`; selected values are excluded                                |
| `filters_applied`, `filters_removed`, `filter_range_applied`         | Table filters applied/cleared                                 | Fixed `field`, optionally `selected_count`; no selected values or rank bounds |
| `search`                                                             | Existing debounced table search changes                       | `state`: set/cleared; no search text                                          |
| `page_change`, `year_changed`, `round_changed`, seat tab events      | Existing table actions                                        | Existing finite numeric value                                                 |
| `expand_nirf`                                                        | NIRF history toggled                                          | `state`: expanded/collapsed                                                   |
| `form_viewed`                                                        | Predictor modal becomes visible, including first visit        | Static label/count; one per open                                              |
| `form_submitted`                                                     | Valid predictor form submitted                                | Static label/count                                                            |
| `prediction_completed`                                               | Prediction request succeeds                                   | `outcome`: results/empty; `result_count`                                      |
| `prediction_failed`                                                  | Prediction request rejects                                    | `outcome`: error; no server message or request body                           |
| `form_closed`, add/update form open, `csv_download`, `theme_changed` | Existing actions                                              | Existing static labels/counts                                                 |

Automatic GA4 page views and enhanced measurement remain managed by Google. No custom
page-view, scroll, outbound-click, or generic form-submit listener is added. The document
navigation listener mounts once in the root layout and removes its listeners on unmount.
It does not read input contents, capture mouse movement, intercept navigation, or persist
an interaction history. Custom parameters use an explicit enum/count allowlist. Page URLs
are not copied into custom event metadata; Google still collects its normal page information.

Sort events moved out of React effects so mounting a table (notably the default cutoff sort)
is no longer counted as a user action. Existing action names and static labels are retained.
GA4 event-scoped custom dimensions can expose the new enum parameters in standard reports;
they are already available in realtime event details. Do not register search/rank/category
values as dimensions.

## Validation

- `node --test scripts/*.test.*`: transport ordering, bootstrap execution/idempotence,
  disabled/malformed configuration, privacy allowlist and navigation exclusions, plus
  existing API/cache, quota, SSR, metadata and sitemap checks.
- Production build and generated-script execution test: bootstrap contains no missing
  build-time references and queues `js` then `config`.
- Real browser: internal navigation, NIRF expansion, predictor form submission and ten
  returned results; GA4 realtime received `navigation_clicked`, `form_submitted`,
  `prediction_completed` and `form_closed`. These are synthetic localhost QA events.
- Initial Analytics-only mobile Lighthouse: 335 / 324 / 347ms TBT; no console errors.
  This change does not satisfy issue #86's performance gate. Do not deploy it as a
  claimed sub-200ms fix. Final combined release needs repeated mobile measurements.

The failure path was exercised with a one-request 503 simulation in the local read-only
API relay: the form stayed open, retry returned ten results, and no production API
failure was induced. The pre-network queue is also covered by deterministic tests.
