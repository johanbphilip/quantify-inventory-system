# Agent Guide

## Repository Purpose

Quantify Inventory System is an inventory application. The repository contains a Next.js client in `quantify-ims/` and an Express API in `server/`.

## Start Here

- Read [READme.md](READme.md) for setup, architecture patterns, and GitHub workflow.
- Read [product-requirement-document.md](product-requirement-document.md) for the approved product model and release boundaries.
- Read [TODO.md](TODO.md) before selecting feature work.
- Inspect the nearest route, server action, controller, or component before making a change. Keep the change within that ownership boundary unless the behavior crosses the client/API contract.

## Directory Ownership

- `quantify-ims/app/`: App Router pages and layouts. Route groups in parentheses do not affect the URL.
- `quantify-ims/components/my-components/`: application-specific UI.
- `quantify-ims/components/ui/`: reusable UI primitives. Preserve their existing APIs.
- `quantify-ims/lib/actions/`: server-side client actions and API calls.
- `quantify-ims/lib/types/`: Zod schemas and shared TypeScript types for organizations, teams, Catalog Items, Assets, Kits, transactions, and sessions.
- `server/routes/`: endpoint registration.
- `server/controllers/`: request handling and Supabase operations.
- `server/middleware/`: authentication and request middleware.

## Development Commands

Run client commands from `quantify-ims/` with pnpm:

```bash
pnpm dev
pnpm build
pnpm lint
```

Run server commands from `server/` with pnpm:

```bash
pnpm dev
```

The local client expects the API at `http://localhost:8080`; the API expects the client at `http://localhost:3000` for CORS. The server requires `PORT`, `SUPABASE_URL`, and `ANON_KEY` in `server/.env`.

## Coding Rules

- Use the existing Next.js App Router, server-action, Supabase, and component patterns before introducing abstractions.
- Validate user input with the existing Zod schemas or add a schema when a new form contract needs validation.
- Follow the approved Catalog Item and Asset model: Catalog Items hold shared data, unique Assets represent physical units, and bulk Catalog Items store quantities without creating Asset records.
- Enforce organization and team ownership at the API layer. Users cannot check out or check in another team's inventory unless they belong to that team. Organization Admins have organization-wide inventory visibility but need owning-team membership for inventory mutations.
- Keep team-defined categories and organization-owned locations within their documented ownership boundaries. Team Admins may maintain assigned-team categories and add locations, but cannot modify another team's categories.
- Keep database and authentication credentials server-side. Never hard-code secrets or commit environment files.
- Preserve cookie-based authentication. API requests that need the current session must forward cookies from the Next.js server context.
- Keep legacy item and transaction API paths consistent with the existing route mounts: `/api/item`, `/api/transactions`, and `/auth`. New Catalog Item, Asset, Kit, onboarding, and membership endpoints must preserve the ownership and authorization rules in the PRD.
- Keep TypeScript strictness intact and avoid broad formatting changes.
- Do not fix unrelated bugs while working on a focused task. Record discovered follow-up work in `TODO.md`.

## Validation

- For client changes, run `pnpm lint` and, when practical, `pnpm build` from `quantify-ims/`.
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
