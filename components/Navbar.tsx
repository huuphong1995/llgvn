"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoImage from "@/LLGVN.jpg";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/services", label: "Dịch vụ", mega: true },
  { href: "/knowledge", label: "Kiến thức" },
  { href: "/news", label: "Tin tức" },
  { href: "/contact", label: "Liên hệ" },
];

const serviceGroups = [
  {
    title: "Tư vấn Y tế",
    items: [
      "Công bố đủ điều kiện trang thiết bị y tế",
      "Hồ sơ pháp lý và giấy phép lưu hành",
      "Tư vấn chuẩn hóa nhãn và tài liệu kỹ thuật",
    ],
  },
  {
    title: "Tư vấn Thực phẩm",
    items: [
      "Công bố sản phẩm và tự công bố",
      "Kiểm nghiệm và hồ sơ an toàn thực phẩm",
      "Rà soát tuân thủ trước thanh kiểm tra",
    ],
  },
  {
    title: "Tư vấn Môi trường",
    items: [
      "Đánh giá tác động môi trường (ĐTM)",
      "Giấy phép môi trường và vận hành thử nghiệm",
      "Quan trắc và báo cáo định kỳ",
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [showMega, setShowMega] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="border-b bg-slate-900 text-xs text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2">
          <p>Hotline: 0862 564 895</p>
          <p>Email: info@llgbiotech.vn</p>
        </div>
      </div>
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoImage}
            alt="Logo LLG VN"
            width={58}
            height={58}
            className="h-12 w-12 rounded-full object-cover"
            priority
          />
          <span className="text-2xl font-black text-sky-900">LLG VN</span>
        </Link>
        <div className="hidden items-center gap-1 text-[15px] font-semibold lg:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            if (link.mega) {
              return (
                <div
                  key={link.href}
                  onMouseEnter={() => setShowMega(true)}
                  onMouseLeave={() => setShowMega(false)}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`rounded px-4 py-2 transition ${
                      active
                        ? "bg-sky-700 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {showMega && (
                    <div className="absolute left-[-240px] top-12 w-[900px] rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
                      <div className="grid grid-cols-3 gap-5">
                        {serviceGroups.map((group) => (
                          <div key={group.title}>
                            <h3 className="font-bold text-sky-800">{group.title}</h3>
                            <ul className="mt-2 space-y-2 text-sm text-slate-700">
                              {group.items.map((item) => (
                                <li key={item} className="border-b border-slate-100 pb-2">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-4 py-2 transition ${
                  active
                    ? "bg-sky-700 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
