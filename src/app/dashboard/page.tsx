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
      <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A]">
        <Navbar />
        <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#B15F2C]" />
          <p className="text-sm font-bold text-[#666666]">Verifying session state...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A]">
        <Navbar />
        <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-16 sm:py-24 flex items-center justify-center">
          <div className="max-w-md w-full bg-white border border-[#E2E0DB] p-8 sm:p-10 rounded-[32px] text-center space-y-6 shadow-xs">
            <div className="h-16 w-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B15F2C] mx-auto">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#0A0A0A]">Authentication Required</h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                Please log in to access your personal resource dashboard and manage your uploaded materials.
              </p>
            </div>
            <Link href="/login" className="block w-full">
              <Button className="w-full h-12 bg-[#B15F2C] hover:bg-[#9E5324] text-white rounded-full font-bold text-xs uppercase tracking-wider gap-2">
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
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] relative overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-12 sm:py-16 space-y-10 relative z-10">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-[#E2E0DB] p-8 rounded-[32px] shadow-2xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F1F0EE] border border-[#E2E0DB] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#B15F2C]">
              <UserCheck className="h-3.5 w-3.5" />
              Authenticated Contributor
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] tracking-tight">
              Welcome back, <span className="text-[#B15F2C]">{user?.name || "Student"}</span>
            </h1>
            <p className="text-sm text-[#666666]">
              Manage and track all academic resources uploaded under your account.
            </p>
          </div>

          <Link href="/upload">
            <Button
              variant="accent"
              className="bg-[#B15F2C] hover:bg-[#9E5324] text-white rounded-full h-12 px-6 font-bold text-xs uppercase tracking-wider gap-2 shadow-sm shrink-0 cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              Upload New Resource
            </Button>
          </Link>
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E0DB] p-6 rounded-[24px] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666666]">
                Total Uploads
              </span>
              <div className="h-9 w-9 rounded-full bg-[#B15F2C]/10 flex items-center justify-center text-[#B15F2C]">
                <FolderCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#0A0A0A]">{resources.length}</p>
            <p className="text-[11px] text-[#666666] font-medium">Resources live in community catalog</p>
          </div>

          <div className="bg-white border border-[#E2E0DB] p-6 rounded-[24px] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666666]">
                Account Role
              </span>
              <div className="h-9 w-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-[#0A0A0A] capitalize">Student Author</p>
            <p className="text-[11px] text-[#666666] font-medium">Verified repository contributor</p>
          </div>

          <div className="bg-white border border-[#E2E0DB] p-6 rounded-[24px] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#666666]">
                Security Status
              </span>
              <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-[#0A0A0A]">JWT Authenticated</p>
            <p className="text-[11px] text-[#666666] font-medium">Protected user identity token</p>
          </div>
        </div>

        {/* Resources Table / List Section */}
        <div className="bg-white border border-[#E2E0DB] rounded-[32px] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F1F0EE] pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0A0A0A]">My Uploaded Resources</h2>
              <p className="text-xs text-[#666666]">
                View, manage, or delete items contributed to Student Hub.
              </p>
            </div>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-bold border-[#E2E0DB] bg-[#F1F0EE]">
              {resources.length} Items
            </Badge>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#666666]">
              <Loader2 className="h-7 w-7 animate-spin text-[#B15F2C]" />
              <p className="text-sm font-bold text-[#0A0A0A]">Loading your resources...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
              <Button size="sm" variant="outline" onClick={fetchUserResources} className="rounded-full text-xs font-bold border-red-300">
                Retry
              </Button>
            </div>
          ) : resources.length === 0 ? (
            <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
              <div className="h-16 w-16 rounded-full bg-[#F1F0EE] border border-[#E2E0DB] flex items-center justify-center text-[#666666] mx-auto">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[#0A0A0A]">No Uploaded Resources Yet</h3>
                <p className="text-xs text-[#666666]">
                  You haven&apos;t uploaded any study materials yet. Start sharing notes or PYQs to help fellow students!
                </p>
              </div>
              <Link href="/upload" className="inline-block pt-2">
                <Button variant="accent" className="bg-[#B15F2C] hover:bg-[#9E5324] text-white rounded-full font-bold text-xs uppercase tracking-wider px-6 h-11 gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Upload First Resource
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#F1F0EE] text-[11px] font-extrabold uppercase tracking-wider text-[#666666]">
                    <th className="py-3 px-4">Title & Subject</th>
                    <th className="py-3 px-4">Course & Semester</th>
                    <th className="py-3 px-4">Format / Type</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F0EE] text-sm">
                  {resources.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F1F0EE]/40 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#0A0A0A]">
                        <div className="space-y-0.5">
                          <Link href={`/resources/${item.id}`} className="font-extrabold text-[#0A0A0A] hover:text-[#B15F2C] transition-colors flex items-center gap-1.5 group">
                            <span>{item.title}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B15F2C]" />
                          </Link>
                          {item.subject && (
                            <p className="text-xs text-[#666666] font-normal flex items-center gap-1">
                              <BookOpen className="h-3 w-3 text-[#B15F2C]" />
                              {item.subject}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-[#666666]">
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#0A0A0A] block">{item.course || item.program || "General"}</span>
                          {item.semester && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#666666]">
                              <Layers className="h-3 w-3 text-[#B15F2C]" />
                              Semester {item.semester}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold">
                        <Badge variant="outline" className="rounded-full px-3 py-1 border-[#E2E0DB] bg-white font-extrabold text-[10px] text-[#0A0A0A] uppercase tracking-wider">
                          {item.resourceType || item.type || "Document"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/resources/${item.id}`}>
                            <Button size="sm" variant="outline" className="h-9 px-3 rounded-full border-[#E2E0DB] hover:bg-[#F1F0EE] text-xs font-bold gap-1 text-[#0A0A0A]">
                              <Eye className="h-3.5 w-3.5 text-[#B15F2C]" />
                              View
                            </Button>
                          </Link>

                          {confirmDeleteId === item.id ? (
                            <div className="flex items-center gap-1 animate-in fade-in">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className="h-9 px-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold gap-1"
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
                                className="h-9 px-2.5 rounded-full border-[#E2E0DB] text-xs font-bold"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setConfirmDeleteId(item.id)}
                              className="h-9 px-3 rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-bold gap-1 cursor-pointer"
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
