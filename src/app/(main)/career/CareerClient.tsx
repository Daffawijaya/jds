"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  MessagesSquare,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { CareerFlowModal, type CareerFlowRequest, type CareerRole } from "@/components/modals/CareerFlowModal";
import { FaqSection } from "@/components/shared/FaqSection";

type CareerRoleGroup = "technology" | "creative" | "program";
type CareerRoleFilter = "all" | CareerRoleGroup;

const careerRoleFilters: { id: CareerRoleFilter; label: string }[] = [
  { id: "all", label: "Semua posisi" },
  { id: "technology", label: "Teknologi" },
  { id: "creative", label: "Desain & Konten" },
  { id: "program", label: "Program & Operasional" },
];

interface CareerClientProps {
  careerRoles: CareerRole[];
}

const careerCards = [
  {
    title: "Bangun solusi yang benar-benar dipakai.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
  },
  {
    title: "Bertumbuh bersama tim lintas disiplin.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
  },
  {
    title: "Bekerja dekat dengan kebutuhan daerah.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85",
    imagePosition: "center",
  },
  {
    title: "Dari ide menjadi dampak yang terukur.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
    imagePosition: "right",
  },
];

const applicationSteps = [
  {
    number: "01",
    title: "Kirim profil terbaik Anda.",
    description: "Ceritakan keahlian, pengalaman, serta tautkan CV atau portofolio yang paling relevan.",
  },
  {
    number: "02",
    title: "Kami pelajari kecocokannya.",
    description: "Tim JDS meninjau profil Anda terhadap kebutuhan posisi dan penugasan yang sedang disiapkan.",
  },
  {
    number: "03",
    title: "Mulai percakapan.",
    description: "Jika ada kebutuhan yang sesuai, kami menghubungi Anda untuk membahas peran dan ruang lingkupnya.",
  },
];

const faqItems = [
  {
    question: "Apakah JDS sedang membuka lowongan?",
    answer:
      "Tabel Peluang menampilkan area posisi yang paling sering dibutuhkan untuk Talent Pool JDS, bukan jaminan lowongan aktif. Saat ada kebutuhan spesifik yang sesuai, tim kami akan menghubungi kandidat terpilih.",
  },
  {
    question: "Bidang keahlian apa yang paling sering dibutuhkan?",
    answer:
      "Kami menyambut profil di bidang web dan software development, UI/UX, konten digital, digitalisasi sistem, serta tenaga ahli dan pendamping program.",
  },
  {
    question: "Apakah harus berdomisili di Kutai Kartanegara?",
    answer:
      "Tidak selalu. Ketentuan lokasi mengikuti kebutuhan setiap penugasan. Sebagian peran dapat bersifat fleksibel, sementara peran lapangan membutuhkan kehadiran di lokasi proyek.",
  },
  {
    question: "Apa yang perlu disiapkan saat mendaftar?",
    answer:
      "Siapkan informasi kontak, bidang keahlian, ringkasan pengalaman, serta tautan CV, LinkedIn, GitHub, atau portofolio yang dapat kami akses.",
  },
  {
    question: "Kapan saya akan dihubungi setelah mengirim profil?",
    answer:
      "Profil akan disimpan dan ditinjau ketika ada kebutuhan yang relevan. Tim kami akan menghubungi kandidat yang paling sesuai untuk diskusi lanjutan.",
  },
];

