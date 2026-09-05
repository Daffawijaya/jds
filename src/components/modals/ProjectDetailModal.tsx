"use client";

import { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, Calendar, FolderGit2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">{project.category}</Badge>
            {project.highlightBadge && (
              <Badge variant="teal">{project.highlightBadge}</Badge>
            )}
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-slate-950">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            Kaji detail proyek dan ruang lingkup pelaksanaan pekerjaan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-2">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#1473E6] shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold">Klien / Instansi</p>
                <p className="text-sm font-bold text-slate-700">{project.client}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#1473E6] shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold">Tahun Pelaksanaan</p>
                <p className="text-sm font-bold text-slate-700">{project.year}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-950 mb-2 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#1473E6]" />
              Deskripsi Proyek
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {project.fullDesc}
            </p>
          </div>

          {/* Scope of Work */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-950 mb-3">Ruang Lingkup Pekerjaan</h4>
            <ul className="space-y-2.5">
              {project.scope.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#1473E6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-2">
            <p className="text-xs text-slate-400 font-semibold mb-2">Kata Kunci & Kategori</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button
            asChild
            variant="default"
            className="bg-[#1473E6] hover:bg-blue-700"
            onClick={onClose}
          >
            <Link href="/contact" className="flex items-center gap-2">
              <span>Konsultasi Proyek Serupa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
