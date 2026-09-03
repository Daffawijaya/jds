import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("captures screenshots at desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "e2e/references/local-homepage-viewport.png",
    });

    await page.screenshot({
      path: "e2e/references/local-homepage-full.png",
      fullPage: true,
    });
  });

  test("page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });
});
