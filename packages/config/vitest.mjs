import { defineConfig } from "vitest/config";

/** @param {Record<string, unknown>} overrides */
export function createVitestConfig(overrides = {}) {
  return defineConfig({
    test: {
      globals: true,
      clearMocks: true,
      restoreMocks: true,
      ...overrides,
    },
  });
}
