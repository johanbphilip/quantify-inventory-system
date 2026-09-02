---
name: creating-issue-tasks
description: Use when breaking a project phase, feature, or implementation plan into consistently named tasks for GitHub Issues, Jira, or another issue tracker.
---

# Creating Issue Tasks

## Purpose

Turn a phase or feature into a small set of independently deliverable, testable issue tasks. Use this skill for issue trackers in general; do not assume Jira-specific fields, workflow states, or syntax unless the user names Jira as the target.

## Required Title Format

Every task title must use:

```text
[ORG N.M] - TITLE
```

- `ORG` is a short, uppercase abbreviation for the main feature or workstream in the current phase.
- `N` is the phase number.
- `M` is the sequential task number within that phase and abbreviation, starting at `1`.
- `TITLE` is concise, imperative, and specific. Do not include a second ticket key or repeat the abbreviation in the title.

Examples:

```text
[DB 1.1] - Establish Firebase project configuration
[DB 1.2] - Add server-side Firestore connection
[DB 1.3] - Verify authenticated database access
```

## Workflow

1. Read the relevant phase document, repository `AGENTS.md`, applicable child `AGENTS.md`, PRD sections, and nearby implementation context.
2. Identify the phase's primary workstream and propose one `ORG` abbreviation. Prefer a durable domain or capability abbreviation over a technology name when the work is broader than one tool.
3. Confirm the phase number from the source document. Do not infer a phase number from task numbering.
4. Define the smallest useful task boundaries. Each task should have one clear outcome, an explicit owner boundary, and acceptance criteria that can be verified independently.
5. Order tasks by dependency and implementation sequence. Use one numbering series for the phase: `N.1`, `N.2`, `N.3`, and so on.
6. Check that titles are unique, unambiguous, and compliant with the exact `[ORG N.M] - TITLE` format.
7. For each task, load and follow the `jira-story-description` skill to create the detailed issue body. Treat it as the quality standard for clarification, ticket-type detection, scope, acceptance criteria, technical notes, dependencies, and open questions.
8. Adapt the body to the target tracker:
   - GitHub Issues: use Markdown headings, checklists, labels, and references supported by the repository.
   - Jira: use the Jira-compatible story/task structure requested by the existing skill.
   - Other trackers: preserve the same information while using that tracker's native fields or Markdown support.
9. Keep the generated title separate from the detailed body. The body must not silently rename or renumber the task.

## Decomposition Rules

- Do not create a task solely for a file, class, endpoint, or database table unless it represents a meaningful independently verifiable outcome.
- Separate decisions or investigations from implementation when an unknown could change the design. Mark those as POC / Spike work through the referenced skill.
- Separate cross-cutting infrastructure, data modeling, API behavior, authorization, and UI work when they have different dependencies or validation paths.
- Do not hide necessary prerequisites inside a later task. Name the prerequisite and reference it as a dependency.
- Keep explicitly deferred or excluded work out of the task's committed acceptance criteria.
- Prefer several small tasks over one broad task, but do not split a cohesive change into arbitrary fragments.

## Phase Example

For a phase focused on Organization, Team, and User entities, a suitable abbreviation might be `[IAM]` if the phase is primarily identity and membership management, or `[ORG]` if the phase is primarily organization-domain modeling. Do not choose between them silently when the distinction changes scope; state the recommendation and ask for confirmation.

Example titles after the workstream is confirmed:

```text
[IAM 1.1] - Define organization, team, and user domain contracts
[IAM 1.2] - Persist organization and team membership data
[IAM 1.3] - Implement authenticated organization access
[IAM 1.4] - Enforce team membership authorization
```

These are examples only. Derive the actual task list from the phase requirements and current repository state.

## Output Checklist

Before presenting tasks, verify:

- The phase and workstream are stated.
- The `ORG` abbreviation is explained.
- Every title matches `[ORG N.M] - TITLE`.
- Numbering is sequential and starts at `1` for the phase.
- Task boundaries follow dependencies and are independently testable.
- Each task has a detailed body produced using `jira-story-description`.
- Tracker-specific language is used only when the target tracker is known.
- Unresolved product, technical, and design decisions are labeled as open questions rather than invented.
