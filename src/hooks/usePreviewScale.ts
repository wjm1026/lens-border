import { useEffect, useRef, useState } from "react";
import type { DependencyList } from "react";

interface PreviewScaleOptions {
  disabled?: boolean;
  dependencies?: DependencyList;
  padding?: number;
}

export function usePreviewScale({
  disabled = false,
  dependencies = [],
  padding = 40,
}: PreviewScaleOptions = {}) {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (disabled) return;

    const updateScale = () => {
      if (!previewContainerRef.current || !previewContentRef.current) return;

      const container = previewContainerRef.current;
      const content = previewContentRef.current;

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const fw = content.scrollWidth;
      const fh = content.scrollHeight;

      if (fw === 0 || fh === 0) return;

      const scaleW = (cw - padding) / fw;
      const scaleH = (ch - padding) / fh;
      const nextScale = Math.min(scaleW, scaleH, 1);

      setPreviewScale((prev) =>
        Math.abs(prev - nextScale) > 0.01 ? nextScale : prev
      );
    };

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateScale)
        : null;

    if (observer) {
      if (previewContainerRef.current) {
        observer.observe(previewContainerRef.current);
      }
      if (previewContentRef.current) {
        observer.observe(previewContentRef.current);
      }
    } else {
      window.addEventListener("resize", updateScale);
    }

    const timeoutId = window.setTimeout(updateScale, 100);

    return () => {
      window.clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", updateScale);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, padding, ...dependencies]);

  return { previewContainerRef, previewContentRef, previewScale };
}
