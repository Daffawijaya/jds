import Link from "next/link";
import Image from "next/image";
import { companyInfo, servicesData, siteNavLinks } from "@/data/companyData";

const logoAlt = `${companyInfo.shortName} - ${companyInfo.officialName}`;

export function Footer({ showBrand = true }: { showBrand?: boolean }) {
  return (
    <footer
      className={`bg-black text-zinc-400 text-[11px] overflow-hidden ${
        showBrand ? "pt-12" : "py-12"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Profil */}
          <div className="col-span-2 space-y-3">
            <Link href="/" aria-label={logoAlt} className="inline-flex items-center">
              <Image
                src="/jdsw.png"
                alt={logoAlt}
                width={626}
                height={271}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="leading-relaxed">{companyInfo.overview}</p>
            <p className="text-zinc-500">{companyInfo.positioning}</p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navigasi</h4>
            <ul className="space-y-2">
              {siteNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan Utama */}
          <div>
            <h4 className="text-white font-semibold mb-3">Layanan {companyInfo.shortName}</h4>
            <ul className="space-y-2">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href="/services" className="transition-colors hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-3">Hubungi Kami</h4>
            <ul className="space-y-2">
              <li className="leading-relaxed">{companyInfo.address}</li>
              <li>
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`} className="transition-colors hover:text-white">
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {companyInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>
            &copy; {new Date().getFullYear()} {companyInfo.officialName} ({companyInfo.shortName}). All
            rights reserved.
          </span>
          <span>
            {companyInfo.district}, {companyInfo.regency}, {companyInfo.province}.
          </span>
        </div>
      </div>

      {showBrand && (
        <div aria-hidden="true" className="mt-8 select-none pointer-events-none overflow-hidden">
          <Image
            src="/jdsbrand.png"
            alt=""
            width={626}
            height={271}
            sizes="100vw"
            className="w-[105%] max-w-none h-auto block object-cover object-top -ml-[2.5%] -mb-[13%]"
          />
        </div>
      )}
    </footer>
  );
}
