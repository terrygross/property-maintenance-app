
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { type ThemeFormValues } from "./themeFormSchema";
import { colorThemeOptions } from "./themeFormSchema";

export function ThemePreview() {
  const { watch } = useFormContext<ThemeFormValues>();
  
  const watchTheme = watch("theme");
  const watchColorTheme = watch("colorTheme");
  const watchPrimaryColor = watch("primaryColor");
  const watchAccentColor = watch("accentColor");
  
  // Get preview class names based on form values
  const getPreviewClasses = () => {
    const borderRadiusClasses = {
      none: "rounded-none",
      small: "rounded",
      medium: "rounded-md",
      large: "rounded-lg",
    };
    
    return `${borderRadiusClasses[watch("borderRadius")]}`;
  };

  // Get the theme name for display
  const getThemeName = () => {
    const selectedTheme = colorThemeOptions.find(theme => theme.value === watchColorTheme);
    return selectedTheme ? selectedTheme.name : "Custom";
  };

  return (
    <div className="pt-4 border-t">
      <h3 className="text-lg font-medium mb-2">Preview</h3>
      <div className="mb-2 flex items-center space-x-2">
        <span className="text-sm font-medium">Current theme:</span>
        <span className="text-sm">{watchTheme.charAt(0).toUpperCase() + watchTheme.slice(1)} Mode - {getThemeName()}</span>
      </div>
      <div className={`flex items-center justify-center p-6 bg-background border rounded-md ${watchTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <Button
              style={{ 
                backgroundColor: watchPrimaryColor,
                color: "#ffffff"
              }}
              className={getPreviewClasses()}
            >
              Primary Button
            </Button>
            <Button
              variant="outline"
              className={getPreviewClasses()}
              style={{ 
                borderColor: watchAccentColor,
                color: watchAccentColor,
                borderWidth: "1px"
              }}
            >
              Secondary Button
            </Button>
          </div>
          <div
            className={`bg-card p-4 border shadow-sm ${getPreviewClasses()} ${watchTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
            style={{ 
              borderColor: watchAccentColor + "33",
              borderWidth: "1px"
            }}
          >
            <h4 className="font-medium mb-2">Sample Card</h4>
            <p className="text-sm text-muted-foreground">
              This is how cards will appear with your selected theme options
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-xs font-semibold">Primary Color</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: watchPrimaryColor }}></div>
            <span className="text-xs">{watchPrimaryColor}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs font-semibold">Accent Color</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: watchAccentColor }}></div>
            <span className="text-xs">{watchAccentColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
