"use client";

import Link from "next/link";
import { Search, Upload, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import HomeClient from "@/shared/components/home/homeClient";
import { Resource } from "@/shared/data/resources";

// Lazy-load the 3D scene so it never blocks SSR
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

interface HomeHeroProps {
  resources: Resource[];
}

export default function HomeHero({ resources }: HomeHeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex flex-col items-center justify-center
                 pt-16 sm:pt-20 md:pt-24
                 pb-12 sm:pb-16 md:pb-20
                 text-center overflow-visible"
    >
      {/* ── 3D Floating Scene (behind text) ── */}
      <HeroScene />

      {/* ── Radial glow behind headline ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[700px] h-[400px] pointer-events-none
                   bg-gradient-radial from-indigo-600/20 via-purple-600/10 to-transparent
                   blur-3xl rounded-full -z-10"
      />

      {/* ── Eyebrow chip ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 inline-flex items-center gap-2 mb-6
                   rounded-full bg-[#0C0F1C] border border-white/8
                   px-4 py-1.5 shadow-lg shadow-indigo-950/30"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 dot-pulse" />
        <Sparkles className="h-3 w-3 text-indigo-400" />
        <span className="label-mono text-indigo-400">Academic Resource Platform</span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                   font-extrabold tracking-tight leading-[1.02]
                   text-white max-w-4xl mx-auto mb-5"
      >
        Everything you need{" "}
        <br className="hidden sm:block" />
        <span className="text-gradient-vivid">to study better.</span>
      </motion.h1>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl text-base sm:text-lg text-slate-400
                   leading-relaxed mx-auto mb-8 font-normal px-4"
      >
        Discover verified Notes, PYQs, Lab Manuals, and Study Material —
        organised by programme and curated by the student community.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-10"
      >
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 h-12 px-7
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
                     hover:opacity-90 text-white font-bold text-sm rounded-full
                     shadow-lg shadow-indigo-500/25 border border-indigo-400/20
                     transition-all duration-200 hover:scale-[1.02]"
        >
          <Search className="h-4 w-4" />
          Explore Resources
        </Link>
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 h-12 px-7
                     glass text-white font-bold text-sm rounded-full
                     hover:bg-[#161B2E] transition-all duration-200 hover:scale-[1.02]"
        >
          <Upload className="h-4 w-4 text-indigo-400" />
          Upload Resource
        </Link>
      </motion.div>

      {/* ── Search bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl px-4"
      >
        <HomeClient resources={resources} />
      </motion.div>
    </section>
  );
}
