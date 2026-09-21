"use client";

import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function UploadTips() {
  const tips = [
    {
      title: "Legibility Matters",
      description: "Ensure notes and manuals are clearly scanned and readable for other students.",
      icon: Info,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Allowed File Formats",
      description: "We accept PDF, DOC, DOCX, PPT, and PPTX formats up to 50MB.",
      icon: CheckCircle2,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Copyright Rules",
      description: "Do not upload commercial textbooks or copyrighted content without authorization.",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <Card className="bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight">Upload Guidelines</h3>
          <p className="text-xs text-slate-400 font-medium">Keep these in mind before submitting</p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className="flex gap-4 p-4.5 rounded-2xl bg-[#161A29]/80 border border-white/10 hover:border-indigo-500/40 hover:bg-[#1E2235]/90 transition-all duration-300 group"
            >
              <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 border ${tip.color}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-white group-hover:text-indigo-400 transition-colors duration-200">
                  {tip.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-[#161A29]/60 border border-white/10 p-4 text-center">
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Uploaded resources will be reviewed by administrators to ensure community quality standards.
        </p>
      </div>
    </Card>
  );
}

