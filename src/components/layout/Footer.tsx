import Link from "next/link";
import Image from "next/image";
import { companyInfo, servicesData, siteNavLinks } from "@/data/companyData";
import FooterBrand from "@/components/layout/FooterBrand";

const logoAlt = `${companyInfo.shortName} - ${companyInfo.officialName}`;

type FooterVariant = "dark" | "light";

export function Footer({
  showBrand = true,
  variant = "dark",
}: {
  showBrand?: boolean;
  variant?: FooterVariant;
}) {
  const dark = variant === "dark";

  return (
    <footer
      className={`relative z-0 isolate text-sm overflow-hidden ${
        dark ? "bg-black text-zinc-400" : "bg-[#f8f8f8] text-gray-600"
      }`}
    >
      <div className={`relative z-10 pt-8 sm:pt-10 ${dark ? "bg-black" : "bg-[#f8f8f8]"}`}>
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand & Profil */}
            <div className="col-span-2 space-y-3">
              <Link href="/" aria-label={logoAlt} className="inline-flex items-center">
                <Image
                  src={dark ? "/jdsw.png" : "/jds.png"}
                  alt={logoAlt}
                  width={626}
                  height={271}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="leading-relaxed">{companyInfo.overview}</p>
              <p className={dark ? "text-zinc-500" : "text-gray-500"}>{companyInfo.positioning}</p>
            </div>

            {/* Navigasi */}
            <div>
              <h4 className={`font-semibold text-base mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Navigasi</h4>
              <ul className="space-y-2">
                {siteNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`transition-colors ${dark ? "hover:text-white" : "hover:text-black"}`}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layanan Utama */}
            <div>
              <h4 className={`font-semibold text-base mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Layanan {companyInfo.shortName}</h4>
              <ul className="space-y-2">
                {servicesData.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <Link href="/services" className={`transition-colors ${dark ? "hover:text-white" : "hover:text-black"}`}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h4 className={`font-semibold text-base mb-3 ${dark ? "text-white" : "text-gray-900"}`}>Hubungi Kami</h4>
              <ul className="space-y-2">
                <li className="leading-relaxed">{companyInfo.address}</li>
                <li>
                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors ${dark ? "hover:text-white" : "hover:text-black"}`}
                  >
                    {companyInfo.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${companyInfo.email}`} className={`transition-colors ${dark ? "hover:text-white" : "hover:text-black"}`}>
                    {companyInfo.email}
                  </a>
                </li>
                <li>
                  <a
                    href={companyInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors ${dark ? "hover:text-white" : "hover:text-black"}`}
                  >
                    {companyInfo.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 pb-8 sm:pb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span>
              &copy; {new Date().getFullYear()} {companyInfo.officialName} ({companyInfo.shortName}). All
              rights reserved.
            </span>
            <span>
              {companyInfo.district}, {companyInfo.regency}, {companyInfo.province}.
            </span>
          </div>
        </div>
      </div>

      {showBrand && (
        <FooterBrand>
          <Image
            src="/jdsbrand.png"
            alt=""
            width={626}
            height={271}
            sizes="100vw"
            className={`w-[105%] max-w-none h-auto block object-cover object-top -ml-[2.5%] -mb-[13%] opacity-[0.07] ${
              dark ? "" : "invert"
            }`}
          />
        </FooterBrand>
      )}
    </footer>
  );
}
