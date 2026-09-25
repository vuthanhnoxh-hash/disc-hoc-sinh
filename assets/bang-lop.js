/* ============================================================
   BẢNG TỔNG HỢP CẢ LỚP — dành cho giáo viên
   ============================================================ */

let DU_LIEU = [];      // toàn bộ bản ghi lấy về
let LOC_LOP = "";      // lớp đang xem, "" = tất cả
let COT_XEP = "thoigian", XUOI = false;

function jsonp(url, thamso, xong, hanGiay){
  const tenHam = "bl_cb_" + Math.random().toString(36).slice(2);
  const the = document.createElement("script");
  let daXong = false;
  const dongHo = setTimeout(() => ketThuc(new Error("Quá hạn chờ — mạng chậm hoặc link sai")),
                            (hanGiay || 25) * 1000);
  function don(){ clearTimeout(dongHo); try{ delete window[tenHam]; }catch(e){ window[tenHam]=undefined; }
                  if (the.parentNode) the.parentNode.removeChild(the); }
  function ketThuc(loi, kq){ if (daXong) return; daXong = true; don(); xong(loi, kq); }
  window[tenHam] = kq => ketThuc(null, kq);
  the.onerror = () => ketThuc(new Error("Không nối được tới bảng lớp"));
  the.src = url + (url.indexOf("?") >= 0 ? "&" : "?") +
            new URLSearchParams(Object.assign({}, thamso, { callback: tenHam })).toString();
  document.head.appendChild(the);
}

function bao(loai, html){
  const o = document.getElementById("trang-thai");
  o.className = "bang-tin " + loai;
  o.innerHTML = html;
}

/* ---------- Lấy dữ liệu ---------- */
function layDuLieu(){
  if (!CAI_DAT.URL_LUU) {
    bao("loi", `<b>Chưa nối với nơi lưu dữ liệu.</b> Thầy cô cần điền <code>URL_LUU</code> trong
      file <code>cai-dat.js</code>. Xem bước 3 trong <b>HUONG-DAN-GIAO-VIEN</b>.`);
    return;
  }
  bao("", "Đang tải dữ liệu lớp…");
  document.getElementById("trang-thai").style.cssText = "background:var(--nhan);color:var(--chu-nhat)";

  jsonp(CAI_DAT.URL_LUU, { viec: "doc", ma: document.getElementById("o-ma").value.trim() },
    (loi, tra) => {
      if (loi)          { bao("loi", `<b>Không lấy được dữ liệu.</b> ${loi.message}`); return; }
      if (!tra || !tra.ok) { bao("loi", `<b>Không lấy được dữ liệu.</b> ${(tra && tra.loi) || "Máy chủ trả lời không hợp lệ"}`); return; }
      DU_LIEU = tra.dong || [];
      if (!DU_LIEU.length) { bao("canh", "<b>Chưa có em nào làm bài.</b> Gửi link bài test cho học sinh rồi quay lại đây."); }
      else { bao("ok", `<b>✓ Đã tải ${DU_LIEU.length} bài làm.</b> Cập nhật lúc ${new Date().toLocaleTimeString("vi-VN")}.`); }
      document.getElementById("khoa-vao").classList.add("an");
      document.getElementById("phan-bang").classList.remove("an");
      dungBoLocLop();
      veTatCa();
    });
}

/* ---------- Bộ lọc lớp ---------- */
function dungBoLocLop(){
  const cac = [...new Set(DU_LIEU.map(d => d.lop).filter(Boolean))].sort();
  const sel = document.getElementById("o-loc-lop");
  sel.innerHTML = `<option value="">Tất cả các lớp (${DU_LIEU.length} em)</option>` +
    cac.map(l => `<option value="${l}">Lớp ${l} (${DU_LIEU.filter(d=>d.lop===l).length} em)</option>`).join("");
  sel.value = LOC_LOP;
}

