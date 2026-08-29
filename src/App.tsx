import React, { useState, useEffect } from 'react';
import { ColorBlindnessType, ColorItem, ColorRole, HarmonyType, Palette } from './types';
import { buildColorItem, autoCorrectContrast } from './utils/colorScience';
import { getFallbackPalette, SAMPLE_PALETTES } from './utils/fallbackPalettes';
import { Header } from './components/Header';
import { PromptSection } from './components/PromptSection';
import { PaletteDisplay } from './components/PaletteDisplay';
import { AccessibilityAuditor } from './components/AccessibilityAuditor';
import { InteractivePreview } from './components/InteractivePreview';
import { ColorSpaceConverter } from './components/ColorSpaceConverter';
import { ExportModal } from './components/ExportModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { CommunityShowcase } from './components/CommunityShowcase';
import { ManualColorModal } from './components/ManualColorModal';
import { ColorBlindnessSVGFilters } from './components/ColorBlindnessSVGFilters';

const HISTORY_STORAGE_KEY = 'synaesthecolor_history_v1';

export default function App() {
  // Initialize with Victorian Greenhouse or URL hash palette
  const [activePalette, setActivePalette] = useState<Palette>(() => {
    // Check URL hash for shared palette
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const match = hash.match(/palette=([^&]+)/);
      if (match && match[1]) {
        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(match[1])))));
          if (decoded && decoded.colors) {
            return {
              id: `shared-${Date.now()}`,
              prompt: decoded.prompt || 'Shared Synaesthetic Palette',
              title: decoded.title || 'Shared Palette',
              mood: decoded.mood || 'Curated color harmony',
              harmony: (decoded.harmony as HarmonyType) || 'freeform',
              synaestheticSense: 'Sight + Emotion',
              timestamp: Date.now(),
              temperature: 0.7,
              likes: 1,
              tags: ['Shared', 'Synaesthesia'],
              colors: {
                primary: buildColorItem('primary', decoded.colors.primary, 'Primary Shade', 'Shared primary brand color.'),
                secondary: buildColorItem('secondary', decoded.colors.secondary, 'Secondary Balance', 'Shared secondary tone.'),
                accent: buildColorItem('accent', decoded.colors.accent, 'Accent Spark', 'Shared focal highlight.'),
                background: buildColorItem('background', decoded.colors.background, 'Background Foundation', 'Shared canvas foundation.'),
                surface: buildColorItem('surface', decoded.colors.surface, 'Surface Layer', 'Shared card surface.')
              }
            };
          }
        } catch (e) {
          console.warn('Failed to parse shared URL hash:', e);
        }
      }
    }
    return SAMPLE_PALETTES[3]; // Default: Victorian Bioluminescent Greenhouse
  });

  const [prompt, setPrompt] = useState(
    'An abandoned Victorian greenhouse overgrown with glowing bioluminescent moss at dusk'
  );
  const [harmony, setHarmony] = useState<HarmonyType>('triadic');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [enableAutoTranslate, setEnableAutoTranslate] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number | undefined>(480);
  const [tokensUsed, setTokensUsed] = useState<number | undefined>(340);

  // Inspector & Workspace State
  const [selectedRole, setSelectedRole] = useState<ColorRole>('primary');
  const [editingRole, setEditingRole] = useState<ColorRole | null>(null);
  const [colorBlindness, setColorBlindness] = useState<ColorBlindnessType>('normal');
  const [isLightPreview, setIsLightPreview] = useState<boolean>(false);

  // Modals and Drawers
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState<boolean>(false);

  // Local Storage History
  const [history, setHistory] = useState<Palette[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : SAMPLE_PALETTES;
    } catch {
      return SAMPLE_PALETTES;
    }
  });

  // Save to history helper
  const saveToHistory = (newPalette: Palette) => {
    setHistory((prev) => {
      const filtered = prev.filter((p) => p.prompt !== newPalette.prompt);
      const updated = [newPalette, ...filtered].slice(0, 20);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear history:', e);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to delete history item:', e);
      }
      return updated;
    });
  };

  // Main Generation Handler (Calls Gemini API via serverless backend route)
  const handleGenerate = async (overridePrompt?: string, overrideHarmony?: HarmonyType) => {
    const targetPrompt = overridePrompt || prompt;
    const targetHarmony = overrideHarmony || harmony;

    if (!targetPrompt.trim()) return;

    setIsLoading(true);

    try {
      let finalPrompt = targetPrompt;

      // If auto-translate is enabled, call translation endpoint first
      if (enableAutoTranslate) {
        setIsTranslating(true);
        try {
          const transRes = await fetch('/api/translate-prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: targetPrompt })
          });
          const transData = await transRes.json();
          if (transData.translatedPrompt) {
            finalPrompt = transData.translatedPrompt;
          }
        } catch (e) {
          console.warn('Auto-translate error, proceeding with raw prompt:', e);
        } finally {
          setIsTranslating(false);
        }
      }

      // Call Gemini 3.7 Flash palette generation endpoint
      const response = await fetch('/api/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          harmony: targetHarmony,
          temperature,
          language: 'auto'
        })
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        const raw = resData.data;
        const generatedPalette: Palette = {
          id: `pal-${Date.now()}`,
          prompt: targetPrompt,
          translatedPrompt: finalPrompt !== targetPrompt ? finalPrompt : undefined,
          title: raw.title || 'Synaesthetic Palette',
          mood: raw.mood || 'Sensory color harmony',
          harmony: targetHarmony,
          synaestheticSense: raw.synaestheticSense || 'Sight + Emotion',
          timestamp: Date.now(),
          temperature,
          latencyMs: resData.latencyMs,
          tokensUsed: resData.tokensUsed,
          likes: Math.floor(Math.random() * 20) + 5,
          tags: Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags : ['AI Synaesthesia', targetHarmony],
          colors: {
            primary: buildColorItem('primary', raw.colors.primary.hex, raw.colors.primary.name, raw.colors.primary.rationale),
            secondary: buildColorItem('secondary', raw.colors.secondary.hex, raw.colors.secondary.name, raw.colors.secondary.rationale),
            accent: buildColorItem('accent', raw.colors.accent.hex, raw.colors.accent.name, raw.colors.accent.rationale),
            background: buildColorItem('background', raw.colors.background.hex, raw.colors.background.name, raw.colors.background.rationale),
            surface: buildColorItem('surface', raw.colors.surface.hex, raw.colors.surface.name, raw.colors.surface.rationale)
          }
        };

        setActivePalette(generatedPalette);
        setLatencyMs(resData.latencyMs);
        setTokensUsed(resData.tokensUsed);
        saveToHistory(generatedPalette);
      } else {
        // Use smart procedural synaesthetic fallback
        console.warn('Using intelligent synaesthetic fallback palette generator');
        const fallback = getFallbackPalette(targetPrompt, targetHarmony, temperature);
        setActivePalette(fallback);
        setLatencyMs(resData.latencyMs || 250);
        setTokensUsed(resData.tokensUsed || 300);
        saveToHistory(fallback);
      }
    } catch (err) {
      console.error('Generation failure, loading fallback:', err);
      const fallback = getFallbackPalette(targetPrompt, targetHarmony, temperature);
      setActivePalette(fallback);
      saveToHistory(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Contrast Auto-Fix Handler
  const handleApplyCorrection = (role: ColorRole, newHex: string) => {
    setActivePalette((prev) => {
      const updatedColor = buildColorItem(
        role,
        newHex,
        `${prev.colors[role].name} (WCAG Adjusted)`,
        `${prev.colors[role].rationale} Automatically adjusted to guarantee WCAG compliance.`
      );
      const updated = {
        ...prev,
        colors: {
          ...prev.colors,
          [role]: updatedColor
        }
      };
      saveToHistory(updated);
      return updated;
    });
  };

  // Manual Color Override Handler
  const handleApplyOverride = (role: ColorRole, updatedColor: ColorItem) => {
    setActivePalette((prev) => {
      const updated = {
        ...prev,
        colors: {
          ...prev.colors,
          [role]: updatedColor
        }
      };
      saveToHistory(updated);
      return updated;
    });
  };

  const handleSelectPalette = (palette: Palette) => {
    setActivePalette(palette);
    setPrompt(palette.prompt);
    setHarmony(palette.harmony);
    setTemperature(palette.temperature || 0.7);
  };

  // Color blindness CSS filter class
  const filterClass = colorBlindness !== 'normal' ? `filter-${colorBlindness}` : '';

  return (
    <div className={`min-h-screen bg-[#090D16] text-[#E2E8F0] flex flex-col selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden ${filterClass}`}>
      {/* Invisible SVG filter definitions for color blindness simulation */}
      <ColorBlindnessSVGFilters />

      {/* Global Ambient Glows mapped to Active Palette */}
      <div
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px] pointer-events-none transition-colors duration-1000 animate-ambient-glow -z-10"
        style={{ backgroundColor: activePalette.colors.primary.hex }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[140px] pointer-events-none transition-colors duration-1000 -z-10"
        style={{ backgroundColor: activePalette.colors.accent.hex }}
      />

      {/* App Header */}
      <Header
        colorBlindness={colorBlindness}
        onChangeColorBlindness={setColorBlindness}
        isLightPreview={isLightPreview}
        onToggleLightPreview={() => setIsLightPreview(!isLightPreview)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenCommunity={() => setIsCommunityOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        historyCount={history.length}
        primaryGlowColor={activePalette.colors.primary.hex}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Section: Prompt & Swatches */}
        <div className="space-y-6">
          <PromptSection
            prompt={prompt}
            setPrompt={setPrompt}
            harmony={harmony}
            setHarmony={setHarmony}
            temperature={temperature}
            setTemperature={setTemperature}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            latencyMs={latencyMs}
            tokensUsed={tokensUsed}
            isTranslating={isTranslating}
            enableAutoTranslate={enableAutoTranslate}
            setEnableAutoTranslate={setEnableAutoTranslate}
            primaryAccentHex={activePalette.colors.primary.hex}
          />

          <PaletteDisplay
            palette={activePalette}
            onEditColor={(role) => setEditingRole(role)}
            onSelectColor={(role) => setSelectedRole(role)}
            selectedRole={selectedRole}
            isLightPreview={isLightPreview}
          />
        </div>

        {/* Bottom Section: Asymmetric Split Grid (Accessibility Matrix & Live UI Preview) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column (Accessibility & Universal Color Inspector) - 6 cols on XL */}
          <div className="xl:col-span-6 space-y-6">
            <AccessibilityAuditor
              palette={activePalette}
              onApplyCorrection={handleApplyCorrection}
            />

            <ColorSpaceConverter
              palette={activePalette}
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
            />
          </div>

          {/* Right Column (Live UI Component Preview Sandbox) - 6 cols on XL */}
          <div className="xl:col-span-6">
            <InteractivePreview
              palette={activePalette}
              isLightPreview={isLightPreview}
              onToggleLightPreview={() => setIsLightPreview(!isLightPreview)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">SynaestheColor</span>
            <span>•</span>
            <span>Gemini 3.7 Sensory Palette Engine & WCAG 2.1 Auditor</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Primary: <code className="font-mono text-slate-400">{activePalette.colors.primary.hex}</code></span>
            <span>Surface: <code className="font-mono text-slate-400">{activePalette.colors.surface.hex}</code></span>
          </div>
        </div>
      </footer>

      {/* Modals and Drawers */}
      <ExportModal
        palette={activePalette}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <HistoryDrawer
        history={history}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectPalette={handleSelectPalette}
        onClearHistory={handleClearHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
      />

      <CommunityShowcase
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
        onSelectPalette={handleSelectPalette}
      />

      <ManualColorModal
        role={editingRole}
        palette={activePalette}
        isOpen={editingRole !== null}
        onClose={() => setEditingRole(null)}
        onApplyOverride={handleApplyOverride}
      />
    </div>
  );
}
