# Development Phases

This file is the progress index for the Quantify Inventory System. Each phase entry gives the intended outcome, current status, and implementation-plan location. Detailed plans belong in a subdirectory named `Phase xx - Main Title`.

## Phase 01: Organization Foundation

**Status:** In planning

**Goal:** Establish the Firebase and Express foundation for organizations, teams, users, memberships, invitations, join requests, and organization-level API boundaries.

**Current focus:** The user-owned Firebase project and local credential setup is the first task. Implementation then proceeds through domain contracts, Firebase Admin initialization, authentication middleware, organization and membership APIs, client contracts, and Vitest verification.

**Plan:** [Phase 01 - Organization Foundation/implementation-plan.md](Phase%2001%20-%20Organization%20Foundation/implementation-plan.md)

## Phase 02: Onboarding and Organization Configuration

**Status:** Planned

**Goal:** Give an Organization Admin a staged setup workspace for creating teams, configuring per-team categories, creating organization locations, assigning Team Admins, and reviewing setup progress.

**Depends on:** Phase 01 organization identity, membership, roles, permissions, and API authorization.

**Plan:** Not started. The implementation plan will be added under `Phase 02 - Onboarding and Organization Configuration/`.

## Phase 03: Inventory Directory

**Status:** Planned

**Goal:** Introduce organization inventory through team-owned categories, locations, Catalog Items, bulk or uniquely tracked inventory, Assets, search, filtering, archive/restore, and inventory-level authorization.

**Depends on:** Phase 01 organization boundaries and Phase 02 onboarding/configuration.

**Plan:** Not started. The implementation plan will be added under `Phase 03 - Inventory Directory/`.

## Phase 04: Accountability

**Status:** Planned

**Goal:** Add barcode workflows, person-based checkout and check-in, atomic availability updates, derived inventory counts, current-holder views, and detailed transaction history.

**Depends on:** Phase 03 inventory entities and team-scoped authorization.

**Plan:** Not started. The implementation plan will be added under `Phase 04 - Accountability/`.

## Phase 05: Kits and Exceptions

**Status:** Planned

**Goal:** Support team-owned kits, kit checkout and return, partial kit checkout acknowledgment, notifications, missing-item resolution, and lost, damaged, or moved exceptions.

**Depends on:** Phase 04 accountability and transaction history.

**Plan:** Not started. The implementation plan will be added under `Phase 05 - Kits and Exceptions/`.

## Phase 06: Flow Templates and Sessions

**Status:** Planned

**Goal:** Add team-owned Flow templates, single-operator online sessions, session progress, and completed session records.

**Depends on:** Phase 05 kits, exceptions, and inventory accountability.

**Plan:** Not started. The implementation plan will be added under `Phase 06 - Flow Templates and Sessions/`.

## Phase 07: Collaborative Sessions and Reporting

**Status:** Planned

**Goal:** Extend Flow sessions with collaboration, reporting, operational history, and the supporting permissions and audit behavior.

**Depends on:** Phase 06 Flow templates and sessions.

**Plan:** Not started. The implementation plan will be added under `Phase 07 - Collaborative Sessions and Reporting/`.

## Phase 08: Master Event Flows

**Status:** Planned

**Goal:** Coordinate multiple team-owned child Flows through organization-owned master event Flows while preserving team ownership and permissions.

**Depends on:** Phase 07 collaborative sessions and reporting, plus explicit organization-wide Flow sharing rules.

**Plan:** Not started. The implementation plan will be added under `Phase 08 - Master Event Flows/`.

## Status Definitions

- **In planning:** Scope and implementation approach are being defined.
- **In progress:** At least one task is actively being implemented.
- **Blocked:** Work cannot continue until a named dependency or decision is resolved.
- **Complete:** Exit criteria are met and the phase is ready for the next release review.
- **Planned:** The phase is defined in the PRD but detailed planning has not started.
