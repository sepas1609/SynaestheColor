# Contributing to SynaestheColor

Thank you for your interest in contributing to **SynaestheColor**! We welcome contributions ranging from sensory prompt improvements, color science algorithms (CIE Lab, Delta-E, WCAG), export format integrations, and accessibility features.

---

## 🧭 Code of Conduct

All contributors and maintainers are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please treat everyone with respect and empathy.

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js**: v20.0.0 or higher
- **npm** / **bun** / **yarn** / **pnpm**
- (Optional) **Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/). The application runs seamlessly offline with smart heuristic fallbacks if no key is provided.

### 2. Clone and Install
```bash
git clone https://github.com/sepas1609/SynaestheColor.git
cd SynaestheColor
npm install
```

### 3. Configure Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Add your Gemini API key (optional):
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
PORT=3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Architecture

```
SynaestheColor/
├── .github/                 # CI/CD Workflows & Community templates
├── src/
│   ├── components/          # Reusable React UI Components
│   │   ├── AccessibilityAuditor.tsx   # WCAG 2.1 AAA/AA Contrast Matrix
│   │   ├── ColorBlindnessSVGFilters.tsx # Protanopia/Deuteranopia SVG Matrices
│   │   ├── ColorSpaceConverter.tsx    # HEX, RGB, HSL, CMYK, HSV Inspector
│   │   ├── CommunityShowcase.tsx      # Curated Synaesthetic Palette Gallery
│   │   ├── ExportModal.tsx            # Multi-format Code & Token Exporter
│   │   ├── Header.tsx                 # Top Nav & Simulation Controls
│   │   ├── HistoryDrawer.tsx          # LocalStorage Palettes Timeline
│   │   ├── InteractivePreview.tsx     # Live Component Sandbox (Dark/Light)
│   │   ├── ManualColorModal.tsx       # Direct Hex & Slider Tuner
│   │   ├── PaletteDisplay.tsx         # 5-Role Swatch Strip & Details
│   │   └── PromptSection.tsx          # Sensory Input, Harmonies & Sliders
│   ├── utils/
│   │   ├── colorScience.ts            # Luminance, Contrast Ratio, Delta-E, Converters
│   │   └── fallbackPalettes.ts        # Algorithmic & Curated Fallback Engines
│   ├── App.tsx              # Master Application State & View Layout
│   ├── types.ts             # TypeScript Domain Types
│   ├── index.css            # Tailwind CSS v4 and Custom Ambient Glow Styles
│   └── main.tsx             # React DOM Mounting Root
├── server.ts                # Express API & Vite Dev/SSR Integration
├── tsconfig.json            # TypeScript Configuration
├── vite.config.ts           # Vite Bundler & Tailwind CSS v4 Configuration
└── package.json             # Project Manifest & Scripts
```

---

## 📜 Development Guidelines

- **TypeScript Strictness**: Always ensure your code passes `npm run lint` without any compiler errors.
- **Color Science Precision**: Mathematical operations regarding relative luminance, gamma corrections, and Delta-E calculations must strictly follow W3C WCAG 2.1 and CIE standards.
- **Design Aesthetic**: SynaestheColor emphasizes a clean, cyberpunk/glassmorphism dark aesthetic with dynamic ambient glows synchronized with the active palette colors.
- **Commit Messages**: Use semantic commits:
  - `feat:` for new capabilities
  - `fix:` for bug resolutions
  - `docs:` for documentation updates
  - `style:` for visual styling tweaks
  - `refactor:` for code restructuring

---

## 🚀 Submitting a Pull Request

1. Fork the repository and create a feature branch (`git checkout -b feature/sensory-audio-input`).
2. Implement your changes with clean comments and type definitions.
3. Verify that the build and lint pass:
   ```bash
   npm run lint
   npm run build
   ```
4. Commit your changes (`git commit -m "feat: add sensory audio prompt synthesizer"`).
5. Push to your branch (`git push origin feature/sensory-audio-input`).
6. Open a Pull Request on GitHub using our PR template.
