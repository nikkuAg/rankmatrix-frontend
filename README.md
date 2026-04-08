# RankMatrix Frontend

The web client for [RankMatrix](https://rankmatrix.in) — your gateway to JoSAA insights. Browse participating colleges and branches, explore seat matrix and opening/closing rank trends, and predict colleges based on your JEE Mains/Advanced rank.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) + React 19
- **UI:** [Material UI v6](https://mui.com/) with a custom theme + dark mode
- **State / Data:** [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query
- **Animations:** Framer Motion, Lottie
- **Monitoring:** Sentry
- **Tooling:** ESLint 9 (flat config), Prettier, Husky, lint-staged, commitlint
- **Package manager:** pnpm
- **Containerization:** Docker + docker-compose

## Project Structure

```
src/
├── app/            # Next.js App Router pages (colleges, ranks, predict, seat-matrix, ...)
├── components/     # Shared UI components (Navbar, Footer, RankMatrixLayout, ...)
├── constants/      # API endpoints and other constants
├── store/          # Redux store, slices, and RTK Query API definitions
├── theme/          # MUI theme + dark/light mode context
└── utils/          # Hooks and helpers
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Docker (optional, for containerized dev)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .example.env .env
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the RankMatrix backend API |
| `NEXT_PUBLIC_GOOGLE_MANAGMENT_ID` | Google Analytics / Tag Manager ID |
| `NEXT_PUBLIC_GOOGLE_AD_ID` | Google AdSense client ID |
| `SENTRY_AUTH_TOKEN` | Sentry auth token (used during build to upload source maps) |

> `NEXT_PUBLIC_*` variables are inlined into the client bundle at **build time**. When deploying, they must be passed as **build arguments**, not runtime env vars.

### 3. Run the dev server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm build` | Production build (also generates the sitemap via `postbuild`) |
| `pnpm start` | Start the production server (after `build`) |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format the codebase with Prettier |

## Docker

Run the app locally in a container:

```bash
docker compose up --build
```

The compose file mounts the source for hot reload and reads env vars from `.env`. `NEXT_PUBLIC_*` values are forwarded as Docker build arguments so they get baked into the bundle.

## Deployment

The app is deployed on [Northflank](https://northflank.com/) using the included `Dockerfile`.

Because Next.js inlines `NEXT_PUBLIC_*` variables at build time, on Northflank they must be configured under **Build settings → Build arguments**, not as runtime environment variables. Runtime env vars (e.g. `SENTRY_AUTH_TOKEN`) can stay in the regular environment section.

After updating any `NEXT_PUBLIC_*` value, trigger a fresh build (clearing the build cache if needed) for the change to take effect.

## Code Style & Commits

- Code is formatted with Prettier and linted with ESLint. Husky + lint-staged run these on staged files before each commit.
- Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format, enforced by commitlint:

  ```
  type: short description
  ```

  Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## License

Private project — all rights reserved.
