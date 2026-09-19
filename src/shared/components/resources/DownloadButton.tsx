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
    <div className="w-full space-y-2">
      <Button
        variant="accent"
        onClick={handleDownload}
        disabled={downloading}
        aria-label="Download PDF Resource"
        className="w-full h-13 rounded-full bg-[#B15F2C] hover:bg-[#9E5324] font-extrabold tracking-wide uppercase text-xs text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
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
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}