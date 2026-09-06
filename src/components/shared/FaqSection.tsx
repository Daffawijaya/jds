"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

export function FaqSection({ title, items }: FaqSectionProps) {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <h2 className="mb-10 text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[36px]">
          {title}
        </h2>
        <div className="border-t border-[#9a9a9a]">
          {items.map((faq, index) => {
            const isOpen = openFaqs.includes(index);

            return (
              <div key={faq.question} className="border-b border-[#b7b7b7]">
                <h3>
                  <button
                    id={`faq-trigger-${index}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setOpenFaqs((current) =>
                        current.includes(index)
                          ? current.filter((item) => item !== index)
                          : [...current, index],
                      )
                    }
                    className={`flex min-h-[72px] w-full items-center justify-between gap-6 py-5 pr-5 pl-5 text-left text-base font-bold transition-colors hover:bg-[#f5f5f5] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1473e6] sm:text-lg ${isOpen ? "bg-[#f5f5f5]" : ""}`}
                  >
                    {faq.question}
                    <Plus aria-hidden="true" className={`h-5 w-5 shrink-0 text-black transition-transform motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={!isOpen}
                  className="max-w-[800px] pt-6 pb-6 pl-5 pr-10 text-base leading-relaxed text-[#4f4f4f]"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
