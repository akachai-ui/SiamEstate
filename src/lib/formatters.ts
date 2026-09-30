import { ListingType, PropertyCategory } from '@/types/property';

// จัดรูปแบบตัวเลขเป็นสกุลเงินบาท เช่น 38,500,000 บาท
export function formatPrice(price: number, listingType?: ListingType): string {
  const formatted = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(price);

  if (listingType === 'rent') {
    return `${formatted} / เดือน`;
  }
  return formatted;
}

// แปลง Category ภาษาอังกฤษเป็นชื่อภาษาไทย
export function getCategoryLabel(category: PropertyCategory): string {
  const labels: Record<PropertyCategory, string> = {
    house: 'บ้านเดี่ยว / บ้านแฝด',
    condo: 'คอนโดมิเนียม',
    townhome: 'ทาวน์โฮม',
    land: 'ที่ดิน',
    commercial: 'อาคารพาณิชย์',
  };
  return labels[category] || category;
}

// แปลงประเภทประกาศ (ขาย/เช่า) เป็นภาษาไทย
export function getListingTypeBadge(type: ListingType): { text: string; bgClass: string } {
  if (type === 'rent') {
    return { text: 'ให้เช่า', bgClass: 'bg-emerald-600 text-white' };
  }
  return { text: 'ขาย', bgClass: 'bg-blue-600 text-white' };
}
