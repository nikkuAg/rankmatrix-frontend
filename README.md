# RankMatrix Frontend

The web client for [RankMatrix](https://rankmatrix.in) — a free, no-signup JoSAA / JEE counselling companion. Browse participating colleges and branches, explore seat matrix and opening/closing rank trends, and get personalized college predictions based on your JEE Main / Advanced rank. Built on official JoSAA data, no phone number or email required, no marketing spam — ever.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) + React 19
- **UI:** Native semantic components, CSS Modules and shared dark design tokens
- **State / Data:** [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query
- **Interaction:** CSS motion with reduced-motion support; lazy-loaded dnd-kit for choice ordering
- **Tooling:** ESLint 9 (flat config), Prettier, Husky, lint-staged, commitlint
- **Package manager:** pnpm
- **Hosting:** Azure Container Apps

## Project Structure

```
src/
├── app/            # Next.js App Router pages (colleges, ranks, predict, seat-matrix, ...)
├── components/     # Shared UI components (Navbar, Footer, RankMatrixLayout, ...)
├── constants/      # API endpoints and other constants
├── store/          # Redux store, slices, and RTK Query API definitions
├── styles/         # Design tokens, typography and shared control styles
└── utils/          # Hooks and helpers
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .example.env .env
```

| Variable              | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the RankMatrix backend API                  |
| `NEXT_PUBLIC_GA_ID`   | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_API_PROXY` | Optional `true` for isolated staging: proxy only the public tool endpoints through Next.js |

### 3. Run the dev server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command       | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `pnpm dev`    | Start the dev server with hot reload                          |
| `pnpm build`  | Production build (also generates the sitemap via `postbuild`) |
| `pnpm start`  | Start the production server (after `build`)                   |
| `pnpm lint`   | Run ESLint                                                    |
| `pnpm format` | Format the codebase with Prettier                             |

## Deployment

The app is deployed on Azure Container Apps. The Azure workflow on `main` promotes production after its checks. Do not run that workflow for a staging-only release.

For isolated staging, build the Docker image with `NEXT_PUBLIC_API_URL=https://api.rankmatrix.in` and `NEXT_PUBLIC_API_PROXY=true`, then copy the production revision with the new image and `RELEASE_SHA`. Use the candidate revision's own hostname, retaining the existing explicit production traffic allocation. The Azure hostname receives `X-Robots-Tag: noindex`; public canonical URLs remain unchanged. Do not add a traffic label: the production deployment guard expects one explicit production traffic rule.

`NEXT_PUBLIC_*` variables are inlined at build time. The proxy defaults to off and allows only the fixed public tool endpoints in `next.config.mjs`; it does not proxy administrative or arbitrary paths. Server-rendered SEO content still reads the public API directly. No backend or database changes are required.

## Design and rendering

Shared colors, spacing, radii and control styles live in `src/styles/tokens.css`. Component-specific layouts use colocated CSS Modules. The existing RankMatrix logo is retained. Manrope and Fraunces are served through `next/font`; decorative movement respects reduced-motion preferences.

Page metadata, structured data, guides, catalogue rows and detail-page history remain server-rendered. Client components own interactive filters and tools. The Redux store is created per provider, and links retain real destinations with controlled prefetching. Existing analytics transport, early queue and event privacy rules remain in place.

`/predict` includes a local choice workspace. Each saved choice groups all returned allocation records for one institute and programme. Drag handles support pointer, touch and keyboard ordering; filtering pauses reordering until the full list is visible. Choice order is the user's preference, never an admission probability. Predictor responses do not supply a dataset year, so the UI and exports explicitly preserve that limitation.

Before releasing, run `node --test scripts/*.test.mjs scripts/*.test.cjs`, `pnpm lint`, `pnpm build` and the deployment Python unit tests. Use `scripts/audit-rendered.py` and `scripts/smoke-azure.mjs` against the candidate, then verify interactive tools, mobile layouts and analytics. Keep production traffic unchanged until promotion is explicitly authorized.

## Code Style & Commits

- Code is formatted with Prettier and linted with ESLint. Husky + lint-staged run these on staged files before each commit.
- Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format, enforced by commitlint:

  ```
  type: short description
  ```

  Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## License

Private project — all rights reserved.
