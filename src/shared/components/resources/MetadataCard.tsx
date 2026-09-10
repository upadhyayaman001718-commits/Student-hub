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
    <div className="rounded-2xl border border-[#E2E0DB] bg-[#F1F0EE] p-4 transition-all duration-200 hover:border-[#B15F2C]/30">
      <div className="flex items-center gap-1.5 text-[#B15F2C]">
        <Icon className="h-4 w-4" />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#666666]">
          {label}
        </span>
      </div>

      <p className="mt-1.5 font-extrabold text-[#0A0A0A] text-sm truncate">
        {value}
      </p>
    </div>
  );
}