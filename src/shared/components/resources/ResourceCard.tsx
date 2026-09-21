import { Resource } from "@/shared/data/resources";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  GraduationCap,
  User,
  ArrowRight,
  FileCode,
  HelpCircle,
  ExternalLink,
  Bookmark,
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeConfig = (type?: string | null) => {
    switch (type) {
      case "Notes":
        return {
          badgeStyle: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
          icon: FileText,
          iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
          label: "Notes",
        };
      case "PYQ":
        return {
          badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          icon: HelpCircle,
          iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          label: "PYQ",
        };
      case "Lab Manual":
        return {
          badgeStyle: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
          icon: FileCode,
          iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
          label: "Lab Manual",
        };
      default:
        return {
          badgeStyle: "bg-purple-500/10 text-purple-400 border-purple-500/20",
          icon: Bookmark,
          iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
          label: type || "Resource",
        };
    }
  };

  const config = getTypeConfig(resource.resourceType || resource.type);
  const Icon = config.icon;

  return (
    <Link href={`/resources/${resource.id}`} className="block group h-full text-left">
      <Card className="relative flex flex-col justify-between h-full min-h-[240px] bg-[#0F121E]/80 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-[28px] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-indigo-950/40 overflow-hidden">
        <div className="space-y-3">
          {/* Top Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`rounded-2xl p-2.5 border ${config.iconBg} shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                <Icon className="h-4.5 w-4.5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mt-0.5 line-clamp-1">
                  {resource.subject}
                </p>
              </div>
            </div>

            <Badge className={`shrink-0 font-mono font-extrabold uppercase text-[10px] px-2.5 py-1 border ${config.badgeStyle}`}>
              {config.label}
            </Badge>
          </div>

          {/* Details List */}
          <div className="space-y-1.5 border-t border-white/10 pt-3 text-xs font-medium text-slate-400">
            {/* Program */}
            {resource.program && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
                  Program
                </span>
                <span className="text-slate-200 font-bold truncate max-w-[150px]">{resource.program}</span>
              </div>
            )}

            {/* Subject */}
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-400">
                <BookOpen className="h-3.5 w-3.5 text-slate-300" />
                Subject
              </span>
              <span className="text-slate-200 font-bold truncate max-w-[150px]">{resource.subject}</span>
            </div>

            {/* Semester */}
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Bookmark className="h-3.5 w-3.5 text-indigo-400" />
                Semester
              </span>
              <span className="text-slate-200 font-mono font-bold">Sem {resource.semester}</span>
            </div>

            {/* Uploader */}
            {resource.uploadedBy && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  Uploaded By
                </span>
                <span className="text-slate-200 font-bold truncate max-w-[150px]">{resource.uploadedBy}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button className="mt-4 w-full h-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold tracking-wider uppercase text-xs rounded-full shadow-lg shadow-indigo-500/20 border border-indigo-400/30 transition-all duration-300 gap-2 cursor-pointer">
          <ExternalLink className="h-3.5 w-3.5" />
          View Resource
          <ArrowRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-1 transition-transform ml-auto" />
        </Button>
      </Card>
    </Link>
  );
}