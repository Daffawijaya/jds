"use client";

import { useState } from "react";
import {
  Users,
  Briefcase,
  UserCheck,
  Sparkles,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { JobApplyModal } from "@/components/modals/JobApplyModal";
import { companyInfo, jobPostingsData } from "@/data/companyData";

export default function CareerPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("Tenaga Ahli / Professional Talent JDS");

  const handleOpenApply = (jobTitle?: string) => {
    setSelectedJobTitle(jobTitle || "Tenaga Ahli / Professional Talent JDS");
    setIsApplyModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* HEADER HERO */}
      <section className="pt-12 pb-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">Peluang Karir & Talenta</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            Bergabung Bersama Jaya Dinara Sukses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
            Kami membuka pintu bagi talenta profesional di bidang IT, pengembangan software, digitalisasi, dan pendampingan UMKM untuk berkolaborasi dalam berbagai penugasan program.
          </p>
        </div>
      </section>

      {/* CULTURE & BENEFITS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Budaya Kerja & Lingkungan"
          title="Mengapa Mengembangkan Karir Bersama JDS?"
          subtitle="Komitmen kami dalam memfasilitasi pertumbuhan profesional dan pengalaman kerja yang bermakna."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="hover:border-gray-300 hover:shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4 text-cyan-700">
                <Users className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-extrabold text-gray-950">Lingkungan Kolaboratif</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Suasana kerja yang saling mendukung, mengedepankan komunikasi terbuka dan kerja sama tim yang solid.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-gray-300 hover:shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4 text-emerald-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-extrabold text-gray-950">Proyek Berdampak Nyata</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Terlibat langsung dalam program digitalisasi dan pendampingan daerah yang memberikan kontribusi nyata bagi masyarakat.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-gray-300 hover:shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4 text-sky-700">
                <UserCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg font-extrabold text-gray-950">Pengembangan Keahlian</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Kesempatan mengasah kemampuan teknis dan profesional melalui penugasan proyek yang beragam.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* JOB VACANCIES SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Daftar Posisi Pekerjaan"
          title="Lowongan & Penyiapan Tenaga Ahli"
          subtitle="Peluang karir dan penugasan profesional yang tersedia."
        />

        {jobPostingsData.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {jobPostingsData.map((job) => (
              <Card key={job.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan">{job.department}</Badge>
                    <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.employmentType}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-950">{job.title}</h3>
                  <p className="text-sm text-gray-500 max-w-xl">{job.description}</p>
                </div>
                <Button variant="default" onClick={() => handleOpenApply(job.title)}>
                  Lamar Posisi
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty / General Talent Pool Banner */
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-white border border-gray-200 text-center space-y-6 relative overflow-hidden">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#eb1000]/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto text-[#eb1000]">
              <Briefcase className="w-7 h-7" />
            </div>
            <div className="relative space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950">
                Pendaftaran Database Talenta & Tenaga Ahli (Talent Pool)
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
                Saat ini belum ada pembukaan posisi spesifik. Namun, Anda dapat menyertakan profil dan CV Anda dalam database talenta Jaya Dinara Sukses untuk proyek atau penugasan mendatang.
              </p>
            </div>

            <div className="relative pt-2">
              <Button size="lg" variant="accent" onClick={() => handleOpenApply()}>
                <Send className="w-4 h-4 mr-2" />
                <span>Daftarkan Profil Anda</span>
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* GENERAL TALENT CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gray-950 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#eb1000]/20 blur-[100px] rounded-full pointer-events-none"></div>
          <Badge variant="cyan" className="relative">Informasi Kontak Karir</Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white relative">
            Punya Pertanyaan Mengenai Rekrutmen Tenaga Ahli?
          </h3>
          <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed relative">
            Kirimkan pertanyaan atau informasi portofolio Anda langsung ke email resmi recruitment Jaya Dinara Sukses.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 relative">
            <Button asChild variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600">
              <a href={`mailto:${companyInfo.email}?subject=Pertanyaan%20Karir%20JDS`}>
                Kirim Email ke {companyInfo.email}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <JobApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={selectedJobTitle}
      />
    </div>
  );
}
