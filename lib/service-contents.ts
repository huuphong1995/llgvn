export type ServiceContentSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ServiceDetailContent = {
  pageTitle: string;
  summary: string;
  sections: ServiceContentSection[];
};

export const serviceContents: Record<string, ServiceDetailContent> = {
  "dich-vu-tu-van-thu-nghiem-bao-bi-thuc-pham": {
    pageTitle:
      "Dịch Vụ Tư Vấn Thử Nghiệm Bao Bì Thực Phẩm Theo Quy Định Pháp Luật",
    summary:
      "Tư vấn thử nghiệm bao bì thực phẩm theo QCVN 12-x/BYT, hỗ trợ doanh nghiệp tuân thủ quy định an toàn thực phẩm và công bố sản phẩm.",
    sections: [
      {
        paragraphs: [
          "Trong những năm gần đây, ngành công nghiệp thực phẩm tại Việt Nam phát triển mạnh mẽ kéo theo nhu cầu sử dụng bao bì thực phẩm ngày càng tăng. Bao bì không chỉ đóng vai trò bảo quản sản phẩm, kéo dài thời gian sử dụng mà còn là yếu tố quan trọng giúp doanh nghiệp xây dựng thương hiệu và tạo niềm tin với người tiêu dùng. Tuy nhiên, các loại bao bì tiếp xúc trực tiếp với thực phẩm nếu không được kiểm soát chất lượng có thể gây thôi nhiễm hóa chất độc hại, ảnh hưởng đến sức khỏe người sử dụng. Chính vì vậy, việc thử nghiệm và kiểm nghiệm bao bì thực phẩm đang trở thành yêu cầu bắt buộc đối với nhiều doanh nghiệp sản xuất và kinh doanh thực phẩm hiện nay.",
        ],
      },
      {
        heading: "Quy định thử nghiệm bao bì thực phẩm theo pháp luật hiện hành",
        paragraphs: [
          "Theo quy định của pháp luật về an toàn thực phẩm, các loại bao bì, dụng cụ tiếp xúc trực tiếp với thực phẩm phải đáp ứng yêu cầu về an toàn trước khi lưu hành trên thị trường.",
          "Hiện nay, việc thử nghiệm bao bì thực phẩm được áp dụng dựa trên các quy chuẩn kỹ thuật quốc gia do Bộ Y tế ban hành, bao gồm:",
        ],
        bullets: [
          "QCVN 12-1:2011/BYT đối với bao bì, dụng cụ bằng nhựa tổng hợp;",
          "QCVN 12-2:2011/BYT đối với bao bì, dụng cụ bằng cao su;",
          "QCVN 12-3:2011/BYT đối với bao bì, dụng cụ bằng kim loại;",
          "QCVN 12-4:2015/BYT đối với bao bì, dụng cụ bằng thủy tinh, gốm sứ tiếp xúc trực tiếp với thực phẩm.",
        ],
      },
      {
        paragraphs: [
          "Các doanh nghiệp sản xuất, nhập khẩu hoặc sử dụng bao bì thực phẩm thường phải thực hiện các chỉ tiêu thử nghiệm như:",
        ],
        bullets: [
          "Kiểm tra độ thôi nhiễm kim loại nặng;",
          "Kiểm tra hàm lượng hóa chất độc hại;",
          "Thử nghiệm khả năng chịu nhiệt;",
          "Đánh giá độ bền cơ học;",
          "Kiểm tra an toàn vệ sinh đối với vật liệu tiếp xúc trực tiếp với thực phẩm.",
        ],
      },
      {
        paragraphs: [
          "Việc thử nghiệm này nhằm bảo đảm rằng bao bì không gây phản ứng hóa học làm ảnh hưởng đến chất lượng thực phẩm trong quá trình bảo quản và sử dụng.",
          "Bên cạnh đó, theo quy định tại Nghị định số 15/2018/NĐ-CP hướng dẫn Luật An toàn thực phẩm, doanh nghiệp phải chịu trách nhiệm về tính an toàn của sản phẩm lưu thông trên thị trường, bao gồm cả bao bì tiếp xúc trực tiếp với thực phẩm.",
        ],
      },
      {
        heading: "Những loại bao bì cần thực hiện thử nghiệm",
        paragraphs: ["Một số nhóm bao bì phổ biến thường phải tiến hành kiểm nghiệm gồm:"],
        bullets: [
          "Bao bì nhựa PET, PE, PP, PVC;",
          "Hộp nhựa đựng thực phẩm;",
          "Màng bọc thực phẩm;",
          "Bao bì giấy có lớp phủ tiếp xúc thực phẩm;",
          "Lon kim loại chứa đồ uống;",
          "Chai thủy tinh;",
          "Dụng cụ ăn uống dùng một lần;",
          "Bao bì thực phẩm nhập khẩu.",
        ],
      },
      {
        paragraphs: [
          "Đặc biệt đối với các doanh nghiệp xuất khẩu thực phẩm, việc thử nghiệm bao bì còn giúp đáp ứng yêu cầu kỹ thuật của thị trường quốc tế, hạn chế rủi ro bị trả hàng hoặc thu hồi sản phẩm.",
        ],
      },
      {
        heading: "Lợi ích khi thực hiện thử nghiệm bao bì thực phẩm",
        paragraphs: [
          "Thực hiện thử nghiệm bao bì mang lại nhiều lợi ích thiết thực cho doanh nghiệp như:",
        ],
        bullets: [
          "Đảm bảo tuân thủ đúng quy định pháp luật;",
          "Tăng uy tín thương hiệu và niềm tin khách hàng;",
          "Hạn chế rủi ro thanh tra, xử phạt;",
          "Hỗ trợ hồ sơ công bố sản phẩm thực phẩm;",
          "Đáp ứng yêu cầu xuất khẩu sang thị trường quốc tế;",
          "Kiểm soát chất lượng sản phẩm ngay từ đầu.",
        ],
      },
      {
        paragraphs: [
          "Ngoài ra, việc chủ động kiểm nghiệm còn giúp doanh nghiệp phát hiện sớm các nguy cơ về an toàn thực phẩm, từ đó có giải pháp cải tiến chất lượng bao bì phù hợp.",
        ],
      },
      {
        heading: "Dịch vụ tư vấn thử nghiệm bao bì thực phẩm",
        paragraphs: ["Dịch vụ tư vấn thử nghiệm bao bì thực phẩm hỗ trợ doanh nghiệp:"],
        bullets: [
          "Xác định đúng quy chuẩn áp dụng;",
          "Tư vấn chỉ tiêu kiểm nghiệm phù hợp;",
          "Hỗ trợ lấy mẫu và gửi mẫu thử nghiệm;",
          "Tư vấn hồ sơ công bố liên quan;",
          "Theo dõi kết quả kiểm nghiệm;",
          "Hỗ trợ giải trình hồ sơ với cơ quan quản lý khi cần thiết.",
        ],
      },
      {
        paragraphs: [
          "Việc sử dụng đơn vị tư vấn chuyên nghiệp giúp doanh nghiệp tiết kiệm thời gian, chi phí và hạn chế sai sót trong quá trình thực hiện thủ tục pháp lý.",
        ],
      },
      {
        heading: "Kết bài",
        paragraphs: [
          "Trong bối cảnh cơ quan quản lý ngày càng tăng cường thanh tra, kiểm tra về an toàn thực phẩm, doanh nghiệp cần chủ động thực hiện thử nghiệm bao bì thực phẩm nhằm bảo đảm chất lượng sản phẩm và tuân thủ đúng quy định pháp luật. Đây không chỉ là yêu cầu bắt buộc mà còn là giải pháp quan trọng giúp nâng cao uy tín thương hiệu, bảo vệ sức khỏe người tiêu dùng và phát triển bền vững trên thị trường.",
        ],
      },
    ],
  },
  "dich-vu-kiem-nghiem-thuc-pham-chuc-nang": {
    pageTitle: "Kiểm nghiệm thực phẩm chức năng",
    summary:
      "Kiểm nghiệm thực phẩm chức năng theo Nghị định 15/2018/NĐ-CP, đảm bảo an toàn sản phẩm và tuân thủ quy định trước khi lưu hành.",
    sections: [
      {
        heading: "Tại sao phải kiểm nghiệm thực phẩm chức năng?",
        paragraphs: [
          "Trong bối cảnh thị trường thực phẩm chức năng ngày càng phát triển mạnh mẽ, việc đảm bảo chất lượng và an toàn sản phẩm trở thành yếu tố sống còn đối với doanh nghiệp. Thực phẩm chức năng là nhóm sản phẩm ảnh hưởng trực tiếp đến sức khỏe người tiêu dùng, do đó việc kiểm nghiệm không chỉ là yêu cầu bắt buộc của pháp luật mà còn là trách nhiệm của doanh nghiệp đối với cộng đồng.",
          "Theo quy định tại Nghị định 15/2018/NĐ-CP, trước khi lưu hành trên thị trường, thực phẩm chức năng phải được kiểm nghiệm để chứng minh sản phẩm phù hợp với các quy chuẩn kỹ thuật và đảm bảo an toàn cho người sử dụng.",
        ],
      },
      {
        heading: "Lợi ích của việc doanh nghiệp kiểm nghiệm thực phẩm chức năng",
        paragraphs: [
          "Việc kiểm nghiệm mang lại nhiều lợi ích thiết thực cho doanh nghiệp, không chỉ về mặt pháp lý mà còn về uy tín và phát triển lâu dài:",
        ],
      },
      {
        heading: "1. Tuân thủ quy định pháp luật",
        paragraphs: [
          "Kiểm nghiệm là một phần bắt buộc trong hồ sơ công bố sản phẩm. Nếu không thực hiện, doanh nghiệp có thể bị xử phạt hành chính, thu hồi sản phẩm hoặc đình chỉ hoạt động.",
        ],
      },
      {
        heading: "2. Đảm bảo an toàn cho người tiêu dùng",
        paragraphs: [
          "Thông qua kiểm nghiệm, doanh nghiệp có thể xác định được các chỉ tiêu quan trọng như:",
          "Từ đó giảm thiểu rủi ro ảnh hưởng đến sức khỏe người sử dụng.",
        ],
        bullets: [
          "Hàm lượng hoạt chất",
          "Kim loại nặng (chì, thủy ngân, cadimi)",
          "Vi sinh vật gây hại (E.coli, Salmonella…)",
        ],
      },
      {
        heading: "3. Nâng cao uy tín thương hiệu",
        paragraphs: [
          "Sản phẩm có kết quả kiểm nghiệm rõ ràng, minh bạch sẽ tạo được niềm tin với khách hàng, đặc biệt trong bối cảnh người tiêu dùng ngày càng quan tâm đến chất lượng và nguồn gốc sản phẩm.",
        ],
      },
      {
        heading: "4. Hỗ trợ hoạt động kinh doanh và quảng cáo",
        paragraphs: [
          "Kết quả kiểm nghiệm là cơ sở quan trọng để doanh nghiệp xây dựng nội dung quảng cáo, chứng minh công dụng sản phẩm một cách hợp pháp và thuyết phục.",
        ],
      },
      {
        heading: "5. Kiểm soát chất lượng sản xuất",
        paragraphs: [
          "Thông qua kiểm nghiệm định kỳ, doanh nghiệp có thể phát hiện sai lệch trong quy trình sản xuất, từ đó cải tiến và ổn định chất lượng sản phẩm.",
        ],
      },
      {
        heading: "Một số sản phẩm thực phẩm chức năng cần kiểm nghiệm hiện nay",
        paragraphs: [
          "Hầu hết các nhóm thực phẩm chức năng đều bắt buộc phải kiểm nghiệm trước khi công bố, đặc biệt là các sản phẩm phổ biến sau:",
        ],
        bullets: [
          "Thực phẩm bảo vệ sức khỏe (viên uống bổ sung vitamin, khoáng chất)",
          "Thực phẩm hỗ trợ giảm cân",
          "Thực phẩm tăng cường sinh lý",
          "Thực phẩm hỗ trợ xương khớp",
          "Thực phẩm bổ não, tăng cường trí nhớ",
          "Sản phẩm collagen, làm đẹp da",
          "Thực phẩm bổ sung cho trẻ em và người cao tuổi",
          "Sản phẩm có nguồn gốc thảo dược, đông y",
        ],
      },
      {
        paragraphs: [
          "Các sản phẩm này thường có nguy cơ cao về sai lệch hàm lượng hoặc chứa chất cấm nếu không được kiểm soát chặt chẽ, do đó việc kiểm nghiệm là đặc biệt quan trọng.",
        ],
      },
      {
        heading: "Kết luận",
        paragraphs: [
          "Kiểm nghiệm thực phẩm chức năng không chỉ là nghĩa vụ pháp lý mà còn là nền tảng giúp doanh nghiệp phát triển bền vững trên thị trường. Trong bối cảnh cạnh tranh ngày càng cao và yêu cầu của người tiêu dùng ngày càng khắt khe, việc đầu tư vào kiểm nghiệm chính là đầu tư cho uy tín, chất lượng và tương lai của doanh nghiệp.",
        ],
      },
    ],
  },
  "dich-vu-tu-van-cong-bo-thuc-pham": {
    pageTitle: "Dịch vụ tư vấn công bố thực phẩm",
    summary:
      "Tư vấn tự công bố sản phẩm thực phẩm theo Nghị định 15/2018/NĐ-CP, hỗ trợ doanh nghiệp chuẩn bị hồ sơ đầy đủ trước khi lưu hành.",
    sections: [
      {
        paragraphs: [
          "Trong những năm gần đây, công tác thanh tra, kiểm tra an toàn thực phẩm ngày càng được các cơ quan chức năng tăng cường trên phạm vi toàn quốc. Các cơ sở sản xuất, đóng gói, kinh doanh thực phẩm thường xuyên được kiểm tra về hồ sơ pháp lý, điều kiện sản xuất, ghi nhãn sản phẩm, hồ sơ tự công bố và nguồn gốc nguyên liệu.",
          "Nhiều doanh nghiệp hiện nay vẫn còn chủ quan trong việc thực hiện thủ tục tự công bố sản phẩm thực phẩm theo quy định pháp luật. Điều này dẫn đến các rủi ro như:",
        ],
        bullets: [
          "Bị xử phạt vi phạm hành chính;",
          "Thu hồi sản phẩm lưu thông trên thị trường;",
          "Ảnh hưởng uy tín thương hiệu;",
          "Khó đưa sản phẩm vào siêu thị, đại lý hoặc sàn thương mại điện tử;",
          "Gặp khó khăn khi làm việc với đối tác và cơ quan quản lý.",
        ],
      },
      {
        paragraphs: [
          "Chính vì vậy, việc thực hiện công bố thực phẩm đúng quy định không chỉ là yêu cầu pháp lý bắt buộc mà còn là yếu tố giúp doanh nghiệp xây dựng uy tín và phát triển bền vững.",
        ],
      },
      {
        heading: "Tại sao doanh nghiệp cần phải công bố thực phẩm?",
        paragraphs: [
          "Theo quy định tại Nghị định 15/2018/NĐ-CP hướng dẫn thi hành Luật An toàn thực phẩm:",
          "“Tổ chức, cá nhân sản xuất, kinh doanh thực phẩm phải thực hiện tự công bố sản phẩm trước khi đưa sản phẩm ra lưu thông trên thị trường.”",
          "Căn cứ theo Điều 4 Nghị định 15/2018/NĐ-CP, các sản phẩm thực phẩm thông thường thuộc diện thực hiện thủ tục tự công bố sản phẩm, bao gồm:",
        ],
        bullets: [
          "Thực phẩm đóng gói sẵn;",
          "Nông sản chế biến;",
          "Gạo, ngũ cốc;",
          "Thực phẩm khô;",
          "Gia vị;",
          "Nước uống;",
          "Và nhiều nhóm thực phẩm khác theo quy định.",
        ],
      },
      {
        paragraphs: [
          "Việc tự công bố sản phẩm mang lại nhiều lợi ích cho doanh nghiệp như:",
        ],
      },
      {
        heading: "1. Đáp ứng yêu cầu pháp luật",
        paragraphs: [
          "Đây là thủ tục bắt buộc trước khi sản phẩm lưu hành trên thị trường.",
        ],
      },
      {
        heading: "2. Tăng uy tín thương hiệu",
        paragraphs: [
          "Sản phẩm có hồ sơ công bố đầy đủ sẽ tạo được niềm tin với khách hàng, đại lý và đối tác phân phối.",
        ],
      },
      {
        heading: "3. Thuận lợi khi phân phối sản phẩm",
        paragraphs: [
          "Nhiều hệ thống siêu thị, cửa hàng tiện lợi và sàn thương mại điện tử yêu cầu doanh nghiệp cung cấp hồ sơ tự công bố trước khi hợp tác.",
        ],
      },
      {
        heading: "4. Giảm thiểu rủi ro khi thanh kiểm tra",
        paragraphs: [
          "Doanh nghiệp có hồ sơ pháp lý đầy đủ sẽ dễ dàng giải trình khi cơ quan chức năng kiểm tra.",
        ],
      },
      {
        heading: "Hồ sơ tự công bố thực phẩm cần chuẩn bị",
        paragraphs: [
          "Theo Điều 5 Nghị định 15/2018/NĐ-CP, hồ sơ tự công bố sản phẩm gồm:",
        ],
      },
      {
        heading: "1. Bản tự công bố sản phẩm",
        paragraphs: [
          "Doanh nghiệp thực hiện theo hướng dẫn và mẫu quy định tại Phụ lục I của Nghị định 15.",
        ],
      },
      {
        heading: "2. Phiếu kết quả kiểm nghiệm sản phẩm",
        bullets: [
          "Được cấp bởi phòng kiểm nghiệm được công nhận hoặc chỉ định;",
          "Phiếu kiểm nghiệm còn hiệu lực trong vòng 12 tháng;",
          "Thể hiện đầy đủ các chỉ tiêu an toàn theo quy định tương ứng với từng nhóm sản phẩm.",
        ],
      },
      {
        heading: "3. Nhãn sản phẩm",
        paragraphs: ["Nhãn phải thể hiện đầy đủ các nội dung theo:"],
        bullets: [
          "Nghị định 43/2017/NĐ-CP về ghi nhãn hàng hóa;",
          "Nghị định 111/2021/NĐ-CP sửa đổi bổ sung;",
          "Các quy định chuyên ngành liên quan.",
        ],
      },
      {
        heading: "4. Giấy chứng nhận đăng ký doanh nghiệp",
        paragraphs: [
          "Có ngành nghề phù hợp với hoạt động sản xuất hoặc kinh doanh thực phẩm.",
        ],
      },
      {
        heading: "5. Giấy tờ liên quan khác (nếu có)",
        paragraphs: ["Tùy từng trường hợp:"],
        bullets: [
          "Hợp đồng gia công;",
          "Giấy chứng nhận cơ sở đủ điều kiện ATTP;",
          "Hồ sơ nguồn gốc nguyên liệu;",
          "Hồ sơ nhập khẩu;",
          "Hồ sơ HACCP, ISO, GMP…",
        ],
      },
      {
        heading: "Những lỗi sai doanh nghiệp thường gặp khi tự công bố thực phẩm",
        paragraphs: [
          "Trong quá trình hỗ trợ khách hàng, nhiều doanh nghiệp gặp phải các lỗi phổ biến sau:",
        ],
      },
      {
        heading: "1. Kiểm nghiệm sai chỉ tiêu",
        paragraphs: [
          "Nhiều doanh nghiệp kiểm nghiệm thiếu chỉ tiêu an toàn theo quy chuẩn kỹ thuật tương ứng với sản phẩm.",
        ],
      },
      {
        heading: "2. Ghi nhãn không đúng quy định",
        paragraphs: ["Các lỗi thường gặp gồm:"],
        bullets: [
          "Thiếu cảnh báo;",
          "Sai tên hàng hóa;",
          "Thiếu định lượng;",
          "Không ghi xuất xứ;",
          "Thiếu thông tin tổ chức chịu trách nhiệm.",
        ],
      },
      {
        heading: "3. Sai nhóm sản phẩm",
        paragraphs: [
          "Phân loại sai nhóm thực phẩm dẫn đến áp dụng sai quy định pháp luật.",
        ],
      },
      {
        heading: "4. Hồ sơ pháp lý không đồng nhất",
        paragraphs: [
          "Thông tin trên nhãn, kiểm nghiệm và giấy phép kinh doanh không khớp nhau.",
        ],
      },
      {
        heading: "5. Không lưu trữ hồ sơ đầy đủ",
        paragraphs: [
          "Nhiều doanh nghiệp sau khi tự công bố nhưng không lưu hồ sơ theo quy định để xuất trình khi thanh kiểm tra.",
        ],
      },
      {
        heading: "6. Nhầm lẫn giữa tự công bố và đăng ký bản công bố",
        paragraphs: [
          "Đây là lỗi khá phổ biến đối với doanh nghiệp mới hoạt động trong lĩnh vực thực phẩm.",
        ],
      },
      {
        heading: "Vì sao nên chọn dịch vụ tư vấn công bố thực phẩm của CÔNG TY TNHH LLG VN?",
        paragraphs: [
          "Với kinh nghiệm thực hiện hồ sơ pháp lý cho nhiều doanh nghiệp trên toàn quốc, CÔNG TY TNHH LLG VN cam kết mang đến dịch vụ chuyên nghiệp, nhanh chóng và tối ưu chi phí cho khách hàng.",
        ],
      },
      {
        heading: "Ưu điểm dịch vụ của LLG VN",
        bullets: [
          "Tư vấn đúng quy định pháp luật hiện hành;",
          "Hỗ trợ kiểm nghiệm sản phẩm phù hợp;",
          "Soạn hồ sơ trọn gói;",
          "Kiểm tra và chỉnh sửa nhãn sản phẩm;",
          "Hỗ trợ nộp hồ sơ và hướng dẫn lưu hồ sơ;",
          "Tư vấn tận tâm trong suốt quá trình hoạt động.",
        ],
      },
      {
        heading: "Cam kết của chúng tôi",
        bullets: [
          "Hồ sơ đầy đủ – đúng quy định;",
          "Thời gian xử lý nhanh;",
          "Chi phí minh bạch;",
          "Hỗ trợ doanh nghiệp trước và sau công bố.",
        ],
      },
      {
        paragraphs: [
          "Nếu doanh nghiệp của bạn đang cần thực hiện thủ tục công bố thực phẩm thường, hãy liên hệ ngay với CÔNG TY TNHH LLG VN để được tư vấn chi tiết và hỗ trợ nhanh chóng.",
        ],
      },
    ],
  },
};

export function getServicePreview(slug: string, fallbackTitle: string) {
  const content = serviceContents[slug];
  if (content?.summary) return content.summary;

  const firstParagraph = content?.sections.find((section) => section.paragraphs?.length)?.paragraphs?.[0];
  if (firstParagraph) {
    return firstParagraph.length > 220 ? `${firstParagraph.slice(0, 220).trim()}...` : firstParagraph;
  }

  return `LLG VN hỗ trợ ${fallbackTitle.toLowerCase()} với quy trình tư vấn chuyên nghiệp, tuân thủ đúng quy định pháp luật hiện hành.`;
}
