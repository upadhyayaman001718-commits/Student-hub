import Link from "next/link";
import { Code, Cpu, Wrench, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";

interface ProgramCardProps { course: string; program: string; slug: string; resourceCount?: string; }

function ProgramCard({ course, program, slug, resourceCount = "0 resources" }: ProgramCardProps) {
  const getCourseConfig = (courseSlug: string) => {
    switch (courseSlug) {
      case "computer-science": return { icon: Code, bg: "bg-[#0EA5E9]/10", text: "text-[#0EA5E9]", border: "border-[#0EA5E9]/20" };
      case "electronics-comm": return { icon: Cpu, bg: "bg-[#22D3EE]/10", text: "text-[#22D3EE]", border: "border-[#22D3EE]/20" };
      case "mechanical-engg": return { icon: Wrench, bg: "bg-[#3B82F6]/10", text: "text-[#3B82F6]", border: "border-[#3B82F6]/20" };
      case "business-admin": return { icon: Briefcase, bg: "bg-[#0EA5E9]/10", text: "text-[#0EA5E9]", border: "border-[#0EA5E9]/20" };
      default: return { icon: GraduationCap, bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20" };
    }
  };
  const config = getCourseConfig(slug);
  const Icon = config.icon;
  return <Link href={`/programs/${slug}`} className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-[#18181B]/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA5E9]/35 hover:bg-[#18181B] hover:shadow-xl hover:shadow-black/20"><div className="absolute right-5 top-5 text-zinc-600 transition-colors group-hover:text-[#38BDF8]"><ArrowUpRight className="size-5" /></div><div><div className={`mb-6 flex size-11 items-center justify-center rounded-xl border ${config.bg} ${config.text} ${config.border}`}><Icon className="size-5" /></div><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{program}</span><h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#38BDF8]">{course}</h3></div><div className="mt-6 text-sm font-semibold text-zinc-500 transition-colors group-hover:text-zinc-300">{resourceCount}</div></Link>;
}

export default ProgramCard;
