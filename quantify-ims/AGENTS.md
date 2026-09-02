<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Client Agent Guide

## Next.js Documentation

Next.js generates the block above and may update it when `next dev` runs. For the authoritative version-specific guidance, read the documentation shipped with the installed package in `node_modules/next/dist/docs/` before changing routing, rendering, caching, metadata, or other Next.js behavior.

## Ownership and Patterns

- Keep routes and layouts in `app/`; route groups such as `(protected)` do not affect URLs.
- Keep application-specific components in `components/my-components/` and reusable ShadCN primitives in `components/ui/`.
- Keep server-side API calls and server actions in `lib/actions/`. Forward cookies from the Next.js server context when the Express API needs the current session.
- Keep shared Zod schemas and TypeScript types in `lib/types/`.
- Treat the Express API as the owner of Firebase database access and authorization. Do not import Firebase Admin code into client components.
- Use Tailwind CSS utilities and the existing ShadCN component patterns. Preserve public component APIs when extending shared UI.
- Use Heroicons for new application icons. Avoid adding `lucide-react` to new code; migrate existing icons only as part of focused UI work.
- Keep secrets, Firebase service credentials, and privileged configuration server-side. Public Firebase web configuration is not a substitute for authorization.

## Validation

Run these commands from this directory when the corresponding scripts are configured:

```bash
pnpm lint
pnpm build
pnpm test
```

Use Vitest when client tests are introduced. Do not add Firebase Emulator Suite or Playwright without an explicit stack decision.