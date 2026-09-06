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
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";
import { getCompanyInfo, getServices, getTestimonials } from "@/lib/supabase-server";
import ProjectCarousel from "@/components/shared/ProjectCarousel";
import { FeatureHighlights } from "@/components/shared/FeatureHighlights";
import FeaturedServicesRow from "@/components/shared/FeaturedServicesRow";
import ParallaxHero from "@/components/shared/ParallaxHero";
import RevealServices from "@/components/shared/RevealServices";
import ServiceCardsReveal from "@/components/shared/ServiceCardsReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

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
};

// Warna transparan untuk kartu gelap (katalog layanan)
const darkChip: Record<string, string> = {
  development: "bg-cyan-500/15 text-cyan-300",
  solutions: "bg-teal-500/15 text-teal-300",
  consulting: "bg-violet-500/15 text-violet-300",
  outsourcing: "bg-amber-500/15 text-amber-300",
  media: "bg-fuchsia-500/15 text-fuchsia-300",
};

const homeImages = {
  web: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  software: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
  uiux: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  digital: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  staffing: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  umkm: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  consulting:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  outsourcing:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
  multimedia:
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
  integrated:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
};

const outcomeCards = [
  {
    id: "streamlined-work",
    label: "Efisiensi operasional",
    title: "Proses kerja lebih ringkas.",
    description:
      "Kurangi pekerjaan manual dan alur berulang melalui sistem yang disusun sesuai kebutuhan operasional.",
    image: homeImages.digital,
    iconName: "Cpu",
    chipClass: "bg-teal-600",
  },
  {
    id: "connected-data",
    label: "Data dan integrasi",
    title: "Data lebih rapi dan terhubung.",
    description:
      "Satukan informasi penting agar mudah ditemukan, dipantau, dan digunakan untuk mengambil keputusan.",
    image: homeImages.software,
    iconName: "Server",
    chipClass: "bg-cyan-600",
  },
  {
    id: "accessible-services",
    label: "Pengalaman digital",
    title: "Layanan lebih mudah digunakan.",
    description:
      "Hadirkan pengalaman digital yang jelas bagi tim internal, mitra, maupun masyarakat.",
    image: homeImages.uiux,
    iconName: "Layout",
    chipClass: "bg-violet-600",
  },
  {
    id: "project-ready-team",
    label: "Kesiapan tim",
    title: "Tim proyek lebih siap.",
    description:
      "Lengkapi kebutuhan proyek dengan tenaga ahli yang sesuai dan siap mendukung pelaksanaan di lapangan.",
    image: homeImages.staffing,
    iconName: "Users",
    chipClass: "bg-amber-500",
  },
  {
    id: "scalable-foundation",
    label: "Fondasi teknologi",
    title: "Solusi tumbuh bersama kebutuhan.",
    description:
      "Bangun fondasi digital yang dapat dikembangkan saat program, pengguna, dan proses organisasi bertambah.",
    image: homeImages.web,
    iconName: "Lightbulb",
    chipClass: "bg-fuchsia-600",
  },
];

// Gambar hover katalog layanan (sementara dari internet)
const catalogImages: Record<string, string> = {
  "web-development": homeImages.web,
  "software-development": homeImages.software,
  "ui-ux-design": homeImages.uiux,
  "digitalization-solutions": homeImages.digital,
  "it-consulting": homeImages.consulting,
  "it-outsourcing": homeImages.outsourcing,
  "professional-staffing": homeImages.staffing,
  "multimedia-digital-content": homeImages.multimedia,
};

