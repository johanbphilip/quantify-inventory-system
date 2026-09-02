# Server Agent Guide

## Purpose and Ownership

This directory owns the Express API, authentication middleware, route registration, controllers, and Firebase server integration for Quantify Inventory System.

- Register HTTP endpoints in `routes/`.
- Keep request handling and response shaping in `controllers/`.
- Keep authentication and request identity checks in `middleware/`.
- Keep Firebase Admin initialization and shared database utilities in `utils/`.
- Keep transaction and audit logging close to the server-side operations that create those records.
- Keep client presentation, Next.js routes, and browser-only code in `quantify-ims/`.

## Target Stack

- Node.js with native ES modules
- Express for HTTP routing and middleware
- Firebase Admin SDK for Cloud Firestore, authentication verification, and other privileged BaaS operations
- Vitest for unit and integration tests
- `cors`, `cookie-parser`, and HTTP-only cookies for browser/API session integration
- Zod for validating request bodies, query parameters, and route parameters at the API boundary

The current code still contains Supabase integration. New server work should follow the Firebase target architecture; do not expand the Supabase dependency surface.

## Firebase and Security

- Initialize Firebase Admin once through a server-only module. Do not initialize Firebase in controllers or per request.
- Read Firebase credentials from environment variables. Never commit service-account JSON, private keys, tokens, or `.env` files.
- Verify Firebase ID tokens on the server before reading or mutating protected data.
- Treat decoded token claims as identity input, then load organization membership, team membership, roles, and permissions from trusted server-side data before authorizing an operation.
- Enforce organization and team ownership in the API. Client-side visibility controls are not authorization.
- Organization Admins have organization-wide inventory visibility, but inventory mutations require membership in the owning team.
- Keep cookies HTTP-only and configure CORS only for known client origins.
- Return consistent status codes and safe error messages. Do not expose Firebase errors, credentials, queries, or internal stack traces to clients.

## API Conventions

- Preserve the existing route mounts `/api/item`, `/api/transactions`, and `/auth` while the Firebase restart is implemented.
- Use focused controllers and keep database access behind server-side Firebase utilities.
- Validate all external input before it reaches a controller's database operation.
- Scope every inventory and transaction query to the authenticated user's organization and permitted teams.
- Record auditable inventory changes, including the acting user, organization, team context, and relevant entity identifiers.
- Keep response contracts stable and update the client server actions when an API contract must change.

## Environment

Use `server/.env` for local values. Required names should be documented without committing values:

```env
PORT=8080
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-client-email
FIREBASE_PRIVATE_KEY="your-service-account-private-key"
NODE_ENV=development
```

The client origin is `http://localhost:3000` and the API normally listens on `http://localhost:8080`.

## Validation

Run these commands from this directory when the corresponding scripts are configured:

```bash
pnpm lint
pnpm test
pnpm dev
```

Use Vitest for focused tests around authentication, authorization, route behavior, and Firebase data access. The server currently has no working automated test script, so add or configure the test script before relying on `pnpm test`.
