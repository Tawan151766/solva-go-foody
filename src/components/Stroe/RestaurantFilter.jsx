"use client";
import React, { useState } from "react";
import CircleButton from "@/components/CircleButton";
import ModernButton from "@/components/ModernButton";
export default function RestaurantFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
  location,
  setLocation,
}) {
  // Responsive: allow hiding filter/search section on mobile
  const [showFilters, setShowFilters] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-2 py-2 md:px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 sticky top-0 z-40">
      {/* Logo and filter toggle */}
      <div className="flex justify-between items-center w-full md:w-auto mb-2 md:mb-0">
        <a href="/" className="flex items-center gap-2">
          <img
            src="https://static2.wongnai.com/static2/images/HTZaHLM.png"
            alt="Wongnai, No.1 Restaurant Review Website and Application in Thailand"
            className="h-10 w-auto"
          />
        </a>
        {/* Toggle button for mobile */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-[#f4f0f0] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30"
          onClick={() => setShowFilters((v) => !v)}
          aria-label={showFilters ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
        >
          {showFilters ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </button>
      </div>
      {/* Filters: search and categories */}
      <div
        className={`w-full transition-all duration-200 md:flex md:flex-row md:items-center md:gap-4 md:static ${showFilters ? 'block' : 'hidden'} md:block`}
      >
        <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-2 flex-1 max-w-full md:max-w-xl mx-auto md:mx-4 w-full">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="ค้นหาชื่อร้าน..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-base w-full bg-white transition-all duration-150 pr-10"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#64748b]">
              <svg height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="Icon-sc-nqv920">
                <circle cx="6.5" cy="6" r="3.5" stroke="currentColor"></circle>
                <line x1="8.85355" y1="8.64645" x2="11.8536" y2="11.6464" stroke="currentColor"></line>
              </svg>
            </span>
          </div>
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="ค้นหาสถานที่..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-base w-full bg-white transition-all duration-150 pr-10"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#64748b]">
              <svg height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="Icon-sc-nqv920">
                <circle cx="12" cy="12.5" r="11.5" stroke="currentColor"></circle>
                <circle cx="12" cy="9.5" r="4" stroke="currentColor"></circle>
                <path d="M19.5 21C18.3742 18.3488 16.0113 14.8333 11.9995 14.8333C7.98765 14.8333 5.62589 18.3488 4.5 21" stroke="currentColor"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end mt-2 md:mt-0">
          {categories.map((cat) => (
            <ModernButton
              key={cat}
              value={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
