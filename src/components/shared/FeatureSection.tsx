import Link from "next/link";

interface FeatureSectionProps {
  image: string;
  imageAlt: string;
  badge: string;
  badgeColor?: string;
  title: string;
  description: string;
  button?: { label: string; href: string };
  imagePosition?: "left" | "right";
}

export function FeatureSection({
  image,
  imageAlt,
  badge,
  badgeColor = "bg-red-500 text-white",
  title,
  description,
  button,
  imagePosition = "left",
}: FeatureSectionProps) {
  const isReversed = imagePosition === "right";

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className={`w-full md:w-1/2 flex ${isReversed ? "md:order-2 justify-end" : "md:order-1"}`}>
          <img src={image} alt={imageAlt} className="block w-5/6" />
        </div>
        {/* Text */}
        <div className={`w-full md:w-1/2 flex flex-col items-start ${isReversed ? "md:order-1" : "md:order-2"}`}>
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 mb-4">
            <span
              className={`w-5 h-5 rounded-sm flex items-center justify-center text-[10px] ${badgeColor}`}
            >
              {badge.slice(0, 2).toUpperCase()}
            </span>
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">{title}</h2>
          <p className="text-gray-600 mb-6 text-base">{description}</p>
          {button && (
            <Link
              href={button.href}
              className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors"
            >
              {button.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