export default function CareerClient({ careerRoles }: CareerClientProps) {
  const [careerFlow, setCareerFlow] = useState<CareerFlowRequest | null>(null);
  const [roleFilter, setRoleFilter] = useState<CareerRoleFilter>("all");

  const visibleCareerRoles = careerRoles.filter(
    (role) => roleFilter === "all" || role.group === roleFilter,
  );

  const handleOpenApply = () => {
    setCareerFlow({
      initialView: "apply",
      role: null,
      jobTitle: "",
    });
  };

  const handleOpenDetail = (role: CareerRole) => {
    setCareerFlow({
      initialView: "detail",
      role,
      jobTitle: role.title,
      roleSlug: role.id,
    });
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans text-[#2c2c2c] antialiased">
      <section id="overview" className="scroll-mt-28 bg-[#f5f5f5]">
        <div className="grid w-full lg:grid-cols-2">
          <div className="flex min-h-[560px] flex-col justify-center px-7 py-8 sm:px-12 lg:min-h-[calc(100svh-4rem)] lg:px-16 lg:py-14 xl:px-24">
            <div className="mb-5 flex items-center gap-3 text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                <Image src="/icon.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span>Karir</span>
            </div>
            <h1 className="max-w-[480px] text-4xl font-bold leading-[1.25] tracking-[-0.03em] sm:text-[2.5rem] lg:text-[2.75rem]">
              Berkarya untuk masa depan yang lebih baik.
            </h1>
            <p className="mt-5 max-w-[500px] text-lg leading-7 text-[#3f3f3f]">
              Bergabunglah dengan tim yang membangun solusi teknologi, digitalisasi, dan program berdampak untuk organisasi serta masyarakat.
            </p>
            <p className="mt-6 text-lg font-bold">Temukan tempat terbaik untuk kontribusi Anda.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenApply()}
                className="inline-flex items-center gap-2 rounded-full bg-[#1473e6] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0d66d0]"
              >
                Gabung Talent Pool
                <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#positions" className="rounded-full border-2 border-[#2c2c2c] px-6 py-2.5 text-sm font-bold transition-colors hover:bg-[#2c2c2c] hover:text-white">
                Lihat peluang
              </a>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden lg:min-h-[calc(100svh-4rem)]">
            <Image
              src="/image/Codex Image Sep 5, 2026, 10_30_52 PM.png"
              alt="Gedung dengan identitas JDS"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="positions" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/55">Talent Pool JDS</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
              Temukan area posisi yang sesuai untuk Anda.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
              Jelajahi bidang talenta yang paling sering kami butuhkan. Ketersediaan peran dan ketentuan penugasan mengikuti kebutuhan setiap proyek.
            </p>
          </div>

          <div className="mt-10 border-b border-[#dadada] sm:mt-12">
            <div
              className="-mb-px flex gap-1 overflow-x-auto"
              role="tablist"
              aria-label="Filter area posisi"
            >
              {careerRoleFilters.map((filter) => {
                const isActive = roleFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setRoleFilter(filter.id)}
                    className={`relative shrink-0 px-5 py-4 text-sm font-bold transition-colors sm:px-7 ${
                      isActive ? "text-[#2c2c2c]" : "text-black/55 hover:text-[#2c2c2c]"
                    }`}
                  >
                    {filter.label}
                    <span
                      className={`absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-[#3b63fb] transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-none border border-[#dadada] bg-white lg:block">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">
                Daftar area posisi Talent Pool JDS beserta jenjang pendidikan dan jurusan yang relevan
              </caption>
              <thead>
                <tr className="text-sm font-bold text-[#2c2c2c]">
                  <th scope="col" className="w-[31%] bg-[#f8f8f8] px-7 py-5">
                    Nama posisi
                  </th>
                  <th scope="col" className="w-[19%] border-l border-[#dadada] px-7 py-5">
                    Jenjang pendidikan
                  </th>
                  <th scope="col" className="w-[36%] border-l border-[#dadada] px-7 py-5">
                    Jurusan yang relevan
                  </th>
                  <th scope="col" className="w-[14%] border-l border-[#dadada] px-6 py-5 text-center">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleCareerRoles.map((role) => (
                  <tr key={role.id} className="group border-t border-[#dadada] align-middle">
                    <th scope="row" className="bg-[#f8f8f8] px-7 py-6 font-normal">
                      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-black/50">
                        {role.groupLabel}
                      </span>
                      <span className="mt-2 block text-lg font-bold leading-snug text-[#2c2c2c]">
                        {role.title}
                      </span>
                    </th>
                    <td className="border-l border-[#dadada] px-7 py-6 text-[0.9375rem] font-semibold leading-6 text-[#2c2c2c]">
                      {role.education}
                    </td>
                    <td className="border-l border-[#dadada] px-7 py-6 text-[0.9375rem] leading-6 text-black/70">
                      {role.majors}
                    </td>
                    <td className="border-l border-[#dadada] px-5 py-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(role)}
                        className="inline-flex min-w-24 items-center justify-center rounded-full bg-[#3b63fb] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#274dea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b63fb] focus-visible:ring-offset-2"
                        aria-label={`Lihat detail ${role.title}`}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 lg:hidden">
            {visibleCareerRoles.map((role) => (
              <article key={role.id} className="overflow-hidden rounded-2xl border border-[#dadada] bg-white">
                <div className="bg-[#f8f8f8] px-5 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/50">{role.groupLabel}</p>
                  <h3 className="mt-2 text-xl font-bold leading-snug">{role.title}</h3>
                </div>
                <dl className="divide-y divide-[#dadada] border-y border-[#dadada]">
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-5">
                    <dt className="text-sm font-bold text-[#2c2c2c]">Jenjang pendidikan</dt>
                    <dd className="text-sm leading-6 text-black/70">{role.education}</dd>
                  </div>
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-5">
                    <dt className="text-sm font-bold text-[#2c2c2c]">Jurusan yang relevan</dt>
                    <dd className="text-sm leading-6 text-black/70">{role.majors}</dd>
                  </div>
                </dl>
                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(role)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#3b63fb] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#274dea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b63fb] focus-visible:ring-offset-2 sm:w-auto"
                  >
                    Lihat detail
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-[#f8f8f8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-bold">Belum menemukan bidang yang benar-benar cocok?</p>
              <p className="mt-1 text-sm leading-6 text-black/65">
                Kirim profil Anda agar tim JDS dapat mempertimbangkannya untuk kebutuhan lain yang relevan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenApply()}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-[#2c2c2c] px-6 py-2.5 text-sm font-bold transition-colors hover:bg-[#2c2c2c] hover:text-white"
            >
              Gabung Talent Pool
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="culture" className="scroll-mt-28 px-7 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
            Pekerjaan bermakna. Sekarang lebih dekat dengan Anda.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {careerCards.map((card) => (
              <a key={card.title} href="#positions" className="group overflow-hidden rounded-2xl border border-black/15 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ececec]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${card.imagePosition === "right" ? "object-right" : "object-center"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
                <p className="min-h-24 px-4 py-4 text-[0.9375rem] font-bold leading-snug sm:px-5 sm:py-5 sm:text-lg">{card.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 px-7 py-20 text-center sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Satu profil. Banyak kemungkinan.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
            Kirimkan profil satu kali, lalu biarkan kami mencocokkannya dengan kebutuhan proyek JDS yang relevan.
          </p>
        </div>
        <div className="relative mx-auto mt-12 min-h-[500px] max-w-[1120px] overflow-hidden bg-[#dcecff] text-left">
          <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1800&q=90" alt="Sesi kolaborasi dan pengembangan talenta" fill sizes="(min-width: 1400px) 1310px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
          <div className="relative flex min-h-[500px] max-w-xl flex-col justify-center p-7 text-white sm:p-12 lg:p-16">
            <MessagesSquare className="h-10 w-10" />
            <h3 className="mt-7 text-3xl font-bold leading-tight sm:text-4xl">Proses yang jelas sejak awal.</h3>
            <p className="mt-5 text-lg leading-7 text-white/80">Anda tahu apa yang perlu dikirim, bagaimana profil ditinjau, dan kapan percakapan dimulai.</p>
          </div>
        </div>
        <ol className="mx-auto mt-12 grid max-w-[1120px] gap-8 text-left md:grid-cols-3">
          {applicationSteps.map((step) => (
            <li key={step.number} className="border-t-2 border-black pt-6">
              <span className="text-sm font-bold text-[#1473e6]">{step.number}</span>
              <h3 className="mt-8 text-2xl font-bold leading-tight">{step.title}</h3>
              <p className="mt-3 leading-7 text-black/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <FaqSection
        title="Pertanyaan yang sering diajukan"
        items={faqItems}
      />

      <Footer variant="light" />

      <CareerFlowModal request={careerFlow} onClose={() => setCareerFlow(null)} />
    </div>
  );
}
