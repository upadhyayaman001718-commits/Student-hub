"use client";

interface RecentlyUploadedCardProps { title: string; sub: string; program: string; course: string; sem: number; filetype?: string; uploadedTime?: string; author?: string; }

export default function RecentlyUploadedCard({ title, sub, filetype = "CSE", uploadedTime = "2h ago", author = "Student" }: RecentlyUploadedCardProps) {
  return <div className="group flex min-h-[190px] cursor-pointer flex-col justify-between bg-[#0F0F12] p-6 transition-colors duration-300 hover:bg-[#17171C]"><div><div className="mb-8 flex items-center justify-between gap-2"><span className="border-l-2 border-[#22D3EE] pl-2 text-xs font-bold uppercase tracking-[0.14em] text-[#7DD3FC]">{sub}</span><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">{filetype}</span></div><h4 className="line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-[#38BDF8]">{title}</h4></div><div className="mt-6 border-t border-white/10 pt-4 text-xs font-semibold text-zinc-500"><span>by {author}</span><span className="mx-2 text-zinc-700">/</span><span>{uploadedTime}</span></div></div>;
}
