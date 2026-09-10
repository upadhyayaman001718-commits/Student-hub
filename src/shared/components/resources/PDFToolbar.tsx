"use client";

import { Minus, Plus, RefreshCw, Download, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRefresh: () => void;
  onDownload: () => void;
  onFullscreen: () => void;
}

export default function PDFToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onRefresh,
  onDownload,
  onFullscreen,
}: PDFToolbarProps) {
  return (
    <div className="h-14 border-b border-[#E2E0DB] bg-white flex items-center justify-between px-4">

      {/* Zoom controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          disabled={zoom <= 50}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="text-sm font-bold min-w-[50px] text-center">
          {zoom}%
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          disabled={zoom >= 200}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Other controls */}
      <div className="flex items-center gap-2">

        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreen}
        >
          <Maximize className="h-4 w-4" />
        </Button>

      </div>
    </div>
  );
}