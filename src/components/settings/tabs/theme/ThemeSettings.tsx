
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeForm } from "./ThemeForm";
import { themeFormSchema, type ThemeFormValues, colorThemeOptions } from "./themeFormSchema";
import { ThemePreview } from "./ThemePreview";

const ThemeSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Get saved value from localStorage or use defaults
  const getSavedValue = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  };
  
  // Validate the colorTheme value from localStorage against allowed values
  const validateColorTheme = (storedValue: string | null): ThemeFormValues['colorTheme'] => {
    if (!storedValue) return "default";
    
    // Check if the stored value is one of the allowed color themes
    const validTheme = colorThemeOptions.find(theme => theme.value === storedValue);
    return validTheme ? (storedValue as ThemeFormValues['colorTheme']) : "default";
  };
  
  // Initialize form with values from localStorage if available
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: {
      theme: localStorage.getItem("theme") as "light" | "dark" | "system" || "light",
      colorTheme: validateColorTheme(localStorage.getItem("colorTheme")),
      primaryColor: getSavedValue("primaryColor", "#2563eb"),
      accentColor: getSavedValue("accentColor", "#60a5fa"),
      borderRadius: getSavedValue("borderRadius", "medium"),
      enableAnimations: getSavedValue("enableAnimations", true),
      highContrastMode: getSavedValue("highContrastMode", false),
      fontFamily: getSavedValue("fontFamily", "system"),
      customLogo: getSavedValue("customLogo", false),
      logoUrl: localStorage.getItem("logoUrl") || "",
      customFavicon: getSavedValue("customFavicon", false),
      faviconUrl: localStorage.getItem("faviconUrl") || "",
    },
  });

  function onSubmit(values: ThemeFormValues) {
    setIsSubmitting(true);
    console.log("Submitting theme settings:", values);
    
    // Save all theme settings to localStorage
    localStorage.setItem("colorTheme", values.colorTheme);
    localStorage.setItem("primaryColor", JSON.stringify(values.primaryColor));
    localStorage.setItem("accentColor", JSON.stringify(values.accentColor));
    localStorage.setItem("borderRadius", JSON.stringify(values.borderRadius));
    localStorage.setItem("enableAnimations", JSON.stringify(values.enableAnimations));
    localStorage.setItem("highContrastMode", JSON.stringify(values.highContrastMode));
    localStorage.setItem("fontFamily", JSON.stringify(values.fontFamily));
    localStorage.setItem("customLogo", JSON.stringify(values.customLogo));
    localStorage.setItem("logoUrl", values.logoUrl || "");
    localStorage.setItem("customFavicon", JSON.stringify(values.customFavicon));
    localStorage.setItem("faviconUrl", values.faviconUrl || "");
    
    // Apply theme changes to CSS variables
    const root = document.documentElement;
    
    // Update primary and accent colors
    const primaryHsl = hexToHSL(values.primaryColor);
    const accentHsl = hexToHSL(values.accentColor);
    
    if (primaryHsl) {
      root.style.setProperty('--primary', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
    }
    
    if (accentHsl) {
      root.style.setProperty('--accent', `${accentHsl.h} ${accentHsl.s}% ${accentHsl.l}%`);
    }
    
    // Dispatch a storage event so other components can react to the change
    window.dispatchEvent(new StorageEvent('storage', { 
      key: 'colorTheme',
      newValue: values.colorTheme
    }));
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your theme settings have been saved successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  // Utility function to convert hex to HSL
  function hexToHSL(hex: string): { h: number, s: number, l: number } | null {
    // Remove the # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
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
    <Card>
      <CardHeader>
        <CardTitle>Theme Configuration</CardTitle>
        <CardDescription>
          Customize the look and feel of your maintenance system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ThemeForm />
            <ThemePreview />
            
            <button 
              type="submit" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Theme Settings"}
            </button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
