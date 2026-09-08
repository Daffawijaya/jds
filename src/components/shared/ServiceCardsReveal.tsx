"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ServiceCardsReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.3"],
  });
  const remaining = useTransform(scrollYProgress, (progress) => (1 - progress) ** 3);
  const leftY = useTransform(remaining, (value) => `${value * (mobile ? 14 : 80)}%`);
  const middleY = useTransform(remaining, (value) => `${value * (mobile ? 20 : 160)}%`);
  const rightY = useTransform(remaining, (value) => `${value * (mobile ? 26 : 240)}%`);
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
