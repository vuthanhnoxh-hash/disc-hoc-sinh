# Hướng dẫn cài đặt — dành cho thầy cô

Thầy cô làm theo đúng thứ tự dưới đây. **Khoảng 15 phút, không cần biết lập trình.**
Chỉ cần một tài khoản Gmail.

Sau khi xong, thầy cô sẽ có:

- Một **đường link** gửi cho học sinh — các em mở bằng điện thoại, làm trong 5 phút.
- Một **bảng tổng hợp cả lớp** tự động điền, chỉ thầy cô xem được.

---

## Trước khi bắt đầu — ba điều nên biết

**1. Đây không phải bài chấm điểm học sinh.** DISC mô tả *cách hành xử*, không đo trí thông minh,
không đo năng lực học tập, và không nói trước được em nào sẽ thành công. Xin đừng dùng kết quả để
xếp loại, chia ban hay ghi vào học bạ.

**2. Không có nhóm nào tốt hơn nhóm nào.** Nếu học sinh hỏi "kiểu nào giỏi nhất", câu trả lời đúng
là: cả bốn đều cần, và một lớp chỉ toàn một kiểu thì lớp đó yếu.

**3. Kết quả sẽ thay đổi.** Cùng một em, làm lại sau nửa năm có thể ra khác. Đó là chuyện bình
thường, không phải lỗi bài test.

---

## Bước 1 — Tạo trang tính để chứa kết quả

1. Mở <https://sheets.new> (tự tạo một trang tính Google mới).
2. Đặt tên, ví dụ **"DISC lớp tôi"**.
3. Để yên đó, sang bước 2.

---

## Bước 2 — Dán đoạn mã nhận kết quả

1. Ngay trong trang tính vừa tạo, bấm menu **Tiện ích mở rộng → Apps Script**.
   *(bản tiếng Anh: Extensions → Apps Script)*
2. Một cửa sổ mới hiện ra, có sẵn vài dòng chữ. **Xoá sạch** những dòng đó.
3. Mở file `apps-script/Code.gs` trong bộ này, **chép toàn bộ** rồi **dán vào**.
4. Tìm dòng gần đầu:
   ```
   var MA_GIAO_VIEN = '1234';
   ```
   **Đổi `1234` thành mã của riêng thầy cô** (ví dụ `'cogiang2026'`). Nhớ giữ hai dấu nháy.
   Mã này để học sinh không xem được bảng tổng hợp.
5. Bấm biểu tượng **đĩa mềm** (Lưu).

### Kiểm tra ngay tại đây

6. Ở ô chọn hàm phía trên, chọn **`tuKiemTra`** rồi bấm **Run** (Chạy).
7. Lần đầu Google sẽ hỏi quyền: bấm **Review permissions** → chọn tài khoản của mình →
   màn hình hiện chữ *"Google hasn't verified this app"* → bấm **Advanced** → **Go to … (unsafe)**
   → **Allow**.
   > Chữ "unsafe" nghe đáng sợ nhưng chỉ có nghĩa là đoạn mã này do thầy cô tự dán vào,
   > Google chưa xét duyệt. Mã nằm trong trang tính của chính thầy cô, không ai khác đọc được.
8. Xem phần **Execution log** ở dưới. **Phải thấy hai dòng có `"ok":true`.**
   - Thấy rồi → quay lại trang tính, sẽ thấy một dòng *"HỌC SINH THỬ"*. **Xoá dòng đó đi.**
   - Không thấy → xem mục *Hỏng thì xem đâu* ở cuối tài liệu này.

---

## Bước 3 — Lấy đường link

1. Vẫn trong cửa sổ Apps Script, bấm nút **Deploy** (Triển khai) góc trên phải →
   **New deployment** (Bản triển khai mới).
2. Bấm biểu tượng **bánh răng** cạnh chữ "Select type" → chọn **Web app**.
3. Điền đúng hai ô này — **đây là chỗ hay sai nhất**:

   | Ô | Chọn |
   |---|---|
   | Execute as | **Me** (chính tôi) |
   | Who has access | **Anyone** (bất kỳ ai) |

   > Phải chọn **Anyone**. Nếu chọn "Anyone with Google account" thì học sinh nào không đăng nhập
   > Gmail sẽ nộp bài thất bại.

4. Bấm **Deploy** → **Authorize access** nếu được hỏi.
5. Chép **Web app URL** hiện ra. Nó có dạng:
   ```
   https://script.google.com/macros/s/AKfycb..................../exec
   ```
   **Phải kết thúc bằng `/exec`.** Nếu kết thúc bằng `/dev` là chép nhầm.

---

## Bước 4 — Điền link vào bộ bài test

Mở file **`cai-dat.js`**, sửa hai dòng:

```js
URL_LUU: "https://script.google.com/macros/s/AKfycb..../exec",
MA_GIAO_VIEN: "cogiang2026",
```

> `MA_GIAO_VIEN` ở đây **phải giống hệt** `MA_GIAO_VIEN` đã đặt trong Code.gs ở bước 2.
> Khác một chữ là không vào được bảng lớp.

Lưu file.

---

## Bước 5 — Đưa bài test lên mạng

### Cách dễ nhất: GitHub Pages (miễn phí, không cần cài gì)

1. Lập tài khoản tại <https://github.com> nếu chưa có.
2. Bấm **New repository**, đặt tên ví dụ `disc-lop-toi`, chọn **Public**, bấm **Create**.
3. Ở trang kho vừa tạo, bấm **uploading an existing file**.
4. **Kéo thả toàn bộ các file và thư mục** trong bộ này vào (gồm `index.html`, `bang-lop.html`,
   `cai-dat.js`, thư mục `assets`). Bấm **Commit changes**.
