import type { FeaturedServiceItem } from "@/lib/featured-services";
import { getServicePreview, serviceContents, type ServiceDetailContent } from "@/lib/service-contents";

export type ServiceChildArticle = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  isoLabel?: string;
  sectionRange?: [number, number];
};

const serviceChildrenMap: Record<string, ServiceChildArticle[]> = {
  "dich-vu-tu-van-cong-bo-thuc-pham": [
    {
      slug: "rui-ro-khi-chua-cong-bo",
      title: "Rủi ro khi chưa tự công bố thực phẩm",
      summary:
        "Thanh tra ATTP ngày càng chặt, doanh nghiệp chưa tự công bố có thể bị phạt, thu hồi sản phẩm và mất uy tín.",
      sectionRange: [0, 1],
    },
    {
      slug: "tai-sao-can-cong-bo-thuc-pham",
      title: "Tại sao doanh nghiệp cần công bố thực phẩm?",
      summary:
        "Quy định tại Nghị định 15/2018/NĐ-CP và lợi ích khi thực hiện tự công bố sản phẩm trước khi lưu hành.",
      sectionRange: [2, 6],
    },
    {
      slug: "ho-so-tu-cong-bo-thuc-pham",
      title: "Hồ sơ tự công bố thực phẩm cần chuẩn bị",
      summary:
        "Danh mục hồ sơ theo Điều 5 Nghị định 15/2018/NĐ-CP gồm bản tự công bố, phiếu kiểm nghiệm, nhãn và giấy tờ liên quan.",
      sectionRange: [7, 12],
    },
    {
      slug: "loi-sai-thuong-gap",
      title: "Những lỗi sai thường gặp khi tự công bố",
      summary:
        "Kiểm nghiệm sai chỉ tiêu, ghi nhãn sai quy định, hồ sơ không đồng nhất và các lỗi phổ biến khác.",
      sectionRange: [13, 19],
    },
    {
      slug: "tu-van-cong-bo-llg-vn",
      title: "Dịch vụ tư vấn công bố thực phẩm của LLG VN",
      summary:
        "LLG VN hỗ trợ soạn hồ sơ trọn gói, kiểm tra nhãn, nộp hồ sơ và tư vấn trước – sau công bố.",
      sectionRange: [20, 24],
    },
  ],
  "dich-vu-kiem-nghiem-thuc-pham-chuc-nang": [
    {
      slug: "tai-sao-kiem-nghiem-tpcn",
      title: "Tại sao phải kiểm nghiệm thực phẩm chức năng?",
      summary:
        "Yêu cầu pháp lý và trách nhiệm của doanh nghiệp trong bối cảnh thị trường TPCN phát triển mạnh.",
      sectionRange: [0, 0],
    },
    {
      slug: "loi-ich-kiem-nghiem-tpcn",
      title: "Lợi ích khi kiểm nghiệm thực phẩm chức năng",
      summary:
        "Tuân thủ pháp luật, đảm bảo an toàn, nâng cao uy tín và kiểm soát chất lượng sản xuất.",
      sectionRange: [1, 6],
    },
    {
      slug: "san-pham-can-kiem-nghiem",
      title: "Sản phẩm TPCN cần kiểm nghiệm hiện nay",
      summary:
        "Các nhóm thực phẩm bảo vệ sức khỏe, hỗ trợ giảm cân, collagen, thảo dược và nhiều nhóm khác.",
      sectionRange: [7, 8],
    },
    {
      slug: "ket-luan-kiem-nghiem-tpcn",
      title: "Kết luận về kiểm nghiệm thực phẩm chức năng",
      summary:
        "Kiểm nghiệm là nghĩa vụ pháp lý và nền tảng phát triển bền vững cho doanh nghiệp.",
      sectionRange: [9, 9],
    },
  ],
  "dich-vu-tu-van-thu-nghiem-bao-bi-thuc-pham": [
    {
      slug: "quy-dinh-thu-nghiem-bao-bi",
      title: "Quy định thử nghiệm bao bì thực phẩm",
      summary:
        "Các QCVN 12-x/BYT và chỉ tiêu kiểm nghiệm bắt buộc theo pháp luật an toàn thực phẩm.",
      sectionRange: [0, 3],
    },
    {
      slug: "loai-bao-bi-can-thu-nghiem",
      title: "Những loại bao bì cần thực hiện thử nghiệm",
      summary:
        "Bao bì nhựa, màng bọc, lon kim loại, chai thủy tinh và bao bì thực phẩm nhập khẩu.",
      sectionRange: [4, 5],
    },
    {
      slug: "loi-ich-thu-nghiem-bao-bi",
      title: "Lợi ích khi thử nghiệm bao bì thực phẩm",
      summary:
        "Tuân thủ pháp luật, tăng uy tín thương hiệu và hỗ trợ xuất khẩu sản phẩm.",
      sectionRange: [6, 7],
    },
    {
      slug: "dich-vu-tu-van-bao-bi-llg",
      title: "Dịch vụ tư vấn thử nghiệm bao bì của LLG VN",
      summary:
        "Hỗ trợ xác định quy chuẩn, lấy mẫu, theo dõi kết quả và giải trình hồ sơ với cơ quan quản lý.",
      sectionRange: [8, 10],
    },
  ],
  "dich-vu-dao-tao-tu-van-iso": [
    {
      slug: "dao-tao-tu-van-iso-9001-2015",
      title: "Đào tạo tư vấn ISO 9001:2015",
      summary:
        "Tư vấn và đào tạo xây dựng hệ thống quản lý chất lượng theo tiêu chuẩn ISO 9001:2015 cho doanh nghiệp.",
      isoLabel: "9001",
    },
    {
      slug: "dao-tao-tu-van-iso-14001-2015",
      title: "Đào tạo tư vấn ISO 14001:2015",
      summary:
        "Hỗ trợ doanh nghiệp thiết lập và vận hành hệ thống quản lý môi trường theo ISO 14001:2015.",
      isoLabel: "14001",
    },
    {
      slug: "dao-tao-tu-van-iso-45001-2018",
      title: "Đào tạo tư vấn ISO 45001:2018",
      summary:
        "Đào tạo và tư vấn hệ thống quản lý an toàn, sức khỏe nghề nghiệp theo tiêu chuẩn ISO 45001:2018.",
      isoLabel: "45001",
    },
    {
      slug: "dao-tao-tu-van-iso-22000-2018",
      title: "Đào tạo tư vấn ISO 22000:2018",
      summary:
        "Tư vấn xây dựng hệ thống quản lý an toàn thực phẩm theo ISO 22000:2018 cho nhà sản xuất và chế biến.",
      isoLabel: "22000",
    },
    {
      slug: "dao-tao-tu-van-iso-haccp",
      title: "Đào tạo tư vấn ISO HACCP",
      summary:
        "Đào tạo và triển khai hệ thống HACCP nhằm kiểm soát mối nguy và đảm bảo an toàn thực phẩm.",
      isoLabel: "HACCP",
    },
    {
      slug: "dao-tao-tu-van-iso-13485-2016",
      title: "Đào tạo tư vấn ISO 13485:2016",
      summary:
        "Tư vấn hệ thống quản lý chất lượng thiết bị y tế theo tiêu chuẩn ISO 13485:2016.",
      isoLabel: "13485",
    },
  ],
};

export function getServiceChildren(
  parentSlug: string,
  parent: FeaturedServiceItem,
): ServiceChildArticle[] {
  const configured = serviceChildrenMap[parentSlug];
  if (configured) {
    return configured.map((child) => ({
      ...child,
      image: child.image ?? parent.image,
    }));
  }

  return [
    {
      slug: "tong-quan",
      title: parent.title,
      summary: getServicePreview(parentSlug, parent.title),
      image: parent.image,
    },
  ];
}

export function getServiceChildArticle(
  parentSlug: string,
  articleSlug: string,
  parent: FeaturedServiceItem,
) {
  return getServiceChildren(parentSlug, parent).find((child) => child.slug === articleSlug) ?? null;
}

export function getChildArticleContent(
  parentSlug: string,
  child: ServiceChildArticle,
): ServiceDetailContent | null {
  const parentContent = serviceContents[parentSlug];
  if (!parentContent) return null;

  if (child.sectionRange) {
    const [start, end] = child.sectionRange;
    return {
      pageTitle: child.title,
      summary: child.summary,
      sections: parentContent.sections.slice(start, end + 1),
    };
  }

  return {
    pageTitle: child.title,
    summary: child.summary,
    sections: parentContent.sections,
  };
}
