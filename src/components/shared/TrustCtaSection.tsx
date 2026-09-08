import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface CtaAction {
  label: string;
  href: string;
  external?: boolean;
}

interface TrustCtaSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  className?: string;
}

export function TrustCtaSection({ eyebrow, title, description, primaryAction, secondaryAction, className }: TrustCtaSectionProps) {
  return (
    <section className={cn("bg-[#191919] py-14 sm:py-20 text-white", className)}>
      <div className="mx-auto max-w-[1310px] px-5 text-center sm:px-4 lg:px-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        <p className="mx-auto mb-12 mt-2 max-w-2xl text-gray-400">{description}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CtaLink action={primaryAction} primary />
          {secondaryAction && <CtaLink action={secondaryAction} />}
        </div>
      </div>
    </section>
  );
}

function CtaLink({ action, primary = false }: { action: CtaAction; primary?: boolean }) {
  const className = primary
    ? "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#1473E6] px-8 py-3 text-base sm:text-lg font-semibold text-white transition-colors hover:bg-blue-700"
    : "inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-gray-500 px-8 py-3 text-base sm:text-lg font-semibold text-white transition-colors hover:bg-gray-800";
  const content = <>{action.label}{primary && <ArrowRight className="h-4 w-4" />}</>;

  return action.external ? (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
  ) : (
    <Link href={action.href} className={className}>{content}</Link>
  );
}
