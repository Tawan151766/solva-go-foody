import React, { createContext, useState, useEffect } from "react";
import { fetchStores } from "@/lib/apiService";

export const FilterContext = createContext();
const categories = ["ทั้งหมด", "ก๋วยเตี๋ยว", "โรตี", "ข้าวขาหมู"];
export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [nationality, setNationality] = useState("");

  const [filteredStores, setFilteredStores] = useState([]);
  const [debounced, setDebounced] = useState({
    search,
    location,
    selectedCategory,
    nationality,
  });

  // debounce filter input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced({ search, location, selectedCategory, nationality });
    }, 500); // 500ms

    return () => clearTimeout(handler);
  }, [search, location, selectedCategory, nationality]);

  useEffect(() => {
    const params = {};
    if (debounced.search) params.name = debounced.search;
    if (debounced.location) params.address = debounced.location;
    if (debounced.selectedCategory && debounced.selectedCategory !== "ทั้งหมด")
      params.category = debounced.selectedCategory;
    if (debounced.nationality) params.nationality = debounced.nationality;

    fetchStores(params)
      .then((data) => {
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
