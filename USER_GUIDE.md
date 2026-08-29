# 📘 SynaestheColor — Complete User & Creator Guide

Welcome to the **SynaestheColor** User Guide! This comprehensive manual walks you through all capabilities of the studio—from crafting evocative sensory prompts and auditing WCAG 2.1 accessibility to previewing components in live sandboxes and exporting design tokens into your frontend codebase.

---

## 📑 Table of Contents

1. [🖥️ Workspace Overview](#1-🖥️-workspace-overview)
2. [✍️ Crafting Sensory Prompts](#2-✍️-crafting-sensory-prompts)
3. [🎨 Selecting Harmonies & Creativity Temperature](#3-🎨-selecting-harmonies--creativity-temperature)
4. [♿ WCAG 2.1 Accessibility Matrix & 1-Click Auto-Fix](#4-♿-wcag-21-accessibility-matrix--1-click-auto-fix)
5. [👁️ Color Vision Deficiency (CVD) Simulator](#5-👁️-color-vision-deficiency-cvd-simulator)
6. [🔬 Multi-Color Space Inspector & Delta-E Lab](#6-🔬-multi-color-space-inspector--delta-e-lab)
7. [📱 Live Interactive Sandbox & Dark/Light Canvas](#7-📱-live-interactive-sandbox--darklight-canvas)
8. [⚡ Exporting Design Tokens to Your Codebase](#8-⚡-exporting-design-tokens-to-your-codebase)
9. [💾 Palette History, URL Sharing & Community Showcase](#9-💾-palette-history-url-sharing--community-showcase)
10. [❓ FAQ & Troubleshooting](#10-❓-faq--troubleshooting)

---

## 1. 🖥️ Workspace Overview

The SynaestheColor interface is divided into intuitive, reactive sections:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🌈 SynaestheColor Top Bar  [CVD Simulation] [☀️/🌙 Canvas] [History] [Export]│
├─────────────────────────────────────────────────────────────────────────────┤
│ ✍️ Prompt Section: Sensory Input + Harmony Selector + Temperature + Generate│
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎨 5-Role Swatches: [Primary] [Secondary] [Accent] [Background] [Surface]   │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ ♿ WCAG 2.1 Accessibility Auditor    │ 📱 Live Interactive Sandbox          │
│ - Pairwise Contrast Ratios (AA/AAA)  │ - Real Buttons, Badges, Cards        │
│ - 🛠️ 1-Click Auto-Correction Button  │ - Analytics Chart & Modal Previews   │
├──────────────────────────────────────┤                                      │
│ 🔬 Multi-Color Space Inspector       │ - Instant Reactivity with Swatches   │
│ - HEX, RGB, HSL, CMYK, HSV, Delta-E  │                                      │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 2. ✍️ Crafting Sensory Prompts

SynaestheColor leverages **synaesthesia**—translating sensory memories, textures, acoustic moods, and thermal feelings into color relationships.

### Tips for High-Impact Prompts:
- **Describe textures and light**: *"Frosted glass at sunrise with damp cedar needle smoke"*
- **Combine sensory channels**: *"Electric guitar fuzz in a stormy violet basement"*
- **Evoke times & atmospheres**: *"An abandoned Victorian greenhouse overgrown with glowing bioluminescent moss at dusk"*
- **Multi-language support**: You can write prompts in any language (Japanese, Spanish, French, Hindi, German, etc.) and toggle **Auto-Translate & Refine** to preserve subtle poetic context.

### Example Prompts to Try:
- 🌌 *"Midnight Tokyo rain bouncing off glowing cyan neon signs"*
- 🍵 *"Hot matcha whisked in a rustic dark clay ceramic bowl on morning tatami"*
- 🏜️ *"Sun-baked terracotta cliffs and desert dusk lavender shadows"*
- ⚡ *"80s synthwave laser grid reflecting off polished chrome"*

---

## 3. 🎨 Selecting Harmonies & Creativity Temperature

### Color Harmonies
Under the prompt input, select a geometric color harmony constraint:
- **Freeform**: Allows the AI complete creative freedom across sensory associations.
- **Complementary**: Pairs high-contrast opposing hues on the color wheel for maximum visual dynamism.
- **Analogous**: Uses adjacent hues for serene, tranquil, and cohesive atmospheres.
- **Triadic**: Balances three equidistant hues for vibrant yet balanced UI palettes.
- **Monochromatic**: Focuses on varying lightness and saturation of a single dominant hue.
- **Split-Complementary**: Combines a base hue with two colors adjacent to its complement.

### Creativity Temperature Slider (0.1 &ndash; 1.2)
- **Low (0.1 &ndash; 0.4)**: Strict, predictable color theory combinations with conservative contrast.
- **Medium (0.5 &ndash; 0.8)** *(Recommended)*: Optimal balance of imaginative synaesthetic expression and balanced UI aesthetics.
- **High (0.9 &ndash; 1.2)**: Highly surreal, unexpected, and avant-garde color combinations.

---

## 4. ♿ WCAG 2.1 Accessibility Matrix & 1-Click Auto-Fix

Designing accessible interfaces is built directly into SynaestheColor's DNA.

### How Contrast Scoring Works:
Every palette is checked across essential foreground/background pairings:
- `primary` on `background`
- `primary` on `surface`
- `accent` on `background`
- `accent` on `surface`
- `secondary` on `background`
- `surface` on `background`

### Understanding WCAG 2.1 Badges:
- **`AAA Pass` ($\ge 7.0:1$)**: Optimal contrast for all text sizes and body copy.
- **`AA Pass` ($\ge 4.5:1$)**: Standard compliance for normal text (16px).
- **`AA Large` ($\ge 3.0:1$)**: Compliant for headlines ($\ge 18\text{pt}$ or $14\text{pt}$ bold) and graphical UI elements.
- **`Fail` ($< 3.0:1$)**: Insufficient contrast that impairs legibility.

### 🛠️ Using 1-Click Auto-Fix:
When a pair fails WCAG AA standards, SynaestheColor displays a **"Auto-Fix Contrast"** button next to the score. Clicking this uses a bounded HSL perceptual optimizer to compute the closest harmonious shade that guarantees **$4.5:1$ AA compliance** without losing the hue's emotional character.

---

## 5. 👁️ Color Vision Deficiency (CVD) Simulator

Ensure your interface is universally perceivable by users with color blindness. Click the **Eye icon** in the top navigation bar to simulate:

| Simulation Mode | Description | Affected Population |
| :--- | :--- | :--- |
| **Normal** | Standard trichromatic vision | ~92% of population |
| **Protanopia** | Red-blindness (difficulty distinguishing red and green) | ~1.3% of males |
| **Deuteranopia** | Green-blindness (most common red-green confusion) | ~5.0% of males |
| **Tritanopia** | Blue-blindness (difficulty distinguishing blue and yellow) | ~0.001% of population |
| **Achromatopsia** | Total color blindness (monochromatic / grayscale vision) | ~0.003% of population |

> **Pro Tip**: Notice how the entire workspace, including live component previews and swatches, updates in real-time via hardware-accelerated SVG matrix filters!

---

## 6. 🔬 Multi-Color Space Inspector & Delta-E Lab

Click on any swatch (`primary`, `secondary`, `accent`, `background`, `surface`) to inspect its exact values across multiple color systems:

- **HEX**: 6-digit hexadecimal format (`#00F0FF`).
- **RGB**: Red, Green, Blue integer channels ($0 &ndash; 255$).
- **HSL**: Hue ($0^\circ &ndash; 360^\circ$), Saturation ($0\% &ndash; 100\%$), Lightness ($0\% &ndash; 100\%$).
- **CMYK**: Cyan, Magenta, Yellow, Key/Black print percentages.
- **HSV / HSB**: Hue, Saturation, Value brightness.
- **Relative Luminance ($L$)**: Linearized photometric luminance ($0.000 &ndash; 1.000$).
- **CIE $\Delta E_{\text{CIE76}}$**: Perceptual Euclidean distance between the selected color and all other palette tokens.

---

## 7. 📱 Live Interactive Sandbox & Dark/Light Canvas

The sandbox on the right half of the studio lets you immediately experience how the palette behaves in actual product interfaces:

- **Component Mockups**:
  - Primary & Secondary CTA Buttons with dynamic hover states.
  - Category Badges and Notification Chips.
  - User Profile Cards & Dashboard Widgets.
  - Analytics Sparkline Charts.
  - Text Hierarchy (Headings, Paragraphs, Code Snippets).
- **☀️/🌙 Canvas Toggle**: Switch between Dark Foundation mode and Light Foundation mode to verify readability under both themes.

---

## 8. ⚡ Exporting Design Tokens to Your Codebase

Click the **Export** button in the header to copy or download ready-to-use snippets in 6 production formats:

### 1. CSS Custom Properties (`variables.css`)
```css
:root {
  --color-primary: #00F0FF;
  --color-secondary: #1B3B6F;
  --color-accent: #E0FBFC;
  --color-background: #050C1A;
  --color-surface: #0C1B33;
}
```

### 2. Tailwind CSS v4 Theme (`@theme`)
```css
@theme {
  --color-syn-primary: #00F0FF;
  --color-syn-secondary: #1B3B6F;
  --color-syn-accent: #E0FBFC;
  --color-syn-background: #050C1A;
  --color-syn-surface: #0C1B33;
}
```

### 3. Tailwind CSS v3 Config (`tailwind.config.js`)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        synaesthe: {
          primary: '#00F0FF',
          secondary: '#1B3B6F',
          accent: '#E0FBFC',
          background: '#050C1A',
          surface: '#0C1B33',
        }
      }
    }
  }
};
```

### 4. SCSS Variables & Map (`_palette.scss`)
```scss
$syn-primary: #00F0FF;
$syn-secondary: #1B3B6F;
$syn-accent: #E0FBFC;
$syn-background: #050C1A;
$syn-surface: #0C1B33;
```

### 5. Figma / Design Tokens JSON (`tokens.json`)
Standardized JSON schema ready for design token pipelines and Figma plugins.

### 6. Standalone Vector SVG Palette (`palette.svg`)
A downloadable, beautifully formatted vector graphic ready to paste into presentation decks, README banners, or design documents.

---

## 9. 💾 Palette History, URL Sharing & Community Showcase

- **Local Palette Vault**: SynaestheColor automatically saves your generated palettes to browser `localStorage`. Click the **History** button to revisit or restore any past creations.
- **1-Click Shareable Link**: Click the **Share** button to copy a URL hash containing the base64-encoded palette. Anyone opening this link will immediately see your exact palette, title, and rationales.
- **Curated Community Showcase**: Explore pre-built palettes inspired by Cyberpunk, Victorian Greenhouse, Japanese Matcha, Sunset Mirage, and more.

---

## 10. ❓ FAQ & Troubleshooting

### Q: Do I need a Gemini API Key to run SynaestheColor?
**A:** No! If no `GEMINI_API_KEY` is provided in `.env`, the studio automatically falls back to an intelligent, procedural heuristic generator with dozens of curated sensory presets. When an API key is present, it uses **Gemini 3.7 Flash** for real-time deep synaesthetic interpretation.

### Q: Why did the Auto-Fix change my primary color slightly?
**A:** The Auto-Fix algorithm adjusts the lightness channel while locking the original hue, ensuring that text or UI elements placed against the background pass WCAG AA ($4.5:1$) contrast standards.

### Q: Can I manually tweak individual hex codes?
**A:** Yes! Click the **Edit** (pencil) icon on any swatch to open the **Manual Color Tuner**, where you can type exact HEX codes or adjust HSL sliders directly.

---

<div align="center">
  <sub>Have more questions? Open a <a href="https://github.com/sepas1609/SynaestheColor/discussions">GitHub Discussion</a> or submit an issue!</sub>
</div>
