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
            Adobe
          </div>
          <div className="hidden lg:flex space-x-6 font-semibold text-gray-700">
            <a href="#" className="hover:text-black">
              Creativity & Design <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="hover:text-black">
              PDF & E-signatures <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="hover:text-black">
              Marketing & Commerce <span className="text-[10px]">▼</span>
            </a>
            <a href="#" className="hover:text-black">
              Help & Support <span className="text-[10px]">▼</span>
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
            Buy now
          </a>
          <a href="#" className="hover:text-black">
            Sign In
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION & FEATURES GRID */}
      <section className="bg-black text-white relative">
        {/* Top Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-orange-500 to-purple-600"></div>

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
            New in Adobe Creative Cloud
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Ideate, create, and produce faster than
            <br />
            ever.
          </h1>
          <p className="text-gray-300 max-w-3xl mb-8 text-sm md:text-base">
            Creative Cloud offers top apps with AI models built right in. Create
            everywhere from photos to video, to 3D.{" "}
            <span className="underline cursor-pointer hover:text-white">
              See the latest features.
            </span>{" "}
            (Limit one)
          </p>

          <div className="flex space-x-4 mb-20">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
              Free trial
            </button>
            <button className="border border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-6 rounded-full transition-colors">
              View plans
            </button>
          </div>

          {/* Grid Cards (Overlapping slightly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
            {/* Card 1 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
                alt="Firefly"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-red-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    Fi
                  </span>
                  <span>Adobe Firefly</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Generate with top AI models in one place.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Get started
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    New features ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop"
                alt="Photoshop"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-blue-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    Ps
                  </span>
                  <span>Photoshop</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  New partner AI models in Generative Fill.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Free trial
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    New features ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop"
                alt="Lightroom"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-blue-300 rounded-sm text-blue-900 flex items-center justify-center text-[8px]">
                    Lr
                  </span>
                  <span>Lightroom</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Fast track how you mask.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Free trial
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    New features ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop"
                alt="Express"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-purple-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    Ex
                  </span>
                  <span>Adobe Express</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Prompt. Edit. Whoa. New AI Assistant.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Get started
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    New features ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop"
                alt="Illustrator"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-orange-500 rounded-sm text-white flex items-center justify-center text-[8px]">
                    Ai
                  </span>
                  <span>Illustrator</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Effortlessly manage your fonts.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Free trial
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    New features ›
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white text-black rounded-xl overflow-hidden flex flex-col shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=600&auto=format&fit=crop"
                alt="Bridge"
                className="h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 mb-2">
                  <span className="w-4 h-4 bg-gray-800 rounded-sm text-white flex items-center justify-center text-[8px]">
                    Br
                  </span>
                  <span>Bridge</span>
                </div>
                <h3 className="text-xl font-bold mb-6 flex-grow">
                  Select your best photos faster.
                </h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full">
                    Free trial
                  </button>
                  <button className="text-black text-sm font-semibold hover:underline">
                    New features ›
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
            alt="Firefly Boards"
            className="rounded-xl shadow-xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 mb-4">
            <span className="w-5 h-5 bg-red-500 rounded-sm text-white flex items-center justify-center text-[10px]">
              Fi
            </span>
            <span>Firefly</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Jump-start your creative ideas with Firefly Boards.
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Visual to brainstorm with Firefly Boards, the generative AI first
            approach to visual ideation. Craft and curate your mood boards
            exactly how you envision them.
          </p>
          <button className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors">
            New features
          </button>
        </div>
      </section>

      {/* 4. HIGHLIGHT 2: PREMIERE PRO */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row-reverse items-center gap-16">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1516280440502-861f6966699b?q=80&w=800&auto=format&fit=crop"
            alt="Premiere Pro"
            className="rounded-xl shadow-xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 mb-4">
            <span className="w-5 h-5 bg-indigo-900 rounded-sm text-purple-300 flex items-center justify-center text-[10px]">
              Pr
            </span>
            <span>Premiere Pro</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            The next big thing for YouTube Shorts. Now in Premiere on iPhone.
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Top creators use traditional space to jump start your creativity.
            Try the new AI editor with easy-to-use tools inside Premiere.
          </p>
          <button className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors">
            New features
          </button>
        </div>
      </section>

      {/* 5. INSPIRATION SECTION */}
      <section className="bg-[#f8f8f8] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Soak up some inspiration.</h2>
          <p className="text-gray-600 text-sm">
            Discover new ideas and learn how to use the latest features with
            easy-to-follow tutorials.
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
                News | Photoshop
              </p>
              <h3 className="text-lg font-bold hover:underline cursor-pointer">
                New partner Generative Fill. Now in Photoshop.
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
                How To | Illustrator
              </p>
              <h3 className="text-lg font-bold hover:underline cursor-pointer">
                Creation at the speed of you.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHICH APP IS BEST */}
      <section className="bg-[#f8f8f8] py-12 px-6 text-center border-b border-gray-200">
        <h3 className="text-xl font-bold mb-2">
          Not sure which apps are best for you?
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Take a minute. We'll help you figure it out.
        </p>
        <button className="border border-gray-300 hover:border-gray-800 text-black text-sm font-semibold py-2 px-6 rounded-full transition-colors">
          Get started
        </button>
      </section>

      {/* 7. CREATIVITY FOR ALL */}
      <section className="bg-white py-20 px-6 text-center">
        {/* Abstract Logo Placeholder */}
        <div className="w-12 h-12 mx-auto mb-6 bg-gradient-to-tr from-yellow-400 via-red-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          CC
        </div>
        <h2 className="text-2xl font-bold mb-4">Creativity for all</h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
          Photography, video, graphic design, illustration, and so much more.
          Everything you need, wherever your imagination takes you.
        </p>
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          View plans and pricing
        </a>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#fafafa] border-t border-gray-200 pt-1 text-sm text-gray-600">
        {/* Footer Top Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 mb-12"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-black mb-4">Shop for</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Creative Cloud
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Photoshop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Adobe Express
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Premiere Pro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Illustrator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Acrobat Pro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Adobe Firefly
                </a>
              </li>
            </ul>
          </div>
          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-black mb-4">For business</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Creative Cloud for business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Acrobat for business
                </a>
              </li>
              <h4 className="font-bold text-black mt-6 mb-4">For education</h4>
              <li>
                <a href="#" className="hover:text-black">
                  Students & teachers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Schools & universities
                </a>
              </li>
            </ul>
          </div>
          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-black mb-4">For professionals</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Photographers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Designers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Video editors
                </a>
              </li>
            </ul>
          </div>
          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-black mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Download & install
                </a>
              </li>
            </ul>
          </div>
          {/* Col 5 */}
          <div>
            <h4 className="font-bold text-black mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Adobe Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Adobe Developer
                </a>
              </li>
            </ul>
          </div>
          {/* Col 6 */}
          <div>
            <h4 className="font-bold text-black mb-4">Adobe Account</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  Log in to your account
                </a>
              </li>
            </ul>
            <h4 className="font-bold text-black mt-6 mb-4">Adobe</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Newsroom
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="border-t border-gray-200 py-6 px-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="font-semibold text-black cursor-pointer">
              English (United States)
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
              Copyright © 2026 Adobe. All rights reserved.
            </a>
            <a href="#" className="hover:text-black">
              Privacy
            </a>
            <a href="#" className="hover:text-black">
              Terms of Use
            </a>
            <a href="#" className="hover:text-black">
              Cookie preferences
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
