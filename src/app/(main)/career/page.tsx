"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { JobApplyModal } from "@/components/modals/JobApplyModal";
import { companyInfo, jobPostingsData } from "@/data/companyData";

const pageNav = [
  { label: "Karir", href: "#overview" },
  { label: "Budaya", href: "#culture" },
  { label: "Peluang", href: "#positions" },
  { label: "Cara Bergabung", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

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

const workStories = [
  {
    eyebrow: "Kolaborasi tanpa sekat",
    title: "Pekerjaan terbaik lahir dari banyak sudut pandang.",
    description:
      "Developer, desainer, tenaga ahli, dan pendamping program bekerja sebagai satu tim. Setiap orang punya ruang untuk menyampaikan ide, menguji keputusan, dan ikut membentuk hasil akhir.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "right",
  },
  {
    eyebrow: "Belajar melalui proyek nyata",
    title: "Tumbuh lewat tantangan yang relevan.",
    description:
      "Kami mengembangkan kemampuan lewat persoalan nyata—mulai dari layanan digital, sistem internal, hingga pendampingan program. Anda mendapat konteks, tanggung jawab, dan dukungan untuk berkembang.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "left",
  },
  {
    eyebrow: "Berakar di Kalimantan Timur",
    title: "Dekat dengan orang yang menerima manfaatnya.",
    description:
      "Berbasis di Kutai Kartanegara membuat kami memahami kebutuhan mitra dan masyarakat secara langsung. Teknologi bukan sekadar keluaran proyek, tetapi alat untuk membuat pekerjaan sehari-hari lebih baik.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "right",
  },
];

const featureItems = [
  {
    icon: Code2,
    title: "Proyek teknologi yang beragam",
    description: "Web, software, otomasi, integrasi data, dan platform digital dalam satu lingkungan kerja.",
  },
  {
    icon: Users,
    title: "Kolaborasi lintas keahlian",
    description: "Bertukar perspektif dengan tim teknis, kreatif, operasional, dan tenaga pendamping.",
  },
  {
    icon: GraduationCap,
    title: "Ruang belajar yang nyata",
    description: "Mengembangkan kemampuan melalui tanggung jawab proyek dan umpan balik yang terbuka.",
  },
  {
    icon: Globe2,
    title: "Dampak untuk daerah",
    description: "Mengerjakan solusi yang membantu instansi, pelaku usaha, dan masyarakat lokal.",
  },
  {
    icon: ShieldCheck,
    title: "Kerja profesional",
    description: "Standar kerja yang jelas, komunikasi jujur, dan akuntabilitas dalam setiap penugasan.",
  },
  {
    icon: Layers3,
    title: "Peluang lintas proyek",
    description: "Satu profil dapat dipertimbangkan untuk beragam kebutuhan dan penugasan JDS berikutnya.",
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
      "Posisi aktif selalu ditampilkan pada bagian Peluang. Saat belum ada posisi spesifik, Anda tetap dapat bergabung dengan database talenta JDS.",
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
    <div className="min-h-screen w-full bg-white font-sans text-[#2c2c2c] antialiased">
      <div className="sticky top-16 z-40 border-b border-black/15 bg-white text-[#2c2c2c] md:bg-[#111] md:text-white">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#overview" className="text-sm font-bold tracking-tight">
            Karir JDS
          </a>
          <nav className="hidden items-stretch self-stretch md:flex" aria-label="Navigasi halaman karir">
            {pageNav.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center border-b-2 border-transparent px-5 text-sm font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => handleOpenApply()}
            className="rounded-full border border-[#2c2c2c] px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-[#2c2c2c] hover:text-white md:border-white md:hover:bg-white md:hover:text-black"
          >
            Daftar
          </button>
        </div>
      </div>

      <div className="hidden border-b border-black/10 bg-[#f5f5f5] md:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center gap-3 px-12 text-xs text-black/55">
          <Link href="/" className="transition-colors hover:text-black">Beranda</Link>
          <span aria-hidden="true">/</span>
          <span>JDS</span>
          <span aria-hidden="true">/</span>
          <span className="text-black/80">Karir</span>
        </div>
      </div>

      <section id="overview" className="scroll-mt-28 bg-[#f5f5f5]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="flex min-h-[560px] flex-col justify-start px-7 py-8 sm:px-12 lg:min-h-[650px] lg:px-16 lg:py-14 xl:px-24">
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

          <div className="relative min-h-[520px] overflow-hidden lg:min-h-[650px]">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=90"
              alt="Tim profesional JDS sedang berkolaborasi"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-6 pt-28 sm:p-10 sm:pt-36">
              <div className="ml-auto max-w-md rounded-2xl bg-[#242424]/95 p-5 text-white shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-white/65">
                  <span>Kolaborasi JDS</span>
                  <span>Kalimantan Timur</span>
                </div>
                <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#1473e6]" />
                  <span className="h-1 overflow-hidden rounded-full bg-white/20"><span className="block h-full w-3/4 rounded-full bg-white" /></span>
                  <span className="text-xs font-semibold">Dampak nyata</span>
                </div>
              </div>
            </div>
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

      <section className="px-7 pb-20 pt-8 text-center sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/60">JDS — mitra transformasi digital daerah</p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Talenta hebat bertemu tantangan yang nyata.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
            Kami menyatukan keahlian teknologi, kreativitas, dan pemahaman lokal untuk membantu mitra bergerak lebih cepat dan bekerja lebih baik.
          </p>
        </div>
        <div className="relative mx-auto mt-12 aspect-[16/7] max-w-[1120px] overflow-hidden bg-[#1f1f1f]">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=90"
            alt="Kolaborasi tim dalam proyek digital"
            fill
            sizes="(min-width: 1200px) 1120px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-white">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">JDS</div>
              <p className="text-3xl font-bold tracking-tight sm:text-5xl">Teknologi × Talenta Lokal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-7 py-20 text-center sm:px-8 lg:py-28">
        <h2 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Bangun dampak bersama JDS.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
          Dari ide pertama sampai implementasi di lapangan, setiap kontribusi punya tempat dalam perjalanan proyek kami.
        </p>
      </section>

      <div className="space-y-16 px-7 pb-24 sm:px-8 lg:space-y-28 lg:pb-32">
        {workStories.map((story, index) => (
          <section key={story.title} className="mx-auto grid max-w-[1120px] items-center overflow-hidden rounded-2xl bg-[#f5f5f5] lg:grid-cols-2 lg:gap-20 lg:overflow-visible lg:rounded-none lg:bg-transparent">
            <div className={`p-7 lg:p-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/55">{story.eyebrow}</p>
              <h3 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">{story.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-black/70 sm:text-lg">{story.description}</p>
            </div>
            <div className={`relative aspect-[4/3] overflow-hidden bg-[#ececec] ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image
                src={story.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover ${story.imagePosition === "left" ? "object-left" : "object-right"}`}
              />
            </div>
          </section>
        ))}
      </div>

      <section id="positions" className="scroll-mt-28 bg-[#f5f5f5] px-7 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/55">Peluang Karir</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Temukan peran yang cocok untuk Anda.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
              Lihat posisi yang tersedia atau simpan profil Anda untuk peluang kolaborasi berikutnya.
            </p>
          </div>

          {activeJobPostings.length > 0 ? (
            <div className="mt-12 grid gap-4">
              {activeJobPostings.map((job) => (
                <article key={job.id} className="border-t border-black/20 py-7 first:border-t-2 first:border-black">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-black/60">
                        <span>{job.department}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                        <span>{job.employmentType}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-bold">{job.title}</h3>
                      <p className="mt-2 max-w-3xl leading-7 text-black/70">{job.description}</p>
                    </div>
                    <button type="button" onClick={() => handleOpenApply(job.title)} className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#1473e6] px-6 py-3 text-sm font-bold text-white hover:bg-[#0d66d0]">
                      Lamar posisi
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid overflow-hidden bg-white lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10 lg:p-14">
                <BriefcaseBusiness className="h-9 w-9 text-[#1473e6]" />
                <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-black/55">Talent Pool terbuka</p>
                <h3 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">Belum ada posisi spesifik. Pintu kolaborasi tetap terbuka.</h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-black/70">
                  Daftarkan profil dan CV Anda. Kami akan meninjaunya ketika ada proyek atau penugasan yang sesuai dengan pengalaman Anda.
                </p>
                <button type="button" onClick={() => handleOpenApply()} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1473e6] px-6 py-3 text-sm font-bold text-white hover:bg-[#0d66d0]">
                  Daftarkan profil
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex min-h-[360px] flex-col justify-between bg-[#111] p-7 text-white sm:p-10 lg:p-14">
                <Sparkles className="h-9 w-9 text-[#7eb8ff]" />
                <div>
                  <p className="text-sm font-semibold text-white/55">Area talenta</p>
                  <ul className="mt-5 divide-y divide-white/15 text-lg font-bold">
                    {["Web & Software Development", "UI/UX & Digital Content", "Digitalisasi Sistem", "Tenaga Ahli & Pendamping"].map((area) => (
                      <li key={area} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                        <Check className="h-4 w-4 text-[#7eb8ff]" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-7 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Hal-hal yang membuat kerja Anda lebih berarti.</h2>
          <div className="-mx-7 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-7 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {featureItems.map((item, index) => {
              const Icon = item.icon;
              const image = careerCards[index % 3].image;
              return (
                <article key={item.title} className="min-w-[82%] snap-start sm:min-w-0">
                  <div className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-[#ececec]">
                    <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#2c2c2c] shadow-lg"><Icon className="h-5 w-5" /></span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-tight">{item.title}</h3>
                  <p className="mt-3 leading-6 text-black/70">{item.description}</p>
                </article>
              );
            })}
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

      <section id="faq" className="scroll-mt-28 px-7 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Pertanyaan yang sering diajukan</h2>
          <div className="mt-12 border-b border-black/20">
            {faqItems.map((item) => (
              <details key={item.question} className="group border-t border-black/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-bold marker:hidden sm:text-xl">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-7 pr-10 leading-7 text-black/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090909] px-5 py-24 text-center text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#1473e6] text-sm font-bold">JDS</div>
          <h2 className="mt-7 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Karya terbaik Anda bisa dimulai di sini.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">Bergabunglah dengan jejaring talenta JDS dan temukan kesempatan untuk berkontribusi pada proyek yang bermakna.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => handleOpenApply()} className="rounded-full border-2 border-white bg-white px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-transparent hover:text-white">
              Daftarkan profil
            </button>
            <a href={`mailto:${companyInfo.email}?subject=Pertanyaan%20Karir%20JDS`} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
              <Mail className="h-4 w-4" />
              Hubungi tim JDS
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,#421c78_0%,#190a2c_42%,#090909_100%)] px-5 py-20 text-center text-white sm:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Sparkles className="mx-auto h-10 w-10 text-[#c9a7ff]" />
          <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">Keahlian berbeda. Satu tujuan bersama.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">Teknologi, desain, pendampingan, dan pemahaman lapangan bersatu untuk menciptakan solusi yang relevan.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[Code2, Sparkles, Users, MapPin].map((Icon, index) => (
              <div key={index} className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2c2c2c]"><Icon className="h-5 w-5" /></span>
                <span className="text-sm font-semibold">{["Teknologi", "Kreativitas", "Kolaborasi", "Dampak Lokal"][index]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <JobApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} jobTitle={selectedJobTitle} />
    </div>
  );
}
