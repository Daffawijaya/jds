"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import PageHeroWithTabs from "@/components/shared/PageHeroWithTabs";
import { FeatureSection } from "@/components/shared/FeatureSection";
import { TrustCtaSection } from "@/components/shared/TrustCtaSection";

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
        label={`Proyek ${companyInfo.short_name}`}
        title="Karya digital yang memperkuat organisasi dan memberi dampak nyata."
        description={`Proyek terverifikasi yang dipercayakan kepada ${companyInfo.official_name} untuk digitalisasi dan penguatan tenaga ahli.`}
        bgImage="/image/bgpur.png"
        tabs={categories}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      {/* Project grid dibuat ringan seperti service grid: visual, judul, uraian, lalu scope. */}
      <section id="projects" className="scroll-mt-24">
        <div className="max-w-[1310px] mx-auto px-5 sm:px-4 lg:px-6 py-12">
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

      <TrustCtaSection
        className="mt-8"
        eyebrow="Kerja Sama Terpercaya"
        title="Ingin Mengembangkan Proyek atau Aplikasi Serupa?"
        description={`Tim ${companyInfo.short_name} siap membantu merancang solusi perangkat lunak dan menyiapkan tenaga ahli pendamping secara terukur dan tepat sasaran.`}
        primaryAction={{ label: `Diskusi Proyek Bersama ${companyInfo.short_name}`, href: "/contact" }}
        secondaryAction={{ label: "Hubungi via WhatsApp", href: companyInfo.whatsapp_url ?? "", external: true }}
      />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer variant="light" />
    </div>
  );
}
