# Bài test DISC cho học sinh

Bộ công cụ hoàn chỉnh để thầy cô cho cả lớp làm bài test nhóm tính cách **DISC** trong 5 phút,
mỗi em nhận ngay bản phân tích riêng, và thầy cô có **bảng tổng hợp cả lớp** tự động.

Số hoá từ bản giấy 77 tính từ đang dùng trên lớp — **giữ nguyên bộ từ, giữ nguyên cách chấm**.

> **Thầy cô bắt đầu từ đây → [HUONG-DAN-GIAO-VIEN.md](HUONG-DAN-GIAO-VIEN.md)** (15 phút, không cần biết lập trình)

---

## Có gì trong này

| Trang | Ai dùng | Làm gì |
|---|---|---|
| `index.html` | Học sinh | Bấm chọn những tính từ giống mình → ra kết quả ngay |
| `bang-lop.html` | Thầy cô | Bảng tổng hợp cả lớp, có mã bảo vệ |

### Học sinh nhận được gì

- Điểm bốn góc **D / I / S / C** kèm **mức đậm** (%)
- Tên kiểu theo con vật: 🦅 Đại bàng · 🦜 Vẹt · 🕊️ Bồ câu · 🦉 Cú
- **Kiểu đôi** khi hai góc mạnh ngang nhau (ví dụ *D-I — Người Dẫn Đầu Có Sức Hút*)
- Điểm mạnh · **điểm mù** · cách học hợp · làm nhóm với ai thì thuận
- Tải kết quả về máy hoặc in ra PDF

### Thầy cô nhận được gì

- Bảng tổng hợp: tên, lớp, D/I/S/C, tổng, kiểu — bấm tiêu đề cột để sắp xếp
- Lọc theo từng lớp
- **Bức tranh chung** của lớp: tỉ lệ bốn kiểu
- **Gợi ý đi kèm**, ví dụ *"lớp có 34% Bồ câu — đây là nhóm dễ bị bỏ quên nhất"*
- Tải ra Excel (CSV)

---

## Hai chỗ bản điện tử làm tốt hơn bản giấy

**1. Chữa được lệch do bốn góc không đều.**
Bản giấy có D 21 từ, I và S 19 từ, C 18 từ. Ai khoanh ngẫu nhiên vẫn ra D cao hơn C khoảng 17%.
Bản này hiển thị thêm **mức đậm** = số từ khoanh ÷ tổng từ của góc đó.

> Bài mẫu trên ảnh: D=10, I=10 — trên giấy là hoà. Theo mức đậm thì **I mạnh hơn** (10/19 = 53%
> so với 10/21 = 48%), vì góc I ít từ hơn.

**2. Học sinh không nhìn thấy bảng đối chiếu.**
Trên giấy, em nào liếc được tờ bảng đối chiếu là khoanh theo kiểu mình muốn ra. Ở đây 77 từ được
xáo trộn cố định, không lộ từ nào thuộc góc nào.

Cộng thêm: không phải đếm tay 4 góc × sĩ số lớp.

---

## Cần gì để chạy

Không cần máy chủ, không cần cài phần mềm, không tốn tiền. Chỉ cần:

- Một tài khoản **Google** (để chứa kết quả trong trang tính của chính thầy cô)
- Một tài khoản **GitHub** (để đặt trang lên mạng, miễn phí)

Nếu chưa cài phần lưu, bài test **vẫn chạy bình thường** — chỉ khác là học sinh phải tự tải file
kết quả nộp cho thầy cô, và trang sẽ **báo rõ bằng ô màu vàng** chứ không im lặng nuốt bài.

---

## Sửa nội dung ở đâu

| Muốn đổi | File |
|---|---|
| Tính từ, lời luận giải, tên kiểu | `assets/du-lieu.js` |
| Link lưu, mã giáo viên, tên trường | `cai-dat.js` |
| Màu sắc, cỡ chữ | `assets/style.css` |

---

## Giới hạn — xin đọc trước khi dùng

DISC mô tả **hành vi quan sát được**, không đo trí thông minh, không đo năng lực học tập, và
**không dự báo được thành công**. Một nghiên cứu năm 2013 trên bộ Persolog kết luận loại bài đo
này đạt yêu cầu về *độ tin cậy* nhưng **không đạt về *độ hiệu lực***. Hiệp hội Tâm lý Anh (BPS)
không ủng hộ dùng bài đo dạng ép-chọn để tuyển chọn người.

**Dùng đúng:** mở lời, hiểu nhau, chia nhóm cho hợp, giúp học sinh tự nhận ra điểm mù.
**Dùng sai:** xếp loại, phân ban, ghi học bạ, hay nói với một em rằng em "không hợp" làm gì đó.

---

## Nguồn gốc

- **William Moulton Marston** — *Emotions of Normal People* (1928), người nêu mô hình.
  Ông **không** làm bài test nào; nói "bài test DISC của Marston" là sai.
- **Walter Clarke** — dựng bộ đo đầu tiên (Activity Vector Analysis, thập niên 1940).
  Ông tìm ra bốn yếu tố **từ dữ liệu thực** rồi mới nhận ra chúng khớp mô hình Marston.
- **John Geier** — đưa DiSC ra thị trường (Performax, thập niên 1970), làm rõ 15 khuôn mẫu.
- **Merrick Rosenberg** — *Taking Flight!* (2012), đổi bốn chữ cái thành bốn con chim;
  có bản riêng cho học sinh.
- **Robert A. Rohm** — *Positive Personality Profiles*; từng là giáo viên đứng lớp và quản lý trường.
