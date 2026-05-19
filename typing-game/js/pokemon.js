/**
 * pokemon.js
 * PokeAPI からの画像・技データ取得。失敗時は ローカル images/pokemon/<slug>.png にフォールバック。
 * 結果は sessionStorage にキャッシュする。
 */
(function (global) {
  const SS_SPRITE = 'pokemon-sprite-cache-v1';
  const SS_MOVE   = 'pokemon-move-cache-v1';

  function getCache(key) {
    try { return JSON.parse(sessionStorage.getItem(key) || '{}'); }
    catch (e) { return {}; }
  }
  function setCache(key, c) {
    try { sessionStorage.setItem(key, JSON.stringify(c)); } catch (e) {}
  }

  // === スプライト ===
  // front=true なら前向き、false なら後ろ姿
  async function getSpriteUrl(pokeId, slug, opts = {}) {
    const back = opts.back === true;
    const cache = getCache(SS_SPRITE);
    const cacheKey = `${pokeId}:${back ? 'b' : 'f'}`;
    if (cache[cacheKey]) return cache[cacheKey];

    const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
    const front = `${base}/other/official-artwork/${pokeId}.png`;
    const def   = `${base}/${pokeId}.png`;
    const backUrl = `${base}/back/${pokeId}.png`;
    const local = slug ? `images/pokemon/${slug}${back ? '-back' : ''}.png` : null;

    const tryUrls = back
      ? [backUrl, def, front, local].filter(Boolean)
      : [front, def, local].filter(Boolean);

    for (const url of tryUrls) {
      if (await canLoadImage(url)) {
        cache[cacheKey] = url;
        setCache(SS_SPRITE, cache);
        return url;
      }
    }
    return null;
  }

  function canLoadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => { img.src = ''; resolve(false); }, 4000);
      img.onload  = () => { clearTimeout(timer); resolve(true); };
      img.onerror = () => { clearTimeout(timer); resolve(false); };
      img.src = url;
    });
  }

  // === 技データ ===
  // 戻り値: { name(日本語), power, damage_class } / 失敗時 null
  async function getMove(moveSlug) {
    const cache = getCache(SS_MOVE);
    if (cache[moveSlug]) return cache[moveSlug];
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/move/${moveSlug}`);
      if (!res.ok) return null;
      const data = await res.json();
      const jaName = (data.names || []).find((n) => n.language && n.language.name === 'ja-Hrkt');
      const result = {
        name: jaName ? jaName.name : moveSlug,
        power: data.power || 0,
        damage_class: data.damage_class ? data.damage_class.name : 'physical',
      };
      cache[moveSlug] = result;
      setCache(SS_MOVE, cache);
      return result;
    } catch (e) {
      return null;
    }
  }

  global.Pokemon = { getSpriteUrl, getMove };
})(window);
