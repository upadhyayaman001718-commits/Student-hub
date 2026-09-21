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
    <div className="h-14 border-b border-white/10 bg-[#0F121E]/90 backdrop-blur-md flex items-center justify-between px-4 text-slate-200">

      {/* Zoom controls */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          disabled={zoom <= 50}
          className="h-8 w-8 rounded-full hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 disabled:opacity-30 cursor-pointer"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="text-xs font-mono font-extrabold text-indigo-400 bg-[#161A29] px-3 py-1 rounded-full border border-white/10 min-w-[60px] text-center shadow-inner">
          {zoom}%
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          disabled={zoom >= 200}
          className="h-8 w-8 rounded-full hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 disabled:opacity-30 cursor-pointer"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Action controls */}
      <div className="flex items-center gap-1">

        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="h-8 w-8 rounded-full hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 transition-colors cursor-pointer"
          aria-label="Reload preview"
          title="Reload preview"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onDownload}
          className="h-8 w-8 rounded-full hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 transition-colors cursor-pointer"
          aria-label="Open original file"
          title="Open original file"
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreen}
          className="h-8 w-8 rounded-full hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 transition-colors cursor-pointer"
          aria-label="Toggle Fullscreen"
          title="Toggle Fullscreen"
        >
          <Maximize className="h-4 w-4" />
        </Button>

      </div>
    </div>
  );
}