# Organization Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the Firebase and Express foundation for organizations, teams, users, memberships, invitations, join requests, and API-level organization boundaries, beginning with user-owned Firebase project setup.

**Architecture:** The user first creates and configures the Firebase project, enables Firebase Authentication, creates the Cloud Firestore database, and provides local server credentials. Firebase Authentication then owns the authenticated account and provides the stable user UID. Cloud Firestore stores the user profile, organization, team, membership, invitation, and join-request records. Express is the only owner of privileged Firestore access and verifies Firebase ID tokens before applying organization and team authorization. The Next.js client consumes typed API contracts and does not access Firebase Admin services.

**Tech Stack:** Node.js ES modules, Express, Firebase Admin SDK, Cloud Firestore, Firebase Authentication, Next.js 16.3+ App Router, TypeScript, Zod, Tailwind CSS 4, ShadCN UI, Heroicons, and Vitest.

**Spec:** `product-requirement-document.md`, sections 4, 5, 6.1, and Version 0.1 “Organization Foundation” in section 8.

## Global Constraints

- Use `develop` as the integration branch and `main` as the production branch.
- Every task title uses the format `[ORG 1.x] - TITLE`.
- Firebase Admin SDK and service-account credentials remain server-side.
- Firebase Authentication UID is the canonical user identity; do not create a second authentication identity in Firestore.
- Every organization-scoped record includes an `organizationId`; team-scoped records also include a `teamId`.
- API authorization is mandatory; client-side visibility controls are not authorization.
- Organization Admins can view organization-wide data, but inventory mutation authorization remains team-scoped for later inventory releases.
- A valid organization join code identifies an organization but does not grant membership.
- First Organization Admin provisioning remains manual or support-controlled.
- Phase 1 excludes categories, locations, Catalog Items, Assets, Kits, Flows, inventory transactions, onboarding UI, and organization-wide inventory mutation.
- Do not add Firebase Emulator Suite or Playwright. Use Vitest with test doubles or isolated test fixtures for automated tests.
- Preserve the existing `/auth` and `/api` route mounts while replacing Supabase-backed authentication and persistence.
- Firebase project setup is a manual prerequisite owned by the user; agents must not create, rotate, or request secret credentials.

## Phase Scope and Decisions

### Included

- Organization entity with a static GUID join code.
- Team entity owned by an organization.
- Firebase-authenticated User profile entity.
- Organization and team Membership entity supporting many teams per user.
- Organization Admin, Team Admin, Technician, and User roles.
- Per-user permissions in addition to role defaults.
- Membership states for invited, pending, active, rejected, and revoked access.
- Invitation and join-request records sufficient to support the Version 0.1 approval flow.
- Manual first-admin provisioning boundary.
- Authenticated Express requests with organization and team authorization.
- Client-side TypeScript types, Zod schemas, and enums for these contracts.

### Deferred

- Organization onboarding workspace and setup progress, which belong to Version 0.2.
- Team categories, custom fields, required fields, and locations, which belong to Version 0.2.
- Catalog Items, Assets, inventory status, check-in/check-out, and audit history for inventory mutations, which belong to later releases.
- Browser-side Firebase SDK integration. The client should use the Express API unless a later requirement proves browser Firebase behavior necessary.

### User-Owned Prerequisite

Before implementation begins, the user must create the Firebase project and provide the configured local environment values without committing them:

- Firebase project created and project ID recorded.
- Cloud Firestore database created in the selected region and mode.
- Firebase Authentication enabled with the providers required for the initial release.
- A server credential or deployment identity available for Firebase Admin SDK access.
- `server/.env` populated with the required values from `server/AGENTS.md`.

The first implementation task verifies configuration presence and connectivity through safe diagnostics; it does not create Firebase resources or expose credentials.

### Recommended data model

Use explicit top-level collections so authorization queries are straightforward and cross-organization data can be filtered by indexed fields:

```text
users/{userId}
organizations/{organizationId}
teams/{teamId}
memberships/{membershipId}
invitations/{invitationId}
joinRequests/{joinRequestId}
```

Required relationships and invariants:

- `teams.organizationId` references `organizations/{organizationId}`.
- `memberships.userId`, `memberships.organizationId`, and `memberships.teamId` identify one user's membership in one team within one organization.
- An organization-level admin capability is represented explicitly and must not depend on a team-less authorization shortcut.
- A user may have memberships in multiple teams within one organization.
- Membership records must be unique for the `(userId, organizationId, teamId)` tuple.
- Invitation and join-request records carry `organizationId`, optional `teamId`, requester/issuer identity, status, and timestamps.
- All mutable records carry `createdAt`, `updatedAt`, `createdBy`, and `updatedBy`; approval/rejection/revocation events carry actor and event timestamps.

