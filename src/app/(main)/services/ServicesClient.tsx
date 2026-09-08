"use client";

import { useState } from "react";
import { Globe, Code2, Layout, Cpu, Lightbulb, Server, Users, Film, CheckCircle2 } from "lucide-react";
import { ServiceDetailModal } from "@/components/modals/ServiceDetailModal";
import { Footer } from "@/components/layout/Footer";
import PageHeroWithTabs from "@/components/shared/PageHeroWithTabs";

type CompanyInfo = {
  short_name: string | null;
  whatsapp_url: string | null;
};

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_desc: string | null;
  full_desc: string | null;
  icon_name: string | null;
  features: string[];
  deliverables: string[];
};

interface ServicesClientProps {
  companyInfo: CompanyInfo;
  servicesData: ServiceRow[];
}

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

const serviceImages: Record<string, string> = {
  "web-development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "software-development": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
  "ui-ux-design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  "digitalization-solutions": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "it-consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  "it-outsourcing": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
  "professional-staffing": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "multimedia-digital-content": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
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

export default function ServicesClient({ companyInfo, servicesData }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<ServiceRow | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [methodTab, setMethodTab] = useState<"perencanaan" | "eksekusi">("perencanaan");

  const planningCards = [
    {
      num: "01",
      color: "bg-[#1473E6]",
      title: "Konsultasi & Analisis",
      subtitle: "Tahap Awal",
      desc: "Pemahaman mendalam terhadap kebutuhan, tantangan, dan tujuan bisnis client sebelum masuk ke perancangan solusi.",
      badge: undefined,
      steps: [
        "Konsultasi & analisis kebutuhan proyek",
        "Identifikasi tantangan & peluang digitalisasi",
        "Penyusunan dokumen kebutuhan & ruang lingkup",
      ],
    },
    {
      num: "02",
      color: "bg-[#1473E6]",
      title: "Perancangan Arsitektur",
      subtitle: "Tahap Perencanaan",
      desc: "Merancang arsitektur solusi teknis, blueprints, dan rencana penyiapan tenaga ahli secara terstruktur.",
      badge: undefined,
      steps: [
        "Perancangan arsitektur & solusi teknis",
        "Penyiapan blueprint & skema tenaga ahli",
        "Estimasi jadwal, biaya, dan sumber daya",
      ],
    },
  ];

  const executionCards = [
    {
      num: "03",
      color: "bg-[#A855F7]",
      title: "Eksekusi & Pengembangan",
      subtitle: "Tahap Inti",
      desc: "Implementasi, pengembangan, dan pengujian produk sesuai perancangan yang telah disepakati.",
      badge: "Inti Pekerjaan",
      steps: [
        "Eksekusi & pengembangan sesuai jadwal",
        "Pengujian & verifikasi kualitas",
        "Optimasi performa & keamanan sistem",
      ],
    },
    {
      num: "04",
      color: "bg-[#A855F7]",
      title: "Penyerahan & Dukungan",
      subtitle: "Tahap Akhir",
      desc: "Serah terima proyek, pelatihan pengguna, dan dukungan pasca-peluncuran untuk kelancaran operasional.",
      badge: "Serah Terima",
      steps: [
        "Peluncuran & serah terima proyek",
        "Pelatihan pengguna & dokumentasi",
        "Dukungan teknis pasca-peluncuran",
      ],
    },
  ];

  const activeCards = methodTab === "perencanaan" ? planningCards : executionCards;

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

      {/* 1. HERO + TABS */}
      <PageHeroWithTabs
        label={`Layanan ${companyInfo.short_name}`}
        title="Solusi teknologi menyeluruh untuk organisasi yang ingin terus berkembang."
        description="Solusi pengembangan software, perancangan web, digitalisasi sistem, konsultasi teknologi, serta penyediaan tenaga ahli profesional."
        bgImage="/image/bgpur.png"
        tabs={categories}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      {/* 2. SERVICES GRID */}
      <section id="services" className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-12">
        <h2 className="text-center text-xl font-semibold mb-12">
          Temukan layanan teknologi yang tepat untuk kebutuhan instansi atau bisnis Anda.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id}>
              <div className="rounded-xl mb-4 w-full bg-gray-100 overflow-hidden aspect-video">
                {serviceImages[service.slug] ? (
                  <img
                    src={serviceImages[service.slug]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {iconMap[service.icon_name ?? ""] || <Globe className="w-10 h-10" />}
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-2xl mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {service.short_desc}{" "}
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-black underline"
                >
                  Pelajari lebih lanjut
                </button>
              </p>
              <ul className="space-y-1.5">
                {service.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-black">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
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
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
              alt="Alur Kerja JDS"
              className="w-[32rem] h-80 object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-white text-2xl md:text-3xl font-semibold leading-snug mb-4">
              Tahapan kerja sistematis dan transparan untuk memastikan setiap penugasan dapat diselesaikan tepat waktu dan terukur.
            </p>
            <a href="#methodology" className="text-white underline font-medium hover:text-gray-300">
              Pelajari alur kerja
            </a>
          </div>
        </div>
      </section>

      {/* 4. PROCESS STEPS (Gradient + 2 Cards) */}
      <section id="methodology" className="bg-gradient-to-b from-white via-[#E8D9FF] to-[#A855F7] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-600 mb-2">
            TAHAPAN KERJA
          </p>
          <h2 className="text-4xl font-bold mb-4">Alur Pelaksanaan {companyInfo.short_name}.</h2>
          <p className="text-gray-700 mb-8">
            Setiap proyek melewati tahapan terstruktur untuk memastikan kualitas dan ketepatan waktu.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm mb-12 border">
            <button
              onClick={() => setMethodTab("perencanaan")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                methodTab === "perencanaan"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Perencanaan
            </button>
            <button
              onClick={() => setMethodTab("eksekusi")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                methodTab === "eksekusi"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Eksekusi
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
            {activeCards.map((card, idx) => (
              <div
                key={`${methodTab}-${idx}`}
                className={`bg-white p-8 rounded-2xl flex flex-col ${
                  card.badge ? "shadow-xl relative border-2 border-yellow-400" : ""
                }`}
              >
                {card.badge && (
                  <div className="absolute top-0 right-8 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-b-lg">
                    {card.badge}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded ${card.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {card.num}
                  </div>
                  <span className="font-bold">{card.title}</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  {card.subtitle}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {card.desc}
                </p>
                <h4 className="font-semibold text-sm mb-4">Tahapan:</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  {card.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      ✓ <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (Dark) */}
      <section className="bg-[#191919] text-white py-20">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Butuh Solusi Khusus?</h2>
          <p className="text-gray-400 mb-12">
            Tim {companyInfo.short_name} siap memberikan rekomendasi perencanaan teknis dan estimasi penyiapan SDM sesuai kebutuhan instansi Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="bg-[#1473E6] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg">
              Minta Penawaran / Konsultasi
            </a>
            <a href={companyInfo.whatsapp_url ?? ""} target="_blank" rel="noopener noreferrer" className="border border-gray-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800">
              Hubungi via WhatsApp
            </a>
          </div>
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
