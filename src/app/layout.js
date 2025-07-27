"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";

import CartButton from "@/components/Cart/CartButton";
import SearchOrderFloatingButton from "@/components/Layout/SearchOrderFloatingButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AppProviders } from "@/context/AppProviders";
import { ModalProvider } from "@/context/ModalContext";
import { FilterProvider } from "@/context/FilterContext";
import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/Layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <FilterProvider>
          <ModalProvider>
            <AppProviders>
              <Navbar />
              {children}
              <ClientOnly>
                <SearchOrderFloatingButton />
                <CartButton />
              </ClientOnly>
            </AppProviders>
          </ModalProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