## File Map

- `server/package.json`: add Firebase Admin, Zod, and Vitest scripts/dependencies.
- `server/utils/firebaseAdmin.js`: initialize Firebase Admin once and expose Firestore/Auth services.
- `server/utils/firestore.js`: shared Firestore conversion, timestamp, and query helpers.
- `server/models/organization.models.js`: organization and join-code data contracts.
- `server/models/team.models.js`: team data contracts.
- `server/models/user.models.js`: user profile and membership contracts.
- `server/models/membership.models.js`: membership, invitation, and join-request contracts.
- `server/middleware/authMiddleware.js`: verify Firebase ID tokens and attach authenticated identity.
- `server/middleware/organizationAuthorization.js`: enforce organization/team membership and role/permission checks.
- `server/controllers/organization/organization.controllers.js`: organization and first-admin operations.
- `server/controllers/organization/team.controllers.js`: team creation and team management operations.
- `server/controllers/organization/membership.controllers.js`: invitations, join requests, approvals, rejection, and revocation.
- `server/routes/organization.router.js`: organization, team, invitation, and membership routes.
- `server/routes/auth.router.js`: preserve existing auth mounts while routing identity behavior through Firebase.
- `server/tests/`: Vitest tests for identity, data invariants, API authorization, and membership transitions.
- `quantify-ims/lib/types/organization.ts`: client organization contracts and schemas.
- `quantify-ims/lib/types/team.ts`: client team contracts and schemas.
- `quantify-ims/lib/types/user.ts`: client user, role, and permission contracts.
- `quantify-ims/lib/types/membership.ts`: client membership, invitation, and join-request contracts.
- `quantify-ims/lib/actions/organization.ts`: typed server actions for organization/team/membership API calls when client flows are introduced.

## Dependency and Execution Graph

```text
[ORG 1.1] Firebase project and local credentials
        |
        +--> [ORG 1.2] Domain contracts and Firestore invariants
                   |
                   +--> [ORG 1.3] Firebase Admin and Firestore server foundation
                              |
                              +--> [ORG 1.4] Firebase authentication middleware
                                             |
                                             +--> [ORG 1.5] Organization and membership API
                                                            |
                                                            +--> [ORG 1.6] Client contracts and API action boundary
                                                                           |
                                                                           +--> [ORG 1.7] Vitest integration and release verification
```

## Issue Tasks

### [ORG 1.1] - Configure the Firebase project and local credentials

**Issue type:** Technical task / setup prerequisite

**Summary:** Create the Firebase project resources required by the Phase 1 server implementation and make the resulting configuration available locally without committing secrets.

**Background / Context:** Firebase has not been configured yet. The Admin SDK cannot be initialized, Firestore persistence cannot be verified, and Firebase ID tokens cannot be checked until a project, Authentication configuration, Firestore database, and server credential are available. This task is intentionally user-owned because project creation and secret handling require access outside the repository.

**Scope:**

- **In scope:** Firebase project creation or selection, project ID capture, Cloud Firestore database creation, required Firebase Authentication provider enablement, server credential creation or deployment identity selection, and local `server/.env` configuration.
- **Nice to Have:** Record the Firebase project region and intended deployment identity in private team documentation.
- **Deferred:** Production deployment secret management and environment provisioning.
- **Excluded / Out of Scope:** Committing credentials, adding browser Firebase configuration, creating Firestore collections manually, or implementing application code.

**Acceptance Criteria:**

1. A Firebase project is available and its project ID is recorded in the local setup notes without including credentials.
2. Cloud Firestore is enabled in the selected project and region.
3. Firebase Authentication is enabled with the provider required for the initial authentication flow.
4. A server-side identity can authenticate Firebase Admin SDK requests without exposing its private key to the browser or repository.
5. `server/.env` contains the required local Firebase configuration values and remains ignored by git.
6. A safe configuration check can distinguish missing configuration from configured values without printing secrets.

**Technical Notes:** The user must perform console, billing, IAM, and secret-management actions. Agents may guide the setup and validate local configuration, but must not request secret values in chat or commit service-account files.

**Dependencies:** None.

**Open Questions:**

- **Tech:** Confirm whether local development will use a service-account environment credential or `GOOGLE_APPLICATION_CREDENTIALS` supplied outside the repository. Starting recommendation: use environment variables for local consistency with the current project guidance and a managed workload identity in deployment.

### [ORG 1.2] - Define organization and membership domain contracts

**Issue type:** Technical task

