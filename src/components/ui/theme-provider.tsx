
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

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

  return (
    <NextThemesProvider {...props}>
      {/* Avoid rendering anything until mounting to prevent hydration mismatch */}
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </NextThemesProvider>
  )
}
