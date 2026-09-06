import Link from "next/link";
import { ArrowRight, ShieldCheck, Building2, MonitorSmartphone } from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";

/* ═══════════════════════════════════════════════════════════════
   FeatureHighlights — meniru blok "Features and Releases /
   Explore what's new" di adobe.com:
   1 card gambar besar berisi 2 panel liquid glass + 3 card di bawah.
   Konten disesuaikan dengan halaman Proyek & Keunggulan JDS.
   ═══════════════════════════════════════════════════════════════ */

const highlightCards = [
  {
    title: "Tenaga ahli pendamping UMKM 2026.",
    description:
      "Tenaga ahli IT dan pendamping yang disiapkan, dikelola, dan dilaporkan untuk program pendampingan UMKM.",
    cta: "Lihat program",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    alt: "Pendampingan tenaga ahli UMKM",
  },
  {
    title: "Alur kerja instansi jadi digital.",
    description:
      "Dari pendataan manual ke sistem yang rapi, terpantau, dan mudah digunakan lintas tim.",
    cta: "Pelajari layanan",
    href: "/services",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    alt: "Digitalisasi alur kerja",
  },
  {
    title: "Tim ahli siap ditempatkan.",
    description:
      "Perkuat proyek Anda dengan tenaga profesional yang siap bertugas sesuai durasi program.",
    cta: "Mulai konsultasi",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    alt: "Tim ahli siap penugasan",
  },
];

const glassPanel =
  "relative overflow-hidden rounded-2xl border border-white/30 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.25)]";
const glassSheen =
  "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent";

export function FeatureHighlights() {
  return (
    <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 mb-16">
      {/* ── Card gambar besar + 2 panel liquid glass ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[520px] sm:min-h-[560px] flex">
        <img
          src="/image/etamhub.png"
          alt="Platform digital etamhub"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 p-6 sm:p-10">
          {/* Panel glass 1 — pesan utama */}
          <div className={`${glassPanel} max-w-xl p-6 sm:p-8 text-white`}>
            <div className={glassSheen} />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              ✨ Baru rilis · 2026
            </span>
            <h3 className="relative z-10 mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              etamhub: satu pintu UMKM Kutai Kartanegara.
            </h3>
            <p className="relative z-10 mt-2 text-sm sm:text-base text-white/85 leading-relaxed">
              Katalog digital, informasi, dan promosi produk UMKM lokal kini
              terhubung dalam satu platform yang mudah dijelajahi masyarakat.
            </p>
            <Link
              href="/projects"
              className="relative z-10 mt-5 inline-flex items-center gap-1.5 bg-white text-zinc-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors"
            >
              Jelajahi etamhub
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Panel glass 2 — ringkasan fakta */}
          <div className={`${glassPanel} lg:w-80 p-6 text-white shrink-0`}>
            <div className={glassSheen} />
            <p className="relative z-10 text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
              Sorotan Proyek
            </p>
            <ul className="relative z-10 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-bold">Proyek Terverifikasi</span>
                  <span className="block text-white/70 text-xs mt-0.5">
                    Terdokumentasi & terukur
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-bold">Dinas Koperasi & UKM Kukar</span>
                  <span className="block text-white/70 text-xs mt-0.5">
                    Mitra instansi pemerintah daerah
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MonitorSmartphone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-bold">Web Platform & Katalog</span>
                  <span className="block text-white/70 text-xs mt-0.5">
                    Responsif di desktop & ponsel
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── 3 card di bawahnya (gaya adobe.com) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {highlightCards.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3]">
              <img
                src={card.image}
                alt={card.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="font-bold text-lg tracking-tight mb-1">{card.title}</h4>
            <p className="text-sm text-zinc-600 leading-relaxed mb-4 flex-1">
              {card.description}
            </p>
            <Link
              href={card.href}
              className="group inline-flex items-center gap-1 text-sm font-semibold text-[#1473E6] hover:underline"
            >
              {card.cta}
              <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
