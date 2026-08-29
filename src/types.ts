export type ColorRole = 'primary' | 'secondary' | 'accent' | 'background' | 'surface';

export type HarmonyType = 'freeform' | 'complementary' | 'analogous' | 'triadic' | 'monochromatic' | 'split-complementary';

export type ColorBlindnessType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface CmykColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface ColorItem {
  role: ColorRole;
  name: string;
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  cmyk: CmykColor;
  hsv: HsvColor;
  rationale: string;
  luminance: number;
}

export interface Palette {
  id: string;
  prompt: string;
  translatedPrompt?: string;
  title: string;
  mood: string;
  harmony: HarmonyType;
  synaestheticSense: string;
  colors: Record<ColorRole, ColorItem>;
  timestamp: number;
  temperature: number;
  latencyMs?: number;
  tokensUsed?: number;
  likes: number;
  tags: string[];
}

export interface WCAGScore {
  ratio: number;
  formattedRatio: string;
  isAANormal: boolean; // >= 4.5
  isAALarge: boolean;  // >= 3.0
  isAAANormal: boolean; // >= 7.0
  isAAALarge: boolean;  // >= 4.5
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
}

export interface ContrastPairing {
  id: string;
  foregroundRole: ColorRole;
  backgroundRole: ColorRole;
  foregroundHex: string;
  backgroundHex: string;
  foregroundName: string;
  backgroundName: string;
  score: WCAGScore;
  suggestedForegroundHex?: string;
  suggestedScore?: WCAGScore;
}
