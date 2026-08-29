import React, { useState } from 'react';
import { Copy, Check, Sliders, Info, Sparkles, RefreshCw } from 'lucide-react';
import { ColorItem, ColorRole, Palette } from '../types';
import { getContrastRatio } from '../utils/colorScience';

interface PaletteDisplayProps {
  palette: Palette;
  onEditColor: (role: ColorRole) => void;
  onSelectColor: (role: ColorRole) => void;
  selectedRole: ColorRole;
  isLightPreview: boolean;
}

export const PaletteDisplay: React.FC<PaletteDisplayProps> = ({
  palette,
  onEditColor,
  onSelectColor,
  selectedRole,
  isLightPreview
}) => {
  const [copiedRole, setCopiedRole] = useState<string | null>(null);

  const roles: ColorRole[] = ['primary', 'secondary', 'accent', 'background', 'surface'];

  const copyToClipboard = (text: string, roleKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedRole(roleKey);
    setTimeout(() => {
      setCopiedRole(null);
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Header with Title and Synaesthetic Mood */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {palette.title}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {palette.harmony}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{palette.mood}</span>
          </p>
        </div>

        {/* Synaesthetic Senses Trigger Tag */}
        {palette.synaestheticSense && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-medium">
            <span className="text-indigo-400 font-semibold">Sensory Trigger:</span>
            <span className="text-slate-300">{palette.synaestheticSense}</span>
          </div>
        )}
      </div>

      {/* 5-Column Swatch Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {roles.map((role) => {
          const item: ColorItem = palette.colors[role];
          const isSelected = selectedRole === role;
          const isLight = item.luminance > 0.45;
          const textColor = isLight ? '#0B0F19' : '#FFFFFF';

          // Contrast with canvas background
          const bgContrast = getContrastRatio(item.hex, palette.colors.background.hex);

          return (
            <div
              key={role}
              id={`color-swatch-card-${role}`}
              onClick={() => onSelectColor(role)}
              className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'border-indigo-400 ring-2 ring-indigo-500/40 shadow-2xl scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700 shadow-lg hover:scale-[1.01]'
              } bg-slate-900/80 backdrop-blur-xl`}
            >
              {/* Main Swatch Block */}
              <div
                className="relative h-32 sm:h-36 w-full p-4 flex flex-col justify-between transition-colors duration-500"
                style={{ backgroundColor: item.hex }}
              >
                {/* Role Badge & Quick Edit Button */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm border border-black/10"
                    style={{
                      backgroundColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                      color: textColor
                    }}
                  >
                    {role}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditColor(role);
                    }}
                    title={`Fine-tune ${role} color override`}
                    className="p-1.5 rounded-lg backdrop-blur-md transition-transform active:scale-90 hover:opacity-100 opacity-80"
                    style={{
                      backgroundColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                      color: textColor
                    }}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Evocative Color Name & Hex in Swatch */}
                <div>
                  <h3
                    className="text-base font-extrabold tracking-tight truncate drop-shadow-sm"
                    style={{ color: textColor }}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className="font-mono text-sm font-bold tracking-wider"
                      style={{ color: textColor }}
                    >
                      {item.hex}
                    </span>

                    {/* Copy Hex Button */}
                    <button
                      type="button"
                      onClick={(e) => copyToClipboard(item.hex, role, e)}
                      title="Copy hex code"
                      className="p-1.5 rounded-md backdrop-blur-md text-xs font-semibold flex items-center gap-1 transition-all active:scale-90"
                      style={{
                        backgroundColor: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.2)',
                        color: textColor
                      }}
                    >
                      {copiedRole === role ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Data & Psychological Rationale Section */}
              <div className="p-3.5 flex flex-col justify-between flex-1 bg-slate-900/90 border-t border-slate-800/80">
                {/* RGB / HSL / Contrast Quick Values */}
                <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">RGB:</span>
                    <span className="text-slate-300 font-medium">{item.rgb.r}, {item.rgb.g}, {item.rgb.b}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">HSL:</span>
                    <span className="text-slate-300 font-medium">{item.hsl.h}°, {item.hsl.s}%, {item.hsl.l}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Luminance:</span>
                    <span className="text-slate-300 font-medium">{(item.luminance * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Psychological Rationale */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/60">
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed" title={item.rationale}>
                    {item.rationale}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
