/**
 * progress.js
 * localStorage を使った進捗・苦手キーの保存。
 */
(function (global) {
  const KEY = 'yubi-tanken-progress-v1';

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const data = JSON.parse(raw);
      return Object.assign(defaultState(), data);
    } catch (e) {
      return defaultState();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function defaultState() {
    return {
      unlockedStage: 1,    // 1〜7
      badges: {},          // {1:true, 2:true, ...}
      bestStats: {},       // {stageId: {accuracy, wpm, time}}
      weakKeys: {},        // {key: missCount}
      keyAttempts: {},     // {key: totalCount}
      showRomaji: true,
      totalCorrect: 0,
      totalWrong: 0,
    };
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function recordResult(stageId, stats) {
    const s = load();
    if (stats.accuracy >= 0.7) {
      s.badges[stageId] = true;
      s.unlockedStage = Math.max(s.unlockedStage, Math.min(stageId + 1, 7));
    }
    const prev = s.bestStats[stageId];
    if (!prev || stats.accuracy > prev.accuracy ||
        (stats.accuracy === prev.accuracy && stats.wpm > prev.wpm)) {
      s.bestStats[stageId] = stats;
    }
    save(s);
    return s;
  }

  function recordKey(key, ok) {
    const s = load();
    s.keyAttempts[key] = (s.keyAttempts[key] || 0) + 1;
    if (!ok) {
      s.weakKeys[key] = (s.weakKeys[key] || 0) + 1;
      s.totalWrong++;
    } else {
      s.totalCorrect++;
    }
    save(s);
  }

  function getWeakKeys(limit = 3) {
    const s = load();
    return Object.entries(s.weakKeys)
      .filter(([k, v]) => v >= 2 && (s.keyAttempts[k] || 0) >= 3)
      .sort((a, b) => {
        const rateA = a[1] / (s.keyAttempts[a[0]] || 1);
        const rateB = b[1] / (s.keyAttempts[b[0]] || 1);
        return rateB - rateA;
      })
      .slice(0, limit)
      .map(([k]) => k);
  }

  function setShowRomaji(v) {
    const s = load();
    s.showRomaji = v;
    save(s);
  }

  global.Progress = { load, save, reset, recordResult, recordKey, getWeakKeys, setShowRomaji };
})(window);
