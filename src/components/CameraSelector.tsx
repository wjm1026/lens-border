import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Camera, Sparkles } from 'lucide-react';
import { CAMERA_BRANDS, getAllCameraPresets, type CameraPreset, type CameraBrand } from '../data/cameraPresets';

interface CameraSelectorProps {
  onSelect: (preset: CameraPreset | null) => void;
  selectedId?: string | null;
  currentExifCamera?: string; // 当前 EXIF 中的相机信息
}

export default function CameraSelector({ onSelect, selectedId, currentExifCamera }: CameraSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 获取当前选中的预设
  const selectedPreset = selectedId ? getAllCameraPresets().find(p => p.id === selectedId) : null;

  // 过滤品牌和型号
  const filteredBrands = search 
    ? CAMERA_BRANDS.map(brand => ({
        ...brand,
        models: brand.models.filter(m => 
          m.displayName.toLowerCase().includes(search.toLowerCase()) ||
          m.model.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(brand => brand.models.length > 0)
    : CAMERA_BRANDS;

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 打开时聚焦搜索框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (preset: CameraPreset) => {
    onSelect(preset);
    setIsOpen(false);
    setSearch('');
  };

  const handleReset = () => {
    onSelect(null);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center gap-2 px-3 py-2.5 rounded-xl
          border transition-all duration-200
          ${isOpen 
            ? 'bg-white/15 border-white/30 shadow-lg' 
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }
        `}
      >
        <Camera className="w-4 h-4 text-white/60 shrink-0" />
        <span className={`flex-1 text-left text-sm truncate ${selectedPreset ? 'text-white' : 'text-white/50'}`}>
          {selectedPreset ? selectedPreset.displayName : (currentExifCamera || '选择相机型号')}
        </span>
        {selectedPreset && (
          <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/30 text-blue-300 rounded-md font-medium">
            预设
          </span>
        )}
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden dropdown-animate">
          {/* Search */}
          <div className="p-2 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索相机..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
            {/* Use EXIF Data Option */}
            {currentExifCamera && (
              <div className="p-2 border-b border-white/10">
                <button
                  onClick={handleReset}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${!selectedPreset 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30' 
                      : 'hover:bg-white/5'
                    }
                  `}
                >
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="text-sm text-white font-medium">使用原始 EXIF</div>
                    <div className="text-xs text-white/50 truncate">{currentExifCamera}</div>
                  </div>
                  {!selectedPreset && (
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  )}
                </button>
              </div>
            )}

            {/* Brand List */}
            {filteredBrands.map((brand) => (
              <BrandGroup 
                key={brand.id} 
                brand={brand}
                isExpanded={expandedBrand === brand.id || !!search}
                onToggle={() => setExpandedBrand(expandedBrand === brand.id ? null : brand.id)}
                onSelect={handleSelect}
                selectedId={selectedId}
              />
            ))}

            {filteredBrands.length === 0 && (
              <div className="p-8 text-center text-white/40 text-sm">
                未找到匹配的相机
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.25);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-top-2 {
          from { transform: translateY(-8px); }
          to { transform: translateY(0); }
        }
        .dropdown-animate {
          animation: fade-in 0.2s ease-out, slide-in-from-top-2 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

// Brand Group Component
function BrandGroup({ 
  brand, 
  isExpanded, 
  onToggle, 
  onSelect, 
  selectedId 
}: { 
  brand: CameraBrand; 
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: (preset: CameraPreset) => void;
  selectedId?: string | null;
}) {
  const hasSelected = brand.models.some(m => m.id === selectedId);

  return (
    <div className="border-b border-white/5 last:border-b-0">
      {/* Brand Header */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center gap-2 px-4 py-2.5 transition-colors
          ${hasSelected ? 'bg-blue-500/10' : 'hover:bg-white/5'}
        `}
      >
        <span className="text-sm font-semibold text-white/90">{brand.name}</span>
        <span className="text-xs text-white/30">({brand.models.length})</span>
        <div className="flex-1" />
        {hasSelected && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
        <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Models */}
      {isExpanded && (
        <div className="bg-black/20 py-1">
          {brand.models.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelect(model)}
              className={`
                w-full flex items-center gap-3 px-6 py-2 transition-colors
                ${model.id === selectedId 
                  ? 'bg-blue-500/20 text-white' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <span className="text-sm truncate">{model.displayName}</span>
              {model.id === selectedId && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
