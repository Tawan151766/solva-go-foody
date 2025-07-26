import GoogleMap from "@/components/GoogleMap";
import GoogleMapsScript from "@/components/GoogleMapsScript";
import StaticMap from "@/components/StaticMap";
import { HiStar, HiLocationMarker, HiPhone } from "react-icons/hi";

/**
 * Component แสดงรายละเอียดร้านอาหาร
 * รวมถึงข้อมูลร้านและแผนที่ตั้ง
 */
export default function StoreDetail({ store }) {
  // Google Maps API Key (ในการใช้งานจริงควรเก็บใน environment variables)
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // ตรวจสอบว่ามี API Key หรือไม่
  const hasApiKey =
    GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "YOUR_API_KEY_HERE";

  /**
   * เปิดแอป Google Maps สำหรับนำทาง
   */
  const handleNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    window.open(url, "_blank");
  };

  /**
   * เปิดแอปโทรศัพท์ (ถ้ามีเบอร์โทร)
   */
  const handleCall = () => {
    // ในตัวอย่างนี้ใช้เบอร์ตัวอย่าง
    const phoneNumber = "tel:+66-2-123-4567";
    window.location.href = phoneNumber;
  };

  return (
    <div className="space-y-6">
      {/* Store Info Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Hero Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
              <div className="flex items-center gap-1">
                <HiStar className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-gray-800">
                  {store.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#2563eb] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {store.category}
            </span>
          </div>
        </div>

        {/* Store Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {store.name}
          </h1>

          <div className="flex items-start gap-2 mb-4">
            <HiLocationMarker className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {store.address}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCall}
              className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <HiPhone className="w-4 h-4" />
                โทร
              </div>
            </button>
            <button
              onClick={handleNavigation}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <HiLocationMarker className="w-4 h-4" />
                นำทาง
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <HiLocationMarker className="w-5 h-5 text-[#2563eb]" />
            ที่ตั้งร้าน
          </h2>
        </div>

        {/* Maps Container */}
        <div className="h-64">
          <GoogleMapsScript
            apiKey={GOOGLE_MAPS_API_KEY}
            fallback={
              <StaticMap
                lat={store.lat}
                lng={store.lng}
                title={store.name}
                address={store.address}
                zoom={15}
              />
            }
          >
            <GoogleMap
              lat={store.lat}
              lng={store.lng}
              title={store.name}
              address={store.address}
              zoom={16}
            />
          </GoogleMapsScript>
        </div>
      </div>
    </div>
  );
}
