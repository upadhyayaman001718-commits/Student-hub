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
          iconBg: "bg-[#0A0A0A] text-white border-black/10",
        };
      case "electronics-comm":
        return {
          icon: Cpu,
          iconBg: "bg-[#B15F2C]/10 text-[#B15F2C] border-[#B15F2C]/20",
        };
      case "mechanical-engg":
        return {
          icon: Wrench,
          iconBg: "bg-[#E7E5E0] text-[#0A0A0A] border-[#E2E0DB]",
        };
      case "business-admin":
        return {
          icon: Briefcase,
          iconBg: "bg-amber-50 text-amber-800 border-amber-200",
        };
      default:
        return {
          icon: GraduationCap,
          iconBg: "bg-[#F1F0EE] text-[#0A0A0A] border-[#E2E0DB]",
        };
    }
  };

  const config = getCourseConfig(slug);
  const Icon = config.icon;

  return (
    <Link href={`/programs/${slug}`} className="group block h-full">
      <Card className="relative flex flex-col justify-between h-full min-h-[230px] bg-white border border-[#E2E0DB] rounded-[28px] p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B15F2C]/40">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className={`h-12 w-12 rounded-2xl border ${config.iconBg} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
              <Icon className="h-5.5 w-5.5" />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#666666] border-[#E2E0DB]">
              {program}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight leading-snug group-hover:text-[#B15F2C] transition-colors duration-300">
              {course}
            </h3>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#F1F0EE] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#666666] group-hover:text-[#0A0A0A] transition-colors">
            {resourceCount}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B15F2C] group-hover:translate-x-1 transition-transform duration-300">
            Browse <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default ProgramCard;