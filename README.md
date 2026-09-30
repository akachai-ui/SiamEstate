# 🏡 SiamEstate - Real Estate Web Application

แพลตฟอร์มเว็บไซต์สำหรับซื้อ-ขาย-เช่า อสังหาริมทรัพย์ (บ้านเดี่ยว, คอนโดมิเนียม, ทาวน์โฮม, ที่ดิน) ครบวงจร พัฒนาด้วย **Next.js 16 (App Router), TypeScript, Tailwind CSS** พร้อมดีไซน์แบบ **Mobile First Responsive** รองรับการใช้งานบนสมาร์ทโฟน 100%

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 1. 🔍 ระบบค้นหาและตัวกรองละเอียด (Search & Filter)
- ค้นหาด่วนตามคำค้น, ชื่อโครงการ, เขต/จังหวัด หรือสถานีรถไฟฟ้า (BTS / MRT)
- กรองตามประเภทอสังหาฯ (บ้าน, คอนโด, ทาวน์โฮม, ที่ดิน, อาคารพาณิชย์)
- กรองตามประเภทประกาศ (ขาย / เช่า)
- กรองตามจำนวนห้องนอน (1, 2, 3, 4+ ห้องนอน)
- สไลเดอร์ปรับช่วงราคา (Price Range Slider)
- รองรับมุมมองแบบตาราง (Grid View) และรายการ (List View)
- Mobile Filter Drawer (Bottom Sheet) ใช้งานง่ายบนมือถือ

### 2. 🏠 หน้ารายละเอียดทรัพย์สิน (Property Details)
- แกลเลอรีรูปภาพความละเอียดสูง พร้อมแถบรูปภาพขนาดย่อ (Thumbnails)
- สเปกข้อมูลจำเพาะ (พื้นที่ใช้สอย ตร.ม., ขนาดที่ดิน ตร.วา/ไร่, ห้องนอน, ห้องน้ำ, ที่จอดรถ)
- แท็กสิ่งอำนวยความสะดวกและระบบความปลอดภัย
- แถบลอยสำหรับสมาร์ทโฟน (Sticky Mobile Action Bar) กดโทรสายด่วน หรือ แชท LINE ได้ทันที
- ฟอร์มนัดหมายเข้าชมสถานที่จริง (Schedule a Tour Form)
- รายการอสังหาริมทรัพย์ที่คล้ายกัน (Similar Properties)

### 3. 🧮 โปรแกรมคำนวณสินเชื่อบ้าน (Mortgage Loan Calculator)
- คำนวณค่างวดผ่อนต่อเดือนแบบลดต้นลดดอก (Annuity Formula) แบบ Real-time
- ปรับราคาบ้าน, สัดส่วนเงินดาวน์ (0% - 25%), อัตราดอกเบี้ย (% ต่อปี) และระยะเวลาผ่อน (10 - 35 ปี)
- สรุปวงเงินกู้สุทธิ, ดอกเบี้ยรวมตลอดสัญญา และยอดชำระรวมทั้งหมด
- ให้คำแนะนำการเตรียมตัวกู้ และสรุปค่าใช้จ่ายวันโอนกรรมสิทธิ์

### 4. ➕ หน้าลงประกาศฟรี (Post Listing)
- ฟอร์ม 4 ขั้นตอนสำหรับเจ้าของทรัพย์และตัวแทน (ข้อมูลทั่วไป, ทำเล, สเปก/สิ่งอำนวยความสะดวก, ข้อมูลติดต่อ)
- ระบบจำลองการส่งข้อมูลและแสดงสถานะสำเร็จ

### 5. 🛡️ ระบบหลังบ้านสำหรับแอดมิน (Admin Management Portal)
- แดชบอร์ดสรุปจำนวนประกาศ, มูลค่าทรัพย์สินรวม, ประกาศสถานะพร้อมขาย และยอด Leads
- ตารางจัดการประกาศ: แก้ไขสถานะแบบ Real-time (`Available`, `Reserved`, `Sold`) และปุ่มลบประกาศ
- ตารางรายชื่อลูกค้าที่ขอนัดดูบ้าน (Customer Leads) พร้อมเบอร์โทรและวันเวลานัดหมาย

### 6. 📱 Mobile First & App-like Navigation
- แถบเมนูด้านล่าง (Bottom Dock Navigation) เลียนแบบ Native Mobile App
- Gesture & Touch friendly

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (Prompt)

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รัน Development Server
```bash
npm run dev
```

เปิดเว็บเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) หรือ [http://localhost:3001](http://localhost:3001)

### 3. Build สำหรับ Production
```bash
npm run build
npm run start
```

---

## 📂 โครงสร้างโฟลเดอร์ (Project Structure)

```
src/
├── app/                      # Next.js App Router Pages
│   ├── layout.tsx            # Global Layout (Navbar, Footer, MobileNav)
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global Styles
│   ├── properties/           # Search & Filter Page & Detail [id]
│   ├── calculator/           # Mortgage Calculator Page
│   ├── post-listing/         # Post Listing Page
│   └── admin/                # Admin Dashboard
├── components/               # Reusable React Components
│   ├── layout/               # Navbar, Footer, MobileNav
│   ├── home/                 # HeroSearch, MortgageCalculator
│   └── property/             # PropertyCard
├── data/                     # Mock Real Estate Data
├── lib/                      # Helper & Formatting Functions
└── types/                    # TypeScript Type Definitions
```

---

## 📄 License
MIT License © 2026 SiamEstate
