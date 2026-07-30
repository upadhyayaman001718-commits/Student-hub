interface DividerProps {
    text?: string;
}

export default function Divider({
    text = "OR",
}: DividerProps) {
    return (
        <div className="flex items-center gap-3 my-7">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 px-3 select-none">
                {text}
            </span>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
    );
}