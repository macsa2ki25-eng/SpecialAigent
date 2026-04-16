// ===== アバター アイテムカタログ =====
// 各アイテムは getSVG() で SVG パーツを返す
window.AVATAR_ITEMS = [

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
