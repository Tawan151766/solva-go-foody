"use client";
import React, { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import { HiX, HiMenu, HiSearch, HiLocationMarker } from "react-icons/hi";
import ModernButton from "@/components/ModernButton";
import { FilterContext } from "@/context/FilterContext";
import NavigationButtons from "../NavigationButtons";
export default function Navbar() {
  const {
    categories = [],
    selectedCategory = "",
    setSelectedCategory,
    search = "",
    setSearch,
    location = "",
    setLocation,
    nationality = "",
    setNationality,
    nationalities = [],
  } = useContext(FilterContext);
  const [showFilters, setShowFilters] = useState(false);
  const pathname = usePathname();
  const nation = [
    "ไทย",
    "นานาชาติ",
    "ญี่ปุ่น",
    "จีน",
    "อิตาเลียน",
    "ฝรั่งเศส",
    "อินเดีย",
  ];

  const foodTypes = [
    "ก๋วยเตี๋ยว",
    "คาเฟ่",
    "อาหารญี่ปุ่น",
    "ติ่มซำ",
    "อาหารทะเล",
    "มังสวิรัติ",
    "พิซซ่า",
    "เบเกอรี่",
    "อาหารอินเดีย",
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-md px-2 py-2 md:px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 sticky top-0 z-40">
        <div className="flex justify-between items-center w-full md:w-auto mb-2 md:mb-0">
          <a
            href="/"
            className="flex items-center gap-2 text-[#2563eb] font-bold text-xl hover:text-[#1d4ed8] transition-colors duration-200"
          >
            Solva
          </a>
          {/* Toggle button for mobile */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-[#f4f0f0] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30"
            onClick={() => setShowFilters((v) => !v)}
            aria-label={showFilters ? "ซ่อนตัวกรอง" : "แสดงตัวกรอง"}
          >
            {showFilters ? (
              <HiX className="w-6 h-6 text-[#2563eb]" />
            ) : (
              <HiMenu className="w-6 h-6 text-[#2563eb]" />
            )}
          </button>
        </div>
        {/* Filters: search and categories */}

        <div
          className={`w-full transition-all duration-200 md:flex md:flex-row md:items-center md:gap-4 md:static ${
            showFilters ? "block" : "hidden"
          } md:block`}
        >
          {" "}
          {pathname === "/" && (
            <>
              <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-2 flex-1 max-w-full md:max-w-2xl mx-auto md:mx-4 w-full">
                <div className="relative w-full sm:w-1/3">
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อร้าน..."
                    value={search}
                    onChange={(e) => setSearch && setSearch(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-base w-full bg-white transition-all duration-150 pr-10"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#64748b]">
                    <HiSearch className="w-5 h-5" />
                  </span>
                </div>
                <div className="relative w-full sm:w-1/3">
                  <input
                    type="text"
                    placeholder="ค้นหาสถานที่..."
                    value={location}
                    onChange={(e) => setLocation && setLocation(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-base w-full bg-white transition-all duration-150 pr-10"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#64748b]">
                    <HiLocationMarker className="w-5 h-5" />
                  </span>
                </div>
                <div className="relative w-full sm:w-1/3">
                  <select
                    value={nationality}
                    onChange={(e) =>
                      setNationality && setNationality(e.target.value)
                    }
                    className="px-4 py-2 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-base w-full bg-white transition-all duration-150 appearance-none pr-10 text-[#2563eb] font-semibold"
                  >
                    <option value="">เลือกสัญชาติอาหาร</option>
                    {nation.map((nat) => (
                      <option key={nat} value={nat}>
                        {nat}
                      </option>
                    ))}
                  </select>
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#64748b] pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end mt-2 md:mt-0">
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory && setSelectedCategory(e.target.value)
                  }
                 className="px-4 py-2 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-base w-full bg-white transition-all duration-150 appearance-none pr-10 text-[#2563eb] font-semibold"
                >
                  <option value="">เลือกประเภทอาหาร</option>
                  {foodTypes.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </nav>{" "}
      <div className="p-4">
        <NavigationButtons />
      </div>
    </>
  );
}
