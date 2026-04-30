import Image from "next/image";
import logoImage from "@/LLGVN.jpg";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <Image
            src={logoImage}
            alt="Logo LLG VN"
            width={64}
            height={64}
            className="mb-3 h-14 w-14 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold text-white">
            LLG VN - Kiểm nghiệm chính xác, hiệu quả, tin cậy
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Đối tác tư vấn tin cậy trong lĩnh vực y tế, thực phẩm và môi trường.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold text-white">Liên hệ</h4>
          <p className="mt-2">Điện thoại: 0862 564 895</p>
          <p>Email: info@llgbiotech.vn</p>
          <p>Địa chỉ: Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold text-white">Dịch vụ nhanh</h4>
          <ul className="mt-2 space-y-1">
            <li>Tư vấn công bố sản phẩm</li>
            <li>Đánh giá tác động môi trường</li>
            <li>Hồ sơ pháp lý y tế</li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold text-white">Giờ làm việc</h4>
          <p className="mt-2">Thứ 2 - Thứ 6: 08:00 - 18:00</p>
          <p>Thứ 7: 08:00 - 12:00</p>
          <p>Hỗ trợ: 24/7 qua email</p>
        </div>
      </div>
    </footer>
  );
}
