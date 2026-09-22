interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-6 space-y-1.5 text-center">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
        {title}
      </h1>
      <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
