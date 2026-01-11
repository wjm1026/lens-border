import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactCropperElement } from "react-cropper";

interface UseCropperEditorOptions {
  onPreviewReady: (src: string) => void;
}

export function useCropperEditor({ onPreviewReady }: UseCropperEditorOptions) {
  const [isEditing, setIsEditingState] = useState(false);
  const [rotation, setRotationState] = useState(0);
  const [zoom, setZoomState] = useState(1);
  const [aspect, setAspectState] = useState<number | undefined>(undefined);
  const [flip, setFlipState] = useState({ horizontal: false, vertical: false });
  const [baseZoom, setBaseZoom] = useState(0);
  const [isProcessingPreview, setIsProcessingPreview] = useState(false);
  const [cropData, setCropData] = useState<Cropper.Data | null>(null);
  const [canvasData, setCanvasData] = useState<Cropper.CanvasData | null>(null);

  const cropperRef = useRef<ReactCropperElement | null>(null);
  const pendingPreviewRef = useRef<number | null>(null);
  const isRestoringRef = useRef(false);
  const isCropDirtyRef = useRef(false);

  const clearPendingPreview = useCallback(() => {
    if (pendingPreviewRef.current === null) return;
    if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(pendingPreviewRef.current);
    } else {
      clearTimeout(pendingPreviewRef.current);
    }
    pendingPreviewRef.current = null;
  }, []);

  const schedulePreviewUpdate = useCallback(
    (work: () => void) => {
      clearPendingPreview();
      if (typeof window === "undefined") {
        work();
        return;
      }
      const requestIdleCallback =
        (
          window as Window & {
            requestIdleCallback?: (
              callback: IdleRequestCallback,
              options?: IdleRequestOptions
            ) => number;
          }
        ).requestIdleCallback ?? null;
      if (typeof requestIdleCallback === "function") {
        pendingPreviewRef.current = requestIdleCallback(
          () => {
            pendingPreviewRef.current = null;
            work();
          },
          { timeout: 1000 }
        );
      } else {
        pendingPreviewRef.current = window.setTimeout(() => {
          pendingPreviewRef.current = null;
          work();
        }, 200);
      }
    },
    [clearPendingPreview]
  );

  const setCropDirty = useCallback((val: boolean) => {
    isCropDirtyRef.current = val;
  }, []);

  const markCropDirty = useCallback(() => {
    if (isRestoringRef.current) return;
    setCropDirty(true);
  }, [setCropDirty]);

  const setRotation = useCallback(
    (val: number) => {
      setRotationState(val);
      markCropDirty();
    },
    [markCropDirty]
  );

  const setZoom = useCallback(
    (val: number) => {
      setZoomState(val);
      markCropDirty();
    },
    [markCropDirty]
  );

  const setAspect = useCallback(
    (val: number | undefined) => {
      setAspectState(val);
      markCropDirty();
    },
    [markCropDirty]
  );

  const setFlip = useCallback(
    (val: { horizontal: boolean; vertical: boolean }) => {
      setFlipState(val);
      markCropDirty();
    },
    [markCropDirty]
  );

  const setIsEditing = useCallback(
    (val: boolean) => {
      if (val) {
        setCropDirty(false);
      }
      setIsEditingState(val);
    },
    [setCropDirty]
  );

  const resetEditor = useCallback(() => {
    clearPendingPreview();
    isRestoringRef.current = false;
    setIsEditingState(false);
    setRotationState(0);
    setZoomState(1);
    setBaseZoom(0);
    setFlipState({ horizontal: false, vertical: false });
    setAspectState(undefined);
    setCropData(null);
    setCanvasData(null);
    setCropDirty(false);
    setIsProcessingPreview(false);
  }, [clearPendingPreview, setCropDirty]);

  const saveCroppedImage = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    if (!isCropDirtyRef.current) {
      setIsEditingState(false);
      return;
    }

    const currentData = cropper.getData();
    const currentCanvasData = cropper.getCanvasData();

    setCropData(currentData);
    setCanvasData(currentCanvasData);

    setRotationState(currentData.rotate);
    setFlipState({
      horizontal: currentData.scaleX === -1,
      vertical: currentData.scaleY === -1,
    });

    if (baseZoom > 0) {
      const currentImageData = cropper.getImageData();
      if (currentImageData.naturalWidth > 0) {
        const currentAbsoluteZoom =
          currentImageData.width / currentImageData.naturalWidth;
        setZoomState(currentAbsoluteZoom / baseZoom);
      }
    }

    setIsEditingState(false);
    setCropDirty(false);

    setIsProcessingPreview(true);
    schedulePreviewUpdate(() => {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (!croppedCanvas) {
        setIsProcessingPreview(false);
        return;
      }

      if (typeof croppedCanvas.toBlob === "function") {
        croppedCanvas.toBlob((blob) => {
          if (!blob) {
            setIsProcessingPreview(false);
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              onPreviewReady(reader.result as string);
            }
            setIsProcessingPreview(false);
          };
          reader.readAsDataURL(blob);
        }, "image/png");
      } else {
        onPreviewReady(croppedCanvas.toDataURL());
        setIsProcessingPreview(false);
      }
    });
  }, [baseZoom, onPreviewReady, schedulePreviewUpdate, setCropDirty]);

  const onCropperReady = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    if (baseZoom === 0) {
      const imageData = cropper.getImageData();
      if (imageData.naturalWidth > 0) {
        const fitZoom = imageData.width / imageData.naturalWidth;
        setBaseZoom(fitZoom);
        setZoomState(1);
      }
    }

    if (!isEditing) {
      cropper.disable();
    }

    isRestoringRef.current = true;
    if (canvasData) {
      cropper.setCanvasData(canvasData);
    }
    if (cropData) {
      cropper.setData(cropData);
    }
    requestAnimationFrame(() => {
      isRestoringRef.current = false;
      setCropDirty(false);
    });
  }, [baseZoom, canvasData, cropData, isEditing, setCropDirty]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotateTo(rotation);
    }
  }, [rotation]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper && baseZoom > 0) {
      cropper.zoomTo(zoom * baseZoom);
    }
  }, [zoom, baseZoom]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const currentBox = cropper.getCropBoxData();
      const targetRatio = aspect || NaN;

      cropper.setAspectRatio(targetRatio);

      if (!aspect) {
        cropper.setCropBoxData(currentBox);
      }
    }
  }, [aspect]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    }
  }, [flip]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    if (isEditing) {
      cropper.enable();
    } else {
      cropper.disable();
    }
  }, [isEditing]);

  useEffect(() => () => clearPendingPreview(), [clearPendingPreview]);

  return {
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
  };
}
