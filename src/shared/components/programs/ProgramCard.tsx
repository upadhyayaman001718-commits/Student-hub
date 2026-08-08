import Link from "next/link";
import { Code, Cpu, Wrench, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";

interface ProgramCardProps { course: string; program: string; slug: string; resourceCount?: string; }

function ProgramCard({ course, program, slug, resourceCount = "0 resources" }: ProgramCardProps) {
  const getCourseConfig = (courseSlug: string) => {
    switch (courseSlug) {
      case "computer-science": return { icon: Code, text: "text-[#38BDF8]" };
      case "electronics-comm": return { icon: Cpu, text: "text-[#22D3EE]" };
      case "mechanical-engg": return { icon: Wrench, text: "text-[#60A5FA]" };
      case "business-admin": return { icon: Briefcase, text: "text-[#38BDF8]" };
      default: return { icon: GraduationCap, text: "text-zinc-400" };
    }
  };
  const { icon: Icon, text } = getCourseConfig(slug);
  return <Link href={`/programs/${slug}`} className="group relative flex min-h-[220px] flex-col justify-between bg-[#0F0F12] p-6 transition-colors duration-300 hover:bg-[#17171C]"><div className="absolute right-5 top-5 text-zinc-600 transition-colors group-hover:text-[#38BDF8]"><ArrowUpRight className="size-5" /></div><div><div className={`mb-7 flex size-10 items-center justify-center border border-white/10 bg-[#09090B] ${text}`}><Icon className="size-5" /></div><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{program}</span><h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#38BDF8]">{course}</h3></div><div className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-zinc-500">{resourceCount}</div></Link>;
}

export default ProgramCard;
