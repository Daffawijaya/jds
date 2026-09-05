"use client";

import { useState } from "react";
import { Globe, Code2, Layout, Cpu, Lightbulb, Server, Users, Film, CheckCircle2 } from "lucide-react";
import { ServiceDetailModal } from "@/components/modals/ServiceDetailModal";
import { companyInfo, servicesData } from "@/data/companyData";
import { Service } from "@/types";
import { Footer } from "@/components/layout/Footer";

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
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* 1. HERO SECTION */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Layanan {companyInfo.shortName}.
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Solusi pengembangan software, perancangan web, digitalisasi sistem, konsultasi teknologi, serta penyediaan tenaga ahli profesional.
        </p>
        <a href="#services" className="bg-[#1473E6] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg mb-8 inline-block">
          Lihat Semua Layanan
        </a>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`transition-colors ${
                activeCategory === cat.key
                  ? "text-black border-b-2 border-black pb-1"
                  : "hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </section>

      {/* 2. SERVICES GRID */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-center text-xl font-semibold mb-2">
          Temukan layanan teknologi yang tepat untuk kebutuhan instansi atau bisnis Anda.
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Setiap layanan dirancang untuk membantu transformasi digital secara efisien dan terukur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id}>
              <div className="rounded-xl mb-4 w-full bg-gray-100 flex items-center justify-center aspect-video">
                <div className="text-gray-400">
                  {iconMap[service.iconName] || <Globe className="w-10 h-10" />}
                </div>
              </div>
              <h3 className="font-bold mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {service.shortDesc}{" "}
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-blue-600 underline"
                >
                  Pelajari lebih lanjut
                </button>
              </p>
              <ul className="space-y-1.5">
                {service.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1473E6] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <span className="text-gray-500 text-sm">
            {filteredServices.length} layanan tersedia
          </span>
        </div>
      </section>

      {/* 3. METHODOLOGY SECTION (Dark) */}
      <section className="bg-[#191919] text-white py-16 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <div className="bg-[#2A2A2A] rounded-lg w-full aspect-video flex items-center justify-center">
              <span className="text-gray-500 text-sm">Metodologi Kerja</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Alur Pelaksanaan Pekerjaan {companyInfo.shortName}
            </h2>
            <p className="text-gray-400 mb-4">
              Tahapan kerja sistematis dan transparan untuk memastikan setiap penugasan dapat diselesaikan tepat waktu dan terukur.
            </p>
            <a href="#methodology" className="text-white underline font-medium hover:text-gray-300">
              Pelajari alur kerja
            </a>
          </div>
        </div>
      </section>

      {/* 4. PROCESS STEPS GRID */}
      <section id="methodology" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            Tahapan Kerja {companyInfo.shortName}
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Setiap proyek melewati 5 tahapan terstruktur untuk memastikan kualitas dan ketepatan waktu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="w-20 h-20 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-[#1473E6]">{step.step}</span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 uppercase">
                    LANGKAH {step.step}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (Dark) */}
      <section className="bg-[#191919] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Butuh Solusi Khusus?</h2>
          <p className="text-gray-400 mb-12">
            Tim {companyInfo.shortName} siap memberikan rekomendasi perencanaan teknis dan estimasi penyiapan SDM sesuai kebutuhan instansi Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="bg-[#1473E6] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg">
              Minta Penawaran / Konsultasi
            </a>
            <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="border border-gray-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800">
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 6. PROMO BANNER */}
      <section className="bg-gradient-to-r from-[#FFF0E6] via-[#F4E6FF] to-[#E6F0FF] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-lg bg-[#1473E6] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {companyInfo.shortName}
            </div>
            <p className="font-semibold text-gray-900">
              {companyInfo.shortName} menyediakan layanan terintegrasi.{" "}
              <span className="font-normal text-gray-600">
                Konsultasikan kebutuhan Anda sekarang.
              </span>
            </p>
          </div>
          <a href="/contact" className="bg-[#1473E6] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold text-sm">
            Mulai Konsultasi
          </a>
        </div>
      </section>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Footer */}
      <Footer variant="light" />
    </div>
  );
}
