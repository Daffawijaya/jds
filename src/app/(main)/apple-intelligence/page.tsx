"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   Apple Intelligence — Full-Page Reimplementation
   Stack: Next.js App Router + Tailwind + Framer Motion
   ═══════════════════════════════════════════════════════════════════ */

// ─── Data ──────────────────────────────────────────────────────────
const features = [
  {
    id: "siri-ai",
    label: "Siri AI",
    title: "New Siri AI.",
    subtitle: "An even more capable AI assistant",
    description:
      "Type or talk naturally with Siri AI to find what you need and get more done.",
    color: "from-violet-500 to-indigo-500",
    accent: "#7c3aed",
    icon: "🤖",
  },
  {
    id: "apple-intelligence-apps",
    label: "Apple Intelligence in apps",
    title: "Next-generation Apple Intelligence",
    subtitle: "enhances the apps you use most",
    description:
      "Like Photos, Messages, and Safari.",
    color: "from-blue-500 to-cyan-400",
    accent: "#2563eb",
    icon: "📱",
  },
  {
    id: "visual-intelligence",
    label: "Visual Intelligence",
    title: "Search and take action",
    subtitle: "with Visual Intelligence",
    description:
      "Now on even more devices — iPad, Mac, and Apple Vision Pro.",
    color: "from-emerald-500 to-teal-500",
    accent: "#10b981",
    icon: "👁️",
  },
  {
    id: "photo-editing",
    label: "Photo editing",
    title: "Transform your photos",
    subtitle: "with easy-to-use AI editing tools",
    description:
      "Like Spatial Reframing, Extend, and Clean Up.",
    color: "from-orange-500 to-rose-500",
    accent: "#f97316",
    icon: "📷",
  },
  {
    id: "write-with-siri",
    label: "Write with Siri",
    title: "Write with Siri",
    subtitle: "virtually anywhere you type",
    description:
      "Compose, edit, and send messages.",
    color: "from-pink-500 to-purple-500",
    accent: "#ec4899",
    icon: "✍️",
  },
];

const siriCapabilities = [
  {
    title: "Siri understands your personal context.",
    description:
      "Siri AI can find relevant answers to what you're looking for just by asking. Search for a photo from years ago, easily locate an email buried in your inbox, or pull up the details from a note you saved.",
    icon: "🔍",
  },
  {
    title: "Take action in more apps.",
    description:
      "Siri AI can take actions in apps like Messages, Music, Reminders, and more based on what you're doing in the moment.",
    icon: "⚡",
  },
  {
    title: "Tap into broad world knowledge.",
    description:
      "Ask about virtually any topic that's on your mind, from important facts to recipes and travel recommendations.",
    icon: "🌐",
  },
];

const visualIntelligenceFeatures = [
  {
    title: "Ask Siri about what's in front of you.",
    description:
      "Get information, take action, and search visually using the content on your screen.",
  },
  {
    title: "Visual Intelligence with Siri on Mac.",
    description:
      "Take a screenshot of what's on your display, like an image or a PDF, and Visual Intelligence lets you search and take action.",
  },
  {
    title: "Visual Intelligence with Siri on iPad.",
    description:
      "Ask Siri AI about virtually anything on your display with a screenshot. Just tap the item with your finger or circle it with Apple Pencil.",
  },
];

