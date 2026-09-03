"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badgeText,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl mb-12 sm:mb-16 ${alignClass}`}
    >
      {badgeText && (
        <Badge variant="cyan" className="mb-4 text-xs font-semibold uppercase tracking-wider">
          {badgeText}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
