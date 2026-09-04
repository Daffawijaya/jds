"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FooterBrand({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Reveal from behind the information panel at 25% of its scroll speed.
  // Settle into the original position at the bottom of the page.
  const y = useTransform(scrollYProgress, [0, 1], ["-75%", "0%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative -z-10 overflow-hidden select-none"
    >
      <motion.div style={{ y }} className="overflow-hidden motion-reduce:transform-none!">
        {children}
      </motion.div>
    </div>
  );
}
