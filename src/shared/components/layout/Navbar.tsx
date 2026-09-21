"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Upload, Home, LogIn, LogOut, User, Menu, X, GraduationCap, ArrowUpRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/shared/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isHomeActive = pathname === "/";
  const isBrowseActive = pathname.startsWith("/programs") || pathname.startsWith("/resources");
  const isUploadActive = pathname === "/upload";
  const isDashboardActive = pathname === "/dashboard";

  const navLinks = [
    { name: "Home", href: "/", active: isHomeActive, icon: Home },
    { name: "Browse", href: "/programs", active: isBrowseActive, icon: BookOpen },
    { name: "Upload", href: "/upload", active: isUploadActive, icon: Upload },
    ...(isAuthenticated ? [{ name: "Dashboard", href: "/dashboard", active: isDashboardActive, icon: LayoutDashboard }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-8 bg-[#07080D]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Student<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hub</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1">
              Academic Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Ascend Floating Pill System */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1.5 md:flex bg-[#0F121E]/90 p-1.5 rounded-full border border-white/10 shadow-xl shadow-indigo-950/20 text-white"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 ${
                  link.active
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${link.active ? "text-white" : "text-slate-400"}`} />
                {link.name}
                {link.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse ml-0.5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161A29] hover:bg-[#1E2235] text-slate-200 border border-white/10 text-xs font-bold transition-all">
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span className="max-w-[120px] truncate">{user?.name || "Student"}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-slate-300 hover:bg-white/10 hover:text-white font-bold rounded-full gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-indigo-400" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:bg-white/10 hover:text-white font-bold rounded-full gap-2 text-xs uppercase tracking-wider"
              >
                <LogIn className="h-4 w-4 text-indigo-400" />
                Login
              </Button>
            </Link>
          )}
          <Link href="/upload">
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-full px-5 text-xs uppercase tracking-wider gap-2 shadow-lg shadow-indigo-500/20 border border-indigo-400/30 cursor-pointer"
            >
              Upload Material
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F121E] text-white hover:bg-[#161A29] md:hidden shadow-md cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-indigo-400" /> : <Menu className="h-5 w-5 text-slate-200" />}
        </button>
      </div>

      {/* Mobile Navigation Full-screen Dark Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-[76px] z-50 bg-[#07080D]/95 backdrop-blur-2xl text-white px-6 py-8 flex flex-col justify-between border-b border-white/10 shadow-2xl min-h-[calc(100vh-76px)]"
          >
            <div className="flex flex-col gap-6">
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Navigation Menu
              </div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all border ${
                        link.active
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400/40 text-white shadow-lg shadow-indigo-500/25"
                          : "bg-[#0F121E] border-white/5 text-slate-300 hover:bg-[#161A29] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{link.name}</span>
                      </div>
                      <span className="text-xs font-mono opacity-60">0{idx + 1}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center rounded-xl border-white/10 bg-[#0F121E] text-white hover:bg-[#161A29] h-12 font-bold"
                >
                  <LogOut className="h-4 w-4 mr-2 text-indigo-400" />
                  Logout ({user?.name || "Student"})
                </Button>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-xl border-white/10 bg-[#0F121E] text-white hover:bg-[#161A29] h-12 font-bold"
                  >
                    <LogIn className="h-4 w-4 mr-2 text-indigo-400" />
                    Log In / Sign Up
                  </Button>
                </Link>
              )}
              <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  className="w-full justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold h-12 shadow-lg shadow-indigo-500/25"
                >
                  Upload Resource &rarr;
                </Button>
              </Link>
              <p className="text-center text-xs text-slate-500 mt-4 font-mono">
                Student Hub &copy; {new Date().getFullYear()} — Academic Platform
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


