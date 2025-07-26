/**
 * Custom Hook สำหรับจัดการข้อมูลร้านอาหาร
 * รองรับการดึงข้อมูลจาก API และ Cache
 */

import { useState, useEffect, useCallback } from 'react';
import restaurantDataService from '@/lib/dataService';

/**
 * Hook สำหรับดึงข้อมูลร้านอาหารทั้งหมด
 */
export function useRestaurants(lat = 13.8131, lng = 100.5372, radius = 5000) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = useCallback(async (useCache = true) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await restaurantDataService.getRestaurants(lat, lng, radius, useCache);
      setRestaurants(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radius]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const refresh = useCallback(() => {
    fetchRestaurants(false);
  }, [fetchRestaurants]);

  return {
    restaurants,
    loading,
    error,
    refresh
  };
}

/**
 * Hook สำหรับดึงข้อมูลร้านอาหารตาม ID
 */
export function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await restaurantDataService.getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching restaurant:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return {
    restaurant,
    loading,
    error
  };
}

/**
 * Hook สำหรับค้นหาร้านอาหาร
 */
export function useRestaurantSearch(lat = 13.8131, lng = 100.5372, radius = 5000) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await restaurantDataService.searchRestaurants(query, lat, lng, radius);
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Error searching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radius]);

  return {
    results,
    loading,
    error,
    search
  };
}

/**
 * Hook สำหรับดึงหมวดหมู่ร้านอาหาร
 */
export function useRestaurantCategories(lat = 13.8131, lng = 100.5372, radius = 5000) {
  const [categories, setCategories] = useState(['ทั้งหมด']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await restaurantDataService.getCategories(lat, lng, radius);
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [lat, lng, radius]);

  return {
    categories,
    loading,
    error
  };
}

/**
 * Hook สำหรับกรองร้านอาหารตามหมวดหมู่
 */
export function useRestaurantFilter(lat = 13.8131, lng = 100.5372, radius = 5000) {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await restaurantDataService.filterByCategory(category, lat, lng, radius);
      setFilteredRestaurants(data);
    } catch (err) {
      setError(err.message);
      console.error('Error filtering restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radius]);

  return {
    filteredRestaurants,
    loading,
    error,
    filterByCategory
  };
}

/**
 * Hook สำหรับจัดการข้อมูลร้านอาหารแบบครบครัน
 */
export function useRestaurantManager(lat = 13.8131, lng = 100.5372, radius = 5000) {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [categories, setCategories] = useState(['ทั้งหมด']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // โหลดข้อมูลเริ่มต้น
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [restaurantData, categoryData] = await Promise.all([
        restaurantDataService.getRestaurants(lat, lng, radius),
        restaurantDataService.getCategories(lat, lng, radius)
      ]);

      setRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
      setCategories(categoryData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radius]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // ค้นหา
  const search = useCallback((query) => {
    if (!query.trim()) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.address.toLowerCase().includes(searchTerm) ||
      restaurant.category.toLowerCase().includes(searchTerm)
    );

    setFilteredRestaurants(filtered);
  }, [restaurants]);

  // กรองตามหมวดหมู่
  const filterByCategory = useCallback((category) => {
    if (category === 'ทั้งหมด') {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filtered = restaurants.filter(restaurant => 
      restaurant.category === category
    );

    setFilteredRestaurants(filtered);
  }, [restaurants]);

  // กรองตามที่อยู่
  const filterByLocation = useCallback((location) => {
    if (!location.trim()) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const locationTerm = location.toLowerCase();
    const filtered = restaurants.filter(restaurant => 
      restaurant.address.toLowerCase().includes(locationTerm)
    );

    setFilteredRestaurants(filtered);
  }, [restaurants]);

  // รีเฟรชข้อมูล
  const refresh = useCallback(async () => {
    await restaurantDataService.refreshData(lat, lng, radius);
    await loadInitialData();
  }, [lat, lng, radius, loadInitialData]);

  return {
    restaurants: filteredRestaurants,
    allRestaurants: restaurants,
    categories,
    loading,
    error,
    search,
    filterByCategory,
    filterByLocation,
    refresh
  };
}