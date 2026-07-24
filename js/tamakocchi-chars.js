// ===== たまこっち! キャラクター SVG (初代たまごっち風 モノクロLCDドット絵) =====
(function() {
  'use strict';

  var INK = '#20251c';      // ドット色
  var PAPER = '#c9d3ac';    // LCD背景色
  var CELL = 4;              // 96 / 24 = 4px

  var ICONINK = '#4a4a40';
  var ICONCELL = 2;          // 32 / 16 = 2px

  // rows: 文字列配列。'#'=インク, 'o'=紙色(インク領域の中抜き), '.'または' '=透過
  function px(rows, offX, offY) {
    var out = '';
    for (var y = 0; y < rows.length; y++) {
      var row = rows[y];
      var x = 0;
      while (x < row.length) {
        var c = row.charAt(x);
        if (c === '#' || c === 'o') {
          var x0 = x;
          while (x < row.length && row.charAt(x) === c) x++;
          out += '<rect x="' + ((offX + x0) * CELL) + '" y="' + ((offY + y) * CELL) + '"' +
                 ' width="' + ((x - x0) * CELL) + '" height="' + CELL + '"' +
                 ' fill="' + (c === '#' ? INK : PAPER) + '"/>';
        } else { x++; }
      }
    }
    return out;
  }

  // アイコン用: 単色 '#4a4a40' のみ、背景透過('#'以外はすべて透過扱い)
  function pxIcon(rows) {
    var out = '';
    for (var y = 0; y < rows.length; y++) {
      var row = rows[y];
      var x = 0;
      while (x < row.length) {
        var c = row.charAt(x);
        if (c === '#') {
          var x0 = x;
          while (x < row.length && row.charAt(x) === '#') x++;
          out += '<rect x="' + (x0 * ICONCELL) + '" y="' + (y * ICONCELL) + '"' +
                 ' width="' + ((x - x0) * ICONCELL) + '" height="' + ICONCELL + '"' +
                 ' fill="' + ICONINK + '"/>';
        } else { x++; }
      }
    }
    return out;
  }

  // ---- ドット文字列組み立てヘルパー(手計算ミス防止) ----
  function repeatCh(ch, n) {
    var s = '';
    for (var i = 0; i < n; i++) s += ch;
    return s;
  }
  function D(n) { return repeatCh('.', n); }
  function H(n) { return repeatCh('#', n); }
  function O(n) { return repeatCh('o', n); }
  function setAt(row, idx, str) {
    return row.substring(0, idx) + str + row.substring(idx + str.length);
  }

  // ---- アニメ2コマ生成ヘルパー ----
  // 右に dx ドットずらす(先頭に透過パディングを足すだけ。幅が伸びても無害)
  function shiftX(rows, dx) {
    var pad = D(dx);
    var out = [];
    for (var i = 0; i < rows.length; i++) out.push(pad + rows[i]);
    return out;
  }
  // 上に dy ドットずらす(先頭行を削り、末尾に空行を足す)= ホップ/浮遊用
  function shiftUp(rows, dy) {
    var out = rows.slice(dy);
    for (var i = 0; i < dy; i++) out.push('.');
    return out;
  }
  // 左右反転
  function mirrorX(rows) {
    var out = [];
    for (var i = 0; i < rows.length; i++) {
      out.push(rows[i].split('').reverse().join(''));
    }
    return out;
  }

  // ---- 汎用まる型ボディ(幅16 x 高さ14) ----
  var ROUND16 = [
    D(5) + H(6) + D(5),
    D(3) + H(10) + D(3),
    D(2) + H(12) + D(2),
    D(1) + H(14) + D(1),
    H(16),
    H(16),
    H(16),
    H(16),
    H(16),
    H(16),
    D(1) + H(14) + D(1),
    D(2) + H(12) + D(2),
    D(3) + H(10) + D(3),
    D(5) + H(6) + D(5)
  ];
  var EYES16 = setAt(setAt(H(16), 4, O(2)), 10, O(2));
  var MOUTH16 = setAt(H(16), 6, O(4));

  var CHAR_SVG = {};

  // --- Stage 0: まこたま (Egg) ---
  // ジグザグ模様入りのたまご。コマ差=左右に1ドット揺れ。
  CHAR_SVG.egg = function() {
    var a = [
      D(3) + H(4) + D(3),
      D(2) + H(6) + D(2),
      D(1) + H(8) + D(1),
      setAt(H(10), 6, O(1)),
      setAt(H(10), 5, O(1)),
      setAt(H(10), 4, O(1)),
      setAt(H(10), 5, O(1)),
      setAt(H(10), 6, O(1)),
      setAt(H(10), 5, O(1)),
      setAt(H(10), 4, O(1)),
      D(1) + H(8) + D(1),
      D(1) + H(8) + D(1),
      D(2) + H(6) + D(2),
      D(3) + H(4) + D(3)
    ];
    var b = shiftX(a, 1);
    return { a: a, b: b, offX: 7, offY: 6 };
  };

  // --- Stage 1: まこっち (Baby) ---
  // 小さな丸ブロブ。点目+小さな口。コマ差=ぴょこんと1ドット跳ねる。
  CHAR_SVG.makocchi = function() {
    var a = [
      D(3) + H(4) + D(3),
      D(1) + H(8) + D(1),
      H(10),
      setAt(setAt(H(10), 2, O(2)), 6, O(2)),
      setAt(H(10), 4, O(2)),
      H(10),
      D(1) + H(8) + D(1),
      D(2) + H(6) + D(2),
      D(3) + H(4) + D(3)
    ];
    var b = shiftUp(a, 1);
    return { a: a, b: b, offX: 7, offY: 12 };
  };

  // --- Stage 2 Good: まこりん (Child - Good Care) ---
  // 丸body+頭に丸い耳2つ。にこにこ口(∪)。コマ差=耳ぴこぴこ。
  CHAR_SVG.makorin = function() {
    var earTip = D(3) + H(2) + D(6) + H(2) + D(3);
    var earBase = D(2) + H(4) + D(4) + H(4) + D(2);
    var blank = D(16);
    var body = ROUND16.slice();
    body[4] = EYES16;
    body[9] = MOUTH16;
    var a = [earTip, earBase].concat(body);
    var b = [blank, earBase].concat(body);
    return { a: a, b: b, offX: 4, offY: 4 };
  };

  // --- Stage 2 Bad: まこぐー (Child - Bad Care) ---
  // 角ばったbody。への字口＋つり目。コマ差=プンプン揺れ。
  CHAR_SVG.makoguu = function() {
    var spike0 = D(1) + H(1) + D(12) + H(1) + D(1);
    var spike1 = H(2) + D(12) + H(2);
    var eyesTsurime = setAt(setAt(H(16), 3, O(1)), 12, O(1));
    var a = [
      spike0,
      spike1,
      H(16),
      H(16),
      eyesTsurime,
      H(16),
      MOUTH16,
      H(16),
      H(16),
      H(16),
      D(1) + H(14) + D(1),
      D(2) + H(12) + D(2),
      D(3) + H(10) + D(3),
      D(5) + H(6) + D(5)
    ];
    var b = shiftX(a, 1);
    return { a: a, b: b, offX: 4, offY: 6 };
  };

  // --- Stage 3 Best: まこぴか (Teen - Best) ---
  // 頭頂に星型トゲ3本。キラキラ点2つ周囲に。コマ差=キラキラ点滅。
  CHAR_SVG.makopika = function() {
    var s0 = D(1) + H(1) + D(6) + H(2) + D(5) + H(1);
    var s1 = D(2) + H(2) + D(2) + H(4) + D(2) + H(2) + D(2);
    var sparkOn = H(1) + D(14) + H(1);
    var sparkOff = D(16);
    var bodyRest = ROUND16.slice(1);
    bodyRest[3] = EYES16;
    bodyRest[8] = MOUTH16;
    var a = [sparkOn, s0, s1].concat(bodyRest);
    var b = [sparkOff, s0, s1].concat(bodyRest);
    return { a: a, b: b, offX: 4, offY: 4 };
  };

  // --- Stage 3 Mid: まこすけ (Teen - Average) ---
  // 丸メガネ＋本を持つ。コマ差=ページめくり。
  CHAR_SVG.makosuke = function() {
    var glassesRow = H(2) + O(12) + H(2);
    var body = ROUND16.slice();
    body[4] = glassesRow;
    body[9] = MOUTH16;
    var bookTop = body[6] + H(5);
    var bookMidA = body[7] + (H(1) + O(1) + H(1) + O(1) + H(1));
    var bookMidB = body[7] + (H(1) + O(2) + H(2));
    var bookBot = body[8] + H(5);
    var a = body.slice(0, 6).concat([bookTop, bookMidA, bookBot]).concat(body.slice(9));
    var b = body.slice(0, 6).concat([bookTop, bookMidB, bookBot]).concat(body.slice(9));
    return { a: a, b: b, offX: 3, offY: 6 };
  };

  // --- Stage 3 Bad: まこだら (Teen - Bad) ---
  // 縦長でぐにゃっと傾いたブロブ。半目。コマ差=傾き反転。
  CHAR_SVG.makodara = function() {
    var tall = [
      D(3) + H(4) + D(3),
      D(2) + H(6) + D(2),
      D(1) + H(8) + D(1),
      H(10),
      H(10),
      H(10),
      H(10),
      H(10),
      H(10),
      H(10),
      H(10),
      H(10),
      D(1) + H(8) + D(1),
      D(2) + H(6) + D(2),
      D(3) + H(4) + D(3),
      D(4) + H(2) + D(4)
    ];
    tall[5] = setAt(setAt(H(10), 1, O(3)), 6, O(3));
    tall[10] = setAt(H(10), 3, O(3));
    var leanA = shiftX(tall.slice(0, 8), 2).concat(tall.slice(8));
    var leanB = mirrorX(leanA);
    return { a: leanA, b: leanB, offX: 5, offY: 4 };
  };

  // --- Stage 4 S-Rank: まこマスター (Adult - Best) ---
  // 王冠(3山)+マント風の広がるbody。堂々ポーズ。コマ差=マントなびき。
  CHAR_SVG.makomaster = function() {
    var cr0 = D(2) + H(2) + D(3) + H(2) + D(3) + H(2) + D(2);
    var cr1 = setAt(setAt(H(16), 4, '..'), 9, '..');
    var cr2 = H(16);
    var bodyPart = ROUND16.slice(3);
    bodyPart[1] = EYES16;
    bodyPart[6] = MOUTH16;
    var mb = [cr0, cr1, cr2].concat(bodyPart);
    var capeA0 = D(1) + H(14) + D(1);
    var capeA1 = D(2) + H(12) + D(2);
    var capeB0 = H(16);
    var capeB1 = D(1) + H(14) + D(1);
    var a = mb.concat([capeA0, capeA1]);
    var b = mb.concat([capeB0, capeB1]);
    return { a: a, b: b, offX: 4, offY: 4 };
  };

  // --- Stage 4 A-Rank: まこスター (Adult - Great) ---
  // サングラス(横長帯)+星マーク横に。コマ差=腕を上げ下げ。
  CHAR_SVG.makostar = function() {
    // 頭頂の小さな尖り+右上の星の一点+太めのサングラス帯(makosukeの本のような側面突起は使わない)
    var spike = D(7) + H(2) + D(7);
    var starMark = D(15) + H(1);
    var body = ROUND16.slice();
    body[4] = EYES16;
    body[9] = MOUTH16;
    var base = [starMark, spike].concat(body);
    var frameA = base.slice();
    frameA[9] = H(1) + frameA[9] + H(1); // 腕さげ(体の中段)
    var frameB = base.slice();
    frameB[8] = H(1) + frameB[8] + H(1); // 腕あげ(1段上)
    return { a: frameA, b: frameB, offX: 4, offY: 4 };
  };

  // --- Stage 4 B-Rank: まこフレンド (Adult - Good) ---
  // 丸body+両手を広げてハート1個掲げ。コマ差=ハート上下。
  CHAR_SVG.makofriend = function() {
    var h0 = D(1) + H(1) + D(1) + H(1) + D(1);
    var h1 = H(5);
    var h2 = H(5);
    var h3 = D(1) + H(3) + D(1);
    var h4 = D(2) + H(1) + D(2);
    var heartPadded = [
      D(5) + h0 + D(6),
      D(5) + h1 + D(6),
      D(5) + h2 + D(6),
      D(5) + h3 + D(6),
      D(5) + h4 + D(6)
    ];
    var blank = D(16);
    var body = ROUND16.slice();
    body[4] = EYES16;
    body[9] = MOUTH16;
    var a = [blank].concat(heartPadded).concat(body);
    var b = heartPadded.concat([blank]).concat(body);
    return { a: a, b: b, offX: 4, offY: 2 };
  };

  // --- Stage 4 C-Rank: まこスリーパー (Adult - Below Avg) ---
  // ナイトキャップ+閉じ目(－ －)+「Z」ドット。コマ差=Zの位置移動。
  CHAR_SVG.makosleeper = function() {
    // 右に大きくフロップしたナイトキャップ(先端にポンポン)
    var cap0 = D(11) + H(2) + D(3);
    var cap1 = D(9) + H(4) + D(3);
    var cap2 = D(6) + H(6) + D(4);
    var body = ROUND16.slice();
    body[4] = setAt(setAt(H(16), 4, O(3)), 10, O(3));
    body[9] = MOUTH16;
    // Z: 3行のジグザグ(上段/斜め/下段)
    var zA0 = D(11) + H(4);
    var zA1 = D(12) + H(2);
    var zA2 = D(10) + H(4);
    var zB0 = D(8) + H(4);
    var zB1 = D(9) + H(2);
    var zB2 = D(7) + H(4);
    var a = [zA0, zA1, zA2, cap0, cap1, cap2].concat(body);
    var b = [zB0, zB1, zB2, cap0, cap1, cap2].concat(body);
    return { a: a, b: b, offX: 4, offY: 1 };
  };

  // --- Stage 4 D-Rank: まこゴースト (Adult - Neglected) ---
  // 裾が波形のおばけ。目は'o'の中抜き。コマ差=ふわふわ上下1ドット。
  CHAR_SVG.makoghost = function() {
    var top = ROUND16.slice(0, 10);
    top[4] = EYES16;
    top[9] = MOUTH16;
    var hem = H(16);
    hem = setAt(hem, 2, '.');
    hem = setAt(hem, 5, '.');
    hem = setAt(hem, 8, '.');
    hem = setAt(hem, 11, '.');
    hem = setAt(hem, 14, '.');
    var a = top.concat([hem]);
    var b = shiftUp(a, 1);
    return { a: a, b: b, offX: 4, offY: 9 };
  };

  // --- Death: 墓石+浮かぶ魂 ---
  CHAR_SVG.dead = function() {
    var st0 = D(3) + H(4) + D(3);
    var st1 = D(2) + H(6) + D(2);
    var st2 = D(1) + H(8) + D(1);
    var sb0 = H(10);
    var sb1 = setAt(H(10), 4, O(2));
    var sb2 = setAt(H(10), 2, O(6));
    var sb3 = setAt(H(10), 4, O(2));
    var sb4 = H(10);
    var soulA = D(6) + H(2) + D(2);
    var soulB = D(8) + H(2);
    var a = [soulA, st0, st1, st2, sb0, sb1, sb2, sb3, sb4];
    var b = [soulB, st0, st1, st2, sb0, sb1, sb2, sb3, sb4];
    return { a: a, b: b, offX: 7, offY: 11 };
  };

  function renderChar(charId) {
    var fr = CHAR_SVG[charId];
    if (!fr) return '';
    var f = fr();
    var svg = '<svg viewBox="0 0 96 96" class="tamakocchi-char" shape-rendering="crispEdges">';
    svg += '<rect x="0" y="0" width="96" height="96" rx="10" fill="' + PAPER + '"/>';
    svg += '<g>' + px(f.a, f.offX, f.offY) +
      '<animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1" calcMode="discrete" dur="1.2s" repeatCount="indefinite"/></g>';
    svg += '<g opacity="0">' + px(f.b, f.offX, f.offY) +
      '<animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" calcMode="discrete" dur="1.2s" repeatCount="indefinite"/></g>';
    svg += '</svg>';
    return svg;
  }

  // --- Care action icons (16x16グリッド, CELL=2, viewBox 32x32, 単色, 静止) ---
  var ICON_SVG = {};

  ICON_SVG.feed = function() {
    // 茶碗: 上(縁)が最も広く、下(底)へ向かって窄まる台形
    return [
      D(6) + H(1) + D(1) + H(1) + D(7),
      D(7) + H(2) + D(7),
      D(16),
      D(1) + H(14) + D(1),
      D(2) + H(12) + D(2),
      D(2) + H(12) + D(2),
      D(3) + H(10) + D(3),
      D(3) + H(10) + D(3),
      D(4) + H(8) + D(4),
      D(6) + H(4) + D(6),
      D(6) + H(4) + D(6)
    ];
  };

  ICON_SVG.play = function() {
    // まる型ボール+中央に小さな星(ひし形)の抜き
    return [
      D(5) + H(6) + D(5),
      D(3) + H(10) + D(3),
      D(2) + H(12) + D(2),
      D(1) + H(14) + D(1),
      H(16),
      setAt(H(16), 7, '.'),
      setAt(H(16), 6, '...'),
      setAt(H(16), 7, '.'),
      H(16),
      D(1) + H(14) + D(1),
      D(2) + H(12) + D(2),
      D(3) + H(10) + D(3),
      D(5) + H(6) + D(5)
    ];
  };

  ICON_SVG.study = function() {
    // 開いた本: 平らな2枚の長方形ページ+中央に背表紙の隙間
    return [
      D(16),
      D(1) + H(6) + D(2) + H(6) + D(1),
      H(7) + D(2) + H(7),
      H(7) + D(2) + H(7),
      H(7) + D(2) + H(7),
      H(7) + D(2) + H(7),
      D(1) + H(6) + D(2) + H(6) + D(1)
    ];
  };

  ICON_SVG.status = function() {
    return [
      D(4) + H(3) + D(2) + H(3) + D(4),
      D(2) + H(12) + D(2),
      H(16),
      H(16),
      D(1) + H(14) + D(1),
      D(2) + H(12) + D(2),
      D(3) + H(10) + D(3),
      D(4) + H(8) + D(4),
      D(5) + H(6) + D(5),
      D(6) + H(4) + D(6),
      D(7) + H(2) + D(7)
    ];
  };

  function renderIcon(iconId) {
    var fn = ICON_SVG[iconId];
    if (!fn) return '';
    var rows = fn();
    return '<svg viewBox="0 0 32 32" class="care-icon-svg" shape-rendering="crispEdges">' + pxIcon(rows) + '</svg>';
  }

  window.TamakocchiChars = {
    renderChar: renderChar,
    renderIcon: renderIcon,
    CHAR_SVG: CHAR_SVG,
    ICON_SVG: ICON_SVG
  };
})();
