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
