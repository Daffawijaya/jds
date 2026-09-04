"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Compensate half the page movement; measure the stationary outer section.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative z-0 -mt-[72px] overflow-hidden bg-[#070b12] text-white">
      <motion.div
        style={{ y: reduceMotion ? 0 : y }}
        className="relative flex min-h-[104vh] items-center motion-reduce:transform-none!"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-10 bg-black"
        />
      </motion.div>
    </section>
  );
}
