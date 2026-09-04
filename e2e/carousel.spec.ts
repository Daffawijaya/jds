import { test, expect } from "@playwright/test";

// Regresi: teks carousel hanya boleh tampil di 1 kartu dalam satu waktu,
// termasuk saat loop panjang 1 → 2 → 1 → 2 → 1 (lewat lompat normalisasi).
test("teks tunggal saat loop 1-2-1-2-1", async ({ page }) => {
  await page.goto("/");
  const next = page.getByRole("button", { name: "Geser ke kanan" });
  await expect(next).toBeVisible();
  await next.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Hanya slot yang benar-benar terlihat di viewport yang dihitung
  // (slot di luar layar ter-clip overflow, opacity-nya tidak relevan)
  const visibleOpacities = () =>
    page.$$eval("[data-slot]", (slots) => {
      const track = slots[0].parentElement!.getBoundingClientRect();
      return slots
        .map((s) => {
          const r = (s as HTMLElement).getBoundingClientRect();
          const t = s.querySelector("[data-text]") as HTMLElement | null;
          const seen = r.left < track.right - 2 && r.right > track.left + 2;
          return seen && t ? parseFloat(getComputedStyle(t).opacity) : 0;
        })
        .filter((o) => o > 0);
    });

  const violations: number[][] = [];
  for (let c = 0; c < 4; c++) {
    await next.click(); // 1→2→1→2→1
    for (let k = 0; k < 8; k++) {
      await page.waitForTimeout(100);
      const row = await visibleOpacities();
      // Lewati 300ms pertama tiap klik (toleransi fade-out)
      if (k >= 3 && row.filter((o) => o > 0.1).length > 1) violations.push(row);
    }
  }
  expect(violations).toEqual([]);
});
