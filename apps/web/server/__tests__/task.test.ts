import { describe, it, expect } from "vitest";
import { createTestContext, createCaller } from "./helpers";

describe("task router", () => {
  describe("listByProject", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.task.listByProject({ projectId: "p-1" })
      ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    });
  });

  describe("create", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.task.create({ projectId: "p-1", title: "Test" })
      ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    });
  });
});
