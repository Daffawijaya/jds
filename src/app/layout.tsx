import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { companyInfo } from "@/data/companyData";
import { cn } from "@/lib/utils";

/* Myriad Pro — font-body (regular/semibold/bold) */
const myriad = localFont({
  src: [
    { path: "./fonts/myriadpro-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/myriadpro-semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/myriadpro-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

/* Myriad Pro Condensed — varian heading/display */
const myriadCondensed = localFont({
  src: [
    { path: "./fonts/myriadpro-cond.otf", weight: "400", style: "normal" },
    { path: "./fonts/myriadpro-boldcond.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${companyInfo.shortName} - ${companyInfo.officialName} | ${companyInfo.positioning}`,
    template: `%s | ${companyInfo.shortName} - ${companyInfo.officialName}`,
  },
  description: `${companyInfo.officialName} (${companyInfo.shortName}) menyediakan solusi Web Development, Software Development, Digitalisasi, IT Consulting, Outsourcing, dan Penyiapan Tenaga Ahli Profesional di Kutai Kartanegara, Kalimantan Timur.`,
  keywords: [
    "Jaya Dinara Sukses",
    "JDS",
    "IT Solutions Kutai Kartanegara",
    "Digitalisasi UMKM",
    "Tenaga Ahli IT",
    "IT Outsourcing Kalimantan Timur",
    "Software Development Kukar",
    "Web Development",
    "EtamHub"
  ],
  authors: [{ name: companyInfo.officialName }],
  verification: {
    google: "maQ8VR_wwFHBIAw1Aza7U7luL9Xt9ySq8hN15zBHSL0",
  },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://jds.co.id",
    title: `${companyInfo.shortName} - ${companyInfo.officialName}`,
    description: companyInfo.overview,
    siteName: companyInfo.officialName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("scroll-smooth", myriad.variable, myriadCondensed.variable, "font-sans")}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
