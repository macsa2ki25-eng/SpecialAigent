/**
 * battle.js
 * ポケモン赤緑風のバトルモード。
 *
 * フロー:
 *   選択画面 → トレーナー選択 → バトル画面
 *   バトル中: 技選択 → タイプ入力 → ダメージ計算 → 相手の番 → ...
 *
 * ダメージ計算:
 *   damage = max(1, technique.power_base + length_bonus - miss_count * MISS_PENALTY)
 *   length_bonus = romaji.length * 2
 *   MISS_PENALTY = 3
 */
(function (global) {

  // === 自分が選べるポケモン ===
  const PLAYER_POKEMONS = [
    {
      id: 25, slug: 'pikachu', name: 'ピカチュウ', level: 12, maxHp: 70,
      moves: [
        { kana:'でんきショック',   romaji:'dennkisyokku',  power: 10 },
        { kana:'たいあたり',       romaji:'taiatari',      power: 5 },
        { kana:'10まんボルト',     romaji:'10mannboruto',  power: 18 },
      ],
    },
    {
      id: 1, slug: 'bulbasaur', name: 'フシギダネ', level: 12, maxHp: 80,
      moves: [
        { kana:'たいあたり',       romaji:'taiatari',      power: 5 },
        { kana:'つるのムチ',       romaji:'turunomuti',    power: 10 },
        { kana:'はっぱカッター',   romaji:'happakatta-',   power: 16 },
      ],
    },
    {
      id: 4, slug: 'charmander', name: 'ヒトカゲ', level: 12, maxHp: 70,
      moves: [
        { kana:'ひっかく',         romaji:'hikkaku',       power: 5 },
        { kana:'ひのこ',           romaji:'hinoko',        power: 9 },
        { kana:'かえんほうしゃ',   romaji:'kaennhousya',   power: 17 },
      ],
    },
    {
      id: 7, slug: 'squirtle', name: 'ゼニガメ', level: 12, maxHp: 80,
      moves: [
        { kana:'たいあたり',       romaji:'taiatari',      power: 5 },
        { kana:'みずでっぽう',     romaji:'mizudeppou',    power: 10 },
        { kana:'なみのり',         romaji:'naminori',      power: 16 },
      ],
    },
  ];

  // === 相手トレーナー ===
  const TRAINERS = [
    {
      id: 'mushitori',
      title: 'むしとりしょうねん',
      emoji: '🧒',
      message: 'むしを たくさん つかまえたぞ！',
      pokemon: {
        id: 10, slug: 'caterpie', name:'キャタピー', level: 6, maxHp: 35,
        moves: [
          { kana:'たいあたり', romaji:'taiatari', power: 4 },
          { kana:'いとをはく', romaji:'itowohaku', power: 2 },
        ],
      },
      reward: '🥉',
    },
    {
      id: 'tanpan',
      title: 'たんぱんこぞう',
      emoji: '👦',
      message: 'おれの ポケモンは つよいぞ！',
      pokemon: {
        id: 58, slug: 'growlithe', name:'ガーディ', level: 12, maxHp: 65,
        moves: [
          { kana:'たいあたり', romaji:'taiatari', power: 6 },
          { kana:'ひのこ',     romaji:'hinoko',   power: 9 },
        ],
      },
      reward: '🥈',
    },
    {
      id: 'nanjamo',
      title: 'ジムリーダー ナンジャモ',
      emoji: '⚡',
      message: 'ハロハロ〜！じょうきょうチェックは ばっちりだよ！',
      pokemon: {
        id: 962, slug: 'pawmot', name:'パーモット', level: 20, maxHp: 130,
        moves: [
          { kana:'でんきショック',   romaji:'dennkisyokku', power: 8 },
          { kana:'かみなりパンチ',   romaji:'kaminaripannti', power: 14 },
          { kana:'でんこうせっか',   romaji:'dennkousekka',  power: 12 },
        ],
      },
      reward: '🏆',
    },
  ];

  // === バトル状態 ===
  let state = null;

  function listPlayers() { return PLAYER_POKEMONS; }
  function listTrainers() { return TRAINERS; }

  function start(playerIdx, trainerIdx, onEnd) {
    const player = JSON.parse(JSON.stringify(PLAYER_POKEMONS[playerIdx]));
    const trainer = JSON.parse(JSON.stringify(TRAINERS[trainerIdx]));
    state = {
      player,
      trainer,
      playerHp: player.maxHp,
      enemyHp: trainer.pokemon.maxHp,
      turn: 'player',   // 'player' | 'enemy' | 'over'
      message: '',
      onEnd,
      typingState: null, // 技タイプ中の状態
    };
    renderBattleScreen();
    setMessage(`あいての ${trainer.title}が しょうぶを しかけてきた！`);
    if (window.Sound) Sound.playBgm('battle');
    setTimeout(() => {
      setMessage(`${trainer.title}は ${trainer.pokemon.name}を くりだした！`);
      setTimeout(() => {
        setMessage(`いけっ！${player.name}！`);
        setTimeout(() => showMoveMenu(), 1200);
      }, 1500);
    }, 1500);
  }

  function stop() {
    unbindKeys();
    if (window.Sound) Sound.stopBgm();
    state = null;
  }

  // === 画面描画 ===
  function renderBattleScreen() {
    const root = document.getElementById('battle-content');
    root.innerHTML = `
      <div class="battle-field">
        <div class="enemy-info">
          <div class="info-card enemy">
            <div class="poke-name">${state.trainer.pokemon.name} <span class="poke-lv">:L${state.trainer.pokemon.level}</span></div>
            <div class="hp-bar-wrap"><span class="hp-label">HP</span><div class="hp-bar"><div class="hp-fill" id="enemy-hp"></div></div></div>
          </div>
        </div>
        <div class="enemy-sprite" id="enemy-sprite"></div>

        <div class="player-sprite" id="player-sprite"></div>
        <div class="player-info">
          <div class="info-card player">
            <div class="poke-name">${state.player.name} <span class="poke-lv">:L${state.player.level}</span></div>
            <div class="hp-bar-wrap"><span class="hp-label">HP</span><div class="hp-bar"><div class="hp-fill" id="player-hp"></div></div>
            <div class="hp-num" id="player-hp-num">${state.playerHp}/ ${state.player.maxHp}</div></div>
          </div>
        </div>
      </div>

      <div class="battle-bottom">
        <div class="msg-box" id="msg-box"></div>
        <div class="action-box" id="action-box"></div>
      </div>
    `;
    updateHpBars();
    // スプライト読み込み
    Pokemon.getSpriteUrl(state.trainer.pokemon.id, state.trainer.pokemon.slug, { back: false }).then((url) => {
      if (url) document.getElementById('enemy-sprite').innerHTML = `<img src="${url}" alt="" />`;
      else document.getElementById('enemy-sprite').innerHTML = `<div class="silhouette">?</div>`;
    });
    Pokemon.getSpriteUrl(state.player.id, state.player.slug, { back: true }).then((url) => {
      if (url) document.getElementById('player-sprite').innerHTML = `<img src="${url}" alt="" />`;
      else document.getElementById('player-sprite').innerHTML = `<div class="silhouette">?</div>`;
    });
  }

  function setMessage(msg) {
    if (!state) return;
    state.message = msg;
    const box = document.getElementById('msg-box');
    if (box) box.textContent = msg;
  }

  function updateHpBars() {
    if (!state) return;
    const eRatio = Math.max(0, state.enemyHp / state.trainer.pokemon.maxHp);
    const pRatio = Math.max(0, state.playerHp / state.player.maxHp);
    const eBar = document.getElementById('enemy-hp');
    const pBar = document.getElementById('player-hp');
    if (eBar) { eBar.style.width = (eRatio * 100) + '%'; eBar.className = 'hp-fill ' + hpColor(eRatio); }
    if (pBar) { pBar.style.width = (pRatio * 100) + '%'; pBar.className = 'hp-fill ' + hpColor(pRatio); }
    const pNum = document.getElementById('player-hp-num');
    if (pNum) pNum.textContent = `${Math.max(0, state.playerHp)}/ ${state.player.maxHp}`;
  }

  function hpColor(ratio) {
    if (ratio > 0.5) return 'hp-green';
    if (ratio > 0.2) return 'hp-yellow';
    return 'hp-red';
  }

  // === 技選択メニュー ===
  function showMoveMenu() {
    if (state.turn !== 'player') return;
    const box = document.getElementById('action-box');
    setMessage('どの わざを つかう？');
    box.innerHTML = state.player.moves.map((m, i) => `
      <button class="move-btn" data-i="${i}">
        <div class="move-name">${m.kana}</div>
        <div class="move-power">いりょく ${m.power}</div>
      </button>
    `).join('');
    box.querySelectorAll('.move-btn').forEach((btn) => {
      btn.addEventListener('click', () => selectMove(parseInt(btn.dataset.i, 10)));
    });
  }

  // === 技を選んだあとのタイピング画面 ===
  function selectMove(idx) {
    const move = state.player.moves[idx];
    state.typingState = {
      move,
      pos: 0,
      misses: 0,
      missThisChar: false,
    };
    setMessage(`${state.player.name}の ${move.kana}！`);
    const box = document.getElementById('action-box');
    box.innerHTML = `
      <div class="typing-zone">
        <div class="typing-kana" id="t-kana"></div>
        <div class="typing-romaji" id="t-romaji"></div>
        <div class="typing-miss" id="t-miss">ミス: 0</div>
        <div class="keyboard small-kb" id="battle-kb"></div>
      </div>
    `;
    Keyboard.render(document.getElementById('battle-kb'));
    paintTyping();
    bindKeys();
  }

  function paintTyping() {
    const t = state.typingState;
    const kanaEl = document.getElementById('t-kana');
    const romaEl = document.getElementById('t-romaji');
    kanaEl.textContent = t.move.kana;
    romaEl.innerHTML = '';
    for (let i = 0; i < t.move.romaji.length; i++) {
      const ch = t.move.romaji[i];
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '␣' : ch;
      if (i < t.pos) span.className = 'rch done';
      else if (i === t.pos) span.className = 'rch current';
      else span.className = 'rch pending';
      romaEl.appendChild(span);
    }
    document.getElementById('t-miss').textContent = `ミス: ${t.misses}`;
    const kb = document.getElementById('battle-kb');
    if (kb) Keyboard.highlightNext(kb, (t.move.romaji[t.pos] || '').toLowerCase());
  }

  // === 入力処理 ===
  function bindKeys() { document.addEventListener('keydown', onKey); }
  function unbindKeys() { document.removeEventListener('keydown', onKey); }

  function onKey(e) {
    if (!state || !state.typingState) return;
    if (e.key === 'Backspace') { e.preventDefault(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    e.preventDefault();

    const t = state.typingState;
    const expected = t.move.romaji[t.pos];
    const pressed = e.key.toLowerCase();
    if (pressed === expected.toLowerCase()) {
      if (window.Sound) Sound.playKey(Keyboard.fingerOf(expected));
      t.pos++;
      t.missThisChar = false;
      if (t.pos >= t.move.romaji.length) {
        // 入力完了 → 攻撃
        unbindKeys();
        executeAttack();
      } else {
        paintTyping();
      }
    } else {
      if (window.Sound) Sound.playMiss();
      if (!t.missThisChar) {
        t.misses++;
        t.missThisChar = true;
      }
      paintTyping();
      const span = document.querySelector('#t-romaji .rch.current');
      if (span) {
        span.classList.add('wrong');
        setTimeout(() => span.classList.remove('wrong'), 200);
      }
    }
  }

  function executeAttack() {
    if (!state || !state.typingState) return;
    const t = state.typingState;
    const lenBonus = t.move.romaji.length * 2;
    const damage = Math.max(1, t.move.power + lenBonus - t.misses * 3);
    state.typingState = null;
    if (window.Sound) Sound.playAttack();
    setMessage(`こうかは ばつぐんだ！  ${damage}ダメージ！`);
    document.getElementById('enemy-sprite').classList.add('hit');
    setTimeout(() => document.getElementById('enemy-sprite').classList.remove('hit'), 400);

    animateHpChange('enemy', damage, () => {
      if (state.enemyHp <= 0) {
        state.enemyHp = 0;
        updateHpBars();
        if (window.Sound) Sound.playFaint();
        setMessage(`あいての ${state.trainer.pokemon.name}は たおれた！`);
        setTimeout(() => endBattle(true), 1500);
      } else {
        setTimeout(() => enemyTurn(), 1000);
      }
    });
  }

  function animateHpChange(target, damage, done) {
    if (!state) return;
    const startHp = target === 'enemy' ? state.enemyHp : state.playerHp;
    const endHp = Math.max(0, startHp - damage);
    const dur = 600;
    const t0 = performance.now();
    function step(t) {
      if (!state) return;
      const r = Math.min(1, (t - t0) / dur);
      const cur = startHp + (endHp - startHp) * r;
      if (target === 'enemy') state.enemyHp = cur;
      else state.playerHp = cur;
      updateHpBars();
      if (r < 1) requestAnimationFrame(step);
      else {
        if (!state) return;
        if (target === 'enemy') state.enemyHp = endHp;
        else state.playerHp = endHp;
        updateHpBars();
        if (done) done();
      }
    }
    requestAnimationFrame(step);
  }

  // === 相手のターン ===
  function enemyTurn() {
    if (!state || state.turn === 'over') return;
    state.turn = 'enemy';
    const moves = state.trainer.pokemon.moves;
    const move = moves[Math.floor(Math.random() * moves.length)];
    setMessage(`あいての ${state.trainer.pokemon.name}の ${move.kana}！`);
    setTimeout(() => {
      const base = move.power + state.trainer.pokemon.level * 0.6;
      const variance = (Math.random() * 0.4) + 0.8;
      const damage = Math.max(1, Math.round(base * variance));
      if (window.Sound) Sound.playDamage();
      document.getElementById('player-sprite').classList.add('hit');
      setTimeout(() => document.getElementById('player-sprite').classList.remove('hit'), 400);
      setMessage(`${state.player.name}は ${damage}の ダメージを うけた！`);
      animateHpChange('player', damage, () => {
        if (state.playerHp <= 0) {
          state.playerHp = 0;
          updateHpBars();
          if (window.Sound) Sound.playFaint();
          setMessage(`${state.player.name}は たおれた…`);
          setTimeout(() => endBattle(false), 1500);
        } else {
          state.turn = 'player';
          setTimeout(() => showMoveMenu(), 1000);
        }
      });
    }, 1200);
  }

  // === バトル終了 ===
  function endBattle(won) {
    if (!state) return;
    state.turn = 'over';
    unbindKeys();
    if (won) {
      if (window.Sound) Sound.playVictory();
      Progress.recordBattleWin(state.trainer.id);
      setMessage(`やった！${state.trainer.title}に かった！  バッジ ${state.trainer.reward} を てにいれた！`);
    } else {
      if (window.Sound) Sound.playFail();
      setMessage(`あいての ${state.trainer.title}に まけてしまった…`);
    }
    const box = document.getElementById('action-box');
    box.innerHTML = `<button class="move-btn end-btn" id="btn-end-battle">${won ? 'やったね！' : 'もういちど'}</button>`;
    document.getElementById('btn-end-battle').addEventListener('click', () => {
      const cb = state.onEnd; const w = won;
      stop();
      cb(w);
    });
  }

  global.Battle = { start, stop, listPlayers, listTrainers };
})(window);
