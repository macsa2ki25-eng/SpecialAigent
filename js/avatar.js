// ===== アバター着せ替えシステム =====
(function() {
  'use strict';

  var WARDROBE_KEY = 'makoAvatarOwned';
  var EQUIPPED_KEY = 'makoAvatarEquipped';

  var CATEGORIES = ['tops','bottoms','headwear','accessory','shoes'];
  var CAT_LABELS = {tops:'トップス',bottoms:'ボトムス',headwear:'帽子',accessory:'アクセ',shoes:'靴'};

  // --- デフォルト装備 ---
  var DEFAULTS = {tops:'tshirt_white',bottoms:'shorts_blue',shoes:'sneakers_white'};

  // --- 所持品管理 ---
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

  // --- SVG 基本パーツ ---
  function bodyBaseSVG() {
    return '' +
      // 影
      '<ellipse cx="100" cy="290" rx="40" ry="6" fill="#d0d0d0" opacity="0.5"/>' +
      // 体（胴体）
      '<rect x="72" y="140" width="56" height="70" rx="12" fill="#FFDBB4"/>' +
      // 首
      '<rect x="90" y="130" width="20" height="18" rx="6" fill="#FFDBB4"/>' +
      // 左腕
      '<rect x="56" y="148" width="20" height="48" rx="10" fill="#FFDBB4"/>' +
      // 右腕
      '<rect x="124" y="148" width="20" height="48" rx="10" fill="#FFDBB4"/>' +
      // 左手
      '<circle cx="66" cy="200" r="8" fill="#FFDBB4"/>' +
      // 右手
      '<circle cx="134" cy="200" r="8" fill="#FFDBB4"/>' +
      // 左脚
      '<rect x="78" y="206" width="18" height="55" rx="9" fill="#FFDBB4"/>' +
      // 右脚
      '<rect x="104" y="206" width="18" height="55" rx="9" fill="#FFDBB4"/>';
  }

  function headSVG() {
    return '' +
      // 頭
      '<circle cx="100" cy="80" r="52" fill="#FFDBB4"/>' +
      // 髪（後ろ）
      '<path d="M48,75 Q48,28 100,28 Q152,28 152,75 L152,60 Q152,20 100,18 Q48,20 48,60 Z" fill="#5D4037"/>' +
      // 髪（前髪）
      '<path d="M52,68 Q60,42 100,38 Q140,42 148,68 L148,58 Q140,30 100,28 Q60,30 52,58 Z" fill="#5D4037"/>' +
      // 左目
      '<ellipse cx="80" cy="82" rx="6" ry="7" fill="#333"/>' +
      // 右目
      '<ellipse cx="120" cy="82" rx="6" ry="7" fill="#333"/>' +
      // 目のハイライト
      '<circle cx="82" cy="80" r="2" fill="#fff"/>' +
      '<circle cx="122" cy="80" r="2" fill="#fff"/>' +
      // 口
      '<path d="M92,98 Q100,104 108,98" stroke="#c97" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      // 頬紅
      '<ellipse cx="68" cy="92" rx="8" ry="5" fill="#FFB4B4" opacity="0.5"/>' +
      '<ellipse cx="132" cy="92" rx="8" ry="5" fill="#FFB4B4" opacity="0.5"/>';
  }

  // --- レンダリング ---
  function renderAvatar(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    initDefaults();

    var eq = getEquipped();
    var svg = '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">';

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

    // Layer 6: ヘッドウェア
    var hatItem = eq.headwear ? findItem(eq.headwear) : null;
    if (hatItem) svg += '<g id="layer-headwear">' + hatItem.getSVG() + '</g>';

    // Layer 7: 前面アクセサリ
    if (accItem && accItem.layer !== 'back') {
      svg += '<g id="layer-front-acc">' + accItem.getSVG() + '</g>';
    }

    svg += '</svg>';
    container.innerHTML = svg;
  }

  function renderItemPreview(item) {
    if (!item || !item.getSVG) return '';
    return '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">' + item.getSVG() + '</svg>';
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
