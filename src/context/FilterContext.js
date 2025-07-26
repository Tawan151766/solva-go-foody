import React, { createContext, useState, useMemo } from "react";
import { categories, stores } from "@/data/stores";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  // treat 'ทั้งหมด' as '' for filtering
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredStores = useMemo(() => {
    // treat selectedCategory === '' as "ทั้งหมด"
    return stores.filter((store) => {
      const matchName = store.name.toLowerCase().includes(search.toLowerCase());
      const matchLocation = store.address
        .toLowerCase()
        .includes(location.toLowerCase());
      const matchCategory =
        selectedCategory === "ทั้งหมด" || store.category === selectedCategory;
      return matchName && matchLocation && matchCategory;
    });
  }, [search, location, selectedCategory]);

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        location,
        setLocation,
        selectedCategory,
        setSelectedCategory,
        categories,
        filteredStores,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
