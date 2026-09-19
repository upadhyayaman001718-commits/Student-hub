"use client";

import { useEffect, useState, useRef } from "react";
import { FileText, Loader2, AlertCircle, RotateCcw, ExternalLink, Eye } from "lucide-react";
import PDFToolbar from "./PDFToolbar";
import { Button } from "@/components/ui/button";
import { getResourceFileUrl } from "@/lib/api";

interface PDFPreviewProps {
  resourceId: number;
  fileName?: string | null;
}

export default function PDFPreview({
  resourceId,
  fileName,
}: PDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [zoom, setZoom] = useState(100);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const fetchPDF = async () => {
    try {
      setLoading(true);
      setError(false);

      const result = await getResourceFileUrl(resourceId);

      if (!result.success || !result.data?.url) {
        throw new Error("Failed to generate PDF URL");
      }

      setPdfUrl(result.data.url);
    } catch (err) {
      console.error("PDF preview failed:", err);
      setError(true);
      setPdfUrl(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDF();
  }, [resourceId]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleRefresh = () => {
    setPdfUrl(null);
    fetchPDF();
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, "_blank");
  };

  const handleFullscreen = () => {
    if (pdfContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        pdfContainerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      ref={pdfContainerRef}
      className="rounded-[28px] border border-[#E2E0DB] bg-white overflow-hidden shadow-2xs flex flex-col"
    >
      <PDFToolbar
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRefresh={handleRefresh}
        onDownload={handleDownload}
        onFullscreen={handleFullscreen}
      />

      <div className="min-h-[500px] sm:min-h-[640px] bg-[#F1F0EE]/60 relative flex flex-col items-center justify-center overflow-hidden">
        {loading && (
          <div className="h-[500px] sm:h-[640px] flex flex-col items-center justify-center gap-3 text-[#666666]">
            <Loader2 className="h-8 w-8 animate-spin text-[#B15F2C]" />
            <p className="text-sm font-bold text-[#0A0A0A]">Loading PDF Document...</p>
            <p className="text-xs text-[#666666]">Fetching secure preview stream</p>
          </div>
        )}

        {!loading && error && (
          <div className="h-[500px] sm:h-[640px] flex flex-col items-center justify-center gap-4 p-8 text-center max-w-md">
            <div className="h-14 w-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B15F2C]">
              <AlertCircle className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-[#0A0A0A]">
                Unable to load inline preview
              </h4>
              <p className="mt-1 text-xs text-[#666666] leading-relaxed">
                We couldn&apos;t generate the inline document viewer. You can retry loading or download the file directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="rounded-full border-[#E2E0DB] bg-white hover:bg-[#F1F0EE] text-xs font-bold gap-2"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#B15F2C]" />
                Retry Preview
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && pdfUrl && (
          <div
            className="w-full h-[640px] transition-transform duration-200 origin-top overflow-auto"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title={fileName ? `PDF Preview - ${fileName}` : "Resource Document Viewer"}
            />
          </div>
        )}
      </div>
    </div>
  );
}