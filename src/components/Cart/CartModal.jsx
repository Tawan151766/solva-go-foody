import React from "react";

export default function CartModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] p-6 text-white relative">
            <button 
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" 
              aria-label="Close" 
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.16 16h9.68a3 3 0 0 0 2.92-2.36l1.54-7A2 2 0 0 0 19.36 4H6.21l-.34-1.63A2 2 0 0 0 4 0H2a1 1 0 1 0 0 2h2l3.6 17.59A2 2 0 0 0 11.5 22h7a1 1 0 1 0 0-2h-7l-.16-.84ZM6.21 6h13.15l-1.54 7H7.16L6.21 6Z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">รายการในตะกร้า</h2>
                <p className="text-blue-100 text-sm">ตรวจสอบรายการก่อนสั่งซื้อ</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
