/**
 * Service สำหรับจัดการข้อมูลร้านอาหาร
 * ใช้ Mock data สำหรับการทดสอบ
 */

import { stores, menuCategories, menus } from "@/data/stores";

/**
 * Service หลักสำหรับจัดการข้อมูลร้านอาหาร
 */
export class RestaurantDataService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 30 * 60 * 1000; // 30 นาที
  }

  /**
   * ดึงข้อมูลร้านอาหารจาก mock data
   */
  async getRestaurants(
    lat = 13.8131,
    lng = 100.5372,
    radius = 5000,
    useCache = true
  ) {
    const cacheKey = `restaurants_${lat}_${lng}_${radius}`;

    // ตรวจสอบ cache
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        console.log("📦 Using cached restaurant data");
        return cached.data;
      }
    }

    try {
      // ใช้ mock data จาก stores.js
      const restaurants = stores.map((store) => ({
        ...store,
        menus: this.getMenusForStore(store.id),
      }));

      // บันทึกลง cache
      this.cache.set(cacheKey, {
        data: restaurants,
        timestamp: Date.now(),
      });

      console.log(`✅ Loaded ${restaurants.length} restaurants from mock data`);
      return restaurants;
    } catch (error) {
      console.error("❌ Error loading restaurants:", error);
      return [];
    }
  }

  /**
   * ดึงเมนูสำหรับร้านอาหาร
   */
  getMenusForStore(storeId) {
    return menus.filter((menu) => menu.storeId === storeId);
  }

  /**
   * ดึงข้อมูลร้านอาหารตาม ID
   */
  async getRestaurantById(id) {
    const restaurants = await this.getRestaurants();
    return restaurants.find((restaurant) => restaurant.id === parseInt(id));
  }

  /**
   * ค้นหาร้านอาหาร
   */
  async searchRestaurants(query, lat, lng, radius = 5000) {
    const restaurants = await this.getRestaurants(lat, lng, radius);

    if (!query) return restaurants;

    const searchTerm = query.toLowerCase();
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.address.toLowerCase().includes(searchTerm) ||
        restaurant.category.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * กรองร้านอาหารตามหมวดหมู่
   */
  async filterByCategory(category, lat, lng, radius = 5000) {
    const restaurants = await this.getRestaurants(lat, lng, radius);

    if (category === "ทั้งหมด") return restaurants;

    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  /**
   * ดึงหมวดหมู่ทั้งหมด
   */
  async getCategories(lat, lng, radius = 5000) {
    const restaurants = await this.getRestaurants(lat, lng, radius);
    const categories = [...new Set(restaurants.map((r) => r.category))];
    return ["ทั้งหมด", ...categories.sort()];
  }

  /**
   * ล้าง cache
   */
  clearCache() {
    this.cache.clear();
    console.log("🗑️ Cache cleared");
  }

  /**
   * รีเฟรชข้อมูล
   */
  async refreshData(lat, lng, radius = 5000) {
    this.clearCache();
    return await this.getRestaurants(lat, lng, radius, false);
  }

  /**
   * ดึงสถิติการใช้งาน
   */
  getStats() {
    return {
      cacheSize: this.cache.size,
      cacheExpiry: this.cacheExpiry,
      totalStores: stores.length,
      totalMenus: menus.length,
    };
  }
}

// สร้าง instance เดียวสำหรับทั้งแอป
const restaurantDataService = new RestaurantDataService();

export default restaurantDataService;
