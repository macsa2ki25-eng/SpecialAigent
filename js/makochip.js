// ===== マコチップ システム =====
// アプリ内コイン「マコチップ」の管理
(function() {
  'use strict';

  var CHIP_KEY = 'makoChips';
  var LOGIN_KEY = 'makoLoginHistory';
  var STREAK_KEY = 'makoLoginStreak';
  var LAST_LOGIN_KEY = 'makoLastLogin';
  var QUESTIONS_KEY = 'makoQuestionCount';
  var MASTERED_RANGES_KEY = 'makoMasteredRanges';
  var CHIP_LOG_KEY = 'makoChipLog';

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  // --- チップ残高 ---
  function getBalance() {
    return parseInt(localStorage.getItem(CHIP_KEY) || '0', 10);
  }

  function setBalance(n) {
    localStorage.setItem(CHIP_KEY, Math.max(0, n).toString());
  }

  function addChips(amount, reason) {
    var bal = getBalance();
    setBalance(bal + amount);
    logEarning(amount, reason);
    return bal + amount;
  }

  function spendChips(amount, reason) {
    var bal = getBalance();
    if (bal < amount) return false;
    setBalance(bal - amount);
    logSpending(amount, reason);
    return true;
  }

  // --- ログ ---
  function getLog() {
    try { return JSON.parse(localStorage.getItem(CHIP_LOG_KEY) || '[]'); } catch(e) { return []; }
  }

  function logEarning(amount, reason) {
    var log = getLog();
    log.push({ type: 'earn', amount: amount, reason: reason, date: new Date().toISOString() });
    if (log.length > 200) log = log.slice(-200);
    localStorage.setItem(CHIP_LOG_KEY, JSON.stringify(log));
  }

  function logSpending(amount, reason) {
    var log = getLog();
    log.push({ type: 'spend', amount: amount, reason: reason, date: new Date().toISOString() });
    if (log.length > 200) log = log.slice(-200);
    localStorage.setItem(CHIP_LOG_KEY, JSON.stringify(log));
  }

  // --- ログインボーナス ---
  function getStreak() {
    return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
  }

  function checkLoginBonus() {
    var today = todayStr();
    var lastLogin = localStorage.getItem(LAST_LOGIN_KEY);

    if (lastLogin === today) {
      // Already claimed today
      return null;
    }

    var streak = getStreak();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (lastLogin === yesterdayStr) {
      // Consecutive login
      streak++;
    } else {
      // Streak broken (or first login)
      streak = 1;
    }

    localStorage.setItem(STREAK_KEY, streak.toString());
    localStorage.setItem(LAST_LOGIN_KEY, today);

    // Save login history
    var history = getLoginHistory();
    if (history.indexOf(today) === -1) {
      history.push(today);
      if (history.length > 365) history = history.slice(-365);
      localStorage.setItem(LOGIN_KEY, JSON.stringify(history));
    }

    // Calculate bonus: base 5 + streak bonus
    var bonus = calcLoginBonus(streak);
    addChips(bonus, 'ログインボーナス（' + streak + '日連続）');

    return { chips: bonus, streak: streak };
  }

  function calcLoginBonus(streak) {
    // Base: 5 chips
    // Streak bonus: +1 per day, capped at +15 (so max 20 per day)
    // Milestone bonus: 7 days = +10, 14 days = +20, 30 days = +50
    var base = 5;
    var streakBonus = Math.min(streak - 1, 15);
    var milestone = 0;
    if (streak === 7) milestone = 10;
    else if (streak === 14) milestone = 20;
    else if (streak === 30) milestone = 50;
    else if (streak === 60) milestone = 100;
    else if (streak === 100) milestone = 200;
    return base + streakBonus + milestone;
  }

  function getLoginHistory() {
    try { return JSON.parse(localStorage.getItem(LOGIN_KEY) || '[]'); } catch(e) { return []; }
  }

  // --- 学習報酬：20問ごと ---
  function getSessionQuestionCount() {
    return parseInt(localStorage.getItem(QUESTIONS_KEY) || '0', 10);
  }

  function recordQuestion() {
    var count = getSessionQuestionCount() + 1;
    localStorage.setItem(QUESTIONS_KEY, count.toString());
    // Every 20 questions = 10 chips
    if (count % 20 === 0) {
      var newBal = addChips(10, '20問クリア報酬（累計' + count + '問）');
      return { chips: 10, totalQuestions: count, newBalance: newBal };
    }
    return null;
  }

  // --- 範囲完全制覇報酬 ---
  function getMasteredRanges() {
    try { return JSON.parse(localStorage.getItem(MASTERED_RANGES_KEY) || '[]'); } catch(e) { return []; }
  }

  function checkRangeMastery(rangeId, rangeName, rangeStart, rangeEnd) {
    var mastered = getMasteredRanges();
    if (mastered.indexOf(rangeId) !== -1) return null; // Already rewarded

    var cardData;
    try { cardData = JSON.parse(localStorage.getItem('cardData') || '{}'); } catch(e) { return null; }
    var fsrs = window.FSRS;
    var now = new Date();
    var total = rangeEnd - rangeStart + 1;
    var masteredCount = 0;

    for (var i = rangeStart; i <= rangeEnd; i++) {
      var card = cardData[i];
      if (card && card.state !== 'new') {
        var r = fsrs.getRecallProbability(card, now);
        if (r >= 0.95) masteredCount++;
      }
    }

    if (masteredCount >= total) {
      // All words mastered!
      mastered.push(rangeId);
      localStorage.setItem(MASTERED_RANGES_KEY, JSON.stringify(mastered));
      var reward = Math.min(200, Math.max(30, total)); // reward scales with range size, 30-200 chips
      addChips(reward, '範囲制覇ボーナス「' + rangeName + '」');
      return { chips: reward, rangeName: rangeName };
    }
    return null;
  }

  // --- 正答率ボーナス（セッション完了時） ---
  function checkAccuracyBonus(correct, wrong) {
    var total = correct + wrong;
    if (total < 5) return null; // Too few to reward

    var accuracy = correct / total;
    var bonus = 0;
    var reason = '';
    if (accuracy === 1.0 && total >= 10) {
      bonus = 30;
      reason = 'パーフェクトボーナス（' + total + '問全問正解！）';
    } else if (accuracy >= 0.9) {
      bonus = 15;
      reason = '高正答率ボーナス（正答率' + Math.round(accuracy * 100) + '%）';
    } else if (accuracy >= 0.8) {
      bonus = 5;
      reason = '正答率ボーナス（正答率' + Math.round(accuracy * 100) + '%）';
    }

    if (bonus > 0) {
      addChips(bonus, reason);
      return { chips: bonus, reason: reason };
    }
    return null;
  }

  // --- Public API ---
  window.MakoChip = {
    getBalance: getBalance,
    addChips: addChips,
    spendChips: spendChips,
    checkLoginBonus: checkLoginBonus,
    getStreak: getStreak,
    getLoginHistory: getLoginHistory,
    recordQuestion: recordQuestion,
    checkRangeMastery: checkRangeMastery,
    checkAccuracyBonus: checkAccuracyBonus,
    getLog: getLog,
    getSessionQuestionCount: getSessionQuestionCount
  };
})();
