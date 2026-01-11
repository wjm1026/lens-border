/*
 * @Author: wjm 791215714@qq.com
 * @Date: 2026-01-09 21:59:02
 * @LastEditors: wjm 791215714@qq.com
 * @LastEditTime: 2026-01-10 03:41:52
 * @FilePath: /image/src/components/ImageUploader.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { type ExifData, parseExif } from '../utils/exif';

interface ImageUploaderProps {
  onImageSelect: (src: string) => void;
  onExifParsed: (data: ExifData | null) => void;
}

export default function ImageUploader({ onImageSelect, onExifParsed }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const objectUrl = URL.createObjectURL(file);
    onImageSelect(objectUrl);
    
    const exif = await parseExif(file);
    onExifParsed(exif);
  }, [onImageSelect, onExifParsed]);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  return (
    <div 
      className={`w-full max-w-xl h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all
        ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50'}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input 
        type="file" 
        id="file-input" 
        ref={inputRef}
        className="hidden" 
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <div className="bg-neutral-800 p-4 rounded-full mb-4">
        <Upload className="w-8 h-8 text-blue-400" />
      </div>
      <p className="text-lg font-medium text-neutral-200">点击或拖拽照片上传</p>
      <p className="text-sm text-neutral-500 mt-2">支持 JPG, PNG, HEIC 格式</p>
    </div>
  );
}
