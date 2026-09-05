"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, MapPin, MessageCircle, Plus, Send } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { Footer } from "@/components/layout/Footer";
import { companyInfo, servicesData } from "@/data/companyData";

const container = "mx-auto max-w-[1310px] px-5 sm:px-6";
const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1473E6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500";
const fieldClass = "w-full rounded-xl border border-gray-200 bg-[#f8f8f8] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 transition-colors hover:border-gray-400 focus:border-[#1473E6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const channels = [
  { title: "Mulai obrolan", description: "Diskusi langsung tentang ide dan kebutuhan Anda.", label: companyInfo.phone, href: companyInfo.whatsappUrl, icon: MessageCircle, color: "bg-[#eaf3ff] text-[#1473E6]" },
  { title: "Kirim email", description: "Untuk brief proyek, proposal, dan kerja sama.", label: companyInfo.email, href: `mailto:${companyInfo.email}`, icon: Mail, color: "bg-[#f2ebff] text-violet-600" },
  { title: "Tetap terhubung", description: "Kenali lebih dekat cerita dan aktivitas JDS.", label: companyInfo.instagram, href: companyInfo.instagramUrl, icon: FaInstagram, color: "bg-[#fff0e6] text-orange-600" },
];
const steps = [
  { title: "Ceritakan kebutuhan", description: "Bagikan ide, tantangan, atau tujuan yang ingin Anda capai." },
  { title: "Temukan arah bersama", description: "Kita diskusikan lingkup pekerjaan dan pendekatan yang sesuai." },
  { title: "Wujudkan kolaborasi", description: "Susun langkah berikutnya berdasarkan kebutuhan proyek Anda." },
];
const faqs = [
  { question: "Belum punya brief lengkap. Bisa konsultasi dulu?", answer: "Tentu. Mulai dengan gambaran singkat mengenai kebutuhan atau tantangan Anda. Tim kami dapat membantu mendiskusikan arah solusi sebelum menentukan ruang lingkup proyek." },
  { question: "Layanan apa saja yang bisa saya diskusikan?", answer: "Anda dapat berdiskusi tentang website, software, UI/UX, digitalisasi sistem, konsultasi IT, outsourcing, tenaga ahli profesional, serta multimedia dan konten digital." },
  { question: "Bagaimana cara mengirim proposal atau dokumen proyek?", answer: `Kirimkan dokumen melalui email ${companyInfo.email}. Sertakan nama, instansi, serta gambaran kebutuhan agar diskusi lebih terarah.` },
  { question: "Saya tertarik bergabung sebagai tenaga ahli. Mulai dari mana?", answer: "Kunjungi halaman Karir untuk melihat peluang dan mendaftarkan profil Anda ke Talent Pool JDS.", career: true },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", service: servicesData[0]?.title ?? "Konsultasi Umum / Lainnya", message: "" });
  const [isPrepared, setIsPrepared] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`;
  const message = `Halo tim JDS, saya ingin berdiskusi mengenai ${formData.service}.\n\nNama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nInstansi: ${formData.company || "-"}\n\n${formData.message}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPrepared(true);
    requestAnimationFrame(() => previewRef.current?.focus());
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <section className="relative mt-1.5 overflow-hidden bg-black text-white">
        <div aria-hidden="true" className="h-2 bg-gradient-to-r from-red-600 via-orange-500 to-purple-600" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className={`${container} relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24`}>
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400"><span className="h-px w-8 bg-blue-400" /> Mari terhubung</p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[68px]">Kolaborasi hebat<br />dimulai dari<br /><span className="text-[#79b8ff]">satu percakapan.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-300">Punya ide, tantangan, atau rencana besar? Ceritakan kepada kami. Bersama JDS, mari temukan solusi digital yang tepat untuk Anda.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact-form" className={primaryButton}>Ceritakan Kebutuhan <ArrowDown className="h-4 w-4" /></a>
              <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-white hover:text-black">Chat WhatsApp <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <p className="mt-9 flex items-center gap-2 text-xs text-gray-400"><MapPin className="h-3.5 w-3.5 text-blue-400" /> Dari Kutai Kartanegara, untuk langkah besar Anda.</p>
          </div>
          <div className="relative pb-7 pl-4 sm:pl-8">
            <div className="group relative h-[360px] overflow-hidden rounded-2xl bg-[#191919] sm:h-[440px] lg:h-[460px]">
              <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85" alt="Diskusi dan kolaborasi dalam sebuah tim" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />
              <a href="#contact-form" aria-label="Mulai diskusi dengan JDS" className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/20 backdrop-blur-sm transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><ArrowUpRight className="h-6 w-6" /></a>
              <div className="absolute bottom-32 left-6 right-6 sm:left-8"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/70">Ide Anda. Keahlian kami.</p><p className="max-w-xs text-3xl font-bold leading-tight">Banyak kemungkinan.<br />Satu langkah pertama.</p></div>
            </div>
            <div className="absolute bottom-0 left-0 right-7 rounded-2xl border border-white/15 bg-[#1473E6] p-5 shadow-xl sm:right-10 sm:p-6">
              <div className="mb-4 flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1473E6]"><MessageCircle className="h-5 w-5" /></span><div><p className="text-sm font-bold">Halo, tim JDS!</p><p className="text-xs text-blue-100">Saya punya ide. Bisa kita diskusikan?</p></div></div>
              <div className="flex items-center justify-between border-t border-white/25 pt-3"><span className="text-xs text-blue-100">Solusi yang baik dimulai dengan mendengarkan.</span><span aria-hidden="true" className="ml-3 flex gap-1"><span className="h-1 w-1 rounded-full bg-white" /><span className="h-1 w-1 rounded-full bg-white/70" /><span className="h-1 w-1 rounded-full bg-white/40" /></span></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Pilihan kontak" className="bg-white py-12 sm:py-16">
        <div className={`${container} grid gap-4 md:grid-cols-3`}>
          {channels.map(({ title, description, label, href, icon: Icon, color }) => (
            <a key={title} href={href} target={href.startsWith("https") ? "_blank" : undefined} rel={href.startsWith("https") ? "noopener noreferrer" : undefined} className="group flex min-w-0 flex-col rounded-2xl bg-[#f8f8f8] p-6 transition-colors duration-300 hover:bg-[#191919] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 sm:p-7">
              <div className="mb-7 flex items-start justify-between"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}><Icon className="h-5 w-5" /></span><ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></div>
              <h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-600 group-hover:text-gray-300">{description}</p><p className="mt-5 break-all text-sm font-semibold">{label}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="contact-form" className="scroll-mt-24 bg-[#f8f8f8] py-16 sm:py-24">
        <div className={`${container} grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div className="lg:py-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1473E6]">Ruang untuk ide Anda</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Apa yang ingin<br />kita wujudkan bersama?</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600">Dari website pertama hingga transformasi sistem yang lebih besar. Kami siap mengenal kebutuhan Anda dan mencari jalan keluarnya bersama.</p>
            <ol className="my-10 space-y-7">
              {steps.map((step, index) => <li key={step.title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-[#1473E6]">0{index + 1}</span><div><h3 className="text-base font-bold">{step.title}</h3><p className="mt-1 max-w-xs text-sm leading-relaxed text-gray-600">{step.description}</p></div></li>)}
            </ol>
            <div className="max-w-md border-t border-gray-200 pt-6"><p className="text-sm text-gray-600">Ingin bergabung dengan tim kami?</p><Link href="/career" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#1473E6] hover:underline">Temukan peluang karir <ArrowUpRight className="h-4 w-4" /></Link></div>
          </div>
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_12px_50px_-25px_rgba(0,0,0,0.15)] sm:p-9">
            {isPrepared ? (
              <div ref={previewRef} tabIndex={-1} className="outline-none">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1473E6]"><Check className="h-6 w-6" /></span>
                <h3 className="text-2xl font-bold">Pesan siap dilanjutkan.</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">Periksa ringkasan Anda, lalu pilih WhatsApp atau email untuk mengirimkannya ke tim JDS. Pesan belum terkirim dari halaman ini.</p>
                <div className="my-6 max-h-80 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-[#f8f8f8] p-5 text-sm leading-relaxed" data-lenis-prevent>{message}</div>
                <div className="flex flex-wrap gap-3"><a href={`${companyInfo.whatsappUrl}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className={primaryButton}>Lanjut ke WhatsApp <ArrowUpRight className="h-4 w-4" /></a><a href={`mailto:${companyInfo.email}?subject=${encodeURIComponent(`Konsultasi ${formData.service}`)}&body=${encodeURIComponent(message)}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50"><Mail className="h-4 w-4" /> Lewat Email</a></div>
                <button type="button" onClick={() => { setIsPrepared(false); requestAnimationFrame(() => nameRef.current?.focus()); }} className="mt-6 text-sm font-semibold text-gray-600 underline underline-offset-4 hover:text-black">Edit pesan</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-7 flex items-start justify-between gap-4"><div><h3 className="text-2xl font-bold">Ceritakan kebutuhan Anda.</h3><p className="mt-2 text-sm text-gray-500">Mulai dari informasi singkat di bawah ini.</p></div><MessageCircle className="mt-1 h-6 w-6 shrink-0 text-[#1473E6]" /></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">Nama lengkap <span className="text-[#1473E6]">*</span></label><input ref={nameRef} id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Nama Anda" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={fieldClass} /></div>
                  <div><label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">Email <span className="text-[#1473E6]">*</span></label><input id="contact-email" name="email" autoComplete="email" required maxLength={200} type="email" placeholder="nama@perusahaan.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={fieldClass} /></div>
                  <div><label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold">Nomor WhatsApp <span className="text-[#1473E6]">*</span></label><input id="contact-phone" name="phone" autoComplete="tel" required maxLength={30} type="tel" placeholder="08xx xxxx xxxx" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={fieldClass} /></div>
                  <div><label htmlFor="contact-company" className="mb-2 block text-sm font-semibold">Instansi / perusahaan <span className="font-normal text-gray-500">(opsional)</span></label><input id="contact-company" name="company" autoComplete="organization" maxLength={160} placeholder="Nama instansi Anda" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={fieldClass} /></div>
                  <div className="sm:col-span-2"><label htmlFor="contact-service" className="mb-2 block text-sm font-semibold">Layanan yang Anda butuhkan <span className="text-[#1473E6]">*</span></label><div className="relative"><select id="contact-service" name="service" required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`${fieldClass} appearance-none pr-10`}>{servicesData.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}<option value="Konsultasi Umum / Lainnya">Konsultasi Umum / Lainnya</option></select><ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-gray-500" /></div></div>
                  <div className="sm:col-span-2"><label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">Tentang ide atau proyek Anda <span className="text-[#1473E6]">*</span></label><textarea id="contact-message" name="message" required maxLength={3000} rows={4} placeholder="Ceritakan gambaran kebutuhan, tujuan, atau rencana waktu Anda..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${fieldClass} min-h-32 resize-y`} /></div>
                </div>
                <p className="mb-5 mt-4 text-xs leading-relaxed text-gray-500">* Wajib diisi. Anda dapat meninjau pesan sebelum melanjutkan ke WhatsApp atau email.</p>
                <button type="submit" className={`${primaryButton} w-full`}>Siapkan Pesan <Send className="h-4 w-4" /></button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#191919] text-white">
        <div className={`${container} grid lg:grid-cols-2`}>
          <div className="py-16 sm:py-20 lg:pr-16"><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Dekat dengan kebutuhan daerah</p><h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Berakar di Kalimantan.<br />Terhubung lewat teknologi.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">Berbasis di Kutai Kartanegara, kami membangun kolaborasi dengan instansi, bisnis, dan talenta untuk menghadirkan dampak nyata.</p><div className="my-7 flex max-w-md items-start gap-3 border-t border-white/15 pt-6"><MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-400" /><div><p className="mb-2 text-sm font-bold">{companyInfo.officialName}</p><address className="text-sm not-italic leading-relaxed text-gray-400">{companyInfo.address}</address></div></div><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-500 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-white hover:text-black">Buka di Google Maps <ArrowUpRight className="h-4 w-4" /></a></div>
          <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1473e626,transparent_70%)]" />
            {[220, 340, 460].map((size) => <div key={size} aria-hidden="true" style={{ width: size, height: size }} className="absolute rounded-full border border-white/10" />)}
            <span aria-hidden="true" className="absolute left-[20%] top-[28%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_16px_#1473e6]" /><span aria-hidden="true" className="absolute bottom-[25%] right-[18%] h-1.5 w-1.5 rounded-full bg-blue-300" />
            <div className="relative text-center"><span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1473E6] shadow-[0_0_60px_#1473e640]"><MapPin className="h-7 w-7" /></span><p className="text-2xl font-bold">Kutai Kartanegara.</p><p className="mt-2 text-sm text-gray-400">Kalimantan Timur, Indonesia</p><p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-300">Rumah bagi ide-ide besar</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Sebelum kita mulai</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mungkin ini<br />yang Anda pikirkan.</h2><p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-600">Beberapa jawaban untuk membantu Anda mengambil langkah pertama.</p></div>
          <div className="border-t border-gray-200">{faqs.map((faq, index) => <div key={faq.question} className="border-b border-gray-200"><h3><button id={`faq-trigger-${index}`} type="button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold transition-colors hover:text-[#1473E6] focus-visible:outline-2 focus-visible:outline-[#1473E6]">{faq.question}<Plus className={`h-5 w-5 shrink-0 text-[#1473E6] transition-transform motion-reduce:transition-none ${openFaq === index ? "rotate-45" : ""}`} /></button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} hidden={openFaq !== index} className="max-w-xl pb-6 pr-8 text-sm leading-relaxed text-gray-600">{faq.answer}{faq.career && <Link href="/career" className="mt-3 flex items-center gap-2 font-semibold text-[#1473E6] hover:underline">Lihat halaman Karir <ArrowRight className="h-4 w-4" /></Link>}</div></div>)}</div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#FFF0E6] via-[#F4E6FF] to-[#E6F0FF] py-7"><div className={`${container} flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center`}><div><p className="text-lg font-bold">Langkah besar Anda dimulai di sini.</p><p className="mt-1 text-sm text-gray-600">Mari ubah percakapan hari ini menjadi solusi untuk esok.</p></div><a href="#contact-form" className={`${primaryButton} shrink-0`}>Mulai Percakapan <ArrowRight className="h-4 w-4" /></a></div></section>
      <Footer variant="light" />
    </div>
  );
}
