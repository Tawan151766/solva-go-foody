import { useEffect, useState } from 'react';

/**
 * Hook สำหรับการนำทางที่ปลอดภัยจาก hydration error
 * ใช้เมื่อต้องการเปลี่ยนหน้าโดยใช้ window.location
 */
export function useClientNavigation() {
  // ตรวจสอบว่าอยู่ฝั่ง client หรือไม่
  const [isClientSide, setIsClientSide] = useState(false);

  /**
   * เมื่อ component mount จะตั้งสถานะว่าอยู่ฝั่ง client
   */
  useEffect(() => {
    setIsClientSide(true);
  }, []);

  /**
   * ฟังก์ชันสำหรับนำทางไปหน้าใหม่
   * จะทำงานเฉพาะฝั่ง client เท่านั้น
   * 
   * @param {string} targetUrl - URL ที่ต้องการไป
   */
  const navigateToPage = (targetUrl) => {
    // ตรวจสอบว่าอยู่ฝั่ง client และมี window object
    if (isClientSide && typeof window !== 'undefined') {
      window.location.href = targetUrl;
    }
  };

  return { 
    navigateTo: navigateToPage,  // ฟังก์ชันนำทาง
    isClient: isClientSide       // สถานะว่าอยู่ฝั่ง client หรือไม่
  };
}