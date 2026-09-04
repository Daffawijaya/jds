"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const scrollKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const isScrollLocked = () => Number(document.body.getAttribute("data-scroll-locked")) > 0;

    const syncScrollLock = () => {
      if (isScrollLocked()) lenis?.stop();
      else lenis?.start();
    };

    const setup = () => {
      lenis?.destroy();
      lenis = undefined;
      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        duration: 1.15,
        lerp: 0,
        easing: (progress) => 1 - (1 - progress) ** 3,
        smoothWheel: true,
        syncTouch: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        anchors: true,
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
        prevent: (node) => node.getAttribute("role") === "dialog",
        // Swipe horizontal carousel dan Shift+wheel tetap ditangani browser.
        virtualScroll: ({ deltaX, deltaY, event }) =>
          !event.shiftKey && Math.abs(deltaY) >= Math.abs(deltaX),
      });
      syncScrollLock();
    };

    // Keyboard, klik, dan navigasi boleh memutus momentum tanpa mengubah posisinya.
    const interrupt = () => {
      if (lenis && !lenis.isStopped) {
        lenis.scrollTo(window.scrollY, { immediate: true });
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) interrupt();
    };

    setup();
    reducedMotion.addEventListener("change", setup);
    // Radix mengunci body ketika menu/dialog dibuka; hentikan juga momentum yang tersisa.
    const observer = new MutationObserver(syncScrollLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("popstate", interrupt);

    return () => {
      reducedMotion.removeEventListener("change", setup);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("popstate", interrupt);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
