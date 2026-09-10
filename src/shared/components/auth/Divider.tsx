interface DividerProps {
  text?: string;
}

export default function Divider({
  text = "OR",
}: DividerProps) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-slate-200" />

      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-3 select-none">
        {text}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}