// ===== アバターショップアイテム（ハンゲーム風リニューアル）=====
window.AVATAR_ITEMS = [
// ===== hair =====
{ id:'hair_short_dark', category:'hair', name:'ショートヘア', price:0, isDefault:true,
  getSVG:function(){ return '' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q155,99 148,97 L148,80 Q149,60 138,48 L62,48 Q51,60 52,80 L52,97 Q45,99 45,90 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#423026" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 L58,90 L54,108 Q50,100 50,88 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2"/>' +
    '<path d="M150,88 L142,90 L146,108 Q150,100 150,88 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#5A4030" opacity="0.9"/>';
  } },
{ id:'hair_long_dark', category:'hair', name:'ロングヘア', price:0, isDefault:true,
  getSVG:function(){ return '' +
    '<path d="M47,66 C40,96 39,136 48,172 Q53,181 60,173 C55,140 56,104 61,76 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M153,66 C160,96 161,136 152,172 Q147,181 140,173 C145,140 144,104 139,76 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M45,88 C42,46 68,23 100,23 C132,23 158,46 155,88 Q155,97 148,95 L148,78 Q149,58 138,47 L62,47 Q51,58 52,78 L52,95 Q45,97 45,88 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,86 C48,50 70,26 100,26 C130,26 152,50 150,86 L145,88 Q143,68 138,62 Q134,80 127,84 Q122,62 115,58 Q111,78 103,82 Q100,62 95,82 Q88,78 85,58 Q78,62 73,84 Q66,80 62,62 Q57,68 55,88 Z" fill="#423026" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M66,42 Q82,29 102,30 Q84,35 72,46 Z" fill="#5A4030" opacity="0.9"/>' +
    '<path d="M46,110 Q45,140 50,162 L45,152 Q42,130 46,110 Z" fill="#241711" opacity="0.5"/>';
  } },
{ id:'hair_bob', category:'hair', name:'ボブヘア', price:25,
  getSVG:function(){ return '' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q156,112 150,120 Q147,124 143,120 L142,96 L141,78 Q140,60 130,50 L70,50 Q60,60 59,78 L58,96 L57,120 Q53,124 50,120 Q44,112 45,90 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#423026" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M58,96 L59,120 Q57,124 53,121 L52,98 Z" fill="#2E2019" opacity="0.7"/>' +
    '<path d="M142,96 L141,120 Q143,124 147,121 L148,98 Z" fill="#2E2019" opacity="0.7"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#5A4030" opacity="0.9"/>';
  } },
{ id:'hair_medium', category:'hair', name:'ミディアムヘア', price:20,
  getSVG:function(){ return '' +
    '<path d="M46,68 C41,96 41,128 47,150 Q51,157 57,151 C53,128 53,102 58,78 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M154,68 C159,96 159,128 153,150 Q149,157 143,151 C147,128 147,102 142,78 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q155,99 148,97 L148,80 Q149,60 138,48 L62,48 Q51,60 52,80 L52,97 Q45,99 45,90 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#423026" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#5A4030" opacity="0.9"/>' +
    '<path d="M48,100 Q46,124 51,144 L47,138 Q44,118 47,100 Z" fill="#241711" opacity="0.5"/>';
  } },
{ id:'hair_twin_dark', category:'hair', name:'ツインテール', price:30,
  getSVG:function(){ return '' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q155,99 148,97 L148,80 Q149,60 138,48 L62,48 Q51,60 52,80 L52,97 Q45,99 45,90 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#423026" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#5A4030" opacity="0.9"/>' +
    '<path d="M43,78 Q38,86 41,94 Q47,98 52,93 Q54,85 51,78 Q47,74 43,78 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<ellipse cx="46" cy="86" rx="6" ry="5.5" fill="#E86FA0" stroke="#1D120C" stroke-width="1.8"/>' +
    '<path d="M40,88 C30,104 27,126 33,146 Q37,153 43,147 C39,128 40,108 46,92 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M35,104 Q33,124 38,140" stroke="#241711" stroke-width="1.6" opacity="0.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M157,78 Q162,86 159,94 Q153,98 148,93 Q146,85 149,78 Q153,74 157,78 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<ellipse cx="154" cy="86" rx="6" ry="5.5" fill="#E86FA0" stroke="#1D120C" stroke-width="1.8"/>' +
    '<path d="M160,88 C170,104 173,126 167,146 Q163,153 157,147 C161,128 160,108 154,92 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M165,104 Q167,124 162,140" stroke="#241711" stroke-width="1.6" opacity="0.5" fill="none" stroke-linecap="round"/>';
  } },
{ id:'hair_ponytail', category:'hair', name:'ポニーテール', price:30,
  getSVG:function(){ return '' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q155,99 148,97 L148,80 Q149,60 138,48 L62,48 Q51,60 52,80 L52,97 Q45,99 45,90 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#423026" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#5A4030" opacity="0.9"/>' +
    '<path d="M148,72 Q158,74 160,84 Q158,92 149,90 Q146,80 148,72 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<ellipse cx="154" cy="80" rx="6.5" ry="6" fill="#E84B4B" stroke="#1D120C" stroke-width="1.8"/>' +
    '<path d="M152,84 C168,96 176,118 170,144 Q166,153 159,148 C165,126 160,104 148,90 Z" fill="#3A2820" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M156,100 Q160,120 154,140" stroke="#241711" stroke-width="1.6" opacity="0.5" fill="none" stroke-linecap="round"/>';
  } },
{ id:'hair_short_blonde', category:'hair', name:'金髪ショート', price:50,
  getSVG:function(){ return '' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q155,99 148,97 L148,80 Q149,60 138,48 L62,48 Q51,60 52,80 L52,97 Q45,99 45,90 Z" fill="#F2C94C" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#F6D96A" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 L58,90 L54,108 Q50,100 50,88 Z" fill="#E8B93E" stroke="#1D120C" stroke-width="2"/>' +
    '<path d="M150,88 L142,90 L146,108 Q150,100 150,88 Z" fill="#E8B93E" stroke="#1D120C" stroke-width="2"/>' +
    '<path d="M130,50 Q142,64 140,84 L136,84 Q138,64 127,52 Z" fill="#D9A62E" opacity="0.6"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#FFF0B8" opacity="0.95"/>';
  } },
{ id:'hair_long_pink', category:'hair', name:'ピンクロング', price:80,
  getSVG:function(){ return '' +
    '<path d="M47,66 C40,96 39,136 48,172 Q53,181 60,173 C55,140 56,104 61,76 Z" fill="#F48FB1" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M153,66 C160,96 161,136 152,172 Q147,181 140,173 C145,140 144,104 139,76 Z" fill="#F48FB1" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M45,88 C42,46 68,23 100,23 C132,23 158,46 155,88 Q155,97 148,95 L148,78 Q149,58 138,47 L62,47 Q51,58 52,78 L52,95 Q45,97 45,88 Z" fill="#F48FB1" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,86 C48,50 70,26 100,26 C130,26 152,50 150,86 L145,88 Q143,68 138,62 Q134,80 127,84 Q122,62 115,58 Q111,78 103,82 Q100,62 95,82 Q88,78 85,58 Q78,62 73,84 Q66,80 62,62 Q57,68 55,88 Z" fill="#F9B3CC" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M135,52 Q146,66 144,86 L140,86 Q142,66 132,54 Z" fill="#E06A96" opacity="0.55"/>' +
    '<path d="M46,110 Q45,140 50,162 L45,152 Q42,130 46,110 Z" fill="#E06A96" opacity="0.5"/>' +
    '<path d="M66,42 Q82,29 102,30 Q84,35 72,46 Z" fill="#FFE1EC" opacity="0.95"/>';
  } },
{ id:'hair_ponytail_silver', category:'hair', name:'シルバーポニテ', price:70,
  getSVG:function(){ return '' +
    '<path d="M45,90 C42,46 68,23 100,23 C132,23 158,46 155,90 Q155,99 148,97 L148,80 Q149,60 138,48 L62,48 Q51,60 52,80 L52,97 Q45,99 45,90 Z" fill="#C8CDD6" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,88 C48,52 68,26 100,26 C132,26 152,52 150,88 L146,90 L142,66 L134,84 L127,60 L118,80 L108,58 L100,78 L90,58 L80,80 L71,60 L64,84 L58,66 L54,90 Z" fill="#DEE2E8" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M68,40 Q84,29 103,30 Q86,34 74,44 Z" fill="#F4F6F9" opacity="0.95"/>' +
    '<path d="M148,72 Q158,74 160,84 Q158,92 149,90 Q146,80 148,72 Z" fill="#C8CDD6" stroke="#1D120C" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<ellipse cx="154" cy="80" rx="6.5" ry="6" fill="#8FA3C4" stroke="#1D120C" stroke-width="1.8"/>' +
    '<path d="M152,84 C168,96 176,118 170,144 Q166,153 159,148 C165,126 160,104 148,90 Z" fill="#C8CDD6" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M156,100 Q160,120 154,140" stroke="#9AA1AC" stroke-width="1.6" opacity="0.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M160,90 Q165,110 162,132" stroke="#F4F6F9" stroke-width="1.4" opacity="0.7" fill="none" stroke-linecap="round"/>';
  } },
{ id:'hair_long_red', category:'hair', name:'赤ロング', price:90,
  getSVG:function(){ return '' +
    '<path d="M47,66 C40,96 39,136 48,172 Q53,181 60,173 C55,140 56,104 61,76 Z" fill="#C0392B" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M153,66 C160,96 161,136 152,172 Q147,181 140,173 C145,140 144,104 139,76 Z" fill="#C0392B" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M45,88 C42,46 68,23 100,23 C132,23 158,46 155,88 Q155,97 148,95 L148,78 Q149,58 138,47 L62,47 Q51,58 52,78 L52,95 Q45,97 45,88 Z" fill="#C0392B" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,86 C48,50 70,26 100,26 C130,26 152,50 150,86 L145,88 Q143,68 138,62 Q134,80 127,84 Q122,62 115,58 Q111,78 103,82 Q100,62 95,82 Q88,78 85,58 Q78,62 73,84 Q66,80 62,62 Q57,68 55,88 Z" fill="#D14A3B" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M135,52 Q146,66 144,86 L140,86 Q142,66 132,54 Z" fill="#8E2A1F" opacity="0.6"/>' +
    '<path d="M46,110 Q45,140 50,162 L45,152 Q42,130 46,110 Z" fill="#8E2A1F" opacity="0.55"/>' +
    '<path d="M66,42 Q82,29 102,30 Q84,35 72,46 Z" fill="#F0A090" opacity="0.9"/>';
  } },
{ id:'hair_rainbow', category:'hair', name:'虹色ヘア', price:300,
  getSVG:function(){ return '' +
    '<defs>' +
    '<linearGradient id="hair_rainbow-g1" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#F76C6C"/>' +
    '<stop offset="20%" stop-color="#F5B942"/>' +
    '<stop offset="40%" stop-color="#7ED957"/>' +
    '<stop offset="60%" stop-color="#4FB6E8"/>' +
    '<stop offset="80%" stop-color="#8B7CE8"/>' +
    '<stop offset="100%" stop-color="#E86FC0"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<path d="M47,66 C40,96 39,136 48,172 Q53,181 60,173 C55,140 56,104 61,76 Z" fill="url(#hair_rainbow-g1)" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M153,66 C160,96 161,136 152,172 Q147,181 140,173 C145,140 144,104 139,76 Z" fill="url(#hair_rainbow-g1)" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M45,88 C42,46 68,23 100,23 C132,23 158,46 155,88 Q155,97 148,95 L148,78 Q149,58 138,47 L62,47 Q51,58 52,78 L52,95 Q45,97 45,88 Z" fill="url(#hair_rainbow-g1)" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M50,86 C48,50 70,26 100,26 C130,26 152,50 150,86 L145,88 Q143,68 138,62 Q134,80 127,84 Q122,62 115,58 Q111,78 103,82 Q100,62 95,82 Q88,78 85,58 Q78,62 73,84 Q66,80 62,62 Q57,68 55,88 Z" fill="url(#hair_rainbow-g1)" stroke="#1D120C" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M66,42 Q82,29 102,30 Q84,35 72,46 Z" fill="#FFFFFF" opacity="0.5"/>' +
    '<path d="M135,52 Q146,66 144,86 L140,86 Q142,66 132,54 Z" fill="#1D120C" opacity="0.15"/>' +
    '<path d="M46,110 Q45,140 50,162 L45,152 Q42,130 46,110 Z" fill="#1D120C" opacity="0.12"/>';
  } },
// ===== tops =====
{ id:'tshirt_white', category:'tops', name:'白Tシャツ', price:0, isDefault:true,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,179 59,179 L76,177 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,179 141,179 L124,177 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#E7E3DC"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#E7E3DC" opacity="0.85"/>' +
    '<path d="M87,138 Q100,150 113,138 Q100,144 87,138 Z" fill="#E7E3DC" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M78,202 Q82,205 86,202" stroke="#D8D3CC" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M92,204 Q96,207 100,204" stroke="#D8D3CC" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  } },
{ id:'tshirt_red', category:'tops', name:'赤Tシャツ', price:15,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,179 59,179 L76,177 Z" fill="#E23B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,179 141,179 L124,177 Z" fill="#E23B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#B32F2F" opacity="0.85"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#E23B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#B32F2F" opacity="0.85"/>' +
    '<path d="M87,138 Q100,150 113,138 Q100,144 87,138 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M80,159 L92,159 L92,171 L80,171 Z" fill="none" stroke="#B32F2F" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M78,202 Q82,205 86,202" stroke="#F08080" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M92,204 Q96,207 100,204" stroke="#F08080" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  } },
{ id:'tshirt_blue', category:'tops', name:'青Tシャツ', price:15,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,179 59,179 L76,177 Z" fill="#4A90E2" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,179 141,179 L124,177 Z" fill="#4A90E2" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#33689F" opacity="0.85"/>' +
    '<defs><clipPath id="tshirt_blue-clip"><path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z"/></clipPath></defs>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#4A90E2" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<g clip-path="url(#tshirt_blue-clip)">' +
    '<rect x="69" y="158" width="62" height="7" fill="#FFFFFF"/>' +
    '<rect x="69" y="174" width="62" height="7" fill="#FFFFFF"/>' +
    '<rect x="69" y="190" width="62" height="7" fill="#FFFFFF"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#33689F" opacity="0.3"/>' +
    '</g>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="none" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M87,138 Q100,150 113,138 Q100,144 87,138 Z" fill="#EAF2FC" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>';
  } },
{ id:'hoodie_navy', category:'tops', name:'ネイビーパーカー', price:80,
  getSVG:function(){ return '' +
    '<path d="M79,143 Q75,126 87,121 Q84,132 83,143 Z" fill="#22314F" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M121,143 Q125,126 113,121 Q116,132 117,143 Z" fill="#22314F" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M75,140 Q56,143 51,158 Q48,169 51,177 Q52,182 58,181 L76,178 Z" fill="#2C3E63" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M125,140 Q144,143 149,158 Q152,169 149,177 Q148,182 142,181 L124,178 Z" fill="#2C3E63" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M142,147 Q148,162 145,177 L140,176 Q144,160 137,148 Z" fill="#1D2C48" opacity="0.85"/>' +
    '<path d="M69,178 Q68,183 74,184 L76,178 Z" fill="#18233A" stroke="#4a3428" stroke-width="1.8"/>' +
    '<path d="M131,178 Q132,183 126,184 L124,178 Z" fill="#18233A" stroke="#4a3428" stroke-width="1.8"/>' +
    '<path d="M82,138 L118,138 Q132,139 133,154 L132,200 Q131,213 118,213 L82,213 Q69,213 68,200 L67,154 Q68,139 82,138 Z" fill="#2C3E63" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M118,143 Q129,174 122,209 L110,209 Q121,175 107,143 Z" fill="#1D2C48" opacity="0.85"/>' +
    '<path d="M84,141 Q100,150 116,141 Q100,146 84,141 Z" fill="#1D2C48" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M79,187 Q100,182 121,187 L121,209 Q100,215 79,209 Z" fill="#22314F" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M100,185 L100,212" stroke="#151F33" stroke-width="1.6"/>' +
    '<path d="M96,144 Q95,151 96,158" stroke="#E8D9B0" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<circle cx="96" cy="159" r="1.6" fill="#E8D9B0" stroke="#4a3428" stroke-width="0.8"/>' +
    '<path d="M104,144 Q105,151 104,158" stroke="#E8D9B0" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<circle cx="104" cy="159" r="1.6" fill="#E8D9B0" stroke="#4a3428" stroke-width="0.8"/>';
  } },
{ id:'jacket_leather', category:'tops', name:'レザージャケット', price:100,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,180 60,180 L76,178 Z" fill="#3B2A24" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,180 140,180 L124,178 Z" fill="#3B2A24" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#2A1D18" opacity="0.85"/>' +
    '<path d="M69,172 L76,172 L76,180 L69,180 Z" fill="#2A1D18" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M124,172 L131,172 L131,180 L124,180 Z" fill="#2A1D18" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#3B2A24" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#2A1D18" opacity="0.85"/>' +
    '<path d="M100,148 L100,209" stroke="#1A110D" stroke-width="1.8"/>' +
    '<circle cx="100" cy="150" r="1.6" fill="#C9A227"/>' +
    '<path d="M100,138 L83,138 Q80,148 88,159 L100,148 Z" fill="#2A1D18" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M100,138 L117,138 Q120,148 112,159 L100,148 Z" fill="#2A1D18" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M100,138 L83,138 Q80,148 88,159 L100,148 Z" fill="#55403A" opacity="0.5"/>' +
    '<path d="M74,190 L82,190 L82,197 L74,197 Z" fill="none" stroke="#2A1D18" stroke-width="1.6"/>' +
    '<path d="M118,190 L126,190 L126,197 L118,197 Z" fill="none" stroke="#2A1D18" stroke-width="1.6"/>';
  } },
{ id:'sailor_top', category:'tops', name:'セーラー服', price:100,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,179 59,179 L76,177 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,179 141,179 L124,177 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#E7E3DC"/>' +
    '<path d="M71,169 L77,167 L77,175 L71,177 Z" fill="#1F3B73" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M129,169 L123,167 L123,175 L129,177 Z" fill="#1F3B73" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#E7E3DC" opacity="0.85"/>' +
    '<path d="M84,138 L100,152 L69,152 Q70,142 82,138 Z" fill="#1F3B73" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M116,138 L100,152 L131,152 Q130,142 118,138 Z" fill="#1F3B73" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M87,142 L100,153 L96,155 L84,144 Z" fill="#FFFFFF"/>' +
    '<path d="M113,142 L100,153 L104,155 L116,144 Z" fill="#FFFFFF"/>' +
    '<path d="M100,152 L93,166 L100,172 L107,166 Z" fill="#D3333F" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<circle cx="100" cy="159" r="2" fill="#B32332"/>';
  } },
{ id:'robe_wizard', category:'tops', name:'魔法使いローブ', price:300,
  getSVG:function(){ return '' +
    '<path d="M78,140 Q56,145 50,166 Q47,180 52,188 Q56,193 63,190 L77,182 Z" fill="#4B3B7C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M122,140 Q144,145 150,166 Q153,180 148,188 Q144,193 137,190 L123,182 Z" fill="#4B3B7C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M144,152 Q151,170 146,187 L140,185 Q145,168 138,153 Z" fill="#382C5E" opacity="0.85"/>' +
    '<path d="M80,138 L120,138 Q135,140 137,158 L143,222 Q144,229 136,229 L64,229 Q56,229 57,222 L63,158 Q65,140 80,138 Z" fill="#4B3B7C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M118,142 Q131,178 128,224 L114,224 Q120,180 106,142 Z" fill="#382C5E" opacity="0.85"/>' +
    '<path d="M85,140 Q100,152 115,140 Q100,146 85,140 Z" fill="#382C5E" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M57,222 L143,222 L144,229 Q144,229 136,229 L64,229 Q56,229 57,222 Z" fill="#D4AF37" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M80,138 L120,138 Q121,142 118,144 L82,144 Q79,142 80,138 Z" fill="#D4AF37" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M69,196 L131,196 L129,205 Q100,210 71,205 Z" fill="#D9B65C" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M93,196 L107,196 L106,207 L94,207 Z" fill="#B3922E" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M92,207 L88,219 M108,207 L112,219" stroke="#B3922E" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M75,163 L79,167 L75,171 L71,167 Z" fill="#E8CE6B" opacity="0.9"/>' +
    '<path d="M124,175 L128,179 L124,183 L120,179 Z" fill="#E8CE6B" opacity="0.9"/>' +
    '<path d="M86,205 L89,209 L86,213 L83,209 Z" fill="#E8CE6B" opacity="0.9"/>';
  } },
{ id:'kimono_red', category:'tops', name:'着物', price:250,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q56,144 51,162 Q48,175 52,183 Q56,188 63,185 L76,178 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q144,144 149,162 Q152,175 148,183 Q144,188 137,185 L124,178 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M143,148 Q150,166 146,182 L140,180 Q145,164 137,150 Z" fill="#962B2B" opacity="0.85"/>' +
    '<path d="M52,180 Q50,190 54,197 Q62,199 76,192 L76,175 Q64,180 52,180 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M148,180 Q150,190 146,197 Q138,199 124,192 L124,175 Q136,180 148,180 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M67,168 L76,166 L76,182 L67,184 Z" fill="#F4E9D8" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M133,168 L124,166 L124,182 L133,184 Z" fill="#F4E9D8" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M79,138 L121,138 Q134,140 136,158 L141,224 Q142,230 134,230 L66,230 Q58,230 59,224 L64,158 Q66,140 79,138 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q129,180 126,226 L112,226 Q118,182 104,142 Z" fill="#962B2B" opacity="0.85"/>' +
    '<path d="M100,148 L92,142 L84,196 L96,224 Z" fill="#F4E9D8" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M84,142 Q100,153 100,148 L92,142 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M116,142 Q100,153 100,148 L108,142 Z" fill="#C23B3B" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M69,192 L131,192 L131,207 L69,207 Z" fill="#D9B65C" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M91,192 L109,192 L109,207 L91,207 Z" fill="#B3922E" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M69,192 L131,192" stroke="#F0DFA0" stroke-width="1.4"/>';
  } },
{ id:'jersey_sports', category:'tops', name:'ジャージ', price:40,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,179 59,179 L76,177 Z" fill="#DD3B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,179 141,179 L124,177 Z" fill="#DD3B3B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#A82A2A" opacity="0.85"/>' +
    '<path d="M76,143 L69,152 L74,177 L79,177 Z" fill="#FFFFFF"/>' +
    '<path d="M124,143 L131,152 L126,177 L121,177 Z" fill="#FFFFFF"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M69,152 L69,212 L76,212 L76,144 Z" fill="#DD3B3B"/>' +
    '<path d="M131,152 L131,212 L124,212 L124,144 Z" fill="#DD3B3B"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#E7E3DC" opacity="0.7"/>' +
    '<path d="M87,138 Q100,150 113,138 Q100,144 87,138 Z" fill="#DD3B3B" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M90,160 L102,160 L92,184" stroke="#DD3B3B" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  } },
{ id:'cape_hero', category:'tops', name:'勇者マント', price:400,
  getSVG:function(){ return '' +
    '<path d="M74,138 Q40,148 32,180 Q26,204 34,222 Q40,232 50,224 Q46,196 52,172 Q56,152 74,144 Z" fill="#C6302E" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M126,138 Q160,148 168,180 Q174,204 166,222 Q160,232 150,224 Q154,196 148,172 Q144,152 126,144 Z" fill="#C6302E" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M126,138 Q160,148 168,180 Q174,204 166,222 Q160,232 150,224 Q154,196 148,172 Q144,152 126,144 Z" fill="#9C2220" opacity="0.55"/>' +
    '<path d="M40,178 Q36,200 42,218" stroke="#D9B65C" stroke-width="2" fill="none" opacity="0.8"/>' +
    '<path d="M76,140 Q60,142 55,155 Q52,164 54,171 Q55,175 60,175 L76,173 Z" fill="#E8D2A0" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q140,142 145,155 Q148,164 146,171 Q145,175 140,175 L124,173 Z" fill="#E8D2A0" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M139,145 Q144,158 142,171 L137,170 Q141,157 135,146 Z" fill="#C7AD78" opacity="0.85"/>' +
    '<path d="M82,138 L118,138 Q129,138 129,150 L129,205 Q129,213 118,213 L82,213 Q71,213 71,205 L71,150 Q71,138 82,138 Z" fill="#E8D2A0" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M116,142 Q125,172 120,209 L110,209 Q118,174 106,142 Z" fill="#C7AD78" opacity="0.85"/>' +
    '<path d="M85,140 Q100,150 115,140 Q100,145 85,140 Z" fill="#C7AD78" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<circle cx="100" cy="156" r="8" fill="#D4AF37" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M100,150 L103,155 L100,160 L97,155 Z" fill="#5FC7E8" stroke="#4a3428" stroke-width="1.2" stroke-linejoin="round"/>' +
    '<circle cx="100" cy="156" r="8" fill="none" stroke="#F4E2A0" stroke-width="1" opacity="0.7"/>';
  } },
{ id:'tuxedo_black', category:'tops', name:'黒タキシード', price:500,
  getSVG:function(){ return '' +
    '<path d="M76,140 Q58,142 53,156 Q50,166 52,174 Q53,179 59,179 L76,177 Z" fill="#181818" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M124,140 Q142,142 147,156 Q150,166 148,174 Q147,179 141,179 L124,177 Z" fill="#181818" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M141,146 Q146,160 144,174 L139,174 Q143,158 137,146 Z" fill="#000000" opacity="0.7"/>' +
    '<path d="M75,175 L76,180 L69,182 L68,176 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M125,175 L124,180 L131,182 L132,176 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L131,199 Q131,212 118,212 L82,212 Q69,212 69,199 L69,152 Q69,138 82,138 Z" fill="#181818" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q127,172 121,208 L110,208 Q121,174 108,142 Z" fill="#000000" opacity="0.6"/>' +
    '<path d="M89,138 L100,150 L92,208 L82,205 L86,150 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M100,138 L89,138 Q84,146 90,156 L100,148 Z" fill="#181818" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M100,138 L112,138 Q118,146 111,156 L100,148 Z" fill="#181818" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M94,150 L90,155 L94,161 L98,155 Z" fill="#181818" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<circle cx="92" cy="168" r="1.6" fill="#181818" stroke="#4a3428" stroke-width="1"/>' +
    '<circle cx="90" cy="182" r="1.6" fill="#181818" stroke="#4a3428" stroke-width="1"/>' +
    '<circle cx="88" cy="196" r="1.6" fill="#181818" stroke="#4a3428" stroke-width="1"/>';
  } },
{ id:'dress_princess', category:'tops', name:'プリンセスドレス', price:800,
  getSVG:function(){ return '' +
    '<path d="M74,142 Q58,144 55,156 Q53,166 58,171 Q64,175 72,171 L74,150 Z" fill="#F1B8D6" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M126,142 Q142,144 145,156 Q147,166 142,171 Q136,175 128,171 L126,150 Z" fill="#F1B8D6" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M140,148 Q145,159 142,170 L137,168 Q141,158 135,150 Z" fill="#D98CBB" opacity="0.85"/>' +
    '<path d="M80,138 L120,138 Q127,140 126,150 L118,166 L82,166 L74,150 Q73,140 80,138 Z" fill="#F1B8D6" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M116,142 Q123,155 118,166 L109,166 Q114,155 105,142 Z" fill="#D98CBB" opacity="0.8"/>' +
    '<path d="M84,138 Q100,150 116,138 Q100,145 84,138 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M78,166 L122,166 Q136,190 140,220 Q141,229 132,229 L68,229 Q59,229 60,220 Q64,190 78,166 Z" fill="#F6CBE0" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M116,170 Q132,196 136,224 L122,226 Q120,198 106,170 Z" fill="#D98CBB" opacity="0.75"/>' +
    '<path d="M64,204 Q100,212 136,204" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8" stroke-linecap="round"/>' +
    '<path d="M60,220 Q100,229 140,220" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8" stroke-linecap="round"/>' +
    '<circle cx="100" cy="152" r="5" fill="#E85FA0" stroke="#4a3428" stroke-width="1.8"/>' +
    '<path d="M100,148 L101.6,151.4 L105,152 L101.6,152.6 L100,156 L98.4,152.6 L95,152 L98.4,151.4 Z" fill="#FFF3F9" opacity="0.9"/>';
  } },
{ id:'armor_knight', category:'tops', name:'騎士の鎧', price:1000,
  getSVG:function(){ return '' +
    '<defs>' +
    '<linearGradient id="armor_knight-g1" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#F0F3F7"/><stop offset="0.5" stop-color="#B9C3D0"/><stop offset="1" stop-color="#7C8798"/>' +
    '</linearGradient>' +
    '<linearGradient id="armor_knight-g2" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#E4E9EF"/><stop offset="1" stop-color="#98A3B4"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<path d="M73,140 Q54,143 49,160 Q46,174 51,182 Q56,188 65,183 L76,176 L74,148 Z" fill="url(#armor_knight-g2)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M127,140 Q146,143 151,160 Q154,174 149,182 Q144,188 135,183 L124,176 L126,148 Z" fill="url(#armor_knight-g2)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M127,140 Q146,143 151,160 Q154,174 149,182 Q144,188 135,183 L124,176 L126,148 Z" fill="#5D6779" opacity="0.4"/>' +
    '<path d="M76,148 Q60,152 56,166 Q53,178 58,186 L64,181 Q62,170 65,158 Q68,151 76,150 Z" fill="#8891A0" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M124,148 Q140,152 144,166 Q147,178 142,186 L136,181 Q138,170 135,158 Q132,151 124,150 Z" fill="#8891A0" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M82,138 L118,138 Q131,138 131,152 L130,199 Q129,212 118,212 L82,212 Q71,212 70,199 L69,152 Q69,138 82,138 Z" fill="url(#armor_knight-g1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M117,142 Q127,172 121,208 L111,208 Q120,174 107,142 Z" fill="#6B7686" opacity="0.55"/>' +
    '<path d="M85,140 Q100,151 115,140 Q100,146 85,140 Z" fill="#7C8798" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M84,158 L116,158 L112,168 L100,172 L88,168 Z" fill="#9AA5B5" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<circle cx="100" cy="163" r="5.5" fill="#3E7BD6" stroke="#4a3428" stroke-width="1.8"/>' +
    '<path d="M98,160 L100,162 L104,158" stroke="#DCEBFF" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<path d="M75,190 L125,190 L125,197 L75,197 Z" fill="#8891A0" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<circle cx="79" cy="148" r="1.6" fill="#DCE2EA"/>' +
    '<circle cx="121" cy="148" r="1.6" fill="#DCE2EA"/>' +
    '<circle cx="79" cy="204" r="1.6" fill="#5A6472"/>' +
    '<circle cx="121" cy="204" r="1.6" fill="#5A6472"/>';
  } },
// ===== bottoms =====
{ id:'shorts_blue', category:'bottoms', name:'青短パン', price:0, isDefault:true,
  getSVG:function(){ return '' +
    '<path d="M74,204 L126,204 L127,226 Q127,240 120,240 L106,240 Q102,240 100,232 Q98,240 94,240 L80,240 Q73,240 73,226 Z" fill="#3E7BD6" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M118,208 Q124,222 121,236 L112,236 Q118,222 110,208 Z" fill="#2D5FA8" opacity="0.8"/>' +
    '<path d="M74,204 L126,204 L126,211 L74,211 Z" fill="#2D5FA8" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M74,233 L96,233 L95,240 L80,240 Q74,240 74,233 Z" fill="#5B93E0"/>' +
    '<path d="M104,233 L126,233 Q126,240 120,240 L105,240 Z" fill="#5B93E0"/>' +
    '<path d="M99,212 L100,228" stroke="#2D5FA8" stroke-width="1.5"/>';
  } },
{ id:'pants_black', category:'bottoms', name:'黒パンツ', price:20,
  getSVG:function(){ return '' +
    '<path d="M73,204 L127,204 L127,226 Q127,230 122,230 L78,230 Q73,230 73,226 Z" fill="#2B2B30" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M74,204 L126,204 L126,211 L74,211 Z" fill="#1E1E22" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M116,207 Q124,216 121,228 L110,228 Q116,216 106,207 Z" fill="#1A1A1E" opacity="0.75"/>' +
    '<path d="M75,222 L99,222 L97,256 Q96,258 93,258 L81,258 Q78,258 77,256 Z" fill="#2B2B30" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M101,222 L125,222 L123,256 Q122,258 119,258 L107,258 Q104,258 103,256 Z" fill="#2B2B30" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M112,224 Q120,240 117,256 L109,256 Q114,240 105,224 Z" fill="#1A1A1E" opacity="0.7"/>' +
    '<path d="M100,206 L100,224" stroke="#1A1A1E" stroke-width="1.6"/>' +
    '<path d="M85,224 L83,254" stroke="#45454C" stroke-width="1.3"/>' +
    '<path d="M115,224 L113,254" stroke="#45454C" stroke-width="1.3"/>';
  } },
{ id:'jeans_blue', category:'bottoms', name:'ジーンズ', price:60,
  getSVG:function(){ return '' +
    '<path d="M73,204 L127,204 L127,226 Q127,230 122,230 L78,230 Q73,230 73,226 Z" fill="#4A72B8" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M74,204 L126,204 L126,211 L74,211 Z" fill="#33518A" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M116,207 Q124,216 121,228 L110,228 Q116,216 106,207 Z" fill="#263F6B" opacity="0.75"/>' +
    '<path d="M75,222 L99,222 L97,256 Q96,258 93,258 L81,258 Q78,258 77,256 Z" fill="#4A72B8" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M101,222 L125,222 L123,256 Q122,258 119,258 L107,258 Q104,258 103,256 Z" fill="#4A72B8" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M112,224 Q120,240 117,256 L109,256 Q114,240 105,224 Z" fill="#263F6B" opacity="0.7"/>' +
    '<path d="M79,209 Q86,214 93,209" stroke="#33518A" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M107,209 Q114,214 121,209" stroke="#33518A" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M100,206 L100,222" stroke="#33518A" stroke-width="1.6"/>' +
    '<path d="M78,224 L82,254" stroke="#E3B655" stroke-width="1.4"/>' +
    '<path d="M122,224 L118,254" stroke="#E3B655" stroke-width="1.4"/>' +
    '<path d="M82,205 L82,208" stroke="#33518A" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M100,205 L100,208" stroke="#33518A" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M118,205 L118,208" stroke="#33518A" stroke-width="2.2" stroke-linecap="round"/>';
  } },
{ id:'skirt_pleats', category:'bottoms', name:'プリーツスカート', price:50,
  getSVG:function(){ return '' +
    '<path d="M76,204 L124,204 L136,238 Q136,242 132,242 L68,242 Q64,242 64,238 Z" fill="#D6547E" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M77,204 L123,204 L123,210 L77,210 Z" fill="#A63D63" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M112,207 Q128,222 130,240 L118,240 Q120,222 104,207 Z" fill="#8C2F52" opacity="0.7"/>' +
    '<path d="M84,208 L74,240" stroke="#A63D63" stroke-width="1.6"/>' +
    '<path d="M92,208 L88,240" stroke="#A63D63" stroke-width="1.6"/>' +
    '<path d="M100,208 L100,240" stroke="#A63D63" stroke-width="1.6"/>' +
    '<path d="M108,208 L112,240" stroke="#A63D63" stroke-width="1.6"/>' +
    '<path d="M116,208 L126,240" stroke="#A63D63" stroke-width="1.6"/>' +
    '<path d="M70,236 Q100,240 130,236" stroke="#F2A9C4" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  } },
{ id:'cargo_pants', category:'bottoms', name:'カーゴパンツ', price:80,
  getSVG:function(){ return '' +
    '<path d="M73,204 L127,204 L127,226 Q127,230 122,230 L78,230 Q73,230 73,226 Z" fill="#6B7A4F" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M74,204 L126,204 L126,211 L74,211 Z" fill="#4F5A38" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M116,207 Q124,216 121,228 L110,228 Q116,216 106,207 Z" fill="#3E4A2C" opacity="0.75"/>' +
    '<path d="M75,222 L99,222 L97,256 Q96,258 93,258 L81,258 Q78,258 77,256 Z" fill="#6B7A4F" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M101,222 L125,222 L123,256 Q122,258 119,258 L107,258 Q104,258 103,256 Z" fill="#6B7A4F" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M112,224 Q120,240 117,256 L109,256 Q114,240 105,224 Z" fill="#3E4A2C" opacity="0.7"/>' +
    '<path d="M76,231 L92,231 L91,247 Q91,250 88,250 L79,250 Q76,250 76,247 Z" fill="#5C6A44" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M75,231 L93,231 L92,236 L76,236 Z" fill="#4F5A38" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<circle cx="84" cy="233.5" r="1.3" fill="#3E4A2C"/>' +
    '<path d="M108,231 L124,231 L124,247 Q124,250 121,250 L112,250 Q109,250 109,247 Z" fill="#5C6A44" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M107,231 L125,231 L125,236 L108,236 Z" fill="#4F5A38" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<circle cx="116" cy="233.5" r="1.3" fill="#3E4A2C"/>' +
    '<path d="M100,206 L100,222" stroke="#4F5A38" stroke-width="1.6"/>';
  } },
{ id:'shorts_white', category:'bottoms', name:'白短パン', price:15,
  getSVG:function(){ return '' +
    '<path d="M74,204 L126,204 L127,226 Q127,240 120,240 L106,240 Q102,240 100,232 Q98,240 94,240 L80,240 Q73,240 73,226 Z" fill="#F2EEE4" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M118,208 Q124,222 121,236 L112,236 Q118,222 110,208 Z" fill="#D2CBB8" opacity="0.8"/>' +
    '<path d="M74,204 L126,204 L126,211 L74,211 Z" fill="#C9C0A6" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M74,233 L96,233 L95,240 L80,240 Q74,240 74,233 Z" fill="#FFFFFF"/>' +
    '<path d="M104,233 L126,233 Q126,240 120,240 L105,240 Z" fill="#FFFFFF"/>' +
    '<path d="M99,212 L100,228" stroke="#D2CBB8" stroke-width="1.5"/>' +
    '<path d="M96,207 Q100,211 104,207" stroke="#8A806A" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<circle cx="100" cy="208" r="1.5" fill="#8A806A"/>';
  } },
{ id:'skirt_long', category:'bottoms', name:'ロングスカート', price:60,
  getSVG:function(){ return '' +
    '<path d="M76,204 L124,204 L142,252 Q142,258 137,258 L63,258 Q58,258 58,252 Z" fill="#3D5A80" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M77,204 L123,204 L123,210 L77,210 Z" fill="#28405E" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M112,207 Q134,226 137,254 L122,254 Q126,226 104,207 Z" fill="#1E3049" opacity="0.7"/>' +
    '<path d="M82,212 Q78,236 74,254" stroke="#28405E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M94,212 Q92,236 90,256" stroke="#28405E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M106,212 Q108,236 110,256" stroke="#28405E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M118,212 Q124,236 128,254" stroke="#28405E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M64,250 Q100,256 136,250" stroke="#6E8FB8" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  } },
{ id:'hakama_blue', category:'bottoms', name:'袴', price:200,
  getSVG:function(){ return '' +
    '<path d="M74,204 L126,204 Q152,210 158,230 Q162,246 150,258 L50,258 Q38,246 42,230 Q48,210 74,204 Z" fill="#2A3A6B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M73,203 L127,203 L127,211 L73,211 Z" fill="#1B2650" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M118,207 Q146,222 148,244 Q146,252 138,254 L124,254 Q132,232 106,208 Z" fill="#131C3E" opacity="0.75"/>' +
    '<path d="M80,208 L46,252" stroke="#1B2650" stroke-width="1.6"/>' +
    '<path d="M88,208 L70,254" stroke="#1B2650" stroke-width="1.6"/>' +
    '<path d="M97,208 L92,256" stroke="#1B2650" stroke-width="1.6"/>' +
    '<path d="M104,208 L108,256" stroke="#1B2650" stroke-width="1.6"/>' +
    '<path d="M112,208 L130,254" stroke="#1B2650" stroke-width="1.6"/>' +
    '<path d="M120,208 L152,252" stroke="#1B2650" stroke-width="1.6"/>' +
    '<path d="M77,212 L123,225" stroke="#4a3428" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M123,212 L77,225" stroke="#4a3428" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M77,212 L123,225" stroke="#F0E6C8" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M123,212 L77,225" stroke="#F0E6C8" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="100" cy="218" r="4" fill="#F0E6C8" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M100,221 Q97,228 99,235 M100,221 Q103,228 101,235" fill="none" stroke="#4a3428" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M100,221 Q97,228 99,235 M100,221 Q103,228 101,235" fill="none" stroke="#F0E6C8" stroke-width="2.6" stroke-linecap="round"/>';
  } },
// ===== headwear =====
{ id:'cap_basic', category:'headwear', name:'キャップ', price:20,
  getSVG:function(){ return '' +
    // クラウン（頭を覆うドーム）
    '<path d="M45,68 C42,36 66,20 100,20 C134,20 158,36 155,68 Q155,76 147,72 Q100,60 53,72 Q45,76 45,68 Z" fill="#E24C4C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右かげ
    '<path d="M100,20 C134,20 158,36 155,68 Q155,76 147,72 Q124,64 100,60 Z" fill="#B23838" opacity="0.75"/>' +
    // つば（バイザー）
    '<path d="M53,64 Q100,74 147,64 Q142,78 100,81 Q58,78 53,64 Z" fill="#C93C3C" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M100,66 Q124,71 143,65 Q139,76 100,79 Z" fill="#A83030" opacity="0.6"/>' +
    // 天ボタン
    '<circle cx="100" cy="21" r="3" fill="#B23838" stroke="#4a3428" stroke-width="1.6"/>' +
    // ハイライト
    '<path d="M58,36 Q78,23 98,22" stroke="#F5897F" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.85"/>';
  } },
{ id:'beret_red', category:'headwear', name:'ベレー帽', price:50,
  getSVG:function(){ return '' +
    // ふっくらしたクラウン（右へたわむ）
    '<path d="M44,60 C40,32 64,16 98,15 C136,13 162,32 160,58 C158,72 144,77 130,70 Q100,58 66,68 Q46,72 44,60 Z" fill="#D6294B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右かげ
    '<path d="M160,58 C158,72 144,77 130,70 Q114,63 100,60 Q130,46 148,36 Q158,46 160,58 Z" fill="#A81638" opacity="0.75"/>' +
    // 縁のバンド
    '<path d="M47,58 Q100,72 157,55 Q154,66 100,80 Q49,68 47,58 Z" fill="#B81E3E" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    // てっぺんの糸ループ
    '<circle cx="116" cy="16" r="3" fill="#D6294B" stroke="#4a3428" stroke-width="1.6"/>' +
    // ハイライト
    '<path d="M54,32 Q74,19 94,16" stroke="#F0678A" stroke-width="2.2" fill="none" opacity="0.85" stroke-linecap="round"/>';
  } },
{ id:'ribbon_cute', category:'headwear', name:'リボン', price:25,
  getSVG:function(){ return '' +
    // 右かげ側の羽
    '<path d="M132,38 L149,28 Q157,32 154,40 Q157,46 149,50 L132,38 Z" fill="#EE5C9B" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    // 左の羽
    '<path d="M132,38 L115,28 Q107,32 110,40 Q107,46 115,50 L132,38 Z" fill="#FF7FB4" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    // 右かげ
    '<path d="M132,38 L149,28 Q157,32 154,40 L132,40 Z" fill="#C93E7A" opacity="0.55"/>' +
    // 中心の結び目
    '<circle cx="132" cy="38" r="5.5" fill="#E8508C" stroke="#4a3428" stroke-width="2"/>' +
    // 垂れリボン
    '<path d="M128,42 L122,56 L128,54 L130,44 Z" fill="#FF7FB4" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M136,42 L142,56 L136,54 L134,44 Z" fill="#EE5C9B" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round"/>' +
    // ハイライト
    '<path d="M118,32 Q124,35 128,38" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity="0.7" stroke-linecap="round"/>';
  } },
{ id:'halo_angel', category:'headwear', name:'天使の輪', price:150,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="halo_angel-gold1" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#FFF6D0"/>' +
        '<stop offset="55%" stop-color="#FBD65C"/>' +
        '<stop offset="100%" stop-color="#DDA928"/>' +
      '</linearGradient>' +
      '<radialGradient id="halo_angel-glow1" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#FFF6C8" stop-opacity="0.75"/>' +
        '<stop offset="100%" stop-color="#FFF6C8" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    // 光の輪（オーラ）
    '<ellipse cx="100" cy="18" rx="40" ry="16" fill="url(#halo_angel-glow1)"/>' +
    // 金の輪（楕円リング / evenodd で穴あけ）
    '<path d="M70,18 Q100,3 130,18 Q100,33 70,18 Z M81,18 Q100,10 119,18 Q100,26 81,18 Z" fill-rule="evenodd" fill="url(#halo_angel-gold1)" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    // かがやきの点
    '<path d="M66,12 L68,16 L72,17 L68,18 L66,22 L64,18 L60,17 L64,16 Z" fill="#FFFFFF" opacity="0.85"/>' +
    '<circle cx="136" cy="22" r="2" fill="#FFFFFF" opacity="0.8"/>';
  } },
{ id:'crown_gold', category:'headwear', name:'王冠', price:200,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="crown_gold-metal1" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#FFF3C4"/>' +
        '<stop offset="45%" stop-color="#F7C948"/>' +
        '<stop offset="100%" stop-color="#C9962B"/>' +
      '</linearGradient>' +
      '<radialGradient id="crown_gold-ruby1" cx="35%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#FF8FA0"/>' +
        '<stop offset="100%" stop-color="#D6294B"/>' +
      '</radialGradient>' +
      '<radialGradient id="crown_gold-sapphire1" cx="35%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#8FC4FF"/>' +
        '<stop offset="100%" stop-color="#2D6FD6"/>' +
      '</radialGradient>' +
    '</defs>' +
    // 左スパイク
    '<path d="M50,60 L64,32 L78,60 Z" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    // 右スパイク
    '<path d="M122,60 L136,32 L150,60 Z" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    // 中央スパイク（最も高い）
    '<path d="M84,60 L100,16 L116,60 Z" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="2.4" stroke-linejoin="round"/>' +
    // スパイク右かげ
    '<path d="M100,16 L116,60 L106,60 Q100,36 100,16 Z" fill="#8A651C" opacity="0.5"/>' +
    '<path d="M136,32 L150,60 L142,60 Q138,44 136,32 Z" fill="#8A651C" opacity="0.5"/>' +
    // 玉飾り
    '<circle cx="100" cy="14" r="4" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="1.6"/>' +
    '<circle cx="64" cy="30" r="3" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="1.6"/>' +
    '<circle cx="136" cy="30" r="3" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="1.6"/>' +
    // ベースバンド
    '<path d="M50,58 Q100,49 150,58 L148,74 Q100,83 52,74 Z" fill="url(#crown_gold-metal1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // バンド右かげ
    '<path d="M100,50 Q126,53 148,60 L148,74 Q124,68 106,61 Z" fill="#8A651C" opacity="0.45"/>' +
    // 宝石（中央ルビー・左右サファイア）
    '<ellipse cx="100" cy="42" rx="5.5" ry="6.5" fill="url(#crown_gold-ruby1)" stroke="#4a3428" stroke-width="1.6"/>' +
    '<circle cx="76" cy="66" r="3.4" fill="url(#crown_gold-sapphire1)" stroke="#4a3428" stroke-width="1.4"/>' +
    '<circle cx="124" cy="66" r="3.4" fill="url(#crown_gold-sapphire1)" stroke="#4a3428" stroke-width="1.4"/>' +
    // きらめき
    '<path d="M64,38 L66,42 L70,43 L66,44 L64,48 L62,44 L58,43 L62,42 Z" fill="#FFFFFF" opacity="0.8"/>';
  } },
{ id:'hat_wizard', category:'headwear', name:'魔法使い帽子', price:250,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="hat_wizard-gold1" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#FFE9A0"/>' +
        '<stop offset="100%" stop-color="#C9962B"/>' +
      '</linearGradient>' +
    '</defs>' +
    // つば（広め・ふわっと）
    '<path d="M36,66 Q100,50 164,66 Q160,80 100,82 Q40,80 36,66 Z" fill="#6B4FA0" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M100,52 Q136,56 160,66 Q158,78 118,80 Q108,66 100,52 Z" fill="#4E3878" opacity="0.7"/>' +
    // とんがり頭（先が軽く巻く）
    '<path d="M68,60 C70,26 82,4 98,4 C108,4 114,10 108,15 C100,22 106,30 116,27 C120,36 116,46 132,60 Q100,48 68,60 Z" fill="#6B4FA0" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // とんがり右かげ
    '<path d="M98,4 C108,4 114,10 108,15 C100,22 106,30 116,27 C120,36 116,46 132,60 Q118,52 110,45 Q114,14 98,4 Z" fill="#4E3878" opacity="0.65"/>' +
    // 金バンド
    '<path d="M66,56 Q100,46 134,56 L132,66 Q100,56 68,66 Z" fill="url(#hat_wizard-gold1)" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<circle cx="100" cy="60" r="3" fill="#D6294B" stroke="#4a3428" stroke-width="1.4"/>' +
    // 星の飾り
    '<path d="M84,36 L86,40 L90,41 L86,43 L84,47 L82,43 L78,41 L82,40 Z" fill="#FFE27A" stroke="#4a3428" stroke-width="1" stroke-linejoin="round"/>' +
    '<path d="M114,20 L115,23 L118,24 L115,25 L114,28 L113,25 L110,24 L113,23 Z" fill="#FFE27A" stroke="#4a3428" stroke-width="0.9" stroke-linejoin="round"/>' +
    // ハイライト
    '<path d="M74,54 Q84,36 92,20" stroke="#9C82C9" stroke-width="2.2" fill="none" opacity="0.7" stroke-linecap="round"/>';
  } },
{ id:'helmet_knight', category:'headwear', name:'騎士ヘルメット', price:600,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="helmet_knight-metal1" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#F2F5F8"/>' +
        '<stop offset="55%" stop-color="#C3CBD4"/>' +
        '<stop offset="100%" stop-color="#8891A0"/>' +
      '</linearGradient>' +
    '</defs>' +
    // ヘルメット本体（外形＋顔穴を evenodd で一体成形。頭頂〜ほほを覆い、顔は開放）
    '<path fill-rule="evenodd" d="M45,88 C42,44 68,20 100,20 C132,20 158,44 155,88 C156,102 150,117 140,123 L60,123 C50,117 44,102 45,88 Z M66,58 Q100,47 134,58 Q143,90 134,120 Q100,131 66,120 Q57,90 66,58 Z" fill="url(#helmet_knight-metal1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右側かげ
    '<path d="M100,20 C132,20 158,44 155,88 C156,102 150,117 140,123 L120,123 Q130,100 129,70 Q129,40 110,24 Q105,22 100,20 Z" fill="#5C6472" opacity="0.32"/>' +
    // ふち飾り（顔穴のまわり）
    '<path d="M66,58 Q100,47 134,58" stroke="#D9A93A" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    // びょう（リベット）
    '<circle cx="51" cy="92" r="2" fill="#EAF0F5" stroke="#4a3428" stroke-width="1"/>' +
    '<circle cx="149" cy="92" r="2" fill="#8891A0" stroke="#4a3428" stroke-width="1"/>' +
    // 羽根飾り
    '<path d="M92,28 Q90,6 100,-2 Q110,6 108,28 Q100,20 92,28 Z" fill="#D6294B" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M100,-2 Q110,6 108,28 Q104,22 101,16 Q104,8 100,-2 Z" fill="#A81638" opacity="0.6"/>' +
    // ハイライト
    '<path d="M58,42 Q76,26 98,23" stroke="#FFFFFF" stroke-width="2.2" fill="none" opacity="0.6" stroke-linecap="round"/>';
  } },
{ id:'tiara_diamond', category:'headwear', name:'ダイヤティアラ', price:800,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="tiara_diamond-metal1" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#FFFFFF"/>' +
        '<stop offset="50%" stop-color="#DCE6F0"/>' +
        '<stop offset="100%" stop-color="#A9B7C6"/>' +
      '</linearGradient>' +
      '<radialGradient id="tiara_diamond-gem1" cx="35%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#FFFFFF"/>' +
        '<stop offset="55%" stop-color="#CDEBFF"/>' +
        '<stop offset="100%" stop-color="#8FC7EA"/>' +
      '</radialGradient>' +
    '</defs>' +
    // 左サブアーチ
    '<path d="M60,70 Q64,54 72,50 Q78,54 80,70" fill="none" stroke="url(#tiara_diamond-metal1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    // 右サブアーチ
    '<path d="M140,70 Q136,54 128,50 Q122,54 120,70" fill="none" stroke="url(#tiara_diamond-metal1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
    // 中央アーチ
    '<path d="M88,70 Q92,42 100,34 Q108,42 112,70" fill="none" stroke="url(#tiara_diamond-metal1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
    // ベースバンド
    '<path d="M54,68 Q100,76 146,68 L144,77 Q100,84 56,77 Z" fill="url(#tiara_diamond-metal1)" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M100,71 Q124,73 144,68 L142,77 Q120,81 106,79 Z" fill="#8B99AA" opacity="0.4"/>' +
    // 側面の小ダイヤ
    '<path d="M72,42 L77,48 L72,54 L67,48 Z" fill="url(#tiara_diamond-gem1)" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M128,42 L133,48 L128,54 L123,48 Z" fill="url(#tiara_diamond-gem1)" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    // メインダイヤ
    '<path d="M100,24 L109,34 L100,44 L91,34 Z" fill="url(#tiara_diamond-gem1)" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M100,24 L100,44 M91,34 L109,34" stroke="#FFFFFF" stroke-width="1" opacity="0.7"/>' +
    // バンドの小粒ダイヤ
    '<circle cx="85" cy="74" r="2.2" fill="url(#tiara_diamond-gem1)" stroke="#4a3428" stroke-width="1.2"/>' +
    '<circle cx="115" cy="74" r="2.2" fill="url(#tiara_diamond-gem1)" stroke="#4a3428" stroke-width="1.2"/>' +
    // きらめき
    '<path d="M82,20 L84,24 L88,25 L84,26 L82,30 L80,26 L76,25 L80,24 Z" fill="#FFFFFF" opacity="0.85"/>' +
    '<circle cx="122" cy="18" r="1.6" fill="#FFFFFF" opacity="0.8"/>';
  } },
