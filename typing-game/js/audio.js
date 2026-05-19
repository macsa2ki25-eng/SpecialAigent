/**
 * audio.js
 * Web Audio API による全効果音とBGMの動的合成。音声ファイル不要。
 *
 * 指ごとに異なるピッチのキータイプ音、ミス音、ステージクリア音、
 * 戦闘の攻撃/被弾音、BGM（メニュー用/バトル用）を提供する。
 */
(function (global) {
  let ctx = null;
  let masterGain = null;
  let bgmGain = null;
  let bgmTimer = null;
  let currentBgm = null;       // 'menu' | 'battle' | null
  let muted = false;

  function init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.4;
    masterGain.connect(ctx.destination);
    bgmGain = ctx.createGain();
    bgmGain.gain.value = 0.15;
    bgmGain.connect(masterGain);
  }

  function ensureRunning() {
    init();
    if (!ctx) return false;
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }

  function setMuted(v) {
    muted = !!v;
    if (masterGain) masterGain.gain.value = muted ? 0 : 0.4;
  }
  function isMuted() { return muted; }

  // 指コードごとの音階(Hz) ─ 中央Cを基準にスケール状に配置
  const FINGER_FREQ = {
    LP: 523.25, // C5 左小指
    LR: 587.33, // D5 左薬指
    LM: 659.25, // E5 左中指
    LI: 698.46, // F5 左人差し指
    TH: 392.00, // G4 親指（低め）
    RI: 783.99, // G5 右人差し指
    RM: 880.00, // A5 右中指
    RR: 987.77, // B5 右薬指
    RP: 1046.50,// C6 右小指
  };

  // === 単音再生 ===
  function tone(freq, dur, type = 'sine', startGain = 0.5, attack = 0.005, release = 0.08) {
    if (!ensureRunning()) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(startGain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(t);
    osc.stop(t + dur + release);
  }

  function noiseBurst(dur, startGain = 0.3) {
    if (!ensureRunning()) return;
    const t = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    g.gain.value = startGain;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    src.connect(filter); filter.connect(g); g.connect(masterGain);
    src.start(t);
  }

  // === パブリックAPI ===
  function playKey(fingerCode) {
    const f = FINGER_FREQ[fingerCode] || 660;
    tone(f, 0.06, 'triangle', 0.35);
  }

  function playMiss() {
    if (!ensureRunning()) return;
    tone(150, 0.12, 'sawtooth', 0.25);
    noiseBurst(0.08, 0.15);
  }

  function playStageClear() {
    if (!ensureRunning()) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C E G C E
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.18, 'triangle', 0.5), i * 110));
  }

  function playFail() {
    if (!ensureRunning()) return;
    const notes = [392, 330, 277]; // 下降
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.25, 'sine', 0.4), i * 180));
  }

  function playAttack() {
    if (!ensureRunning()) return;
    // 攻撃: 上昇スイープ + ノイズ
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(g); g.connect(masterGain);
    osc.start(t); osc.stop(t + 0.22);
    setTimeout(() => noiseBurst(0.12, 0.2), 100);
  }

  function playDamage() {
    if (!ensureRunning()) return;
    // 被弾: 揺れる中低音
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(150, t + 0.3);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(g); g.connect(masterGain);
    osc.start(t); osc.stop(t + 0.32);
  }

  function playFaint() {
    if (!ensureRunning()) return;
    // ポケモンが倒れる音: 下降スイープ
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.6);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.connect(g); g.connect(masterGain);
    osc.start(t); osc.stop(t + 0.62);
  }

  function playVictory() {
    if (!ensureRunning()) return;
    const notes = [523, 587, 659, 783, 880, 1046, 1318]; // C D E G A C E
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.18, 'triangle', 0.5), i * 110));
  }

  function playTick() { tone(880, 0.04, 'sine', 0.25); }

  // === BGM ===
  // メニュー: 明るく軽快なループ
  const BGM_MENU = [
    // [note(Hz), duration(s)]
    [523, 0.25], [659, 0.25], [783, 0.25], [659, 0.25],
    [587, 0.25], [698, 0.25], [880, 0.25], [698, 0.25],
    [523, 0.25], [659, 0.25], [783, 0.5],
    [880, 0.25], [783, 0.25], [659, 0.5],
  ];
  // バトル: テンポ良くハラハラ
  const BGM_BATTLE = [
    [392, 0.2], [523, 0.2], [659, 0.2], [523, 0.2],
    [440, 0.2], [587, 0.2], [698, 0.2], [587, 0.2],
    [330, 0.2], [494, 0.2], [659, 0.2], [494, 0.2],
    [392, 0.2], [523, 0.2], [784, 0.4],
  ];

  function playBgm(name) {
    if (!ensureRunning()) return;
    if (currentBgm === name) return;
    stopBgm();
    currentBgm = name;
    const pattern = name === 'battle' ? BGM_BATTLE : BGM_MENU;
    let i = 0;
    function scheduleNext() {
      if (currentBgm !== name) return;
      const [freq, dur] = pattern[i % pattern.length];
      bgmTone(freq, dur);
      i++;
      bgmTimer = setTimeout(scheduleNext, dur * 1000);
    }
    scheduleNext();
  }

  function bgmTone(freq, dur) {
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.08, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.9);
    osc.connect(g); g.connect(bgmGain);
    osc.start(t); osc.stop(t + dur);
  }

  function stopBgm() {
    if (bgmTimer) { clearTimeout(bgmTimer); bgmTimer = null; }
    currentBgm = null;
  }

  global.Sound = {
    init: ensureRunning,
    setMuted, isMuted,
    playKey, playMiss, playStageClear, playFail,
    playAttack, playDamage, playFaint, playVictory, playTick,
    playBgm, stopBgm,
  };
})(window);
