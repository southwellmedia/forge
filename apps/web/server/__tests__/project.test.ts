import { describe, it, expect } from "vitest";
import { TRPCError } from "@trpc/server";
import { createTestContext, createCaller } from "./helpers";

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
