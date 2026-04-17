// ===== アバター アイテムカタログ =====
// 各アイテムは getSVG() で SVG パーツを返す
window.AVATAR_ITEMS = [

  // ========== HAIR ==========
  {
    id: 'hair_short_dark', name: 'ショートヘア', category: 'hair', price: 0, isDefault: true,
    getSVG: function() {
      var c = '#5D4037';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="' + c + '"/>' +
        '<path d="M50,76 L50,90 Q52,95 58,94 L58,80 Z" fill="' + c + '"/>' +
        '<path d="M150,76 L150,90 Q148,95 142,94 L142,80 Z" fill="' + c + '"/>';
    }
  },
  {
    id: 'hair_long_dark', name: 'ロングヘア', category: 'hair', price: 0, isDefault: true,
    getSVG: function() {
      var c = '#4A2C17';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M50,80 Q42,150 46,210 L62,210 Q58,150 58,84 Z" fill="' + c + '"/>' +
        '<path d="M150,80 Q158,150 154,210 L138,210 Q142,150 142,84 Z" fill="' + c + '"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="' + c + '"/>';
    }
  },
  {
    id: 'hair_bob', name: 'ボブヘア', category: 'hair', price: 25,
    getSVG: function() {
      var c = '#3E2723';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M50,80 L50,120 Q52,128 60,128 L60,84 Z" fill="' + c + '"/>' +
        '<path d="M150,80 L150,120 Q148,128 140,128 L140,84 Z" fill="' + c + '"/>' +
        '<path d="M60,122 Q100,132 140,122 L140,128 Q100,138 60,128 Z" fill="' + c + '"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="' + c + '"/>';
    }
  },
  {
    id: 'hair_medium', name: 'ミディアムヘア', category: 'hair', price: 20,
    getSVG: function() {
      var c = '#5D4037';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M50,80 Q44,130 48,158 L62,158 Q58,130 58,84 Z" fill="' + c + '"/>' +
        '<path d="M150,80 Q156,130 152,158 L138,158 Q142,130 142,84 Z" fill="' + c + '"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="' + c + '"/>';
    }
  },
  {
    id: 'hair_twin_dark', name: 'ツインテール', category: 'hair', price: 30,
    getSVG: function() {
      var c = '#4A2C17';
      return '<path d="M52,78 Q52,26 100,22 Q148,26 148,78 Q146,66 100,62 Q54,66 52,78 Z" fill="' + c + '"/>' +
        '<path d="M62,74 Q72,54 100,52 Q128,54 138,74 L136,68 Q126,50 100,48 Q74,50 64,68 Z" fill="' + c + '"/>' +
        '<circle cx="58" cy="90" r="8" fill="' + c + '"/>' +
        '<circle cx="142" cy="90" r="8" fill="' + c + '"/>' +
        '<path d="M52,92 Q36,135 38,178 Q40,202 52,207 Q62,202 64,178 Q66,135 66,92 Z" fill="' + c + '"/>' +
        '<path d="M148,92 Q164,135 162,178 Q160,202 148,207 Q138,202 136,178 Q134,135 134,92 Z" fill="' + c + '"/>' +
        '<circle cx="58" cy="90" r="5" fill="#E91E63"/>' +
        '<circle cx="142" cy="90" r="5" fill="#E91E63"/>';
    }
  },
  {
    id: 'hair_ponytail', name: 'ポニーテール', category: 'hair', price: 30,
    getSVG: function() {
      var c = '#5D4037';
      return '<path d="M52,80 Q52,26 100,22 Q148,26 148,80 Q146,70 100,66 Q54,70 52,80 Z" fill="' + c + '"/>' +
        '<path d="M90,26 Q88,10 100,6 Q112,10 110,26 Z" fill="' + c + '"/>' +
        '<path d="M88,22 Q84,52 90,90 L110,90 Q116,52 112,22 Z" fill="#4A2C17"/>' +
        '<ellipse cx="100" cy="90" rx="8" ry="5" fill="#FDD835"/>' +
        '<path d="M52,80 L52,102 Q54,108 60,106 L60,86 Z" fill="' + c + '"/>' +
        '<path d="M148,80 L148,102 Q146,108 140,106 L140,86 Z" fill="' + c + '"/>' +
        '<path d="M62,74 Q74,56 100,54 Q126,56 138,74 L136,68 Q124,50 100,48 Q76,50 64,68 Z" fill="' + c + '"/>';
    }
  },
  {
    id: 'hair_short_blonde', name: '金髪ショート', category: 'hair', price: 50,
    getSVG: function() {
      var c = '#FFCA28'; var s = '#F9A825';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="' + c + '"/>' +
        '<path d="M50,76 L50,90 Q52,95 58,94 L58,80 Z" fill="' + s + '"/>' +
        '<path d="M150,76 L150,90 Q148,95 142,94 L142,80 Z" fill="' + s + '"/>' +
        '<path d="M72,32 Q78,28 82,34" stroke="#FFF9C4" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_long_pink', name: 'ピンクロング', category: 'hair', price: 80,
    getSVG: function() {
      var c = '#F06292';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M50,80 Q42,150 46,210 L62,210 Q58,150 58,84 Z" fill="' + c + '"/>' +
        '<path d="M150,80 Q158,150 154,210 L138,210 Q142,150 142,84 Z" fill="' + c + '"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="' + c + '"/>' +
        '<path d="M72,30 Q78,26 82,32" stroke="#FFCDD2" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<path d="M90,24 Q96,20 100,24" stroke="#FFCDD2" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_ponytail_silver', name: 'シルバーポニテ', category: 'hair', price: 70,
    getSVG: function() {
      var c = '#B0BEC5'; var s = '#78909C';
      return '<path d="M52,80 Q52,26 100,22 Q148,26 148,80 Q146,70 100,66 Q54,70 52,80 Z" fill="' + c + '"/>' +
        '<path d="M90,26 Q88,10 100,6 Q112,10 110,26 Z" fill="' + c + '"/>' +
        '<path d="M88,22 Q84,52 90,90 L110,90 Q116,52 112,22 Z" fill="' + s + '"/>' +
        '<ellipse cx="100" cy="90" rx="8" ry="5" fill="#E1F5FE"/>' +
        '<path d="M52,80 L52,102 Q54,108 60,106 L60,86 Z" fill="' + c + '"/>' +
        '<path d="M148,80 L148,102 Q146,108 140,106 L140,86 Z" fill="' + c + '"/>' +
        '<path d="M62,74 Q74,56 100,54 Q126,56 138,74 L136,68 Q124,50 100,48 Q76,50 64,68 Z" fill="' + c + '"/>';
    }
  },
  {
    id: 'hair_long_red', name: '赤ロング', category: 'hair', price: 90,
    getSVG: function() {
      var c = '#E53935'; var s = '#B71C1C';
      return '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="' + c + '"/>' +
        '<path d="M50,80 Q42,150 46,210 L62,210 Q58,150 58,84 Z" fill="' + c + '"/>' +
        '<path d="M150,80 Q158,150 154,210 L138,210 Q142,150 142,84 Z" fill="' + c + '"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="' + c + '"/>' +
        '<path d="M72,30 Q78,26 82,32" stroke="#FFCDD2" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
  },

  // ========== TOPS ==========
  {
    id: 'tshirt_white', name: '白Tシャツ', category: 'tops', price: 0, isDefault: true,
    getSVG: function() {
      return '<rect x="68" y="140" width="64" height="52" rx="8" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        '<path d="M82,140 Q100,148 118,140" stroke="#ddd" stroke-width="1" fill="none"/>';
    }
  },
  {
    id: 'tshirt_red', name: '赤Tシャツ', category: 'tops', price: 15, isDefault: false,
    getSVG: function() {
      return '<rect x="68" y="140" width="64" height="52" rx="8" fill="#e53935"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="#e53935"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="#e53935"/>' +
        '<path d="M82,140 Q100,148 118,140" stroke="#c62828" stroke-width="1" fill="none"/>';
    }
  },
  {
    id: 'tshirt_blue', name: '青Tシャツ', category: 'tops', price: 15, isDefault: false,
    getSVG: function() {
      return '<rect x="68" y="140" width="64" height="52" rx="8" fill="#1e88e5"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="#1e88e5"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="#1e88e5"/>' +
        '<path d="M82,140 Q100,148 118,140" stroke="#1565c0" stroke-width="1" fill="none"/>';
    }
  },
  {
    id: 'hoodie_navy', name: 'ネイビーパーカー', category: 'tops', price: 80, isDefault: false,
    getSVG: function() {
      return '<rect x="64" y="138" width="72" height="58" rx="10" fill="#1a237e"/>' +
        '<rect x="48" y="142" width="24" height="42" rx="12" fill="#1a237e"/>' +
        '<rect x="128" y="142" width="24" height="42" rx="12" fill="#1a237e"/>' +
        // フード
        '<path d="M76,138 Q100,128 124,138 Q128,126 100,118 Q72,126 76,138 Z" fill="#283593"/>' +
        // ポケット
        '<rect x="78" y="172" width="44" height="14" rx="4" fill="#283593"/>' +
        // 紐
        '<line x1="94" y1="138" x2="92" y2="158" stroke="#fff" stroke-width="1.5"/>' +
        '<line x1="106" y1="138" x2="108" y2="158" stroke="#fff" stroke-width="1.5"/>';
    }
  },
  {
    id: 'jacket_leather', name: 'レザージャケット', category: 'tops', price: 100, isDefault: false,
    getSVG: function() {
      return '<rect x="64" y="138" width="72" height="56" rx="8" fill="#4e342e"/>' +
        '<rect x="48" y="142" width="24" height="40" rx="12" fill="#4e342e"/>' +
        '<rect x="128" y="142" width="24" height="40" rx="12" fill="#4e342e"/>' +
        // ジッパー
        '<line x1="100" y1="140" x2="100" y2="192" stroke="#ffd54f" stroke-width="2"/>' +
        // 襟
        '<path d="M82,138 L92,148 L100,140 L108,148 L118,138" fill="#3e2723" stroke="#3e2723" stroke-width="1"/>' +
        // ポケット
        '<line x1="72" y1="170" x2="92" y2="170" stroke="#3e2723" stroke-width="1.5"/>' +
        '<line x1="108" y1="170" x2="128" y2="170" stroke="#3e2723" stroke-width="1.5"/>';
    }
  },
  {
    id: 'sailor_top', name: 'セーラー服', category: 'tops', price: 100, isDefault: false,
    getSVG: function() {
      return '<rect x="68" y="140" width="64" height="52" rx="8" fill="#fff"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="#fff"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="#fff"/>' +
        // セーラー襟
        '<path d="M72,140 L100,165 L128,140 L130,145 L100,172 L70,145 Z" fill="#1565c0"/>' +
        // 襟のライン
        '<path d="M76,144 L100,166 L124,144" stroke="#fff" stroke-width="1.5" fill="none"/>' +
        // リボン
        '<polygon points="96,152 100,158 104,152 100,148" fill="#e53935"/>';
    }
  },
  {
    id: 'robe_wizard', name: '魔法使いローブ', category: 'tops', price: 300, isDefault: false,
    getSVG: function() {
      return '<path d="M58,136 L58,210 Q58,215 64,215 L136,215 Q142,215 142,210 L142,136 Q130,128 100,126 Q70,128 58,136 Z" fill="#7b1fa2"/>' +
        '<rect x="44" y="140" width="24" height="52" rx="12" fill="#7b1fa2"/>' +
        '<rect x="132" y="140" width="24" height="52" rx="12" fill="#7b1fa2"/>' +
        // 星の装飾
        '<polygon points="100,155 103,162 110,162 104,167 106,174 100,170 94,174 96,167 90,162 97,162" fill="#ffd54f"/>' +
        // 縁取り
        '<path d="M58,136 Q70,128 100,126 Q130,128 142,136" stroke="#e1bee7" stroke-width="2" fill="none"/>' +
        '<line x1="58" y1="210" x2="142" y2="210" stroke="#e1bee7" stroke-width="2"/>';
    }
  },
  {
    id: 'kimono_red', name: '着物', category: 'tops', price: 250, isDefault: false,
    getSVG: function() {
      return '<path d="M62,136 L62,212 L138,212 L138,136 Q120,130 100,130 Q80,130 62,136 Z" fill="#c62828"/>' +
        '<rect x="48" y="140" width="22" height="46" rx="11" fill="#c62828"/>' +
        '<rect x="130" y="140" width="22" height="46" rx="11" fill="#c62828"/>' +
        // 合わせ
        '<path d="M90,136 L100,190 L110,136" fill="#ff8a65"/>' +
        // 帯
        '<rect x="62" y="175" width="76" height="16" rx="3" fill="#ffd54f"/>' +
        '<rect x="92" y="172" width="16" height="22" rx="4" fill="#ffb300"/>' +
        // 柄（花）
        '<circle cx="76" cy="155" r="4" fill="#ffcdd2" opacity="0.7"/>' +
        '<circle cx="124" cy="160" r="3" fill="#ffcdd2" opacity="0.7"/>' +
        '<circle cx="80" cy="200" r="3" fill="#ffcdd2" opacity="0.7"/>';
    }
  },

  // ========== BOTTOMS ==========
  {
    id: 'shorts_blue', name: '青短パン', category: 'bottoms', price: 0, isDefault: true,
    getSVG: function() {
      return '<path d="M72,192 L72,226 Q72,230 78,230 L96,230 L96,192 Z" rx="4" fill="#1565c0"/>' +
        '<path d="M128,192 L128,226 Q128,230 122,230 L104,230 L104,192 Z" rx="4" fill="#1565c0"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#1976d2"/>';
    }
  },
  {
    id: 'pants_black', name: '黒パンツ', category: 'bottoms', price: 20, isDefault: false,
    getSVG: function() {
      return '<path d="M72,192 L74,255 Q74,258 80,258 L96,258 L98,192 Z" fill="#333"/>' +
        '<path d="M128,192 L126,255 Q126,258 120,258 L104,258 L102,192 Z" fill="#333"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#444"/>';
    }
  },
  {
    id: 'jeans_blue', name: 'ジーンズ', category: 'bottoms', price: 60, isDefault: false,
    getSVG: function() {
      return '<path d="M72,192 L74,255 Q74,258 80,258 L96,258 L98,192 Z" fill="#1976d2"/>' +
        '<path d="M128,192 L126,255 Q126,258 120,258 L104,258 L102,192 Z" fill="#1976d2"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#1e88e5"/>' +
        // ステッチ
        '<line x1="85" y1="195" x2="85" y2="250" stroke="#90caf9" stroke-width="0.8" stroke-dasharray="3,3"/>' +
        '<line x1="115" y1="195" x2="115" y2="250" stroke="#90caf9" stroke-width="0.8" stroke-dasharray="3,3"/>';
    }
  },
  {
    id: 'skirt_pleats', name: 'プリーツスカート', category: 'bottoms', price: 50, isDefault: false,
    getSVG: function() {
      return '<rect x="70" y="190" width="60" height="10" rx="2" fill="#1a237e"/>' +
        '<path d="M66,200 L72,240 L82,240 L86,200 Z" fill="#1a237e"/>' +
        '<path d="M86,200 L88,240 L98,240 L96,200 Z" fill="#283593"/>' +
        '<path d="M96,200 L98,240 L108,240 L106,200 Z" fill="#1a237e"/>' +
        '<path d="M106,200 L108,240 L118,240 L116,200 Z" fill="#283593"/>' +
        '<path d="M116,200 L118,240 L128,240 L134,200 Z" fill="#1a237e"/>';
    }
  },
  {
    id: 'cargo_pants', name: 'カーゴパンツ', category: 'bottoms', price: 80, isDefault: false,
    getSVG: function() {
      return '<path d="M70,192 L72,258 Q72,260 78,260 L98,260 L100,192 Z" fill="#5d4037"/>' +
        '<path d="M130,192 L128,258 Q128,260 122,260 L102,260 L100,192 Z" fill="#5d4037"/>' +
        '<rect x="70" y="190" width="60" height="10" rx="2" fill="#6d4c41"/>' +
        // ポケット
        '<rect x="74" y="218" width="16" height="14" rx="2" fill="#4e342e"/>' +
        '<rect x="110" y="218" width="16" height="14" rx="2" fill="#4e342e"/>';
    }
  },

  // ========== HEADWEAR ==========
  {
    id: 'cap_basic', name: 'キャップ', category: 'headwear', price: 20, isDefault: false,
    getSVG: function() {
      return '<ellipse cx="100" cy="42" rx="48" ry="14" fill="#e53935"/>' +
        '<path d="M52,42 Q52,30 100,28 Q148,30 148,42 Z" fill="#e53935"/>' +
        // つば
        '<ellipse cx="118" cy="44" rx="36" ry="8" fill="#c62828"/>' +
        // ボタン
        '<circle cx="100" cy="28" r="3" fill="#b71c1c"/>';
    }
  },
  {
    id: 'beret_red', name: 'ベレー帽', category: 'headwear', price: 50, isDefault: false,
    getSVG: function() {
      return '<ellipse cx="100" cy="40" rx="44" ry="10" fill="#c62828"/>' +
        '<path d="M56,40 Q56,18 100,14 Q144,18 144,40 Z" fill="#e53935"/>' +
        // ちょこん
        '<circle cx="100" cy="16" r="4" fill="#c62828"/>';
    }
  },
  {
    id: 'crown_gold', name: '王冠', category: 'headwear', price: 200, isDefault: false,
    getSVG: function() {
      return '<rect x="72" y="32" width="56" height="18" rx="2" fill="#ffd54f"/>' +
        '<polygon points="72,32 66,14 82,26" fill="#ffd54f"/>' +
        '<polygon points="100,32 100,8 100,32" fill="#ffd54f"/>' +
        '<polygon points="100,32 94,10 106,10" fill="#ffd54f"/>' +
        '<polygon points="128,32 134,14 118,26" fill="#ffd54f"/>' +
        // 宝石
        '<circle cx="82" cy="38" r="3" fill="#e53935"/>' +
        '<circle cx="100" cy="38" r="3" fill="#1e88e5"/>' +
        '<circle cx="118" cy="38" r="3" fill="#43a047"/>' +
        // 縁
        '<rect x="70" y="48" width="60" height="4" rx="2" fill="#ffb300"/>';
    }
  },
  {
    id: 'hat_wizard', name: '魔法使い帽子', category: 'headwear', price: 250, isDefault: false,
    getSVG: function() {
      return '<ellipse cx="100" cy="42" rx="50" ry="12" fill="#7b1fa2"/>' +
        '<path d="M60,42 Q70,10 100,-20 Q130,10 140,42 Z" fill="#9c27b0"/>' +
        // 帯
        '<path d="M62,40 Q100,50 138,40 Q100,54 62,40 Z" fill="#ffd54f"/>' +
        // 星
        '<polygon points="115,10 117,16 123,16 118,20 120,26 115,22 110,26 112,20 107,16 113,16" fill="#ffd54f"/>';
    }
  },

  // ========== ACCESSORY ==========
  {
    id: 'sunglasses', name: 'サングラス', category: 'accessory', price: 30, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<rect x="66" y="76" width="26" height="18" rx="4" fill="#333" opacity="0.85"/>' +
        '<rect x="108" y="76" width="26" height="18" rx="4" fill="#333" opacity="0.85"/>' +
        '<line x1="92" y1="82" x2="108" y2="82" stroke="#333" stroke-width="2"/>' +
        '<line x1="66" y1="82" x2="56" y2="78" stroke="#333" stroke-width="2"/>' +
        '<line x1="134" y1="82" x2="144" y2="78" stroke="#333" stroke-width="2"/>';
    }
  },
  {
    id: 'bowtie_red', name: '蝶ネクタイ', category: 'accessory', price: 40, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<polygon points="84,140 100,146 84,152" fill="#e53935"/>' +
        '<polygon points="116,140 100,146 116,152" fill="#e53935"/>' +
        '<circle cx="100" cy="146" r="4" fill="#c62828"/>';
    }
  },
  {
    id: 'scarf_warm', name: 'マフラー', category: 'accessory', price: 60, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<path d="M70,126 Q100,140 130,126 Q134,130 130,134 Q100,148 70,134 Q66,130 70,126 Z" fill="#ff7043"/>' +
        // 垂れ下がり部分
        '<rect x="120" y="130" width="14" height="40" rx="4" fill="#ff7043"/>' +
        '<line x1="120" y1="168" x2="134" y2="168" stroke="#e64a19" stroke-width="1.5"/>' +
        '<line x1="120" y1="164" x2="134" y2="164" stroke="#e64a19" stroke-width="1.5"/>';
    }
  },
  {
    id: 'wings_angel', name: '天使の翼', category: 'accessory', price: 300, isDefault: false, layer: 'back',
    getSVG: function() {
      return '<path d="M68,150 Q30,120 28,160 Q30,190 68,185 Z" fill="#e3f2fd" stroke="#90caf9" stroke-width="1"/>' +
        '<path d="M64,155 Q36,130 34,155 Q36,180 64,178 Z" fill="#bbdefb" stroke="#90caf9" stroke-width="0.5"/>' +
        '<path d="M132,150 Q170,120 172,160 Q170,190 132,185 Z" fill="#e3f2fd" stroke="#90caf9" stroke-width="1"/>' +
        '<path d="M136,155 Q164,130 166,155 Q164,180 136,178 Z" fill="#bbdefb" stroke="#90caf9" stroke-width="0.5"/>';
    }
  },

  // ========== SHOES ==========
  {
    id: 'sneakers_white', name: 'スニーカー', category: 'shoes', price: 0, isDefault: true,
    getSVG: function() {
      return '<ellipse cx="87" cy="264" rx="16" ry="7" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        '<rect x="75" y="258" width="24" height="8" rx="4" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        '<rect x="101" y="258" width="24" height="8" rx="4" fill="#fff" stroke="#ddd" stroke-width="1"/>' +
        // ライン
        '<line x1="78" y1="262" x2="96" y2="262" stroke="#1e88e5" stroke-width="1.5"/>' +
        '<line x1="104" y1="262" x2="122" y2="262" stroke="#1e88e5" stroke-width="1.5"/>';
    }
  },
  {
    id: 'sneakers_red', name: '赤スニーカー', category: 'shoes', price: 15, isDefault: false,
    getSVG: function() {
      return '<ellipse cx="87" cy="264" rx="16" ry="7" fill="#e53935"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="#e53935"/>' +
        '<rect x="75" y="258" width="24" height="8" rx="4" fill="#e53935"/>' +
        '<rect x="101" y="258" width="24" height="8" rx="4" fill="#e53935"/>' +
        '<line x1="78" y1="262" x2="96" y2="262" stroke="#fff" stroke-width="1.5"/>' +
        '<line x1="104" y1="262" x2="122" y2="262" stroke="#fff" stroke-width="1.5"/>';
    }
  },
  {
    id: 'boots_brown', name: 'ブーツ', category: 'shoes', price: 70, isDefault: false,
    getSVG: function() {
      return '<rect x="74" y="242" width="22" height="22" rx="4" fill="#5d4037"/>' +
        '<rect x="104" y="242" width="22" height="22" rx="4" fill="#5d4037"/>' +
        '<ellipse cx="85" cy="266" rx="16" ry="6" fill="#4e342e"/>' +
        '<ellipse cx="115" cy="266" rx="16" ry="6" fill="#4e342e"/>' +
        // バックル
        '<rect x="80" y="248" width="12" height="4" rx="1" fill="#ffd54f"/>' +
        '<rect x="110" y="248" width="12" height="4" rx="1" fill="#ffd54f"/>';
    }
  },
  {
    id: 'loafers_brown', name: 'ローファー', category: 'shoes', price: 50, isDefault: false,
    getSVG: function() {
      return '<ellipse cx="87" cy="264" rx="16" ry="7" fill="#6d4c41"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="#6d4c41"/>' +
        '<rect x="77" y="258" width="20" height="8" rx="4" fill="#795548"/>' +
        '<rect x="103" y="258" width="20" height="8" rx="4" fill="#795548"/>' +
        // タッセル
        '<circle cx="87" cy="260" r="3" fill="#5d4037"/>' +
        '<circle cx="113" cy="260" r="3" fill="#5d4037"/>';
    }
  }
];
