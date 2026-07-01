type IsoLabelVisualProps = {
  label?: string;
  className?: string;
};

export function IsoLabelVisual({ label, className = "" }: IsoLabelVisualProps) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950 text-white ${className}`}
      aria-hidden
    >
      <span className="text-3xl font-black tracking-[0.35em] text-emerald-400 sm:text-4xl">
        ISO
      </span>
      {label ? (
        <span className="mt-2 text-4xl font-bold tabular-nums tracking-wide sm:text-5xl">
          {label}
        </span>
      ) : null}
    </div>
  );
}
