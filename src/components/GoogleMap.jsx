"use client";
import { useEffect, useRef } from 'react';

/**
 * Component สำหรับแสดง Google Maps
 * @param {number} lat - ละติจูด
 * @param {number} lng - ลองจิจูด
 * @param {string} title - ชื่อสถานที่
 * @param {string} address - ที่อยู่
 * @param {number} zoom - ระดับการซูม (default: 15)
 */
export default function GoogleMap({ lat, lng, title, address, zoom = 15 }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // ตรวจสอบว่าอยู่ฝั่ง client และมี Google Maps API
    if (typeof window === 'undefined' || !window.google) {
      return;
    }

    // สร้าง Google Map
    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: { lat, lng },
        zoom,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        // ปรับแต่ง UI
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        // สไตล์แผนที่
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };

      // สร้างแผนที่
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // เพิ่ม Marker
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        title: title,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#2563eb">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40)
        }
      });

      // เพิ่ม Info Window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; color: #2563eb; font-weight: bold;">${title}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
          </div>
        `
      });

      // เปิด Info Window เมื่อคลิก Marker
      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      // เปิด Info Window ทันทีเมื่อโหลดแผนที่
      infoWindow.open(mapInstanceRef.current, marker);
    };

    // ตรวจสอบว่า Google Maps API โหลดแล้วหรือยัง
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      // รอให้ Google Maps API โหลดเสร็จ
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initializeMap();
        }
      }, 100);

      // ล้าง interval หลัง 10 วินาที
      setTimeout(() => clearInterval(checkGoogleMaps), 10000);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // ล้าง event listeners
        window.google?.maps?.event?.clearInstanceListeners(mapInstanceRef.current);
      }
    };
  }, [lat, lng, title, address, zoom]);

  return (
    <div className="relative w-full h-full">
      {/* แผนที่ */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '250px' }}
      />
      
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center rounded-lg">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <p className="text-gray-600 font-medium text-sm">กำลังโหลดแผนที่...</p>
        </div>
      </div>
    </div>
  );
}