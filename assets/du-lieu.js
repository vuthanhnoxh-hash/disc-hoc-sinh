/* ============================================================
   DỮ LIỆU BÀI TEST DISC — 77 TÍNH TỪ
   Chép từ bản giấy "BẢNG ĐỐI CHIẾU D.I.S.C" do giáo viên cung cấp.
   Sửa từ ngữ ở đây là cả bài test đổi theo. Không phải sửa chỗ nào khác.
   ============================================================ */

const TU_THEO_GOC = {
  D: ["MẠNH MẼ","CỨNG CỎI","THẲNG THẮN","TỰ TIN","KIÊN QUYẾT","GANH ĐUA","MẠO HIỂM","NÓNG VỘI",
      "ĐỘC LẬP","HƯỚNG ĐẾN MỤC TIÊU","VỊ KỶ","HUNG HĂNG","QUYỀN LỰC","DANH VỌNG","KẾT QUẢ",
      "QUYẾT ĐOÁN","ÁP ĐẶT","CHỦ ĐỘNG","Ý CHÍ","CHẮC CHẮN","TẬP TRUNG"],

  I: ["LẠC QUAN","NHIỆT TÌNH","CẦU TIẾN","VÔ LO","THUYẾT PHỤC","SÁNG TẠO","HOẠT NGÔN",
      "CÓ TÀI ỨNG BIẾN","HƯỚNG NGOẠI","NỔI BẬT","SÔI NỔI","HOÀ ĐỒNG","THÍCH THAY ĐỔI",
      "THÍCH KHEN NGỢI","TRUYỀN CẢM HỨNG","VUI VẺ","NĂNG LƯỢNG CAO","CỞI MỞ","THÍCH NGHI"],

  S: ["NGHỊ LỰC","TRUNG THÀNH","KIÊN NHẪN","THÔNG CẢM","GIỎI LẮNG NGHE","KIỀM CHẾ","NHẤT QUÁN",
      "KHOAN DUNG","NÉ TRÁNH XUNG ĐỘT","GHÉT THAY ĐỔI","ĐÁNG TIN","THIẾU QUYẾT ĐOÁN","PHỤC TÙNG",
      "CHU ĐÁO","NHẸ NHÀNG","BÌNH TĨNH","TRÁCH NHIỆM","KHIÊM TỐN","BIẾT QUAN TÂM"],

  C: ["PHÂN TÍCH","LOGIC","CHÍNH XÁC","CHI TIẾT","CẦU TOÀN","KÍN ĐÁO","TỰ TRỌNG","CỨNG NHẮC",
      "TÒ MÒ","CẨN THẬN","HAY GÂY RẮC RỐI","CÓ KẾ HOẠCH","BẢO THỦ","THỰC TẾ","THIẾU HÀI HƯỚC",
      "TỈ MỈ","THẬN TRỌNG","CÓ TÍNH HỆ THỐNG"]
};

/* ------------------------------------------------------------
   THỨ TỰ HIỆN TRÊN MÀN HÌNH — chép đúng tờ đề bài giấy, 9 hàng.
   Giữ nguyên thứ tự này để thầy cô nào quen bản giấy nhận ra ngay.

   ⚠️ Tờ đề bài giấy chỉ in 75 từ, THIẾU hai từ có trong bảng đối chiếu:
      KIÊN QUYẾT (góc D) và KIÊN NHẪN (góc S) — đánh dấu ★ dưới đây.
      Gần như chắc chắn là lỗi dàn trang (cả hai đều bắt đầu bằng "KIÊN").
      Người dùng đã chốt ngày 2026-09-25: KHÔI PHỤC cả hai, dùng đủ 77 từ.
   ------------------------------------------------------------ */

