"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FullscreenDetailSheet } from "@/components/modals/FullscreenDetailSheet";

interface ProjectDetailModalProps {
  project: { title: string; client: string | null; category: string | null; year: string | null; full_desc: string | null; scope: string[]; tags: string[]; highlight_badge: string | null } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const relatedService = project ? getRelatedService(project) : "Konsultasi Umum / Lainnya";
  return (
    <FullscreenDetailSheet open={isOpen && project !== null} onClose={onClose} contentKey={project?.title ?? null} title={project ? `Detail proyek ${project.title}` : "Detail proyek"} description="Informasi lengkap dan ruang lingkup pelaksanaan proyek.">
      {project && <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-white lg:overflow-hidden"><div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:h-full lg:px-14"><div className="grid w-full gap-10 py-8 lg:h-full lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-0">
        <section aria-label="Ringkasan proyek" className="lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"><div className="lg:flex lg:min-h-full lg:items-center lg:py-8"><div className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">{project.category || "Proyek"} · Proyek JDS</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.1] tracking-[-0.025em] text-zinc-950 sm:text-5xl">{project.title}</h2>
          {project.highlight_badge && <p className="mt-6 inline-flex border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#274dea]">{project.highlight_badge}</p>}
          <dl className="mt-9 divide-y divide-zinc-200 border-y border-zinc-200"><ProjectDetailRow label="Klien / instansi" value={project.client || "-"} /><ProjectDetailRow label="Tahun pelaksanaan" value={project.year || "-"} /></dl>
          <div className="mt-9 border-t border-zinc-200 pt-7"><Link href={`/contact?service=${encodeURIComponent(relatedService)}#contact-form`} className="inline-flex items-center gap-2 rounded-full bg-[#3b63fb] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#274dea]">Konsultasi proyek serupa <ArrowRight className="h-4 w-4" /></Link></div>
        </div></div></section>
        <section aria-label="Detail dan ruang lingkup proyek" className="lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"><div className="lg:flex lg:min-h-full lg:items-center lg:py-8"><div className="w-full space-y-10">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">Tentang proyek</p><p className="mt-4 text-lg leading-8 text-zinc-600">{project.full_desc || "Informasi detail proyek belum tersedia."}</p></div>
          <div><h3 className="text-xl font-bold text-zinc-950">Ruang lingkup pekerjaan</h3>{project.scope.length > 0 ? <ul className="mt-6 space-y-4">{project.scope.map((item) => <li key={item} className="flex gap-4 text-base leading-7 text-zinc-600"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600"><Check className="h-3.5 w-3.5" /></span><span>{item}</span></li>)}</ul> : <p className="mt-4 text-base text-zinc-500">Ruang lingkup belum tersedia.</p>}</div>
          {project.tags.length > 0 && <div className="border-t border-zinc-200 pt-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">Teknologi & kategori</p><div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">#{tag}</span>)}</div></div>}
        </div></div></section>
      </div></div></div>}
    </FullscreenDetailSheet>
  );
}

function ProjectDetailRow({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-8"><dt className="text-sm font-bold text-zinc-900">{label}</dt><dd className="text-sm leading-6 text-zinc-600">{value}</dd></div>;
}

function getRelatedService(project: NonNullable<ProjectDetailModalProps["project"]>) {
  const context = [project.title, project.category, ...project.tags].filter(Boolean).join(" ").toLowerCase();
  if (/professional staffing|tenaga ahli|staffing/.test(context)) return "Professional Staffing / Tenaga Ahli";
  if (/outsourcing|alih daya/.test(context)) return "IT Outsourcing";
  if (/web|website|digital platform/.test(context)) return "Web Development";
  if (/software|aplikasi|backend/.test(context)) return "Software Development";
  if (/ui.?ux|desain antarmuka/.test(context)) return "UI/UX Design";
  if (/multimedia|konten|content/.test(context)) return "Multimedia & Digital Content";
  if (/digitalisasi|digitalization/.test(context)) return "Digitalization Solutions";
  if (/konsultasi|consulting/.test(context)) return "IT Consulting";
  return "Konsultasi Umum / Lainnya";
}
