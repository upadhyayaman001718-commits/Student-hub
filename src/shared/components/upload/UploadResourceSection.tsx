import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";

export default function UploadResourceSection() {
  return <section className="my-4 flex flex-col gap-6 rounded-xl border border-primary/20 bg-primary/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Give back to your community</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Got notes that helped you? Share them.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">Upload notes, PYQs or lab manuals and make studying a little easier for someone else.</p></div><Link href="/upload" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"><Upload data-icon="inline-start" /> Upload a resource <ArrowRight data-icon="inline-end" /></Link></section>;
}
