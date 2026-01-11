/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-10 13:15:26
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-10 15:00:14
 * @FilePath: /image/src/hooks/useResolvedImage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from "react";

export function useResolvedImage(imageSrc: string) {
  const [resolvedImageSrc, setResolvedImageSrc] = useState<string>(imageSrc);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [prevSrc, setPrevSrc] = useState(imageSrc);

  if (imageSrc !== prevSrc) {
    setPrevSrc(imageSrc);
    setImageOpacity(0);
  }

  useEffect(() => {
    if (!imageSrc) return;

    let resolveTimeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const scheduleResolve = (nextSrc: string) => {
      if (cancelled) return;
      resolveTimeout = setTimeout(() => {
        if (cancelled) return;
        setResolvedImageSrc(nextSrc);
        setImageOpacity(1);
      }, 150);
    };

    const convertToDataUrl = async () => {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            scheduleResolve(reader.result as string);
          }
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Failed to convert image to Data URL", e);
        scheduleResolve(imageSrc);
      }
    };

    if (imageSrc.startsWith("blob:")) {
      convertToDataUrl();
    } else {
      scheduleResolve(imageSrc);
    }

    return () => {
      cancelled = true;
      if (resolveTimeout) clearTimeout(resolveTimeout);
    };
  }, [imageSrc]);

  const handleImageLoad = () => setImageOpacity(1);

  return { resolvedImageSrc, imageOpacity, handleImageLoad };
}