const privacyFeatures = [
  {
    title: "Private Cloud Compute",
    description:
      "Apple Intelligence can draw on larger server-based models, running on Apple silicon, to handle more complex requests for you while protecting your privacy.",
    items: ["Your data is never stored", "Used only for your requests", "Verifiable privacy promise"],
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}

// ─── Components ────────────────────────────────────────────────────

function StickyNav() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-feature]");
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        const el = section as HTMLElement;
        if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Apple Logo */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-900" viewBox="0 0 17 21" fill="currentColor">
              <path d="M13.34 3.58c.77-.96 1.3-2.28 1.16-3.58-1.12.04-2.5.75-3.3 1.7-.72.84-1.36 2.2-1.19 3.47 1.26.1 2.54-.64 3.33-1.59zM14.5 5.02c-1.68-.1-3.13.95-3.94.95-.82 0-2.06-.88-3.4-.86-1.74.02-3.34 1.01-4.23 2.57-1.82 3.14-.47 7.79 1.3 10.35.89 1.25 1.95 2.65 3.34 2.6 1.34-.05 1.85-.87 3.49-.87 1.63 0 2.1.87 3.53.84 1.46-.02 2.38-1.27 3.26-2.53.63-.91 1.18-1.85 1.56-2.84-4.08-1.56-4.82-7.42-.81-9.74-.66-.84-1.62-1.32-2.6-1.32z" />
            </svg>
            <span className="text-gray-900 text-sm font-medium">Apple Intelligence</span>
          </div>

          {/* Feature pills */}
          <div className="hidden md:flex items-center gap-1">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => {
                  document.querySelector(`[data-feature="${feature.id}"]`)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeSection === index
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {feature.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[120px]" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-500 text-sm sm:text-base mb-6"
        >
          Introducing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-tight"
        >
          Apple Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium"
        >
          and Siri.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-gray-500 text-sm sm:text-base"
        >
          Truly helpful. Truly yours.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-2 text-gray-400 text-xs sm:text-sm"
        >
          New Apple Intelligence features coming this fall.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      data-feature={feature.id}
      className="relative min-h-screen flex items-center bg-white py-20"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Content */}
          <div className="flex-1 space-y-6">
            <motion.span
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200"
            >
              {feature.label}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              {feature.title}
              <span className="block text-gray-500">{feature.subtitle}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 max-w-lg"
            >
              {feature.description}
            </motion.p>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 max-w-lg"
          >
            <div
              className={`relative aspect-square rounded-3xl bg-gradient-to-br ${feature.color} p-1`}
            >
              <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="text-6xl">{feature.icon || "✨"}</div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SiriSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-6">
            Just ask Siri.
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Powered by Apple Intelligence,
            <br />
            <span className="text-gray-500">Siri AI is your conversational AI assistant</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            Ask open-ended questions, brainstorm ideas for work or creative projects, and engage in
            natural, back-and-forth conversations.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siriCapabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="bg-white backdrop-blur-sm border border-gray-200 rounded-3xl p-8"
            >
              <div className="text-4xl mb-4">{cap.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{cap.title}</h3>
              <p className="text-gray-500 leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Siri App section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Introducing the Siri app.
          </div>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            A dedicated app brings together all your conversations in one place, so you can ask a
            question on your iPhone and pick up where you left off on your iPad.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function VisualIntelligenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section ref={ref} className="relative min-h-screen bg-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            Visual Intelligence
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Ask Siri about
            <br />
            what&apos;s in front of you.
          </h2>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            Get information, take action, and search visually using the content on your screen.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visualIntelligenceFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Device showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {["iPad", "Mac", "Apple Vision Pro", "iPhone"].map((device) => (
            <div
              key={device}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center"
            >
              <div className="text-2xl mb-2">
                {device === "iPad" && "📱"}
                {device === "Mac" && "💻"}
                {device === "Apple Vision Pro" && "🥽"}
                {device === "iPhone" && "📱"}
              </div>
              <p className="text-gray-700 text-sm font-medium">{device}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PhotoEditingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            Photo editing
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Next-level intelligent
            <br />
            photo editing.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Reframe your photo even after it's taken.",
              description:
                "Move the viewpoint, adjust the angle, or zoom in as if you were repositioning the camera in the moment with Spatial Reframing.",
              icon: "📷",
            },
            {
              title: "Express more with Image Playground.",
              description:
                "Create unique, high-quality images in just about any style, including photorealistic.",
              icon: "🎨",
            },
            {
              title: "Image Wand.",
              description:
                "Transform rough sketches into images in virtually any style right in Notes.",
              icon: "🪄",
            },
            {
              title: "Clean Up tool.",
              description:
                "Remove even larger objects with the enhanced Clean Up tool.",
              icon: "✨",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white border border-gray-200 rounded-3xl p-8"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WritingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen bg-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
            Available now
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Write with Siri
            <br />
            <span className="text-gray-500">virtually anywhere you type.</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            Siri AI can now generate a draft from scratch or provide feedback on what you&apos;ve
            written. Just describe what you need in your own words.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Get things done with Suggestions.",
              description:
                "Messages and Mail offer suggestions to help you take quick actions based on context from your conversation.",
              tag: "New",
            },
            {
              title: "Proofread as you type.",
              description:
                "Apple Intelligence automatically checks your grammar and spelling and offers suggestions virtually anywhere you type.",
              tag: "Coming in English",
            },
            {
              title: "Get relevant information while on a call.",
              description:
                "Call Context can proactively surface relevant information from across apps when you're calling a business.",
              tag: "Coming in English",
            },
            {
              title: "Communicate across languages.",
              description:
                "Turn on Live Translation to automatically translate texts in Messages, display live translated captions in FaceTime.",
              tag: "Available now",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-3xl p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-xs">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            Privacy
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Great powers come with
            <br />
            great privacy.
          </h2>
          <p className="mt-6 text-lg text-gray-500 max-w-3xl mx-auto">
            Apple Intelligence is designed to protect your privacy at every step. It&apos;s integrated
            into the core of your iPhone, iPad, and Mac through on-device processing.
          </p>
        </motion.div>

        {privacyFeatures.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {feature.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <svg
                    className="w-5 h-5 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DevicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const devices = [
    { name: "iPhone 17 Pro", chip: "A19 Pro", tag: "New" },
    { name: "iPhone Air", chip: "A19 Pro", tag: "New" },
    { name: "iPhone 17", chip: "A19", tag: "" },
    { name: "iPad Pro", chip: "M4", tag: "" },
    { name: "MacBook Air", chip: "M5", tag: "" },
    { name: "MacBook Pro", chip: "M5", tag: "" },
  ];

  return (
    <section ref={ref} className="relative bg-white py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Apple Intelligence is compatible with these devices.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {devices.map((device, index) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {device.tag && (
                <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs mb-3">
                  {device.tag}
                </span>
              )}
              <div className="text-3xl mb-3">📱</div>
              <p className="text-gray-900 font-medium text-sm">{device.name}</p>
              <p className="text-gray-500 text-xs mt-1">{device.chip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 17 21" fill="currentColor">
            <path d="M13.34 3.58c.77-.96 1.3-2.28 1.16-3.58-1.12.04-2.5.75-3.3 1.7-.72.84-1.36 2.2-1.19 3.47 1.26.1 2.54-.64 3.33-1.59zM14.5 5.02c-1.68-.1-3.13.95-3.94.95-.82 0-2.06-.88-3.4-.86-1.74.02-3.34 1.01-4.23 2.57-1.82 3.14-.47 7.79 1.3 10.35.89 1.25 1.95 2.65 3.34 2.6 1.34-.05 1.85-.87 3.49-.87 1.63 0 2.1.87 3.53.84 1.46-.02 2.38-1.27 3.26-2.53.63-.91 1.18-1.85 1.56-2.84-4.08-1.56-4.82-7.42-.81-9.74-.66-.84-1.62-1.32-2.6-1.32z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">
          This is a demonstration project. Not affiliated with Apple Inc.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Built with Next.js, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────

export default function AppleIntelligencePage() {
  return (
    <div className="bg-white min-h-screen">
      <StickyNav />
      <HeroSection />

      {features.map((feature, index) => (
        <FeatureSection key={feature.id} feature={feature} index={index} />
      ))}

      <SiriSection />
      <VisualIntelligenceSection />
      <PhotoEditingSection />
      <WritingSection />
      <PrivacySection />
      <DevicesSection />
      <Footer />
    </div>
  );
}
