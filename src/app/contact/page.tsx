"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { companyInfo, servicesData } from "@/data/companyData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Web Development",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* HEADER HERO */}
      <section className="pt-12 pb-8 bg-grid-pattern border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">Hubungi Tim JDS</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Konsultasikan Kebutuhan Anda
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
            Tim Jaya Dinara Sukses siap melayani pertanyaan, konsultasi proyek, maupun koordinasi penyiapan tenaga ahli profesional.
          </p>
        </div>
      </section>

      {/* CONTACT INFO & FORM SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <Badge variant="cyan">Informasi Kontak</Badge>
              <h2 className="text-2xl font-black text-slate-950">Alamat & Saluran Komunikasi</h2>
              <p className="text-sm text-slate-500">
                Gunakan saluran komunikasi di bawah untuk terhubung langsung dengan tim kami.
              </p>
            </div>

            {/* Address Card */}
            <Card className="hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-1 text-[#eb1000]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-950">Alamat Perusahaan</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {companyInfo.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp & Phone */}
            <Card className="hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-1 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-950">Telepon / WhatsApp</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#eb1000] font-bold transition-colors">
                      {companyInfo.phone}
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-400">Tersedia untuk obrolan & penawaran</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-1 text-sky-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-950">Email Resmi</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    <a href={`mailto:${companyInfo.email}`} className="hover:text-[#eb1000] font-bold transition-colors">
                      {companyInfo.email}
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Instagram / Social */}
            <Card className="hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-1 text-fuchsia-600">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-950">Media Sosial</h4>
                  <a
                    href={companyInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-fuchsia-700 hover:text-fuchsia-600 font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{companyInfo.instagram}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 hover:shadow-md">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl font-extrabold text-slate-950">Kirim Pesan atau Penawaran</CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Isi formulir di bawah untuk menyampaikan spesifikasi kebutuhan Anda secara langsung.
                </CardDescription>
              </CardHeader>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950">Pesan Anda Telah Terkirim!</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Terima kasih telah menghubungi Jaya Dinara Sukses. Tim kami akan segera meninjau pesan Anda dan merespons secepatnya.
                  </p>
                  <Button variant="default" className="mt-4" onClick={() => setIsSubmitted(false)}>
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Nama Lengkap <span className="text-[#eb1000]">*</span>
                      </label>
                      <Input
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Email Instansi / Pribadi <span className="text-[#eb1000]">*</span>
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="budi@instansi.go.id"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        No. WhatsApp / Telepon <span className="text-[#eb1000]">*</span>
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder="081928704503"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Nama Instansi / Perusahaan
                      </label>
                      <Input
                        placeholder="Contoh: Dinas / PT..."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Kategori Layanan Yang Diminati <span className="text-[#eb1000]">*</span>
                    </label>
                    <select
                      className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.title} className="bg-white text-slate-900">
                          {s.title}
                        </option>
                      ))}
                      <option value="Konsultasi Umum / Lainnya" className="bg-white text-slate-900">
                        Konsultasi Umum / Lainnya
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Pesan & Spesifikasi Kebutuhan <span className="text-[#eb1000]">*</span>
                    </label>
                    <Textarea
                      required
                      placeholder="Jelaskan secara singkat gambaran proyek, target waktu, atau spesifikasi penyiapan tenaga ahli yang dibutuhkan..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* LOCATION MAP PLACEHOLDER FRAME */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden p-6 sm:p-8 space-y-4 hover:shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Badge variant="cyan">Lokasi Operasional</Badge>
              <h3 className="text-lg font-extrabold text-slate-950 mt-1">Kutai Kartanegara, Kalimantan Timur</h3>
              <p className="text-xs text-slate-500">{companyInfo.address}</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <span>Buka di Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <div className="w-full h-64 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[#eb1000]">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="relative text-sm font-extrabold text-slate-950">
              {companyInfo.officialName} ({companyInfo.shortName})
            </p>
            <p className="relative text-xs text-slate-500 max-w-md">
              {companyInfo.address}
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
