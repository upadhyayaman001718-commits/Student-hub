"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";
  const isBrowseActive = pathname.startsWith("/programs");
  const isUploadActive = pathname === "/upload";
  const navClass = (active: boolean) => `shrink-0 border-b-2 px-3 py-5 text-sm font-medium transition-colors ${active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`;

  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-8 lg:px-10"><Link href="/" className="flex shrink-0 items-center gap-2.5"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">SH</span><span className="text-base font-semibold tracking-tight text-foreground">Student Hub</span></Link><nav aria-label="Main navigation" className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"><Link href="/" className={navClass(isHomeActive)}>Home</Link><Link href="/programs" className={navClass(isBrowseActive)}>Browse</Link><Link href="/upload" className={navClass(isUploadActive)}>Upload</Link><span className="shrink-0 border-b-2 border-transparent px-3 py-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About</span></nav><div className="flex shrink-0 items-center gap-3"><span className="hidden cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">Login</span><span className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-card px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted sm:px-4">Signup</span></div></div></header>;
}
