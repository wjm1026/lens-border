import type { FC } from "react";
import type { FrameSettings } from "../../../types";
import { Slider } from "../../ui/Slider";
import { SegmentedControl } from "../../ui/SegmentedControl";

interface LayoutTabProps {
  settings: FrameSettings;
  update: <K extends keyof FrameSettings>(
    key: K,
    value: FrameSettings[K]
  ) => void;
}

export const LayoutTab: FC<LayoutTabProps> = ({ settings, update }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out">
      <Slider
        label="画布外边距"
        value={settings.padding}
        min={0}
        max={200}
        onChange={(val) => update("padding", val)}
        unit="px"
      />

      <SegmentedControl
        label="容器比例"
        value={settings.aspectRatio}
        onChange={(val) => update("aspectRatio", val)}
        options={[
          { id: "original", label: "适应" },
          { id: "square", label: "1:1" },
          { id: "portrait", label: "3:4" },
          { id: "landscape", label: "4:3" },
        ]}
      />
    </div>
  );
};
