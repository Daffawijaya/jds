import { test, expect } from "@playwright/test";

test("homepage loads and shows the company hero", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Jaya Dinara Sukses|JDS/i);

  const hero = page.getByRole("heading", { level: 1 });
  await expect(hero).toBeVisible();
  await expect(hero).toContainText("Tenaga Ahli");

  await expect(page.getByRole("link", { name: /Mulai Proyek/i })).toBeVisible();
});

test("navigation links to services and contact pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Mulai Proyek/i }).click();
  await expect(page).toHaveURL(/\/contact$/);
});
