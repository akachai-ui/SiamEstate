import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "SiamEstate | แพลตฟอร์ม ซื้อ-ขาย-เช่า บ้าน คอนโด ที่ดิน คุณภาพ",
  description: "ค้นหาบ้านเดี่ยว คอนโดมิเนียม ทาวน์โฮม และที่ดินทำเลศักยภาพ พร้อมเครื่องมือคำนวณสินเชื่อบ้านครบวงจร",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white pb-16 md:pb-0" 
        style={{ fontFamily: "'Prompt', system-ui, -apple-system, sans-serif" }}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
