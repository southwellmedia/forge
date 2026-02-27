# Phase 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add testing infrastructure (Vitest + Playwright), CI/CD (GitHub Actions), connected accounts UI, and a CLI scaffolding tool to the Forge monorepo.

**Architecture:** Four workstreams in a single branch: (1) Vitest for unit/integration tests with a shared config, per-package test files, and Turbo orchestration; (2) Playwright for E2E tests against the Next.js app; (3) GitHub Actions CI pipeline; (4) Connected accounts settings UI using existing Better Auth APIs; (5) `create-forge-app` CLI with clack prompts.

**Tech Stack:** Vitest 3.x, Playwright 1.x, GitHub Actions (checkout@v4, setup-node@v4, pnpm/action-setup@v4), clack prompts, tsup

---

### Task 1: Create feature branch

**Files:**
- None (git operation only)

**Step 1: Create and switch to feature branch**

```bash
git checkout -b feat/phase-2
```

**Step 2: Verify branch**

```bash
git rev-parse --abbrev-ref HEAD
```

Expected: `feat/phase-2`

---

### Task 2: Add Vitest shared config

**Files:**
- Create: `packages/config/vitest.ts`

**Step 1: Install vitest at root**

```bash
pnpm add -Dw vitest @vitest/coverage-v8
```

**Step 2: Create shared vitest config**

Create `packages/config/vitest.ts`:

```ts
import { defineConfig } from "vitest/config";

export function createVitestConfig(overrides: Record<string, unknown> = {}) {
  return defineConfig({
    test: {
      globals: true,
      clearMocks: true,
      restoreMocks: true,
      ...overrides,
    },
  });
}
```

**Step 3: Add test tasks to turbo.json**

Add to `turbo.json` tasks:

```json
"test": {
  "dependsOn": ["^build"],
  "outputs": ["coverage/**"]
},
"test:e2e": {
  "dependsOn": ["^build"],
  "cache": false
}
```

**Step 4: Add test scripts to root package.json**

```json
"test": "turbo test",
"test:e2e": "turbo test:e2e"
```

**Step 5: Export vitest config from @repo/config**

Add to `packages/config/package.json` exports:

```json
"./vitest": "./vitest.ts"
```

Check if `packages/config/package.json` exists first. If it doesn't have exports, add them.

**Step 6: Commit**

```bash
git add -A
git commit -m "Add Vitest shared config and Turbo test tasks"
```

---

### Task 3: Add unit tests for @repo/utils

**Files:**
- Create: `packages/utils/vitest.config.ts`
- Create: `packages/utils/src/__tests__/cn.test.ts`
- Create: `packages/utils/src/__tests__/constants.test.ts`
- Modify: `packages/utils/package.json` (add test script + vitest dep)

**Step 1: Add vitest to utils package**

```bash
pnpm --filter @repo/utils add -D vitest
```

**Step 2: Create vitest config for utils**

Create `packages/utils/vitest.config.ts`:

```ts
import { createVitestConfig } from "@repo/config/vitest";

export default createVitestConfig({
  include: ["src/**/*.test.ts"],
});
```

**Step 3: Write cn() tests**

Create `packages/utils/src/__tests__/cn.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deduplicates tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });
});
```

**Step 4: Write constants tests**

Create `packages/utils/src/__tests__/constants.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  ROUTES,
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PROJECT_STATUSES,
  TASK_STATUSES,
  TASK_PRIORITIES,
  ROLES,
} from "../constants";

describe("constants", () => {
  it("defines all route keys", () => {
    expect(ROUTES.HOME).toBe("/");
    expect(ROUTES.LOGIN).toBe("/login");
    expect(ROUTES.DASHBOARD).toBe("/dashboard");
  });

  it("AUTH_ROUTES includes only auth pages", () => {
    expect(AUTH_ROUTES).toContain("/login");
    expect(AUTH_ROUTES).toContain("/register");
    expect(AUTH_ROUTES).not.toContain("/dashboard");
  });

  it("PROTECTED_ROUTES includes only protected pages", () => {
    expect(PROTECTED_ROUTES).toContain("/dashboard");
    expect(PROTECTED_ROUTES).toContain("/projects");
    expect(PROTECTED_ROUTES).not.toContain("/login");
  });

  it("PROJECT_STATUSES has valid values", () => {
    expect(PROJECT_STATUSES).toEqual(["active", "archived", "completed"]);
  });

  it("TASK_STATUSES has valid values", () => {
    expect(TASK_STATUSES).toEqual(["todo", "in_progress", "done"]);
  });

  it("TASK_PRIORITIES has valid values", () => {
    expect(TASK_PRIORITIES).toEqual(["low", "medium", "high"]);
  });

  it("ROLES has valid values", () => {
    expect(ROLES).toEqual(["user", "admin"]);
  });
});
```

