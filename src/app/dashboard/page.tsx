"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Container from "@/shared/components/layout/Container";
import { useAuth } from "@/shared/context/AuthContext";
import { getMyResources, deleteResource, Resource } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  FolderCheck, FileText, Trash2, Eye, PlusCircle,
  Loader2, AlertCircle, UserCheck, LogIn, Layers,
  BookOpen, Sparkles, ArrowUpRight, ShieldCheck, RotateCcw,
} from "lucide-react";

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [resources, setResources]           = useState<Resource[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);
  const [deletingId, setDeletingId]         = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const fetchUserResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMyResources();
      if (res.success && res.data) setResources(res.data);
    } catch (err: any) {
      setError(err?.message || "Failed to load your resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUserResources();
    else if (!authLoading) setLoading(false);
  }, [isAuthenticated, authLoading]);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      const res = await deleteResource(id);
      if (res.success) {
        setResources((prev) => prev.filter((item) => item.id !== id));
        setConfirmDeleteId(null);
      } else {
        alert("Failed to delete resource.");
      }
    } catch (err: any) {
      alert(err?.message || "Delete operation failed.");
    } finally {
      setDeletingId(null);
    }
  };

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[400px] glow-mesh pointer-events-none -z-10" />
      <Navbar />
      <main className="flex-1 py-20 md:py-28">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );

  if (authLoading) {
    return (
      <Shell>
        <div className="flex items-center justify-center gap-3 py-20">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
          <p className="text-sm text-slate-400">Verifying session…</p>
        </div>
      </Shell>
    );
  }

  if (!isAuthenticated) {
    return (
      <Shell>
        <div className="flex items-center justify-center py-16">
          <div className="max-w-sm w-full glass-light rounded-2xl p-10 text-center space-y-6 border border-white/[0.07]">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20
                            flex items-center justify-center text-amber-400 mx-auto">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-white">Authentication Required</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Please log in to access your dashboard and manage your uploads.
              </p>
            </div>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 h-11 w-full rounded-full
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         text-white font-bold text-xs shadow-md shadow-indigo-500/20
                         border border-indigo-400/20 hover:from-indigo-500 hover:to-purple-500 transition-all"
            >
              <LogIn className="h-4 w-4" />
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-8">

        {/* ── Welcome banner ── */}
        <div className="glass-light rounded-2xl p-6 sm:p-8 border border-white/[0.07]
                        flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full
                            bg-indigo-500/8 border border-indigo-500/15
                            px-3 py-0.5 label-mono text-indigo-400">
              <UserCheck className="h-3 w-3" />
              Authenticated Contributor
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back,{" "}
              <span className="text-gradient-vivid">{user?.name || "Student"}</span>
            </h1>
            <p className="text-sm text-slate-500">
              Manage and track all academic resources under your account.
            </p>
          </div>
          <Link
            href="/upload"
            className="shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-full
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:from-indigo-500 hover:to-purple-500
                       text-white font-bold text-xs shadow-md shadow-indigo-500/20
                       border border-indigo-400/20 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            Upload New Resource
          </Link>
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: "Total Uploads",   value: resources.length, sub: "Resources in community catalog",    icon: FolderCheck, color: "text-indigo-400", hov: "hover:border-indigo-500/25" },
            { label: "Account Role",    value: "Student Author", sub: "Verified repository contributor",   icon: Sparkles,    color: "text-purple-400", hov: "hover:border-purple-500/25" },
            { label: "Security Status", value: "JWT Auth",        sub: "Protected identity token",          icon: ShieldCheck, color: "text-sky-400",    hov: "hover:border-sky-500/25"    },
          ].map(({ label, value, sub, icon: Icon, color, hov }) => (
            <div key={label}
                 className={`glass-light rounded-2xl p-6 border border-white/[0.07]
                             ${hov} transition-colors duration-150 space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="label-mono text-slate-500">{label}</span>
                <div className={`h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-white tracking-tight">{value}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Resource table ── */}
        <div className="glass-light rounded-2xl border border-white/[0.07] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">My Uploaded Resources</h2>
              <p className="text-xs text-slate-500">View, manage, or delete your contributions.</p>
            </div>
            <Badge className="rounded-full px-3 py-0.5 label-mono border-white/[0.08]
                              bg-[#111525] text-indigo-400 shadow-none">
              {resources.length} Items
            </Badge>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
              <p className="text-sm text-slate-500">Loading your resources…</p>
            </div>
          ) : error ? (
            <div className="m-5 p-4 rounded-xl bg-rose-500/8 border border-rose-500/20
                            text-rose-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={fetchUserResources}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md glass
                           border border-rose-500/20 text-rose-200 text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Retry
              </button>
            </div>
          ) : resources.length === 0 ? (
            <div className="py-20 text-center space-y-4 max-w-sm mx-auto px-4">
              <div className="h-12 w-12 rounded-2xl bg-[#111525] border border-white/[0.07]
                              flex items-center justify-center text-indigo-400 mx-auto">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Uploads Yet</h3>
                <p className="text-xs text-slate-500">Share notes or PYQs to help fellow students.</p>
              </div>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 h-9 px-5 rounded-full
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           text-white text-xs font-bold shadow-md shadow-indigo-500/20
                           border border-indigo-400/20 hover:from-indigo-500 hover:to-purple-500"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Upload First Resource
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Title & Subject", "Course & Semester", "Type", "Actions"].map((h, i) => (
                      <th key={h}
                          className={`py-3.5 px-5 label-mono text-slate-600 ${i === 3 ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {resources.map((item) => (
                    <tr key={item.id} className="hover:bg-[#111525]/60 transition-colors duration-100">
                      <td className="py-4 px-5">
                        <Link
                          href={`/resources/${item.id}`}
                          className="font-semibold text-white hover:text-indigo-400
                                     transition-colors flex items-center gap-1.5 group text-xs"
                        >
                          {item.title}
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100
                                                    transition-opacity text-indigo-400" />
                        </Link>
                        {item.subject && (
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <BookOpen className="h-2.5 w-2.5 text-indigo-400" />
                            {item.subject}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-xs font-medium text-white block">
                          {item.course || item.program || "General"}
                        </span>
                        {item.semester && (
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Layers className="h-2.5 w-2.5 text-indigo-400" />
                            Sem {item.semester}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        <Badge className="label-mono rounded-full px-2.5 py-0.5
                                          border-white/[0.08] bg-[#111525] text-indigo-400 shadow-none">
                          {item.resourceType || item.type || "Doc"}
                        </Badge>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/resources/${item.id}`}>
                            <button className="flex items-center gap-1 h-7 px-3 rounded-md
                                               glass border border-white/[0.08] text-xs font-medium
                                               text-slate-300 hover:text-white hover:border-indigo-500/25
                                               transition-colors cursor-pointer">
                              <Eye className="h-3 w-3 text-indigo-400" />
                              View
                            </button>
                          </Link>

                          {confirmDeleteId === item.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className="h-7 px-2.5 rounded-md bg-rose-600 hover:bg-rose-700
                                           text-white text-xs font-semibold cursor-pointer
                                           disabled:opacity-60 flex items-center gap-1"
                              >
                                {deletingId === item.id
                                  ? <Loader2 className="h-3 w-3 animate-spin" />
                                  : "Confirm"
                                }
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="h-7 px-2 rounded-md glass border border-white/[0.08]
                                           text-xs text-slate-400 hover:text-white cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(item.id)}
                              className="flex items-center gap-1 h-7 px-2.5 rounded-md
                                         text-rose-400 hover:bg-rose-500/10 hover:text-rose-300
                                         text-xs font-medium transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </Shell>
  );
}
