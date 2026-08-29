import { HarmonyType, Palette } from '../types';
import { buildColorItem } from './colorScience';

export const PRESET_MOODS = [
  {
    id: 'cyberpunk-rain',
    label: 'Cyberpunk Rain',
    prompt: 'Neon-lit Tokyo alleyway drenched in torrential midnight rain with glowing holographic reflections',
    tag: 'Cyberpunk',
    harmony: 'complementary' as HarmonyType
  },
  {
    id: 'zen-garden',
    label: 'Serene Zen Garden',
    prompt: 'A tranquil Kyoto rock garden with morning dew on moss, bamboo stalks, and smooth gray stones',
    tag: 'Calm',
    harmony: 'analogous' as HarmonyType
  },
  {
    id: 'nostalgic-bakery',
    label: 'Warm Nostalgic Bakery',
    prompt: 'Fresh sourdough croissants, caramel glaze, warm morning sunlight streaming through dusted bakery windows',
    tag: 'Warm',
    harmony: 'analogous' as HarmonyType
  },
  {
    id: 'victorian-greenhouse',
    label: 'Victorian Greenhouse',
    prompt: 'An abandoned Victorian greenhouse overgrown with glowing bioluminescent moss at dusk',
    tag: 'Ethereal',
    harmony: 'triadic' as HarmonyType
  },
  {
    id: 'nordic-aurora',
    label: 'Midnight Nordic Aurora',
    prompt: 'Vibrant emerald and violet aurora borealis dancing across icy fjords under a star-filled polar sky',
    tag: 'Atmospheric',
    harmony: 'split-complementary' as HarmonyType
  },
  {
    id: 'solar-flare',
    label: 'Solar Flare Desert',
    prompt: 'Scorched terracotta dunes in the Sahara, blazing amber sunlight, and deep purple desert shadows',
    tag: 'Vibrant',
    harmony: 'complementary' as HarmonyType
  },
  {
    id: 'oceanic-abyss',
    label: 'Deep Oceanic Abyss',
    prompt: 'Midnight Mariana Trench featuring deep indigo depths and ethereal cyan hydrothermal vent luminescence',
    tag: 'Mysterious',
    harmony: 'monochromatic' as HarmonyType
  },
  {
    id: 'vaporwave-84',
    label: 'Vaporwave Arcade 1984',
    prompt: 'Retro 80s arcade, magenta neon grids, pastel sunset over palm trees, and chrome reflections',
    tag: 'Retro',
    harmony: 'triadic' as HarmonyType
  }
];

export const INSPIRATION_PROMPTS = [
  'An abandoned Victorian greenhouse overgrown with glowing bioluminescent moss at dusk',
  'A rainy autumn afternoon in an old library filled with leather-bound books and rain-streaked windows',
  'A neon-drenched cyberpunk market in Neo-Seoul with floating holographic ramen signs',
  'Midnight espresso bar in Milan with brushed brass accents and velvet espresso foam',
  'Solar eclipse viewed from a volcanic caldera in Iceland with smoldering obsidian and violet corona',
  'Crisp alpine morning in the Swiss Alps with powder snow, pine forests, and golden sunrise peaks',
  'A mid-century modern living room in Palm Springs with teal pool water, desert cacti, and teak wood',
  'Ethereal lavender fields of Provence bathed in the warm amber glow of golden hour',
  'Futuristic bioluminescent coral reef in a subterranean subterranean alien ocean',
  'Steampunk apothecary filled with glass vials of glowing amber elixirs, dark mahogany, and brass dials'
];

