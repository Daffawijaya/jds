"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, FolderGit2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { projectsData } from "@/data/companyData";
import { Project } from "@/types";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "Semua Proyek" },
    { key: "staffing", label: "Professional Staffing" },
    { key: "platform", label: "Digital Platform & Web" },
  ];

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter((p) => {
        if (activeCategory === "staffing") return p.category.toLowerCase().includes("staffing");
        if (activeCategory === "platform") return p.category.toLowerCase().includes("platform") || p.category.toLowerCase().includes("web");
        return true;
      });

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* HEADER HERO */}
      <section className="pt-12 pb-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">Portofolio Pekerjaan</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            Proyek & Rekam Pengalaman JDS
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
            Kaji rekam jejak pelaksanaan pekerjaan terverifikasi yang dipercayakan kepada Jaya Dinara Sukses di Kabupaten Kutai Kartanegara.
          </p>
        </div>
      </section>

      {/* PROJECTS LISTING */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all group">
                {/* Visual Placeholder Header */}
                <div className="h-48 sm:h-56 bg-gradient-to-br from-gray-100 via-white to-gray-50 border-b border-gray-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="relative flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 mb-3 group-hover:scale-105 transition-transform">
                      <FolderGit2 className="w-7 h-7" />
                    </div>
                    <Badge variant="cyan" className="mb-1 text-[11px]">
                      {project.category}
                    </Badge>
                    <p className="text-base font-extrabold text-gray-950 max-w-sm">
                      {project.imagePlaceholderText}
                    </p>
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge variant="teal">{project.year}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-extrabold group-hover:text-[#eb1000] transition-colors">
                    {project.title}
                  </CardTitle>

                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 mt-1">
                    <Building2 className="w-4 h-4 shrink-0 text-gray-400" />
                    <span>{project.client}</span>
                  </div>

                  <CardDescription className="text-sm text-gray-500 leading-relaxed mt-3">
                    {project.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 space-y-4 mt-auto">
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ruang Lingkup Pelaksanaan:</p>
                    <ul className="space-y-1.5">
                      {project.scope.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#eb1000] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>Kaji Detail Proyek</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gray-950 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#eb1000]/20 blur-[100px] rounded-full pointer-events-none"></div>
          <Badge variant="cyan" className="relative">Kerja Sama Terpercaya</Badge>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white relative">
            Ingin Mengembangkan Proyek / Aplikasi Serupa?
          </h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed relative">
            Jaya Dinara Sukses berpengalaman mengelola proyek perangkat lunak dan penyiapan tenaga ahli pendamping secara terukur dan tepat sasaran.
          </p>
          <div className="pt-2 relative">
            <Button asChild size="lg" variant="accent">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Diskusi Proyek Bersama JDS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
