"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Users,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { companyInfo, projectsData } from "@/data/companyData";
import { Project } from "@/types";
import PageHeroWithTabs from "@/components/shared/PageHeroWithTabs";

const categories = [
  { key: "all", label: "Semua Proyek" },
  { key: "staffing", label: "Professional Staffing" },
  { key: "platform", label: "Digital Platform & Web" },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((project) => {
          const category = project.category.toLowerCase();

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
        title={<>Proyek {companyInfo.shortName}.</>}
        description={`Rekam jejak pekerjaan terverifikasi yang dipercayakan kepada ${companyInfo.officialName} untuk mendukung digitalisasi dan penguatan tenaga ahli di Kutai Kartanegara.`}
        bgImage="/image/bgpur.png"
        tabs={categories}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      {/* Project grid dibuat ringan seperti service grid: visual, judul, uraian, lalu scope. */}
      <section id="projects" className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-12 scroll-mt-24">
        <h2 className="text-center text-xl font-semibold mb-2">
          Karya terpilih yang menghubungkan teknologi, instansi, dan masyarakat.
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Setiap proyek dikelola dengan ruang lingkup jelas, pelaksanaan terukur, dan fokus pada dampak.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isStaffing = project.category.toLowerCase().includes("staffing");
            const ProjectIcon = isStaffing ? Users : Globe;

            return (
              <article key={project.id}>
                <div className="relative rounded-xl mb-4 w-full bg-gray-100 flex items-center justify-center aspect-video overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-[#1473E6]/10" />
                  <span className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700 shadow-sm">
                    {project.year}
                  </span>
                  <div className="relative flex max-w-sm flex-col items-center px-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <ProjectIcon className="h-6 w-6" />
                    </div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1473E6]">
                      {project.category}
                    </p>
                    <p className="font-semibold text-gray-700">
                      {project.imagePlaceholderText}
                    </p>
                  </div>
                </div>

                <h3 className="font-bold mb-2">{project.title}</h3>
                <div className="mb-3 flex items-start gap-2 text-xs font-semibold text-gray-500">
                  <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{project.client}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {project.shortDesc}{" "}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
                  >
                    Kaji detail proyek
                  </button>
                </p>
                <ul className="space-y-1.5">
                  {project.scope.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1473E6]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

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
            Tim {companyInfo.shortName} siap membantu merancang solusi perangkat lunak dan menyiapkan tenaga ahli pendamping secara terukur dan tepat sasaran.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1473E6] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              <span>Diskusi Proyek Bersama {companyInfo.shortName}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={companyInfo.whatsappUrl}
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
              {companyInfo.shortName}
            </div>
            <p className="font-semibold text-gray-900">
              Mulai proyek berikutnya bersama {companyInfo.shortName}.{" "}
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
