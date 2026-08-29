import { ColorItem, ColorRole, ContrastPairing, HslColor, HsvColor, Palette, RgbColor, WCAGScore } from '../types';

/**
 * Standardize hex string to 6-digit uppercase with #
 */
export function normalizeHex(hex: string): string {
  let clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length > 6) {
    clean = clean.slice(0, 6);
  }
  while (clean.length < 6) {
    clean += '0';
  }
  return `#${clean.toUpperCase()}`;
}

/**
 * Convert Hex to RGB
 */
export function hexToRgb(hex: string): RgbColor {
  const norm = normalizeHex(hex).slice(1);
  const r = parseInt(norm.substring(0, 2), 16) || 0;
  const g = parseInt(norm.substring(2, 4), 16) || 0;
  const b = parseInt(norm.substring(4, 6), 16) || 0;
  return { r, g, b };
}

/**
 * Convert RGB to Hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RgbColor {
  const hNorm = (h % 360 + 360) % 360 / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return { r, g, b };
}

/**
 * Convert RGB to CMYK
 */
export function rgbToCmyk(r: number, g: number, b: number) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = Math.round(((1 - rNorm - k) / (1 - k)) * 100);
  const m = Math.round(((1 - gNorm - k) / (1 - k)) * 100);
  const y = Math.round(((1 - bNorm - k) / (1 - k)) * 100);

  return {
    c: Math.max(0, Math.min(100, c)),
    m: Math.max(0, Math.min(100, m)),
    y: Math.max(0, Math.min(100, y)),
    k: Math.round(k * 100)
  };
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): HsvColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

/**
 * Calculate WCAG 2.1 Relative Luminance (0.0 to 1.0)
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map(v => {
    const val = v / 255;
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculate WCAG 2.1 Contrast Ratio between two hex colors
 */
export function getContrastRatio(hex1: string, hex2: string): WCAGScore {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  const isAANormal = ratio >= 4.5;
  const isAALarge = ratio >= 3.0;
  const isAAANormal = ratio >= 7.0;
  const isAAALarge = ratio >= 4.5;

  let level: 'AAA' | 'AA' | 'AA Large' | 'Fail' = 'Fail';
  if (isAAANormal) level = 'AAA';
  else if (isAANormal) level = 'AA';
  else if (isAALarge) level = 'AA Large';

  return {
    ratio: roundedRatio,
    formattedRatio: `${roundedRatio.toFixed(2)}:1`,
    isAANormal,
    isAALarge,
    isAAANormal,
    isAAALarge,
    level
  };
}

/**
 * Intelligent Contrast Auto-Correction
 * Finds the closest hex shade of the foreground color that passes WCAG AA (>= 4.5:1)
 * or AAA (>= 7.0:1) on the given background.
 */
export function autoCorrectContrast(fgHex: string, bgHex: string, targetRatio = 4.5): string {
  const bgRgb = hexToRgb(bgHex);
  const bgLum = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const fgHsl = rgbToHsl(hexToRgb(fgHex).r, hexToRgb(fgHex).g, hexToRgb(fgHex).b);

  // Determine whether to lighten or darken based on background luminance
  const shouldLighten = bgLum < 0.45;

  let bestHex = fgHex;
  let bestDiff = Infinity;

  // Search through lightness steps 0 to 100
  for (let l = 0; l <= 100; l += 1) {
    const candidateRgb = hslToRgb(fgHsl.h, fgHsl.s, l);
    const candidateHex = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
    const score = getContrastRatio(candidateHex, bgHex);

    if (score.ratio >= targetRatio) {
      // Lightness delta from original
      const diff = Math.abs(l - fgHsl.l);
      // Prefer light on dark, dark on light
      const directionMatches = shouldLighten ? l >= fgHsl.l : l <= fgHsl.l;
      const weight = directionMatches ? 1 : 2;

      if (diff * weight < bestDiff) {
        bestDiff = diff * weight;
        bestHex = candidateHex;
      }
    }
  }

  // If still not passing (edge cases), fallback to pure white or near-black
  if (getContrastRatio(bestHex, bgHex).ratio < targetRatio) {
    return bgLum < 0.5 ? '#FFFFFF' : '#0B0F19';
  }

  return bestHex;
}

/**
 * Convert RGB to CIE XYZ
 */
