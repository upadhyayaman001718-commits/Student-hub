import { LucideIcon } from "lucide-react";

interface MetadataCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

export default function MetadataCard({
    icon: Icon,
    label,
    value,
}: MetadataCardProps) {
    return (
        <div className="rounded-xl
border
border-white/10
bg-[#0F0F11]
p-4
transition-all
duration-300
hover:-translate-y-1
hover:border-sky-500/40
hover:shadow-lg
">

            <Icon className="h-5 w-5 text-sky-400" />

            <p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">
                {label}
            </p>

            <p className="mt-1 font-semibold text-white">
                {value}
            </p>

        </div>
    );
}