function dongDangXem(){
  return LOC_LOP ? DU_LIEU.filter(d => d.lop === LOC_LOP) : DU_LIEU.slice();
}

/* ---------- Vẽ ---------- */
function veTatCa(){ veThongKe(); veBang(); }

function veThongKe(){
  const ds = dongDangXem();
  const n = ds.length;
  const dem = { D:0, I:0, S:0, C:0 };
  ds.forEach(d => {
    // kiểu đôi "D-I" tính nửa điểm cho mỗi góc, để tổng luôn bằng sĩ số
    const cac = String(d.kieu || "").split("-").filter(x => dem.hasOwnProperty(x));
    cac.forEach(x => dem[x] += 1 / cac.length);
  });

  document.getElementById("thong-ke").innerHTML = !n ? "" : `
    <div class="the">
      <h2 style="margin-top:0">Bức tranh chung${LOC_LOP ? " — lớp " + LOC_LOP : ""}</h2>
      <p class="phu">${n} em đã làm bài.</p>
      <div class="thanh">
        ${["D","I","S","C"].map(ma => {
          const pt = n ? Math.round(dem[ma] / n * 100) : 0;
          return `<div class="dong">
            <div class="ma">${GOC[ma].icon} ${GOC[ma].convat}</div>
            <div class="ray"><div class="day2" style="width:${pt}%;background:${GOC[ma].mau}"></div></div>
            <div class="so">${dem[ma].toFixed(1)} em · ${pt}%</div>
          </div>`;
        }).join("")}
      </div>
      ${goiYChoLop(dem, n)}
    </div>`;
}

function goiYChoLop(dem, n){
  if (!n) return "";
  const y = [];
  const pt = ma => dem[ma] / n * 100;

  if (pt("S") >= 30) y.push(`<b>Lớp có nhiều Bồ câu (S — ${Math.round(pt("S"))}%).</b> Đây là nhóm
    dễ bị bỏ quên nhất: các em không quậy, không giơ tay, nên ít khi được gọi tên. Thầy cô chủ động
    hỏi riêng từng em, và báo trước mọi thay đổi.`);
  if (pt("D") >= 30) y.push(`<b>Lớp nhiều Đại bàng (D — ${Math.round(pt("D"))}%).</b> Sẽ hay va nhau
    khi chia nhóm vì nhiều em cùng muốn cầm lái. Nên phân vai rõ ngay từ đầu, và cho mỗi em một phần
    việc có đích riêng.`);
  if (pt("I") >= 30) y.push(`<b>Lớp nhiều Vẹt (I — ${Math.round(pt("I"))}%).</b> Không khí tốt nhưng
    dễ ồn và dễ bỏ dở. Cần người chốt phần chi tiết — ghép mỗi nhóm ít nhất một em Cú (C).`);
  if (pt("C") >= 30) y.push(`<b>Lớp nhiều Cú (C — ${Math.round(pt("C"))}%).</b> Ra đề phải rõ tiêu chí
    chấm, và hãy trả lời câu "tại sao" của các em — đó là cách các em học, không phải cãi.`);
  if (pt("C") <= 10) y.push(`<b>Rất ít Cú (C — ${Math.round(pt("C"))}%).</b> Lớp sẽ mạnh về khí thế
    nhưng yếu khâu soát lỗi. Thầy cô nên giữ vai kiểm tra chi tiết giúp các em.`);
  if (pt("S") <= 10) y.push(`<b>Rất ít Bồ câu (S — ${Math.round(pt("S"))}%).</b> Lớp sôi động nhưng
    thiếu người giữ hoà khí; mâu thuẫn nhóm dễ bùng thành to chuyện.`);

  return y.length ? `<div class="khoi-gv"><h3>📌 Gợi ý cho thầy cô</h3>${y.map(t=>`<p>${t}</p>`).join("")}</div>` : "";
}

