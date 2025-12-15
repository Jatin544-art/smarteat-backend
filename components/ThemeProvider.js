// components/ThemeProvider.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // load saved theme or system preference on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("smarteat-theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
      } else {
        const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // apply theme and persist
  useEffect(() => {
    try {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("smarteat-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen ${
          theme === "light" ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-50"
        } transition-colors duration-300`}
      >
        {/* decorative blobs (optional) */}
        <div className="floating-blob blob-1" />
        <div className="floating-blob blob-2" />
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}
