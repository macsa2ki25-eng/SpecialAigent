/**
 * game.js
 * ステージのゲーム本体。
 *
 * 単語1問は、次のフィールドを持つ:
 *   - kana: 画面に表示するひらがな/カタカナ（type='home' のときは空）
 *   - romaji: 実際にタイプする文字列（小文字、半角記号を含む）
 *   - img:    画像URL（任意）
 *
 * 入力判定はローマ字列に対する逐次一致。期待文字以外を押すと「まちがい」扱い。
 * Shift などのモディファイア単独では何もしない。
 */
(function (global) {
  let state = null;

  function start(stage, onFinish) {
    state = {
      stage,
      onFinish,
      questions: buildQuestions(stage),
      idx: 0,
      pos: 0,        // 現在の文字位置
      correct: 0,
      wrong: 0,
      missThisChar: false,  // 現在の文字で1回以上ミスしたか（同じキーでの連打を1ミスにまとめる）
      startTime: Date.now(),
      timerId: null,
    };
    bindKeys();
    renderQuestion();
    startTimer();
  }

  function stop() {
    unbindKeys();
    if (state && state.timerId) clearInterval(state.timerId);
    state = null;
  }

  // ---- 出題リスト構築 ----
  function buildQuestions(stage) {
    const pool = stage.words();
    const out = [];
    const n = stage.questionCount;
    // 苦手キー強化: 過去ミスが多いキーを含む問題を冒頭に優先配置
    const weak = Progress.getWeakKeys(3);

    // home: 文字列の配列。それ以外: {kana, romaji}の配列。
    const items = pool.map((w) => normalizeItem(w, stage.type));

    // ランダム取り出し
    const shuffled = shuffle(items.slice());
    for (let i = 0; i < n; i++) {
      out.push(shuffled[i % shuffled.length]);
    }

    // 苦手キーを含む問題を最大3問、先頭近くに移動
    if (weak.length) {
      const weakSet = new Set(weak);
      let inserted = 0;
      for (let i = 0; i < out.length && inserted < Math.min(3, weak.length); i++) {
        const idx = out.findIndex((q, j) => j >= i && q.romaji.split('').some((c) => weakSet.has(c)));
        if (idx > i) {
          [out[i], out[idx]] = [out[idx], out[i]];
          inserted++;
        }
      }
    }
    return out;
  }

  function normalizeItem(w, type) {
    if (type === 'home') {
      return { kana: '', romaji: typeof w === 'string' ? w : w.romaji };
    }
    return { kana: w.kana, romaji: w.romaji, pokeId: w.pokeId, slug: w.slug };
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ---- 描画 ----
  function renderQuestion() {
    const q = state.questions[state.idx];
    state.pos = 0;
    state.missThisChar = false;

    // 画像
    const imgWrap = document.getElementById('pokemon-img-wrap');
    imgWrap.classList.remove('show');
    imgWrap.innerHTML = '';
    if (q.pokeId) {
      Pokemon.getSpriteUrl(q.pokeId, q.slug).then((url) => {
        if (url && state && state.questions[state.idx] === q) {
          imgWrap.innerHTML = `<img src="${url}" alt="${q.kana}" />`;
          imgWrap.classList.add('show');
        }
      });
    }

    // かな（type=homeなら空）
    const kanaEl = document.getElementById('kana-line');
    if (q.kana) {
      kanaEl.innerHTML = '';
      for (const ch of q.kana) {
        const span = document.createElement('span');
        span.className = 'kana-char pending';
        span.textContent = ch;
        kanaEl.appendChild(span);
      }
    } else {
      kanaEl.textContent = '';
    }

    // ローマ字
    renderRomaji();
    // 次のキーをハイライト
    updateNextKey();
    // ヒントメッセージ
    updateHint();
  }

  function renderRomaji() {
    const q = state.questions[state.idx];
    const romaEl = document.getElementById('romaji-line');
    romaEl.innerHTML = '';
    for (let i = 0; i < q.romaji.length; i++) {
      const span = document.createElement('span');
      const ch = q.romaji[i];
      span.textContent = ch === ' ' ? '␣' : ch;
      if (i < state.pos) span.className = 'ro-char done';
      else if (i === state.pos) span.className = 'ro-char current';
      else span.className = 'ro-char pending';
      romaEl.appendChild(span);
    }
    // 表示モード切替
    const showRomaji = Progress.load().showRomaji;
    romaEl.classList.toggle('hidden', !showRomaji && q.kana);
  }

  function updateNextKey() {
    const q = state.questions[state.idx];
    const next = q.romaji[state.pos] || '';
    Keyboard.highlightNext(document.getElementById('keyboard'), next.toLowerCase());
  }

  function updateHint() {
    const q = state.questions[state.idx];
    const next = q.romaji[state.pos];
    const hintEl = document.getElementById('hint-text');
    if (!next) { hintEl.textContent = ''; return; }
    const finger = Keyboard.fingerOf(next);
    const fingerJa = {
      LP: 'ひだりの こゆび', LR: 'ひだりの くすりゆび', LM: 'ひだりの なかゆび', LI: 'ひだりの ひとさしゆび',
      TH: 'おやゆび',
      RI: 'みぎの ひとさしゆび', RM: 'みぎの なかゆび', RR: 'みぎの くすりゆび', RP: 'みぎの こゆび',
    };
    hintEl.textContent = `つぎは「${next.toUpperCase()}」… ${fingerJa[finger] || ''} だよ`;
  }

  // ---- キー入力 ----
  function bindKeys() {
    document.addEventListener('keydown', onKey);
  }
  function unbindKeys() {
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (!state) return;
    // バックスペースは無視（やり直しさせず、正しいキーを待つ：指位置の固定化）
    if (e.key === 'Backspace') { e.preventDefault(); return; }
    // モディファイア・機能キーは無視
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    // 1文字キー（英字・数字・記号）と半角スペースのみ処理対象
    if (e.key.length !== 1) return;

    e.preventDefault();
    const q = state.questions[state.idx];
    const expected = q.romaji[state.pos];
    const pressed = e.key.toLowerCase();

    if (expected && pressed === expected.toLowerCase()) {
      // 正解
      Keyboard.flashPressed(document.getElementById('keyboard'), pressed, true);
      if (!state.missThisChar) {
        state.correct++;
        Progress.recordKey(expected.toLowerCase(), true);
      } else {
        // ミス後の正解はカウントしない（ペナルティは既に入っている）
      }
      state.pos++;
      state.missThisChar = false;

      // かな文字の塗りを更新（おおまかな対応：ローマ字進捗 / 全長 比で塗る）
      paintKana();

      if (state.pos >= q.romaji.length) {
        // 問題完了
        state.idx++;
        if (state.idx >= state.questions.length) {
          return finish();
        }
        renderQuestion();
      } else {
        renderRomaji();
        updateNextKey();
        updateHint();
      }
    } else {
      // 不正解
      Keyboard.flashPressed(document.getElementById('keyboard'), pressed, false);
      if (!state.missThisChar) {
        state.wrong++;
        state.missThisChar = true;
        if (expected) Progress.recordKey(expected.toLowerCase(), false);
      }
      // current文字を赤くフラッシュ
      const currentSpan = document.querySelector('.ro-char.current');
      if (currentSpan) {
        currentSpan.classList.add('wrong');
        setTimeout(() => currentSpan.classList.remove('wrong'), 200);
      }
    }
    updateStatBar();
  }

  function paintKana() {
    const q = state.questions[state.idx];
    if (!q.kana) return;
    // ローマ字進捗の割合から、何文字目のかなまで塗るかを推定
    const ratio = state.pos / q.romaji.length;
    const doneCount = Math.floor(ratio * q.kana.length + 0.0001);
    const chars = document.querySelectorAll('#kana-line .kana-char');
    chars.forEach((el, i) => {
      el.classList.remove('done', 'current', 'pending');
      if (i < doneCount) el.classList.add('done');
      else if (i === doneCount) el.classList.add('current');
      else el.classList.add('pending');
    });
  }

  function updateStatBar() {
    document.getElementById('stat-correct').textContent = `○ ${state.correct}`;
    document.getElementById('stat-wrong').textContent = `× ${state.wrong}`;
  }

  function startTimer() {
    const timeEl = document.getElementById('stat-time');
    state.timerId = setInterval(() => {
      const sec = Math.floor((Date.now() - state.startTime) / 1000);
      timeEl.textContent = `⏱ ${sec}`;
    }, 500);
  }

  function finish() {
    const elapsed = (Date.now() - state.startTime) / 1000;
    const total = state.correct + state.wrong;
    const accuracy = total > 0 ? state.correct / total : 0;
    // 入力した「正しい打鍵数」を基に分速を概算（kpmだが分かりやすく"1ぷんあたり"として表示）
    const kpm = elapsed > 0 ? Math.round((state.correct / elapsed) * 60) : 0;
    const stats = {
      correct: state.correct,
      wrong: state.wrong,
      accuracy,
      wpm: kpm,
      time: Math.round(elapsed),
    };
    const stageId = state.stage.id;
    const newState = Progress.recordResult(stageId, stats);
    unbindKeys();
    if (state.timerId) clearInterval(state.timerId);
    const cb = state.onFinish;
    state = null;
    cb(stats, newState);
  }

  global.Game = { start, stop };
})(window);
