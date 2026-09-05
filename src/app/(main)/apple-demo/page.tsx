import React from "react";
import Head from "next/head";

export default function AdobePremiereClone() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Head>
        <title>Explore Adobe Premiere features</title>
      </Head>

      {/* 1. HERO SECTION */}
      <section className="text-center py-16 px-4">
        <div className="flex justify-center mb-4">
          <img
            src="https://placehold.co/50x50/4B0082/FFFFFF?text=Pr"
            alt="Premiere Pro Logo"
            className="rounded-md"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Adobe Premiere features.
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Learn all about the tools and techniques you can use to edit videos,
          add effects, sync audio, and more.
        </p>
        <button className="bg-[#1473E6] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg mb-8">
          Try Premiere free
        </button>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
          <a href="#" className="text-black border-b-2 border-black pb-1">
            What's new
          </a>
          <a href="#" className="hover:text-black">
            Edit video
          </a>
          <a href="#" className="hover:text-black">
            Effects
          </a>
          <a href="#" className="hover:text-black">
            Titles
          </a>
          <a href="#" className="hover:text-black">
            Audio
          </a>
          <a href="#" className="hover:text-black">
            Exporting
          </a>
        </nav>
      </section>

      {/* 3. FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-center text-xl font-semibold mb-2">
          Improve your workflow and bring your videos to life faster with
          powerful,
        </h2>
        <a href="#" className="block text-center text-blue-600 underline mb-12">
          time-saving tools and features.
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div>
            <img
              src="https://placehold.co/400x225"
              alt="Color Match"
              className="rounded-xl mb-4 w-full object-cover aspect-video"
            />
            <h3 className="font-bold mb-2">
              Color Match — a new wonder in color.
            </h3>
            <p className="text-sm text-gray-600">
              Easily match colors across clips using AI. Instantly match
              lighting, skin tones, and adjust contrast.{" "}
              <a href="#" className="text-blue-600 underline">
                Learn more
              </a>
            </p>
          </div>
          {/* Card 2 */}
          <div>
            <img
              src="https://placehold.co/400x225"
              alt="Auto Ducking"
              className="rounded-xl mb-4 w-full object-cover aspect-video"
            />
            <h3 className="font-bold mb-2">
              The music loves your voice with AI.
            </h3>
            <p className="text-sm text-gray-600">
              Auto Ducking automatically lowers the volume of your music track
              when someone speaks, so dialog is always heard clearly.
            </p>
          </div>
          {/* Card 3 */}
          <div>
            <img
              src="https://placehold.co/400x225"
              alt="Speech to Text"
              className="rounded-xl mb-4 w-full object-cover aspect-video"
            />
            <h3 className="font-bold mb-2">Any language. All the control.</h3>
            <p className="text-sm text-gray-600">
              Automatically generate transcripts in over 18 languages, add
              captions to your sequence, and easily format them.
            </p>
          </div>
          {/* Card 4 */}
          <div>
            <img
              src="https://placehold.co/400x225"
              alt="Text-based editing"
              className="rounded-xl mb-4 w-full object-cover aspect-video"
            />
            <h3 className="font-bold mb-2">
              Text-Based Editing sets the standard.
            </h3>
            <p className="text-sm text-gray-600">
              Edit video by editing text. Skim the transcript, search for
              keywords, and cut clips by simply deleting words.
            </p>
          </div>
          {/* Card 5 */}
          <div>
            <img
              src="https://placehold.co/400x225"
              alt="Essential Graphics"
              className="rounded-xl mb-4 w-full object-cover aspect-video"
            />
            <h3 className="font-bold mb-2">
              Build title layouts instinctively in Premiere.
            </h3>
            <p className="text-sm text-gray-600">
              Use intuitive, responsive tools to create titles and graphics.
              Save your designs as templates to reuse them easily.
            </p>
          </div>
          {/* Card 6 */}
          <div>
            <img
              src="https://placehold.co/400x225"
              alt="Export"
              className="rounded-xl mb-4 w-full object-cover aspect-video"
            />
            <h3 className="font-bold mb-2">Export your video to anywhere.</h3>
            <p className="text-sm text-gray-600">
              Easily export your project with presets optimized for YouTube,
              TikTok, Instagram, and more directly from Premiere.
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="#" className="text-blue-600 underline font-medium">
            Go to Adobe Premiere user guide
          </a>
        </div>
      </section>

      {/* 4. YOUTUBE SECTION (Dark) */}
      <section className="bg-[#191919] text-white py-16 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <img
              src="https://placehold.co/600x400/333/FFF?text=YouTube+Creators+Collage"
              alt="YouTube Creators"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Now available: From Adobe and YouTube, a dedicated space and
              exclusive content to create YouTube Shorts — right inside Premiere
              on iPhone.
            </h2>
            <a
              href="#"
              className="text-white underline font-medium hover:text-gray-300"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* 5. USE CASES GRID */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            What can you create in Premiere?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Find out how tools and features inside Premiere have the power to
            transform ordinary videos into extraordinary creations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loop for 9 cards */}
            {[
              {
                title: "Give a filmic look to raw footage",
                tag: "COLOR GRADING",
              },
              {
                title: "Add stunning visual effects to your video",
                tag: "VISUAL EFFECTS",
              },
              { title: "Create a promotional video", tag: "PROMO VIDEO" },
              {
                title: "Create drop-dead title sequences",
                tag: "TITLE SEQUENCES",
              },
              {
                title: "Compose your video in the proper resolution",
                tag: "RESOLUTION",
              },
              { title: "Edit a music video", tag: "MUSIC VIDEO" },
              {
                title: "Make a multi-camera video presentation pop",
                tag: "MULTI-CAM EDITING",
              },
              { title: "Create an atmospheric video", tag: "ATMOSPHERE" },
              { title: "Mix an immersive soundtrack", tag: "AUDIO MIXING" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <img
                  src={`https://placehold.co/80x80?text=${i + 1}`}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 uppercase">
                    {item.tag}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION (Gradient) */}
      <section className="bg-gradient-to-b from-white via-[#E8D9FF] to-[#A855F7] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-600 mb-2">
            MEMBERSHIPS
          </p>
          <h2 className="text-4xl font-bold mb-4">Get Adobe Premiere.</h2>
          <p className="text-gray-700 mb-8">
            Start with a 7-day free trial. Or pick a plan that includes Premiere
            and the rest of Creative Cloud.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm mb-12 border">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-semibold">
              Individuals
            </button>
            <button className="text-gray-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50">
              Students & teachers
            </button>
            <button className="text-gray-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50">
              Teams
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://placehold.co/30x30/4B0082/FFFFFF?text=Pr"
                  alt="PR"
                  className="rounded"
                />
                <span className="font-bold">Premiere</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                Rp326.700/mo{" "}
                <span className="text-sm font-normal text-gray-500">
                  incl. VAT
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Premiere on desktop and iPad. Also includes Premiere Rush.
              </p>
              <div className="flex gap-4 mb-8">
                <button className="bg-[#1473E6] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 flex-1">
                  Free trial
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-50 flex-1">
                  Buy now
                </button>
              </div>
              <h4 className="font-semibold text-sm mb-4">What's included:</h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  ✓{" "}
                  <span>
                    Premiere on desktop and iPad, plus Premiere Rush for mobile
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  ✓{" "}
                  <span>
                    100GB of cloud storage, Adobe Fonts, and Adobe Portfolio
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Tutorials, free assets, and templates</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col relative border-2 border-yellow-400">
              <div className="absolute top-0 right-8 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-b-lg">
                Best value
              </div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://placehold.co/30x30/FF0000/FFFFFF?text=CC"
                  alt="CC"
                  className="rounded"
                />
                <span className="font-bold">Creative Cloud All Apps</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                Rp851.400/mo{" "}
                <span className="text-sm font-normal text-gray-500">
                  incl. VAT
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Get Premiere Pro, Photoshop, Illustrator, After Effects, and 20+
                more apps. (Substance 3D apps are not included.)
              </p>
              <div className="flex gap-4 mb-8">
                <button className="bg-[#1473E6] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 flex-1">
                  Free trial
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-50 flex-1">
                  Buy now
                </button>
              </div>
              <h4 className="font-semibold text-sm mb-4">What's included:</h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  ✓{" "}
                  <span>
                    20+ apps including Premiere Pro, After Effects, Photoshop,
                    and Illustrator
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Generative AI tools and features</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓{" "}
                  <span>
                    100GB of cloud storage, Adobe Fonts, and Adobe Portfolio
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="border border-gray-800 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 bg-white">
              Compare all plans
            </button>
          </div>
        </div>
      </section>

      {/* 7. YOU ASKED, WE ANSWERED (FAQ/Tutorials) */}
      <section className="bg-[#191919] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">You asked. We answered.</h2>
          <p className="text-gray-400 mb-12">
            Your questions, answered by the Adobe Premiere Pro community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Answer 1 */}
            <div className="bg-[#2A2A2A] rounded-xl overflow-hidden hover:opacity-90 cursor-pointer">
              <img
                src="https://placehold.co/400x200"
                alt="Photoshop Cover"
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  Remove text in Photoshop
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                  Easily disguise and seamlessly replace objects without complex
                  selections with Generative Fill. Learn multiple ways to remove
                  text in your photos in just a few clicks.
                </p>
                <button className="text-sm border border-gray-500 px-4 py-1.5 rounded-full hover:bg-gray-700">
                  Learn more
                </button>
              </div>
            </div>
            {/* Answer 2 */}
            <div className="bg-[#2A2A2A] rounded-xl overflow-hidden hover:opacity-90 cursor-pointer">
              <img
                src="https://placehold.co/400x200"
                alt="Illustrator Cover"
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  Vector EPS in Illustrator
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                  Did you know you can easily edit vectors using Adobe
                  Illustrator? Discover how to quickly open your image to
                  transform it into a stunning vector artwork.
                </p>
                <button className="text-sm border border-gray-500 px-4 py-1.5 rounded-full hover:bg-gray-700">
                  Learn more
                </button>
              </div>
            </div>
            {/* Answer 3 */}
            <div className="bg-[#2A2A2A] rounded-xl overflow-hidden hover:opacity-90 cursor-pointer">
              <img
                src="https://placehold.co/400x200"
                alt="InDesign Cover"
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  PDF documents in InDesign
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                  Learn the steps to link a PDF page into an InDesign document
                  and how to edit and manage multiple pages quickly and easily
                  for your layouts.
                </p>
                <button className="text-sm border border-gray-500 px-4 py-1.5 rounded-full hover:bg-gray-700">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PROMO BANNER (Creative Cloud) */}
      <section className="bg-gradient-to-r from-[#FFF0E6] via-[#F4E6FF] to-[#E6F0FF] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img
              src="https://placehold.co/40x40/FF0000/FFFFFF?text=CC"
              alt="CC"
              className="rounded-lg shadow-sm"
            />
            <p className="font-semibold text-gray-900">
              Premiere is included in Creative Cloud All Apps.{" "}
              <span className="font-normal text-gray-600">
                Get 20+ creative apps for a great price.
              </span>
            </p>
          </div>
          <button className="bg-[#1473E6] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold text-sm">
            See all plans
          </button>
        </div>
      </section>

      {/* 9. BETA DESKTOP APP SECTION */}
      <section className="py-20 text-center px-4">
        <h2 className="text-3xl font-bold mb-8">
          Try the Adobe Premiere (Beta) desktop app.
        </h2>
        <div className="max-w-md mx-auto text-left space-y-4 font-medium">
          <p>1. Start a free trial of Premiere.</p>
          <p>2. Open the Creative Cloud app.</p>
          <p>3. Install the Premiere (Beta).</p>
        </div>
        <button className="mt-8 text-blue-600 underline font-medium">
          Get the Beta
        </button>
      </section>

    </div>
  );
}
