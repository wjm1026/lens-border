import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  align?: "left" | "right" | "center";
  direction?: "up" | "down";
}

export default function ColorPicker({
  color,
  onChange,
  label,
  align = "left",
  direction = "down",
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popover.current && !popover.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getAlignClass = () => {
    switch (align) {
      case "right":
        return "right-0";
      case "center":
        return "left-1/2 -translate-x-1/2";
      default:
        return "left-0";
    }
  };

  const getDirectionClass = () => {
    return direction === "up" ? "bottom-full mb-2" : "top-full mt-2";
  };

  return (
    <div className="relative inline-block" ref={popover}>
      {/* 颜色预览按钮 - 圆形苹果风格 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full border-2 border-neutral-700/50 hover:border-neutral-500 transition-all cursor-pointer shadow-lg hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: color }}
      />

      {label && (
        <span className="text-[10px] text-neutral-500 mt-1 block">{label}</span>
      )}

      {/* 颜色选择器弹出框 - 苹果风格 */}
      {isOpen && (
        <div
          className={`absolute z-[100] ${getDirectionClass()} ${getAlignClass()}`}
        >
          <div className="p-2.5 bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 w-[160px]">
            {/* 颜色选择区域 */}
            <div className="rounded-xl overflow-hidden">
              <HexColorPicker
                color={color}
                onChange={onChange}
                style={{ width: "100%", height: "100px" }}
              />
            </div>

            {/* Hex 输入 - 极简风格 */}
            <div className="mt-2 flex items-center bg-neutral-800/80 rounded-lg px-2 py-1.5">
              <span className="text-neutral-500 text-[10px]">#</span>
              <input
                type="text"
                value={color.replace("#", "")}
                onChange={(e) => {
                  const hex = e.target.value
                    .replace(/[^0-9A-Fa-f]/g, "")
                    .slice(0, 6);
                  if (hex.length <= 6) {
                    onChange(`#${hex}`);
                  }
                }}
                className="flex-1 bg-transparent text-neutral-200 text-[11px] px-1 outline-none uppercase font-mono tracking-wider"
                maxLength={6}
              />
            </div>

            {/* 预设颜色 - 小圆点 */}
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {[
                "#ffffff",
                "#000000",
                "#f43f5e",
                "#f97316",
                "#eab308",
                "#22c55e",
                "#3b82f6",
                "#8b5cf6",
                "#ec4899",
                "#6b7280",
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => onChange(c)}
                  className={`w-5 h-5 rounded-full transition-all duration-150 ${
                    color.toLowerCase() === c.toLowerCase()
                      ? "ring-2 ring-white/60 ring-offset-1 ring-offset-neutral-900 scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
