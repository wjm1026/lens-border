import type { FC } from "react";
import type { FrameSettings } from "../../../types";
import { SegmentedControl } from "../../ui/SegmentedControl";
import { Slider } from "../../ui/Slider";
import ColorPicker from "../../ColorPicker";

interface BackgroundTabProps {
  settings: FrameSettings;
  update: <K extends keyof FrameSettings>(
    key: K,
    value: FrameSettings[K]
  ) => void;
}

const PRESET_GRADIENTS = [
  { start: "#4facfe", end: "#00f2fe" },
  { start: "#a18cd1", end: "#fbc2eb" },
  { start: "#ff9a9e", end: "#fecfef" },
  { start: "#fbc2eb", end: "#a6c1ee" },
  { start: "#667eea", end: "#764ba2" },
  { start: "#f093fb", end: "#f5576c" },
  { start: "#4facfe", end: "#84fab0" },
  { start: "#fa709a", end: "#fee140" },
  { start: "#30cfd0", end: "#330867" },
  { start: "#f8b500", end: "#ff6b6b" },
  { start: "#000000", end: "#434343" },
  { start: "#ece9e6", end: "#ffffff" },
];

export const BackgroundTab: FC<BackgroundTabProps> = ({ settings, update }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out pb-8">
      <SegmentedControl
        label="背景填充类型"
        value={settings.backgroundType}
        onChange={(val) => update("backgroundType", val)}
        options={[
          { id: "color", label: "纯色" },
          { id: "gradient", label: "渐变" },
          { id: "blur", label: "模糊" },
        ]}
      />

      {settings.backgroundType === "color" && (
        <div className="pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              填充颜色
            </label>
            <ColorPicker
              color={settings.backgroundColor}
              onChange={(color) => update("backgroundColor", color)}
              align="right"
            />
          </div>
        </div>
      )}

      {settings.backgroundType === "gradient" && (
        <div className="space-y-6">
          {/* 渐变预览 + 角度控制 */}
          <div className="space-y-4">
            <div
              className="h-12 rounded-2xl w-full shadow-inner relative overflow-hidden"
              style={{
                background: `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientStartColor} 0%, ${settings.gradientEndColor} 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/90 text-[11px] font-bold drop-shadow-md backdrop-blur-md bg-black/20 px-3 py-1 rounded-full uppercase tracking-widest cursor-default">
                  {settings.gradientAngle}°
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="360"
              value={settings.gradientAngle}
              onChange={(e) => {
                const angle = Number(e.target.value);
                update("gradientAngle", angle);
                update(
                  "backgroundGradient",
                  `${angle}deg, ${settings.gradientStartColor} 0%, ${settings.gradientEndColor} 100%`
                );
              }}
              className="w-full h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex items-start justify-center gap-8">
            <div className="text-center group">
              <ColorPicker
                color={settings.gradientStartColor}
                onChange={(color) => {
                  update("gradientStartColor", color);
                  update(
                    "backgroundGradient",
                    `${settings.gradientAngle}deg, ${color} 0%, ${settings.gradientEndColor} 100%`
                  );
                }}
              />
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mt-2 block group-hover:text-neutral-400 transition-colors">
                起始
              </span>
            </div>

            <div className="text-neutral-750 pt-3">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>

            <div className="text-center group">
              <ColorPicker
                color={settings.gradientEndColor}
                onChange={(color) => {
                  update("gradientEndColor", color);
                  update(
                    "backgroundGradient",
                    `${settings.gradientAngle}deg, ${settings.gradientStartColor} 0%, ${color} 100%`
                  );
                }}
                align="right"
              />
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mt-2 block group-hover:text-neutral-400 transition-colors">
                结束
              </span>
            </div>
          </div>

          {/* 预设渐变 */}
          <div className="pt-6">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-8">
              预设渐变
            </label>
            <div className="flex flex-wrap gap-x-5 gap-y-6">
              {PRESET_GRADIENTS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    update("gradientStartColor", preset.start);
                    update("gradientEndColor", preset.end);
                    update(
                      "backgroundGradient",
                      `${settings.gradientAngle}deg, ${preset.start} 0%, ${preset.end} 100%`
                    );
                  }}
                  className={`w-7 h-7 rounded-full transition-all duration-300 outline-none shadow-sm ${
                    settings.gradientStartColor === preset.start &&
                    settings.gradientEndColor === preset.end
                      ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-neutral-900 scale-110"
                      : "hover:scale-115 hover:shadow-xl"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${preset.start} 0%, ${preset.end} 100%)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {settings.backgroundType === "blur" && (
        <div className="space-y-4 pt-4">
          <Slider
            label="模糊强度"
            value={settings.blurAmount}
            min={0}
            max={100}
            onChange={(val) => update("blurAmount", val)}
            unit="px"
          />
        </div>
      )}

      <div className="space-y-4 pt-8 border-t border-neutral-800">
        <Slider
          label="背景亮度"
          value={settings.backgroundBrightness}
          min={20}
          max={200}
          onChange={(val) => update("backgroundBrightness", val)}
          unit="%"
        />
        <div className="flex justify-between text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
          <span>较暗</span>
          <span>常规</span>
          <span>较亮</span>
        </div>
      </div>
    </div>
  );
};
