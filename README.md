# RankMatrix Frontend

The web client for [RankMatrix](https://rankmatrix.in) — a free, no-signup JoSAA / JEE counselling companion. Browse participating colleges and branches, explore seat matrix and opening/closing rank trends, and get personalized college predictions based on your JEE Main / Advanced rank. Built on official JoSAA data, no phone number or email required, no marketing spam — ever.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) + React 19
- **UI:** [Material UI v6](https://mui.com/) with a custom theme + dark mode
- **State / Data:** [Redux Toolkit](https://redux-toolkit.js.org/) + RTK Query
- **Animations:** Framer Motion, Lottie
- **Tooling:** ESLint 9 (flat config), Prettier, Husky, lint-staged, commitlint
- **Package manager:** pnpm
- **Hosting:** [Vercel](https://vercel.com/)

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

The app is deployed on [Vercel](https://vercel.com/). Pushes to `main` trigger an automatic production build; feature branches get preview deployments.

Environment variables are configured in the Vercel project settings under **Settings → Environment Variables**. `NEXT_PUBLIC_*` variables are inlined into the client bundle at build time — after updating any of them, trigger a fresh production deploy for the change to take effect.

## Code Style & Commits

- Code is formatted with Prettier and linted with ESLint. Husky + lint-staged run these on staged files before each commit.
- Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format, enforced by commitlint:

  ```
  type: short description
  ```

  Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## License

Private project — all rights reserved.
