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
      badgeStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: FileText,
      title: "PYQs",
      desc: "Previous year exam papers",
      badgeStyle: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: FlaskConical,
      title: "Lab Manuals",
      desc: "Practical files & records",
      badgeStyle: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      icon: GraduationCap,
      title: "Resources",
      desc: "Books, PDFs & slides",
      badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-[#07080D]">
      {/* Background Video Canvas */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-[0.35]"
      >
        <source src="/videos/student-hub.mp4" type="video/mp4" />
      </video>

      {/* Multi-layered Dark Gradient Overlay for Crisp Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/75 to-[#07080D]/40 pointer-events-none" />

      {/* Floating Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14 text-white">
        {/* Top Header & Brand Logo */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-white/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                Student<span className="text-indigo-400">Hub</span>
              </h1>
              <Badge className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="h-2.5 w-2.5 mr-1 text-indigo-400" />
                V2.0
              </Badge>
            </div>
            <p className="text-[10px] font-mono font-extrabold text-slate-400 tracking-[0.2em] uppercase mt-0.5">
              Academic Workspace
            </p>
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="my-auto py-8">
          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
            Study Smarter.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
              Share Better.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base xl:text-lg leading-relaxed text-slate-300 font-normal">
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
                className="group rounded-2xl border border-white/10 bg-[#0F121E]/80 p-4.5 backdrop-blur-md transition-all duration-300 hover:bg-[#161A29] hover:border-indigo-500/40 shadow-xl cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-1.5 relative z-10">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${card.badgeStyle}`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed relative z-10">
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