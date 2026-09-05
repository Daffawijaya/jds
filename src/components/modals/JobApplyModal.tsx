"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

export function JobApplyModal({
  isOpen,
  onClose,
  jobTitle = "Tenaga Ahli / Professional Talent JDS",
}: JobApplyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: "",
    resumeUrl: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder flow until this form is connected to a recruitment endpoint.
    submitTimerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      submitTimerRef.current = null;
    }, 1000);
  };

  const handleReset = () => {
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
    }
    setIsSubmitting(false);
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      expertise: "",
      resumeUrl: "",
      notes: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#1473E6]">
            Talent Network {"·"} JDS
          </p>
          <DialogTitle className="text-xl font-bold text-slate-950 sm:text-2xl">
            {isSubmitted ? "Profil Berhasil Diproses" : "Formulir Talenta Profesional JDS"}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {isSubmitted
              ? "Terima kasih telah mendaftarkan profil Anda di database talenta Jaya Dinara Sukses."
              : `Pengajuan data untuk: ${jobTitle}`}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4" role="status" aria-live="polite">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Data dan profil profesional Anda telah tersimpan. Tim recruitment JDS akan menghubungi Anda ketika terdapat kualifikasi proyek atau posisi yang sesuai.
            </p>
            <Button
              variant="default"
              className="mt-4 border-[#1473E6] bg-[#1473E6] hover:bg-blue-700"
              onClick={handleReset}
            >
              Selesai
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div>
              <label htmlFor="career-name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Nama Lengkap <span className="text-[#eb1000]">*</span>
              </label>
              <Input
                id="career-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Contoh: Ahmad Hidayat"
                className="focus-visible:border-[#1473E6] focus-visible:ring-[#1473E6]/20"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="career-email" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email <span className="text-[#eb1000]">*</span>
                </label>
                <Input
                  id="career-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="ahmad@example.com"
                  className="focus-visible:border-[#1473E6] focus-visible:ring-[#1473E6]/20"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="career-phone" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  No. WhatsApp / Telepon <span className="text-[#eb1000]">*</span>
                </label>
                <Input
                  id="career-phone"
                  name="phone"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="081234567890"
                  className="focus-visible:border-[#1473E6] focus-visible:ring-[#1473E6]/20"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="career-expertise" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Bidang Keahlian / Posisi <span className="text-[#eb1000]">*</span>
              </label>
              <Input
                id="career-expertise"
                name="expertise"
                required
                autoComplete="organization-title"
                placeholder="Contoh: Web Developer / Tenaga Ahli Pendamping UMKM / UI Designer"
                className="focus-visible:border-[#1473E6] focus-visible:ring-[#1473E6]/20"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="career-resume-url" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Link Portofolio / CV (Google Drive, LinkedIn, GitHub)
              </label>
              <Input
                id="career-resume-url"
                name="resumeUrl"
                type="url"
                autoComplete="url"
                placeholder="https://linkedin.com/in/username"
                className="focus-visible:border-[#1473E6] focus-visible:ring-[#1473E6]/20"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="career-notes" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Catatan Singkat / Pengalaman Kerja
              </label>
              <Textarea
                id="career-notes"
                name="notes"
                placeholder="Jelaskan ringkas pengalaman dan kualifikasi utama Anda..."
                rows={3}
                className="focus-visible:border-[#1473E6] focus-visible:ring-[#1473E6]/20"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting}>
                Batal
              </Button>
              <Button
                type="submit"
                variant="default"
                className="border-[#1473E6] bg-[#1473E6] hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    <span>Kirim Aplikasi</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
