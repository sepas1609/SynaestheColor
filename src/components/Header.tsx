import React from 'react';
import { Sparkles, Eye, History, Share2, Download, Globe, Sun, Moon } from 'lucide-react';
import { ColorBlindnessType } from '../types';

interface HeaderProps {
  colorBlindness: ColorBlindnessType;
  onChangeColorBlindness: (type: ColorBlindnessType) => void;
  isLightPreview: boolean;
  onToggleLightPreview: () => void;
  onOpenHistory: () => void;
  onOpenCommunity: () => void;
  onOpenExport: () => void;
  historyCount: number;
  primaryGlowColor: string;
}

export const Header: React.FC<HeaderProps> = ({
  colorBlindness,
  onChangeColorBlindness,
  isLightPreview,
  onToggleLightPreview,
  onOpenHistory,
  onOpenCommunity,
  onOpenExport,
  historyCount,
  primaryGlowColor
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090D16]/85 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 shadow-lg overflow-hidden group cursor-pointer"
            style={{
              boxShadow: `0 0 20px ${primaryGlowColor}33`
            }}
          >
            <div
              className="absolute inset-0 opacity-40 blur-md transition-colors duration-500"
              style={{ backgroundColor: primaryGlowColor }}
            />
            <Sparkles className="w-5 h-5 text-indigo-300 relative z-10 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Synaesthe<span className="text-indigo-400 font-extrabold">Color</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
                Gemini 3.7
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-400 font-medium">
              Sensory Synaesthesia & WCAG Accessibility Studio
            </p>
          </div>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Color Blindness Vision Simulator Dropdown */}
          <div className="relative flex items-center">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/70 text-xs text-slate-300 hover:border-slate-600 transition-colors">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="color-blindness-select" className="sr-only">Color Vision Filter</label>
              <select
                id="color-blindness-select"
                value={colorBlindness}
                onChange={(e) => onChangeColorBlindness(e.target.value as ColorBlindnessType)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1 font-medium"
              >
                <option value="normal" className="bg-slate-900 text-slate-200">Vision: Normal</option>
                <option value="protanopia" className="bg-slate-900 text-slate-200">Protanopia (Red-blind)</option>
                <option value="deuteranopia" className="bg-slate-900 text-slate-200">Deuteranopia (Green-blind)</option>
                <option value="tritanopia" className="bg-slate-900 text-slate-200">Tritanopia (Blue-blind)</option>
                <option value="achromatopsia" className="bg-slate-900 text-slate-200">Achromatopsia (Mono)</option>
              </select>
            </div>
          </div>

          {/* Light/Dark Preview Mode Toggle */}
          <button
            id="toggle-preview-mode-btn"
            onClick={onToggleLightPreview}
            title={isLightPreview ? "Switch preview to Dark canvas" : "Switch preview to Light canvas"}
            className="p-2 rounded-lg bg-slate-900/90 border border-slate-700/70 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            {isLightPreview ? (
              <Moon className="w-4 h-4 text-amber-300" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Community Showcase Button */}
          <button
            id="community-showcase-btn"
            onClick={onOpenCommunity}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/70 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/90 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>Community</span>
          </button>

          {/* History Drawer Button */}
          <button
            id="history-drawer-btn"
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/70 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800/90 transition-all"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">History</span>
            {historyCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {historyCount}
              </span>
            )}
          </button>

          {/* Export & Share Action Button */}
          <button
            id="export-modal-open-btn"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 border border-indigo-400/30 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export & Share</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
