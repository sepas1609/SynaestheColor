import React, { useState } from 'react';
import { ColorItem, Palette } from '../types';
import { SAMPLE_PALETTES } from '../utils/fallbackPalettes';
import { Globe, Heart, Search, Sparkles, Tag, ArrowRight, X } from 'lucide-react';

interface CommunityShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPalette: (palette: Palette) => void;
}

export const CommunityShowcase: React.FC<CommunityShowcaseProps> = ({
  isOpen,
  onClose,
  onSelectPalette
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [palettes, setPalettes] = useState<Palette[]>(SAMPLE_PALETTES);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const allTags = ['All', 'Cyberpunk', 'Nature', 'Calm', 'Warm', 'Ethereal', 'Gothic', 'Neon'];

  const toggleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      const isCurrentlyLiked = next.has(id);
      if (isCurrentlyLiked) {
        next.delete(id);
      } else {
        next.add(id);
      }
      // Update count in state
      setPalettes(prevPalettes =>
        prevPalettes.map(p =>
          p.id === id ? { ...p, likes: p.likes + (isCurrentlyLiked ? -1 : 1) } : p
        )
      );
      return next;
    });
  };

  const filtered = palettes.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === 'All' || p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Synaesthetic Community Showcase
              </h3>
              <p className="text-xs text-slate-400">
                Explore, upvote, and load curated sensory color palettes designed with Gemini.
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

        {/* Search & Tag Filter Bar */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/40 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search palettes, emotional prompts, or aesthetics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <div className="p-5 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => {
            const isLiked = likedIds.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectPalette(item);
                  onClose();
                }}
                className="group rounded-xl p-4 bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h4>

                    {/* Upvote Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleUpvote(item.id, e)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        isLiked
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{item.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    "{item.prompt}"
                  </p>

                  {/* 5-Role Swatch Bar */}
                  <div className="h-10 rounded-lg overflow-hidden flex border border-white/5 shadow-inner">
                    {(Object.values(item.colors) as ColorItem[]).map((col, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-full transition-transform group-hover:scale-105"
                        style={{ backgroundColor: col.hex }}
                        title={`${col.role}: ${col.hex} (${col.name})`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {item.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Load Palette</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