function rgbToXyz(r: number, g: number, b: number) {
  let rL = r / 255;
  let gL = g / 255;
  let bL = b / 255;

  rL = rL > 0.04045 ? Math.pow((rL + 0.055) / 1.055, 2.4) : rL / 12.92;
  gL = gL > 0.04045 ? Math.pow((gL + 0.055) / 1.055, 2.4) : gL / 12.92;
  bL = bL > 0.04045 ? Math.pow((bL + 0.055) / 1.055, 2.4) : bL / 12.92;

  rL *= 100;
  gL *= 100;
  bL *= 100;

  const x = rL * 0.4124 + gL * 0.3576 + bL * 0.1805;
  const y = rL * 0.2126 + gL * 0.7152 + bL * 0.0722;
  const z = rL * 0.0193 + gL * 0.1192 + bL * 0.9505;

  return { x, y, z };
}

/**
 * Convert XYZ to CIE Lab
 */
function xyzToLab(x: number, y: number, z: number) {
  // Reference white D65
  const xn = 95.047;
  const yn = 100.0;
  const zn = 108.883;

  let xR = x / xn;
  let yR = y / yn;
  let zR = z / zn;

  const f = (t: number) => (t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116);

  xR = f(xR);
  yR = f(yR);
  zR = f(zR);

  const l = 116 * yR - 16;
  const a = 500 * (xR - yR);
  const b = 200 * (yR - zR);

  return { l, a, b };
}

/**
 * Calculate Delta E (CIE76 perceptual color difference metric)
 */
export function getDeltaE(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const xyz1 = rgbToXyz(rgb1.r, rgb1.g, rgb1.b);
  const xyz2 = rgbToXyz(rgb2.r, rgb2.g, rgb2.b);

  const lab1 = xyzToLab(xyz1.x, xyz1.y, xyz1.z);
  const lab2 = xyzToLab(xyz2.x, xyz2.y, xyz2.z);

  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  const deltaE = Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
  return Math.round(deltaE * 10) / 10;
}

/**
 * Build a full ColorItem object from hex, name, and rationale
 */
