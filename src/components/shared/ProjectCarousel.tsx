"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Selama animasi tombol berjalan, sinkronisasi swipe diabaikan biar fade tidak keulang
  const animGuard = useRef(0);
  // Kartu yang lagi di tengah (0/1) — cuma kartu ini teks + button-nya tampil (fade).
  // Dikunci ke kartu (bukan slot) supaya lompat normalisasi loop tak memicu fade ulang.
  const [activeCard, setActiveCard] = useState(0);
  // Swipe manual terakhir (di luar adjust sistem) — recenter mengalah.
  const lastUserH = useRef(0);
  const selfAdjust = useRef(0);

  // ── Lebar dinamis saat scroll: full-bleed → sejajar container ──
  // Mulai saat top carousel di 95% viewport, selesai saat di 50% (tengah layar).
  // Slot luar yang dianimasikan (width/maxWidth) supaya tetangga ketarik
  // masuk saat card menyusut; scroll ditempel ulang ke slot terdekat.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.95", "start 0.5"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6 });
  const reduce = useReducedMotion();

  // Inset & cap akhir mengikuti container (px-2/px-4/px-6 + max-w 1310).
  const [bp, setBp] = useState(0);
  const [vw, setVw] = useState(1920);
  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setBp(mqLg.matches ? 2 : mqSm.matches ? 1 : 0);
      setVw(window.innerWidth);
    };
    update();
    mqSm.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mqSm.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const endPad = bp === 2 ? 48 : bp === 1 ? 32 : 16;
  const endMax = bp === 2 ? 1262 : bp === 1 ? 1278 : 1294;

  const pad = useTransform(smooth, [0, 1], [0, endPad]);
  const width = useMotionTemplate`calc(100% - ${pad}px)`;
  const maxWidth = useTransform(smooth, [0, 1], [vw, endMax]);
  // ponytail: reduced-motion langsung state akhir, tambah animasi saat ada kebutuhan
  const innerStyle = reduce
    ? { width: `calc(100% - ${endPad}px)`, maxWidth: endMax }
    : { width, maxWidth };

  // Inset kartu akhir = margin kiri/kanan saat card menyusut.
  // Slot ikut menyusut (bukan cuma inner) supaya kartu tetangga ketarik
  // masuk dan arrow bisa nempel di tepi kartu.
  const cardEnd = Math.min(vw - endPad, endMax);
  const endInset = Math.max(0, (vw - cardEnd) / 2);
  const arrowL = useTransform(smooth, [0, 1], [40, 40 + endInset]);
  const arrowR = useTransform(smooth, [0, 1], [40, 40 + endInset]);

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

  // Slot menyusut saat scroll vertikal → posisi snap-center drift.
  // Tempel terus ke slot terdekat biar kartu tetangga ngikut geser smooth.
  useEffect(() => {
    const unsub = smooth.on("change", () => {
      const el = trackRef.current;
      if (!el || !el.children.length) return;
      // Jangan rebut scroll horizontal yang lagi jalan (animasi tombol / swipe)
      if (Date.now() < animGuard.current) return;
      if (Date.now() - lastUserH.current < 150) return;
      const idx = nearest();
      const { pos } = measure();
      const target = pos(idx);
      if (Math.abs(el.scrollLeft - target) > 1) {
        selfAdjust.current = Date.now();
        el.scrollTo({ left: target });
      }
    });
    return unsub;
  }, [smooth]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const { pos, kids } = measure();
    const target = Math.max(0, Math.min(kids.length - 1, nearest() + dir));
    // Transisi teks langsung mulai saat diklik, jalan bareng animasi slide
    setActiveCard((target + 1) % 2);
    animGuard.current = Date.now() + 600;
    el.scrollTo({ left: pos(target), behavior: "smooth" });

    // Looping tak terlihat: kembalikan ke slot setara di area tengah
    // (±2 slot = kartu yang sama, jadi opacity tidak berubah)
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let n = target;
      while (n > MAX) n -= 2;
      while (n < MIN) n += 2;
      if (n !== target) scrollToSlot(n, false);
    }, 550);
  };

  // Sinkronkan status aktif saat user swipe manual
  const onScroll = () => {
    if (Date.now() - selfAdjust.current > 50) lastUserH.current = Date.now();
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      if (Date.now() < animGuard.current) return;
      setActiveCard((nearest() + 1) % 2);
    }, 120);
  };

  return (
    <div ref={wrapRef} className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COUNT }, (_, i) => {
          const c = data[(i + 1) % 2];
          const on = (i + 1) % 2 === activeCard;
          return (
            <motion.div
              key={i}
              data-slot={i}
              style={innerStyle}
              className="flex w-full shrink-0 snap-center"
            >
              <div className="relative w-full shrink-0 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-center min-h-[90vh] p-14 sm:p-18">
                <img
                  src={c.img}
                  alt={c.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
                <div
                  className={`relative z-10 w-1/2 transition-opacity ${
                    on ? "opacity-100 duration-500" : "opacity-0 duration-200"
                  }`}
                  data-text="carousel-text"
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
            </motion.div>
          );
        })}
      </div>
      <motion.button
        type="button"
        onClick={() => go(-1)}
        aria-label="Geser ke kiri"
        style={reduce ? { left: 40 + endInset } : { left: arrowL }}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        type="button"
        onClick={() => go(1)}
        aria-label="Geser ke kanan"
        style={reduce ? { right: 40 + endInset } : { right: arrowR }}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
