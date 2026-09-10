"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Upload, Home, LogIn, LogOut, User, Menu, X, GraduationCap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/shared/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isHomeActive = pathname === "/";
  const isBrowseActive = pathname.startsWith("/programs");
  const isUploadActive = pathname === "/upload";

  const navLinks = [
    { name: "Home", href: "/", active: isHomeActive, icon: Home },
    { name: "Browse", href: "/programs", active: isBrowseActive, icon: BookOpen },
    { name: "Upload", href: "/upload", active: isUploadActive, icon: Upload },
  ];

  return (
    <header className="sticky top-0 z-50 py-4 px-4 sm:px-8 bg-[#F1F0EE]/80 backdrop-blur-xl border-b border-[#E2E0DB]/60 transition-all duration-300">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white shadow-sm group-hover:bg-[#B15F2C] transition-all duration-300">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#0A0A0A] group-hover:text-[#B15F2C] transition-colors">
              Student<span className="text-[#B15F2C]">Hub</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666] -mt-1">
              Academic Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Lumora Pill Floating System */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1.5 md:flex bg-[#0A0A0A]/90 p-1.5 rounded-full border border-white/10 shadow-lg text-white"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-full transition-all duration-300 ${
                  link.active
                    ? "bg-[#B15F2C] text-white shadow-sm"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${link.active ? "text-white" : "text-neutral-400"}`} />
                {link.name}
                {link.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE9E4] text-[#0A0A0A] text-xs font-bold">
                <User className="h-3.5 w-3.5 text-[#B15F2C]" />
                <span className="max-w-[120px] truncate">{user?.name || "Student"}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-[#0A0A0A] hover:bg-[#EBE9E4] font-bold rounded-full gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-[#B15F2C]" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#0A0A0A] hover:bg-[#EBE9E4] font-bold rounded-full gap-2 text-xs uppercase tracking-wider"
              >
                <LogIn className="h-4 w-4 text-[#B15F2C]" />
                Login
              </Button>
            </Link>
          )}
          <Link href="/upload">
            <Button
              variant="accent"
              size="sm"
              className="bg-[#B15F2C] hover:bg-[#9E5324] text-white font-bold rounded-full px-5 text-xs uppercase tracking-wider gap-2 shadow-sm"
            >
              Upload Material
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E0DB] bg-white text-[#0A0A0A] hover:bg-[#F1F0EE] md:hidden shadow-xs cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="md:hidden fixed inset-x-0 top-[76px] z-50 bg-[#0A0A0A] text-white px-6 py-8 flex flex-col justify-between border-b border-white/10 shadow-2xl min-h-[calc(100vh-76px)]"
          >
            <div className="flex flex-col gap-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B15F2C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B15F2C]" />
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
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
                        link.active
                          ? "bg-[#B15F2C] text-white"
                          : "bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 hover:text-white"
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

            <div className="pt-8 border-t border-neutral-800 flex flex-col gap-3">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center rounded-full border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 h-12"
                >
                  <LogOut className="h-4 w-4 mr-2 text-[#B15F2C]" />
                  Logout ({user?.name || "Student"})
                </Button>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-full border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 h-12"
                  >
                    <LogIn className="h-4 w-4 mr-2 text-[#B15F2C]" />
                    Log In / Sign Up
                  </Button>
                </Link>
              )}
              <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="accent"
                  className="w-full justify-center rounded-full bg-[#B15F2C] hover:bg-[#9E5324] text-white font-bold h-12"
                >
                  Upload Resource &rarr;
                </Button>
              </Link>
              <p className="text-center text-xs text-neutral-500 mt-4">
                Student Hub &copy; {new Date().getFullYear()} — Academic Platform
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

