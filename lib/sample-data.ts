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
      category: "case-studies",
      tags: ["moi-truong", "dtm", "giay-phep"],
      isFeatured: false,
    },
  ];
