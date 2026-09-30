import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  Building, 
  Trees, 
  KeyRound, 
  ArrowRight, 
  ShieldCheck, 
  BadgePercent, 
  Sparkles,
  Users2,
  PhoneCall
} from 'lucide-react';
import HeroSearch from '@/components/home/HeroSearch';
import PropertyCard from '@/components/property/PropertyCard';
import MortgageCalculator from '@/components/home/MortgageCalculator';
import { mockProperties } from '@/data/mockProperties';

export default function HomePage() {
  const featuredProperties = mockProperties.filter(p => p.isFeatured);
  const recentProperties = mockProperties.slice(0, 6);

  const categories = [
    {
      id: 'house',
      name: 'บ้านเดี่ยว / บ้านแฝด',
      count: '1,240 รายการ',
      icon: Home,
      href: '/properties?category=house',
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'condo',
      name: 'คอนโดมิเนียม',
      count: '3,850 รายการ',
      icon: Building,
      href: '/properties?category=condo',
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      id: 'townhome',
      name: 'ทาวน์โฮม',
      count: '890 รายการ',
      icon: Building2,
      href: '/properties?category=townhome',
      color: 'from-sky-500 to-cyan-700',
    },
    {
      id: 'land',
      name: 'ที่ดินเปล่า',
      count: '420 รายการ',
      icon: Trees,
      href: '/properties?category=land',
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      id: 'rent',
      name: 'อสังหาฯ ให้เช่า',
      count: '2,100 รายการ',
      icon: KeyRound,
      href: '/properties?type=rent',
      color: 'from-amber-500 to-orange-700',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Search Section */}
      <HeroSearch />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. Category Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                เลือกค้นหาตามประเภทอสังหาริมทรัพย์
              </h2>
            </div>
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>ดูทั้งหมด</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-3"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. Featured Properties (ทรัพย์สินเด่นแนะนำ) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Properties</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                ทรัพย์สินเด่น คัดสรรพิเศษเพื่อคุณ
              </h2>
            </div>
            <Link 
              href="/properties?featured=true" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>ดูทรัพย์เด่นทั้งหมด</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* 4. Mortgage Calculator Banner / Section */}
        <section className="space-y-4">
          <MortgageCalculator initialPrice={5500000} />
        </section>

        {/* 5. Recent Properties (ประกาศมาใหม่ล่าสุด) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Latest Listings
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                อสังหาริมทรัพย์มาใหม่ล่าสุด
              </h2>
            </div>
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>ดูประกาศทั้งหมด</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* 6. Why Choose Us (ทำไมต้องเลือกเรา) */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Why Choose SiamEstate
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              มั่นใจทุกขั้นตอนการซื้อ-ขาย-เช่า
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light">
              เราให้บริการด้านอสังหาริมทรัพย์ครบวงจร ด้วยทีมงานมืออาชีพและฐานข้อมูลที่เชื่อถือได้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">ตรวจสอบเอกสารและกรรมสิทธิ์</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                ทุกประกาศผ่านการคัดกรองข้อมูล โฉนดถูกต้อง ชัดเจน ป้องกันปัญหาความเสี่ยงในการทำธุรกรรม
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <BadgePercent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">บริการยื่นสินเชื่อฟรี</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                พันธมิตรกับธนาคารชั้นนำ ให้คำปรึกษาอัตราดอกเบี้ยพิเศษ ช่วยดันเคสให้ผ่านง่ายและเร็วที่สุด
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">พาชมสถานที่จริงแบบ VIP</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                นัดหมายสะดวก มีผู้เชี่ยวชาญร่วมเดินทางพาชมโครงการ พร้อมให้ข้อมูลเชิงลึกเรื่องทำเลและราคา
              </p>
            </div>

          </div>
        </section>

        {/* 7. Call To Action for Sellers / Landlords */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ต้องการฝากขาย หรือปล่อยเช่า อสังหาริมทรัพย์ของคุณ?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl font-light">
              ลงประกาศฟรี เข้าถึงผู้ซื้อและผู้เช่ากว่า 100,000 คนต่อเดือน พร้อมการตลาดออนไลน์รอบด้าน
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              href="/post-listing"
              className="w-full sm:w-auto text-center px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl shadow-md transition-colors"
            >
              ลงประกาศฟรีทันที
            </Link>
            <a
              href="tel:021234567"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-700/60 hover:bg-blue-700 border border-white/20 text-white font-medium rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>โทรปรึกษาทีมงาน</span>
            </a>
          </div>
        </section>

      </div>

    </div>
  );
}
