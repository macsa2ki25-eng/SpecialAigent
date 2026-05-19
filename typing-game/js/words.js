/**
 * words.js
 * 各ステージ・モードの出題データ。
 *
 * ローマ字表記の方針（訓令式ベース・打鍵数最小化）：
 *   - し=si, ち=ti, つ=tu, ふ=hu, じ=zi, ぢ=di, づ=du
 *   - しゃ=sya, ちゃ=tya, じゃ=zya  (ヘボン式 sha/cha/ja は使わない)
 *   - ん=nn （末尾でも母音/y前でも常にnnで統一、子供の混乱を避ける）
 *   - っ=次の子音を重ねる（っし→ssi、っち→tti、っぱ→ppa）
 *   - ー=半角ハイフン "-"
 *   - を=wo
 */
(function (global) {

  // === ステージ1: ホームポジション（asdfjkl;） ===
  const HOME = [
    'f','j','f','j','d','k','d','k','s','l','s','l','a',';','a',';',
    'fj','jf','dk','kd','sl','ls','a;',';a',
    'fjdk','sla;','asdf','jkl;','fdsa',';lkj',
    'asdfjkl;', 'jkl;asdf', 'fjdksla;',
  ];

  // === ステージ2: あ行 ===
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

  // === ステージ3: か行 ===
  const KA = [
    { kana:'か', romaji:'ka' }, { kana:'き', romaji:'ki' },
    { kana:'く', romaji:'ku' }, { kana:'け', romaji:'ke' }, { kana:'こ', romaji:'ko' },
    { kana:'かき', romaji:'kaki' }, { kana:'くき', romaji:'kuki' },
    { kana:'こけ', romaji:'koke' }, { kana:'いか', romaji:'ika' },
    { kana:'えき', romaji:'eki' }, { kana:'あき', romaji:'aki' },
    { kana:'いけ', romaji:'ike' }, { kana:'きおく', romaji:'kioku' },
    { kana:'かいこ', romaji:'kaiko' },
  ];

  // === ステージ4: さ行（訓令式: si）===
  const SA = [
    { kana:'さ', romaji:'sa' }, { kana:'し', romaji:'si' },
    { kana:'す', romaji:'su' }, { kana:'せ', romaji:'se' }, { kana:'そ', romaji:'so' },
    { kana:'さけ', romaji:'sake' }, { kana:'すし', romaji:'susi' },
    { kana:'せき', romaji:'seki' }, { kana:'いす', romaji:'isu' },
    { kana:'うし', romaji:'usi' }, { kana:'あさ', romaji:'asa' },
    { kana:'おそい', romaji:'osoi' }, { kana:'おかし', romaji:'okasi' },
  ];

  // === ステージ5: た行（訓令式: ti/tu）===
  const TA = [
    { kana:'た', romaji:'ta' }, { kana:'ち', romaji:'ti' },
    { kana:'つ', romaji:'tu' }, { kana:'て', romaji:'te' }, { kana:'と', romaji:'to' },
    { kana:'たこ', romaji:'tako' }, { kana:'たいこ', romaji:'taiko' },
    { kana:'ちかい', romaji:'tikai' }, { kana:'つくえ', romaji:'tukue' },
    { kana:'てつ', romaji:'tetu' }, { kana:'とけい', romaji:'tokei' },
    { kana:'いと', romaji:'ito' }, { kana:'うた', romaji:'uta' },
  ];

  // === ステージ6: な行 ===
  const NA = [
    { kana:'な', romaji:'na' }, { kana:'に', romaji:'ni' },
    { kana:'ぬ', romaji:'nu' }, { kana:'ね', romaji:'ne' }, { kana:'の', romaji:'no' },
    { kana:'なつ', romaji:'natu' }, { kana:'にく', romaji:'niku' },
    { kana:'いぬ', romaji:'inu' }, { kana:'ねこ', romaji:'neko' },
    { kana:'のき', romaji:'noki' }, { kana:'なし', romaji:'nasi' },
    { kana:'にし', romaji:'nisi' }, { kana:'なな', romaji:'nana' },
  ];

  // === ステージ7: は行 ===
  const HA = [
    { kana:'は', romaji:'ha' }, { kana:'ひ', romaji:'hi' },
    { kana:'ふ', romaji:'hu' }, { kana:'へ', romaji:'he' }, { kana:'ほ', romaji:'ho' },
    { kana:'はな', romaji:'hana' }, { kana:'ひと', romaji:'hito' },
    { kana:'ふね', romaji:'hune' }, { kana:'へそ', romaji:'heso' },
    { kana:'ほし', romaji:'hosi' }, { kana:'はこ', romaji:'hako' },
    { kana:'ひこうき', romaji:'hikouki' },
  ];

  // === ステージ8: ま行・や行 ===
  const MA_YA = [
    { kana:'ま', romaji:'ma' }, { kana:'み', romaji:'mi' },
    { kana:'む', romaji:'mu' }, { kana:'め', romaji:'me' }, { kana:'も', romaji:'mo' },
    { kana:'や', romaji:'ya' }, { kana:'ゆ', romaji:'yu' }, { kana:'よ', romaji:'yo' },
    { kana:'まめ', romaji:'mame' }, { kana:'みみ', romaji:'mimi' },
    { kana:'むし', romaji:'musi' }, { kana:'やま', romaji:'yama' },
    { kana:'ゆき', romaji:'yuki' }, { kana:'よる', romaji:'yoru' },
    { kana:'もも', romaji:'momo' }, { kana:'みかん', romaji:'mikann' },
  ];

  // === ステージ9: ら行・わ行・ん ===
  const RA_WA_N = [
    { kana:'ら', romaji:'ra' }, { kana:'り', romaji:'ri' },
    { kana:'る', romaji:'ru' }, { kana:'れ', romaji:'re' }, { kana:'ろ', romaji:'ro' },
    { kana:'わ', romaji:'wa' }, { kana:'を', romaji:'wo' }, { kana:'ん', romaji:'nn' },
    { kana:'さくら', romaji:'sakura' }, { kana:'くるま', romaji:'kuruma' },
    { kana:'りんご', romaji:'rinngo' }, { kana:'わに', romaji:'wani' },
    { kana:'ほん', romaji:'honn' }, { kana:'はん', romaji:'hann' },
    { kana:'てんき', romaji:'tennki' }, { kana:'おんがく', romaji:'onngaku' },
  ];

  // === ステージ10: 濁音（が・ざ・だ・ば）===
  const DAKUON = [
    { kana:'が', romaji:'ga' }, { kana:'ぎ', romaji:'gi' },
    { kana:'ぐ', romaji:'gu' }, { kana:'げ', romaji:'ge' }, { kana:'ご', romaji:'go' },
    { kana:'ざ', romaji:'za' }, { kana:'じ', romaji:'zi' }, { kana:'ず', romaji:'zu' },
    { kana:'だ', romaji:'da' }, { kana:'で', romaji:'de' }, { kana:'ど', romaji:'do' },
    { kana:'ば', romaji:'ba' }, { kana:'び', romaji:'bi' }, { kana:'ぶ', romaji:'bu' },
    { kana:'べ', romaji:'be' }, { kana:'ぼ', romaji:'bo' },
    { kana:'がっこう', romaji:'gakkou' }, { kana:'かばん', romaji:'kabann' },
    { kana:'ぎんこう', romaji:'ginnkou' }, { kana:'おどり', romaji:'odori' },
  ];

  // === ステージ11: 半濁音・拗音（ぱ・きゃ等）===
  const HANDAKU_YOUON = [
    { kana:'ぱ', romaji:'pa' }, { kana:'ぴ', romaji:'pi' },
    { kana:'ぷ', romaji:'pu' }, { kana:'ぺ', romaji:'pe' }, { kana:'ぽ', romaji:'po' },
    { kana:'きゃ', romaji:'kya' }, { kana:'きゅ', romaji:'kyu' }, { kana:'きょ', romaji:'kyo' },
    { kana:'しゃ', romaji:'sya' }, { kana:'しゅ', romaji:'syu' }, { kana:'しょ', romaji:'syo' },
    { kana:'ちゃ', romaji:'tya' }, { kana:'ちゅ', romaji:'tyu' }, { kana:'ちょ', romaji:'tyo' },
    { kana:'じゃ', romaji:'zya' }, { kana:'じゅ', romaji:'zyu' }, { kana:'じょ', romaji:'zyo' },
    { kana:'ひゃく', romaji:'hyaku' }, { kana:'おちゃ', romaji:'otya' },
    { kana:'しゃしん', romaji:'syasinn' }, { kana:'きょねん', romaji:'kyonenn' },
  ];

  // === ステージ12: 単語（あ〜わ行全体）===
  const STAGE_WORDS = [
    { kana:'きかい', romaji:'kikai' },
    { kana:'いか', romaji:'ika' },
    { kana:'あさ', romaji:'asa' },
    { kana:'かさ', romaji:'kasa' },
    { kana:'おかし', romaji:'okasi' },
    { kana:'こけし', romaji:'kokesi' },
    { kana:'すいか', romaji:'suika' },
    { kana:'あおい', romaji:'aoi' },
    { kana:'がっこう', romaji:'gakkou' },
    { kana:'ともだち', romaji:'tomodati' },
    { kana:'たいいく', romaji:'taiiku' },
    { kana:'てつぼう', romaji:'tetubou' },
    { kana:'なつやすみ', romaji:'natuyasumi' },
    { kana:'はなび', romaji:'hanabi' },
    { kana:'まつり', romaji:'maturi' },
    { kana:'おべんとう', romaji:'obenntou' },
    { kana:'おんがく', romaji:'onngaku' },
    { kana:'ちきゅう', romaji:'tikyuu' },
    { kana:'しんかんせん', romaji:'sinnkannsenn' },
    { kana:'びょういん', romaji:'byouinn' },
  ];

  // === ステージ13: ポケモン名（訓令式）===
  // 画像は PokeAPI から取得、フォールバックで images/pokemon/<slug>.png
  const STAGE_POKEMON = [
    { kana:'ピカチュウ',   romaji:'pikatyuu',    pokeId:25,  slug:'pikachu' },
    { kana:'カビゴン',     romaji:'kabigonn',    pokeId:143, slug:'snorlax' },
    { kana:'ヒトカゲ',     romaji:'hitokage',    pokeId:4,   slug:'charmander' },
    { kana:'ゼニガメ',     romaji:'zenigame',    pokeId:7,   slug:'squirtle' },
    { kana:'フシギダネ',   romaji:'husigidane',  pokeId:1,   slug:'bulbasaur' },
    { kana:'コダック',     romaji:'kodakku',     pokeId:54,  slug:'psyduck' },
    { kana:'イーブイ',     romaji:'i-bui',       pokeId:133, slug:'eevee' },
    { kana:'ニャース',     romaji:'nya-su',      pokeId:52,  slug:'meowth' },
    { kana:'ポッチャマ',   romaji:'pottyama',    pokeId:393, slug:'piplup' },
    { kana:'ミミッキュ',   romaji:'mimikkyu',    pokeId:778, slug:'mimikyu' },
    { kana:'ゲンガー',     romaji:'genga-',      pokeId:94,  slug:'gengar' },
    { kana:'リザードン',   romaji:'riza-donn',   pokeId:6,   slug:'charizard' },
    { kana:'カイリュー',   romaji:'kairyu-',     pokeId:149, slug:'dragonite' },
    { kana:'メタモン',     romaji:'metamonn',    pokeId:132, slug:'ditto' },
    { kana:'ラプラス',     romaji:'rapurasu',    pokeId:131, slug:'lapras' },
    { kana:'ヤドン',       romaji:'yadonn',      pokeId:79,  slug:'slowpoke' },
    { kana:'マリル',       romaji:'mariru',      pokeId:183, slug:'marill' },
    { kana:'コイキング',   romaji:'koikinngu',   pokeId:129, slug:'magikarp' },
  ];

  // === ステージ14: 技名（長め・訓令式）===
  const STAGE_MOVES = [
    { kana:'でんこうせっか',   romaji:'dennkousekka' },
    { kana:'かみなりパンチ',   romaji:'kaminaripannti' },
    { kana:'たいあたり',       romaji:'taiatari' },
    { kana:'はっぱカッター',   romaji:'happakatta-' },
    { kana:'みずでっぽう',     romaji:'mizudeppou' },
    { kana:'ひのこ',           romaji:'hinoko' },
    { kana:'なみのり',         romaji:'naminori' },
    { kana:'じしん',           romaji:'zisinn' },
    { kana:'かえんほうしゃ',   romaji:'kaennhousya' },
    { kana:'れいとうビーム',   romaji:'reitoubi-mu' },
    { kana:'はかいこうせん',   romaji:'hakaikousenn' },
    { kana:'シャドーボール',   romaji:'syado-bo-ru' },
    { kana:'りゅうのいかり',   romaji:'ryuunoikari' },
    { kana:'ばくれつパンチ',   romaji:'bakuretupannti' },
    { kana:'じゅうまんボルト', romaji:'zyuumannboruto' },
    { kana:'つるのムチ',       romaji:'turunomuti' },
    { kana:'でんきショック',   romaji:'dennkisyokku' },
    { kana:'にらみつける',     romaji:'niramitukeru' },
  ];

  // === タイムアタック用の短い単語プール ===
  const TIME_ATTACK_WORDS = [
    { kana:'いか', romaji:'ika' },
    { kana:'うし', romaji:'usi' },
    { kana:'たこ', romaji:'tako' },
    { kana:'ねこ', romaji:'neko' },
    { kana:'いぬ', romaji:'inu' },
    { kana:'やま', romaji:'yama' },
    { kana:'うみ', romaji:'umi' },
    { kana:'そら', romaji:'sora' },
    { kana:'かわ', romaji:'kawa' },
    { kana:'はな', romaji:'hana' },
    { kana:'ほし', romaji:'hosi' },
    { kana:'つき', romaji:'tuki' },
    { kana:'ひ', romaji:'hi' },
    { kana:'き', romaji:'ki' },
    { kana:'みず', romaji:'mizu' },
    { kana:'ちず', romaji:'tizu' },
    { kana:'いす', romaji:'isu' },
    { kana:'えき', romaji:'eki' },
    { kana:'おかし', romaji:'okasi' },
    { kana:'こけし', romaji:'kokesi' },
    { kana:'すいか', romaji:'suika' },
    { kana:'おもち', romaji:'omoti' },
    { kana:'りんご', romaji:'rinngo' },
    { kana:'ぶどう', romaji:'budou' },
    { kana:'みかん', romaji:'mikann' },
    { kana:'ばなな', romaji:'banana' },
    { kana:'いちご', romaji:'itigo' },
    { kana:'ともだち', romaji:'tomodati' },
    { kana:'がっこう', romaji:'gakkou' },
    { kana:'てんき', romaji:'tennki' },
  ];

  global.Words = {
    HOME, A, KA, SA, TA, NA, HA,
    MA_YA, RA_WA_N, DAKUON, HANDAKU_YOUON,
    STAGE_WORDS, STAGE_POKEMON, STAGE_MOVES,
    TIME_ATTACK_WORDS,
  };
})(window);
