import React, { createContext, useState, useEffect } from "react";
import { categories } from "@/data/stores";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const [filteredStores, setFilteredStores] = useState([]);
  const [debounced, setDebounced] = useState({ search, location, selectedCategory });

  // debounce filter input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced({ search, location, selectedCategory });
    }, 800); // 800ms

    return () => clearTimeout(handler);
  }, [search, location, selectedCategory]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounced.search) params.append('name', debounced.search);
    if (debounced.location) params.append('address', debounced.location);
    if (debounced.selectedCategory && debounced.selectedCategory !== 'ทั้งหมด')
      params.append('category', debounced.selectedCategory);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/stores?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setFilteredStores(data?.data?.restaurants || []);
      })
      .catch(() => setFilteredStores([]));
  }, [debounced]);

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
