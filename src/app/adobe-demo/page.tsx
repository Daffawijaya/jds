export default function AdobeLandingPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#070b12] text-white overflow-hidden -mt-16 flex items-center min-h-[560px] sm:min-h-[620px] lg:min-h-[680px]">
        {/* Background full hero */}
        <img
          src="/bggggg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-zinc-300">
              Jaya Dinara Sukses
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
              Masa depan digital,
              <br />
              dibangun hari ini.
            </h1>
            <p className="text-zinc-200 text-sm leading-relaxed mb-6">
              Satu mitra untuk transformasi digital: membangun sistem, mendigitalkan alur kerja, dan
              menyiapkan tenaga ahli profesional bagi instansi maupun bisnis Anda.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="/contact"
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-md"
              >
                Mulai Proyek
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: EVERYTHING YOU NEED TO MAKE ANYTHING */}
      <section className="py-20 bg-white text-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Everything you need to make anything.
          </h2>
          <p className="text-zinc-600 text-sm max-w-2xl mx-auto mb-12">
            Explore 20+ apps for design, photography, video, PDF, and web—plus generative AI tools.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            {/* Card 1 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="p-3 border-b border-zinc-100 flex items-center space-x-2 text-xs font-semibold">
                <span className="w-5 h-5 bg-red-600 rounded flex items-center justify-center text-white text-[10px] font-bold">Ps</span>
                <span>Generative Fill</span>
              </div>
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80"
                  alt="Generative Fill"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white text-xs text-zinc-600">
                Create images with simple text prompts in Photoshop.
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="p-3 border-b border-zinc-100 flex items-center space-x-2 text-xs font-semibold">
                <span className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-[10px] font-bold">Ai</span>
                <span>Remove Background</span>
              </div>
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Remove Background"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white text-xs text-zinc-600">
                Easily isolate subjects and edit backgrounds instantly.
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="p-3 border-b border-zinc-100 flex items-center space-x-2 text-xs font-semibold">
                <span className="w-5 h-5 bg-red-700 rounded flex items-center justify-center text-white text-[10px] font-bold">PDF</span>
                <span>PDF Editor</span>
              </div>
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                  alt="PDF Editor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white text-xs text-zinc-600">
                Edit, convert, and sign PDFs seamlessly online.
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="p-3 border-b border-zinc-100 flex items-center space-x-2 text-xs font-semibold">
                <span className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center text-white text-[10px] font-bold">Ex</span>
                <span>Generative Expand</span>
              </div>
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                  alt="Generative Expand"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white text-xs text-zinc-600">
                Expand images beyond their boundaries effortlessly.
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="p-3 border-b border-zinc-100 flex items-center space-x-2 text-xs font-semibold">
                <span className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">Cc</span>
                <span>Generative Recolor</span>
              </div>
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                  alt="Generative Recolor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white text-xs text-zinc-600">
                Recolor vector artwork using text prompt styles.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: EXPLORE WHAT'S NEW */}
      <section className="py-20 bg-zinc-50 text-zinc-900 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">FEATURED HIGHLIGHTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 mb-2">Explore what&apos;s new.</h2>
            <p className="text-zinc-600 text-sm">Discover the latest generative AI innovations.</p>
          </div>

          {/* Featured Large Card */}
          <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-amber-200 rounded-2xl p-8 sm:p-12 text-white mb-8 shadow-xl relative overflow-hidden">
            <div className="max-w-xl z-10 relative">
              <div className="bg-black/30 backdrop-blur-md inline-block px-4 py-2 rounded-full text-xs mb-6 font-medium border border-white/20">
                ✨ What if you could generate an entire campaign?
              </div>
              <div className="flex space-x-4 mb-6">
                <div className="bg-slate-900/80 px-4 py-2 rounded-lg text-xs border border-white/10">
                  <span className="text-zinc-400 block">Socials</span>
                  <span className="text-base font-bold">2.1K mentions</span>
                </div>
                <div className="bg-slate-900/80 px-4 py-2 rounded-lg text-xs border border-white/10">
                  <span className="text-zinc-400 block">Performance</span>
                  <span className="text-base font-bold">1.2K mentions</span>
                </div>
              </div>
              <h3 className="text-3xl font-extrabold italic tracking-tight mb-4">PARADISE awaits</h3>
              <a href="#" className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-5 py-2 rounded-full transition-all">
                Try in Firefly →
              </a>
            </div>
          </div>

          {/* 3 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                alt="Change standard into standout"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold text-sm mb-1">Change standard into standout.</h4>
              <p className="text-xs text-zinc-600 mb-3">Edit photos faster with AI capabilities in Photoshop.</p>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Learn more &gt;</a>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <img
                src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80"
                alt="Generative Color Matches"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold text-sm mb-1">Generative Color Matches.</h4>
              <p className="text-xs text-zinc-600 mb-3">Edit vector artwork with text prompts in Illustrator.</p>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Learn more &gt;</a>
            </div>

            <div className="bg-zinc-900 text-white p-4 rounded-xl border border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="bg-zinc-800 p-4 rounded-lg mb-4 text-center border border-zinc-700">
                  <div className="h-16 bg-gradient-to-r from-red-500 via-purple-500 to-amber-400 rounded mb-2"></div>
                  <span className="text-[10px] text-zinc-400">Generate on-brand copy</span>
                </div>
                <h4 className="font-bold text-sm mb-1">Produce written content with AI.</h4>
                <p className="text-xs text-zinc-400 mb-3">Generate copy, flyers, and marketing materials in Express.</p>
              </div>
              <a href="#" className="text-xs font-semibold text-blue-400 hover:underline">Learn more &gt;</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL BANNER CAROUSEL */}
      <section className="bg-zinc-950 text-white py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-sm">
            ‹
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-sm">
            ›
          </button>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-6 leading-snug">
            &ldquo;Creative Cloud lets me create effortlessly and allows me to focus on what&apos;s important.&rdquo;
          </blockquote>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-6">
            ADOBE CREATIVE CLOUD USER
          </p>
          <a
            href="#"
            className="inline-block bg-white text-black font-semibold text-xs px-5 py-2 rounded-full hover:bg-zinc-200 transition-all"
          >
            See story
          </a>
        </div>
      </section>

      {/* 5. SECTION: TOOLS THAT WORK FOR YOU */}
      <section className="bg-[#0a0a0c] text-white py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2">Tools that work for you.</h2>
            <p className="text-xs text-zinc-400 mb-6">Find top apps for students, creative pros, business, and more.</p>
            <div className="inline-flex border border-zinc-700 rounded-full p-1 bg-zinc-900">
              <button className="bg-zinc-800 text-white text-xs px-4 py-1.5 rounded-full font-medium">View all apps</button>
            </div>
          </div>

          {/* Desktop Workspace Graphic */}
          <div className="rounded-2xl overflow-hidden border border-zinc-800 mb-12 shadow-2xl max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80"
              alt="Adobe Apps Showcase"
              className="w-full h-[360px] object-cover"
            />
          </div>

          {/* 3x3 App Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-blue-900 text-sky-400 rounded font-black flex items-center justify-center text-xs mb-4">
                Ps
              </div>
              <h3 className="font-bold text-base mb-1">Photoshop</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Create beautiful graphics, photos, and art on desktop and iPad.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-red-900 text-red-400 rounded font-black flex items-center justify-center text-xs mb-4">
                Ac
              </div>
              <h3 className="font-bold text-base mb-1">Acrobat Acrobat</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The complete PDF solution for working with documents anywhere.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-blue-950 text-blue-400 rounded font-black flex items-center justify-center text-xs mb-4">
                Ai
              </div>
              <h3 className="font-bold text-base mb-1">Illustrator</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Create precise vector graphics and illustrations.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-purple-950 text-purple-400 rounded font-black flex items-center justify-center text-xs mb-4">
                Pr
              </div>
              <h3 className="font-bold text-base mb-1">Premiere Pro</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Industry-standard professional video and film editing.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 text-white rounded font-black flex items-center justify-center text-xs mb-4">
                Cc
              </div>
              <h3 className="font-bold text-base mb-1">Creative Cloud</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                20+ apps for design, photography, video, PDF, and web.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-red-950 text-pink-500 rounded font-black flex items-center justify-center text-xs mb-4">
                Id
              </div>
              <h3 className="font-bold text-base mb-1">InDesign</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Page design and layout for print and digital media.
              </p>
            </div>

            {/* Card 7 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-zinc-800 text-red-500 rounded font-black flex items-center justify-center text-xs mb-4">
                🏢
              </div>
              <h3 className="font-bold text-base mb-1">Business Products</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tailored creative and document solutions for enterprise teams.
              </p>
            </div>

            {/* Card 8 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
              <div className="w-8 h-8 bg-zinc-800 text-orange-400 rounded font-black flex items-center justify-center text-xs mb-4">
                🎓
              </div>
              <h3 className="font-bold text-base mb-1">Students</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Save big with student discounts on Creative Cloud apps.
              </p>
            </div>

            {/* Card 9 */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 bg-zinc-800 text-zinc-300 rounded font-black flex items-center justify-center text-xs mb-4">
                  ✓
                </div>
                <h3 className="font-bold text-base mb-1">All products</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Explore all Adobe apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
