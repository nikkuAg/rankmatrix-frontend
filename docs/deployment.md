# Deployment checks and rollback

Pull requests run deployment failure tests and build the production Docker image.
The Dockerfile runs the Node regression suite, ESLint and a production standalone
Next.js build with complete sitemap generation. The deploy job runs only after
these checks pass. The exact tested image is transferred as a one-day GitHub
artifact and pushed to ACR with the commit SHA.

On a merge/push to main or manual dispatch, the workflow verifies the existing
release, pins its traffic, and stages a candidate in Azure multiple-revision mode.
The candidate's direct revision URL must return the exact `RELEASE_SHA` through
the dynamic, uncached, noindex `/health` endpoint. Smoke tests verify tools, SSR
headings/canonicals, SEO content, the full sitemap, robots, real 404 behavior and
the public backend catalogue. Azure hostnames retain noindex protection.

Only then does traffic move to the candidate. The workflow repeats checks through
the stable Azure hostname and public HTTPS domain. The old revision is deactivated
only after success and remains available without running idle replicas.

On failure or ordinary cancellation, traffic returns to the saved revision; its
release and application responses must pass before the candidate is deactivated.
Recovery retries transient Azure control-plane failures. A separate `always()`
step retries recovery after a release-step failure/timeout. Recovery does not make
the failed deployment green. Release and recovery have separate time budgets.

The first guarded deployment accepts a legacy health 404 only after the old
application passes smoke checks; later deployments check the previous SHA too.
Multiple-revision mode with explicit 100% traffic is retained. Existing split
traffic is refused, not silently replaced.

Revision mode is changed with a minimal ARM merge PATCH to the existing app,
instead of the CLI command that resubmits environment, identity and certificate
configuration through a full PUT. This retains the app-scoped deployment role.
The workflow waits for that configuration operation to complete before traffic
updates. If it stops while the previous single-mode release still serves 100%,
recovery verifies that release without attempting an invalid traffic split.

Limits: this handles deployment failures, not subsequent uptime incidents.
Runner loss, force cancellation, Azure outages or a shared backend/database outage
can prevent recovery. Failed recovery remains visible as a failed workflow.
Previous/candidate revision names are printed in run logs for manual recovery:

```sh
az containerapp revision activate -g rankmatrix -n ca-rankmatrix-frontend --revision PREVIOUS_REVISION
az containerapp ingress traffic set -g rankmatrix -n ca-rankmatrix-frontend --revision-weight PREVIOUS_REVISION=100
SMOKE_BASE_URL=https://www.rankmatrix.in node scripts/smoke-azure.mjs
```

No new secrets or manual env changes are needed. The workflow sets `RELEASE_SHA`.
Vercel is not involved. The backend deployment guard PR can be merged first;
neither PR requires the other to be deployed simultaneously.
