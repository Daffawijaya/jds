"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  ChevronRight,
  Clapperboard,
  Code2,
  Lightbulb,
  Pause,
  Play,
  Users,
  Workflow,
} from "lucide-react";

const slides: {
  eyebrow: string;
  title: string;
  description: string;
  offer: string;
  cta: string;
  href: string;
  image: string;
  video?: string;
  tab: string;
  icon: typeof Workflow;
  iconClassName: string;
}[] = [
  {
    eyebrow: "Transformasi digital",
    title: "Masa depan digital, dibangun hari ini.",
    description:
      "Bangun sistem, digitalkan alur kerja, dan siapkan tenaga ahli profesional dalam satu kemitraan.",
    offer: "Solusi terukur untuk instansi dan bisnis di Kalimantan Timur.",
    cta: "Mulai proyek",
    href: "/contact",
    image: "/bggggg.png",
    video: "/hero-team.mp4",
    tab: "Solusi digital",
    icon: Workflow,
    iconClassName: "bg-red-600",
  },
  {
    eyebrow: "Web & software",
    title: "Sistem yang membuat kerja lebih ringkas.",
    description:
      "Dari website publik hingga aplikasi operasional, kami merancang produk yang jelas dan mudah digunakan.",
    offer: "Dibangun responsif, terintegrasi, dan siap berkembang.",
    cta: "Lihat layanan",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=85",
    video: "https://cdn.pixabay.com/video/2024/02/15/200675-913478706_large.mp4",
    tab: "Web & software",
    icon: Code2,
    iconClassName: "bg-blue-600",
  },
  {
    eyebrow: "Tenaga profesional",
    title: "Tim ahli yang siap bergerak bersama Anda.",
    description:
      "Perkuat program dan proyek dengan talenta profesional yang disiapkan sesuai kebutuhan penugasan.",
    offer: "Dari seleksi, penempatan, hingga pengelolaan kinerja.",
    cta: "Lihat proyek",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    video: "/hero-staff.mp4",
    tab: "Tenaga ahli",
    icon: Users,
    iconClassName: "bg-emerald-600",
  },
  {
    eyebrow: "Konsultasi teknologi",
    title: "Arah teknologi yang lebih jelas.",
    description:
      "Susun arsitektur, prioritas, dan peta jalan digital berdasarkan kebutuhan nyata organisasi Anda.",
    offer: "Keputusan teknologi yang tepat sebelum masuk tahap implementasi.",
    cta: "Konsultasi sekarang",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85",
    video: "/hero-consult.mp4",
    tab: "Konsultasi TI",
    icon: Lightbulb,
    iconClassName: "bg-violet-600",
  },
  {
    eyebrow: "Konten & multimedia",
    title: "Komunikasi digital yang lebih hidup.",
    description:
      "Hadirkan desain, video, dan materi publikasi yang konsisten untuk memperkuat pesan organisasi Anda.",
    offer: "Dari konsep kreatif hingga aset yang siap dipublikasikan.",
    cta: "Lihat layanan",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=85",
    video: "/hero-media.mp4",
    tab: "Multimedia",
    icon: Clapperboard,
    iconClassName: "bg-fuchsia-600",
  },
];

const AUTOPLAY_MS = 5200;

// Easing ala adobe.com: gambar wipe kanan → kiri, teks cepat-ke-lambat.
const ADOBE_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const IMG_MS = 0.8;

// Gambar baru masuk dari kanan menutupi gambar lama (tanpa celah).
const bgVariants: Variants = {
  enter: (dir: number) => ({ x: dir < 0 ? "-100%" : "100%" }),
  center: { x: "0%", transition: { duration: IMG_MS, ease: ADOBE_EASE } },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%",
    transition: { duration: IMG_MS, ease: ADOBE_EASE },
  }),
};

// Zoom halus 1.08 → 1 mengikuti durasi slide.
const imgVariants: Variants = {
  enter: { scale: 1.08 },
  center: { scale: 1, transition: { duration: IMG_MS, ease: ADOBE_EASE } },
  exit: { scale: 1 },
};

const copyParent: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.015 } },
};

const copyChild: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir < 0 ? -56 : 56 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EXPO_EASE } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir < 0 ? 24 : -24,
    transition: { duration: 0.22, ease: "easeIn" },
  }),
};

