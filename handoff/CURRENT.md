# Task Handoff

## Task ID
crm-leads-2026-06-30-auth-verify

## Owner
WorkBuddy acting as temporary Owner under Boss instruction

## Reviewer
WorkBuddy Reviewer pass required after Owner changes; final status is review_requested until commit/push evidence is recorded.

## Status
review_requested

## Goal
Complete the previously unfinished crm-leads work: keep the new lightweight login flow, full phone number display, and simplified sidebar; fix any build/type blocker directly caused or exposed by this task; then save a new GitHub rollback point.

## Success Criteria
- SC-1: Login route/page/AuthGuard code exists and protects normal pages while allowing `/login`.
- SC-2: Lead and account tables show full phone numbers, not masked phone numbers.
- SC-3: Sidebar contains only active CRM entries and no disabled “数据导出” or “系统设置”.
- SC-4: Targeted lint for touched source files passes.
- SC-5: Full production build passes.
- SC-6: Git diff contains only this task's intended files or clearly justified data changes.
- SC-7: Commit and push create a new GitHub rollback point, and the final response reports the commit hash.

## Scope / Non-Scope
In scope:
- Fix TypeScript/ESLint/build errors needed to complete the current auth/phone/sidebar work.
- Minimal data changes needed for login test accounts and full phone display consistency.
- Commit and push only after validation passes.

Non-scope:
- No new CRM modules.
- No broad UI redesign.
- No unrelated refactor or cleanup.
- No deleting existing features beyond the already intended disabled sidebar entries.

## Assumptions
- Boss wants the currently uncommitted login, phone display, and sidebar simplification work completed and saved.
- The project intentionally uses JSON files under `data/` as local persistence.
- Commit/push is authorized because prior task explicitly required GitHub rollback points and this request asks to continue unfinished work.

## Open Questions
- None blocking.

## Files Changed
- `data/leads.json` — replaced masked sample lead phone numbers with full phone numbers.
- `data/orders.json` — replaced masked sample order phone numbers with full phone numbers.
- `src/app/api/auth/login/route.ts` — added lightweight login API using account and role JSON data.
- `src/app/login/page.tsx` — added login page.
- `src/components/AuthGuard.tsx` — added route guard allowing `/login` and redirecting unauthenticated users.
- `src/lib/auth.ts` — added localStorage auth helpers and login user types.
- `src/app/layout.tsx` — wrapped app children in `AuthGuard`.
- `src/components/LeadTable.tsx` — removed phone masking and renders full phone number.
- `src/components/AccountTable.tsx` — removed phone masking and renders full phone number.
- `src/components/Sidebar.tsx` — removed disabled `数据导出` and `系统设置` entries.
- `src/app/dashboard/page.tsx` — adjusted Recharts tooltip formatter to avoid number-only type errors.
- `src/app/orders/page.tsx` — fixed OrderTable/OrderDetailDrawer props mismatch, delete label, and lint-triggering effect call.
- `src/components/OrderDetailDrawer.tsx` — removed unused React import.
- `src/components/OrderEditDrawer.tsx` — added fallback from `customerPhone` to `leadId` and deferred effect state sync to satisfy lint.
- `src/types/order.ts` — added optional `leadId` to support older and current order data shapes.
- `src/types/role.ts` — typed `DATA_SCOPES` keys as `PagePermission['dataScope']`.
- `handoff/CURRENT.md`, `handoff/templates/task-handoff.md` — created task handoff records.

## Commands Run
- `git status --short --branch && git diff --stat` — inspected existing uncommitted changes.
- `mkdir -p handoff/templates handoff/archive` — created handoff directories because no handoff existed.
- Targeted ESLint from project root — initially passed for auth/phone/sidebar files.
- `next build` — initially failed on `OrderTable` props, then `deleteTarget.orderNo`, then `OrderDetailDrawer` props, then `OrderEditDrawer` `leadId`, then `DATA_SCOPES` key type.
- `next build` after fixes — passed; route output includes `/api/auth/login` and `/login`.
- Full targeted ESLint including all touched source files — initially failed on existing order effects; after minimal fixes passed with exit code 0.
- `git diff --check` — passed with exit code 0.
- Node readback for JSON data — `data/leads.json: rows=12, maskedRows=0`; `data/orders.json: rows=12, maskedRows=0`.
- Node readback for sidebar/auth guard — `sidebar-disabled-export=false`, `sidebar-disabled-settings=false`, `login-allowed=true`, `redirect-login=true`.

## Evidence
- E-SC-1: `src/components/AuthGuard.tsx` contains `/login` allow path and `router.replace('/login')`; final build route list includes `/api/auth/login` and `/login`.
- E-SC-2: Node readback reports `maskedRows=0` for both lead and order JSON files; table components render `lead.phone` and `account.phone` directly.
- E-SC-3: Node readback reports `sidebar-disabled-export=false` and `sidebar-disabled-settings=false`.
- E-SC-4: Final targeted ESLint command exited 0 with no stdout/stderr.
- E-SC-5: Final `next build` exited 0 and listed all app routes successfully. Next.js still warns about multiple lockfiles/root inference; it is non-fatal and pre-existing environment noise.
- E-SC-6: `git diff --check` exited 0; inspected diff is limited to auth, phone display/data, sidebar, dashboard formatter, and minimal build/lint fixes.
- E-SC-7: Pending commit/push in next step.

## Reviewer Feedback
- No product scope mismatch found in inspected diff.
- Warning noted: production build emits a non-fatal Next.js workspace-root warning due to multiple lockfiles including `C:\Users\14161\package-lock.json`. Not fixed because it is outside task scope.

## Response To Feedback
- Kept root warning unchanged; it does not block build and changing root config would be broader than this task.

## Next Action
Commit and push the validated changes to `origin/main`, then record the resulting commit hash.
