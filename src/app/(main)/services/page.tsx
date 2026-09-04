"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Code2,
  Layout,
  Cpu,
  Lightbulb,
  Server,
  Users,
  Film,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceDetailModal } from "@/components/modals/ServiceDetailModal";
import { companyInfo, servicesData } from "@/data/companyData";
import { Service } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Film: <Film className="w-6 h-6" />,
};

const processSteps = [
  {
    step: "01",
    title: "Konsultasi & Analisis Kebutuhan",
    desc: "Diskusi mendalam untuk memahami tujuan proyek, ruang lingkup, dan spesifikasi yang dibutuhkan."
  },
  {
    step: "02",
    title: "Perancangan Arsitektur & Solusi",
    desc: "Penyusunan blueprint teknis, sistem antarmuka (UI/UX), dan penyiapan skema tenaga ahli."
  },
  {
    step: "03",
    title: "Eksekusi & Pengembangan",
    desc: "Implementasi perangkat lunak atau penugasan personel tenaga ahli lapangan sesuai jadual."
  },
  {
    step: "04",
    title: "Pengujian & Verifikasi Kualitas",
    desc: "Pengujian fungsionalitas, performa, dan evaluasi hasil kerja secara komprehensif."
  },
  {
    step: "05",
    title: "Peluncuran & Pengawasan Berkelanjutan",
    desc: "Serah terima proyek, pelatihan operasional, dan dukungan pemeliharaan sistem terstruktur."
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "Semua Layanan" },
    { key: "development", label: "Software & Web" },
    { key: "solutions", label: "Digitalisasi" },
    { key: "outsourcing", label: "Tenaga Ahli & Outsourcing" },
    { key: "consulting", label: "Konsultasi IT" },
    { key: "media", label: "Multimedia" },
  ];

  const filteredServices = activeCategory === "all"
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* HEADER HERO */}
      <section className="pt-12 pb-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">Katalog Layanan {companyInfo.shortName}</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            Layanan Teknologi & Tenaga Ahli Profesional
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
            Solusi pengembangan software, perancangan web, digitalisasi sistem, konsultasi teknologi, serta penyediaan tenaga ahli profesional di Kutai Kartanegara.
          </p>
        </div>
      </section>

      {/* SERVICES CATALOG WITH CATEGORY FILTER */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                activeCategory === cat.key
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-950 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col justify-between hover:border-gray-300 hover:shadow-lg transition-all group overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-red-50 group-hover:text-[#eb1000] group-hover:border-red-200 transition-all">
                      {iconMap[service.iconName] || <Globe className="w-6 h-6" />}
                    </div>
                    <Badge variant="cyan" className="capitalize text-[11px]">
                      {service.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl font-extrabold group-hover:text-[#eb1000] transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 leading-relaxed mt-2">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 space-y-4 mt-auto">
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cakupan Keahlian:</p>
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#eb1000] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedService(service)}
                    >
                      <span>Detail & Lingkup Layanan</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* METHODOLOGY / WORKFLOW */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Metodologi Kerja"
          title="Alur Pelaksanaan Pekerjaan JDS"
          subtitle="Tahapan kerja sistematis dan transparan untuk memastikan setiap penugasan dapat diselesaikan tepat waktu dan terukur."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {processSteps.map((p, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-white border border-gray-200 space-y-3 relative hover:shadow-md transition-shadow">
              <span className="text-3xl font-black text-red-200 group-hover:text-[#eb1000]">{p.step}</span>
              <h4 className="text-base font-extrabold text-gray-950 leading-snug">{p.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gray-950 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#eb1000]/20 blur-[100px] rounded-full pointer-events-none"></div>
          <Badge variant="cyan" className="relative">Butuh Solusi Khusus?</Badge>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white relative">
            Konsultasikan Spesifikasi Proyek Anda
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed relative">
            Tim {companyInfo.shortName} siap memberikan rekomendasi perencanaan teknis dan estimasi penyiapan SDM sesuai kebutuhan instansi Anda.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Button asChild size="lg" variant="accent">
              <Link href="/contact" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>Minta Penawaran / Konsultasi</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600">
              <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer">
                Hubungi via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
