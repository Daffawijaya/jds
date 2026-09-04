"use client";

import { Children, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ServiceCardsReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.3"],
  });
  const remaining = useTransform(scrollYProgress, (progress) => (1 - progress) ** 3);
  const leftY = useTransform(remaining, (value) => `${value * 80}%`);
  const middleY = useTransform(remaining, (value) => `${value * 160}%`);
  const rightY = useTransform(remaining, (value) => `${value * 240}%`);
  const offsets = [leftY, middleY, rightY];

  return (
    <div ref={ref} className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          style={{ y: offsets[index % 3] }}
          className="flex min-w-0 flex-col [&>*]:flex-1 motion-reduce:transform-none!"
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
