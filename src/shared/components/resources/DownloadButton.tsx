"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  resourceId: number;
}

export default function DownloadButton({
  resourceId,
}: DownloadButtonProps) {

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${resourceId}/download`
      );

      const result = await response.json();

      console.log("🔥 DOWNLOAD API RESPONSE:", JSON.stringify(result, null, 2));
      if (!result.success) {
        throw new Error("Failed to generate download URL");
      }

      window.open(result.data.url, "_blank");

    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Button
      variant="accent"
      onClick={handleDownload}
      className="w-full h-13 rounded-full bg-[#B15F2C] hover:bg-[#9E5324] font-extrabold tracking-wide uppercase text-xs text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
    >
      <Download className="h-4.5 w-4.5" />
      Download PDF Resource
    </Button>
  );
}