"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  frame,
  cancelFrame,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Building2, MonitorSmartphone } from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";

/* ═══════════════════════════════════════════════════════════════
   FeatureHighlights — meniru blok "Features and Releases /
   Explore what's new" di adobe.com:
   1 card gambar besar berisi 2 panel liquid glass + 3 card di bawah.

   Card besar memakai animasi lebar yang sama dengan ProjectCarousel
   (tanpa card samping): full-bleed saat masih di bawah viewport,
   menyusut mengikuti container saat naik ke tengah layar.
   ═══════════════════════════════════════════════════════════════ */

const highlightCards = [
  {
    title: "Tenaga ahli pendamping UMKM 2026.",
    description:
      "Tenaga ahli IT dan pendamping yang disiapkan, dikelola, dan dilaporkan untuk program pendampingan UMKM.",
    cta: "Lihat program",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    alt: "Pendampingan tenaga ahli UMKM",
  },
  {
    title: "Alur kerja instansi jadi digital.",
    description:
      "Dari pendataan manual ke sistem yang rapi, terpantau, dan mudah digunakan lintas tim.",
    cta: "Pelajari layanan",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    alt: "Digitalisasi alur kerja",
  },
  {
    title: "Tim ahli siap ditempatkan.",
    description:
      "Perkuat proyek Anda dengan tenaga profesional yang siap bertugas sesuai durasi program.",
    cta: "Mulai konsultasi",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    alt: "Tim ahli siap penugasan",
  },
];

const glassPanel =
  "relative overflow-hidden rounded-2xl border border-white/30 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.25)]";
const glassSheen =
  "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent";

/* ═══════════════════════════════════════════════════════════════
   HighlightCardsGrid — 3 card dengan animasi scroll sama seperti
   ServiceCardsReveal: muncul bergeser dari bawah saat scroll.
   ═══════════════════════════════════════════════════════════════ */

const easeOutScroll = (progress: number) =>
  0.25 * progress + 0.75 * (1 - (1 - progress) ** 3);

function HighlightCardsGrid({ cards }: { cards: typeof highlightCards }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.3"],
  });
  const remaining = useTransform(scrollYProgress, (p) => (1 - p) ** 3);
  const y0 = useTransform(remaining, (v) => `${v * 80}%`);
  const y1 = useTransform(remaining, (v) => `${v * 160}%`);
  const y2 = useTransform(remaining, (v) => `${v * 240}%`);
  const offsets = [y0, y1, y2];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          style={{ y: offsets[i % 3] }}
          className="p-4 flex flex-col motion-reduce:transform-none!"
        >
          <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3]">
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h4 className="font-bold text-lg tracking-tight mb-1">{card.title}</h4>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4 flex-1">
            {card.description}
          </p>
          <Link
            href={card.href}
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#1473E6] hover:underline"
          >
            {card.cta}
            <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function FeatureHighlights() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // ── Lebar dinamis saat scroll: full-bleed → sejajar container ──
  // Rentang offset & easing disalin dari ProjectCarousel: mulai saat
  // top card di 95% viewport, selesai di 30% dari bawah (0.3 viewport).
  const { scrollYProgress: progress } = useScroll({
    target: wrapRef,
    offset: ["start 0.95", "start 0.3"],
  });
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

  const pad = useTransform(progress, [0, 1], [0, endPad], { ease: easeOutScroll });
  const width = useMotionTemplate`calc(100% - ${pad}px)`;
  const maxWidth = useTransform(progress, [0, 1], [vw, endMax], { ease: easeOutScroll });
  // Reduced-motion: langsung state akhir, tanpa animasi.
  const cardStyle = reduce
    ? { width: `calc(100% - ${endPad}px)`, maxWidth: endMax }
    : { width, maxWidth };

  // Framer menulis width di fase render; kunci scrollLeft setelahnya,
  // sebelum paint, supaya penyusutan lebar tidak menggeser scroll
  // vertikal halaman (perilaku sama dengan track carousel).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const align = () => {
      const y = window.scrollY;
      if (Math.abs(y - (parseFloat(el.dataset.y || "0") || y)) > 0) {
        window.scrollTo({ top: y });
      }
      el.dataset.y = String(y);
    };
    const schedule = () => frame.postRender(align);
    const unsub = progress.on("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    return () => {
      unsub();
      observer.disconnect();
      cancelFrame(align);
    };
  }, [progress]);

  return (
    // overflow-x-clip: card yang melebihi layar saat full-bleed tidak
    // boleh bikin halaman ikut ke-scroll horizontal.
    <div ref={wrapRef} className="relative overflow-x-clip mb-24">
      {/* ── Card gambar besar + 2 panel liquid glass ── */}
      <motion.div
        style={cardStyle}
        className="relative mx-auto rounded-2xl overflow-hidden shadow-xl min-h-[90vh] flex"
      >
        <img
          src="/image/etamhub.png"
          alt="Platform digital etamhub"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 p-6 sm:p-10">
          {/* Panel glass 1 — pesan utama */}
          <div className={`${glassPanel} max-w-xl p-6 sm:p-8 text-white`}>
            <div className={glassSheen} />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              ✨ Baru rilis · 2026
            </span>
            <h3 className="relative z-10 mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              etamhub: satu pintu UMKM Kutai Kartanegara.
            </h3>
            <p className="relative z-10 mt-2 text-sm sm:text-base text-white/85 leading-relaxed">
              Katalog digital, informasi, dan promosi produk UMKM lokal kini
              terhubung dalam satu platform yang mudah dijelajahi masyarakat.
            </p>
            <Link
              href="/projects"
              className="relative z-10 mt-5 inline-flex items-center gap-1.5 bg-white text-zinc-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors"
            >
              Jelajahi etamhub
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Panel glass 2 — ringkasan fakta */}
          <div className={`${glassPanel} lg:w-80 p-6 text-white shrink-0`}>
            <div className={glassSheen} />
            <p className="relative z-10 text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
              Sorotan Proyek
            </p>
            <ul className="relative z-10 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-bold">Proyek Terverifikasi</span>
                  <span className="block text-white/70 text-xs mt-0.5">
                    Terdokumentasi &amp; terukur
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-bold">Dinas Koperasi &amp; UKM Kukar</span>
                  <span className="block text-white/70 text-xs mt-0.5">
                    Mitra instansi pemerintah daerah
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MonitorSmartphone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-bold">Web Platform &amp; Katalog</span>
                  <span className="block text-white/70 text-xs mt-0.5">
                    Responsif di desktop &amp; ponsel
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ── 3 card di bawahnya (gaya adobe.com) — selalu sejajar container ── */}
      <div className="max-w-[1310px] mx-auto">
        <HighlightCardsGrid cards={highlightCards} />
      </div>
    </div>
  );
}
