import type { FC } from "react";
import type { FrameSettings } from "../../../types";
import { Slider } from "../../ui/Slider";
import ColorPicker from "../../ColorPicker";

interface FrameTabProps {
  settings: FrameSettings;
  update: <K extends keyof FrameSettings>(
    key: K,
    value: FrameSettings[K]
  ) => void;
}

export const FrameTab: FC<FrameTabProps> = ({ settings, update }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out">
      {/* 圆角 */}
      <Slider
        label="边框圆角"
        value={settings.borderRadius}
        min={0}
        max={100}
        onChange={(val) => update("borderRadius", val)}
        unit="px"
      />

      <div className="border-t border-neutral-800" />

      {/* 阴影 */}
      <div className="space-y-6">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block">
          阴影参数
        </span>

        <Slider
          label="大小"
          value={settings.shadowSize}
          min={0}
          max={100}
          onChange={(val) => update("shadowSize", val)}
          unit="px"
        />

        <Slider
          label="透明度"
          value={Math.round(settings.shadowOpacity * 100)}
          min={0}
          max={100}
          step={1}
          onChange={(val) => update("shadowOpacity", val / 100)}
          unit="%"
        />
      </div>

      <div className="border-t border-neutral-800" />

      {/* 边框 */}
      <div className="space-y-6">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block">
          边框外观
        </span>

        <Slider
          label="宽度"
          value={settings.borderWidth}
          min={0}
          max={20}
          onChange={(val) => update("borderWidth", val)}
          unit="px"
        />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
            颜色
          </span>
          <ColorPicker
            color={settings.borderColor}
            onChange={(color) => update("borderColor", color)}
            align="right"
            direction="up"
          />
        </div>
      </div>
    </div>
  );
};
