export const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter', family: '"Inter", sans-serif' },
  { id: 'Roboto', name: 'Roboto', family: '"Roboto", sans-serif' },
  { id: 'Outfit', name: 'Outfit', family: '"Outfit", sans-serif' },
  { id: 'Poppins', name: 'Poppins', family: '"Poppins", sans-serif' },
  { id: 'Montserrat', name: 'Montserrat', family: '"Montserrat", sans-serif' },
  { id: 'Playfair', name: 'Playfair Display', family: '"Playfair Display", serif' },
  { id: 'Lora', name: 'Lora', family: '"Lora", serif' },
  { id: 'SourceHan', name: '思源黑体', family: '"Noto Sans SC", "Source Han Sans SC", sans-serif' },
  { id: 'SourceHanSerif', name: '思源宋体', family: '"Noto Serif SC", "Source Han Serif SC", serif' },
  { id: 'LXGW', name: '霞鹜文楷', family: '"LXGW WenKai", serif' },
  { id: 'JetBrains', name: 'JetBrains Mono', family: '"JetBrains Mono", monospace' },
  { id: 'FiraCode', name: 'Fira Code', family: '"Fira Code", monospace' },
] as const;

export interface LineStyle {
  fontId: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  opacity: number;
}

export interface FrameSettings {
  // 布局
  padding: number;
  aspectRatio: 'original' | 'square' | 'portrait' | 'landscape';
  
  // 边框
  borderRadius: number;
  shadowSize: number;
  shadowOpacity: number;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  
  // 背景
  backgroundType: 'color' | 'gradient' | 'blur';
  backgroundGradient: string; 
  gradientStartColor: string;
  gradientEndColor: string;
  gradientAngle: number;
  backgroundBrightness: number;
  blurAmount: number;
  
  // 信息
  showExif: boolean;
  textColor: string;
  fontFamily: string;
  infoPosition: 'bottom' | 'side' | 'overlay';
  infoLayout: 'classic' | 'centered';
  infoPadding: number;
  infoGap: number;
  infoOffset: { x: number, y: number };
  
  // 样式配置
  line1Style: LineStyle;
  line2Style: LineStyle;
  
  customExif: {
    model?: string;
    lens?: string;
    params?: string;
    date?: string;
  };
  selectedCameraPresetId?: string | null;

  // 导出
  exportFormat: 'png' | 'jpeg';
  exportQuality: number;
}

export const DEFAULT_SETTINGS: FrameSettings = {
  padding: 40,
  aspectRatio: 'original',
  borderRadius: 0,
  shadowSize: 20,
  shadowOpacity: 0.1,
  borderWidth: 0,
  borderColor: '#000000',
  backgroundColor: '#ffffff',
  backgroundType: 'color',
  backgroundGradient: 'to right, #4facfe 0%, #00f2fe 100%',
  gradientStartColor: '#4facfe',
  gradientEndColor: '#00f2fe',
  gradientAngle: 135,
  backgroundBrightness: 100,
  blurAmount: 20,
  showExif: true,
  textColor: '#000000',
  fontFamily: 'Inter',
  infoPosition: 'bottom',
  infoLayout: 'centered',
  infoPadding: 0,
  infoGap: 4,
  infoOffset: { x: 0, y: 0 },
  
  line1Style: {
    fontId: 'Inter',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.05,
    opacity: 1,
  },
  line2Style: {
    fontId: 'Inter',
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: 0.02,
    opacity: 0.7,
  },
  
  customExif: {},
  exportFormat: 'png',
  exportQuality: 0.9,
};
