"use client";

import { useState } from "react";
import CardStore from "@/components/Stroe/CardStore";
import RestaurantFilter from "@/components/Stroe/RestaurantFilter";
import EmptyState from "@/components/EmptyState";
import { stores as restaurantList, categories } from "@/data/stores";

/**
 * หน้าหลักของแอป - แสดงรายการร้านอาหาร
 * ผู้ใช้สามารถค้นหาและกรองร้านอาหารได้
 */
function HomePage() {
  // สถานะสำหรับการกรองข้อมูล
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");

  /**
   * กรองรายการร้านอาหารตามเงื่อนไขที่ผู้ใช้เลือก
   */
  const getFilteredRestaurants = () => {
    return restaurantList.filter((restaurant) => {
      // ตรวจสอบหมวดหมู่
      const categoryMatches =
        selectedCategory === "ทั้งหมด" ||
        restaurant.category === selectedCategory;

      // ตรวจสอบชื่อร้าน (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)
      const nameMatches = restaurant.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      // ตรวจสอบที่อยู่ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)
      const locationMatches =
        locationText === "" ||
        restaurant.address.toLowerCase().includes(locationText.toLowerCase());

      // ต้องผ่านเงื่อนไขทั้งหมด
      return categoryMatches && nameMatches && locationMatches;
    });
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <div className="space-y-8">
      {/* ส่วนกรองและค้นหา */}
      <RestaurantFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={searchText}
        setSearch={setSearchText}
        location={locationText}
        setLocation={setLocationText}
      />

      {/* ส่วนแสดงผลร้านอาหาร */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {filteredRestaurants.length === 0 ? (
          // แสดงเมื่อไม่พบร้านอาหาร
          <EmptyState value="ไม่พบร้านอาหารที่ตรงกับการค้นหา" />
        ) : (
          // แสดงรายการร้านอาหาร
          filteredRestaurants.map((restaurant) => (
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
