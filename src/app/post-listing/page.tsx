'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Home, 
  Building, 
  MapPin, 
  DollarSign, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles,
  Phone,
  User,
  ArrowLeft
} from 'lucide-react';
import { PropertyCategory, ListingType } from '@/types/property';

export default function PostListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'house' as PropertyCategory,
    listingType: 'sale' as ListingType,
    price: '',
    province: 'กรุงเทพมหานคร',
    district: '',
    address: '',
    nearStation: '',
    bedrooms: '3',
    bathrooms: '3',
    usableArea: '',
    landArea: '',
    description: '',
    agentName: '',
    agentPhone: '',
    agentLineId: '',
  });

  const availableFacilities = [
    'สระว่ายน้ำส่วนตัว',
    'ฟิตเนส / สโมสร',
    'รปภ. 24 ชม. & CCTV',
    'ที่จอดรถส่วนตัว',
    'ระบบ Smart Home',
    'EV Charger',
    'สวนหย่อม / สนามเด็กเล่น',
    'ใกล้สถานีรถไฟฟ้า BTS/MRT',
  ];

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'รปภ. 24 ชม. & CCTV',
    'ที่จอดรถส่วนตัว'
  ]);

  const toggleFacility = (item: string) => {
    if (selectedFacilities.includes(item)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== item));
    } else {
      setSelectedFacilities([...selectedFacilities, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.agentPhone) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">ลงประกาศสำเร็จ!</h2>
          <p className="text-sm text-slate-600">
            ประกาศของคุณชื่อ <strong>&quot;{formData.title}&quot;</strong> ได้ถูกส่งเข้าสู่ระบบแล้ว ทีมงานจะทำการอนุมัติภายใน 1 ชั่วโมง
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/properties"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm"
            >
              ดูประกาศทั้งหมดในระบบ
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 bg-slate-100 text-slate-700 font-medium rounded-xl text-sm hover:bg-slate-200"
            >
              ลงประกาศรายการใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าแรก</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <PlusCircle className="w-7 h-7 text-blue-600" />
            <span>ลงประกาศ ฝากขาย / ปล่อยเช่า อสังหาริมทรัพย์</span>
          </h1>
          <p className="text-sm text-slate-500">
            กรอกข้อมูลรายละเอียดของอสังหาริมทรัพย์ เพื่อให้ผู้ซื้อและผู้เช่าเข้าถึงได้รวดเร็วที่สุด
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Section 1: ข้อมูลพื้นฐาน */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. ข้อมูลทั่วไปของทรัพย์สิน
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-700">ชื่อหัวข้อประกาศ *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="เช่น คอนโดหรู 2 ห้องนอน วิวแม่น้ำ ใกล้ BTS พร้อมพงษ์"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">ประเภทประกาศ</label>
                <select
                  value={formData.listingType}
                  onChange={(e) => setFormData({ ...formData, listingType: e.target.value as ListingType })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                >
                  <option value="sale">ขาย (For Sale)</option>
                  <option value="rent">ให้เช่า (For Rent)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">ประเภทอสังหาฯ</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PropertyCategory })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                >
                  <option value="house">บ้านเดี่ยว / บ้านแฝด</option>
                  <option value="condo">คอนโดมิเนียม</option>
                  <option value="townhome">ทาวน์โฮม</option>
                  <option value="land">ที่ดินเปล่า</option>
                  <option value="commercial">อาคารพาณิชย์</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">ราคาเสนอขาย / ค่าเช่าต่อเดือน (บาท) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="เช่น 5500000 หรือ 25000"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
              />
            </div>
          </div>

          {/* Section 2: ทำเลที่ตั้ง */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. ที่ตั้งและทำเล
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">จังหวัด</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                >
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="สมุทรปราการ">สมุทรปราการ</option>
                  <option value="นนทบุรี">นนทบุรี</option>
                  <option value="ชลบุรี">ชลบุรี / พัทยา</option>
                  <option value="นครราชสีมา">นครราชสีมา / เขาใหญ่</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">เขต / อำเภอ</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="เช่น วัฒนา, คลองเตย, เมือง"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">ที่อยู่ / ชื่อโครงการ / ซอย</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="เช่น ซอยสุขุมวิท 24"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">สถานีรถไฟฟ้า / จุดสังเกตใกล้เคียง</label>
                <input
                  type="text"
                  value={formData.nearStation}
                  onChange={(e) => setFormData({ ...formData, nearStation: e.target.value })}
                  placeholder="เช่น BTS พร้อมพงษ์ (300 ม.)"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: สเปกและสิ่งอำนวยความสะดวก */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. ขนาดและสิ่งอำนวยความสะดวก
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">ห้องนอน</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">ห้องน้ำ</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">พื้นที่ใช้สอย (ตร.ม.)</label>
                <input
                  type="number"
                  value={formData.usableArea}
                  onChange={(e) => setFormData({ ...formData, usableArea: e.target.value })}
                  placeholder="เช่น 120"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">ขนาดที่ดิน (ตร.วา)</label>
                <input
                  type="number"
                  value={formData.landArea}
                  onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                  placeholder="เช่น 50"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1"
                />
              </div>
            </div>

            {/* Checklist Facilities */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                สิ่งอำนวยความสะดวก
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableFacilities.map((fac) => (
                  <button
                    key={fac}
                    type="button"
                    onClick={() => toggleFacility(fac)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors ${
                      selectedFacilities.includes(fac)
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{fac}</span>
                    {selectedFacilities.includes(fac) && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">รายละเอียดเพิ่มเติม</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="อธิบายจุดเด่นของบ้าน การตกแต่ง ของแถม เงื่อนไขการโอน ฯลฯ"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
              ></textarea>
            </div>
          </div>

          {/* Section 4: ข้อมูลติดต่อผู้ขาย */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. ข้อมูลติดต่อเจ้าของทรัพย์ / ตัวแทน
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">ชื่อผู้ติดต่อ *</label>
                <input
                  type="text"
                  required
                  value={formData.agentName}
                  onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                  placeholder="เช่น คุณเอกชัย"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">เบอร์โทรศัพท์ *</label>
                <input
                  type="tel"
                  required
                  value={formData.agentPhone}
                  onChange={(e) => setFormData({ ...formData, agentPhone: e.target.value })}
                  placeholder="08X-XXX-XXXX"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">LINE ID</label>
                <input
                  type="text"
                  value={formData.agentLineId}
                  onChange={(e) => setFormData({ ...formData, agentLineId: e.target.value })}
                  placeholder="เช่น akachai_estate"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm mt-1 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.005]"
            >
              ยืนยันการลงประกาศฟรี
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
