/**
 * ============================================================
 * NƠI NHẬN VÀ CẤT KẾT QUẢ DISC CỦA HỌC SINH
 * Dán toàn bộ file này vào Google Apps Script (xem HUONG-DAN-GIAO-VIEN, bước 2).
 * ============================================================
 */

// Mã này PHẢI trùng với MA_GIAO_VIEN trong file cai-dat.js
var MA_GIAO_VIEN = '1234';

var TEN_TRANG = 'KetQua';
var TIEU_DE = ['Thời gian', 'Họ tên', 'Lớp', 'D', 'I', 'S', 'C', 'Tổng',
               'Kiểu', 'Tên kiểu', 'Mã từ đã chọn'];

function doGet(e) {
  var p = (e && e.parameter) || {};
  var tra;
  try {
    if (p.viec === 'luu')      tra = luu(p);
    else if (p.viec === 'doc') tra = doc(p);
    else                       tra = { ok: false, loi: 'Không rõ việc cần làm' };
  } catch (err) {
    tra = { ok: false, loi: String(err && err.message ? err.message : err) };
  }
  return traLoi(tra, p.callback);
}

// Cho phép gửi bằng POST luôn, phòng khi sau này cần
function doPost(e) { return doGet(e); }

function traLoi(duLieu, tenHam) {
  var json = JSON.stringify(duLieu);
  if (tenHam) {
    return ContentService
      .createTextOutput(tenHam + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function layTrang() {
  var bang = SpreadsheetApp.getActiveSpreadsheet();
  var trang = bang.getSheetByName(TEN_TRANG);
  if (!trang) {
    trang = bang.insertSheet(TEN_TRANG);
    trang.appendRow(TIEU_DE);
    trang.getRange(1, 1, 1, TIEU_DE.length).setFontWeight('bold');
    trang.setFrozenRows(1);
  }
  if (trang.getLastRow() === 0) {
    trang.appendRow(TIEU_DE);
    trang.getRange(1, 1, 1, TIEU_DE.length).setFontWeight('bold');
    trang.setFrozenRows(1);
  }
  return trang;
}

function soNguyen(x) {
  var n = parseInt(x, 10);
  return isNaN(n) ? 0 : n;
}

function luu(p) {
  var ten = String(p.ten || '').trim();
  if (!ten) return { ok: false, loi: 'Thiếu họ tên' };

  var d = soNguyen(p.D), i = soNguyen(p.I), s = soNguyen(p.S), c = soNguyen(p.C);
  if (d + i + s + c === 0) return { ok: false, loi: 'Chưa chọn từ nào' };

  // Khoá lại để hai em bấm cùng lúc không ghi đè nhau
  var khoa = LockService.getScriptLock();
  khoa.waitLock(20000);
  try {
    var trang = layTrang();
    trang.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm'),
      ten,
      String(p.lop || '').trim(),
      d, i, s, c,
      soNguyen(p.tong),
      String(p.kieu || ''),
      String(p.tenkieu || ''),
      String(p.matu || '')
    ]);
    return { ok: true, dong: trang.getLastRow() - 1 };
  } finally {
    khoa.releaseLock();
  }
}

function doc(p) {
  if (String(p.ma || '') !== String(MA_GIAO_VIEN)) {
    return { ok: false, loi: 'Mã giáo viên không đúng' };
  }
  var trang = layTrang();
  var soDong = trang.getLastRow() - 1;
  if (soDong <= 0) return { ok: true, dong: [] };

  var o = trang.getRange(2, 1, soDong, TIEU_DE.length).getValues();
  var ds = o.map(function (h) {
    return {
      thoigian: h[0] instanceof Date
        ? Utilities.formatDate(h[0], 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm')
        : String(h[0]),
      ten: h[1], lop: h[2],
      D: soNguyen(h[3]), I: soNguyen(h[4]), S: soNguyen(h[5]), C: soNguyen(h[6]),
      tong: soNguyen(h[7]),
      kieu: h[8], tenkieu: h[9]
    };
  }).filter(function (h) { return h.ten; });

  return { ok: true, dong: ds };
}

/**
 * Bấm Run hàm này MỘT LẦN sau khi dán code, để tự kiểm tra.
 * Xem kết quả ở menu Execution log.
 */
function tuKiemTra() {
  var kq = luu({ ten: 'HỌC SINH THỬ — xoá dòng này đi',
                 lop: 'THỬ', D: 10, I: 10, S: 7, C: 5, tong: 32,
                 kieu: 'D-I', tenkieu: 'Người Dẫn Đầu Có Sức Hút', matu: '1,2,3' });
  Logger.log('Ghi thử: ' + JSON.stringify(kq));
  Logger.log('Đọc thử: ' + JSON.stringify(doc({ ma: MA_GIAO_VIEN })));
  Logger.log('>>> Nếu cả hai dòng trên đều có "ok":true thì đã chạy được.');
  Logger.log('>>> Nhớ vào trang tính xoá dòng HỌC SINH THỬ.');
}