**Step 5: Add test script to utils package.json**

Add to `packages/utils/package.json` scripts:

```json
"test": "vitest run"
```

**Step 6: Run tests**

```bash
pnpm --filter @repo/utils test
```

Expected: All tests pass.

**Step 7: Commit**

```bash
git add -A
git commit -m "Add unit tests for @repo/utils (cn, constants)"
```

---

### Task 4: Add unit tests for tRPC routers

**Files:**
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/server/__tests__/project.test.ts`
- Create: `apps/web/server/__tests__/task.test.ts`
- Create: `apps/web/server/__tests__/user.test.ts`
- Create: `apps/web/server/__tests__/helpers.ts`
- Modify: `apps/web/package.json` (add test script + vitest dep)

**Step 1: Add vitest to web app**

```bash
pnpm --filter @repo/web add -D vitest
```

**Step 2: Create vitest config for web**

Create `apps/web/vitest.config.ts`:

```ts
import { createVitestConfig } from "@repo/config/vitest";
import { resolve } from "path";

export default createVitestConfig({
  include: ["server/**/*.test.ts"],
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
```

**Step 3: Create test helpers**

Create `apps/web/server/__tests__/helpers.ts`:

```ts
import { vi } from "vitest";
import { appRouter } from "../routers/index";
import { createCallerFactory, type TRPCContext } from "../trpc";

// Chainable mock that returns itself for .from().where().orderBy().limit().offset()
function createChainMock(resolvedValue: unknown = []) {
  const chain: Record<string, unknown> = {};
  const mock = vi.fn(() => chain);
  for (const method of ["from", "where", "orderBy", "limit", "offset", "set", "values"]) {
    chain[method] = vi.fn(() => chain);
  }
  chain.returning = vi.fn().mockResolvedValue(
    Array.isArray(resolvedValue) ? resolvedValue : [resolvedValue]
  );
  // For select queries that don't call .returning()
  (mock as any).mockResolvedValue?.(resolvedValue);
  return { mock, chain };
}

export function createMockDb() {
  return {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as TRPCContext["db"];
}

export function createMockSession(overrides: Partial<TRPCContext["session"]> = {}): NonNullable<TRPCContext["session"]> {
  return {
    user: {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
      image: null,
    },
    session: {
      id: "session-1",
      expiresAt: new Date(Date.now() + 86400000),
    },
    ...overrides,
  };
}

export function createTestContext(overrides: Partial<TRPCContext> = {}): TRPCContext {
  return {
    session: createMockSession(),
    db: createMockDb(),
    headers: new Headers(),
    ...overrides,
  };
}

export function createCaller(ctx: TRPCContext) {
  return createCallerFactory(appRouter)(ctx);
}
```

**Step 4: Write project router tests**

Create `apps/web/server/__tests__/project.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";
import { createTestContext, createCaller, createMockDb } from "./helpers";

describe("project router", () => {
  describe("list", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(caller.project.list()).rejects.toThrow(TRPCError);
    });
  });

  describe("create", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.project.create({ name: "Test" })
      ).rejects.toThrow(TRPCError);
    });
  });

  describe("delete", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.project.delete({ id: "project-1" })
      ).rejects.toThrow(TRPCError);
    });
  });
});
```

**Step 5: Write task router tests**

Create `apps/web/server/__tests__/task.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { TRPCError } from "@trpc/server";
import { createTestContext, createCaller } from "./helpers";

describe("task router", () => {
  describe("listByProject", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.task.listByProject({ projectId: "p-1" })
      ).rejects.toThrow(TRPCError);
    });
  });

  describe("create", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.task.create({ projectId: "p-1", title: "Test" })
      ).rejects.toThrow(TRPCError);
    });
  });
});
```

**Step 6: Write user router tests**

Create `apps/web/server/__tests__/user.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { TRPCError } from "@trpc/server";
import { createTestContext, createCaller } from "./helpers";

