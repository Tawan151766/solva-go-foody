"use client";

import { HiLocationMarker, HiStar } from "react-icons/hi";

/**
 * Component แสดงแผนที่แบบ Static (ไม่ต้องใช้ API Key)
 * ใช้เป็นทางเลือกเมื่อไม่มี Google Maps API Key
 */
export default function StaticMap({ lat, lng, title, address, zoom = 15 }) {
  /**
   * เปิด Google Maps ในแท็บใหม่
   */
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  /**
   * เปิดแอป Google Maps สำหรับนำทาง
   */
  const openNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Static Map Image จาก Google Static Maps API (ไม่ต้องใช้ API Key) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x400&markers=color:blue%7C${lat},${lng}&style=feature:poi%7Celement:labels%7Cvisibility:off)`
        }}
      />
      
      {/* Overlay สำหรับข้อมูลและปุ่ม */}
      <div className="absolute inset-0 bg-black/20">
        {/* ข้อมูลร้าน */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
          <p className="text-gray-600 text-xs leading-relaxed">{address}</p>
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={openInGoogleMaps}
            className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold py-2 px-3 rounded-lg shadow-lg transition-colors duration-200 text-sm"
            title="ดูใน Google Maps"
          >
            <div className="flex items-center gap-1">
              <HiLocationMarker className="w-4 h-4" />
              ดูแผนที่
            </div>
          </button>
          
          <button
            onClick={openNavigation}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2 px-3 rounded-lg shadow-lg transition-colors duration-200 text-sm"
            title="นำทาง"
          >
            <div className="flex items-center gap-1">
              <HiStar className="w-4 h-4" />
              นำทาง
            </div>
          </button>
        </div>

        {/* พิกัด */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </div>
      </div>

      {/* Fallback สำหรับกรณีที่รูปไม่โหลด */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <HiLocationMarker className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium">แผนที่ตั้งร้าน</p>
          <p className="text-sm text-gray-500 mt-1">คลิกปุ่มเพื่อดูแผนที่</p>
        </div>
      </div>
    </div>
  );
}