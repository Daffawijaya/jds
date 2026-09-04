"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 9 slot selang-seling [2,1,2,1,2,1,2,1,2] supaya tengah selalu punya tetangga kiri-kanan.
// Tengah mulai di slot 3 → tampil "2 1 2". Lompat normalisasi kelipatan 2 tidak terlihat
// karena triple tetangganya identik.
const COUNT = 9;
const START = 3;
const MIN = 2;
const MAX = 6;

const data = [
  {
    img: "/image/etamhub.png",
    alt: "Website etamhub",
    title: "Membangun etamhub, rumah digital UMKM Kutai Kartanegara.",
    lines: ["Dinas Koperasi & UKM Kutai Kartanegara", "Web Development"],
    href: "/projects",
  },
  {
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    alt: "Tenaga ahli pendamping UMKM",
    title: "Menghadirkan tenaga ahli pendamping UMKM yang siap bertugas.",
    lines: ["Dinas Koperasi & UKM Kutai Kartanegara", "Outsourcing"],
    href: "/services",
  },
];

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Slot yang lagi di tengah — cuma slot ini teks + button-nya tampil (fade)
  const [active, setActive] = useState(START);

  const measure = () => {
    const el = trackRef.current!;
    const kids = Array.from(el.children) as HTMLElement[];
    const w = kids[0].offsetWidth;
    const step = kids[1].offsetLeft - kids[0].offsetLeft;
    return { el, kids, pos: (i: number) => kids[i].offsetLeft - (el.clientWidth - w) / 2, step };
  };

  const nearest = () => {
    const { el, kids, step } = measure();
    const base = kids[0].offsetLeft - (el.clientWidth - kids[0].offsetWidth) / 2;
    return Math.max(0, Math.min(kids.length - 1, Math.round((el.scrollLeft - base) / step)));
  };

  const scrollToSlot = (i: number, smooth: boolean) => {
    const { el, pos } = measure();
    el.scrollTo({ left: pos(i), behavior: smooth ? "smooth" : "auto" });
  };

  // Posisi awal: slot 3 (kartu 1) tepat di tengah
  useEffect(() => {
    scrollToSlot(START, false);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const { pos, kids } = measure();
    const target = Math.max(0, Math.min(kids.length - 1, nearest() + dir));
    // Transisi teks langsung mulai saat diklik, jalan bareng animasi slide
    setActive(target);
    el.scrollTo({ left: pos(target), behavior: "smooth" });

    // Looping tak terlihat: kembalikan ke slot setara di area tengah
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let n = target;
      while (n > MAX) n -= 2;
      while (n < MIN) n += 2;
      if (n !== target) {
        scrollToSlot(n, false);
        setActive(n);
      }
    }, 550);
  };

  // Sinkronkan status aktif saat user swipe manual
  const onScroll = () => {
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => setActive(nearest()), 120);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COUNT }, (_, i) => {
          const c = data[(i + 1) % 2];
          const on = i === active;
          return (
            <div
              key={i}
              className="flex w-[calc(100%-1rem)] max-w-[1294px] sm:w-[calc(100%-2rem)] sm:max-w-[1278px] lg:w-[calc(100%-3rem)] lg:max-w-[1262px] shrink-0 snap-center"
            >
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-center min-h-[90vh] p-14 sm:p-18">
                <img
                  src={c.img}
                  alt={c.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
                <div
                  className={`relative z-10 w-1/2 transition-opacity ${
                    on ? "opacity-100 duration-500" : "opacity-0 duration-300"
                  }`}
                >
                  <h4 className="text-white font-extrabold text-4xl sm:text-6xl tracking-tight">
                    {c.title}
                  </h4>
                  <div className="mt-5 mb-6 space-y-1 text-sm font-semibold text-white">
                    {c.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1 bg-white text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors"
                  >
                    Lihat detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Geser ke kiri"
        className="absolute left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Geser ke kanan"
        className="absolute right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