**Summary:** Define the server-side data contracts and invariants for organizations, teams, Firebase-authenticated user profiles, memberships, invitations, and join requests.

**Background / Context:** Version 0.1 requires a secure organization boundary before inventory work begins. The PRD permits users to belong to multiple teams, requires explicit organization and Team Admin approval, and defines four role levels plus per-user permissions. Firestore data must preserve these relationships without allowing a user or team to cross organization boundaries.

**Scope:**

- **In scope:** JavaScript model modules under `server/models/`, Zod schemas for external data, role/permission/status constants, ID and timestamp conventions, and documented uniqueness/relationship invariants.
- **Nice to have:** A small pure helper for deriving baseline permissions from a role.
- **Deferred:** Categories, locations, inventory entities, and onboarding configuration.
- **Excluded / Out of scope:** Firestore initialization and HTTP routes; those are subsequent tasks.

**Acceptance Criteria:**

1. Organization, team, user profile, membership, invitation, and join-request contracts define required fields, optional fields, statuses, roles, and timestamps.
2. User identity uses the Firebase Authentication UID as `userId`.
3. Membership contracts support one user in multiple teams and include `organizationId`, `teamId`, `userId`, `role`, `permissions`, and status.
4. The contracts represent organization approval separately from team-specific approval so a team approval cannot activate organization access by itself.
5. The contracts define a static organization join code and make clear that code validation does not create membership.
6. Invalid role, permission, status, missing organization scope, and missing relationship identifiers are rejected by Zod schemas.
7. Unit tests cover valid records, invalid records, duplicate-membership detection input, and role-to-permission derivation if that helper is created.

**Technical Notes:** Use camelCase in JavaScript/API contracts and map fields consistently to Firestore. Use ISO strings at the API boundary and Firestore `Timestamp` values only inside the server persistence layer. Do not model a team-less membership as a workaround for organization administration without documenting the chosen organization-admin representation.

**Dependencies:** `[ORG 1.1]`.

**Open Questions:**

- **Tech:** Confirm whether organization-admin capability is stored on an organization membership record, an organization-admin subcollection, or a dedicated organization role record. Starting recommendation: use an organization-scoped membership record with `teamId: null` only if every query explicitly distinguishes organization membership from team membership; otherwise use a separate organization membership record.

### [ORG 1.3] - Configure Firebase Admin and Firestore server foundation

**Issue type:** Technical task

**Summary:** Replace the Supabase database connection surface with a server-only Firebase Admin initialization module and Firestore access boundary.

**Background / Context:** The repository currently initializes Supabase in `server/utils/dbConn.js`, while the target stack requires Firebase and Cloud Firestore. Every later organization operation depends on one reliable, testable Admin SDK initialization path.

**Scope:**

- **In scope:** `firebase-admin` dependency, environment validation, Admin app initialization, Firestore/Auth exports, server-only utility boundaries, and replacement of direct Supabase connection imports in the new organization modules.
- **Nice to have:** A safe startup diagnostic that reports missing configuration names without logging secrets.
- **Deferred:** Removal of all legacy Supabase CRUD/auth code; do that with the broader Firebase restart work after this foundation is proven.
- **Excluded / Out of scope:** Client Firebase SDK configuration and browser persistence.

**Acceptance Criteria:**

1. The server can initialize Firebase Admin exactly once from environment variables.
2. Missing `PORT` or Firebase configuration fails with a clear configuration error without printing a private key.
3. Firestore and Firebase Auth services are available to server-side consumers through one utility boundary.
4. No client-importable module contains Firebase Admin initialization or service-account credentials.
5. The configuration module supports the multiline `FIREBASE_PRIVATE_KEY` environment value and normalizes escaped newlines.
6. Unit tests cover successful initialization through injected configuration and failure when required values are absent, without requiring Firebase Emulator Suite.
7. The server package documents and scripts the Vitest command without claiming that a live Firebase project is available in automated tests.

**Technical Notes:** Prefer `applicationDefault()` when deployment credentials are supplied through the runtime, with explicit `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` support for local/server environments. Keep the initialization API injectable so tests do not create a live Admin app.

**Dependencies:** `[ORG 1.1]` for the configured Firebase project and `[ORG 1.2]` for field and timestamp conventions.

### [ORG 1.4] - Verify Firebase identities in Express middleware

**Issue type:** Technical task

**Summary:** Replace Supabase token validation in the protected Express path with Firebase ID-token verification and authenticated identity attachment.

**Background / Context:** The existing `server/middleware/authMiddleware.js` reads Supabase access and refresh cookies. Phase 1 needs the API to recognize Firebase-authenticated users before organization and membership authorization can run.

