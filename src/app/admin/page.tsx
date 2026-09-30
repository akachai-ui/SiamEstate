'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  Users, 
  DollarSign, 
  Eye, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  Search,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Filter
} from 'lucide-react';
import { mockProperties } from '@/data/mockProperties';
import { formatPrice, getCategoryLabel, getListingTypeBadge } from '@/lib/formatters';
import { Property, PropertyStatus } from '@/types/property';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries'>('properties');

  // Mock Inquiries / Leads
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-01',
      customerName: 'คุณธนากร พัฒนกิจ',
      phone: '089-111-2233',
      propertyTitle: 'คฤหาสน์หรูสไตล์โมเดิร์น พร้อมสระว่ายน้ำส่วนตัว',
      date: '2026-09-30',
      time: '14:00',
      status: 'pending',
    },
    {
      id: 'inq-02',
      customerName: 'คุณพิมพ์ใจ วิทยาศักดิ์',
      phone: '081-444-5566',
      propertyTitle: 'คอนโดหรูวิวแม่น้ำเจ้าพระยา ชั้นสูง 45+',
      date: '2026-09-29',
      time: '11:00',
      status: 'contacted',
    },
    {
      id: 'inq-03',
      customerName: 'คุณเกรียงไกร ล้ำเลิศ',
      phone: '085-777-8899',
      propertyTitle: 'ที่ดินแปลงสวยวิวเขาใหญ่ 360 องศา',
      date: '2026-09-28',
      time: '10:00',
      status: 'contacted',
    },
  ]);

  // Handle Status Change
  const updateStatus = (id: string, newStatus: PropertyStatus) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  // Handle Delete
  const deleteProperty = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const filteredProps = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = properties.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              ระบบจัดการอสังหาริมทรัพย์หลังบ้าน
            </h1>
            <p className="text-xs text-slate-500">จัดการประกาศ, สถานะการขาย และรายชื่อลูกค้าติดต่อชมโครงการ</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/post-listing"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>เพิ่มประกาศใหม่</span>
            </Link>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">ประกาศทั้งหมด</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{properties.length} รายการ</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">มูลค่าทรัพย์สินรวม</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">฿{(totalValue / 1000000).toFixed(1)}M</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">คำขอนัดชมโครงการ (Leads)</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{inquiries.length} รายการ</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">สถานะพร้อมขาย (Available)</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {properties.filter(p => p.status === 'available').length} รายการ
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
              activeTab === 'properties'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รายการประกาศอสังหาฯ ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            คำขอนัดชม & การติดต่อ ({inquiries.length})
          </button>
        </div>

        {/* Content Section 1: Properties Table */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            
            <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาตามชื่อ หรือทำเล..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white"
                />
              </div>
              <span className="text-xs text-slate-400">
                แสดงผล {filteredProps.length} จากทั้งหมด {properties.length} รายการ
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">อสังหาริมทรัพย์</th>
                    <th className="py-3.5 px-4">หมวดหมู่</th>
                    <th className="py-3.5 px-4">ราคา</th>
                    <th className="py-3.5 px-4">สถานะ</th>
                    <th className="py-3.5 px-4">ผู้ดูแล</th>
                    <th className="py-3.5 px-6 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredProps.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                      
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img
                          src={prop.images[0]?.url}
                          alt={prop.title}
                          className="w-14 h-11 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <Link href={`/properties/${prop.id}`} className="font-semibold text-slate-900 hover:text-blue-600 truncate block">
                            {prop.title}
                          </Link>
                          <span className="text-xs text-slate-400">{prop.district}, {prop.province}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-medium text-slate-700">
                        {getCategoryLabel(prop.category)}
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-900 text-xs">
                        {formatPrice(prop.price, prop.listingType)}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={prop.status}
                          onChange={(e) => updateStatus(prop.id, e.target.value as PropertyStatus)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-hidden ${
                            prop.status === 'available'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : prop.status === 'reserved'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <option value="available">ว่าง (Available)</option>
                          <option value="reserved">จองแล้ว (Reserved)</option>
                          <option value="sold">ขายแล้ว (Sold)</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-xs text-slate-600">
                        {prop.agentName}
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <Link
                          href={`/properties/${prop.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 inline-block"
                          title="ดูหน้าเว็บ"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteProperty(prop.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 inline-block"
                          title="ลบประกาศ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Content Section 2: Inquiries / Leads Table */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">ชื่อลูกค้า</th>
                    <th className="py-3.5 px-4">เบอร์โทรติดต่อ</th>
                    <th className="py-3.5 px-6">ทรัพย์สินที่สนใจ</th>
                    <th className="py-3.5 px-4">วัน-เวลานัดหมาย</th>
                    <th className="py-3.5 px-6 text-right">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6 font-semibold text-slate-900">{inq.customerName}</td>
                      <td className="py-4 px-4 text-xs font-mono text-blue-600">
                        <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-700 max-w-xs truncate">{inq.propertyTitle}</td>
                      <td className="py-4 px-4 text-xs text-slate-500">
                        {inq.date} ({inq.time} น.)
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          inq.status === 'contacted'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {inq.status === 'contacted' ? 'ติดต่อแล้ว' : 'รอดำเนินการ'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
