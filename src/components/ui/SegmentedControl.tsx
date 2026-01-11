import { useMemo } from "react";

export interface SegmentedOption<T> {
  id: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[] | readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
}

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  label,
  className = "",
}: SegmentedControlProps<T>) => {
  const activeIndex = useMemo(() => {
    const index = options.findIndex((opt) => opt.id === value);
    return index >= 0 ? index : 0;
  }, [value, options]);

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block">
          {label}
        </label>
      )}
      <div className="relative flex bg-neutral-800 p-1 rounded-xl isolate">
        {/* Sliding Background */}
        <div
          className="absolute top-1 bottom-1 rounded-lg bg-neutral-600/50 shadow-sm border border-white/10 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-0"
          style={{
            width: `calc((100% - 8px) / ${options.length})`,
            left: `calc(4px + (100% - 8px) * ${activeIndex} / ${options.length})`,
          }}
        />
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`relative z-10 flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 outline-none
              ${
                value === opt.id
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
