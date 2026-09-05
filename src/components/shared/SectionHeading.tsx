interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badgeText,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-12 ${alignClass} ${className}`}>
      {badgeText && (
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-2">
          {badgeText}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-black text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
