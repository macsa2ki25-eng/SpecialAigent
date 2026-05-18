/**
 * words.js
 * 各ステージの出題データ。
 * 形式: { kana: '...', romaji: '...', pokeId?: 25, slug?: 'pikachu' }
 *
 * ローマ字表記の方針：
 *   - ヘボン式（shi, chi, tsu, fu, ji, sha/sho/shu, cha/cho/chu, ja/jo/ju）
 *   - 「ー」はそのまま「-」、「っ」は次の子音を重ねる、「ん」は「n」（次が母音/yの時のみnn）
 *   - 画面表示=入力するキーの完全一致（学習者が混乱しないため、複数許容しない）
 */
(function (global) {

  // --- ステージ1: ホームポジション（asdfjkl;） ---
  // type:'home' は文字列のリスト（ひらがな表示なし、ローマ字のみ）
  const HOME = [
    'f','j','f','j','d','k','d','k','s','l','s','l','a',';','a',';',
    'fj','jf','dk','kd','sl','ls','a;',';a',
    'fjdk','sla;','asdf','jkl;','fdsa',';lkj',
    'asdfjkl;', 'jkl;asdf',
  ];

  // --- ステージ2: あ行 ---
  const A = [
    { kana:'あ', romaji:'a' },
    { kana:'い', romaji:'i' },
    { kana:'う', romaji:'u' },
    { kana:'え', romaji:'e' },
    { kana:'お', romaji:'o' },
    { kana:'あい', romaji:'ai' },
    { kana:'うえ', romaji:'ue' },
    { kana:'おい', romaji:'oi' },
    { kana:'あう', romaji:'au' },
    { kana:'いえ', romaji:'ie' },
    { kana:'あおい', romaji:'aoi' },
    { kana:'うえお', romaji:'ueo' },
  ];

  // --- ステージ3: か行 ---
  const KA = [
    { kana:'か', romaji:'ka' },
    { kana:'き', romaji:'ki' },
    { kana:'く', romaji:'ku' },
    { kana:'け', romaji:'ke' },
    { kana:'こ', romaji:'ko' },
    { kana:'かき', romaji:'kaki' },
    { kana:'くき', romaji:'kuki' },
    { kana:'こけ', romaji:'koke' },
    { kana:'いか', romaji:'ika' },
    { kana:'えき', romaji:'eki' },
    { kana:'あき', romaji:'aki' },
    { kana:'いけ', romaji:'ike' },
    { kana:'きおく', romaji:'kioku' },
    { kana:'かいこ', romaji:'kaiko' },
  ];

  // --- ステージ4: さ行（ヘボン式: shi）---
  const SA = [
    { kana:'さ', romaji:'sa' },
    { kana:'し', romaji:'shi' },
    { kana:'す', romaji:'su' },
    { kana:'せ', romaji:'se' },
    { kana:'そ', romaji:'so' },
    { kana:'さけ', romaji:'sake' },
    { kana:'すし', romaji:'sushi' },
    { kana:'せき', romaji:'seki' },
    { kana:'いす', romaji:'isu' },
    { kana:'うし', romaji:'ushi' },
    { kana:'あさ', romaji:'asa' },
    { kana:'おそい', romaji:'osoi' },
    { kana:'おかし', romaji:'okashi' },
  ];

  // --- ステージ5: あ〜さ行の単語 ---
  const STAGE5_WORDS = [
    { kana:'きかい', romaji:'kikai' },
    { kana:'いか', romaji:'ika' },
    { kana:'あさ', romaji:'asa' },
    { kana:'かさ', romaji:'kasa' },
    { kana:'おかし', romaji:'okashi' },
    { kana:'こけし', romaji:'kokeshi' },
    { kana:'すいか', romaji:'suika' },
    { kana:'あおい', romaji:'aoi' },
    { kana:'おおきい', romaji:'ookii' },
    { kana:'かいすい', romaji:'kaisui' },
    { kana:'せかい', romaji:'sekai' },
    { kana:'きせき', romaji:'kiseki' },
    { kana:'すこし', romaji:'sukoshi' },
    { kana:'おさけ', romaji:'osake' },
    { kana:'こうこく', romaji:'koukoku' },
    { kana:'いす', romaji:'isu' },
    { kana:'うし', romaji:'ushi' },
    { kana:'けいかく', romaji:'keikaku' },
  ];

  // --- ステージ6: ポケモン名（ヘボン式）---
  // 画像は PokeAPI から取得、フォールバックで images/pokemon/<slug>.png
  const STAGE6_POKEMON = [
    { kana:'ピカチュウ',   romaji:'pikachuu',  pokeId:25,  slug:'pikachu' },
    { kana:'カビゴン',     romaji:'kabigon',   pokeId:143, slug:'snorlax' },
    { kana:'ヒトカゲ',     romaji:'hitokage',  pokeId:4,   slug:'charmander' },
    { kana:'ゼニガメ',     romaji:'zenigame',  pokeId:7,   slug:'squirtle' },
    { kana:'フシギダネ',   romaji:'fushigidane', pokeId:1, slug:'bulbasaur' },
    { kana:'コダック',     romaji:'kodakku',   pokeId:54,  slug:'psyduck' },
    { kana:'イーブイ',     romaji:'i-bui',     pokeId:133, slug:'eevee' },
    { kana:'ニャース',     romaji:'nya-su',    pokeId:52,  slug:'meowth' },
    { kana:'ポッチャマ',   romaji:'potchama',  pokeId:393, slug:'piplup' },
    { kana:'ミミッキュ',   romaji:'mimikkyu',  pokeId:778, slug:'mimikyu' },
    { kana:'ゲンガー',     romaji:'genga-',    pokeId:94,  slug:'gengar' },
    { kana:'リザードン',   romaji:'riza-don',  pokeId:6,   slug:'charizard' },
    { kana:'カイリュー',   romaji:'kairyu-',   pokeId:149, slug:'dragonite' },
    { kana:'メタモン',     romaji:'metamon',   pokeId:132, slug:'ditto' },
    { kana:'ラプラス',     romaji:'rapurasu',  pokeId:131, slug:'lapras' },
    { kana:'ヤドン',       romaji:'yadon',     pokeId:79,  slug:'slowpoke' },
    { kana:'マリル',       romaji:'mariru',    pokeId:183, slug:'marill' },
    { kana:'コイキング',   romaji:'koikingu',  pokeId:129, slug:'magikarp' },
  ];

  // --- ステージ7: 技名（長め）---
  const STAGE7_MOVES = [
    { kana:'でんこうせっか',   romaji:'denkousekka' },
    { kana:'かみなりパンチ',   romaji:'kaminaripanchi' },
    { kana:'たいあたり',       romaji:'taiatari' },
    { kana:'はっぱカッター',   romaji:'happakatta-' },
    { kana:'みずでっぽう',     romaji:'mizudeppou' },
    { kana:'ひのこ',           romaji:'hinoko' },
    { kana:'なみのり',         romaji:'naminori' },
    { kana:'じしん',           romaji:'jishin' },
    { kana:'かえんほうしゃ',   romaji:'kaenhousha' },
    { kana:'れいとうビーム',   romaji:'reitoubi-mu' },
    { kana:'はかいこうせん',   romaji:'hakaikousen' },
    { kana:'シャドーボール',   romaji:'shado-bo-ru' },
    { kana:'りゅうのいかり',   romaji:'ryuunoikari' },
    { kana:'ばくれつパンチ',   romaji:'bakuretsupanchi' },
    { kana:'10まんボルト',     romaji:'10manboruto' },
  ];

  global.Words = {
    HOME, A, KA, SA,
    STAGE5: STAGE5_WORDS,
    STAGE6: STAGE6_POKEMON,
    STAGE7: STAGE7_MOVES,
  };
})(window);
