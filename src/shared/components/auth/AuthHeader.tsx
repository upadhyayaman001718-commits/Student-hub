interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 space-y-2 text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug">
        {title}
      </h1>

      <p className="text-sm sm:text-base leading-relaxed text-slate-500 font-normal max-w-xs mx-auto">
        {subtitle}
      </p>
    </div>
  );
}