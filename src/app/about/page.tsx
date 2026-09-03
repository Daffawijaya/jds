import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Handshake,
  UserCheck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Target,
  Compass,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { companyInfo, coreValuesData, companyStrengthsData } from "@/data/companyData";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Profil perusahaan ${companyInfo.officialName} (${companyInfo.shortName}) - Penyedia Solusi IT, Digitalisasi, dan Tenaga Ahli Profesional di Kutai Kartanegara, Kalimantan Timur.`,
};

const valueIconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* HEADER HERO */}
      <section className="pt-12 pb-8 bg-grid-pattern border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">Profil Perusahaan</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Mengenal {companyInfo.officialName}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
            Penyedia Solusi Teknologi Informasi, Digitalisasi Terintegrasi, serta Penyediaan Tenaga Ahli Profesional yang berpusat di Kabupaten Kutai Kartanegara, Kalimantan Timur.
          </p>
        </div>
      </section>

      {/* OVERVIEW & FOCUS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="cyan">Profil Ringkas</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 leading-tight">
              Mitra Kerja Sama Profesional dalam Penyiapan Solusi Digital & SDM
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {companyInfo.overview}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kami menghadirkan kombinasi keahlian pengembangan perangkat lunak, perancangan web, konsultasi strategi teknologi, hingga penyediaan tenaga pendamping teknis secara komprehensif untuk mendukung keberhasilan program instansi pemerintah maupun entitas swasta.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                <MapPin className="w-4 h-4 text-[#eb1000]" />
                <span>Alamat Resmi Perusahaan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {companyInfo.address}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-950 pb-3 border-b border-slate-200 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#eb1000]" />
                Informasi Posisi Bisnis
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold">Nama Resmi Perusahaan</span>
                  <p className="text-base font-extrabold text-slate-950">{companyInfo.officialName}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold">Nama Singkat / Brand</span>
                  <p className="text-base font-extrabold text-[#eb1000]">{companyInfo.shortName}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold">Posisi Bisnis</span>
                  <p className="text-sm font-bold text-slate-700 mt-1">{companyInfo.positioning}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold">Wilayah Kabupaten / Provinsi</span>
                  <p className="text-sm font-medium text-slate-600">{companyInfo.regency}, {companyInfo.province}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION (Editable Content Placeholder) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Arah Strategis Perusahaan"
          title="Visi & Misi"
          subtitle="Landasan dan tujuan operasional Jaya Dinara Sukses dalam melayani mitra kerja sama."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* VISI */}
          <Card className="p-6 sm:p-8 relative">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center mb-6 text-cyan-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950 mb-3">Visi Perusahaan</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic border-l-2 border-[#eb1000] pl-4 py-1">
              &quot;Menjadi penyedia solusi IT, digitalisasi, dan penyiapan tenaga ahli profesional terdepan yang terpercaya dalam mempercepat modernisasi pelayanan dan bisnis daerah.&quot;
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-400 font-mono">
                [Konten Visi Perusahaan - Dapat disesuaikan]
              </span>
            </div>
          </Card>

          {/* MISI */}
          <Card className="p-6 sm:p-8 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-6 text-emerald-700">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950 mb-3">Misi Utama</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#eb1000] shrink-0 mt-0.5" />
                <span>Menghadirkan produk perangkat lunak dan web yang aman, inovatif, dan responsif.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#eb1000] shrink-0 mt-0.5" />
                <span>Menyiapkan tenaga ahli IT dan pendamping profesional berdedikasi tinggi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#eb1000] shrink-0 mt-0.5" />
                <span>Memperkuat efisiensi operasional organisasi melalui digitalisasi sistem.</span>
              </li>
            </ul>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-400 font-mono">
                [Konten Misi Utama - Dapat disesuaikan]
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Nilai Utama Perusahaan"
          title="Nilai-Nilai Kerja JDS"
          subtitle="Prinsip dasar yang menjadi pegangan kami dalam membangun kepercayaan dan hasil karya."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValuesData.map((val) => (
            <Card key={val.id} className="hover:border-slate-300 hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-slate-700">
                  {valueIconMap[val.iconName] || <ShieldCheck className="w-6 h-6" />}
                </div>
                <CardTitle className="text-lg font-extrabold text-slate-950">{val.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {val.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* COMPANY STRENGTHS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-slate-50 border border-slate-200">
          <SectionHeading
            badgeText="Faktor Pembeda"
            title="Kapasitas & Kekuatan Utama Jaya Dinara Sukses"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {companyStrengthsData.map((strength) => (
              <div key={strength.id} className="p-5 rounded-3xl bg-white border border-slate-200 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-1 text-[#eb1000]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-950">{strength.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">{strength.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="default" size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Hubungi Tim JDS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
