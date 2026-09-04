import { test, expect, type Page } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 720 } });

async function openHome(page: Page) {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("html")).toHaveClass(/\blenis\b/);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.mouse.move(20, 400);
}

// Sample a rendered animation frame, not a timer that may run before rAF catches
// up after main-thread work; keep timestamps in-browser to avoid runner latency.
async function sampleScroll(page: Page, times: number[]) {
  return page.evaluate(async (times) => {
    const start = performance.now();
    const samples: { time: number; y: number }[] = [];
    for (const time of times) {
      await new Promise((resolve) => setTimeout(resolve, Math.max(0, time - (performance.now() - start))));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      samples.push({ time: performance.now() - start, y: window.scrollY });
    }
    return samples;
  }, times);
}

test("wheel continues after input, decelerates, and comes to rest", async ({ page }) => {
  await openHome(page);
  await page.mouse.wheel(0, 800);
  const samples = await sampleScroll(page, [100, 300, 550, 800, 1150, 1350]);
  const speeds = samples.slice(1, 4).map((sample, i) => (
    (sample.y - samples[i].y) / (sample.time - samples[i].time)
  ));

  expect(samples[0].y).toBeGreaterThan(0);
  for (let i = 1; i < samples.length; i++) expect(samples[i].y).toBeGreaterThanOrEqual(samples[i - 1].y);
  expect(samples[1].y - samples[0].y, JSON.stringify(samples)).toBeGreaterThan(40);
  expect(speeds[1], JSON.stringify(samples)).toBeLessThan(speeds[0] * 0.85);
  expect(speeds[2], JSON.stringify(samples)).toBeLessThan(speeds[1] * 0.85);
  expect(Math.abs(samples[5].y - samples[4].y), JSON.stringify(samples)).toBeLessThanOrEqual(2);
  expect(samples[5].y).toBeGreaterThanOrEqual(790);
  expect(samples[5].y).toBeLessThanOrEqual(810);
});

test("horizontal wheel keeps the carousel's native scrolling and centered snap", async ({ page }) => {
  await openHome(page);
  await page.locator("[data-slot='3']").evaluate((slot) => {
    window.scrollTo({ top: slot.getBoundingClientRect().top + window.scrollY - 80, behavior: "instant" });
  });
  const track = page.locator("[data-slot='3']").locator("..");
  await expect.poll(() => page.locator("[data-slot='3']").evaluate((slot) => {
    const card = slot.getBoundingClientRect();
    return Math.abs(card.left + card.width / 2 - window.innerWidth / 2);
  })).toBeLessThanOrEqual(1);
  // Finish the scroll-driven width change before starting an independent gesture.
  await page.waitForTimeout(100);
  const before = await track.evaluate((el) => ({ x: el.scrollLeft, y: window.scrollY }));
  await page.mouse.move(640, 400);
  await page.mouse.wheel(1600, 0);
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before.x + 100);
  await expect.poll(() => track.evaluate((el) => {
    const bounds = el.getBoundingClientRect();
    return Math.min(...Array.from(el.children, (slot) => {
      const card = slot.getBoundingClientRect();
      return Math.abs(card.left + card.width / 2 - (bounds.left + bounds.width / 2));
    }));
  })).toBeLessThanOrEqual(1);
  expect(await track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before.x + 100);
  expect(Math.abs(await page.evaluate(() => window.scrollY) - before.y)).toBeLessThanOrEqual(2);
});

test("opening the mobile menu stops momentum and closing it restores scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(100);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Buka Menu" }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  const locked = await page.evaluate(() => window.scrollY);
  await page.mouse.move(10, 400);
  await page.mouse.wheel(0, 400);
  const samples = await sampleScroll(page, [100, 400]);
  for (const sample of samples) expect(Math.abs(sample.y - locked)).toBeLessThanOrEqual(2);

  await menu.getByRole("button", { name: "Close", exact: true }).click();
  await expect(menu).not.toBeVisible();
  await page.mouse.move(20, 400);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(locked + 20);
});

test("keyboard and page navigation interrupt the previous wheel momentum", async ({ page }) => {
  await openHome(page);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(100);
  await page.keyboard.press("Home");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(2);
  const afterHome = await sampleScroll(page, [100, 350]);
  for (const sample of afterHome) expect(sample.y).toBeLessThanOrEqual(2);

  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(100);
  await page.locator("header nav").getByRole("link", { name: "Layanan", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("html")).toHaveClass(/\blenis\b/);
  const afterNavigation = await sampleScroll(page, [150, 500]);
  expect(Math.abs(afterNavigation[1].y - afterNavigation[0].y), JSON.stringify(afterNavigation)).toBeLessThanOrEqual(2);
});

test("reduced motion switches to native scrolling and cancels lingering movement", async ({ page }) => {
  await openHome(page);
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(100);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/\blenis\b/);
  const stopped = await sampleScroll(page, [100, 350]);
  expect(Math.abs(stopped[1].y - stopped[0].y)).toBeLessThanOrEqual(2);

  await page.mouse.wheel(0, 300);
  const native = await sampleScroll(page, [150, 400]);
  expect(native[0].y).toBeGreaterThan(stopped[1].y + 100);
  expect(Math.abs(native[1].y - native[0].y)).toBeLessThanOrEqual(2);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/\blenis\b/);
  await page.mouse.wheel(0, 400);
  const resumed = await sampleScroll(page, [100, 300]);
  expect(resumed[1].y - resumed[0].y).toBeGreaterThan(20);
});
