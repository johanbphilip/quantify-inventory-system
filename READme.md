# Quantify Inventory System

Quantify Inventory System is a web application for digitizing inventory. It gives staff a searchable inventory, stock-level visibility, item CRUD operations, favourites, transaction history, and authenticated access.

## Repository Layout

| Path | Purpose |
| --- | --- |
| `quantify-ims/` | Next.js client application |
| `server/` | Express API and authentication middleware |
| `TODO.md` | Active feature backlog and product questions |
| `AGENTS.md` | Repository guidance for contributors and coding agents |

## Core Stack

### Client

- Next.js 15 App Router with React 19 and TypeScript
- Tailwind CSS 4 for styling
- Radix UI primitives and `lucide-react` for interface components and icons
- TanStack Table for inventory and history tables
- Zod for form validation
- Next Themes and Sonner for theme and notifications
- `fetch` in server actions for API calls; Axios is also configured in `quantify-ims/lib/axios.ts`

### Server and Data

- Node.js with native ES modules
- Express for HTTP routing and middleware
- Supabase JavaScript client for the `inventory` and `selections` tables and Supabase Auth
- HTTP-only access and refresh cookies for authenticated sessions
- `cors` and `cookie-parser` for browser requests and session cookies
- `jsonwebtoken` is installed, but the current authentication middleware validates Supabase tokens through Supabase Auth
- Mongoose is present in the dependencies and model directory, but the active CRUD controllers query Supabase

## Important Patterns

- The Next.js App Router separates public routes such as `/auth` from protected routes under `app/(protected)/`.
- Next server actions validate form input with Zod, call the API, forward request cookies where needed, and revalidate or redirect as appropriate.
- The Express server mounts authentication at `/auth`, protects `/api/*` with `authenticateRequest`, and exposes item and transaction resources below `/api`.
- Authentication uses short-lived `access_token` and longer-lived `refresh_token` HTTP-only cookies. The API middleware refreshes the session when only a valid refresh token remains.
- Shared client UI belongs in `quantify-ims/components/`; domain actions belong in `quantify-ims/lib/actions/`; shared types and schemas belong in `quantify-ims/lib/types/`.
- Keep Supabase access on the server. Do not expose service credentials or move privileged database operations into client components.

## Prerequisites

- Node.js 20 or later
- npm
- A Supabase project with the expected `inventory` and `selections` tables and Auth configured

## Clone and Develop

1. Clone the repository and enter it:

  ```bash
  git clone https://github.com/johanbphilip/quantify-inventory-system.git
  cd quantify-inventory-system
  ```

2. Install dependencies in both applications:

  ```bash
  cd quantify-ims
  npm install
  cd ../server
  npm install
  cd ..
  ```

3. Create `server/.env` with values for the server process:

  ```env
  PORT=8080
  SUPABASE_URL=https://your-project.supabase.co
  ANON_KEY=your-supabase-anon-key
  NODE_ENV=development
  ```

  Use your Supabase project's real URL and anon key. Do not commit `.env` files or credentials.

4. Start the API in one terminal:

  ```bash
  cd server
  npm run dev
  ```

5. Start the client in a second terminal:

  ```bash
  cd quantify-ims
  npm run dev
  ```

  Open `http://localhost:3000`. The client currently calls the API at `http://localhost:8080`, and the server CORS policy allows that local client origin.

## Useful Commands

Run these from the relevant project directory:

```bash
# Client
npm run dev
npm run build
npm run lint

# Server
npm run dev
```

The server package does not currently define a production `start` script or automated tests. Add focused tests when changing route behavior, authentication, or database operations.

## Git and GitHub Workflow

- Create a short-lived branch from an up-to-date `main`: `feature/<name>`, `fix/<name>`, or `docs/<name>`.
- Keep commits small and focused. Use imperative commit subjects, for example, `docs: document local setup`.
- Before opening a pull request, update your branch with `git fetch origin` followed by `git rebase origin/main`. Resolve conflicts locally and run the relevant checks again.
- Prefer rebase for keeping feature branches current; use merge commits only when the team explicitly requires them.
- Never force-push shared branches. If a rebase rewrites your own branch, use `git push --force-with-lease`.
- Open a pull request into `main` with a clear summary, testing notes, screenshots for UI changes, and any required Supabase or environment setup.
- Review the diff before pushing. Do not commit secrets, generated build output, `node_modules`, or unrelated formatting changes.
- Keep pull requests reviewable. Separate refactors from behavior changes, and update `TODO.md` when a listed item changes state.

## Backlog

See [TODO.md](TODO.md) for planned features, edge cases, and incomplete work.
