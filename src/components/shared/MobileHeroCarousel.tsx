"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Code2,
  FileText,
  Film,
  Globe,
  Layout,
  Lightbulb,
  Pause,
  Palette,
  Play,
  Server,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";

export type HeroService = {
  id: string;
  title: string;
  short_desc: string | null;
  full_desc: string | null;
  icon_name: string | null;
  image_url: string | null;
  hero_tab_label: string | null;
  hero_eyebrow: string | null;
  hero_title: string | null;
  hero_description: string | null;
  hero_offer: string | null;
  hero_cta_label: string | null;
  hero_cta_href: string | null;
  hero_video_url: string | null;
  hero_icon_class: string | null;
};

const heroIcons: Record<string, LucideIcon> = {
  Globe,
  Code2,
  Smartphone,
  Layout,
  Server,
  Users,
  FileText,
  Film,
  Palette,
  Lightbulb,
};

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

export default function MobileHeroCarousel({
  services,
}: {
  services: HeroService[];
}) {
  const slides = useMemo(
    () =>
      services
        .slice(0, 5)
        .map((service) => ({
          id: service.id,
          eyebrow: service.hero_eyebrow || service.title,
          title: service.hero_title || service.title,
          description: service.hero_description || service.short_desc || "",
          offer: service.hero_offer || service.full_desc || "",
          cta: service.hero_cta_label || "Lihat layanan",
          href: service.hero_cta_href || "/services",
          image: service.image_url || "",
          video: service.hero_video_url || undefined,
          tab: service.hero_tab_label || service.title,
          icon: heroIcons[service.icon_name || ""] || Globe,
          iconClassName: service.hero_icon_class || "bg-zinc-700",
        })),
    [services],
  );
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

  const alignActiveTab = useCallback((index: number) => {
    const rail = railRef.current;
    const button = railRef.current?.querySelector<HTMLButtonElement>(`[data-hero-tab="${index}"]`);
    if (!rail || !button) return;

    // Mobile/tablet: card aktif selalu mengambil anchor kiri container.
    // Desktop menampilkan seluruh card sekaligus sehingga tidak perlu digeser.
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const leftPadding = Number.parseFloat(window.getComputedStyle(rail).paddingLeft) || 0;
    rail.scrollTo({
      left: Math.max(0, button.offsetLeft - leftPadding),
      behavior: "smooth",
    });
  }, []);

  const select = useCallback((index: number) => {
    if (slides.length === 0) return;
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
    alignActiveTab(next);
  }, [alignActiveTab, slides.length]);

  // Timer autoplay yang bisa dijeda/dilanjut tanpa mengulang dari awal,
  // sinkron dengan progress bar (CSS animation-play-state) dan video.
  useEffect(() => {
    if (slides.length === 0) return;
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
  }, [paused, active, select, forEachVideo, slides.length]);

  // Preload semua gambar hero supaya slide pertama tidak kedip.
  useEffect(() => {
    slides.forEach((slide) => {
      if (slide.image) {
        const img = new window.Image();
        img.src = slide.image;
      }
    });
  }, [slides]);

  useEffect(() => {
    alignActiveTab(active);
  }, [active, alignActiveTab]);

  if (slides.length === 0) return null;

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
                autoPlay={!paused}
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={(event) => {
                  if (pausedRef.current) {
                    event.currentTarget.currentTime = 0;
                    event.currentTarget.pause();
                  }
                }}
                aria-hidden="true"
                tabIndex={-1}
                className="h-full w-full object-cover"
              />
            ) : slides[active].image ? (
              <Image
                src={slides[active].image}
                alt=""
                fill
                priority={active === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#070b12]" />
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
                {slides[active].eyebrow}
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

        <div className="mt-auto flex items-center justify-between md:justify-start">
          <button
            type="button"
            onClick={togglePaused}
            aria-label={paused ? "Putar carousel" : "Jeda carousel"}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.42))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-2xl backdrop-saturate-150 md:hidden"
          >
            {paused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3 fill-current" />}
          </button>
          <button
            type="button"
            onClick={() => select(active + 1)}
            aria-label="Slide berikutnya"
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.42))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] hover:border-white/15 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06)_45%,rgba(0,0,0,0.38))] md:hidden"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="absolute inset-x-0 bottom-[144px] z-20 mx-auto flex max-w-[1310px] gap-1 overflow-x-auto px-5 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-4 md:bottom-[144px] md:gap-2 md:py-0 lg:bottom-[72px] lg:overflow-visible lg:px-6"
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;

          return (
            <button
              key={slide.tab}
              type="button"
              data-hero-tab={index}
              onClick={() => select(index)}
              className={`group relative flex h-12 w-[220px] shrink-0 items-center gap-1.5 rounded-[8px] border px-3 font-bold backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,color,transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(.42,0,0,1)] sm:w-[240px] md:h-16 md:w-[260px] md:min-w-0 md:flex-none md:flex-col md:items-start md:gap-0 md:px-2 md:pb-2 md:pt-2 lg:w-auto lg:flex-1 ${
                active === index
                  ? "border-transparent bg-white text-black shadow-none"
                  : "border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(20,20,24,0.36)_48%,rgba(0,0,0,0.54))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_8px_24px_rgba(0,0,0,0.18)] hover:border-white/15 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(20,20,24,0.40)_48%,rgba(0,0,0,0.50))]"
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
                <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-b-[8px] bg-black/10">
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
          className="hidden h-10 w-10 shrink-0 place-items-center self-center rounded-full border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.42))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.24)] backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] hover:border-white/15 hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06)_45%,rgba(0,0,0,0.38))] md:ml-5 md:grid lg:ml-3"
        >
          {paused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3 fill-current" />}
        </button>
        <span
          aria-hidden="true"
          className="h-px w-[calc(100%-220px)] shrink-0 sm:w-[calc(100%-240px)] md:w-[calc(100%-260px)] lg:hidden"
        />
      </div>
    </div>
    </MotionConfig>
  );
}
