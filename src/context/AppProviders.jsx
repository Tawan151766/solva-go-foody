"use client";
import { CartProvider } from "./CartContext";
import { LocaleProvider } from "./LocaleContext";

// ✅ รวม providers ทั้งหมดเพื่อหลีกเลี่ยง provider hell
export function AppProviders({ children }) {
  return (
    <LocaleProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LocaleProvider>
  );
}