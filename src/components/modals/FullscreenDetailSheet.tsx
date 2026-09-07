"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

interface FullscreenDetailSheetProps {
  open: boolean;
  onClose: () => void;
  contentKey: string | null;
  title: string;
  description: string;
  children: ReactNode;
}

export function FullscreenDetailSheet({ open, onClose, contentKey, title, description, children }: FullscreenDetailSheetProps) {
  const closeTimer = useRef<number | null>(null);
  const [display, setDisplay] = useState<{ key: string; node: ReactNode } | null>(
    open && contentKey ? { key: contentKey, node: children } : null,
  );

  if (open && contentKey && display?.key !== contentKey) {
    setDisplay({ key: contentKey, node: children });
  }

  useEffect(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (!open && display) {
      closeTimer.current = window.setTimeout(() => {
        setDisplay(null);
        closeTimer.current = null;
      }, 300);
    }
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [open, display]);

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        overlayClassName="bg-black/40 duration-300 supports-backdrop-filter:backdrop-blur-[15px]"
        className="h-[100dvh] max-h-[100dvh] gap-0 overflow-hidden border-0 bg-transparent p-0 text-[#202124] shadow-none duration-300 ease-out data-[side=bottom]:h-[100dvh] data-[side=bottom]:border-t-0 data-[side=bottom]:data-ending-style:translate-y-[150px] data-[side=bottom]:data-starting-style:translate-y-[150px]"
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">{description}</SheetDescription>

        <div className="relative z-20 shrink-0 bg-transparent">
          <header onClick={onClose} className="flex h-12 cursor-pointer items-center justify-between px-3 sm:h-14 sm:px-5">
            <div className="min-w-24" />
            <button type="button" onClick={(event) => { event.stopPropagation(); onClose(); }} className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-white/20 text-black transition-colors hover:bg-white/30" aria-label="Tutup modal">
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="h-0.5 bg-white" />
          <div className="h-2.5 bg-zinc-200" />
        </div>

        {display?.node ?? <div className="min-h-0 flex-1 bg-white" />}
      </SheetContent>
    </Sheet>
  );
}
