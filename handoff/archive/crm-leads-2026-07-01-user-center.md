# Task Handoff

## Task ID
crm-leads-2026-07-01-user-center

## Owner
WorkBuddy temporary Owner by Boss instruction

## Reviewer
WorkBuddy Reviewer pass required after implementation; current state is review_requested, not committed.

## Status
review_requested

## Goal
Adjust the left-bottom user center in the CRM sidebar so it matches the existing system style and supports read-only user information, password change, and confirmed logout.

## Success Criteria
- SC-1: The user center entry is in the left-bottom navigation area and shows username plus a default avatar; it must not move the existing `账号管理` navigation item.
- SC-2: Clicking the entry opens a user information popover/modal styled consistently with the existing CRM UI, showing avatar, user name, role, phone number, and login time as read-only data.
- SC-3: The password change action opens a modal with old password, new password, confirm password; invalid old password or mismatched new passwords show errors; valid submission updates the matching account in `data/accounts.json` through an API.
- SC-4: Logout action opens a confirmation modal first; confirming clears local login state and routes to `/login`.
- SC-5: Targeted ESLint passes for touched files and full `next build` passes.
- SC-6: Git diff is limited to the user center and password-update API work.

## Scope / Non-Scope
In scope:
- Sidebar user center UI and supporting modals.
- Minimal account API extension for current-user password update.
- Default avatar using existing UI style.

Non-scope:
- Do not move `账号管理`.
- Do not add avatar upload, editable profile, password hashing, or broad auth refactor.
- Do not commit/push unless Boss explicitly confirms.

## Assumptions
- Current auth state in localStorage is the source for current user id/phone/name/role/login time.
- Account password is currently stored as plain text in `data/accounts.json`; update follows existing project architecture.
- Default avatar is a styled circular avatar with the user's first-name character to avoid external assets/dependencies.

## Open Questions
- None blocking.

## Files Changed
- `src/components/Sidebar.tsx` — added left-bottom user center entry, user information popover, change-password modal, logout confirmation modal, and logout routing.
- `src/app/api/accounts/route.ts` — added `PUT action=changePassword` branch validating old password and updating the matched account password.
- `handoff/CURRENT.md` — recorded task scope and evidence.

## Commands Run
- Read `AGENTS.md`, previous `handoff/CURRENT.md`, `src/components/Sidebar.tsx`, `src/app/api/accounts/route.ts`, `src/types/account.ts`, `data/accounts.json`, and related account modal/page files.
- `eslint src/components/Sidebar.tsx src/app/api/accounts/route.ts` — exit 0.
- `next build` — exit 0; route list includes `/accounts`, `/api/accounts`, `/api/auth/login`, `/login`, and core CRM pages.
- Source readback script — confirmed account nav, user info, change password, logout confirm, readonly fields, API password submit, and `/login` redirect markers are present.
- Password data write/read/restore script — temporarily changed `AC-2026-0001` password to `tmp-check-789`, read it back successfully, restored original `123123`, and verified no diff remains in `data/accounts.json`.
- `git diff --stat && git diff --name-only && git status --short --branch` — shows only `handoff/CURRENT.md`, `src/app/api/accounts/route.ts`, `src/components/Sidebar.tsx` modified.

## Evidence
- E-SC-1: Source readback reports `accountNav=true`; Sidebar still contains `{ label: '账号管理', href: '/accounts', disabled: false }`; user center entry remains in bottom block below nav.
- E-SC-2: Source readback reports `userCenterPopover=true` and `readonlyFields=true`; UI uses existing CRM colors/borders/rounded/shadow/button styles.
- E-SC-3: Source readback reports `changePassword=true` and `passwordSubmit=true`; API route has `action === 'changePassword'`, validates empty fields and old password, and updates account password. Data write/read/restore check returned `password-write-check=true` and `password-restored=true`.
- E-SC-4: Source readback reports `logoutConfirm=true` and `logoutRoute=true`; confirm button calls logout, clears auth state, and routes to `/login`.
- E-SC-5: Targeted ESLint exited 0; full `next build` exited 0.
- E-SC-6: Git diff limited to `handoff/CURRENT.md`, `src/app/api/accounts/route.ts`, `src/components/Sidebar.tsx`.

## Reviewer Feedback
Pending Boss UI review. Self-check found no scope expansion: no avatar upload/edit profile/password hashing/broad auth refactor; no commit/push performed.

## Response To Feedback
Pending.

## Next Action
Boss reviews the running page; if accepted, create and push a GitHub rollback point.
