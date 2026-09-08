"use client";

import { type ReactNode } from "react";
import { PageIntro } from "@/components/shared/PageIntro";
import { CategoryTabs } from "@/components/shared/CategoryTabs";

export interface Tab {
  key: string;
  label: string;
}

interface PageHeroWithTabsProps {
  /** Small page label displayed above the title. */
  label: string;
  /** Main hero title. */
  title: ReactNode;
  /** Hero subtitle/description */
  description: ReactNode;
  /** Background image path, e.g. "/image/bgpur.png" */
  bgImage: string;
  /** Optional extra content below description but above tabs (e.g. a CTA button) */
  heroExtra?: ReactNode;
  /** Category tabs */
  tabs: Tab[];
  /** Currently active tab key */
  activeTab: string;
  /** Callback when a tab is clicked */
  onTabChange: (key: string) => void;
}

export default function PageHeroWithTabs({
  label,
  title,
  description,
  bgImage,
  heroExtra,
  tabs,
  activeTab,
  onTabChange,
}: PageHeroWithTabsProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-center py-14 sm:py-20 md:py-28 min-h-[280px] md:min-h-[380px] text-zinc-900 bg-white overflow-hidden">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-screen left-1/2 -translate-x-1/2 object-cover h-full"
        />
        <div className="relative max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <PageIntro
            label={label}
            title={title}
            description={description}
            align="center"
            titleClassName="max-w-[820px]"
            descriptionClassName="max-w-[680px]"
          />
          {heroExtra && <div className="mb-8">{heroExtra}</div>}
        </div>
      </section>

      {/* Tab kategori — di luar hero, di atas konten */}
      <CategoryTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        ariaLabel="Filter kategori"
        className="pt-12 sm:pt-16"
      />
    </>
  );
}
