import { Download } from "lucide-react";

export default function DownloadButton() {
    return (
        <button className="mt-8 w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-400 flex items-center justify-center gap-2">
            <Download size={18} />
            Download PDF
        </button>
    );
}