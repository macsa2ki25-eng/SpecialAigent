/**
 * analytics.js
 * 子供のタイピング癖を細かくプロファイリングし、苦手分析と練習ドリル生成を担う。
 *
 * 計測項目:
 *   - キー単位: 試行回数、ミス回数、平均打鍵時間(IKI)、直近イベント
 *   - バイグラム: 連続2キーの所要時間とミス率（例 "ki", "si", "ta"）
 *   - 混同行列: 期待キーごとに、誤って押したキーの回数
 *
 * 苦手スコア（key score）:
 *   missRate = errors / attempts
 *   recencyFactor = 直近イベントの誤り率（時間減衰）
 *   score = missRate * 0.6 + recencyFactor * 0.4
 *
 * 自動ドリル:
 *   苦手キー上位N個を多く含む実在語を words.js から選別し、足りなければ
 *   それらのキーで構成される短い擬似ローマ字列を合成する。
 */
(function (global) {
  const KEY = 'yubi-analytics-v1';
  const MAX_RECENT = 30;       // キーあたり保持する直近イベント数
  const MAX_DT_MS = 2500;      // これより長い間隔はIKIに加算しない
  const MIN_ATTEMPTS = 5;      // ランキング対象の最低試行数

  // セッション内の直前キー記録（永続化しない）
  let lastKey = null;
  let lastTime = 0;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {
      return defaultState();
    }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }
  function defaultState() {
    return {
      keyStats: {},     // 'a': { attempts, errors, totalTime, recentEvents:[{t,ok,dt}] }
      bigramStats: {},  // 'ki': { attempts, errors, totalTime }
      confusion: {},    // 'a': { 's':2, 'q':1 }
      lastUpdated: 0,
    };
  }
  function reset() { localStorage.removeItem(KEY); lastKey = null; }

  function ensureKey(s, k) {
    if (!s.keyStats[k]) s.keyStats[k] = { attempts:0, errors:0, totalTime:0, recentEvents:[] };
    return s.keyStats[k];
  }
  function ensureBigram(s, b) {
    if (!s.bigramStats[b]) s.bigramStats[b] = { attempts:0, errors:0, totalTime:0 };
    return s.bigramStats[b];
  }

  /**
   * @param {string} expected - 期待されていた文字（小文字）
   * @param {string} pressed - 実際に押された文字（小文字）
   * @param {boolean} ok - 期待と一致したか
   * @param {boolean} firstAttempt - そのポジションで最初の打鍵か（true以外はカウントしない）
   */
  function recordKeyEvent(expected, pressed, ok, firstAttempt) {
    if (!firstAttempt) return;
    const now = performance.now();
    const dt = lastKey && (now - lastTime) < MAX_DT_MS ? (now - lastTime) : 0;
    const s = load();
    const ks = ensureKey(s, expected);
    ks.attempts++;
    if (!ok) {
      ks.errors++;
      // 混同行列
      if (!s.confusion[expected]) s.confusion[expected] = {};
      s.confusion[expected][pressed] = (s.confusion[expected][pressed] || 0) + 1;
    }
    if (dt > 0) ks.totalTime += dt;
    ks.recentEvents.push({ t: Date.now(), ok, dt });
    if (ks.recentEvents.length > MAX_RECENT) ks.recentEvents.shift();

    if (lastKey && dt > 0) {
      const bg = lastKey + expected;
      const bs = ensureBigram(s, bg);
      bs.attempts++;
      if (!ok) bs.errors++;
      bs.totalTime += dt;
    }

    lastKey = expected;
    lastTime = now;
    s.lastUpdated = Date.now();
    save(s);
  }

  // 問題切替時に呼ぶ：直前キー文脈をリセット（IKIに不当な大値が混ざるのを防ぐ）
  function resetContext() { lastKey = null; lastTime = 0; }

  // === 苦手スコア ===
  function keyScore(stats) {
    if (!stats || stats.attempts < MIN_ATTEMPTS) return null;
    const missRate = stats.errors / stats.attempts;
    const recent = stats.recentEvents.slice(-15);
    const recentMiss = recent.length ? recent.filter((e) => !e.ok).length / recent.length : missRate;
    return missRate * 0.6 + recentMiss * 0.4;
  }
  function avgTime(stats) {
    if (!stats || stats.attempts === 0) return 0;
    // 打鍵時間に寄与したサンプルだけ平均
    const samples = stats.recentEvents.filter((e) => e.dt > 0);
    if (!samples.length) return 0;
    return samples.reduce((a, e) => a + e.dt, 0) / samples.length;
  }

  function report(limit = 5) {
    const s = load();
    const entries = Object.entries(s.keyStats);
    const weak = entries
      .map(([k, v]) => ({ key:k, score: keyScore(v), missRate: v.errors/Math.max(1,v.attempts), attempts: v.attempts }))
      .filter((e) => e.score !== null && e.score > 0.05)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
    const slow = entries
      .map(([k, v]) => ({ key:k, ms: avgTime(v), attempts: v.attempts }))
      .filter((e) => e.attempts >= MIN_ATTEMPTS && e.ms > 0)
      .sort((a, b) => b.ms - a.ms)
      .slice(0, limit);
    const confused = [];
    for (const [exp, presses] of Object.entries(s.confusion)) {
      for (const [pressed, n] of Object.entries(presses)) {
        if (n >= 2) confused.push({ expected: exp, pressed, count: n });
      }
    }
    confused.sort((a, b) => b.count - a.count);
    return {
      weakKeys: weak,
      slowKeys: slow,
      confusedPairs: confused.slice(0, limit),
      totalAttempts: entries.reduce((a, [, v]) => a + v.attempts, 0),
    };
  }

  // ヒートマップ用：すべてのキーについて { missRate, avgMs, attempts } を返す
  function heatmap() {
    const s = load();
    const out = {};
    for (const [k, v] of Object.entries(s.keyStats)) {
      out[k] = {
        attempts: v.attempts,
        missRate: v.errors / Math.max(1, v.attempts),
        avgMs: avgTime(v),
      };
    }
    return out;
  }

  // === ドリル生成 ===
  // 苦手キー上位3つを多く含む実在の単語（words.js全体から）を集めて10問返す。
  function generateDrill(opts = {}) {
    const n = opts.count || 10;
    const r = report(3);
    const targetKeys = r.weakKeys.map((e) => e.key);
    if (!targetKeys.length) return null; // 分析データが足りない

    // 全単語をフラット化
    const pool = [];
    const W = global.Words;
    if (W) {
      const groups = [W.A, W.KA, W.SA, W.TA, W.NA, W.HA, W.MA_YA, W.RA_WA_N,
                       W.DAKUON, W.HANDAKU_YOUON, W.STAGE_WORDS, W.TIME_ATTACK_WORDS];
      groups.forEach((g) => {
        if (!Array.isArray(g)) return;
        g.forEach((w) => { if (w.kana && w.romaji) pool.push(w); });
      });
    }

    // 各単語に「苦手キーを含む数」のスコアを付ける
    const scored = pool.map((w) => {
      let s = 0;
      for (const ch of w.romaji) {
        if (targetKeys.includes(ch)) s++;
      }
      return { ...w, _score: s, _len: w.romaji.length };
    }).filter((w) => w._score > 0);

    // 苦手キーを多く含み、かつあまり長くない単語を優先
    scored.sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return a._len - b._len;
    });

    // ユニークなものをピックアップ、足りなければ合成文字列で補う
    const picked = [];
    const seen = new Set();
    for (const w of scored) {
      if (picked.length >= n) break;
      if (seen.has(w.kana)) continue;
      seen.add(w.kana);
      picked.push({ kana: w.kana, romaji: w.romaji });
    }
    while (picked.length < n) {
      picked.push(syntheticDrill(targetKeys));
    }
    return { targetKeys, items: picked };
  }

  function syntheticDrill(keys) {
    // 苦手キーをランダム並べた4〜6文字の文字列。表示用のかなはローマ字をそのまま。
    const len = 4 + Math.floor(Math.random() * 3);
    let r = '';
    for (let i = 0; i < len; i++) r += keys[Math.floor(Math.random() * keys.length)];
    return { kana: r.toUpperCase(), romaji: r };
  }

  global.Analytics = {
    recordKeyEvent, resetContext,
    report, heatmap, generateDrill, reset,
    load,
  };
})(window);
