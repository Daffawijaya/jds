"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const siteNavLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Layanan", href: "/services" },
  { name: "Proyek", href: "/projects" },
  { name: "Karir", href: "/career" },
  { name: "Kontak", href: "/contact" },
];

interface NavbarProps {
  companyName: string;
  officialName: string;
  phone: string;
  whatsappUrl: string;
}

const logoAlt = "JDS - Jaya Dinara Sukses";

function CompactUtilities({
  companyName,
  darkInk,
}: {
  companyName: string;
  darkInk: boolean;
}) {
  return (
    <div className="flex h-10 shrink-0 items-center gap-1 pr-4">
      <Link
        href="/services"
        aria-label="Lihat semua layanan"
        className={`flex h-8 w-8 items-center justify-center rounded-[5px] transition-colors ${
          darkInk ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5 fill-current"
        >
          {[2.25, 8.25, 14.25].flatMap((x) =>
            [2.25, 8.25, 14.25].map((y) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="3.5" height="3.5" rx="1" />
            )),
          )}
        </svg>
      </Link>

      <Link
        href="/contact"
        aria-label={`Konsultasi dengan ${companyName}`}
        className={`flex h-10 items-center justify-center rounded-full border px-4 pb-0.5 pt-0 text-sm font-bold leading-none transition-colors ${
          darkInk
            ? "border-black bg-transparent text-black hover:bg-black hover:text-white"
            : "border-white bg-white text-black hover:bg-zinc-100"
        }`}
      >
        Konsultasi
      </Link>
    </div>
  );
}

export function Navbar({ companyName }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  // Halaman berlatar terang selalu memakai logo dan navigasi versi gelap.
  const isDark =
    isScrolled ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/projects" ||
    pathname === "/contact" ||
    pathname === "/career";

  const isHome = pathname === "/" || pathname === "";

  // Di luar beranda, sebelum scroll: samakan dengan permukaan hero terang.
  const useLightSurface = !isHome && !isScrolled;

  return (
    <>
      {/* Desktop branch is intentionally kept identical and starts at 1024px. */}
      <header
        data-navbar-variant="desktop"
        className={`sticky top-0 z-50 hidden h-16 transition-colors duration-300 lg:block ${
          useLightSurface ? "bg-[#f5f5f5]" : ""
        }`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-between transition-all duration-300 ${
            useLightSurface
              ? "rounded-none px-5.5 border-b border-gray-200"
              : isScrolled
                ? "mx-2 rounded-2xl mt-2 px-3.5 border-b border-transparent"
                : "px-5.5 border-b border-transparent"
          } ${
            useLightSurface
              ? "bg-[#f5f5f5]"
              : isDark
                ? "bg-white/60 backdrop-blur-xl"
                : "bg-transparent"
          } ${isScrolled ? "shadow-lg shadow-black/10" : ""}`}
        >
          <div className="flex items-center gap-8">
            <Link
              href="/"
              aria-label={logoAlt}
              className="flex shrink-0 items-center"
            >
              <Image
                src={isDark ? "/jds.png" : "/jdsw.png"}
                alt={logoAlt}
                width={626}
                height={271}
                priority
                className="h-7 w-auto object-contain"
              />
            </Link>

            <nav
              aria-label="Navigasi utama"
              className={`hidden items-center gap-6 text-sm font-semibold tracking-wide transition-colors md:flex ${
                isDark ? "text-zinc-600" : "text-zinc-300"
              }`}
            >
              {siteNavLinks.map((link) => {
                const isActive = pathname === link.href;
                const colorClass = isActive
                  ? isDark
                    ? "text-zinc-900"
                    : "text-white"
                  : isDark
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

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all sm:px-5 ${
                isDark
                  ? "border border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-white"
                  : "border border-white bg-white text-black hover:bg-zinc-200"
              }`}
            >
              Konsultasi
            </Link>
          </div>
        </div>
      </header>

      {/* Adobe-matched compact branch: mobile and tablet only (0-1023px). */}
      <header
        data-navbar-variant="compact"
        className={`jds-compact-header sticky top-0 z-50 h-20 lg:hidden ${
          useLightSurface ? "bg-[#f5f5f5]" : ""
        }`}
      >
        <div
          className={`jds-compact-navbar ${
            isScrolled ? "jds-compact-navbar-scrolled" : ""
          }`}
        >
          <div className="flex h-16 min-w-0 flex-1 items-center">
            <Link
              href="/"
              aria-label={logoAlt}
              className="flex h-4 w-[46px] shrink-0 items-center py-0 pl-4 pr-3"
            >
              <Image
                src="/icon.png"
                alt={logoAlt}
                width={238}
                height={244}
                priority
                className={`h-4 w-[18px] object-contain ${isDark ? "brightness-0" : "brightness-0 invert"}`}
              />
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                aria-label="Buka Menu"
                className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
                  isDark ? "text-black" : "text-white"
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 7"
                  className="h-[7px] w-3.5 fill-current"
                >
                  <path d="M13.25 5.5H.75a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5Z" />
                  <path d="M.75 1.5h12.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5Z" />
                </svg>
              </SheetTrigger>

              <SheetContent
                side="top"
                showCloseButton={false}
                overlayClassName="bg-black/60! backdrop-blur-[32px]! duration-[400ms]!"
                className="inset-0! h-[calc(100svh+64px)]! w-full! max-w-none! gap-0! rounded-b-[16px]! border-0! bg-[#f3f3f3]! p-0! text-black! shadow-none! transition-opacity! duration-[400ms]! ease-linear! data-ending-style:translate-y-0! data-starting-style:translate-y-0! lg:hidden!"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu navigasi</SheetTitle>
                </SheetHeader>

                <div className="relative z-10 m-2 flex h-16 items-center justify-between">
                  <div className="flex h-16 w-[66px] shrink-0 items-center">
                    <SheetClose
                      aria-label="Close"
                      className="ml-3 flex h-5 w-5 items-center justify-center text-black"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 14 14"
                        className="h-3.5 w-3.5 fill-none stroke-current"
                      >
                        <path d="M2.25 2.25 11.75 11.75M11.75 2.25 2.25 11.75" strokeWidth="1.5" />
                      </svg>
                    </SheetClose>
                  </div>

                  <CompactUtilities companyName={companyName} darkInk />
                </div>

                <nav
                  aria-label="Navigasi utama"
                  className="absolute inset-x-0 bottom-0 top-16 overflow-y-auto px-6 pb-3 pt-2"
                >
                  {siteNavLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        style={{ animationDelay: `${180 + index * 60}ms` }}
                        className="jds-compact-menu-link flex h-12 w-full items-center py-2 font-sans text-[32px] font-black leading-8 tracking-[-0.96px] text-black"
                      >
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <CompactUtilities companyName={companyName} darkInk={isDark} />
        </div>
      </header>
    </>
  );
}
