# Task Handoff

## Task ID
crm-leads-2026-07-01-permission-enforcement

## Owner
WorkBuddy temporary Owner by Boss instruction

## Reviewer
WorkBuddy Reviewer pass required after implementation; current status is review_requested.

## Status
review_requested

## Goal
Make the existing role permission configuration actually control CRM navigation visibility and direct page access. A sales supervisor must not see or access pages not granted by Role & Permission Management.

## Success Criteria
- SC-1: `账号管理` is included in the role permission model so it can be configured from Role & Permission Management.
- SC-2: Default role data grants `账号管理` only to `管理员`; `销售主管` and `销售专员` do not get it by default. `销售主管` also does not get `角色与权限管理`.
- SC-3: Sidebar filters menu items by current login user's page permissions; `销售主管` sees only 数据仪表盘、线索管理、商品管理、订单管理.
- SC-4: Direct URL access is blocked for pages not in the current user's permissions; unauthorized users are routed away to an allowed page.
- SC-5: Login page remains public and unauthenticated users still go to `/login`.
- SC-6: Targeted ESLint and full `next build` pass.
- SC-7: Git diff is limited to auth/permission enforcement and role seed data/handoff.

## Scope / Non-Scope
In scope:
- Minimal permission utility functions.
- Sidebar filtering.
- AuthGuard route-level permission checks.
- Add `账号管理` to role permission configuration and admin default permissions.

Non-scope:
- Do not implement function-level button permission enforcement in this pass.
- Do not implement backend API authorization in this pass.
- Do not redesign role management UI beyond exposing `账号管理` through existing permission table.
- Do not commit/push unless Boss explicitly asks.

## Assumptions
- Permission `page` values are existing Chinese labels used by `ALL_PAGES` and `roles.json`.
- `/` maps to `线索管理`, `/dashboard` to `数据仪表盘`, `/products` to `商品管理`, `/orders` to `订单管理`, `/roles` to `角色与权限管理`, `/accounts` to `账号管理`.
- If a logged-in user lacks the current route, redirect to their first permitted route; fallback `/login` if none.

## Open Questions
- None blocking.

## Files Changed
- `src/lib/permissions.ts` — added centralized nav items, page permission lookup, allowed-nav filtering, route-to-page mapping, and first-allowed-route helper.
- `src/components/Sidebar.tsx` — replaced hard-coded menu rendering with `getAllowedNavItems(authState.user.permissions)` while preserving user center and account-management route when permitted.
- `src/components/AuthGuard.tsx` — added route-level permission check after login check; unauthorized direct URL access redirects to first allowed route or `/login`.
- `src/types/role.ts` — added `账号管理` to `ALL_PAGES`, making it configurable in Role & Permission Management.
- `data/roles.json` — granted `账号管理` permissions to `管理员` only; left `销售主管` without `角色与权限管理` and `账号管理`.
- `handoff/archive/crm-leads-2026-07-01-user-center.md` — archived prior user-center task handoff.
- `handoff/CURRENT.md` — recorded this task.

## Commands Run
- Read `AGENTS.md`, previous `handoff/CURRENT.md`, `AuthGuard.tsx`, `Sidebar.tsx`, `role.ts`, and `roles.json`.
- `cp handoff/CURRENT.md handoff/archive/crm-leads-2026-07-01-user-center.md` — archived previous handoff.
- `eslint src/lib/permissions.ts src/components/Sidebar.tsx src/components/AuthGuard.tsx src/types/role.ts` — exit 0.
- `next build` — exit 0.
- Node role/code readback — confirmed admin has `账号管理`; supervisor has neither `角色与权限管理` nor `账号管理`; specialist has no `账号管理`; Sidebar and AuthGuard use permission helpers.
- Node role nav simulation — admin gets all six nav entries; supervisor gets `数据仪表盘,线索管理,商品管理,订单管理`; specialist gets `线索管理,商品管理,订单管理`.
- Git diff/status check — changed files are role data/model, permission helpers, Sidebar, AuthGuard, and handoff/archive.

## Evidence
- E-SC-1: `src/types/role.ts` includes `{ key: '账号管理', label: '账号管理' }`; `src/lib/permissions.ts` maps `/accounts` to `账号管理`.
- E-SC-2: Readback output: `admin-has-account=true`, `supervisor-has-roles=false`, `supervisor-has-account=false`, `specialist-has-account=false`.
- E-SC-3: Sidebar uses `getAllowedNavItems(authState.user.permissions)`; nav simulation output: `supervisor-nav=数据仪表盘,线索管理,商品管理,订单管理`.
- E-SC-4: AuthGuard uses `getPermissionPageByPath(pathname)`, `canViewPage(...)`, and `getFirstAllowedPath(...)` to redirect unauthorized direct access.
- E-SC-5: AuthGuard still allows `/login` before auth checks and redirects unauthenticated users to `/login`.
- E-SC-6: Targeted ESLint exited 0; full `next build` exited 0.
- E-SC-7: Diff is limited to `data/roles.json`, `handoff/CURRENT.md`, `src/components/AuthGuard.tsx`, `src/components/Sidebar.tsx`, `src/types/role.ts`, plus new `src/lib/permissions.ts` and handoff archive.

## Reviewer Feedback
Self-check: function-level button permissions and backend API authorization are intentionally out of scope for this pass and remain future work.

## Response To Feedback
Pending Boss review.

## Next Action
Boss reviews behavior; if accepted, create and push a GitHub rollback point.