**Scope:**

- **In scope:** Firebase token verification, authenticated request identity, HTTP-only cookie handling compatible with the chosen Firebase session flow, unauthenticated/error responses, and migration of the protected middleware entry point.
- **Nice to have:** A small identity adapter that maps Firebase decoded-token fields to the API's stable `req.user` shape.
- **Deferred:** Signup UI, password reset, OAuth provider UX, and refresh-token product decisions not required to verify an ID token.
- **Excluded / Out of scope:** Organization authorization; that belongs in `[ORG 1.4]`.

**Acceptance Criteria:**

1. A protected request with a valid Firebase ID token reaches the next middleware/controller with a stable authenticated user identity containing the Firebase UID.
2. A missing, malformed, expired, or revoked token receives HTTP 401 without an internal stack trace or token contents in the response.
3. Protected `/api` routes no longer call Supabase Auth for token verification.
4. Cookie attributes remain HTTP-only and use secure production behavior; CORS continues to allow only the configured client origin.
5. Middleware tests cover valid identity, absent credentials, invalid credentials, and Firebase verification failure using injected stubs.
6. Existing public auth route registration remains available while the Firebase auth implementation is introduced.

**Technical Notes:** Choose one explicit server session approach and document it: short-lived Firebase ID token in an HTTP-only cookie with a server refresh/session strategy, or a Firebase session cookie issued after credential exchange. Do not place an Admin SDK service credential in a browser token or expose decoded claims as authorization decisions.

**Dependencies:** `[ORG 1.3]`.

### [ORG 1.5] - Implement organization and membership authorization APIs

**Issue type:** Technical task

**Summary:** Add Express endpoints and authorization policies for organization provisioning, team creation, invitations, join requests, approvals, rejection, revocation, and permitted membership reads.

**Background / Context:** Version 0.1 exit criteria require users to belong to the correct organization and teams, see only authorized data, and receive the correct administrative capabilities. The PRD requires manual first-admin provisioning, a static join code, separate organization and team approval, and auditability of membership events.

**Scope:**

- **In scope:** `server/routes/organization.router.js`, organization/team/membership controllers, Firestore repositories or utilities, authorization middleware, request validation, and route registration under the existing Express app.
- **Nice to have:** Pagination for pending invitations and join requests if it does not change the core contract.
- **Deferred:** Onboarding workspace, category/location configuration, and inventory endpoints.
- **Excluded / Out of scope:** Client UI; only the API contract is established here.

**Acceptance Criteria:**

1. A manually provisioned first Organization Admin can create an organization or complete the supported provisioning operation without allowing public self-promotion.
2. An authorized Organization Admin can create teams only within their organization.
3. An Organization Admin can invite users and Team Admins; a Team Admin can invite users only to assigned teams.
4. A user with a valid join code can create a pending organization/team join request, but cannot gain access until the required approval state is satisfied.
5. Organization and team approval states are evaluated separately, and pending/rejected/revoked users cannot access protected organization data.
6. A user can belong to multiple teams in the same organization without duplicate membership records.
7. Every organization-scoped read is filtered by the authenticated organization membership; cross-organization IDs return an authorization-safe response.
8. Organization Admins can view organization membership and team membership; Team Admins can view and manage only their assigned-team membership within policy.
9. Approval, rejection, revocation, invitation, and join-request transitions record actor and timestamps for later audit integration.
10. Route tests cover successful and denied organization, team, invitation, join-request, and membership-transition cases.

**Technical Notes:** Use Firestore transactions for membership creation and state transitions that must prevent duplicates or conflicting approvals. Add required Firestore composite indexes to the repository documentation/configuration when query shapes are finalized. Keep response shapes stable and return Zod-validated payloads.

**Dependencies:** `[ORG 1.2]`, `[ORG 1.3]`, and `[ORG 1.4]`.

**Open Questions:**

- **PM:** Define the exact manual support/admin provisioning operation and who can invoke it.
- **Tech:** Decide whether invitation acceptance creates a pending membership first or directly activates after organization approval. Starting recommendation: always create a pending record and use the same transition rules as join requests.

### [ORG 1.6] - Publish shared client organization contracts

**Issue type:** Technical task

**Summary:** Add typed client contracts and server-action boundaries for consuming the Phase 1 organization, team, user, and membership API without direct Firebase Admin access.

**Background / Context:** The existing client has domain types for inventory and transactions but no organization foundation contracts. Later protected routes need a consistent representation of the current user, organizations, teams, roles, permissions, and membership state.

**Scope:**

