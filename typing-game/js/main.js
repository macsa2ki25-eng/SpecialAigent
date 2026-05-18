/**
 * main.js
 * 画面遷移とイベントハンドラのまとめ役。
 */
(function () {
  let currentStageId = 1;

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function init() {
    // タイトル
    document.getElementById('btn-start').addEventListener('click', () => {
      renderStageList();
      showScreen('screen-stages');
    });

    const toggle = document.getElementById('toggle-romaji');
    toggle.checked = Progress.load().showRomaji;
    toggle.addEventListener('change', (e) => Progress.setShowRomaji(e.target.checked));

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('ほんとうに きろくを ぜんぶ けしますか？')) {
        Progress.reset();
        alert('きろくを けしました');
      }
    });

    // 戻るボタン
    document.querySelectorAll('.btn-back').forEach((btn) => {
      btn.addEventListener('click', () => {
        Game.stop();
        showScreen(btn.dataset.back);
        if (btn.dataset.back === 'screen-stages') renderStageList();
      });
    });

    // リザルト
    document.getElementById('btn-retry').addEventListener('click', () => {
      startStage(currentStageId);
    });
    document.getElementById('btn-next').addEventListener('click', () => {
      const next = currentStageId + 1;
      const p = Progress.load();
      if (next <= 7 && p.unlockedStage >= next) {
        startStage(next);
      } else {
        renderStageList();
        showScreen('screen-stages');
      }
    });

    // キーボードと手を初期描画
    Keyboard.render(document.getElementById('keyboard'));
    Keyboard.renderHands(
      document.getElementById('left-hand'),
      document.getElementById('right-hand'),
    );
  }

  function renderStageList() {
    const listEl = document.getElementById('stage-list');
    listEl.innerHTML = '';
    const p = Progress.load();
    const badgeCount = Object.values(p.badges).filter(Boolean).length;
    document.getElementById('badges-count').textContent = `バッジ ${badgeCount} / 7`;

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
        ${best ? `<div class="stage-best">ベスト: せいかいりつ ${Math.round(best.accuracy*100)}% / 1ぷん ${best.wpm}</div>` : ''}
        ${locked ? '<div class="stage-best">🔒 まえの ステージを クリアしよう</div>' : ''}
      `;
      if (!locked) {
        card.addEventListener('click', () => startStage(s.id));
      }
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
    if (cleared && stage.id < 7 && newState.unlockedStage > stage.id) {
      msg = `つぎの ステージ「${Stages.getStage(stage.id+1).name}」が あいたよ！`;
    } else if (cleared && stage.id === 7) {
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

    // 次へボタンの表示制御
    const nextBtn = document.getElementById('btn-next');
    if (cleared && stage.id < 7 && newState.unlockedStage > stage.id) {
      nextBtn.style.display = '';
      nextBtn.textContent = 'つぎのステージへ';
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent = 'ステージえらびへ';
    }

    showScreen('screen-result');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
