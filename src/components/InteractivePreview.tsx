import React, { useState } from 'react';
import { Palette } from '../types';
import {
  Layout,
  Search,
  Bell,
  ArrowRight,
  TrendingUp,
  Check,
  Star,
  Bookmark,
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  Layers,
  Heart
} from 'lucide-react';

interface InteractivePreviewProps {
  palette: Palette;
  isLightPreview: boolean;
  onToggleLightPreview: () => void;
}

export const InteractivePreview: React.FC<InteractivePreviewProps> = ({
  palette,
  isLightPreview,
  onToggleLightPreview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dashboard' | 'forms'>('overview');
  const [toggleState, setToggleState] = useState(true);
  const [inputVal, setInputVal] = useState('Design Systems & Aesthetics');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { primary, secondary, accent, background, surface } = palette.colors;

  // Determine container styles based on light/dark mode override
  const containerBg = isLightPreview ? '#F8FAFC' : background.hex;
  const containerSurface = isLightPreview ? '#FFFFFF' : surface.hex;
  const containerBorder = isLightPreview ? 'rgba(203, 213, 225, 0.6)' : 'rgba(255, 255, 255, 0.08)';
  const headingText = isLightPreview ? '#0F172A' : '#F8FAFC';
  const bodyText = isLightPreview ? '#475569' : '#94A3B8';
  const mutedText = isLightPreview ? '#64748B' : '#64748B';

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-5 sm:p-6 shadow-xl">
      {/* Header with Title and Sandbox Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Live Component Preview Sandbox
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time interactive UI mockups rendered dynamically with your 5-role synaesthetic palette.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Toggle */}
          <button
            type="button"
            onClick={onToggleLightPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            {isLightPreview ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{isLightPreview ? 'Light Canvas' : 'Palette Canvas'}</span>
          </button>

          {/* Sub tabs */}
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Components
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              App Shell
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Mockup Container */}
      <div
        className="mt-5 rounded-2xl p-4 sm:p-6 transition-colors duration-500 overflow-hidden relative shadow-2xl border"
        style={{
          backgroundColor: containerBg,
          borderColor: containerBorder
        }}
      >
        {/* Ambient background glow from Primary & Accent */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: primary.hex }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: accent.hex }}
        />

        {/* 1. Live Navigation Bar Mockup */}
        <nav
          className="relative z-10 w-full rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-md border transition-colors duration-300 mb-6"
          style={{
            backgroundColor: containerSurface,
            borderColor: containerBorder
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm shadow-md"
              style={{
                backgroundColor: primary.hex,
                color: primary.luminance > 0.4 ? '#090D16' : '#FFFFFF'
              }}
            >
              SC
            </div>
            <span className="font-bold text-sm tracking-tight hidden sm:inline" style={{ color: headingText }}>
              Lumina UI
            </span>
          </div>

          {/* Search Input Mockup */}
          <div className="flex-1 max-w-xs relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: mutedText }} />
            <input
              type="text"
              readOnly
              value="Search assets, themes..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-black/5 border border-white/10 focus:outline-none"
              style={{ color: bodyText }}
            />
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-black/5 transition-colors relative"
              style={{ color: bodyText }}
            >
              <Bell className="w-4 h-4" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: accent.hex }}
              />
            </button>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              style={{
                backgroundColor: primary.hex,
                color: primary.luminance > 0.4 ? '#090D16' : '#FFFFFF'
              }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>

        {activeTab === 'overview' ? (
          <div className="relative z-10 space-y-6">
            {/* 2. Hero Section Mockup */}
            <div
              className="rounded-xl p-6 sm:p-8 border relative overflow-hidden transition-colors duration-300"
              style={{
                backgroundColor: containerSurface,
                borderColor: containerBorder
              }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-sm"
                style={{
                  backgroundColor: `${accent.hex}25`,
                  color: accent.hex,
                  border: `1px solid ${accent.hex}40`
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Next-Gen Color Intelligence</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 leading-tight max-w-xl"
                style={{ color: headingText }}
              >
                Craft accessible aesthetic systems powered by synaesthesia
              </h2>

              <p
                className="text-xs sm:text-sm mb-6 max-w-lg leading-relaxed"
                style={{ color: bodyText }}
              >
                Transform sensory metaphors into production-ready UI tokens, WCAG-certified contrast matrices, and interactive components.
              </p>

              {/* Action Buttons with Live Hover States */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                  style={{
                    backgroundColor: primary.hex,
                    color: primary.luminance > 0.4 ? '#090D16' : '#FFFFFF',
                    boxShadow: `0 8px 20px ${primary.hex}33`
                  }}
                >
                  <span>Explore Design Tokens</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all hover:bg-white/5 flex items-center gap-2"
                  style={{
                    borderColor: `${secondary.hex}60`,
                    color: secondary.hex
                  }}
                >
                  <span>Live Documentation</span>
                </button>
              </div>
            </div>

            {/* 3. Actionable UI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Metric & Analytics */}
              <div
                className="rounded-xl p-5 border transition-colors duration-300 flex flex-col justify-between"
                style={{
                  backgroundColor: containerSurface,
                  borderColor: containerBorder
                }}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3 font-semibold" style={{ color: mutedText }}>
                    <span>Monthly Color Velocity</span>
                    <span
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold"
                      style={{
                        backgroundColor: `${primary.hex}20`,
                        color: primary.hex
                      }}
                    >
                      +28.4%
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold font-mono mb-1" style={{ color: headingText }}>
                    94,280
                  </div>
                  <p className="text-xs" style={{ color: bodyText }}>
                    Generated tokens exported directly to Figma & Tailwind
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: '78%',
                        backgroundColor: primary.hex
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Feature Showcase & Interactive Toggle */}
              <div
                className="rounded-xl p-5 border transition-colors duration-300 flex flex-col justify-between"
                style={{
                  backgroundColor: containerSurface,
                  borderColor: containerBorder
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${secondary.hex}25`,
                        color: secondary.hex
                      }}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </div>

                    {/* Interactive Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => setToggleState(!toggleState)}
                      className="w-10 h-5 rounded-full p-0.5 transition-colors duration-300 relative focus:outline-none"
                      style={{
                        backgroundColor: toggleState ? primary.hex : '#475569'
                      }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow ${
                          toggleState ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm mb-1" style={{ color: headingText }}>
                    Automated WCAG Guardrails
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: bodyText }}>
                    Enforce AA 4.5:1 contrast standards on all generated UI elements automatically.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: accent.hex }}>
                  <span>Compliance Active</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3: Specimen Card with Bookmark & Favorite */}
              <div
                className="rounded-xl p-5 border transition-colors duration-300 flex flex-col justify-between"
                style={{
                  backgroundColor: containerSurface,
                  borderColor: containerBorder
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${accent.hex}20`,
                        color: accent.hex,
                        border: `1px solid ${accent.hex}30`
                      }}
                    >
                      {palette.harmony}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setLiked(!liked)}
                        className="p-1 rounded hover:bg-black/5 transition-colors"
                        style={{ color: liked ? '#F43F5E' : mutedText }}
                      >
                        <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookmarked(!bookmarked)}
                        className="p-1 rounded hover:bg-black/5 transition-colors"
                        style={{ color: bookmarked ? accent.hex : mutedText }}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm mb-1 truncate" style={{ color: headingText }}>
                    {palette.title}
                  </h4>
                  <p className="text-xs line-clamp-2" style={{ color: bodyText }}>
                    {palette.mood}
                  </p>
                </div>

                {/* Color Swatch Dots */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center -space-x-1.5">
                    {[primary, secondary, accent, surface].map((c, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-slate-900 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-semibold" style={{ color: mutedText }}>
                    5 Roles
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Form Input & Focus State Visualizer */}
            <div
              className="rounded-xl p-5 border transition-colors duration-300"
              style={{
                backgroundColor: containerSurface,
                borderColor: containerBorder
              }}
            >
              <h4 className="font-bold text-xs uppercase tracking-wider mb-3" style={{ color: mutedText }}>
                Interactive Form Controls & Focus States
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: headingText }}>
                    Active Input Focus Ring
                  </label>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-black/5 border transition-all focus:outline-none"
                    style={{
                      borderColor: primary.hex,
                      color: headingText,
                      boxShadow: `0 0 0 3px ${primary.hex}25`
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: headingText }}>
                    Accent Highlight Tag
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-2 rounded-lg text-xs font-bold flex-1 text-center shadow-sm"
                      style={{
                        backgroundColor: accent.hex,
                        color: accent.luminance > 0.4 ? '#090D16' : '#FFFFFF'
                      }}
                    >
                      Accent Callout ({accent.name})
                    </span>
                    <span
                      className="px-3 py-2 rounded-lg text-xs font-bold flex-1 text-center border"
                      style={{
                        borderColor: secondary.hex,
                        color: secondary.hex
                      }}
                    >
                      Secondary Balance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* App Shell Full-View */
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Sidebar */}
            <div
              className="p-4 rounded-xl border flex flex-col gap-2"
              style={{
                backgroundColor: containerSurface,
                borderColor: containerBorder
              }}
            >
              <div className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: mutedText }}>
                Navigation
              </div>
              {['Dashboard', 'Color Palettes', 'Accessibility Audit', 'Design Tokens', 'Settings'].map((item, idx) => (
                <div
                  key={item}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                    idx === 1 ? 'shadow-sm' : 'hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: idx === 1 ? `${primary.hex}20` : 'transparent',
                    color: idx === 1 ? primary.hex : bodyText
                  }}
                >
                  <span>{item}</span>
                  {idx === 1 && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary.hex }} />}
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div
              className="md:col-span-3 p-5 rounded-xl border flex flex-col justify-between"
              style={{
                backgroundColor: containerSurface,
                borderColor: containerBorder
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold" style={{ color: headingText }}>
                    Sensory Workspace: {palette.title}
                  </h3>
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-bold"
                    style={{
                      backgroundColor: primary.hex,
                      color: primary.luminance > 0.4 ? '#090D16' : '#FFFFFF'
                    }}
                  >
                    Active Preset
                  </span>
                </div>

                <p className="text-xs leading-relaxed mb-4" style={{ color: bodyText }}>
                  {palette.prompt}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {(Object.entries(palette.colors) as [string, typeof primary][]).map(([key, col]) => (
                    <div
                      key={key}
                      className="p-2.5 rounded-lg border flex flex-col justify-between"
                      style={{
                        backgroundColor: isLightPreview ? '#F1F5F9' : '#0B0F19',
                        borderColor: containerBorder
                      }}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500">{key}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: col.hex }} />
                        <span className="font-bold truncate" style={{ color: headingText }}>{col.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs" style={{ color: mutedText }}>
                <span>SynaestheColor AI System</span>
                <span className="font-mono">{palette.harmony}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
