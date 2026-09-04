import type { Metadata } from "next";
import { companyInfo } from "@/data/companyData";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Profil perusahaan ${companyInfo.officialName} (${companyInfo.shortName}) - Penyedia Solusi IT, Digitalisasi, dan Tenaga Ahli Profesional di Kutai Kartanegara, Kalimantan Timur.`,
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* 1. HERO SECTION & FEATURES GRID */}
      <section className="bg-black text-white relative mt-1.5">
        {/* Top Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-orange-500 to-purple-600"></div>

        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 pt-20 pb-32 flex flex-col items-center text-center">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
            Profil Perusahaan JDS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Mengenal Jaya Dinara Sukses,
            <br />
            mitra solusi digital terpercaya.
          </h1>
          <p className="text-gray-300 max-w-3xl mb-8 text-sm md:text-base">
            IT, Digital Solutions, Outsourcing &amp; Professional Services — berpusat
            di Kutai Kartanegara, Kalimantan Timur, melayani instansi pemerintah dan
            mitra bisnis.{" "}
            <span className="underline cursor-pointer hover:text-white">
              Lihat layanan kami.
            </span>
          </p>

          <div className="flex space-x-4 mb-20">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
              Hubungi Kami
            </button>
            <button className="border border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-6 rounded-full transition-colors">
              Lihat Layanan
            </button>
          </div>

          {/* Grid Cards (Overlapping slightly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
            {/* Card 1 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                alt="Web Development"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-red-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    WD
                  </span>
                  <span>Web Development</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Pengembangan situs web modern, responsif, dan teroptimasi.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Selengkapnya
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    Lihat layanan ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80"
                alt="Software Development"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-blue-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    SD
                  </span>
                  <span>Software Development</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Rancang bangun perangkat lunak custom untuk otomatisasi proses bisnis.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Selengkapnya
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    Lihat layanan ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80"
                alt="UI/UX Design"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-blue-300 rounded-sm text-blue-900 flex items-center justify-center text-[8px]">
                    UX
                  </span>
                  <span>UI/UX Design</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Perancangan antarmuka intuitif untuk aplikasi web dan mobile.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Selengkapnya
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    Lihat layanan ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                alt="Digitalisasi Sistem"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-purple-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    DS
                  </span>
                  <span>Digitalisasi Sistem</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Modernisasi alur kerja menjadi ekosistem digital terintegrasi.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Selengkapnya
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    Lihat layanan ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
                alt="IT Consulting"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-orange-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    IC
                  </span>
                  <span>IT Consulting</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Konsultasi strategis perencanaan teknologi dan peta jalan digitalisasi.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Selengkapnya
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    Lihat layanan ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80"
                alt="IT Outsourcing"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-gray-800 rounded-sm text-white flex items-center justify-center text-[8px]">
                    IO
                  </span>
                  <span>IT Outsourcing</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Pengelolaan operasional IT secara terstruktur dan terukur.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Selengkapnya
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    Lihat layanan ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHT 1: FIREFLY */}
      <section className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-20 flex flex-col md:flex-row items-center gap-24">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
            alt="Visi Perusahaan"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 mb-4">
            <span className="w-5 h-5 bg-red-500 rounded-sm text-white flex items-center justify-center text-[10px]">
              VI
            </span>
            <span>Visi Perusahaan</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Menjadi penyedia solusi IT dan digitalisasi terdepan yang terpercaya.
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Mempercepat modernisasi pelayanan dan bisnis daerah — mulai dari
            pengembangan perangkat lunak, digitalisasi sistem, hingga penyiapan
            tenaga ahli profesional dalam satu tim.
          </p>
          <button className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors">
            Tentang Kami
          </button>
        </div>
      </section>

      {/* 4. HIGHLIGHT 2: PREMIERE PRO */}
      <section className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6 py-20 flex flex-col md:flex-row-reverse items-center gap-24">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Misi Utama"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 mb-4">
            <span className="w-5 h-5 bg-indigo-900 rounded-sm text-purple-300 flex items-center justify-center text-[10px]">
              MS
            </span>
            <span>Misi Utama</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Misi utama JDS dalam melayani mitra kerja sama.
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Menghadirkan produk perangkat lunak dan web yang aman, inovatif, dan
            responsif; menyiapkan tenaga ahli berdedikasi; serta memperkuat
            efisiensi operasional organisasi melalui digitalisasi sistem.
          </p>
          <button className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors">
            Lihat Layanan
          </button>
        </div>
      </section>

      {/* 5. INSPIRATION SECTION */}
      <section className="bg-[#f8f8f8] pt-20 pb-16">
        <div className="max-w-[1310px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nilai-nilai kerja JDS.</h2>
            <p className="text-gray-600 text-sm">
              Prinsip dasar yang menjadi pegangan kami dalam membangun kepercayaan
              dan hasil karya.
            </p>
          </div>
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
      <section className="bg-[#f8f8f8] pt-4 pb-16 px-2 sm:px-4 lg:px-6 text-center">
        <h3 className="text-xl font-bold mb-2">
          Belum yakin layanan mana yang sesuai?
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Ceritakan kebutuhan Anda. Tim kami siap membantu dari konsultasi hingga implementasi.
        </p>
        <button className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors">
          Konsultasi Gratis
        </button>
      </section>

      {/* 7. CREATIVITY FOR ALL */}
      <section className="bg-white py-20 px-2 sm:px-4 lg:px-6 text-center">
        {/* Abstract Logo Placeholder */}
        <div className="w-12 h-12 mx-auto mb-6 bg-gradient-to-tr from-yellow-400 via-red-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          JDS
        </div>
        <h2 className="text-2xl font-bold mb-4">Solusi IT untuk semua</h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
          Web, software, desain, digitalisasi, konsultasi IT, hingga tenaga ahli —
          semuanya dalam satu tim. Berpusat di Kutai Kartanegara, Kalimantan Timur.
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