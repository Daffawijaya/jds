import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { companyInfo } from "@/data/companyData";

/* Myriad Pro — font yang dipakai Adobe (basis dari Adobe Clean) */
const myriad = localFont({
  src: [
    { path: "./fonts/myriadpro-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/myriadpro-semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/myriadpro-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

/* Myriad Pro Condensed — varian display/heading, siap dipakai via kelas font-display */
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
    <html lang="id" className={`scroll-smooth ${myriad.variable} ${myriadCondensed.variable}`}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
