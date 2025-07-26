"use client";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GoogleMap({ lat, lng, title, address, zoom = 15 }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false); // ✅ เพิ่ม state

  useEffect(() => {
    if (typeof window === 'undefined' || !window.google) return;

    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: { lat, lng },
        zoom,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        title,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(/* svg */),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; color: #2563eb; font-weight: bold;">${title}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
          </div>
        `
      });

      marker.addListener('click', () => infoWindow.open(mapInstanceRef.current, marker));
      infoWindow.open(mapInstanceRef.current, marker);

      // ✅ บอกว่าโหลดแผนที่เสร็จแล้ว
      setIsMapReady(true);
    };

    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initializeMap();
        }
      }, 100);
      setTimeout(() => clearInterval(checkGoogleMaps), 10000);
    }

    return () => {
      if (mapInstanceRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(mapInstanceRef.current);
      }
    };
  }, [lat, lng, title, address, zoom]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '250px' }} />

      {/* ✅ overlay เฉพาะตอนโหลด */}
      {!isMapReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center rounded-lg z-10">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <LoadingSpinner text="กำลังโหลดแผนที่..." className="font-medium text-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
