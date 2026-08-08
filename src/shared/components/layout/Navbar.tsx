"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";
  const isBrowseActive = pathname.startsWith("/programs");
  const isUploadActive = pathname === "/upload";

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-white/8 bg-[#09090B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#0EA5E9] text-xs font-black text-white shadow-lg shadow-[#0EA5E9]/20 transition-transform duration-300 group-hover:scale-105">SH</span>
          <span className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[#38BDF8]">Student Hub</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 sm:flex">
          <Link href="/" className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isHomeActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}>Home</Link>
          <Link href="/programs" className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isBrowseActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}>Browse</Link>
          <Link href="/upload" className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isUploadActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"}`}>Upload</Link>
          <span className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-white">About</span>
        </nav>
        <div className="flex items-center gap-3 sm:gap-5"><span className="hidden cursor-pointer text-sm font-semibold text-zinc-400 transition-colors hover:text-white sm:inline">Login</span><span className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-4 text-sm font-bold text-black transition-all hover:bg-zinc-200 sm:px-5">Signup</span></div>
      </div>
    </header>
  );
}
