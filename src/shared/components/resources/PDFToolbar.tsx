"use client";

import { Minus, Plus, RefreshCw, Download, Maximize } from "lucide-react";

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
  const iconBtn = `h-7 w-7 flex items-center justify-center rounded-lg
                   text-slate-400 hover:text-white hover:bg-white/8
                   transition-colors duration-150 cursor-pointer`;

  return (
    <div className="h-11 border-b border-white/[0.06] bg-[#0C0F1C]/90 backdrop-blur-md
                    flex items-center justify-between px-4">
      {/* Zoom controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onZoomOut}
          disabled={zoom <= 50}
          className={iconBtn + " disabled:opacity-30 disabled:cursor-not-allowed"}
          aria-label="Zoom out"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="label-mono text-indigo-400 bg-[#111525] px-2.5 py-0.5 rounded-md
                         border border-white/[0.07] min-w-[52px] text-center">
          {zoom}%
        </span>
        <button
          onClick={onZoomIn}
          disabled={zoom >= 200}
          className={iconBtn + " disabled:opacity-30 disabled:cursor-not-allowed"}
          aria-label="Zoom in"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Action controls */}
      <div className="flex items-center gap-1">
        <button onClick={onRefresh}    className={iconBtn} aria-label="Reload preview"    title="Reload">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
        <button onClick={onDownload}   className={iconBtn} aria-label="Open file"         title="Download">
          <Download  className="h-3.5 w-3.5" />
        </button>
        <button onClick={onFullscreen} className={iconBtn} aria-label="Toggle fullscreen" title="Fullscreen">
          <Maximize  className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
