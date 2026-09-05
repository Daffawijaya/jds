"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock,
  Code2,
  Mail,
  MapPin,
  Palette,
  Send,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { JobApplyModal } from "@/components/modals/JobApplyModal";
import { companyInfo, jobPostingsData } from "@/data/companyData";

const cultureItems = [
  {
    number: "01",
    icon: Users,
    title: "Lingkungan Kolaboratif",
    description:
      "Suasana kerja yang saling mendukung, mengedepankan komunikasi terbuka dan kerja sama tim yang solid.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Proyek Berdampak Nyata",
    description:
      "Terlibat langsung dalam program digitalisasi dan pendampingan daerah yang memberikan kontribusi nyata bagi masyarakat.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Pengembangan Keahlian",
    description:
      "Kesempatan mengasah kemampuan teknis dan profesional melalui penugasan proyek yang beragam.",
  },
];

const talentAreas = [
  "Web & Software Development",
  "UI/UX & Digital Content",
  "Digitalisasi Sistem",
  "Tenaga Ahli & Pendamping Program",
];

const applicationSteps = [
  {
    number: "01",
    title: "Daftarkan profil",
    description: "Lengkapi informasi keahlian serta tautan CV atau portofolio terbaik Anda.",
  },
  {
    number: "02",
    title: "Peninjauan kebutuhan",
    description: "Tim kami mencocokkan pengalaman Anda dengan kebutuhan proyek dan penugasan yang tersedia.",
  },
  {
    number: "03",
    title: "Mulai berkolaborasi",
    description: "Kandidat yang sesuai akan dihubungi untuk diskusi lanjutan mengenai ruang lingkup penugasan.",
  },
];

const activeJobPostings = jobPostingsData.filter((job) => job.isActive);

