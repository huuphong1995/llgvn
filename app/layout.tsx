import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
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
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} flex min-h-full flex-col bg-slate-50 text-slate-900`}>
        <Navbar />
        <main className="w-full flex-1 pb-28 md:pb-0">{children}</main>
        <FloatingContactButtons />
        <Footer />
      </body>
    </html>
  );
}
