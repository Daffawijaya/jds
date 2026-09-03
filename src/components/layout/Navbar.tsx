"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { companyInfo, siteNavLinks } from "@/data/companyData";

const logoAlt = `${companyInfo.shortName} - ${companyInfo.officialName}`;

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" aria-label={logoAlt} className="flex items-center shrink-0">
            <Image
              src={isScrolled ? "/jds.png" : "/jdsw.png"}
              alt={logoAlt}
              width={626}
              height={271}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          <nav
            className={`hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide transition-colors ${
              isScrolled ? "text-zinc-600" : "text-zinc-300"
            }`}
          >
            {siteNavLinks.map((link) => {
              const isActive = pathname === link.href;
              const colorClass = isActive
                ? isScrolled
                  ? "text-zinc-900"
                  : "text-white"
                : isScrolled
                  ? "hover:text-zinc-900"
                  : "hover:text-white";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors ${colorClass}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={`font-semibold px-5 py-2 rounded-full text-xs transition-all shadow-md ${
              isScrolled
                ? "bg-zinc-900 text-white hover:bg-zinc-700"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            Konsultasi
          </Link>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Buka Menu"
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    isScrolled
                      ? "text-zinc-900 hover:bg-zinc-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0a0a0c] border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="mb-6">
                    <SheetTitle className="flex items-center gap-2 text-white">
                      <Image
                        src="/jdsw.png"
                        alt={logoAlt}
                        width={626}
                        height={271}
                        className="h-8 w-auto object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col">
                    {siteNavLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                            isActive
                              ? "bg-zinc-800 text-white"
                              : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 space-y-4">
                  <div className="text-xs text-zinc-400 space-y-1">
                    <p className="font-semibold text-white">{companyInfo.officialName}</p>
                    <p>
                      {companyInfo.district}, {companyInfo.regency}
                    </p>
                    <p>{companyInfo.province}</p>
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-zinc-200 font-semibold px-5 py-2.5 rounded-full text-sm transition-all shadow-md"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Hubungi Tim {companyInfo.shortName}</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
