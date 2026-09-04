"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imgUmkm = "/image/etamhub.png";

// 9 slot selang-seling [2,1,2,1,2,1,2,1,2] supaya tengah selalu punya tetangga kiri-kanan.
// Tengah mulai di slot 3 → tampil "2 1 2". Lompat normalisasi kelipatan 2 tidak terlihat
// karena triple tetangganya identik.
const COUNT = 9;
const START = 3;
const MIN = 2;
const MAX = 6;

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cards = [
    <div
      key="pendampingan"
      className="relative flex-1 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-center min-h-[90vh] p-8 sm:p-10"
    >
      <img
        src={imgUmkm}
        alt="Pendampingan tenaga ahli UMKM"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
      <div className="relative z-10 w-1/2">
        <h4 className="text-white font-extrabold text-4xl sm:text-6xl tracking-tight">
          Membangun etamhub, rumah digital UMKM Kutai Kartanegara.
        </h4>
        <div className="mt-5 mb-6 space-y-1 text-sm font-semibold text-white">
          <p>Dinas Koperasi &amp; UKM Kutai Kartanegara</p>
          <p>Web Development</p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 bg-white text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Lihat detail
        </Link>
      </div>
    </div>,
    <div
      key="integrasi"
      className="relative flex-1 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-center min-h-[90vh] p-8 sm:p-10"
    >
      <img
        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80"
        alt="Tenaga ahli pendamping UMKM"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
      <div className="relative z-10 w-1/2">
        <h4 className="text-white font-extrabold text-4xl sm:text-6xl tracking-tight">
          Menghadirkan tenaga ahli pendamping UMKM yang siap bertugas.
        </h4>
        <div className="mt-5 mb-6 space-y-1 text-sm font-semibold text-white">
          <p>Dinas Koperasi &amp; UKM Kutai Kartanegara</p>
          <p>Outsourcing</p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 bg-white text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Lihat detail
        </Link>
      </div>
    </div>,
  ];

  const measure = () => {
    const el = trackRef.current!;
    const kids = Array.from(el.children) as HTMLElement[];
    const w = kids[0].offsetWidth;
    const step = kids[1].offsetLeft - kids[0].offsetLeft;
    return { el, kids, pos: (i: number) => kids[i].offsetLeft - (el.clientWidth - w) / 2, step };
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
    const { kids, pos, step } = measure();
    const base = kids[0].offsetLeft - (el.clientWidth - kids[0].offsetWidth) / 2;
    const current = Math.max(
      0,
      Math.min(kids.length - 1, Math.round((el.scrollLeft - base) / step))
    );
    const target = Math.max(0, Math.min(kids.length - 1, current + dir));
    el.scrollTo({ left: pos(target), behavior: "smooth" });

    // Looping tak terlihat: kembalikan ke slot setara di area tengah
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let n = target;
      while (n > MAX) n -= 2;
      while (n < MIN) n += 2;
      if (n !== target) scrollToSlot(n, false);
    }, 550);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COUNT }, (_, i) => (
          <div key={i} className="flex w-[calc(100%-1rem)] max-w-[1294px] sm:w-[calc(100%-2rem)] sm:max-w-[1278px] lg:w-[calc(100%-3rem)] lg:max-w-[1262px] shrink-0 snap-center">
            {cards[(i + 1) % 2]}
          </div>
        ))}
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
