/**
 * pokemon.js
 * PokeAPI からのスプライト取得。失敗時は images/pokemon/<slug>.png を試す。
 * 取得結果は sessionStorage にURLキャッシュする。
 */
(function (global) {
  const SS_KEY = 'pokemon-sprite-cache-v1';

  function getCache() {
    try { return JSON.parse(sessionStorage.getItem(SS_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function setCache(c) {
    try { sessionStorage.setItem(SS_KEY, JSON.stringify(c)); } catch (e) {}
  }

  // pokeId と slug を受け取り、画像URLを返す（非同期）。
  async function getSpriteUrl(pokeId, slug) {
    const cache = getCache();
    const cacheKey = `id:${pokeId}`;
    if (cache[cacheKey]) return cache[cacheKey];

    // 1. PokeAPI 公式スプライト（直接URL）
    const officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
    const defaultSprite   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
    const localFallback   = slug ? `images/pokemon/${slug}.png` : null;

    // 画像ロード可否確認
    const tryUrls = [officialArtwork, defaultSprite, localFallback].filter(Boolean);
    for (const url of tryUrls) {
      if (await canLoadImage(url)) {
        cache[cacheKey] = url;
        setCache(cache);
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

  global.Pokemon = { getSpriteUrl };
})(window);
