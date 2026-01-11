import type { FC } from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

export const Toggle: FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  id,
  className = "",
}) => {
  const inputId = id || `toggle-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <label
        className="text-xs font-semibold text-neutral-400 uppercase tracking-widest cursor-pointer select-none"
        htmlFor={inputId}
      >
        {label}
      </label>
      <label className="relative inline-flex items-center cursor-pointer isolate">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors duration-300 shadow-inner"></div>
      </label>
    </div>
  );
};