// ===== accessory =====
{ id:'sunglasses', category:'accessory', name:'サングラス', price:30, layer:'front',
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="sunglasses-g1" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#4a4854"/>' +
        '<stop offset="60%" stop-color="#221f26"/>' +
        '<stop offset="100%" stop-color="#0e0c10"/>' +
      '</linearGradient>' +
    '</defs>' +
    // 左テンプル・右テンプル
    '<path d="M68,83 L49,86" stroke="#4a3428" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M132,83 L151,86" stroke="#4a3428" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    // ブリッジ
    '<path d="M89,85 Q100,80 111,85" stroke="#4a3428" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    // 左レンズ
    '<ellipse cx="79" cy="87" rx="11.5" ry="9.5" fill="url(#sunglasses-g1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右レンズ
    '<ellipse cx="121" cy="87" rx="11.5" ry="9.5" fill="url(#sunglasses-g1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // ハイライト
    '<path d="M73,82 L78,84" stroke="#FFFFFF" stroke-width="1.8" opacity="0.55" stroke-linecap="round"/>' +
    '<path d="M115,82 L120,84" stroke="#FFFFFF" stroke-width="1.8" opacity="0.55" stroke-linecap="round"/>';
  } },
{ id:'bowtie_red', category:'accessory', name:'蝶ネクタイ', price:40, layer:'front',
  getSVG:function(){ return '' +
    // 左翼
    '<path d="M100,142 L81,132 L83,152 Z" fill="#D6392C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右翼
    '<path d="M100,142 L119,132 L117,152 Z" fill="#D6392C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右翼かげ
    '<path d="M100,142 L119,132 L112,138 Z" fill="#A82A20" opacity="0.65"/>' +
    // 結び目
    '<rect x="95.5" y="137.5" width="9" height="9" rx="2" fill="#A82A20" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    // ハイライト
    '<path d="M88,136 L93,139" stroke="#FFFFFF" stroke-width="1.4" opacity="0.5" stroke-linecap="round"/>';
  } },
{ id:'scarf_warm', category:'accessory', name:'マフラー', price:60, layer:'front',
  getSVG:function(){ return '' +
    // 巻き部分
    '<path d="M80,136 Q100,124 120,136 L121,148 Q100,140 79,148 Z" fill="#C1432E" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右かげ
    '<path d="M100,128 Q113,132 120,136 L121,148 Q110,143 100,138 Z" fill="#96311F" opacity="0.75"/>' +
    // 編み目ライン
    '<path d="M83,140 Q100,134 117,140" stroke="#F0DCC0" stroke-width="2" fill="none" opacity="0.85" stroke-linecap="round"/>' +
    // 左たれ
    '<path d="M85,144 Q79,160 82,178 Q86,181 90,178 Q88,160 91,144 Z" fill="#C1432E" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M89,148 Q92,162 89,177 L91,177 Q94,162 91,148 Z" fill="#96311F" opacity="0.6"/>' +
    // 左フリンジ
    '<path d="M84,178 L83,184" stroke="#8a2e1c" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M87,179 L87,185" stroke="#8a2e1c" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M90,178 L91,184" stroke="#8a2e1c" stroke-width="1.6" stroke-linecap="round"/>' +
    // 右たれ
    '<path d="M115,144 Q121,160 118,178 Q114,181 110,178 Q112,160 109,144 Z" fill="#C1432E" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M113,148 Q116,162 113,177 L115,177 Q118,162 115,148 Z" fill="#96311F" opacity="0.6"/>' +
    // 右フリンジ
    '<path d="M112,178 L111,184" stroke="#8a2e1c" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M115,179 L115,185" stroke="#8a2e1c" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M118,178 L119,184" stroke="#8a2e1c" stroke-width="1.6" stroke-linecap="round"/>';
  } },
{ id:'watch_gold', category:'accessory', name:'金時計', price:150, layer:'front',
  getSVG:function(){ return '' +
    '<defs>' +
      '<radialGradient id="watch_gold-g1" cx="35%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#FFEBAE"/>' +
        '<stop offset="55%" stop-color="#D4A017"/>' +
        '<stop offset="100%" stop-color="#8a6a10"/>' +
      '</radialGradient>' +
    '</defs>' +
    // バンド上
    '<path d="M57,181 Q65,178 73,181 L73,187 Q65,185 57,187 Z" fill="url(#watch_gold-g1)" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    // バンド下
    '<path d="M57,192 Q65,190 73,192 L73,197 Q65,199 57,197 Z" fill="url(#watch_gold-g1)" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    // 文字盤フレーム
    '<circle cx="65" cy="188" r="7.5" fill="url(#watch_gold-g1)" stroke="#4a3428" stroke-width="2.5"/>' +
    // 文字盤
    '<circle cx="65" cy="188" r="4.8" fill="#FFF8E8" stroke="#8a6a10" stroke-width="0.8"/>' +
    // 目盛り
    '<circle cx="65" cy="184" r="0.6" fill="#8a6a10"/>' +
    '<circle cx="69" cy="188" r="0.6" fill="#8a6a10"/>' +
    '<circle cx="65" cy="192" r="0.6" fill="#8a6a10"/>' +
    '<circle cx="61" cy="188" r="0.6" fill="#8a6a10"/>' +
    // 針
    '<path d="M65,188 L65,185" stroke="#33200F" stroke-width="1.2" stroke-linecap="round"/>' +
    '<path d="M65,188 L68,189" stroke="#33200F" stroke-width="1.2" stroke-linecap="round"/>' +
    // ハイライト
    '<path d="M62,184 Q65,182 68,184" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.6" stroke-linecap="round"/>';
  } },
{ id:'medal_gold', category:'accessory', name:'金メダル', price:200, layer:'front',
  getSVG:function(){ return '' +
    '<defs>' +
      '<radialGradient id="medal_gold-g1" cx="35%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#FFEBAE"/>' +
        '<stop offset="55%" stop-color="#D4A017"/>' +
        '<stop offset="100%" stop-color="#8a6a10"/>' +
      '</radialGradient>' +
    '</defs>' +
    // リボン（紺）
    '<path d="M90,138 L110,138 L105,161 L95,161 Z" fill="#2A4B8C" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    // リボン中央赤ライン
    '<path d="M96,138 L104,138 L102,161 L98,161 Z" fill="#C1272D"/>' +
    // 連結バー
    '<rect x="96" y="157" width="8" height="5" rx="1.5" fill="url(#medal_gold-g1)" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    // メダル本体
    '<circle cx="100" cy="170" r="13" fill="url(#medal_gold-g1)" stroke="#4a3428" stroke-width="2.5"/>' +
    '<circle cx="100" cy="170" r="9" fill="#F4D468" stroke="#B8860B" stroke-width="1.4"/>' +
    // 星
    '<path d="M100,164 L101.8,168.5 L106.5,168.7 L102.8,171.6 L104.2,176 L100,173.2 L95.8,176 L97.2,171.6 L93.5,168.7 L98.2,168.5 Z" fill="#FFF8E0" stroke="#B8860B" stroke-width="0.6" stroke-linejoin="round"/>' +
    // ハイライト
    '<path d="M93,164 Q98,161 103,163" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity="0.55" stroke-linecap="round"/>';
  } },
{ id:'necklace_diamond', category:'accessory', name:'ダイヤネックレス', price:500, layer:'front',
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="necklace_diamond-g1" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#FFFFFF"/>' +
        '<stop offset="40%" stop-color="#CFEBFA"/>' +
        '<stop offset="70%" stop-color="#FFFFFF"/>' +
        '<stop offset="100%" stop-color="#93C0E0"/>' +
      '</linearGradient>' +
      '<radialGradient id="necklace_diamond-g2" cx="35%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#FFEBAE"/>' +
        '<stop offset="100%" stop-color="#B8860B"/>' +
      '</radialGradient>' +
    '</defs>' +
    // チェーン
    '<path d="M82,139 Q100,156 118,139" stroke="url(#necklace_diamond-g2)" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="88" cy="145" r="1.3" fill="#D4A017"/>' +
    '<circle cx="112" cy="145" r="1.3" fill="#D4A017"/>' +
    // 台座（ベイル）
    '<circle cx="100" cy="150" r="2.6" fill="url(#necklace_diamond-g2)" stroke="#4a3428" stroke-width="1.2"/>' +
    // ダイヤ本体
    '<path d="M100,152 L106.5,158 L100,168 L93.5,158 Z" fill="url(#necklace_diamond-g1)" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    // ファセットライン
    '<path d="M100,152 L100,168" stroke="#FFFFFF" stroke-width="0.9" opacity="0.7"/>' +
    '<path d="M94.5,158 L105.5,158" stroke="#FFFFFF" stroke-width="0.9" opacity="0.7"/>' +
    // きらめき
    '<path d="M85,140 L86.5,143.5 L90,145 L86.5,146.5 L85,150 L83.5,146.5 L80,145 L83.5,143.5 Z" fill="#FFFFFF" opacity="0.9"/>' +
    '<path d="M115,140 L113.5,143.5 L110,145 L113.5,146.5 L115,150 L116.5,146.5 L120,145 L116.5,143.5 Z" fill="#FFFFFF" opacity="0.9"/>' +
    '<path d="M108,157 L108.8,159 L110.8,159.8 L108.8,160.6 L108,162.6 L107.2,160.6 L105.2,159.8 L107.2,159 Z" fill="#FFFFFF" opacity="0.85"/>';
  } },
{ id:'wings_angel', category:'accessory', name:'天使の翼', price:300, layer:'back',
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="wings_angel-g1" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="#FFE9A8"/>' +
        '<stop offset="50%" stop-color="#D4A017"/>' +
        '<stop offset="100%" stop-color="#FFE9A8"/>' +
      '</linearGradient>' +
    '</defs>' +
    // 後光（左右）
    '<ellipse cx="47" cy="170" rx="30" ry="48" fill="#FFF6D8" opacity="0.32" filter="url(#av-glow)"/>' +
    '<ellipse cx="153" cy="170" rx="30" ry="48" fill="#FFF6D8" opacity="0.32" filter="url(#av-glow)"/>' +
    // 左翼本体（羽先はギザ羽根の連なり）
    '<path d="M74,132 C54,116 24,118 19,150 C16,174 21,194 30,208 Q36,199 41,210 Q47,201 52,211 Q58,201 62,210 Q68,198 71,180 C75,164 77,148 74,132 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 左翼内側かげ
    '<path d="M74,132 C71,152 68,175 63,196 Q60,204 55,210 L60,207 Q66,196 70,178 C74,163 76,148 74,132 Z" fill="#E7E0D0" opacity="0.65"/>' +
    // 左羽根の筋
    '<path d="M68,140 Q45,155 33,175" stroke="#4a3428" stroke-width="1.5" fill="none" opacity="0.55" stroke-linecap="round"/>' +
    '<path d="M65,155 Q42,172 30,192" stroke="#4a3428" stroke-width="1.5" fill="none" opacity="0.55" stroke-linecap="round"/>' +
    '<path d="M60,172 Q40,188 30,204" stroke="#4a3428" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round"/>' +
    // 左ゴールドトリム
    '<path d="M74,132 C54,116 24,118 19,150" stroke="url(#wings_angel-g1)" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    // 左きらめき
    '<path d="M36,124 L38,130 L44,132 L38,134 L36,140 L34,134 L28,132 L34,130 Z" fill="#FFF6D0" opacity="0.85"/>' +
    // 右翼本体
    '<path d="M126,132 C146,116 176,118 181,150 C184,174 179,194 170,208 Q164,199 159,210 Q153,201 148,211 Q142,201 138,210 Q132,198 129,180 C125,164 123,148 126,132 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右翼内側かげ
    '<path d="M126,132 C129,152 132,175 137,196 Q140,204 145,210 L140,207 Q134,196 130,178 C126,163 124,148 126,132 Z" fill="#E7E0D0" opacity="0.65"/>' +
    // 右羽根の筋
    '<path d="M132,140 Q155,155 167,175" stroke="#4a3428" stroke-width="1.5" fill="none" opacity="0.55" stroke-linecap="round"/>' +
    '<path d="M135,155 Q158,172 170,192" stroke="#4a3428" stroke-width="1.5" fill="none" opacity="0.55" stroke-linecap="round"/>' +
    '<path d="M140,172 Q160,188 170,204" stroke="#4a3428" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round"/>' +
    // 右ゴールドトリム
    '<path d="M126,132 C146,116 176,118 181,150" stroke="url(#wings_angel-g1)" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    // 右きらめき
    '<path d="M164,124 L162,130 L156,132 L162,134 L164,140 L166,134 L172,132 L166,130 Z" fill="#FFF6D0" opacity="0.85"/>';
  } },
{ id:'cape_vampire', category:'accessory', name:'ヴァンパイアマント', price:350, layer:'back',
  getSVG:function(){ return '' +
    // 赤い裏地（本体より少し大きく描いて縁に見せる）
    '<path d="M100,129 C70,127 27,144 25,190 C23,222 31,254 58,262 C64,243 73,217 86,202 C91,224 97,245 100,260 C103,245 109,224 114,202 C127,217 136,243 142,262 C169,254 177,222 175,190 C173,144 130,127 100,129 Z" fill="#7A1B24" stroke="#4a3428" stroke-width="2"/>' +
    // 襟の赤裏地
    '<path d="M89,150 L68,97 Q63,113 67,130 L84,152 Z" fill="#7A1B24"/>' +
    '<path d="M111,150 L132,97 Q137,113 133,130 L116,152 Z" fill="#7A1B24"/>' +
    // マント本体（黒）
    '<path d="M100,132 C72,130 32,146 30,190 C28,220 35,250 58,257 C63,239 72,215 86,201 C91,222 96,242 100,255 C104,242 109,222 114,201 C128,215 137,239 142,257 C165,250 172,220 170,190 C168,146 128,130 100,132 Z" fill="#1B1613" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // 右かげ
    '<path d="M100,140 C120,145 155,160 165,190 Q168,215 155,240 Q148,225 140,205 Q130,175 100,155 Z" fill="#000000" opacity="0.25"/>' +
    // 立ち襟（黒）
    '<path d="M88,148 L70,100 Q66,113 69,128 L83,150 Z" fill="#1B1613" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M112,148 L130,100 Q134,113 131,128 L117,150 Z" fill="#1B1613" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    // ハイライト
    '<path d="M40,150 Q34,175 36,205" stroke="#4a3f3a" stroke-width="1.6" fill="none" opacity="0.5" stroke-linecap="round"/>';
  } },
