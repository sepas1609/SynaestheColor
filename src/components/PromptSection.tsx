import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, MicOff, Shuffle, Sliders, Wand2, Compass, Zap, Languages, Check, Loader2 } from 'lucide-react';
import { HarmonyType } from '../types';
import { INSPIRATION_PROMPTS, PRESET_MOODS } from '../utils/fallbackPalettes';

interface PromptSectionProps {
  prompt: string;
  setPrompt: (val: string) => void;
  harmony: HarmonyType;
  setHarmony: (val: HarmonyType) => void;
  temperature: number;
  setTemperature: (val: number) => void;
  onGenerate: (overridePrompt?: string, overrideHarmony?: HarmonyType) => void;
  isLoading: boolean;
  latencyMs?: number;
  tokensUsed?: number;
  isTranslating: boolean;
  enableAutoTranslate: boolean;
  setEnableAutoTranslate: (val: boolean) => void;
  primaryAccentHex: string;
}

export const PromptSection: React.FC<PromptSectionProps> = ({
  prompt,
  setPrompt,
  harmony,
  setHarmony,
  temperature,
  setTemperature,
  onGenerate,
  isLoading,
  latencyMs,
  tokensUsed,
  isTranslating,
  enableAutoTranslate,
  setEnableAutoTranslate,
  primaryAccentHex
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API for voice dictation
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setPrompt(transcript);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [setPrompt]);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start voice dictation:', err);
        setIsListening(false);
      }
    }
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * INSPIRATION_PROMPTS.length);
    const newPrompt = INSPIRATION_PROMPTS[randomIndex];
    setPrompt(newPrompt);
  };

  const handlePresetSelect = (preset: typeof PRESET_MOODS[0]) => {
    setPrompt(preset.prompt);
    setHarmony(preset.harmony);
    onGenerate(preset.prompt, preset.harmony);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="relative rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-5 sm:p-6 shadow-xl transition-all">
      {/* Subtle top indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Synaesthetic Prompt Engine
          </span>
        </div>

        {/* Telemetry / Tokens & Latency */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          {latencyMs !== undefined && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              <Zap className="w-3 h-3 text-amber-400" />
              {latencyMs}ms
            </span>
          )}
          {tokensUsed !== undefined && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
              ~{tokensUsed} tokens
            </span>
          )}
        </div>
      </div>

      {/* Textarea Input Card */}
      <div className="relative group">
        <label htmlFor="prompt-textarea" className="sr-only">Describe an emotion, scene, or sensory mood</label>
        <textarea
          id="prompt-textarea"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe an emotion, scene, or sensory mood (e.g. 'An abandoned Victorian greenhouse overgrown with glowing bioluminescent moss at dusk')..."
          className="w-full px-4 py-3.5 pr-20 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm sm:text-base leading-relaxed focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none shadow-inner"
        />

        {/* Floating Input Action Buttons inside Textarea */}
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
          {/* Voice to Text Dictation */}
          {speechSupported && (
            <button
              id="voice-dictation-btn"
              type="button"
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Voice dictation (Speech to text)"}
              className={`p-2 rounded-lg text-xs transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Randomizer "Surprise Me" */}
          <button
            id="random-prompt-btn"
            type="button"
            onClick={handleRandomize}
            title="Random inspirational scene prompt"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-all active:scale-90"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Input Stats & Shortcuts */}
      <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span>{prompt.length} / 500 characters</span>
          <span className="hidden sm:inline text-slate-600">• Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">⌘/Ctrl + Enter</kbd> to generate</span>
        </div>

        {/* Translation Toggle */}
        <button
          type="button"
          onClick={() => setEnableAutoTranslate(!enableAutoTranslate)}
          className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-colors ${
            enableAutoTranslate ? 'text-indigo-300 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-400'
          }`}
          title="Auto-translate multilingual input to English for optimal synaesthetic synthesis"
        >
          <Languages className="w-3 h-3" />
          <span className="text-[11px]">Auto-Translate: {enableAutoTranslate ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Preset Mood Chips */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            Quick Synaesthetic Presets
          </span>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <Sliders className="w-3 h-3" />
            {showAdvanced ? 'Hide Color Controls' : 'Color Controls'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESET_MOODS.map((preset) => (
            <button
              key={preset.id}
              id={`preset-chip-${preset.id}`}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              disabled={isLoading}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
              <span>{preset.label}</span>
              <span className="text-[10px] text-slate-500 group-hover:text-indigo-300 transition-colors">
                {preset.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced AI & Harmony Controls (Collapsible) */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Harmony Guardrails */}
          <div>
            <label htmlFor="harmony-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Color Harmony Rule
            </label>
            <select
              id="harmony-select"
              value={harmony}
              onChange={(e) => setHarmony(e.target.value as HarmonyType)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="freeform">Freeform (Organic Synaesthetic)</option>
              <option value="complementary">Complementary (High Tension)</option>
              <option value="analogous">Analogous (Harmonious & Serene)</option>
              <option value="triadic">Triadic (Dynamic & Vibrant)</option>
              <option value="monochromatic">Monochromatic (Deep & Unified)</option>
              <option value="split-complementary">Split-Complementary (Nuanced Contrast)</option>
            </select>
          </div>

          {/* Creativity / Divergence Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="temperature-slider" className="text-xs font-semibold text-slate-300">
                Synaesthetic Divergence (Creativity)
              </label>
              <span className="text-xs font-mono font-bold text-indigo-400">{temperature.toFixed(1)}</span>
            </div>
            <input
              id="temperature-slider"
              type="range"
              min="0.2"
              max="1.2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0.2 (Literal)</span>
              <span>0.7 (Balanced)</span>
              <span>1.2 (Surreal)</span>
            </div>
          </div>
        </div>
      )}

      {/* Primary Generation Action Bar */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Generates 5 strict UI color roles with psychological rationales</span>
        </div>

        <button
          id="generate-palette-btn"
          type="button"
          onClick={() => onGenerate()}
          disabled={isLoading || !prompt.trim()}
          className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-xl shadow-indigo-600/25 border border-indigo-400/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: `0 0 25px ${primaryAccentHex}33`
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Synthesizing Synaesthesia...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Synthesize Palette</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
