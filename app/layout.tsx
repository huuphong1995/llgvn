import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLG VN - Tư vấn chuyên nghiệp",
  description:
    "Dịch vụ tư vấn chuyên nghiệp trong lĩnh vực y tế, thực phẩm và môi trường, tích hợp cổng kiến thức doanh nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="w-full flex-1">{children}</main>
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <a
            href="tel:0862564895"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg"
          >
            Gọi tư vấn
          </a>
          <a
            href="/contact"
            className="rounded-full bg-sky-700 px-4 py-2 text-sm font-bold text-white shadow-lg"
          >
            Gửi yêu cầu
          </a>
        </div>
        <Footer />
      </body>
    </html>
  );
}
