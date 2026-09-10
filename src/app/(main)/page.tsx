import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import {
  Globe,
  Code2,
  Layout,
  Cpu,
  Lightbulb,
  Server,
  Users,
  Film,
  FileText,
  Palette,
  Smartphone,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";
import { getLatestProjects, getServices, getTestimonials } from "@/lib/supabase-server";
import ProjectCarousel from "@/components/shared/ProjectCarousel";
import { FeatureHighlights } from "@/components/shared/FeatureHighlights";
import FeaturedServicesRow from "@/components/shared/FeaturedServicesRow";
import ParallaxHero from "@/components/shared/ParallaxHero";
import RevealServices from "@/components/shared/RevealServices";
import ServiceCardsReveal from "@/components/shared/ServiceCardsReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import MobileHeroCarousel from "@/components/shared/MobileHeroCarousel";

/* ═══════════════════════════════════════════════════════════════
   Homepage JDS — layout & styling mengikuti halaman /adobe-demo
   Stack: Next.js App Router + Tailwind
   ═══════════════════════════════════════════════════════════════ */

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-3 h-3" />,
  Code2: <Code2 className="w-3 h-3" />,
  Layout: <Layout className="w-3 h-3" />,
  Cpu: <Cpu className="w-3 h-3" />,
  Lightbulb: <Lightbulb className="w-3 h-3" />,
  Server: <Server className="w-3 h-3" />,
  Users: <Users className="w-3 h-3" />,
  Film: <Film className="w-3 h-3" />,
  FileText: <FileText className="w-3 h-3" />,
  Palette: <Palette className="w-3 h-3" />,
  Smartphone: <Smartphone className="w-3 h-3" />,
};

const iconMapLg: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Layout: <Layout className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Lightbulb: <Lightbulb className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Film: <Film className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
};

// Warna transparan untuk kartu gelap (katalog layanan)
const darkChip: Record<string, string> = {
  development: "bg-cyan-500/15 text-cyan-300",
  solutions: "bg-teal-500/15 text-teal-300",
  consulting: "bg-violet-500/15 text-violet-300",
  outsourcing: "bg-amber-500/15 text-amber-300",
  media: "bg-fuchsia-500/15 text-fuchsia-300",
  platform: "bg-violet-500/15 text-violet-300",
  workforce: "bg-emerald-500/15 text-emerald-300",
  administration: "bg-slate-500/15 text-slate-300",
};

const outcomeCards = [
  {
    id: "streamlined-work",
    label: "Proses kerja",
    title: "Pekerjaan masih manual.",
    description: "Aktivitas berulang menghabiskan waktu dan sulit dipantau.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
    iconName: "Cpu",
    chipClass: "bg-teal-600",
  },
  {
    id: "connected-data",
    label: "Pengelolaan data",
    title: "Data tersebar di banyak tempat.",
    description: "Informasi penting tidak selalu tersedia ketika dibutuhkan.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    iconName: "Server",
    chipClass: "bg-cyan-600",
  },
  {
    id: "accessible-services",
    label: "Akses layanan",
    title: "Layanan sulit digunakan.",
    description: "Alur yang rumit dapat menghambat pengguna dan petugas.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85",
    iconName: "Layout",
    chipClass: "bg-violet-600",
  },
  {
    id: "project-ready-team",
    label: "Kapasitas pelaksana",
    title: "Kapasitas tim terbatas.",
    description: "Program membutuhkan tenaga tambahan dengan kompetensi yang tepat.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85",
    iconName: "Users",
    chipClass: "bg-amber-500",
  },
  {
    id: "consistent-communication",
    label: "Komunikasi visual",
    title: "Pesan belum konsisten.",
    description: "Materi publikasi belum memiliki arah visual yang seragam.",
    image:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=85",
    iconName: "Lightbulb",
    chipClass: "bg-fuchsia-600",
  },
] as const;

