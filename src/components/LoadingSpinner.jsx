"use client";

export default function LoadingSpinner({ className = "", size = 40, text = "กำลังโหลดข้อมูล..." }) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div
        className="animate-spin rounded-full border-4 border-[#2563eb] border-t-transparent"
        style={{ width: size, height: size, borderTopColor: "transparent" }}
      ></div>
      {text && <div className="mt-4 text-gray-600 text-base">{text}</div>}
    </div>
  );
}
