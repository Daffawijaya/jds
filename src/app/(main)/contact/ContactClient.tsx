"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Gift,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/shared/PageIntro";
import { FaqSection } from "@/components/shared/FaqSection";

type CompanyInfo = {
  email: string | null;
  phone: string | null;
  official_name: string | null;
  whatsapp_url: string | null;
  instagram_url: string | null;
  instagram: string | null;
  address: string | null;
};

type ServiceRow = {
  id: string;
  title: string;
};

type FaqRow = {
  id: string;
  question: string;
  answer: string;
};

interface ContactClientProps {
  companyInfo: CompanyInfo;
  servicesData: ServiceRow[];
  faqsData: FaqRow[];
}

const contentWidth = "mx-auto w-full max-w-[1056px] px-5 sm:px-8";
const wideContentWidth = "mx-auto w-full max-w-[1264px] px-5 sm:px-8";
const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#3b63fb] px-7 py-3 text-base font-bold text-white transition-colors hover:bg-[#274dea] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#274dea]";
const secondaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-[#2c2c2c] px-6 py-2.5 text-sm font-bold text-[#2c2c2c] transition-colors hover:bg-[#2c2c2c] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2c2c2c]";
const fieldClass =
  "w-full rounded-lg border border-[#b7b7b7] bg-white px-4 py-3 text-base text-[#2c2c2c] placeholder:text-[#6d6d6d] transition-colors hover:border-[#6d6d6d] focus:border-[#1473e6] focus:outline-none focus:ring-2 focus:ring-[#1473e6]/20";

const timeline = [
  { label: "Hari 1", title: "Kirim gambaran kebutuhan Anda" },
  { label: "1–2 hari kerja", title: "Tim JDS mempelajari konteksnya" },
  { label: "Langkah berikutnya", title: "Kita susun arah kolaborasi" },
];

const discussionAreas = [
  {
    title: "Bangun produk digital yang tepat.",
    description:
      "Diskusikan website, perangkat lunak, dan pengalaman digital yang ingin Anda hadirkan.",
    image: "/bg.png",
    alt: "Ruang kerja pengembangan produk digital JDS",
  },
  {
    title: "Ubah proses menjadi lebih terhubung.",
    description:
      "Petakan alur kerja, data, dan layanan yang dapat disederhanakan melalui digitalisasi.",
    image: "/image/etamhub.png",
    alt: "Tampilan platform digital EtamHub",
  },
  {
    title: "Perkuat program dengan mitra yang siap.",
    description:
      "Temukan dukungan outsourcing dan tenaga ahli profesional sesuai kebutuhan program Anda.",
    image: "/image/Codex Image Sep 5, 2026, 10_30_52 PM.png",
    alt: "Identitas JDS pada gedung modern",
  },
];

const consultationBenefits = [
  {
    title: "Arah yang lebih jelas",
    items: [
      "Pembahasan tujuan dan tantangan utama",
      "Pemetaan ruang lingkup awal",
      "Rekomendasi langkah yang realistis",
      "Penjelasan tanpa istilah yang berbelit",
    ],
  },
  {
    title: "Tim untuk kebutuhan Anda",
    items: [
      "Web dan software development",
      "UI/UX serta konten digital",
      "Digitalisasi dan konsultasi IT",
      "Outsourcing serta tenaga ahli",
    ],
  },
  {
    title: "Proses yang transparan",
    items: [
      "Ringkasan pesan dapat ditinjau dahulu",
      "Pilihan tindak lanjut via WhatsApp atau email",
      "Tidak ada data yang dikirim diam-diam",
      "Komunikasi langsung dengan tim JDS",
    ],
  },
];

export default function ContactClient({ companyInfo, servicesData, faqsData }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: servicesData[0]?.title ?? "Konsultasi Umum / Lainnya",
    message: "",
  });
  const [isPrepared, setIsPrepared] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address ?? "")}`;
  const message = `Halo tim JDS, saya ingin berdiskusi mengenai ${formData.service}.\n\nNama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nInstansi: ${formData.company || "-"}\n\n${formData.message}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPrepared(true);
    requestAnimationFrame(() => previewRef.current?.focus());
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#2c2c2c] antialiased">
      <section className="bg-white">
        <div className={`${contentWidth} flex min-h-[620px] flex-col items-center justify-center py-16 text-center sm:min-h-[650px] sm:py-20`}>
          <PageIntro
            label="Kontak JDS"
            title="Mulai percakapan untuk mewujudkan solusi yang tepat."
            description="Ceritakan ide, tantangan, atau program Anda. Tim JDS siap membantu menemukan arah teknologi dan kolaborasi yang relevan."
            align="center"
            titleClassName="max-w-[820px]"
            descriptionClassName="max-w-[660px]"
          />
          <a href="#contact-form" className={`${primaryButton} mt-7 w-full sm:w-auto`}>
            Mulai percakapan
          </a>

          <ul className="mt-7 w-full max-w-[610px] space-y-4 text-left text-base sm:text-lg">
            <li className="flex items-start gap-4">
              <Gift aria-hidden="true" strokeWidth={1.8} className="mt-0.5 h-7 w-7 shrink-0" />
              <span>
                <strong>Konsultasi awal tanpa biaya</strong> untuk memahami kebutuhan dan melihat arah terbaik.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <ShieldCheck aria-hidden="true" strokeWidth={1.8} className="mt-0.5 h-7 w-7 shrink-0" />
              <span>
                <strong>Pesan dapat Anda tinjau dahulu</strong> sebelum diteruskan lewat WhatsApp atau email.
              </span>
            </li>
          </ul>

          <p className="mt-6 text-base">
            Butuh respons cepat?{" "}
            <a href={companyInfo.whatsapp_url ?? ""} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:text-[#1473e6]">
              Hubungi WhatsApp
            </a>{" "}
            atau{" "}
            <a href={`mailto:${companyInfo.email ?? ""}`} className="font-bold underline underline-offset-2 hover:text-[#1473e6]">
              kirim email
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className={contentWidth}>
          <div className="mx-auto max-w-[820px] text-left sm:text-center">
            <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[36px]">
              Bagaimana percakapan awal dengan JDS berjalan.
            </h2>
            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              Mulai dari cerita singkat. Kami akan mempelajari konteksnya, menghubungi Anda, lalu menyusun langkah yang paling masuk akal bersama.
            </p>
          </div>

          <div className="mx-[12px] mt-10 sm:mx-0 sm:mt-12" aria-label="Tahapan percakapan awal">
            <ol className="grid min-h-[92px] grid-cols-[5fr_7fr] sm:min-h-[72px] min-[1200px]:grid-cols-[1fr_2fr]">
              <li>
                <p className="text-xs font-bold leading-tight sm:text-sm">{timeline[0].label}</p>
                <p className="mt-1 max-w-[96px] text-[11px] leading-[1.35] sm:max-w-[220px] sm:text-sm sm:leading-snug">
                  {timeline[0].title}
                </p>
              </li>
              <li className="flex justify-between">
                <div className="max-w-[96px] sm:max-w-[220px]">
                  <p className="text-xs font-bold leading-tight sm:text-sm">{timeline[1].label}</p>
                  <p className="mt-1 text-[11px] leading-[1.35] sm:text-sm sm:leading-snug">{timeline[1].title}</p>
                </div>
                <div className="max-w-[96px] text-right sm:max-w-[220px]">
                  <p className="text-xs font-bold leading-tight sm:text-sm">{timeline[2].label}</p>
                  <p className="mt-1 text-[11px] leading-[1.35] sm:text-sm sm:leading-snug">{timeline[2].title}</p>
                </div>
              </li>
            </ol>

            <div className="relative mt-3 h-4 sm:h-5" aria-hidden="true">
              <span className="absolute inset-y-0 left-0 w-[2px] -translate-x-px rounded-[1px] bg-[#f47ab2]" />
              <span className="absolute inset-y-0 left-[41.6667%] w-[2px] -translate-x-px rounded-[1px] bg-[#ffce2e] min-[1200px]:left-1/3" />
              <span className="absolute inset-y-0 left-full w-[2px] -translate-x-px rounded-[1px] bg-[#ffce2e]" />
            </div>

            <div className="mt-2 grid grid-cols-[5fr_7fr] gap-1 min-[1200px]:grid-cols-[1fr_2fr]">
              <div className="flex h-8 items-center justify-center rounded-l-[4px] bg-gradient-to-r from-[#f47ab2] to-[#ffce2e] px-2 text-center text-[10px] font-bold sm:text-sm">
                Tahap awal
              </div>
              <div className="flex h-8 items-center justify-center rounded-r-[4px] bg-[#ffce2e] px-2 text-center text-[10px] font-bold sm:text-sm">
                Pendalaman dan tindak lanjut
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className={wideContentWidth}>
          <h2 className="text-left text-[28px] font-extrabold tracking-[-0.02em] sm:text-center sm:text-[36px]">
            Apa yang bisa Anda diskusikan bersama JDS?
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-10 rounded-2xl bg-[#f5f5f5] p-4 md:mt-12 md:grid-cols-3 md:bg-transparent md:p-0">
            {discussionAreas.map((area) => (
              <article key={area.title}>
                <div className="relative aspect-[1.55/1] overflow-hidden rounded-2xl bg-[#efefef]">
                  <Image
                    src={area.image}
                    alt={area.alt}
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 text-xl font-extrabold leading-tight sm:text-2xl">{area.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#4f4f4f]">{area.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className={secondaryButton}>
              Lihat semua layanan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#3e34bf] via-[#5558da] to-[#595edc] px-5 py-7 text-center text-white">
        <h2 className="text-xl font-extrabold sm:text-2xl">Satu percakapan bisa membuka banyak kemungkinan.</h2>
      </section>

      <section className="bg-[#f5f5f5] py-20 sm:py-24">
        <div className={wideContentWidth}>
          <h2 className="max-w-[760px] text-left text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:mx-auto sm:text-center sm:text-[36px]">
            Konsultasi awal Anda hadir dengan lebih dari sekadar jawaban.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {consultationBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-2xl bg-white p-7 sm:p-8 md:min-h-[360px] md:p-10">
                <h3 className="text-xl font-extrabold">{benefit.title}</h3>
                <ul className="mt-6 space-y-4 text-base leading-snug">
                  {benefit.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#2710b7] via-[#6433d7] to-[#d940e6] px-5 py-20 text-left text-white sm:py-24 sm:text-center">
        <div className="mx-auto max-w-[860px]">
          <MapPin aria-hidden="true" className="mb-6 h-9 w-9 sm:mx-auto" />
          <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[36px]">
            Berakar di Kalimantan. Terhubung dari mana saja.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-base leading-relaxed sm:text-lg">
            {companyInfo.official_name} berbasis di Kutai Kartanegara dan terbuka untuk kolaborasi dengan instansi, bisnis, serta talenta dari berbagai daerah.
          </p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold underline underline-offset-4">
            Lihat lokasi JDS <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <FaqSection
        title="Pertanyaan yang sering diajukan sebelum menghubungi JDS."
        items={faqsData.map(f => ({ question: f.question, answer: f.answer }))}
      />

      <section id="contact-form" className="scroll-mt-24 bg-white pb-24 sm:pb-32">
        <div className={contentWidth}>
          <h2 className="mb-12 max-w-[760px] text-left text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:mx-auto sm:text-center sm:text-[36px]">
            Pilih cara terbaik untuk memulai percakapan.
          </h2>

          <div className="grid items-stretch gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <article className="flex flex-col border border-[#d8d8d8] bg-white">
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Image src="/jds.png" alt="JDS" width={60} height={26} className="h-7 w-auto object-contain" />
                </div>
                <h3 className="mt-7 text-2xl font-extrabold">Hubungi tim secara langsung</h3>
                <p className="mt-3 text-[28px] font-extrabold leading-tight">Percakapan awal tanpa biaya</p>
                <p className="mt-2 text-sm italic text-[#5d5d5d]">Tanpa komitmen pekerjaan di muka.</p>
                <p className="mt-7 text-base leading-relaxed">
                  Cocok untuk pertanyaan singkat, pengiriman proposal, atau saat Anda sudah tahu kanal komunikasi yang diinginkan.
                </p>

                <div className="mt-auto pt-12">
                  <p className="mb-4 flex items-center gap-2 text-sm text-[#5d5d5d]">
                    <ShieldCheck className="h-4 w-4" /> Komunikasi langsung dengan tim JDS
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={companyInfo.whatsapp_url ?? ""} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                      WhatsApp
                    </a>
                    <a href={`mailto:${companyInfo.email ?? ""}`} className={secondaryButton}>
                      Email
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f5f5] p-6 sm:p-8">
                <h4 className="font-extrabold">Kanal yang tersedia:</h4>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed">
                  <li className="flex min-w-0 gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <span><strong>WhatsApp</strong><br />{companyInfo.phone}</span>
                  </li>
                  <li className="flex min-w-0 gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="min-w-0 break-all"><strong>Email</strong><br />{companyInfo.email}</span>
                  </li>
                  <li className="flex min-w-0 gap-3">
                    <FaInstagram className="mt-0.5 h-5 w-5 shrink-0" />
                    <a href={companyInfo.instagram_url ?? ""} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2"><strong>Instagram</strong><br />{companyInfo.instagram}</a>
                  </li>
                  <li className="flex min-w-0 gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />
                    <span><strong>Tanggapan awal</strong><br />1–2 hari kerja</span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="relative border border-[#d8d8d8] bg-white">
              <span className="absolute right-0 top-0 bg-[#ffdf3e] px-3 py-2 text-xs font-extrabold">Direkomendasikan</span>
              <div className="p-6 pt-14 sm:p-8 sm:pt-14">
                {isPrepared ? (
                  <div ref={previewRef} tabIndex={-1} aria-live="polite" className="outline-none">
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9edff] text-[#3b63fb]">
                      <Check className="h-6 w-6" />
                    </span>
                    <h3 className="text-2xl font-extrabold">Pesan Anda siap dilanjutkan.</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#505050]">
                      Periksa ringkasannya, lalu pilih WhatsApp atau email. Pesan belum terkirim dari halaman ini.
                    </p>
                    <div className="my-7 max-h-96 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-[#f5f5f5] p-5 text-sm leading-relaxed" data-lenis-prevent>
                      {message}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a href={`${companyInfo.whatsapp_url ?? ""}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                        Lanjut ke WhatsApp <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${companyInfo.email ?? ""}?subject=${encodeURIComponent(`Konsultasi ${formData.service}`)}&body=${encodeURIComponent(message)}`} className={secondaryButton}>
                        <Mail className="h-4 w-4" /> Lewat Email
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPrepared(false);
                        requestAnimationFrame(() => nameRef.current?.focus());
                      }}
                      className="mt-7 font-bold underline underline-offset-4 hover:text-[#1473e6]"
                    >
                      Edit pesan
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <p className="text-sm font-bold">Brief proyek</p>
                    <h3 className="mt-3 text-2xl font-extrabold sm:text-[28px]">Ceritakan kebutuhan Anda.</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#505050]">
                      Isi konteks singkat agar percakapan pertama lebih terarah.
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-2 block text-sm font-bold">Nama lengkap <span className="text-[#1473e6]">*</span></label>
                        <input ref={nameRef} id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Nama Anda" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-2 block text-sm font-bold">Email <span className="text-[#1473e6]">*</span></label>
                        <input id="contact-email" name="email" autoComplete="email" required maxLength={200} type="email" placeholder="nama@perusahaan.com" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="mb-2 block text-sm font-bold">Nomor WhatsApp <span className="text-[#1473e6]">*</span></label>
                        <input id="contact-phone" name="phone" autoComplete="tel" required maxLength={30} type="tel" inputMode="tel" placeholder="08xx xxxx xxxx" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="mb-2 block text-sm font-bold">Instansi <span className="font-normal text-[#6d6d6d]">(opsional)</span></label>
                        <input id="contact-company" name="company" autoComplete="organization" maxLength={160} placeholder="Nama instansi" value={formData.company} onChange={(event) => setFormData({ ...formData, company: event.target.value })} className={fieldClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="contact-service" className="mb-2 block text-sm font-bold">Layanan yang dibutuhkan <span className="text-[#1473e6]">*</span></label>
                        <div className="relative">
                          <select id="contact-service" name="service" required value={formData.service} onChange={(event) => setFormData({ ...formData, service: event.target.value })} className={`${fieldClass} appearance-none pr-11`}>
                            {servicesData.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                            <option value="Konsultasi Umum / Lainnya">Konsultasi Umum / Lainnya</option>
                          </select>
                          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-[#505050]" />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="contact-message" className="mb-2 block text-sm font-bold">Tentang ide atau proyek Anda <span className="text-[#1473e6]">*</span></label>
                        <textarea id="contact-message" name="message" required maxLength={3000} rows={5} placeholder="Ceritakan kebutuhan, tujuan, atau rencana waktu Anda..." value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className={`${fieldClass} min-h-36 resize-y`} />
                      </div>
                    </div>
                    <p className="mb-5 mt-4 text-xs leading-relaxed text-[#606060]">
                      * Wajib diisi. Anda akan meninjau pesan sebelum melanjutkan ke WhatsApp atau email.
                    </p>
                    <button type="submit" className={`${primaryButton} w-full`}>
                      Siapkan pesan <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </article>
          </div>

          <div className="mt-12 text-center">
            <address className="not-italic text-sm leading-relaxed text-[#5d5d5d]">
              {companyInfo.official_name} · {companyInfo.address}
            </address>
          </div>
        </div>
      </section>

      <a
        href={companyInfo.whatsapp_url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat dengan JDS melalui WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#5f5f5f] bg-white text-[#2c2c2c] shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1473e6]"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <Footer variant="light" />
    </div>
  );
}
