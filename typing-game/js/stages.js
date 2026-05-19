/**
 * stages.js
 * ステージ定義（14段階）。
 * 合格率は段階的に緩める: 序盤85% → 後半70%。
 */
(function (global) {
  const STAGES = [
    { id:1,  name:'ホームポジション', desc:'まず、ひだりてとみぎての ゆびを ホームのキーに おこう。',
      type:'home',  words:()=>Words.HOME,            questionCount:12, clearAccuracy:0.85, badge:'🏠',
      goal:'asdfjkl; を ただしいゆびで うつ' },
    { id:2,  name:'あ行', desc:'あ・い・う・え・お を うとう。',
      type:'kana',  words:()=>Words.A,               questionCount:10, clearAccuracy:0.85, badge:'🌱', goal:'あいうえお' },
    { id:3,  name:'か行', desc:'か・き・く・け・こ を うとう。',
      type:'kana',  words:()=>Words.KA,              questionCount:10, clearAccuracy:0.85, badge:'🍀', goal:'かきくけこ' },
    { id:4,  name:'さ行', desc:'さ・し・す・せ・そ を うとう。「し」は SI。',
      type:'kana',  words:()=>Words.SA,              questionCount:10, clearAccuracy:0.85, badge:'⭐', goal:'さしすせそ' },
    { id:5,  name:'た行', desc:'た・ち・つ・て・と を うとう。「ち」は TI、「つ」は TU。',
      type:'kana',  words:()=>Words.TA,              questionCount:10, clearAccuracy:0.8,  badge:'🐢', goal:'たちつてと' },
    { id:6,  name:'な行', desc:'な・に・ぬ・ね・の を うとう。',
      type:'kana',  words:()=>Words.NA,              questionCount:10, clearAccuracy:0.8,  badge:'🐱', goal:'なにぬねの' },
    { id:7,  name:'は行', desc:'は・ひ・ふ・へ・ほ を うとう。「ふ」は HU。',
      type:'kana',  words:()=>Words.HA,              questionCount:10, clearAccuracy:0.8,  badge:'🌸', goal:'はひふへほ' },
    { id:8,  name:'ま行・や行', desc:'まみむめも、やゆよ を うとう。',
      type:'kana',  words:()=>Words.MA_YA,           questionCount:12, clearAccuracy:0.8,  badge:'🌙', goal:'ま・や' },
    { id:9,  name:'ら行・わ行・ん', desc:'らりるれろ、わ・を・ん を うとう。「ん」は NN。',
      type:'kana',  words:()=>Words.RA_WA_N,        questionCount:12, clearAccuracy:0.75, badge:'🐉', goal:'らわん' },
    { id:10, name:'だくおん', desc:'が・ざ・だ・ば の だくおん を うとう。「じ」は ZI。',
      type:'kana',  words:()=>Words.DAKUON,         questionCount:12, clearAccuracy:0.75, badge:'💧', goal:'濁音' },
    { id:11, name:'はんだくおん・ようおん', desc:'ぱ・きゃ・しゃ・ちゃ などを うとう。',
      type:'kana',  words:()=>Words.HANDAKU_YOUON,  questionCount:12, clearAccuracy:0.7,  badge:'🔥', goal:'拗音' },
    { id:12, name:'いろいろなことば', desc:'ならった ぜんぶの かなで ことばを うとう！',
      type:'word',  words:()=>Words.STAGE_WORDS,    questionCount:12, clearAccuracy:0.7,  badge:'📖', goal:'単語' },
    { id:13, name:'ポケモンずかん', desc:'ポケモンの なまえを タイピング！',
      type:'pokemon', words:()=>Words.STAGE_POKEMON, questionCount:10, clearAccuracy:0.7, badge:'⚡', goal:'ポケモン' },
    { id:14, name:'ポケモンのわざ', desc:'ながい わざの なまえに ちょうせん！',
      type:'word',  words:()=>Words.STAGE_MOVES,    questionCount:8,  clearAccuracy:0.7,  badge:'🏆', goal:'技名' },
  ];

  const TOTAL_STAGES = STAGES.length;

  function getStage(id) { return STAGES.find((s) => s.id === id); }

  global.Stages = { STAGES, TOTAL_STAGES, getStage };
})(window);
