/**
 * keyboard.js
 * キーボード描画と指の色分け・ハイライト制御。
 * 指コード: LP=左小指 LR=左薬指 LM=左中指 LI=左人差し指
 *           TH=親指
 *           RI=右人差し指 RM=右中指 RR=右薬指 RP=右小指
 */
(function (global) {
  const KEY_LAYOUT = [
    // [文字, 指コード, 追加クラス]
    [ // row-1 (数字段)
      ['1','LP'], ['2','LR'], ['3','LM'], ['4','LI'], ['5','LI'],
      ['6','RI'], ['7','RI'], ['8','RM'], ['9','RR'], ['0','RP'],
      ['-','RP'],
    ],
    [ // row-2 (上段)
      ['q','LP'], ['w','LR'], ['e','LM'], ['r','LI'], ['t','LI'],
      ['y','RI'], ['u','RI'], ['i','RM'], ['o','RR'], ['p','RP'],
    ],
    [ // row-3 (ホーム段)
      ['a','LP','home'], ['s','LR','home'], ['d','LM','home'], ['f','LI','home'], ['g','LI'],
      ['h','RI'], ['j','RI','home'], ['k','RM','home'], ['l','RR','home'], [';','RP','home'],
    ],
    [ // row-4 (下段)
      ['z','LP'], ['x','LR'], ['c','LM'], ['v','LI'], ['b','LI'],
      ['n','RI'], ['m','RI'], [',','RM'], ['.','RR'], ['/','RP'],
    ],
    [ // row-5 (スペース)
      [' ','TH','space'],
    ],
  ];

  // 各文字→指コードのマッピングを構築
  const KEY_TO_FINGER = {};
  KEY_LAYOUT.forEach((row) => {
    row.forEach(([key, finger]) => {
      KEY_TO_FINGER[key] = finger;
    });
  });

  function render(containerEl) {
    containerEl.innerHTML = '';
    KEY_LAYOUT.forEach((row, idx) => {
      const rowEl = document.createElement('div');
      rowEl.className = `kb-row row-${idx}`;
      row.forEach(([key, finger, extra]) => {
        const k = document.createElement('div');
        k.className = `kb-key finger-${finger}`;
        if (extra) k.classList.add(extra);
        k.dataset.key = key;
        k.textContent = key === ' ' ? 'スペース' : key.toUpperCase();
        rowEl.appendChild(k);
      });
      containerEl.appendChild(rowEl);
    });
  }

  function highlightNext(containerEl, key) {
    containerEl.querySelectorAll('.kb-key.next').forEach((el) => el.classList.remove('next'));
    if (!key) return;
    const target = containerEl.querySelector(`.kb-key[data-key="${cssEscape(key)}"]`);
    if (target) target.classList.add('next');
  }

  function flashPressed(containerEl, key, ok) {
    const target = containerEl.querySelector(`.kb-key[data-key="${cssEscape(key)}"]`);
    if (!target) return;
    target.classList.add('pressed');
    if (!ok) {
      target.style.background = '#ff8888';
      setTimeout(() => { target.style.background = ''; }, 150);
    }
    setTimeout(() => target.classList.remove('pressed'), 100);
  }

  function fingerOf(key) {
    return KEY_TO_FINGER[key.toLowerCase()] || null;
  }

  function cssEscape(s) {
    // CSS attribute selector用に最低限のエスケープ
    return s.replace(/["\\]/g, '\\$&');
  }

  // 手のSVG描画（指の色分けを表示）
  function renderHands(leftEl, rightEl) {
    leftEl.innerHTML = handSVG('left');
    rightEl.innerHTML = handSVG('right');
  }

  function handSVG(side) {
    // 簡易ハンドイラスト: 5本の指を縦長楕円で表現
    const isLeft = side === 'left';
    const colors = isLeft
      ? ['#ffcccc', '#ffd9b3', '#fff2b3', '#ccffcc', '#e0e0e0'] // LP, LR, LM, LI, 親指
      : ['#e0e0e0', '#cce5ff', '#d9ccff', '#ffccf2', '#f5b7b1']; // 親指, RI, RM, RR, RP
    // 5本の指 x座標
    const xs = [20, 40, 60, 80, 100];
    // 指の長さ（親指は短く外側）
    const heights = isLeft ? [70, 80, 85, 75, 50] : [50, 75, 85, 80, 70];
    let svg = '<svg viewBox="0 0 130 180" xmlns="http://www.w3.org/2000/svg">';
    // 手のひら
    svg += '<ellipse cx="65" cy="140" rx="55" ry="35" fill="#fff0e0" stroke="#2a2a3a" stroke-width="2"/>';
    // 指
    for (let i = 0; i < 5; i++) {
      const x = xs[i];
      const h = heights[i];
      const cy = 130 - h / 2;
      svg += `<rect x="${x-9}" y="${cy - h/2}" width="18" height="${h}" rx="9" fill="${colors[i]}" stroke="#2a2a3a" stroke-width="2"/>`;
    }
    svg += '</svg>';
    return svg;
  }

  global.Keyboard = { render, highlightNext, flashPressed, fingerOf, renderHands };
})(window);