export default function CareerPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState(
    "Tenaga Ahli / Professional Talent JDS",
  );

  const handleOpenApply = (jobTitle?: string) => {
    setSelectedJobTitle(jobTitle || "Tenaga Ahli / Professional Talent JDS");
    setIsApplyModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* Hero: dark editorial treatment dari About dengan ritme dan CTA Beranda. */}
      <section className="relative mt-1.5 overflow-hidden bg-black text-white">
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-orange-500 to-purple-600" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"
        />

        <div className="relative max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Karir &amp; Talenta {companyInfo.shortName}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Tumbuh bersama,
              <br />
              ciptakan dampak yang nyata.
            </h1>
            <p className="mt-6 max-w-3xl text-sm sm:text-base leading-relaxed text-gray-300">
              Kami membuka ruang bagi talenta profesional di bidang IT, pengembangan software,
              digitalisasi, dan pendampingan UMKM untuk berkolaborasi dalam berbagai penugasan program.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenApply()}
                className="inline-flex items-center gap-2 rounded-full bg-[#1473E6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Gabung Talent Pool
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#positions"
                className="rounded-full border border-white/70 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Lihat Peluang
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
            <div className="group relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
                alt="Kolaborasi tim profesional"
                fill
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-300">
                  Kolaborasi yang bermakna
                </p>
                <p className="max-w-xl text-2xl sm:text-3xl font-bold leading-tight">
                  Tempat ide, teknologi, dan kepedulian pada daerah bertemu.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl bg-[#1473E6] p-6 sm:p-8">
                <Code2 className="mb-8 h-7 w-7" />
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100">
                  Ruang Berkarya
                </p>
                <p className="mt-2 text-xl font-bold leading-snug">
                  Teknologi yang dekat dengan kebutuhan nyata.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-[#191919] p-6 sm:p-8">
                <MapPin className="mb-8 h-7 w-7 text-blue-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Berbasis di
                </p>
                <p className="mt-2 text-xl font-bold leading-snug">
                  Kutai Kartanegara,
                  <br />
                  Kalimantan Timur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budaya kerja: card language dari featured services di Beranda. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
              Budaya Kerja &amp; Lingkungan
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ruang untuk berkembang dan memberi dampak.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
              Komitmen kami dalam memfasilitasi pertumbuhan profesional dan pengalaman kerja yang bermakna.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cultureItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group flex min-h-[280px] flex-col rounded-2xl bg-zinc-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#191919] hover:text-white hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1473E6] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 transition-colors group-hover:text-gray-500">
                      {item.number}
                    </span>
                  </div>
                  <div className="mt-auto pt-12">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lowongan tetap data-driven dan otomatis beralih ke Talent Pool saat kosong. */}
      <section id="positions" className="scroll-mt-24 bg-[#f8f8f8] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                Peluang Karir
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Lowongan &amp; penyiapan tenaga ahli.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
                Temukan posisi yang tersedia atau daftarkan profil untuk peluang penugasan berikutnya.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {activeJobPostings.length > 0
                ? `${activeJobPostings.length} posisi tersedia`
                : "Talent Pool terbuka"}
            </div>
          </div>

          {activeJobPostings.length > 0 ? (
            <div className="space-y-4">
              {activeJobPostings.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg sm:p-8"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-500">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[#1473E6]">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {job.employmentType}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">{job.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{job.description}</p>
                      {job.requirements.length > 0 && (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {job.requirements.slice(0, 4).map((requirement) => (
                            <li key={requirement} className="flex items-start gap-2 text-xs text-gray-600">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1473E6]" />
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenApply(job.title)}
                      className="shrink-0 rounded-full bg-[#1473E6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Lamar Posisi
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-[1.08fr_0.92fr]">
              <div className="p-6 sm:p-10 lg:p-12">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1473E6] text-white">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#1473E6]">
                  Database Talenta JDS
                </p>
                <h3 className="max-w-2xl text-2xl sm:text-3xl font-bold leading-tight">
                  Belum ada posisi spesifik, tetapi pintu kolaborasi tetap terbuka.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
                  Sertakan profil dan CV Anda dalam database talenta {companyInfo.officialName} untuk proyek atau penugasan mendatang.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenApply()}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1473E6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  Daftarkan Profil Anda
                </button>
              </div>

              <div className="bg-[#eaf3ff] p-6 sm:p-10 lg:p-12">
                <Palette className="mb-8 h-7 w-7 text-[#1473E6]" />
                <h3 className="text-xl font-bold">Bidang talenta yang kami sambut</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Kami membangun jejaring lintas disiplin untuk mendukung kebutuhan teknologi dan program daerah.
                </p>
                <ul className="mt-8 space-y-4">
                  {talentAreas.map((area) => (
                    <li key={area} className="flex items-center gap-3 border-b border-blue-200 pb-4 text-sm font-semibold last:border-0 last:pb-0">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#1473E6]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Proses singkat memberi ekspektasi jelas tanpa menambah klaim rekrutmen. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
              Cara Bergabung
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Proses singkat, komunikasi jelas.
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {applicationSteps.map((step) => (
              <li key={step.number} className="border-t border-gray-300 pt-6">
                <span className="text-sm font-bold text-[#1473E6]">{step.number}</span>
                <h3 className="mt-8 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA full-bleed mengikuti Services. */}
      <section className="bg-[#191919] py-20 text-white">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Informasi Kontak Karir
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Punya pertanyaan tentang peluang di {companyInfo.shortName}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-400">
            Hubungi kami untuk informasi mengenai rekrutmen tenaga ahli, penugasan proyek, atau pengiriman portofolio.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleOpenApply()}
              className="inline-flex items-center gap-2 rounded-full bg-[#1473E6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Daftarkan Profil
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={`mailto:${companyInfo.email}?subject=Pertanyaan%20Karir%20JDS`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              <Mail className="h-4 w-4" />
              Kirim Email
            </a>
          </div>
          <p className="mt-5 text-xs text-gray-500">{companyInfo.email}</p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#FFF0E6] via-[#F4E6FF] to-[#E6F0FF] py-6">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="font-semibold text-gray-900">Berkarya bersama {companyInfo.shortName}.</p>
            <p className="text-sm text-gray-600">
              Bangun solusi digital yang relevan untuk instansi, bisnis, dan masyarakat.
            </p>
          </div>
          <a
            href="#positions"
            className="shrink-0 rounded-full bg-[#1473E6] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Lihat Peluang
          </a>
        </div>
      </section>

      <Footer variant="light" />

      <JobApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={selectedJobTitle}
      />
    </div>
  );
}
