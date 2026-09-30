'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  Share2, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Layers,
  Car
} from 'lucide-react';
import { mockProperties } from '@/data/mockProperties';
import { formatPrice, getCategoryLabel, getListingTypeBadge } from '@/lib/formatters';
import MortgageCalculator from '@/components/home/MortgageCalculator';
import PropertyCard from '@/components/property/PropertyCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const property = mockProperties.find(p => p.id === resolvedParams.id || p.slug === resolvedParams.id);

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">ไม่พบข้อมูลอสังหาริมทรัพย์นี้</h1>
        <p className="text-slate-500 text-sm">รายการนี้อาจถูกปิดการขายหรือถูกลบออกจากระบบแล้ว</p>
        <Link href="/properties" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium">
          กลับไปค้นหาทรัพย์อื่น
        </Link>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('10:00');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');

  const listingBadge = getListingTypeBadge(property.listingType);
  const similarProperties = mockProperties.filter(p => p.id !== property.id && p.category === property.category).slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone || !tourDate) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-4 sm:py-8 pb-28 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปหน้ารวมประกาศ</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-red-500 shadow-xs"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'บันทึกแล้ว' : 'บันทึกรายการ'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('คัดลอกลิงก์ประกาศเรียบร้อยแล้ว!');
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">แชร์</span>
            </button>
          </div>
        </div>

        {/* 1. Image Gallery Section */}
        <div className="space-y-3">
          <div className="relative aspect-16/10 sm:aspect-21/9 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
            <img
              src={property.images[activeImageIndex]?.url || property.images[0]?.url}
              alt={property.images[activeImageIndex]?.alt || property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            
            <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
              <span className={`px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg shadow-md ${listingBadge.bgClass}`}>
                {listingBadge.text}
              </span>
              <span className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white rounded-lg">
                {getCategoryLabel(property.category)}
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {property.images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 snap-x">
              {property.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 sm:w-32 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all snap-start ${
                    activeImageIndex === idx
                      ? 'border-blue-600 scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Title & Price Header */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {property.district}, {property.province}
                  </span>
                  <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 leading-snug">
                    {property.title}
                  </h1>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-xs text-slate-400 font-medium">ราคาพิเศษ</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                  {property.usableArea && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      ฿{Math.round(property.price / property.usableArea).toLocaleString()} / ตร.ม.
                    </div>
                  )}
                </div>
              </div>

              {/* Location Tag */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{property.address}</span>
                </div>
                {property.nearStation && (
                  <div className="inline-flex items-center text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    🚇 {property.nearStation}
                  </div>
                )}
              </div>
            </div>

            {/* Key Specs Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3 sm:mb-4">จุดเด่นและข้อมูลจำเพาะ</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                
                {property.bedrooms !== undefined && (
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-slate-400">ห้องนอน</div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{property.bedrooms} ห้อง</div>
                    </div>
                  </div>
                )}

                {property.bathrooms !== undefined && (
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Bath className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-slate-400">ห้องน้ำ</div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{property.bathrooms} ห้อง</div>
                    </div>
                  </div>
                )}

                {property.usableArea && (
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-slate-400">พื้นที่ใช้สอย</div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{property.usableArea} ตร.ม.</div>
                    </div>
                  </div>
                )}

                {property.landArea && (
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-slate-400">ขนาดที่ดิน</div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{property.landArea} {property.landAreaUnit || 'ตร.วา'}</div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">รายละเอียดเพิ่มเติม</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                {property.description}
              </p>
            </div>

            {/* Facilities */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">สิ่งอำนวยความสะดวก & จุดเด่นโครงการ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-xs sm:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <MortgageCalculator initialPrice={property.price} />

          </div>

          {/* Right Column: Contact Agent (Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-5 sticky top-28">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                  {property.agentName.substring(3, 5)}
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-blue-600 uppercase">ตัวแทนผู้ดูแลทรัพย์</span>
                  <h3 className="font-bold text-slate-900 text-sm">{property.agentName}</h3>
                  <p className="text-[11px] text-slate-400">ผู้เชี่ยวชาญทำเล {property.district}</p>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${property.agentPhone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>โทรสายด่วน</span>
                </a>
                <a
                  href={`https://line.me/ti/p/~${property.agentLineId || 'siamestate'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>แชท LINE</span>
                </a>
              </div>

              {/* Booking Tour Form */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>นัดหมายเข้าชมสถานที่จริง</span>
                </h4>

                {bookingSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <h5 className="font-bold text-emerald-900 text-xs">ส่งคำขอนัดหมายสำเร็จ!</h5>
                    <p className="text-[11px] text-emerald-700">
                      เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันเวลานัดหมายโดยเร็วที่สุด
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="ชื่อของคุณ *"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        placeholder="เบอร์โทรศัพท์ติดต่อ *"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                      <select
                        value={tourTime}
                        onChange={(e) => setTourTime(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      >
                        <option value="10:00">10:00 น.</option>
                        <option value="13:00">13:00 น.</option>
                        <option value="15:00">15:00 น.</option>
                        <option value="17:00">17:00 น.</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm"
                    >
                      ยืนยันการนัดชมโครงการ
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* 3. Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-4">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
              อสังหาริมทรัพย์ประเภทเดียวกันที่คุณอาจสนใจ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sticky Mobile Floating Action Bar for Fast Contact on Smartphones */}
      <div className="md:hidden fixed bottom-14 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-xl flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] text-slate-400 font-medium">ราคาพิเศษ</div>
          <div className="text-base font-extrabold text-blue-600 truncate">
            {formatPrice(property.price, property.listingType)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${property.agentPhone}`}
            className="flex items-center gap-1 px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>โทรเลย</span>
          </a>
          <a
            href={`https://line.me/ti/p/~${property.agentLineId || 'siamestate'}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3.5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LINE</span>
          </a>
        </div>
      </div>

    </div>
  );
}
