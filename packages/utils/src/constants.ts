export const APP_NAME = "Forge";
export const APP_DESCRIPTION = "Production-ready Next.js monorepo boilerplate";

export const ROLES = ["user", "admin"] as const;
export type Role = (typeof ROLES)[number];
export const ROLE_USER: Role = "user";
export const ROLE_ADMIN: Role = "admin";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  SETTINGS: "/settings",
} as const;

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
] as const;

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.PROJECTS, ROUTES.SETTINGS] as const;

export const DEFAULT_REDIRECT_AFTER_LOGIN = ROUTES.DASHBOARD;
export const DEFAULT_REDIRECT_AFTER_LOGOUT = ROUTES.HOME;

export const PROJECT_STATUSES = ["active", "archived", "completed"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
