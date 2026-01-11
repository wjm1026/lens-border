/**
 * 相机品牌和型号预设数据
 * Camera brand and model preset data
 */

export interface CameraPreset {
  id: string;
  brand: string;
  model: string;
  displayName: string; // 显示名称 (品牌 + 型号)
  defaultLens?: string; // 默认镜头
}

export interface CameraBrand {
  id: string;
  name: string;
  logo?: string; // 可选的品牌 logo
  models: CameraPreset[];
}

// 相机品牌和型号数据
export const CAMERA_BRANDS: CameraBrand[] = [
  {
    id: 'nikon',
    name: 'Nikon',
    models: [
      { id: 'nikon-z9', brand: 'NIKON CORPORATION', model: 'NIKON Z 9', displayName: 'Nikon Z9', defaultLens: 'NIKKOR Z 24-70mm f/2.8 S' },
      { id: 'nikon-z8', brand: 'NIKON CORPORATION', model: 'NIKON Z 8', displayName: 'Nikon Z8', defaultLens: 'NIKKOR Z 24-70mm f/2.8 S' },
      { id: 'nikon-z7ii', brand: 'NIKON CORPORATION', model: 'NIKON Z 7II', displayName: 'Nikon Z7 II', defaultLens: 'NIKKOR Z 24-70mm f/4 S' },
      { id: 'nikon-z6iii', brand: 'NIKON CORPORATION', model: 'NIKON Z 6III', displayName: 'Nikon Z6 III', defaultLens: 'NIKKOR Z 24-120mm f/4 S' },
      { id: 'nikon-z6ii', brand: 'NIKON CORPORATION', model: 'NIKON Z 6II', displayName: 'Nikon Z6 II', defaultLens: 'NIKKOR Z 24-70mm f/4 S' },
      { id: 'nikon-zf', brand: 'NIKON CORPORATION', model: 'NIKON Z f', displayName: 'Nikon Zf', defaultLens: 'NIKKOR Z 40mm f/2' },
      { id: 'nikon-z5', brand: 'NIKON CORPORATION', model: 'NIKON Z 5', displayName: 'Nikon Z5', defaultLens: 'NIKKOR Z 24-50mm f/4-6.3' },
      { id: 'nikon-zfc', brand: 'NIKON CORPORATION', model: 'NIKON Z fc', displayName: 'Nikon Z fc', defaultLens: 'NIKKOR Z DX 16-50mm f/3.5-6.3 VR' },
      { id: 'nikon-z50', brand: 'NIKON CORPORATION', model: 'NIKON Z 50', displayName: 'Nikon Z50', defaultLens: 'NIKKOR Z DX 16-50mm f/3.5-6.3 VR' },
      { id: 'nikon-d850', brand: 'NIKON CORPORATION', model: 'NIKON D850', displayName: 'Nikon D850', defaultLens: 'AF-S NIKKOR 24-70mm f/2.8E ED VR' },
      { id: 'nikon-d780', brand: 'NIKON CORPORATION', model: 'NIKON D780', displayName: 'Nikon D780', defaultLens: 'AF-S NIKKOR 24-120mm f/4G ED VR' },
      { id: 'nikon-d7500', brand: 'NIKON CORPORATION', model: 'NIKON D7500', displayName: 'Nikon D7500', defaultLens: 'AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR' },
    ]
  },
  {
    id: 'canon',
    name: 'Canon',
    models: [
      { id: 'canon-r1', brand: 'Canon', model: 'Canon EOS R1', displayName: 'Canon EOS R1', defaultLens: 'RF 24-70mm F2.8 L IS USM' },
      { id: 'canon-r5ii', brand: 'Canon', model: 'Canon EOS R5 Mark II', displayName: 'Canon EOS R5 II', defaultLens: 'RF 24-70mm F2.8 L IS USM' },
      { id: 'canon-r5', brand: 'Canon', model: 'Canon EOS R5', displayName: 'Canon EOS R5', defaultLens: 'RF 24-70mm F2.8 L IS USM' },
      { id: 'canon-r6ii', brand: 'Canon', model: 'Canon EOS R6 Mark II', displayName: 'Canon EOS R6 II', defaultLens: 'RF 24-105mm F4 L IS USM' },
      { id: 'canon-r6', brand: 'Canon', model: 'Canon EOS R6', displayName: 'Canon EOS R6', defaultLens: 'RF 24-105mm F4 L IS USM' },
      { id: 'canon-r8', brand: 'Canon', model: 'Canon EOS R8', displayName: 'Canon EOS R8', defaultLens: 'RF 24-50mm F4.5-6.3 IS STM' },
      { id: 'canon-r7', brand: 'Canon', model: 'Canon EOS R7', displayName: 'Canon EOS R7', defaultLens: 'RF-S 18-150mm F3.5-6.3 IS STM' },
      { id: 'canon-r10', brand: 'Canon', model: 'Canon EOS R10', displayName: 'Canon EOS R10', defaultLens: 'RF-S 18-45mm F4.5-6.3 IS STM' },
      { id: 'canon-r50', brand: 'Canon', model: 'Canon EOS R50', displayName: 'Canon EOS R50', defaultLens: 'RF-S 18-45mm F4.5-6.3 IS STM' },
      { id: 'canon-5div', brand: 'Canon', model: 'Canon EOS 5D Mark IV', displayName: 'Canon EOS 5D IV', defaultLens: 'EF 24-70mm f/2.8L II USM' },
      { id: 'canon-6dii', brand: 'Canon', model: 'Canon EOS 6D Mark II', displayName: 'Canon EOS 6D II', defaultLens: 'EF 24-105mm f/4L IS II USM' },
      { id: 'canon-90d', brand: 'Canon', model: 'Canon EOS 90D', displayName: 'Canon EOS 90D', defaultLens: 'EF-S 18-135mm f/3.5-5.6 IS USM' },
    ]
  },
  {
    id: 'sony',
    name: 'Sony',
    models: [
      { id: 'sony-a1', brand: 'SONY', model: 'ILCE-1', displayName: 'Sony A1', defaultLens: 'FE 24-70mm F2.8 GM II' },
      { id: 'sony-a9iii', brand: 'SONY', model: 'ILCE-9M3', displayName: 'Sony A9 III', defaultLens: 'FE 24-70mm F2.8 GM II' },
      { id: 'sony-a7rv', brand: 'SONY', model: 'ILCE-7RM5', displayName: 'Sony A7R V', defaultLens: 'FE 24-70mm F2.8 GM II' },
      { id: 'sony-a7riv', brand: 'SONY', model: 'ILCE-7RM4', displayName: 'Sony A7R IV', defaultLens: 'FE 24-70mm F2.8 GM' },
      { id: 'sony-a7iv', brand: 'SONY', model: 'ILCE-7M4', displayName: 'Sony A7 IV', defaultLens: 'FE 24-105mm F4 G OSS' },
      { id: 'sony-a7cii', brand: 'SONY', model: 'ILCE-7CM2', displayName: 'Sony A7C II', defaultLens: 'FE 28-60mm F4-5.6' },
      { id: 'sony-a7c', brand: 'SONY', model: 'ILCE-7C', displayName: 'Sony A7C', defaultLens: 'FE 28-60mm F4-5.6' },
      { id: 'sony-a6700', brand: 'SONY', model: 'ILCE-6700', displayName: 'Sony A6700', defaultLens: 'E 16-55mm F2.8 G' },
      { id: 'sony-a6600', brand: 'SONY', model: 'ILCE-6600', displayName: 'Sony A6600', defaultLens: 'E 18-135mm F3.5-5.6 OSS' },
      { id: 'sony-a6400', brand: 'SONY', model: 'ILCE-6400', displayName: 'Sony A6400', defaultLens: 'E 18-135mm F3.5-5.6 OSS' },
      { id: 'sony-zve1', brand: 'SONY', model: 'ZV-E1', displayName: 'Sony ZV-E1', defaultLens: 'FE 28-60mm F4-5.6' },
      { id: 'sony-zve10', brand: 'SONY', model: 'ZV-E10', displayName: 'Sony ZV-E10', defaultLens: 'E PZ 16-50mm F3.5-5.6 OSS' },
    ]
  },
  {
    id: 'fujifilm',
    name: 'Fujifilm',
    models: [
      { id: 'fuji-gfx100ii', brand: 'FUJIFILM', model: 'GFX100 II', displayName: 'Fujifilm GFX100 II', defaultLens: 'GF 32-64mm F4 R LM WR' },
      { id: 'fuji-gfx100s', brand: 'FUJIFILM', model: 'GFX100S', displayName: 'Fujifilm GFX100S', defaultLens: 'GF 32-64mm F4 R LM WR' },
      { id: 'fuji-xh2s', brand: 'FUJIFILM', model: 'X-H2S', displayName: 'Fujifilm X-H2S', defaultLens: 'XF 18-120mm F4 LM PZ WR' },
      { id: 'fuji-xh2', brand: 'FUJIFILM', model: 'X-H2', displayName: 'Fujifilm X-H2', defaultLens: 'XF 16-80mm F4 R OIS WR' },
      { id: 'fuji-xt5', brand: 'FUJIFILM', model: 'X-T5', displayName: 'Fujifilm X-T5', defaultLens: 'XF 18-55mm F2.8-4 R LM OIS' },
      { id: 'fuji-xt4', brand: 'FUJIFILM', model: 'X-T4', displayName: 'Fujifilm X-T4', defaultLens: 'XF 18-55mm F2.8-4 R LM OIS' },
      { id: 'fuji-xt30ii', brand: 'FUJIFILM', model: 'X-T30 II', displayName: 'Fujifilm X-T30 II', defaultLens: 'XF 18-55mm F2.8-4 R LM OIS' },
      { id: 'fuji-xs20', brand: 'FUJIFILM', model: 'X-S20', displayName: 'Fujifilm X-S20', defaultLens: 'XF 18-55mm F2.8-4 R LM OIS' },
      { id: 'fuji-xs10', brand: 'FUJIFILM', model: 'X-S10', displayName: 'Fujifilm X-S10', defaultLens: 'XF 18-55mm F2.8-4 R LM OIS' },
      { id: 'fuji-xpro3', brand: 'FUJIFILM', model: 'X-Pro3', displayName: 'Fujifilm X-Pro3', defaultLens: 'XF 23mm F2 R WR' },
      { id: 'fuji-x100vi', brand: 'FUJIFILM', model: 'X100VI', displayName: 'Fujifilm X100VI', defaultLens: '23mm F2' },
      { id: 'fuji-x100v', brand: 'FUJIFILM', model: 'X100V', displayName: 'Fujifilm X100V', defaultLens: '23mm F2' },
    ]
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    models: [
      { id: 'pana-s1h', brand: 'Panasonic', model: 'DC-S1H', displayName: 'Panasonic S1H', defaultLens: 'LUMIX S 24-70mm F2.8' },
      { id: 'pana-s1r', brand: 'Panasonic', model: 'DC-S1R', displayName: 'Panasonic S1R', defaultLens: 'LUMIX S 24-70mm F2.8' },
      { id: 'pana-s1', brand: 'Panasonic', model: 'DC-S1', displayName: 'Panasonic S1', defaultLens: 'LUMIX S 24-105mm F4' },
      { id: 'pana-s5ii', brand: 'Panasonic', model: 'DC-S5M2', displayName: 'Panasonic S5 II', defaultLens: 'LUMIX S 20-60mm F3.5-5.6' },
      { id: 'pana-s5', brand: 'Panasonic', model: 'DC-S5', displayName: 'Panasonic S5', defaultLens: 'LUMIX S 20-60mm F3.5-5.6' },
      { id: 'pana-gh6', brand: 'Panasonic', model: 'DC-GH6', displayName: 'Panasonic GH6', defaultLens: 'LEICA DG 12-60mm F2.8-4.0' },
      { id: 'pana-gh5ii', brand: 'Panasonic', model: 'DC-GH5M2', displayName: 'Panasonic GH5 II', defaultLens: 'LEICA DG 12-60mm F2.8-4.0' },
      { id: 'pana-g9ii', brand: 'Panasonic', model: 'DC-G9M2', displayName: 'Panasonic G9 II', defaultLens: 'LEICA DG 12-60mm F2.8-4.0' },
    ]
  },
  {
    id: 'leica',
    name: 'Leica',
    models: [
      { id: 'leica-sl3', brand: 'LEICA CAMERA AG', model: 'LEICA SL3', displayName: 'Leica SL3', defaultLens: 'VARIO-ELMARIT-SL 24-70 f/2.8 ASPH.' },
      { id: 'leica-sl2s', brand: 'LEICA CAMERA AG', model: 'LEICA SL2-S', displayName: 'Leica SL2-S', defaultLens: 'VARIO-ELMARIT-SL 24-70 f/2.8 ASPH.' },
      { id: 'leica-sl2', brand: 'LEICA CAMERA AG', model: 'LEICA SL2', displayName: 'Leica SL2', defaultLens: 'VARIO-ELMARIT-SL 24-90 f/2.8-4 ASPH.' },
      { id: 'leica-m11', brand: 'LEICA CAMERA AG', model: 'LEICA M11', displayName: 'Leica M11', defaultLens: 'SUMMILUX-M 50 f/1.4 ASPH.' },
      { id: 'leica-m11p', brand: 'LEICA CAMERA AG', model: 'LEICA M11-P', displayName: 'Leica M11-P', defaultLens: 'SUMMILUX-M 35 f/1.4 ASPH.' },
      { id: 'leica-m10r', brand: 'LEICA CAMERA AG', model: 'LEICA M10-R', displayName: 'Leica M10-R', defaultLens: 'SUMMICRON-M 35 f/2 ASPH.' },
      { id: 'leica-q3', brand: 'LEICA CAMERA AG', model: 'LEICA Q3', displayName: 'Leica Q3', defaultLens: 'SUMMILUX 28 f/1.7 ASPH.' },
      { id: 'leica-q2', brand: 'LEICA CAMERA AG', model: 'LEICA Q2', displayName: 'Leica Q2', defaultLens: 'SUMMILUX 28 f/1.7 ASPH.' },
    ]
  },
  {
    id: 'hasselblad',
    name: 'Hasselblad',
    models: [
      { id: 'hass-x2d', brand: 'Hasselblad', model: 'X2D 100C', displayName: 'Hasselblad X2D 100C', defaultLens: 'XCD 55V' },
      { id: 'hass-x1dii', brand: 'Hasselblad', model: 'X1D II 50C', displayName: 'Hasselblad X1D II', defaultLens: 'XCD 45P' },
      { id: 'hass-907x', brand: 'Hasselblad', model: '907X 50C', displayName: 'Hasselblad 907X', defaultLens: 'XCD 30' },
      { id: 'hass-h6d100c', brand: 'Hasselblad', model: 'H6D-100c', displayName: 'Hasselblad H6D-100c', defaultLens: 'HC 80mm f/2.8' },
    ]
  },
  {
    id: 'pentax',
    name: 'Pentax',
    models: [
      { id: 'pentax-k1ii', brand: 'PENTAX', model: 'PENTAX K-1 Mark II', displayName: 'Pentax K-1 II', defaultLens: 'HD PENTAX-D FA 24-70mm F2.8 ED SDM WR' },
      { id: 'pentax-k3iii', brand: 'PENTAX', model: 'PENTAX K-3 Mark III', displayName: 'Pentax K-3 III', defaultLens: 'HD PENTAX-DA 16-85mm F3.5-5.6 ED DC WR' },
      { id: 'pentax-kf', brand: 'PENTAX', model: 'PENTAX KF', displayName: 'Pentax KF', defaultLens: 'HD PENTAX-DA 18-55mm F3.5-5.6 AL WR' },
      { id: 'pentax-645z', brand: 'PENTAX', model: 'PENTAX 645Z', displayName: 'Pentax 645Z', defaultLens: 'HD PENTAX-D FA 645 55mm F2.8 AL [IF] SDM AW' },
    ]
  },
  {
    id: 'olympus',
    name: 'OM System',
    models: [
      { id: 'om-om1ii', brand: 'OM Digital Solutions', model: 'OM-1 Mark II', displayName: 'OM System OM-1 II', defaultLens: 'M.Zuiko 12-40mm F2.8 PRO II' },
      { id: 'om-om1', brand: 'OM Digital Solutions', model: 'OM-1', displayName: 'OM System OM-1', defaultLens: 'M.Zuiko 12-40mm F2.8 PRO II' },
      { id: 'om-om5', brand: 'OM Digital Solutions', model: 'OM-5', displayName: 'OM System OM-5', defaultLens: 'M.Zuiko 12-45mm F4.0 PRO' },
      { id: 'oly-em1iii', brand: 'OLYMPUS CORPORATION', model: 'E-M1 Mark III', displayName: 'Olympus E-M1 III', defaultLens: 'M.Zuiko 12-40mm F2.8 PRO' },
      { id: 'oly-em1x', brand: 'OLYMPUS CORPORATION', model: 'E-M1X', displayName: 'Olympus E-M1X', defaultLens: 'M.Zuiko 12-40mm F2.8 PRO' },
      { id: 'oly-em5iii', brand: 'OLYMPUS CORPORATION', model: 'E-M5 Mark III', displayName: 'Olympus E-M5 III', defaultLens: 'M.Zuiko 12-45mm F4.0 PRO' },
    ]
  },
  {
    id: 'sigma',
    name: 'Sigma',
    models: [
      { id: 'sigma-fp', brand: 'SIGMA', model: 'fp', displayName: 'Sigma fp', defaultLens: 'SIGMA 45mm F2.8 DG DN' },
      { id: 'sigma-fpl', brand: 'SIGMA', model: 'fp L', displayName: 'Sigma fp L', defaultLens: 'SIGMA 35mm F1.4 DG DN' },
      { id: 'sigma-sdq', brand: 'SIGMA', model: 'sd Quattro', displayName: 'Sigma sd Quattro', defaultLens: 'SIGMA 30mm F1.4 DC HSM' },
      { id: 'sigma-sdqh', brand: 'SIGMA', model: 'sd Quattro H', displayName: 'Sigma sd Quattro H', defaultLens: 'SIGMA 35mm F1.4 DG HSM' },
    ]
  },
  {
    id: 'ricoh',
    name: 'Ricoh',
    models: [
      { id: 'ricoh-griii', brand: 'RICOH IMAGING COMPANY, LTD.', model: 'GR III', displayName: 'Ricoh GR III', defaultLens: 'GR 18.3mm F2.8' },
      { id: 'ricoh-griiix', brand: 'RICOH IMAGING COMPANY, LTD.', model: 'GR IIIx', displayName: 'Ricoh GR IIIx', defaultLens: 'GR 26.1mm F2.8' },
      { id: 'ricoh-griiihdf', brand: 'RICOH IMAGING COMPANY, LTD.', model: 'GR III HDF', displayName: 'Ricoh GR III HDF', defaultLens: 'GR 18.3mm F2.8' },
    ]
  },
  {
    id: 'dji',
    name: 'DJI',
    models: [
      { id: 'dji-mavic3pro', brand: 'DJI', model: 'Mavic 3 Pro', displayName: 'DJI Mavic 3 Pro', defaultLens: 'Hasselblad Camera' },
      { id: 'dji-mavic3', brand: 'DJI', model: 'Mavic 3', displayName: 'DJI Mavic 3', defaultLens: 'Hasselblad Camera' },
      { id: 'dji-air3', brand: 'DJI', model: 'Air 3', displayName: 'DJI Air 3', defaultLens: 'Wide-Angle Camera' },
      { id: 'dji-mini4pro', brand: 'DJI', model: 'Mini 4 Pro', displayName: 'DJI Mini 4 Pro', defaultLens: '1/1.3" CMOS Camera' },
      { id: 'dji-osmopocket3', brand: 'DJI', model: 'Osmo Pocket 3', displayName: 'DJI Osmo Pocket 3', defaultLens: '1" CMOS Camera' },
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    models: [
      { id: 'iphone-16promax', brand: 'Apple', model: 'iPhone 16 Pro Max', displayName: 'iPhone 16 Pro Max', defaultLens: '48MP Main Camera' },
      { id: 'iphone-16pro', brand: 'Apple', model: 'iPhone 16 Pro', displayName: 'iPhone 16 Pro', defaultLens: '48MP Main Camera' },
      { id: 'iphone-16', brand: 'Apple', model: 'iPhone 16', displayName: 'iPhone 16', defaultLens: '48MP Fusion Camera' },
      { id: 'iphone-15promax', brand: 'Apple', model: 'iPhone 15 Pro Max', displayName: 'iPhone 15 Pro Max', defaultLens: '48MP Main Camera' },
      { id: 'iphone-15pro', brand: 'Apple', model: 'iPhone 15 Pro', displayName: 'iPhone 15 Pro', defaultLens: '48MP Main Camera' },
      { id: 'iphone-15', brand: 'Apple', model: 'iPhone 15', displayName: 'iPhone 15', defaultLens: '48MP Main Camera' },
      { id: 'iphone-14pro', brand: 'Apple', model: 'iPhone 14 Pro', displayName: 'iPhone 14 Pro', defaultLens: '48MP Main Camera' },
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    models: [
      { id: 'samsung-s24ultra', brand: 'Samsung', model: 'SM-S928', displayName: 'Samsung Galaxy S24 Ultra', defaultLens: '200MP Main Camera' },
      { id: 'samsung-s24plus', brand: 'Samsung', model: 'SM-S926', displayName: 'Samsung Galaxy S24+', defaultLens: '50MP Main Camera' },
      { id: 'samsung-s23ultra', brand: 'Samsung', model: 'SM-S918', displayName: 'Samsung Galaxy S23 Ultra', defaultLens: '200MP Main Camera' },
      { id: 'samsung-zfold5', brand: 'Samsung', model: 'SM-F946', displayName: 'Samsung Galaxy Z Fold5', defaultLens: '50MP Main Camera' },
    ]
  },
  {
    id: 'google',
    name: 'Google',
    models: [
      { id: 'pixel-9pro', brand: 'Google', model: 'Pixel 9 Pro', displayName: 'Google Pixel 9 Pro', defaultLens: '50MP Main Camera' },
      { id: 'pixel-9', brand: 'Google', model: 'Pixel 9', displayName: 'Google Pixel 9', defaultLens: '50MP Main Camera' },
      { id: 'pixel-8pro', brand: 'Google', model: 'Pixel 8 Pro', displayName: 'Google Pixel 8 Pro', defaultLens: '50MP Main Camera' },
      { id: 'pixel-8', brand: 'Google', model: 'Pixel 8', displayName: 'Google Pixel 8', defaultLens: '50MP Main Camera' },
      { id: 'pixel-fold', brand: 'Google', model: 'Pixel Fold', displayName: 'Google Pixel Fold', defaultLens: '48MP Main Camera' },
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    models: [
      { id: 'xiaomi-14ultra', brand: 'Xiaomi', model: '14 Ultra', displayName: 'Xiaomi 14 Ultra', defaultLens: 'Leica Vario-Summilux' },
      { id: 'xiaomi-14pro', brand: 'Xiaomi', model: '14 Pro', displayName: 'Xiaomi 14 Pro', defaultLens: 'Leica Summilux' },
      { id: 'xiaomi-14', brand: 'Xiaomi', model: '14', displayName: 'Xiaomi 14', defaultLens: 'Leica Summilux' },
      { id: 'xiaomi-13ultra', brand: 'Xiaomi', model: '13 Ultra', displayName: 'Xiaomi 13 Ultra', defaultLens: 'Leica Vario-Summicron' },
    ]
  },
  {
    id: 'huawei',
    name: 'Huawei',
    models: [
      { id: 'huawei-p60pro', brand: 'HUAWEI', model: 'P60 Pro', displayName: 'Huawei P60 Pro', defaultLens: 'XMAGE Camera' },
      { id: 'huawei-mate60pro', brand: 'HUAWEI', model: 'Mate 60 Pro', displayName: 'Huawei Mate 60 Pro', defaultLens: 'XMAGE Camera' },
      { id: 'huawei-pura70ultra', brand: 'HUAWEI', model: 'Pura 70 Ultra', displayName: 'Huawei Pura 70 Ultra', defaultLens: 'XMAGE Camera' },
    ]
  },
];

// 获取所有相机预设（扁平化）
export const getAllCameraPresets = (): CameraPreset[] => {
  return CAMERA_BRANDS.flatMap(brand => brand.models);
};

// 根据 ID 获取相机预设
export const getCameraPresetById = (id: string): CameraPreset | undefined => {
  return getAllCameraPresets().find(preset => preset.id === id);
};

// 搜索相机预设
export const searchCameraPresets = (query: string): CameraPreset[] => {
  const lowerQuery = query.toLowerCase();
  return getAllCameraPresets().filter(preset => 
    preset.displayName.toLowerCase().includes(lowerQuery) ||
    preset.brand.toLowerCase().includes(lowerQuery) ||
    preset.model.toLowerCase().includes(lowerQuery)
  );
};
