import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';

export default function AppleIntelligencePage() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] font-sans overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center pt-24 pb-16 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
          Jaya Dinara Sukses.<br />
          Solusi Digital Terpercaya.
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl">
          Mitra terintegrasi untuk transformasi digital, pengembangan software, dan penyediaan tenaga ahli profesional di Kutai Kartanegara.
        </p>

        {/* Hero Image / Phone & Floating Cards Simulation */}
        <div className="relative w-full max-w-4xl h-[400px] md:h-[600px] flex justify-center items-center mt-10">
          <div className="relative z-10 w-[250px] md:w-[300px] h-[500px] md:h-[600px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
             {/* Dummy Phone Screen */}
             <Image 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop" 
                alt="JDS Digital Solutions" 
                fill 
                className="object-cover opacity-80"
              />
          </div>
          {/* Floating Elements Placeholder */}
          <div className="absolute left-10 md:left-24 top-20 w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg transform -rotate-6">
            <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop" alt="Web Development" fill className="object-cover" />
          </div>
          <div className="absolute right-10 md:right-24 bottom-20 w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg transform rotate-6">
            <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop" alt="Professional Team" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 2. EXPLORE WHAT'S POSSIBLE - BENTO GRID 1 */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-semibold mb-10 tracking-tight">
          Solusi lengkap untuk transformasi digital Anda.
        </h2>
        
        {/* Large Split Card (Writing Tools) */}
        <div className="bg-[#f5f5f7] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
          <div className="p-12 flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Web Development.</h3>
            <p className="text-gray-600 text-lg">
              Pengembangan situs web modern, responsif, dan teroptimasi untuk kebutuhan profil korporasi maupun portal publik.
            </p>
          </div>
          <div className="flex-1 relative min-h-[300px]">
            <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" alt="Web Development" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 3. VISUAL EXPRESSION - BENTO GRID 2 */}
      <section className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col h-[400px]">
            <div className="flex-1 relative mb-6 rounded-xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400&auto=format&fit=crop" alt="Software Development" fill className="object-cover" />
            </div>
            <h4 className="font-semibold text-lg">Software Development.</h4>
            <p className="text-sm text-gray-500 mt-2">Rancang bangun perangkat lunak custom untuk otomatisasi bisnis.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col h-[400px]">
            <div className="flex-1 relative mb-6 rounded-xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop" alt="UI/UX Design" fill className="object-cover" />
            </div>
            <h4 className="font-semibold text-lg">UI/UX Design.</h4>
            <p className="text-sm text-gray-500 mt-2">Antarmuka intuitif dan pengalaman pengguna yang menarik.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col h-[400px]">
            <div className="flex-1 relative mb-6 rounded-xl overflow-hidden bg-black">
              {/* Simulate dark mode UI card */}
            </div>
            <h4 className="font-semibold text-lg">Digitalisasi Sistem.</h4>
            <p className="text-sm text-gray-500 mt-2">Modernisasi alur kerja konvensional menjadi ekosistem digital.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col h-[400px]">
             <div className="flex-1 relative mb-6 rounded-xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=400&auto=format&fit=crop" alt="IT Consulting" fill className="object-cover" />
            </div>
            <h4 className="font-semibold text-lg">IT Consulting.</h4>
            <p className="text-sm text-gray-500 mt-2">Konsultasi strategis perencanaan teknologi informasi.</p>
          </div>
        </div>
      </section>

      {/* 4. SIRI SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="bg-[#f5f5f7] rounded-[2.5rem] overflow-hidden flex flex-col-reverse md:flex-row h-auto md:h-[550px]">
           <div className="flex-1 relative min-h-[300px]">
            <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" alt="Professional Team" fill className="object-cover" />
          </div>
          <div className="p-12 flex-1 flex flex-col justify-center">
            <h3 className="text-3xl font-semibold mb-4">Tenaga Ahli Profesional.</h3>
            <p className="text-gray-600 text-lg">
              Penyediaan dan penyiapan tenaga ahli IT profesional untuk penugasan program, pendampingan, dan pendukung proyek di instansi pemerintah maupun swasta.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PRIVACY SECTION */}
      <section className="bg-gray-100 py-24 px-6 text-center mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-900 rounded-full flex items-center justify-center text-white">
            {/* Dummy Icon for Trust */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Kemitraan yang Handal dan Terpercaya.</h2>
          <p className="text-lg text-gray-600">
            Jaya Dinara Sukses berkomitmen memberikan layanan terbaik dengan standar kualitas tinggi, integritas, dan tanggung jawab penuh bagi setiap klien.
          </p>
        </div>
      </section>

      {/* 6. DEVICE SHOWCASE */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-semibold mb-12 text-center">Layanan JDS.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Service 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-48 md:w-40 md:h-56 relative mb-6">
              <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" alt="Web Development" fill className="object-contain" />
            </div>
            <h4 className="font-semibold text-lg">Web Development</h4>
            <p className="text-sm text-gray-500 mb-4">Situs web modern & responsif.</p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition">Konsultasi</button>
              <button className="text-blue-600 px-4 py-1.5 text-sm font-medium hover:underline">Selengkapnya &gt;</button>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-48 md:w-40 md:h-56 relative mb-6">
              <Image src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400&auto=format&fit=crop" alt="Software Development" fill className="object-contain" />
            </div>
            <h4 className="font-semibold text-lg">Software Dev</h4>
            <p className="text-sm text-gray-500 mb-4">Aplikasi custom bisnis Anda.</p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition">Konsultasi</button>
              <button className="text-blue-600 px-4 py-1.5 text-sm font-medium hover:underline">Selengkapnya &gt;</button>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-48 md:w-40 md:h-56 relative mb-6">
              <Image src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=400&auto=format&fit=crop" alt="IT Consulting" fill className="object-contain" />
            </div>
            <h4 className="font-semibold text-lg">IT Consulting</h4>
            <p className="text-sm text-gray-500 mb-4">Strategi teknologi tepat guna.</p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition">Konsultasi</button>
              <button className="text-blue-600 px-4 py-1.5 text-sm font-medium hover:underline">Selengkapnya &gt;</button>
            </div>
          </div>

          {/* Service 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-48 md:w-40 md:h-56 relative mb-6">
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop" alt="Professional Staffing" fill className="object-contain" />
            </div>
            <h4 className="font-semibold text-lg">Tenaga Ahli</h4>
            <p className="text-sm text-gray-500 mb-4">SDM profesional berpengalaman.</p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition">Konsultasi</button>
              <button className="text-blue-600 px-4 py-1.5 text-sm font-medium hover:underline">Selengkapnya &gt;</button>
            </div>
          </div>
          
        </div>
      </section>

      {/* FOOTER - Using shared Footer component */}
      <Footer />
    </main>
  );
}
