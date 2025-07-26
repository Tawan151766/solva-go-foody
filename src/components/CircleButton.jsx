import React from "react";

export default function CircleButton({ icon, ariaLabel, onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-12 h-12 rounded-full border border-[#2563eb] bg-white text-[#2563eb] shadow-sm hover:bg-[#e0e7ef] transition-all duration-150"
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}
