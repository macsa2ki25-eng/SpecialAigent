/**
 * timeattack.js
 * 60秒タイムアタックモード。
 * 短い単語を連続出題し、制限時間内のスコアを競う。
 *
 * スコア = 正解文字数 * 10 - ミス回数 * 3 + 完答単語数 * 20
 */
(function (global) {
  let state = null;
  const DURATION = 60;

  function start(onEnd) {
    state = {
      onEnd,
      pool: shuffle(Words.TIME_ATTACK_WORDS.slice()),
      poolIdx: 0,
      currentWord: null,
      pos: 0,
      missThisChar: false,
      stats: { correct: 0, miss: 0, wordsClear: 0 },
      remaining: DURATION,
      tickerId: null,
      ended: false,
    };
    nextWord();
    render();
    bindKeys();
    startTicker();
    if (window.Sound) Sound.playBgm('battle');
  }

  function stop() {
    if (!state) return;
    unbindKeys();
    if (state.tickerId) clearInterval(state.tickerId);
    if (window.Sound) Sound.stopBgm();
    state = null;
  }

  function nextWord() {
    state.currentWord = state.pool[state.poolIdx % state.pool.length];
    state.poolIdx++;
    state.pos = 0;
    state.missThisChar = false;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // === 描画 ===
  function render() {
    const root = document.getElementById('ta-content');
    root.innerHTML = `
      <div class="ta-top">
        <div class="ta-time-box">
          <div class="ta-time-label">のこり</div>
          <div class="ta-time" id="ta-time">${state.remaining}</div>
          <div class="ta-time-unit">びょう</div>
        </div>
        <div class="ta-score-box">
          <div class="ta-score-label">スコア</div>
          <div class="ta-score" id="ta-score">0</div>
        </div>
        <div class="ta-stats">
          <div>○ <span id="ta-correct">0</span></div>
          <div>× <span id="ta-miss">0</span></div>
          <div>たんご: <span id="ta-words">0</span></div>
        </div>
      </div>
      <div class="ta-word-area">
        <div class="ta-kana" id="ta-kana"></div>
        <div class="ta-romaji" id="ta-romaji"></div>
      </div>
    `;
    paintWord();
  }

  function paintWord() {
    const w = state.currentWord;
    document.getElementById('ta-kana').textContent = w.kana;
    const romaEl = document.getElementById('ta-romaji');
    romaEl.innerHTML = '';
    for (let i = 0; i < w.romaji.length; i++) {
      const ch = w.romaji[i];
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '␣' : ch;
      if (i < state.pos) span.className = 'rch done';
      else if (i === state.pos) span.className = 'rch current';
      else span.className = 'rch pending';
      romaEl.appendChild(span);
    }
    const kb = document.getElementById('ta-keyboard');
    if (kb) Keyboard.highlightNext(kb, (w.romaji[state.pos] || '').toLowerCase());
  }

  function updateStats() {
    const s = state.stats;
    const score = s.correct * 10 - s.miss * 3 + s.wordsClear * 20;
    document.getElementById('ta-score').textContent = Math.max(0, score);
    document.getElementById('ta-correct').textContent = s.correct;
    document.getElementById('ta-miss').textContent = s.miss;
    document.getElementById('ta-words').textContent = s.wordsClear;
  }

  // === キー処理 ===
  function bindKeys() { document.addEventListener('keydown', onKey); }
  function unbindKeys() { document.removeEventListener('keydown', onKey); }

  function onKey(e) {
    if (!state || state.ended) return;
    if (e.key === 'Backspace') { e.preventDefault(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    e.preventDefault();

    const w = state.currentWord;
    const expected = w.romaji[state.pos];
    const pressed = e.key.toLowerCase();
    if (pressed === expected.toLowerCase()) {
      if (window.Sound) Sound.playKey(Keyboard.fingerOf(expected));
      if (!state.missThisChar) state.stats.correct++;
      state.pos++;
      state.missThisChar = false;
      if (state.pos >= w.romaji.length) {
        state.stats.wordsClear++;
        nextWord();
      }
      paintWord();
      updateStats();
    } else {
      if (window.Sound) Sound.playMiss();
      if (!state.missThisChar) {
        state.stats.miss++;
        state.missThisChar = true;
      }
      const span = document.querySelector('#ta-romaji .rch.current');
      if (span) {
        span.classList.add('wrong');
        setTimeout(() => span.classList.remove('wrong'), 200);
      }
      updateStats();
    }
  }

  // === タイマー ===
  function startTicker() {
    state.tickerId = setInterval(() => {
      state.remaining--;
      const tEl = document.getElementById('ta-time');
      if (tEl) tEl.textContent = state.remaining;
      if (state.remaining <= 5 && state.remaining > 0) {
        if (window.Sound) Sound.playTick();
        if (tEl) tEl.classList.add('flash');
      }
      if (state.remaining <= 0) finish();
    }, 1000);
  }

  function finish() {
    if (state.ended) return;
    state.ended = true;
    if (state.tickerId) clearInterval(state.tickerId);
    if (window.Sound) { Sound.stopBgm(); Sound.playVictory(); }
    unbindKeys();
    const s = state.stats;
    const score = Math.max(0, s.correct * 10 - s.miss * 3 + s.wordsClear * 20);
    Progress.recordTimeAttack(score, s);
    const cb = state.onEnd;
    state = null;
    cb({ score, ...s });
  }

  global.TimeAttack = { start, stop, DURATION };
})(window);