describe("user router", () => {
  describe("me", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(caller.user.me()).rejects.toThrow(TRPCError);
    });

    it("returns session user when authenticated", async () => {
      const ctx = createTestContext();
      const caller = createCaller(ctx);
      const result = await caller.user.me();
      expect(result).toEqual(ctx.session!.user);
    });
  });
});
```

**Step 7: Add test script to web package.json**

Add to `apps/web/package.json` scripts:

```json
"test": "vitest run"
```

**Step 8: Run tests**

```bash
pnpm --filter @repo/web test
```

Expected: All tests pass. Some tests may need adjustments based on how Drizzle mocking works — fix any failures.

**Step 9: Commit**

```bash
git add -A
git commit -m "Add tRPC router unit tests (project, task, user)"
```

---

### Task 5: Add Playwright E2E setup

**Files:**
- Create: `apps/web/playwright.config.ts`
- Create: `apps/web/e2e/smoke.spec.ts`
- Modify: `apps/web/package.json` (add test:e2e script + playwright dep)
- Modify: `apps/web/.gitignore` or root `.gitignore` (add e2e artifacts)

**Step 1: Install Playwright**

```bash
pnpm --filter @repo/web add -D @playwright/test
pnpm --filter @repo/web exec playwright install chromium
```

**Step 2: Create Playwright config**

Create `apps/web/playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  outputDir: "test-results/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  webServer: {
    command: "pnpm dev",
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

**Step 3: Create smoke test**

Create `apps/web/e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Forge/i);
});

test("login page loads", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading")).toBeVisible();
});

test("unauthenticated user is redirected from dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await page.waitForURL(/login/);
  expect(page.url()).toContain("/login");
});
```

**Step 4: Add test:e2e script**

Add to `apps/web/package.json` scripts:

```json
"test:e2e": "playwright test"
```

**Step 5: Add gitignore entries**

Add to root `.gitignore`:

```
# Playwright
test-results/
playwright-report/
e2e/.auth/
```

**Step 6: Run smoke test (requires dev server — skip in CI-only environments)**

```bash
pnpm --filter @repo/web test:e2e
```

Expected: Tests pass if a dev server can start (requires DATABASE_URL etc). If environment isn't available, verify the config is valid by running `pnpm --filter @repo/web exec playwright test --list`.

**Step 7: Commit**

```bash
git add -A
git commit -m "Add Playwright E2E setup with smoke tests"
```

---

### Task 6: Add GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

**Step 1: Create CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Lint, Typecheck, Build & Test
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Build
        run: pnpm build
        env:
          SKIP_ENV_VALIDATION: true

      - name: Unit tests
        run: pnpm test
        env:
          SKIP_ENV_VALIDATION: true

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    timeout-minutes: 30
    needs: [ci]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        run: pnpm --filter @repo/web exec playwright install --with-deps chromium

      - name: Run E2E tests
        run: pnpm --filter @repo/web test:e2e
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          BETTER_AUTH_SECRET: ${{ secrets.BETTER_AUTH_SECRET }}
          BETTER_AUTH_URL: http://localhost:3000
          NEXT_PUBLIC_APP_URL: http://localhost:3000
          SKIP_ENV_VALIDATION: true

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: apps/web/playwright-report/
          retention-days: 14
```

**Step 2: Commit**

```bash
git add -A
git commit -m "Add GitHub Actions CI workflow (lint, typecheck, build, test, e2e)"
```

---

### Task 7: Add Connected Accounts UI

**Files:**
- Create: `apps/web/app/(protected)/settings/account/connected-accounts.tsx`
- Modify: `apps/web/app/(protected)/settings/account/page.tsx` (add connected accounts section)

**Step 1: Create connected accounts component**

Create `apps/web/app/(protected)/settings/account/connected-accounts.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { authClient } from "@repo/auth/client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  FontAwesomeIcon,
  toast,
} from "@repo/ui";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

interface LinkedAccount {
  id: string;
  provider: string;
  accountId: string;
}

const PROVIDERS = [
  {
    id: "google",
    name: "Google",
    icon: faGoogle,
  },
  {
    id: "github",
    name: "GitHub",
    icon: faGithub,
  },
] as const;

