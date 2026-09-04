import Link from "next/link";
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
import { companyInfo, servicesData, testimonialsData } from "@/data/companyData";
import ProjectCarousel from "@/components/shared/ProjectCarousel";

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

// Warna solid untuk kartu terang (ikon di atas kotak berwarna)
const solidChip: Record<string, string> = {
  development: "bg-cyan-600",
  solutions: "bg-teal-600",
  consulting: "bg-violet-600",
  outsourcing: "bg-amber-500",
  media: "bg-fuchsia-600",
};

// Warna transparan untuk kartu gelap (katalog layanan)
const darkChip: Record<string, string> = {
  development: "bg-cyan-500/15 text-cyan-300",
  solutions: "bg-teal-500/15 text-teal-300",
  consulting: "bg-violet-500/15 text-violet-300",
  outsourcing: "bg-amber-500/15 text-amber-300",
  media: "bg-fuchsia-500/15 text-fuchsia-300",
};

// Lima layanan unggulan di bagian 2
const featuredIds = [
  "web-development",
  "software-development",
  "ui-ux-design",
  "digitalization-solutions",
  "professional-staffing",
];
const featuredServices = featuredIds
  .map((id) => servicesData.find((s) => s.id === id))
  .filter(Boolean);

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

const featuredCardImages = [
  { id: "web-development", src: homeImages.web },
  { id: "software-development", src: homeImages.software },
  { id: "ui-ux-design", src: homeImages.uiux },
  { id: "digitalization-solutions", src: homeImages.digital },
  { id: "professional-staffing", src: homeImages.staffing },
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

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#070b12] text-white overflow-hidden -mt-[72px] flex items-center min-h-[104vh]">
        <img
          src="/bggggg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative w-full max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-zinc-300">
              {companyInfo.officialName}
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-3 mb-5 leading-tight">
              Masa depan digital,
              <br />
              dibangun hari ini.
            </h1>
            <p className="text-zinc-200 text-sm leading-relaxed mb-6">
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
      </section>

      {/* 2. LAYANAN UNGGULAN */}
      <section className="featured-sec relative -mt-12 sm:-mt-16 rounded-t-4xl bg-white text-zinc-900 py-20">
        <div className="row-wrap px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Satu mitra untuk setiap kebutuhan digital.
          </h2>
          <p className="text-black text-sm max-w-2xl mx-auto mb-12">
            Dari membangun sistem hingga menyiapkan orang-orang yang menjalankannya. Semua tersedia dalam
            satu tim.
          </p>

          <div className="card-row grid grid-cols-1 sm:grid-cols-2 gap-2 text-left lg:flex">
            {featuredServices.map((service) => {
              const image = featuredCardImages.find((i) => i.id === service!.id);
              return (
                <div
                  key={service!.id}
                  className="bg-zinc-100 rounded-2xl overflow-hidden min-w-0 group relative flex flex-col justify-between transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black hover:shadow-lg lg:flex-1 lg:hover:flex-[1.35]"
                >
                  <div className="px-4 py-5 flex items-center space-x-2 text-xs font-semibold">
                    <span
                      className={`w-5 h-5 ${solidChip[service!.category]} rounded flex items-center justify-center text-white`}
                    >
                      {iconMap[service!.iconName]}
                    </span>
                    <span className="group-hover:text-white transition-colors duration-300">{service!.title}</span>
                  </div>
                  <div className="card-img-frame h-64 sm:h-80 overflow-hidden rounded-2xl relative flex items-center justify-center">
                    <img
                      src={image!.src}
                      alt={service!.title}
                      className="card-img w-full h-full object-cover"
                    />
                  </div>
                  <div className="desc-lock w-full px-4 py-5 text-xs text-zinc-600 leading-relaxed group-hover:text-white transition-colors duration-300">
                    <div className="desc-clip">{service!.shortDesc}</div>
                  </div>
                  {/* chevron tebal di ujung kanan bawah, muncul saat hover */}
                  <span className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 rounded-full border border-zinc-200 bg-white text-zinc-900 group-hover:border-white group-hover:bg-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out shadow-sm">
                    <FaChevronRight className="w-3 h-3" />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-zinc-300 hover:border-zinc-900 text-zinc-700 hover:text-zinc-950 font-semibold text-sm px-6 py-2.5 rounded-full transition-all"
            >
              Lihat semua layanan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PROYEK & KEUNGGULAN */}
      <section className="relative z-10 -mb-12 sm:-mb-16 rounded-b-4xl py-20 bg-zinc-50 text-zinc-900 border-t border-zinc-200">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              PROYEK &amp; KEUNGGULAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 mb-2">
              Dampak nyata untuk daerah &amp; bisnis.
            </h2>
            <p className="text-zinc-600 text-sm">
              Bekerja sama dengan instansi pemerintah dan mitra bisnis di Kalimantan Timur.
            </p>
          </div>

          {/* Baris 1: Featured Large Card (statis) */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-amber-200 rounded-2xl p-8 sm:p-12 text-white mb-4 shadow-xl relative overflow-hidden">
            <div className="max-w-xl z-10 relative">
              <div className="bg-black/30 backdrop-blur-md inline-block px-4 py-2 rounded-full text-xs mb-6 font-medium border border-white/20">
                ✨ Platform digital UMKM Kutai Kartanegara
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-slate-900/80 px-4 py-2 rounded-lg text-xs border border-white/10">
                  <span className="text-zinc-400 block">Mitra Instansi</span>
                  <span className="text-base font-bold">Dinas KUKM Kukar</span>
                </div>
                <div className="bg-slate-900/80 px-4 py-2 rounded-lg text-xs border border-white/10">
                  <span className="text-zinc-400 block">Fokus</span>
                  <span className="text-base font-bold">Digitalisasi UMKM</span>
                </div>
              </div>
              <h3 className="text-3xl font-extrabold italic tracking-tight mb-4">
                UMKM Kukar, siap go digital.
              </h3>
              <Link
                href="/projects"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-5 py-2 rounded-full transition-all"
              >
                Lihat studi kasus →
              </Link>
            </div>
          </div>

          {/* Baris 2: Carousel looping 2 kartu (full-bleed, tanpa container) */}
        </div>
        <ProjectCarousel />

        {/* Baris 3: Testimoni */}
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonialsData.map((t) => (
              <div key={t.id} className="p-2 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
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
                <p className="text-sm font-medium leading-relaxed mb-3 flex-1">&quot;{t.quote}&quot;</p>
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
      <section className="bg-black text-white py-20 pt-32 sm:pt-36">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-0 relative z-10">
            <h2 className="text-3xl font-extrabold mb-2">Satu mitra, semua solusi digital.</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Layanan lengkap untuk instansi pemerintah, korporasi, dan pelaku usaha di Kalimantan Timur.
            </p>
            <div className="inline-flex border border-white rounded-full p-1 bg-transparent">
              <Link
                href="/services"
                className="text-white text-xs px-4 py-1.5 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Lihat semua layanan
              </Link>
            </div>
          </div>
        </div>

        {/* Visual full-bleed */}
        <img
          src="/bg.png"
          alt="Tim JDS"
          className="w-full h-auto block -mt-28 -mb-16 opacity-80 [mask-image:linear-gradient(to_bottom,black_70%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_85%)]"
        />

        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* 3x3 Grid Layanan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-[#141414] p-6 rounded-xl transition-all min-h-[260px] flex flex-col"
              >
                <img
                  src={catalogImages[service.id]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`relative z-10 w-8 h-8 ${darkChip[service.category]} rounded font-black flex items-center justify-center mb-12`}
                >
                  {iconMapLg[service.iconName]}
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-bold text-base mb-1">{service.title}</h3>
                  <p className="text-xs text-zinc-400 group-hover:text-zinc-200 leading-relaxed transition-colors duration-500">
                    {service.shortDesc}
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
                <h3 className="font-bold text-base mb-1">Diskusikan kebutuhan Anda.</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ceritakan rencana digitalisasi Anda. Tim kami siap membantu dari konsultasi hingga
                  implementasi.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-white inline-flex items-center gap-1">
                Konsultasi Gratis
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
