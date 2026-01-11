/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-10 02:48:09
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-10 03:54:54
 * @FilePath: /image/src/components/settings/tabs/CropTab.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { FC } from "react";
import {
  Crop,
  Layout,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
} from "lucide-react";
import type { FrameSettings } from "../../../types";
import { Slider } from "../../ui/Slider";

interface CropTabProps {
  settings: FrameSettings;
  isEditing: boolean;
  onToggleEdit: () => void;
  aspect: number | undefined;
  setAspect: (val: number | undefined) => void;
  rotation: number;
  setRotation: (val: number) => void;
  zoom: number;
  setZoom: (val: number) => void;
  flip: { horizontal: boolean; vertical: boolean };
  setFlip: (val: { horizontal: boolean; vertical: boolean }) => void;
}

// Aspect Ratios for Cropping
const CROP_RATIOS = [
  { label: "自由", value: undefined, icon: <Layout className="w-3.5 h-3.5" /> },
  {
    label: "1:1",
    value: 1,
    icon: <div className="w-3 h-3 border border-current rounded-sm" />,
  },
  {
    label: "4:3",
    value: 4 / 3,
    icon: <div className="w-4 h-3 border border-current rounded-sm" />,
  },
  {
    label: "3:4",
    value: 3 / 4,
    icon: <div className="w-3 h-4 border border-current rounded-sm" />,
  },
  {
    label: "16:9",
    value: 16 / 9,
    icon: <div className="w-4.5 h-2.5 border border-current rounded-sm" />,
  },
  {
    label: "9:16",
    value: 9 / 16,
    icon: <div className="w-2.5 h-4.5 border border-current rounded-sm" />,
  },
];

export const CropTab: FC<CropTabProps> = ({
  isEditing,
  onToggleEdit,
  aspect,
  setAspect,
  rotation,
  setRotation,
  zoom,
  setZoom,
  flip,
  setFlip,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in-out">
      {!isEditing ? (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="relative group cursor-pointer" onClick={onToggleEdit}>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative w-24 h-24 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-[32px] flex items-center justify-center border border-neutral-700/50 shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out">
              <Crop className="w-10 h-10 text-neutral-400 group-hover:text-blue-400 transition-colors duration-500" />
            </div>
          </div>

          <div className="space-y-3 mt-8 mb-10 max-w-[200px]">
            <h3 className="text-lg font-bold text-white tracking-tight">
              调整
            </h3>
            <p className="text-xs text-neutral-400 font-medium leading-relaxed">
              缩放、裁切比例、旋转角度与镜像翻转。
            </p>
          </div>

          <button
            onClick={onToggleEdit}
            className="group relative px-8 py-3 bg-white text-black text-xs font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              编辑
              <span className="group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </span>
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700">
          <div className="bg-neutral-800/20 p-4 rounded-2xl border border-neutral-700/20 mb-4">
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] text-center">
              实时编辑模式
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                裁切比例
              </label>
              <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-wider">
                ASPECT RATIO
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {CROP_RATIOS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setAspect(r.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 gap-1.5 active:scale-95
                                    ${
                                      aspect === r.value
                                        ? "bg-white text-black border-white shadow-[0_8px_16px_rgba(255,255,255,0.1)] scale-[1.02]"
                                        : "bg-neutral-800/40 border-neutral-800/60 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700"
                                    }`}
                >
                  <div className="flex-1 flex items-center justify-center mb-0.5">
                    {r.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="缩放"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={setZoom}
            unit="x"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                旋转角度
              </label>
              <span className="text-xs font-medium text-neutral-500 tabular-nums">
                {rotation}°
              </span>
            </div>
            <div className="flex items-center gap-4 bg-neutral-800/30 p-2 rounded-[20px] border border-neutral-700/30">
              <button
                onClick={() => setRotation(rotation - 90)}
                className="w-10 h-10 bg-neutral-800 rounded-xl hover:bg-neutral-750 text-neutral-400 transition-all flex items-center justify-center active:scale-90 shadow-sm border border-neutral-700/50"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="flex-1 px-1">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <button
                onClick={() => setRotation(rotation + 90)}
                className="w-10 h-10 bg-neutral-800 rounded-xl hover:bg-neutral-750 text-neutral-400 transition-all flex items-center justify-center active:scale-90 shadow-sm border border-neutral-700/50"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              翻转画幅
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setFlip({ ...flip, horizontal: !flip.horizontal })
                }
                className={`py-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] active:scale-95
                                ${
                                  flip.horizontal
                                    ? "bg-blue-600 border-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.3)]"
                                    : "bg-neutral-800/40 border-neutral-800 text-neutral-500 hover:text-neutral-300"
                                }`}
              >
                <FlipHorizontal className="w-4 h-4" /> 水平
              </button>
              <button
                onClick={() => setFlip({ ...flip, vertical: !flip.vertical })}
                className={`py-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] active:scale-95
                                ${
                                  flip.vertical
                                    ? "bg-blue-600 border-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.3)]"
                                    : "bg-neutral-800/40 border-neutral-800 text-neutral-500 hover:text-neutral-300"
                                }`}
              >
                <FlipVertical className="w-4 h-4" /> 垂直
              </button>
            </div>
          </div>

          <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest text-center pt-2 pb-4">
            💡 拖拽边缘调整，拖动内部移动
          </p>
        </div>
      )}
    </div>
  );
};
