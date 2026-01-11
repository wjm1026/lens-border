import type { Dispatch, FC, SetStateAction } from "react";
import type { FrameSettings } from "../../../types";
import CameraSelector from "../../CameraSelector";
import ColorPicker from "../../ColorPicker";
import { Slider } from "../../ui/Slider";
import { Toggle } from "../../ui/Toggle";
import { SegmentedControl } from "../../ui/SegmentedControl";
import { RotateCcw } from "lucide-react";
import type { CameraPreset } from "../../../data/cameraPresets";
import { normalizeCameraModel } from "../../../utils/exif";
import { InfoLineStyleCard } from "./info/InfoLineStyleCard";

interface InfoTabProps {
  settings: FrameSettings;
  update: <K extends keyof FrameSettings>(
    key: K,
    value: FrameSettings[K]
  ) => void;
  setSettings: Dispatch<SetStateAction<FrameSettings>>;
  exifCamera?: string;
  resetInfo: () => void;
}

export const InfoTab: FC<InfoTabProps> = ({
  settings,
  update,
  setSettings,
  exifCamera,
  resetInfo,
}) => {
  const handleCameraSelect = (preset: CameraPreset | null) => {
    if (preset) {
      setSettings((prev) => ({
        ...prev,
        selectedCameraPresetId: preset.id,
        customExif: {
          ...prev.customExif,
          model: normalizeCameraModel(preset.model),
          lens: preset.defaultLens || prev.customExif.lens,
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        selectedCameraPresetId: null,
        customExif: {
          ...prev.customExif,
          model: undefined,
          lens: undefined,
        },
      }));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          参数设置
        </span>
        <button
          onClick={resetInfo}
          className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5 group"
          title="重置设置"
        >
          <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-180" />
          <span className="font-medium">重置</span>
        </button>
      </div>

      <Toggle
        label="显示参数信息"
        checked={settings.showExif}
        onChange={(checked) => update("showExif", checked)}
      />

      <SegmentedControl
        label="显示布局"
        value={settings.infoLayout}
        onChange={(val) => update("infoLayout", val)}
        options={[
          { id: "centered", label: "居中双行" },
          { id: "classic", label: "经典左右" },
        ]}
      />

      <div className="space-y-4">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block">
          相机型号
        </label>
        <CameraSelector
          onSelect={handleCameraSelect}
          selectedId={settings.selectedCameraPresetId}
          currentExifCamera={exifCamera}
        />
        <p className="text-[10px] font-medium text-neutral-600 uppercase tracking-widest text-center">
          预设可快速更换品牌和镜头
        </p>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          文字颜色
        </label>
        <ColorPicker
          color={settings.textColor}
          onChange={(color) => update("textColor", color)}
          align="right"
        />
      </div>

      <Slider
        label="内边距"
        value={settings.infoPadding}
        min={0}
        max={100}
        onChange={(val) => update("infoPadding", val)}
        unit="px"
      />

      {settings.infoLayout === "centered" && (
        <Slider
          label="行间距"
          value={settings.infoGap}
          min={0}
          max={40}
          onChange={(val) => update("infoGap", val)}
          unit="px"
        />
      )}

      {settings.infoLayout === "centered" && (
        <div className="space-y-6 pb-6">
          <InfoLineStyleCard
            title="第一行: 相机型号"
            fontId={settings.line1Style.fontId}
            onFontIdChange={(fontId) =>
              setSettings((prev) => ({
                ...prev,
                line1Style: { ...prev.line1Style, fontId },
              }))
            }
            fontSize={settings.line1Style.fontSize}
            onFontSizeChange={(val) =>
              setSettings((prev) => ({
                ...prev,
                line1Style: { ...prev.line1Style, fontSize: val },
              }))
            }
            maxFontSize={48}
          >
            <Slider
              label="字重"
              value={settings.line1Style.fontWeight}
              min={100}
              max={900}
              step={100}
              onChange={(val) =>
                setSettings((prev) => ({
                  ...prev,
                  line1Style: { ...prev.line1Style, fontWeight: val },
                }))
              }
            />

            <Slider
              label="间距"
              value={Math.round(settings.line1Style.letterSpacing * 100)}
              min={-5}
              max={100}
              step={1}
              onChange={(val) =>
                setSettings((prev) => ({
                  ...prev,
                  line1Style: { ...prev.line1Style, letterSpacing: val / 100 },
                }))
              }
            />
          </InfoLineStyleCard>

          <InfoLineStyleCard
            title="第二行: 拍摄参数"
            fontId={settings.line2Style.fontId}
            onFontIdChange={(fontId) =>
              setSettings((prev) => ({
                ...prev,
                line2Style: { ...prev.line2Style, fontId },
              }))
            }
            fontSize={settings.line2Style.fontSize}
            onFontSizeChange={(val) =>
              setSettings((prev) => ({
                ...prev,
                line2Style: { ...prev.line2Style, fontSize: val },
              }))
            }
            maxFontSize={36}
          >
            <Slider
              label="不透明度"
              value={Math.round(settings.line2Style.opacity * 100)}
              min={0}
              max={100}
              step={1}
              onChange={(val) =>
                setSettings((prev) => ({
                  ...prev,
                  line2Style: { ...prev.line2Style, opacity: val / 100 },
                }))
              }
              unit="%"
            />
          </InfoLineStyleCard>
        </div>
      )}
    </div>
  );
};