5. Vào tab **Settings → Pages**. Mục *Branch* chọn **main** và **/ (root)**, bấm **Save**.
6. Chờ khoảng 1–2 phút, tải lại trang. Link của thầy cô sẽ hiện ra, dạng:
   ```
   https://<tên-tài-khoản>.github.io/disc-lop-toi/
   ```

### Hai đường link cần nhớ

| Ai dùng | Link |
|---|---|
| **Học sinh** | `https://<tài-khoản>.github.io/disc-lop-toi/` |
| **Chỉ thầy cô** | `https://<tài-khoản>.github.io/disc-lop-toi/bang-lop.html` |

Gửi link thứ nhất cho học sinh. Link thứ hai giữ riêng — vào phải nhập mã.

---

## Dùng trên lớp — gợi ý 20 phút

| Phút | Việc |
|---|---|
| 0–2 | Gửi link. Dặn: *"khoanh những từ giống em THẬT, không phải giống người em muốn thành"* |
| 2–8 | Học sinh làm bài |
| 8–12 | Thầy cô mở `bang-lop.html`, chiếu **bức tranh chung** của lớp lên bảng |
| 12–18 | Cho các em cùng kiểu ngồi lại một nhóm, tự đọc to phần *điểm mù* của nhóm mình |
| 18–20 | Chốt: **không kiểu nào hơn kiểu nào**; lớp mạnh là lớp có đủ cả bốn |

> **Mẹo:** phần thú vị nhất không phải lúc các em biết mình kiểu gì, mà lúc các em nhận ra
> **bạn ngồi cạnh khác mình** — và hiểu vì sao bạn hay làm điều khiến mình khó chịu.

---

## Hỏng thì xem đâu

| Hiện tượng | Nguyên nhân thường gặp | Cách sửa |
|---|---|---|
| Học sinh thấy ô vàng *"Chưa nối với bảng lớp"* | `URL_LUU` còn để trống | Làm lại bước 4 |
| Ô đỏ *"CHƯA gửi được"* | Link sai, hoặc "Who has access" chưa để **Anyone** | Làm lại bước 3, nhớ chọn Anyone |
| Bảng lớp báo *"Mã giáo viên không đúng"* | Mã trong `cai-dat.js` khác mã trong `Code.gs` | Sửa cho hai chỗ giống hệt nhau |
| Bảng lớp trống trơn dù có em đã làm | Sửa Code.gs xong mà chưa triển khai lại | Deploy → **Manage deployments** → bút chì → Version **New version** → Deploy |
| Link kết thúc bằng `/dev` | Chép nhầm ô | Quay lại lấy đúng link `/exec` |
| Trang GitHub báo 404 | Pages chưa dựng xong | Chờ thêm 2 phút rồi tải lại |

> **Quan trọng:** mỗi lần sửa `Code.gs`, **phải Deploy lại theo kiểu "New version"**, nếu không
> Google vẫn chạy bản cũ. Đây là chỗ nhầm phổ biến nhất.

---

## Muốn sửa nội dung bài test

| Muốn đổi gì | Mở file nào |
|---|---|
| Thêm/bớt/sửa tính từ | `assets/du-lieu.js`, mục `TU_THEO_GOC` |
| Sửa lời luận giải, lời khuyên cho thầy cô | `assets/du-lieu.js`, mục `GOC` |
| Sửa tên kiểu đôi | `assets/du-lieu.js`, mục `CAP_DOI` |
| Đổi link, đổi mã, bỏ ô "Lớp" | `cai-dat.js` |

Sửa xong thì tải file lên GitHub đè lên file cũ. Không phải đụng tới Apps Script.

> ⚠️ Nếu **thêm hoặc bớt tính từ**, hãy nhớ bốn góc nên có số từ gần bằng nhau. Bản hiện tại
> D có 21 từ, I và S có 19, C có 18 — bài test đã tự bù chênh lệch này bằng cột **mức đậm**,
> nhưng chênh càng ít thì kết quả càng sạch.

---

## Dữ liệu của học sinh đi về đâu

- Kết quả nằm trong **trang tính Google của chính thầy cô**. Người làm ra bộ này không xem được.
- Bài test **không** thu số điện thoại, email, hay bất cứ thông tin nào ngoài **họ tên và lớp**.
- Mã giáo viên chỉ là **khoá che mắt học sinh**, không phải bảo mật thật. Xin đừng thu thập
  thông tin nhạy cảm qua bài này.
- Nếu trường có quy định về dữ liệu học sinh, nên hỏi ban giám hiệu trước khi dùng cả khối.

---

## Bài test này dựa trên đâu

- Mô hình DISC do **William Moulton Marston** nêu trong *Emotions of Normal People* (1928).
  Marston **không hề làm bài test nào** — ông chỉ dựng lý thuyết.
- Bài tự đánh giá đầu tiên do **Walter Clarke** làm những năm 1940–1956.
- Cách gọi bốn con vật (Đại bàng · Vẹt · Bồ câu · Cú) lấy theo **Merrick Rosenberg**,
  *Taking Flight!* (2012) — ông có hẳn bản dành riêng cho học sinh.
- Bộ 77 tính từ tiếng Việt lấy từ **bản giấy thầy cô đang dùng trên lớp**, giữ nguyên không đổi.
