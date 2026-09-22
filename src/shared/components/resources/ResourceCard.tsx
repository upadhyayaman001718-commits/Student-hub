import { Resource } from "@/shared/data/resources";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  FileText, BookOpen, GraduationCap, User,
  ArrowRight, FileCode, HelpCircle, Bookmark,
  Layers,
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const typeConfigs: Record<string, {
    badge: string; icon: typeof FileText; iconWrap: string; label: string;
  }> = {
    Notes: {
      badge:    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      icon:     FileText,
      iconWrap: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
      label:    "Notes",
    },
    PYQ: {
      badge:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon:     HelpCircle,
      iconWrap: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      label:    "PYQ",
    },
    "Lab Manual": {
      badge:    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      icon:     FileCode,
      iconWrap: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
      label:    "Lab Manual",
    },
  };

  const type = resource.resourceType || resource.type || "";
  const cfg = typeConfigs[type] ?? {
    badge:    "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon:     Bookmark,
    iconWrap: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    label:    type || "Resource",
  };
  const Icon = cfg.icon;

  return (
    <Link href={`/resources/${resource.id}`} className="block group">
      <div className="glass-light rounded-2xl p-4 card-hover h-full
                      flex flex-col justify-between">

        {/* ── Header ── */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`shrink-0 h-9 w-9 rounded-xl border ${cfg.iconWrap}
                             flex items-center justify-center
                             group-hover:scale-105 transition-transform duration-200`}>
              <Icon className="h-4 w-4" />
            </div>

            {/* Title + subject */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white leading-snug
                              line-clamp-2 group-hover:text-indigo-300
                              transition-colors duration-200">
                {resource.title}
              </h3>
              {resource.subject && (
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  {resource.subject}
                </p>
              )}
            </div>

            {/* Badge */}
            <Badge className={`shrink-0 label-mono px-2 py-0.5 border ${cfg.badge} shadow-none`}>
              {cfg.label}
            </Badge>
          </div>

          {/* ── Meta rows ── */}
          <div className="space-y-1.5 border-t border-white/[0.05] pt-2.5">
            {resource.program && (
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <GraduationCap className="h-3 w-3 text-indigo-400" />
                  Program
                </span>
                <span className="text-slate-300 font-semibold truncate max-w-[140px]">
                  {resource.program}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <BookOpen className="h-3 w-3" />
                Subject
              </span>
              <span className="text-slate-300 font-semibold truncate max-w-[140px]">
                {resource.subject}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Layers className="h-3 w-3 text-indigo-400" />
                Semester
              </span>
              <span className="text-slate-300 font-mono font-semibold">
                Sem {resource.semester}
              </span>
            </div>
            {resource.uploadedBy && (
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <User className="h-3 w-3" />
                  Uploader
                </span>
                <span className="text-slate-300 font-semibold truncate max-w-[140px]">
                  {resource.uploadedBy}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.05]">
          <span className="text-xs text-slate-500 label-mono">PDF Document</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold
                            text-indigo-400 group-hover:translate-x-0.5
                            transition-transform duration-200">
            View
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
