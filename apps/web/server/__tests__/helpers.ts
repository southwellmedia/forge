import { vi } from "vitest";

// Mock modules that have side effects or unavailable dependencies at import time.
// @repo/auth/dal imports next/headers (not available in vitest).
// @repo/db tries to connect to a database via DATABASE_URL.
vi.mock("@repo/auth/dal", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

vi.mock("@repo/db", () => ({
  getDb: vi.fn().mockReturnValue({}),
}));

import { appRouter } from "../routers/index";
import { createCallerFactory, type TRPCContext } from "../trpc";

export function createMockDb() {
  return {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as TRPCContext["db"];
}

export function createMockSession(
  overrides: Partial<NonNullable<TRPCContext["session"]>> = {}
): NonNullable<TRPCContext["session"]> {
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

export function createTestContext(
  overrides: Partial<TRPCContext> = {}
): TRPCContext {
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
