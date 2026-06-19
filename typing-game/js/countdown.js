/**
 * countdown.js
 * 問題ごとに制限時間が変わる「カウントダウンモード」。
 *   - かな 2-4 文字: 7 秒
 *   - かな 5+ 文字: 15 秒
 *   - ローマ字のみ(ホーム): 8 秒
 * 全 10 問。時間切れはミス扱いで次へ。
 */
(function (global) {
  let state = null;
  const TOTAL_PROBLEMS = 10;

  function buildPool() {
    const pool = [];
    const W = global.Words;
    if (!W) return pool;
    const push = (g, filter) => {
      if (!Array.isArray(g)) return;
      g.filter(filter || (() => true)).forEach((w) => {
        if (w.romaji) pool.push(w);
      });
    };
    // 短い・中くらいのことばを 広く 集める
    [W.A, W.KA, W.SA, W.TA, W.NA, W.HA, W.MA_YA, W.RA_WA_N,
     W.DAKUON, W.HANDAKUON, W.YOUON].forEach((g) =>
      push(g, (w) => w.kana && w.kana.length >= 2 && w.kana.length <= 5));
    push(W.STAGE_WORDS);
    push(W.STAGE_POKEMON);
    push(W.STAGE_MOVES);
    push(W.TIME_ATTACK_WORDS);
    // ホームポジション(ローマ字のみ) も 少し 混ぜる
    if (Array.isArray(W.HOME)) {
      W.HOME.filter((h) => typeof h === 'string' && h.length >= 4 && h.length <= 8)
            .slice(0, 6)
            .forEach((s) => pool.push({ kana: '', romaji: s }));
    }
    return pool;
  }

  function timeForProblem(q) {
    if (!q.kana) return 8;             // ローマ字のみ
    const len = q.kana.length;
    if (len <= 4) return 7;
    return 15;                         // 5文字以上
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function start(onEnd) {
    const pool = buildPool();
    const questions = shuffle(pool).slice(0, TOTAL_PROBLEMS);
    state = {
      onEnd,
      questions,
      idx: 0,
      pos: 0,
      missThisChar: false,
      stats: { correct: 0, miss: 0, timeout: 0 },
      timeLeft: 0,
      tickerId: null,
      ended: false,
    };
    if (window.Sound) Sound.playBgm('battle');
    Keyboard.render(document.getElementById('cd-keyboard'));
    bindKeys();
    nextProblem();
  }

  function stop() {
    if (!state) return;
    unbindKeys();
    if (state.tickerId) clearInterval(state.tickerId);
    if (window.Sound) Sound.stopBgm();
    state = null;
  }

  function nextProblem() {
    if (!state) return;
    if (state.idx >= TOTAL_PROBLEMS) { finish(); return; }
    const q = state.questions[state.idx];
    state.pos = 0;
    state.missThisChar = false;
    state.timeLeft = timeForProblem(q);
    if (window.Analytics) Analytics.resetContext();
    render();
    startTimer();
  }

  function render() {
    const q = state.questions[state.idx];
    document.getElementById('cd-progress').textContent = `${state.idx + 1} / ${TOTAL_PROBLEMS}`;
    document.getElementById('cd-correct').textContent = `○ ${state.stats.correct}`;
    document.getElementById('cd-kana').textContent = q.kana || '';
    paintRomaji();
    updateTimerUI();
  }

  function paintRomaji() {
    const q = state.questions[state.idx];
    const romaEl = document.getElementById('cd-romaji');
    romaEl.innerHTML = '';
    for (let i = 0; i < q.romaji.length; i++) {
      const ch = q.romaji[i];
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '␣' : ch;
      if (i < state.pos) span.className = 'rch done';
      else if (i === state.pos) span.className = 'rch current';
      else span.className = 'rch pending';
      romaEl.appendChild(span);
    }
    const kb = document.getElementById('cd-keyboard');
    if (kb) Keyboard.highlightNext(kb, (q.romaji[state.pos] || '').toLowerCase());
  }

  function startTimer() {
    if (state.tickerId) clearInterval(state.tickerId);
    state.tickerId = setInterval(() => {
      if (!state) return;
      state.timeLeft--;
      updateTimerUI();
      if (state.timeLeft <= 3 && state.timeLeft > 0) {
        if (window.Sound) Sound.playTick();
      }
      if (state.timeLeft <= 0) {
        // 時間切れ
        if (window.Sound) Sound.playMiss();
        state.stats.timeout++;
        clearInterval(state.tickerId);
        flashMessage('時間切れ！', 'timeout');
        state.idx++;
        setTimeout(nextProblem, 900);
      }
    }, 1000);
  }

  function updateTimerUI() {
    if (!state) return;
    const el = document.getElementById('cd-timer');
    if (!el) return;
    el.textContent = Math.max(0, state.timeLeft);
    el.classList.toggle('warn', state.timeLeft <= 3);
  }

  function flashMessage(msg, cls) {
    const el = document.getElementById('cd-flash');
    if (!el) return;
    el.textContent = msg;
    el.className = 'cd-flash show ' + (cls || '');
    setTimeout(() => { if (el) el.className = 'cd-flash'; }, 800);
  }

  // === キー入力 ===
  function bindKeys() { document.addEventListener('keydown', onKey); }
  function unbindKeys() { document.removeEventListener('keydown', onKey); }

  function onKey(e) {
    if (!state || state.ended) return;
    if (e.key === 'Backspace') { e.preventDefault(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    e.preventDefault();

    const q = state.questions[state.idx];
    const expected = q.romaji[state.pos];
    const pressed = e.key.toLowerCase();
    if (pressed === expected.toLowerCase()) {
      if (window.Sound) Sound.playKey(Keyboard.fingerOf(expected));
      if (window.Analytics) Analytics.recordKeyEvent(expected.toLowerCase(), pressed, true, !state.missThisChar);
      state.pos++;
      state.missThisChar = false;
      if (state.pos >= q.romaji.length) {
        // クリア！
        state.stats.correct++;
        if (state.tickerId) clearInterval(state.tickerId);
        flashMessage('せいかい！', 'ok');
        state.idx++;
        setTimeout(nextProblem, 600);
      } else {
        paintRomaji();
      }
    } else {
      if (window.Sound) Sound.playMiss();
      if (window.Analytics) Analytics.recordKeyEvent(expected.toLowerCase(), pressed, false, !state.missThisChar);
      if (!state.missThisChar) {
        state.stats.miss++;
        state.missThisChar = true;
      }
      const span = document.querySelector('#cd-romaji .rch.current');
      if (span) {
        span.classList.add('wrong');
        setTimeout(() => span.classList.remove('wrong'), 200);
      }
    }
    document.getElementById('cd-correct').textContent = `○ ${state.stats.correct}`;
  }

  function finish() {
    if (state.tickerId) clearInterval(state.tickerId);
    state.ended = true;
    unbindKeys();
    if (window.Sound) { Sound.stopBgm(); Sound.playVictory(); }
    const stats = state.stats;
    const score = Math.max(0, stats.correct * 100 - stats.miss * 10);
    Progress.recordCountdown(score, stats);
    const cb = state.onEnd;
    state = null;
    cb({ score, ...stats });
  }

  global.Countdown = { start, stop, TOTAL_PROBLEMS };
})(window);