export default async function HomePage() {
  const [companyInfo, servicesData, testimonialsData] = await Promise.all([
    getCompanyInfo(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <ParallaxHero>
        <img
          src="/bggggg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative w-full max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-[50%]">
            <span className="text-sm font-bold tracking-widest text-white">
              {companyInfo.officialName}
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-3 mb-5 leading-tight">
              Masa depan digital,
              <br />
              dibangun hari ini.
            </h1>
            <p className="text-zinc-200 text-xl leading-relaxed mb-6">
              Satu mitra untuk transformasi digital: membangun sistem, mendigitalkan alur kerja, dan
              menyiapkan tenaga ahli profesional bagi instansi maupun bisnis Anda.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-md"
              >
                Mulai Proyek
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-semibold text-sm transition-colors"
              >
                Lihat Layanan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* 2. HASIL UNTUK MITRA */}
      <section className="featured-sec relative z-10 overflow-x-clip -mt-12 sm:-mt-16 rounded-t-4xl bg-white text-zinc-900 py-20">
        <div className="row-wrap px-3 sm:px-4 lg:px-6 text-center">
          <SectionHeading
            title="Yang berubah ketika teknologi bekerja dengan tepat."
            subtitle="Pekerjaan lebih ringkas, data lebih tertata, layanan lebih mudah digunakan, dan tim lebih siap menjalankan program."
            className="mb-12"
          />

          <FeaturedServicesRow>
            {outcomeCards.map((outcome) => (
                <div
                  key={outcome.id}
                  className="bg-zinc-100 rounded-2xl overflow-hidden min-w-0 group relative flex flex-col justify-between transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black hover:shadow-lg lg:flex-1 lg:hover:flex-[1.35]"
                >
                  <div className="px-4 py-5 flex items-center space-x-2 text-sm font-bold">
                    <span
                      className={`w-5 h-5 ${outcome.chipClass} rounded flex items-center justify-center text-white`}
                    >
                      {iconMap[outcome.iconName]}
                    </span>
                    <span className="group-hover:text-white transition-colors duration-300">{outcome.label}</span>
                  </div>
                  <div className="card-img-frame h-72 sm:h-96 overflow-hidden rounded-2xl relative flex items-center justify-center">
                    <img
                      src={outcome.image}
                      alt=""
                      aria-hidden="true"
                      className="card-img w-full h-full object-cover"
                    />
                  </div>
                  <div className="desc-lock w-full px-4 py-5">
                    <h3 className="line-clamp-2 text-base font-bold leading-5 text-zinc-900 transition-colors duration-300 group-hover:text-white">
                      {outcome.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-base font-normal leading-5 text-zinc-900/60 transition-colors duration-300 group-hover:text-white/60">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              ))}
          </FeaturedServicesRow>
        </div>
      </section>

      {/* 3. PROYEK & KEUNGGULAN */}
      <section className="relative z-10 py-12 bg-white text-zinc-900">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <SectionHeading
            badgeText="Proyek & Keunggulan"
            title="Dampak nyata untuk daerah & bisnis."
            subtitle="Bekerja sama dengan instansi pemerintah dan mitra bisnis di Kalimantan Timur."
            className="mb-12"
          />

          {/* Baris 1: Carousel looping 2 kartu (full-bleed, tanpa container) */}
        </div>

        {/* Blok gaya adobe.com: 1 card besar (full-bleed → container saat scroll) + 3 card */}
        <FeatureHighlights />

        <ProjectCarousel />

        {/* Baris 3: Testimoni */}
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 mt-16 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <SectionHeading
            title="Satu mitra, semua solusi digital."
            subtitle="Layanan lengkap untuk instansi pemerintah, korporasi, dan pelaku usaha di Kalimantan Timur."
            button={{ label: "Lihat Semua Layanan", href: "/services" }}
            dark
          />
        </div>

      }>
        {/* Visual full-bleed */}
        <img
          src="/bg.png"
          alt="Tim JDS"
          className="w-full h-auto block -mt-28 -mb-16 opacity-80 [mask-image:linear-gradient(to_bottom,black_70%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_85%)]"
        />

        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* 3x3 Grid Layanan */}
          <ServiceCardsReveal>
            {servicesData.map((service: any) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-[#141414] p-6 rounded-xl transition-all min-h-[260px] flex flex-col"
              >
                <img
                  src={catalogImages[service.slug]}
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
                  <h3 className="font-bold text-2xl mb-1">{service.title}</h3>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-200 leading-relaxed transition-colors duration-500">
                    {service.short_desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Kartu CTA */}
            <Link
              href="/contact"
              className="bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-6 rounded-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 bg-white text-black rounded font-black flex items-center justify-center mb-4">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <h3 className="font-bold text-2xl mb-1">Diskusikan kebutuhan Anda.</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Ceritakan rencana digitalisasi Anda. Tim kami siap membantu dari konsultasi hingga
                  implementasi.
                </p>
              </div>
              <span className="mt-4 text-sm font-semibold text-white inline-flex items-center gap-1">
                Konsultasi Gratis
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </Link>
          </ServiceCardsReveal>
        </div>
      </RevealServices>

      {/* Footer */}
      <Footer variant="dark" />
    </div>
  );
}