export function buildColorItem(role: ColorRole, hex: string, name: string, rationale: string): ColorItem {
  const normHex = normalizeHex(hex);
  const rgb = hexToRgb(normHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const luminance = Math.round(getRelativeLuminance(rgb.r, rgb.g, rgb.b) * 1000) / 1000;

  return {
    role,
    name: name || `${role.charAt(0).toUpperCase() + role.slice(1)} Shade`,
    hex: normHex,
    rgb,
    hsl,
    cmyk,
    hsv,
    rationale: rationale || `Psychologically balanced ${role} tone suited for emotional resonance.`,
    luminance
  };
}

/**
 * Generate contrast pairings matrix for a palette
 */
export function generateContrastPairings(colors: Record<ColorRole, ColorItem>): ContrastPairing[] {
  const pairingsConfig: Array<{ fg: ColorRole; bg: ColorRole }> = [
    { fg: 'primary', bg: 'background' },
    { fg: 'primary', bg: 'surface' },
    { fg: 'accent', bg: 'background' },
    { fg: 'accent', bg: 'surface' },
    { fg: 'secondary', bg: 'background' },
    { fg: 'surface', bg: 'background' },
  ];

  return pairingsConfig.map(({ fg, bg }) => {
    const fgItem = colors[fg];
    const bgItem = colors[bg];
    const score = getContrastRatio(fgItem.hex, bgItem.hex);

    let suggestedForegroundHex: string | undefined;
    let suggestedScore: WCAGScore | undefined;

    if (!score.isAANormal) {
      suggestedForegroundHex = autoCorrectContrast(fgItem.hex, bgItem.hex, 4.5);
      suggestedScore = getContrastRatio(suggestedForegroundHex, bgItem.hex);
    }

    return {
      id: `${fg}-on-${bg}`,
      foregroundRole: fg,
      backgroundRole: bg,
      foregroundHex: fgItem.hex,
      backgroundHex: bgItem.hex,
      foregroundName: fgItem.name,
      backgroundName: bgItem.name,
      score,
      suggestedForegroundHex,
      suggestedScore
    };
  });
}

/**
 * Code Exporters
 */
export function exportToCssVariables(palette: Palette): string {
  return `/* SynaestheColor — Palette: "${palette.title}" */
/* Prompt: "${palette.prompt}" */
:root {
  --color-primary: ${palette.colors.primary.hex};
  --color-secondary: ${palette.colors.secondary.hex};
  --color-accent: ${palette.colors.accent.hex};
  --color-background: ${palette.colors.background.hex};
  --color-surface: ${palette.colors.surface.hex};

  /* RGB Channel Formats for opacity composition */
  --rgb-primary: ${palette.colors.primary.rgb.r}, ${palette.colors.primary.rgb.g}, ${palette.colors.primary.rgb.b};
  --rgb-secondary: ${palette.colors.secondary.rgb.r}, ${palette.colors.secondary.rgb.g}, ${palette.colors.secondary.rgb.b};
  --rgb-accent: ${palette.colors.accent.rgb.r}, ${palette.colors.accent.rgb.g}, ${palette.colors.accent.rgb.b};
  --rgb-background: ${palette.colors.background.rgb.r}, ${palette.colors.background.rgb.g}, ${palette.colors.background.rgb.b};
  --rgb-surface: ${palette.colors.surface.rgb.r}, ${palette.colors.surface.rgb.g}, ${palette.colors.surface.rgb.b};
}`;
}

export function exportToTailwindConfig(palette: Palette): string {
  return `// tailwind.config.js (Tailwind v3)
module.exports = {
  theme: {
    extend: {
      colors: {
        synaesthe: {
          primary: '${palette.colors.primary.hex}',
          secondary: '${palette.colors.secondary.hex}',
          accent: '${palette.colors.accent.hex}',
          background: '${palette.colors.background.hex}',
          surface: '${palette.colors.surface.hex}',
        }
      }
    }
  }
};

/* --- Tailwind CSS v4 Theme Format --- */
/*
@theme {
  --color-syn-primary: ${palette.colors.primary.hex};
  --color-syn-secondary: ${palette.colors.secondary.hex};
  --color-syn-accent: ${palette.colors.accent.hex};
  --color-syn-background: ${palette.colors.background.hex};
  --color-syn-surface: ${palette.colors.surface.hex};
}
*/`;
}

export function exportToScss(palette: Palette): string {
  return `// SCSS Variables & Map — SynaestheColor
$syn-primary: ${palette.colors.primary.hex};
$syn-secondary: ${palette.colors.secondary.hex};
$syn-accent: ${palette.colors.accent.hex};
$syn-background: ${palette.colors.background.hex};
$syn-surface: ${palette.colors.surface.hex};

$syn-palette: (
  'primary': $syn-primary,
  'secondary': $syn-secondary,
  'accent': $syn-accent,
  'background': $syn-background,
  'surface': $syn-surface
);`;
}

export function exportToJson(palette: Palette): string {
  return JSON.stringify(palette, null, 2);
}

export function exportToSvg(palette: Palette): string {
  const roles: ColorRole[] = ['primary', 'secondary', 'accent', 'background', 'surface'];
  const width = 800;
  const height = 480;

  const swatchWidth = 140;
  const swatchHeight = 220;
  const startX = 50;
  const startY = 120;
  const gap = 10;

  const swatchesSvg = roles.map((role, i) => {
    const col = palette.colors[role];
    const x = startX + i * (swatchWidth + gap);
    const textColor = col.luminance > 0.4 ? '#090D16' : '#FFFFFF';
    return `
      <g transform="translate(${x}, ${startY})">
        <rect width="${swatchWidth}" height="${swatchHeight}" rx="12" fill="${col.hex}" />
        <text x="12" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="${textColor}" text-transform="uppercase" opacity="0.75">${role}</text>
        <text x="12" y="170" font-family="sans-serif" font-size="14" font-weight="600" fill="${textColor}">${col.name}</text>
        <text x="12" y="195" font-family="monospace" font-size="13" font-weight="bold" fill="${textColor}">${col.hex}</text>
      </g>
    `;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#090D16" rx="16" />
    <text x="50" y="55" font-family="sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">SynaestheColor</text>
    <text x="50" y="82" font-family="sans-serif" font-size="14" fill="#94A3B8">Palette: ${palette.title} • "${palette.prompt.slice(0, 60)}${palette.prompt.length > 60 ? '...' : ''}"</text>
    ${swatchesSvg}
    <text x="50" y="420" font-family="sans-serif" font-size="12" fill="#64748B">Mood: ${palette.mood} | Harmony: ${palette.harmony} | Generated with Google AI Studio</text>
  </svg>`;
}
