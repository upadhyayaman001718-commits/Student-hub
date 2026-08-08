interface RecentlyUploadedCardProps {
  title: string;
  sub: string;
  program: string;
  course: string;
  sem: number;
  filetype?: string;
  uploadedTime?: string;
  author?: string;
}

export default function RecentlyUploadedCard({ title, sub, program, course, sem, filetype = "CSE", uploadedTime = "2h ago", author = "Student" }: RecentlyUploadedCardProps) {
  const typeStyles = sub.toLowerCase().includes("note") ? "bg-sky-400/10 text-sky-300" : sub.toLowerCase().includes("pyq") ? "bg-emerald-400/10 text-emerald-300" : sub.toLowerCase().includes("lab") ? "bg-amber-400/10 text-amber-300" : "bg-violet-400/10 text-violet-300";

  return (
    <article className="group flex min-h-52 flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-black/10">
      <div><div className="flex items-center justify-between gap-3"><span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${typeStyles}`}>{sub}</span><span className="text-xs font-semibold text-muted-foreground">{filetype}</span></div><h3 className="mt-5 line-clamp-2 text-base font-semibold leading-6 text-foreground transition-colors group-hover:text-primary">{title}</h3><p className="mt-2 text-xs text-muted-foreground">{program} · Semester {sem}</p></div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span className="truncate">{author} · {uploadedTime}</span><span className="shrink-0 font-semibold text-primary">View <span aria-hidden="true">→</span></span></div>
    </article>
  );
}
