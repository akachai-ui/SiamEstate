'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Search, Heart, PlusCircle, Phone, Menu, X, Building2 } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                SiamEstate
              </span>
              <span className="block text-[11px] font-medium text-blue-600 -mt-1 tracking-wider uppercase">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              href="/" 
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              หน้าแรก
            </Link>
            <Link 
              href="/properties?type=sale&category=house" 
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              ซื้อบ้าน
            </Link>
            <Link 
              href="/properties?type=sale&category=condo" 
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              ซื้อคอนโด
            </Link>
            <Link 
              href="/properties?category=land" 
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              ที่ดิน
            </Link>
            <Link 
              href="/properties?type=rent" 
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              เช่าอสังหาฯ
            </Link>
            <Link 
              href="/calculator" 
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              คำนวณสินเชื่อ
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:021234567" 
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>02-123-4567</span>
            </a>

            <Link
              href="/post-listing"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-600/30 hover:shadow-md transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ลงประกาศฟรี</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            หน้าแรก
          </Link>
          <Link
            href="/properties?type=sale&category=house"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            ซื้อบ้าน
          </Link>
          <Link
            href="/properties?type=sale&category=condo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            ซื้อคอนโด
          </Link>
          <Link
            href="/properties?category=land"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            ที่ดิน
          </Link>
          <Link
            href="/properties?type=rent"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            เช่าอสังหาฯ
          </Link>
          <Link
            href="/calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            คำนวณสินเชื่อ
          </Link>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/post-listing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-blue-600 text-white font-medium rounded-xl"
            >
              ลงประกาศฟรี
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
