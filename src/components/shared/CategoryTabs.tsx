"use client";

import { cn } from "@/lib/utils";

interface CategoryTab<T extends string> {
  key: T;
  label: string;
}

interface CategoryTabsProps<T extends string> {
  tabs: readonly CategoryTab<T>[];
  activeTab: T;
  onTabChange: (key: T) => void;
  ariaLabel: string;
  className?: string;
  contentClassName?: string;
}

export function CategoryTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  ariaLabel,
  className,
  contentClassName,
}: CategoryTabsProps<T>) {
  return (
    <div
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2 border-b border-[#dadada] bg-white",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-[1310px] px-5 sm:px-8", contentClassName)}>
        <div
          className="-mb-px flex overflow-x-auto sm:justify-center"
          role="tablist"
          aria-label={ariaLabel}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.key)}
                className={cn(
                  "relative shrink-0 px-5 py-4 text-sm font-bold transition-colors sm:px-7",
                  isActive ? "text-[#2c2c2c]" : "text-black/55 hover:text-[#2c2c2c]",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-[#3b63fb] transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
