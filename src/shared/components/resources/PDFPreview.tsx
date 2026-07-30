import { FileText } from "lucide-react";
import PDFToolbar from "./PDFToolbar";

export default function PDFPreview() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#18181B] overflow-hidden">
            <PDFToolbar />

            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <FileText className="text-[#0EA5E9]" />
                    <h2 className="font-semibold text-lg">
                        PDF Preview
                    </h2>
                </div>

                <span className="text-xs text-zinc-500">
                    Your document will appear here.
                </span>

            </div>

        </div>
    );
}