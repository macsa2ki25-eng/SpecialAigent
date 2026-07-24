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

  // アイコン用: 単色 '#4a4a40' のみ、背景透過
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

  // ---- アニメ2コマ生成用ヘルパー ----
  // 右に dx ドットずらす(左パディングを足すだけ。透過なので幅が伸びても無害)
  function shiftX(rows, dx) {
    var pad = '';
    for (var i = 0; i < dx; i++) pad += '.';
    var out = [];
    for (var i = 0; i < rows.length; i++) out.push(pad + rows[i]);
    return out;
  }
  // 下に dy ドットずらす(上に空行を足す)
  function shiftDown(rows, dy) {
    var out = [];
    for (var i = 0; i < dy; i++) out.push('.');
    return out.concat(rows);
  }
  // 上に dy ドットずらす(先頭行を削り、末尾に空行を足す)
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

  var CHAR_SVG = {};

  // --- Stage 0: まこたま (Egg) ---
  // ジグザグ模様入りのたまご。コマ差=左右に1ドット揺れ。
  CHAR_SVG.egg = function() {
    var a = [
      '...####...',
      '..######..',
      '.########.',
      '######o###',
      '#####o####',
      '####o#####',
      '#####o####',
      '######o###',
      '#####o####',
      '####o#####',
      '.########.',
      '.########.',
      '..######..',
      '...####...'
    ];
    var b = shiftX(a, 1);
    return { a: a, b: b, offX: 7, offY: 6 };
  };

  // --- Stage 1: まこっち (Baby) ---
  // 小さな丸ブロブ。点目+小さな口。コマ差=ぴょこんと1ドット跳ねる。
  CHAR_SVG.makocchi = function() {
    var a = [
      '...####...',
      '.########.',
      '##########',
      '##oo##oo##',
      '####oo####',
      '##########',
      '.########.',
      '..######..',
      '...####...'
    ];
    var b = shiftUp(a, 1);
    return { a: a, b: b, offX: 7, offY: 12 };
  };

  // --- Stage 2 Good: まこりん (Child - Good Care) ---
  // 丸body+頭に丸い耳2つ。にこにこ口(∪)。コマ差=耳ぴこぴこ。
  CHAR_SVG.makorin = function() {
    var ear = '..###.......###.';
    var blank = '................';
    var body = [
      '.....######.....',
      '...##########...',
      '..############..',
      '.##############.',
      '####oo####oo####',
      '################',
      '################',
      '################',
      '################',
      '######oooo######',
      '.##############.',
      '..############..',
      '...##########...',
      '.....######.....'
    ];
    var a = [ear, ear].concat(body);
    var b = [blank, ear].concat(body);
    return { a: a, b: b, offX: 4, offY: 4 };
  };

  // --- Stage 2 Bad: まこぐー (Child - Bad Care) ---
  // 角ばったbody。への字口＋つり目。コマ差=プンプン揺れ。
  CHAR_SVG.makoguu = function() {
    var a = [
      '.#............#.',
      '##............##',
      '################',
      '################',
      '###o########o###',
      '################',
      '######oooo######',
      '################',
      '################',
      '################',
      '.##############.',
      '..############..',
      '...##########...',
      '.....######.....'
    ];
    var b = shiftX(a, 1);
    return { a: a, b: b, offX: 3, offY: 6 };
  };

  // --- Stage 3 Best: まこぴか (Teen - Best) ---
  // 頭頂に星型トゲ3本。キラキラ点2つ周囲に。コマ差=キラキラ点滅。
  CHAR_SVG.makopika = function() {
    var sparkOn = '#..............#';
    var sparkOff = '................';
    var body = [
      '.#......##......#',
      '..##..######..##.',
      '...##########....',
      '..############...',
      '.##############..',
      '####oo####oo#####',
      '##################',
      '##################',
      '######oooo#########',
      '##################',
      '.##############..',
      '..############...',
      '...##########....',
      '.....######......'
    ];
    var a = [sparkOn].concat(body);
    var b = [sparkOff].concat(body);
    return { a: a, b: b, offX: 3, offY: 5 };
  };

  // --- Stage 3 Mid: まこすけ (Teen - Average) ---
  // 丸メガネ＋本を持つ。コマ差=ページめくり。
  CHAR_SVG.makosuke = function() {
    var a = [
      '.....######.....',
      '...##########...',
      '..############..',
      '.##############.',
      '###o######o######',
      '#################',
      '#################.#####',
      '#################.#o#o#',
      '######oooo#######.#####',
      '.##############.',
      '..############..',
      '...##########...',
      '.....######.....'
    ];
    var b = a.slice();
    b[7] = '#################.#oo##';
    return { a: a, b: b, offX: 4, offY: 6 };
  };

  // --- Stage 3 Bad: まこだら (Teen - Bad) ---
  // 縦長でぐにゃっと傾いたブロブ。半目。コマ差=傾き反転。
  CHAR_SVG.makodara = function() {
    var a = [
      '....#####......',
      '...########....',
      '..##########....',
      '.#############...',
      '.##############..',
      '###############..',
      '#o#o###o#o#######',
      '################.',
      '################.',
      '#####oooo#######.',
      '################.',
      '.##############..',
      '..############...',
      '...##########....',
      '....########.....'
    ];
    var b = mirrorX(a);
    return { a: a, b: b, offX: 4, offY: 5 };
  };

  // --- Stage 4 S-Rank: まこマスター (Adult - Best) ---
  // 王冠(3山)+マント風の広がるbody。堂々ポーズ。コマ差=マントなびき。
  CHAR_SVG.makomaster = function() {
    var a = [
      '..#....#....#..',
      '.###..###..###.',
      '..#############.',
      '.###############',
      '################',
      '####oo####oo####',
      '#################',
      '#################',
      '######oooo########',
      '#################',
      '###################',
      '####################',
      '.##################.',
      '..#####......#####..'
    ];
    var b = a.slice();
    b[10] = '##################.';
    b[11] = '###################.';
    b[12] = '.################...';
    b[13] = '..####......####....';
    return { a: a, b: b, offX: 2, offY: 5 };
  };

  // --- Stage 4 A-Rank: まこスター (Adult - Great) ---
  // サングラス(横長帯)+星マーク横に。コマ差=腕を上げ下げ。
  CHAR_SVG.makostar = function() {
    var star = '#';
    var aRows = [
      '.....######.....',
      '...##########...',
      '..############..',
      '.##############.',
      '################',
      '################',
      '################',
      '######oooo######',
      '.##############.',
      '..###.####.###..',
      '...##.####.##...',
      '.....######.....'
    ];
    // 目の帯(サングラス)は body[4] に上書きし、腕は左右外側に付与
    var a = aRows.slice();
    a[4] = '################';
    a2insert(a);
    function a2insert(rows) {
      rows[3] = 'X##############X'.split('X').join('#'); // ensure width ok (no-op safeguard)
    }
    // サングラス帯(頭幅より少しはみ出す横長バー)
    a.splice(4, 1, '################');
    var withGlasses = a.slice();
    withGlasses[4] = '################';
    // 実際のサングラス行を作る(帯状、頭より外側に張り出す)
    var glassesRow = '..################..';
    var frameA = a.slice(0, 4).concat([glassesRow]).concat(a.slice(5));
    // 腕: 下げポーズ(体の横に小さい突起, 中段)
    var armsDown = frameA.slice();
    armsDown[8] = '#.##############.#';
    // 腕: 上げポーズ(突起が1段上)
    var armsUp = frameA.slice();
    armsUp[7] = '#' + armsUp[7] + '#';
    armsUp[8] = '.' + armsUp[8].split('').map(function(c){return c;}).join('') + '.';
    return { a: armsDown, b: armsUp, offX: 4, offY: 6 };
  };

  // --- Stage 4 B-Rank: まこフレンド (Adult - Good) ---
  // 丸body+両手を広げてハート1個掲げ。コマ差=ハート上下。
  CHAR_SVG.makofriend = function() {
    var heart = [
      '.##.##.',
      '#######',
      '#######',
      '.#####.',
      '..###..'
    ];
    var blank7 = '.......';
    var body = [
      '#.....######.....#',
      '##...########...##',
      '.##############.',
      '################',
      '####oo####oo####',
      '################',
      '######oooo######',
      '.##############.',
      '..############..',
      '...##########...',
      '.....######.....'
    ];
    var gapA = [blank7, blank7];
    var gapB = [blank7];
    var a = padHeart(heart, gapA).concat(body);
    var b = padHeart(heart, gapB.concat([blank7])).concat(body);
    function padHeart(h, gaps) {
      var out = [];
      for (var i = 0; i < gaps.length; i++) out.push(gaps[i]);
      return out.concat(h);
    }
    return { a: a, b: b, offX: 3, offY: 3 };
  };

  // --- Stage 4 C-Rank: まこスリーパー (Adult - Below Avg) ---
  // ナイトキャップ+閉じ目(－ －)+「Z」ドット。コマ差=Zの位置移動。
  CHAR_SVG.makosleeper = function() {
    var cap = [
      '.......###......',
      '......#####.....',
      '.....#######....'
    ];
    var body = [
      '.....######.....',
      '...##########...',
      '..############..',
      '.##############.',
      '#####----#----###',
      '################',
      '################',
      '######oooo######',
      '.##############.',
      '..############..',
      '...##########...',
      '.....######.....'
    ];
    // 目は閉じ線 'o' で表現(-は透過扱いなので'o'に置換)
    body[4] = body[4].split('-').join('o');
    var zA = '..............#.';
    var zB1 = '...............#';
    var zB2 = '..............#.';
    var a = cap.concat(body).concat([zA]);
    var b = cap.concat(body).concat([zB2 + '.#']);
    return { a: a, b: b, offX: 4, offY: 6 };
  };

  // --- Stage 4 D-Rank: まこゴースト (Adult - Neglected) ---
  // 裾が波形のおばけ。目は'o'の中抜き。コマ差=ふわふわ上下1ドット。
  CHAR_SVG.makoghost = function() {
    var a = [
      '.....######.....',
      '...##########...',
      '..############..',
      '.##############.',
      '################',
      '####oo####oo####',
      '################',
      '######oooo######',
      '################',
      '################',
      '################',
      '##.##.##.##.##.#'
    ];
    var b = shiftUp(a, 1);
    return { a: a, b: b, offX: 4, offY: 6 };
  };

  // --- Death: 墓石+浮かぶ魂 ---
  CHAR_SVG.dead = function() {
    var stoneTop = [
      '..####....',
      '.######...',
      '########..'
    ];
    var stoneBody = [
      '########..',
      '###oo###..',
      '###oo###..',
      '########..',
      '########..'
    ];
    var soulA = '.....##..';
    var soulB = '......##.';
    var a = [soulA].concat(stoneTop).concat(stoneBody);
    var b = [soulB].concat(stoneTop).concat(stoneBody);
    return { a: a, b: b, offX: 7, offY: 8 };
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
    return [
      '......#.#.......',
      '.......##.......',
      '................',
      '...##########...',
      '..############..',
      '..############..',
      '..############..',
      '...##########...',
      '....########....',
      '.....######.....',
      '......####......',
      '......####......'
    ];
  };

  ICON_SVG.play = function() {
    return [
      '.....######.....',
      '...##########...',
      '..############..',
      '.##############.',
      '.######.#######.',
      '.#####.#.######.',
      '.######.#######.',
      '.##############.',
      '..############..',
      '...##########...',
      '.....######.....'
    ];
  };

  ICON_SVG.study = function() {
    return [
      '................',
      '..##........##..',
      '.####......####.',
      '######....######',
      '######....######',
      '######....######',
      '######....######',
      '.####......####.',
      '..##........##..'
    ];
  };

  ICON_SVG.status = function() {
    return [
      '....##....##....',
      '..########.####..',
      '.################.',
      '.################.',
      '.################.',
      '..##############..',
      '...############...',
      '....##########....',
      '.....########.....',
      '......######......',
      '.......####.......',
      '........##........'
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
