# Azure frontend deployment

The frontend runs the Next.js standalone Node server (not a static export) in
`ca-rankmatrix-frontend`, resource group `rankmatrix`, Central India. It shares
the existing `cae-rankmatrix` environment and `crrankmatrix` registry with the
backend, but uses a separate image, app, pull identity and deployment identity.

## Configuration

The workflow uses GitHub OIDC, restricted to this repository's `main` branch.
Client, tenant and subscription IDs in YAML are public identifiers, not secrets.
The deployment identity has AcrPush on the registry and Container Apps
Contributor on the frontend app only. The runtime identity has AcrPull only.
There is no deployment password or database credential in the frontend.

`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_ENABLE_ADSENSE` are
browser configuration baked into the image. Change them in the workflow build
arguments and rebuild; changing only runtime environment variables is insufficient.
The current values are the production API, existing GA4 measurement ID and
advertising disabled. Do not put credentials in a NEXT_PUBLIC variable.

The container runs as the Node user, listens on port 3000, and keeps the Next.js
cache writable. One replica remains warm; the app can scale to three replicas
at 1 CPU / 2 GiB each. These resources incur Azure consumption charges.
ISR/image caches are local to each replica and reset on redeploy; API responses
remain the source of truth. No Vercel-specific runtime is required.

Builds run the regression suite and lint, then generate pages and the full
sitemap. Public assets are copied after sitemap generation. A failed build never
updates the running app. Deployment smoke tests wait for the latest ready revision
and check representative server-rendered content, sitemap/robots and 404s.
A failed deploy/smoke step restores the previous image; investigate that revision
and verify recovery before retrying.

## Cutover checklist

1. Verify the Azure-hosted image, browser tools, API requests, analytics delivery,
   initial HTML, canonical/structured data, cache behaviour, static assets and mobile
   interaction. The Azure default hostname is deliberately noindex.
2. Save existing Cloudflare DNS values and Vercel deployment details for rollback.
   Keep Google verification and unrelated records unchanged.
3. Bind `www.rankmatrix.in` and `rankmatrix.in` to the frontend app with valid TLS.
   Azure managed certificates require direct DNS validation; inspect Cloudflare
   proxy and CAA settings before choosing the certificate strategy.
4. Switch DNS only after staging checks pass. Verify HTTPS, apex-to-www redirects,
   canonical URLs, public-host absence of noindex, all tools, generated sitemap and
   GA4 event receipt on the actual public domain.
5. Update hosting disclosures in the privacy page at cutover. Disable Vercel's
   automatic deployments after successful verification. Retain rollback capability
   until the Azure release is stable before removing the old Vercel project.

Run checks against an Azure endpoint:

```sh
SMOKE_BASE_URL=https://YOUR_APP.azurecontainerapps.io node scripts/smoke-azure.mjs
SEO_AUDIT_BASE_URL=https://YOUR_APP.azurecontainerapps.io \
SEO_AUDIT_API_URL=https://api.rankmatrix.in python scripts/audit-rendered.py
```

Build a container locally with the same public configuration as the workflow:

```sh
docker build -t rankmatrix-frontend:test \
  --build-arg NEXT_PUBLIC_API_URL=https://api.rankmatrix.in \
  --build-arg NEXT_PUBLIC_GA_ID=G-TZT11R6PC6 \
  --build-arg NEXT_PUBLIC_ENABLE_ADSENSE=false .
docker run --rm -p 3000:3000 rankmatrix-frontend:test
```

References: [Next.js container example](https://github.com/vercel/next.js/tree/canary/examples/with-docker),
[Azure identity-based image pulls](https://learn.microsoft.com/en-us/azure/container-apps/managed-identity-image-pull),
[Azure managed certificates](https://learn.microsoft.com/en-us/azure/container-apps/custom-domains-managed-certificates).
