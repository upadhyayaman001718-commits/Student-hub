import Link from "next/link";
import { Code, Cpu, Wrench, Briefcase, GraduationCap } from "lucide-react";

interface ProgramCardProps {
  course: string;
  program: string;
  slug: string;
  resourceCount?: string;
}

function ProgramCard({ course, program, slug, resourceCount = "0 resources" }: ProgramCardProps) {
  // Select icon and color scheme based on course slug
  const getCourseConfig = (slug: string) => {
    switch (slug) {
      case "computer-science":
        return {
          icon: Code,
          bg: "bg-[#0EA5E9]/10",
          text: "text-[#0EA5E9]",
          border: "border-[#0EA5E9]/20",
        };
      case "electronics-comm":
        return {
          icon: Cpu,
          bg: "bg-[#22D3EE]/10",
          text: "text-[#22D3EE]",
          border: "border-[#22D3EE]/20",
        };
      case "mechanical-engg":
        return {
          icon: Wrench,
          bg: "bg-[#3B82F6]/10",
          text: "text-[#3B82F6]",
          border: "border-[#3B82F6]/20",
        };
      case "business-admin":
        return {
          icon: Briefcase,
          bg: "bg-[#0EA5E9]/10",
          text: "text-[#0EA5E9]",
          border: "border-[#0EA5E9]/20",
        };
      default:
        return {
          icon: GraduationCap,
          bg: "bg-zinc-500/10",
          text: "text-zinc-400",
          border: "border-zinc-500/20",
        };
    }
  };

  const config = getCourseConfig(slug);
  const Icon = config.icon;

  return (
    <Link
      href={`/programs/${slug}`}
      className="group rounded-[16px] border border-white/8 bg-[#18181B]/60 p-[28px] flex flex-col justify-between h-full min-h-[220px] transition-all duration-300 hover:border-[#0EA5E9]/30 hover:bg-[#18181B] hover:-translate-y-[4px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] shadow-md relative overflow-hidden"
    >
      {/* Background ambient glow on hover */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#0EA5E9]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="space-y-4">
        {/* Top Icon */}
        <div className={`h-10 w-10 rounded-xl ${config.bg} ${config.text} border ${config.border} flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Program tag & Course name */}
        <div>
          <span className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
            {program}
          </span>
          <h3 className="text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-[#0EA5E9] transition-colors duration-200">
            {course}
          </h3>
        </div>
      </div>

      {/* Resource Count */}
      <div className="mt-6 text-[15px] font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
        {resourceCount}
      </div>
    </Link>
  );
}

export default ProgramCard;