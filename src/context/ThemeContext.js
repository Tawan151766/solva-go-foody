"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // ✅ ใช้ default theme ที่สม่ำเสมอระหว่าง server และ client
  const [theme, setTheme] = useState("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    // ✅ อ่าน theme จาก localStorage หลังจาก client-side mount
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setTheme(savedTheme || systemTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (isHydrated) {
      localStorage.setItem("theme", newTheme);
    }
  };

  const contextValue = {
    theme,
    toggleTheme,
    isHydrated,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
