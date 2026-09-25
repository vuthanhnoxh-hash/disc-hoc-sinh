/* ============================================================
   BÀI TEST DISC 77 TÍNH TỪ — phần chạy
   ============================================================ */

/* ---------- 1. Dựng danh sách từ theo thứ tự tờ đề bài ---------- */
/* Hiện đúng thứ tự bản giấy (THU_TU_DE), tra góc từ bảng đối chiếu (TU_THEO_GOC).
   Tách hai thứ này ra để sửa từ ngữ ở một chỗ mà không lo lệch chỗ kia. */

const MOI_TU = [];
(function dungDanhSach(){
  const tra = {};   // từ -> góc
  for (const goc of ["D","I","S","C"]) TU_THEO_GOC[goc].forEach(tu => tra[tu] = goc);

  // Tự kiểm tra: bắt lỗi ngay thay vì âm thầm chấm sai
  const lac  = THU_TU_DE.filter(tu => !tra[tu]);
  const sot  = Object.keys(tra).filter(tu => THU_TU_DE.indexOf(tu) < 0);
  const trung = THU_TU_DE.filter((tu, i) => THU_TU_DE.indexOf(tu) !== i);
  if (lac.length || sot.length || trung.length) {
    console.error("[DISC] Dữ liệu lệch — bài test sẽ chấm SAI:",
      { "từ không có trong bảng đối chiếu": lac,
        "từ trong bảng đối chiếu nhưng thiếu trên đề": sot,
        "từ bị lặp": trung });
  }

  THU_TU_DE.forEach(tu => MOI_TU.push({ tu, goc: tra[tu] || "?" }));
})();

const TONG_TU_GOC = { D: TU_THEO_GOC.D.length, I: TU_THEO_GOC.I.length,
                      S: TU_THEO_GOC.S.length, C: TU_THEO_GOC.C.length };

const daChon = new Set();

/* ---------- 2. Vẽ lưới từ ---------- */
function veLuoiTu(){
  const luoi = document.getElementById("luoi-tu");
  luoi.innerHTML = "";
  MOI_TU.forEach((muc, chiso) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tu";
    b.textContent = muc.tu;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      if (daChon.has(chiso)) { daChon.delete(chiso); b.setAttribute("aria-pressed","false"); }
      else                   { daChon.add(chiso);    b.setAttribute("aria-pressed","true");  }
      capNhatDem();
    });
    luoi.appendChild(b);
  });
}

function capNhatDem(){
  document.getElementById("so-da-chon").textContent = daChon.size;
  document.getElementById("nut-xong").disabled = daChon.size === 0;
}

/* ---------- 3. Chấm điểm ---------- */
function chamDiem(){
  const diem = { D:0, I:0, S:0, C:0 };
  const tuDaChon = { D:[], I:[], S:[], C:[] };
  daChon.forEach(chiso => {
    const m = MOI_TU[chiso];
    diem[m.goc]++;
    tuDaChon[m.goc].push(m.tu);
  });

  const tong = diem.D + diem.I + diem.S + diem.C;

  // "mức đậm" = số từ khoanh / tổng từ có trong góc đó.
  // Cần có vì bốn góc không bằng nhau về số từ (D:21 I:19 S:19 C:18).
  const dam = {};
  for (const g of ["D","I","S","C"]) dam[g] = diem[g] / TONG_TU_GOC[g];

  // xếp hạng theo mức đậm, hoà thì theo điểm thô
  const xep = ["D","I","S","C"].sort((a,b) => (dam[b] - dam[a]) || (diem[b] - diem[a]));
  const nhat = xep[0], nhi = xep[1];

  let kieu, tenKieu, capKey = null;
  const dangKe = dam[nhat] > 0;

  if (!dangKe) {
    kieu = "?"; tenKieu = "Chưa đủ dữ liệu";
  } else if (dam[nhat] - dam[nhi] <= NGUONG_KIEU_PHU * dam[nhat] || dam[nhat] === dam[nhi]) {
    capKey = [nhat, nhi].sort((a,b) => "DISC".indexOf(a) - "DISC".indexOf(b)).join("+");
    kieu = capKey.replace("+","-");
    tenKieu = (CAP_DOI[capKey] && CAP_DOI[capKey].ten) || kieu;
  } else {
    kieu = nhat; tenKieu = GOC[nhat].convat;
  }

  return { diem, dam, tong, xep, nhat, nhi, kieu, tenKieu, capKey, tuDaChon,
           dangTin: tong >= TOI_THIEU_TU };
}

