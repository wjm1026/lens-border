import type { FC } from "react";
import type { FrameSettings } from "../../../types";
import { SegmentedControl } from "../../ui/SegmentedControl";
import { Slider } from "../../ui/Slider";

interface ExportTabProps {
  settings: FrameSettings;
  update: <K extends keyof FrameSettings>(
    key: K,
    value: FrameSettings[K]
  ) => void;
}

export const ExportTab: FC<ExportTabProps> = ({ settings, update }) => {
  return (
    <div className="h-full flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out">
      <div className="space-y-10">
        <SegmentedControl
          label="导出格式"
          value={settings.exportFormat}
          onChange={(val) => update("exportFormat", val)}
          options={[
            { id: "png", label: "PNG" },
            { id: "jpeg", label: "JPEG" },
          ]}
        />

        {settings.exportFormat === "jpeg" && (
          <Slider
            label="图片质量"
            value={settings.exportQuality}
            min={0.1}
            max={1}
            step={0.05}
            onChange={(val) => update("exportQuality", val)}
          />
        )}
      </div>

      <div className="space-y-2 text-center pb-8 opacity-40">
        <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest">
          Export Options
        </p>
        <p className="text-[9px] text-neutral-600">支持高分辨率无损导出</p>
      </div>
    </div>
  );
};
