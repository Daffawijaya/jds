"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  frame,
  cancelFrame,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

// Sembilan slot menjaga kartu aktif selalu memiliki tetangga kiri-kanan.
// Proyek dari database diulang di dalam slot, lalu dinormalisasi tanpa terlihat.
const COUNT = 9;
const START = 3;
const MIN = 2;
const MAX = 6;

// Turun: cepat lalu melambat. Naik menelusuri kurva yang sama secara terbalik.
// Sisakan kecepatan di ujung agar gerak balik langsung terlihat saat melewati
// batas 70%/80% dari bawah, bukan tertahan di bagian kurva yang nyaris datar.
const easeOutScroll = (progress: number) =>
  0.25 * progress + 0.75 * (1 - (1 - progress) ** 3);

type LatestProject = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  category: string | null;
  year: string | null;
  image_url: string | null;
};

function ProjectCarouselContent({ projects }: { projects: LatestProject[] }) {
  const data = projects.slice(0, 3).map((project) => ({
    img: project.image_url || "/image/bgpur.png",
    alt: project.title,
    title: project.title,
    lines: [project.client, project.category || project.year].filter((line): line is string => Boolean(line)),
    href: "/projects",
  }));
  const itemCount = data.length;
  const itemIndex = (slot: number) => ((slot - START) % itemCount + itemCount) % itemCount;

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Selama animasi tombol berjalan, sinkronisasi swipe diabaikan biar fade tidak keulang
  const animGuard = useRef(0);
  // Kartu yang lagi di tengah — cuma kartu ini teks + button-nya tampil (fade).
  // Dikunci ke kartu (bukan slot) supaya lompat normalisasi loop tak memicu fade ulang.
  const [activeCard, setActiveCard] = useState(0);
  // Slot yang lagi di tengah — buat arah slide kartu samping (kiri/kanan).
  const [centerSlot, setCenterSlot] = useState(START);
  // Swipe manual terakhir (di luar adjust sistem) — recenter mengalah.
  const lastUserH = useRef(0);
  const selfAdjust = useRef<number | null>(null);
  // Slot tengah kanonis. Recenter selalu nempel ke sini — jangan pakai
  // nearest() per-tick karena pembulatan saat lebar berubah bisa flip ke
  // tetangga (carousel kejambak + arah slide samping asimetris).
  const centerRef = useRef(START);

  // ── Lebar dinamis saat scroll: full-bleed → sejajar container ──
  // Mulai saat top carousel di 95% viewport, selesai di 70% dari bawah (0.3 viewport).
  // Slot luar yang dianimasikan (width/maxWidth) supaya tetangga ketarik
  // masuk saat card menyusut; scroll tetap mengikuti slot tengah yang sama.
  const { scrollYProgress: progress } = useScroll({
    target: wrapRef,
    offset: ["start 0.95", "start 0.3"],
  });
  // Posisi mengikuti scroll dengan ease-out, tanpa jeda atau pantulan spring.
  const reduce = useReducedMotion();

  // ── Entrance kartu samping: timing sendiri ──
  // Mulai saat top card menyentuh 30% dari bawah layar (0.7 viewport),
  // selesai saat top card mencapai 80% dari bawah layar (0.2 viewport).
  // Cuma geser horizontal (transform, tanpa layout) supaya measure() & snap aman.
  const { scrollYProgress: sideProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.7", "start 0.2"],
  });
  const sideXL = useTransform(sideProgress, [0, 1], [-120, 0], { ease: easeOutScroll });
  const sideXR = useTransform(sideProgress, [0, 1], [120, 0], { ease: easeOutScroll });

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
  const endPad = bp === 2 ? 48 : bp === 1 ? 32 : 40;
  const endMax = bp === 2 ? 1262 : bp === 1 ? 1278 : 1270;

  const pad = useTransform(progress, [0, 1], [0, endPad], { ease: easeOutScroll });
  const width = useMotionTemplate`calc(100% - ${pad}px)`;
  const maxWidth = useTransform(progress, [0, 1], [vw, endMax], { ease: easeOutScroll });
  const borderRadius = useTransform(progress, [0, 1], ["0px", "16px"], { ease: easeOutScroll });
  // ponytail: reduced-motion langsung state akhir, tambah animasi saat ada kebutuhan
  const innerStyle = reduce
    ? { width: `calc(100% - ${endPad}px)`, maxWidth: endMax }
    : { width, maxWidth };
  const cardRadiusStyle = reduce
    ? { borderRadius: "16px" }
    : { borderRadius };

  // Inset kartu akhir = margin kiri/kanan saat card menyusut.
  // Slot ikut menyusut (bukan cuma inner) supaya kartu tetangga ketarik
  // masuk dan arrow bisa nempel di tepi kartu.
  const cardEnd = Math.min(vw - endPad, endMax);
  // Kunci ke setengah area isi kartu terkecil, setelah padding p-14 / sm:p-18.
  // Lebar hanya berubah saat viewport berubah, bukan saat animasi scroll.
  // Mobile (bp 0): teks full-width, jangan setengah kartu.
  const textWidth = bp === 0 ? "100%" : `calc(${cardEnd / 2}px - 4.5rem)`;
  const endInset = Math.max(0, (vw - cardEnd) / 2);
  const arrowL = useTransform(progress, [0, 1], [40, 40 + endInset], { ease: easeOutScroll });
  const arrowR = useTransform(progress, [0, 1], [40, 40 + endInset], { ease: easeOutScroll });
  // Chevron duduk di card samping (di luar tepi card tengah). Geser sama besar
  // kiri-kanan; dijaga min 8px supaya tidak kepotong viewport saat peek sempit.
  const OUT = 135;
  const arrowLOut = useTransform(arrowL, (v) => Math.max(8, v - OUT));
  const arrowROut = useTransform(arrowR, (v) => Math.max(8, v - OUT));

  const measure = useCallback(() => {
    const el = trackRef.current!;
    const kids = Array.from(el.children) as HTMLElement[];
    const track = el.getBoundingClientRect();
    const first = kids[0].getBoundingClientRect();
    const step = kids[1].getBoundingClientRect().left - first.left;
    const base = el.scrollLeft + first.left - track.left - (el.clientWidth - first.width) / 2;
    return { el, kids, pos: (i: number) => base + i * step, step };
  }, []);

  const nearest = () => {
    const { el, kids, pos, step } = measure();
    return Math.max(0, Math.min(kids.length - 1, Math.round((el.scrollLeft - pos(0)) / step)));
  };

  const scrollToSlot = useCallback((i: number, smooth: boolean) => {
    const { el, pos } = measure();
    el.scrollTo({ left: pos(i), behavior: smooth ? "smooth" : "auto" });
    if (!smooth) selfAdjust.current = el.scrollLeft;
  }, [measure]);

  // Posisi awal: slot 3 (kartu 1) tepat di tengah
  useEffect(() => {
    scrollToSlot(START, false);
  }, [scrollToSlot]);

  // Framer menulis width di fase render. Koreksi setelahnya, sebelum paint,
  // supaya lebar kartu dan scrollLeft selalu berasal dari frame yang sama.
  // Snap dinonaktifkan selama transaksi ini agar browser tidak menarik
  // scrollLeft kembali ke posisi snap dari layout sebelumnya.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const align = () => {
      if (Date.now() >= animGuard.current && Date.now() - lastUserH.current >= 150) {
        scrollToSlot(centerRef.current, false);
      }
      el.style.removeProperty("scroll-snap-type");
    };
    const schedule = () => {
      el.style.scrollSnapType = "none";
      frame.postRender(align);
    };
    const unsub = progress.on("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    schedule();
    return () => {
      unsub();
      observer.disconnect();
      cancelFrame(align);
      el.style.removeProperty("scroll-snap-type");
    };
  }, [progress, reduce, endPad, endMax, vw, scrollToSlot]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const { pos, kids } = measure();
    const target = Math.max(0, Math.min(kids.length - 1, nearest() + dir));
    // Transisi teks langsung mulai saat diklik, jalan bareng animasi slide
    setActiveCard(itemIndex(target));
    centerRef.current = target;
    setCenterSlot(target);
    animGuard.current = Date.now() + 600;
    el.scrollTo({ left: pos(target), behavior: "smooth" });

    // Looping tak terlihat: kembalikan ke slot setara di area tengah
    // (kelipatan jumlah proyek = kartu yang sama, jadi opacity tidak berubah)
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let n = target;
      while (n > MAX) n -= itemCount;
      while (n < MIN) n += itemCount;
      centerRef.current = n;
      setCenterSlot(n);
      // Selalu tempel ulang: pendaratan smooth bisa meleset kalau lebar
      // berubah di tengah animasi (ikut scroll vertikal / layout shift).
      scrollToSlot(n, false);
    }, 550);
  };

  // Sinkronkan status aktif saat user swipe manual
  const onScroll = () => {
    const el = trackRef.current;
    if (!el || Date.now() < animGuard.current) return;
    // Scroll programatik juga mengirim event scroll, kadang terlambat.
    // Bedakan lewat posisi aktual, bukan batas waktu 50 ms yang mudah meleset.
    if (selfAdjust.current !== null && Math.abs(el.scrollLeft - selfAdjust.current) < 1) return;
    selfAdjust.current = null;
    lastUserH.current = Date.now();
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      if (Date.now() < animGuard.current) return;
      const n = nearest();
      setActiveCard(itemIndex(n));
      centerRef.current = n;
      setCenterSlot(n);
    }, 120);
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (syncTimer.current) clearTimeout(syncTimer.current);
  }, []);

  return (
    // overflow-x-clip: tombol yg di-slide keluar tidak boleh bikin halaman
    // ikut ke-scroll horizontal (clip, bukan hidden: hidden malah bikin
    // wrap-nya sendiri jadi scroll container).
    <div ref={wrapRef} className="relative overflow-x-clip">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COUNT }, (_, i) => {
          const cardIndex = itemIndex(i);
          const c = data[cardIndex];
          const on = cardIndex === activeCard;
          return (
            <motion.div
              key={i}
              data-slot={i}
              style={innerStyle}
              className="flex w-full shrink-0 snap-center"
            >
              <motion.div
                style={{ x: on || reduce ? 0 : i < centerSlot ? sideXL : sideXR, ...cardRadiusStyle }}
                className="relative w-full shrink-0 overflow-hidden shadow-sm flex flex-col justify-end sm:justify-center min-h-[75svh] sm:min-h-[90vh] p-6 sm:p-18"
              >
                {/* Isi kartu dengan skala proporsional; kelebihan gambar terpotong dari tengah. */}
                <img
                  src={c.img}
                  alt={c.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
                <div
                  style={{ width: textWidth }}
                  className={`relative z-10 w-full sm:w-auto sm:max-w-[50%] transition-opacity ${
                    on ? "opacity-100 duration-500" : "opacity-0 duration-200"
                  }`}
                  data-text="carousel-text"
                >
                  <h4 className="text-white font-extrabold text-3xl sm:text-6xl tracking-tight">
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
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <motion.button
        type="button"
        onClick={() => go(-1)}
        aria-label="Geser ke kiri"
        style={reduce ? { left: Math.max(8, 40 + endInset - OUT) } : { left: arrowLOut, x: sideXL }}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-zinc-900 hidden lg:flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        type="button"
        onClick={() => go(1)}
        aria-label="Geser ke kanan"
        style={reduce ? { right: Math.max(8, 40 + endInset - OUT) } : { right: arrowROut, x: sideXR }}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-zinc-900 hidden lg:flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

export default function ProjectCarousel({ projects }: { projects: LatestProject[] }) {
  if (projects.length === 0) return null;
  return <ProjectCarouselContent projects={projects} />;
}
