/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-10 13:16:32
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-10 15:08:25
 * @FilePath: /image/src/components/photo/BackgroundLayer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { FrameSettings } from "../../types";

interface BackgroundLayerProps {
  settings: FrameSettings;
  resolvedImageSrc: string;
}

export default function BackgroundLayer({
  settings,
  resolvedImageSrc,
}: BackgroundLayerProps) {
  const commonClass = "absolute inset-0 z-0 ";
  const brightnessFilter = `brightness(${settings.backgroundBrightness / 100})`;

  if (settings.backgroundType === "color") {
    return (
      <div
        className={commonClass}
        style={{
          backgroundColor: settings.backgroundColor,
          filter: brightnessFilter,
        }}
      />
    );
  }

  if (settings.backgroundType === "gradient") {
    const gradient = `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientStartColor} 0%, ${settings.gradientEndColor} 100%)`;
    return (
      <div
        className={commonClass}
        style={{ background: gradient, filter: brightnessFilter }}
      />
    );
  }

  if (settings.backgroundType === "blur") {
    return (
      <div
        className={commonClass}
        style={{ overflow: "hidden", filter: brightnessFilter }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: "scale(1.2)",
            filter: `blur(${settings.blurAmount}px)`,
            WebkitFilter: `blur(${settings.blurAmount}px)`,
          }}
        >
          <img
            src={resolvedImageSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  return null;
}
