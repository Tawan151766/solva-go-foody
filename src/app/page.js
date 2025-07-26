"use client";

import { useContext } from "react";
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

  return (
    <div className="space-y-8">
      {/* store list */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {filteredStores.length === 0 ? (
          <EmptyState value="ไม่พบร้านอาหารที่ตรงกับการค้นหา" />
        ) : (
          filteredStores.map((restaurant) => (
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
    </div>
  );
}

export default HomePage;
