import React, { useState, useEffect } from 'react';
import { Palette } from '../types';
import {
  exportToCssVariables,
  exportToTailwindConfig,
  exportToScss,
  exportToJson,
  exportToSvg
} from '../utils/colorScience';
import { X, Copy, Check, Download, QrCode, Share2, Code2, FileCode, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';

interface ExportModalProps {
  palette: Palette;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ palette, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'scss' | 'json' | 'svg' | 'share' | 'qr'>('css');
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    // Generate compressed base64 share URL
    try {
      const stateObj = {
        prompt: palette.prompt,
        harmony: palette.harmony,
        colors: {
          primary: palette.colors.primary.hex,
          secondary: palette.colors.secondary.hex,
          accent: palette.colors.accent.hex,
          background: palette.colors.background.hex,
          surface: palette.colors.surface.hex
        },
        title: palette.title,
        mood: palette.mood
      };
      const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(stateObj)))));
      const url = `${window.location.origin}${window.location.pathname}#palette=${encoded}`;
      setShareUrl(url);

      // Generate QR Code
      QRCode.toDataURL(url, {
        width: 220,
        margin: 2,
        color: {
          dark: '#00F0FF',
          light: '#090D16'
        }
      }).then((dataUrl) => {
        setQrDataUrl(dataUrl);
      });
    } catch (e) {
      console.warn('Failed to generate share URL / QR:', e);
      setShareUrl(window.location.href);
    }
  }, [palette, isOpen]);

  if (!isOpen) return null;

  let codeContent = '';
  let filename = `synaesthe-${palette.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  let mimeType = 'text/plain';

  switch (activeTab) {
    case 'css':
      codeContent = exportToCssVariables(palette);
      filename += '.css';
      mimeType = 'text/css';
      break;
    case 'tailwind':
      codeContent = exportToTailwindConfig(palette);
      filename += '.js';
      mimeType = 'application/javascript';
      break;
    case 'scss':
      codeContent = exportToScss(palette);
      filename += '.scss';
      mimeType = 'text/x-scss';
      break;
    case 'json':
      codeContent = exportToJson(palette);
      filename += '.json';
      mimeType = 'application/json';
      break;
    case 'svg':
      codeContent = exportToSvg(palette);
      filename += '.svg';
      mimeType = 'image/svg+xml';
      break;
  }

  const handleCopy = (textToCopy?: string) => {
    navigator.clipboard.writeText(textToCopy || codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([codeContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Export & Share Palette: <span className="text-indigo-300">{palette.title}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Single-click copy or download formatted tokens for your tech stack.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 px-5 py-3 border-b border-slate-800 bg-slate-950/30 overflow-x-auto">
          {[
            { id: 'css', label: 'CSS Variables', icon: Code2 },
            { id: 'tailwind', label: 'Tailwind CSS', icon: FileCode },
            { id: 'scss', label: 'SCSS Map', icon: Code2 },
            { id: 'json', label: 'JSON Tokens', icon: FileCode },
            { id: 'svg', label: 'SVG Swatch', icon: Download },
            { id: 'share', label: 'Share Link', icon: Share2 },
            { id: 'qr', label: 'Mobile QR', icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content */}
        <div className="p-5 flex-1 overflow-y-auto">
          {activeTab === 'share' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Anyone with this unique link can view, inspect, audit, and export this exact synaesthetic palette:
              </p>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-transparent text-xs font-mono text-indigo-300 focus:outline-none px-2 select-all"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(shareUrl)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          ) : activeTab === 'qr' ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Mobile Preview QR Code"
                    className="w-48 h-48 rounded-xl"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-500 font-mono">
                    Generating QR...
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Scan for Mobile UI Testing</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Point your phone's camera at this QR code to inspect and preview this color system on mobile screens instantly.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed max-h-80 select-all">
                {codeContent}
              </pre>

              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 shadow-md transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
          <span>Format: {activeTab.toUpperCase()}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
