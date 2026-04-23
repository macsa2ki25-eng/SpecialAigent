// ===== アバター アイテムカタログ =====
// 各アイテムは getSVG() で SVG パーツを返す
window.AVATAR_ITEMS = [

  // ========== HAIR ==========
  {
    id: 'hair_short_dark', name: 'ショートヘア', category: 'hair', price: 0, isDefault: true,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_short_dark-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#6D4C41"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_short_dark-g)"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="#3E2723"/>' +
        '<path d="M50,76 L50,90 Q52,95 58,94 L58,80 Z" fill="#4A2C17"/>' +
        '<path d="M150,76 L150,90 Q148,95 142,94 L142,80 Z" fill="#4A2C17"/>' +
        '<path d="M72,32 Q80,26 88,30" stroke="#8D6E63" stroke-width="1.2" fill="none" opacity="0.7" stroke-linecap="round"/>' +
        '<path d="M110,28 Q118,24 126,30" stroke="#8D6E63" stroke-width="1.2" fill="none" opacity="0.7" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_long_dark', name: 'ロングヘア', category: 'hair', price: 0, isDefault: true,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_long_dark-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#5D4037"/><stop offset="100%" stop-color="#2E1A0F"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_long_dark-g)"/>' +
        '<path d="M50,80 Q42,150 46,210 L62,210 Q58,150 58,84 Z" fill="url(#hair_long_dark-g)"/>' +
        '<path d="M150,80 Q158,150 154,210 L138,210 Q142,150 142,84 Z" fill="url(#hair_long_dark-g)"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="#3E2723"/>' +
        '<path d="M52,100 Q50,150 53,200" stroke="#6D4C41" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M148,100 Q150,150 147,200" stroke="#6D4C41" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M76,30 Q84,24 92,30" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.6" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_bob', name: 'ボブヘア', category: 'hair', price: 25,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_bob-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#5D4037"/><stop offset="100%" stop-color="#1B0F0A"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_bob-g)"/>' +
        '<path d="M50,80 L50,120 Q52,128 60,128 L60,84 Z" fill="#3E2723"/>' +
        '<path d="M150,80 L150,120 Q148,128 140,128 L140,84 Z" fill="#3E2723"/>' +
        '<path d="M60,122 Q100,132 140,122 L140,128 Q100,138 60,128 Z" fill="#2E1A0F"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="#3E2723"/>' +
        '<path d="M70,40 Q80,32 92,38" stroke="#8D6E63" stroke-width="1.2" fill="none" opacity="0.6" stroke-linecap="round"/>' +
        '<path d="M108,38 Q120,32 130,40" stroke="#8D6E63" stroke-width="1.2" fill="none" opacity="0.6" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_medium', name: 'ミディアムヘア', category: 'hair', price: 20,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_medium-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#795548"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_medium-g)"/>' +
        '<path d="M50,80 Q44,130 48,158 L62,158 Q58,130 58,84 Z" fill="url(#hair_medium-g)"/>' +
        '<path d="M150,80 Q156,130 152,158 L138,158 Q142,130 142,84 Z" fill="url(#hair_medium-g)"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="#4E342E"/>' +
        '<path d="M52,110 Q54,135 55,155" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M148,110 Q146,135 145,155" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M74,32 Q82,26 90,32" stroke="#A1887F" stroke-width="1.2" fill="none" opacity="0.7" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_twin_dark', name: 'ツインテール', category: 'hair', price: 30,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_twin_dark-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#6D4C41"/><stop offset="100%" stop-color="#2E1A0F"/>' +
        '</linearGradient>' +
        '<radialGradient id="hair_twin_dark-rib" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#F48FB1"/><stop offset="100%" stop-color="#C2185B"/>' +
        '</radialGradient></defs>' +
        '<path d="M52,78 Q52,26 100,22 Q148,26 148,78 Q146,66 100,62 Q54,66 52,78 Z" fill="url(#hair_twin_dark-g)"/>' +
        '<path d="M62,74 Q72,54 100,52 Q128,54 138,74 L136,68 Q126,50 100,48 Q74,50 64,68 Z" fill="#4A2C17"/>' +
        '<circle cx="58" cy="90" r="9" fill="url(#hair_twin_dark-g)"/>' +
        '<circle cx="142" cy="90" r="9" fill="url(#hair_twin_dark-g)"/>' +
        '<path d="M52,92 Q36,135 38,178 Q40,202 52,207 Q62,202 64,178 Q66,135 66,92 Z" fill="url(#hair_twin_dark-g)"/>' +
        '<path d="M148,92 Q164,135 162,178 Q160,202 148,207 Q138,202 136,178 Q134,135 134,92 Z" fill="url(#hair_twin_dark-g)"/>' +
        '<path d="M44,120 Q42,160 45,195" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M156,120 Q158,160 155,195" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<circle cx="58" cy="90" r="6" fill="url(#hair_twin_dark-rib)"/>' +
        '<circle cx="142" cy="90" r="6" fill="url(#hair_twin_dark-rib)"/>' +
        '<circle cx="56" cy="88" r="1.5" fill="#fff" opacity="0.7"/>' +
        '<circle cx="140" cy="88" r="1.5" fill="#fff" opacity="0.7"/>';
    }
  },
  {
    id: 'hair_ponytail', name: 'ポニーテール', category: 'hair', price: 30,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_ponytail-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#795548"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<path d="M52,80 Q52,26 100,22 Q148,26 148,80 Q146,70 100,66 Q54,70 52,80 Z" fill="url(#hair_ponytail-g)"/>' +
        '<path d="M90,26 Q88,10 100,6 Q112,10 110,26 Z" fill="url(#hair_ponytail-g)"/>' +
        '<path d="M88,22 Q84,52 90,90 L110,90 Q116,52 112,22 Z" fill="#4A2C17"/>' +
        '<ellipse cx="100" cy="90" rx="8" ry="5" fill="#FDD835"/>' +
        '<ellipse cx="100" cy="88" rx="5" ry="2" fill="#FFEB3B" opacity="0.6"/>' +
        '<path d="M52,80 L52,102 Q54,108 60,106 L60,86 Z" fill="url(#hair_ponytail-g)"/>' +
        '<path d="M148,80 L148,102 Q146,108 140,106 L140,86 Z" fill="url(#hair_ponytail-g)"/>' +
        '<path d="M62,74 Q74,56 100,54 Q126,56 138,74 L136,68 Q124,50 100,48 Q76,50 64,68 Z" fill="#5D4037"/>' +
        '<path d="M94,40 Q100,34 106,40" stroke="#A1887F" stroke-width="1.2" fill="none" opacity="0.5" stroke-linecap="round"/>';
    }
  },
  {
    id: 'hair_short_blonde', name: '金髪ショート', category: 'hair', price: 50,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_short_blonde-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF176"/><stop offset="60%" stop-color="#FFCA28"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_short_blonde-g)"/>' +
        '<path d="M60,74 Q72,54 100,52 Q128,54 140,74 L138,68 Q126,48 100,46 Q74,48 62,68 Z" fill="#FFB300"/>' +
        '<path d="M50,76 L50,90 Q52,95 58,94 L58,80 Z" fill="#F9A825"/>' +
        '<path d="M150,76 L150,90 Q148,95 142,94 L142,80 Z" fill="#F9A825"/>' +
        '<path d="M68,32 Q78,22 90,30" stroke="#FFF9C4" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.9"/>' +
        '<path d="M108,28 Q120,22 130,32" stroke="#FFF9C4" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.9"/>' +
        '<polygon points="78,36 80,40 84,38 81,42 83,46 78,43 74,46 76,42 73,38 77,39" fill="#FFFDE7" opacity="0.85"/>' +
        '<circle cx="124" cy="44" r="1.2" fill="#FFFDE7"/>';
    }
  },
  {
    id: 'hair_long_pink', name: 'ピンクロング', category: 'hair', price: 80,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_long_pink-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#F8BBD0"/><stop offset="50%" stop-color="#F06292"/><stop offset="100%" stop-color="#AD1457"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_long_pink-g)"/>' +
        '<path d="M50,80 Q42,150 46,210 L62,210 Q58,150 58,84 Z" fill="url(#hair_long_pink-g)"/>' +
        '<path d="M150,80 Q158,150 154,210 L138,210 Q142,150 142,84 Z" fill="url(#hair_long_pink-g)"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="#EC407A"/>' +
        '<path d="M52,100 Q52,160 54,205" stroke="#FCE4EC" stroke-width="1.5" fill="none" opacity="0.6"/>' +
        '<path d="M148,100 Q148,160 146,205" stroke="#FCE4EC" stroke-width="1.5" fill="none" opacity="0.6"/>' +
        '<path d="M72,30 Q78,26 82,32" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.85"/>' +
        '<path d="M90,24 Q96,20 100,24" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.85"/>' +
        '<polygon points="115,38 117,42 121,42 118,45 119,49 115,46 111,49 112,45 109,42 113,42" fill="#FCE4EC" opacity="0.9"/>';
    }
  },
  {
    id: 'hair_ponytail_silver', name: 'シルバーポニテ', category: 'hair', price: 70,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_ponytail_silver-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#ECEFF1"/><stop offset="50%" stop-color="#B0BEC5"/><stop offset="100%" stop-color="#546E7A"/>' +
        '</linearGradient></defs>' +
        '<path d="M52,80 Q52,26 100,22 Q148,26 148,80 Q146,70 100,66 Q54,70 52,80 Z" fill="url(#hair_ponytail_silver-g)"/>' +
        '<path d="M90,26 Q88,10 100,6 Q112,10 110,26 Z" fill="url(#hair_ponytail_silver-g)"/>' +
        '<path d="M88,22 Q84,52 90,90 L110,90 Q116,52 112,22 Z" fill="url(#hair_ponytail_silver-g)"/>' +
        '<ellipse cx="100" cy="90" rx="8" ry="5" fill="#E1F5FE"/>' +
        '<ellipse cx="100" cy="88" rx="5" ry="2" fill="#ffffff" opacity="0.7"/>' +
        '<path d="M52,80 L52,102 Q54,108 60,106 L60,86 Z" fill="url(#hair_ponytail_silver-g)"/>' +
        '<path d="M148,80 L148,102 Q146,108 140,106 L140,86 Z" fill="url(#hair_ponytail_silver-g)"/>' +
        '<path d="M62,74 Q74,56 100,54 Q126,56 138,74 L136,68 Q124,50 100,48 Q76,50 64,68 Z" fill="#90A4AE"/>' +
        '<path d="M78,28 Q86,22 94,28" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.9" stroke-linecap="round"/>' +
        '<path d="M92,40 Q96,30 100,38" stroke="#FFFFFF" stroke-width="1" fill="none" opacity="0.8"/>';
    }
  },
  {
    id: 'hair_long_red', name: '赤ロング', category: 'hair', price: 90,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_long_red-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FF7043"/><stop offset="50%" stop-color="#E53935"/><stop offset="100%" stop-color="#880E4F"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_long_red-g)"/>' +
        '<path d="M50,80 Q42,150 46,210 L62,210 Q58,150 58,84 Z" fill="url(#hair_long_red-g)"/>' +
        '<path d="M150,80 Q158,150 154,210 L138,210 Q142,150 142,84 Z" fill="url(#hair_long_red-g)"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="#C62828"/>' +
        '<path d="M52,100 Q52,160 54,205" stroke="#FFAB91" stroke-width="1.3" fill="none" opacity="0.6"/>' +
        '<path d="M148,100 Q148,160 146,205" stroke="#FFAB91" stroke-width="1.3" fill="none" opacity="0.6"/>' +
        '<path d="M72,30 Q78,26 82,32" stroke="#FFCCBC" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8"/>' +
        '<path d="M90,28 Q96,22 104,30" stroke="#FFCCBC" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8"/>';
    }
  },
  {
    id: 'hair_rainbow', name: '虹色ヘア', category: 'hair', price: 300,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hair_rainbow-g" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#E53935"/>' +
          '<stop offset="20%" stop-color="#FB8C00"/>' +
          '<stop offset="40%" stop-color="#FDD835"/>' +
          '<stop offset="60%" stop-color="#43A047"/>' +
          '<stop offset="80%" stop-color="#1E88E5"/>' +
          '<stop offset="100%" stop-color="#8E24AA"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q50,24 100,20 Q150,24 150,78 Q148,64 100,60 Q52,64 50,78 Z" fill="url(#hair_rainbow-g)"/>' +
        '<path d="M50,80 Q42,140 46,200 L62,200 Q58,140 58,84 Z" fill="url(#hair_rainbow-g)"/>' +
        '<path d="M150,80 Q158,140 154,200 L138,200 Q142,140 142,84 Z" fill="url(#hair_rainbow-g)"/>' +
        '<path d="M58,76 Q70,52 100,50 Q130,52 142,76 L140,70 Q128,46 100,44 Q72,46 60,70 Z" fill="url(#hair_rainbow-g)" opacity="0.85"/>' +
        '<polygon points="70,34 72,38 76,38 73,41 74,45 70,42 66,45 67,41 64,38 68,38" fill="#ffffff" opacity="0.9"/>' +
        '<polygon points="128,30 130,34 134,34 131,37 132,41 128,38 124,41 125,37 122,34 126,34" fill="#ffffff" opacity="0.9"/>' +
        '<circle cx="100" cy="32" r="2" fill="#ffffff" opacity="0.9"/>' +
        '<circle cx="85" cy="45" r="1.5" fill="#FFF9C4" opacity="0.85"/>' +
        '<circle cx="115" cy="47" r="1.5" fill="#FFF9C4" opacity="0.85"/>';
    }
  },

  // ========== TOPS ==========
  {
    id: 'tshirt_white', name: '白Tシャツ', category: 'tops', price: 0, isDefault: true,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="tshirt_white-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#E0E0E0"/>' +
        '</linearGradient></defs>' +
        '<rect x="68" y="140" width="64" height="52" rx="8" fill="url(#tshirt_white-g)" stroke="#bdbdbd" stroke-width="0.8"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="url(#tshirt_white-g)" stroke="#bdbdbd" stroke-width="0.8"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="url(#tshirt_white-g)" stroke="#bdbdbd" stroke-width="0.8"/>' +
        '<path d="M82,140 Q100,150 118,140" stroke="#bdbdbd" stroke-width="1.2" fill="none"/>' +
        '<path d="M84,143 Q100,150 116,143" stroke="#ffffff" stroke-width="0.6" fill="none" opacity="0.9"/>' +
        '<path d="M74,152 L74,185" stroke="#eeeeee" stroke-width="1" fill="none" opacity="0.7"/>' +
        '<path d="M126,152 L126,185" stroke="#eeeeee" stroke-width="1" fill="none" opacity="0.7"/>' +
        '<path d="M78,170 Q100,175 122,170" stroke="#eeeeee" stroke-width="0.7" fill="none" opacity="0.6"/>';
    }
  },
  {
    id: 'tshirt_red', name: '赤Tシャツ', category: 'tops', price: 15, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="tshirt_red-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#B71C1C"/>' +
        '</linearGradient></defs>' +
        '<rect x="68" y="140" width="64" height="52" rx="8" fill="url(#tshirt_red-g)"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="url(#tshirt_red-g)"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="url(#tshirt_red-g)"/>' +
        '<path d="M74,148 L76,185" stroke="#FFCDD2" stroke-width="1.2" fill="none" opacity="0.45"/>' +
        '<path d="M82,140 Q100,150 118,140" stroke="#7F0000" stroke-width="1.5" fill="none"/>' +
        '<path d="M85,143 Q100,150 115,143" stroke="#FFCDD2" stroke-width="0.8" fill="none" opacity="0.7"/>' +
        '<path d="M80,170 Q100,174 120,170" stroke="#7F0000" stroke-width="0.7" fill="none" opacity="0.4"/>';
    }
  },
  {
    id: 'tshirt_blue', name: '青Tシャツ', category: 'tops', price: 15, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="tshirt_blue-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#42A5F5"/><stop offset="100%" stop-color="#0D47A1"/>' +
        '</linearGradient></defs>' +
        '<rect x="68" y="140" width="64" height="52" rx="8" fill="url(#tshirt_blue-g)"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="url(#tshirt_blue-g)"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="url(#tshirt_blue-g)"/>' +
        '<path d="M74,148 L76,185" stroke="#BBDEFB" stroke-width="1.2" fill="none" opacity="0.45"/>' +
        '<path d="M82,140 Q100,150 118,140" stroke="#002171" stroke-width="1.5" fill="none"/>' +
        '<path d="M85,143 Q100,150 115,143" stroke="#BBDEFB" stroke-width="0.8" fill="none" opacity="0.7"/>' +
        '<path d="M80,170 Q100,174 120,170" stroke="#002171" stroke-width="0.7" fill="none" opacity="0.4"/>';
    }
  },
  {
    id: 'hoodie_navy', name: 'ネイビーパーカー', category: 'tops', price: 80, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hoodie_navy-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#3949AB"/><stop offset="100%" stop-color="#0D1454"/>' +
        '</linearGradient>' +
        '<linearGradient id="hoodie_navy-h" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#283593"/><stop offset="100%" stop-color="#1A237E"/>' +
        '</linearGradient></defs>' +
        '<rect x="64" y="138" width="72" height="58" rx="10" fill="url(#hoodie_navy-g)"/>' +
        '<rect x="48" y="142" width="24" height="42" rx="12" fill="url(#hoodie_navy-g)"/>' +
        '<rect x="128" y="142" width="24" height="42" rx="12" fill="url(#hoodie_navy-g)"/>' +
        '<path d="M76,138 Q100,126 124,138 Q130,124 100,116 Q70,124 76,138 Z" fill="url(#hoodie_navy-h)"/>' +
        '<path d="M78,138 Q100,128 122,138" stroke="#5C6BC0" stroke-width="0.8" fill="none" opacity="0.7"/>' +
        '<rect x="78" y="172" width="44" height="14" rx="4" fill="#1A237E"/>' +
        '<path d="M80,174 L120,174" stroke="#5C6BC0" stroke-width="0.7" opacity="0.6"/>' +
        '<line x1="94" y1="138" x2="92" y2="158" stroke="#FAFAFA" stroke-width="1.8" stroke-linecap="round"/>' +
        '<line x1="106" y1="138" x2="108" y2="158" stroke="#FAFAFA" stroke-width="1.8" stroke-linecap="round"/>' +
        '<circle cx="92" cy="158" r="1.8" fill="#FFEB3B"/>' +
        '<circle cx="108" cy="158" r="1.8" fill="#FFEB3B"/>';
    }
  },
  {
    id: 'jacket_leather', name: 'レザージャケット', category: 'tops', price: 100, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="jacket_leather-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#6D4C41"/><stop offset="100%" stop-color="#1B0F0A"/>' +
        '</linearGradient></defs>' +
        '<rect x="64" y="138" width="72" height="56" rx="8" fill="url(#jacket_leather-g)"/>' +
        '<rect x="48" y="142" width="24" height="40" rx="12" fill="url(#jacket_leather-g)"/>' +
        '<rect x="128" y="142" width="24" height="40" rx="12" fill="url(#jacket_leather-g)"/>' +
        '<path d="M68,144 Q68,170 70,190" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.7"/>' +
        '<path d="M132,144 Q132,170 130,190" stroke="#8D6E63" stroke-width="1" fill="none" opacity="0.7"/>' +
        '<line x1="100" y1="140" x2="100" y2="192" stroke="#FFC107" stroke-width="2.2"/>' +
        '<line x1="100" y1="140" x2="100" y2="192" stroke="#FFF59D" stroke-width="0.6" opacity="0.8"/>' +
        '<path d="M82,138 L92,150 L100,142 L108,150 L118,138" fill="#3E2723" stroke="#1B0F0A" stroke-width="0.8"/>' +
        '<path d="M85,140 L92,148" stroke="#8D6E63" stroke-width="0.6" opacity="0.5"/>' +
        '<line x1="72" y1="168" x2="92" y2="168" stroke="#1B0F0A" stroke-width="1.8"/>' +
        '<line x1="72" y1="170" x2="92" y2="170" stroke="#8D6E63" stroke-width="0.5" opacity="0.6"/>' +
        '<line x1="108" y1="168" x2="128" y2="168" stroke="#1B0F0A" stroke-width="1.8"/>' +
        '<line x1="108" y1="170" x2="128" y2="170" stroke="#8D6E63" stroke-width="0.5" opacity="0.6"/>' +
        '<circle cx="96" cy="160" r="1.2" fill="#FFC107"/>' +
        '<circle cx="104" cy="180" r="1.2" fill="#FFC107"/>';
    }
  },
  {
    id: 'sailor_top', name: 'セーラー服', category: 'tops', price: 100, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="sailor_top-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#E0E0E0"/>' +
        '</linearGradient>' +
        '<linearGradient id="sailor_top-c" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#1976D2"/><stop offset="100%" stop-color="#0D47A1"/>' +
        '</linearGradient></defs>' +
        '<rect x="68" y="140" width="64" height="52" rx="8" fill="url(#sailor_top-g)"/>' +
        '<rect x="52" y="144" width="20" height="32" rx="10" fill="url(#sailor_top-g)"/>' +
        '<rect x="128" y="144" width="20" height="32" rx="10" fill="url(#sailor_top-g)"/>' +
        '<path d="M72,140 L100,165 L128,140 L130,145 L100,172 L70,145 Z" fill="url(#sailor_top-c)"/>' +
        '<path d="M76,144 L100,166 L124,144" stroke="#ffffff" stroke-width="1.5" fill="none"/>' +
        '<path d="M78,147 L100,169 L122,147" stroke="#ffffff" stroke-width="0.6" fill="none" opacity="0.7"/>' +
        '<line x1="56" y1="168" x2="68" y2="168" stroke="url(#sailor_top-c)" stroke-width="2"/>' +
        '<line x1="132" y1="168" x2="144" y2="168" stroke="url(#sailor_top-c)" stroke-width="2"/>' +
        '<polygon points="96,152 100,160 104,152 100,147" fill="#E53935"/>' +
        '<polygon points="97,150 100,156 103,150 100,148" fill="#FFCDD2" opacity="0.7"/>' +
        '<circle cx="100" cy="153" r="1" fill="#B71C1C"/>';
    }
  },
  {
    id: 'robe_wizard', name: '魔法使いローブ', category: 'tops', price: 300, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="robe_wizard-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#AB47BC"/><stop offset="100%" stop-color="#4A148C"/>' +
        '</linearGradient>' +
        '<radialGradient id="robe_wizard-star" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#F9A825"/>' +
        '</radialGradient></defs>' +
        '<path d="M58,136 L58,210 Q58,215 64,215 L136,215 Q142,215 142,210 L142,136 Q130,128 100,126 Q70,128 58,136 Z" fill="url(#robe_wizard-g)"/>' +
        '<rect x="44" y="140" width="24" height="52" rx="12" fill="url(#robe_wizard-g)"/>' +
        '<rect x="132" y="140" width="24" height="52" rx="12" fill="url(#robe_wizard-g)"/>' +
        '<path d="M66,140 Q68,170 72,205" stroke="#CE93D8" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M134,140 Q132,170 128,205" stroke="#CE93D8" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<polygon points="100,150 104,160 115,161 106,168 109,178 100,172 91,178 94,168 85,161 96,160" fill="url(#robe_wizard-star)" stroke="#F57F17" stroke-width="0.5"/>' +
        '<circle cx="100" cy="163" r="2" fill="#FFFDE7"/>' +
        '<circle cx="75" cy="190" r="1.5" fill="#FFF59D" opacity="0.85"/>' +
        '<circle cx="125" cy="195" r="1.2" fill="#FFF59D" opacity="0.85"/>' +
        '<polygon points="82,185 83,188 86,188 84,190 85,193 82,191 79,193 80,190 78,188 81,188" fill="#FFF59D" opacity="0.8"/>' +
        '<polygon points="120,145 121,148 124,148 122,150 123,153 120,151 117,153 118,150 116,148 119,148" fill="#FFF59D" opacity="0.8"/>' +
        '<path d="M58,136 Q70,128 100,126 Q130,128 142,136" stroke="#E1BEE7" stroke-width="2" fill="none"/>' +
        '<line x1="58" y1="210" x2="142" y2="210" stroke="#E1BEE7" stroke-width="1.8"/>';
    }
  },
  {
    id: 'kimono_red', name: '着物', category: 'tops', price: 250, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="kimono_red-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#7F0000"/>' +
        '</linearGradient>' +
        '<linearGradient id="kimono_red-obi" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFEE58"/><stop offset="100%" stop-color="#F9A825"/>' +
        '</linearGradient></defs>' +
        '<path d="M62,136 L62,212 L138,212 L138,136 Q120,130 100,130 Q80,130 62,136 Z" fill="url(#kimono_red-g)"/>' +
        '<rect x="48" y="140" width="22" height="46" rx="11" fill="url(#kimono_red-g)"/>' +
        '<rect x="130" y="140" width="22" height="46" rx="11" fill="url(#kimono_red-g)"/>' +
        '<path d="M90,136 L100,190 L110,136" fill="#FF8A65"/>' +
        '<path d="M92,138 L100,186 L108,138" stroke="#FFCCBC" stroke-width="0.7" fill="none" opacity="0.7"/>' +
        '<rect x="62" y="175" width="76" height="16" rx="3" fill="url(#kimono_red-obi)"/>' +
        '<rect x="62" y="176" width="76" height="3" rx="1" fill="#FFF59D" opacity="0.8"/>' +
        '<rect x="92" y="172" width="16" height="22" rx="4" fill="#FFB300"/>' +
        '<rect x="94" y="174" width="12" height="3" rx="1" fill="#FFECB3"/>' +
        '<g opacity="0.85">' +
          '<circle cx="76" cy="155" r="4" fill="#FFCDD2"/>' +
          '<circle cx="76" cy="155" r="1.5" fill="#FFF59D"/>' +
          '<circle cx="124" cy="160" r="3" fill="#FFCDD2"/>' +
          '<circle cx="124" cy="160" r="1.2" fill="#FFF59D"/>' +
          '<circle cx="80" cy="200" r="3" fill="#FFCDD2"/>' +
          '<circle cx="80" cy="200" r="1.2" fill="#FFF59D"/>' +
          '<circle cx="120" cy="203" r="2.5" fill="#FFCDD2"/>' +
        '</g>';
    }
  },
  {
    id: 'jersey_sports', name: 'ジャージ', category: 'tops', price: 40, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="jersey_sports-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#66BB6A"/><stop offset="100%" stop-color="#1B5E20"/>' +
        '</linearGradient></defs>' +
        '<rect x="66" y="138" width="68" height="54" rx="8" fill="url(#jersey_sports-g)"/>' +
        '<rect x="50" y="142" width="22" height="38" rx="11" fill="url(#jersey_sports-g)"/>' +
        '<rect x="128" y="142" width="22" height="38" rx="11" fill="url(#jersey_sports-g)"/>' +
        '<rect x="50" y="156" width="22" height="4" fill="#ffffff"/>' +
        '<rect x="128" y="156" width="22" height="4" fill="#ffffff"/>' +
        '<path d="M80,138 Q100,148 120,138" stroke="#ffffff" stroke-width="1.5" fill="none"/>' +
        '<text x="100" y="175" font-family="Arial Black" font-size="22" font-weight="900" text-anchor="middle" fill="#ffffff" stroke="#1B5E20" stroke-width="0.6">7</text>';
    }
  },
  {
    id: 'cape_hero', name: '勇者マント', category: 'tops', price: 400, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="cape_hero-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#880E4F"/>' +
        '</linearGradient>' +
        '<linearGradient id="cape_hero-gold" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF176"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<path d="M56,140 Q44,180 48,230 Q60,245 100,245 Q140,245 152,230 Q156,180 144,140 Q120,150 100,150 Q80,150 56,140 Z" fill="url(#cape_hero-g)"/>' +
        '<path d="M60,150 Q54,190 58,225" stroke="#FFCDD2" stroke-width="0.8" fill="none" opacity="0.4"/>' +
        '<path d="M140,150 Q146,190 142,225" stroke="#FFCDD2" stroke-width="0.8" fill="none" opacity="0.4"/>' +
        '<path d="M80,165 Q78,200 82,230" stroke="#7F0000" stroke-width="0.8" fill="none" opacity="0.5"/>' +
        '<path d="M120,165 Q122,200 118,230" stroke="#7F0000" stroke-width="0.8" fill="none" opacity="0.5"/>' +
        '<rect x="68" y="140" width="64" height="52" rx="8" fill="url(#cape_hero-g)"/>' +
        '<path d="M78,140 Q100,148 122,140" stroke="url(#cape_hero-gold)" stroke-width="3" fill="none"/>' +
        '<circle cx="100" cy="144" r="4" fill="url(#cape_hero-gold)"/>' +
        '<circle cx="100" cy="144" r="2" fill="#F57F17"/>' +
        '<rect x="56" y="138" width="4" height="6" fill="url(#cape_hero-gold)"/>' +
        '<rect x="140" y="138" width="4" height="6" fill="url(#cape_hero-gold)"/>';
    }
  },
  {
    id: 'tuxedo_black', name: '黒タキシード', category: 'tops', price: 500, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="tuxedo_black-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#424242"/><stop offset="100%" stop-color="#0A0A0A"/>' +
        '</linearGradient>' +
        '<linearGradient id="tuxedo_black-satin" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#212121"/><stop offset="50%" stop-color="#616161"/><stop offset="100%" stop-color="#212121"/>' +
        '</linearGradient></defs>' +
        '<rect x="64" y="138" width="72" height="58" rx="6" fill="url(#tuxedo_black-g)"/>' +
        '<rect x="48" y="142" width="24" height="44" rx="12" fill="url(#tuxedo_black-g)"/>' +
        '<rect x="128" y="142" width="24" height="44" rx="12" fill="url(#tuxedo_black-g)"/>' +
        '<path d="M72,138 L94,152 L100,192 L106,152 L128,138 L128,160 L108,170 L100,200 L92,170 L72,160 Z" fill="url(#tuxedo_black-satin)"/>' +
        '<rect x="96" y="140" width="8" height="56" fill="#ffffff"/>' +
        '<polygon points="92,142 100,150 108,142 104,148 100,154 96,148" fill="#212121"/>' +
        '<circle cx="100" cy="160" r="1.5" fill="#212121"/>' +
        '<circle cx="100" cy="175" r="1.5" fill="#212121"/>' +
        '<circle cx="100" cy="188" r="1.5" fill="#212121"/>' +
        '<rect x="75" y="172" width="14" height="2" rx="1" fill="#ffffff" opacity="0.3"/>' +
        '<rect x="111" y="172" width="14" height="2" rx="1" fill="#ffffff" opacity="0.3"/>';
    }
  },
  {
    id: 'dress_princess', name: 'プリンセスドレス', category: 'tops', price: 800, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="dress_princess-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#F8BBD0"/><stop offset="60%" stop-color="#F06292"/><stop offset="100%" stop-color="#AD1457"/>' +
        '</linearGradient>' +
        '<linearGradient id="dress_princess-sh" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.2"/>' +
        '</linearGradient></defs>' +
        '<path d="M56,195 Q40,250 48,265 L152,265 Q160,250 144,195 Q120,205 100,205 Q80,205 56,195 Z" fill="url(#dress_princess-g)"/>' +
        '<path d="M60,210 Q48,240 56,260 L144,260 Q152,240 140,210" stroke="#FCE4EC" stroke-width="0.8" fill="none" opacity="0.7"/>' +
        '<path d="M64,225 Q52,250 60,262" stroke="#FCE4EC" stroke-width="0.6" fill="none" opacity="0.5"/>' +
        '<path d="M136,225 Q148,250 140,262" stroke="#FCE4EC" stroke-width="0.6" fill="none" opacity="0.5"/>' +
        '<rect x="66" y="138" width="68" height="58" rx="10" fill="url(#dress_princess-g)"/>' +
        '<path d="M66,196 Q100,205 134,196" stroke="#FCE4EC" stroke-width="2" fill="none"/>' +
        '<path d="M68,140 Q100,155 132,140" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.9"/>' +
        '<path d="M66,138 Q70,160 68,192" fill="url(#dress_princess-sh)" opacity="0.5"/>' +
        '<g fill="#FFFFFF">' +
          '<polygon points="84,160 85,163 88,163 86,165 87,168 84,166 81,168 82,165 80,163 83,163" opacity="0.95"/>' +
          '<polygon points="116,170 117,173 120,173 118,175 119,178 116,176 113,178 114,175 112,173 115,173" opacity="0.95"/>' +
          '<polygon points="100,180 101,183 104,183 102,185 103,188 100,186 97,188 98,185 96,183 99,183" opacity="0.95"/>' +
          '<circle cx="75" cy="175" r="1" opacity="0.9"/>' +
          '<circle cx="125" cy="155" r="1" opacity="0.9"/>' +
          '<circle cx="90" cy="150" r="0.8" opacity="0.9"/>' +
        '</g>' +
        '<rect x="50" y="142" width="20" height="32" rx="10" fill="url(#dress_princess-g)"/>' +
        '<rect x="130" y="142" width="20" height="32" rx="10" fill="url(#dress_princess-g)"/>' +
        '<path d="M50,174 Q60,178 70,174" stroke="#FCE4EC" stroke-width="1.5" fill="none"/>' +
        '<path d="M130,174 Q140,178 150,174" stroke="#FCE4EC" stroke-width="1.5" fill="none"/>';
    }
  },
  {
    id: 'armor_knight', name: '騎士の鎧', category: 'tops', price: 1000, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="armor_knight-g" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#FAFAFA"/><stop offset="40%" stop-color="#90A4AE"/><stop offset="100%" stop-color="#37474F"/>' +
        '</linearGradient>' +
        '<linearGradient id="armor_knight-emb" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFEB3B"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<rect x="62" y="136" width="76" height="60" rx="6" fill="url(#armor_knight-g)"/>' +
        '<rect x="46" y="142" width="26" height="42" rx="12" fill="url(#armor_knight-g)"/>' +
        '<rect x="128" y="142" width="26" height="42" rx="12" fill="url(#armor_knight-g)"/>' +
        '<path d="M62,136 L100,130 L138,136 L138,150 L62,150 Z" fill="#455A64"/>' +
        '<rect x="66" y="150" width="68" height="3" fill="#263238"/>' +
        '<rect x="66" y="170" width="68" height="3" fill="#263238"/>' +
        '<path d="M70,140 L72,192" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7"/>' +
        '<path d="M130,140 L128,192" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7"/>' +
        '<circle cx="100" cy="175" r="14" fill="#263238"/>' +
        '<path d="M100,163 L108,170 L106,185 L100,180 L94,185 L92,170 Z" fill="url(#armor_knight-emb)" stroke="#BF360C" stroke-width="0.6"/>' +
        '<path d="M100,167 L100,178" stroke="#F57F17" stroke-width="0.8"/>' +
        '<rect x="68" y="192" width="64" height="6" rx="1" fill="#263238"/>' +
        '<circle cx="76" cy="195" r="1.5" fill="#B0BEC5"/>' +
        '<circle cx="100" cy="195" r="1.5" fill="#B0BEC5"/>' +
        '<circle cx="124" cy="195" r="1.5" fill="#B0BEC5"/>' +
        '<circle cx="54" cy="148" r="2" fill="#263238"/>' +
        '<circle cx="146" cy="148" r="2" fill="#263238"/>';
    }
  },

  // ========== BOTTOMS ==========
  {
    id: 'shorts_blue', name: '青短パン', category: 'bottoms', price: 0, isDefault: true,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="shorts_blue-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#1E88E5"/><stop offset="100%" stop-color="#0D47A1"/>' +
        '</linearGradient></defs>' +
        '<path d="M72,192 L72,226 Q72,230 78,230 L96,230 L96,192 Z" fill="url(#shorts_blue-g)"/>' +
        '<path d="M128,192 L128,226 Q128,230 122,230 L104,230 L104,192 Z" fill="url(#shorts_blue-g)"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#1976D2"/>' +
        '<rect x="72" y="191" width="56" height="2" fill="#42A5F5" opacity="0.8"/>' +
        '<circle cx="100" cy="195" r="1.5" fill="#FFD54F"/>' +
        '<line x1="80" y1="200" x2="80" y2="225" stroke="#0D47A1" stroke-width="0.6" stroke-dasharray="2,2" opacity="0.6"/>' +
        '<line x1="120" y1="200" x2="120" y2="225" stroke="#0D47A1" stroke-width="0.6" stroke-dasharray="2,2" opacity="0.6"/>';
    }
  },
  {
    id: 'pants_black', name: '黒パンツ', category: 'bottoms', price: 20, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="pants_black-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#424242"/><stop offset="100%" stop-color="#0A0A0A"/>' +
        '</linearGradient></defs>' +
        '<path d="M72,192 L74,255 Q74,258 80,258 L96,258 L98,192 Z" fill="url(#pants_black-g)"/>' +
        '<path d="M128,192 L126,255 Q126,258 120,258 L104,258 L102,192 Z" fill="url(#pants_black-g)"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#212121"/>' +
        '<rect x="72" y="191" width="56" height="1.5" fill="#616161" opacity="0.6"/>' +
        '<circle cx="100" cy="195" r="1.2" fill="#9E9E9E"/>' +
        '<line x1="87" y1="200" x2="87" y2="255" stroke="#616161" stroke-width="0.5" opacity="0.5"/>' +
        '<line x1="113" y1="200" x2="113" y2="255" stroke="#616161" stroke-width="0.5" opacity="0.5"/>';
    }
  },
  {
    id: 'jeans_blue', name: 'ジーンズ', category: 'bottoms', price: 60, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="jeans_blue-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#1E88E5"/><stop offset="100%" stop-color="#0D47A1"/>' +
        '</linearGradient></defs>' +
        '<path d="M72,192 L74,255 Q74,258 80,258 L96,258 L98,192 Z" fill="url(#jeans_blue-g)"/>' +
        '<path d="M128,192 L126,255 Q126,258 120,258 L104,258 L102,192 Z" fill="url(#jeans_blue-g)"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#1565C0"/>' +
        '<rect x="72" y="190.5" width="56" height="1.5" fill="#90CAF9" opacity="0.7"/>' +
        '<rect x="95" y="192" width="10" height="7" rx="1" fill="#0D47A1"/>' +
        '<rect x="96" y="193" width="8" height="5" rx="1" fill="#1565C0"/>' +
        '<line x1="85" y1="200" x2="85" y2="250" stroke="#FFF59D" stroke-width="0.9" stroke-dasharray="3,2"/>' +
        '<line x1="115" y1="200" x2="115" y2="250" stroke="#FFF59D" stroke-width="0.9" stroke-dasharray="3,2"/>' +
        '<path d="M76,202 L90,210 L90,220 L76,215" fill="none" stroke="#FFF59D" stroke-width="0.8" stroke-dasharray="2,2"/>' +
        '<path d="M124,202 L110,210 L110,220 L124,215" fill="none" stroke="#FFF59D" stroke-width="0.8" stroke-dasharray="2,2"/>' +
        '<circle cx="82" cy="202" r="1" fill="#FDD835"/>' +
        '<circle cx="118" cy="202" r="1" fill="#FDD835"/>' +
        '<circle cx="90" cy="220" r="0.8" fill="#FDD835"/>' +
        '<circle cx="110" cy="220" r="0.8" fill="#FDD835"/>';
    }
  },
  {
    id: 'skirt_pleats', name: 'プリーツスカート', category: 'bottoms', price: 50, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="skirt_pleats-g1" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#3949AB"/><stop offset="100%" stop-color="#0D1454"/>' +
        '</linearGradient>' +
        '<linearGradient id="skirt_pleats-g2" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#5C6BC0"/><stop offset="100%" stop-color="#1A237E"/>' +
        '</linearGradient></defs>' +
        '<rect x="70" y="190" width="60" height="10" rx="2" fill="#1A237E"/>' +
        '<rect x="70" y="190.5" width="60" height="1.5" fill="#7986CB" opacity="0.7"/>' +
        '<path d="M66,200 L72,240 L82,240 L86,200 Z" fill="url(#skirt_pleats-g1)"/>' +
        '<path d="M86,200 L88,240 L98,240 L96,200 Z" fill="url(#skirt_pleats-g2)"/>' +
        '<path d="M96,200 L98,240 L108,240 L106,200 Z" fill="url(#skirt_pleats-g1)"/>' +
        '<path d="M106,200 L108,240 L118,240 L116,200 Z" fill="url(#skirt_pleats-g2)"/>' +
        '<path d="M116,200 L118,240 L128,240 L134,200 Z" fill="url(#skirt_pleats-g1)"/>' +
        '<path d="M86,200 L84,240" stroke="#0D1454" stroke-width="0.6" opacity="0.7"/>' +
        '<path d="M96,200 L95,240" stroke="#0D1454" stroke-width="0.6" opacity="0.7"/>' +
        '<path d="M106,200 L106,240" stroke="#0D1454" stroke-width="0.6" opacity="0.7"/>' +
        '<path d="M116,200 L118,240" stroke="#0D1454" stroke-width="0.6" opacity="0.7"/>' +
        '<circle cx="100" cy="195" r="1.2" fill="#FFD54F"/>';
    }
  },
  {
    id: 'cargo_pants', name: 'カーゴパンツ', category: 'bottoms', price: 80, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="cargo_pants-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#8D6E63"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<path d="M70,192 L72,258 Q72,260 78,260 L98,260 L100,192 Z" fill="url(#cargo_pants-g)"/>' +
        '<path d="M130,192 L128,258 Q128,260 122,260 L102,260 L100,192 Z" fill="url(#cargo_pants-g)"/>' +
        '<rect x="70" y="190" width="60" height="10" rx="2" fill="#6D4C41"/>' +
        '<rect x="70" y="190.5" width="60" height="1.5" fill="#A1887F" opacity="0.7"/>' +
        '<rect x="95" y="192" width="10" height="7" rx="1" fill="#3E2723"/>' +
        '<rect x="74" y="218" width="18" height="16" rx="2" fill="#4E342E" stroke="#3E2723" stroke-width="0.5"/>' +
        '<rect x="76" y="220" width="14" height="3" fill="#3E2723"/>' +
        '<line x1="83" y1="218" x2="83" y2="234" stroke="#3E2723" stroke-width="0.6"/>' +
        '<rect x="108" y="218" width="18" height="16" rx="2" fill="#4E342E" stroke="#3E2723" stroke-width="0.5"/>' +
        '<rect x="110" y="220" width="14" height="3" fill="#3E2723"/>' +
        '<line x1="117" y1="218" x2="117" y2="234" stroke="#3E2723" stroke-width="0.6"/>' +
        '<rect x="78" y="245" width="12" height="5" rx="1" fill="#4E342E"/>' +
        '<rect x="110" y="245" width="12" height="5" rx="1" fill="#4E342E"/>';
    }
  },
  {
    id: 'shorts_white', name: '白短パン', category: 'bottoms', price: 15, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="shorts_white-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E0E0E0"/>' +
        '</linearGradient></defs>' +
        '<path d="M72,192 L72,226 Q72,230 78,230 L96,230 L96,192 Z" fill="url(#shorts_white-g)" stroke="#BDBDBD" stroke-width="0.5"/>' +
        '<path d="M128,192 L128,226 Q128,230 122,230 L104,230 L104,192 Z" fill="url(#shorts_white-g)" stroke="#BDBDBD" stroke-width="0.5"/>' +
        '<rect x="72" y="190" width="56" height="10" rx="2" fill="#EEEEEE" stroke="#BDBDBD" stroke-width="0.5"/>' +
        '<line x1="80" y1="202" x2="80" y2="226" stroke="#E0E0E0" stroke-width="0.6"/>' +
        '<line x1="120" y1="202" x2="120" y2="226" stroke="#E0E0E0" stroke-width="0.6"/>' +
        '<circle cx="100" cy="195" r="1.2" fill="#9E9E9E"/>';
    }
  },
  {
    id: 'skirt_long', name: 'ロングスカート', category: 'bottoms', price: 60, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="skirt_long-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#F48FB1"/><stop offset="100%" stop-color="#880E4F"/>' +
        '</linearGradient></defs>' +
        '<path d="M68,192 L58,258 Q60,262 68,262 L132,262 Q140,262 142,258 L132,192 Q116,198 100,198 Q84,198 68,192 Z" fill="url(#skirt_long-g)"/>' +
        '<rect x="68" y="190" width="64" height="10" rx="2" fill="#AD1457"/>' +
        '<rect x="68" y="190.5" width="64" height="1.5" fill="#F8BBD0" opacity="0.7"/>' +
        '<path d="M70,210 L64,250" stroke="#FCE4EC" stroke-width="0.5" opacity="0.6"/>' +
        '<path d="M85,212 L80,255" stroke="#FCE4EC" stroke-width="0.5" opacity="0.6"/>' +
        '<path d="M100,214 L100,258" stroke="#FCE4EC" stroke-width="0.5" opacity="0.6"/>' +
        '<path d="M115,212 L120,255" stroke="#FCE4EC" stroke-width="0.5" opacity="0.6"/>' +
        '<path d="M130,210 L136,250" stroke="#FCE4EC" stroke-width="0.5" opacity="0.6"/>' +
        '<path d="M60,255 Q100,265 140,255" stroke="#880E4F" stroke-width="1" fill="none"/>' +
        '<circle cx="100" cy="195" r="1.5" fill="#FFD54F"/>';
    }
  },
  {
    id: 'hakama_blue', name: '袴', category: 'bottoms', price: 200, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hakama_blue-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#303F9F"/><stop offset="100%" stop-color="#0D1454"/>' +
        '</linearGradient></defs>' +
        '<path d="M66,192 L58,262 Q60,265 68,265 L98,265 L100,192 Z" fill="url(#hakama_blue-g)"/>' +
        '<path d="M134,192 L142,262 Q140,265 132,265 L102,265 L100,192 Z" fill="url(#hakama_blue-g)"/>' +
        '<rect x="66" y="188" width="68" height="12" rx="2" fill="#283593"/>' +
        '<rect x="66" y="189" width="68" height="2" fill="#5C6BC0" opacity="0.7"/>' +
        '<rect x="66" y="197" width="68" height="1" fill="#000000" opacity="0.3"/>' +
        '<line x1="75" y1="200" x2="68" y2="262" stroke="#1A237E" stroke-width="0.6" opacity="0.6"/>' +
        '<line x1="85" y1="200" x2="82" y2="263" stroke="#1A237E" stroke-width="0.6" opacity="0.6"/>' +
        '<line x1="100" y1="200" x2="100" y2="264" stroke="#1A237E" stroke-width="0.6" opacity="0.6"/>' +
        '<line x1="115" y1="200" x2="118" y2="263" stroke="#1A237E" stroke-width="0.6" opacity="0.6"/>' +
        '<line x1="125" y1="200" x2="132" y2="262" stroke="#1A237E" stroke-width="0.6" opacity="0.6"/>' +
        '<rect x="92" y="188" width="16" height="18" rx="2" fill="#1A237E"/>' +
        '<rect x="95" y="192" width="10" height="3" fill="#FFEB3B"/>' +
        '<rect x="95" y="198" width="10" height="3" fill="#FFEB3B"/>';
    }
  },

  // ========== HEADWEAR ==========
  {
    id: 'cap_basic', name: 'キャップ', category: 'headwear', price: 20, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="cap_basic-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#B71C1C"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="100" cy="42" rx="48" ry="14" fill="url(#cap_basic-g)"/>' +
        '<path d="M52,42 Q52,30 100,28 Q148,30 148,42 Z" fill="url(#cap_basic-g)"/>' +
        '<ellipse cx="118" cy="44" rx="36" ry="8" fill="#880E4F"/>' +
        '<ellipse cx="118" cy="43" rx="30" ry="3" fill="#E53935" opacity="0.4"/>' +
        '<circle cx="100" cy="28" r="3" fill="#7F0000"/>' +
        '<circle cx="100" cy="27" r="1.5" fill="#EF5350" opacity="0.6"/>' +
        '<path d="M70,32 Q100,25 130,32" stroke="#FFCDD2" stroke-width="1" fill="none" opacity="0.3"/>' +
        '<path d="M86,40 L114,40" stroke="#7F0000" stroke-width="0.6" opacity="0.5"/>';
    }
  },
  {
    id: 'beret_red', name: 'ベレー帽', category: 'headwear', price: 50, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<radialGradient id="beret_red-g" cx="50%" cy="40%" r="60%">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#880E4F"/>' +
        '</radialGradient></defs>' +
        '<ellipse cx="100" cy="40" rx="44" ry="10" fill="#7F0000"/>' +
        '<path d="M56,40 Q56,18 100,14 Q144,18 144,40 Z" fill="url(#beret_red-g)"/>' +
        '<ellipse cx="100" cy="40" rx="42" ry="3" fill="#B71C1C" opacity="0.5"/>' +
        '<path d="M66,30 Q100,20 134,30" stroke="#FFCDD2" stroke-width="1" fill="none" opacity="0.4"/>' +
        '<circle cx="100" cy="16" r="4" fill="#7F0000"/>' +
        '<circle cx="99" cy="15" r="2" fill="#EF5350" opacity="0.5"/>';
    }
  },
  {
    id: 'crown_gold', name: '王冠', category: 'headwear', price: 200, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="crown_gold-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="50%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#E65100"/>' +
        '</linearGradient>' +
        '<radialGradient id="crown_gold-jewel1" cx="40%" cy="30%" r="60%">' +
          '<stop offset="0%" stop-color="#FFCDD2"/><stop offset="100%" stop-color="#B71C1C"/>' +
        '</radialGradient>' +
        '<radialGradient id="crown_gold-jewel2" cx="40%" cy="30%" r="60%">' +
          '<stop offset="0%" stop-color="#BBDEFB"/><stop offset="100%" stop-color="#0D47A1"/>' +
        '</radialGradient>' +
        '<radialGradient id="crown_gold-jewel3" cx="40%" cy="30%" r="60%">' +
          '<stop offset="0%" stop-color="#C8E6C9"/><stop offset="100%" stop-color="#1B5E20"/>' +
        '</radialGradient></defs>' +
        '<rect x="72" y="32" width="56" height="18" rx="2" fill="url(#crown_gold-g)"/>' +
        '<polygon points="72,32 66,12 82,26" fill="url(#crown_gold-g)" stroke="#E65100" stroke-width="0.5"/>' +
        '<polygon points="100,32 94,6 106,6 100,32" fill="url(#crown_gold-g)" stroke="#E65100" stroke-width="0.5"/>' +
        '<polygon points="128,32 134,12 118,26" fill="url(#crown_gold-g)" stroke="#E65100" stroke-width="0.5"/>' +
        '<circle cx="66" cy="11" r="2.5" fill="#FFF59D"/>' +
        '<circle cx="100" cy="5" r="2.5" fill="#FFF59D"/>' +
        '<circle cx="134" cy="11" r="2.5" fill="#FFF59D"/>' +
        '<circle cx="66" cy="11" r="1" fill="#FFFDE7"/>' +
        '<circle cx="100" cy="5" r="1" fill="#FFFDE7"/>' +
        '<circle cx="134" cy="11" r="1" fill="#FFFDE7"/>' +
        '<circle cx="82" cy="40" r="4" fill="url(#crown_gold-jewel1)" stroke="#FFD54F" stroke-width="0.7"/>' +
        '<circle cx="100" cy="40" r="4" fill="url(#crown_gold-jewel2)" stroke="#FFD54F" stroke-width="0.7"/>' +
        '<circle cx="118" cy="40" r="4" fill="url(#crown_gold-jewel3)" stroke="#FFD54F" stroke-width="0.7"/>' +
        '<circle cx="81" cy="38" r="1.2" fill="#ffffff" opacity="0.9"/>' +
        '<circle cx="99" cy="38" r="1.2" fill="#ffffff" opacity="0.9"/>' +
        '<circle cx="117" cy="38" r="1.2" fill="#ffffff" opacity="0.9"/>' +
        '<rect x="70" y="48" width="60" height="4" rx="2" fill="#F57F17"/>' +
        '<rect x="70" y="48" width="60" height="1" rx="0.5" fill="#FFF59D" opacity="0.7"/>';
    }
  },
  {
    id: 'hat_wizard', name: '魔法使い帽子', category: 'headwear', price: 250, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="hat_wizard-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#7B1FA2"/><stop offset="100%" stop-color="#4A148C"/>' +
        '</linearGradient>' +
        '<linearGradient id="hat_wizard-band" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFEE58"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="100" cy="42" rx="50" ry="12" fill="#4A148C"/>' +
        '<ellipse cx="100" cy="40" rx="46" ry="4" fill="#9C27B0" opacity="0.5"/>' +
        '<path d="M60,42 Q70,10 100,-20 Q130,10 140,42 Z" fill="url(#hat_wizard-g)"/>' +
        '<path d="M80,20 Q90,-5 100,-15" stroke="#CE93D8" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M62,40 Q100,50 138,40 Q100,54 62,40 Z" fill="url(#hat_wizard-band)"/>' +
        '<path d="M64,42 Q100,50 136,42" stroke="#F57F17" stroke-width="0.6" fill="none"/>' +
        '<polygon points="115,6 117,12 123,12 118,16 120,22 115,18 110,22 112,16 107,12 113,12" fill="#FFF59D" stroke="#F57F17" stroke-width="0.5"/>' +
        '<circle cx="115" cy="14" r="1" fill="#FFFDE7"/>' +
        '<circle cx="90" cy="24" r="1" fill="#FFF59D" opacity="0.85"/>' +
        '<circle cx="100" cy="14" r="0.8" fill="#FFF59D" opacity="0.85"/>' +
        '<polygon points="75,30 76,32 79,32 77,34 78,36 75,35 72,36 73,34 71,32 74,32" fill="#FFF59D" opacity="0.8"/>';
    }
  },
  {
    id: 'ribbon_cute', name: 'リボン', category: 'headwear', price: 25, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<radialGradient id="ribbon_cute-g" cx="40%" cy="30%" r="60%">' +
          '<stop offset="0%" stop-color="#F8BBD0"/><stop offset="100%" stop-color="#C2185B"/>' +
        '</radialGradient></defs>' +
        '<polygon points="46,34 36,24 36,44" fill="url(#ribbon_cute-g)"/>' +
        '<polygon points="46,34 60,28 60,40" fill="url(#ribbon_cute-g)"/>' +
        '<ellipse cx="52" cy="34" rx="4" ry="5" fill="#880E4F"/>' +
        '<ellipse cx="51" cy="33" rx="2" ry="3" fill="#F06292" opacity="0.6"/>' +
        '<path d="M40,30 L40,40" stroke="#880E4F" stroke-width="0.6" opacity="0.6"/>' +
        '<path d="M56,30 L56,40" stroke="#880E4F" stroke-width="0.6" opacity="0.6"/>' +
        '<circle cx="52" cy="32" r="0.8" fill="#ffffff" opacity="0.9"/>';
    }
  },
  {
    id: 'halo_angel', name: '天使の輪', category: 'headwear', price: 150, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<radialGradient id="halo_angel-g" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFFDE7"/><stop offset="60%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</radialGradient></defs>' +
        '<ellipse cx="100" cy="10" rx="36" ry="8" fill="none" stroke="url(#halo_angel-g)" stroke-width="5" filter="url(#av-glow)"/>' +
        '<ellipse cx="100" cy="10" rx="36" ry="8" fill="none" stroke="#FFEE58" stroke-width="2.5"/>' +
        '<ellipse cx="100" cy="10" rx="34" ry="7" fill="none" stroke="#FFFFFF" stroke-width="0.8" opacity="0.9"/>' +
        '<circle cx="136" cy="10" r="2.5" fill="#FFFFFF"/>' +
        '<circle cx="64" cy="10" r="2" fill="#FFFFFF"/>' +
        '<circle cx="100" cy="3" r="1.5" fill="#FFFFFF" opacity="0.9"/>';
    }
  },
  {
    id: 'helmet_knight', name: '騎士ヘルメット', category: 'headwear', price: 600, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="helmet_knight-g" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#FAFAFA"/><stop offset="40%" stop-color="#B0BEC5"/><stop offset="100%" stop-color="#37474F"/>' +
        '</linearGradient>' +
        '<linearGradient id="helmet_knight-plume" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#7F0000"/>' +
        '</linearGradient></defs>' +
        '<path d="M50,78 Q48,28 100,20 Q152,28 150,78 Q148,88 100,92 Q52,88 50,78 Z" fill="url(#helmet_knight-g)"/>' +
        '<rect x="58" y="60" width="84" height="8" rx="1" fill="#263238"/>' +
        '<rect x="62" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<rect x="74" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<rect x="86" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<rect x="98" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<rect x="110" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<rect x="122" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<rect x="134" y="62" width="6" height="4" fill="#0A0A0A"/>' +
        '<path d="M55,40 Q60,25 70,22" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.7"/>' +
        '<path d="M100,8 Q96,16 98,22" stroke="#0A0A0A" stroke-width="2"/>' +
        '<path d="M96,4 Q95,0 96,-10 Q92,-8 88,0 Q85,12 92,18 Q92,8 96,4 Z" fill="url(#helmet_knight-plume)"/>' +
        '<path d="M104,4 Q105,0 104,-10 Q108,-8 112,0 Q115,12 108,18 Q108,8 104,4 Z" fill="url(#helmet_knight-plume)"/>' +
        '<path d="M100,8 L100,-12" stroke="#7F0000" stroke-width="0.7"/>' +
        '<circle cx="58" cy="78" r="2" fill="#263238"/>' +
        '<circle cx="142" cy="78" r="2" fill="#263238"/>';
    }
  },
  {
    id: 'tiara_diamond', name: 'ダイヤティアラ', category: 'headwear', price: 800, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="tiara_diamond-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFFDE7"/><stop offset="50%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#F9A825"/>' +
        '</linearGradient>' +
        '<radialGradient id="tiara_diamond-jewel" cx="40%" cy="30%" r="60%">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#E1F5FE"/><stop offset="100%" stop-color="#01579B"/>' +
        '</radialGradient></defs>' +
        '<path d="M62,38 Q100,20 138,38 L134,44 Q100,30 66,44 Z" fill="url(#tiara_diamond-g)"/>' +
        '<path d="M62,38 Q100,20 138,38" stroke="#F57F17" stroke-width="0.6" fill="none"/>' +
        '<path d="M80,28 L85,22 L90,28" fill="url(#tiara_diamond-g)" stroke="#F57F17" stroke-width="0.5"/>' +
        '<path d="M120,28 L115,22 L110,28" fill="url(#tiara_diamond-g)" stroke="#F57F17" stroke-width="0.5"/>' +
        '<polygon points="100,6 96,18 104,18" fill="url(#tiara_diamond-g)" stroke="#F57F17" stroke-width="0.5"/>' +
        '<polygon points="100,8 97,18 103,18 100,22 97,18" fill="url(#tiara_diamond-jewel)" stroke="#0288D1" stroke-width="0.4"/>' +
        '<polygon points="85,24 82,30 88,30" fill="url(#tiara_diamond-jewel)" stroke="#0288D1" stroke-width="0.4"/>' +
        '<polygon points="115,24 118,30 112,30" fill="url(#tiara_diamond-jewel)" stroke="#0288D1" stroke-width="0.4"/>' +
        '<circle cx="72" cy="40" r="2" fill="url(#tiara_diamond-jewel)"/>' +
        '<circle cx="128" cy="40" r="2" fill="url(#tiara_diamond-jewel)"/>' +
        '<circle cx="100" cy="15" r="1" fill="#FFFFFF"/>' +
        '<circle cx="85" cy="26" r="0.7" fill="#FFFFFF"/>' +
        '<circle cx="115" cy="26" r="0.7" fill="#FFFFFF"/>' +
        '<polygon points="75,18 76,20 78,20 76,22 77,24 75,23 73,24 74,22 72,20 74,20" fill="#FFFFFF" opacity="0.9"/>' +
        '<polygon points="125,18 126,20 128,20 126,22 127,24 125,23 123,24 124,22 122,20 124,20" fill="#FFFFFF" opacity="0.9"/>';
    }
  },

  // ========== ACCESSORY ==========
  {
    id: 'sunglasses', name: 'サングラス', category: 'accessory', price: 30, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="sunglasses-lens" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#263238"/><stop offset="50%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#0A0A0A"/>' +
        '</linearGradient></defs>' +
        '<rect x="66" y="76" width="26" height="18" rx="6" fill="url(#sunglasses-lens)" stroke="#0A0A0A" stroke-width="1.2"/>' +
        '<rect x="108" y="76" width="26" height="18" rx="6" fill="url(#sunglasses-lens)" stroke="#0A0A0A" stroke-width="1.2"/>' +
        '<path d="M69,79 Q72,77 85,78" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round"/>' +
        '<path d="M111,79 Q114,77 127,78" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round"/>' +
        '<circle cx="72" cy="82" r="1.5" fill="#ffffff" opacity="0.7"/>' +
        '<circle cx="114" cy="82" r="1.5" fill="#ffffff" opacity="0.7"/>' +
        '<line x1="92" y1="82" x2="108" y2="82" stroke="#0A0A0A" stroke-width="2.5"/>' +
        '<line x1="66" y1="82" x2="56" y2="78" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round"/>' +
        '<line x1="134" y1="82" x2="144" y2="78" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round"/>';
    }
  },
  {
    id: 'bowtie_red', name: '蝶ネクタイ', category: 'accessory', price: 40, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bowtie_red-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#7F0000"/>' +
        '</linearGradient></defs>' +
        '<path d="M82,138 Q76,142 76,146 Q76,150 82,154 L100,146 Z" fill="url(#bowtie_red-g)"/>' +
        '<path d="M118,138 Q124,142 124,146 Q124,150 118,154 L100,146 Z" fill="url(#bowtie_red-g)"/>' +
        '<path d="M84,141 Q80,145 84,151" stroke="#B71C1C" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M116,141 Q120,145 116,151" stroke="#B71C1C" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<ellipse cx="100" cy="146" rx="5" ry="6" fill="#7F0000"/>' +
        '<ellipse cx="99" cy="144" rx="2" ry="3" fill="#EF5350" opacity="0.6"/>' +
        '<circle cx="100" cy="146" r="1" fill="#FFEB3B"/>';
    }
  },
  {
    id: 'scarf_warm', name: 'マフラー', category: 'accessory', price: 60, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="scarf_warm-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFAB91"/><stop offset="100%" stop-color="#BF360C"/>' +
        '</linearGradient></defs>' +
        '<path d="M70,126 Q100,142 130,126 Q134,132 130,136 Q100,150 70,136 Q66,132 70,126 Z" fill="url(#scarf_warm-g)"/>' +
        '<path d="M72,130 Q100,145 128,130" stroke="#FFCCBC" stroke-width="0.7" fill="none" opacity="0.7"/>' +
        '<path d="M72,132 L130,132" stroke="#BF360C" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.5"/>' +
        '<rect x="120" y="130" width="14" height="42" rx="3" fill="url(#scarf_warm-g)"/>' +
        '<line x1="122" y1="140" x2="132" y2="140" stroke="#BF360C" stroke-width="0.5" stroke-dasharray="2,1"/>' +
        '<line x1="122" y1="150" x2="132" y2="150" stroke="#BF360C" stroke-width="0.5" stroke-dasharray="2,1"/>' +
        '<line x1="122" y1="160" x2="132" y2="160" stroke="#BF360C" stroke-width="0.5" stroke-dasharray="2,1"/>' +
        '<line x1="120" y1="172" x2="120" y2="178" stroke="#BF360C" stroke-width="1"/>' +
        '<line x1="124" y1="172" x2="124" y2="180" stroke="#BF360C" stroke-width="1"/>' +
        '<line x1="128" y1="172" x2="128" y2="178" stroke="#BF360C" stroke-width="1"/>' +
        '<line x1="132" y1="172" x2="132" y2="180" stroke="#BF360C" stroke-width="1"/>';
    }
  },
  {
    id: 'wings_angel', name: '天使の翼', category: 'accessory', price: 300, isDefault: false, layer: 'back',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="wings_angel-g" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#BBDEFB"/>' +
        '</linearGradient>' +
        '<linearGradient id="wings_angel-g2" x1="1" y1="0" x2="0" y2="0">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#BBDEFB"/>' +
        '</linearGradient></defs>' +
        '<path d="M68,150 Q28,115 24,160 Q28,195 68,188 Z" fill="url(#wings_angel-g)" stroke="#90CAF9" stroke-width="0.8"/>' +
        '<path d="M60,158 Q34,140 32,158 Q34,175 60,170 Z" fill="#FFFFFF" opacity="0.6"/>' +
        '<path d="M66,150 Q50,130 40,140" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M66,160 Q46,150 34,158" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M66,170 Q48,168 34,175" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M66,180 Q50,180 40,182" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M132,150 Q172,115 176,160 Q172,195 132,188 Z" fill="url(#wings_angel-g2)" stroke="#90CAF9" stroke-width="0.8"/>' +
        '<path d="M140,158 Q166,140 168,158 Q166,175 140,170 Z" fill="#FFFFFF" opacity="0.6"/>' +
        '<path d="M134,150 Q150,130 160,140" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M134,160 Q154,150 166,158" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M134,170 Q152,168 166,175" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>' +
        '<path d="M134,180 Q150,180 160,182" stroke="#90CAF9" stroke-width="0.6" fill="none" opacity="0.6"/>';
    }
  },
  {
    id: 'watch_gold', name: '金時計', category: 'accessory', price: 150, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="watch_gold-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="50%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<rect x="58" y="198" width="16" height="5" rx="1" fill="url(#watch_gold-g)"/>' +
        '<rect x="58" y="197" width="16" height="1" fill="#FFFDE7" opacity="0.8"/>' +
        '<circle cx="66" cy="200" r="6" fill="url(#watch_gold-g)" stroke="#E65100" stroke-width="0.6"/>' +
        '<circle cx="66" cy="200" r="4" fill="#FFFDE7"/>' +
        '<line x1="66" y1="200" x2="66" y2="197" stroke="#0A0A0A" stroke-width="0.8"/>' +
        '<line x1="66" y1="200" x2="68.5" y2="200" stroke="#0A0A0A" stroke-width="0.6"/>' +
        '<circle cx="66" cy="200" r="0.7" fill="#E65100"/>';
    }
  },
  {
    id: 'medal_gold', name: '金メダル', category: 'accessory', price: 200, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="medal_gold-rb" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#7F0000"/>' +
        '</linearGradient>' +
        '<radialGradient id="medal_gold-g" cx="40%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="60%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#E65100"/>' +
        '</radialGradient></defs>' +
        '<path d="M90,130 L86,158 L94,158 L98,156 Z" fill="url(#medal_gold-rb)"/>' +
        '<path d="M110,130 L114,158 L106,158 L102,156 Z" fill="url(#medal_gold-rb)"/>' +
        '<path d="M94,158 L96,165 L104,165 L106,158 Z" fill="#B71C1C"/>' +
        '<circle cx="100" cy="178" r="13" fill="url(#medal_gold-g)" stroke="#E65100" stroke-width="1.2"/>' +
        '<circle cx="100" cy="178" r="9" fill="none" stroke="#E65100" stroke-width="0.5" opacity="0.6"/>' +
        '<text x="100" y="183" font-family="Arial" font-size="13" font-weight="900" text-anchor="middle" fill="#E65100">1</text>' +
        '<circle cx="96" cy="173" r="2" fill="#FFFDE7" opacity="0.7"/>';
    }
  },
  {
    id: 'necklace_diamond', name: 'ダイヤネックレス', category: 'accessory', price: 500, isDefault: false, layer: 'front',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="necklace_diamond-c" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient>' +
        '<radialGradient id="necklace_diamond-j" cx="40%" cy="30%" r="60%">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#E1F5FE"/><stop offset="100%" stop-color="#01579B"/>' +
        '</radialGradient></defs>' +
        '<path d="M76,130 Q100,145 124,130" stroke="url(#necklace_diamond-c)" stroke-width="1.8" fill="none"/>' +
        '<path d="M76,130 Q100,146 124,130" stroke="#FFFDE7" stroke-width="0.6" fill="none" opacity="0.7"/>' +
        '<circle cx="82" cy="134" r="1" fill="url(#necklace_diamond-c)"/>' +
        '<circle cx="90" cy="140" r="1" fill="url(#necklace_diamond-c)"/>' +
        '<circle cx="110" cy="140" r="1" fill="url(#necklace_diamond-c)"/>' +
        '<circle cx="118" cy="134" r="1" fill="url(#necklace_diamond-c)"/>' +
        '<polygon points="100,141 94,146 100,158 106,146" fill="url(#necklace_diamond-j)" stroke="#0288D1" stroke-width="0.6"/>' +
        '<path d="M94,146 L106,146" stroke="#0288D1" stroke-width="0.4"/>' +
        '<path d="M97,143 L100,155" stroke="#ffffff" stroke-width="0.5" opacity="0.8"/>' +
        '<circle cx="98" cy="145" r="1.2" fill="#ffffff" opacity="0.9"/>' +
        '<polygon points="100,138 101,140 103,140 101,141 102,143 100,142 98,143 99,141 97,140 99,140" fill="#ffffff" opacity="0.85"/>';
    }
  },
  {
    id: 'cape_vampire', name: 'ヴァンパイアマント', category: 'accessory', price: 350, isDefault: false, layer: 'back',
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="cape_vampire-outer" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#424242"/><stop offset="100%" stop-color="#0A0A0A"/>' +
        '</linearGradient>' +
        '<linearGradient id="cape_vampire-inner" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#D32F2F"/><stop offset="100%" stop-color="#7F0000"/>' +
        '</linearGradient></defs>' +
        '<path d="M58,140 Q40,200 48,250 Q60,260 100,260 Q140,260 152,250 Q160,200 142,140 Q120,152 100,152 Q80,152 58,140 Z" fill="url(#cape_vampire-outer)"/>' +
        '<path d="M64,146 Q56,200 62,248" stroke="#7F0000" stroke-width="0.7" fill="none" opacity="0.5"/>' +
        '<path d="M136,146 Q144,200 138,248" stroke="#7F0000" stroke-width="0.7" fill="none" opacity="0.5"/>' +
        '<path d="M84,152 Q82,210 86,252" stroke="#212121" stroke-width="0.5" fill="none" opacity="0.5"/>' +
        '<path d="M116,152 Q118,210 114,252" stroke="#212121" stroke-width="0.5" fill="none" opacity="0.5"/>' +
        '<path d="M60,138 L58,145 Q80,152 100,152 Q120,152 142,145 L140,138 Q120,148 100,148 Q80,148 60,138 Z" fill="url(#cape_vampire-inner)"/>' +
        '<path d="M60,138 L140,138" stroke="#212121" stroke-width="1.5"/>' +
        '<polygon points="56,134 60,138 52,138" fill="url(#cape_vampire-outer)"/>' +
        '<polygon points="144,134 148,138 140,138" fill="url(#cape_vampire-outer)"/>' +
        '<circle cx="58" cy="140" r="2" fill="url(#cape_vampire-inner)"/>' +
        '<circle cx="142" cy="140" r="2" fill="url(#cape_vampire-inner)"/>';
    }
  },

  // ========== SHOES ==========
  {
    id: 'sneakers_white', name: 'スニーカー', category: 'shoes', price: 0, isDefault: true,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="sneakers_white-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#BDBDBD"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="87" cy="266" rx="17" ry="4" fill="#757575" opacity="0.3"/>' +
        '<ellipse cx="113" cy="266" rx="17" ry="4" fill="#757575" opacity="0.3"/>' +
        '<ellipse cx="87" cy="264" rx="16" ry="7" fill="url(#sneakers_white-g)" stroke="#9E9E9E" stroke-width="0.6"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="url(#sneakers_white-g)" stroke="#9E9E9E" stroke-width="0.6"/>' +
        '<rect x="75" y="258" width="24" height="8" rx="4" fill="url(#sneakers_white-g)" stroke="#9E9E9E" stroke-width="0.6"/>' +
        '<rect x="101" y="258" width="24" height="8" rx="4" fill="url(#sneakers_white-g)" stroke="#9E9E9E" stroke-width="0.6"/>' +
        '<rect x="75" y="266" width="24" height="3" rx="1" fill="#F5F5F5"/>' +
        '<rect x="101" y="266" width="24" height="3" rx="1" fill="#F5F5F5"/>' +
        '<path d="M78,262 Q87,260 96,262" stroke="#1E88E5" stroke-width="1.5" fill="none"/>' +
        '<path d="M104,262 Q113,260 122,262" stroke="#1E88E5" stroke-width="1.5" fill="none"/>' +
        '<line x1="82" y1="260" x2="84" y2="263" stroke="#9E9E9E" stroke-width="0.5"/>' +
        '<line x1="90" y1="260" x2="92" y2="263" stroke="#9E9E9E" stroke-width="0.5"/>' +
        '<line x1="108" y1="260" x2="110" y2="263" stroke="#9E9E9E" stroke-width="0.5"/>' +
        '<line x1="116" y1="260" x2="118" y2="263" stroke="#9E9E9E" stroke-width="0.5"/>';
    }
  },
  {
    id: 'sneakers_red', name: '赤スニーカー', category: 'shoes', price: 15, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="sneakers_red-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#EF5350"/><stop offset="100%" stop-color="#7F0000"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="87" cy="266" rx="17" ry="4" fill="#7F0000" opacity="0.3"/>' +
        '<ellipse cx="113" cy="266" rx="17" ry="4" fill="#7F0000" opacity="0.3"/>' +
        '<ellipse cx="87" cy="264" rx="16" ry="7" fill="url(#sneakers_red-g)"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="url(#sneakers_red-g)"/>' +
        '<rect x="75" y="258" width="24" height="8" rx="4" fill="url(#sneakers_red-g)"/>' +
        '<rect x="101" y="258" width="24" height="8" rx="4" fill="url(#sneakers_red-g)"/>' +
        '<rect x="75" y="266" width="24" height="3" rx="1" fill="#FFFFFF"/>' +
        '<rect x="101" y="266" width="24" height="3" rx="1" fill="#FFFFFF"/>' +
        '<path d="M78,262 Q87,260 96,262" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>' +
        '<path d="M104,262 Q113,260 122,262" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>' +
        '<path d="M77,260 Q80,256 86,258" stroke="#FFCDD2" stroke-width="1" fill="none" opacity="0.6"/>' +
        '<path d="M103,260 Q106,256 112,258" stroke="#FFCDD2" stroke-width="1" fill="none" opacity="0.6"/>';
    }
  },
  {
    id: 'boots_brown', name: 'ブーツ', category: 'shoes', price: 70, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="boots_brown-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#8D6E63"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient>' +
        '<linearGradient id="boots_brown-gold" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFEE58"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<rect x="74" y="240" width="22" height="24" rx="4" fill="url(#boots_brown-g)"/>' +
        '<rect x="104" y="240" width="22" height="24" rx="4" fill="url(#boots_brown-g)"/>' +
        '<rect x="74" y="240" width="22" height="3" rx="1" fill="#A1887F" opacity="0.7"/>' +
        '<rect x="104" y="240" width="22" height="3" rx="1" fill="#A1887F" opacity="0.7"/>' +
        '<ellipse cx="85" cy="266" rx="16" ry="6" fill="#1B0F0A"/>' +
        '<ellipse cx="115" cy="266" rx="16" ry="6" fill="#1B0F0A"/>' +
        '<rect x="78" y="246" width="14" height="4" rx="1" fill="url(#boots_brown-gold)" stroke="#E65100" stroke-width="0.4"/>' +
        '<rect x="108" y="246" width="14" height="4" rx="1" fill="url(#boots_brown-gold)" stroke="#E65100" stroke-width="0.4"/>' +
        '<rect x="83" y="247" width="4" height="2" fill="#E65100"/>' +
        '<rect x="113" y="247" width="4" height="2" fill="#E65100"/>' +
        '<path d="M75,255 Q85,253 95,255" stroke="#3E2723" stroke-width="0.5" fill="none"/>' +
        '<path d="M105,255 Q115,253 125,255" stroke="#3E2723" stroke-width="0.5" fill="none"/>';
    }
  },
  {
    id: 'loafers_brown', name: 'ローファー', category: 'shoes', price: 50, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="loafers_brown-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#A1887F"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="87" cy="264" rx="16" ry="7" fill="url(#loafers_brown-g)"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="url(#loafers_brown-g)"/>' +
        '<rect x="77" y="258" width="20" height="8" rx="4" fill="#5D4037"/>' +
        '<rect x="103" y="258" width="20" height="8" rx="4" fill="#5D4037"/>' +
        '<path d="M77,260 Q87,256 97,260" stroke="#3E2723" stroke-width="0.6" fill="none"/>' +
        '<path d="M103,260 Q113,256 123,260" stroke="#3E2723" stroke-width="0.6" fill="none"/>' +
        '<rect x="82" y="258" width="10" height="2" rx="1" fill="#6D4C41"/>' +
        '<rect x="108" y="258" width="10" height="2" rx="1" fill="#6D4C41"/>' +
        '<circle cx="87" cy="259" r="1" fill="#FFD54F"/>' +
        '<circle cx="113" cy="259" r="1" fill="#FFD54F"/>' +
        '<ellipse cx="87" cy="268" rx="16" ry="2" fill="#1B0F0A" opacity="0.7"/>' +
        '<ellipse cx="113" cy="268" rx="16" ry="2" fill="#1B0F0A" opacity="0.7"/>';
    }
  },
  {
    id: 'sandals_beach', name: 'ビーチサンダル', category: 'shoes', price: 25, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="sandals_beach-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFEB3B"/><stop offset="100%" stop-color="#F9A825"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="87" cy="264" rx="15" ry="5" fill="url(#sandals_beach-g)"/>' +
        '<ellipse cx="113" cy="264" rx="15" ry="5" fill="url(#sandals_beach-g)"/>' +
        '<path d="M80,258 L87,262 L94,258" stroke="#C62828" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<path d="M106,258 L113,262 L120,258" stroke="#C62828" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<circle cx="87" cy="262" r="1.5" fill="#B71C1C"/>' +
        '<circle cx="113" cy="262" r="1.5" fill="#B71C1C"/>';
    }
  },
  {
    id: 'sneakers_gold', name: '金スニーカー', category: 'shoes', price: 400, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="sneakers_gold-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="50%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#E65100"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="87" cy="266" rx="17" ry="4" fill="#E65100" opacity="0.3"/>' +
        '<ellipse cx="113" cy="266" rx="17" ry="4" fill="#E65100" opacity="0.3"/>' +
        '<ellipse cx="87" cy="264" rx="16" ry="7" fill="url(#sneakers_gold-g)" stroke="#E65100" stroke-width="0.6"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="url(#sneakers_gold-g)" stroke="#E65100" stroke-width="0.6"/>' +
        '<rect x="75" y="258" width="24" height="8" rx="4" fill="url(#sneakers_gold-g)" stroke="#E65100" stroke-width="0.6"/>' +
        '<rect x="101" y="258" width="24" height="8" rx="4" fill="url(#sneakers_gold-g)" stroke="#E65100" stroke-width="0.6"/>' +
        '<rect x="75" y="266" width="24" height="3" rx="1" fill="#F57F17"/>' +
        '<rect x="101" y="266" width="24" height="3" rx="1" fill="#F57F17"/>' +
        '<path d="M78,262 Q87,260 96,262" stroke="#F57F17" stroke-width="1.5" fill="none"/>' +
        '<path d="M104,262 Q113,260 122,262" stroke="#F57F17" stroke-width="1.5" fill="none"/>' +
        '<path d="M77,259 Q85,255 95,259" stroke="#FFFDE7" stroke-width="1" fill="none" opacity="0.8"/>' +
        '<path d="M103,259 Q111,255 121,259" stroke="#FFFDE7" stroke-width="1" fill="none" opacity="0.8"/>' +
        '<circle cx="85" cy="263" r="0.8" fill="#FFFFFF" opacity="0.9"/>' +
        '<circle cx="111" cy="263" r="0.8" fill="#FFFFFF" opacity="0.9"/>';
    }
  },
  {
    id: 'shoes_glass', name: 'ガラスの靴', category: 'shoes', price: 600, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="shoes_glass-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#E1F5FE"/><stop offset="100%" stop-color="#81D4FA"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="87" cy="266" rx="16" ry="3" fill="#81D4FA" opacity="0.3"/>' +
        '<ellipse cx="113" cy="266" rx="16" ry="3" fill="#81D4FA" opacity="0.3"/>' +
        '<ellipse cx="87" cy="264" rx="16" ry="7" fill="url(#shoes_glass-g)" stroke="#4FC3F7" stroke-width="0.8" opacity="0.7"/>' +
        '<ellipse cx="113" cy="264" rx="16" ry="7" fill="url(#shoes_glass-g)" stroke="#4FC3F7" stroke-width="0.8" opacity="0.7"/>' +
        '<path d="M77,257 Q87,246 97,257 Q95,263 87,263 Q79,263 77,257 Z" fill="url(#shoes_glass-g)" stroke="#4FC3F7" stroke-width="0.8" opacity="0.75"/>' +
        '<path d="M103,257 Q113,246 123,257 Q121,263 113,263 Q105,263 103,257 Z" fill="url(#shoes_glass-g)" stroke="#4FC3F7" stroke-width="0.8" opacity="0.75"/>' +
        '<path d="M80,252 Q85,250 90,252" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.9"/>' +
        '<path d="M106,252 Q111,250 116,252" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.9"/>' +
        '<circle cx="83" cy="260" r="1" fill="#FFFFFF" opacity="0.85"/>' +
        '<circle cx="109" cy="260" r="1" fill="#FFFFFF" opacity="0.85"/>' +
        '<polygon points="95,260 96,262 98,262 96,263 97,265 95,264 93,265 94,263 92,262 94,262" fill="#FFFFFF" opacity="0.95"/>' +
        '<polygon points="121,260 122,262 124,262 122,263 123,265 121,264 119,265 120,263 118,262 120,262" fill="#FFFFFF" opacity="0.95"/>';
    }
  },

  // ========== BACKGROUND ==========
  {
    id: 'bg_classroom', name: '教室', category: 'background', price: 50, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_classroom-wall" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF8E1"/><stop offset="100%" stop-color="#F5E6B8"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_classroom-floor" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#A1887F"/><stop offset="100%" stop-color="#5D4037"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_classroom-board" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#2E7D32"/><stop offset="100%" stop-color="#1B5E20"/>' +
        '</linearGradient></defs>' +
        '<rect x="0" y="0" width="200" height="230" fill="url(#bg_classroom-wall)"/>' +
        '<rect x="0" y="230" width="200" height="70" fill="url(#bg_classroom-floor)"/>' +
        '<line x1="0" y1="240" x2="200" y2="240" stroke="#3E2723" stroke-width="0.5"/>' +
        '<line x1="0" y1="260" x2="200" y2="260" stroke="#3E2723" stroke-width="0.5"/>' +
        '<line x1="0" y1="280" x2="200" y2="280" stroke="#3E2723" stroke-width="0.5"/>' +
        '<rect x="14" y="30" width="56" height="40" rx="2" fill="url(#bg_classroom-board)" stroke="#8D6E63" stroke-width="2"/>' +
        '<text x="42" y="50" font-family="sans-serif" font-size="9" fill="#FFFFFF" text-anchor="middle">英単語</text>' +
        '<text x="42" y="62" font-family="sans-serif" font-size="7" fill="#FFEB3B" text-anchor="middle">やったんぞ</text>' +
        '<rect x="130" y="40" width="50" height="40" rx="1" fill="#B3E5FC" stroke="#8D6E63" stroke-width="1.5"/>' +
        '<line x1="155" y1="40" x2="155" y2="80" stroke="#8D6E63" stroke-width="1"/>' +
        '<line x1="130" y1="60" x2="180" y2="60" stroke="#8D6E63" stroke-width="1"/>' +
        '<circle cx="168" cy="50" r="4" fill="#FFEB3B" opacity="0.7"/>' +
        '<path d="M0,210 L200,210" stroke="#E0C088" stroke-width="0.8"/>';
    }
  },
  {
    id: 'bg_sakura', name: '桜', category: 'background', price: 100, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_sakura-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#E1F5FE"/><stop offset="100%" stop-color="#FFCDD2"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_sakura-ground" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#C8E6C9"/><stop offset="100%" stop-color="#66BB6A"/>' +
        '</linearGradient></defs>' +
        '<rect x="0" y="0" width="200" height="260" fill="url(#bg_sakura-sky)"/>' +
        '<rect x="0" y="260" width="200" height="40" fill="url(#bg_sakura-ground)"/>' +
        '<rect x="15" y="90" width="8" height="175" fill="#5D4037"/>' +
        '<path d="M19,120 Q5,100 2,80" stroke="#5D4037" stroke-width="4" fill="none"/>' +
        '<path d="M19,150 Q10,140 4,150" stroke="#5D4037" stroke-width="3" fill="none"/>' +
        '<circle cx="4" cy="75" r="18" fill="#F8BBD0" opacity="0.85"/>' +
        '<circle cx="20" cy="60" r="22" fill="#F8BBD0" opacity="0.85"/>' +
        '<circle cx="40" cy="75" r="15" fill="#F8BBD0" opacity="0.85"/>' +
        '<circle cx="8" cy="140" r="12" fill="#F8BBD0" opacity="0.85"/>' +
        '<circle cx="0" cy="155" r="10" fill="#F8BBD0" opacity="0.85"/>' +
        '<rect x="180" y="100" width="7" height="160" fill="#5D4037"/>' +
        '<circle cx="183" cy="90" r="16" fill="#F8BBD0" opacity="0.85"/>' +
        '<circle cx="195" cy="75" r="14" fill="#F8BBD0" opacity="0.85"/>' +
        '<g fill="#F48FB1" opacity="0.85">' +
          '<circle cx="70" cy="50" r="3"/><circle cx="100" cy="80" r="2.5"/>' +
          '<circle cx="130" cy="40" r="2.5"/><circle cx="160" cy="100" r="3"/>' +
          '<circle cx="85" cy="180" r="2"/><circle cx="150" cy="160" r="2.5"/>' +
          '<circle cx="55" cy="220" r="2"/><circle cx="175" cy="200" r="2.5"/>' +
          '<circle cx="120" cy="230" r="2"/><circle cx="90" cy="120" r="2"/>' +
        '</g>' +
        '<circle cx="150" cy="50" r="18" fill="#FFFDE7" opacity="0.85"/>';
    }
  },
  {
    id: 'bg_sunset', name: '夕焼け', category: 'background', price: 150, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_sunset-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#4A148C"/>' +
          '<stop offset="30%" stop-color="#D81B60"/>' +
          '<stop offset="60%" stop-color="#F9A825"/>' +
          '<stop offset="100%" stop-color="#FFEB3B"/>' +
        '</linearGradient>' +
        '<radialGradient id="bg_sunset-sun" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFFDE7"/><stop offset="70%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#E65100"/>' +
        '</radialGradient></defs>' +
        '<rect x="0" y="0" width="200" height="260" fill="url(#bg_sunset-sky)"/>' +
        '<rect x="0" y="260" width="200" height="40" fill="#1A237E" opacity="0.6"/>' +
        '<circle cx="100" cy="215" r="28" fill="url(#bg_sunset-sun)" filter="url(#av-glow)"/>' +
        '<path d="M0,260 Q30,230 60,250 Q100,210 140,250 Q170,230 200,260 L200,300 L0,300 Z" fill="#1A237E"/>' +
        '<path d="M0,245 L200,245" stroke="#FFAB91" stroke-width="0.5" opacity="0.7"/>' +
        '<path d="M0,235 L200,235" stroke="#FFCDD2" stroke-width="0.4" opacity="0.5"/>' +
        '<g fill="#1A237E" opacity="0.8">' +
          '<path d="M10,280 L14,270 L18,280 Z"/>' +
          '<path d="M30,285 L35,272 L40,285 Z"/>' +
          '<path d="M160,283 L164,272 L168,283 Z"/>' +
          '<path d="M180,280 L184,268 L188,280 Z"/>' +
        '</g>' +
        '<circle cx="50" cy="30" r="1" fill="#FFFFFF" opacity="0.8"/>' +
        '<circle cx="150" cy="50" r="1" fill="#FFFFFF" opacity="0.8"/>' +
        '<circle cx="20" cy="60" r="0.8" fill="#FFFFFF" opacity="0.7"/>';
    }
  },
  {
    id: 'bg_starry', name: '星空', category: 'background', price: 200, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_starry-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#0D1454"/><stop offset="100%" stop-color="#1A237E"/>' +
        '</linearGradient>' +
        '<radialGradient id="bg_starry-moon" cx="40%" cy="35%" r="60%">' +
          '<stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFE082"/>' +
        '</radialGradient></defs>' +
        '<rect x="0" y="0" width="200" height="300" fill="url(#bg_starry-sky)"/>' +
        '<circle cx="40" cy="50" r="20" fill="url(#bg_starry-moon)" filter="url(#av-glow)"/>' +
        '<circle cx="44" cy="46" r="2" fill="#E0E0E0" opacity="0.5"/>' +
        '<circle cx="35" cy="55" r="1.5" fill="#E0E0E0" opacity="0.5"/>' +
        '<g fill="#FFFFFF">' +
          '<circle cx="80" cy="20" r="1.2"/><circle cx="120" cy="35" r="1.5"/>' +
          '<circle cx="150" cy="15" r="1"/><circle cx="180" cy="50" r="1.2"/>' +
          '<circle cx="170" cy="80" r="1"/><circle cx="130" cy="70" r="0.8"/>' +
          '<circle cx="100" cy="100" r="1.2"/><circle cx="70" cy="120" r="1"/>' +
          '<circle cx="40" cy="140" r="0.8"/><circle cx="20" cy="100" r="1"/>' +
          '<circle cx="160" cy="120" r="1.3"/><circle cx="185" cy="150" r="1"/>' +
          '<circle cx="110" cy="160" r="0.8"/><circle cx="150" cy="180" r="1"/>' +
          '<circle cx="80" cy="200" r="0.8"/><circle cx="30" cy="200" r="1"/>' +
          '<circle cx="170" cy="220" r="1.2"/><circle cx="60" cy="240" r="0.8"/>' +
          '<circle cx="120" cy="250" r="1"/><circle cx="190" cy="270" r="1"/>' +
          '<circle cx="50" cy="280" r="0.8"/><circle cx="140" cy="290" r="1"/>' +
        '</g>' +
        '<g fill="#FFFDE7" opacity="0.9">' +
          '<polygon points="100,30 102,36 108,36 103,40 105,46 100,42 95,46 97,40 92,36 98,36"/>' +
          '<polygon points="175,100 176,104 180,104 177,107 178,111 175,108 172,111 173,107 170,104 174,104"/>' +
          '<polygon points="60,170 61,174 65,174 62,177 63,181 60,178 57,181 58,177 55,174 59,174"/>' +
        '</g>';
    }
  },
  {
    id: 'bg_ocean', name: '海', category: 'background', price: 150, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_ocean-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#81D4FA"/><stop offset="100%" stop-color="#E1F5FE"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_ocean-sea" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#0288D1"/><stop offset="100%" stop-color="#01579B"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_ocean-sand" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF176"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</linearGradient></defs>' +
        '<rect x="0" y="0" width="200" height="150" fill="url(#bg_ocean-sky)"/>' +
        '<rect x="0" y="150" width="200" height="100" fill="url(#bg_ocean-sea)"/>' +
        '<rect x="0" y="250" width="200" height="50" fill="url(#bg_ocean-sand)"/>' +
        '<circle cx="160" cy="40" r="22" fill="#FFF59D" filter="url(#av-glow)" opacity="0.95"/>' +
        '<circle cx="160" cy="40" r="14" fill="#FFEB3B"/>' +
        '<path d="M0,160 Q50,155 100,160 Q150,165 200,160" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.7"/>' +
        '<path d="M0,175 Q50,170 100,175 Q150,180 200,175" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.6"/>' +
        '<path d="M0,195 Q40,190 80,195 Q120,200 160,195 Q180,193 200,195" stroke="#FFFFFF" stroke-width="1" fill="none" opacity="0.5"/>' +
        '<path d="M0,215 Q50,213 100,215 Q150,218 200,215" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.4"/>' +
        '<g fill="#FFFFFF" opacity="0.7">' +
          '<ellipse cx="30" cy="35" rx="15" ry="5"/>' +
          '<ellipse cx="90" cy="25" rx="20" ry="6"/>' +
          '<ellipse cx="190" cy="80" rx="12" ry="4"/>' +
        '</g>' +
        '<path d="M20,280 L25,275 L30,280" stroke="#3E2723" stroke-width="0.8" fill="none"/>' +
        '<circle cx="170" cy="275" r="2" fill="#FFCCBC"/>' +
        '<path d="M140,285 Q145,280 150,285 Q155,280 160,285" stroke="#4E342E" stroke-width="0.5" fill="none" opacity="0.5"/>';
    }
  },
  {
    id: 'bg_galaxy', name: '銀河', category: 'background', price: 500, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<radialGradient id="bg_galaxy-bg" cx="50%" cy="50%" r="70%">' +
          '<stop offset="0%" stop-color="#4A148C"/><stop offset="50%" stop-color="#1A237E"/><stop offset="100%" stop-color="#0A0A3C"/>' +
        '</radialGradient>' +
        '<radialGradient id="bg_galaxy-nebula" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#F48FB1" stop-opacity="0.6"/><stop offset="100%" stop-color="#F48FB1" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="bg_galaxy-nebula2" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#4FC3F7" stop-opacity="0.6"/><stop offset="100%" stop-color="#4FC3F7" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="bg_galaxy-core" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFFDE7"/><stop offset="40%" stop-color="#FFB74D"/><stop offset="100%" stop-color="#E65100" stop-opacity="0"/>' +
        '</radialGradient></defs>' +
        '<rect x="0" y="0" width="200" height="300" fill="url(#bg_galaxy-bg)"/>' +
        '<ellipse cx="60" cy="100" rx="70" ry="50" fill="url(#bg_galaxy-nebula)"/>' +
        '<ellipse cx="150" cy="200" rx="70" ry="50" fill="url(#bg_galaxy-nebula2)"/>' +
        '<ellipse cx="100" cy="150" rx="80" ry="20" fill="url(#bg_galaxy-core)" transform="rotate(25 100 150)"/>' +
        '<circle cx="100" cy="150" r="8" fill="#FFFDE7"/>' +
        '<g fill="#FFFFFF">' +
          '<circle cx="20" cy="30" r="1"/><circle cx="50" cy="20" r="0.8"/>' +
          '<circle cx="80" cy="45" r="1.2"/><circle cx="120" cy="25" r="1"/>' +
          '<circle cx="150" cy="55" r="0.8"/><circle cx="180" cy="35" r="1.2"/>' +
          '<circle cx="15" cy="80" r="0.8"/><circle cx="190" cy="95" r="1"/>' +
          '<circle cx="40" cy="180" r="1"/><circle cx="170" cy="250" r="1.2"/>' +
          '<circle cx="85" cy="270" r="0.8"/><circle cx="130" cy="285" r="1"/>' +
          '<circle cx="25" cy="250" r="0.8"/><circle cx="190" cy="270" r="1"/>' +
          '<circle cx="60" cy="230" r="0.8"/><circle cx="110" cy="215" r="0.8"/>' +
        '</g>' +
        '<g fill="#FFFDE7" opacity="0.95">' +
          '<polygon points="170,80 172,86 178,86 173,90 175,96 170,92 165,96 167,90 162,86 168,86"/>' +
          '<polygon points="40,250 41,254 45,254 42,257 43,261 40,258 37,261 38,257 35,254 39,254"/>' +
        '</g>';
    }
  },
  {
    id: 'bg_castle', name: '城', category: 'background', price: 400, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_castle-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#5E35B1"/><stop offset="100%" stop-color="#F06292"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_castle-w" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#616161"/><stop offset="100%" stop-color="#212121"/>' +
        '</linearGradient></defs>' +
        '<rect x="0" y="0" width="200" height="260" fill="url(#bg_castle-sky)"/>' +
        '<rect x="0" y="260" width="200" height="40" fill="#1B5E20"/>' +
        '<path d="M0,230 L30,200 L60,220 L90,180 L130,210 L160,190 L200,230 L200,260 L0,260 Z" fill="#1B5E20" opacity="0.6"/>' +
        '<rect x="30" y="100" width="15" height="160" fill="url(#bg_castle-w)"/>' +
        '<polygon points="30,100 37,82 45,100" fill="#212121"/>' +
        '<rect x="50" y="140" width="70" height="120" fill="url(#bg_castle-w)"/>' +
        '<rect x="68" y="100" width="34" height="40" fill="url(#bg_castle-w)"/>' +
        '<polygon points="68,100 85,70 102,100" fill="#212121"/>' +
        '<rect x="125" y="120" width="20" height="140" fill="url(#bg_castle-w)"/>' +
        '<polygon points="125,120 135,95 145,120" fill="#212121"/>' +
        '<rect x="150" y="150" width="25" height="110" fill="url(#bg_castle-w)"/>' +
        '<polygon points="150,150 162,125 175,150" fill="#212121"/>' +
        '<rect x="32" y="130" width="4" height="6" fill="#FFEB3B"/>' +
        '<rect x="39" y="130" width="4" height="6" fill="#FFEB3B"/>' +
        '<rect x="80" y="170" width="12" height="18" rx="6" fill="#0A0A0A"/>' +
        '<rect x="60" y="165" width="5" height="7" fill="#FFEB3B"/>' +
        '<rect x="70" y="165" width="5" height="7" fill="#FFEB3B"/>' +
        '<rect x="100" y="165" width="5" height="7" fill="#FFEB3B"/>' +
        '<rect x="110" y="165" width="5" height="7" fill="#FFEB3B"/>' +
        '<rect x="60" y="200" width="5" height="7" fill="#FFEB3B"/>' +
        '<rect x="100" y="200" width="5" height="7" fill="#FFEB3B"/>' +
        '<rect x="85" y="115" width="5" height="8" fill="#FFEB3B"/>' +
        '<rect x="132" y="150" width="5" height="8" fill="#FFEB3B"/>' +
        '<rect x="158" y="180" width="5" height="8" fill="#FFEB3B"/>' +
        '<rect x="165" y="180" width="5" height="8" fill="#FFEB3B"/>' +
        '<circle cx="170" cy="40" r="14" fill="#FFFDE7" opacity="0.9"/>' +
        '<circle cx="166" cy="37" r="3" fill="#E0E0E0" opacity="0.5"/>';
    }
  },
  {
    id: 'bg_rainbow', name: '虹', category: 'background', price: 300, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="bg_rainbow-sky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#81D4FA"/><stop offset="100%" stop-color="#E1F5FE"/>' +
        '</linearGradient>' +
        '<linearGradient id="bg_rainbow-ground" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#81C784"/><stop offset="100%" stop-color="#2E7D32"/>' +
        '</linearGradient></defs>' +
        '<rect x="0" y="0" width="200" height="260" fill="url(#bg_rainbow-sky)"/>' +
        '<rect x="0" y="260" width="200" height="40" fill="url(#bg_rainbow-ground)"/>' +
        '<path d="M -30,260 A 130,130 0 0 1 230,260" stroke="#E53935" stroke-width="10" fill="none"/>' +
        '<path d="M -20,260 A 120,120 0 0 1 220,260" stroke="#FB8C00" stroke-width="10" fill="none"/>' +
        '<path d="M -10,260 A 110,110 0 0 1 210,260" stroke="#FDD835" stroke-width="10" fill="none"/>' +
        '<path d="M 0,260 A 100,100 0 0 1 200,260" stroke="#43A047" stroke-width="10" fill="none"/>' +
        '<path d="M 10,260 A 90,90 0 0 1 190,260" stroke="#1E88E5" stroke-width="10" fill="none"/>' +
        '<path d="M 20,260 A 80,80 0 0 1 180,260" stroke="#8E24AA" stroke-width="10" fill="none"/>' +
        '<g fill="#FFFFFF">' +
          '<ellipse cx="30" cy="40" rx="22" ry="8"/>' +
          '<ellipse cx="45" cy="35" rx="18" ry="7"/>' +
          '<ellipse cx="170" cy="60" rx="25" ry="9"/>' +
          '<ellipse cx="185" cy="55" rx="16" ry="7"/>' +
          '<ellipse cx="110" cy="25" rx="20" ry="6"/>' +
        '</g>' +
        '<circle cx="30" cy="40" r="5" fill="#E1F5FE"/>' +
        '<circle cx="170" cy="60" r="6" fill="#E1F5FE"/>';
    }
  },

  // ========== HANDHELD ==========
  {
    id: 'held_book', name: '本', category: 'handheld', price: 30, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_book-c" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#8D6E63"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<path d="M118,198 L148,196 L150,214 L120,216 Z" fill="url(#held_book-c)"/>' +
        '<path d="M118,198 L120,216 L118,216 Q115,207 118,198 Z" fill="#3E2723"/>' +
        '<path d="M120,200 L148,198 L148,212 L120,214 Z" fill="#FFFDE7"/>' +
        '<line x1="122" y1="203" x2="146" y2="201" stroke="#BDBDBD" stroke-width="0.4"/>' +
        '<line x1="122" y1="206" x2="146" y2="204" stroke="#BDBDBD" stroke-width="0.4"/>' +
        '<line x1="122" y1="209" x2="146" y2="207" stroke="#BDBDBD" stroke-width="0.4"/>' +
        '<line x1="122" y1="212" x2="146" y2="210" stroke="#BDBDBD" stroke-width="0.4"/>' +
        '<line x1="134" y1="197" x2="134" y2="215" stroke="#6D4C41" stroke-width="0.7"/>' +
        '<rect x="140" y="199" width="1.5" height="15" fill="#EF5350"/>';
    }
  },
  {
    id: 'held_bag', name: '鞄', category: 'handheld', price: 50, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_bag-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#6D4C41"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient></defs>' +
        '<path d="M130,202 Q134,192 138,202" stroke="#3E2723" stroke-width="1.5" fill="none"/>' +
        '<rect x="124" y="202" width="22" height="22" rx="3" fill="url(#held_bag-g)" stroke="#1B0F0A" stroke-width="0.6"/>' +
        '<rect x="124" y="204" width="22" height="2" fill="#5D4037"/>' +
        '<rect x="130" y="212" width="10" height="6" rx="1" fill="#1B0F0A"/>' +
        '<circle cx="135" cy="215" r="1.2" fill="#FFD54F"/>' +
        '<circle cx="135" cy="215" r="0.5" fill="#F57F17"/>' +
        '<path d="M126,219 L144,219" stroke="#3E2723" stroke-width="0.5"/>' +
        '<circle cx="128" cy="221" r="0.7" fill="#FFD54F"/>' +
        '<circle cx="142" cy="221" r="0.7" fill="#FFD54F"/>';
    }
  },
  {
    id: 'held_backpack', name: 'リュック', category: 'handheld', price: 40, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_backpack-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#1E88E5"/><stop offset="100%" stop-color="#0D47A1"/>' +
        '</linearGradient></defs>' +
        '<path d="M66,148 Q62,148 60,152 L60,198 Q62,202 66,202 L78,202 L78,146 L66,146 Z" fill="url(#held_backpack-g)" stroke="#0D1454" stroke-width="0.7"/>' +
        '<path d="M122,146 L134,146 Q138,148 140,152 L140,198 Q138,202 134,202 L122,202 Z" fill="url(#held_backpack-g)" stroke="#0D1454" stroke-width="0.7"/>' +
        '<path d="M60,170 L78,170" stroke="#0D1454" stroke-width="0.5"/>' +
        '<path d="M122,170 L140,170" stroke="#0D1454" stroke-width="0.5"/>' +
        '<rect x="63" y="155" width="12" height="10" rx="2" fill="#0D47A1" stroke="#0D1454" stroke-width="0.4"/>' +
        '<rect x="125" y="155" width="12" height="10" rx="2" fill="#0D47A1" stroke="#0D1454" stroke-width="0.4"/>' +
        '<circle cx="69" cy="160" r="1" fill="#FFD54F"/>' +
        '<circle cx="131" cy="160" r="1" fill="#FFD54F"/>' +
        '<path d="M62,178 Q65,180 68,178" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.5"/>' +
        '<path d="M132,178 Q135,180 138,178" stroke="#FFFFFF" stroke-width="0.8" fill="none" opacity="0.5"/>';
    }
  },
  {
    id: 'held_wand', name: '魔法の杖', category: 'handheld', price: 300, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_wand-stick" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#8D6E63"/><stop offset="100%" stop-color="#3E2723"/>' +
        '</linearGradient>' +
        '<radialGradient id="held_wand-star" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFFDE7"/><stop offset="60%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#F57F17"/>' +
        '</radialGradient></defs>' +
        '<rect x="133" y="150" width="3" height="54" rx="1" fill="url(#held_wand-stick)" transform="rotate(25 134 200)"/>' +
        '<circle cx="158" cy="140" r="14" fill="url(#held_wand-star)" filter="url(#av-glow)" opacity="0.5"/>' +
        '<polygon points="158,125 162,136 174,136 164,143 168,154 158,147 148,154 152,143 142,136 154,136" fill="url(#held_wand-star)" stroke="#E65100" stroke-width="0.5"/>' +
        '<circle cx="158" cy="140" r="3" fill="#FFFDE7"/>' +
        '<circle cx="157" cy="138" r="1" fill="#FFFFFF"/>' +
        '<circle cx="170" cy="155" r="1" fill="#FFF59D" opacity="0.9"/>' +
        '<circle cx="148" cy="160" r="0.8" fill="#FFF59D" opacity="0.9"/>' +
        '<polygon points="175,130 176,132 178,132 176,133 177,135 175,134 173,135 174,133 172,132 174,132" fill="#FFFFFF" opacity="0.9"/>';
    }
  },
  {
    id: 'held_sword', name: '勇者の剣', category: 'handheld', price: 500, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_sword-blade" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#ECEFF1"/><stop offset="100%" stop-color="#78909C"/>' +
        '</linearGradient>' +
        '<linearGradient id="held_sword-hilt" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#E65100"/>' +
        '</linearGradient></defs>' +
        '<polygon points="130,200 138,200 138,140 134,130 130,140" fill="url(#held_sword-blade)" stroke="#546E7A" stroke-width="0.6"/>' +
        '<line x1="134" y1="135" x2="134" y2="198" stroke="#90A4AE" stroke-width="0.6" opacity="0.8"/>' +
        '<polygon points="132,134 134,128 136,134" fill="#ECEFF1"/>' +
        '<rect x="120" y="198" width="28" height="6" rx="1" fill="url(#held_sword-hilt)" stroke="#BF360C" stroke-width="0.6"/>' +
        '<rect x="121" y="199" width="26" height="1.5" fill="#FFFDE7" opacity="0.7"/>' +
        '<rect x="130" y="204" width="8" height="14" rx="2" fill="#4E342E"/>' +
        '<line x1="130" y1="207" x2="138" y2="207" stroke="#1B0F0A" stroke-width="0.4"/>' +
        '<line x1="130" y1="211" x2="138" y2="211" stroke="#1B0F0A" stroke-width="0.4"/>' +
        '<line x1="130" y1="215" x2="138" y2="215" stroke="#1B0F0A" stroke-width="0.4"/>' +
        '<circle cx="134" cy="220" r="3.5" fill="url(#held_sword-hilt)" stroke="#BF360C" stroke-width="0.5"/>' +
        '<circle cx="134" cy="220" r="1.5" fill="#C62828"/>';
    }
  },
  {
    id: 'held_lightsaber', name: 'ライトセーバー', category: 'handheld', price: 600, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_lightsaber-hilt" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#B0BEC5"/><stop offset="100%" stop-color="#37474F"/>' +
        '</linearGradient>' +
        '<radialGradient id="held_lightsaber-glow" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="40%" stop-color="#4FC3F7"/><stop offset="100%" stop-color="#01579B" stop-opacity="0"/>' +
        '</radialGradient></defs>' +
        '<rect x="126" y="125" width="16" height="80" rx="7" fill="url(#held_lightsaber-glow)" filter="url(#av-glow)"/>' +
        '<rect x="131" y="125" width="6" height="80" rx="3" fill="#FFFFFF"/>' +
        '<rect x="132" y="125" width="4" height="80" fill="#4FC3F7" opacity="0.9"/>' +
        '<circle cx="134" cy="125" r="2" fill="#FFFFFF"/>' +
        '<rect x="128" y="202" width="12" height="20" rx="2" fill="url(#held_lightsaber-hilt)" stroke="#263238" stroke-width="0.6"/>' +
        '<rect x="128" y="205" width="12" height="1.5" fill="#78909C"/>' +
        '<rect x="128" y="210" width="12" height="1.5" fill="#78909C"/>' +
        '<rect x="128" y="215" width="12" height="1.5" fill="#78909C"/>' +
        '<circle cx="134" cy="207" r="1" fill="#F44336"/>' +
        '<rect x="126" y="200" width="16" height="3" rx="0.5" fill="#263238"/>';
    }
  },
  {
    id: 'held_trophy', name: 'トロフィー', category: 'handheld', price: 400, isDefault: false,
    getSVG: function() {
      return '<defs>' +
        '<linearGradient id="held_trophy-g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFF59D"/><stop offset="50%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#E65100"/>' +
        '</linearGradient></defs>' +
        '<path d="M122,150 Q115,155 115,165 Q115,175 122,178 L122,168 Z" fill="url(#held_trophy-g)" stroke="#E65100" stroke-width="0.5"/>' +
        '<path d="M146,150 Q153,155 153,165 Q153,175 146,178 L146,168 Z" fill="url(#held_trophy-g)" stroke="#E65100" stroke-width="0.5"/>' +
        '<path d="M122,145 L146,145 L148,180 Q134,190 120,180 Z" fill="url(#held_trophy-g)" stroke="#E65100" stroke-width="0.8"/>' +
        '<path d="M124,148 L144,148" stroke="#FFFDE7" stroke-width="1" opacity="0.8"/>' +
        '<path d="M125,155 Q134,160 143,155" stroke="#E65100" stroke-width="0.5" fill="none" opacity="0.7"/>' +
        '<text x="134" y="168" font-family="Arial" font-size="8" font-weight="900" text-anchor="middle" fill="#E65100">1</text>' +
        '<rect x="130" y="186" width="8" height="8" fill="url(#held_trophy-g)"/>' +
        '<rect x="125" y="194" width="18" height="6" rx="1" fill="url(#held_trophy-g)" stroke="#E65100" stroke-width="0.5"/>' +
        '<rect x="125" y="194" width="18" height="1.5" fill="#FFFDE7" opacity="0.7"/>' +
        '<circle cx="130" cy="165" r="1" fill="#FFFFFF" opacity="0.8"/>' +
        '<polygon points="120,140 121,142 123,142 121,143 122,145 120,144 118,145 119,143 117,142 119,142" fill="#FFF59D"/>' +
        '<polygon points="148,142 149,144 151,144 149,145 150,147 148,146 146,147 147,145 145,144 147,144" fill="#FFF59D"/>';
    }
  }
];
