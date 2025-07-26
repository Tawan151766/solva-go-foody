"use client";
import { useEffect, useState } from 'react';

/**
 * Component สำหรับโหลด Google Maps JavaScript API
 * ใช้ครอบ components ที่ต้องการใช้ Google Maps
 */
export default function GoogleMapsScript({ children, apiKey, fallback = null }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่าอยู่ฝั่ง client
    if (typeof window === 'undefined') return;

    // ตรวจสอบว่า Google Maps API โหลดแล้วหรือยัง
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // ตรวจสอบว่ามี script tag อยู่แล้วหรือไม่
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      // รอให้ script ที่มีอยู่โหลดเสร็จ
      existingScript.addEventListener('load', () => setIsLoaded(true));
      existingScript.addEventListener('error', () => setIsError(true));
      return;
    }

    // สร้าง script tag ใหม่
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Event handlers
    script.addEventListener('load', () => {
      setIsLoaded(true);
    });

    script.addEventListener('error', () => {
      setIsError(true);
      console.error('Failed to load Google Maps API');
    });

    // เพิ่ม script ลงใน document
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // ไม่ลบ script เพราะอาจมี components อื่นใช้
    };
  }, [apiKey]);


  // แสดง loading state
  if (!isLoaded && !isError) {
    return (
      fallback ? fallback : (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#2563eb] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">กำลังโหลด Google Maps...</p>
          </div>
        </div>
      )
    );
  }

  // แสดง fallback เมื่อ error
  if (isError) {
    return fallback ? fallback : (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-red-600 font-medium">ไม่สามารถโหลด Google Maps ได้</p>
          <p className="text-gray-500 text-sm mt-1">กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต</p>
        </div>
      </div>
    );
  }

  // แสดง children เมื่อโหลดเสร็จแล้ว
  return children;
}