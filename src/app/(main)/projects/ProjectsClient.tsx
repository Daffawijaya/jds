"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import PageHeroWithTabs from "@/components/shared/PageHeroWithTabs";
import { FeatureSection } from "@/components/shared/FeatureSection";

type CompanyInfo = {
  official_name: string | null;
  short_name: string | null;
  whatsapp_url: string | null;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  category: string | null;
  year: string | null;
  short_desc: string | null;
  full_desc: string | null;
  scope: string[];
  tags: string[];
  highlight_badge: string | null;
};

const projectImages: Record<string, string> = {
  "tenaga-ahli-umkm-2026": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  "etamhub": "/image/etamhub.png",
};

const categories = [
  { key: "all", label: "Semua Proyek" },
  { key: "staffing", label: "Professional Staffing" },
  { key: "platform", label: "Digital Platform & Web" },
];

interface ProjectsClientProps {
  companyInfo: CompanyInfo;
  projectsData: ProjectRow[];
}

export default function ProjectsClient({ companyInfo, projectsData }: ProjectsClientProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectRow | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((project) => {
          const category = (project.category ?? "").toLowerCase();

          if (activeCategory === "staffing") return category.includes("staffing");
          if (activeCategory === "platform") {
            return category.includes("platform") || category.includes("web");
          }

          return true;
        });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero + Tabs — same layout as Services */}
      <PageHeroWithTabs
        title={<>Proyek {companyInfo.short_name}.</>}
        description={`Proyek terverifikasi yang dipercayakan kepada ${companyInfo.official_name} untuk digitalisasi dan penguatan tenaga ahli.`}
        bgImage="/image/bgpur.png"
        tabs={categories}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      {/* Project grid dibuat ringan seperti service grid: visual, judul, uraian, lalu scope. */}
      <section id="projects" className="scroll-mt-24">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-12">
          <h2 className="text-center text-xl font-semibold mb-12">
            Karya terpilih yang menghubungkan teknologi, instansi, dan masyarakat.
          </h2>
        </div>

        {filteredProjects.map((project, idx) => (
          <FeatureSection
            key={project.id}
            image={projectImages[project.slug] || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"}
            imageAlt={project.slug}
            badge={project.category ?? ""}
            title={project.title}
            description={project.short_desc ?? ""}
            button={{ label: "Kaji detail proyek", onClick: () => setSelectedProject(project) }}
            imagePosition={idx % 2 === 0 ? "left" : "right"}
          />
        ))}

        <p className="mt-12 text-center text-sm text-gray-500">
          {filteredProjects.length} proyek tersedia
        </p>
      </section>

      {/* Dark CTA mengambil treatment yang sama dengan dark sections pada Services. */}
      <section className="bg-[#191919] text-white py-20 mt-8">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Kerja Sama Terpercaya
          </p>
          <h2 className="text-3xl font-bold mb-2">
            Ingin Mengembangkan Proyek atau Aplikasi Serupa?
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Tim {companyInfo.short_name} siap membantu merancang solusi perangkat lunak dan menyiapkan tenaga ahli pendamping secara terukur dan tepat sasaran.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1473E6] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              <span>Diskusi Proyek Bersama {companyInfo.short_name}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={companyInfo.whatsapp_url ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Promo strip menyamakan akhir halaman Projects dengan Services. */}
      <section className="bg-gradient-to-r from-[#FFF0E6] via-[#F4E6FF] to-[#E6F0FF] py-6">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1473E6] text-sm font-bold text-white shadow-sm">
              {companyInfo.short_name}
            </div>
            <p className="font-semibold text-gray-900">
              Mulai proyek berikutnya bersama {companyInfo.short_name}.{" "}
              <span className="font-normal text-gray-600">
                Konsultasikan kebutuhan dan ruang lingkupnya sekarang.
              </span>
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-[#1473E6] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors"
          >
            Mulai Konsultasi
          </Link>
        </div>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer variant="light" />
    </div>
  );
}
