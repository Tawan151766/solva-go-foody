import React from "react";

export default function ModernButton({ value, active, onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-150 shadow-sm select-none
        ${active
          ? "bg-[#2563eb] text-white border-[#2563eb] shadow-md"
          : "bg-white text-[#181111] border-[#e0e7ef] hover:bg-[#f5f8fa]"}
      `}
      aria-label={value}
      {...props}
    >
      {value}
    </button>
  );
}
