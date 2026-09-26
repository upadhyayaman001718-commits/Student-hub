import UploadForm from "@/shared/components/upload/UploadForm";
import UploadTips from "@/shared/components/upload/UploadTips";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Container from "@/shared/components/layout/Container";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[400px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1">
        <section className="py-20 md:py-28">
          <Container>
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 rounded-full
                              bg-indigo-500/8 border border-indigo-500/15
                              px-3.5 py-1 label-mono text-indigo-400 mb-5">
                <UploadCloud className="h-3 w-3" />
                Community Contributions
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
                Upload a Resource
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                Contribute notes, previous year papers, or lab manuals to help students across programmes.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 glass-light rounded-2xl p-6 sm:p-8 border border-white/[0.07]">
                <UploadForm />
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-20">
                <UploadTips />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
