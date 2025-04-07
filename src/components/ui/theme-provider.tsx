
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

  const onThemeChange = React.useCallback((theme: string | undefined) => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, []);

  return (
    <NextThemesProvider {...props} onThemeChange={onThemeChange}>
      {/* Avoid rendering anything until mounting to prevent hydration mismatch */}
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </NextThemesProvider>
  )
}
