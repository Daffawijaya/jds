import { chromium } from "playwright";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to Apple Intelligence page
  await page.goto("https://www.apple.com/apple-intelligence/", {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  // Wait for content to load
  await page.waitForTimeout(3000);

  for (const viewport of viewports) {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    // Wait for layout to settle
    await page.waitForTimeout(1000);

    // Capture full page screenshot
    await page.screenshot({
      path: `e2e/references/apple-intelligence-${viewport.name}-full.png`,
      fullPage: true,
    });

    // Capture viewport screenshot
    await page.screenshot({
      path: `e2e/references/apple-intelligence-${viewport.name}-viewport.png`,
    });

    // Scroll through the page and capture sections
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const sectionCount = Math.ceil(totalHeight / viewport.height);

    for (let i = 0; i < Math.min(sectionCount, 10); i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * viewport.height);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `e2e/references/apple-intelligence-${viewport.name}-scroll-${i}.png`,
      });
    }

    console.log(`Captured ${viewport.name}: ${totalHeight}px total height, ${sectionCount} sections`);
  }

  // Get page structure info
  const pageInfo = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("section, div[class]"));
    const info = {
      title: document.title,
      totalHeight: document.body.scrollHeight,
      sections: sections.slice(0, 30).map((el) => ({
        tag: el.tagName,
        className: el.className?.toString().substring(0, 100),
        height: el.getBoundingClientRect().height,
        top: el.getBoundingClientRect().top,
      })),
    };
    return info;
  });

  console.log("Page info:", JSON.stringify(pageInfo, null, 2));

  await browser.close();
})();
