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
import { ShieldCheck, Building2, Star } from "lucide-react";
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
  "relative overflow-hidden border border-white/30 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.25)]";
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
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.3"],
  });
  const remaining = useTransform(scrollYProgress, (p) => (1 - p) ** 3);
  const y0 = useTransform(remaining, (v) => `${v * (mobile ? 10 : 80)}%`);
  const y1 = useTransform(remaining, (v) => `${v * (mobile ? 16 : 160)}%`);
  const y2 = useTransform(remaining, (v) => `${v * (mobile ? 22 : 240)}%`);
  const offsets = [y0, y1, y2];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-6 mt-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          style={{ y: offsets[i % 3] }}
          className="flex flex-col motion-reduce:transform-none!"
        >
          <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="px-4 pt-2 pb-4">
            <h4 className="font-bold text-2xl tracking-tight mb-1">{card.title}</h4>
            <p className="text-sm text-zinc-600 leading-relaxed mb-4 flex-1">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="group inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:underline"
            >
              {card.cta}
              <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
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
  const endPad = bp === 2 ? 48 : bp === 1 ? 32 : 40;
  const endMax = bp === 2 ? 1262 : bp === 1 ? 1278 : 1270;

  const pad = useTransform(progress, [0, 1], [0, endPad], { ease: easeOutScroll });
  const width = useMotionTemplate`calc(100% - ${pad}px)`;
  const maxWidth = useTransform(progress, [0, 1], [vw, endMax], { ease: easeOutScroll });
  const borderRadius = useTransform(progress, [0, 1], ["0px", "16px"], { ease: easeOutScroll });
  // Reduced-motion: langsung state akhir, tanpa animasi.
  const cardStyle = reduce
    ? { width: `calc(100% - ${endPad}px)`, maxWidth: endMax, borderRadius: "16px" }
    : { width, maxWidth, borderRadius };

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
    <div ref={wrapRef} className="relative overflow-x-clip mb-16 sm:mb-24">
      {/* ── Card gambar besar + 2 panel liquid glass ── */}
      <motion.div
        style={cardStyle}
        className="relative mx-auto overflow-hidden shadow-xl flex aspect-[4/3] lg:aspect-auto lg:min-h-[90vh]"
      >
        <img
          src="/image/etamhub.png"
          alt="Platform digital etamhub"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Satu grup chip, kiri-tengah di mobile/tablet; dipecah lagi di desktop. */}
          <div className="flex flex-col items-start gap-2 lg:contents">
          {/* Panel glass 1 — label rilis, sekecil chip tab hero adobe.com (~40px). */}
          <div className={`${glassPanel} rounded-2xl inline-flex items-center gap-1.5 py-1 pl-1 pr-2.5 text-white lg:gap-3 lg:self-start lg:py-3 lg:pl-3 lg:pr-5`}>
            <div className={glassSheen} />
            <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-white lg:h-9 lg:w-9">
              <Star className="h-3 w-3 lg:h-4 lg:w-4" />
            </span>
            <span className="relative z-10 text-xs font-normal whitespace-nowrap lg:text-sm">
              Baru rilis · etamhub 2026
            </span>
          </div>

          {/* Panel glass 2 — ringkasan fakta, lebar mengikuti konten. */}
          <div className={`${glassPanel} rounded-md p-3 text-white shrink-0 lg:w-80 lg:rounded-2xl lg:p-6`}>
            <div className={glassSheen} />
            <ul className="relative z-10 space-y-2 text-xs lg:space-y-4 lg:text-sm">
              <li className="flex items-start gap-2 lg:gap-3">
                <ShieldCheck className="w-3 h-3 mt-0.5 shrink-0 lg:w-4 lg:h-4" />
                <span>
                  <span className="block font-bold">Proyek Terverifikasi</span>
                  <span className="block text-white/70 text-[10px] mt-0.5 lg:text-xs">
                    Terdokumentasi &amp; terukur
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2 lg:gap-3">
                <Building2 className="w-3 h-3 mt-0.5 shrink-0 lg:w-4 lg:h-4" />
                <span>
                  <span className="block font-bold">Dinas Koperasi &amp; UKM Kukar</span>
                  <span className="block text-white/70 text-[10px] mt-0.5 lg:text-xs">
                    Mitra instansi pemerintah daerah
                  </span>
                </span>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </motion.div>

      {/* ── Text bar di bawah big card ── */}
      <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6 mt-4 mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0 sm:gap-4">
        <div className="max-w-full sm:max-w-[40%] px-4 pt-2 pb-4">
          <h3 className="font-bold text-2xl tracking-tight mb-1 text-zinc-900">
            Wujudkan akses pasar digital untuk UMKM lokal melalui etamhub.
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            Satu platform untuk katalog, profil usaha, dan promosi produk UMKM.
          </p>
        </div>
        <Link
          href="/projects"
          className="group shrink-0 inline-flex items-center gap-1 px-4 sm:px-0 text-sm font-semibold text-zinc-900 hover:underline"
        >
          Pelajari lebih lanjut
          <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ── 3 card di bawahnya (gaya adobe.com) — selalu sejajar container ── */}
      <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6">
        <HighlightCardsGrid cards={highlightCards} />
      </div>
    </div>
  );
}
