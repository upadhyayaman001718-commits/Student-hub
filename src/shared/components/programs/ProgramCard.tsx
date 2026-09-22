import Link from "next/link";
import { Code, Cpu, Wrench, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgramCardProps {
  course: string;
  program: string;
  slug: string;
  resourceCount?: string;
}

function ProgramCard({ course, program, slug, resourceCount = "0 resources" }: ProgramCardProps) {
  const configs: Record<string, { icon: typeof Code; iconColor: string; iconBg: string; accentColor: string }> = {
    "computer-science": {
      icon: Code,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
      accentColor: "text-indigo-400",
    },
    "electronics-comm": {
      icon: Cpu,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      accentColor: "text-purple-400",
    },
    "mechanical-engg": {
      icon: Wrench,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10 border-cyan-500/20",
      accentColor: "text-cyan-400",
    },
    "business-admin": {
      icon: Briefcase,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/20",
      accentColor: "text-amber-400",
    },
  };

  const cfg = configs[slug] ?? {
    icon: GraduationCap,
    iconColor: "text-slate-400",
    iconBg: "bg-slate-500/10 border-slate-500/20",
    accentColor: "text-slate-400",
  };
  const Icon = cfg.icon;

  return (
    <Link href={`/programs/${slug}`} className="group block">
      <div className="glass-light rounded-2xl p-5 card-hover h-full
                      flex flex-col justify-between min-h-[155px]">
        {/* Top */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className={`h-10 w-10 rounded-xl border ${cfg.iconBg}
                             flex items-center justify-center ${cfg.iconColor}
                             group-hover:scale-110 transition-transform duration-200 shrink-0`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <Badge
              variant="outline"
              className="label-mono text-slate-500 border-white/[0.08] bg-[#111525] px-2 py-0.5"
            >
              {program}
            </Badge>
          </div>

          <h3 className="text-sm font-bold text-white tracking-tight leading-snug
                          group-hover:text-indigo-300 transition-colors duration-200">
            {course}
          </h3>
        </div>

        {/* Bottom */}
        <div className="mt-4 pt-3 border-t border-white/[0.06]
                        flex items-center justify-between">
          <span className="text-xs text-slate-500 group-hover:text-slate-300
                           transition-colors duration-200">
            {resourceCount}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs font-semibold
                            ${cfg.accentColor}
                            group-hover:translate-x-0.5 transition-transform duration-200`}>
            Browse <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProgramCard;
