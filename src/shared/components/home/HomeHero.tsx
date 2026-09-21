"use client";

import Link from "next/link";
import { Search, Upload, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import HomeClient from "@/shared/components/home/homeClient";
import { Resource } from "@/shared/data/resources";

interface HomeHeroProps {
  resources: Resource[];
}

export default function HomeHero({ resources }: HomeHeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-col items-center justify-center pt-10 sm:pt-14 md:pt-16 pb-10 md:pb-12 text-center max-w-[1020px] mx-auto relative"
    >
      {/* Background Radial Glow Mesh Effect */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Eyebrow Label */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2.5 rounded-full bg-[#0F121E] border border-white/10 px-4 py-1.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-indigo-400 mb-4 sm:mb-5 shadow-xl shadow-indigo-950/20"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <Sparkles className="h-3 w-3 text-indigo-400" />
        Academic Resource Platform
      </motion.div>

      {/* Hero Headline */}
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.02] mb-5 sm:mb-6"
      >
        Everything you need <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
          to study better.
        </span>
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-[760px] text-lg sm:text-2xl text-slate-400 leading-relaxed mx-auto mb-6 sm:mb-8 font-normal"
      >
        Discover verified Notes, PYQs, Lab Manuals, and Study Material — organized by program and curated by top engineering & degree students.
      </motion.p>

      {/* Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-8 md:mb-10"
      >
        <Link
          href="/resources"
          className="flex h-14 items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold tracking-wider uppercase text-xs rounded-full px-8 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-indigo-500/25 border border-indigo-400/30"
        >
          <Search className="h-4 w-4" />
          Explore Resources
        </Link>
        <Link
          href="/upload"
          className="flex h-14 items-center justify-center gap-2.5 border border-white/10 bg-[#0F121E] hover:bg-[#161A29] text-white font-extrabold tracking-wider uppercase text-xs rounded-full px-8 transition-all duration-300 hover:scale-[1.02] shadow-lg"
        >
          <Upload className="h-4 w-4 text-indigo-400" />
          Upload Resource
        </Link>
      </motion.div>

      {/* Large Pill Search Bar */}
      <HomeClient resources={resources} />
    </section>
  );
}

