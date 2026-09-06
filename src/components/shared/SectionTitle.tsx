import Link from "next/link";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  button?: { label: string; href: string };
}

export function SectionTitle({
  title,
  subtitle,
  className = "",
  button,
}: SectionTitleProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold text-zinc-900 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-black text-lg max-w-2xl mx-auto mb-0">
          {subtitle}
        </p>
      )}
      {button && (
        <Link
          href={button.href}
          className="inline-block mt-6 border-2 border-black text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors"
        >
          {button.label}
        </Link>
      )}
    </div>
  );
}
