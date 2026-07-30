"use client";

import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";

export default function UploadTips() {
  const tips = [
    {
      title: "Legibility Matters",
      description: "Ensure notes and manuals are clearly scanned and readable for other students.",
      icon: Info,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Allowed File Formats",
      description: "We accept PDF, DOC, DOCX, PPT, and PPTX formats up to 50MB.",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Copyright Rules",
      description: "Do not upload commercial textbooks or copyrighted content without authorization.",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="bg-[#18181B] border border-white/8 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Upload Guidelines</h3>
          <p className="text-xs text-zinc-400 font-medium">Keep these in mind before submitting</p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl bg-[#111827]/40 border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${tip.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-[#0EA5E9] transition-colors duration-200">
                  {tip.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-[#111827]/60 border border-white/5 p-4 text-center">
        <p className="text-xs text-zinc-500 font-medium">
          Uploaded resources will be reviewed by administrators to ensure community quality standards.
        </p>
      </div>
    </div>
  );
}
