import Link from "next/link";
import { Code, Cpu, Wrench, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramCardProps {
  course: string;
  program: string;
  slug: string;
  resourceCount?: string;
}

function ProgramCard({ course, program, slug, resourceCount = "0 resources" }: ProgramCardProps) {
  const getCourseConfig = (slug: string) => {
    switch (slug) {
      case "computer-science":
        return {
          icon: Code,
          iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        };
      case "electronics-comm":
        return {
          icon: Cpu,
          iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        };
      case "mechanical-engg":
        return {
          icon: Wrench,
          iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        };
      case "business-admin":
        return {
          icon: Briefcase,
          iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      default:
        return {
          icon: GraduationCap,
          iconBg: "bg-slate-500/10 text-slate-300 border-slate-500/20",
        };
    }
  };

  const config = getCourseConfig(slug);
  const Icon = config.icon;

  return (
    <Link href={`/programs/${slug}`} className="group block h-full">
      <Card className="relative flex flex-col justify-between h-full min-h-[230px] bg-[#0F121E]/80 backdrop-blur-md border border-white/10 rounded-[28px] p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-indigo-950/40">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className={`h-12 w-12 rounded-2xl border ${config.iconBg} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
              <Icon className="h-5.5 w-5.5" />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-mono font-bold tracking-[0.15em] text-slate-400 border-white/10 bg-[#161A29]">
              {program}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors duration-300">
              {course}
            </h3>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
            {resourceCount}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform duration-300">
            Browse <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default ProgramCard;