import React from 'react';
import { ColorItem, Palette } from '../types';
import { History, X, Trash2, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface HistoryDrawerProps {
  history: Palette[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPalette: (palette: Palette) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  isOpen,
  onClose,
  onSelectPalette,
  onClearHistory,
  onDeleteHistoryItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Prompt & Palette History
              </h3>
              <p className="text-xs text-slate-400">
                {history.length} saved sessions in browser storage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                title="Clear all history"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500">
              <Clock className="w-10 h-10 mb-3 text-slate-600" />
              <p className="text-sm font-semibold">No saved palettes yet</p>
              <p className="text-xs mt-1 max-w-xs">
                Generated color palettes and prompts are automatically saved here for quick recall.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectPalette(item);
                  onClose();
                }}
                className="group p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 cursor-pointer transition-all duration-200 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    "{item.prompt}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  {/* Swatches dots */}
                  <div className="flex items-center -space-x-1.5">
                    {(Object.values(item.colors) as ColorItem[]).map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-slate-900 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteHistoryItem(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Load</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
