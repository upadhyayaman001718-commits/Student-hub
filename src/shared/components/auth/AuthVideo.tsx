"use client";

import {
  BookOpen,
  FileText,
  FlaskConical,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function AuthVideo() {
  const featureCards = [
    {
      icon: BookOpen,
      title: "Notes",
      desc: "Organized semester-wise",
      badgeStyle: "text-[#0EA5E9] bg-[#0EA5E9]/12 border-[#0EA5E9]/30 group-hover:bg-[#0EA5E9] group-hover:text-white",
    },
    {
      icon: FileText,
      title: "PYQs",
      desc: "Previous year exam papers",
      badgeStyle: "text-emerald-400 bg-emerald-500/12 border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white",
    },
    {
      icon: FlaskConical,
      title: "Lab Manuals",
      desc: "Practical files & records",
      badgeStyle: "text-amber-400 bg-amber-500/12 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-white",
    },
    {
      icon: GraduationCap,
      title: "Resources",
      desc: "Books, PDFs & slides",
      badgeStyle: "text-indigo-400 bg-indigo-500/12 border-indigo-500/30 group-hover:bg-indigo-500 group-hover:text-white",
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-[#09090B]">
      {/* Background Video Canvas */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-95"
      >
        <source src="/videos/student-hub.mp4" type="video/mp4" />
      </video>

      {/* Multi-layered Vignette & Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/50 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-[#09090B] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(9,9,11,0.85)_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-[#0EA5E9]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14 text-white">
        {/* Top Header & Brand Logo */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#22D3EE] text-white shadow-lg shadow-[#0EA5E9]/30 border border-white/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                Student Hub
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0EA5E9]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#0EA5E9] border border-[#0EA5E9]/30">
                <Sparkles className="h-2.5 w-2.5" />
                V2.0
              </span>
            </div>
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase mt-0.5">
              Academic Resource Platform
            </p>
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="my-auto py-8">
          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Study Smarter.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#22D3EE]">
              Share Better.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base xl:text-lg leading-relaxed text-zinc-300 font-normal">
            Access notes, previous year papers, lab manuals, presentations and academic resources shared by students.
          </p>
        </div>

        {/* Bottom Feature Glass Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/12 bg-white/[0.04] p-4.5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-[#0EA5E9]/40 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_35px_-8px_rgba(14,165,233,0.2)] cursor-pointer relative overflow-hidden"
              >
                {/* Micro hover ambient glow */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-[#0EA5E9]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-3 mb-1.5 relative z-10">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${card.badgeStyle}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-[#0EA5E9] transition-colors duration-200">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed relative z-10">
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