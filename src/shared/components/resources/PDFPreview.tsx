"use client";
import { useEffect, useState, useRef } from "react";
import { FileText } from "lucide-react";
import PDFToolbar from "./PDFToolbar";

interface PDFPreviewProps {
  resourceId: number;
}

export default function PDFPreview({
  resourceId,
}: PDFPreviewProps) {

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const fetchPDF = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/resources/${resourceId}/file`
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed to generate PDF URL");
      }

      setPdfUrl(result.data.url);
    } catch (error) {
      console.error("PDF preview failed:", error);
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
    pdfContainerRef.current?.requestFullscreen();
  };
  return (
    <div
      ref={pdfContainerRef}
      className="rounded-[28px] border border-[#E2E0DB] bg-white overflow-hidden shadow-2xs"
    >
      <PDFToolbar
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRefresh={handleRefresh}
        onDownload={handleDownload}
        onFullscreen={handleFullscreen}
      />

      <div className="min-h-[500px] sm:min-h-[640px] bg-[#F1F0EE]/60 relative overflow-hidden">

        {loading && (
          <div className="h-[500px] sm:h-[640px] flex items-center justify-center">
            <p>Loading PDF...</p>
          </div>
        )}

        {!loading && !pdfUrl && (
          <div className="h-[500px] sm:h-[640px] flex items-center justify-center">
            <p>Failed to load PDF.</p>
          </div>
        )}

        {pdfUrl && (
          <iframe
            src={pdfUrl ?? undefined}
            className="w-full h-[640px] border-0"
            title="PDF Preview"
          />
        )}

      </div>
    </div>
  );
}