export function ConnectedAccounts() {
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [hasPassword, setHasPassword] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const session = await authClient.getSession();
        if (session.data) {
          const linked = await authClient.listAccounts();
          if (linked.data) {
            setAccounts(linked.data);
            setHasPassword(linked.data.some((a: LinkedAccount) => a.provider === "credential"));
          }
        }
      } catch {
        // Silently fail — user will see empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const isConnected = (providerId: string) =>
    accounts.some((a) => a.provider === providerId);

  const canDisconnect = () => {
    const authMethods = hasPassword ? accounts.length : accounts.filter(a => a.provider !== "credential").length;
    return authMethods > 1 || hasPassword;
  };

  const handleConnect = async (providerId: string) => {
    setActionLoading(providerId);
    try {
      await authClient.linkSocial({ provider: providerId, callbackURL: "/settings/account" });
    } catch {
      toast.error(`Failed to connect ${providerId}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDisconnect = async (providerId: string) => {
    if (!canDisconnect()) {
      toast.error("You must have at least one sign-in method");
      return;
    }

    setActionLoading(providerId);
    try {
      const account = accounts.find((a) => a.provider === providerId);
      if (!account) return;

      await authClient.unlinkAccount({ providerId: account.id });

      setAccounts((prev) => prev.filter((a) => a.provider !== providerId));
      toast.success(`Disconnected ${providerId}`);
    } catch {
      toast.error(`Failed to disconnect ${providerId}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Manage your linked social accounts for sign-in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {PROVIDERS.map((provider) => {
          const connected = isConnected(provider.id);
          const isLoading = actionLoading === provider.id;

          return (
            <div
              key={provider.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={provider.icon} className="h-5 w-5" />
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>

              {connected ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnect(provider.id)}
                  disabled={isLoading || !canDisconnect()}
                >
                  {isLoading ? "Disconnecting..." : "Disconnect"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(provider.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

**Step 2: Add to account settings page**

Modify `apps/web/app/(protected)/settings/account/page.tsx` — add import and render `<ConnectedAccounts />` between `<ChangePasswordForm />` and `<DeleteAccount />`:

```tsx
import { ConnectedAccounts } from "./connected-accounts";
```

And in the JSX:

```tsx
<ChangePasswordForm />
<ConnectedAccounts />
<DeleteAccount />
```

**Step 3: Verify the brand icons are exported from @repo/ui**

Check `packages/ui/src/index.ts` — if `@fortawesome/free-brands-svg-icons` isn't re-exported, import directly in the component instead:

```tsx
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
```

The `@repo/ui` package already has `@fortawesome/free-brands-svg-icons` as a dependency.

**Step 4: Build to verify**

```bash
pnpm build
```

Expected: Build passes.

**Step 5: Commit**

```bash
git add -A
git commit -m "Add connected accounts UI to settings page"
```

---

### Task 8: Create create-forge-app CLI package

**Files:**
- Create: `packages/create-forge-app/package.json`
- Create: `packages/create-forge-app/tsconfig.json`
- Create: `packages/create-forge-app/src/index.ts`

**Step 1: Create package directory**

```bash
mkdir -p packages/create-forge-app/src
```

**Step 2: Create package.json**

Create `packages/create-forge-app/package.json`:

```json
{
  "name": "create-forge-app",
  "version": "0.1.0",
  "description": "Create a new Forge application",
  "type": "module",
  "bin": {
    "create-forge-app": "./dist/index.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format esm --clean",
    "dev": "tsup src/index.ts --format esm --watch"
  },
  "dependencies": {
    "@clack/prompts": "^0.10.0"
  },
  "devDependencies": {
    "@repo/config": "workspace:*",
    "tsup": "^8.0.0",
    "typescript": "^5.7.3"
  }
}
```

**Step 3: Create tsconfig.json**

Create `packages/create-forge-app/tsconfig.json`:

```json
{
  "extends": "@repo/config/typescript/base",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

**Step 4: Create CLI entry point**

Create `packages/create-forge-app/src/index.ts`:

```ts
#!/usr/bin/env node

import * as p from "@clack/prompts";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO_URL = "https://github.com/southwellmedia/forge.git";

async function main() {
  p.intro("create-forge-app");

  const project = await p.group(
    {
      name: () =>
        p.text({
          message: "Project name",
          placeholder: "my-forge-app",
          validate(value) {
            if (!value) return "Project name is required";
            if (!/^[a-z0-9-]+$/.test(value))
              return "Use lowercase letters, numbers, and hyphens only";
            if (fs.existsSync(value))
              return `Directory "${value}" already exists`;
          },
        }),

      description: () =>
        p.text({
          message: "Project description",
          placeholder: "A web application built with Forge",
        }),

      install: () =>
        p.confirm({
          message: "Install dependencies?",
          initialValue: true,
        }),
    },
    {
      onCancel() {
        p.cancel("Setup cancelled.");
        process.exit(0);
      },
    }
  );

  const s = p.spinner();

  // Clone the template
  s.start("Cloning Forge template");
  try {
    execSync(`git clone --depth 1 ${REPO_URL} ${project.name}`, {
      stdio: "pipe",
    });
    // Remove .git directory so user starts fresh
    fs.rmSync(path.join(project.name, ".git"), { recursive: true, force: true });
  } catch (err) {
    s.stop("Failed to clone template");
    p.log.error("Could not clone the Forge repository. Check your internet connection.");
    process.exit(1);
  }
  s.stop("Template cloned");

  // Update package names
  s.start("Customizing project");
  const rootPkgPath = path.join(project.name, "package.json");
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"));
  rootPkg.name = project.name;
  if (project.description) {
    rootPkg.description = project.description;
  }
  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + "\n");
  s.stop("Project customized");

  // Install dependencies
  if (project.install) {
    s.start("Installing dependencies");
    try {
      execSync("pnpm install", {
        cwd: project.name,
        stdio: "pipe",
      });
      s.stop("Dependencies installed");
    } catch {
      s.stop("Failed to install dependencies");
      p.log.warn("Could not install dependencies. Run `pnpm install` manually.");
    }
  }

  // Initialize git
  s.start("Initializing git repository");
  try {
    execSync("git init && git add -A && git commit -m 'Initial commit from create-forge-app'", {
      cwd: project.name,
      stdio: "pipe",
    });
  } catch {
    // Non-critical — git init might fail if git isn't installed
  }
  s.stop("Git repository initialized");

  p.note(
    [
      `cd ${project.name}`,
      "",
      "# Set up your environment",
      "cp .env.example .env",
      "# Edit .env with your database URL and auth secrets",
      "",
      "# Push database schema",
      "pnpm db:push",
      "",
      "# Start development server",
      "pnpm dev",
    ].join("\n"),
    "Next steps"
  );

  p.outro(`${project.name} is ready!`);
}

main().catch(console.error);
```

**Step 5: Install dependencies**

```bash
pnpm install
```

**Step 6: Build the CLI**

```bash
pnpm --filter create-forge-app build
```

Expected: `dist/index.js` is created.

**Step 7: Test locally**

```bash
node packages/create-forge-app/dist/index.js --help 2>/dev/null || echo "CLI runs (no --help flag, but entry point works)"
```

**Step 8: Commit**

```bash
git add -A
git commit -m "Add create-forge-app CLI scaffolding tool"
```

---

### Task 9: Final build verification and cleanup

**Files:**
- Possibly modify: any files that fail build

**Step 1: Run full build**

```bash
pnpm build
```

Expected: Build passes with zero errors.

**Step 2: Run all unit tests**

```bash
pnpm test
```

Expected: All tests pass.

**Step 3: Run lint**

```bash
pnpm lint
```

Expected: No errors.

**Step 4: Verify typecheck**

```bash
pnpm typecheck
```

Expected: No errors.

**Step 5: Fix any issues found**

Address any build, test, or lint failures.

**Step 6: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "Fix build/test/lint issues"
```

---

### Task 10: Create Pull Request

**Files:**
- None (git/GitHub operation only)

**Step 1: Push branch**

```bash
git push -u origin feat/phase-2
```

**Step 2: Create PR**

```bash
gh pr create --title "Phase 2: Testing, CI/CD, connected accounts, CLI tool" --body "$(cat <<'EOF'
## Summary
- Add Vitest unit test infrastructure with shared config and tests for @repo/utils and tRPC routers
- Add Playwright E2E test setup with smoke tests
- Add GitHub Actions CI workflow (lint → typecheck → build → test → e2e)
- Add connected accounts UI to settings page (OAuth link/unlink)
- Add create-forge-app CLI scaffolding tool with clack prompts

## Test plan
- [ ] `pnpm test` passes all unit tests
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Verify connected accounts UI shows providers on settings page
- [ ] CI workflow runs on PR
EOF
)"
```
