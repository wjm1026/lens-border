import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { FONT_OPTIONS } from "../../../../types";
import { Slider } from "../../../ui/Slider";

interface InfoLineStyleCardProps {
  title: string;
  fontId: string;
  onFontIdChange: (id: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  maxFontSize: number;
  children?: ReactNode;
}

export function InfoLineStyleCard({
  title,
  fontId,
  onFontIdChange,
  fontSize,
  onFontSizeChange,
  maxFontSize,
  children,
}: InfoLineStyleCardProps) {
  return (
    <div className="space-y-6 p-4 bg-neutral-800/40 rounded-2xl border border-neutral-800/50">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          {title}
        </span>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">
          字体
        </label>
        <div className="relative">
          <select
            value={fontId}
            onChange={(e) => onFontIdChange(e.target.value)}
            className="w-full py-2 px-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-300 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 transition-colors"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
        </div>
      </div>

      <Slider
        label="字号"
        value={fontSize}
        min={10}
        max={maxFontSize}
        onChange={onFontSizeChange}
        unit="px"
      />

      {children}
    </div>
  );
}
