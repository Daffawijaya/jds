"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Globe,
  Code2,
  Layout,
  Cpu,
  Lightbulb,
  Server,
  Users,
  Film,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Building2,
  Layers,
  Award,
  Zap,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceDetailModal } from "@/components/modals/ServiceDetailModal";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { companyInfo, servicesData, projectsData, companyStrengthsData } from "@/data/companyData";
import { Service, Project } from "@/types";

/* ═══════════════════════════════════════════════════════════════════
   JDS Homepage — Apple Intelligence Light Theme Style
   Stack: Next.js App Router + Tailwind + Framer Motion
   ═══════════════════════════════════════════════════════════════════ */

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Film: <Film className="w-6 h-6" />,
  MapPin: <MapPin className="w-3.5 h-3.5" />,
  Layers: <Layers className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
};

const categoryAccent: Record<string, { chip: string; text: string; glow: string }> = {
  development: {
    chip: "bg-cyan-100 border-cyan-200 text-cyan-700",
    text: "text-cyan-600",
    glow: "from-cyan-400 to-blue-500",
  },
  solutions: {
    chip: "bg-teal-100 border-teal-200 text-teal-700",
    text: "text-teal-600",
    glow: "from-teal-400 to-emerald-500",
  },
  consulting: {
    chip: "bg-violet-100 border-violet-200 text-violet-700",
    text: "text-violet-600",
    glow: "from-violet-400 to-purple-500",
  },
  outsourcing: {
    chip: "bg-amber-100 border-amber-200 text-amber-700",
    text: "text-amber-600",
    glow: "from-amber-400 to-orange-500",
  },
  media: {
    chip: "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700",
    text: "text-fuchsia-600",
    glow: "from-fuchsia-400 to-pink-500",
  },
};

const fallbackAccent = categoryAccent["development"];

// ─── Section Component ─────────────────────────────────────────────

function LightSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative bg-white py-24 sm:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHeader({
  badge,
  badgeColor = "bg-gray-100 text-gray-700",
  title,
  titleWhite = false,
  description,
}: {
  badge?: string;
  badgeColor?: string;
  title: React.ReactNode;
  titleWhite?: boolean;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 sm:mb-20"
    >
      {badge && (
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${badgeColor}`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
          titleWhite ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-100/50 rounded-full blur-[120px]" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#eb1000]">
            {companyInfo.shortName} · {companyInfo.officialName}
          </span>
          <span className="h-3 w-px bg-gray-300" />
          <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5" />
            {companyInfo.regency}, {companyInfo.province}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[2.75rem] leading-[1.0] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight"
        >
          Teknologi.
          <br />
          Digitalisasi.
          <br />
          <span className="text-gray-500">Tenaga Ahli.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
        >
          Satu mitra untuk transformasi digital: membangun sistem, mendigitalkan
          alur kerja, dan menyiapkan tenaga ahli profesional bagi instansi
          maupun bisnis Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
            <Link href="/contact" className="flex items-center gap-2">
              <span>Mulai Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 hover:border-gray-400"
          >
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Tim {companyInfo.shortName}</span>
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Berpengalaman di sektor pemerintahan & bisnis
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Tenaga ahli terverifikasi & terukur
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-15%" });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <LightSection>
        <SectionHeader
          badge="Produk & Layanan"
          badgeColor="bg-red-100 text-red-700"
          title={
            <>
              Satu mitra untuk setiap
              <br />
              <span className="text-gray-500">kebutuhan digital.</span>
            </>
          }
          description="Dari membangun sistem hingga menyiapkan orang-orang yang menjalankannya."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {servicesData.map((service, index) => {
            const accent = categoryAccent[service.category] ?? fallbackAccent;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  onClick={() => setSelectedService(service)}
                  className="group h-full cursor-pointer rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${accent.chip}`}
                  >
                    {iconMap[service.iconName] ?? <Globe className="w-6 h-6" />}
                  </div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${accent.text}`}
                  >
                    {service.category === "development"
                      ? "Pengembangan"
                      : service.category === "solutions"
                        ? "Solusi Digital"
                        : service.category === "consulting"
                          ? "Konsultasi"
                          : service.category === "outsourcing"
                            ? "Outsourcing & SDM"
                            : "Media & Konten"}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                    {service.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                    Lihat detail
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </LightSection>

      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}

// ─── Strengths ─────────────────────────────────────────────────────

function StrengthsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-15%" });

  return (
    <LightSection className="bg-gray-50">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:sticky lg:top-28 space-y-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
            Kenapa {companyInfo.shortName}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Semua yang Anda butuhkan,
            <span className="block text-gray-500">dalam satu tim.</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">{companyInfo.overview}</p>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-7 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
          >
            <Link href="/about" className="flex items-center gap-2">
              <span>Tentang {companyInfo.shortName}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="space-y-4">
          {companyStrengthsData.map((strength, index) => (
            <motion.div
              key={strength.id}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-5 rounded-3xl border border-gray-200 bg-white p-6 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                  {iconMap[strength.iconName] ?? <Zap className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{strength.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{strength.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </LightSection>
  );
}

// ─── Projects ──────────────────────────────────────────────────────

function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-15%" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <LightSection>
        <SectionHeader
          badge="Karya Terbaru"
          badgeColor="bg-red-100 text-red-700"
          title={
            <>
              Bukti kerja sama yang
              <br />
              <span className="text-gray-500">terpercaya.</span>
            </>
          }
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden border-b border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div className="relative h-full flex flex-col items-center justify-center gap-2 p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <div className="absolute top-4 right-4">
                      <Badge variant="cyan">{project.year}</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-gray-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    {project.client}
                  </p>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {project.shortDesc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </LightSection>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-15%" });

  return (
    <LightSection>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gray-900"
      >
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-[#eb1000]/20 blur-[100px]" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-red-600/10 blur-[100px]" />

        <div className="relative px-6 sm:px-12 py-14 sm:py-20 text-center">
          <Badge variant="cyan" className="mb-6">
            Konsultasi & Penawaran
          </Badge>
          <h2 className="max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Siap memulai proyek digitalisasi atau kebutuhan tenaga ahli?
          </h2>
          <p className="max-w-2xl mx-auto mt-5 text-base sm:text-lg text-gray-400">
            Ceritakan kebutuhan Anda — tim {companyInfo.shortName} akan membantu memetakan solusi
            sistem, pengembangan web, maupun penyiapan SDM profesional.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
              <Link href="/contact" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>Hubungi Kami</span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-700 bg-transparent text-white hover:bg-gray-800"
            >
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>WhatsApp Langsung</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </LightSection>
  );
}

// ─── Page ──────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen -mt-20">
      <HeroSection />
      <ServicesSection />
      <StrengthsSection />
      <ProjectsSection />
      <CTASection />
    </div>
  );
}
