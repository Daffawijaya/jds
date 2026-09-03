"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-slate-950">
            {isSubmitted ? "Aplikasi Berhasil Terkirim" : "Formulir Talenta Professional JDS"}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {isSubmitted
              ? "Terima kasih telah mendaftarkan profil Anda di database talenta Jaya Dinara Sukses."
              : `Pengajuan data untuk: ${jobTitle}`}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Data dan profil profesional Anda telah tersimpan. Tim recruitment JDS akan menghubungi Anda ketika terdapat kualifikasi proyek atau posisi yang sesuai.
            </p>
            <Button variant="default" className="mt-4" onClick={handleReset}>
              Selesai
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 my-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Nama Lengkap <span className="text-[#eb1000]">*</span>
              </label>
              <Input
                required
                placeholder="Contoh: Ahmad Hidayat"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email <span className="text-[#eb1000]">*</span>
                </label>
                <Input
                  required
                  type="email"
                  placeholder="ahmad@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  No. WhatsApp / Telepon <span className="text-[#eb1000]">*</span>
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Bidang Keahlian / Posisi <span className="text-[#eb1000]">*</span>
              </label>
              <Input
                required
                placeholder="Contoh: Web Developer / Tenaga Ahli Pendamping UMKM / UI Designer"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Link Portofolio / CV (Google Drive, LinkedIn, GitHub)
              </label>
              <Input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Catatan Singkat / Pengalaman Kerja
              </label>
              <Textarea
                placeholder="Jelaskan ringkas pengalaman dan kualifikasi utama Anda..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Batal
              </Button>
              <Button type="submit" variant="default" disabled={isSubmitting}>
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
