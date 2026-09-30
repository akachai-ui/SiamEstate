'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, CheckCircle2, HelpCircle, ArrowLeft, ShieldAlert, Sparkles, Building2 } from 'lucide-react';
import MortgageCalculator from '@/components/home/MortgageCalculator';

export default function CalculatorPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb & Header */}
        <div className="space-y-3 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าแรก</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            โปรแกรมคำนวณสินเชื่อบ้าน & คอนโด
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            วางแผนทางการเงินก่อนตัดสินใจซื้อบ้าน คำนวณค่างวดผ่อนชำระต่อเดือน วงเงินกู้สูงสุด และดอกเบี้ยรวมอย่างแม่นยำ
          </p>
        </div>

        {/* Interactive Calculator */}
        <MortgageCalculator initialPrice={6000000} />

        {/* Tips & Knowledge Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-base">เทคนิคการเตรียมตัวกู้บ้านให้ผ่านฉลุย</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>ภาระหนี้ไม่ควรเกิน 40-50%</strong> ของรายได้สุทธิรวมต่อเดือน (DSR)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>รักษาประวัติเครดิตบูโร</strong> จ่ายบัตรเครดิตตรงเวลา ไม่มียอดค้างชำระ</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>เดินบัญชีสม่ำเสมอ (Statement)</strong> มีเงินหมุนเวียนต่อเนื่องย้อนหลังอย่างน้อย 6 เดือน</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-600">
              <Building2 className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-base">ค่าใช้จ่ายแฝงที่ต้องเตรียมในวันโอน</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>ค่าธรรมเนียมการโอนกรรมสิทธิ์</strong> 2% ของราคาประเมิน (มักแบ่งจ่ายคนละครึ่ง)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>ค่าจดจำนอง</strong> 1% ของวงเงินกู้ (กรณีกู้ธนาคาร)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>ค่าประกันอัคคีภัย / ค่าส่วนกลางล่วงหน้า 1-2 ปี</strong></span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