const THU_TU_DE = [
  // hàng 1
  "KẾT QUẢ","BIẾT QUAN TÂM","GIỎI LẮNG NGHE","MẠNH MẼ","HOẠT NGÔN","KHOAN DUNG","NHẤT QUÁN","TRÁCH NHIỆM",
  // hàng 2  (★ KIÊN QUYẾT được khôi phục vào đây)
  "TÒ MÒ","CHỦ ĐỘNG","THÔNG CẢM","GHÉT THAY ĐỔI","NÉ TRÁNH XUNG ĐỘT","TỰ TIN","KIÊN QUYẾT","NỔI BẬT",
  // hàng 3
  "SÔI NỔI","HOÀ ĐỒNG","THÍCH THAY ĐỔI","THÍCH KHEN NGỢI","TRUYỀN CẢM HỨNG","VUI VẺ","NĂNG LƯỢNG CAO",
  // hàng 4  (★ KIÊN NHẪN được khôi phục vào đây, cạnh TRUNG THÀNH cùng góc S)
  "CẦU TIẾN","LẠC QUAN","THÍCH NGHI","TRUNG THÀNH","KIÊN NHẪN","MẠO HIỂM","NHIỆT TÌNH","ÁP ĐẶT","CẨN THẬN","KÍN ĐÁO",
  // hàng 5
  "PHỤC TÙNG","HAY GÂY RẮC RỐI","CHU ĐÁO","ĐÁNG TIN","VỊ KỶ","VÔ LO","NHẸ NHÀNG","THẬN TRỌNG","GANH ĐUA",
  // hàng 6
  "NGHỊ LỰC","TỈ MỈ","ĐỘC LẬP","QUYẾT ĐOÁN","THỰC TẾ","DANH VỌNG","Ý CHÍ","TẬP TRUNG","BẢO THỦ","THIẾU HÀI HƯỚC",
  // hàng 7
  "SÁNG TẠO","KIỀM CHẾ","CHẮC CHẮN","CÓ TÀI ỨNG BIẾN","CÓ TÍNH HỆ THỐNG","TỰ TRỌNG","THIẾU QUYẾT ĐOÁN","CẦU TOÀN",
  // hàng 8
  "THUYẾT PHỤC","CỨNG CỎI","QUYỀN LỰC","HƯỚNG ĐẾN MỤC TIÊU","THẲNG THẮN","CHÍNH XÁC","CHI TIẾT","NÓNG VỘI","LOGIC",
  // hàng 9
  "BÌNH TĨNH","CỨNG NHẮC","HƯỚNG NGOẠI","CỞI MỞ","HUNG HĂNG","PHÂN TÍCH","CÓ KẾ HOẠCH","KHIÊM TỐN"
];

/* Bốn góc KHÔNG bằng nhau về số từ (D:21 · I:19 · S:19 · C:18).
   Ai khoanh ngẫu nhiên vẫn ra D cao hơn C khoảng 17%.
   Vì vậy ngoài điểm thô, bài luôn hiện thêm "mức đậm" = số từ khoanh / tổng từ của góc đó. */

