"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, Upload, Home, LogIn, LogOut, User,
  Menu, X, GraduationCap, ArrowUpRight, LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/shared/context/AuthContext";
import Container from "@/shared/components/layout/Container";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = [
    { name: "Home",      href: "/",          icon: Home },
    { name: "Browse",    href: "/programs",  icon: BookOpen },
    { name: "Upload",    href: "/upload",    icon: Upload },
    ...(isAuthenticated
      ? [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080A12]/85 backdrop-blur-xl border-b border-white/[0.06]">
      <Container>
        <div className="h-16 flex items-center justify-between gap-6">

          {/* ── Brand ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg
                            bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500
                            text-white shadow-md shadow-indigo-500/20
                            group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-extrabold tracking-tight text-white
                               group-hover:text-indigo-300 transition-colors duration-200">
                Student<span className="text-gradient-vivid">Hub</span>
              </span>
              <span className="label-mono text-slate-500 text-[9px]">Academic Platform</span>
            </div>
          </Link>

          {/* ── Desktop Nav pill ── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-0.5
                       bg-[#0C0F1C]/90 px-1.5 py-1.5 rounded-full
                       border border-white/[0.06] shadow-lg"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full
                              text-[11px] font-bold tracking-wide uppercase
                              transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-3 w-3 ${active ? "text-white" : "text-slate-500"}`} />
                  {link.name}
                  {active && (
                    <span className="ml-0.5 h-1 w-1 rounded-full bg-cyan-300 dot-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Auth + CTA ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-[#111525] hover:bg-[#161B2E] border border-white/[0.07]
                             text-slate-300 text-xs font-semibold transition-colors duration-150"
                >
                  <User className="h-3 w-3 text-indigo-400" />
                  <span className="max-w-[100px] truncate">{user?.name || "Student"}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             text-slate-400 hover:text-white hover:bg-white/5
                             text-xs font-semibold transition-colors duration-150 cursor-pointer"
                >
                  <LogOut className="h-3 w-3 text-indigo-400" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           text-slate-400 hover:text-white hover:bg-white/5
                           text-xs font-semibold transition-colors duration-150"
              >
                <LogIn className="h-3 w-3 text-indigo-400" />
                Login
              </Link>
            )}

            <Link
              href="/upload"
              className="inline-flex items-center gap-1.5 h-8 px-4
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         hover:from-indigo-500 hover:to-purple-500
                         text-white rounded-full text-xs font-bold
                         shadow-md shadow-indigo-500/20 border border-indigo-400/20
                         transition-all duration-200 hover:scale-[1.02]"
            >
              Upload
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center
                       rounded-xl border border-white/[0.08] bg-[#0C0F1C]
                       text-white hover:bg-[#111525] transition-colors duration-150 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X className="h-4 w-4 text-indigo-400" />
              : <Menu className="h-4 w-4 text-slate-300" />
            }
          </button>
        </div>
      </Container>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-[65px] z-50
                       bg-[#080A12]/97 backdrop-blur-2xl
                       border-b border-white/[0.06] shadow-2xl
                       px-5 py-6 flex flex-col gap-4
                       min-h-[calc(100dvh-65px)]"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl
                                text-sm font-bold border transition-all duration-150 ${
                      active
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400/20 text-white"
                        : "bg-[#0C0F1C] border-white/[0.06] text-slate-300 hover:bg-[#111525] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </div>
                    <span className="label-mono text-slate-600">0{i + 1}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex-1" />

            <div className="flex flex-col gap-2.5 pt-4 border-t border-white/[0.06]">
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2
                             h-12 rounded-2xl border border-white/[0.08]
                             bg-[#0C0F1C] text-white text-sm font-bold cursor-pointer
                             hover:bg-[#111525] transition-colors duration-150"
                >
                  <LogOut className="h-4 w-4 text-indigo-400" />
                  Logout ({user?.name || "Student"})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2
                             h-12 rounded-2xl border border-white/[0.08]
                             bg-[#0C0F1C] text-white text-sm font-bold
                             hover:bg-[#111525] transition-colors duration-150"
                >
                  <LogIn className="h-4 w-4 text-indigo-400" />
                  Log in / Sign up
                </Link>
              )}

              <Link
                href="/upload"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2
                           h-12 rounded-2xl
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           text-white text-sm font-extrabold
                           shadow-lg shadow-indigo-500/20"
              >
                Upload Resource →
              </Link>

              <p className="text-center label-mono text-slate-600 pt-2">
                Student Hub © {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
