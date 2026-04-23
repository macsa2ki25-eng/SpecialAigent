// ===== たまこっち! キャラクター SVG =====
(function() {
  'use strict';

  // viewBox = "0 0 96 96" for all characters
  var CHAR_SVG = {};

  // --- Stage 0: まこたま (Egg) ---
  CHAR_SVG.egg = function() {
    return '<defs>' +
      '<radialGradient id="tc-egg-g" cx="45%" cy="35%" r="55%">' +
        '<stop offset="0%" stop-color="#fffef0"/>' +
        '<stop offset="100%" stop-color="#f5e6b8"/>' +
      '</radialGradient>' +
      '<radialGradient id="tc-egg-sh" cx="50%" cy="90%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(0,0,0,0.12)"/>' +
        '<stop offset="100%" stop-color="transparent"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="88" rx="22" ry="4" fill="url(#tc-egg-sh)"/>' +
    '<ellipse cx="48" cy="55" rx="20" ry="26" fill="url(#tc-egg-g)" stroke="#d4c088" stroke-width="1.5">' +
      '<animateTransform attributeName="transform" type="rotate" values="-3,48,55;3,48,55;-3,48,55" dur="2s" repeatCount="indefinite"/>' +
    '</ellipse>' +
    '<path d="M38 42 L42 48 L36 47Z" fill="none" stroke="#c8a850" stroke-width="1" stroke-linecap="round"/>' +
    '<path d="M52 38 L56 44 L50 43Z" fill="none" stroke="#c8a850" stroke-width="1" stroke-linecap="round"/>' +
    '<path d="M46 35 L48 40" fill="none" stroke="#c8a850" stroke-width="0.8" stroke-linecap="round"/>' +
    '<text x="48" y="20" text-anchor="middle" font-size="8" fill="#e8a030" opacity="0.7">?</text>';
  };

  // --- Stage 1: まこっち (Baby) ---
  CHAR_SVG.makocchi = function() {
    return '<defs>' +
      '<radialGradient id="tc-bb-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#fff"/>' +
        '<stop offset="100%" stop-color="#f0ece0"/>' +
      '</radialGradient>' +
      '<radialGradient id="tc-blush" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(255,140,140,0.5)"/>' +
        '<stop offset="100%" stop-color="transparent"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="88" rx="18" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<ellipse cx="48" cy="58" rx="22" ry="24" fill="url(#tc-bb-g)" stroke="#ddd" stroke-width="1"/>' +
    '<circle cx="38" cy="52" r="3.5" fill="#2a2a2a"/>' +
    '<circle cx="58" cy="52" r="3.5" fill="#2a2a2a"/>' +
    '<circle cx="36" cy="50" r="1.2" fill="#fff"/>' +
    '<circle cx="56" cy="50" r="1.2" fill="#fff"/>' +
    '<ellipse cx="30" cy="58" rx="5" ry="4" fill="url(#tc-blush)"/>' +
    '<ellipse cx="66" cy="58" rx="5" ry="4" fill="url(#tc-blush)"/>' +
    '<path d="M43 62 Q48 67 53 62" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="30" cy="64" rx="5" ry="3" fill="#f0ece0" stroke="#ddd" stroke-width="0.5"/>' +
    '<ellipse cx="66" cy="64" rx="5" ry="3" fill="#f0ece0" stroke="#ddd" stroke-width="0.5"/>' +
    '<g>' +
      '<animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="1.5s" repeatCount="indefinite"/>' +
    '</g>';
  };

  // --- Stage 2 Good: まこりん (Child - Good Care) ---
  CHAR_SVG.makorin = function() {
    return '<defs>' +
      '<radialGradient id="tc-mr-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#fff5f5"/>' +
        '<stop offset="100%" stop-color="#ffe0d0"/>' +
      '</radialGradient>' +
      '<radialGradient id="tc-mr-bl" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(255,120,150,0.5)"/>' +
        '<stop offset="100%" stop-color="transparent"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="89" rx="16" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<ellipse cx="48" cy="60" rx="21" ry="22" fill="url(#tc-mr-g)" stroke="#e8b0a0" stroke-width="1"/>' +
    '<path d="M30 44 Q32 28 40 38" fill="#ffe0d0" stroke="#e8b0a0" stroke-width="1"/>' +
    '<path d="M66 44 Q64 28 56 38" fill="#ffe0d0" stroke="#e8b0a0" stroke-width="1"/>' +
    '<path d="M36 48 Q38 55 40 48" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M56 48 Q58 55 60 48" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>' +
    '<ellipse cx="30" cy="56" rx="5" ry="4" fill="url(#tc-mr-bl)"/>' +
    '<ellipse cx="66" cy="56" rx="5" ry="4" fill="url(#tc-mr-bl)"/>' +
    '<path d="M42 62 Q48 68 54 62" fill="none" stroke="#e05080" stroke-width="1.5" stroke-linecap="round"/>' +
    '<circle cx="48" cy="32" r="4" fill="#ff8090" opacity="0.8"/>' +
    '<circle cx="48" cy="32" r="2.5" fill="#ff5070"/>' +
    '<path d="M45 30 Q48 26 51 30" fill="#ff5070"/>' +
    '<ellipse cx="30" cy="66" rx="5" ry="3" fill="#ffe0d0" stroke="#e8b0a0" stroke-width="0.5"/>' +
    '<ellipse cx="66" cy="66" rx="5" ry="3" fill="#ffe0d0" stroke="#e8b0a0" stroke-width="0.5"/>' +
    '<circle cx="18" cy="36" r="2" fill="#ffb0c0" opacity="0.5"><animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/></circle>' +
    '<circle cx="76" cy="30" r="1.5" fill="#ffb0c0" opacity="0.4"><animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/></circle>';
  };

  // --- Stage 2 Bad: まこぐー (Child - Bad Care) ---
  CHAR_SVG.makoguu = function() {
    return '<defs>' +
      '<radialGradient id="tc-mg-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#e8e8f0"/>' +
        '<stop offset="100%" stop-color="#c0c0d0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="89" rx="16" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<ellipse cx="48" cy="60" rx="22" ry="23" fill="url(#tc-mg-g)" stroke="#9090a8" stroke-width="1"/>' +
    '<path d="M32 40 L36 34 L40 42" fill="#c0c0d0" stroke="#9090a8" stroke-width="1"/>' +
    '<path d="M56 42 L60 34 L64 40" fill="#c0c0d0" stroke="#9090a8" stroke-width="1"/>' +
    '<line x1="34" y1="46" x2="42" y2="49" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="54" y1="49" x2="62" y2="46" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="38" cy="54" r="3" fill="#2a2a2a"/>' +
    '<circle cx="58" cy="54" r="3" fill="#2a2a2a"/>' +
    '<circle cx="37" cy="53" r="1" fill="#fff"/>' +
    '<circle cx="57" cy="53" r="1" fill="#fff"/>' +
    '<path d="M42 66 Q48 62 54 66" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="28" cy="68" rx="5" ry="3" fill="#c0c0d0" stroke="#9090a8" stroke-width="0.5"/>' +
    '<ellipse cx="68" cy="68" rx="5" ry="3" fill="#c0c0d0" stroke="#9090a8" stroke-width="0.5"/>' +
    '<text x="48" y="18" text-anchor="middle" font-size="10" fill="#8080a0">💢</text>';
  };

  // --- Stage 3 Best: まこぴか (Teen - Best) ---
  CHAR_SVG.makopika = function() {
    return '<defs>' +
      '<radialGradient id="tc-mp-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#fffff0"/>' +
        '<stop offset="100%" stop-color="#fff0b0"/>' +
      '</radialGradient>' +
      '<radialGradient id="tc-mp-star" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#fff"/>' +
        '<stop offset="100%" stop-color="#ffd700"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="90" rx="14" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<path d="M36 56 L30 50 Q28 46 32 48Z" fill="#fff0b0" stroke="#e8c840" stroke-width="0.8" opacity="0.7"/>' +
    '<path d="M60 56 L66 50 Q68 46 64 48Z" fill="#fff0b0" stroke="#e8c840" stroke-width="0.8" opacity="0.7"/>' +
    '<ellipse cx="48" cy="58" rx="18" ry="20" fill="url(#tc-mp-g)" stroke="#e8c840" stroke-width="1"/>' +
    '<rect x="42" y="78" width="5" height="8" rx="2" fill="#fff0b0" stroke="#e8c840" stroke-width="0.5"/>' +
    '<rect x="51" y="78" width="5" height="8" rx="2" fill="#fff0b0" stroke="#e8c840" stroke-width="0.5"/>' +
    '<polygon points="48,24 50,30 56,30 51,34 53,40 48,36 43,40 45,34 40,30 46,30" fill="url(#tc-mp-star)" stroke="#e8a030" stroke-width="0.8"/>' +
    '<circle cx="40" cy="52" r="3.5" fill="#2a2a2a"/>' +
    '<circle cx="56" cy="52" r="3.5" fill="#2a2a2a"/>' +
    '<polygon points="40,52 39,50 41,50" fill="#ffd700"/>' +
    '<polygon points="56,52 55,50 57,50" fill="#ffd700"/>' +
    '<circle cx="39" cy="51" r="1" fill="#fff"/>' +
    '<circle cx="55" cy="51" r="1" fill="#fff"/>' +
    '<path d="M43 62 Q48 67 53 62" fill="none" stroke="#e8a030" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="32" cy="56" rx="4" ry="3" fill="rgba(255,180,60,0.3)"/>' +
    '<ellipse cx="64" cy="56" rx="4" ry="3" fill="rgba(255,180,60,0.3)"/>' +
    '<circle cx="22" cy="40" r="1.5" fill="#ffd700" opacity="0.6"><animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite"/></circle>' +
    '<circle cx="74" cy="36" r="1.2" fill="#ffd700" opacity="0.5"><animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/></circle>' +
    '<circle cx="18" cy="60" r="1" fill="#ffd700" opacity="0.4"><animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/></circle>';
  };

  // --- Stage 3 Mid: まこすけ (Teen - Average) ---
  CHAR_SVG.makosuke = function() {
    return '<defs>' +
      '<radialGradient id="tc-ms-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#f0fff0"/>' +
        '<stop offset="100%" stop-color="#c0e8c0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="90" rx="14" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<ellipse cx="48" cy="58" rx="18" ry="20" fill="url(#tc-ms-g)" stroke="#80b080" stroke-width="1"/>' +
    '<rect x="42" y="78" width="5" height="8" rx="2" fill="#c0e8c0" stroke="#80b080" stroke-width="0.5"/>' +
    '<rect x="51" y="78" width="5" height="8" rx="2" fill="#c0e8c0" stroke="#80b080" stroke-width="0.5"/>' +
    '<rect x="54" y="30" width="16" height="20" rx="2" fill="#e8d070" stroke="#c0a030" stroke-width="0.8" transform="rotate(15,62,40)"/>' +
    '<line x1="57" y1="35" x2="67" y2="35" stroke="#c0a030" stroke-width="0.5" transform="rotate(15,62,40)"/>' +
    '<line x1="57" y1="38" x2="67" y2="38" stroke="#c0a030" stroke-width="0.5" transform="rotate(15,62,40)"/>' +
    '<circle cx="40" cy="52" r="3" fill="#2a2a2a"/>' +
    '<circle cx="56" cy="52" r="3" fill="#2a2a2a"/>' +
    '<circle cx="39" cy="51" r="1" fill="#fff"/>' +
    '<circle cx="55" cy="51" r="1" fill="#fff"/>' +
    '<path d="M43 62 Q48 66 53 62" fill="none" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="32" cy="56" rx="4" ry="3" fill="rgba(100,180,100,0.3)"/>' +
    '<ellipse cx="64" cy="56" rx="4" ry="3" fill="rgba(100,180,100,0.3)"/>' +
    '<line x1="58" y1="28" x2="60" y2="25" stroke="#c0a030" stroke-width="1.5" stroke-linecap="round"/>';
  };

  // --- Stage 3 Bad: まこだら (Teen - Bad) ---
  CHAR_SVG.makodara = function() {
    return '<defs>' +
      '<radialGradient id="tc-md-g" cx="45%" cy="40%" r="60%">' +
        '<stop offset="0%" stop-color="#e8e0f0"/>' +
        '<stop offset="100%" stop-color="#c0b0d8"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="90" rx="18" ry="3" fill="rgba(0,0,0,0.06)"/>' +
    '<ellipse cx="48" cy="62" rx="20" ry="18" fill="url(#tc-md-g)" stroke="#a090b8" stroke-width="1"/>' +
    '<rect x="40" y="78" width="6" height="6" rx="3" fill="#c0b0d8" stroke="#a090b8" stroke-width="0.5"/>' +
    '<rect x="52" y="78" width="6" height="6" rx="3" fill="#c0b0d8" stroke="#a090b8" stroke-width="0.5"/>' +
    '<line x1="35" y1="52" x2="42" y2="54" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<line x1="54" y1="54" x2="61" y2="52" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<circle cx="39" cy="57" r="2.5" fill="#2a2a2a"/>' +
    '<circle cx="57" cy="57" r="2.5" fill="#2a2a2a"/>' +
    '<circle cx="38" cy="56" r="0.8" fill="#fff"/>' +
    '<circle cx="56" cy="56" r="0.8" fill="#fff"/>' +
    '<path d="M43 66 Q48 64 53 66" fill="none" stroke="#2a2a2a" stroke-width="1.2" stroke-linecap="round"/>' +
    '<ellipse cx="55" cy="30" rx="12" ry="8" fill="#d0c8e0" opacity="0.5"/>' +
    '<ellipse cx="50" cy="26" rx="8" ry="6" fill="#d8d0e8" opacity="0.4"/>' +
    '<text x="54" y="32" text-anchor="middle" font-size="7" fill="#a090b8" opacity="0.7">Z</text>' +
    '<text x="60" y="26" text-anchor="middle" font-size="5" fill="#a090b8" opacity="0.5">z</text>' +
    '<text x="64" y="22" text-anchor="middle" font-size="4" fill="#a090b8" opacity="0.3">z</text>'  ;
  };

  // --- Stage 4 S-Rank: まこマスター (Adult - Best) ---
  CHAR_SVG.makomaster = function() {
    return '<defs>' +
      '<radialGradient id="tc-mm-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#fffff0"/>' +
        '<stop offset="100%" stop-color="#ffe880"/>' +
      '</radialGradient>' +
      '<linearGradient id="tc-mm-cape" x1="0%" y1="0%" x2="0%" y2="100%">' +
        '<stop offset="0%" stop-color="#e02020"/>' +
        '<stop offset="100%" stop-color="#a01010"/>' +
      '</linearGradient>' +
      '<radialGradient id="tc-mm-crown" cx="50%" cy="80%" r="60%">' +
        '<stop offset="0%" stop-color="#ffd700"/>' +
        '<stop offset="100%" stop-color="#c8a000"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="91" rx="14" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<path d="M30 50 Q28 80 36 86 L48 88 L60 86 Q68 80 66 50Z" fill="url(#tc-mm-cape)" opacity="0.8"/>' +
    '<ellipse cx="48" cy="58" rx="17" ry="19" fill="url(#tc-mm-g)" stroke="#d4a800" stroke-width="1.2"/>' +
    '<rect x="42" y="77" width="5" height="9" rx="2" fill="#ffe880" stroke="#d4a800" stroke-width="0.5"/>' +
    '<rect x="51" y="77" width="5" height="9" rx="2" fill="#ffe880" stroke="#d4a800" stroke-width="0.5"/>' +
    '<path d="M36 30 L39 22 L44 28 L48 18 L52 28 L57 22 L60 30Z" fill="url(#tc-mm-crown)" stroke="#b89800" stroke-width="0.8"/>' +
    '<circle cx="44" cy="24" r="1.5" fill="#e03030"/>' +
    '<circle cx="48" cy="20" r="1.5" fill="#3060e0"/>' +
    '<circle cx="52" cy="24" r="1.5" fill="#30b030"/>' +
    '<circle cx="40" cy="50" r="3.5" fill="#2a2a2a"/>' +
    '<circle cx="56" cy="50" r="3.5" fill="#2a2a2a"/>' +
    '<polygon points="40,50 39,48 41,48" fill="#ffd700"/>' +
    '<polygon points="56,50 55,48 57,48" fill="#ffd700"/>' +
    '<circle cx="39" cy="49" r="1" fill="#fff"/>' +
    '<circle cx="55" cy="49" r="1" fill="#fff"/>' +
    '<path d="M42 62 Q48 68 54 62" fill="none" stroke="#d4a800" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="32" cy="54" rx="4" ry="3" fill="rgba(255,200,60,0.3)"/>' +
    '<ellipse cx="64" cy="54" rx="4" ry="3" fill="rgba(255,200,60,0.3)"/>' +
    '<circle cx="20" cy="30" r="1.5" fill="#ffd700" opacity="0.5"><animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite"/></circle>' +
    '<circle cx="76" cy="40" r="1.2" fill="#ffd700" opacity="0.4"><animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite"/></circle>' +
    '<circle cx="24" cy="70" r="1" fill="#ffd700" opacity="0.3"><animate attributeName="opacity" values="0.3;0;0.3" dur="2.2s" repeatCount="indefinite"/></circle>' +
    '<circle cx="72" cy="65" r="1.3" fill="#ffd700" opacity="0.4"><animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite"/></circle>';
  };

  // --- Stage 4 A-Rank: まこスター (Adult - Great) ---
  CHAR_SVG.makostar = function() {
    return '<defs>' +
      '<radialGradient id="tc-mst-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#fff8f0"/>' +
        '<stop offset="100%" stop-color="#ffe0a0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="91" rx="14" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<ellipse cx="48" cy="58" rx="17" ry="19" fill="url(#tc-mst-g)" stroke="#d8a040" stroke-width="1"/>' +
    '<rect x="42" y="77" width="5" height="9" rx="2" fill="#ffe0a0" stroke="#d8a040" stroke-width="0.5"/>' +
    '<rect x="51" y="77" width="5" height="9" rx="2" fill="#ffe0a0" stroke="#d8a040" stroke-width="0.5"/>' +
    '<polygon points="48,22 50,28 56,28 51,32 53,38 48,34 43,38 45,32 40,28 46,28" fill="#ffd700" stroke="#e8a030" stroke-width="0.6"/>' +
    '<rect x="34" y="44" width="12" height="7" rx="3" fill="#333" opacity="0.85"/>' +
    '<rect x="50" y="44" width="12" height="7" rx="3" fill="#333" opacity="0.85"/>' +
    '<rect x="44" y="45" width="8" height="5" rx="1" fill="#333" opacity="0.6"/>' +
    '<line x1="36" y1="46" x2="44" y2="48" stroke="#fff" stroke-width="0.6" opacity="0.3"/>' +
    '<line x1="52" y1="48" x2="60" y2="46" stroke="#fff" stroke-width="0.6" opacity="0.3"/>' +
    '<path d="M42 62 Q48 67 54 62" fill="none" stroke="#d8a040" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="32" cy="54" rx="4" ry="3" fill="rgba(255,180,60,0.25)"/>' +
    '<ellipse cx="64" cy="54" rx="4" ry="3" fill="rgba(255,180,60,0.25)"/>' +
    '<polygon points="20,50 21,53 24,53 21.5,55 22.5,58 20,56 17.5,58 18.5,55 16,53 19,53" fill="#ffd700" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite"/></polygon>' +
    '<polygon points="76,42 77,44 79,44 77.5,45.5 78,47 76,46 74,47 74.5,45.5 73,44 75,44" fill="#ffd700" opacity="0.3"><animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite"/></polygon>';
  };

  // --- Stage 4 B-Rank: まこフレンド (Adult - Good) ---
  CHAR_SVG.makofriend = function() {
    return '<defs>' +
      '<radialGradient id="tc-mf-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="#fff0f5"/>' +
        '<stop offset="100%" stop-color="#f0c8d8"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="91" rx="14" ry="3" fill="rgba(0,0,0,0.08)"/>' +
    '<ellipse cx="48" cy="58" rx="18" ry="20" fill="url(#tc-mf-g)" stroke="#d090a8" stroke-width="1"/>' +
    '<rect x="42" y="78" width="5" height="8" rx="2" fill="#f0c8d8" stroke="#d090a8" stroke-width="0.5"/>' +
    '<rect x="51" y="78" width="5" height="8" rx="2" fill="#f0c8d8" stroke="#d090a8" stroke-width="0.5"/>' +
    '<ellipse cx="26" cy="62" rx="6" ry="4" fill="#f0c8d8" stroke="#d090a8" stroke-width="0.5"/>' +
    '<ellipse cx="70" cy="62" rx="6" ry="4" fill="#f0c8d8" stroke="#d090a8" stroke-width="0.5"/>' +
    '<circle cx="40" cy="50" r="3" fill="#2a2a2a"/>' +
    '<circle cx="56" cy="50" r="3" fill="#2a2a2a"/>' +
    '<circle cx="39" cy="49" r="1" fill="#fff"/>' +
    '<circle cx="55" cy="49" r="1" fill="#fff"/>' +
    '<path d="M40 62 Q48 70 56 62" fill="#e88" stroke="#d070" stroke-width="0" opacity="0.4"/>' +
    '<path d="M40 62 Q48 70 56 62" fill="none" stroke="#d08090" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="32" cy="56" rx="5" ry="3.5" fill="rgba(240,140,160,0.3)"/>' +
    '<ellipse cx="64" cy="56" rx="5" ry="3.5" fill="rgba(240,140,160,0.3)"/>' +
    '<path d="M18 36 Q20 30 22 36 Q24 30 26 36 Q22 42 22 42 Q22 42 18 36Z" fill="#ff6088" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite"/></path>' +
    '<path d="M70 30 Q72 24 74 30 Q76 24 78 30 Q74 36 74 36 Q74 36 70 30Z" fill="#ff6088" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/></path>';
  };

  // --- Stage 4 C-Rank: まこスリーパー (Adult - Below Avg) ---
  CHAR_SVG.makosleeper = function() {
    return '<defs>' +
      '<radialGradient id="tc-msl-g" cx="45%" cy="40%" r="60%">' +
        '<stop offset="0%" stop-color="#f0f0ff"/>' +
        '<stop offset="100%" stop-color="#c8c8e8"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<ellipse cx="48" cy="91" rx="16" ry="3" fill="rgba(0,0,0,0.06)"/>' +
    '<ellipse cx="48" cy="60" rx="20" ry="22" fill="url(#tc-msl-g)" stroke="#a0a0c0" stroke-width="1"/>' +
    '<path d="M34 32 Q38 26 48 28 Q42 24 36 28Z" fill="#6060c0" opacity="0.7"/>' +
    '<circle cx="44" cy="30" r="2" fill="#fff" stroke="#6060c0" stroke-width="0.5"/>' +
    '<rect x="40" y="80" width="6" height="6" rx="3" fill="#c8c8e8" stroke="#a0a0c0" stroke-width="0.5"/>' +
    '<rect x="52" y="80" width="6" height="6" rx="3" fill="#c8c8e8" stroke="#a0a0c0" stroke-width="0.5"/>' +
    '<line x1="35" y1="50" x2="43" y2="52" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<line x1="53" y1="52" x2="61" y2="50" stroke="#2a2a2a" stroke-width="1.5" stroke-linecap="round"/>' +
    '<ellipse cx="48" cy="64" rx="4" ry="3" fill="#2a2a2a" opacity="0.3"/>' +
    '<ellipse cx="22" cy="56" rx="10" ry="8" fill="#e0ddf0" stroke="#c0bdd8" stroke-width="0.8" opacity="0.5"/>' +
    '<text x="60" y="38" text-anchor="middle" font-size="9" fill="#8080c0" opacity="0.7">Z</text>' +
    '<text x="67" y="30" text-anchor="middle" font-size="7" fill="#8080c0" opacity="0.5">Z</text>' +
    '<text x="72" y="24" text-anchor="middle" font-size="5" fill="#8080c0" opacity="0.3">z</text>';
  };

  // --- Stage 4 D-Rank: まこゴースト (Adult - Neglected) ---
  CHAR_SVG.makoghost = function() {
    return '<defs>' +
      '<radialGradient id="tc-mgh-g" cx="45%" cy="35%" r="60%">' +
        '<stop offset="0%" stop-color="rgba(255,255,255,0.8)"/>' +
        '<stop offset="100%" stop-color="rgba(200,210,230,0.5)"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g opacity="0.7">' +
      '<path d="M28 50 Q28 30 48 28 Q68 30 68 50 L68 75 Q64 70 60 75 Q56 70 52 75 Q48 70 44 75 Q40 70 36 75 Q32 70 28 75Z" fill="url(#tc-mgh-g)" stroke="#a0b0c8" stroke-width="1">' +
        '<animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="3s" repeatCount="indefinite"/>' +
      '</path>' +
    '</g>' +
    '<g>' +
      '<animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="3s" repeatCount="indefinite"/>' +
      '<circle cx="40" cy="48" r="4" fill="#2a2a2a" opacity="0.6"/>' +
      '<circle cx="56" cy="48" r="4" fill="#2a2a2a" opacity="0.6"/>' +
      '<circle cx="39" cy="47" r="1.5" fill="#fff" opacity="0.4"/>' +
      '<circle cx="55" cy="47" r="1.5" fill="#fff" opacity="0.4"/>' +
      '<ellipse cx="48" cy="60" rx="3" ry="4" fill="#2a2a2a" opacity="0.4"/>' +
    '</g>' +
    '<circle cx="22" cy="40" r="3" fill="#b0c8e8" opacity="0.3"><animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite"/></circle>' +
    '<circle cx="74" cy="50" r="2.5" fill="#b0c8e8" opacity="0.2"><animate attributeName="opacity" values="0.2;0.05;0.2" dur="4s" repeatCount="indefinite"/></circle>' +
    '<circle cx="20" cy="65" r="2" fill="#b0c8e8" opacity="0.15"><animate attributeName="opacity" values="0.15;0;0.15" dur="3.5s" repeatCount="indefinite"/></circle>';
  };

  // --- Care action icons (32x32 viewBox) ---
  var ICON_SVG = {};

  ICON_SVG.feed = function() {
    return '<svg viewBox="0 0 32 32" class="care-icon-svg">' +
      '<ellipse cx="16" cy="22" rx="11" ry="7" fill="#fff" stroke="#e8a030" stroke-width="1.5"/>' +
      '<ellipse cx="16" cy="20" rx="9" ry="4" fill="#ffe0a0"/>' +
      '<circle cx="12" cy="19" r="2.5" fill="#fff" opacity="0.6"/>' +
      '<circle cx="18" cy="18" r="2" fill="#fff" opacity="0.5"/>' +
      '<path d="M12 14 Q12 8 14 10" stroke="#ccc" stroke-width="1" fill="none" opacity="0.6"><animate attributeName="d" values="M12 14 Q12 8 14 10;M12 14 Q10 7 14 9;M12 14 Q12 8 14 10" dur="2s" repeatCount="indefinite"/></path>' +
      '<path d="M16 13 Q16 7 18 9" stroke="#ccc" stroke-width="1" fill="none" opacity="0.6"><animate attributeName="d" values="M16 13 Q16 7 18 9;M16 13 Q14 6 18 8;M16 13 Q16 7 18 9" dur="2.5s" repeatCount="indefinite"/></path>' +
    '</svg>';
  };

  ICON_SVG.play = function() {
    return '<svg viewBox="0 0 32 32" class="care-icon-svg">' +
      '<polygon points="16,4 19,10 26,10 20,15 22,22 16,18 10,22 12,15 6,10 13,10" fill="#ffd700" stroke="#e8a030" stroke-width="1"/>' +
      '<circle cx="16" cy="13" r="2" fill="#fff" opacity="0.5"/>' +
    '</svg>';
  };

  ICON_SVG.study = function() {
    return '<svg viewBox="0 0 32 32" class="care-icon-svg">' +
      '<rect x="6" y="8" width="20" height="18" rx="2" fill="#5b8cd0" stroke="#3a6ab0" stroke-width="1"/>' +
      '<rect x="8" y="10" width="16" height="14" rx="1" fill="#f5f0e0"/>' +
      '<line x1="10" y1="14" x2="22" y2="14" stroke="#ccc" stroke-width="0.8"/>' +
      '<line x1="10" y1="17" x2="22" y2="17" stroke="#ccc" stroke-width="0.8"/>' +
      '<line x1="10" y1="20" x2="18" y2="20" stroke="#ccc" stroke-width="0.8"/>' +
      '<line x1="14" y1="8" x2="14" y2="26" stroke="#3a6ab0" stroke-width="1.5"/>' +
    '</svg>';
  };

  ICON_SVG.status = function() {
    return '<svg viewBox="0 0 32 32" class="care-icon-svg">' +
      '<circle cx="16" cy="16" r="10" fill="none" stroke="#e05080" stroke-width="2"/>' +
      '<path d="M12 16 Q12 11 16 11 Q20 11 20 16 Q20 20 16 22 Q12 20 12 16Z" fill="#e05080"/>' +
      '<circle cx="14" cy="14" r="2" fill="#fff" opacity="0.4"/>' +
    '</svg>';
  };

  // --- Death SVG ---
  CHAR_SVG.dead = function() {
    return '<ellipse cx="48" cy="88" rx="18" ry="3" fill="rgba(0,0,0,0.06)"/>' +
    '<g opacity="0.4">' +
      '<ellipse cx="48" cy="58" rx="20" ry="22" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>' +
      '<line x1="35" y1="48" x2="41" y2="54" stroke="#888" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="41" y1="48" x2="35" y2="54" stroke="#888" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="55" y1="48" x2="61" y2="54" stroke="#888" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="61" y1="48" x2="55" y2="54" stroke="#888" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M40 66 Q48 60 56 66" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>' +
    '</g>' +
    '<g opacity="0.3">' +
      '<circle cx="30" cy="30" r="3" fill="none" stroke="#aaa" stroke-width="1"/>' +
      '<circle cx="65" cy="25" r="4" fill="none" stroke="#aaa" stroke-width="1"/>' +
      '<circle cx="20" cy="20" r="2" fill="none" stroke="#aaa" stroke-width="0.8"/>' +
    '</g>';
  };

  function renderChar(charId) {
    var fn = CHAR_SVG[charId];
    if (!fn) return '';
    return '<svg viewBox="0 0 96 96" class="tamakocchi-char">' + fn() + '</svg>';
  }

  function renderIcon(iconId) {
    var fn = ICON_SVG[iconId];
    return fn ? fn() : '';
  }

  window.TamakocchiChars = {
    renderChar: renderChar,
    renderIcon: renderIcon,
    CHAR_SVG: CHAR_SVG,
    ICON_SVG: ICON_SVG
  };
})();
