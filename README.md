# Radical Chinese · 部首魔法

> **A playful, interactive game discovering the secret blueprints of Chinese characters.**  
> Learn how characters combine **semantic meaning radicals** and **phonetic sound components** to forge words!

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-dc2626?style=for-the-badge&logo=github)](https://james-s-w-clark.github.io/radical-chinese/)
[![License: MIT](https://img.shields.io/badge/License-MIT-059669?style=for-the-badge)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20HTML%2FCSS%2FJS)-d97706?style=for-the-badge)](#)

---

## 🔗 Quick Links

- 🌐 **Live Web Application**: [https://james-s-w-clark.github.io/radical-chinese/](https://james-s-w-clark.github.io/radical-chinese/)
- 📦 **GitHub Repository**: [https://github.com/james-s-w-clark/radical-chinese](https://github.com/james-s-w-clark/radical-chinese)
- 🎨 **Art Style & Inspiration**: [HanziToAnki PR #263](https://github.com/danielt998/HanziToAnki/pull/263)

---

## 💡 The Secret Recipe of Chinese Characters

Many beginners assume Chinese characters are thousands of arbitrary, unrelated pictures. In reality, **over 80% of all Chinese characters** are structured according to an ingenious modular blueprint: **Phono-Semantic Compounds (形声字, *xíngshēngzì*)**!

Each character combines:
1. **Semantic Meaning Radical (形旁 / 意符)**: Tells your eyes what category or idea the word belongs to (e.g. `氵` = water, `女` = female/kinship, `讠` = speech, `扌` = hand/action).
2. **Phonetic Sound Component (声旁 / 声符)**: Hints to your ears how to pronounce the character or provides its rhyme family (e.g. `马` *mǎ* lends its sound to `妈` *mā*).

In addition, characters feature poetic **Compound Ideographs (会意字, *huìyìzì*)**, where two visual ideas merge to tell a story (e.g. `亻` *person* resting against `木` *tree* = `休` *xiū, to rest*).

---

## 🎮 How the Game Works

The game guides you through **9 progressively crafted workshop stages**:

```
[ Meaning Radical ]  +  [ Phonetic Component ]  =  [ Combined Character ]
        女 (Woman)    +       马 (mǎ, horse)     =           妈 (mā, Mother)
```

1. **Target Word & Clue**: Read the English definition, target Pinyin tone badge, and pronunciation clue.
2. **Character Forge (炼字台)**: Slot pieces into the forge workshop.
3. **Sound Guidance**: Click **Hear** to listen to the target pronunciation with native Chinese voice synthesis.
4. **Radical Tray**: Click or press keyboard shortcuts (`1`, `2`, `3`, `4`) to select candidate radicals.
5. **Etymology Breakdown**: When solved, an illustrated scroll explains the linguistic origin and radical family.
6. **Progressive Challenge**:
   - **Stages 1–6**: Meaning Radical Deduction (`妈`, `洋`, `语`, `打`, `饱`, `晴`)
   - **Stage 7**: Sound Detective — Reverse challenge: deduce the phonetic component (`湖`)
   - **Stage 8**: Compound Ideograph — Visual storytelling (`休`)
   - **Stage 9**: Master Synthesis — Dual celestial forge combining Sun (`日`) and Moon (`月`) into Brightness (`明`)!

---

## ✨ Features

- 🎨 **Traditional Paper & Modern Ink Aesthetic**: Inspired by the design language in [HanziToAnki PR #263](https://github.com/danielt998/HanziToAnki/pull/263) — creamy rice-paper palette (`#fbf9f5`), cinnabar red stamps (`#dc2626`), jade green (`#059669`), and amber gold (`#d97706`).
- 🌙 **Dark Mode Support**: Seamless toggle between warm Rice Paper Light and Ink Charcoal Dark (`#181a1d`).
- 🔊 **Zero-Dependency Sound Synthesizer**: Uses Web Audio API to generate pleasant wooden clicks, pentatonic chime chords, and celebration fanfares without external audio files.
- 🗣️ **Native Chinese Pronunciation**: Integrates Web Speech API (`speechSynthesis`) for clear pronunciation of each character and clue.
- 📖 **Common Radicals Guide Modal**: Built with modern accessible `<dialog closedby="any">` with cross-browser fallback to inspect common radical meanings at any time.
- ⌨️ **Keyboard Friendly**: Select radicals with number keys `1`–`4`, press `Enter` to advance.
- 📱 **Mobile Responsive**: Carefully scaled touch targets and layouts for desktop, tablet, and mobile.
- 🏆 **Summary & Share Card**: Review all forged characters, your honorary Chinese mastery rank, and copy your stats.

---

## 🛠️ Local Development & Running

Radical Chinese has **zero external dependencies** and requires **no build step**.

To run locally:
```bash
# Clone the repository
git clone https://github.com/james-s-w-clark/radical-chinese.git
cd radical-chinese

# Serve with any static web server (e.g., Python 3)
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 📄 License

MIT License. Open source and free for educational use.
