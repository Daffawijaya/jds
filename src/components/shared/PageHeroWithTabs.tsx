"use client";

import { type ReactNode } from "react";

export interface Tab {
  key: string;
  label: string;
}

interface PageHeroWithTabsProps {
  /** Hero title, e.g. "Layanan JDS." */
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
      <section className="relative text-center py-20 md:py-28 min-h-[280px] md:min-h-[380px] text-zinc-900 bg-white overflow-hidden">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-screen left-1/2 -translate-x-1/2 object-cover h-full"
        />
        <div className="relative max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          {heroExtra && <div className="mb-8">{heroExtra}</div>}
        </div>
      </section>

      {/* Tab kategori — di luar hero, di atas konten */}
      <div className="bg-white">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 pt-16">
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-500">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`transition-colors border-b-[4px] ${
                  activeTab === tab.key
                    ? "text-black border-[#1473E6] pb-2"
                    : "text-gray-500 border-transparent hover:text-black pb-2"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="-mt-px border-t border-gray-400" />
      </div>
    </>
  );
}
