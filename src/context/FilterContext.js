import React, { createContext, useState, useEffect } from "react";
import { categories } from "@/data/stores";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [nationality, setNationality] = useState("");

  const [filteredStores, setFilteredStores] = useState([]);
  const [debounced, setDebounced] = useState({ search, location, selectedCategory, nationality });

  // debounce filter input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced({ search, location, selectedCategory, nationality });
    }, 800); // 800ms

    return () => clearTimeout(handler);
  }, [search, location, selectedCategory, nationality]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounced.search) params.append('name', debounced.search);
    if (debounced.location) params.append('address', debounced.location);
    if (debounced.selectedCategory && debounced.selectedCategory !== 'ทั้งหมด')
      params.append('category', debounced.selectedCategory);
    if (debounced.nationality) params.append('nationality', debounced.nationality);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores?${params.toString()}`)
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
        nationality,
        setNationality,
        categories,
        filteredStores,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
