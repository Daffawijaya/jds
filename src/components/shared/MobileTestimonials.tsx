"use client";

import Link from "next/link";

type Testimonial = {
  id: string | number;
  name: string;
  role: string;
  title: string;
  quote: string;
  image_url?: string | null;
};

export default function MobileTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="md:hidden">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.id}
            className="relative min-h-[520px] w-[calc(100vw-46px)] shrink-0 snap-center overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white"
          >
            <img
              src={testimonial.image_url || (index % 2 === 0 ? "/image/bgg.jpg" : "/bggggg.png")}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <div className="relative z-10 flex h-full min-h-[472px] flex-col justify-end">
              <blockquote className="text-[28px] font-black leading-[1.05] tracking-[-.02em]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-base font-bold">{testimonial.name}</p>
              <p className="text-sm font-semibold text-white/80">{testimonial.role}</p>
              <Link
                href="/projects"
                className="mt-7 w-fit rounded-full bg-white px-6 py-3 text-sm font-bold text-black"
              >
                Lihat studi kasus
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
