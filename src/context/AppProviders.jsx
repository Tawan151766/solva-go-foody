"use client";
import { CartProvider } from "./CartContext";
import { LocaleProvider } from "./LocaleContext";

export function AppProviders({ children }) {
  return (
    <LocaleProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LocaleProvider>
  );
}