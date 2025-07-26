import React from "react";

export default function OrderSuccessDetail({ open, onClose, orderId }) {
  if (!open) return null;
  // simple base64 encode for id
  const encodedId = typeof orderId === "number" ? btoa(orderId.toString()) : "";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="ปิด"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">สั่งซื้อสำเร็จ!</h2>
          <p className="text-gray-700 mb-2">ขอบคุณที่ใช้บริการ</p>
          <div className="text-sm text-gray-500 mb-2">รหัสออเดอร์ (เข้ารหัส): <span className="font-mono select-all">{encodedId}</span></div>
          <div className="text-xs text-gray-400">(ใช้รหัสนี้เพื่อตรวจสอบสถานะออเดอร์)</div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl font-semibold"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}
