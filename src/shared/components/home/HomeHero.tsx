"use client";

import Link from "next/link";
import { Search, Upload } from "lucide-react";
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
      className="flex flex-col items-center justify-center pt-16 sm:pt-24 pb-20 text-center max-w-[1020px] mx-auto relative"
    >
      {/* Eyebrow Label */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2.5 rounded-full bg-white border border-[#E2E0DB] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#0A0A0A] mb-8 shadow-2xs"
      >
        <span className="h-2 w-2 rounded-full bg-[#B15F2C] animate-pulse" />
        Academic Resource Platform
      </motion.div>

      {/* Hero Headline */}
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-[#0A0A0A] leading-[1.02] mb-8"
      >
        Everything you need <br />
        <span className="text-[#B15F2C]">to study better.</span>
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-[760px] text-lg sm:text-2xl text-[#666666] leading-relaxed mx-auto mb-12 font-normal"
      >
        Discover verified Notes, PYQs, Lab Manuals, and Study Material — organized by program and curated by top engineering & degree students.
      </motion.p>

      {/* Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-14"
      >
        <Link
          href="/resources"
          className="flex h-14 items-center justify-center gap-2.5 bg-[#B15F2C] hover:bg-[#9E5324] text-white font-extrabold tracking-wide uppercase text-xs rounded-full px-8 transition-all duration-300 hover:scale-[1.02] shadow-md"
        >
          <Search className="h-4 w-4" />
          Explore Resources
        </Link>
        <Link
          href="/upload"
          className="flex h-14 items-center justify-center gap-2.5 border border-[#E2E0DB] bg-white hover:bg-[#F1F0EE] text-[#0A0A0A] font-extrabold tracking-wide uppercase text-xs rounded-full px-8 transition-all duration-300 hover:scale-[1.02] shadow-2xs"
        >
          <Upload className="h-4 w-4 text-[#B15F2C]" />
          Upload Resource
        </Link>
      </motion.div>

      {/* Large Pill Search Bar */}
      <HomeClient resources={resources} />
    </section>
  );
}
