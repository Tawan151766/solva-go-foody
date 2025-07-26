import GoogleMap from "@/components/GoogleMap";
import GoogleMapsScript from "@/components/GoogleMapsScript";
import StaticMap from "@/components/StaticMap";

/**
 * Component แสดงรายละเอียดร้านอาหาร
 * รวมถึงข้อมูลร้านและแผนที่ตั้ง
 */
export default function StoreDetail({ store }) {
  // Google Maps API Key (ในการใช้งานจริงควรเก็บใน environment variables)
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // ตรวจสอบว่ามี API Key หรือไม่
  const hasApiKey = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "YOUR_API_KEY_HERE";

  /**
   * เปิดแอป Google Maps สำหรับนำทาง
   */
  const handleNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    window.open(url, '_blank');
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
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
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
            <svg
              className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
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
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                โทร
              </div>
            </button>
            <button 
              onClick={handleNavigation}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
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
            <svg
              className="w-5 h-5 text-[#2563eb]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            ที่ตั้งร้าน
          </h2>
        </div>

        {/* Maps Container */}
        <div className="h-64">
          {hasApiKey ? (
            // ใช้ Google Maps แบบ Interactive เมื่อมี API Key
            <GoogleMapsScript apiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                lat={store.lat}
                lng={store.lng}
                title={store.name}
                address={store.address}
                zoom={16}
              />
            </GoogleMapsScript>
          ) : (
            // ใช้ Static Map เมื่อไม่มี API Key
            <StaticMap
              lat={store.lat}
              lng={store.lng}
              title={store.name}
              address={store.address}
              zoom={15}
            />
          )}
        </div>
      </div>
    </div>
  );
}
