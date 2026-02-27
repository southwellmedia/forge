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
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
} as const;

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
] as const;

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.SETTINGS] as const;

export const DEFAULT_REDIRECT_AFTER_LOGIN = ROUTES.DASHBOARD;
export const DEFAULT_REDIRECT_AFTER_LOGOUT = ROUTES.HOME;