export const SAMPLE_PALETTES: Palette[] = [
  {
    id: 'cyberpunk-rain-sample',
    title: 'Cyberpunk Rain',
    prompt: 'Neon-lit Tokyo alleyway drenched in torrential midnight rain with glowing holographic reflections',
    mood: 'High-energy, dystopian, electric synaesthesia',
    harmony: 'complementary',
    synaestheticSense: 'Sight (Neon) + Sound (Rain Drops) + Touch (Cool Wet Asphalt)',
    timestamp: Date.now() - 3600000 * 2,
    temperature: 0.7,
    likes: 142,
    tags: ['Cyberpunk', 'Neon', 'Dark Mode', 'Futuristic'],
    colors: {
      primary: buildColorItem('primary', '#00F0FF', 'Cyber Cyan', 'Electrifying neon hue cutting through the downpour like holographic signage.'),
      secondary: buildColorItem('secondary', '#FF007F', 'Laser Magenta', 'Vibrant synthwave accent evoking glowing rain reflections on damp pavement.'),
      accent: buildColorItem('accent', '#FFE600', 'Arcade Amber', 'Piercing warm highlight representing flickering sodium streetlights.'),
      background: buildColorItem('background', '#080C14', 'Obsidian Puddle', 'Deep night canvas capturing wet asphalt and infinite shadow.'),
      surface: buildColorItem('surface', '#131B2A', 'Carbon Smog', 'Translucent structural container mimicking rain-streaked polycarbonate.')
    }
  },
  {
    id: 'zen-garden-sample',
    title: 'Serene Zen Garden',
    prompt: 'A tranquil Kyoto rock garden with morning dew on moss, bamboo stalks, and smooth gray stones',
    mood: 'Meditative, organic, grounding tranquility',
    harmony: 'analogous',
    synaestheticSense: 'Touch (Cool River Stone) + Scent (Damp Cedar & Moss)',
    timestamp: Date.now() - 3600000 * 5,
    temperature: 0.5,
    likes: 98,
    tags: ['Nature', 'Calm', 'Organic', 'Minimalist'],
    colors: {
      primary: buildColorItem('primary', '#4E7D56', 'Kyoto Bamboo', 'Deep organic green symbolizing balanced vitality and mindfulness.'),
      secondary: buildColorItem('secondary', '#8FA89B', 'Morning Dew Sage', 'Soft eucalyptus undertone providing airy breathing room.'),
      accent: buildColorItem('accent', '#D4AF37', 'Gold Leaf Kintsugi', 'Subtle metallic accent representing traditional ceramic repair artistry.'),
      background: buildColorItem('background', '#0F1412', 'Shadow Moss Canvas', 'Deep forest charcoal grounding the serene elements.'),
      surface: buildColorItem('surface', '#1B2420', 'Raked Gravel Basin', 'Earth-infused surface tone evoking smooth slate tiles.')
    }
  },
  {
    id: 'nostalgic-bakery-sample',
    title: 'Warm Nostalgic Bakery',
    prompt: 'Fresh sourdough croissants, caramel glaze, warm morning sunlight streaming through dusted bakery windows',
    mood: 'Cozy, comforting, sensory warmth',
    harmony: 'analogous',
    synaestheticSense: 'Taste (Caramel & Butter) + Scent (Fresh Vanilla Bread) + Warmth',
    timestamp: Date.now() - 3600000 * 8,
    temperature: 0.6,
    likes: 87,
    tags: ['Cozy', 'Warm', 'Food', 'Editorial'],
    colors: {
      primary: buildColorItem('primary', '#E07A5F', 'Terracotta Crust', 'Appetizing warm terracotta reminiscent of baked hearth bread.'),
      secondary: buildColorItem('secondary', '#F4A261', 'Golden Brioche', 'Sunny golden honey shade inspiring morning delight.'),
      accent: buildColorItem('accent', '#81B29A', 'Pistachio Glaze', 'Gentle herb-green accent creating complementary visual freshness.'),
      background: buildColorItem('background', '#171210', 'Espresso Roaster', 'Rich dark roasted bean background providing deep contrast.'),
      surface: buildColorItem('surface', '#261E1A', 'Flour Dusted Counter', 'Warm brown container surface evoking seasoned wooden prep tables.')
    }
  },
  {
    id: 'victorian-greenhouse-sample',
    title: 'Victorian Bioluminescent Greenhouse',
    prompt: 'An abandoned Victorian greenhouse overgrown with glowing bioluminescent moss at dusk',
    mood: 'Enigmatic, overgrown, bioluminescent magic',
    harmony: 'triadic',
    synaestheticSense: 'Sight (Fluorescence) + Temperature (Damp Humid Chill)',
    timestamp: Date.now() - 3600000 * 12,
    temperature: 0.8,
    likes: 176,
    tags: ['Ethereal', 'Botanical', 'Gothic', 'Glow'],
    colors: {
      primary: buildColorItem('primary', '#10B981', 'Bio-Moss Glow', 'Fluorescent botanical emerald evoking glowing living spore clouds.'),
      secondary: buildColorItem('secondary', '#8B5CF6', 'Dusk Wisteria', 'Mysterious velvet twilight purple reflecting through antique glass panes.'),
      accent: buildColorItem('accent', '#38BDF8', 'Dewdrop Phantasm', 'Electric blue luminescence highlighting damp ironwork filigree.'),
      background: buildColorItem('background', '#081014', 'Rusted Iron Night', 'Dark antique cast-iron greenhouse frame silhouette.'),
      surface: buildColorItem('surface', '#112228', 'Fogged Glass Pane', 'Deep teal-tinted surface framing the botanical specimen cards.')
    }
  }
];

