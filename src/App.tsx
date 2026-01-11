/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-09 21:56:02
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-10 15:13:27
 * @FilePath: /image/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useCallback, useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import ImageUploader from "./components/ImageUploader";
import SettingsPanel from "./components/settings/SettingsPanel";
import EditorStage from "./components/editor/EditorStage";
import { type FrameSettings, DEFAULT_SETTINGS } from "./types";
import { type ExifData } from "./utils/exif";
import { useCropperEditor } from "./hooks/useCropperEditor";

function App() {
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [settings, setSettings] = useState<FrameSettings>(DEFAULT_SETTINGS);

  const objectUrlRef = useRef<string | null>(null);

  const {
    cropperRef,
    isEditing,
    setIsEditing,
    rotation,
    setRotation,
    zoom,
    setZoom,
    aspect,
    setAspect,
    flip,
    setFlip,
    isProcessingPreview,
    saveCroppedImage,
    resetEditor,
    onCropperReady,
    markCropDirty,
  } = useCropperEditor({
    onPreviewReady: setProcessedImageSrc,
  });

  const revokeObjectUrl = useCallback((url: string | null) => {
    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const handleImageSelect = useCallback(
    (src: string) => {
      revokeObjectUrl(objectUrlRef.current);
      objectUrlRef.current = src;
      resetEditor();
      setOriginalImageSrc(src);
      setProcessedImageSrc(src);
      setExifData(null);
    },
    [resetEditor, revokeObjectUrl]
  );

  const handleRemoveImage = useCallback(() => {
    revokeObjectUrl(objectUrlRef.current);
    objectUrlRef.current = null;
    setOriginalImageSrc(null);
    setProcessedImageSrc(null);
    setExifData(null);
    resetEditor();
  }, [resetEditor, revokeObjectUrl]);

  useEffect(
    () => () => revokeObjectUrl(objectUrlRef.current),
    [revokeObjectUrl]
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-8">
      <header className="mb-8 text-center flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          LensBorder
        </h1>
        <p className="text-neutral-500 mt-2 font-medium">
          打造专业级照片边框 & EXIF 数据展示
        </p>
      </header>

      <main className="w-full max-w-[1400px] flex flex-col items-center gap-8">
        {!originalImageSrc ? (
          <ImageUploader
            onImageSelect={handleImageSelect}
            onExifParsed={setExifData}
          />
        ) : (
          <div className="flex flex-col lg:flex-row items-start gap-8 w-full h-full">
            <EditorStage
              originalImageSrc={originalImageSrc}
              processedImageSrc={processedImageSrc!}
              exifData={exifData}
              settings={settings}
              setSettings={setSettings}
              isEditing={isEditing}
              isProcessingPreview={isProcessingPreview}
              aspect={aspect}
              cropperRef={cropperRef}
              onCropperReady={onCropperReady}
              onMarkCropDirty={markCropDirty}
            />

            <div className="w-full lg:w-auto shrink-0 z-10">
              <SettingsPanel
                settings={settings}
                setSettings={setSettings}
                onRemoveImage={handleRemoveImage}
                exifCamera={
                  [exifData?.make, exifData?.model].filter(Boolean).join(" ") ||
                  undefined
                }
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSaveEdit={saveCroppedImage}
                rotation={rotation}
                setRotation={setRotation}
                zoom={zoom}
                setZoom={setZoom}
                aspect={aspect}
                setAspect={setAspect}
                flip={flip}
                setFlip={setFlip}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
