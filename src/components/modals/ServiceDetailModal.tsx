"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FullscreenDetailSheet } from "@/components/modals/FullscreenDetailSheet";

interface ServiceDetailModalProps {
  service: { title: string; category: string; full_desc: string | null; features: string[]; deliverables: string[] } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  return (
    <FullscreenDetailSheet open={isOpen && service !== null} onClose={onClose} contentKey={service?.title ?? null} title={service ? `Detail layanan ${service.title}` : "Detail layanan"} description="Informasi lengkap, fitur, dan hasil layanan JDS.">
      {service && <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-white lg:overflow-hidden"><div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:h-full lg:px-14"><div className="grid w-full gap-10 py-8 lg:h-full lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-0">
        <section aria-label="Ringkasan layanan" className="lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"><div className="lg:flex lg:min-h-full lg:items-center lg:py-8"><div className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">{formatCategory(service.category)} · Layanan JDS</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-normal leading-[1.1] tracking-[-0.025em] text-zinc-950 sm:text-5xl">{service.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">{service.full_desc || `Solusi dan ruang lingkup pelaksanaan layanan ${service.title} oleh Jaya Dinara Sukses.`}</p>
          <div className="mt-9 border-t border-zinc-200 pt-7"><Link href={`/contact?service=${encodeURIComponent(service.title)}#contact-form`} className="inline-flex items-center gap-2 rounded-full bg-[#3b63fb] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#274dea]">Minta penawaran layanan <ArrowRight className="h-4 w-4" /></Link></div>
        </div></div></section>
        <section aria-label="Fitur dan hasil layanan" className="lg:min-h-0 lg:overflow-y-auto lg:overscroll-y-contain"><div className="lg:flex lg:min-h-full lg:items-center lg:py-8"><div className="w-full space-y-10">
          <ServiceList title="Fitur & keunggulan layanan" items={service.features} emptyMessage="Fitur layanan belum tersedia." />
          <div className="border-t border-zinc-200 pt-9"><ServiceList title="Hasil kerja / deliverables" items={service.deliverables} emptyMessage="Informasi hasil kerja belum tersedia." /></div>
        </div></div></section>
      </div></div></div>}
    </FullscreenDetailSheet>
  );
}

function ServiceList({ title, items, emptyMessage }: { title: string; items: string[]; emptyMessage: string }) {
  return <div><h3 className="text-xl font-bold text-zinc-950">{title}</h3>{items.length > 0 ? <ul className="mt-6 space-y-4">{items.map((item) => <li key={item} className="flex gap-4 text-base leading-7 text-zinc-600"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600"><Check className="h-3.5 w-3.5" /></span><span>{item}</span></li>)}</ul> : <p className="mt-4 text-base text-zinc-500">{emptyMessage}</p>}</div>;
}

function formatCategory(category: string) {
  const labels: Record<string, string> = { development: "Software & Web", solutions: "Digitalisasi", outsourcing: "Tenaga Ahli & Outsourcing", consulting: "Konsultasi IT", media: "Multimedia" };
  return labels[category] ?? category;
}
