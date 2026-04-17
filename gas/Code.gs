// ===== 東高３年 英単語やったんぞ - ランキングAPI =====
//
// 【セットアップ手順】（スプレッドシートからスクリプトを作成する方法）
//
// 1. Google スプレッドシートを新規作成する
//    https://sheets.new にアクセスして新しいスプレッドシートを作る
//
// 2. メニューから「拡張機能」→「Apps Script」を開く
//
// 3. 表示されたエディタに、このコードをすべて貼り付けて保存する
//    （デフォルトの function myFunction() {} は消してからペースト）
//
// 4. 「デプロイ」→「新しいデプロイ」をクリック
//    - 種類：「ウェブアプリ」を選択
//    - 次のユーザーとして実行：「自分」
//    - アクセスできるユーザー：「全員」に設定
//
// 5. 「デプロイ」→ 表示されたURLをコピー
//
// 6. そのURLをアプリの js/sync.js の API_URL に設定する
//
// 【重要】
// この方法なら、スクリプトがスプレッドシートに紐づくため、
// 全生徒のデータが必ず1つのスプレッドシートに保存されます。
// 「スクリプトのみ」で作成すると毎回新しいシートが生成されるので注意！
//
// 【注意】初回デプロイ時にGoogleアカウントの権限承認が必要です。

var SHEET_NAME = 'rankings';

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id', 'nickname', 'grade', 'cls', 'number', 'realName',
                     'loginDays', 'totalQuestions', 'streak', 'chips', 'lastActive', 'updatedAt']);
    sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
  }
  return sheet;
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'ranking';
  var result;

  if (action === 'ranking') {
    result = getRanking();
  } else if (action === 'ping') {
    result = { ok: true, message: 'API is working' };
  } else {
    result = { error: 'Unknown action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var result;
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action || 'sync';

    if (action === 'sync') {
      result = syncStudent(body.data);
    } else {
      result = { error: 'Unknown action' };
    }
  } catch (err) {
    result = { error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function syncStudent(data) {
  if (!data || !data.id || !data.nickname) {
    return { error: 'id and nickname are required' };
  }

  var sheet = getSheet();
  var rows = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      rowIndex = i + 1;
      break;
    }
  }

  var now = new Date().toISOString();
  var rowData = [
    data.id,
    data.nickname,
    data.grade    || '',
    data.cls      || '',
    data.number   || '',
    data.realName || '',
    parseInt(data.loginDays)      || 0,
    parseInt(data.totalQuestions) || 0,
    parseInt(data.streak)         || 0,
    parseInt(data.chips)          || 0,
    data.lastActive || now.slice(0, 10),
    now
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, 12).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { ok: true };
}

function getRanking() {
  var sheet = getSheet();
  var rows = sheet.getDataRange().getValues();
  var students = [];

  for (var i = 1; i < rows.length; i++) {
    students.push({
      nickname:       rows[i][1],
      loginDays:      parseInt(rows[i][6]) || 0,
      totalQuestions: parseInt(rows[i][7]) || 0,
      streak:         parseInt(rows[i][8]) || 0,
      chips:          parseInt(rows[i][9]) || 0,
      lastActive:     rows[i][10] || ''
    });
  }

  students.sort(function(a, b) {
    return b.totalQuestions - a.totalQuestions;
  });

  return { ok: true, students: students };
}
