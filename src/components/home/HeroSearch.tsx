'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, DollarSign, Home, SlidersHorizontal } from 'lucide-react';
import { PropertyCategory, ListingType } from '@/types/property';

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'land'>('all');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [province, setProvince] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (activeTab === 'sale') params.append('type', 'sale');
    if (activeTab === 'rent') params.append('type', 'rent');
    if (activeTab === 'land') params.append('category', 'land');
    else if (category !== 'all') params.append('category', category);

    if (keyword.trim()) params.append('q', keyword.trim());
    if (province !== 'all') params.append('province', province);
    if (priceRange !== 'all') params.append('price', priceRange);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        
        {/* Main Headline */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs sm:text-sm font-medium">
            ✨ ค้นพบอสังหาริมทรัพย์ในฝัน ทำเลเด่น คัดสรรคุณภาพ
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            ค้นหา <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">บ้าน คอนโด ที่ดิน</span> <br className="hidden sm:inline" />
            ที่ตอบโจทย์ไลฟ์สไตล์คุณ
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            แหล่งรวมประกาศ ซื้อ-ขาย-เช่า อสังหาริมทรัพย์ชั้นนำ พร้อมข้อมูลทำเลและเครื่องคำนวณสินเชื่อที่แม่นยำ
          </p>
        </div>

        {/* Search Filter Box */}
        <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20 text-left">
          
          {/* Quick Tabs (ซื้อ / เช่า / ที่ดิน / ทั้งหมด) */}
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => { setActiveTab('all'); setCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('sale'); if (category === 'land') setCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'sale'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              ซื้อ (บ้าน & คอนโด)
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('rent'); if (category === 'land') setCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'rent'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              เช่าอสังหาฯ
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('land'); setCategory('land'); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'land'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              ที่ดินเปล่า
            </button>
          </div>

          {/* Form Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* 1. Keyword / Location Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>คำค้นหา / สถานี BTS</span>
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="เช่น สุขุมวิท, พร้อมพงษ์, ลาดพร้าว..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* 2. Property Category (Hidden if Land tab is selected) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>ประเภทอสังหาฯ</span>
              </label>
              <select
                value={activeTab === 'land' ? 'land' : category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={activeTab === 'land'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <option value="all">ทุกประเภท</option>
                <option value="house">บ้านเดี่ยว / บ้านแฝด</option>
                <option value="condo">คอนโดมิเนียม</option>
                <option value="townhome">ทาวน์โฮม</option>
                <option value="land">ที่ดินเปล่า</option>
                <option value="commercial">อาคารพาณิชย์</option>
              </select>
            </div>

            {/* 3. Province / Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>จังหวัด / พื้นที่</span>
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                <option value="all">ทุกจังหวัด</option>
                <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                <option value="สมุทรปราการ">สมุทรปราการ</option>
                <option value="นนทบุรี">นนทบุรี</option>
                <option value="ปทุมธานี">ปทุมธานี</option>
                <option value="ชลบุรี">ชลบุรี / พัทยา</option>
                <option value="เชียงใหม่">เชียงใหม่</option>
                <option value="นครราชสีมา">นครราชสีมา / เขาใหญ่</option>
                <option value="ภูเก็ต">ภูเก็ต</option>
              </select>
            </div>

            {/* 4. Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                <span>ช่วงราคา</span>
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                <option value="all">ทุกระดับราคา</option>
                {activeTab === 'rent' ? (
                  <>
                    <option value="0-15000">ต่ำกว่า 15,000 บาท/ด.</option>
                    <option value="15000-30000">15,000 - 30,000 บาท/ด.</option>
                    <option value="30000-50000">30,000 - 50,000 บาท/ด.</option>
                    <option value="50000-999999999">มากกว่า 50,000 บาท/ด.</option>
                  </>
                ) : (
                  <>
                    <option value="0-3000000">ไม่เกิน 3 ล้านบาท</option>
                    <option value="3000000-7000000">3 - 7 ล้านบาท</option>
                    <option value="7000000-15000000">7 - 15 ล้านบาท</option>
                    <option value="15000000-999999999">มากกว่า 15 ล้านบาท</option>
                  </>
                )}
              </select>
            </div>

            {/* Submit Button (Full Width on Mobile, spanning cols on desktop) */}
            <div className="sm:col-span-2 lg:col-span-4 mt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>ค้นหาอสังหาริมทรัพย์</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
