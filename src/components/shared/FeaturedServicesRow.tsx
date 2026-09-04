"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function FeaturedServicesRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.5"],
  });
  const offsetPercent = useTransform(scrollYProgress, [0, 1], [20, 0], {
    ease: (progress) => progress * progress * (3 - 2 * progress),
  });
  const x = useTransform(offsetPercent, (value) => `${value}%`);
  // Fade mengikuti posisi kartu: transparan di 20%, penuh mulai dari 15%.
  const opacity = useTransform(offsetPercent, [15, 20], [1, 0], {
    ease: (progress) => progress * progress * (3 - 2 * progress),
  });

  return (
    // Ukur posisi wrapper yang tetap; hanya deretan kartu di dalamnya yang bergerak.
    <div ref={ref} className="relative">
      <motion.div
        style={{ x: reduceMotion ? 0 : x, opacity: reduceMotion ? 1 : opacity }}
        className="card-row grid grid-cols-1 sm:grid-cols-2 gap-2 text-left lg:flex motion-reduce:opacity-100!"
      >
        {children}
      </motion.div>
    </div>
  );
}
