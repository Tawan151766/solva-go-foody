import React from "react";

export default function SelectField({ label, value, onChange, options, className }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className={`px-2 py-1 rounded-xl border border-[#e0e7ef] shadow-sm focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-sm font-medium w-full bg-white transition-all duration-150 ${className || ''}`}
        value={value}
        onChange={onChange}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
