'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Percent, Calendar, DollarSign, PieChart, ShieldCheck } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({ initialPrice = 5000000 }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(30);

  // คำนวณเงินดาวน์ และวงเงินกู้
  const downPaymentAmount = useMemo(() => {
    return (propertyPrice * downPaymentPercent) / 100;
  }, [propertyPrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return propertyPrice - downPaymentAmount;
  }, [propertyPrice, downPaymentAmount]);

  // คำนวณค่างวดต่อเดือนแบบลดต้นลดดอก (Annuity Formula)
  const calculation = useMemo(() => {
    if (loanAmount <= 0) return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanPeriodYears * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / totalMonths;
      return {
        monthlyPayment,
        totalPayment: loanAmount,
        totalInterest: 0,
      };
    }

    // Formula: M = P * [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
    const x = Math.pow(1 + monthlyRate, totalMonths);
    const monthlyPayment = (loanAmount * (monthlyRate * x)) / (x - 1);
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, interestRate, loanPeriodYears]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            โปรแกรมคำนวณเงินกู้และสินเชื่อบ้าน
          </h2>
          <p className="text-xs text-slate-500">
            วางแผนคำนวณค่างวดผ่อนต่อเดือน ดอกเบี้ย และยอดชำระรวมแบบ Real-time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. ราคาอสังหาริมทรัพย์ */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-semibold text-slate-700">ราคาบ้าน / คอนโด</label>
              <span className="font-bold text-blue-600 text-base">{formatPrice(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={50000000}
              step={100000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>฿500,000</span>
              <span>฿50,000,000+</span>
            </div>
          </div>

          {/* 2. เงินดาวน์ (%) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-semibold text-slate-700">เงินดาวน์ ({downPaymentPercent}%)</label>
              <span className="font-medium text-slate-600">{formatPrice(downPaymentAmount)}</span>
            </div>
            <div className="flex gap-2">
              {[0, 5, 10, 15, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    downPaymentPercent === pct
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* 3. ดอกเบี้ย และ ระยะเวลาผ่อน */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>อัตราดอกเบี้ยเฉลี่ย (% ต่อปี)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="15"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>ระยะเวลาผ่อน (ปี)</span>
              </label>
              <select
                value={loanPeriodYears}
                onChange={(e) => setLoanPeriodYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900"
              >
                <option value={10}>10 ปี (120 งวด)</option>
                <option value={15}>15 ปี (180 งวด)</option>
                <option value={20}>20 ปี (240 งวด)</option>
                <option value={25}>25 ปี (300 งวด)</option>
                <option value={30}>30 ปี (360 งวด)</option>
                <option value={35}>35 ปี (420 งวด)</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
              ประมาณการค่างวดผ่อนชำระ
            </span>
            <div className="mt-2 mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                ฿{calculation.monthlyPayment.toLocaleString()}
              </span>
              <span className="text-xs text-slate-300 ml-1">/ เดือน</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-700 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>วงเงินขอกู้สุทธิ:</span>
                <span className="font-semibold text-white">฿{loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>ดอกเบี้ยรวมตลอดสัญญา:</span>
                <span className="font-semibold text-amber-400">฿{calculation.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>ยอดชำระเงินรวมทั้งหมด:</span>
                <span className="font-semibold text-white">฿{calculation.totalPayment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>เป็นตัวเลขประมาณการเบื้องต้น เงื่อนไขดอกเบี้ยขึ้นอยู่กับแต่ละธนาคาร</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
