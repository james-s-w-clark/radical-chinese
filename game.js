/**
 * Radical Chinese (部首魔法) — Interactive Hanzi Workshop Engine
 * Pure Modern ES6 · Zero Dependencies · Web Audio API & Speech Synthesis
 */

(() => {
  'use strict';

  // ==========================================================================
  // Game Stages Data (9 Progressive Levels: Phono-Semantic & Ideographic)
  // ==========================================================================
  const STAGES = [
    {
      id: 1,
      category: 'Warmup · Phono-Semantic Secret',
      english: 'Mother / Mom',
      pinyin: 'mā',
      audioText: '妈',
      toneDesc: '1st Tone · High Flat ¯',
      toneNum: 1,
      clue: 'This character sounds like mǎ (from horse 马), but has a gentle 1st high tone (mā). Which meaning radical turns this sound into "Mother"?',
      slot1: { label: 'Meaning (意符)', prefilled: null, hint: 'Select radical below' },
      slot2: { label: 'Sound (声符)', prefilled: '马', hint: "Sounds like 'mǎ'" },
      result: { glyph: '妈', pinyin: 'mā', meaning: 'Mother / Mom' },
      choices: [
        { id: 'c1', glyph: '女', name: 'Woman / Female', subtext: 'Semantic (意符)', isCorrect: true, slotTarget: 1 },
        { id: 'c2', glyph: '木', name: 'Wood / Tree', subtext: 'Makes 杩 (headboard)', isCorrect: false },
        { id: 'c3', glyph: '氵', name: 'Water / River', subtext: 'Makes 冯 (surge)', isCorrect: false },
        { id: 'c4', glyph: '口', name: 'Mouth / Question', subtext: 'Makes 吗 (question ma)', isCorrect: false }
      ],
      etymology: {
        story: 'Over 80% of Chinese characters work like this! 女 (Woman) provides the female kinship meaning, while 马 (mǎ, horse) gives the phonetic sound "ma" with tone change to mā. Together, they forge 妈 (mā)!',
        concept: '形声字 Phono-Semantic Compound',
        radical: '部首: 女 (Woman)'
      }
    },
    {
      id: 2,
      category: 'Water & Nature',
      english: 'Ocean / Vast Sea / Foreign',
      pinyin: 'yáng',
      audioText: '洋',
      toneDesc: '2nd Tone · Rising ↗',
      toneNum: 2,
      clue: 'Pronunciation is an exact phonetic match for sheep (羊 · yáng)! What meaning radical conveys vast bodies of liquid or the open sea?',
      slot1: { label: 'Meaning (意符)', prefilled: null, hint: 'Select radical below' },
      slot2: { label: 'Sound (声符)', prefilled: '羊', hint: "Sounds like 'yáng'" },
      result: { glyph: '洋', pinyin: 'yáng', meaning: 'Ocean / Vast Sea' },
      choices: [
        { id: 'c1', glyph: '氵', name: 'Three Drops of Water', subtext: 'Semantic (意符)', isCorrect: true, slotTarget: 1 },
        { id: 'c2', glyph: '火', name: 'Fire / Heat', subtext: 'Makes 烊 (melt)', isCorrect: false },
        { id: 'c3', glyph: '讠', name: 'Speech / Words', subtext: 'Speech category', isCorrect: false },
        { id: 'c4', glyph: '扌', name: 'Hand / Action', subtext: 'Makes 样 (appearance with 木)', isCorrect: false }
      ],
      etymology: {
        story: 'Three drops of water (氵) visually signals rivers, seas, or liquidity. The sheep (羊, yáng) tells your ears how to pronounce it: "yáng"! Combined: 洋 (yáng) = Ocean / Vast Sea!',
        concept: '形声字 Phono-Semantic Compound',
        radical: '部首: 氵(Three Drops of Water)'
      }
    },
    {
      id: 3,
      category: 'Words & Communication',
      english: 'Spoken Language / Words',
      pinyin: 'yǔ',
      audioText: '语',
      toneDesc: '3rd Tone · Dipping ↘↗',
      toneNum: 3,
      clue: 'Pronounced with a 3rd dipping tone: yǔ. The sound root 吾 (wú, ancient "I/me") supplies the phonetic rhyme. Which radical marks spoken human communication?',
      slot1: { label: 'Meaning (意符)', prefilled: null, hint: 'Select radical below' },
      slot2: { label: 'Sound (声符)', prefilled: '吾', hint: "Sounds like 'wú'" },
      result: { glyph: '语', pinyin: 'yǔ', meaning: 'Spoken Language / Words' },
      choices: [
        { id: 'c1', glyph: '讠', name: 'Speech / Words', subtext: 'Semantic (意符)', isCorrect: true, slotTarget: 1 },
        { id: 'c2', glyph: '饣', name: 'Food / Eating', subtext: 'Food category', isCorrect: false },
        { id: 'c3', glyph: '犭', name: 'Animals / Beasts', subtext: 'Wildlife category', isCorrect: false },
        { id: 'c4', glyph: '⻊', name: 'Foot / Step', subtext: 'Walking category', isCorrect: false }
      ],
      etymology: {
        story: 'The speech radical 讠(simplified from sound waves emerging from a mouth 言) denotes verbal communication. With 吾 (wú) for the sound rhyme, you get 语 (yǔ), as in 汉语 (Hànyǔ - Chinese) and 英语 (Yīngyǔ - English)!',
        concept: '形声字 Phono-Semantic Compound',
        radical: '部首: 讠(Speech)'
      }
    },
    {
      id: 4,
      category: 'Physical Actions & Verbs',
      english: 'To Strike / Hit / Play',
      pinyin: 'dǎ',
      audioText: '打',
      toneDesc: '3rd Tone · Dipping ↘↗',
      toneNum: 3,
      clue: 'Action verb! Sounds like dǎ. On the right is 丁 (dīng), which lent an ancient phonetic sound. Which radical represents physical actions done by hand?',
      slot1: { label: 'Meaning (意符)', prefilled: null, hint: 'Select radical below' },
      slot2: { label: 'Sound (声符)', prefilled: '丁', hint: "Sounds like 'dīng'" },
      result: { glyph: '打', pinyin: 'dǎ', meaning: 'To Strike / Hit / Play' },
      choices: [
        { id: 'c1', glyph: '扌', name: 'Hand / Action', subtext: 'Semantic (意符)', isCorrect: true, slotTarget: 1 },
        { id: 'c2', glyph: '目', name: 'Eye / Sight', subtext: 'Vision category', isCorrect: false },
        { id: 'c3', glyph: '心', name: 'Heart / Mind', subtext: 'Emotion category', isCorrect: false },
        { id: 'c4', glyph: '禾', name: 'Grain / Harvest', subtext: 'Agriculture category', isCorrect: false }
      ],
      etymology: {
        story: 'The hand radical 扌(derived from 手 shǒu) indicates physical motions made by human hands. Combined with 丁 (dīng), you get 打 (dǎ) — one of the most versatile verbs in Chinese: to strike, call, type, or play ball games (打球)!',
        concept: '形声字 Phono-Semantic Compound',
        radical: '部首: 扌(Hand)'
      }
    },
    {
      id: 5,
      category: 'Dining & The Senses',
      english: 'Full / Satiated after a Meal',
      pinyin: 'bǎo',
      audioText: '饱',
      toneDesc: '3rd Tone · Dipping ↘↗',
      toneNum: 3,
      clue: 'Pronounced bǎo, rhyming closely with the bundle radical 包 (bāo). Which radical connects this sensation directly to eating and nourishment?',
      slot1: { label: 'Meaning (意符)', prefilled: null, hint: 'Select radical below' },
      slot2: { label: 'Sound (声符)', prefilled: '包', hint: "Sounds like 'bāo'" },
      result: { glyph: '饱', pinyin: 'bǎo', meaning: 'Full / Satiated' },
      choices: [
        { id: 'c1', glyph: '饣', name: 'Food / Dining', subtext: 'Semantic (意符)', isCorrect: true, slotTarget: 1 },
        { id: 'c2', glyph: '钅', name: 'Metal / Gold', subtext: 'Metal category', isCorrect: false },
        { id: 'c3', glyph: '纟', name: 'Silk / Thread', subtext: 'Textile category', isCorrect: false },
        { id: 'c4', glyph: '穴', name: 'Cave / Hole', subtext: 'Shelter category', isCorrect: false }
      ],
      etymology: {
        story: 'The food radical 饣(derived from 食 shí) marks eating and dining. Look at the magic of 包 (bāo): add food 饣-> 饱 (full, bǎo); add hand 扌-> 抱 (embrace, bào); add foot ⻊-> 跑 (run, pǎo); add water 氵-> 泡 (bubble, pào)!',
        concept: '形声字 Phono-Semantic Compound',
        radical: '部首: 饣(Food)'
      }
    },
    {
      id: 6,
      category: 'The Famous 青 Sound Family',
      english: 'Sunny / Clear Skies',
      pinyin: 'qíng',
      audioText: '晴',
      toneDesc: '2nd Tone · Rising ↗',
      toneNum: 2,
      clue: 'Pronounced qíng. The phonetic root 青 (qīng) gives the rhyming sound. What celestial body comes out to create clear, sunny skies?',
      slot1: { label: 'Meaning (意符)', prefilled: null, hint: 'Select radical below' },
      slot2: { label: 'Sound (声符)', prefilled: '青', hint: "Sounds like 'qīng'" },
      result: { glyph: '晴', pinyin: 'qíng', meaning: 'Sunny / Clear Skies' },
      choices: [
        { id: 'c1', glyph: '日', name: 'Sun / Day', subtext: 'Semantic (意符)', isCorrect: true, slotTarget: 1 },
        { id: 'c2', glyph: '氵', name: 'Water', subtext: 'Makes 清 (qīng, clear water)', isCorrect: false },
        { id: 'c3', glyph: '目', name: 'Eye', subtext: 'Makes 睛 (jīng, eyeball)', isCorrect: false },
        { id: 'c4', glyph: '忄', name: 'Heart', subtext: 'Makes 情 (qíng, feeling)', isCorrect: false }
      ],
      etymology: {
        story: 'The legendary 青 (qīng) family is the ultimate proof of character science! Add water 氵-> 清 (clear water); add eye 目 -> 睛 (eye); add heart 忄-> 情 (emotion); add Sun 日 -> 晴 (clear sunny sky)! All share the ancient "q-ing" sound family!',
        concept: '青音族 Phonetic Family',
        radical: '部首: 日 (Sun)'
      }
    },
    {
      id: 7,
      category: 'Sound Detective · Reverse Challenge',
      english: 'Lake / Inland Body of Water',
      pinyin: 'hú',
      audioText: '湖',
      toneDesc: '2nd Tone · Rising ↗',
      toneNum: 2,
      clue: 'Target is pronounced hú! The water radical 氵is already locked in place. Which radical component provides the phonetic reading "hú"?',
      slot1: { label: 'Meaning (意符)', prefilled: '氵', hint: 'Water locked in' },
      slot2: { label: 'Sound (声符)', prefilled: null, hint: "Find 'hú' sound component" },
      result: { glyph: '湖', pinyin: 'hú', meaning: 'Lake / Inland Waters' },
      choices: [
        { id: 'c1', glyph: '胡', name: 'Sounds like "hú"', subtext: 'Phonetic (声符)', isCorrect: true, slotTarget: 2 },
        { id: 'c2', glyph: '马', name: 'Sounds like "mǎ"', subtext: 'Phonetic: horse', isCorrect: false },
        { id: 'c3', glyph: '羊', name: 'Sounds like "yáng"', subtext: 'Phonetic: sheep', isCorrect: false },
        { id: 'c4', glyph: '包', name: 'Sounds like "bāo"', subtext: 'Phonetic: bundle', isCorrect: false }
      ],
      etymology: {
        story: 'You turned the tables and acted as the sound detective! 氵gives the water meaning, while 胡 (hú) provides the pronunciation. Together: 湖 (hú) = Lake (like Hangzhou\'s famous West Lake 西湖)!',
        concept: '形声字 Reverse Deduction',
        radical: '声符: 胡 (hú)'
      }
    },
    {
      id: 8,
      category: 'Compound Ideograph · Visual Story',
      english: 'To Rest / Take a Break',
      pinyin: 'xiū',
      audioText: '休',
      toneDesc: '1st Tone · High Flat ¯',
      toneNum: 1,
      clue: 'Poetic twist: Not all characters are phonetic! Some are pure visual stories (会意字). When a person (亻) leans against something in nature to rest in the shade, what are they leaning on?',
      slot1: { label: 'Person (人)', prefilled: '亻', hint: 'Standing person' },
      slot2: { label: 'Nature (木)', prefilled: null, hint: 'Choose nature element' },
      result: { glyph: '休', pinyin: 'xiū', meaning: 'To Rest / Relax' },
      choices: [
        { id: 'c1', glyph: '木', name: 'Tree / Wood', subtext: 'Leaning in the shade', isCorrect: true, slotTarget: 2 },
        { id: 'c2', glyph: '火', name: 'Fire / Flame', subtext: 'Heat element', isCorrect: false },
        { id: 'c3', glyph: '金', name: 'Metal / Gold', subtext: 'Metal element', isCorrect: false },
        { id: 'c4', glyph: '刀', name: 'Knife / Blade', subtext: 'Sharp weapon', isCorrect: false }
      ],
      etymology: {
        story: 'A person (亻) resting in the cool shade of a tree (木) = 休 (xiū - to rest)! This is a Compound Ideograph (会意字), where two meaning pictures merge to paint a vivid poetic scene.',
        concept: '会意字 Compound Ideograph',
        radical: '部首: 亻(Person) + 木 (Tree)'
      }
    },
    {
      id: 9,
      category: 'Master Synthesis · Dual Forge',
      english: 'Bright / Clarity / Tomorrow',
      pinyin: 'míng',
      audioText: '明',
      toneDesc: '2nd Tone · Rising ↗',
      toneNum: 2,
      clue: 'Final Master Challenge! Forge this character of pure radiance by selecting the two greatest light-giving celestial bodies in the heavens: Day and Night!',
      slot1: { label: 'Slot 1: Celestial', prefilled: null, hint: 'Select Sun or Moon' },
      slot2: { label: 'Slot 2: Celestial', prefilled: null, hint: 'Select matching partner' },
      result: { glyph: '明', pinyin: 'míng', meaning: 'Bright / Clarity / Tomorrow' },
      dualMode: true,
      validSet: ['日', '月'],
      choices: [
        { id: 'c1', glyph: '日', name: 'Sun / Day', subtext: 'Light of the Sun', isCorrect: true },
        { id: 'c2', glyph: '月', name: 'Moon / Night', subtext: 'Light of the Moon', isCorrect: true },
        { id: 'c3', glyph: '山', name: 'Mountain', subtext: 'Earth element', isCorrect: false },
        { id: 'c4', glyph: '雨', name: 'Rain / Sky', subtext: 'Water element', isCorrect: false }
      ],
      etymology: {
        story: 'The Sun (日) of the day + the Moon (月) of the night = 明 (míng - Bright / Clarity / Tomorrow)! You have uncovered the secret recipe and beauty of Chinese characters!',
        concept: '会意字 Celestial Ideograph',
        radical: '部首: 日 (Sun) + 月 (Moon)'
      }
    }
  ];

  // ==========================================================================
  // Web Audio API Sound Synthesizer (Zero Dependencies)
  // ==========================================================================
  class SoundManager {
    constructor() {
      this.enabled = true;
      this.audioCtx = null;
      this.loadSettings();
    }

    loadSettings() {
      const saved = localStorage.getItem('radical_chinese_sound');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('radical_chinese_sound', String(this.enabled));
      return this.enabled;
    }

    initContext() {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    playClick() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    }

    playCorrect() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.audioCtx) return;

      // Gentle ascending pentatonic chime: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const noteStart = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.36);
      });
    }

    playWrong() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.18);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    }

    playVictory() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.audioCtx) return;

      const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const now = this.audioCtx.currentTime;

      melody.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const start = now + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + (idx === melody.length - 1 ? 0.8 : 0.4));

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(start);
        osc.stop(start + 0.9);
      });
    }
  }

  // ==========================================================================
  // Web Speech Pronunciation (Optimized for Clear Mandarin Tones)
  // ==========================================================================
  let cachedChineseVoices = [];
  const loadChineseVoices = () => {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    cachedChineseVoices = voices.filter(v => v.lang && v.lang.startsWith('zh'));
  };
  if ('speechSynthesis' in window) {
    loadChineseVoices();
    window.speechSynthesis.onvoiceschanged = loadChineseVoices;
  }

  const speakChinese = (text, rate = 0.5) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      // Rate 0.5 draws out the syllable so rising/dipping/flat pitch contours are obvious
      utterance.rate = rate;
      utterance.pitch = 1.0;

      if (cachedChineseVoices.length === 0) {
        loadChineseVoices();
      }
      const zhVoice = cachedChineseVoices.find(v => v.lang.replace('_', '-').startsWith('zh-CN'))
                   || cachedChineseVoices[0];
      if (zhVoice) {
        utterance.voice = zhVoice;
      }

      // Visual tone badge animation while audio is speaking
      const toneBadge = document.getElementById('targetTone');
      if (toneBadge) {
        toneBadge.classList.add('tone-speaking');
        utterance.onend = () => toneBadge.classList.remove('tone-speaking');
        utterance.onerror = () => toneBadge.classList.remove('tone-speaking');
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback
    }
  };

  // ==========================================================================
  // Lightweight Confetti Particle Engine
  // ==========================================================================
  class ConfettiEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    burst(x = this.width / 2, y = this.height / 3, count = 45) {
      if (!this.ctx) return;
      const colors = ['#dc2626', '#d97706', '#059669', '#2563eb', '#f59e0b', '#ec4899'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 8;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: 4 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 10,
          opacity: 1,
          gravity: 0.18
        });
      }
      if (!this.animId) {
        this.loop();
      }
    }

    loop() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.opacity -= 0.012;

        if (p.opacity <= 0 || p.y > this.height) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.loop());
      } else {
        this.animId = null;
      }
    }
  }

  // ==========================================================================
  // Main Game Application
  // ==========================================================================
  class RadicalChineseApp {
    constructor() {
      this.sound = new SoundManager();
      this.confetti = new ConfettiEngine('confettiCanvas');

      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.firstTrySuccessCount = 0;
      this.attemptsOnCurrentStage = 0;
      this.forgedHistory = [];

      // Dual slot temporary selection for stage 9
      this.dualPicks = [];

      this.cacheDOMElements();
      this.bindEvents();
      this.initTheme();
      this.updateSoundIcon();
      this.setupDialogAccessibility();
      this.renderStage();
    }

    cacheDOMElements() {
      // Header controls
      this.themeToggleBtn = document.getElementById('themeToggleBtn');
      this.soundToggleBtn = document.getElementById('soundToggleBtn');
      this.glossaryBtn = document.getElementById('glossaryBtn');
      this.glossaryDialog = document.getElementById('glossaryDialog');
      this.closeGlossaryBtn = document.getElementById('closeGlossaryBtn');
      this.dialogGotItBtn = document.getElementById('dialogGotItBtn');

      // Top info bar
      this.levelDisplay = document.getElementById('levelDisplay');
      this.progressFill = document.getElementById('progressFill');
      this.scoreDisplay = document.getElementById('scoreDisplay');
      this.streakDisplay = document.getElementById('streakDisplay');

      // Target Card
      this.targetCard = document.getElementById('targetCard');
      this.categoryBadge = document.getElementById('categoryBadge');
      this.targetEnglish = document.getElementById('targetEnglish');
      this.targetPinyin = document.getElementById('targetPinyin');
      this.targetTone = document.getElementById('targetTone');
      this.speakPinyinSlowBtn = document.getElementById('speakPinyinSlowBtn');
      this.speakPinyinBtn = document.getElementById('speakPinyinBtn');
      this.clueText = document.getElementById('clueText');

      // Forge Area
      this.forgeSubLabel = document.getElementById('forgeSubLabel');
      this.slot1 = document.getElementById('slot1');
      this.slot1Badge = document.getElementById('slot1Badge');
      this.slot1Content = document.getElementById('slot1Content');
      this.slot1Placeholder = document.getElementById('slot1Placeholder');
      this.slot1Hint = document.getElementById('slot1Hint');

      this.slot2 = document.getElementById('slot2');
      this.slot2Badge = document.getElementById('slot2Badge');
      this.slot2Content = document.getElementById('slot2Content');
      this.slot2Hint = document.getElementById('slot2Hint');

      this.resultSlot = document.getElementById('resultSlot');
      this.resultPlaceholder = document.getElementById('resultPlaceholder');
      this.resultGlyph = document.getElementById('resultGlyph');
      this.resultHint = document.getElementById('resultHint');

      // Selection tray
      this.trayTitle = document.getElementById('trayTitle');
      this.radicalTray = document.getElementById('radicalTray');

      // Explanation card
      this.explanationCard = document.getElementById('explanationCard');
      this.statusIcon = document.getElementById('statusIcon');
      this.statusTitle = document.getElementById('statusTitle');
      this.pointsEarned = document.getElementById('pointsEarned');
      this.spotlightGlyph = document.getElementById('spotlightGlyph');
      this.spotlightPinyin = document.getElementById('spotlightPinyin');
      this.spotlightMeaning = document.getElementById('spotlightMeaning');
      this.spotlightAudioBtn = document.getElementById('spotlightAudioBtn');
      this.storyText = document.getElementById('storyText');
      this.storyTags = document.getElementById('storyTags');
      this.nextBtn = document.getElementById('nextBtn');

      // Game Area & Game Over
      this.gameArea = document.getElementById('gameArea');
      this.gameOverScreen = document.getElementById('gameOverScreen');
      this.finalScore = document.getElementById('finalScore');
      this.finalAccuracy = document.getElementById('finalAccuracy');
      this.finalStreak = document.getElementById('finalStreak');
      this.masteryRank = document.getElementById('masteryRank');
      this.galleryGrid = document.getElementById('galleryGrid');
      this.restartBtn = document.getElementById('restartBtn');
      this.shareScoreBtn = document.getElementById('shareScoreBtn');
      this.shareBtnText = document.getElementById('shareBtnText');
    }

    bindEvents() {
      // Theme toggle
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

      // Sound toggle
      this.soundToggleBtn.addEventListener('click', () => {
        this.sound.toggle();
        this.updateSoundIcon();
      });

      // Pronounce target word (slow clear tone or normal speed)
      if (this.speakPinyinSlowBtn) {
        this.speakPinyinSlowBtn.addEventListener('click', () => {
          const stage = STAGES[this.currentIndex];
          if (stage) speakChinese(stage.audioText || stage.result.glyph, 0.45);
        });
      }

      if (this.speakPinyinBtn) {
        this.speakPinyinBtn.addEventListener('click', () => {
          const stage = STAGES[this.currentIndex];
          if (stage) speakChinese(stage.audioText || stage.result.glyph, 0.8);
        });
      }

      if (this.spotlightAudioBtn) {
        this.spotlightAudioBtn.addEventListener('click', () => {
          const stage = STAGES[this.currentIndex];
          if (stage) speakChinese(stage.result.glyph, 0.45);
        });
      }

      // Next button
      this.nextBtn.addEventListener('click', () => this.handleNextStage());

      // Play again
      this.restartBtn.addEventListener('click', () => this.restartGame());

      // Share score
      this.shareScoreBtn.addEventListener('click', () => this.shareResult());

      // Keyboard navigation (1-4 number keys & Enter)
      window.addEventListener('keydown', (e) => {
        if (this.glossaryDialog.open) return;

        if (e.key >= '1' && e.key <= '4') {
          const index = parseInt(e.key, 10) - 1;
          const cards = this.radicalTray.querySelectorAll('.radical-card:not(.disabled)');
          if (cards[index]) {
            cards[index].click();
          }
        } else if (e.key === 'Enter') {
          if (!this.explanationCard.classList.contains('hidden')) {
            this.handleNextStage();
          }
        }
      });
    }

    setupDialogAccessibility() {
      // Open glossary modal
      this.glossaryBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.glossaryDialog.showModal();
      });

      // Close glossary modal via close button
      this.closeGlossaryBtn.addEventListener('click', () => this.glossaryDialog.close());
      this.dialogGotItBtn.addEventListener('click', () => this.glossaryDialog.close());

      // Modern Web Guidance: Fallback for browsers without 'closedby' support (Safari etc.)
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        this.glossaryDialog.addEventListener('click', (event) => {
          if (event.target !== this.glossaryDialog) return;
          const rect = this.glossaryDialog.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (!isDialogContent) {
            this.glossaryDialog.close();
          }
        });
      }
    }

    initTheme() {
      const savedTheme = localStorage.getItem('radical_chinese_theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      this.updateThemeIcons();
    }

    toggleTheme() {
      this.sound.playClick();
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('radical_chinese_theme', isDark ? 'dark' : 'light');
      this.updateThemeIcons();
    }

    updateThemeIcons() {
      const isDark = document.documentElement.classList.contains('dark');
      const moon = this.themeToggleBtn.querySelector('.moon-icon');
      const sun = this.themeToggleBtn.querySelector('.sun-icon');
      if (isDark) {
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
      } else {
        moon.classList.remove('hidden');
        sun.classList.add('hidden');
      }
    }

    updateSoundIcon() {
      const onIcon = this.soundToggleBtn.querySelector('.sound-on-icon');
      const offIcon = this.soundToggleBtn.querySelector('.sound-off-icon');
      if (this.sound.enabled) {
        onIcon.classList.remove('hidden');
        offIcon.classList.add('hidden');
      } else {
        onIcon.classList.add('hidden');
        offIcon.classList.remove('hidden');
      }
    }

    renderStage() {
      const stage = STAGES[this.currentIndex];
      if (!stage) return;

      this.attemptsOnCurrentStage = 0;
      this.dualPicks = [];

      // Update Top Meta
      const progressPercent = Math.round(((this.currentIndex) / STAGES.length) * 100);
      this.progressFill.style.width = `${Math.max(10, progressPercent)}%`;
      this.levelDisplay.textContent = `Stage ${stage.id} of ${STAGES.length}`;
      this.scoreDisplay.textContent = this.score;
      this.streakDisplay.textContent = `${this.streak} Streak`;

      // Update Target Banner
      this.categoryBadge.textContent = stage.category;
      this.targetEnglish.textContent = stage.english;
      this.targetPinyin.textContent = stage.pinyin;
      if (this.targetTone) {
        this.targetTone.textContent = stage.toneDesc;
        this.targetTone.className = `tone-badge tone-${stage.toneNum}`;
      }
      this.clueText.innerHTML = stage.clue;

      // Update Forge Slots
      this.slot1Badge.textContent = stage.slot1.label;
      this.slot1Hint.textContent = stage.slot1.hint;
      if (stage.slot1.prefilled) {
        this.slot1Content.textContent = stage.slot1.prefilled;
        this.slot1Content.classList.remove('hidden');
        this.slot1Placeholder.classList.add('hidden');
        this.slot1.classList.add('locked-slot');
        this.slot1.classList.remove('active-target', 'filled-slot');
      } else {
        this.slot1Content.textContent = '';
        this.slot1Content.classList.add('hidden');
        this.slot1Placeholder.classList.remove('hidden');
        this.slot1.classList.remove('locked-slot', 'filled-slot');
        this.slot1.classList.add('active-target');
      }

      this.slot2Badge.textContent = stage.slot2.label;
      this.slot2Hint.textContent = stage.slot2.hint;
      if (stage.slot2.prefilled) {
        this.slot2Content.textContent = stage.slot2.prefilled;
        this.slot2Content.classList.remove('hidden');
        this.slot2.classList.add('locked-slot');
        this.slot2.classList.remove('active-target', 'filled-slot');
      } else {
        this.slot2Content.textContent = '';
        this.slot2Content.classList.add('hidden');
        this.slot2.classList.remove('locked-slot', 'filled-slot');
        if (stage.slot1.prefilled) {
          this.slot2.classList.add('active-target');
        }
      }

      // Reset Result Slot
      this.resultSlot.classList.remove('result-revealed');
      this.resultGlyph.classList.add('hidden');
      this.resultPlaceholder.classList.remove('hidden');
      this.resultHint.textContent = 'Combined Output';

      // Hide Explanation
      this.explanationCard.classList.add('hidden');

      // Populate Radical Tray
      this.trayTitle.textContent = stage.dualMode
        ? 'Choose 2 celestial radicals to forge the character:'
        : 'Choose the matching radical component:';
      this.radicalTray.innerHTML = '';

      stage.choices.forEach((choice, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'radical-card';
        card.dataset.id = choice.id;
        card.setAttribute('aria-label', `${choice.name}: ${choice.glyph}`);

        card.innerHTML = `
          <span class="radical-key-num" aria-hidden="true">${index + 1}</span>
          <span class="radical-glyph-big">${choice.glyph}</span>
          <span class="radical-name">${choice.name}</span>
          <span class="radical-subtext">${choice.subtext || ''}</span>
        `;

        card.addEventListener('click', () => this.handleRadicalSelection(choice, card));
        this.radicalTray.appendChild(card);
      });
    }

    handleRadicalSelection(choice, cardElement) {
      const stage = STAGES[this.currentIndex];
      if (!stage) return;

      // Handle Dual Forge Mode (Stage 9)
      if (stage.dualMode) {
        this.handleDualModeSelection(choice, cardElement, stage);
        return;
      }

      // Single Choice Selection (Stages 1 - 8)
      this.attemptsOnCurrentStage++;

      if (choice.isCorrect) {
        this.sound.playCorrect();
        this.confetti.burst();

        // Place into target slot
        if (choice.slotTarget === 1 || !stage.slot1.prefilled) {
          this.slot1Content.textContent = choice.glyph;
          this.slot1Content.classList.remove('hidden');
          this.slot1Placeholder.classList.add('hidden');
          this.slot1.classList.add('filled-slot');
          this.slot1.classList.remove('active-target');
        } else {
          this.slot2Content.textContent = choice.glyph;
          this.slot2Content.classList.remove('hidden');
          this.slot2.classList.add('filled-slot');
          this.slot2.classList.remove('active-target');
        }

        // Reveal Combined Result Hanzi
        setTimeout(() => {
          this.resultSlot.classList.add('result-revealed');
          this.resultGlyph.textContent = stage.result.glyph;
          this.resultGlyph.classList.remove('hidden');
          this.resultPlaceholder.classList.add('hidden');
          this.resultHint.textContent = `${stage.result.pinyin} · ${stage.result.meaning}`;

          // Speak pronunciation slowly so tones are clear
          speakChinese(stage.result.glyph, 0.5);
        }, 220);

        // Update score & streak
        let points = 100;
        if (this.attemptsOnCurrentStage === 1) {
          this.firstTrySuccessCount++;
          this.streak++;
          if (this.streak > this.maxStreak) this.maxStreak = this.streak;
          points += (this.streak - 1) * 20;
        } else {
          this.streak = 0;
          points = 60;
        }
        this.score += points;
        this.scoreDisplay.textContent = this.score;
        this.streakDisplay.textContent = `${this.streak} Streak`;

        // Record history
        this.forgedHistory.push({
          stageId: stage.id,
          glyph: stage.result.glyph,
          pinyin: stage.result.pinyin,
          meaning: stage.result.meaning,
          formula: `${choice.glyph} + ${stage.slot2.prefilled || stage.slot1.prefilled || ''}`
        });

        // Disable all cards
        const allCards = this.radicalTray.querySelectorAll('.radical-card');
        allCards.forEach(c => c.classList.add('disabled'));
        cardElement.classList.add('selected');

        // Show Explanation Story Card
        this.showExplanation(stage, points);
      } else {
        // Incorrect attempt
        this.sound.playWrong();
        cardElement.classList.add('shake-animation');
        cardElement.classList.add('disabled');
        setTimeout(() => cardElement.classList.remove('shake-animation'), 400);

        this.streak = 0;
        this.streakDisplay.textContent = '0 Streak';
      }
    }

    handleDualModeSelection(choice, cardElement, stage) {
      if (this.dualPicks.some(p => p.id === choice.id)) return;

      this.sound.playClick();
      cardElement.classList.add('selected');
      this.dualPicks.push(choice);

      if (this.dualPicks.length === 1) {
        this.slot1Content.textContent = choice.glyph;
        this.slot1Content.classList.remove('hidden');
        this.slot1Placeholder.classList.add('hidden');
        this.slot1.classList.add('filled-slot');
        this.slot2.classList.add('active-target');
      } else if (this.dualPicks.length === 2) {
        this.slot2Content.textContent = choice.glyph;
        this.slot2Content.classList.remove('hidden');
        this.slot2.classList.add('filled-slot');

        const pickedGlyphs = this.dualPicks.map(p => p.glyph);
        const isSetCorrect = stage.validSet.every(g => pickedGlyphs.includes(g));

        if (isSetCorrect) {
          this.sound.playCorrect();
          this.confetti.burst();

          setTimeout(() => {
            this.resultSlot.classList.add('result-revealed');
            this.resultGlyph.textContent = stage.result.glyph;
            this.resultGlyph.classList.remove('hidden');
            this.resultPlaceholder.classList.add('hidden');
            this.resultHint.textContent = `${stage.result.pinyin} · ${stage.result.meaning}`;
            // Speak pronunciation slowly so tones are clear
            speakChinese(stage.result.glyph, 0.5);
          }, 220);

          const points = 150 + (this.streak * 20);
          this.score += points;
          this.streak++;
          if (this.streak > this.maxStreak) this.maxStreak = this.streak;
          this.scoreDisplay.textContent = this.score;
          this.streakDisplay.textContent = `${this.streak} Streak`;

          this.forgedHistory.push({
            stageId: stage.id,
            glyph: stage.result.glyph,
            pinyin: stage.result.pinyin,
            meaning: stage.result.meaning,
            formula: '日 (Sun) + 月 (Moon)'
          });

          const allCards = this.radicalTray.querySelectorAll('.radical-card');
          allCards.forEach(c => c.classList.add('disabled'));

          this.showExplanation(stage, points);
        } else {
          this.sound.playWrong();
          const selected = this.radicalTray.querySelectorAll('.radical-card.selected');
          selected.forEach(s => s.classList.add('shake-animation'));
          setTimeout(() => {
            selected.forEach(s => {
              s.classList.remove('shake-animation', 'selected');
            });
            this.dualPicks = [];
            this.slot1Content.textContent = '';
            this.slot1Content.classList.add('hidden');
            this.slot1Placeholder.classList.remove('hidden');
            this.slot1.classList.remove('filled-slot');
            this.slot2Content.textContent = '';
            this.slot2Content.classList.add('hidden');
            this.slot2.classList.remove('filled-slot', 'active-target');
          }, 500);
        }
      }
    }

    showExplanation(stage, points) {
      this.pointsEarned.textContent = `+${points} pts`;
      this.spotlightGlyph.textContent = stage.result.glyph;
      this.spotlightPinyin.textContent = stage.result.pinyin;
      this.spotlightMeaning.textContent = stage.result.meaning;
      this.storyText.innerHTML = stage.etymology.story;

      this.storyTags.innerHTML = `
        <span class="concept-chip">${stage.etymology.concept}</span>
        <span class="radical-chip">${stage.etymology.radical}</span>
      `;

      if (this.currentIndex === STAGES.length - 1) {
        this.nextBtn.querySelector('span').textContent = 'See Final Results';
      } else {
        this.nextBtn.querySelector('span').textContent = 'Next Challenge';
      }

      this.explanationCard.classList.remove('hidden');
      this.explanationCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.nextBtn.focus();
    }

    handleNextStage() {
      this.sound.playClick();
      this.currentIndex++;

      if (this.currentIndex >= STAGES.length) {
        this.showGameOver();
      } else {
        this.renderStage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    showGameOver() {
      this.sound.playVictory();
      this.confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 80);

      this.gameArea.classList.add('hidden');
      this.gameOverScreen.classList.remove('hidden');

      // Final stats
      this.finalScore.textContent = this.score;
      const accuracy = Math.round((this.firstTrySuccessCount / STAGES.length) * 100);
      this.finalAccuracy.textContent = `${accuracy}%`;
      this.finalStreak.textContent = `${this.maxStreak} 🔥`;

      // Honorary Rank
      let rank = '部首学徒 Apprentice';
      if (accuracy >= 90) {
        rank = '宗师 Grandmaster';
      } else if (accuracy >= 70) {
        rank = '学者 Scholar';
      } else if (accuracy >= 50) {
        rank = '行者 Seeker';
      }
      this.masteryRank.textContent = rank;

      // Populate Forged Gallery
      this.galleryGrid.innerHTML = '';
      this.forgedHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
          <div class="gallery-glyph">${item.glyph}</div>
          <div class="gallery-details">
            <div class="gallery-hanzi-pinyin">${item.pinyin} · ${item.meaning}</div>
            <div class="gallery-formula">${item.formula}</div>
          </div>
        `;
        this.galleryGrid.appendChild(div);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    restartGame() {
      this.sound.playClick();
      this.currentIndex = 0;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.firstTrySuccessCount = 0;
      this.forgedHistory = [];

      this.gameOverScreen.classList.add('hidden');
      this.gameArea.classList.remove('hidden');
      this.renderStage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    shareResult() {
      this.sound.playClick();
      const accuracy = Math.round((this.firstTrySuccessCount / STAGES.length) * 100);
      const glyphs = this.forgedHistory.map(h => h.glyph).join(' ');

      const shareText = `Radical Chinese · 部首魔法\nScore: ${this.score} pts | Rank: ${this.masteryRank.textContent}\n🔥 Max Streak: ${this.maxStreak} | First-Try: ${accuracy}%\nCharacters Forged: ${glyphs}\nPlay now: https://james-s-w-clark.github.io/radical-chinese/`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
          this.shareBtnText.textContent = 'Copied to Clipboard! ✓';
          setTimeout(() => {
            this.shareBtnText.textContent = 'Share Result';
          }, 2500);
        }).catch(() => {
          this.shareBtnText.textContent = 'Result Ready!';
        });
      } else {
        alert(shareText);
      }
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RadicalChineseApp());
  } else {
    new RadicalChineseApp();
  }
})();
