import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("https://www.apple.com/apple-intelligence/", {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

  // Check background color
  const bgColor = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });

  // Check text color
  const textColor = await page.evaluate(() => {
    return window.getComputedStyle(document.body).color;
  });

  // Check hero section
  const heroInfo = await page.evaluate(() => {
    const hero = document.querySelector('[data-component-list="Hero"]') || 
                 document.querySelector('section') ||
                 document.querySelector('.hero');
    if (hero) {
      return {
        bg: window.getComputedStyle(hero).backgroundColor,
        color: window.getComputedStyle(hero).color,
      };
    }
    return null;
  });

  // Check first heading
  const headingInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (h1) {
      return {
        text: h1.textContent,
        color: window.getComputedStyle(h1).color,
        bg: window.getComputedStyle(h1).backgroundColor,
      };
    }
    return null;
  });

  // Get all computed styles for body and html
  const htmlInfo = await page.evaluate(() => {
    return {
      htmlBg: window.getComputedStyle(document.documentElement).backgroundColor,
      htmlColor: window.getComputedStyle(document.documentElement).color,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      bodyColor: window.getComputedStyle(document.body).color,
    };
  });

  console.log("Theme Analysis:");
  console.log("Body BG:", bgColor);
  console.log("Body Color:", textColor);
  console.log("HTML Info:", JSON.stringify(htmlInfo, null, 2));
  console.log("Hero Info:", JSON.stringify(heroInfo, null, 2));
  console.log("Heading Info:", JSON.stringify(headingInfo, null, 2));

  // Take screenshots
  await page.screenshot({ path: "e2e/references/apple-theme-check-viewport.png" });
  await page.screenshot({ path: "e2e/references/apple-theme-check-full.png", fullPage: true });

  // Scroll down and capture more
  for (let i = 0; i < 5; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 900);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `e2e/references/apple-theme-check-scroll-${i}.png` });
  }

  await browser.close();
})();
