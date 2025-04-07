
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { colorThemeOptions } from "@/components/settings/tabs/theme/themeFormSchema"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we can safely show the UI because client-side rendering is available
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Set up a listener for theme changes to store in localStorage
  React.useEffect(() => {
    const handleThemeChange = () => {
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 
                   document.documentElement.classList.contains('light') ? 'light' : 'system';
      localStorage.setItem("theme", theme);
    };

    // Initial check
    handleThemeChange();

    // Set up an observer to watch for class changes on the html element
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  // Apply the color theme from localStorage
  React.useEffect(() => {
    const applyColorTheme = () => {
      const storedColorTheme = localStorage.getItem("colorTheme");
      
      if (storedColorTheme) {
        // Make sure the stored theme value is a valid theme
        const themeOption = colorThemeOptions.find(
          (option) => option.value === storedColorTheme
        );
        
        if (themeOption) {
          const root = document.documentElement;
          
          // Convert hex to HSL and update CSS variables
          const primaryHsl = hexToHSL(themeOption.primaryColor);
          const accentHsl = hexToHSL(themeOption.accentColor);
          
          if (primaryHsl) {
            root.style.setProperty('--primary', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
          }
          
          if (accentHsl) {
            root.style.setProperty('--accent', `${accentHsl.h} ${accentHsl.s}% ${accentHsl.l}%`);
          }
        } else {
          // If theme is invalid, set it to default
          localStorage.setItem("colorTheme", "default");
        }
      }
    };

    // Apply theme on initial load and when localStorage changes
    applyColorTheme();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "colorTheme") {
        applyColorTheme();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

  // Hex to HSL conversion utility
  function hexToHSL(hex: string): { h: number; s: number; l: number } | null {
    hex = hex.replace(/^#/, '');
    
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      
      h *= 60;
    }
    
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  return (
    <NextThemesProvider {...props}>
      {/* Avoid rendering anything until mounting to prevent hydration mismatch */}
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </NextThemesProvider>
  )
}
