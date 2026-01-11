import { useCallback, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { toPng, toJpeg } from "html-to-image";
import { Download } from "lucide-react";
import type { ExifData } from "../utils/exif";
import type { FrameSettings } from "../types";
import BackgroundLayer from "./photo/BackgroundLayer";
import ExifOverlay from "./photo/ExifOverlay";
import { useResolvedImage } from "../hooks/useResolvedImage";
import { useDraggableOffset } from "../hooks/useDraggableOffset";

interface PhotoFrameProps {
  imageSrc: string;
  exifData: ExifData | null;
  settings: FrameSettings;
  setSettings: Dispatch<SetStateAction<FrameSettings>>;
}

export default function PhotoFrame({
  imageSrc,
  exifData,
  settings,
  setSettings,
}: PhotoFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const { resolvedImageSrc, imageOpacity, handleImageLoad } =
    useResolvedImage(imageSrc);

  const { isDragging, handleDragStart } = useDraggableOffset({
    initialOffset: settings.infoOffset,
    onChange: (nextOffset) =>
      setSettings((prev) => ({ ...prev, infoOffset: nextOffset })),
    enabled: settings.showExif,
  });

  const handleDownload = async () => {
    if (!frameRef.current) return;

    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      let pixelRatio = 3;
      try {
        const img = frameRef.current.querySelector("img");
        if (img && img.naturalWidth && img.naturalHeight) {
          const rect = img.getBoundingClientRect();
          const widthRatio = img.naturalWidth / rect.width;
          const heightRatio = img.naturalHeight / rect.height;
          pixelRatio = Math.max(widthRatio, heightRatio, 2.0);
          pixelRatio = Math.min(pixelRatio, 8);
        }
      } catch (e) {
        console.warn(e);
      }

      const options = {
        pixelRatio,
        quality: settings.exportQuality,
        filter: (node: HTMLElement) =>
          !node.classList?.contains("exclude-export"),
        backgroundColor: settings.backgroundColor,
      };

      const fileName = `lens-border-${Date.now()}`;
      const dataUrl =
        settings.exportFormat === "jpeg"
          ? await toJpeg(frameRef.current, options)
          : await toPng(frameRef.current, options);

      const link = document.createElement("a");
      link.download = `${fileName}.${settings.exportFormat === "jpeg" ? "jpg" : "png"}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image", err);
      alert("导出失败 (Export Failed)");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCustomExifChange = useCallback(
    (key: keyof FrameSettings["customExif"], value: string) => {
      setSettings((prev) => ({
        ...prev,
        customExif: { ...prev.customExif, [key]: value },
      }));
    },
    [setSettings]
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl overflow-visible">
      <div
        ref={frameRef}
        className="relative shadow-2xl w-full flex flex-col items-center"
        style={{
          paddingTop: `${settings.padding}px`,
          paddingLeft: `${settings.padding}px`,
          paddingRight: `${settings.padding}px`,
          paddingBottom: 0,
          color: settings.textColor,
        }}
      >
        <BackgroundLayer settings={settings} resolvedImageSrc={resolvedImageSrc} />

        <div className="relative z-10 w-full flex flex-col items-center">
          <div
            style={{
              borderRadius: `${settings.borderRadius}px`,
              boxShadow: `0 ${settings.shadowSize}px ${settings.shadowSize * 2}px -${settings.shadowSize / 2}px rgba(0,0,0,${settings.shadowOpacity})`,
              border: `${settings.borderWidth}px solid ${settings.borderColor}`,
              aspectRatio:
                settings.aspectRatio === "square"
                  ? "1 / 1"
                  : settings.aspectRatio === "portrait"
                  ? "3 / 4"
                  : settings.aspectRatio === "landscape"
                  ? "4 / 3"
                  : "auto",
            }}
            className={`relative w-full shadow-sm bg-neutral-100/10 overflow-hidden animate-in fade-in zoom-in-95 duration-700 ease-in-out transition-none ${
              settings.aspectRatio === "original" ? "aspect-auto" : ""
            }`}
          >
            <img
              src={resolvedImageSrc}
              alt="Uploaded"
              className={`w-full block transition-opacity duration-300 ease-in-out ${
                settings.aspectRatio === "original" ? "h-auto" : "h-full object-contain"
              }`}
              style={{ opacity: imageOpacity }}
              onLoad={handleImageLoad}
            />
          </div>

          {settings.showExif ? (
            <ExifOverlay
              settings={settings}
              exifData={exifData}
              isDragging={isDragging}
              onDragStart={handleDragStart}
              onCustomExifChange={handleCustomExifChange}
            />
          ) : (
            <div style={{ paddingBottom: `${settings.padding}px` }} />
          )}
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isExporting}
        className="exclude-export flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
      >
        <Download className="w-5 h-5" />
        {isExporting ? "导出中..." : "保存图片"}
      </button>
    </div>
  );
}