function veBang(){
  const ds = dongDangXem();
  const huong = XUOI ? 1 : -1;
  ds.sort((a,b) => {
    const A = a[COT_XEP], B = b[COT_XEP];
    if (typeof A === "number" && typeof B === "number") return (A - B) * huong;
    return String(A||"").localeCompare(String(B||""), "vi") * huong;
  });

  const cot = [["ten","Họ tên"],["lop","Lớp"],["D","D"],["I","I"],["S","S"],["C","C"],
               ["tong","Tổng"],["kieu","Kiểu"],["tenkieu","Tên kiểu"],["thoigian","Lúc làm"]];

  document.getElementById("bang").innerHTML = !ds.length ? "" : `
    <div class="the">
      <h2 style="margin-top:0">Bảng tổng hợp${LOC_LOP ? " — lớp " + LOC_LOP : ""}</h2>
      <p class="phu">Bấm tiêu đề cột để sắp xếp. Con số D/I/S/C là số từ em đó khoanh thuộc góc ấy.</p>
      <div class="bang-cuon"><table>
        <thead><tr><th class="so">#</th>${cot.map(([k,t]) =>
          `<th class="${["D","I","S","C","tong"].includes(k)?"so":""}" style="cursor:pointer"
               data-cot="${k}">${t}${COT_XEP===k ? (XUOI?" ▲":" ▼") : ""}</th>`).join("")}</tr></thead>
        <tbody>${ds.map((d,i) => {
          const chinh = String(d.kieu||"").split("-")[0];
          const g = GOC[chinh];
          return `<tr>
            <td class="so phu">${i+1}</td>
            <td><b>${d.ten||""}</b></td>
            <td>${d.lop||""}</td>
            <td class="so">${d.D}</td><td class="so">${d.I}</td>
            <td class="so">${d.S}</td><td class="so">${d.C}</td>
            <td class="so">${d.tong}</td>
            <td><b style="color:${g?g.mau:"inherit"}">${g?g.icon:""} ${d.kieu||""}</b></td>
            <td>${d.tenkieu||""}</td>
            <td class="phu">${d.thoigian||""}</td>
          </tr>`;
        }).join("")}</tbody>
      </table></div>
      <div class="hang-nut">
        <button class="nut phu2" id="nut-csv">⬇ Tải bảng này ra Excel (CSV)</button>
        <button class="nut phu2" id="nut-tai-lai">↻ Tải lại dữ liệu</button>
      </div>
    </div>`;

  document.querySelectorAll("th[data-cot]").forEach(th => th.addEventListener("click", () => {
    const k = th.dataset.cot;
    if (COT_XEP === k) XUOI = !XUOI; else { COT_XEP = k; XUOI = true; }
    veBang();
  }));
  document.getElementById("nut-csv").onclick = taiCSV;
  document.getElementById("nut-tai-lai").onclick = layDuLieu;
}

function taiCSV(){
  const ds = dongDangXem();
  const dau = ["Họ tên","Lớp","D","I","S","C","Tổng","Kiểu","Tên kiểu","Lúc làm"];
  const dong = ds.map(d => [d.ten,d.lop,d.D,d.I,d.S,d.C,d.tong,d.kieu,d.tenkieu,d.thoigian]);
  const csv = "﻿" + [dau, ...dong]
    .map(h => h.map(o => `"${String(o==null?"":o).replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type:"text/csv;charset=utf-8" }));
  a.download = `DISC-tong-hop-${LOC_LOP||"tat-ca"}-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}

/* ---------- Nối dây ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nut-vao").addEventListener("click", () => {
    if (document.getElementById("o-ma").value.trim() !== String(CAI_DAT.MA_GIAO_VIEN)) {
      bao("loi", "Mã không đúng."); return;
    }
    layDuLieu();
  });
  document.getElementById("o-ma").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("nut-vao").click();
  });
  document.getElementById("o-loc-lop").addEventListener("change", e => {
    LOC_LOP = e.target.value; veTatCa();
  });
});
