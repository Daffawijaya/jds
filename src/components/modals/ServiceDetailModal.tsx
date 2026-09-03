"use client";

import { Service } from "@/types";
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
import { CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetailModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan" className="capitalize">
              {service.category}
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-slate-950">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            Solusi dan ruang lingkup pelaksanaan layanan {service.title} oleh Jaya Dinara Sukses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-2">
          {/* Detailed Overview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#eb1000]" />
              Fitur & Keunggulan Layanan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Scope */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-950 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Hasil Kerja / Deliverables
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eb1000] shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button asChild variant="default" onClick={onClose}>
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="flex items-center gap-2">
              <span>Minta Penawaran Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
