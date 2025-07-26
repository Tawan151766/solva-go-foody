"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";

import CartButton from "@/components/Cart/CartButton";
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
import ClientOnly from "@/components/ClientOnly";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AppProviders>
          {children}
          <ClientOnly>
            <CartButton />
          </ClientOnly>
        </AppProviders>
      </body>
    </html>
  );
}
