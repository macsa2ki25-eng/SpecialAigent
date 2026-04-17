// ===== ランキング同期システム =====
(function() {
  'use strict';

  var API_URL_KEY = 'rankingApiUrl';
  var USER_ID_KEY = 'rankingUserId';
  var NICKNAME_KEY = 'rankingNickname';
  var CACHE_KEY = 'rankingCache';
  var CACHE_TIME_KEY = 'rankingCacheTime';
  var CACHE_TTL = 60000; // 1分キャッシュ

  function getApiUrl() {
    return localStorage.getItem(API_URL_KEY) || '';
  }
  function setApiUrl(url) {
    localStorage.setItem(API_URL_KEY, url);
  }

  function getUserId() {
    var id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
      id = 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
  }

  function getNickname() {
    return localStorage.getItem(NICKNAME_KEY) || '';
  }
  function setNickname(name) {
    localStorage.setItem(NICKNAME_KEY, name);
  }

  function collectStats() {
    var loginHistory = [];
    try { loginHistory = JSON.parse(localStorage.getItem('makoLoginHistory') || '[]'); } catch(e) {}
    var totalQuestions = parseInt(localStorage.getItem('makoQuestionCount') || '0', 10);
    var streak = parseInt(localStorage.getItem('makoLoginStreak') || '0', 10);
    var chips = parseInt(localStorage.getItem('makoChips') || '0', 10);
    var lastLogin = localStorage.getItem('makoLastLogin') || '';

    return {
      id: getUserId(),
      nickname: getNickname(),
      loginDays: loginHistory.length,
      totalQuestions: totalQuestions,
      streak: streak,
      chips: chips,
      lastActive: lastLogin
    };
  }

  function syncToServer(callback) {
    var url = getApiUrl();
    if (!url || !getNickname()) {
      if (callback) callback(false);
      return;
    }

    var stats = collectStats();

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'sync', data: stats })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (callback) callback(data.ok || false);
    })
    .catch(function() {
      if (callback) callback(false);
    });
  }

  function fetchRanking(callback) {
    var url = getApiUrl();
    if (!url) {
      callback(null, 'API URLが設定されていません');
      return;
    }

    var cached = localStorage.getItem(CACHE_KEY);
    var cacheTime = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0', 10);
    if (cached && Date.now() - cacheTime < CACHE_TTL) {
      try {
        callback(JSON.parse(cached), null);
        return;
      } catch(e) {}
    }

    fetch(url + '?action=ranking')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.ok && data.students) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.students));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        callback(data.students, null);
      } else {
        callback(null, data.error || 'データ取得に失敗しました');
      }
    })
    .catch(function(err) {
      callback(null, '通信エラー: ' + err.message);
    });
  }

  function isConfigured() {
    return !!(getApiUrl() && getNickname());
  }

  window.RankingSync = {
    getApiUrl: getApiUrl,
    setApiUrl: setApiUrl,
    getUserId: getUserId,
    getNickname: getNickname,
    setNickname: setNickname,
    collectStats: collectStats,
    syncToServer: syncToServer,
    fetchRanking: fetchRanking,
    isConfigured: isConfigured
  };
})();
