import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });

  // Check homepage
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  
  const homeBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  const homeColor = await page.evaluate(() => window.getComputedStyle(document.body).color);
  console.log("Homepage - BG:", homeBg, "Color:", homeColor);
  
  await page.screenshot({ path: "e2e/references/theme-check-home.png" });

  // Check apple-intelligence
  await page.goto("http://localhost:3000/apple-intelligence", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  
  const aiBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  const aiColor = await page.evaluate(() => window.getComputedStyle(document.body).color);
  console.log("Apple Intelligence - BG:", aiBg, "Color:", aiColor);
  
  await page.screenshot({ path: "e2e/references/theme-check-apple.png" });

  // Check for any white text elements
  const whiteTextElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const whiteTexts: string[] = [];
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bg = style.backgroundColor;
      if (color === "rgb(255, 255, 255)" && bg !== "rgb(0, 0, 0)" && bg !== "rgba(0, 0, 0, 0)") {
        whiteTexts.push(`${el.tagName}.${el.className?.toString().substring(0, 50)} - bg: ${bg}`);
      }
    });
    return whiteTexts.slice(0, 10);
  });
  
  console.log("White text elements on Apple Intelligence page:", whiteTextElements);

  await browser.close();
})();
