import { Resource } from "@/shared/data/resources";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  GraduationCap,
  User,
  Download,
  FileCode,
  HelpCircle,
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {

  // Select color scheme and icon based on resource type

  const getTypeConfig = (type: Resource["type"]) => {
    switch (type) {
      case "Notes":
        return {
          bg: "bg-[#0EA5E9]/10",
          text: "text-[#0EA5E9]",
          border: "border-[#0EA5E9]/20",
          icon: FileText,
          label: "Notes",
        };
      case "PYQ":
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          border: "border-amber-500/20",
          icon: HelpCircle,
          label: "PYQ",
        };
      case "Lab Manual":
        return {
          bg: "bg-rose-500/10",
          text: "text-rose-400",
          border: "border-rose-500/20",
          icon: FileCode,
          label: "Lab Manual",
        };
      default:
        return {
          bg: "bg-zinc-500/10",
          text: "text-zinc-400",
          border: "border-zinc-500/20",
          icon: FileText,
          label: "Resource",
        };
    }
  };

  const config = getTypeConfig(resource.type);
  const Icon = config.icon;

  return (
    <Link
      href={`/resources/${resource.id}`}
      className="block"
    >
      <div className="group rounded-[16px] border border-white/8 bg-[#18181B]/60 p-[28px] transition-all duration-300 hover:-translate-y-[4px] hover:border-[#0EA5E9]/30 hover:bg-[#18181B] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] shadow-md flex flex-col justify-between min-h-[260px] relative overflow-hidden">
        {/* Glow highlight */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#0EA5E9]/3 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div>
          {/* Top Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl ${config.bg} ${config.text} p-3 border ${config.border}`}>
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white line-clamp-1 leading-snug group-hover:text-[#0EA5E9] transition-colors duration-200">
                  {resource.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                  {resource.subject}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${config.bg} ${config.text} border ${config.border} shrink-0`}
            >
              {config.label}
            </span>
          </div>

          {/* Details List */}
          <div className="mt-6 space-y-2 border-t border-white/5 pt-4 text-xs font-medium text-zinc-400">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-zinc-500" />
                Semester
              </span>
              <span className="text-white font-semibold">Semester {resource.semester}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-zinc-500" />
                Subject
              </span>
              <span className="text-white font-semibold">{resource.subject}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-zinc-500" />
                Uploaded By
              </span>
              <span className="text-white font-semibold">{resource.uploadedBy}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-6 flex w-full h-12 items-center justify-center gap-2 rounded-[12px] bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 px-6 text-xs font-bold text-white transition-all duration-300 shadow-sm hover:shadow hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer">
          <Download className="h-4 w-4" />
          Download Resource
        </button>
      </div>
    </Link>
  );
}