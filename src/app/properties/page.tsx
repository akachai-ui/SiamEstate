'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw,
  Building,
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Check
} from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import { mockProperties } from '@/data/mockProperties';
import { PropertyCategory, ListingType } from '@/types/property';
import { formatPrice, getCategoryLabel } from '@/lib/formatters';

function PropertiesContent() {
  const searchParams = useSearchParams();

  // Search parameters from URL
  const initialCategory = searchParams.get('category') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialProvince = searchParams.get('province') || 'all';

  // Filter States
  const [keyword, setKeyword] = useState(initialQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const [listingType, setListingType] = useState<string>(initialType);
  const [province, setProvince] = useState<string>(initialProvince);
  const [bedrooms, setBedrooms] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(50000000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Reset Filters
  const resetFilters = () => {
    setKeyword('');
    setCategory('all');
    setListingType('all');
    setProvince('all');
    setBedrooms('all');
    setPriceMax(50000000);
    setSortBy('newest');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((item) => {
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDistrict = item.district.toLowerCase().includes(q);
        const matchProvince = item.province.toLowerCase().includes(q);
        const matchStation = item.nearStation?.toLowerCase().includes(q);
        if (!matchTitle && !matchDistrict && !matchProvince && !matchStation) return false;
      }

      if (category !== 'all' && item.category !== category) return false;
      if (listingType !== 'all' && item.listingType !== listingType) return false;
      if (province !== 'all' && item.province !== province) return false;

      if (bedrooms !== 'all') {
        const beds = parseInt(bedrooms);
        if (beds === 4 && (item.bedrooms || 0) < 4) return false;
        if (beds !== 4 && item.bedrooms !== beds) return false;
      }

      if (item.price > priceMax) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [keyword, category, listingType, province, bedrooms, priceMax, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ค้นหาประกาศอสังหาริมทรัพย์
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            พบทั้งหมด <span className="font-semibold text-blue-600">{filteredProperties.length}</span> รายการ
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Quick Search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="ค้นหาชื่อโครงการ, ทำเล, สถานี..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>ตัวกรองละเอียด</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
              >
                <option value="newest">ล่าสุด</option>
                <option value="price-asc">ราคา: ต่ำ-สูง</option>
                <option value="price-desc">ราคา: สูง-ต่ำ</option>
              </select>
            </div>

            {/* View Mode Buttons (Hidden on mobile) */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span>ตัวกรองค้นหา</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>รีเซ็ต</span>
                </button>
              </div>

              {/* Listing Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  ประเภทประกาศ
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {['all', 'sale', 'rent'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setListingType(type)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                        listingType === type
                          ? 'bg-white text-blue-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type === 'all' ? 'ทั้งหมด' : type === 'sale' ? 'ขาย' : 'เช่า'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  ประเภทอสังหาฯ
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800"
                >
                  <option value="all">ทุกประเภท</option>
                  <option value="house">บ้านเดี่ยว / บ้านแฝด</option>
                  <option value="condo">คอนโดมิเนียม</option>
                  <option value="townhome">ทาวน์โฮม</option>
                  <option value="land">ที่ดินเปล่า</option>
                  <option value="commercial">อาคารพาณิชย์</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  จังหวัด / พื้นที่
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800"
                >
                  <option value="all">ทุกจังหวัด</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="สมุทรปราการ">สมุทรปราการ</option>
                  <option value="นนทบุรี">นนทบุรี</option>
                  <option value="ชลบุรี">ชลบุรี / พัทยา</option>
                  <option value="นครราชสีมา">นครราชสีมา / เขาใหญ่</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  จำนวนห้องนอน
                </label>
                <div className="flex gap-1.5">
                  {['all', '1', '2', '3', '4'].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setBedrooms(bed)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        bedrooms === bed
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {bed === 'all' ? 'ทุกแบบ' : bed === '4' ? '4+' : bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">ราคาสูงสุด</span>
                  <span className="font-bold text-blue-600">{formatPrice(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={50000000}
                  step={500000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
              </div>

            </div>
          </aside>

          {/* Results Grid / List */}
          <main className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">ไม่พบอสังหาริมทรัพย์ตามเงื่อนไข</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  ลองปรับเปลี่ยนคำค้นหา หรือกดรีเซ็ตตัวกรองเพื่อค้นหาใหม่
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-blue-600 text-white font-medium text-xs rounded-xl"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            ) : (
              <div className={`grid gap-5 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer (Bottom Sheet on Mobile) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div 
            className="bg-white w-full max-h-[85vh] rounded-t-3xl p-5 overflow-y-auto space-y-5 animate-in slide-in-from-bottom"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                <span>ตัวกรองค้นหาละเอียด</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Controls inside Drawer */}
            <div className="space-y-4 text-left">
              
              {/* Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">ประเภทประกาศ</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {['all', 'sale', 'rent'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setListingType(type)}
                      className={`py-2 text-xs font-semibold rounded-lg ${
                        listingType === type ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      {type === 'all' ? 'ทั้งหมด' : type === 'sale' ? 'ขาย' : 'เช่า'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">ประเภทอสังหาฯ</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="all">ทุกประเภท</option>
                  <option value="house">บ้านเดี่ยว / บ้านแฝด</option>
                  <option value="condo">คอนโดมิเนียม</option>
                  <option value="townhome">ทาวน์โฮม</option>
                  <option value="land">ที่ดินเปล่า</option>
                </select>
              </div>

              {/* Province */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">จังหวัด</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="all">ทุกจังหวัด</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="สมุทรปราการ">สมุทรปราการ</option>
                  <option value="นนทบุรี">นนทบุรี</option>
                  <option value="ชลบุรี">ชลบุรี / พัทยา</option>
                  <option value="นครราชสีมา">นครราชสีมา / เขาใหญ่</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">จำนวนห้องนอน</label>
                <div className="flex gap-1.5">
                  {['all', '1', '2', '3', '4'].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setBedrooms(bed)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold ${
                        bedrooms === bed ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {bed === 'all' ? 'ทุกแบบ' : bed === '4' ? '4+' : bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700">ราคาสูงสุด</span>
                  <span className="font-bold text-blue-600">{formatPrice(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={50000000}
                  step={500000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-3 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
              >
                ล้างตัวกรอง
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
              >
                ดูผลลัพธ์ ({filteredProperties.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">กำลังโหลดรายการอสังหาฯ...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
