"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isBrowseActive = pathname.startsWith("/programs");
  const isUploadActive = pathname === "/upload";

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-white/5 bg-[#09090B]/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto h-full max-w-[1280px] px-6 sm:px-12 lg:px-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#22D3EE] text-sm font-black text-white shadow-lg shadow-[#0EA5E9]/20 group-hover:scale-105 transition-transform duration-300">
            SH
          </span>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#0EA5E9] transition-colors duration-300">
            Student Hub
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 sm:flex">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              isHomeActive ? "text-[#0EA5E9]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/programs"
            className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              isBrowseActive ? "text-[#0EA5E9]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Browse
          </Link>
          <Link
            href="/upload"
            className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              isUploadActive ? "text-[#0EA5E9]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Upload
          </Link>
          <span className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer">
            About
          </span>
        </nav>
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer">
            Login
          </span>
          <span className="inline-flex h-12 items-center justify-center rounded-[12px] bg-white px-6 text-sm font-bold text-black hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02] shadow-md cursor-pointer">
            Signup
          </span>
        </div>
      </div>
    </header>
  );
}
