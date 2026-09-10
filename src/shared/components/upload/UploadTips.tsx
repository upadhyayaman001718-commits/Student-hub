"use client";

import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function UploadTips() {
  const tips = [
    {
      title: "Legibility Matters",
      description: "Ensure notes and manuals are clearly scanned and readable for other students.",
      icon: Info,
      color: "text-[#B15F2C] bg-[#B15F2C]/10 border-[#B15F2C]/20",
    },
    {
      title: "Allowed File Formats",
      description: "We accept PDF, DOC, DOCX, PPT, and PPTX formats up to 50MB.",
      icon: CheckCircle2,
      color: "text-[#0A0A0A] bg-[#E7E5E0] border-[#E2E0DB]",
    },
    {
      title: "Copyright Rules",
      description: "Do not upload commercial textbooks or copyrighted content without authorization.",
      icon: AlertTriangle,
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <Card className="bg-white border border-[#E2E0DB] rounded-[28px] p-6 sm:p-8 space-y-6 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[#B15F2C] shadow-2xs">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight">Upload Guidelines</h3>
          <p className="text-xs text-[#666666] font-medium">Keep these in mind before submitting</p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className="flex gap-4 p-4.5 rounded-[20px] bg-[#F1F0EE] border border-[#E2E0DB] hover:border-[#B15F2C]/30 transition-all duration-300 group"
            >
              <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 border ${tip.color}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-[#0A0A0A] group-hover:text-[#B15F2C] transition-colors duration-200">
                  {tip.title}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed font-normal">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[20px] bg-[#E7E5E0] border border-[#E2E0DB] p-4.5 text-center">
        <p className="text-xs text-[#0A0A0A]/70 font-semibold leading-relaxed">
          Uploaded resources will be reviewed by administrators to ensure community quality standards.
        </p>
      </div>
    </Card>
  );
}