const GOC = {
  D: {
    ten: "D — THỐNG TRỊ",
    convat: "Đại bàng",
    icon: "🦅",
    mau: "#d6455d",
    motcau: "Muốn thắng, muốn nhanh, muốn có kết quả.",
    nhandien: "Em này nói ngắn, đi thẳng vào việc, rất ghét vòng vo. Giao bài khó thì mắt sáng lên.",
    manh: ["Dám nhận việc khó, không sợ sai",
           "Quyết nhanh khi cả nhóm còn đang cãi",
           "Kéo được nhóm về đích khi sắp hết giờ",
           "Không bỏ cuộc giữa chừng"],
    mu: ["Nói thẳng quá thành làm bạn tổn thương mà không biết",
         "Sốt ruột, cướp việc của bạn rồi tự làm cho xong",
         "Ngại nghe hết câu của người khác",
         "Thắng thì vui, nhưng quên mất ai đã đi cùng"],
    cachhoc: "Học bằng thử thách và mục tiêu. Cho em một cái đích và một hạn chót, em tự chạy. Bắt ngồi nghe giảng dài thì mất em.",
    hopvoi: "Hợp nhất với S (Bồ câu) — một bên đẩy, một bên giữ hoà khí.",
    vacham: "Dễ va với D khác (hai con cùng muốn cầm lái) và với C (một bên muốn nhanh, một bên muốn chắc).",
    choGV: "Đừng ra lệnh — hãy GIAO ĐÍCH rồi để em tự chọn đường. Muốn em nghe, nói gọn trong 3 câu. Khi em nói trống không, đừng vội quy là hỗn: đó là cách nói tự nhiên của kiểu này. Giao em làm nhóm trưởng khi việc gấp.",
    canren: "Rèn nghe hết câu người khác trước khi trả lời."
  },
  I: {
    ten: "I — ẢNH HƯỞNG",
    convat: "Vẹt",
    icon: "🦜",
    mau: "#e0862a",
    motcau: "Muốn vui, muốn được công nhận, muốn ở giữa mọi người.",
    nhandien: "Em này nói nhiều, quen nhiều bạn. Lớp có em thì không khí khác hẳn.",
    manh: ["Làm cả nhóm phấn chấn, phá được không khí nặng nề",
           "Kể chuyện, thuyết trình, đứng trước đám đông rất tự nhiên",
           "Nghĩ ra ý mới rất nhanh",
           "Kết nối được người này với người kia"],
    mu: ["Bắt đầu mười việc, xong được ba",
         "Nói trước nghĩ sau",
         "Sợ bị chê, bị bỏ ra ngoài hơn sợ điểm kém",
         "Mất tập trung khi phải làm một mình, trong im lặng"],
    cachhoc: "Học bằng nói và bằng bạn bè. Cho thảo luận nhóm, cho lên bảng trình bày, cho đóng vai. Bắt chép bài im lặng 45 phút là hỏng.",
    hopvoi: "Hợp nhất với C (Cú) — một bên nghĩ ý, một bên làm cho chặt.",
    vacham: "Dễ va với C (bị hỏi \"bằng chứng đâu\" là cụt hứng) và với S (S thấy I ồn quá).",
    choGV: "KHEN ĐÚNG LÚC và khen trước lớp — với em này lời khen công khai nặng hơn điểm số. Đừng phê bình em giữa đám đông, em sẽ nhớ rất lâu. Giao em phần thuyết trình, phần khuấy động; nhưng phải có người chốt phần chi tiết thay em.",
    canren: "Rèn làm xong một việc trước khi bắt đầu việc tiếp theo."
  },
  S: {
    ten: "S — KIÊN ĐỊNH",
    convat: "Bồ câu",
    icon: "🕊️",
    mau: "#2f9e6e",
    motcau: "Muốn yên ổn, muốn mọi người hoà thuận, muốn biết trước điều gì sắp xảy ra.",
    nhandien: "Em này ít nói, ngồi yên, nhận việc gì cũng làm — và thường là người bị quên mất trong lớp.",
    manh: ["Làm đến nơi đến chốn, giao là yên tâm",
           "Lắng nghe thật, bạn bè hay tìm đến tâm sự",
           "Giữ hoà khí khi nhóm cãi nhau",
           "Bền, không bỏ cuộc dù việc chán"],
    mu: ["Không dám nói \"không\", ôm hết việc rồi mệt",
         "Ngại thay đổi — đổi chỗ ngồi hay đổi nhóm cũng thấy khó",
         "Giận thì giấu trong lòng, không nói ra",
         "Chậm quyết, chờ người khác chọn hộ"],
    cachhoc: "Học bằng sự ổn định và báo trước. Nói rõ tuần này làm gì, tuần sau làm gì. Đừng gọi lên bảng bất ngờ — báo trước một hôm thì em làm rất tốt.",
    hopvoi: "Hợp nhất với D (Đại bàng) — một bên giữ nhịp, một bên tạo đà.",
    vacham: "Ít va chạm nhất. Nhưng dễ bị D lấn và bị I át tiếng.",
    choGV: "ĐÂY LÀ EM DỄ BỊ BỎ QUÊN NHẤT LỚP. Em không quậy, không nổi bật, nên không ai để ý. Hãy GỌI TÊN em và hỏi riêng — hỏi trước lớp em sẽ không nói. Báo trước mọi thay đổi. Khi em im lặng, đừng hiểu là em đồng ý.",
    canren: "Rèn nói ra điều mình muốn, và dám từ chối."
  },
  C: {
    ten: "C — CHUẨN MỰC",
    convat: "Cú",
    icon: "🦉",
    mau: "#3f72c4",
    motcau: "Muốn đúng, muốn hiểu tới nơi, muốn có bằng chứng.",
    nhandien: "Em này hay hỏi \"tại sao\", làm bài chậm mà sạch, và khó chịu khi đề bài không rõ.",
    manh: ["Làm kỹ, ít sai, kiểm tra lại trước khi nộp",
           "Nhìn ra lỗi mà cả nhóm bỏ sót",
           "Lập luận có căn cứ, không nói theo cảm tính",
           "Tự học được, không cần ai thúc"],
    mu: ["Cầu toàn tới mức không dám nộp bài",
         "Ngại hỏi, ngại nhờ, tự ôm",
         "Phân tích lâu quá thành lỡ mất thời gian",
         "Hay chê chi tiết nhỏ làm bạn nản"],
    cachhoc: "Học bằng lý lẽ và tài liệu. Cho em biết TẠI SAO phải học cái này, cho em tài liệu đọc trước. Nói \"cứ làm đi, đừng hỏi\" là em tắt.",
    hopvoi: "Hợp nhất với I (Vẹt) — một bên có ý, một bên có bằng chứng.",
    vacham: "Dễ va với D (D thấy C chậm) và với I (C thấy I hời hợt).",
    choGV: "TRẢ LỜI CÂU \"TẠI SAO\" CỦA EM — đó không phải cãi, đó là cách em học. Ra đề phải rõ tiêu chí chấm, em cần biết thế nào là đúng. Đừng thúc \"nhanh lên\", hãy cho hạn chót sớm hơn. Giao em phần soát lỗi, phần số liệu.",
    canren: "Rèn nộp bài ở mức \"đủ tốt\" thay vì chờ hoàn hảo."
  }
};

