
import { useFormContext } from "react-hook-form";
import { type ThemeFormValues } from "./themeFormSchema";
import { AppearanceSection } from "./form-sections/AppearanceSection";
import { ColorThemeSection } from "./form-sections/ColorThemeSection";
import { ColorSection } from "./form-sections/ColorSection";
import { TypographySection } from "./form-sections/TypographySection";
import { AccessibilitySection } from "./form-sections/AccessibilitySection";
import { BrandingSection } from "./form-sections/BrandingSection";

export function ThemeForm() {
  const { watch } = useFormContext<ThemeFormValues>();
  
  const watchCustomLogo = watch("customLogo");
  const watchCustomFavicon = watch("customFavicon");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <AppearanceSection />
        <ColorThemeSection />
        <ColorSection />
        <AccessibilitySection />
      </div>
      
      <div className="space-y-4">
        <TypographySection />
        <BrandingSection 
          watchCustomLogo={watchCustomLogo}
          watchCustomFavicon={watchCustomFavicon}
        />
      </div>
    </div>
  );
}