export default function MobileHeroCarousel({ companyName }: { companyName: string }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const remainingRef = useRef(AUTOPLAY_MS);
  const pausedRef = useRef(false);

  // Aksi ke SEMUA video di hero, bukan satu ref: saat transisi slide,
  // video lama (exit) + baru (enter) sempat mount bareng ~0.8 detik,
  // jadi satu ref bisa menunjuk elemen yang salah / null.
  const forEachVideo = useCallback((fn: (video: HTMLVideoElement) => void) => {
    rootRef.current?.querySelectorAll("video").forEach(fn);
  }, []);

  const togglePaused = useCallback(() => {
    // Saat dijeda: bekukan sisa waktu slide + pause video di tempat.
    if (!pausedRef.current) {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current));
      }
      forEachVideo((video) => video.pause());
    } else {
      // Play langsung di dalam gesture klik (lebih andal di mobile).
      forEachVideo((video) => {
        void video.play().catch(() => {});
      });
    }
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }, [forEachVideo]);

  const centerTab = useCallback((index: number) => {
    const rail = railRef.current;
    const button = railRef.current?.querySelector<HTMLButtonElement>(`[data-hero-tab="${index}"]`);
    if (!rail || !button) return;
    rail.scrollTo({
      left: button.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const select = useCallback((index: number) => {
    const cur = activeRef.current;
    const next = (index + slides.length) % slides.length;
    if (next !== cur) {
      setDirection(
        next === 0 && cur === slides.length - 1
          ? 1
          : next === slides.length - 1 && cur === 0
            ? -1
            : next > cur
              ? 1
              : -1,
      );
      activeRef.current = next;
      remainingRef.current = AUTOPLAY_MS;
      setActive(next);
    }
    centerTab(next);
  }, [centerTab]);

  // Timer autoplay yang bisa dijeda/dilanjut tanpa mengulang dari awal,
  // sinkron dengan progress bar (CSS animation-play-state) dan video.
  useEffect(() => {
    if (paused) {
      // Video slide baru yang mount saat jeda ikut dipause.
      forEachVideo((video) => video.pause());
      return;
    }
    startRef.current = Date.now();
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      remainingRef.current = AUTOPLAY_MS;
      select(activeRef.current + 1);
    }, remainingRef.current);
    forEachVideo((video) => {
      void video.play().catch(() => {});
    });
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [paused, active, select, forEachVideo]);

  // Preload semua gambar hero supaya slide pertama tidak kedip.
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    centerTab(active);
  }, [active, centerTab]);

  return (
    <MotionConfig reducedMotion="user">
    <div ref={rootRef} className="relative h-full min-h-[100svh] w-full overflow-hidden md:min-h-0">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          aria-hidden="true"
          className="absolute inset-0"
        >
          <motion.div variants={imgVariants} className="relative h-full w-full">
            {slides[active].video ? (
              <video
                src={slides[active].video}
                poster={slides[active].image}
                autoPlay={!paused}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={slides[active].image}
                alt=""
                fill
                priority={active === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/70" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1310px] flex-col px-5 pb-[120px] pt-[86px] text-white sm:px-4 md:h-full md:min-h-0 md:pb-[112px] md:pt-[116px] lg:px-6">
        <div className="mt-1 max-w-[350px] -translate-y-2 md:max-w-[640px] md:-translate-y-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={copyParent}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.p
                custom={direction}
                variants={copyChild}
                className="mb-3 text-base font-bold md:mb-5 md:text-lg"
              >
                {active === 0 ? companyName : slides[active].eyebrow}
              </motion.p>
              <motion.h1
                custom={direction}
                variants={copyChild}
                className="text-[40px] font-black leading-[.98] tracking-[-.025em] md:text-[72px] md:leading-[.96] md:tracking-[-.035em]"
              >
                {slides[active].title}
              </motion.h1>
              <motion.p
                custom={direction}
                variants={copyChild}
                className="mt-3 text-[17px] font-semibold leading-[1.18] text-white md:mt-6 md:max-w-[560px] md:text-xl md:leading-[1.25]"
              >
                {slides[active].description}
              </motion.p>
              <motion.p
                custom={direction}
                variants={copyChild}
                className="mt-2 text-[17px] font-semibold leading-[1.18] text-white md:mt-7 md:max-w-[560px] md:text-xl md:leading-[1.25]"
              >
                {slides[active].offer}
              </motion.p>
              <motion.div custom={direction} variants={copyChild}>
                <Link
                  href={slides[active].href}
                  className="mt-7 inline-flex items-center rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-[.98] sm:px-5 md:mt-8"
                >
                  {slides[active].cta}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-auto flex items-center md:justify-start">
          <button
            type="button"
            onClick={togglePaused}
            aria-label={paused ? "Putar carousel" : "Jeda carousel"}
            className="grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm md:hidden"
          >
            {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="absolute inset-x-0 bottom-[144px] z-20 mx-auto flex max-w-[1310px] gap-1 overflow-x-auto bg-black/35 px-1.5 py-1.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:bottom-[144px] md:gap-2 md:overflow-visible md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-none lg:bottom-[72px] lg:px-6"
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;

          return (
            <button
              key={slide.tab}
              type="button"
              data-hero-tab={index}
              onClick={() => select(index)}
              className={`group relative flex h-12 shrink-0 items-center gap-1.5 rounded-[5px] px-3 font-bold transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(.42,0,0,1)] md:h-16 md:min-w-0 md:flex-1 md:flex-col md:items-start md:gap-0 md:px-2 md:pb-2 md:pt-2 ${
                active === index ? "bg-white text-black" : "bg-black/45 text-white hover:bg-black/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded text-white ${slide.iconClassName}`}
              >
                <Icon className="h-3 w-3" strokeWidth={2.25} />
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-1 whitespace-nowrap text-[13px] md:mt-1.5 md:w-full md:flex-none md:text-left md:text-[11px] lg:text-[13px] xl:text-sm">
                {slide.tab}
                <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              {active === index && (
                <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-b-[5px] bg-black/10">
                  <span
                    key={active}
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                    className="mobile-hero-progress block h-full bg-red-600"
                  />
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={togglePaused}
          aria-label={paused ? "Putar carousel" : "Jeda carousel"}
          className="hidden h-12 w-12 shrink-0 place-items-center self-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 md:ml-5 md:grid lg:ml-3"
        >
          {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
        </button>
      </div>
    </div>
    </MotionConfig>
  );
}
