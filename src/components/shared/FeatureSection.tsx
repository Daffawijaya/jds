import Link from "next/link";

interface FeatureSectionProps {
  image: string;
  imageAlt: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  description: string;
  button?: { label: string; href?: string; onClick?: () => void };
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
    <section className="py-12 sm:py-20 overflow-hidden">
      <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        {/* Image */}
        <div className={`w-full md:w-1/2 flex ${isReversed ? "md:order-2 justify-end" : "md:order-1"}`}>
          <img src={image} alt={imageAlt} className="block w-full sm:w-5/6 aspect-video object-cover rounded-xl md:rounded-none" />
        </div>
        {/* Text */}
        <div className={`w-full md:w-1/2 flex flex-col items-start ${isReversed ? "md:order-1" : "md:order-2"}`}>
          {badge && (
            <p className="text-2xl font-semibold text-black mb-4">{badge}</p>
          )}
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 leading-tight">{title}</h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">{description}</p>
          {button && (
            button.onClick ? (
              <button
                onClick={button.onClick}
                className="border-2 border-black text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors"
              >
                {button.label}
              </button>
            ) : (
              <Link
                href={button.href || "#"}
                className="border-2 border-black text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors"
              >
                {button.label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
