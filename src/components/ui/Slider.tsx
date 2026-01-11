/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-10 02:46:53
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-10 03:06:48
 * @FilePath: /image/src/components/ui/Slider.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { FC } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  className?: string;
}

export const Slider: FC<SliderProps> = ({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  onChange, 
  unit = '',
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{label}</label>
        <span className="text-xs font-medium text-neutral-500 tabular-nums">
          {value}{unit}
        </span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value}
        onInput={(e) => onChange(Number(e.currentTarget.value))}
        className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 active:accent-blue-600 transition-colors"
      />
    </div>
  );
};
