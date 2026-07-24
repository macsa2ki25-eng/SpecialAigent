// ===== アバター着せ替えシステム =====
(function() {
  'use strict';

  var WARDROBE_KEY = 'makoAvatarOwned';
  var EQUIPPED_KEY = 'makoAvatarEquipped';

  var CATEGORIES = ['hair','tops','bottoms','headwear','accessory','shoes','background','handheld'];
  var CAT_LABELS = {
    hair:'髪型', tops:'トップス', bottoms:'ボトムス', headwear:'帽子',
    accessory:'アクセ', shoes:'靴', background:'背景', handheld:'手持ち'
  };

  var DEFAULTS = {hair:'hair_short_dark',tops:'tshirt_white',bottoms:'shorts_blue',shoes:'sneakers_white'};

  function getWardrobe() {
    try { return JSON.parse(localStorage.getItem(WARDROBE_KEY) || '[]'); } catch(e) { return []; }
  }
  function saveWardrobe(list) {
    localStorage.setItem(WARDROBE_KEY, JSON.stringify(list));
  }
  function getEquipped() {
    try { return JSON.parse(localStorage.getItem(EQUIPPED_KEY) || '{}'); } catch(e) { return {}; }
  }
  function saveEquipped(obj) {
    localStorage.setItem(EQUIPPED_KEY, JSON.stringify(obj));
  }

  function initDefaults() {
    var w = getWardrobe();
    var changed = false;
    var items = window.AVATAR_ITEMS || [];
    items.forEach(function(item) {
      if (item.isDefault && w.indexOf(item.id) === -1) {
        w.push(item.id);
        changed = true;
      }
    });
    if (changed) saveWardrobe(w);
    var eq = getEquipped();
    var eqChanged = false;
    for (var cat in DEFAULTS) {
      if (!eq[cat]) { eq[cat] = DEFAULTS[cat]; eqChanged = true; }
    }
    if (eqChanged) saveEquipped(eq);
  }

  function findItem(itemId) {
    var items = window.AVATAR_ITEMS || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === itemId) return items[i];
    }
    return null;
  }

  function buyItem(itemId) {
    var item = findItem(itemId);
    if (!item) return {ok:false, msg:'アイテムが見つかりません'};
    var w = getWardrobe();
    if (w.indexOf(itemId) !== -1) return {ok:false, msg:'すでに持っています'};
    if (!window.MakoChip || !window.MakoChip.spendChips(item.price, 'ショップ購入「' + item.name + '」')) {
      return {ok:false, msg:'マコチップが足りません'};
    }
    w.push(itemId);
    saveWardrobe(w);
    return {ok:true, msg:item.name + 'を購入しました！'};
  }

  function equipItem(itemId) {
    var item = findItem(itemId);
    if (!item) return false;
    var w = getWardrobe();
    if (w.indexOf(itemId) === -1) return false;
    var eq = getEquipped();
    eq[item.category] = itemId;
    saveEquipped(eq);
    return true;
  }

  function unequipItem(category) {
    var eq = getEquipped();
    if (DEFAULTS[category]) {
      eq[category] = DEFAULTS[category];
    } else {
      delete eq[category];
    }
    saveEquipped(eq);
  }

  // --- SVG 共通定義 ---
  function sharedDefs() {
    return '<defs>' +
      '<radialGradient id="av-skin" cx="50%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#FFE8D2"/>' +
        '<stop offset="100%" stop-color="#FFE2C6"/>' +
      '</radialGradient>' +
      '<linearGradient id="av-skin-v" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#FFE2C6"/>' +
        '<stop offset="100%" stop-color="#F8D4B0"/>' +
      '</linearGradient>' +
      '<filter id="av-shd" x="-20%" y="-10%" width="140%" height="140%">' +
        '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.10"/>' +
      '</filter>' +
      '<filter id="av-shd-sm" x="-20%" y="-10%" width="140%" height="140%">' +
        '<feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.08"/>' +
      '</filter>' +
      '<filter id="av-glow" x="-30%" y="-30%" width="160%" height="160%">' +
        '<feGaussianBlur stdDeviation="3" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      '<radialGradient id="av-blush" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#FF9D8A" stop-opacity="0.5"/>' +
        '<stop offset="100%" stop-color="#FF9D8A" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>';
  }

  // --- ハンゲーム風 基本素体 ---
  // 骨格アンカー: 頭中心(100,80) 胴72-128/140-210 手(65,199)(135,199) 脚206-262 足246-268
  var OL = '#4a3428';   // 主線
  var SKIN = '#FFE2C6'; // 肌ベース
  var SKIN_SH = '#F3C6A0'; // 肌かげ

  function bodyBaseSVG() {
    return '' +
      // 接地影
      '<ellipse cx="100" cy="288" rx="42" ry="7" fill="#3a2c22" opacity="0.10"/>' +
      // 脚
      '<rect x="79" y="204" width="18" height="58" rx="9" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5"/>' +
      '<rect x="103" y="204" width="18" height="58" rx="9" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5"/>' +
      '<path d="M114,210 Q118,235 114,256 L118,256 Q121,234 118,210 Z" fill="' + SKIN_SH + '"/>' +
      // 腕
      '<rect x="55" y="145" width="19" height="52" rx="9.5" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5"/>' +
      '<rect x="126" y="145" width="19" height="52" rx="9.5" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5"/>' +
      '<path d="M138,150 Q142,170 139,192 L142,190 Q144,168 141,150 Z" fill="' + SKIN_SH + '"/>' +
      // 手（ミトン風）
      '<circle cx="65" cy="200" r="9" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5"/>' +
      '<circle cx="135" cy="200" r="9" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5"/>' +
      // 首
      '<rect x="92" y="126" width="16" height="20" rx="7" fill="' + SKIN_SH + '"/>' +
      // 胴
      '<path d="M84,140 L116,140 Q128,140 128,153 L128,197 Q128,210 115,210 L85,210 Q72,210 72,197 L72,153 Q72,140 84,140 Z" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M116,144 Q124,172 119,206 L110,206 Q120,174 108,144 Z" fill="' + SKIN_SH + '" opacity="0.6"/>';
  }

  function headSVG() {
    return '' +
      // 耳
      '<ellipse cx="47" cy="87" rx="6.5" ry="9" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2"/>' +
      '<ellipse cx="153" cy="87" rx="6.5" ry="9" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="2"/>' +
      // 輪郭（ほっぺふっくら・あご小さめ）
      '<path d="M100,30 C66,30 46,53 46,83 C46,106 61,124 79,130 Q100,137 121,130 C139,124 154,106 154,83 C154,53 134,30 100,30 Z" fill="' + SKIN + '" stroke="' + OL + '" stroke-width="3" stroke-linejoin="round"/>' +
      // 頬のかげ（あご下）
      '<path d="M80,128 Q100,134 120,128 Q100,132 80,128 Z" fill="' + SKIN_SH + '" opacity="0.7"/>' +
      // まゆ
      '<path d="M67,70 Q76,64 86,68" stroke="#6b4a35" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M114,68 Q124,64 133,70" stroke="#6b4a35" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      // 目（大きくつややか）
      '<ellipse cx="79" cy="89" rx="9.5" ry="11.5" fill="#33200F"/>' +
      '<ellipse cx="121" cy="89" rx="9.5" ry="11.5" fill="#33200F"/>' +
      '<ellipse cx="79" cy="93.5" rx="6.2" ry="5.6" fill="#8A5A2E"/>' +
      '<ellipse cx="121" cy="93.5" rx="6.2" ry="5.6" fill="#8A5A2E"/>' +
      '<ellipse cx="79" cy="96" rx="4" ry="3" fill="#C98D4B" opacity="0.85"/>' +
      '<ellipse cx="121" cy="96" rx="4" ry="3" fill="#C98D4B" opacity="0.85"/>' +
      '<circle cx="75.5" cy="84" r="3.4" fill="#fff"/>' +
      '<circle cx="117.5" cy="84" r="3.4" fill="#fff"/>' +
      '<circle cx="82.5" cy="94" r="1.7" fill="#fff" opacity="0.9"/>' +
      '<circle cx="124.5" cy="94" r="1.7" fill="#fff" opacity="0.9"/>' +
      // 上まつげライン
      '<path d="M69,83 Q79,75 89,83" stroke="#241610" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M111,83 Q121,75 131,83" stroke="#241610" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      // 口（にっこり）
      '<path d="M92,103 Q100,112 108,103 Q100,107 92,103 Z" fill="#9C4633" stroke="' + OL + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      // ほっぺ
      '<ellipse cx="62" cy="100" rx="9" ry="5.5" fill="#FF9D8A" opacity="0.45"/>' +
      '<ellipse cx="138" cy="100" rx="9" ry="5.5" fill="#FF9D8A" opacity="0.45"/>';
  }

  // --- レンダリング ---
  function renderAvatar(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    initDefaults();

    var eq = getEquipped();
    var svg = '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">';

    svg += sharedDefs();

    // Layer -1: 背景
    var bgItem = eq.background ? findItem(eq.background) : null;
    if (bgItem) svg += '<g id="layer-bg">' + bgItem.getSVG() + '</g>';

    // Layer 0: 後ろアクセサリ（翼など）
    var accItem = eq.accessory ? findItem(eq.accessory) : null;
    if (accItem && accItem.layer === 'back') {
      svg += '<g id="layer-back-acc">' + accItem.getSVG() + '</g>';
    }

    // Layer 1: 体
    svg += '<g id="layer-body">' + bodyBaseSVG() + '</g>';

    // Layer 2: 靴
    var shoeItem = eq.shoes ? findItem(eq.shoes) : findItem(DEFAULTS.shoes);
    if (shoeItem) svg += '<g id="layer-shoes">' + shoeItem.getSVG() + '</g>';

    // Layer 3: ボトムス
    var bottomItem = eq.bottoms ? findItem(eq.bottoms) : findItem(DEFAULTS.bottoms);
    if (bottomItem) svg += '<g id="layer-bottoms">' + bottomItem.getSVG() + '</g>';

    // Layer 4: トップス
    var topItem = eq.tops ? findItem(eq.tops) : findItem(DEFAULTS.tops);
    if (topItem) svg += '<g id="layer-tops">' + topItem.getSVG() + '</g>';

    // Layer 5: 頭
    svg += '<g id="layer-head">' + headSVG() + '</g>';

    // Layer 6: 髪型
    var hairItem = eq.hair ? findItem(eq.hair) : findItem(DEFAULTS.hair);
    if (hairItem) svg += '<g id="layer-hair">' + hairItem.getSVG() + '</g>';

    // Layer 7: ヘッドウェア
    var hatItem = eq.headwear ? findItem(eq.headwear) : null;
    if (hatItem) svg += '<g id="layer-headwear">' + hatItem.getSVG() + '</g>';

    // Layer 8: 前面アクセサリ
    if (accItem && accItem.layer !== 'back') {
      svg += '<g id="layer-front-acc">' + accItem.getSVG() + '</g>';
    }

    // Layer 9: 手持ちアイテム
    var heldItem = eq.handheld ? findItem(eq.handheld) : null;
    if (heldItem) svg += '<g id="layer-handheld">' + heldItem.getSVG() + '</g>';

    svg += '</svg>';
    container.innerHTML = svg;
  }

  function renderItemPreview(item) {
    if (!item || !item.getSVG) return '';
    return '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">' + sharedDefs() + item.getSVG() + '</svg>';
  }

  // --- Public API ---
  window.AvatarSystem = {
    CATEGORIES: CATEGORIES,
    CAT_LABELS: CAT_LABELS,
    DEFAULTS: DEFAULTS,
    getWardrobe: getWardrobe,
    getEquipped: getEquipped,
    initDefaults: initDefaults,
    findItem: findItem,
    buyItem: buyItem,
    equipItem: equipItem,
    unequipItem: unequipItem,
    renderAvatar: renderAvatar,
    renderItemPreview: renderItemPreview,
    getAllItems: function() { return window.AVATAR_ITEMS || []; },
    getItemsByCategory: function(cat) {
      return (window.AVATAR_ITEMS || []).filter(function(i) { return i.category === cat; });
    }
  };
})();
