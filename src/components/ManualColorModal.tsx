import React, { useState, useEffect } from 'react';
import { ColorItem, ColorRole, Palette } from '../types';
import { buildColorItem, getContrastRatio, normalizeHex } from '../utils/colorScience';
import { X, Check, Sliders, RefreshCw } from 'lucide-react';

interface ManualColorModalProps {
  role: ColorRole | null;
  palette: Palette;
  isOpen: boolean;
  onClose: () => void;
  onApplyOverride: (role: ColorRole, updatedColor: ColorItem) => void;
}

export const ManualColorModal: React.FC<ManualColorModalProps> = ({
  role,
  palette,
  isOpen,
  onClose,
  onApplyOverride
}) => {
  if (!isOpen || !role) return null;

  const currentColor = palette.colors[role];
  const [hexInput, setHexInput] = useState(currentColor.hex);
  const [nameInput, setNameInput] = useState(currentColor.name);
  const [rationaleInput, setRationaleInput] = useState(currentColor.rationale);

  useEffect(() => {
    if (role) {
      setHexInput(palette.colors[role].hex);
      setNameInput(palette.colors[role].name);
      setRationaleInput(palette.colors[role].rationale);
    }
  }, [role, palette]);

  const normalized = normalizeHex(hexInput);
  const bgContrast = getContrastRatio(normalized, palette.colors.background.hex);
  const isLight = bgContrast.ratio > 0;

  const handleSave = () => {
    const updated = buildColorItem(role, normalized, nameInput, rationaleInput);
    onApplyOverride(role, updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight capitalize">
              Fine-Tune {role} Shade
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Visual Swatch Preview Box */}
          <div
            className="w-full h-24 rounded-xl p-4 flex flex-col justify-between shadow-inner border border-white/10 transition-colors duration-300"
            style={{ backgroundColor: normalized }}
          >
            <span
              className="font-bold text-xs uppercase px-2 py-0.5 rounded backdrop-blur-md self-start"
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                color: '#FFFFFF'
              }}
            >
              Live Override Preview
            </span>
            <div className="flex items-center justify-between font-mono text-sm font-bold text-white drop-shadow">
              <span>{normalized}</span>
              <span className="text-xs font-semibold backdrop-blur-md px-2 py-0.5 rounded bg-black/30">
                Contrast: {bgContrast.formattedRatio}
              </span>
            </div>
          </div>

          {/* Color Picker & Hex Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hex Code / Native Color Picker
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={normalized.startsWith('#') ? normalized : '#000000'}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                className="w-10 h-10 rounded-lg cursor-pointer bg-slate-950 border border-slate-700 p-0.5"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#00F0FF"
                className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-indigo-500 uppercase"
              />
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Evocative Color Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Psychological Rationale */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Psychological / Synaesthetic Rationale
            </label>
            <textarea
              rows={2}
              value={rationaleInput}
              onChange={(e) => setRationaleInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Override</span>
          </button>
        </div>
      </div>
    </div>
  );
};
