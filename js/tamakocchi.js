// ===== たまこっち! 育成システム =====
(function() {
  'use strict';

  var STORAGE_KEY = 'tamakocchi';
  var MAX_STAT = 8;
  var HUNGER_DECAY_MS = 3 * 3600000;
  var HAPPY_DECAY_MS = 4 * 3600000;
  var CARE_MISS_THRESHOLD_MS = 3600000;
  var DEATH_CARE_MISSES = 10;
  var FEED_EVERY_N = 12;

  var STAGE_DURATION = [
    0,
    8 * 3600000,
    16 * 3600000,
    24 * 3600000,
    Infinity
  ];

  var CHARACTERS = {
    egg:          { stage: 0, name: 'まこたま',       desc: 'なにかが生まれそう…' },
    makocchi:     { stage: 1, name: 'まこっち',       desc: '生まれたてのまこっち！' },
    makorin:      { stage: 2, name: 'まこりん',       desc: 'にこにこ元気いっぱい！' },
    makoguu:      { stage: 2, name: 'まこぐー',       desc: 'ちょっとふきげん…' },
    makopika:     { stage: 3, name: 'まこぴか',       desc: 'キラキラ輝いてる！' },
    makosuke:     { stage: 3, name: 'まこすけ',       desc: 'まじめにコツコツ！' },
    makodara:     { stage: 3, name: 'まこだら',       desc: 'のんびりマイペース…' },
    makomaster:   { stage: 4, name: 'まこマスター',   desc: '英単語の達人！', rank: 'S' },
    makostar:     { stage: 4, name: 'まこスター',     desc: 'みんなの人気者！', rank: 'A' },
    makofriend:   { stage: 4, name: 'まこフレンド',   desc: 'やさしい友だち',   rank: 'B' },
    makosleeper:  { stage: 4, name: 'まこスリーパー', desc: 'いつもねむそう…',   rank: 'C' },
    makoghost:    { stage: 4, name: 'まこゴースト',   desc: 'うらめしや〜',     rank: 'D' }
  };

  var STAGE_NAMES = ['たまご', 'ベビー', 'こども', 'ティーン', 'おとな'];

  function evolveFrom(charId, state) {
    var acc = state.totalStudied > 0 ? state.totalCorrect / state.totalStudied : 0;
    var m = state.stageCareMistakes;
    switch (charId) {
      case 'makocchi':
        return m <= 2 ? 'makorin' : 'makoguu';
      case 'makorin':
        return m <= 2 ? 'makopika' : 'makosuke';
      case 'makoguu':
        return m <= 2 ? 'makosuke' : 'makodara';
      case 'makopika':
        return (m <= 2 && acc >= 0.82) ? 'makomaster' : 'makostar';
      case 'makosuke':
        return m <= 2 ? 'makofriend' : 'makosleeper';
      case 'makodara':
        return m <= 2 ? 'makosleeper' : 'makoghost';
      default:
        return null;
    }
  }

  function defaultState() {
    return {
      stage: -1,
      charId: null,
      birthTime: null,
      stageStartTime: null,
      hunger: MAX_STAT,
      happiness: MAX_STAT,
      discipline: 0,
      lastDecayTime: null,
      careMistakes: 0,
      stageCareMistakes: 0,
      totalStudied: 0,
      totalCorrect: 0,
      isDead: false,
      generation: 0,
      hungerEmptyTime: null,
      happyEmptyTime: null,
      collection: [],
      lastPlayTime: null,
      evolvedNotice: null,
      lastLoginDate: null
    };
  }

  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (d) {
        var def = defaultState();
        for (var k in def) { if (!(k in d)) d[k] = def[k]; }
        return d;
      }
    } catch(e) {}
    return defaultState();
  }

  function save(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  function startNewPet() {
    var s = load();
    var gen = s.generation + 1;
    var col = s.collection || [];
    s = defaultState();
    s.stage = 0;
    s.charId = 'egg';
    s.birthTime = Date.now();
    s.stageStartTime = Date.now();
    s.lastDecayTime = Date.now();
    s.generation = gen;
    s.collection = col;
    save(s);
    return s;
  }

  function hatchEgg(s) {
    if (s.stage !== 0) return s;
    s.stage = 1;
    s.charId = 'makocchi';
    s.stageStartTime = Date.now();
    s.hunger = MAX_STAT;
    s.happiness = MAX_STAT;
    s.evolvedNotice = 'makocchi';
    save(s);
    return s;
  }

  function checkEvolution(s) {
    if (s.stage >= 4 || s.stage < 1 || s.isDead) return s;
    var elapsed = Date.now() - s.stageStartTime;
    if (elapsed < STAGE_DURATION[s.stage]) return s;
    var next = evolveFrom(s.charId, s);
    if (!next) return s;
    var ch = CHARACTERS[next];
    s.charId = next;
    s.stage = ch.stage;
    s.stageStartTime = Date.now();
    s.stageCareMistakes = 0;
    s.evolvedNotice = next;
    if (s.stage === 4 && s.collection.indexOf(next) === -1) {
      s.collection.push(next);
    }
    return s;
  }

  function tickDecay(s) {
    if (s.stage < 1 || s.isDead) return s;
    var now = Date.now();
    var elapsed = now - (s.lastDecayTime || now);

    var hungerLost = Math.floor(elapsed / HUNGER_DECAY_MS);
    var happyLost = Math.floor(elapsed / HAPPY_DECAY_MS);
    if (hungerLost > 0 || happyLost > 0) {
      s.hunger = Math.max(0, s.hunger - hungerLost * 2);
      s.happiness = Math.max(0, s.happiness - happyLost * 2);
      s.lastDecayTime = now;
    }

    if (s.hunger === 0) {
      if (!s.hungerEmptyTime) {
        s.hungerEmptyTime = now;
      } else if (now - s.hungerEmptyTime >= CARE_MISS_THRESHOLD_MS) {
        s.careMistakes++;
        s.stageCareMistakes++;
        s.hungerEmptyTime = now;
      }
    } else {
      s.hungerEmptyTime = null;
    }

    if (s.happiness === 0) {
      if (!s.happyEmptyTime) {
        s.happyEmptyTime = now;
      } else if (now - s.happyEmptyTime >= CARE_MISS_THRESHOLD_MS) {
        s.careMistakes++;
        s.stageCareMistakes++;
        s.happyEmptyTime = now;
      }
    } else {
      s.happyEmptyTime = null;
    }

    if (s.careMistakes >= DEATH_CARE_MISSES) {
      s.isDead = true;
    }

    s = checkEvolution(s);
    save(s);
    return s;
  }

  function onStudyQuestion(isCorrect) {
    var s = load();
    if (s.stage < 0 || s.isDead) return null;
    if (s.stage === 0) s = hatchEgg(s);
    s.totalStudied++;
    if (isCorrect) s.totalCorrect++;
    if (s.totalStudied % FEED_EVERY_N === 0) {
      s.hunger = Math.min(MAX_STAT, s.hunger + 1);
    }
    s = tickDecay(s);
    save(s);
    return s;
  }

  function onPlayGame(correct, total) {
    var s = load();
    if (s.stage < 1 || s.isDead) return s;
    if (correct >= 4) {
      s.happiness = Math.min(MAX_STAT, s.happiness + 1);
    } else {
      s.happiness = Math.max(0, s.happiness - 1);
    }
    s.totalStudied += total;
    s.totalCorrect += correct;
    s.lastPlayTime = Date.now();
    s = tickDecay(s);
    save(s);
    return s;
  }

  function feedPet() {
    var s = load();
    if (s.stage < 1 || s.isDead) return { ok: false, msg: 'ペットがいません' };
    if (s.hunger >= MAX_STAT) return { ok: false, msg: 'おなかいっぱいだよ！' };
    s.hunger = Math.min(MAX_STAT, s.hunger + 1);
    s = tickDecay(s);
    save(s);
    return { ok: true, msg: 'ごはんをあげた！', state: s };
  }

  function clearEvolvedNotice() {
    var s = load();
    s.evolvedNotice = null;
    save(s);
  }

  function checkLoginDiscipline(s) {
    if (s.stage < 1 || s.isDead) return s;
    var today = new Date().toISOString().slice(0, 10);
    if (s.lastLoginDate === today) return s;
    var diff = 0;
    if (s.lastLoginDate) {
      diff = Math.round((new Date(today) - new Date(s.lastLoginDate)) / 86400000);
    }
    if (diff === 1 || !s.lastLoginDate) {
      s.discipline = Math.min(MAX_STAT, s.discipline + 1);
    } else if (diff >= 2) {
      var penalty = 2 + Math.max(0, diff - 2);
      s.discipline = Math.max(0, s.discipline - penalty);
    }
    s.lastLoginDate = today;
    save(s);
    return s;
  }

  function getState() {
    var s = load();
    if (s.stage >= 1) {
      s = checkLoginDiscipline(s);
      s = tickDecay(s);
    }
    return s;
  }

  function getCharInfo(id) {
    return CHARACTERS[id] || null;
  }

  function getAge(s) {
    if (!s.birthTime) return '';
    var ms = Date.now() - s.birthTime;
    var h = Math.floor(ms / 3600000);
    if (h < 24) return h + '時間';
    var d = Math.floor(h / 24);
    return d + '日' + (h % 24) + '時間';
  }

  function getEvolutionProgress(s) {
    if (s.stage < 1 || s.stage >= 4) return null;
    var elapsed = Date.now() - s.stageStartTime;
    return Math.min(1, elapsed / STAGE_DURATION[s.stage]);
  }

  function hasPet() {
    var s = load();
    return s.stage >= 0;
  }

  window.Tamakocchi = {
    getState: getState,
    startNewPet: startNewPet,
    onStudyQuestion: onStudyQuestion,
    onPlayGame: onPlayGame,
    feedPet: feedPet,
    getCharInfo: getCharInfo,
    getAge: getAge,
    getEvolutionProgress: getEvolutionProgress,
    clearEvolvedNotice: clearEvolvedNotice,
    hasPet: hasPet,
    CHARACTERS: CHARACTERS,
    STAGE_NAMES: STAGE_NAMES,
    MAX_STAT: MAX_STAT
  };
})();
