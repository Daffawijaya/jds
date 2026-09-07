import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageIntroProps {
  label: string;
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  align?: "left" | "center";
  titleClassName?: string;
  descriptionClassName?: string;
}

export function PageIntro({
  label,
  title,
  description,
  icon,
  align = "left",
  titleClassName,
  descriptionClassName,
}: PageIntroProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "flex flex-col items-center text-center")}>
      <div className={cn("mb-5 flex items-center text-lg font-bold", icon ? "gap-3" : "gap-0")}>
        {icon}
        <span>{label}</span>
      </div>
      <h1
        className={cn(
          "text-4xl font-bold leading-[1.25] tracking-[-0.03em] sm:text-[2.5rem] lg:text-[2.75rem]",
          titleClassName,
        )}
      >
        {title}
      </h1>
      <p className={cn("mt-5 text-lg leading-7 text-[#3f3f3f]", descriptionClassName)}>{description}</p>
    </div>
  );
}
