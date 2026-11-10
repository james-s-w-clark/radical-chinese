# AGENTS.md — Developer & AI Agent Guidelines for Radical Chinese

This document provides architectural context, design standards, and operational guidelines for AI coding agents and human developers maintaining **Radical Chinese (部首魔法)**.

---

## 1. Project Philosophy & Constraints

1. **Zero External Dependencies**:
   - Do **NOT** introduce heavy build frameworks (npm, Vite, React, webpack) or external runtime script libraries unless explicitly requested by the user.
   - The game must run directly by serving static files (`index.html`, `style.css`, `game.js`).
   - Sound effects must use the native **Web Audio API** oscillator/gain nodes.
   - Character pronunciation must use the native **Web Speech API** (`speechSynthesis`).
   - Modal overlays must use native `<dialog>` elements.

2. **GitHub Pages Hosting**:
   - The production site is served directly via GitHub Pages: `https://james-s-w-clark.github.io/radical-chinese/`.
   - All asset paths must remain relative (e.g., `href="style.css"` or `./style.css`) to ensure compatibility with GitHub Pages repository subdirectory paths.

3. **Art Style & Visual Heritage**:
   - Inspired by **[HanziToAnki PR #263](https://github.com/danielt998/HanziToAnki/pull/263)**.
   - Warm paper background: `--bg-primary: #fbf9f5` (light) / `#181a1d` (dark).
   - Card background: `--bg-card: #ffffff` (light) / `#22262b` (dark).
   - Borders: `--border-color: #e7e3dc` (light) / `#33383f` (dark).
   - Traditional Chinese colors:
     - Vermilion Red: `#dc2626`
     - Imperial Amber: `#d97706`
     - Jade Green: `#059669`
     - Cobalt Indigo: `#2563eb`
     - Ink Charcoal: `#1f2937`
   - Fonts: Display calligraphy (`"Ma Shan Zheng"`, `"Noto Serif SC"`) paired with clean modern sans (`"Outfit"`, system-ui).

---

## 2. Codebase Architecture

```
radical-chinese/
├── index.html               # Semantic HTML5 layout, accessible dialogs, SVG icons
├── style.css                # CSS custom properties, responsive grid, keyframe animations
├── game.js                  # Game loop, stage state, audio synthesizer, confetti engine
├── README.md                # User overview, quick links, educational background
├── AGENTS.md                # Guidance for AI agents & contributors
├── LICENSE                  # MIT License
└── .github/
    └── workflows/
        └── deploy.yml       # GitHub Pages automated deployment workflow
```

---

## 3. Stage Data Schema (`game.js`)

Each stage in `STAGES` follows this structure:

```javascript
{
  id: number,                     // Sequential stage number (1 to 9)
  category: string,               // Category badge (e.g. "Water & Nature")
  english: string,                // Target English translation
  pinyin: string,                 // Pinyin with tone marks (e.g. "mā")
  audioText: string,              // Character to pronounce via speechSynthesis
  clue: string,                   // Pedagogical clue explaining the sound/meaning connection
  slot1: {
    label: string,                // e.g. "Meaning (意符)"
    prefilled: string | null,     // Character if pre-locked (or null if user selects)
    hint: string                  // UI hint under slot
  },
  slot2: {
    label: string,                // e.g. "Sound (声符)"
    prefilled: string | null,     // Character if pre-locked (or null if user selects)
    hint: string
  },
  result: {
    glyph: string,                // Combined Chinese character (e.g. "妈")
    pinyin: string,
    meaning: string
  },
  choices: [                      // Array of 4 radical option cards
    {
      id: string,
      glyph: string,
      name: string,
      subtext: string,
      isCorrect: boolean,
      slotTarget?: 1 | 2
    }
  ],
  dualMode?: boolean,             // If true (Stage 9), player selects 2 items from choices
  validSet?: string[],            // Required characters in dual mode (e.g. ['日', '月'])
  etymology: {
    story: string,                // Educational explanation of phono-semantic or ideographic logic
    concept: string,              // e.g. "形声字 Phono-Semantic Compound"
    radical: string               // e.g. "部首: 女 (Woman)"
  }
}
```

---

## 4. Modern Web Standards & Accessibility Compliance

Follow modern web guidelines when extending this codebase:

- **Dialog Modals**:
  - Always use `<dialog>` opened via `dialog.showModal()`.
  - Use `closedby="any"` attribute for light-dismiss on backdrop click.
  - Implement the mandatory fallback for browsers lacking `closedby` (checking `rect.top`, `rect.left`, etc. on backdrop click).
  - Include `overscroll-behavior: contain;` on `dialog:modal` and `dialog::backdrop` to prevent page scroll chaining.
- **Keyboard Access**:
  - All interactive elements must have visible `:focus-visible` styling (`outline: 2px solid var(--border-focus)`).
  - Number keys `1`–`4` allow rapid single-key choice selection.
  - `Enter` advances to the next challenge.
- **Color Contrast**:
  - Maintain WCAG AA compliant text contrast in both light and dark themes.

---

## 5. Testing & Verification

1. **Syntax Verification**:
   ```bash
   node -c game.js
   ```
2. **Local Preview**:
   ```bash
   python3 -m http.server 8000
   ```
3. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: description of change"
   git push origin main
   ```
