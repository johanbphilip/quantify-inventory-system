# Quantify Inventory System Backlog

This file tracks planned features, incomplete work, and product questions. Update the checklist when work starts or finishes.

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

## Server

- [ ] Add a parameter for automated alerts when quantity falls below a threshold
- [ ] Return accurate status codes, including `201` for newly created resources
- [x] Add user authentication
- [ ] Add Supabase user queries for profile features
- [ ] Move reorder-point status calculation to the backend
- [ ] Create roles for admins, staff, and volunteers (not a priority)
- [x] Implement token-based authentication with access and refresh tokens

## Edge Cases and Product Questions

- [ ] Decide how deleting a storage location or category affects existing items
- [ ] Decide whether storage-location and category creation needs a route or belongs in onboarding