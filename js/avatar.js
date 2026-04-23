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

  // --- SVG 共通定義（グラデーション・フィルター）---
  function sharedDefs() {
    return '<defs>' +
      '<radialGradient id="av-skin" cx="50%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#FFE8D0"/>' +
        '<stop offset="100%" stop-color="#F5CBA7"/>' +
      '</radialGradient>' +
      '<linearGradient id="av-skin-v" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#FFDFC4"/>' +
        '<stop offset="100%" stop-color="#F0C8A0"/>' +
      '</linearGradient>' +
      '<filter id="av-shd" x="-20%" y="-10%" width="140%" height="140%">' +
        '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.12"/>' +
      '</filter>' +
      '<filter id="av-shd-sm" x="-20%" y="-10%" width="140%" height="140%">' +
        '<feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.08"/>' +
      '</filter>' +
      '<filter id="av-glow" x="-30%" y="-30%" width="160%" height="160%">' +
        '<feGaussianBlur stdDeviation="3" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      '<radialGradient id="av-iris" cx="40%" cy="35%" r="55%">' +
        '<stop offset="0%" stop-color="#6D4C41"/>' +
        '<stop offset="70%" stop-color="#3E2723"/>' +
        '<stop offset="100%" stop-color="#1B0F0A"/>' +
      '</radialGradient>' +
      '<radialGradient id="av-eye-w" cx="50%" cy="40%" r="50%">' +
        '<stop offset="0%" stop-color="#fff"/>' +
        '<stop offset="100%" stop-color="#f0f0f0"/>' +
      '</radialGradient>' +
      '<radialGradient id="av-blush" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#FFB4B4" stop-opacity="0.55"/>' +
        '<stop offset="100%" stop-color="#FFB4B4" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>';
  }

  // --- SVG 基本パーツ（高品質版）---
  function bodyBaseSVG() {
    return '' +
      '<ellipse cx="100" cy="290" rx="36" ry="5" fill="#c0c0c0" opacity="0.35"/>' +
      '<rect x="72" y="140" width="56" height="70" rx="12" fill="url(#av-skin-v)"/>' +
      '<rect x="90" y="130" width="20" height="18" rx="6" fill="url(#av-skin)"/>' +
      '<rect x="56" y="148" width="20" height="48" rx="10" fill="url(#av-skin-v)"/>' +
      '<rect x="124" y="148" width="20" height="48" rx="10" fill="url(#av-skin-v)"/>' +
      '<circle cx="66" cy="200" r="8" fill="url(#av-skin)"/>' +
      '<circle cx="134" cy="200" r="8" fill="url(#av-skin)"/>' +
      '<rect x="78" y="206" width="18" height="55" rx="9" fill="url(#av-skin-v)"/>' +
      '<rect x="104" y="206" width="18" height="55" rx="9" fill="url(#av-skin-v)"/>';
  }

  function headSVG() {
    return '' +
      '<circle cx="100" cy="80" r="52" fill="url(#av-skin)"/>' +
      '<ellipse cx="48" cy="82" rx="6" ry="8" fill="url(#av-skin)"/>' +
      '<ellipse cx="48" cy="83" rx="3" ry="5" fill="#F0C8A0" opacity="0.5"/>' +
      '<ellipse cx="152" cy="82" rx="6" ry="8" fill="url(#av-skin)"/>' +
      '<ellipse cx="152" cy="83" rx="3" ry="5" fill="#F0C8A0" opacity="0.5"/>' +
      '<path d="M70,71 Q78,67 86,70" stroke="#8D6E63" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M114,70 Q122,67 130,71" stroke="#8D6E63" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="80" cy="82" rx="10" ry="9" fill="url(#av-eye-w)"/>' +
      '<ellipse cx="120" cy="82" rx="10" ry="9" fill="url(#av-eye-w)"/>' +
      '<ellipse cx="80" cy="83" rx="7" ry="7.5" fill="url(#av-iris)"/>' +
      '<ellipse cx="120" cy="83" rx="7" ry="7.5" fill="url(#av-iris)"/>' +
      '<circle cx="80" cy="83" r="3.5" fill="#0a0a0a"/>' +
      '<circle cx="120" cy="83" r="3.5" fill="#0a0a0a"/>' +
      '<ellipse cx="83" cy="80" rx="2.5" ry="2" fill="#fff" opacity="0.9"/>' +
      '<ellipse cx="123" cy="80" rx="2.5" ry="2" fill="#fff" opacity="0.9"/>' +
      '<circle cx="77" cy="85" r="1.2" fill="#fff" opacity="0.5"/>' +
      '<circle cx="117" cy="85" r="1.2" fill="#fff" opacity="0.5"/>' +
      '<path d="M70,78 Q75,75 80,76 Q85,75 90,78" stroke="#4E342E" stroke-width="1.5" fill="none"/>' +
      '<path d="M110,78 Q115,75 120,76 Q125,75 130,78" stroke="#4E342E" stroke-width="1.5" fill="none"/>' +
      '<path d="M98,91 Q100,93 102,91" stroke="#D4A574" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M91,100 Q96,105 100,106 Q104,105 109,100" stroke="#C9876B" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M96,101 Q100,103 104,101" fill="#E8A088" opacity="0.3"/>' +
      '<ellipse cx="66" cy="94" rx="10" ry="6" fill="url(#av-blush)"/>' +
      '<ellipse cx="134" cy="94" rx="10" ry="6" fill="url(#av-blush)"/>';
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