- **In scope:** TypeScript types, Zod schemas, enums, API response types, and typed server-action wrappers under `quantify-ims/lib/types/` and `quantify-ims/lib/actions/`.
- **Nice to have:** A typed current-session response helper consumed by protected layouts.
- **Deferred:** Organization onboarding UI, team management screens, invitations UI, and join-code signup UI.
- **Excluded / Out of scope:** Browser Firebase SDK and authorization enforcement in the client.

**Acceptance Criteria:**

1. Client contracts represent the same organization, team, user, membership, invitation, and join-request fields defined by `[ORG 1.1]`.
2. Role, permission, and lifecycle-state enums reject unsupported values and do not duplicate server-only credential fields.
3. Server actions validate API responses with Zod before returning data to client components.
4. Authenticated API calls forward the current request cookies through the existing server-side API boundary.
5. Client types distinguish pending, active, rejected, and revoked membership states.
6. Type-level or Vitest tests cover representative valid payloads and invalid payload rejection.
7. No client contract exposes Firebase Admin credentials, private keys, or privileged server configuration.

**Technical Notes:** Follow the existing `lib/actions/` and `lib/types/` conventions. Use Heroicons only if a later UI task adds controls; this task does not introduce UI. Keep names aligned with the API's camelCase contract.

**Dependencies:** `[ORG 1.2]` and `[ORG 1.5]`.

### [ORG 1.7] - Verify Phase 1 organization boundaries

**Issue type:** Technical task

**Summary:** Run the Phase 1 contract, middleware, API, and client validation suite and document the manual checks required before merging into `develop`.

**Background / Context:** Organization boundaries are security-sensitive and must be verified across identity, data access, membership transitions, and client/server contracts. Vitest is the selected test framework, while Firebase Emulator Suite and Playwright are explicitly excluded.

**Scope:**

- **In scope:** Vitest configuration and test organization, unit/integration coverage for the Phase 1 contracts and API, test fixtures/stubs, lint/type checks, and a manual verification checklist for a configured Firebase project.
- **Nice to have:** Coverage thresholds for authorization and membership transition modules.
- **Deferred:** Full browser end-to-end automation and production deployment checks.
- **Excluded / Out of scope:** Adding Firebase Emulator Suite or Playwright.

**Acceptance Criteria:**

1. `pnpm test` from `server/` runs the server Vitest suite with no Firebase Emulator Suite dependency.
2. The client test command, once configured for the touched contracts, runs the relevant Vitest tests without requiring browser automation.
3. Tests cover organization isolation, team membership scope, role/permission checks, approval transitions, duplicate membership prevention, and unauthenticated requests.
4. `pnpm lint` passes for each changed package, or any pre-existing unrelated failure is recorded separately.
5. Type checking/build validation passes for changed client contracts when those scripts are available.
6. The manual checklist identifies valid and invalid Firebase credentials, first-admin provisioning, join-code request, organization approval, team approval, rejection, revocation, and cross-organization access attempts.
7. The Phase 1 exit criteria are recorded: an authenticated user belongs to the correct organization and teams, sees only authorized data, and receives the correct read-only or administrative capabilities.

**Technical Notes:** Use dependency injection and deterministic fixtures rather than live cloud services in automated tests. End-to-end test evidence is required before a release pull request from `develop` to `main`, but browser automation is not part of this phase's tooling.

**Dependencies:** `[ORG 1.1]` through `[ORG 1.6]`.

## Agent Execution Rules

- Implement one issue task at a time in numeric order unless a reviewer explicitly approves a dependency-preserving batch.
- Before coding each task, read the task body, relevant PRD sections, and all files named in that task.
- Use TDD for behavior changes: write a focused failing Vitest test, run it to confirm the expected failure, implement the smallest change, then rerun the focused test and the package suite.
- Keep commits small and imperative. Commit task-sized changes on a branch created from `develop`; do not commit directly to `main`.
- After each task, review authorization implications and API contract changes before starting the next task.
- Do not add implementation for deferred Version 0.2 or later entities while completing Phase 1.

## Phase 1 Exit Checklist

- [ ] Firebase Admin initializes safely on the server.
- [ ] Firebase-authenticated identity reaches protected Express routes.
- [ ] Organization, team, user, membership, invitation, and join-request contracts are validated.
- [ ] Organization and team authorization is enforced by Express.
- [ ] First-admin provisioning is manual/support-controlled.
- [ ] Join-code requests require approval before access.
- [ ] Organization Admin and Team Admin capabilities follow PRD scope.
- [ ] Client contracts match server responses without exposing privileged Firebase data.
- [ ] Vitest coverage verifies isolation and membership transitions.
- [ ] `develop` integration validation is complete before a production release proposal to `main`.
