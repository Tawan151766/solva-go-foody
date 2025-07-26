"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LocaleContext = createContext();

const SUPPORTED_LOCALES = {
  th: "ไทย",
  en: "English"
};

export function LocaleProvider({ children }) {
  // ✅ ใช้ default locale ที่สม่ำเสมอ
  const [locale, setLocale] = useState("th");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    // ✅ อ่าน locale จาก localStorage, cookies, หรือ browser language
    const savedLocale = localStorage.getItem("locale");
    const browserLocale = navigator.language.split("-")[0];
    const defaultLocale = savedLocale || (SUPPORTED_LOCALES[browserLocale] ? browserLocale : "th");
    
    setLocale(defaultLocale);
  }, []);

  const changeLocale = (newLocale) => {
    if (SUPPORTED_LOCALES[newLocale]) {
      setLocale(newLocale);
      
      if (isHydrated) {
        localStorage.setItem("locale", newLocale);
      }
    }
  };

  const contextValue = {
    locale,
    changeLocale,
    isHydrated,
    supportedLocales: SUPPORTED_LOCALES,
    isRTL: false // สำหรับภาษาที่เขียนจากขวาไปซ้าย
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}