'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice, getCategoryLabel, getListingTypeBadge } from '@/lib/formatters';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const coverImage = property.images.find(img => img.isCover) || property.images[0];
  const listingBadge = getListingTypeBadge(property.listingType);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      
      {/* Property Image & Badges */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img
          src={coverImage?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
          alt={coverImage?.alt || property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg shadow-sm ${listingBadge.bgClass}`}>
            {listingBadge.text}
          </span>
          <span className="px-2.5 py-1 text-xs font-medium bg-slate-900/80 backdrop-blur-xs text-white rounded-lg">
            {getCategoryLabel(property.category)}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 hover:bg-white shadow-sm transition-colors z-10"
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Price Tag Overlay at bottom of image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 pt-6 flex items-end justify-between text-white">
          <div>
            <span className="text-xs text-slate-200 font-medium">ราคา</span>
            <div className="text-xl font-bold tracking-tight text-white drop-shadow-xs">
              {formatPrice(property.price, property.listingType)}
            </div>
          </div>
          {property.usableArea && (
            <span className="text-xs text-slate-300">
              ฿{Math.round(property.price / property.usableArea).toLocaleString()} / ตร.ม.
            </span>
          )}
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Near Station Tag (if any) */}
          {property.nearStation && (
            <div className="inline-flex items-center text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2">
              🚇 {property.nearStation}
            </div>
          )}

          {/* Title */}
          <Link href={`/properties/${property.id}`}>
            <h3 className="font-semibold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors text-base leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.district}, {property.province}</span>
          </p>
        </div>

        {/* Specs Highlights (Bed / Bath / Area) */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-slate-600">
          {property.category === 'land' ? (
            <div className="col-span-3 flex items-center justify-between text-xs py-1">
              <span className="text-slate-500">ขนาดที่ดิน</span>
              <span className="font-semibold text-slate-800">{property.landArea} {property.landAreaUnit || 'ไร่'}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-xs">
                <Bed className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.bedrooms ? `${property.bedrooms} นอน` : '-'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Bath className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.bathrooms ? `${property.bathrooms} น้ำ` : '-'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Maximize2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.usableArea ? `${property.usableArea} ตร.ม.` : (property.landArea ? `${property.landArea} ตร.ว.` : '-')}</span>
              </div>
            </>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/properties/${property.id}`}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold rounded-xl border border-slate-200/80 transition-all duration-200"
        >
          <span>ดูรายละเอียดทรัพย์สิน</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>

    </div>
  );
}
