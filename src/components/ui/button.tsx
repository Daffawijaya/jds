import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-slate-900 text-white hover:bg-slate-700 border border-slate-900 shadow-sm",
      accent:
        "bg-[#eb1000] text-white hover:bg-[#c20d00] border border-[#eb1000] shadow-sm shadow-red-600/20",
      outline:
        "border border-slate-300 bg-white text-slate-800 hover:border-slate-900 hover:text-slate-950 hover:bg-slate-50",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
      ghost:
        "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
      link:
        "text-[#eb1000] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      default: "h-10 px-6 py-2",
      sm: "h-9 rounded-full px-4 text-xs",
      lg: "h-12 rounded-full px-8 text-base font-bold",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
