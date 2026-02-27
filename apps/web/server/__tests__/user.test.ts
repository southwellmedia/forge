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
