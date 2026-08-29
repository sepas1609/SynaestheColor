import React, { useState } from 'react';
import { Palette, ColorRole, ColorItem } from '../types';
import { SlidersHorizontal, Copy, Check, Hash, Sparkles } from 'lucide-react';

interface ColorSpaceConverterProps {
  palette: Palette;
  selectedRole: ColorRole;
  onSelectRole: (role: ColorRole) => void;
}

export const ColorSpaceConverter: React.FC<ColorSpaceConverterProps> = ({
  palette,
  selectedRole,
  onSelectRole
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const color: ColorItem = palette.colors[selectedRole] || palette.colors.primary;

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formats = [
    { label: 'HEX Code', value: color.hex, key: 'hex' },
    { label: 'RGB (sRGB)', value: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, key: 'rgb' },
    { label: 'HSL (Degrees / %)', value: `hsl(${color.hsl.h}deg, ${color.hsl.s}%, ${color.hsl.l}%)`, key: 'hsl' },
    { label: 'HSV / HSB', value: `hsv(${color.hsv.h}°, ${color.hsv.s}%, ${color.hsv.v}%)`, key: 'hsv' },
    { label: 'CMYK (Print)', value: `cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`, key: 'cmyk' },
    { label: 'CSS Variable', value: `var(--color-${selectedRole})`, key: 'css' },
    { label: 'Tailwind Class', value: `bg-synaesthe-${selectedRole}`, key: 'tailwind' }
  ];

  const roles: ColorRole[] = ['primary', 'secondary', 'accent', 'background', 'surface'];

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Universal Color Space Converter & Inspector
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Convert color representations across Hex, RGB, HSL, HSV, CMYK, and CSS custom property formats.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {roles.map((role) => {
            const isSelected = selectedRole === role;
            const rItem = palette.colors[role];
            return (
              <button
                key={role}
                type="button"
                onClick={() => onSelectRole(role)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rItem.hex }} />
                <span>{role}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Color Preview & Sensory Card */}
        <div
          className="rounded-xl p-5 flex flex-col justify-between border shadow-inner transition-colors duration-500"
          style={{
            backgroundColor: color.hex,
            color: color.luminance > 0.4 ? '#090D16' : '#FFFFFF'
          }}
        >
          <div>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-black/15">
              Active Inspector: {color.role}
            </span>
            <h4 className="text-2xl font-extrabold tracking-tight mt-2 drop-shadow-sm">
              {color.name}
            </h4>
            <div className="font-mono text-base font-bold mt-1">
              {color.hex}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-black/10 text-xs font-medium">
            <p className="opacity-90 leading-relaxed">
              {color.rationale}
            </p>
          </div>
        </div>

        {/* Formats Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {formats.map((fmt) => (
            <div
              key={fmt.key}
              id={`color-format-box-${fmt.key}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors group"
            >
              <div className="overflow-hidden mr-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {fmt.label}
                </div>
                <div className="font-mono text-xs text-slate-200 font-semibold truncate mt-0.5" title={fmt.value}>
                  {fmt.value}
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyVal(fmt.value, fmt.key)}
                title={`Copy ${fmt.label}`}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all active:scale-90 shrink-0"
              >
                {copiedKey === fmt.key ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
