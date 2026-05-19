/**
 * main.js
 * 画面遷移とイベントハンドラのまとめ役。
 */
(function () {
  let currentStageId = 1;
  let selectedPokeIdx = 0;

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

    // === れんしゅうのリザルト ===
    document.getElementById('btn-retry').addEventListener('click', () => {
      startStage(currentStageId);
    });
    document.getElementById('btn-next').addEventListener('click', () => {
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

  document.addEventListener('DOMContentLoaded', init);
})();