/**
 * Get fallback palette matching prompt or generate an intelligent default
 */
export function getFallbackPalette(prompt: string, harmony: HarmonyType = 'freeform', temp = 0.7): Palette {
  const lower = prompt.toLowerCase();
  
  for (const preset of SAMPLE_PALETTES) {
    if (lower.includes(preset.title.toLowerCase()) || lower.includes(preset.tags[0].toLowerCase())) {
      return {
        ...preset,
        id: `fallback-${Date.now()}`,
        prompt: prompt || preset.prompt,
        timestamp: Date.now()
      };
    }
  }

  // Generate an algorithmic synaesthetic palette based on text hash
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    hash = (hash << 5) - hash + prompt.charCodeAt(i);
    hash |= 0;
  }
  const baseHue = Math.abs(hash) % 360;

  // Determine complementary / analogous offsets based on selected harmony
  let secHue = (baseHue + 40) % 360;
  let accHue = (baseHue + 180) % 360;

  if (harmony === 'complementary') {
    secHue = (baseHue + 180) % 360;
    accHue = (baseHue + 210) % 360;
  } else if (harmony === 'triadic') {
    secHue = (baseHue + 120) % 360;
    accHue = (baseHue + 240) % 360;
  } else if (harmony === 'monochromatic') {
    secHue = baseHue;
    accHue = baseHue;
  }

  // Import hslToRgb inline calculation for independence
  const h2rgb = (h: number, s: number, l: number) => {
    h = (h % 360 + 360) % 360 / 360;
    s = s / 100;
    l = l / 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    const clamp = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
    return `#${clamp(r)}${clamp(g)}${clamp(b)}`.toUpperCase();
  };

  const primaryHex = h2rgb(baseHue, 75, 55);
  const secondaryHex = h2rgb(secHue, 65, 60);
  const accentHex = h2rgb(accHue, 85, 65);
  const backgroundHex = h2rgb(baseHue, 30, 7);
  const surfaceHex = h2rgb(baseHue, 25, 14);

  return {
    id: `syn-${Date.now()}`,
    title: prompt ? `Synaesthesia of "${prompt.slice(0, 32)}..."` : 'Synaesthetic Resonance',
    prompt: prompt || 'Ethereal ambient harmony',
    mood: 'Emotional synaesthesia generated with sensory color mapping',
    harmony,
    synaestheticSense: 'Visual + Emotional Resonance',
    timestamp: Date.now(),
    temperature: temp,
    likes: 12,
    tags: ['Synaesthesia', 'AI Generated', harmony],
    colors: {
      primary: buildColorItem('primary', primaryHex, 'Resonant Prime', 'Core focal hue derived from emotional prompt cadence.'),
      secondary: buildColorItem('secondary', secondaryHex, 'Harmonic Complement', 'Balancing shade maintaining perceptual depth.'),
      accent: buildColorItem('accent', accentHex, 'Sensory Spark', 'High-contrast focal point for interactive engagement.'),
      background: buildColorItem('background', backgroundHex, 'Deep Foundation', 'Optimal low-reflectance canvas ensuring visual comfort.'),
      surface: buildColorItem('surface', surfaceHex, 'Subtle Elevation', 'Layered container tone designed for effortless legibility.')
    }
  };
}
