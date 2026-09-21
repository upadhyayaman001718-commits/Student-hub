"use client";

import { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResourceDownloadUrl } from "@/lib/api";

interface DownloadButtonProps {
  resourceId: number;
  fileName?: string | null;
}

export default function DownloadButton({
  resourceId,
  fileName,
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setError(null);

      const result = await getResourceDownloadUrl(resourceId);

      if (!result.success || !result.data?.url) {
        throw new Error("Failed to generate download URL");
      }

      // Trigger download or open URL in browser tab
      const link = document.createElement("a");
      link.href = result.data.url;
      if (fileName) {
        link.download = fileName;
      }
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error("Download failed:", err);
      setError(err?.message || "Failed to download file. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <Button
        onClick={handleDownload}
        disabled={downloading}
        aria-label="Download PDF Resource"
        className="w-full h-13 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 font-extrabold tracking-wider uppercase text-xs text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
      >
        {downloading ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
            Preparing Download...
          </>
        ) : (
          <>
            <Download className="h-4.5 w-4.5" />
            Download Resource
          </>
        )}
      </Button>

      {error && (
        <div className="flex items-center gap-2.5 text-xs text-rose-300 bg-rose-500/10 p-3.5 rounded-2xl border border-rose-500/20 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}