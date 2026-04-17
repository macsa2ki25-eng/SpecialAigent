// ===== ランキング同期システム =====
(function() {
  'use strict';

  var API_URL = 'https://script.google.com/macros/s/AKfycbxmSna2slvzpw0D05au8Q6RNCkrP6xIhGyGTvb0FGh1mIIQXWC462v5W3UXDbnge6bI/exec';
  var USER_ID_KEY   = 'rankingUserId';
  var NICKNAME_KEY  = 'rankingNickname';
  var GRADE_KEY     = 'rankingGrade';    // 学年
  var CLASS_KEY     = 'rankingClass';    // クラス
  var NUMBER_KEY    = 'rankingNumber';   // 出席番号
  var REALNAME_KEY  = 'rankingRealName'; // 氏名
  var CACHE_KEY      = 'rankingCache';
  var CACHE_TIME_KEY = 'rankingCacheTime';
  var CACHE_TTL = 60000; // 1分キャッシュ

  function getUserId() {
    var id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
      id = 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
  }

  function getNickname()  { return localStorage.getItem(NICKNAME_KEY)  || ''; }
  function getGrade()     { return localStorage.getItem(GRADE_KEY)     || ''; }
  function getClass()     { return localStorage.getItem(CLASS_KEY)     || ''; }
  function getNumber()    { return localStorage.getItem(NUMBER_KEY)    || ''; }
  function getRealName()  { return localStorage.getItem(REALNAME_KEY)  || ''; }

  function setProfile(nickname, grade, cls, number, realName) {
    localStorage.setItem(NICKNAME_KEY,  nickname);
    localStorage.setItem(GRADE_KEY,     grade);
    localStorage.setItem(CLASS_KEY,     cls);
    localStorage.setItem(NUMBER_KEY,    number);
    localStorage.setItem(REALNAME_KEY,  realName);
  }

  function collectStats() {
    var loginHistory = [];
    try { loginHistory = JSON.parse(localStorage.getItem('makoLoginHistory') || '[]'); } catch(e) {}
    var totalQuestions = parseInt(localStorage.getItem('makoQuestionCount') || '0', 10);
    var streak         = parseInt(localStorage.getItem('makoLoginStreak')   || '0', 10);
    var chips          = parseInt(localStorage.getItem('makoChips')         || '0', 10);
    var lastLogin      = localStorage.getItem('makoLastLogin') || '';

    return {
      id:             getUserId(),
      nickname:       getNickname(),
      grade:          getGrade(),
      cls:            getClass(),
      number:         getNumber(),
      realName:       getRealName(),
      loginDays:      loginHistory.length,
      totalQuestions: totalQuestions,
      streak:         streak,
      chips:          chips,
      lastActive:     lastLogin
    };
  }

  function syncToServer(callback) {
    if (!isConfigured()) {
      if (callback) callback(false);
      return;
    }
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'sync', data: collectStats() })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) { if (callback) callback(data.ok || false); })
    .catch(function()   { if (callback) callback(false); });
  }

  function fetchRanking(callback) {
    var cached    = localStorage.getItem(CACHE_KEY);
    var cacheTime = parseInt(localStorage.getItem(CACHE_TIME_KEY) || '0', 10);
    if (cached && Date.now() - cacheTime < CACHE_TTL) {
      try { callback(JSON.parse(cached), null); return; } catch(e) {}
    }
    fetch(API_URL + '?action=ranking')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.ok && data.students) {
        localStorage.setItem(CACHE_KEY,      JSON.stringify(data.students));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        callback(data.students, null);
      } else {
        callback(null, data.error || 'データ取得に失敗しました');
      }
    })
    .catch(function(err) { callback(null, '通信エラー: ' + err.message); });
  }

  // 全必須項目が揃っていれば設定済みとみなす
  function isConfigured() {
    return !!(getNickname() && getRealName() && getGrade() && getClass() && getNumber());
  }

  window.RankingSync = {
    getUserId:    getUserId,
    getNickname:  getNickname,
    getGrade:     getGrade,
    getClass:     getClass,
    getNumber:    getNumber,
    getRealName:  getRealName,
    setProfile:   setProfile,
    collectStats: collectStats,
    syncToServer: syncToServer,
    fetchRanking: fetchRanking,
    isConfigured: isConfigured
  };
})();