// ===== shoes =====
{ id:'sneakers_white', category:'shoes', name:'スニーカー', price:0, isDefault:true,
  getSVG:function(){ return '' +
    // 左足
    '<path d="M79,244 L96,244 L96,258 Q96,265 89,265 L70,265 Q64,265 65,258 Q66,250 74,247 Q78,246 79,244 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M65,259 L96,259 L96,262 Q96,266 90,266 L70,266 Q64,266 65,259 Z" fill="#D8D4CE" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M79,247 Q76,252 70,255" stroke="#E84B4B" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="88" cy="250" r="1.4" fill="#B8B4AE"/>' +
    // 右足
    '<path d="M121,244 L104,244 L104,258 Q104,265 111,265 L130,265 Q136,265 135,258 Q134,250 126,247 Q122,246 121,244 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M135,259 L104,259 L104,262 Q104,266 110,266 L130,266 Q136,266 135,259 Z" fill="#D8D4CE" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M121,247 Q124,252 130,255" stroke="#E84B4B" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<circle cx="112" cy="250" r="1.4" fill="#B8B4AE"/>';
  } },
{ id:'sneakers_red', category:'shoes', name:'赤スニーカー', price:15,
  getSVG:function(){ return '' +
    // 左足
    '<path d="M79,244 L96,244 L96,258 Q96,265 89,265 L70,265 Q64,265 65,258 Q66,250 74,247 Q78,246 79,244 Z" fill="#E5473F" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M65,259 L96,259 L96,262 Q96,266 90,266 L70,266 Q64,266 65,259 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M79,247 Q76,252 70,255" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M92,246 Q86,254 74,257" stroke="#B3352E" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.75"/>' +
    '<circle cx="88" cy="250" r="1.4" fill="#FFFFFF"/>' +
    // 右足
    '<path d="M121,244 L104,244 L104,258 Q104,265 111,265 L130,265 Q136,265 135,258 Q134,250 126,247 Q122,246 121,244 Z" fill="#E5473F" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M135,259 L104,259 L104,262 Q104,266 110,266 L130,266 Q136,266 135,259 Z" fill="#FFFFFF" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M121,247 Q124,252 130,255" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M108,246 Q114,254 126,257" stroke="#B3352E" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.75"/>' +
    '<circle cx="112" cy="250" r="1.4" fill="#FFFFFF"/>';
  } },
{ id:'boots_brown', category:'shoes', name:'ブーツ', price:70,
  getSVG:function(){ return '' +
    // 左ブーツ（筒が高い）
    '<path d="M75,225 L96,225 L97,258 Q97,265 90,265 L70,265 Q64,265 65,258 Q66,250 74,247 Q76,240 75,225 Z" fill="#8A5A34" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M75,225 L96,225 L96,233 L75,233 Z" fill="#6E4526" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M65,259 L97,259 L97,262 Q97,266 91,266 L70,266 Q64,266 65,259 Z" fill="#4A3320" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M90,232 Q94,248 90,262" stroke="#6E4526" stroke-width="1.6" fill="none" opacity="0.85"/>' +
    '<circle cx="80" cy="238" r="1.3" fill="#D8B888"/>' +
    '<circle cx="80" cy="246" r="1.3" fill="#D8B888"/>' +
    '<path d="M77,238 L80,246" stroke="#D8B888" stroke-width="1.3"/>' +
    // 右ブーツ
    '<path d="M125,225 L104,225 L103,258 Q103,265 110,265 L130,265 Q136,265 135,258 Q134,250 126,247 Q124,240 125,225 Z" fill="#8A5A34" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M125,225 L104,225 L104,233 L125,233 Z" fill="#6E4526" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M135,259 L103,259 L103,262 Q103,266 109,266 L130,266 Q136,266 135,259 Z" fill="#4A3320" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M110,232 Q106,248 110,262" stroke="#6E4526" stroke-width="1.6" fill="none" opacity="0.85"/>' +
    '<circle cx="120" cy="238" r="1.3" fill="#D8B888"/>' +
    '<circle cx="120" cy="246" r="1.3" fill="#D8B888"/>' +
    '<path d="M123,238 L120,246" stroke="#D8B888" stroke-width="1.3"/>';
  } },
{ id:'loafers_brown', category:'shoes', name:'ローファー', price:50,
  getSVG:function(){ return '' +
    // 左ローファー
    '<path d="M79,246 L96,246 L96,258 Q96,265 89,265 L70,265 Q64,265 65,258 Q66,251 74,248 Q78,247 79,246 Z" fill="#7A4B2A" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M65,259 L96,259 L96,262 Q96,267 90,267 L70,267 Q64,267 65,259 Z" fill="#4E301A" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M92,248 Q86,255 72,258" stroke="#5E3A20" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85"/>' +
    '<path d="M78,251 L84,251 L84,255 L78,255 Z" fill="#D8B84A" stroke="#4a3428" stroke-width="1.3"/>' +
    // 右ローファー
    '<path d="M121,246 L104,246 L104,258 Q104,265 111,265 L130,265 Q136,265 135,258 Q134,251 126,248 Q122,247 121,246 Z" fill="#7A4B2A" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M135,259 L104,259 L104,262 Q104,267 110,267 L130,267 Q136,267 135,259 Z" fill="#4E301A" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M108,248 Q114,255 128,258" stroke="#5E3A20" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85"/>' +
    '<path d="M116,251 L122,251 L122,255 L116,255 Z" fill="#D8B84A" stroke="#4a3428" stroke-width="1.3"/>';
  } },
{ id:'sandals_beach', category:'shoes', name:'ビーチサンダル', price:25,
  getSVG:function(){ return '' +
    // 左サンダル（甲を覆わないフラットソール＋バンド）
    '<path d="M67,258 Q66,251 75,249 Q86,246 95,251 Q97,254 96,259 Q95,264 89,264 L71,264 Q67,264 67,258 Z" fill="#F2A93B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M69,261 L94,261 L94,263 Q94,265 90,265 L72,265 Q69,265 69,261 Z" fill="#D98A22" stroke="#4a3428" stroke-width="1.4"/>' +
    '<path d="M81,249 Q80,254 82,258" stroke="#E84B4B" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M75,251 Q80,247 88,251" stroke="#E84B4B" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    // 右サンダル
    '<path d="M133,258 Q134,251 125,249 Q114,246 105,251 Q103,254 104,259 Q105,264 111,264 L129,264 Q133,264 133,258 Z" fill="#F2A93B" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M131,261 L106,261 L106,263 Q106,265 110,265 L128,265 Q131,265 131,261 Z" fill="#D98A22" stroke="#4a3428" stroke-width="1.4"/>' +
    '<path d="M119,249 Q120,254 118,258" stroke="#E84B4B" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M125,251 Q120,247 112,251" stroke="#E84B4B" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
  } },
{ id:'sneakers_gold', category:'shoes', name:'金スニーカー', price:400,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="sneakers_gold-g1" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#FFF3B0"/>' +
        '<stop offset="0.5" stop-color="#F0C232"/>' +
        '<stop offset="1" stop-color="#C6941A"/>' +
      '</linearGradient>' +
    '</defs>' +
    // 左足
    '<path d="M79,244 L96,244 L96,258 Q96,265 89,265 L70,265 Q64,265 65,258 Q66,250 74,247 Q78,246 79,244 Z" fill="url(#sneakers_gold-g1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M65,259 L96,259 L96,262 Q96,266 90,266 L70,266 Q64,266 65,259 Z" fill="#C6941A" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M79,247 Q76,252 70,255" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M74,242 L76,247 L71,245 L76,244 L74,239 L78,243 Z" fill="#FFF6D2" stroke="#C6941A" stroke-width="0.8" stroke-linejoin="round"/>' +
    '<circle cx="88" cy="250" r="1.4" fill="#FFF6D2"/>' +
    // 右足
    '<path d="M121,244 L104,244 L104,258 Q104,265 111,265 L130,265 Q136,265 135,258 Q134,250 126,247 Q122,246 121,244 Z" fill="url(#sneakers_gold-g1)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M135,259 L104,259 L104,262 Q104,266 110,266 L130,266 Q136,266 135,259 Z" fill="#C6941A" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M121,247 Q124,252 130,255" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M126,242 L128,247 L123,245 L128,244 L126,239 L130,243 Z" fill="#FFF6D2" stroke="#C6941A" stroke-width="0.8" stroke-linejoin="round"/>' +
    '<circle cx="112" cy="250" r="1.4" fill="#FFF6D2"/>';
  } },
{ id:'shoes_glass', category:'shoes', name:'ガラスの靴', price:600,
  getSVG:function(){ return '' +
    '<defs>' +
      '<linearGradient id="shoes_glass-g1" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#E6F7FC" stop-opacity="0.9"/>' +
        '<stop offset="1" stop-color="#9FDCEE" stop-opacity="0.55"/>' +
      '</linearGradient>' +
    '</defs>' +
    // 左足（つま先が細く上品な靴型）
    '<path d="M80,244 L96,244 L96,257 Q96,264 89,264 L71,264 Q65,264 66,258 Q67,251 76,247 Q79,246 80,244 Z" fill="url(#shoes_glass-g1)" stroke="#5FAFC9" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M66,258 L96,258 L96,261 Q96,265 90,265 L71,265 Q65,265 66,258 Z" fill="#BFE9F5" stroke="#5FAFC9" stroke-width="1.6" opacity="0.85"/>' +
    '<path d="M80,247 Q77,252 71,255" stroke="#FFFFFF" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M72,246 L73,250 L70,248 L73,247 L72,244 L75,247 Z" fill="#FFFFFF" opacity="0.95"/>' +
    '<circle cx="87" cy="252" r="1.2" fill="#FFFFFF" opacity="0.9"/>' +
    '<circle cx="90" cy="257" r="0.9" fill="#FFFFFF" opacity="0.85"/>' +
    // 右足
    '<path d="M120,244 L104,244 L104,257 Q104,264 111,264 L129,264 Q135,264 134,258 Q133,251 124,247 Q121,246 120,244 Z" fill="url(#shoes_glass-g1)" stroke="#5FAFC9" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M134,258 L104,258 L104,261 Q104,265 110,265 L129,265 Q135,265 134,258 Z" fill="#BFE9F5" stroke="#5FAFC9" stroke-width="1.6" opacity="0.85"/>' +
    '<path d="M120,247 Q123,252 129,255" stroke="#FFFFFF" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M128,246 L127,250 L130,248 L127,247 L128,244 L125,247 Z" fill="#FFFFFF" opacity="0.95"/>' +
    '<circle cx="113" cy="252" r="1.2" fill="#FFFFFF" opacity="0.9"/>' +
    '<circle cx="110" cy="257" r="0.9" fill="#FFFFFF" opacity="0.85"/>';
  } },
