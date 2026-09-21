interface DividerProps {
  text?: string;
}

export default function Divider({
  text = "OR",
}: DividerProps) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-white/10" />

      <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-slate-500 px-3 select-none">
        {text}
      </span>

      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}