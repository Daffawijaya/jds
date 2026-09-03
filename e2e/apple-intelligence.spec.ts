import { test, expect } from "@playwright/test";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

test.describe("Apple Intelligence Page", () => {
  for (const viewport of viewports) {
    test(`captures screenshots at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      await page.goto("/apple-intelligence");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      // Viewport screenshot
      await page.screenshot({
        path: `e2e/references/local-apple-intelligence-${viewport.name}-viewport.png`,
      });

      // Full page screenshot
      await page.screenshot({
        path: `e2e/references/local-apple-intelligence-${viewport.name}-full.png`,
        fullPage: true,
      });

      // Scroll through sections
      const totalHeight = await page.evaluate(() => document.body.scrollHeight);
      const sections = Math.ceil(totalHeight / viewport.height);

      for (let i = 0; i < Math.min(sections, 10); i++) {
        await page.evaluate((y) => window.scrollTo(0, y), i * viewport.height);
        await page.waitForTimeout(300);
        await page.screenshot({
          path: `e2e/references/local-apple-intelligence-${viewport.name}-scroll-${i}.png`,
        });
      }

      console.log(`Captured ${viewport.name}: ${totalHeight}px total height`);
    });
  }

  test("page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/apple-intelligence");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/apple-intelligence");
    await page.waitForLoadState("networkidle");

    // Check nav is visible
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
  });
});
