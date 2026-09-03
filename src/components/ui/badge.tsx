import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "cyan" | "teal";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-slate-900 text-white border-slate-900",
    secondary:
      "bg-slate-100 text-slate-700 border-slate-200",
    outline:
      "border-slate-300 text-slate-600 bg-transparent",
    cyan:
      "bg-red-50 text-[#eb1000] border-red-200",
    teal:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