/* ---------- 4. Vẽ kết quả ---------- */
function veKetQua(kq, ten, lop){
  const g = GOC[kq.nhat];
  const hopCap = kq.capKey ? CAP_DOI[kq.capKey] : null;

  const dongThanh = kq.xep.map(ma => {
    const gg = GOC[ma];
    const pt = Math.round(kq.dam[ma] * 100);
    return `<div class="dong">
        <div class="ma">${gg.icon} ${gg.ten}</div>
        <div class="ray"><div class="day2" style="width:${pt}%;background:${gg.mau}"></div></div>
        <div class="so">${kq.diem[ma]}/${TONG_TU_GOC[ma]} · ${pt}%</div>
      </div>`;
  }).join("");

  let canhBao = "";
  if (!kq.dangTin) {
    canhBao = `<div class="bang-tin canh"><b>Kết quả này chưa đáng tin.</b>
      Em mới khoanh ${kq.tong} từ, cần ít nhất ${TOI_THIEU_TU} từ. Hãy làm lại và khoanh
      hết những từ thấy giống mình.</div>`;
  }

  document.getElementById("kq-noidung").innerHTML = `
    ${canhBao}
    <div class="the">
      <div class="huy-hieu">
        <div class="bieu">${hopCap ? GOC[kq.nhat].icon + GOC[kq.nhi].icon : g.icon}</div>
        <div>
          <p class="phu" style="margin:0">${ten}${lop ? " · lớp " + lop : ""}</p>
          <p class="ten">${hopCap ? hopCap.ten : g.convat}</p>
          <p class="phu" style="margin:0">Kiểu ${kq.kieu} — ${hopCap ? "hai góc mạnh ngang nhau" : g.ten}</p>
        </div>
      </div>
      <div class="thanh" style="margin-top:18px">${dongThanh}</div>
      <p class="phu" style="margin:0">Đã khoanh <b>${kq.tong}</b>/77 từ.
      Cột phải là <b>mức đậm</b> — số từ em khoanh chia cho tổng số từ của góc đó.
      Dùng mức đậm thay vì đếm thô vì bốn góc không có cùng số từ.</p>
    </div>

    ${hopCap ? `<div class="the"><h2>Kiểu đôi của em: ${hopCap.ten}</h2><p>${hopCap.mota}</p></div>` : ""}

    <div class="the">
      <h2>${g.icon} Góc mạnh nhất: ${g.ten} — ${g.convat}</h2>
      <p><b>${g.motcau}</b></p>
      <p>${g.nhandien}</p>
      <h3>Điểm mạnh của em</h3><ul>${g.manh.map(x=>`<li>${x}</li>`).join("")}</ul>
      <h3>Điểm mù — chỗ em hay không tự thấy</h3><ul>${g.mu.map(x=>`<li>${x}</li>`).join("")}</ul>
      <h3>Cách học hợp với em</h3><p>${g.cachhoc}</p>
      <h3>Làm nhóm</h3><p>${g.hopvoi}<br>${g.vacham}</p>
      <h3>Một việc nên rèn</h3><p>${g.canren}</p>
    </div>

    <div class="the">
      <div class="khoi-gv">
        <h3>📌 Dành cho thầy cô — cách đi cùng em này</h3>
        <p>${g.choGV}</p>
        ${hopCap ? `<p><b>Vì là kiểu đôi ${hopCap.ten}:</b> ${hopCap.choGV}</p>` : ""}
      </div>
    </div>

    <div class="the">
      <h2>Những từ em đã khoanh</h2>
      <div class="bang-cuon"><table>
        <thead><tr><th>Góc</th><th class="so">Số từ</th><th>Cụ thể</th></tr></thead>
        <tbody>${["D","I","S","C"].map(ma=>`<tr>
          <td><b style="color:${GOC[ma].mau}">${GOC[ma].icon} ${ma}</b></td>
          <td class="so">${kq.diem[ma]}</td>
          <td>${kq.tuDaChon[ma].join(" · ") || "<span class='phu'>—</span>"}</td>
        </tr>`).join("")}</tbody>
      </table></div>
    </div>

    <div class="the">
      <h3>Nhớ giúp ba điều</h3>
      <ul>
        <li><b>Không có kiểu nào tốt hơn kiểu nào.</b> Bốn góc là bốn cách xoay xở, đều cần thiết.</li>
        <li><b>Đây không phải bài chấm điểm em.</b> Nó không đo thông minh, không đo giỏi dốt,
            và không nói trước được em sẽ thành công hay không.</li>
        <li><b>Kết quả đổi theo thời gian và hoàn cảnh.</b> Làm lại sau nửa năm có thể ra khác — bình thường.</li>
      </ul>
    </div>`;
}

/* ---------- 5. Gửi về bảng lớp (JSONP — có xác nhận thật) ---------- */
function guiJSONP(url, thamso, xong, hanGiay){
  const tenHam = "disc_cb_" + Math.random().toString(36).slice(2);
  const the = document.createElement("script");
  let daXong = false;
  const dongHo = setTimeout(() => ketThuc(new Error("Quá hạn chờ — mạng chậm hoặc link sai")),
                            (hanGiay || 20) * 1000);
  function don(){ clearTimeout(dongHo); try{ delete window[tenHam]; }catch(e){ window[tenHam]=undefined; }
                  if (the.parentNode) the.parentNode.removeChild(the); }
  function ketThuc(loi, kq){ if (daXong) return; daXong = true; don(); xong(loi, kq); }
  window[tenHam] = kq => ketThuc(null, kq);
  the.onerror = () => ketThuc(new Error("Không nối được tới bảng lớp"));
  const q = new URLSearchParams(Object.assign({}, thamso, { callback: tenHam })).toString();
  the.src = url + (url.indexOf("?") >= 0 ? "&" : "?") + q;
  document.head.appendChild(the);
}

