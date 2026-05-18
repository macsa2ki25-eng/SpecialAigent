/**
 * stages.js
 * ステージ定義。各ステージは出題リストと合格基準を持つ。
 * 進行: clearAccuracy 以上 かつ minCorrect問正解 でクリア → 次ステージ解放。
 */
(function (global) {
  const STAGES = [
    {
      id: 1,
      name: 'ホームポジション',
      desc: 'まず、ひだりてとみぎての ゆびを ホームポジションに おいてみよう。',
      type: 'home',        // 単一キー連打。kana表示なし、romajiのみ表示
      words: () => Words.HOME,
      questionCount: 12,
      clearAccuracy: 0.85,
      badge: '🏠',
      goal: 'ホームのキー(asdfjkl;)を、ただしいゆびで うてる ようになる',
    },
    {
      id: 2,
      name: 'あ行',
      desc: 'あ・い・う・え・お を うってみよう。',
      type: 'kana',
      words: () => Words.A,
      questionCount: 10,
      clearAccuracy: 0.85,
      badge: '🌱',
      goal: 'あ・い・う・え・お を おぼえる',
    },
    {
      id: 3,
      name: 'か行',
      desc: 'か・き・く・け・こ を うってみよう。',
      type: 'kana',
      words: () => Words.KA,
      questionCount: 10,
      clearAccuracy: 0.85,
      badge: '🍀',
      goal: 'か・き・く・け・こ を おぼえる',
    },
    {
      id: 4,
      name: 'さ行',
      desc: 'さ・し・す・せ・そ を うってみよう。',
      type: 'kana',
      words: () => Words.SA,
      questionCount: 10,
      clearAccuracy: 0.85,
      badge: '⭐',
      goal: 'さ・し・す・せ・そ を おぼえる',
    },
    {
      id: 5,
      name: 'あ〜さ行のことば',
      desc: '「きかい」「あさ」「おかし」など、ならった ことばを うとう！',
      type: 'word',
      words: () => Words.STAGE5,
      questionCount: 12,
      clearAccuracy: 0.8,
      badge: '📖',
      goal: 'ならった ひらがなで ことばを うつ',
    },
    {
      id: 6,
      name: 'ポケモンずかん',
      desc: 'ポケモンの なまえを タイピング！ えも でるよ。',
      type: 'pokemon',
      words: () => Words.STAGE6,
      questionCount: 10,
      clearAccuracy: 0.7,
      badge: '⚡',
      goal: 'いろいろな ポケモンの なまえを うてる',
    },
    {
      id: 7,
      name: 'ポケモンのわざ',
      desc: 'ながい わざの なまえに ちょうせん！マスターへの みち。',
      type: 'word',
      words: () => Words.STAGE7,
      questionCount: 8,
      clearAccuracy: 0.7,
      badge: '🏆',
      goal: 'ながい ことばも さいごまで うてる',
    },
  ];

  function getStage(id) {
    return STAGES.find((s) => s.id === id);
  }

  global.Stages = { STAGES, getStage };
})(window);
