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
