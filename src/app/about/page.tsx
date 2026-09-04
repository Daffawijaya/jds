import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building,
  CheckCircle2,
  Compass,
  Handshake,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";
import { companyInfo, coreValuesData, companyStrengthsData } from "@/data/companyData";
import ParallaxHero from "@/components/shared/ParallaxHero";
import FeaturedServicesRow from "@/components/shared/FeaturedServicesRow";
import RevealServices from "@/components/shared/RevealServices";
import ServiceCardsReveal from "@/components/shared/ServiceCardsReveal";

/* ═══════════════════════════════════════════════════════════════
   Tentang Kami — bahasa visual sama persis seperti homepage (/):
   ParallaxHero, section putih overlap, kartu zinc-100 rounded-2xl,
   kartu katalog gelap, RevealServices + entrance berbasis scroll.
   Isi tetap profil perusahaan, bukan salinan homepage.
   ═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Profil perusahaan ${companyInfo.officialName} (${companyInfo.shortName}) - Penyedia Solusi IT, Digitalisasi, dan Tenaga Ahli Profesional di Kutai Kartanegara, Kalimantan Timur.`,
};

const valueIconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-3 h-3" />,
  Sparkles: <Sparkles className="w-3 h-3" />,
  Handshake: <Handshake className="w-3 h-3" />,
  UserCheck: <UserCheck className="w-3 h-3" />,
};

const strengthIconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
};

// Warna chip mengikuti pola homepage (terang untuk kartu terang, redup untuk kartu gelap)
const solidChip = ["bg-cyan-600", "bg-teal-600", "bg-violet-600", "bg-amber-500"];
const darkChip = [
  "bg-cyan-500/15 text-cyan-300",
  "bg-teal-500/15 text-teal-300",
  "bg-violet-500/15 text-violet-300",
  "bg-amber-500/15 text-amber-300",
];

export default function AboutPage() {
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
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-zinc-300">
              PROFIL PERUSAHAAN
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-3 mb-5 leading-tight">
              Mengenal {companyInfo.officialName}.
            </h1>
            <p className="text-zinc-200 text-sm leading-relaxed mb-6">
              {companyInfo.positioning}: berpusat di {companyInfo.regency},{" "}
              {companyInfo.province}, melayani instansi pemerintah dan mitra bisnis.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-md"
              >
                Hubungi Kami
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

      {/* 2. PROFIL RINGKAS */}
      <section className="featured-sec relative z-10 overflow-x-clip -mt-12 sm:-mt-16 rounded-t-4xl bg-white text-zinc-900 py-20">
        <div className="row-wrap px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Mitra profesional solusi digital &amp; SDM.
          </h2>
          <p className="text-black text-sm max-w-2xl mx-auto mb-12">
            {companyInfo.tagline}: kombinasi pengembangan perangkat lunak, digitalisasi
            sistem, dan penyiapan tenaga ahli dalam satu tim.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left max-w-[1310px] mx-auto">
            <div className="bg-zinc-100 rounded-2xl p-6 sm:p-8 flex flex-col">
              <h3 className="text-base font-bold mb-3">Profil ringkas</h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">{companyInfo.overview}</p>
              <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                Kami menghadirkan kombinasi keahlian pengembangan perangkat lunak, perancangan
                web, konsultasi strategi teknologi, hingga penyediaan tenaga pendamping teknis
                untuk mendukung keberhasilan program instansi pemerintah maupun entitas swasta.
              </p>
              <div className="mt-auto bg-white rounded-xl p-4 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-900">Alamat resmi perusahaan</p>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-1">{companyInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-100 rounded-2xl p-6 sm:p-8 flex flex-col">
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Informasi bisnis
              </h3>
              <dl className="space-y-4 text-left">
                <div>
                  <dt className="text-xs text-zinc-500 font-semibold">Nama resmi perusahaan</dt>
                  <dd className="text-sm font-bold text-zinc-900">{companyInfo.officialName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500 font-semibold">Nama singkat / brand</dt>
                  <dd className="text-sm font-bold text-zinc-900">{companyInfo.shortName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500 font-semibold">Posisi bisnis</dt>
                  <dd className="text-xs font-semibold text-zinc-700 mt-0.5">{companyInfo.positioning}</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500 font-semibold">Wilayah kabupaten / provinsi</dt>
                  <dd className="text-xs font-medium text-zinc-600">
                    {companyInfo.regency}, {companyInfo.province}
                  </dd>
                </div>
              </dl>
              <Link
                href="/contact"
                className="mt-auto pt-6 inline-flex items-center gap-2 border border-zinc-300 hover:border-zinc-900 text-zinc-700 hover:text-zinc-950 font-semibold text-sm px-6 py-2.5 rounded-full transition-all self-start"
              >
                Hubungi tim JDS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="relative z-10 bg-white text-zinc-900 py-20">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              ARAH STRATEGIS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 mb-2">Visi &amp; misi perusahaan.</h2>
            <p className="text-zinc-600 text-sm">
              Landasan dan tujuan operasional {companyInfo.shortName} dalam melayani mitra kerja sama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-zinc-100 rounded-2xl p-6 sm:p-8">
              <div className="w-8 h-8 bg-cyan-600 rounded font-black flex items-center justify-center text-white mb-12">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base mb-1">Visi perusahaan</h3>
              <p className="text-xs text-zinc-600 leading-relaxed italic border-l-2 border-zinc-900 pl-4 py-1 mt-3">
                &quot;Menjadi penyedia solusi IT, digitalisasi, dan penyiapan tenaga ahli
                profesional terdepan yang terpercaya dalam mempercepat modernisasi pelayanan
                dan bisnis daerah.&quot;
              </p>
            </div>
            <div className="bg-zinc-100 rounded-2xl p-6 sm:p-8">
              <div className="w-8 h-8 bg-violet-600 rounded font-black flex items-center justify-center text-white mb-12">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base mb-1">Misi utama</h3>
              <ul className="space-y-3 text-xs text-zinc-600 mt-3">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                  <span>Menghadirkan produk perangkat lunak dan web yang aman, inovatif, dan responsif.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                  <span>Menyiapkan tenaga ahli IT dan pendamping profesional berdedikasi tinggi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                  <span>Memperkuat efisiensi operasional organisasi melalui digitalisasi sistem.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NILAI PERUSAHAAN */}
      <section className="featured-sec relative z-10 overflow-x-clip bg-white text-zinc-900 py-20">
        <div className="row-wrap px-3 sm:px-4 lg:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            NILAI PERUSAHAAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1 mb-2">
            Nilai-nilai kerja {companyInfo.shortName}.
          </h2>
          <p className="text-black text-sm max-w-2xl mx-auto mb-12">
            Prinsip dasar yang menjadi pegangan kami dalam membangun kepercayaan dan hasil karya.
          </p>

          <FeaturedServicesRow>
            {coreValuesData.map((val, i) => (
              <div
                key={val.id}
                className="bg-zinc-100 rounded-2xl overflow-hidden min-w-0 group relative flex flex-col justify-between transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black hover:shadow-lg lg:flex-1 lg:hover:flex-[1.35]"
              >
                <div className="px-4 py-5 flex items-center space-x-2 text-xs font-semibold">
                  <span
                    className={`w-5 h-5 ${solidChip[i % solidChip.length]} rounded flex items-center justify-center text-white`}
                  >
                    {valueIconMap[val.iconName]}
                  </span>
                  <span className="group-hover:text-white transition-colors duration-300">{val.title}</span>
                </div>
                <div className="w-full px-4 pb-5 text-xs text-zinc-600 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {val.desc}
                </div>
                <span className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 rounded-full border border-zinc-200 bg-white text-zinc-900 group-hover:border-white group-hover:bg-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out shadow-sm">
                  <FaChevronRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </FeaturedServicesRow>

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

      {/* 5. KEKUATAN PERUSAHAAN */}
      <RevealServices heading={
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-0 relative z-10">
            <h2 className="text-3xl font-extrabold mb-2">Kekuatan utama {companyInfo.shortName}.</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Faktor pembeda yang membuat kami siap mendampingi program instansi dan bisnis Anda.
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

      }>
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <ServiceCardsReveal>
            {companyStrengthsData.map((strength, i) => (
              <div
                key={strength.id}
                className="group relative overflow-hidden bg-[#141414] p-6 rounded-xl transition-all min-h-[260px] flex flex-col"
              >
                <div
                  className={`relative z-10 w-8 h-8 ${darkChip[i % darkChip.length]} rounded font-black flex items-center justify-center mb-12`}
                >
                  {strengthIconMap[strength.iconName]}
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-bold text-base mb-1">{strength.title}</h3>
                  <p className="text-xs text-zinc-400 group-hover:text-zinc-200 leading-relaxed transition-colors duration-500">
                    {strength.desc}
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
          </ServiceCardsReveal>
        </div>
      </RevealServices>
    </div>
  );
}