export default async function HomePage() {
  const [servicesData, testimonialsData, latestProjects] = await Promise.all([
    getServices(),
    getTestimonials(),
    getLatestProjects(3),
  ]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <ParallaxHero>
        <MobileHeroCarousel services={servicesData} />
      </ParallaxHero>

      {/* 2. HASIL UNTUK MITRA */}
      <section className="featured-sec relative z-10 -mt-8 rounded-t-[32px] bg-white pt-12 pb-6 text-zinc-900 sm:pt-20 lg:pb-20">
        <div className="row-wrap px-5 sm:px-4 lg:px-6 text-center">
          <SectionHeading
            title="Apa yang sedang menghambat pekerjaan Anda?"
            subtitle="Kami membantu organisasi menyelesaikan hambatan operasional, teknologi, tenaga kerja, dan komunikasi."
            titleClassName="text-[28px] sm:text-[42px]"
            className="mb-12"
          />

          <FeaturedServicesRow>
            {outcomeCards.map((outcome) => (
              <div
                key={outcome.id}
                className="mobile-outcome-card bg-zinc-100 rounded-2xl overflow-hidden min-w-0 group relative flex flex-col justify-between transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black hover:shadow-lg lg:flex-1 lg:hover:flex-[1.35]"
              >
                <div className="outcome-card-header px-4 py-5 flex items-center gap-2 text-sm font-bold">
                  <span
                    className={`outcome-card-icon w-5 h-5 ${outcome.chipClass} rounded flex items-center justify-center text-white`}
                  >
                    {iconMap[outcome.iconName]}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-white">
                    {outcome.label}
                  </span>
                </div>
                <div className="card-img-frame overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto lg:h-96 relative">
                  <img
                    src={outcome.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="card-img w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="desc-lock w-full px-4 pt-4 pb-4 flex flex-col justify-center">
                  <h3 className="font-bold text-sm tracking-tight mb-1 text-zinc-900 transition-colors duration-300 group-hover:text-white">
                    {outcome.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed transition-colors duration-300 group-hover:text-white/60">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </FeaturedServicesRow>
        </div>
      </section>

      {/* 3. PROYEK & KEUNGGULAN */}
      <section className="relative z-10 py-12 pt-6 bg-white text-zinc-900 lg:pt-12">
        <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6">
          <SectionHeading
            badgeText="Cara Kerja & Proyek"
            title="Dari kebutuhan hingga hasil yang bisa dilihat."
            subtitle="Pendekatan kerja yang terarah, didukung pengalaman kolaborasi bersama mitra di Kalimantan Timur."
            titleClassName="text-[28px] sm:text-[42px]"
            className="mb-12"
          />

          {/* Baris 1: Carousel looping 2 kartu (full-bleed, tanpa container) */}
        </div>

        {/* Blok gaya adobe.com: 1 card besar (full-bleed → container saat scroll) + 3 card */}
        <FeatureHighlights />

        <ProjectCarousel projects={latestProjects} />

        {/* Baris 3: Testimoni */}
        <div className="max-w-[1310px] mx-auto mt-10 sm:mt-16 mb-12 md:px-5 lg:px-6">
          <div className="grid grid-cols-1 gap-10 px-5 sm:px-4 md:grid-cols-3 md:gap-4 md:px-0">
            {testimonialsData.map((t: any) => (
              <div key={t.id} className="p-2 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <img
                    src={t.image_url ?? ""}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover bg-zinc-200 shrink-0"
                  />
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
                <h4 className="font-bold text-base mb-1">{t.title}</h4>
                <p className="text-sm font-medium leading-relaxed mb-8 flex-1">&quot;{t.quote}&quot;</p>
                <Link
                  href="/projects"
                  className="group text-xs font-bold text-zinc-900 inline-flex items-center gap-0.5"
                >
                  Lihat studi kasus
                  <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KATALOG LAYANAN LENGKAP */}
      <RevealServices heading={
        <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6">
          <SectionHeading
            title="Pilih dukungan yang sesuai kebutuhan Anda."
            subtitle="Dari pengembangan teknologi hingga penyediaan tenaga dan produksi konten."
            button={{ label: "Lihat Semua Layanan", href: "/services" }}
            dark
          />
        </div>

      }>
        {/* Visual full-bleed */}
        <img
          src="/bg.png"
          alt="Tim JDS"
          className="w-full h-[420px] sm:h-[520px] lg:h-auto block object-cover object-center -mt-12 mb-4 opacity-80 [mask-image:linear-gradient(to_bottom,black_70%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_85%)] lg:-mt-28 lg:-mb-16"
        />

        <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6">
          {/* 3x3 Grid Layanan */}
          <ServiceCardsReveal>
            {servicesData.map((service: any) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-[#141414] p-6 rounded-xl transition-all min-h-[260px] flex flex-col"
              >
                <img
                  src={service.image_url ?? ""}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`relative z-10 w-8 h-8 ${darkChip[service.category]} rounded font-black flex items-center justify-center mb-12`}
                >
                  {iconMapLg[service.icon_name ?? ""]}
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-bold text-xl sm:text-2xl mb-1">{service.title}</h3>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-200 leading-relaxed transition-colors duration-500">
                    {service.short_desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Kartu CTA */}
            <Link
              href="/contact"
              className="bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-6 rounded-xl transition-all min-h-[260px] flex flex-col group"
            >
              <div className="w-8 h-8 bg-white text-black rounded font-black flex items-center justify-center mb-12">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-xl sm:text-2xl mb-1">Ceritakan kendala yang ingin diselesaikan.</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Tim kami akan membantu menentukan bentuk dukungan dan langkah awal yang paling relevan.
                </p>
                <span className="mt-4 text-sm font-semibold text-white inline-flex items-center gap-1">
                  Konsultasi Gratis
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </ServiceCardsReveal>
        </div>
      </RevealServices>

      {/* Footer */}
      <Footer variant="dark" />
    </div>
  );
}
