"use client";
import { CartProvider } from "./CartContext";
import { ThemeProvider } from "./ThemeContext";
import { LocaleProvider } from "./LocaleContext";

// ✅ รวม providers ทั้งหมดเพื่อหลีกเลี่ยง provider hell
export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}