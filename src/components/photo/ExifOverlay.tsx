import { useMemo } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { type FrameSettings, FONT_OPTIONS } from "../../types";
import { type ExifData, formatShutterSpeed, normalizeCameraModel } from "../../utils/exif";
import EditableInput from "./EditableInput";

interface ExifOverlayProps {
  settings: FrameSettings;
  exifData: ExifData | null;
  isDragging: boolean;
  onDragStart: (e: ReactMouseEvent) => void;
  onCustomExifChange: (
    key: keyof FrameSettings["customExif"],
    value: string
  ) => void;
}

const getFontFamily = (fontId: string) => {
  const font = FONT_OPTIONS.find((option) => option.id === fontId);
  return font?.family || '"Inter", sans-serif';
};

export default function ExifOverlay({
  settings,
  exifData,
  isDragging,
  onDragStart,
  onCustomExifChange,
}: ExifOverlayProps) {
  const { defaultCamera, defaultLens, defaultParams, defaultDate } = useMemo(() => {
    const camera = normalizeCameraModel(exifData?.model || "");
    const params = [
      exifData?.focalLength ? `${exifData.focalLength}mm` : null,
      exifData?.fNumber ? `f/${exifData.fNumber}` : null,
      exifData?.exposureTime ? formatShutterSpeed(exifData.exposureTime) : null,
      exifData?.iso ? `ISO${exifData.iso}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    const date = exifData?.dateTimeOriginal
      ? `${exifData.dateTimeOriginal.toLocaleDateString()} ${exifData.dateTimeOriginal.toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}`
      : "";

    return {
      defaultCamera: camera.trim(),
      defaultLens: exifData?.lens || "",
      defaultParams: params,
      defaultDate: date,
    };
  }, [exifData]);

  return (
    <div className="w-full flex items-center justify-center transition-all   slide-in-from-bottom-4 fade-in  fill-mode-backwards">
      <div
        className={`cursor-move group ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${settings.infoOffset.x !== 0 || settings.infoOffset.y !== 0 ? "relative z-50" : ""}`}
        style={{
          padding: `${settings.infoPadding}px`,
          transform: `translate(${settings.infoOffset.x}px, ${settings.infoOffset.y}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.2s ease-out, opacity 0.3s ease-in-out",
          width: "fit-content",
          minWidth: settings.infoLayout === "classic" ? "100%" : "auto",
        }}
        onMouseDown={onDragStart}
      >
        <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-lg pointer-events-none transition-colors" />

        {settings.infoLayout === "centered" && (
          <div
            className="flex flex-col items-center relative z-10"
            style={{ gap: `${settings.infoGap}px` }}
          >
            <div
              style={{
                fontFamily: getFontFamily(settings.line1Style.fontId),
                fontSize: `${settings.line1Style.fontSize}px`,
                fontWeight: settings.line1Style.fontWeight,
                letterSpacing: `${settings.line1Style.letterSpacing}em`,
                opacity: settings.line1Style.opacity,
              }}
            >
              <EditableInput
                value={settings.customExif.model ?? defaultCamera}
                placeholder="Camera Model"
                onChange={(value) => onCustomExifChange("model", value)}
                className="text-center"
              />
            </div>
            <div
              style={{
                fontFamily: getFontFamily(settings.line2Style.fontId),
                fontSize: `${settings.line2Style.fontSize}px`,
                fontWeight: settings.line2Style.fontWeight,
                letterSpacing: `${settings.line2Style.letterSpacing}em`,
                opacity: settings.line2Style.opacity,
              }}
            >
              <EditableInput
                value={settings.customExif.params ?? defaultParams}
                placeholder="50mm f/5.6 1/100 ISO100"
                onChange={(value) => onCustomExifChange("params", value)}
                className="text-center"
              />
            </div>
          </div>
        )}

        {settings.infoLayout === "classic" && (
          <div className="flex justify-between items-end font-medium tracking-wide gap-4 flex-wrap">
            <div className="flex flex-col gap-1 relative z-10">
              <div className="text-lg font-bold uppercase tracking-wider">
                <EditableInput
                  value={settings.customExif.model ?? defaultCamera}
                  placeholder="Camera Model"
                  onChange={(value) => onCustomExifChange("model", value)}
                />
              </div>
              <div className="text-sm opacity-60">
                <EditableInput
                  value={settings.customExif.lens ?? defaultLens}
                  placeholder="Lens Details"
                  onChange={(value) => onCustomExifChange("lens", value)}
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-right relative z-10">
              <div className="text-sm">
                <EditableInput
                  value={settings.customExif.params ?? defaultParams}
                  placeholder="Shooting Params"
                  onChange={(value) => onCustomExifChange("params", value)}
                  className="text-right"
                />
              </div>
              <div className="text-xs opacity-50">
                <EditableInput
                  value={settings.customExif.date ?? defaultDate}
                  placeholder="Date & Time"
                  onChange={(value) => onCustomExifChange("date", value)}
                  className="text-right"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
