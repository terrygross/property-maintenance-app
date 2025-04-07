
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { type ThemeFormValues, colorThemeOptions } from "../themeFormSchema";

export function ColorThemeSection() {
  const { control, setValue } = useFormContext<ThemeFormValues>();

  const handleColorThemeChange = (value: string) => {
    // Make sure the value is a valid theme option
    const isValidTheme = colorThemeOptions.some(theme => theme.value === value);
    if (!isValidTheme) {
      console.warn(`Invalid color theme value: ${value}. Using default theme.`);
      value = "default";
    }
    
    // Find the selected theme
    const selectedTheme = colorThemeOptions.find(theme => theme.value === value);
    
    if (selectedTheme) {
      // Update the primary and accent colors to match the theme
      setValue("primaryColor", selectedTheme.primaryColor);
      setValue("accentColor", selectedTheme.accentColor);
      
      // Apply theme changes immediately
      const root = document.documentElement;
      
      // Convert hex to HSL for CSS variables
      const primaryHsl = hexToHSL(selectedTheme.primaryColor);
      const accentHsl = hexToHSL(selectedTheme.accentColor);
      
      if (primaryHsl) {
        root.style.setProperty('--primary', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      }
      
      if (accentHsl) {
        root.style.setProperty('--accent', `${accentHsl.h} ${accentHsl.s}% ${accentHsl.l}%`);
      }
      
      // Store in localStorage for persistence
      localStorage.setItem("colorTheme", value);
      localStorage.setItem("primaryColor", JSON.stringify(selectedTheme.primaryColor));
      localStorage.setItem("accentColor", JSON.stringify(selectedTheme.accentColor));
    }
  };
  
  // Utility function to convert hex to HSL
  function hexToHSL(hex: string): { h: number, s: number, l: number } | null {
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
    <FormField
      control={control}
      name="colorTheme"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Color Theme</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                handleColorThemeChange(value);
              }}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              {colorThemeOptions.map((theme) => (
                <FormItem key={theme.value} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={theme.value} />
                  </FormControl>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-200" 
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-200" 
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <FormLabel className="font-normal">
                      {theme.name}
                    </FormLabel>
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>
            Choose a pre-defined color theme or customize your own colors below
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
