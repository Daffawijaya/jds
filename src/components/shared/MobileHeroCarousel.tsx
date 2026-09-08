"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Clapperboard,
  Code2,
  Lightbulb,
  Pause,
  Play,
  Users,
  Workflow,
} from "lucide-react";

const slides = [
  {
    eyebrow: "Transformasi digital",
    title: "Masa depan digital, dibangun hari ini.",
    description:
      "Bangun sistem, digitalkan alur kerja, dan siapkan tenaga ahli profesional dalam satu kemitraan.",
    offer: "Solusi terukur untuk instansi dan bisnis di Kalimantan Timur.",
    cta: "Mulai proyek",
    href: "/contact",
    image: "/bggggg.png",
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
    tab: "Multimedia",
    icon: Clapperboard,
    iconClassName: "bg-fuchsia-600",
  },
];

const AUTOPLAY_MS = 5200;

export default function MobileHeroCarousel({ companyName }: { companyName: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

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
    setActive(index);
    centerTab(index);
  }, [centerTab]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  useEffect(() => {
    centerTab(active);
  }, [active, centerTab]);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden md:h-[100svh] md:min-h-[100svh]">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(.42,0,0,1)] motion-reduce:transition-none ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/70" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1310px] flex-col px-5 pb-[168px] pt-[86px] text-white sm:px-4 md:h-full md:min-h-0 md:pb-[112px] md:pt-[116px] lg:px-6">
        <div key={active} className="mobile-hero-copy mt-1 max-w-[350px] -translate-y-2 md:max-w-[640px] md:-translate-y-8">
          <p className="mb-3 text-base font-bold md:mb-5 md:text-lg">{active === 0 ? companyName : slides[active].eyebrow}</p>
          <h1 className="text-[40px] font-black leading-[.98] tracking-[-.025em] md:text-[72px] md:leading-[.96] md:tracking-[-.035em]">
            {slides[active].title}
          </h1>
          <p className="mt-3 text-[17px] font-semibold leading-[1.18] text-white md:mt-6 md:max-w-[560px] md:text-xl md:leading-[1.25]">
            {slides[active].description}
          </p>
          <p className="mt-2 text-[17px] font-semibold leading-[1.18] text-white md:mt-7 md:max-w-[560px] md:text-xl md:leading-[1.25]">
            {slides[active].offer}
          </p>
          <Link
            href={slides[active].href}
            className="mt-7 inline-flex items-center rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-[.98] sm:px-5 md:mt-8"
          >
            {slides[active].cta}
          </Link>
        </div>

        <div className="mt-auto flex items-center justify-between md:justify-start">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Putar carousel" : "Jeda carousel"}
            className="grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm md:hidden"
          >
            {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
          </button>
          <button
            type="button"
            onClick={() => select((active + 1) % slides.length)}
            aria-label="Slide berikutnya"
            className="grid h-12 w-12 place-items-center rounded-xl bg-black/55 text-white backdrop-blur-sm md:hidden"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="absolute inset-x-0 bottom-[72px] z-20 mx-auto flex max-w-[1310px] gap-1 overflow-x-auto bg-black/35 px-1.5 py-1.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-2 md:overflow-visible md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-none lg:px-6"
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon;

          return (
            <button
              key={slide.tab}
              type="button"
              data-hero-tab={index}
              onClick={() => select(index)}
              className={`group relative flex h-14 shrink-0 items-center gap-1.5 rounded-[5px] px-4 font-bold transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(.42,0,0,1)] md:h-[76px] md:min-w-0 md:flex-1 md:flex-col md:items-start md:gap-0 md:px-2 md:pb-3 md:pt-2.5 lg:px-3 ${
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
              {active === index && !paused && (
                <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-b-[5px] bg-black/10">
                  <span key={`${active}-${paused}`} className="mobile-hero-progress block h-full bg-red-600" />
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Putar carousel" : "Jeda carousel"}
          className="hidden h-12 w-12 shrink-0 place-items-center self-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 md:ml-3 md:grid"
        >
          {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
        </button>
      </div>
    </div>
  );
}