function luuVeBangLop(kq, ten, lop){
  const o = document.getElementById("trang-thai-luu");

  if (!CAI_DAT.URL_LUU) {
    o.className = "bang-tin canh";
    o.innerHTML = `<b>Chưa nối với bảng lớp.</b> Kết quả của em <u>chưa được gửi đi</u>.
      Hãy bấm <b>Tải kết quả về máy</b> ở dưới rồi nộp cho thầy cô.
      <br><span class="phu">(Thầy cô: điền <code>URL_LUU</code> trong file <code>cai-dat.js</code> để bật phần lưu tự động.)</span>`;
    return;
  }

  o.className = "bang-tin";
  o.style.cssText = "background:var(--nhan);color:var(--chu-nhat)";
  o.textContent = "Đang gửi kết quả về bảng lớp…";

  const maTu = [];
  daChon.forEach(i => maTu.push(i));

  guiJSONP(CAI_DAT.URL_LUU, {
    viec: "luu", ten: ten, lop: lop,
    D: kq.diem.D, I: kq.diem.I, S: kq.diem.S, C: kq.diem.C,
    tong: kq.tong, kieu: kq.kieu, tenkieu: kq.tenKieu,
    matu: maTu.join(",")
  }, (loi, tra) => {
    if (loi || !tra || !tra.ok) {
      o.className = "bang-tin loi";
      o.innerHTML = `<b>CHƯA gửi được về bảng lớp.</b>
        ${loi ? loi.message : (tra && tra.loi) || "Máy chủ trả lời không hợp lệ"}.
        <br>Em hãy bấm <b>Tải kết quả về máy</b> ở dưới rồi nộp cho thầy cô.`;
    } else {
      o.className = "bang-tin ok";
      o.innerHTML = `<b>✓ Đã lưu vào bảng lớp</b> — dòng số ${tra.dong}. Em đã nộp bài xong.`;
    }
  });
}

/* ---------- 6. Tải kết quả về máy ---------- */
function taiVeMay(kq, ten, lop){
  const dong = [
    ["Họ tên", ten], ["Lớp", lop || ""],
    ["Thời điểm", new Date().toLocaleString("vi-VN")],
    ["D", kq.diem.D], ["I", kq.diem.I], ["S", kq.diem.S], ["C", kq.diem.C],
    ["Tổng từ khoanh", kq.tong], ["Kiểu", kq.kieu], ["Tên kiểu", kq.tenKieu],
    ["Từ đã khoanh", ["D","I","S","C"].map(g => g + ": " + kq.tuDaChon[g].join(" / ")).join(" | ")]
  ];
  const csv = "﻿" + dong.map(h => h.map(o => `"${String(o).replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `DISC-${(lop||"").replace(/[^\p{L}\p{N}]/gu,"")}-${ten.replace(/[^\p{L}\p{N}]/gu,"")}.csv`;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}

/* ---------- 7. Nối dây ---------- */
document.addEventListener("DOMContentLoaded", () => {
  veLuoiTu();
  capNhatDem();
  document.getElementById("tong-so-tu").textContent = MOI_TU.length;
  if (CAI_DAT.TEN_TRUONG) document.getElementById("ten-truong").textContent = CAI_DAT.TEN_TRUONG;
  if (!CAI_DAT.BAT_BUOC_LOP) document.getElementById("o-lop").classList.add("an");

  document.getElementById("nut-xong").addEventListener("click", () => {
    const ten = document.getElementById("o-ten").value.trim();
    const lop = document.getElementById("o-lop-nhap").value.trim();
    const bao = document.getElementById("bao-loi-nhap");

    if (!ten) { bao.className = "bang-tin loi"; bao.textContent = "Em chưa điền họ tên.";
                document.getElementById("o-ten").focus(); return; }
    if (CAI_DAT.BAT_BUOC_LOP && !lop) { bao.className = "bang-tin loi"; bao.textContent = "Em chưa điền lớp.";
                document.getElementById("o-lop-nhap").focus(); return; }
    bao.className = "an";

    const kq = chamDiem();
    veKetQua(kq, ten, lop);
    document.getElementById("phan-lam-bai").classList.add("an");
    document.getElementById("thanh-day").classList.add("an");
    document.getElementById("phan-ket-qua").classList.remove("an");
    window.scrollTo(0, 0);

    luuVeBangLop(kq, ten, lop);
    document.getElementById("nut-tai").onclick = () => taiVeMay(kq, ten, lop);
    document.getElementById("nut-in").onclick  = () => window.print();
    document.getElementById("nut-lam-lai").onclick = () => location.reload();
  });
});
