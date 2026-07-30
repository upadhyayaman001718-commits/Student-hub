import { Download, Maximize2, ZoomIn, ZoomOut } from "lucide-react";

export default function PDFToolbar() {
    return (
        <div className="flex items-center justify-between border-b border-white/10 bg-[#18181B] px-4 py-3">
            <div className="flex items-center gap-3">
                <button className="rounded-lg p-2 hover:bg-white/10 transition">
                    <ZoomOut className="h-4 w-4" />
                </button>

                <span className="text-sm text-zinc-400">
                    100%
                </span>

                <button className="rounded-lg p-2 hover:bg-white/10 transition">
                    <ZoomIn className="h-4 w-4" />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button className="rounded-lg p-2 hover:bg-white/10 transition">
                    <Download className="h-4 w-4" />
                </button>

                <button className="rounded-lg p-2 hover:bg-white/10 transition">
                    <Maximize2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}