/* Luận giải cho kiểu ĐÔI — khi góc nhì sát góc nhất */
const CAP_DOI = {
  "D+I": { ten: "Người Dẫn Đầu Có Sức Hút",
           mota: "Vừa dám quyết vừa lôi kéo được người khác đi theo. Đây là chất thủ lĩnh rõ nhất. Cần canh: quyết nhanh và nói nhanh cùng lúc thì dễ hứa điều chưa làm được.",
           choGV: "Giao làm lớp trưởng hoặc trưởng nhóm sự kiện. Nhưng kèm một em C làm phó để giữ phần chi tiết." },
  "D+S": { ten: "Người Chỉ Huy Điềm Tĩnh",
           mota: "Cứng ở việc, mềm ở người. Hiếm và rất quý. Quyết được nhưng không giẫm lên ai. Cần canh: hai lực trái chiều bên trong, dễ mệt vì vừa muốn đẩy vừa muốn giữ hoà.",
           choGV: "Đây là em đáng tin nhất để giao việc dài hạn. Thỉnh thoảng hỏi riêng xem em có đang gồng không." },
  "D+C": { ten: "Người Quyết Đoán Chuẩn Xác",
           mota: "Muốn nhanh VÀ muốn đúng. Làm việc gì cũng tới nơi. Cần canh: khắt khe với mình và với người khác, dễ thành người khó tính trong nhóm.",
           choGV: "Giao việc có tiêu chuẩn cao. Nhắc em rằng bạn bè không sai — chỉ là làm khác cách em." },
  "I+S": { ten: "Người Kết Nối Ấm Áp",
           mota: "Ai cũng quý. Vừa vui vừa biết lắng nghe, là chất keo của lớp. Cần canh: sợ mất lòng nên khó từ chối, dễ bị nhờ vả quá nhiều.",
           choGV: "Giao làm cầu nối khi lớp có mâu thuẫn. Dạy em cách nói \"không\"." },
  "I+C": { ten: "Người Sáng Tạo Có Căn Cứ",
           mota: "Nghĩ ra ý mới rồi tự kiểm chứng được. Cần canh: hai nửa hay đánh nhau — nửa muốn bay, nửa bắt dừng lại soát, dễ tự nghi ngờ mình.",
           choGV: "Giao dự án nghiên cứu nhỏ có phần trình bày. Khen cả ý tưởng lẫn độ kỹ." },
  "S+C": { ten: "Người Thầm Lặng Chắc Chắn",
           mota: "Không ồn ào nhưng giao gì xong nấy, và xong sạch. Cần canh: rất dễ bị bỏ quên vì không bao giờ giơ tay.",
           choGV: "CHỦ ĐỘNG tìm đến em. Đây là kiểu âm thầm gánh việc mà cuối năm không ai nhớ tên." }
};

const NGUONG_KIEU_PHU = 0.15; // góc nhì cách góc nhất dưới 15% thì tính là kiểu đôi
const TOI_THIEU_TU    = 8;    // khoanh ít hơn ngần này thì kết quả chưa đáng tin
