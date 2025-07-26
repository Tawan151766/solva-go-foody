import { useState, useEffect } from 'react';

/**
 * Hook สำหรับการจัดการ context ที่ปลอดภัยจาก hydration error
 * @param {Function} contextHook - Hook ของ context ที่ต้องการใช้
 * @param {*} fallbackValue - ค่า fallback สำหรับ server-side rendering
 */
export function useHydrationSafeContext(contextHook, fallbackValue = null) {
  const [isHydrated, setIsHydrated] = useState(false);
  const contextValue = contextHook();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // ✅ ส่งค่า fallback ระหว่าง server-side rendering
  if (!isHydrated) {
    return {
      ...contextValue,
      isHydrated: false,
      // Override ค่าที่อาจแตกต่างระหว่าง server/client
      ...(fallbackValue || {})
    };
  }

  return {
    ...contextValue,
    isHydrated: true
  };
}

/**
 * Hook สำหรับการจัดการ localStorage ที่ปลอดภัยจาก hydration error
 */
export function useHydrationSafeStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    
    if (isHydrated) {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
      }
    }
  };

  return [value, setStoredValue, isHydrated];
}