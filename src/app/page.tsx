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
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { companyInfo, servicesData } from "@/data/companyData";

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
  integrated:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
  showcase:
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
};

const featuredCardImages = [
  { id: "web-development", src: homeImages.web },
  { id: "software-development", src: homeImages.software },
  { id: "ui-ux-design", src: homeImages.uiux },
  { id: "digitalization-solutions", src: homeImages.digital },
  { id: "professional-staffing", src: homeImages.staffing },
];

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
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
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
        <div className="row-wrap px-4 sm:px-6 lg:px-8 text-center">
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
                  className="bg-zinc-100 rounded-2xl overflow-hidden min-w-0 group flex flex-col justify-between transition-all duration-300 ease-out hover:bg-black hover:shadow-lg lg:flex-1 lg:hover:flex-[1.35]"
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
      <section className="py-20 bg-zinc-50 text-zinc-900 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Featured Large Card */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-amber-200 rounded-2xl p-8 sm:p-12 text-white mb-8 shadow-xl relative overflow-hidden">
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

          {/* 3 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <img
                src={homeImages.umkm}
                alt="Pendampingan tenaga ahli UMKM"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold text-sm mb-1">Pendampingan &amp; Tenaga Ahli UMKM.</h4>
              <p className="text-xs text-zinc-600 mb-3">
                Penyediaan tenaga ahli IT yang mendampingi digitalisasi pelaku UMKM di Kutai
                Kartanegara.
              </p>
              <Link
                href="/projects"
                className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-0.5"
              >
                Lihat proyek
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <img
                src={homeImages.integrated}
                alt="Layanan teknologi terintegrasi"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold text-sm mb-1">Layanan terintegrasi, satu pintu.</h4>
              <p className="text-xs text-zinc-600 mb-3">
                Software, web, UI/UX, konsultasi IT, hingga tenaga ahli, semuanya dikelola dalam satu
                ekosistem layanan.
              </p>
              <Link
                href="/services"
                className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-0.5"
              >
                Lihat layanan
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-zinc-900 text-white p-4 rounded-xl border border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="bg-zinc-800 p-4 rounded-lg mb-4 border border-zinc-700 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-cyan-300 shrink-0" />
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    Berpusat di Kutai Kartanegara dan memahami kebutuhan transformasi digital daerah.
                  </span>
                </div>
                <h4 className="font-bold text-sm mb-1">Keahlian lokal, standar nasional.</h4>
                <p className="text-xs text-zinc-400 mb-3">
                  Pendekatan komunikatif dan adaptif untuk instansi pemerintah maupun swasta.
                </p>
              </div>
              <Link
                href="/about"
                className="text-xs font-semibold text-blue-400 hover:underline inline-flex items-center gap-0.5"
              >
                Tentang JDS
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL BANNER */}
      <section className="bg-zinc-950 text-white py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-6 leading-snug">
            &ldquo;Tenaga ahli JDS mendampingi pelaku UMKM kami secara profesional; digitalisasi berjalan
            lancar dan tepat waktu.&rdquo;
          </blockquote>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-6">
            DINAS KOPERASI &amp; UKM KAB. KUTAI KARTANEGARA
          </p>
          <Link
            href="/projects"
            className="inline-block bg-white text-black font-semibold text-xs px-5 py-2 rounded-full hover:bg-zinc-200 transition-all"
          >
            Lihat cerita kami
          </Link>
        </div>
      </section>

      {/* 5. KATALOG LAYANAN LENGKAP */}
      <section className="bg-[#0a0a0c] text-white py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2">Satu mitra, semua solusi digital.</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Layanan lengkap untuk instansi pemerintah, korporasi, dan pelaku usaha di Kalimantan Timur.
            </p>
            <div className="inline-flex border border-zinc-700 rounded-full p-1 bg-zinc-900">
              <Link
                href="/services"
                className="bg-zinc-800 text-white text-xs px-4 py-1.5 rounded-full font-medium hover:bg-zinc-700 transition-colors"
              >
                Lihat semua layanan
              </Link>
            </div>
          </div>

          {/* Visual Ruang Kerja */}
          <div className="rounded-2xl overflow-hidden border border-zinc-800 mb-12 shadow-2xl max-w-4xl mx-auto">
            <img
              src={homeImages.showcase}
              alt="Ruang kerja tim JDS"
              className="w-full h-[360px] object-cover"
            />
          </div>

          {/* 3x3 Grid Layanan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all"
              >
                <div
                  className={`w-8 h-8 ${darkChip[service.category]} rounded font-black flex items-center justify-center mb-4`}
                >
                  {iconMapLg[service.iconName]}
                </div>
                <h3 className="font-bold text-base mb-1">{service.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{service.shortDesc}</p>
              </div>
            ))}

            {/* Kartu CTA */}
            <Link
              href="/contact"
              className="bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 border border-zinc-700 p-6 rounded-xl hover:border-white/40 transition-all flex flex-col justify-between group"
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
