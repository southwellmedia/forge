# Phase 2 Design: Developer Infrastructure + Feature Polish

## Scope

Single branch with 4 workstreams:
1. Testing setup (Vitest + Playwright)
2. CI/CD (GitHub Actions)
3. Connected Accounts UI
4. CLI tool (create-forge-app)

Docker deferred — deploying to Vercel.

## 1. Testing

### Vitest (Unit/Integration)

- Workspace config at root (`vitest.workspace.ts`)
- Shared base config in `packages/config/vitest/`
- Each package can override with local `vitest.config.ts`
- Add `test` task to `turbo.json` (depends on `^build`)
- Root script: `pnpm test`

**Test targets (foundation):**
- tRPC routers: project CRUD, task CRUD, user procedures
- Auth DAL helpers
- Utility functions (cn, env validation, constants)
- Mock DB calls with manual mocks

### Playwright (E2E)

- Config at `apps/web/playwright.config.ts`
- Tests in `apps/web/e2e/`
- Use `webServer` option to start dev server
- Root script: `pnpm test:e2e`

**Test flows (foundation):**
- Register → verify email → login → dashboard
- Create/edit/delete project
- Settings: profile edit, change password
- Auth guards (redirect unauthenticated users)

## 2. CI/CD

### GitHub Actions (`ci.yml`)

- **Trigger:** PR to main + push to main
- **Node:** 20
- **Steps:** pnpm install → lint → typecheck → build → unit tests → E2E tests
- **Caching:** pnpm store, Turborepo remote cache, Playwright browsers
- No deploy workflow (Vercel handles deployment)

## 3. Connected Accounts UI

- Location: `apps/web/app/(protected)/settings/account/`
- New "Connected Accounts" section on existing Account page
- Between Change Password and Delete Account sections
- Shows Google and GitHub providers
- Connected state: provider email/username + Disconnect button
- Disconnected state: Connect button → OAuth flow
- Guard: prevent disconnecting last auth method
- Backend: uses existing Better Auth `linkSocial`/`unlinkAccount` APIs

## 4. CLI Tool (create-forge-app)

- Package: `packages/create-forge-app/`
- Prompting library: clack
- Published as `create-forge-app` on npm

### Interactive flow:
1. `npx create-forge-app`
2. Prompt: project name, description
3. Copy template, replace package names/references
4. Run `pnpm install`
5. Print next steps (.env setup, db:push, dev)

### v1 scope:
- Full stack scaffold only (no feature toggling)
- Template stored within the package
- Feature selection deferred to v2
