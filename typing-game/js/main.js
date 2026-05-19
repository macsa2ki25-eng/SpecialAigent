/**
 * main.js
 * 画面遷移とイベントハンドラのまとめ役。
 */
(function () {
  let currentStageId = 1;
  let selectedPokeIdx = 0;
  let resultMode = 'practice';  // 'practice' | 'drill'

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function init() {
    // === タイトル ===
    document.getElementById('btn-start').addEventListener('click', () => {
      if (window.Sound) { Sound.init(); Sound.playBgm('menu'); }
      showScreen('screen-modes');
    });

    const toggleR = document.getElementById('toggle-romaji');
    toggleR.checked = Progress.load().showRomaji;
    toggleR.addEventListener('change', (e) => Progress.setShowRomaji(e.target.checked));

    const toggleS = document.getElementById('toggle-sound');
    toggleS.checked = Progress.load().soundOn !== false;
    if (window.Sound) Sound.setMuted(!toggleS.checked);
    toggleS.addEventListener('change', (e) => {
      Progress.setSoundOn(e.target.checked);
      if (window.Sound) Sound.setMuted(!e.target.checked);
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('ほんとうに きろくを ぜんぶ けしますか？')) {
        Progress.reset();
        alert('きろくを けしました');
      }
    });

    // === モード選択 ===
    document.getElementById('mode-practice').addEventListener('click', () => {
      renderStageList();
      showScreen('screen-stages');
    });
    document.getElementById('mode-battle').addEventListener('click', () => {
      renderPokeSelect();
      showScreen('screen-poke-select');
    });
    document.getElementById('mode-timeattack').addEventListener('click', () => {
      startTimeAttack();
    });
    document.getElementById('mode-analytics').addEventListener('click', () => {
      renderAnalytics();
      showScreen('screen-analytics');
    });
    document.getElementById('btn-reset-analytics').addEventListener('click', () => {
      if (confirm('ぶんせきの きろくを ぜんぶ けしますか？')) {
        Analytics.reset();
        renderAnalytics();
      }
    });

    // === 戻るボタン ===
    document.querySelectorAll('.btn-back').forEach((btn) => {
      btn.addEventListener('click', () => {
        Game.stop();
        if (window.Battle) Battle.stop();
        if (window.TimeAttack) TimeAttack.stop();
        const dest = btn.dataset.back;
        showScreen(dest);
        if (dest === 'screen-stages') renderStageList();
        if (dest === 'screen-poke-select') renderPokeSelect();
        if (dest === 'screen-modes' && window.Sound) Sound.playBgm('menu');
        if (dest === 'screen-title' && window.Sound) Sound.stopBgm();
      });
    });

    // === れんしゅう/ドリル のリザルト ===
    document.getElementById('btn-retry').addEventListener('click', () => {
      if (resultMode === 'drill') startDrill();
      else startStage(currentStageId);
    });
    document.getElementById('btn-next').addEventListener('click', () => {
      if (resultMode === 'drill') {
        renderAnalytics();
        showScreen('screen-analytics');
        return;
      }
      const next = currentStageId + 1;
      const p = Progress.load();
      const total = Stages.TOTAL_STAGES;
      if (next <= total && p.unlockedStage >= next) startStage(next);
      else { renderStageList(); showScreen('screen-stages'); }
    });

    // === タイムアタックのリザルト ===
    document.getElementById('btn-ta-retry').addEventListener('click', () => startTimeAttack());
    document.getElementById('btn-ta-menu').addEventListener('click', () => {
      if (window.Sound) Sound.playBgm('menu');
      showScreen('screen-modes');
    });

    // === キーボードと手の初期描画 ===
    Keyboard.render(document.getElementById('keyboard'));
    Keyboard.renderHands(document.getElementById('left-hand'), document.getElementById('right-hand'));
  }

  // === ステージ一覧 ===
  function renderStageList() {
    const listEl = document.getElementById('stage-list');
    listEl.innerHTML = '';
    const p = Progress.load();
    const badgeCount = Object.values(p.badges).filter(Boolean).length;
    document.getElementById('badges-count').textContent = `バッジ ${badgeCount} / ${Stages.TOTAL_STAGES}`;

    Stages.STAGES.forEach((s) => {
      const locked = p.unlockedStage < s.id;
      const cleared = !!p.badges[s.id];
      const best = p.bestStats[s.id];
      const card = document.createElement('div');
      card.className = `stage-card ${locked ? 'locked' : ''}`;
      card.innerHTML = `
        <div class="stage-no">ステージ ${s.id}</div>
        <div class="stage-name">${s.name}</div>
        <div class="stage-desc">${s.desc}</div>
        ${cleared ? `<div class="stage-badge">${s.badge}</div>` : ''}
        ${best ? `<div class="stage-best">ベスト: ${Math.round(best.accuracy*100)}% / 1ぷん${best.wpm}</div>` : ''}
        ${locked ? '<div class="stage-best">🔒 まえのステージをクリアしよう</div>' : ''}
      `;
      if (!locked) card.addEventListener('click', () => startStage(s.id));
      listEl.appendChild(card);
    });
  }

  function startStage(id) {
    const stage = Stages.getStage(id);
    if (!stage) return;
    currentStageId = id;
    resultMode = 'practice';
    document.getElementById('game-stage-title').textContent = `ステージ${id}: ${stage.name}`;
    document.getElementById('stat-correct').textContent = '○ 0';
    document.getElementById('stat-wrong').textContent = '× 0';
    document.getElementById('stat-time').textContent = '⏱ 0';
    if (window.Sound) Sound.stopBgm();
    showScreen('screen-game');
    Game.start(stage, (stats, newState) => showResult(stage, stats, newState));
  }

  function showResult(stage, stats, newState) {
    const cleared = stats.accuracy >= stage.clearAccuracy;
    document.getElementById('result-title').textContent = cleared ? 'ステージクリア！' : 'もうすこし！';
    document.getElementById('result-badge').textContent = cleared ? stage.badge : '💪';
    document.getElementById('r-correct').textContent = stats.correct;
    document.getElementById('r-wrong').textContent = stats.wrong;
    document.getElementById('r-accuracy').textContent = `${Math.round(stats.accuracy * 100)}%`;
    document.getElementById('r-wpm').textContent = stats.wpm;

    let msg = '';
    const total = Stages.TOTAL_STAGES;
    if (cleared && stage.id < total && newState.unlockedStage > stage.id) {
      msg = `つぎの ステージ「${Stages.getStage(stage.id+1).name}」が あいたよ！`;
    } else if (cleared && stage.id === total) {
      msg = 'おめでとう！すべての ステージを クリアしたよ！🎉';
    } else if (cleared) {
      msg = 'バッジ ゲット！';
    } else {
      const weak = Progress.getWeakKeys(3);
      msg = weak.length
        ? `にがてキー: ${weak.map((k) => `<span class="weak-k">${k.toUpperCase()}</span>`).join('')} を れんしゅう しよう！`
        : 'もういちど ちょうせん！';
    }
    document.getElementById('result-msg').innerHTML = msg;

    const nextBtn = document.getElementById('btn-next');
    if (cleared && stage.id < total && newState.unlockedStage > stage.id) {
      nextBtn.textContent = 'つぎのステージへ';
    } else {
      nextBtn.textContent = 'ステージえらびへ';
    }

    showScreen('screen-result');
  }

  // === ポケモン選択 ===
  function renderPokeSelect() {
    const list = document.getElementById('poke-list');
    list.innerHTML = '';
    Battle.listPlayers().forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'poke-card';
      card.innerHTML = `
        <div class="poke-sprite" id="ps-${idx}"><div class="silhouette">?</div></div>
        <div class="poke-name">${p.name}</div>
        <div class="poke-stats">HP ${p.maxHp} / Lv ${p.level}</div>
        <div class="poke-moves">
          ${p.moves.map((m) => `<div>・${m.kana}</div>`).join('')}
        </div>
        <button class="btn-big" data-i="${idx}">これにする</button>
      `;
      list.appendChild(card);
      Pokemon.getSpriteUrl(p.id, p.slug, { back: false }).then((url) => {
        if (url) document.getElementById(`ps-${idx}`).innerHTML = `<img src="${url}" alt="" />`;
      });
      card.querySelector('button').addEventListener('click', () => {
        selectedPokeIdx = idx;
        renderTrainerSelect();
        showScreen('screen-trainer-select');
      });
    });
  }

  // === トレーナー選択 ===
  function renderTrainerSelect() {
    const list = document.getElementById('trainer-list');
    list.innerHTML = '';
    const p = Progress.load();
    Battle.listTrainers().forEach((t, idx) => {
      const won = !!p.battleWins[t.id];
      const card = document.createElement('div');
      card.className = 'trainer-card';
      card.innerHTML = `
        <div class="trainer-emoji">${t.emoji}</div>
        <div class="trainer-title">${t.title}</div>
        <div class="trainer-poke">あいぼう: ${t.pokemon.name} (Lv${t.pokemon.level})</div>
        <div class="trainer-msg">「${t.message}」</div>
        ${won ? `<div class="trainer-won">${t.reward} かったことが ある</div>` : ''}
        <button class="btn-big" data-i="${idx}">しょうぶ！</button>
      `;
      list.appendChild(card);
      card.querySelector('button').addEventListener('click', () => startBattle(selectedPokeIdx, idx));
    });
  }

  function startBattle(pIdx, tIdx) {
    showScreen('screen-battle');
    Battle.start(pIdx, tIdx, (won) => {
      // バトル終了後、トレーナー選択に戻す
      renderTrainerSelect();
      showScreen('screen-trainer-select');
      if (window.Sound) Sound.playBgm('menu');
    });
  }

  // === タイムアタック ===
  function startTimeAttack() {
    showScreen('screen-ta');
    // キーボード表示
    Keyboard.render(document.getElementById('ta-keyboard'));
    TimeAttack.start((result) => showTaResult(result));
  }

  function showTaResult(r) {
    document.getElementById('tar-score').textContent = r.score;
    document.getElementById('tar-words').textContent = r.wordsClear;
    document.getElementById('tar-correct').textContent = r.correct;
    document.getElementById('tar-miss').textContent = r.miss;
    const best = Progress.load().bestTimeAttack;
    let msg = '';
    if (best && best.score === r.score && best.wordsClear === r.wordsClear) {
      msg = '🎉 ベストきろく こうしん！';
    } else if (best) {
      msg = `ベスト: ${best.score}てん`;
    } else {
      msg = `はじめての きろく！`;
    }
    document.getElementById('tar-msg').textContent = msg;
    showScreen('screen-ta-result');
  }

  // === 苦手分析画面 ===
  function renderAnalytics() {
    const root = document.getElementById('analytics-content');
    const rep = Analytics.report(5);
    const hm = Analytics.heatmap();

    if (rep.totalAttempts < 20) {
      root.innerHTML = `
        <div class="analytics-empty">
          <p>まだ ぶんせきする データが すくないです。</p>
          <p>「れんしゅう」を 20かい ぐらい うつと、にがてが わかるよ！</p>
          <p>いままでの だかすう: <strong>${rep.totalAttempts}</strong></p>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="analytics-grid">
        <div class="ana-card">
          <h3>🔥 にがてキー TOP${rep.weakKeys.length}</h3>
          <div class="weak-key-list">
            ${rep.weakKeys.map((e, i) => `
              <div class="weak-key-item">
                <span class="rank">#${i+1}</span>
                <span class="key">${e.key.toUpperCase()}</span>
                <span class="rate">${Math.round(e.missRate*100)}%</span>
                <div class="bar"><div class="bar-fill" style="width:${Math.min(100, e.score*100)}%"></div></div>
              </div>
            `).join('') || '<p>にがてキーは ないみたい！すごい！</p>'}
          </div>
          ${rep.weakKeys.length ? `<button class="btn-big primary" id="btn-start-drill">にがてキーで れんしゅう</button>` : ''}
        </div>

        <div class="ana-card">
          <h3>🐢 おそいキー TOP${rep.slowKeys.length}</h3>
          <div class="slow-key-list">
            ${rep.slowKeys.map((e, i) => `
              <div class="slow-key-item">
                <span class="rank">#${i+1}</span>
                <span class="key">${e.key.toUpperCase()}</span>
                <span class="ms">${Math.round(e.ms)}ms</span>
              </div>
            `).join('') || '<p>みんな はやく うてているよ！</p>'}
          </div>
        </div>

        <div class="ana-card wide">
          <h3>🗝️ キーボードヒートマップ</h3>
          <p class="hint-small">あかいキーほど にがて。 あおいキーほど おそい。</p>
          <div id="heatmap"></div>
        </div>

        <div class="ana-card wide">
          <h3>🔀 まちがえやすい くみあわせ</h3>
          <div class="confusion-list">
            ${rep.confusedPairs.length === 0 ? '<p>とくに ないよ！</p>' :
              rep.confusedPairs.map((c) => `
                <div class="confusion-item">
                  <span class="key">${c.expected.toUpperCase()}</span>
                  <span class="arrow">→ おしてしまう →</span>
                  <span class="key wrong">${c.pressed.toUpperCase()}</span>
                  <span class="count">${c.count}かい</span>
                </div>
              `).join('')}
          </div>
        </div>
      </div>
    `;

    renderHeatmap(hm);
    const drillBtn = document.getElementById('btn-start-drill');
    if (drillBtn) drillBtn.addEventListener('click', startDrill);
  }

  function renderHeatmap(hm) {
    const container = document.getElementById('heatmap');
    Keyboard.render(container);
    // 各キーに着色
    container.querySelectorAll('.kb-key').forEach((el) => {
      const k = el.dataset.key;
      const stats = hm[k];
      if (!stats || stats.attempts < 3) {
        el.classList.add('heat-na');
        return;
      }
      const miss = stats.missRate;            // 0..1
      const ms = Math.min(1500, stats.avgMs); // 0..1500ms
      // 赤系=ミス、青系=遅さ、両方なら紫っぽく
      const r = Math.round(255 * miss);
      const b = Math.round(255 * (ms / 1500));
      const g = Math.round(120 * (1 - Math.max(miss, ms/1500)));
      el.style.background = `rgb(${200 + r*0.2}, ${100 + g}, ${100 + b*0.5})`;
      el.style.color = '#fff';
      el.style.fontWeight = 'bold';
      el.title = `${k}: ミス${Math.round(miss*100)}% / ${Math.round(stats.avgMs)}ms (${stats.attempts}回)`;
    });
  }

  // === にがてキーだけのドリル ===
  function startDrill() {
    const drill = Analytics.generateDrill({ count: 10 });
    if (!drill) { alert('ぶんせきデータが まだ たりません'); return; }
    const drillStage = {
      id: 'drill',
      name: `にがて (${drill.targetKeys.map((k)=>k.toUpperCase()).join(' ')})`,
      desc: '',
      type: 'kana',
      words: () => drill.items,
      questionCount: drill.items.length,
      clearAccuracy: 0.7,
      badge: '🎯',
      goal: '苦手キー',
    };
    document.getElementById('game-stage-title').textContent =
      `にがてキー れんしゅう [ ${drill.targetKeys.map((k)=>k.toUpperCase()).join(' ')} ]`;
    document.getElementById('stat-correct').textContent = '○ 0';
    document.getElementById('stat-wrong').textContent = '× 0';
    document.getElementById('stat-time').textContent = '⏱ 0';
    if (window.Sound) Sound.stopBgm();
    currentStageId = null;
    resultMode = 'drill';
    showScreen('screen-game');
    Game.start(drillStage, (stats) => {
      const ok = stats.accuracy >= 0.7;
      document.getElementById('result-title').textContent = ok ? 'にがて こくふく！' : 'もうすこし！';
      document.getElementById('result-badge').textContent = ok ? '🎯' : '💪';
      document.getElementById('r-correct').textContent = stats.correct;
      document.getElementById('r-wrong').textContent = stats.wrong;
      document.getElementById('r-accuracy').textContent = `${Math.round(stats.accuracy * 100)}%`;
      document.getElementById('r-wpm').textContent = stats.wpm;
      document.getElementById('result-msg').textContent =
        'もういちど ぶんせきして、にがてが かわったか みてみよう！';
      document.getElementById('btn-next').textContent = 'ぶんせきへ もどる';
      showScreen('screen-result');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
