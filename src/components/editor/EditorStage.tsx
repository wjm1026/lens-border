import type { Dispatch, RefObject, SetStateAction } from "react";
import Cropper, { type ReactCropperElement } from "react-cropper";
import PhotoFrame from "../PhotoFrame";
import type { FrameSettings } from "../../types";
import type { ExifData } from "../../utils/exif";
import { usePreviewScale } from "../../hooks/usePreviewScale";

interface EditorStageProps {
  originalImageSrc: string;
  processedImageSrc: string;
  exifData: ExifData | null;
  settings: FrameSettings;
  setSettings: Dispatch<SetStateAction<FrameSettings>>;
  isEditing: boolean;
  isProcessingPreview: boolean;
  aspect: number | undefined;
  cropperRef: RefObject<ReactCropperElement | null>;
  onCropperReady: () => void;
  onMarkCropDirty: () => void;
}

export default function EditorStage({
  originalImageSrc,
  processedImageSrc,
  exifData,
  settings,
  setSettings,
  isEditing,
  isProcessingPreview,
  aspect,
  cropperRef,
  onCropperReady,
  onMarkCropDirty,
}: EditorStageProps) {
  const { previewContainerRef, previewContentRef, previewScale } =
    usePreviewScale({
      disabled: isEditing,
      dependencies: [processedImageSrc, settings],
    });

  return (
    <div className="flex-1 w-full min-h-[600px] h-[600px] lg:h-[700px] bg-neutral-900/50 rounded-2xl border border-neutral-800 flex flex-col items-center p-8 lg:sticky lg:top-8 relative overflow-hidden justify-center">
      <div className="relative w-full h-full">
        <div
          className={`absolute inset-0 z-20 transition-all duration-300 ease-in-out ${
            isEditing
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <Cropper
              src={originalImageSrc}
              style={{ height: "100%", width: "100%" }}
              initialAspectRatio={NaN}
              aspectRatio={aspect || NaN}
              guides={true}
              ref={cropperRef}
              viewMode={1}
              dragMode="move"
              background={false}
              responsive={true}
              autoCropArea={0.8}
              checkOrientation={false}
              ready={onCropperReady}
              cropend={onMarkCropDirty}
              zoom={onMarkCropDirty}
            />
          </div>
        </div>

        <div
          ref={previewContainerRef}
          className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out ${
            isEditing
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          {isProcessingPreview && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-xs font-semibold text-white/90">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                处理中...
              </div>
            </div>
          )}

          <div
            ref={previewContentRef}
            style={{ transform: `scale(${previewScale})` }}
            className="origin-center transition-transform duration-300 ease-out will-change-transform"
          >
            <PhotoFrame
              imageSrc={processedImageSrc}
              exifData={exifData}
              settings={settings}
              setSettings={setSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
