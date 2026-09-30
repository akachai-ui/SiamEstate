export type PropertyCategory = 
  | 'house'      // บ้านเดี่ยว / บ้านแฝด
  | 'condo'      // คอนโดมิเนียม
  | 'townhome'   // ทาวน์โฮม / ทาวน์เฮ้าส์
  | 'land'       // ที่ดิน
  | 'commercial';// อาคารพาณิชย์ / ตึกแถว

export type ListingType = 'sale' | 'rent'; // ขาย หรือ เช่า

export type PropertyStatus = 'available' | 'reserved' | 'sold'; // ว่าง / จองแล้ว / ขายแล้ว

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isCover?: boolean;
}

export interface PropertyFacility {
  id: string;
  name: string;
  icon?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  listingType: ListingType;
  category: PropertyCategory;
  status: PropertyStatus;
  isFeatured?: boolean;
  
  // ที่อยู่และทำเล
  address: string;
  subdistrict?: string; // ตำบล/แขวง
  district: string;     // อำเภอ/เขต
  province: string;     // จังหวัด
  postalCode?: string;
  nearStation?: string; // เช่น BTS อโศก, MRT สุขุมวิท
  
  // สเปกตัวบ้าน/ห้อง
  bedrooms?: number;     // ห้องนอน (ถ้าเป็นที่ดินอาจไม่มี)
  bathrooms?: number;    // ห้องน้ำ
  usableArea?: number;   // พื้นที่ใช้สอย (ตร.ม.)
  landArea?: number;     // ขนาดที่ดิน (ตร.วา หรือ ไร่-งาน-วา)
  landAreaUnit?: string; // หน่วยที่ดิน เช่น ตร.วา / ไร่
  floor?: number;        // ชั้นที่ (กรณีคอนโด)
  totalFloors?: number;  // จำนวนชั้นทั้งหมด
  parkingSpaces?: number;// ที่จอดรถ
  
  // สื่อและสิ่งอำนวยความสะดวก
  images: PropertyImage[];
  facilities: string[];
  
  // ข้อมูลติดต่อและวันที่ลงประกาศ
  agentName: string;
  agentPhone: string;
  agentLineId?: string;
  createdAt: string;
}

export interface SearchFilterState {
  keyword: string;
  listingType: ListingType | 'all';
  category: PropertyCategory | 'all';
  province: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
}
