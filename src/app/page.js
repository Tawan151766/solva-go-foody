"use client";

import { useContext, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import CardStore from "@/components/Stroe/CardStore";
import EmptyState from "@/components/EmptyState";
import { FilterContext } from "@/context/FilterContext";

/**
 * main app - store list
 * Users can search and filter stores
 */
function HomePage() {
  // Use filter from FilterContext (global state)
  const { filteredStores } = useContext(FilterContext);
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const totalPages = Math.ceil(filteredStores.length / pageSize);
  const pagedStores = filteredStores.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="space-y-8 relative">
      {/* store list */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
        {filteredStores.length === 0 ? (
          <EmptyState value="ไม่พบร้านอาหารที่ตรงกับการค้นหา" />
        ) : (
          pagedStores.map((restaurant) => (
            <CardStore
              key={restaurant.id}
              address={restaurant.address}
              rating={restaurant.rating}
              image={restaurant.image}
              name={restaurant.name}
              id={restaurant.id}
            />
          ))
        )}
      </div>
      {/* Pagination buttons */}
      {filteredStores.length > pageSize && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="หน้าก่อนหน้า"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-600">{page + 1} / {totalPages}</span>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="หน้าถัดไป"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
