# Quantify Inventory System

Quantify Inventory System is a web application for digitizing and managing inventory for organizations with recurring setup and teardown operations. Its planned product model gives organizations multiple teams, team-owned catalog items and kits, individually tracked assets, person-based checkout, and auditable operational history.

## Repository Layout

| Path | Purpose |
| --- | --- |
| `quantify-ims/` | Next.js client application |
| `server/` | Express API and authentication middleware |
| `product-requirement-document.md` | Product requirements, data model, and versioned roadmap |
| `phases/phases.md` | Development phase progress index and implementation-plan links |
| `TODO.md` | Active feature backlog and product questions |
| `AGENTS.md` | Repository guidance for contributors and coding agents |

## Core Stack

### Client

- Next.js 16.3+ App Router with React 19 and TypeScript
- Tailwind CSS 4 for styling
- ShadCN UI with Radix UI primitives and Heroicons for interface icons
- TanStack Table for inventory and history tables
- Zod for form validation
- Next Themes and Sonner for theme and notifications
- `fetch` in server actions for API calls; Axios is also configured in `quantify-ims/lib/axios.ts`
- Vitest for unit and integration tests

### Server and Data

- Node.js with native ES modules
- Express for HTTP routing and middleware
- Firebase as the target BaaS provider, with Cloud Firestore as the planned database
- HTTP-only access and refresh cookies for authenticated sessions
- `cors` and `cookie-parser` for browser requests and session cookies
- The current server dependencies and controllers still contain Supabase integration; the application is being restarted around Firebase rather than migrated in place
- Firebase Admin database access and token verification belong in the Express server

## Important Patterns

- The Next.js App Router separates public routes such as `/auth` from protected routes under `app/(protected)/`.
- Next server actions validate form input with Zod, call the API, forward request cookies where needed, and revalidate or redirect as appropriate.
- The Express server mounts authentication at `/auth`, protects `/api/*` with `authenticateRequest`, and exposes item and transaction resources below `/api`.
- Authentication uses short-lived `access_token` and longer-lived `refresh_token` HTTP-only cookies. The API middleware refreshes the session when only a valid refresh token remains.
- Shared client UI belongs in `quantify-ims/components/`; domain actions belong in `quantify-ims/lib/actions/`; shared types and schemas belong in `quantify-ims/lib/types/`.
- Keep Firebase Admin access on the server. Do not expose service credentials or move privileged database operations into client components.

## Product Direction

The current implementation provides an item-centric inventory baseline. The approved product direction in [product-requirement-document.md](product-requirement-document.md) expands this into:

- Organization onboarding for teams, team categories, and organization locations
- Team-owned Catalog Items and Kits
- Catalog Items with either bulk quantities or uniquely tracked Asset records
- Derived asset counts, optional asset barcodes, and person-based checkout
- Team-scoped operational permissions with organization-wide administrative visibility
- Team-owned Flow templates, followed later by organization master event Flows

The PRD roadmap places onboarding in Version `0.2`, the Inventory Directory in Version `0.3`, and the Catalog Item and Asset model in the Inventory Directory and Accountability releases.

## Prerequisites

- Node.js 20 or later
- pnpm 10.34.3 or later
- A Firebase project and the server-side Firebase credentials required by the planned implementation

## Clone and Develop

1. Clone the repository and enter it:

  ```bash
  git clone https://github.com/johanbphilip/quantify-inventory-system.git
  cd quantify-inventory-system
  ```

2. Install dependencies in both applications with pnpm. The client and server remain separate packages:

  ```bash
  pnpm --dir quantify-ims install
  pnpm --dir server install
  cd ..
  ```

3. Create `server/.env` with values for the server process:

  ```env
  PORT=8080
  FIREBASE_PROJECT_ID=your-firebase-project-id
  FIREBASE_CLIENT_EMAIL=your-service-account-client-email
  FIREBASE_PRIVATE_KEY="your-service-account-private-key"
  NODE_ENV=development
  ```

  Use placeholders locally until Firebase setup is implemented. Do not commit `.env` files or credentials.

4. Start the API in one terminal:

  ```bash
  cd server
  pnpm dev
  ```

5. Start the client in a second terminal:

  ```bash
  cd quantify-ims
  pnpm dev
  ```

  Open `http://localhost:3000`. The client currently calls the API at `http://localhost:8080`, and the server CORS policy allows that local client origin.

## Useful Commands

Run these from the relevant project directory with pnpm:

```bash
# Client
pnpm dev
pnpm build
pnpm lint

# Server
pnpm dev
```

The server package does not currently define a production `start` script or automated tests. Add focused tests when changing route behavior, authentication, or database operations.

## Git and GitHub Workflow

- Use `develop` as the integration branch and `main` as the production branch.
- Create a short-lived `feature/<name>`, `fix/<name>`, or `docs/<name>` branch from an up-to-date `develop` branch.
- Keep commits small and focused. Use imperative commit subjects, for example, `docs: document local setup`.
- Before opening a pull request into `develop`, update your branch with `git fetch origin` followed by `git rebase origin/develop`. Resolve conflicts locally and run the relevant checks again.
- Prefer rebase for keeping feature branches current; use merge commits only when the team explicitly requires them.
- Never force-push shared branches. If a rebase rewrites your own branch, use `git push --force-with-lease`.
- Open feature pull requests into `develop` with a clear summary, testing notes, screenshots for UI changes, and any required Firebase or environment setup.
- Treat commits merged into `main` as production changes. Promote changes from `develop` to `main` only through a reviewed release pull request after successful end-to-end testing against the proposed release.
- Do not commit directly to `main`.
- Review the diff before pushing. Do not commit secrets, generated build output, `node_modules`, or unrelated formatting changes.
- Keep pull requests reviewable. Separate refactors from behavior changes, and update `TODO.md` when a listed item changes state.

## Backlog

See [TODO.md](TODO.md) for planned features, edge cases, and incomplete work.
