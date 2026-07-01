import { Article } from "@/types/article";

export const sampleArticles: Omit<Article, "_id" | "createdAt" | "updatedAt">[] =
  [
    {
      title: "Thông tư mới về đăng ký trang thiết bị y tế tại Việt Nam",
      slug: "new-circular-medical-device-registration-vietnam",
      summary:
        "Phân tích thực tiễn về lộ trình tuân thủ và yêu cầu hồ sơ mới nhất cho đăng ký trang thiết bị y tế.",
      content:
        "Doanh nghiệp cần rà soát phân loại thiết bị, yêu cầu ghi nhãn và nghĩa vụ hậu kiểm đã được cập nhật. LLG VN hỗ trợ xây dựng lộ trình hồ sơ, phân tích điểm thiếu và phối hợp làm việc với cơ quan quản lý để rút ngắn thời gian phê duyệt.",
      image:
        "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1200&q=80",
      category: "legal-updates",
      tags: ["y-te", "giay-phep", "tuan-thu"],
      isFeatured: true,
    },
    {
      title: "Công bố sản phẩm thực phẩm: Checklist từ A đến Z",
      slug: "food-product-declaration-checklist",
      summary:
        "Danh sách kiểm tra hồ sơ kỹ thuật, an toàn và nhãn để thực hiện công bố thực phẩm đúng quy định.",
      content:
        "Một bộ hồ sơ công bố đầy đủ gồm công thức sản phẩm, kết quả kiểm nghiệm, nhãn và hồ sơ pháp lý doanh nghiệp. LLG VN hỗ trợ đối chiếu tính nhất quán giữa các tài liệu trước khi nộp.",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
      category: "guidelines",
      tags: ["thuc-pham", "cong-bo", "an-toan"],
      isFeatured: true,
    },
    {
      title: "Nghiên cứu tình huống: Rút ngắn phê duyệt ĐTM cho nhà máy",
      slug: "case-study-accelerating-eia-approval",
      summary:
        "Cách chuẩn hóa dữ liệu nền môi trường và phối hợp sớm với các bên liên quan giúp rút ngắn vòng phê duyệt ĐTM.",
      content:
        "Đội ngũ dự án đã tổ chức lại dữ liệu tác động môi trường, chuẩn hóa mẫu báo cáo và điều phối phản hồi với cơ quan chức năng. Nhờ đó, khách hàng giảm số vòng chỉnh sửa và sẵn sàng xin giấy phép nhanh hơn.",
      image:
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
      category: "case-studies",
      tags: ["moi-truong", "dtm", "giay-phep"],
      isFeatured: false,
    },
    {
      title: "Quy trình tự công bố thực phẩm nhập khẩu năm 2026",
      slug: "quy-trinh-tu-cong-bo-thuc-pham-nhap-khau-2026",
      summary:
        "Các bước chuẩn bị hồ sơ tự công bố cho thực phẩm nhập khẩu theo quy định mới cập nhật.",
      content:
        "Doanh nghiệp cần chuẩn bị đầy đủ phiếu kiểm nghiệm, nhãn sản phẩm đúng chuẩn và hồ sơ pháp lý của đơn vị nhập khẩu. Việc chuẩn hóa tài liệu từ đầu giúp hạn chế rủi ro khi kiểm tra hậu kiểm.",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80",
      category: "guidelines",
      tags: ["nhap-khau", "tu-cong-bo", "thuc-pham"],
      isFeatured: false,
    },
    {
      title: "Hướng dẫn lập kế hoạch quan trắc môi trường định kỳ",
      slug: "huong-dan-lap-ke-hoach-quan-trac-moi-truong-dinh-ky",
      summary:
        "Khung triển khai kế hoạch quan trắc môi trường định kỳ để tránh vi phạm báo cáo.",
      content:
        "Kế hoạch quan trắc cần xác định rõ tần suất, thông số và đơn vị thực hiện. LLG VN hỗ trợ doanh nghiệp xây dựng lịch trình phù hợp theo loại hình sản xuất và nghĩa vụ pháp lý.",
      image:
        "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
      category: "guidelines",
      tags: ["quan-trac", "bao-cao", "moi-truong"],
      isFeatured: false,
    },
    {
      title: "Case Study: Chuẩn hóa hồ sơ công bố mỹ phẩm trong 14 ngày",
      slug: "case-study-chuan-hoa-ho-so-cong-bo-my-pham-14-ngay",
      summary:
        "Dự án chuẩn hóa hồ sơ công bố mỹ phẩm cho doanh nghiệp startup trong thời gian ngắn.",
      content:
        "Nhờ checklist hồ sơ theo từng nhóm sản phẩm và rà soát thông tin INCI chặt chẽ, đội ngũ đã rút ngắn thời gian xử lý và giảm sai sót khi nộp hồ sơ công bố.",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      category: "case-studies",
      tags: ["my-pham", "startup", "ho-so"],
      isFeatured: false,
    },
    {
      title: "Cập nhật quy định ghi nhãn thực phẩm bao gói sẵn",
      slug: "cap-nhat-quy-dinh-ghi-nhan-thuc-pham-bao-goi-san",
      summary:
        "Những điểm doanh nghiệp cần lưu ý khi thiết kế nhãn theo quy định mới về bao gói sẵn.",
      content:
        "Nhãn sản phẩm cần đảm bảo đầy đủ nội dung bắt buộc, đơn vị đo lường và cảnh báo phù hợp. Việc sai nhãn có thể dẫn đến thu hồi sản phẩm hoặc xử phạt hành chính.",
      image:
        "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=1200&q=80",
      category: "legal-updates",
      tags: ["ghi-nhan", "bao-goi", "thuc-pham"],
      isFeatured: true,
    },
  ];
