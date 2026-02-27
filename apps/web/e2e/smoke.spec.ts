import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Forge/i);
});

test("login page loads", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading")).toBeVisible();
});

test("unauthenticated user is redirected from dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await page.waitForURL(/login/);
  expect(page.url()).toContain("/login");
});
