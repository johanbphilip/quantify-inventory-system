# Quantify Inventory System Backlog

This file tracks planned features, incomplete work, and implementation decisions from [product-requirement-document.md](product-requirement-document.md). Update the checklist when work starts or finishes.

## Product roadmap

### Version 0.1: Organization Foundation

- [ ] Add organization and team data model
- [ ] Provision the first Organization Admin through the approved manual process
- [ ] Add static GUID organization join code handling
- [ ] Add invitations and organization/team membership requests
- [ ] Add Organization Admin and Team Admin roles
- [ ] Add organization approval and Team Admin team-request approval states
- [ ] Enforce organization and team authorization in API middleware and controllers

### Version 0.2: Onboarding and Organization Configuration

- [ ] Create Organization Admin onboarding workspace
- [ ] Allow Organization Admins to create teams
- [ ] Allow Organization Admins to assign or invite Team Admins
- [ ] Allow Organization Admins to configure categories separately for each team
- [ ] Support team category custom fields and required fields
- [ ] Allow Organization Admins to create initial organization locations
- [ ] Show onboarding setup completion and incomplete configuration
- [ ] Allow staged onboarding across multiple visits
- [ ] Allow Team Admins to modify categories for assigned teams
- [ ] Allow Team Admins to add organization-owned locations
- [ ] Prevent Team Admins from modifying another team's categories
- [ ] Audit onboarding configuration changes

### Version 0.3: Inventory Directory

- [ ] Replace the item-centric inventory contract with Catalog Item and Asset contracts
- [ ] Add bulk Catalog Items with direct quantities and no Asset records
- [ ] Add unique Catalog Items with one Asset record per physical unit
- [ ] Derive total, available, checked-out, and exception counts from Asset records
- [ ] Allow unique Assets to exist before a barcode is assigned
- [ ] Add team-defined categories to Catalog Items
- [ ] Add organization-owned locations to Catalog Items and Assets
- [ ] Regroup affected Catalog Items and Assets under `Unknown` when categories or locations are archived
- [ ] Add Catalog Item, Asset, Kit, and Location search and filtering
- [ ] Preserve Catalog Item and Asset references in historical records

### Version 1.0: Accountability

- [ ] Generate and print barcodes for uniquely tracked Assets
- [ ] Add camera scanning and manual barcode entry
- [ ] Add person-based checkout and check-in
- [ ] Check out bulk Catalog Items as whole records; defer partial quantities
- [ ] Check out unique Assets individually
- [ ] Add current-holder views and detailed transaction history
- [ ] Prevent duplicate checkout/check-in operations with atomic updates
- [ ] Enforce team membership for checkout and check-in

### Version 1.1: Kits and Exceptions

- [ ] Add team-owned Kits with `organization_id` and `team_id`
- [ ] Allow Kits to contain Assets or whole bulk Catalog Items, but not other Kits
- [ ] Allow an Asset to move into a Kit owned by another team while retaining its Catalog Item ownership
- [ ] Add full and acknowledged partial Kit checkout
- [ ] Notify Organization and relevant Team Admins after acknowledged partial checkout
- [ ] Add strict Kit check-in with lost, damaged, and moved exceptions

### Version 2.0 and later

- [ ] Add team-owned Flow templates and single-operator sessions
- [ ] Allow Session Records to be edited for one week after closure, logging every edit
- [ ] Add collaborative sessions, notifications, real-time synchronization, and reporting
- [ ] Add organization-owned master event Flows with editable team-owned child Flows
- [ ] Add reservations, offline scanning, and hardware scanner support

## Client

- [x] Create a basic dashboard with search and a search table
- [x] Create a search page with a search feature and table
- [x] Add edit and delete features within the search page
- [x] Implement basic CRUD features
- [x] Add a side navigation bar
- [x] Add tiles showing high-alert and low-stock item counts
- [x] Add login and registration pages
- [x] Create a dashboard with item counts, threshold alerts, and ordering features
- [ ] Create filtering parameters
  - [ ] Filter by date added, name, stock level, alert level, and related fields
- [ ] Improve table styling and table interactions
- [ ] Refresh pages automatically after changes
- [x] Add light mode
- [ ] Add a user account component that opens a profile page
- [ ] Complete add and update item widgets
  - [x] Complete add item UI
  - [ ] Complete add item functionality
  - [ ] Complete edit item UI
  - [ ] Complete edit item functionality

The existing client items above describe the current item-centric baseline. New inventory UI should follow the Catalog Item and Asset model in the product roadmap.

## Server

- [ ] Add a parameter for automated alerts when quantity falls below a threshold
- [ ] Return accurate status codes, including `201` for newly created resources
- [x] Add user authentication
- [ ] Add Supabase user queries for profile features
- [ ] Move reorder-point status calculation to the backend
- [ ] Add Organization Admin, Team Admin, Technician, and User authorization rules
- [x] Implement token-based authentication with access and refresh tokens

## Implementation notes from resolved decisions

- [ ] Implement `Unknown` location and category regrouping when a location or team category is archived
- [ ] Preserve archived Catalog Item, Asset, location, and category references in historical records
- [ ] Migrate the current item-centric inventory contract to Catalog Item and Asset records
- [ ] Ensure Asset ownership remains with its Catalog Item team when an Asset moves into another team's Kit
- [ ] Add atomic whole-record bulk checkout and individual Asset checkout behavior
- [ ] Add editable Session Record audit events for the one-week post-closure window
