import { describe, it, expect } from "vitest";
import { createTestContext, createCaller } from "./helpers";

describe("project router", () => {
  describe("list", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(caller.project.list()).rejects.toMatchObject({
        code: "UNAUTHORIZED",
      });
    });
  });

  describe("create", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.project.create({ name: "Test" })
      ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    });
  });

  describe("delete", () => {
    it("throws UNAUTHORIZED when no session", async () => {
      const ctx = createTestContext({ session: null });
      const caller = createCaller(ctx);
      await expect(
        caller.project.delete({ id: "project-1" })
      ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    });
  });
});
