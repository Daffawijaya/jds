"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { companyInfo } from "@/data/companyData";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Layanan", href: "/services" },
  { name: "Proyek", href: "/projects" },
  { name: "Karir", href: "/career" },
  { name: "Kontak", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-gray-200 py-3"
          : "bg-white/80 backdrop-blur-md border-gray-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label={`${companyInfo.shortName} - ${companyInfo.officialName}`}
          >
            <Image
              src="/jds.png"
              alt={`${companyInfo.shortName} - ${companyInfo.officialName}`}
              width={626}
              height={271}
              priority
              className="h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild size="sm" variant="accent">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Konsultasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Buka Menu">
                  <Menu className="w-6 h-6 text-gray-900" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="mb-6">
                    <SheetTitle className="flex items-center gap-2 text-gray-900">
                      <Image
                        src="/jds.png"
                        alt={`${companyInfo.shortName} - ${companyInfo.officialName}`}
                        width={626}
                        height={271}
                        className="h-8 w-auto object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col space-y-2 mt-4">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="font-semibold text-gray-900">{companyInfo.officialName}</p>
                    <p>
                      {companyInfo.district}, {companyInfo.regency}
                    </p>
                    <p>{companyInfo.province}</p>
                  </div>
                  <Button
                    asChild
                    className="w-full"
                    variant="accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/contact" className="flex items-center justify-center gap-2">
                      <PhoneCall className="w-4 h-4" />
                      <span>Hubungi Tim {companyInfo.shortName}</span>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
