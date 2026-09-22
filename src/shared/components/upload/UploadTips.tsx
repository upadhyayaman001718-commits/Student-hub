"use client";

import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";

export default function UploadTips() {
  const tips = [
    {
      title: "Legibility Matters",
      description: "Ensure notes and manuals are clearly scanned and readable.",
      icon: Info,
      color: "text-indigo-400 bg-indigo-500/8 border-indigo-500/20",
    },
    {
      title: "Allowed Formats",
      description: "PDF, DOC, DOCX, PPT, PPTX — up to 50MB per file.",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/8 border-emerald-500/20",
    },
    {
      title: "Copyright Rules",
      description: "Do not upload commercial textbooks or copyrighted content without authorisation.",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/8 border-amber-500/20",
    },
  ];

  return (
    <div className="glass-light rounded-2xl p-5 sm:p-6 space-y-5 border border-white/[0.07]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-indigo-500/8 border border-indigo-500/20
                        flex items-center justify-center text-indigo-400 shrink-0">
          <HelpCircle className="h-4.5 w-4.5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Upload Guidelines</h3>
          <p className="text-xs text-slate-500">Keep these in mind before submitting</p>
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-3">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className={`flex gap-3 p-3.5 rounded-xl border ${tip.color}
                          hover:border-opacity-50 transition-colors duration-150`}
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0
                               border ${tip.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">{tip.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{tip.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="rounded-xl bg-[#111525]/60 border border-white/[0.06] px-4 py-3 text-center">
        <p className="text-xs text-slate-500 leading-relaxed">
          Uploaded resources are reviewed by administrators to ensure quality standards.
        </p>
      </div>
    </div>
  );
}
