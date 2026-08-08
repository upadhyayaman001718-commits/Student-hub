import Link from "next/link";
import { ArrowUpRight, Briefcase, Code, Cpu, GraduationCap, Wrench } from "lucide-react";

interface ProgramCardProps { course: string; program: string; slug: string; resourceCount?: string; }

export default function ProgramCard({ course, program, slug, resourceCount = "0 resources" }: ProgramCardProps) {
  const config = slug === "computer-science" ? { icon: Code, tone: "text-sky-300 bg-sky-400/10" } : slug === "electronics-comm" ? { icon: Cpu, tone: "text-cyan-300 bg-cyan-400/10" } : slug === "mechanical-engg" ? { icon: Wrench, tone: "text-blue-300 bg-blue-400/10" } : slug === "business-admin" ? { icon: Briefcase, tone: "text-indigo-300 bg-indigo-400/10" } : { icon: GraduationCap, tone: "text-muted-foreground bg-muted" };
  const Icon = config.icon;
  return <Link href={`/programs/${slug}`} className="group flex min-h-44 flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-black/10"><div className="flex items-start justify-between gap-3"><div className={`flex size-10 items-center justify-center rounded-lg ${config.tone}`}><Icon className="size-5" /></div><ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" /></div><div className="mt-8"><p className="text-xs font-medium text-muted-foreground">{program}</p><h3 className="mt-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{course}</h3><p className="mt-3 text-sm text-muted-foreground">{resourceCount}</p></div></Link>;
}
