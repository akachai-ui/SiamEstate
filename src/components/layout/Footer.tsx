import React from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Globe, MessageSquare, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SiamEstate
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              ศูนย์รวมประกาศ ซื้อ-ขาย-เช่า บ้านเดี่ยว คอนโดมิเนียม ทาวน์โฮม และที่ดินทำเลศักยภาพทั่วประเทศไทย บริการด้วยความจริงใจ พร้อมคำปรึกษาด้านสินเชื่อครบวงจร
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-blue-400 font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>LINE: @siamestate</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 font-medium">
                <Globe className="w-3.5 h-3.5" />
                <span>siamestate.com</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              ประเภทอสังหาฯ
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?category=house" className="hover:text-white transition-colors">
                  บ้านเดี่ยว / บ้านแฝด
                </Link>
              </li>
              <li>
                <Link href="/properties?category=condo" className="hover:text-white transition-colors">
                  คอนโดมิเนียม
                </Link>
              </li>
              <li>
                <Link href="/properties?category=townhome" className="hover:text-white transition-colors">
                  ทาวน์โฮม
                </Link>
              </li>
              <li>
                <Link href="/properties?category=land" className="hover:text-white transition-colors">
                  ที่ดินเปล่า
                </Link>
              </li>
              <li>
                <Link href="/properties?type=rent" className="hover:text-white transition-colors">
                  อสังหาฯ ให้เช่า
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              ทำเลยอดนิยม
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?search=สุขุมวิท" className="hover:text-white transition-colors">
                  สุขุมวิท - ทองหล่อ
                </Link>
              </li>
              <li>
                <Link href="/properties?search=สาทร" className="hover:text-white transition-colors">
                  สาทร - สีลม
                </Link>
              </li>
              <li>
                <Link href="/properties?search=พระราม9" className="hover:text-white transition-colors">
                  พระราม 9 - รัชดา
                </Link>
              </li>
              <li>
                <Link href="/properties?search=บางนา" className="hover:text-white transition-colors">
                  บางนา - สุวรรณภูมิ
                </Link>
              </li>
              <li>
                <Link href="/properties?search=เขาใหญ่" className="hover:text-white transition-colors">
                  เขาใหญ่ - ปากช่อง
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              ติดต่อเรา
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>888 อาคารสยามทาวเวอร์ ชั้น 18 ถ.สุขุมวิท กรุงเทพฯ 10110</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>02-123-4567, 081-234-5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>contact@siamestate.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SiamEstate Co., Ltd. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-400">เงื่อนไขการใช้งาน</Link>
            <Link href="/privacy" className="hover:text-slate-400">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/admin" className="hover:text-slate-400 text-blue-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
