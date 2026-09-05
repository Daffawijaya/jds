import type { Metadata } from "next";
import { companyInfo } from "@/data/companyData";
import { Footer } from "@/components/layout/Footer";
import { FeatureSection } from "@/components/shared/FeatureSection";
import { SectionTitle } from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Profil perusahaan ${companyInfo.officialName} (${companyInfo.shortName}) - Penyedia Solusi IT, Digitalisasi, dan Tenaga Ahli Profesional di Kutai Kartanegara, Kalimantan Timur.`,
};

const aboutCards = [
  {
    label: "Pengalaman",
    title: "Pengalaman",
    description: "Beroperasi sejak 2026, melayani berbagai sektor industri.",
    image: "/image/Codex Image Sep 5, 2026, 10_30_52 PM.png",
    button: { label: "Tentang Kami", href: "/about" },
  },
  {
    label: "Proyek Tercapai",
    title: "Proyek Tercapai",
    description: "Portofolio proyek untuk instansi pemerintah dan mitra bisnis.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    button: { label: "Lihat Proyek", href: "/projects" },
  },
  {
    label: "Jangkauan Lokal",
    title: "Jangkauan Lokal",
    description: "Berpusat di Kalimantan Timur, melayani sekitarnya.",
    image: "https://image.idn.media/post/20200903/samarinda-abd9320964ad6c73846427ed0a6896aa.jpg",
    button: { label: "Lihat Lokasi", href: "/contact" },
  },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* 1. HERO SECTION & FEATURES GRID */}
      <section className="bg-black text-white relative overflow-hidden">
        <img
          src="/image/bgg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-screen left-1/2 -translate-x-1/2 object-cover object-top h-full scale-[1.1] origin-top"
        />
        {/* Hero content */}
        <div className="relative max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 pt-20 pb-32 flex flex-col items-center text-center">
          <span className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
            Tentang Kami
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl text-white">
            Jaya Dinara Sukses<br />
            Solusi IT Terpercaya
          </h1>
          <p className="text-white max-w-3xl text-lg leading-relaxed mb-8">
            Penyedia solusi IT terintegrasi yang membantu instansi pemerintah
            dan mitra bisnis di Kalimantan Timur bertransformasi digital secara
            efisien dan terukur.
          </p>

          <div className="flex space-x-4 mb-20">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
              Hubungi Kami
            </button>
            <button className="border border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-6 rounded-full transition-colors">
              Lihat Layanan
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            {aboutCards.map((card) => (
              <div key={card.title} className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
                <img src={card.image} alt={card.title} className="h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm font-semibold text-black mb-1">
                    {card.label}
                  </p>
                  <h3 className="text-black text-2xl font-semibold mb-2 flex-grow">
                    {card.description}
                  </h3>
                  <div className="mt-4 flex justify-end">
                    <a
                      href={card.button.href}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors text-sm"
                    >
                      {card.button.label}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VISI PERUSAHAAN */}
      <FeatureSection
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
        imageAlt="Visi Perusahaan"
        badge="Visi Perusahaan"
        badgeColor="bg-red-500 text-white"
        title="Menjadi penyedia solusi IT dan digitalisasi terdepan yang terpercaya."
        description="Mempercepat modernisasi pelayanan dan bisnis daerah, mulai dari pengembangan perangkat lunak, digitalisasi sistem, hingga penyiapan tenaga ahli profesional dalam satu tim."
        button={{ label: "Tentang Kami", href: "/about" }}
        imagePosition="left"
      />

      {/* 4. MISI UTAMA */}
      <FeatureSection
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        imageAlt="Misi Utama"
        badge="Misi Utama"
        badgeColor="bg-indigo-900 text-purple-300"
        title="Misi utama JDS dalam melayani mitra kerja sama."
        description="Menghadirkan produk perangkat lunak dan web yang aman, inovatif, dan responsif; menyiapkan tenaga ahli berdedikasi; serta memperkuat efisiensi operasional organisasi melalui digitalisasi sistem."
        button={{ label: "Lihat Layanan", href: "/services" }}
        imagePosition="right"
      />

      {/* 5. INSPIRATION SECTION */}
      <section className="bg-[#f8f8f8] pt-20 pb-16">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <SectionTitle
            title="Nilai-nilai kerja JDS."
            subtitle="Prinsip dasar yang menjadi pegangan kami dalam membangun kepercayaan dan hasil karya."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inspiration Card 1 */}
          <div className="bg-white rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
              alt="Profesionalisme"
              className="w-full h-[24rem] object-cover"
            />
            <div className="p-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nilai | Profesionalisme
              </p>
              <h3 className="text-lg font-bold hover:underline cursor-pointer">
                Menjalankan setiap penugasan dengan standar kualitas tinggi, integritas, dan tanggung jawab penuh.
              </h3>
            </div>
          </div>
          {/* Inspiration Card 2 */}
          <div className="bg-white rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
              alt="Inovasi Tepat Guna"
              className="w-full h-[24rem] object-cover"
            />
            <div className="p-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nilai | Inovasi Tepat Guna
              </p>
              <h3 className="text-lg font-bold hover:underline cursor-pointer">
                Menghadirkan solusi digitalisasi yang praktis, efektif, dan memberi manfaat nyata.
              </h3>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 6. WHICH APP IS BEST */}
      <section className="bg-[#f8f8f8] pt-4 pb-8 px-2 sm:px-4 lg:px-6">
        <SectionTitle
          title="Belum yakin layanan mana yang sesuai?"
          subtitle="Ceritakan kebutuhan Anda. Tim kami siap membantu dari konsultasi hingga implementasi."
          button={{ label: "Konsultasi Gratis", href: "/contact" }}
          className="mb-0"
        />
      </section>

      {/* 7. CREATIVITY FOR ALL */}
      <section className="bg-white py-20 px-2 sm:px-4 lg:px-6 text-center">
        {/* Abstract Logo Placeholder */}
        <div className="w-12 h-12 mx-auto mb-6 bg-gradient-to-tr from-yellow-400 via-red-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          JDS
        </div>
        <h2 className="text-2xl font-bold mb-4">Solusi IT untuk semua</h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
          Web, software, desain, digitalisasi, konsultasi IT, hingga tenaga ahli, semuanya dalam satu tim. Berpusat di Kutai Kartanegara, Kalimantan Timur.
        </p>
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          Lihat semua layanan
        </a>
      </section>

      {/* Bottom Gradient Bar */}
      <div className="h-4 w-full bg-gradient-to-r from-red-600 via-orange-500 to-purple-600"></div>

      {/* Footer */}
      <Footer variant="light" />
    </div>
  );
}