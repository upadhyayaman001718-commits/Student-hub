"use client";

import Link from "next/link";
import { Search, Upload, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import HomeClient from "@/shared/components/home/homeClient";
import Container from "@/shared/components/layout/Container";
import { Resource } from "@/shared/data/resources";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

interface HomeHeroProps {
  resources: Resource[];
}

export default function HomeHero({ resources }: HomeHeroProps) {
  return (
    /* Full viewport-width section — background bleeds edge to edge */
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden
                 pt-24 sm:pt-28 md:pt-32 lg:pt-36
                 pb-20 sm:pb-24 md:pb-28"
    >
      {/* 3D scene — positioned absolute inside section, not inside Container */}
      <HeroScene />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.10) 45%, transparent 75%)",
        }}
      />

      {/* All text content perfectly centered via Container */}
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-7
                       rounded-full bg-[#0C0F1C]/90 border border-white/[0.08]
                       px-4 py-1.5 shadow-lg shadow-indigo-950/30"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 dot-pulse" />
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span className="label-mono text-indigo-400">Academic Resource Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                       font-extrabold tracking-tight leading-[1.02] text-white mb-6"
          >
            Everything you need{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient-vivid">to study better.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-base sm:text-lg text-slate-400
                       leading-relaxed mb-10 font-normal max-w-xl mx-auto"
          >
            Discover verified Notes, PYQs, Lab Manuals, and Study Material —
            organised by programme and curated by the student community.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 h-12 px-8
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
              className="inline-flex items-center gap-2 h-12 px-8
                         glass border border-white/[0.08] text-white font-bold text-sm rounded-full
                         hover:bg-[#161B2E] transition-all duration-200 hover:scale-[1.02]"
            >
              <Upload className="h-4 w-4 text-indigo-400" />
              Upload Resource
            </Link>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full"
          >
            <HomeClient resources={resources} />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
