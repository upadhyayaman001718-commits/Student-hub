"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { useAuth } from "@/shared/context/AuthContext";
import { getMyResources, deleteResource, Resource } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderCheck,
  FileText,
  Trash2,
  Eye,
  PlusCircle,
  Loader2,
  AlertCircle,
  UserCheck,
  LogIn,
  Layers,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const fetchUserResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMyResources();
      if (res.success && res.data) {
        setResources(res.data);
      }
    } catch (err: any) {
      console.error("Error fetching my resources:", err);
      setError(err?.message || "Failed to load your resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserResources();
    } else if (!authLoading) {
      setLoading(false);
    }
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
      console.error("Failed to delete resource:", err);
      alert(err?.message || "Delete operation failed.");
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100">
        <Navbar />
        <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          <p className="text-sm font-extrabold text-white">Verifying session state...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

        <Navbar />
        <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-16 sm:py-24 flex items-center justify-center relative z-10">
          <div className="max-w-md w-full bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl">
            <div className="h-16 w-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Authentication Required</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Please log in to access your personal resource dashboard and manage your uploaded materials.
              </p>
            </div>
            <Link href="/login" className="block w-full">
              <Button className="w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 text-white rounded-full font-extrabold text-xs uppercase tracking-wider gap-2 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 cursor-pointer">
                <LogIn className="h-4 w-4" />
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-16 space-y-8 relative z-10">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-[11px] font-mono font-extrabold uppercase tracking-widest text-indigo-400">
              <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
              Authenticated Contributor
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">{user?.name || "Student"}</span>
            </h1>
            <p className="text-sm text-slate-400">
              Manage and track all academic resources uploaded under your account.
            </p>
          </div>

          <Link href="/upload">
            <Button
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 text-white rounded-full h-12 px-6 font-extrabold text-xs uppercase tracking-wider gap-2 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 shrink-0 cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              Upload New Resource
            </Button>
          </Link>
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-2 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-400">
                Total Uploads
              </span>
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FolderCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{resources.length}</p>
            <p className="text-[11px] text-slate-400 font-medium">Resources live in community catalog</p>
          </div>

          <div className="bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-2 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-400">
                Account Role
              </span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-white capitalize tracking-tight">Student Author</p>
            <p className="text-[11px] text-slate-400 font-medium">Verified repository contributor</p>
          </div>

          <div className="bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-2 hover:border-sky-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-400">
                Security Status
              </span>
              <div className="h-9 w-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-white tracking-tight">JWT Authenticated</p>
            <p className="text-[11px] text-slate-400 font-medium">Protected user identity token</p>
          </div>
        </div>

        {/* Resources Table / List Section */}
        <div className="bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white">My Uploaded Resources</h2>
              <p className="text-xs text-slate-400">
                View, manage, or delete items contributed to Student Hub.
              </p>
            </div>
            <Badge className="rounded-full px-3.5 py-1 text-xs font-mono font-extrabold border-white/10 bg-[#161A29] text-indigo-400 shadow-none">
              {resources.length} Items
            </Badge>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="h-7 w-7 animate-spin text-indigo-400" />
              <p className="text-sm font-extrabold text-white">Loading your resources...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              <Button size="sm" variant="outline" onClick={fetchUserResources} className="rounded-full text-xs font-bold border-rose-500/30 text-rose-200 cursor-pointer">
                Retry
              </Button>
            </div>
          ) : resources.length === 0 ? (
            <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
              <div className="h-16 w-16 rounded-full bg-[#161A29] border border-white/10 flex items-center justify-center text-indigo-400 mx-auto shadow-inner">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white">No Uploaded Resources Yet</h3>
                <p className="text-xs text-slate-400">
                  You haven&apos;t uploaded any study materials yet. Start sharing notes or PYQs to help fellow students!
                </p>
              </div>
              <Link href="/upload" className="inline-block pt-2">
                <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 text-white rounded-full font-extrabold text-xs uppercase tracking-wider px-6 h-11 gap-2 shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
                  <PlusCircle className="h-4 w-4" />
                  Upload First Resource
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4">Title & Subject</th>
                    <th className="py-3.5 px-4">Course & Semester</th>
                    <th className="py-3.5 px-4">Format / Type</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {resources.map((item) => (
                    <tr key={item.id} className="hover:bg-[#161A29]/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">
                        <div className="space-y-0.5">
                          <Link href={`/resources/${item.id}`} className="font-extrabold text-white hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
                            <span>{item.title}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                          </Link>
                          {item.subject && (
                            <p className="text-xs text-slate-400 font-normal flex items-center gap-1">
                              <BookOpen className="h-3 w-3 text-indigo-400" />
                              {item.subject}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-slate-400">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-white block">{item.course || item.program || "General"}</span>
                          {item.semester && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                              <Layers className="h-3 w-3 text-indigo-400" />
                              Semester {item.semester}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold">
                        <Badge className="rounded-full px-3 py-1 border-white/10 bg-[#161A29] font-mono text-[10px] text-indigo-400 uppercase tracking-wider shadow-none">
                          {item.resourceType || item.type || "Document"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/resources/${item.id}`}>
                            <Button size="sm" variant="outline" className="h-9 px-3.5 rounded-full border-white/10 bg-[#161A29] hover:bg-[#1E2235] hover:border-indigo-500/30 text-xs font-extrabold gap-1.5 text-slate-200 cursor-pointer transition-colors">
                              <Eye className="h-3.5 w-3.5 text-indigo-400" />
                              View
                            </Button>
                          </Link>

                          {confirmDeleteId === item.id ? (
                            <div className="flex items-center gap-1.5 animate-in fade-in">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className="h-9 px-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold gap-1 cursor-pointer"
                              >
                                {deletingId === item.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  "Confirm"
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setConfirmDeleteId(null)}
                                className="h-9 px-2.5 rounded-full border-white/10 bg-[#161A29] text-xs font-extrabold text-slate-300 cursor-pointer"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setConfirmDeleteId(item.id)}
                              className="h-9 px-3 rounded-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-extrabold gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </Button>
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
      </main>

      <Footer />
    </div>
  );
}