// ===== background =====
{ id:'bg_classroom', category:'background', name:'教室', price:50,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_classroom-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_classroom-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3ECDD"/><stop offset="1" stop-color="#E6DCC3"/></linearGradient>' +
      '<linearGradient id="bg_classroom-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BEE3F5"/><stop offset="1" stop-color="#E8F5FB"/></linearGradient>' +
      '<linearGradient id="bg_classroom-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CC9F6E"/><stop offset="1" stop-color="#A97C4F"/></linearGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_classroom-clip)">' +
      '<rect x="0" y="0" width="200" height="300" fill="url(#bg_classroom-wall)"/>' +
      '<rect x="0" y="224" width="200" height="76" fill="url(#bg_classroom-floor)"/>' +
      '<rect x="0" y="222" width="200" height="8" fill="#8B5A2B"/>' +
      '<path d="M0,240 L200,240 M0,252 L200,252 M0,264 L200,264 M0,276 L200,276 M0,288 L200,288" stroke="#8B6239" stroke-width="1.2" opacity="0.35"/>' +
      '<rect x="8" y="36" width="34" height="100" rx="3" fill="url(#bg_classroom-sky)" stroke="#8B5E34" stroke-width="3"/>' +
      '<path d="M25,36 L25,136 M8,86 L42,86" stroke="#8B5E34" stroke-width="3"/>' +
      '<ellipse cx="17" cy="58" rx="7" ry="4" fill="#FFFFFF" opacity="0.8"/>' +
      '<ellipse cx="30" cy="106" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.7"/>' +
      '<rect x="158" y="36" width="34" height="100" rx="3" fill="url(#bg_classroom-sky)" stroke="#8B5E34" stroke-width="3"/>' +
      '<path d="M175,36 L175,136 M158,86 L192,86" stroke="#8B5E34" stroke-width="3"/>' +
      '<ellipse cx="183" cy="58" rx="7" ry="4" fill="#FFFFFF" opacity="0.8"/>' +
      '<ellipse cx="170" cy="106" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.7"/>' +
      '<rect x="25" y="18" width="150" height="48" rx="4" fill="#2E5339" stroke="#8B5A2B" stroke-width="4"/>' +
      '<rect x="25" y="66" width="150" height="6" fill="#B08A55" stroke="#6B4423" stroke-width="2"/>' +
      '<path d="M42,32 Q57,25 72,33" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round"/>' +
      '<path d="M112,26 L127,40 M127,26 L112,40" stroke="#FFFFFF" stroke-width="1.8" opacity="0.55" stroke-linecap="round"/>' +
      '<circle cx="150" cy="45" r="9" fill="none" stroke="#FFD866" stroke-width="2" opacity="0.7"/>' +
      '<rect x="6" y="248" width="40" height="6" rx="1" fill="#8B5A2B" stroke="#6B4423" stroke-width="1.5"/>' +
      '<rect x="10" y="254" width="4" height="28" fill="#6B4423"/>' +
      '<rect x="38" y="254" width="4" height="28" fill="#6B4423"/>' +
      '<rect x="8" y="264" width="16" height="5" rx="1" fill="#7A5230"/>' +
      '<rect x="14" y="268" width="4" height="18" fill="#5A3D22"/>' +
      '<rect x="154" y="248" width="40" height="6" rx="1" fill="#8B5A2B" stroke="#6B4423" stroke-width="1.5"/>' +
      '<rect x="186" y="254" width="4" height="28" fill="#6B4423"/>' +
      '<rect x="158" y="254" width="4" height="28" fill="#6B4423"/>' +
      '<rect x="176" y="264" width="16" height="5" rx="1" fill="#7A5230"/>' +
      '<rect x="182" y="268" width="4" height="18" fill="#5A3D22"/>' +
    '</g>';
  } },
{ id:'bg_sakura', category:'background', name:'桜', price:100,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_sakura-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_sakura-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AEE0F5"/><stop offset="0.6" stop-color="#DCEEF5"/><stop offset="1" stop-color="#FCE8EE"/></linearGradient>' +
      '<linearGradient id="bg_sakura-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FD988"/><stop offset="1" stop-color="#6FAE5C"/></linearGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_sakura-clip)">' +
      '<rect x="0" y="0" width="200" height="200" fill="url(#bg_sakura-sky)"/>' +
      '<circle cx="168" cy="42" r="26" fill="#FFF3C4" opacity="0.5"/>' +
      '<path d="M0,190 Q100,178 200,190 L200,300 L0,300 Z" fill="url(#bg_sakura-grass)"/>' +
      '<path d="M28,190 C25,150 30,110 41,84 C45,77 51,79 49,87 C42,110 40,150 45,190 Z" fill="#7A4A2B"/>' +
      '<path d="M41,120 C43,150 41,175 45,190 L41,190 C39,160 39,130 37,110 Z" fill="#5E381F" opacity="0.55"/>' +
      '<path d="M47,94 C70,87 95,89 114,84" stroke="#7A4A2B" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M40,110 C25,105 15,100 8,92" stroke="#7A4A2B" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="35" cy="40" r="27" fill="#FFC2D6"/>' +
      '<circle cx="65" cy="28" r="23" fill="#FFB0CB"/>' +
      '<circle cx="18" cy="65" r="21" fill="#FFCBDD"/>' +
      '<circle cx="85" cy="46" r="19" fill="#FFB7C9"/>' +
      '<circle cx="98" cy="70" r="15" fill="#FFC7D9"/>' +
      '<circle cx="15" cy="95" r="17" fill="#FFB0CB"/>' +
      '<circle cx="70" cy="35" r="18" fill="#F694B4" opacity="0.4"/>' +
      '<circle cx="38" cy="50" r="20" fill="#F694B4" opacity="0.3"/>' +
      '<ellipse cx="60" cy="130" rx="3.4" ry="1.8" fill="#FFC2D6" opacity="0.75" transform="rotate(25 60 130)"/>' +
      '<ellipse cx="132" cy="160" rx="3.4" ry="1.8" fill="#FFC2D6" opacity="0.7" transform="rotate(-15 132 160)"/>' +
      '<ellipse cx="92" cy="205" rx="3.2" ry="1.7" fill="#FFD3E0" opacity="0.7" transform="rotate(40 92 205)"/>' +
      '<ellipse cx="152" cy="112" rx="3.2" ry="1.7" fill="#FFC2D6" opacity="0.7" transform="rotate(10 152 112)"/>' +
      '<ellipse cx="28" cy="150" rx="3" ry="1.6" fill="#FFD3E0" opacity="0.65" transform="rotate(-30 28 150)"/>' +
      '<ellipse cx="172" cy="182" rx="3.2" ry="1.7" fill="#FFC2D6" opacity="0.65" transform="rotate(20 172 182)"/>' +
      '<ellipse cx="115" cy="235" rx="3.4" ry="1.8" fill="#FFD3E0" opacity="0.65" transform="rotate(-10 115 235)"/>' +
      '<ellipse cx="46" cy="255" rx="4" ry="2" fill="#FFD3E0" opacity="0.7" transform="rotate(15 46 255)"/>' +
      '<ellipse cx="160" cy="270" rx="4" ry="2" fill="#FFC2D6" opacity="0.7" transform="rotate(-20 160 270)"/>' +
      '<ellipse cx="90" cy="280" rx="4" ry="2" fill="#FFD3E0" opacity="0.65" transform="rotate(5 90 280)"/>' +
    '</g>';
  } },
{ id:'bg_sunset', category:'background', name:'夕焼け', price:150,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_sunset-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_sunset-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4B3B73"/><stop offset="0.35" stop-color="#C85C6E"/><stop offset="0.62" stop-color="#F2915B"/><stop offset="0.85" stop-color="#FCC06B"/><stop offset="1" stop-color="#FDE29A"/></linearGradient>' +
      '<radialGradient id="bg_sunset-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFEFC0" stop-opacity="0.9"/><stop offset="1" stop-color="#FFEFC0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bg_sunset-sunfill" cx="0.35" cy="0.35" r="0.75"><stop offset="0" stop-color="#FFF3D0"/><stop offset="0.7" stop-color="#FFDD93"/><stop offset="1" stop-color="#FFC168"/></radialGradient>' +
      '<linearGradient id="bg_sunset-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B2B55"/><stop offset="1" stop-color="#241A3D"/></linearGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_sunset-clip)">' +
      '<rect x="0" y="0" width="200" height="300" fill="url(#bg_sunset-sky)"/>' +
      '<circle cx="145" cy="100" r="55" fill="url(#bg_sunset-glow)"/>' +
      '<circle cx="145" cy="100" r="30" fill="url(#bg_sunset-sunfill)"/>' +
      '<path d="M70,55 Q75,50 80,55 Q85,50 90,55" stroke="#3B2B55" stroke-width="1.5" fill="none" opacity="0.6" stroke-linecap="round"/>' +
      '<path d="M55,68 Q60,63 65,68 Q70,63 75,68" stroke="#3B2B55" stroke-width="1.3" fill="none" opacity="0.5" stroke-linecap="round"/>' +
      '<ellipse cx="30" cy="75" rx="22" ry="11" fill="#7A5C8C" opacity="0.55"/>' +
      '<ellipse cx="48" cy="70" rx="16" ry="9" fill="#7A5C8C" opacity="0.5"/>' +
      '<ellipse cx="15" cy="82" rx="14" ry="8" fill="#7A5C8C" opacity="0.5"/>' +
      '<ellipse cx="163" cy="128" rx="27" ry="12" fill="#8C5C6E" opacity="0.5"/>' +
      '<ellipse cx="184" cy="132" rx="16" ry="9" fill="#8C5C6E" opacity="0.45"/>' +
      '<ellipse cx="112" cy="42" rx="18" ry="8" fill="#6B4C7A" opacity="0.4"/>' +
      '<path d="M0,235 Q50,222 100,232 Q150,240 200,225 L200,300 L0,300 Z" fill="url(#bg_sunset-hill)"/>' +
      '<path d="M15,210 L22,226 L8,226 Z" fill="#1B1330" opacity="0.85"/>' +
      '<path d="M22,216 L27,226 L17,226 Z" fill="#1B1330" opacity="0.85"/>' +
      '<path d="M185,206 L192,222 L178,222 Z" fill="#1B1330" opacity="0.85"/>' +
      '<path d="M178,212 L183,222 L173,222 Z" fill="#1B1330" opacity="0.85"/>' +
    '</g>';
  } },
{ id:'bg_starry', category:'background', name:'星空', price:200,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_starry-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_starry-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0E33"/><stop offset="0.6" stop-color="#1C2058"/><stop offset="1" stop-color="#34366E"/></linearGradient>' +
      '<radialGradient id="bg_starry-moonglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF8DE" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF8DE" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="bg_starry-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12173A"/><stop offset="1" stop-color="#080A22"/></linearGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_starry-clip)">' +
      '<rect x="0" y="0" width="200" height="300" fill="url(#bg_starry-sky)"/>' +
      '<circle cx="162" cy="55" r="40" fill="url(#bg_starry-moonglow)"/>' +
      '<circle cx="162" cy="55" r="24" fill="#FFF6DA"/>' +
      '<circle cx="155" cy="48" r="3" fill="#F0E3B0" opacity="0.6"/>' +
      '<circle cx="171" cy="62" r="4" fill="#F0E3B0" opacity="0.5"/>' +
      '<circle cx="168" cy="45" r="2" fill="#F0E3B0" opacity="0.5"/>' +
      '<circle cx="20" cy="35" r="1.4" fill="#FFFFFF" opacity="0.9"/>' +
      '<circle cx="45" cy="20" r="1" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="65" cy="45" r="1.2" fill="#FFFFFF" opacity="0.8"/>' +
      '<circle cx="90" cy="18" r="1" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="115" cy="35" r="1.3" fill="#FFFFFF" opacity="0.85"/>' +
      '<circle cx="130" cy="15" r="1" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="12" cy="90" r="1.2" fill="#FFFFFF" opacity="0.8"/>' +
      '<circle cx="55" cy="100" r="1" fill="#FFFFFF" opacity="0.65"/>' +
      '<circle cx="185" cy="105" r="1.2" fill="#FFFFFF" opacity="0.75"/>' +
      '<circle cx="190" cy="150" r="1" fill="#FFFFFF" opacity="0.6"/>' +
      '<circle cx="10" cy="170" r="1.1" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="35" cy="185" r="1" fill="#FFFFFF" opacity="0.6"/>' +
      '<circle cx="18" cy="120" r="1.3" fill="#FFFFFF" opacity="0.8"/>' +
      '<circle cx="100" cy="60" r="1" fill="#FFFFFF" opacity="0.6"/>' +
      '<path d="M30,45 L31.2,48.8 L35,50 L31.2,51.2 L30,55 L28.8,51.2 L25,50 L28.8,48.8 Z" fill="#FFF7D6"/>' +
      '<path d="M172,90 L173.2,93.8 L177,95 L173.2,96.2 L172,100 L170.8,96.2 L167,95 L170.8,93.8 Z" fill="#FFF7D6"/>' +
      '<path d="M22,142 L23,145.2 L26,146 L23,146.8 L22,150 L21,146.8 L18,146 L21,145.2 Z" fill="#FFF7D6" opacity="0.9"/>' +
      '<path d="M0,238 Q60,222 100,230 Q150,238 200,224 L200,300 L0,300 Z" fill="url(#bg_starry-hill)"/>' +
      '<rect x="14" y="222" width="7" height="8" fill="#1B1F44"/>' +
      '<circle cx="17.5" cy="226" r="1" fill="#FFD866" opacity="0.85"/>' +
      '<rect x="178" y="215" width="7" height="8" fill="#1B1F44"/>' +
      '<circle cx="181.5" cy="219" r="1" fill="#FFD866" opacity="0.85"/>' +
    '</g>';
  } },
{ id:'bg_ocean', category:'background', name:'海', price:150,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_ocean-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_ocean-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BEE6F5"/><stop offset="1" stop-color="#EAF7F0"/></linearGradient>' +
      '<linearGradient id="bg_ocean-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FC2DE"/><stop offset="1" stop-color="#1E6E96"/></linearGradient>' +
      '<linearGradient id="bg_ocean-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5E3B8"/><stop offset="1" stop-color="#E8CE94"/></linearGradient>' +
      '<radialGradient id="bg_ocean-sunglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF8D8" stop-opacity="0.7"/><stop offset="1" stop-color="#FFF8D8" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_ocean-clip)">' +
      '<rect x="0" y="0" width="200" height="142" fill="url(#bg_ocean-sky)"/>' +
      '<circle cx="38" cy="52" r="40" fill="url(#bg_ocean-sunglow)"/>' +
      '<circle cx="38" cy="52" r="17" fill="#FFF3C0"/>' +
      '<ellipse cx="150" cy="45" rx="20" ry="9" fill="#FFFFFF" opacity="0.9"/>' +
      '<ellipse cx="168" cy="50" rx="13" ry="7" fill="#FFFFFF" opacity="0.85"/>' +
      '<ellipse cx="165" cy="80" rx="16" ry="7" fill="#FFFFFF" opacity="0.8"/>' +
      '<rect x="0" y="140" width="200" height="132" fill="url(#bg_ocean-water)"/>' +
      '<path d="M0,140 L200,140" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4"/>' +
      '<path d="M0,160 Q10,156 20,160 T40,160 T60,160 T80,160 T100,160 T120,160 T140,160 T160,160 T180,160 T200,160" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.4"/>' +
      '<path d="M0,185 Q10,181 20,185 T40,185 T60,185 T80,185 T100,185 T120,185 T140,185 T160,185 T180,185 T200,185" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.35"/>' +
      '<path d="M0,210 Q10,206 20,210 T40,210 T60,210 T80,210 T100,210 T120,210 T140,210 T160,210 T180,210 T200,210" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.35"/>' +
      '<path d="M0,235 Q10,231 20,235 T40,235 T60,235 T80,235 T100,235 T120,235 T140,235 T160,235 T180,235 T200,235" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.3"/>' +
      '<path d="M0,255 Q10,251 20,255 T40,255 T60,255 T80,255 T100,255 T120,255 T140,255 T160,255 T180,255 T200,255" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.3"/>' +
      '<rect x="0" y="272" width="200" height="28" fill="url(#bg_ocean-sand)"/>' +
      '<path d="M0,272 Q10,268 20,272 Q30,276 40,272 Q50,268 60,272 Q70,276 80,272 Q90,268 100,272 Q110,276 120,272 Q130,268 140,272 Q150,276 160,272 Q170,268 180,272 Q190,276 200,272 L200,280 L0,280 Z" fill="#FFFFFF" opacity="0.85"/>' +
      '<circle cx="55" cy="290" r="2" fill="#F2C58A"/>' +
      '<circle cx="145" cy="292" r="1.6" fill="#E8B878"/>' +
      '<circle cx="100" cy="286" r="1.4" fill="#F2C58A"/>' +
    '</g>';
  } },
{ id:'bg_galaxy', category:'background', name:'銀河', price:500,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_galaxy-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_galaxy-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05030F"/><stop offset="1" stop-color="#241143"/></linearGradient>' +
      '<linearGradient id="bg_galaxy-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140A2E"/><stop offset="1" stop-color="#05030F"/></linearGradient>' +
      '<radialGradient id="bg_galaxy-nebula1" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FF8FD0" stop-opacity="0.5"/><stop offset="1" stop-color="#FF8FD0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bg_galaxy-nebula2" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#6EE7F0" stop-opacity="0.45"/><stop offset="1" stop-color="#6EE7F0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bg_galaxy-swirlcore" cx="0.4" cy="0.4" r="0.6"><stop offset="0" stop-color="#FFF6E0"/><stop offset="0.5" stop-color="#FFD9F0"/><stop offset="1" stop-color="#B98CE8" stop-opacity="0.3"/></radialGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_galaxy-clip)">' +
      '<rect x="0" y="0" width="200" height="300" fill="url(#bg_galaxy-sky)"/>' +
      '<ellipse cx="32" cy="205" rx="55" ry="40" fill="url(#bg_galaxy-nebula1)"/>' +
      '<ellipse cx="172" cy="55" rx="48" ry="36" fill="url(#bg_galaxy-nebula2)"/>' +
      '<ellipse cx="160" cy="225" rx="38" ry="28" fill="url(#bg_galaxy-nebula1)" opacity="0.6"/>' +
      '<path d="M165,55 C185,50 195,35 180,20 C170,12 155,15 150,25" stroke="#C9A6F5" stroke-width="4" fill="none" opacity="0.55" stroke-linecap="round"/>' +
      '<path d="M165,55 C145,62 130,50 138,35 C142,27 155,25 162,32" stroke="#8FD0F0" stroke-width="4" fill="none" opacity="0.5" stroke-linecap="round"/>' +
      '<circle cx="165" cy="55" r="10" fill="url(#bg_galaxy-swirlcore)"/>' +
      '<circle cx="18" cy="30" r="1.3" fill="#FFFFFF" opacity="0.85"/>' +
      '<circle cx="50" cy="15" r="1" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="75" cy="40" r="1.2" fill="#FFFFFF" opacity="0.8"/>' +
      '<circle cx="105" cy="20" r="1" fill="#FFFFFF" opacity="0.7"/>' +
      '<circle cx="130" cy="90" r="1.2" fill="#FFFFFF" opacity="0.8"/>' +
      '<circle cx="15" cy="80" r="1" fill="#FFFFFF" opacity="0.65"/>' +
      '<circle cx="60" cy="110" r="1.1" fill="#FFFFFF" opacity="0.75"/>' +
      '<circle cx="190" cy="130" r="1" fill="#FFFFFF" opacity="0.6"/>' +
      '<circle cx="20" cy="150" r="1.2" fill="#FFFFFF" opacity="0.8"/>' +
      '<circle cx="185" cy="180" r="1" fill="#FFFFFF" opacity="0.65"/>' +
      '<path d="M40,25 L41.2,28.8 L45,30 L41.2,31.2 L40,35 L38.8,31.2 L35,30 L38.8,28.8 Z" fill="#FFF7D6"/>' +
      '<path d="M110,60 L111.2,63.8 L115,65 L111.2,66.2 L110,70 L108.8,66.2 L105,65 L108.8,63.8 Z" fill="#FFF7D6" opacity="0.9"/>' +
      '<path d="M25,110 L26,113.2 L29,114 L26,114.8 L25,118 L24,114.8 L21,114 L24,113.2 Z" fill="#FFF7D6" opacity="0.85"/>' +
      '<path d="M0,260 Q100,240 200,260 L200,300 L0,300 Z" fill="url(#bg_galaxy-ground)"/>' +
      '<ellipse cx="60" cy="278" rx="14" ry="5" fill="#0A0620" opacity="0.4"/>' +
      '<ellipse cx="150" cy="286" rx="18" ry="6" fill="#0A0620" opacity="0.35"/>' +
      '<circle cx="90" cy="270" r="1" fill="#FFFFFF" opacity="0.5"/>' +
      '<circle cx="130" cy="280" r="1" fill="#FFFFFF" opacity="0.45"/>' +
    '</g>';
  } },
{ id:'bg_castle', category:'background', name:'城', price:400,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_castle-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_castle-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFEAF7"/><stop offset="1" stop-color="#F7EFDD"/></linearGradient>' +
      '<linearGradient id="bg_castle-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FD98A"/><stop offset="1" stop-color="#6FAE5C"/></linearGradient>' +
      '<linearGradient id="bg_castle-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFEAE0"/><stop offset="1" stop-color="#CFC7AE"/></linearGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_castle-clip)">' +
      '<rect x="0" y="0" width="200" height="300" fill="url(#bg_castle-sky)"/>' +
      '<path d="M0,150 Q60,132 100,142 Q150,152 200,134 L200,182 L0,182 Z" fill="#D7ECC2" opacity="0.7"/>' +
      '<rect x="148" y="100" width="18" height="50" fill="url(#bg_castle-stone)" stroke="#B7AE92" stroke-width="2"/>' +
      '<path d="M145,100 L157,80 L169,100 Z" fill="#C77B6E" stroke="#A85F55" stroke-width="2"/>' +
      '<rect x="154" y="118" width="6" height="10" rx="2" fill="#5A4A6E" opacity="0.85"/>' +
      '<rect x="160" y="72" width="26" height="78" fill="url(#bg_castle-stone)" stroke="#B7AE92" stroke-width="2"/>' +
      '<path d="M157,72 L173,46 L189,72 Z" fill="#C77B6E" stroke="#A85F55" stroke-width="2"/>' +
      '<rect x="160" y="65" width="6" height="7" fill="url(#bg_castle-stone)" stroke="#B7AE92" stroke-width="1.3"/>' +
      '<rect x="171" y="65" width="6" height="7" fill="url(#bg_castle-stone)" stroke="#B7AE92" stroke-width="1.3"/>' +
      '<rect x="180" y="65" width="6" height="7" fill="url(#bg_castle-stone)" stroke="#B7AE92" stroke-width="1.3"/>' +
      '<rect x="169" y="96" width="8" height="16" rx="4" fill="#5A4A6E" opacity="0.85"/>' +
      '<line x1="173" y1="46" x2="173" y2="32" stroke="#8B5A2B" stroke-width="1.5"/>' +
      '<path d="M173,32 L185,37 L173,42 Z" fill="#E85B5B"/>' +
      '<rect x="176" y="95" width="18" height="55" fill="url(#bg_castle-stone)" stroke="#B7AE92" stroke-width="2"/>' +
      '<path d="M173,95 L185,74 L197,95 Z" fill="#C77B6E" stroke="#A85F55" stroke-width="2"/>' +
      '<rect x="182" y="114" width="6" height="10" rx="2" fill="#5A4A6E" opacity="0.85"/>' +
      '<path d="M0,225 Q60,208 100,218 Q150,228 200,210 L200,300 L0,300 Z" fill="url(#bg_castle-hill)"/>' +
      '<path d="M140,300 Q150,255 158,215 Q166,185 172,150" stroke="#E8D9B0" stroke-width="12" fill="none" opacity="0.5" stroke-linecap="round"/>' +
      '<rect x="10" y="252" width="4" height="22" fill="#6B4423"/>' +
      '<circle cx="12" cy="245" r="13" fill="#6FAE5C"/>' +
      '<circle cx="12" cy="245" r="13" fill="#3B8A4A" opacity="0.3"/>' +
      '<rect x="186" y="246" width="4" height="24" fill="#6B4423"/>' +
      '<circle cx="188" cy="238" r="15" fill="#6FAE5C"/>' +
      '<circle cx="188" cy="238" r="15" fill="#3B8A4A" opacity="0.3"/>' +
    '</g>';
  } },
{ id:'bg_rainbow', category:'background', name:'虹', price:300,
  getSVG:function(){ return '' +
    '<defs>' +
      '<clipPath id="bg_rainbow-clip"><rect x="0" y="0" width="200" height="300" rx="8"/></clipPath>' +
      '<linearGradient id="bg_rainbow-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFEFFB"/><stop offset="1" stop-color="#F5FBFF"/></linearGradient>' +
      '<linearGradient id="bg_rainbow-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9E08C"/><stop offset="1" stop-color="#7AC468"/></linearGradient>' +
    '</defs>' +
    '<g clip-path="url(#bg_rainbow-clip)">' +
      '<rect x="0" y="0" width="200" height="300" fill="url(#bg_rainbow-sky)"/>' +
      '<path d="M-160,300 A260,260 0 0 1 360,300" stroke="#FF8A8A" stroke-width="11" fill="none"/>' +
      '<path d="M-148,300 A248,248 0 0 1 348,300" stroke="#FFB870" stroke-width="11" fill="none"/>' +
      '<path d="M-136,300 A236,236 0 0 1 336,300" stroke="#FFE066" stroke-width="11" fill="none"/>' +
      '<path d="M-124,300 A224,224 0 0 1 324,300" stroke="#9BE28A" stroke-width="11" fill="none"/>' +
      '<path d="M-112,300 A212,212 0 0 1 312,300" stroke="#7FC7EA" stroke-width="11" fill="none"/>' +
      '<path d="M-100,300 A200,200 0 0 1 300,300" stroke="#8C9CE8" stroke-width="11" fill="none"/>' +
      '<path d="M-88,300 A188,188 0 0 1 288,300" stroke="#C79AE8" stroke-width="11" fill="none"/>' +
      '<ellipse cx="20" cy="128" rx="20" ry="10" fill="#FFFFFF" opacity="0.9"/>' +
      '<ellipse cx="35" cy="122" rx="14" ry="8" fill="#FFFFFF" opacity="0.85"/>' +
      '<ellipse cx="180" cy="128" rx="20" ry="10" fill="#FFFFFF" opacity="0.9"/>' +
      '<ellipse cx="165" cy="122" rx="14" ry="8" fill="#FFFFFF" opacity="0.85"/>' +
      '<path d="M0,238 Q100,222 200,238 L200,300 L0,300 Z" fill="url(#bg_rainbow-grass)"/>' +
      '<ellipse cx="8" cy="255" rx="16" ry="8" fill="#FFFFFF" opacity="0.85"/>' +
      '<ellipse cx="192" cy="248" rx="16" ry="8" fill="#FFFFFF" opacity="0.85"/>' +
      '<circle cx="35" cy="270" r="3.5" fill="#FF8A8A"/>' +
      '<circle cx="31" cy="267" r="2.4" fill="#FFE066"/>' +
      '<circle cx="39" cy="267" r="2.4" fill="#FFE066"/>' +
      '<circle cx="31" cy="273" r="2.4" fill="#FFE066"/>' +
      '<circle cx="39" cy="273" r="2.4" fill="#FFE066"/>' +
      '<line x1="35" y1="273" x2="35" y2="286" stroke="#5B8A3E" stroke-width="1.6"/>' +
      '<circle cx="160" cy="280" r="3.2" fill="#8C9CE8"/>' +
      '<circle cx="156.5" cy="277.5" r="2.2" fill="#FFF3C0"/>' +
      '<circle cx="163.5" cy="277.5" r="2.2" fill="#FFF3C0"/>' +
      '<circle cx="156.5" cy="282.5" r="2.2" fill="#FFF3C0"/>' +
      '<circle cx="163.5" cy="282.5" r="2.2" fill="#FFF3C0"/>' +
      '<line x1="160" y1="283" x2="160" y2="294" stroke="#5B8A3E" stroke-width="1.6"/>' +
    '</g>';
  } },
