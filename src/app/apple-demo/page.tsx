export default function AdobeLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 text-sm">
        <div className="flex items-center space-x-6">
          {/* Adobe Logo Placeholder */}
          <div className="flex items-center text-red-600 font-bold text-xl tracking-tighter">
            <svg className="w-6 h-6 mr-1 fill-current" viewBox="0 0 24 24">
              <path d="M14.5 3L22 19H17.5L14.5 12.5L11.5 19H7L14.5 3Z" />
              <path d="M2.5 19L10 3H14.5L7 19H2.5Z" />
            </svg>
            JDS
          </div>
          <div className="hidden lg:flex space-x-6 font-semibold text-gray-700">
            <a href="#" className="hover:text-black">
              Layanan <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="hover:text-black">
              Tentang Kami <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="hover:text-black">
              Proyek <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="hover:text-black">
              Kontak <span className="text-[10px]">▼</span>
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 font-semibold text-gray-700">
          <button className="hover:text-black">
            {/* Search Icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <a href="#" className="hover:text-black">
            Hubungi Kami
          </a>
          <a href="#" className="hover:text-black">
            Kontak
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION & FEATURES GRID */}
      <section className="bg-black text-white relative">
        {/* Top Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-orange-500 to-purple-600"></div>

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
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
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
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
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop"
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
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop"
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
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop"
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
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop"
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
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=600&auto=format&fit=crop"
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
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
            alt="Visi Perusahaan"
            className="rounded-xl shadow-xl w-full"
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
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row-reverse items-center gap-16">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1516280440502-861f6966699b?q=80&w=800&auto=format&fit=crop"
            alt="Misi Utama"
            className="rounded-xl shadow-xl w-full"
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
      <section className="bg-[#f8f8f8] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nilai-nilai kerja JDS.</h2>
          <p className="text-gray-600 text-sm">
            Prinsip dasar yang menjadi pegangan kami dalam membangun kepercayaan
            dan hasil karya.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inspiration Card 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://images.unsplash.com/photo-1565578762-b91c1404c07d?q=80&w=800&auto=format&fit=crop"
              alt="Frog"
              className="w-full h-64 object-cover"
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
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://images.unsplash.com/photo-1555580168-9deea6873132?q=80&w=800&auto=format&fit=crop"
              alt="Butterfly"
              className="w-full h-64 object-cover"
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
      </section>

      {/* 6. WHICH APP IS BEST */}
      <section className="bg-[#f8f8f8] py-12 px-6 text-center border-b border-gray-200">
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
      <section className="bg-white py-20 px-6 text-center">
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

      {/* 8. FOOTER */}
      <footer className="bg-[#fafafa] border-t border-gray-200 pt-1 text-sm text-gray-600">
        {/* Footer Top Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 mb-12"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-black mb-4">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Digitalisasi Sistem
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Konsultasi IT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Tenaga Ahli
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Multimedia Konten
                </a>
              </li>
            </ul>
          </div>
          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-black mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Profil Perusahaan
                </a>
              </li>
              <h4 className="font-bold text-black mt-6 mb-4">Navigasi</h4>
              <li>
                <a href="#" className="hover:text-black">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-black mb-4">Solusi</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Digitalisasi Sistem
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Konsultasi IT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Tenaga Ahli
                </a>
              </li>
            </ul>
          </div>
          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-black mb-4">Dukungan</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Komunitas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Konsultasi Gratis
                </a>
              </li>
            </ul>
          </div>
          {/* Col 5 */}
          <div>
            <h4 className="font-bold text-black mb-4">Sumber Daya</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Blog JDS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Dokumentasi
                </a>
              </li>
            </ul>
          </div>
          {/* Col 6 */}
          <div>
            <h4 className="font-bold text-black mb-4">Akun &amp; Kontak</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Hubungi Kami
                </a>
              </li>
            </ul>
            <h4 className="font-bold text-black mt-6 mb-4">JDS</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Proyek
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="border-t border-gray-200 py-6 px-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="font-semibold text-black cursor-pointer">
              Bahasa Indonesia
            </span>
            <div className="flex space-x-3">
              {/* Social Icons Placeholders */}
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-500">
            <a href="#" className="hover:text-black">
              © 2026 Jaya Dinara Sukses. Seluruh hak cipta dilindungi.
            </a>
            <a href="#" className="hover:text-black">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-black">
              Syarat &amp; Ketentuan
            </a>
            <a href="#" className="hover:text-black">
              Preferensi Cookie
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
