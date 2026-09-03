import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight, Share2 } from "lucide-react";
import { companyInfo, servicesData } from "@/data/companyData";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Branding & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="group inline-flex"
              aria-label={`${companyInfo.shortName} - ${companyInfo.officialName}`}
            >
              <Image
                src="/jds.png"
                alt={`${companyInfo.shortName} - ${companyInfo.officialName}`}
                width={626}
                height={271}
                className="h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              {companyInfo.overview}
            </p>
            <div className="pt-2 flex items-center gap-3 text-sm font-semibold text-[#eb1000]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#eb1000]"></span>
              <span>{companyInfo.positioning}</span>
            </div>
          </div>

          {/* Col 3: Halaman Utama */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-900 transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gray-900 transition-colors">
                  Proyek
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-gray-900 transition-colors">
                  Karir
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Layanan Utama */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Layanan {companyInfo.shortName}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href="/services" className="hover:text-gray-900 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Kontak & Alamat */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#eb1000] shrink-0 mt-1" />
                <span className="text-gray-600 leading-snug">{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#eb1000] shrink-0" />
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#eb1000] shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Share2 className="w-4 h-4 text-[#eb1000] shrink-0" />
                <a
                  href={companyInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                  <span>{companyInfo.instagram}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 sm:my-12 bg-gray-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {companyInfo.officialName} ({companyInfo.shortName}).
            All rights reserved.
          </p>
          <p className="text-gray-400">
            {companyInfo.district}, {companyInfo.regency}, {companyInfo.province}
          </p>
        </div>
      </div>
    </footer>
  );
}
