import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Wand2, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { ColorRole, Palette } from '../types';
import { generateContrastPairings, getDeltaE } from '../utils/colorScience';

interface AccessibilityAuditorProps {
  palette: Palette;
  onApplyCorrection: (role: ColorRole, newHex: string) => void;
}

export const AccessibilityAuditor: React.FC<AccessibilityAuditorProps> = ({
  palette,
  onApplyCorrection
}) => {
  const pairings = generateContrastPairings(palette.colors);
  const [activeTab, setActiveTab] = useState<'matrix' | 'deltaE'>('matrix');

  // Compute overall WCAG compliance score
  const passingAA = pairings.filter(p => p.score.isAANormal).length;
  const passingAAA = pairings.filter(p => p.score.isAAANormal).length;
  const overallPercentage = Math.round((passingAA / pairings.length) * 100);

  // Compute Delta E matrix between the 5 roles
  const roles: ColorRole[] = ['primary', 'secondary', 'accent', 'background', 'surface'];

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-5 sm:p-6 shadow-xl">
      {/* Header & Compliance Score Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              WCAG 2.1 Accessibility & Color Science Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time relative luminance analysis, WCAG contrast compliance badges, and automated contrast correction.
          </p>
        </div>

        {/* Global Compliance Metric Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">WCAG AA Health</div>
              <div className="text-sm font-mono font-extrabold text-emerald-400">
                {passingAA} / {pairings.length} Pairs Passed ({overallPercentage}%)
              </div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {overallPercentage}%
            </div>
          </div>

          {/* Sub-tabs switch */}
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'matrix' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              WCAG Ratios
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('deltaE')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'deltaE' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Delta E (Distinction)
            </button>
          </div>
        </div>
      </div>

      {/* Main WCAG Contrast Pairings View */}
      {activeTab === 'matrix' ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {pairings.map((pair) => {
            const isPass = pair.score.isAANormal;
            const isTripleA = pair.score.isAAANormal;

            return (
              <div
                key={pair.id}
                id={`contrast-card-${pair.id}`}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                  isPass
                    ? 'bg-slate-950/60 border-slate-800/80'
                    : 'bg-rose-950/20 border-rose-800/40 shadow-rose-900/10'
                }`}
              >
                {/* Visual Preview Swatch Block */}
                <div
                  className="w-full h-16 rounded-lg p-3 flex items-center justify-between shadow-inner border border-white/5 transition-colors duration-300"
                  style={{ backgroundColor: pair.backgroundHex }}
                >
                  <span
                    className="font-bold text-sm tracking-wide drop-shadow-sm"
                    style={{ color: pair.foregroundHex }}
                  >
                    Sample Text Preview
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded font-bold backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: pair.foregroundHex
                    }}
                  >
                    {pair.score.formattedRatio}
                  </span>
                </div>

                {/* Pair details and badges */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300 capitalize">
                      {pair.foregroundRole} <span className="text-slate-500 font-normal">on</span> {pair.backgroundRole}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="text-slate-400">{pair.foregroundHex}</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-400">{pair.backgroundHex}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    {/* AA Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        isPass
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isPass ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      AA (4.5:1)
                    </span>

                    {/* AAA Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        isTripleA
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border border-slate-700/60'
                      }`}
                    >
                      {isTripleA ? <CheckCircle2 className="w-3 h-3" /> : null}
                      AAA (7.0:1)
                    </span>

                    {/* AA Large Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                        pair.score.isAALarge
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      Large UI {pair.score.isAALarge ? '✓' : '✗'}
                    </span>
                  </div>
                </div>

                {/* Intelligent Auto-Fix Contrast Suggestion */}
                {!isPass && pair.suggestedForegroundHex && (
                  <div className="mt-3 pt-2.5 border-t border-rose-900/30 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300">
                      <Wand2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Suggest: <code className="font-mono font-bold text-white">{pair.suggestedForegroundHex}</code> ({pair.suggestedScore?.formattedRatio})</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onApplyCorrection(pair.foregroundRole, pair.suggestedForegroundHex!)}
                      className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-extrabold shadow transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Auto-Fix</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Delta E CIE76 Color Distance Perceptual Matrix */
        <div className="mt-5 overflow-x-auto">
          <p className="text-xs text-slate-400 mb-3">
            Delta E (CIE76) evaluates perceptual distinction between palette shades in Lab color space.
            Values <strong className="text-emerald-400">&gt; 10</strong> are clearly distinguishable to the human eye.
          </p>

          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Role</th>
                {roles.map(r => (
                  <th key={r} className="p-3 capitalize">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
              {roles.map(r1 => (
                <tr key={r1} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3 font-bold capitalize flex items-center gap-2 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.colors[r1].hex }} />
                    {r1}
                  </td>
                  {roles.map(r2 => {
                    if (r1 === r2) {
                      return <td key={r2} className="p-3 text-slate-600">-</td>;
                    }
                    const delta = getDeltaE(palette.colors[r1].hex, palette.colors[r2].hex);
                    const isDistinct = delta >= 15;
                    return (
                      <td key={r2} className="p-3">
                        <span
                          className={`px-1.5 py-0.5 rounded font-semibold ${
                            isDistinct
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          ΔE {delta}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
