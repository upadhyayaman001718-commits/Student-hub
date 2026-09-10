"use client";

import {
  BookOpen,
  FileText,
  FlaskConical,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AuthVideo() {
  const featureCards = [
    {
      icon: BookOpen,
      title: "Notes",
      desc: "Organized semester-wise",
      badgeStyle: "text-[#B15F2C] bg-[#B15F2C]/10 border-[#B15F2C]/20",
    },
    {
      icon: FileText,
      title: "PYQs",
      desc: "Previous year exam papers",
      badgeStyle: "text-white bg-white/10 border-white/20",
    },
    {
      icon: FlaskConical,
      title: "Lab Manuals",
      desc: "Practical files & records",
      badgeStyle: "text-[#B15F2C] bg-[#B15F2C]/10 border-[#B15F2C]/20",
    },
    {
      icon: GraduationCap,
      title: "Resources",
      desc: "Books, PDFs & slides",
      badgeStyle: "text-white bg-white/10 border-white/20",
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-[#0A0A0A]">
      {/* Background Video Canvas */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-[0.4]"
      >
        <source src="/videos/student-hub.mp4" type="video/mp4" />
      </video>

      {/* Multi-layered Dark Gradient Overlay for Crisp Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40 pointer-events-none" />

      {/* Floating Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14 text-white">
        {/* Top Header & Brand Logo */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B15F2C] text-white shadow-md border border-white/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                Student<span className="text-[#B15F2C]">Hub</span>
              </h1>
              <Badge variant="accent" className="text-[10px] font-bold px-2.5 py-0.5 bg-[#B15F2C] text-white border-none">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                V2.0
              </Badge>
            </div>
            <p className="text-[10px] font-extrabold text-neutral-400 tracking-[0.2em] uppercase mt-0.5">
              Academic Platform
            </p>
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="my-auto py-8">
          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
            Study Smarter.
            <br />
            <span className="text-[#B15F2C]">
              Share Better.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base xl:text-lg leading-relaxed text-neutral-300 font-normal">
            Access verified lecture notes, previous year question papers, lab manuals, and academic resources shared by top students.
          </p>
        </div>

        {/* Bottom Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/10 bg-[#0A0A0A]/80 p-4.5 backdrop-blur-md transition-all duration-300 hover:bg-[#0A0A0A] hover:border-[#B15F2C]/40 shadow-md cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-1.5 relative z-10">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${card.badgeStyle}`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 font-medium leading-relaxed relative z-10">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}