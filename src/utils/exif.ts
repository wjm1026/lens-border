/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-09 21:59:00
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-09 22:20:53
 * @FilePath: /image/src/utils/exif.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import exifr from 'exifr';

export interface ExifData {
  make?: string;
  model?: string;
  lens?: string;
  iso?: number;
  fNumber?: number;
  exposureTime?: number;
  dateTimeOriginal?: Date;
  focalLength?: number;
}

export async function parseExif(file: File): Promise<ExifData | null> {
  try {
    const output = await exifr.parse(file, [
      'Make', 'Model', 'LensModel', 'ISO', 'FNumber', 'ExposureTime', 'DateTimeOriginal', 'FocalLength'
    ]);
    
    if (!output) return null;

    return {
      make: output.Make,
      model: output.Model,
      lens: output.LensModel,
      iso: output.ISO,
      fNumber: output.FNumber,
      exposureTime: output.ExposureTime,
      dateTimeOriginal: output.DateTimeOriginal,
      focalLength: output.FocalLength
    };
  } catch (error) {
    console.warn('Failed to parse EXIF data', error);
    return null;
  }
}

export function normalizeCameraModel(model: string): string {
  return model
    .replace(/([A-Za-z])\s+(\d)/g, "$1$2")
    .replace(/(\d)\s+([A-Za-z])/g, "$1$2")
    .trim();
}

export function formatShutterSpeed(t: number | undefined): string {
    if (!t) return '';
    if (t >= 1) return `${t}s`;
    return `1/${Math.round(1/t)}`;
}
