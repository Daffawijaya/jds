import { test, expect } from "@playwright/test";

for (const viewport of [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 390, height: 844 },
]) {
  test(`tetap center & seimbang setiap frame pada ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("[data-slot='3']")).toBeVisible();
    // SSR already contains visible cards; wait for the client carousel to initialize.
    await expect.poll(() => page.locator("[data-slot='3']").evaluate((slot) => {
      const card = slot.getBoundingClientRect();
      const track = slot.parentElement!.getBoundingClientRect();
      return Math.abs(card.left + card.width / 2 - (track.left + track.width / 2));
    })).toBeLessThanOrEqual(1);

    const samples = await page.evaluate(async () => {
      const slots = Array.from(document.querySelectorAll<HTMLElement>("[data-slot]"));
      const track = slots[0].parentElement!;
      // Sample after all rAF callbacks (including Motion's style writes) have run.
      const renderedFrame = () => new Promise<void>((resolve) => {
        requestAnimationFrame(() => setTimeout(resolve, 0));
      });
      await renderedFrame();
      await renderedFrame();
      const docTop = slots[3].getBoundingClientRect().top + window.scrollY;
      const top = docTop - window.innerHeight * 0.97;
      const bottom = docTop - window.innerHeight * 0.28;
      const result: { scrollY: number; centerOff: number; peekDiff: number }[] = [];

      // A wide viewport exercises the substantial full-bleed -> max-width shrink.
      // Sweep down and up without the 50 ms pauses that hid transient bad frames.
      for (const [from, to] of [[top, bottom], [bottom, top]]) {
        for (let step = 0; step <= 48; step++) {
          window.scrollTo({ top: from + (to - from) * step / 48, behavior: "instant" });
          await renderedFrame();
          const viewport = track.getBoundingClientRect();
          // Entrance transforms belong to the cards, not necessarily their slots.
          const cards = [2, 3, 4].map((i) => slots[i].firstElementChild!.getBoundingClientRect());
          const visibleWidth = (rect: DOMRect) => Math.max(
            0, Math.min(rect.right, viewport.right) - Math.max(rect.left, viewport.left),
          );
          result.push({
            scrollY: window.scrollY,
            centerOff: Math.abs(cards[1].left + cards[1].width / 2 - (viewport.left + viewport.width / 2)),
            peekDiff: Math.abs(visibleWidth(cards[0]) - visibleWidth(cards[2])),
          });
        }
      }
      return result;
    });

    const worstCenter = samples.reduce((worst, sample) => sample.centerOff > worst.centerOff ? sample : worst);
    const worstPeek = samples.reduce((worst, sample) => sample.peekDiff > worst.peekDiff ? sample : worst);
    expect(worstCenter.centerOff, JSON.stringify(worstCenter)).toBeLessThanOrEqual(1);
    expect(worstPeek.peekDiff, JSON.stringify(worstPeek)).toBeLessThanOrEqual(2);
  });
}
