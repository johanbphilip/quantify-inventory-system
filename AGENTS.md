# Agent Guide

## Repository Purpose

Quantify Inventory System is a inventory application. The repository contains a Next.js client in `quantify-ims/` and an Express API in `server/`.

## Start Here

- Read [READme.md](READme.md) for setup, architecture patterns, and GitHub workflow.
- Read [TODO.md](TODO.md) before selecting feature work.
- Inspect the nearest route, server action, controller, or component before making a change. Keep the change within that ownership boundary unless the behavior crosses the client/API contract.

## Directory Ownership

- `quantify-ims/app/`: App Router pages and layouts. Route groups in parentheses do not affect the URL.
- `quantify-ims/components/my-components/`: application-specific UI.
- `quantify-ims/components/ui/`: reusable UI primitives. Preserve their existing APIs.
- `quantify-ims/lib/actions/`: server-side client actions and API calls.
- `quantify-ims/lib/types/`: Zod schemas and shared TypeScript types.
- `server/routes/`: endpoint registration.
- `server/controllers/`: request handling and Supabase operations.
- `server/middleware/`: authentication and request middleware.

## Development Commands

Run client commands from `quantify-ims/`:

```bash
npm run dev
npm run build
npm run lint
```

Run server commands from `server/`:

```bash
npm run dev
```

The local client expects the API at `http://localhost:8080`; the API expects the client at `http://localhost:3000` for CORS. The server requires `PORT`, `SUPABASE_URL`, and `ANON_KEY` in `server/.env`.

## Coding Rules

- Use the existing Next.js App Router, server-action, Supabase, and component patterns before introducing abstractions.
- Validate user input with the existing Zod schemas or add a schema when a new form contract needs validation.
- Keep database and authentication credentials server-side. Never hard-code secrets or commit environment files.
- Preserve cookie-based authentication. API requests that need the current session must forward cookies from the Next.js server context.
- Keep item and transaction API paths consistent with the existing route mounts: `/api/item`, `/api/transactions`, and `/auth`.
- Keep TypeScript strictness intact and avoid broad formatting changes.
- Do not fix unrelated bugs while working on a focused task. Record discovered follow-up work in `TODO.md`.

## Validation

- For client changes, run `npm run lint` and, when practical, `npm run build` from `quantify-ims/`.
- For server changes, run the available ESLint command or inspect the changed module with the local runtime. The server currently has no automated test script.
- For API or authentication changes, verify the affected request manually with both valid and unauthenticated sessions when possible.
- Review `git diff` and `git status` before handing off work.

## GitHub Workflow

- Work on `feature/*`, `fix/*`, or `docs/*` branches based on an updated `main` branch.
- Use focused imperative commits and keep unrelated changes out of the branch.
- Rebase feature branches onto `origin/main` before opening or updating a pull request:

  ```bash
  git fetch origin
  git rebase origin/main
  ```

- Do not rewrite shared branches. For a rebased personal branch, push with `--force-with-lease`, never plain `--force`.
- Pull requests should include a summary, tests run, UI screenshots where relevant, and configuration or migration notes.