// ===== handheld =====
{ id:'held_book', category:'handheld', name:'本', price:30,
  getSVG:function(){ return '' +
    '<g transform="rotate(-14 133 196)">' +
    '<rect x="111" y="178" width="42" height="32" rx="3" fill="#B8482E" stroke="#4a3428" stroke-width="2.5"/>' +
    '<rect x="151" y="181" width="4" height="26" fill="#F5EFE0" stroke="#4a3428" stroke-width="1.4"/>' +
    '<path d="M152.3,182 L152.3,206 M153.4,182 L153.4,206" stroke="#D8CFB8" stroke-width="0.8"/>' +
    '<path d="M148,178 L153,181 L153,207 L148,210 Z" fill="#8A3420" opacity="0.75"/>' +
    '<rect x="118" y="188" width="28" height="5" rx="1.5" fill="#F0D48A" opacity="0.92"/>' +
    '<path d="M120,197 L143,197 M120,201 L138,201" stroke="#E8C878" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M137,178 L142,178 L142,214 L139.5,208 L137,214 Z" fill="#D4A62A" stroke="#4a3428" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M114,181 Q113,190 116,197" stroke="#E8927A" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>' +
    '</g>';
  } },
{ id:'held_bag', category:'handheld', name:'鞄', price:50,
  getSVG:function(){ return '' +
    '<path d="M121,197 Q135,175 149,197 Q145,199 143,197 Q133,181 127,197 Q125,199 121,197 Z" fill="#6B4A32" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<rect x="115" y="197" width="42" height="38" rx="9" fill="#C98A4B" stroke="#4a3428" stroke-width="2.5"/>' +
    '<path d="M149,199 Q156,218 150,233 L143,233 Q150,218 142,199 Z" fill="#9A5F2C" opacity="0.75"/>' +
    '<path d="M115,197 Q136,190 157,197 L157,208 Q136,214 115,208 Z" fill="#B8763A" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<rect x="131" y="200" width="10" height="6" rx="1.5" fill="#E8B93C" stroke="#4a3428" stroke-width="1.6"/>' +
    '<circle cx="136" cy="203" r="2" fill="#8B5A2B"/>' +
    '<path d="M120,229 Q136,233 152,229" stroke="#8B5A2B" stroke-width="1.4" stroke-dasharray="3,2" fill="none"/>' +
    '<path d="M120,203 Q118,215 121,227" stroke="#E0A868" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.7"/>';
  } },
{ id:'held_backpack', category:'handheld', name:'リュック', price:40,
  getSVG:function(){ return '' +
    '<path d="M126,143 Q116,168 128,198 L136,200 Q126,170 134,143 Z" fill="#4a3428" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<ellipse cx="127" cy="145" rx="8" ry="6" fill="#4a3428" opacity="0.9"/>' +
    '<rect x="126" y="174" width="10" height="6" rx="1.5" fill="#C9C2B4" stroke="#4a3428" stroke-width="1.4"/>' +
    '<rect x="137" y="150" width="36" height="58" rx="12" fill="#7A8F5C" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M167,152 Q175,180 169,206 L160,206 Q168,180 158,152 Z" fill="#5C6E42" opacity="0.75"/>' +
    '<path d="M137,150 Q155,141 173,150 L173,168 Q155,174 137,168 Z" fill="#657A48" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M150,148 Q155,139 160,148" stroke="#4a3428" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<rect x="145" y="178" width="20" height="20" rx="6" fill="#657A48" stroke="#4a3428" stroke-width="2"/>' +
    '<path d="M147,182 Q155,180 163,182" stroke="#4a3428" stroke-width="1.4" fill="none"/>' +
    '<rect x="144" y="160" width="4" height="10" fill="#4a3428"/>' +
    '<rect x="166" y="160" width="4" height="10" fill="#4a3428"/>' +
    '<circle cx="146" cy="170" r="2" fill="#C9C2B4"/>' +
    '<circle cx="168" cy="170" r="2" fill="#C9C2B4"/>';
  } },
{ id:'held_wand', category:'handheld', name:'魔法の杖', price:300,
  getSVG:function(){ return '' +
    '<defs>' +
    '<radialGradient id="held_wand-star" cx="35%" cy="35%" r="70%">' +
    '<stop offset="0%" stop-color="#FFF6D0"/>' +
    '<stop offset="55%" stop-color="#FFD447"/>' +
    '<stop offset="100%" stop-color="#C98A1E"/>' +
    '</radialGradient>' +
    '</defs>' +
    '<g transform="rotate(-58 135 199)">' +
    '<rect x="145" y="197.5" width="62" height="3" rx="1.5" fill="#4A3468" stroke="#4a3428" stroke-width="1.6"/>' +
    '<path d="M152,198 L156,197.6 M164,198 L168,197.6 M176,198 L180,197.6 M188,198 L192,197.6" stroke="#E8B93C" stroke-width="1.2"/>' +
    '<rect x="130" y="195.5" width="15" height="7" rx="2.5" fill="#3A2A52" stroke="#4a3428" stroke-width="2"/>' +
    '<rect x="133" y="195.5" width="2" height="7" fill="#E8B93C"/>' +
    '<rect x="141" y="195.5" width="2" height="7" fill="#E8B93C"/>' +
    '<path d="M214,189 L216.65,195.36 L223.51,195.91 L218.28,200.39 L219.88,207.09 L214,203.5 L208.12,207.09 L209.72,200.39 L204.49,195.91 L211.35,195.36 Z" fill="url(#held_wand-star)" stroke="#4a3428" stroke-width="1.8" stroke-linejoin="round" filter="url(#av-glow)"/>' +
    '<path d="M226,186 L228,190 L232,190 L229,193 L230,197 L226,195 L222,197 L223,193 L220,190 L224,190 Z" fill="#FFF2B0" opacity="0.85"/>' +
    '<circle cx="200" cy="207" r="2.2" fill="#FFE9A8" opacity="0.85"/>' +
    '</g>';
  } },
{ id:'held_sword', category:'handheld', name:'勇者の剣', price:500,
  getSVG:function(){ return '' +
    '<defs>' +
    '<linearGradient id="held_sword-blade" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#F5F7F9"/>' +
    '<stop offset="45%" stop-color="#D5DCE1"/>' +
    '<stop offset="100%" stop-color="#93A0AA"/>' +
    '</linearGradient>' +
    '<linearGradient id="held_sword-guard" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#FFE9A8"/>' +
    '<stop offset="50%" stop-color="#E8B93C"/>' +
    '<stop offset="100%" stop-color="#A8721A"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<g transform="rotate(-62.5 135 199)">' +
    '<path d="M153,193 L205,195 L220,199 L205,203 L153,205 Z" fill="url(#held_sword-blade)" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M153,203 L204,201.6 L218,199 L204,203.6 L153,205 Z" fill="#7A8894" opacity="0.55"/>' +
    '<path d="M156,199 L214,199" stroke="#FFFFFF" stroke-width="1.4" opacity="0.7" stroke-linecap="round"/>' +
    '<rect x="146" y="188" width="6" height="22" rx="2" fill="url(#held_sword-guard)" stroke="#4a3428" stroke-width="2"/>' +
    '<rect x="132" y="195" width="15" height="8" rx="3" fill="#4a3428" stroke="#4a3428" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M134,196.5 L145,196.5 M134,201.5 L145,201.5" stroke="#6B5644" stroke-width="1" opacity="0.8"/>' +
    '<circle cx="130" cy="199" r="5" fill="url(#held_sword-guard)" stroke="#4a3428" stroke-width="1.8"/>' +
    '</g>';
  } },
{ id:'held_lightsaber', category:'handheld', name:'ライトセーバー', price:600,
  getSVG:function(){ return '' +
    '<defs>' +
    '<linearGradient id="held_lightsaber-blade" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#FFFFFF"/>' +
    '<stop offset="50%" stop-color="#6FD8FF"/>' +
    '<stop offset="100%" stop-color="#2B8FE0"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<g transform="rotate(-60 135 199)">' +
    '<rect x="156" y="193.5" width="64" height="11" rx="5.5" fill="#4FC9FF" opacity="0.35" filter="url(#av-glow)"/>' +
    '<rect x="156" y="195.5" width="64" height="7" rx="3.5" fill="url(#held_lightsaber-blade)" filter="url(#av-glow)"/>' +
    '<rect x="158" y="197.7" width="60" height="2.2" rx="1.1" fill="#EAFBFF" opacity="0.9"/>' +
    '<rect x="150" y="195" width="6" height="8" rx="2" fill="#5A5F66" stroke="#4a3428" stroke-width="1.6"/>' +
    '<rect x="128" y="193" width="22" height="12" rx="4" fill="#C9CDD2" stroke="#4a3428" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M132,193 L132,205 M137,193 L137,205 M143,193 L143,205" stroke="#8A9096" stroke-width="1.2"/>' +
    '<rect x="133" y="197" width="4" height="4" rx="1" fill="#E84B4B"/>' +
    '</g>';
  } },
{ id:'held_trophy', category:'handheld', name:'トロフィー', price:400,
  getSVG:function(){ return '' +
    '<defs>' +
    '<linearGradient id="held_trophy-gold" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="#FFF3B0"/>' +
    '<stop offset="45%" stop-color="#FFD447"/>' +
    '<stop offset="100%" stop-color="#A8701A"/>' +
    '</linearGradient>' +
    '</defs>' +
    '<path d="M118,168 Q108,168 109,180 Q110,190 120,188" fill="none" stroke="url(#held_trophy-gold)" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M118,168 Q108,168 109,180 Q110,190 120,188" fill="none" stroke="#4a3428" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M152,168 Q162,168 161,180 Q160,190 150,188" fill="none" stroke="url(#held_trophy-gold)" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M152,168 Q162,168 161,180 Q160,190 150,188" fill="none" stroke="#4a3428" stroke-width="2" stroke-linecap="round"/>' +
    '<rect x="122" y="206" width="26" height="7" rx="2" fill="url(#held_trophy-gold)" stroke="#4a3428" stroke-width="2.2"/>' +
    '<rect x="131" y="194" width="8" height="13" rx="2" fill="url(#held_trophy-gold)" stroke="#4a3428" stroke-width="1.8"/>' +
    '<path d="M118,160 Q117,178 127,194 L143,194 Q153,178 152,160 Q152,152 135,152 Q118,152 118,160 Z" fill="url(#held_trophy-gold)" stroke="#4a3428" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M148,160 Q150,178 143,194 L138,194 Q145,178 143,160 Z" fill="#A8701A" opacity="0.6"/>' +
    '<ellipse cx="135" cy="153" rx="17" ry="4" fill="#C98A1E"/>' +
    '<path d="M124,158 Q122,172 126,186" stroke="#FFFFFF" stroke-width="2.5" opacity="0.65" fill="none" stroke-linecap="round"/>' +
    '<path d="M135,167 L136.6,171 L141,171 L137.5,173.5 L138.8,177.5 L135,175 L131.2,177.5 L132.5,173.5 L129,171 L133.4,171 Z" fill="#FFF6D0" opacity="0.9"/>';
  } },
];
